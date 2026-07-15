/* =====================================================================
   JASPER'S JUST-RIGHT BAG — ACTIVITY  (jasper-just-right-activity.js)
   ---------------------------------------------------------------------
   CCSS L.1.5.c — real-life connections between words and their use. Jasper the
   jay packs the just-right thing; the child reads a situation and taps the
   picture of what they'd use. Validity DERIVED by real-life-use-core.js (the
   choice whose noun === correctNoun). answerType:'state' tap-a-picture + shell
   Check; tap any picture to HEAR it. Per-pass reshuffle. Pictures from the image
   library; SVG char stub. No timer/score/streak. 0 lines to any core + lcs-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.RealLifeUseCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOLD: '#E8A53A' };

  /* The core grades by noun-match (locale-neutral). German = a data port: EN image
     keys stay, the situation is translated + each choice gets a German `label`.
     childView strips label → the render reads it from this.round.choices[id]. 0 core. */
  var LANG = 'en';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function imgUrl(t) { return '/image-library-webp/themes/' + t.themeDir + '/' + t.noun + '@2x.webp'; }
  function speak(word) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: word, lang: (LANG === 'es' ? 'es-MX' : LANG), rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(word); u.rate = 0.95; u.lang = (LANG === 'fr' ? 'fr-FR' : LANG === 'de' ? 'de-DE' : LANG === 'es' ? 'es-MX' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function jaySVG() {
    return '<svg class="jjr-jay-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'fr' ? 'Jasper le geai' : LANG === 'de' ? 'Jasper, der Häher' : LANG === 'es' ? 'Jasper el arrendajo' : 'Jasper the jay') + '">' +
      '<path d="M30 80 q-14 -8 -8 -30 q4 -14 16 -12 q-10 12 -4 28 q3 10 6 16 Z" fill="#3B7DD8"/>' +    /* blue tail/wing */
      '<ellipse cx="52" cy="56" rx="20" ry="22" fill="#4F92E8"/>' +                 /* body */
      '<ellipse cx="52" cy="64" rx="12" ry="13" fill="#DCEBFB"/>' +                /* belly */
      '<circle cx="58" cy="36" r="13" fill="#4F92E8"/>' +                           /* head */
      '<path d="M55 24 q-2 -8 1 -10 q3 1 3 9 Z" fill="#2C63B0"/>' +                 /* crest */
      '<circle cx="61" cy="34" r="2.6" fill="#2A2A35"/>' +                          /* eye */
      '<path d="M68 36 q11 1 2 8 q-6 0 -8 -4 Z" fill="#2A2A35"/>' +                 /* beak */
      '</svg>';
  }

  global.JasperJustRightActivity = {
    id: 'jasper-just-right-activity',

    strings: {
      title: { en: "Jasper's Just-Right Bag", de: 'Jaspers Genau-richtig-Tasche', fr: 'Jasper le geai', es: 'La mochila de Jasper' },
      prompt: { en: 'Which one would you use?', de: 'Welches würdest du benutzen?', fr: 'Qu’est-ce que tu utiliserais ?', es: '¿Cuál usarías?' },
      jasperIntro: { en: 'Read what is happening — what would you use?', de: 'Hallo, ich bin Jasper! Lies die Situation und tippe das Bild an, das am besten dazu passt.', fr: 'Coucou, c’est Jasper ! Lis bien la situation, puis tape la bonne image.', es: '¡Hola, soy Jasper! Lee la situación y toca la imagen que mejor va con ella.' },
      theAsk: { en: 'Tap the picture of what you would use.', de: 'Tippe das Bild von dem an, was du benutzen würdest.', fr: 'Tape l’image de ce que tu utiliserais.', es: 'Toca la imagen de lo que usarías.' },
      hintPick: { en: 'Think about what fits — tap a picture, then Check!', de: 'Lies die Situation und überlege: Was würdest du dafür benutzen?', fr: 'Pense à ce qui convient — tape une image, puis Vérifie !', es: 'Lee la situación y piensa: ¿qué usarías para eso?' },
      /* es: `win`/`hintWrong` show for ANY round, but the objects span genders (el vaso / la cama /
         las tijeras) → anchored on the NEUTER demonstrative «eso», which is gender-invariant. */
      hintWrong: { en: "That one doesn't quite fit — read it again.", de: 'Das passt noch nicht ganz – lies die Situation noch einmal.', fr: 'Ça ne convient pas tout à fait — relis la situation et réessaie.', es: 'Eso no va del todo. Vuelve a leer la situación.' },
      win: { en: 'Yes! That is just right. 🐦', de: 'Ja! Das passt genau richtig. 🐦', fr: 'Oui ! C’est exactement ça. 🐦', es: '¡Sí! Eso es justo lo que necesitas. 🐦' }
    },
    defaults: {},

    init: function (api) {
      this.api = api; LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this.sel = null; this._cards = null; this._spoke = false;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.view = Core.childView(round); this.sel = null; this._spoke = false;
      this._cards = shuffle(this.view.choices.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'jjr-wrap'); var root = api.el('div', 'jjr-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'jjr-row');
      var jay = api.el('div', 'jjr-jay'); jay.innerHTML = jaySVG(); row.appendChild(jay);
      var say = api.el('div', 'jjr-say'); say.textContent = api.t('jasperIntro'); row.appendChild(say);
      root.appendChild(row);

      var sit = api.el('div', 'jjr-sit'); sit.textContent = v.situation; root.appendChild(sit);

      var ask = api.el('div', 'jjr-ask'); ask.textContent = api.t('theAsk'); root.appendChild(ask);

      var opts = api.el('div', 'jjr-opts');
      this._cards.forEach(function (o) {
        var disp = (self.round.choices[o.id] && self.round.choices[o.id].label) || o.noun;
        var b = api.el('button', 'jjr-tile jjr-opt' + (self.sel === o.id ? ' jjr-sel' : '')); b.type = 'button'; b.setAttribute('data-id', o.id); b.setAttribute('aria-label', disp);
        b.innerHTML = '<img class="jjr-img" src="' + imgUrl(o) + '" alt="' + esc(disp) + '" onerror="this.style.visibility=\'hidden\'"><span class="jjr-word">' + esc(disp) + '</span>';
        b.addEventListener('click', function () { self._tap(o.id, disp); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
      if (!this._spoke) { this._spoke = true; setTimeout(function () { speak(v.situation); }, 320); }
    },

    _tap: function (id, noun) {
      if (this.sel === id) { this.sel = null; this.render(); return; }
      this.sel = id; this.api.sound && this.api.sound(540); speak(noun); this.render();
    },

    isCorrect: function () { return Core.grade(this.round, this.sel); },
    reset: function () { this.setupTask(this.round); this.render(); },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : makeTasks([]); var n = pool.length, i = (opts && opts.index) || 0;
      if (!n) return null;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = bandOrder(pool, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = Math.floor(i / n); if (pass > this._curPass) { this._order = bandOrder(pool, this._order); this._curPass = pass; }
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/jasper-just-right-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[jasper-just-right] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.jjr-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.jjr-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.6vw,11px);background:linear-gradient(180deg,#FBF3E4,#EAF0E2);border-radius:20px;padding:clamp(8px,2vw,14px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(120,140,60,.08);}'
        + '.jjr-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.jjr-jay{width:clamp(42px,9vw,54px);flex:0 0 auto;}.jjr-jay-svg{width:100%;height:auto;display:block;}'
        + '.jjr-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:5px 10px;font:700 clamp(12px,3vw,14px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';max-width:80%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.jjr-sit{text-align:center;background:#FFFDF6;border:2px solid ' + C.GOLD + ';border-radius:13px;padding:9px 14px;font:700 clamp(14px,3.6vw,18px)/1.3 "Nunito",sans-serif;color:' + C.INK + ';max-width:440px;}'
        + '.jjr-ask{text-align:center;font:800 clamp(11.5px,2.9vw,13.5px)/1.2 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        + '.jjr-opts{display:flex;flex-wrap:wrap;gap:clamp(8px,2.4vw,14px);justify-content:center;}'
        + '.jjr-tile{display:flex;flex-direction:column;align-items:center;gap:3px;border-radius:14px;border:2px solid rgba(20,107,94,.2);background:#fff;padding:clamp(6px,1.6vw,10px);cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.jjr-img{width:clamp(58px,17vw,90px);height:clamp(58px,17vw,90px);object-fit:contain;display:block;}'
        + '.jjr-word{font:700 clamp(12px,3.2vw,15px)/1 "Nunito",sans-serif;color:' + C.INK + ';}'
        + '.jjr-opt.jjr-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;transform:translateY(-2px);}'
        + '.jjr-opt:active{transform:translateY(1px);}'
        + '.jjr-tile:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.jjr-root{gap:clamp(4px,1.1vw,8px);}.jjr-jay{width:clamp(40px,7vw,48px);}.jjr-img{width:clamp(52px,14vw,74px);height:clamp(52px,14vw,74px);}}'
        + '@media (max-height:700px){.jjr-root{gap:6px;padding:10px;}.jjr-jay{width:clamp(38px,6.5vw,44px);}.jjr-sit{padding:7px 12px;font-size:15px;}.jjr-img{width:clamp(48px,12vw,62px);height:clamp(48px,12vw,62px);}.jjr-word{font-size:13px;}}'
        + '@media (max-height:640px){.jjr-root{gap:5px;padding:8px;}.jjr-row{display:none;}.jjr-sit{padding:6px 11px;font-size:14px;}.jjr-img{width:clamp(46px,12vw,56px);height:clamp(46px,12vw,56px);}}'
        + '@media (max-width:380px){.jjr-img{width:52px;height:52px;}.jjr-sit{font-size:14px;}}'
        /* narrowest + shortest phone: longer German situations wrap more lines → claw back the fold (tiles stay ≥44px tap) */
        + '@media (max-width:380px) and (max-height:680px){.jjr-root{gap:4px;padding:7px;}.jjr-sit{font-size:13px;line-height:1.2;padding:5px 10px;}.jjr-ask{font-size:11px;}.jjr-img{width:44px;height:44px;}.jjr-word{font-size:12px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-jasper-just-right', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'jasper-just-right.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return Core.grade(round, tool.sel); },
        hintKey: function (tool) { return tool.sel != null ? 'hintWrong' : 'hintPick'; }
      };
    });
  }
  function bandOrder(pool, prev) {
    var byBand = {}; pool.forEach(function (t, i) { (byBand[t.band] = byBand[t.band] || []).push(i); });
    var bands = Object.keys(byBand).sort(function (a, b) { return a - b; }); var out, attempts = 0;
    do { out = []; bands.forEach(function (b) { var g = byBand[b].slice(); for (var i = g.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = g[i]; g[i] = g[j]; g[j] = t; } out = out.concat(g); }); attempts++; } while (prev && out.join(',') === prev.join(',') && attempts < 12 && pool.length > 1);
    return out;
  }

}(typeof window !== 'undefined' ? window : this));
