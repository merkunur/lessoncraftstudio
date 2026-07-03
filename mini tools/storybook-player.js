/* ============================================================================
   storybook-player.js — the Storybook Player (third sibling runtime).

   Loads a story definition (story.json + strings.json), renders the page
   layer stack on a PixiJS canvas with a px-math-synced DOM overlay, runs
   narration on its own channel, mounts each page's ONE interaction module
   into its zone, and advances linearly on success. Honors reduced motion,
   degrades on weak tablets, grants the per-story GameCollection keepsake.

   Sibling-runtime rules (game-shell precedent): loads lcs-shell.js for the
   LCS.i18n / LCSAudio / LCS.drag / LCS.token globals but never calls
   LCS.mount; reuses the {type:'lcs-activity-resize', height} postMessage so
   the existing ActivityIframe sizes the iframe. lcs-shell.js/css: 0 lines.

   Design space: 1600×1000 units, origin top-left. ALL spatial story data is
   authored in these units; StageManager owns the single (s, ox, oy) transform
   both the Pixi stage and the DOM overlay consume (px math via toScreen —
   never CSS transform — so text stays crisp and tap targets are real,
   validatable CSS pixels).

   Entry: Storybook.mount({ mount: '#sb-root' })
   URL:   /mini-tools/storybook.html?activity=storybook.<storyId>&lang=<loc>&embed=1
          (&story=<storyId> also accepted; &debug=1 enables the QA seams)
   ========================================================================= */
(function (global) {
  'use strict';

  var DESIGN_W = 1600;
  var DESIGN_H = 1000;

  /* ---- chrome strings (small fixed namespace; platform-established terms) */
  var CHROME = {
    check:    { en: 'Check', de: 'Prüfen', fr: 'Vérifier', it: 'Verifica', es: 'Comprobar', pt: 'Verificar', nl: 'Controleer', sv: 'Kontrollera', da: 'Tjek', no: 'Sjekk', fi: 'Tarkista' },
    tryAgain: { en: 'Try again', de: 'Versuch es nochmal', fr: 'Réessaie', it: 'Riprova', es: 'Inténtalo otra vez', pt: 'Tente de novo', nl: 'Probeer opnieuw', sv: 'Försök igen', da: 'Prøv igen', no: 'Prøv igjen', fi: 'Yritä uudelleen' },
    listen:   { en: 'Listen again', de: 'Nochmal anhören', fr: 'Écouter encore', it: 'Ascolta ancora', es: 'Escuchar otra vez', pt: 'Ouvir de novo', nl: 'Luister opnieuw', sv: 'Lyssna igen', da: 'Lyt igen', no: 'Lytt igjen', fi: 'Kuuntele uudelleen' },
    soundOn:  { en: 'Sound on', de: 'Ton an', fr: 'Son activé', it: 'Audio attivo', es: 'Sonido activado', pt: 'Som ligado', nl: 'Geluid aan', sv: 'Ljud på', da: 'Lyd til', no: 'Lyd på', fi: 'Ääni päällä' },
    soundOff: { en: 'Sound off', de: 'Ton aus', fr: 'Son coupé', it: 'Audio spento', es: 'Sonido apagado', pt: 'Som desligado', nl: 'Geluid uit', sv: 'Ljud av', da: 'Lyd fra', no: 'Lyd av', fi: 'Ääni pois' },
    fullscreen: { en: 'Fullscreen', de: 'Vollbild', fr: 'Plein écran', it: 'Schermo intero', es: 'Pantalla completa', pt: 'Tela cheia', nl: 'Volledig scherm', sv: 'Helskärm', da: 'Fuld skærm', no: 'Fullskjerm', fi: 'Koko näyttö' },
    loading:  { en: 'Loading your story…', de: 'Deine Geschichte lädt…', fr: 'Ton histoire arrive…', it: 'La tua storia sta arrivando…', es: 'Tu cuento está cargando…', pt: 'Sua história está chegando…', nl: 'Je verhaal wordt geladen…', sv: 'Din saga laddas…', da: 'Din historie indlæses…', no: 'Historien din lastes…', fi: 'Tarinasi latautuu…' },
    theEnd:   { en: 'The End!', de: 'Ende!', fr: 'Fin !', it: 'Fine!', es: '¡Fin!', pt: 'Fim!', nl: 'Einde!', sv: 'Slut!', da: 'Slut!', no: 'Slutt!', fi: 'Loppu!' },
    keepsake: { en: 'You earned a keepsake!', de: 'Du hast ein Andenken verdient!', fr: 'Tu as gagné un souvenir !', it: 'Hai guadagnato un ricordo!', es: '¡Has ganado un recuerdo!', pt: 'Você ganhou uma lembrança!', nl: 'Je hebt een aandenken verdiend!', sv: 'Du har fått ett minne!', da: 'Du har fået et minde!', no: 'Du har fått et minne!', fi: 'Sait muiston!' },
    playAgain:{ en: 'Play again', de: 'Nochmal spielen', fr: 'Rejouer', it: 'Gioca ancora', es: 'Jugar otra vez', pt: 'Jogar de novo', nl: 'Speel opnieuw', sv: 'Spela igen', da: 'Spil igen', no: 'Spill igjen', fi: 'Pelaa uudelleen' }
  };

  var _locale = 'en';
  function chromeT(key) {
    var e = CHROME[key];
    return (e && (e[_locale] || e.en)) || key;
  }

  /* ---------------------------------------------------------------------- */
  /* CSS (injected once)                                                     */
  /* ---------------------------------------------------------------------- */
  var _cssDone = false;
  function injectCSS() {
    if (_cssDone) return;
    _cssDone = true;
    var css = [
      '.sb-frame{position:relative;width:100%;overflow:hidden;background:#1c1a17;',
      '  font-family:"Nunito","Baloo 2",system-ui,sans-serif;user-select:none;-webkit-user-select:none;}',
      /* cores are authored against the shell reset — mirror it in our scope */
      '.sb-frame *,.sb-frame *::before,.sb-frame *::after{box-sizing:border-box;}',
      '.sb-frame:fullscreen{width:100%;height:100%;}',
      '.sb-canvas{position:absolute;display:block;}',
      '.sb-overlay{position:absolute;inset:0;pointer-events:none;overflow:hidden;}',
      '.sb-pos{position:absolute;pointer-events:none;}',
      '.sb-zone{position:absolute;pointer-events:auto;}',
      '.sb-zone-blocker{position:absolute;inset:0;z-index:60;background:transparent;pointer-events:auto;}',
      /* block like the shell's .lcs-stage — cores size their boards to width:100% */
      '.sb-legacy-stage{width:100%;max-height:100%;overflow:visible;}',
      /* caption band */
      '.sb-caption{position:absolute;pointer-events:auto;display:flex;align-items:center;gap:10px;',
      '  background:rgba(28,26,23,.78);border-radius:18px;padding:8px 14px;color:#FBF3E4;',
      '  box-shadow:0 4px 14px rgba(0,0,0,.25);}',
      '.sb-caption-text{flex:1;line-height:1.35;font-weight:700;}',
      '.sb-caption-speaker{font-weight:800;opacity:.85;margin-right:2px;}',
      '.sb-speak-btn{flex:0 0 auto;width:44px;height:44px;min-width:44px;min-height:44px;border:none;border-radius:50%;',
      '  background:#F2784B;color:#fff;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;}',
      '.sb-speak-btn:active{transform:scale(.94);}',
      /* check button */
      '.sb-check-btn{position:relative;min-width:120px;min-height:48px;border:none;border-radius:24px;',
      '  background:#146B5E;color:#fff;font-size:18px;font-weight:800;cursor:pointer;padding:10px 22px;',
      '  box-shadow:0 4px 12px rgba(0,0,0,.3);}',
      '.sb-check-btn:disabled{opacity:.45;cursor:default;}',
      '.sb-check-host{position:absolute;pointer-events:auto;display:flex;align-items:center;justify-content:center;}',
      /* UI buttons (fixed real size — never scale below 44px) */
      '.sb-ui{position:absolute;top:10px;right:10px;display:flex;gap:8px;pointer-events:auto;z-index:80;}',
      '.sb-ui button{width:44px;height:44px;border:none;border-radius:50%;background:rgba(28,26,23,.6);',
      '  color:#FBF3E4;font-size:19px;cursor:pointer;display:flex;align-items:center;justify-content:center;}',
      '.sb-ui button:active{transform:scale(.94);}',
      /* progress pips */
      '.sb-pips{position:absolute;top:14px;left:50%;transform:translateX(-50%);display:flex;gap:8px;pointer-events:none;z-index:70;}',
      '.sb-pip{width:12px;height:12px;border-radius:50%;background:rgba(251,243,228,.35);}',
      '.sb-pip.done{background:#F2784B;}',
      '.sb-pip.now{background:#FBF3E4;outline:2px solid #F2784B;}',
      /* sticker tray (session-scoped) */
      '.sb-tray{position:absolute;left:10px;top:10px;display:flex;gap:6px;pointer-events:none;z-index:70;}',
      '.sb-tray img,.sb-tray .sb-tray-item{width:40px;height:40px;object-fit:contain;',
      '  filter:drop-shadow(0 2px 4px rgba(0,0,0,.4));}',
      /* page text */
      '.sb-text{position:absolute;pointer-events:none;color:#3d2f21;font-weight:800;text-shadow:0 1px 0 rgba(255,255,255,.5);}',
      /* loading */
      '.sb-loading{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;',
      '  gap:18px;background:#1c1a17;color:#FBF3E4;z-index:200;}',
      '.sb-loading-title{font-size:22px;font-weight:800;}',
      '.sb-loading-bar{width:46%;max-width:340px;height:10px;border-radius:5px;background:rgba(251,243,228,.2);overflow:hidden;}',
      '.sb-loading-fill{height:100%;width:0%;border-radius:5px;background:#F2784B;transition:width .2s ease;}',
      /* DOM celebration burst (non-particle tiers + reduced motion) */
      '.sb-burst{position:absolute;pointer-events:none;z-index:90;font-size:30px;}',
      '@keyframes sb-burst-fly{0%{transform:translate(0,0) scale(.6);opacity:1;}100%{transform:translate(var(--bx),var(--by)) scale(1.15);opacity:0;}}',
      '.sb-burst span{position:absolute;animation:sb-burst-fly .8s ease-out forwards;}',
      '@media (prefers-reduced-motion: reduce){.sb-burst span{animation:none;opacity:1;}}',
      /* rotate-device hint (non-blocking, small-portrait only) */
      '.sb-rotate{position:absolute;left:50%;top:8px;transform:translateX(-50%);z-index:120;',
      '  background:rgba(28,26,23,.85);color:#FBF3E4;border-radius:14px;padding:8px 14px;',
      '  font-size:13px;font-weight:800;pointer-events:none;display:flex;align-items:center;gap:8px;}',
      /* completion overlay */
      '.sb-complete{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;',
      '  background:rgba(28,26,23,.88);color:#FBF3E4;z-index:150;text-align:center;padding:20px;}',
      '.sb-complete-title{font-size:34px;font-weight:900;}',
      '.sb-complete-keepsake{font-size:56px;line-height:1;}',
      '.sb-complete-label{font-size:20px;font-weight:800;color:#F2784B;}',
      '.sb-complete button{min-width:150px;min-height:48px;border:none;border-radius:24px;background:#F2784B;',
      '  color:#fff;font-size:18px;font-weight:800;cursor:pointer;padding:10px 24px;}',
      '.sb-sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}'
    ].join('\n');
    var st = global.document.createElement('style');
    st.id = 'sb-player-css';
    st.textContent = css;
    global.document.head.appendChild(st);
  }

  /* ---------------------------------------------------------------------- */
  /* DegradeManager                                                          */
  /* ---------------------------------------------------------------------- */
  function detectPolicy() {
    var doc = global.document;
    var webgl2 = false, webgl1 = false;
    try {
      var c = doc.createElement('canvas');
      webgl2 = !!c.getContext('webgl2');
      webgl1 = webgl2 || !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
    } catch (e) {}
    var mem = global.navigator.deviceMemory || 4;
    var cores = global.navigator.hardwareConcurrency || 4;
    var reduced = false;
    try { reduced = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

    var tier;
    if (!webgl1) tier = 2;
    else if (webgl2 && mem >= 4 && cores > 4) tier = 0;
    else tier = 1;

    var p = {
      tier: tier,
      reduced: reduced,
      forceCanvas: !webgl1,
      dpr: tier === 0 ? Math.min(2, global.devicePixelRatio || 1) : (tier === 1 ? 1.25 : 1),
      maxPerformers: tier === 0 ? 2 : (tier === 1 ? 1 : 0),
      maxIdles: tier === 0 ? 99 : (tier === 1 ? 2 : 0),
      particles: tier === 0,
      maxFPS: tier === 0 ? 60 : (tier === 1 ? 30 : 0),   /* 0 = render-on-demand */
      vramBudget: 150 * 1024 * 1024
    };
    if (reduced) {
      p.maxPerformers = 0; p.maxIdles = 0; p.particles = false; p.maxFPS = 0;
    }
    return p;
  }

  /* ---------------------------------------------------------------------- */
  /* StageManager                                                            */
  /* ---------------------------------------------------------------------- */
  function createStage(rootEl, policy) {
    var PIXI = global.PIXI;
    var doc = global.document;

    var frame = doc.createElement('div');
    frame.className = 'sb-frame';
    rootEl.appendChild(frame);

    var app = new PIXI.Application({
      width: DESIGN_W, height: DESIGN_H,
      backgroundAlpha: 0,
      antialias: true,
      autoDensity: true,
      resolution: policy.dpr,
      forceCanvas: policy.forceCanvas
    });
    app.view.className = 'sb-canvas';
    frame.appendChild(app.view);

    var stageRoot = new PIXI.Container();
    app.stage.addChild(stageRoot);

    var overlay = doc.createElement('div');
    overlay.className = 'sb-overlay';
    frame.appendChild(overlay);

    if (policy.maxFPS === 0) {
      app.ticker.stop();
    } else {
      app.ticker.maxFPS = policy.maxFPS;
    }

    var _renderQueued = false;
    function requestRender() {
      if (app.ticker.started) return;       /* ticker renders anyway */
      if (_renderQueued) return;
      _renderQueued = true;
      global.requestAnimationFrame(function () {
        _renderQueued = false;
        try { app.renderer.render(app.stage); } catch (e) {}
      });
    }

    var s = 1, ox = 0, oy = 0;
    var positioned = [];   /* {el, rect, fontSize?} */
    var _lastH = 0;

    function toScreen(r) {
      return {
        x: Math.round(ox + r.x * s),
        y: Math.round(oy + r.y * s),
        w: Math.round(r.w * s),
        h: Math.round(r.h * s)
      };
    }

    function applyPos(p) {
      var r = toScreen(p.rect);
      p.el.style.left = r.x + 'px';
      p.el.style.top = r.y + 'px';
      p.el.style.width = r.w + 'px';
      p.el.style.height = r.h + 'px';
      if (p.fontSize) p.el.style.fontSize = Math.max(12, Math.round(p.fontSize * s)) + 'px';
    }

    function registerPositioned(el2, rect, fontSize) {
      var p = { el: el2, rect: rect, fontSize: fontSize || 0 };
      positioned.push(p);
      applyPos(p);
      return p;
    }
    function unregisterPositioned(el2) {
      positioned = positioned.filter(function (p) { return p.el !== el2; });
    }

    function postHeight() {
      var h = Math.ceil(frame.getBoundingClientRect().height) + 2;
      if (!h || Math.abs(h - _lastH) < 4) return;
      _lastH = h;
      try {
        global.parent.postMessage({ type: 'lcs-activity-resize', height: h }, '*');
      } catch (e) {}
    }

    function isFullscreen() {
      return doc.fullscreenElement === frame;
    }

    function resize() {
      var fw, fh;
      if (isFullscreen()) {
        fw = frame.clientWidth; fh = frame.clientHeight;
        s = Math.min(fw / DESIGN_W, fh / DESIGN_H);
        ox = Math.round((fw - DESIGN_W * s) / 2);
        oy = Math.round((fh - DESIGN_H * s) / 2);
      } else {
        fw = frame.clientWidth || rootEl.clientWidth || 800;
        s = fw / DESIGN_W;
        ox = 0; oy = 0;
        frame.style.height = Math.ceil(DESIGN_H * s) + 'px';
      }
      app.renderer.resize(Math.round(DESIGN_W * s), Math.round(DESIGN_H * s));
      app.view.style.left = ox + 'px';
      app.view.style.top = oy + 'px';
      stageRoot.scale.set(s);
      frame.style.setProperty('--sb-s', String(s));
      positioned.forEach(applyPos);
      requestRender();
      /* legacy cores (match-pairs connectors) re-measure on window resize —
         a real window resize already fired; nothing synthetic needed here.
         Fullscreen toggles DO need the nudge: */
      postHeight();
    }

    /* rotate-device hint: below 480px the stage is too small for K-3 fingers —
       suggest landscape (non-blocking; shows once, fades after 6s) */
    var _rotateShown = false;
    function maybeRotateHint() {
      if (_rotateShown || isFullscreen()) return;
      if ((frame.clientWidth || 0) >= 480 || frame.clientWidth === 0) return;
      _rotateShown = true;
      var d = doc.createElement('div');
      d.className = 'sb-rotate';
      d.textContent = '📱↻';
      d.setAttribute('aria-hidden', 'true');
      frame.appendChild(d);
      setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 6000);
    }

    global.addEventListener('resize', resize);
    doc.addEventListener('fullscreenchange', function () {
      resize();
      /* synthetic resize so wrapped legacy cores re-measure their rects */
      try { global.dispatchEvent(new Event('resize')); } catch (e) {}
    });

    resize();
    setTimeout(maybeRotateHint, 1200);

    return {
      frame: frame,
      app: app,
      root: stageRoot,
      overlay: overlay,
      toScreen: toScreen,
      scale: function () { return s; },
      registerPositioned: registerPositioned,
      unregisterPositioned: unregisterPositioned,
      requestRender: requestRender,
      resize: resize,
      postHeight: postHeight,
      isFullscreen: isFullscreen
    };
  }

  /* ---------------------------------------------------------------------- */
  /* small rAF tween (reduced-motion aware, render-on-demand aware)          */
  /* ---------------------------------------------------------------------- */
  function makeTween(policy, requestRender) {
    return function tween(ms, onUpdate, onDone) {
      if (policy.reduced || ms <= 0) { onUpdate(1); requestRender(); if (onDone) onDone(); return; }
      var t0 = (global.performance || Date).now();
      function step() {
        var k = Math.min(1, ((global.performance || Date).now() - t0) / ms);
        onUpdate(k);
        requestRender();
        if (k < 1) global.requestAnimationFrame(step);
        else if (onDone) onDone();
      }
      global.requestAnimationFrame(step);
    };
  }

  /* ---------------------------------------------------------------------- */
  /* The player                                                              */
  /* ---------------------------------------------------------------------- */
  function mount(opts) {
    opts = opts || {};
    injectCSS();
    var doc = global.document;
    var params = new global.URLSearchParams(global.location ? global.location.search : '');

    var activityId = params.get('activity') || '';
    var storyId = params.get('story') || activityId.replace(/^storybook\./, '');
    /* ?src= — tenant story base override (the Studio's teacher stories are
       served by the tokened /api/play/<linkId>/ routes, not the static
       /mini-tools/stories/ tree). Prefix-validated; the link id doubles as
       the story identity for tracking/audio when ?story= is absent. */
    var srcBase = params.get('src') || '';
    if (srcBase && !/^\/(api\/play\/[A-Za-z0-9]+|mini-tools\/stories\/[a-z0-9-]+)\/$/.test(srcBase)) {
      srcBase = '';
    }
    if (!storyId && srcBase) {
      storyId = (srcBase.match(/^\/api\/play\/([A-Za-z0-9]+)\//) || [])[1] || 'tenant';
    }
    if (!storyId) { throw new Error('[Storybook] no story id (?story= or ?src= or ?activity=storybook.<id>)'); }

    var lang = params.get('lang') || opts.lang ||
               (doc.documentElement.getAttribute('lang')) || 'en';
    var LOCALES = (global.LCS && global.LCS.LOCALES) ||
                  ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
    _locale = LOCALES.indexOf(lang) >= 0 ? lang : 'en';
    if (global.LCS && global.LCS.i18n) global.LCS.i18n.current = _locale;

    var debug = params.get('debug') === '1';
    if (params.get('sound') === 'off') global.SBAudio.setMuted(true);

    var rootEl = doc.querySelector(opts.mount || '#sb-root') || doc.body;
    rootEl.innerHTML = '';

    var policy = detectPolicy();
    var base = srcBase || ('/mini-tools/stories/' + storyId + '/');

    var stage = null;
    var story = null;
    var strings = null;
    var tween = null;

    /* mutable page state */
    var pageIndex = -1;
    var pageContainer = null;      /* PIXI container of the current page */
    var performers = {};           /* characterId -> Performer (current page) */
    var host = null;               /* current InteractionHost */
    var pageDomEls = [];           /* per-page overlay elements to remove */
    var replayBusy = false;
    var lastCues = [];
    var live = null;               /* aria-live region */
    var caption = null, captionText = null, captionSpeaker = null, speakBtn = null;
    var checkHost = null, pips = null, tray = null;

    /* ---------- helpers ---------- */
    function str(key, args) {
      var e = strings && strings[key];
      if (!e) return key;
      var v = e[_locale] || e.en || key;
      if (!args) return v;
      return String(v).replace(/\{(\w+)\}/g, function (m, k) {
        return args[k] !== undefined ? args[k] : m;
      });
    }
    function refStr(ref, args) {   /* resolve '@key' references from story.json */
      if (typeof ref === 'string' && ref.charAt(0) === '@') return str(ref.slice(1), args);
      return ref;
    }
    function announce(msg) {
      if (!live) return;
      live.textContent = '';
      global.requestAnimationFrame(function () { live.textContent = String(msg); });
    }
    function track(ev, data) {
      try {
        if (global.LCS && global.LCS.track) global.LCS.track('sb:' + storyId + ':' + ev, data);
      } catch (e) {}
    }
    function castDefOf(id) {
      var cast = story.cast || [];
      for (var i = 0; i < cast.length; i++) if (cast[i].id === id) return cast[i];
      return null;
    }
    function guideDef() {
      var cast = story.cast || [];
      for (var i = 0; i < cast.length; i++) if (cast[i].role === 'guide') return cast[i];
      return cast[0] || null;
    }

    /* ---------- persistent chrome ---------- */
    function buildChrome() {
      live = doc.createElement('div');
      live.className = 'sb-sr-only';
      live.setAttribute('aria-live', 'polite');
      live.setAttribute('aria-atomic', 'true');
      stage.frame.appendChild(live);

      /* UI buttons: sound + fullscreen (fixed 44px, never stage-scaled) */
      var ui = doc.createElement('div');
      ui.className = 'sb-ui';
      var soundBtn = doc.createElement('button');
      soundBtn.type = 'button';
      soundBtn.textContent = global.SBAudio.muted() ? '🔇' : '🔊';
      soundBtn.setAttribute('aria-label', chromeT(global.SBAudio.muted() ? 'soundOff' : 'soundOn'));
      soundBtn.addEventListener('click', function () {
        var m = !global.SBAudio.muted();
        global.SBAudio.setMuted(m);
        soundBtn.textContent = m ? '🔇' : '🔊';
        soundBtn.setAttribute('aria-label', chromeT(m ? 'soundOff' : 'soundOn'));
      });
      ui.appendChild(soundBtn);

      if (stage.frame.requestFullscreen) {
        var fsBtn = doc.createElement('button');
        fsBtn.type = 'button';
        fsBtn.textContent = '⛶';
        fsBtn.setAttribute('aria-label', chromeT('fullscreen'));
        fsBtn.addEventListener('click', function () {
          if (stage.isFullscreen()) { doc.exitFullscreen(); }
          else { stage.frame.requestFullscreen().catch(function () {}); }
        });
        ui.appendChild(fsBtn);
      }
      stage.frame.appendChild(ui);

      /* progress pips */
      pips = doc.createElement('div');
      pips.className = 'sb-pips';
      story.pages.forEach(function () {
        var d = doc.createElement('div');
        d.className = 'sb-pip';
        pips.appendChild(d);
      });
      stage.frame.appendChild(pips);

      /* sticker tray (session-scoped, purely visual) */
      tray = doc.createElement('div');
      tray.className = 'sb-tray';
      stage.frame.appendChild(tray);

      /* caption band */
      caption = doc.createElement('div');
      caption.className = 'sb-caption sb-pos';
      caption.style.pointerEvents = 'auto';
      speakBtn = doc.createElement('button');
      speakBtn.type = 'button';
      speakBtn.className = 'sb-speak-btn';
      speakBtn.textContent = '🔉';
      speakBtn.setAttribute('aria-label', chromeT('listen'));
      speakBtn.addEventListener('click', function () { replayNarration(); });
      captionSpeaker = doc.createElement('span');
      captionSpeaker.className = 'sb-caption-speaker';
      captionText = doc.createElement('span');
      captionText.className = 'sb-caption-text';
      caption.appendChild(speakBtn);
      caption.appendChild(captionSpeaker);
      caption.appendChild(captionText);
      stage.overlay.appendChild(caption);
      stage.registerPositioned(caption, { x: 120, y: 872, w: 1140, h: 108 }, 24);

      /* check-button host (bottom-right) */
      checkHost = doc.createElement('div');
      checkHost.className = 'sb-check-host';
      stage.overlay.appendChild(checkHost);
      stage.registerPositioned(checkHost, { x: 1280, y: 872, w: 210, h: 108 });
    }

    function updatePips() {
      var kids = pips.children;
      for (var i = 0; i < kids.length; i++) {
        kids[i].className = 'sb-pip' + (i < pageIndex ? ' done' : (i === pageIndex ? ' now' : ''));
      }
    }

    function setCaption(speakerName, text) {
      captionSpeaker.textContent = speakerName ? speakerName + ':' : '';
      captionText.textContent = text || '';
    }

    /* ---------- narration ---------- */
    function playCues(cues, onLine) {
      /* sequential promise chain over the page's narration cues */
      var p = Promise.resolve();
      cues.forEach(function (cue) {
        p = p.then(function () {
          var text = str(cue.id);
          var who = cue.characterId && castDefOf(cue.characterId);
          setCaption(who ? refStr(who.name) : '', text);
          announce(text);
          var perf = cue.characterId && performers[cue.characterId];
          if (perf) {
            /* a per-line clip is the speaker's gesture WHILE saying this line — it replaces
               the generic talk garnish for that line (playClip hides the pose the garnish toggles) */
            if (cue.clip && perf.playClip) perf.playClip(cue.clip, {});
            else perf.setTalking(true);
          }
          if (onLine) onLine(cue);
          return global.SBAudio.playLine({
            storyId: storyId, base: base, locale: _locale, lineId: cue.id, text: text
          }).then(function () {
            if (perf && !cue.clip) perf.setTalking(false);
            if (cue.pauseAfterMs) {
              return new Promise(function (res) { setTimeout(res, cue.pauseAfterMs); });
            }
          });
        });
      });
      return p;
    }

    function replayNarration() {
      if (replayBusy || !lastCues.length) return;
      replayBusy = true;
      track('replay');
      playCues(lastCues).then(function () { replayBusy = false; },
                              function () { replayBusy = false; });
    }

    /* ---------- celebration ---------- */
    function domBurst(zone) {
      var b = doc.createElement('div');
      b.className = 'sb-burst';
      var r = stage.toScreen(zone || { x: 700, y: 420, w: 200, h: 200 });
      b.style.left = (r.x + r.w / 2) + 'px';
      b.style.top = (r.y + r.h / 2) + 'px';
      var glyphs = ['⭐', '✨', '🌟', '⭐', '✨', '🌟'];
      glyphs.forEach(function (g, i) {
        var s2 = doc.createElement('span');
        s2.textContent = g;
        var ang = (i / glyphs.length) * Math.PI * 2;
        s2.style.setProperty('--bx', Math.round(Math.cos(ang) * 90) + 'px');
        s2.style.setProperty('--by', Math.round(Math.sin(ang) * 70 - 30) + 'px');
        b.appendChild(s2);
      });
      stage.frame.appendChild(b);
      setTimeout(function () { if (b.parentNode) b.parentNode.removeChild(b); },
                 policy.reduced ? 900 : 1000);
    }

    function pixiBurst(zone) {
      var PIXI = global.PIXI;
      var z = zone || { x: 700, y: 420, w: 200, h: 200 };
      var cx = z.x + z.w / 2, cy = z.y + z.h / 2;
      var parts = [];
      var cont = new PIXI.Container();
      pageContainer.addChild(cont);
      for (var i = 0; i < 22; i++) {
        var g = new PIXI.Graphics();
        var col = [0xF2784B, 0xFBF3E4, 0x146B5E, 0xF7C948][i % 4];
        g.beginFill(col).drawStar
          ? g.beginFill(col).drawStar(0, 0, 5, 9, 4).endFill()
          : g.beginFill(col).drawCircle(0, 0, 6).endFill();
        g.x = cx; g.y = cy;
        var ang = Math.random() * Math.PI * 2;
        var sp = 4 + Math.random() * 7;
        parts.push({ g: g, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - 5 });
        cont.addChild(g);
      }
      var frames = 0;
      function step() {
        frames++;
        parts.forEach(function (p) {
          p.g.x += p.vx; p.g.y += p.vy; p.vy += 0.45;
          p.g.alpha = Math.max(0, 1 - frames / 45);
          p.g.rotation += 0.12;
        });
        stage.requestRender();
        if (frames < 46) global.requestAnimationFrame(step);
        else { try { cont.destroy({ children: true }); } catch (e) {} stage.requestRender(); }
      }
      global.requestAnimationFrame(step);
    }

    function celebrate(page) {
      var zone = page.interaction && page.interaction.zone;
      var quiet = page.success && page.success.celebration === 'quiet';
      /* visuals immediately */
      if (!quiet) {
        if (policy.particles && !policy.reduced) pixiBurst(zone);
        else domBurst(zone);
      }
      /* guide reaction: success clip or happy pose */
      var clip = page.success && page.success.clip;
      if (clip && performers[clip.characterId]) {
        performers[clip.characterId].playClip(clip.name, {});
      } else {
        var g = guideDef();
        if (g && performers[g.id]) performers[g.id].setPose('happy');
      }
      /* the chime QUEUES behind any active narration — never overlaps */
      global.SBAudio.afterSpeech(function () {
        global.SBAudio.pop(880);
        setTimeout(function () { global.SBAudio.pop(1174); }, 130);
      });
      /* sticker into the session tray */
      var stickerId = page.success && page.success.sticker;
      if (stickerId && story.assets[stickerId]) {
        var img = doc.createElement('img');
        img.src = story.assets[stickerId].src;
        img.alt = '';
        tray.appendChild(img);
      }
    }

    /* ---------- page lifecycle ---------- */
    function clearPage() {
      if (host) { host.teardown(); host = null; }
      Object.keys(performers).forEach(function (k) { performers[k].destroy(); });
      performers = {};
      pageDomEls.forEach(function (e2) {
        stage.unregisterPositioned(e2);
        if (e2.parentNode) e2.parentNode.removeChild(e2);
      });
      pageDomEls = [];
      lastCues = [];
    }

    function buildPagePixi(page) {
      var PIXI = global.PIXI;
      var cont = new PIXI.Container();
      /* scene */
      if (page.scene && page.scene.image) {
        var tex = global.SBLoader.texture(page.scene.image);
        if (tex) {
          var sp = new PIXI.Sprite(tex);
          sp.width = DESIGN_W; sp.height = DESIGN_H;
          cont.addChild(sp);
        }
      }
      (page.scene && page.scene.layers || []).forEach(function (ly) {
        var t2 = global.SBLoader.texture(ly.image);
        if (!t2) return;
        var sp2 = new PIXI.Sprite(t2);
        sp2.x = ly.x; sp2.y = ly.y;
        if (ly.w) sp2.width = ly.w;
        if (ly.h) sp2.height = ly.h;
        cont.addChild(sp2);
      });
      /* characters */
      (page.characters || []).forEach(function (pl) {
        var def = castDefOf(pl.characterId);
        if (!def) return;
        try {
          var perf = global.SBCast.createPerformer({ castDef: def, placement: pl });
          performers[pl.characterId] = perf;
          cont.addChild(perf.container);
        } catch (e) { try { console.error(e); } catch (x) {} }
      });
      return cont;
    }

    function buildPageDom(page) {
      /* on-page display text */
      (page.text || []).forEach(function (tx) {
        var d = doc.createElement('div');
        d.className = 'sb-text';
        d.textContent = str(tx.stringKey);
        d.style.textAlign = tx.align || 'left';
        stage.overlay.appendChild(d);
        stage.registerPositioned(d, {
          x: tx.x, y: tx.y,
          w: tx.w || (DESIGN_W - tx.x - 40), h: tx.h || (tx.size || 40) * 1.6
        }, tx.size || 40);
        pageDomEls.push(d);
      });

      /* the ONE interaction zone */
      var zoneEl = null;
      if (page.interaction) {
        zoneEl = doc.createElement('div');
        zoneEl.className = 'sb-zone';
        stage.overlay.appendChild(zoneEl);
        stage.registerPositioned(zoneEl, page.interaction.zone);
        pageDomEls.push(zoneEl);
      }
      return zoneEl;
    }

    function transitionIn(newCont, oldCont) {
      return new Promise(function (resolve) {
        stage.root.addChild(newCont);
        if (!oldCont) { stage.requestRender(); resolve(); return; }
        newCont.alpha = 0;
        tween(policy.reduced ? 0 : 420, function (k) {
          newCont.alpha = k;
          oldCont.alpha = 1 - k;
        }, function () {
          try { oldCont.destroy({ children: true }); } catch (e) {}
          stage.requestRender();
          resolve();
        });
      });
    }

    function runPage(i) {
      pageIndex = i;
      var page = story.pages[i];
      updatePips();
      track('page', { i: i, id: page.id });

      return global.SBLoader.loadPage(i).then(function () {
        var oldCont = pageContainer;
        clearPage();
        pageContainer = buildPagePixi(page);
        var zoneEl = buildPageDom(page);

        /* mount the interaction inert BEFORE narration (model → do) */
        var successPromise = new Promise(function (resolveSuccess) {
          if (page.interaction && zoneEl) {
            host = global.SBInteractionHost.create({
              interaction: page.interaction,
              storyId: storyId,
              locale: _locale,
              strings: strings,
              zoneEl: zoneEl,
              chromeHost: checkHost,
              chromeT: chromeT,
              scale: stage.scale,
              assets: {
                url: function (assetId) { return global.SBLoader.urlFor(assetId); },
                img: function (assetId, cls) {
                  var im = doc.createElement('img');
                  im.src = global.SBLoader.urlFor(assetId);
                  im.alt = '';
                  if (cls) im.className = cls;
                  return im;
                }
              },
              replayNarration: replayNarration,
              speakHint: function (text) {
                global.SBAudio.playLine({ storyId: storyId, base: base, locale: _locale, lineId: '__hint__', text: text });
              },
              announce: announce,
              reducedMotion: policy.reduced,
              /* resolve the grade-band interaction profile from the story's grade
                 (story.alignment.grade); absent → K-3 defaults. Frozen onto ctx.band by the host. */
              band: (global.SB_BANDS
                ? (global.SB_BANDS[(story && story.alignment && story.alignment.grade)] || global.SB_BANDS.defaults)
                : null),
              track: track,
              debug: debug,
              onSuccess: resolveSuccess
            });
            host.mount();
          } else {
            /* no interaction (rare narrative-only page): auto-advance after narration */
            resolveSuccess();
          }
        });

        return transitionIn(pageContainer, oldCont).then(function () {
          global.SBLoader.releaseExcept([i, i + 1]);
          /* entrance animations: a placed character plays its clip as the page opens */
          (page.characters || []).forEach(function (pl) {
            if (pl.entranceClip && performers[pl.characterId] && performers[pl.characterId].playClip) {
              performers[pl.characterId].playClip(pl.entranceClip, {});
            }
          });
          lastCues = (page.narration && page.narration.cues) || [];
          var gate = (page.narration && page.narration.gate) || 'end';
          if (gate === 'immediate' && host) host.start();
          return playCues(lastCues).then(function () {
            if (host && gate !== 'immediate') host.start();
            global.SBLoader.prefetchPage(i + 1);
            return successPromise;
          });
        }).then(function () {
          /* CELEBRATING */
          celebrate(page);
          var p = Promise.resolve();
          var sn = page.success && page.success.narrationKey;
          if (sn) {
            p = p.then(function () {
              var text = str(sn);
              setCaption('', text);
              return global.SBAudio.playLine({ storyId: storyId, base: base, locale: _locale, lineId: sn, text: text });
            });
          }
          var hold = (page.success && page.success.holdMs) || 1200;
          return p.then(function () {
            return new Promise(function (res) { setTimeout(res, policy.reduced ? Math.min(hold, 600) : hold); });
          });
        }).then(function () {
          if (i + 1 < story.pages.length) return runPage(i + 1);
          return completeStory();
        });
      });
    }

    function completeStory() {
      pageIndex = story.pages.length;
      updatePips();
      track('complete');
      /* grant the keepsake (idempotent by GameCollection design) */
      var granted = false;
      try {
        if (global.GameCollection && story.reward && story.reward.id) {
          granted = global.GameCollection.grant(story.reward);
        }
      } catch (e) {}

      var ov = doc.createElement('div');
      ov.className = 'sb-complete';
      var title = doc.createElement('div');
      title.className = 'sb-complete-title';
      title.textContent = chromeT('theEnd');
      ov.appendChild(title);
      if (story.reward) {
        var em = doc.createElement('div');
        em.className = 'sb-complete-keepsake';
        em.textContent = story.reward.emoji || '★';
        ov.appendChild(em);
        var lb = doc.createElement('div');
        lb.className = 'sb-complete-label';
        var label = story.reward.label && (story.reward.label[_locale] || story.reward.label.en);
        lb.textContent = chromeT('keepsake') + (label ? ' — ' + label : '');
        ov.appendChild(lb);
      }
      var again = doc.createElement('button');
      again.type = 'button';
      again.textContent = chromeT('playAgain');
      again.addEventListener('click', function () { global.location.reload(); });
      ov.appendChild(again);
      stage.frame.appendChild(ov);
      announce(chromeT('theEnd'));
      global.SBAudio.afterSpeech(function () {
        global.SBAudio.pop(880); setTimeout(function () { global.SBAudio.pop(1318); }, 150);
      });
      return Promise.resolve(granted);
    }

    /* ---------- boot ---------- */
    function fetchJSON(url) {
      return global.fetch(url, { cache: 'no-cache' }).then(function (r) {
        if (!r.ok) throw new Error('[Storybook] fetch failed ' + r.status + ': ' + url);
        return r.json();
      });
    }

    var loading = doc.createElement('div');

    Promise.all([
      fetchJSON(base + 'story.json'),
      fetchJSON(base + 'strings.json')
    ]).then(function (res) {
      story = res[0];
      strings = res[1];
      if (story.schemaVersion !== 'sb-1') {
        throw new Error('[Storybook] unsupported schemaVersion: ' + story.schemaVersion);
      }
      global.SBLoader.init(story, policy);
      stage = createStage(rootEl, policy);
      tween = makeTween(policy, stage.requestRender);
      global.SBCast.setPolicy({
        maxPerformers: policy.maxPerformers,
        maxIdles: policy.maxIdles,
        reduced: policy.reduced,
        requestRender: stage.requestRender
      });
      if (story.theme && story.theme.letterboxColor) {
        stage.frame.style.background = story.theme.letterboxColor;
      }

      /* loading screen for page 1 */
      loading.className = 'sb-loading';
      var lt = doc.createElement('div');
      lt.className = 'sb-loading-title';
      lt.textContent = refStr(story.title) !== story.title ? refStr(story.title) : chromeT('loading');
      var bar = doc.createElement('div');
      bar.className = 'sb-loading-bar';
      var fill = doc.createElement('div');
      fill.className = 'sb-loading-fill';
      bar.appendChild(fill);
      loading.appendChild(lt);
      loading.appendChild(bar);
      stage.frame.appendChild(loading);

      buildChrome();
      stage.postHeight();

      return global.SBLoader.loadPage(0, function (p) {
        fill.style.width = Math.round(p * 100) + '%';
      });
    }).then(function () {
      if (loading.parentNode) loading.parentNode.removeChild(loading);
      /* debug-gated start page (?page=N, 1-based) — the Studio's preview seam */
      var startAt = 0;
      if (debug) {
        var pp = parseInt(params.get('page'), 10);
        if (pp >= 1 && pp <= story.pages.length) startAt = pp - 1;
      }
      return runPage(startAt);
    }).catch(function (err) {
      try { console.error(err); } catch (e) {}
      var msg = doc.createElement('div');
      msg.className = 'sb-loading';
      msg.textContent = debug ? String(err) : chromeT('loading');
      (stage ? stage.frame : rootEl).appendChild(msg);
    });

    /* ---------- dev/QA seams ---------- */
    var api = {
      storyId: storyId,
      locale: function () { return _locale; },
      policy: policy,
      pageIndex: function () { return pageIndex; },
      pageCount: function () { return story ? story.pages.length : 0; }
    };
    if (debug) {
      api.solve = function () { return host ? host.autoSolve() : false; };
      api.skipNarration = function () { global.SBAudio.stop(); };
      api.host = function () { return host; };
      api.stage = function () { return stage; };
      /* imprecise-touch QA seam: the module's gesture geometry (or null) */
      api.qaGesture = function () { return host && host.qaGesture ? host.qaGesture() : null; };
    }
    global.SB_PLAYER = api;
    return api;
  }

  global.Storybook = { mount: mount, DESIGN_W: DESIGN_W, DESIGN_H: DESIGN_H, chromeT: chromeT };
}(typeof window !== 'undefined' ? window : this));
