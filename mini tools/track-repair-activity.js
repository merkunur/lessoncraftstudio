/* =====================================================================
   WHISTLE VALLEY — NUMBER-LINE TRACK REPAIR — ACTIVITY  (track-repair-activity.js)
   ---------------------------------------------------------------------
   CCSS 1.NBT.A.1 — count to 120 from ANY start; the number line as a
   MAGNITUDE model. A storm tore out track between two labeled ANCHOR ties;
   the child reads each numbered tie from the trolley and places it at the
   CONTINUOUS position its magnitude demands (position = magnitude), graded
   by a tolerance ε — there are NO discrete slots to sort into.
     • IN-RANGE distractors (the "is this a station?" check) on skip/interval.
     • COUNT-ON-FROM-ANY-START (mid-sequence anchors).
     • NO sequential audio while solving (per-tie numeral only; the SONG is
       the POST-COMMIT reward — the singing engine).
     • EVALUATE AT COMMIT ONLY (no on-drop feedback) + RESHUFFLE-ON-WRONG.
     • The train NEVER races; a wrong commit → the engine WAITS (silent).
   All grading from track-repair-core.js (which MODELS, never imports, the
   number-line geometry). 0 lines to any protected core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.TrackRepairCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOOD: '#2FA56A', GOLD: '#E8A53A' };

  var LANG = 'en';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text, rate) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: (LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG), rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = rate || 0.95; u.lang = (LANG === 'es' ? 'es-MX' : LANG === 'de' ? 'de-DE' : LANG === 'fr' ? 'fr-FR' : LANG === 'pt' ? 'pt-BR' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  global.TrackRepairActivity = {
    id: 'track-repair-activity',

    strings: {
      title: { en: 'Whistle Valley', de: 'Pfeiftal', fr: 'La vallée du Sifflet', es: 'El Valle del Silbato', pt: 'Vale do Apito', it: 'La valle del Fischio' },
      instruction: { en: '', de: '', fr: '', es: '', pt: '', it: '' },
      prompt: { en: 'Lay the track to scale!', de: 'Leg jede Schwelle an die richtige Stelle!', fr: 'Pose chaque traverse à la bonne place !', es: '¡Coloca cada durmiente en su lugar!', pt: 'Coloque cada dormente no lugar certo!', it: 'Metti ogni traversina al punto giusto!' },
      send: { en: 'Send the train! 🚂', de: 'Schick den Zug los! 🚂', fr: 'Envoie le train ! 🚂', es: '¡Arranca el tren! 🚂', pt: 'Lá vai o trenzinho! 🚂', it: 'Fai partire il treno! 🚂' },
      engineListen: { en: 'A tie goes where its number belongs.', de: 'Jede Schwelle gehört dorthin, wo ihre Zahl steht.', fr: 'Chaque traverse va là où se trouve son nombre.', es: 'Cada durmiente va donde le toca su número.', pt: 'Cada dormente fica onde manda o seu número.', it: 'Una traversina va dove sta il suo numero.' },
      engineWin: { en: 'All aboard! ', de: 'Alle einsteigen! ', fr: 'En voiture !  ', es: '¡Todos a bordo! ', pt: 'Todo mundo a bordo! ', it: 'Tutti in carrozza! ' },
      engineWait: { en: "Not yet — the train's still waiting.", de: 'Noch nicht – der Zug wartet noch.', fr: 'Pas encore — le train attend toujours.', es: 'Todavía no: el tren sigue esperando.', pt: 'Ainda não: o trem continua esperando.', it: 'Non ancora, il treno aspetta ancora.' },
      tapToPlace: { en: 'Tap a tie, then tap the track where it belongs.', de: 'Tippe auf eine Schwelle und dann auf die Stelle, wo sie hingehört.', fr: 'Touche une traverse, puis touche l’endroit de la voie où elle va.', es: 'Toca un durmiente y luego toca el lugar donde va.', pt: 'Toque um dormente e depois toque o lugar dele.', it: 'Tocca una traversina, poi tocca il binario nel punto giusto.' },
      hintCheck: { en: 'Lay every tie, then send the train!', de: 'Leg alle Schwellen, dann schick den Zug los!', fr: 'Pose toutes les traverses, puis envoie le train !', es: '¡Coloca todos los durmientes y arranca el tren!', pt: 'Coloque todos os dormentes e mande o trem!', it: 'Posa tutte le traversine, poi fai partire il treno!' },
      ariaTie: { en: 'tie {n}', de: 'Schwelle {n}', fr: 'traverse {n}', es: 'durmiente {n}', pt: 'dormente {n}', it: 'traversina {n}' },
      ariaPlaced: { en: '{n}, placed — tap to pick up again', de: '{n}, gelegt – zum Aufheben tippen', fr: '{n}, posée — touche pour la reprendre', es: '{n}, colocado — toca para levantarlo otra vez', pt: '{n}, colocado — toque para levantar de novo', it: '{n}, posata, tocca per riprenderla' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.solved = false; this.placements = {}; this._trolley = null;
      this._selected = null; this.msg = null; this.solvedCount = 0; this._preview = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.solved = false; this.placements = {}; this._selected = null; this.msg = null; this._preview = null;
      this._trolley = shuffle(Core.trolleyValues(round));
    },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS();
      var api = this.api, stage = api.stage; stage.innerHTML = '';
      var root = api.el('div', 'tr-root'); root.setAttribute('data-solved', this.solved ? '1' : '0'); this._rootEl = root;
      if (!this.round) { stage.appendChild(root); return; }
      var self = this, r = this.round;
      /* engine say-line */
      var say = api.el('div', 'tr-saytop');
      say.innerHTML = '<span class="tr-engine' + (this.solved ? ' tr-chug' : '') + '">🚂</span><span>' + esc(this.msg || api.t('engineListen')) + '</span>';
      root.appendChild(say);
      /* the clearing-sky vessel */
      this._renderSky(root);

      /* the track */
      var track = api.el('div', 'tr-track'); this._trackEl = track;
      var rail = api.el('div', 'tr-rail'); this._railEl = rail;
      /* faint full-scale unit-tick scaffold (reference, NOT slots) */
      for (var v = r.start; v <= r.end; v++) {
        var tk = api.el('span', 'tr-tick' + (v === r.start || v === r.end ? ' tr-tick-edge' : ''));
        tk.style.left = Core.valueToPct(v, r.start, r.end) + '%';
        rail.appendChild(tk);
      }
      /* present (pinned anchor + interior) ties */
      (r.present || [r.start, r.end]).forEach(function (v) {
        var an = api.el('span', 'tr-anchor'); an.style.left = Core.valueToPct(v, r.start, r.end) + '%';
        an.innerHTML = '<span class="tr-anchortie">' + v + '</span>';
        rail.appendChild(an);
      });
      /* placed ties (draggable) */
      Object.keys(this.placements).forEach(function (val) {
        var v = Number(val), pct = self.placements[val];
        var pt = api.el('button', 'tr-placed'); pt.type = 'button'; pt.style.left = pct + '%'; pt.setAttribute('data-val', v);
        pt.textContent = v;
        pt.setAttribute('aria-label', self.api.t('ariaPlaced').replace('{n}', v));
        if (!self.solved) pt.addEventListener('click', function (e) { e.stopPropagation(); self._unplace(v); });
        rail.appendChild(pt);
      });
      track.appendChild(rail);
      /* tap the rail to place the selected tie */
      if (!this.solved) rail.addEventListener('click', function (e) { self._railClick(e); });
      root.appendChild(track);

      /* the trolley of unplaced ties */
      if (!this.solved) {
        var trolley = api.el('div', 'tr-trolley');
        this._trolley.forEach(function (v) {
          if (v in self.placements) return;   /* placed ties leave the trolley */
          var sel = (self._selected === v);
          var b = api.el('button', 'tr-tie' + (sel ? ' tr-sel' : '')); b.type = 'button'; b.setAttribute('data-val', v);
          b.textContent = v;
          b.setAttribute('aria-label', self.api.t('ariaTie').replace('{n}', v));
          b.addEventListener('click', function () { self._tapTie(v); });
          trolley.appendChild(b);
        });
        root.appendChild(trolley);
        var commit = api.el('button', 'tr-send'); commit.type = 'button'; commit.textContent = api.t('send');
        commit.addEventListener('click', function () { self._commit(); });
        root.appendChild(commit);
      }
      stage.appendChild(root);
    },

    _renderSky: function (root) {
      var api = this.api, total = (this._pool && this._pool.length) || 14;
      var sky = api.el('div', 'tr-sky'); sky.setAttribute('aria-hidden', 'true');
      var bright = Math.min(1, this.solvedCount / total);
      sky.style.background = 'linear-gradient(90deg, #CFE0F2 ' + Math.round(bright * 100) + '%, #9AA6B2 ' + Math.round(bright * 100) + '%)';
      var sun = api.el('span', 'tr-sun'); sun.textContent = bright >= 1 ? '🌈' : '☀️'; sky.appendChild(sun);
      root.appendChild(sky);
    },

    _tapTie: function (v) {
      this._selected = (this._selected === v) ? null : v;
      this.msg = this._selected ? this.api.t('tapToPlace') : null;
      this.api.sound && this.api.sound(this._selected ? 560 : 400);
      if (this._selected != null) speak(String(v));   /* per-tie numeral only — NO sequential audio */
      this.render();
    },
    _railClick: function (e) {
      if (this._selected == null) return;
      var rect = this._railEl.getBoundingClientRect();
      var pct = rect.width ? Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)) : 0;
      this._placeTie(this._selected, pct);
      this._selected = null; this.msg = null;
    },
    _placeTie: function (value, placedPct) {
      this.placements[value] = placedPct;     /* NO on-drop feedback — just place it */
      this.api.sound && this.api.sound(620);
      this.render();
    },
    _unplace: function (value) {
      delete this.placements[value]; this._selected = null;
      this.api.sound && this.api.sound(400);
      this.render();
    },

    _commit: function () {
      var self = this, api = this.api;
      if (Core.isRepaired(this.round, this.placements)) { this._correct(); return; }
      /* WRONG — the engine WAITS (silent, no penalty) + the trolley reshuffles
         + re-randomizes (anti-brute-force) + clear placements. */
      this.msg = api.t('engineWait');
      this.placements = {}; this._selected = null;
      this._trolley = shuffle(Core.trolleyValues(this.round));
      this.api.sound && this.api.sound(360);
      this.render();
      api.announce && api.announce(api.t('engineWait'));
    },
    _correct: function () {
      var self = this, api = this.api, r = this.round;
      this.solved = true;
      this.solvedCount = Math.min(this.solvedCount + 1, (this._pool && this._pool.length) || 14);
      this.msg = api.t('engineWin');
      this.api.sound && this.api.sound(880);
      this.render();
      /* the singing train — the restored sequence sung WHOLE, POST-COMMIT */
      var seq = (r.present || []).concat(Core.targetValues(r)).filter(function (x, i, a) { return a.indexOf(x) === i; }).sort(function (a, b) { return a - b; });
      api.announce && api.announce(api.t('engineWin'));
      setTimeout(function () { speak(seq.join(', ') + '!'); }, 300);
    },

    isCorrect: function () { return this.solved; },
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
      fetch('/mini-tools/track-repair-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) {
          var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return;
          self._activityRow = row;
          self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); }));
          self._order = null;
          if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
        })
        .catch(function (e) { if (global.console && console.warn) console.warn('[track-repair] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.tr-root{position:relative;width:100%;max-width:min(96vw,660px);margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:clamp(7px,1.8vw,12px);background:linear-gradient(180deg,#FBF3E4,#EAF2EE);border-radius:18px;padding:clamp(8px,1.8vw,14px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        + '.tr-saytop{display:flex;align-items:center;gap:8px;justify-content:center;font:700 clamp(12px,3.1vw,15px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.tr-engine{font-size:clamp(22px,5.5vw,30px);flex:0 0 auto;}.tr-chug{animation:trChug .6s ease;}'
        + '@keyframes trChug{0%{transform:translateX(-8px)}100%{transform:none}}'
        /* clearing-sky vessel */
        + '.tr-sky{position:relative;height:14px;border-radius:7px;overflow:hidden;}'
        + '.tr-sun{position:absolute;right:4px;top:-3px;font-size:14px;line-height:1;}'
        /* the track — generous edge padding so the to-scale edge anchor pills
           (incl. 3-digit "102") never reach the card edge. */
        + '.tr-track{position:relative;padding:34px 32px 30px;}'
        + '.tr-rail{position:relative;height:6px;background:' + C.T + ';border-radius:3px;cursor:pointer;}'
        + '.tr-rail::before,.tr-rail::after{content:"";position:absolute;top:-2px;height:10px;width:4px;background:#0E5247;border-radius:2px;}'
        + '.tr-rail::before{left:-2px;}.tr-rail::after{right:-2px;}'
        + '.tr-tick{position:absolute;top:-4px;width:2px;height:14px;background:rgba(20,107,94,.25);transform:translateX(-50%);pointer-events:none;}'
        + '.tr-tick-edge{background:rgba(20,107,94,.5);height:18px;top:-6px;}'
        /* anchor (present, pinned) ties — AUTO-WIDTH pill, numeral IN FLOW so
           it can never overflow (any digit count fits). */
        + '.tr-anchor{position:absolute;top:50%;transform:translate(-50%,-50%);pointer-events:none;z-index:2;}'
        + '.tr-anchortie{display:inline-flex;align-items:center;justify-content:center;min-width:clamp(22px,5.5vw,26px);height:clamp(22px,5.5vw,26px);padding:0 6px;border-radius:7px;background:' + C.T + ';box-shadow:0 2px 0 #0E5247;color:#fff;font:800 clamp(12.5px,3.2vw,15px)/1 "Baloo 2",sans-serif;white-space:nowrap;}'
        /* placed ties — AUTO-WIDTH coral pill, numeral in flow. */
        + '.tr-placed{position:absolute;top:50%;transform:translate(-50%,-50%);min-width:clamp(26px,6.6vw,34px);height:clamp(26px,6.6vw,34px);padding:0 6px;border-radius:8px;border:0;background:' + C.CORAL + ';box-shadow:0 2px 0 ' + C.CORAL2 + ';cursor:pointer;display:inline-flex;align-items:center;justify-content:center;color:#fff;font:800 clamp(12.5px,3.2vw,15px)/1 "Baloo 2",sans-serif;white-space:nowrap;touch-action:manipulation;z-index:3;}'
        + '.tr-placed:active{transform:translate(-50%,-50%) translateY(1px);}'
        /* trolley */
        + '.tr-trolley{display:flex;flex-wrap:wrap;gap:clamp(6px,1.6vw,10px);justify-content:center;}'
        + '.tr-tie{min-width:clamp(46px,12vw,58px);height:clamp(46px,11vw,56px);border-radius:12px;border:2px solid rgba(242,120,75,.5);background:#fff;box-shadow:0 2px 0 rgba(160,120,60,.16);cursor:pointer;display:grid;place-items:center;padding:0 8px;touch-action:manipulation;color:' + C.CORAL2 + ';font:800 clamp(16px,4.2vw,20px)/1 "Baloo 2",sans-serif;}'
        + '.tr-tie.tr-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.32);transform:translateY(-2px);}'
        + '.tr-tie:active{transform:translateY(1px);}'
        /* commit */
        + '.tr-send{align-self:center;min-height:50px;padding:0 clamp(18px,5vw,28px);border-radius:26px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(15px,4vw,19px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.CORAL2 + ';touch-action:manipulation;}'
        + '.tr-send:active{transform:translateY(2px);}'
        + '.tr-tie:focus-visible,.tr-placed:focus-visible,.tr-send:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* desktop: a touch more breathing room */
        + '@media (min-width:760px){.tr-track{padding:38px 30px 34px;}}'
        /* phones */
        + '@media (max-width:480px){.tr-root{gap:6px;padding:9px;}.tr-saytop{font-size:12px;}.tr-track{padding:30px 22px 26px;}.tr-tie{min-height:48px;}.tr-send{min-height:48px;}}'
        /* small phones + short viewports */
        + '@media (max-height:760px), (max-width:380px){.tr-root{gap:5px;padding:7px;}.tr-saytop{font-size:11px;}.tr-engine{font-size:22px;}.tr-track{padding:26px 24px 22px;}.tr-tie{min-width:44px;height:44px;font-size:15px;}.tr-send{min-height:46px;}.tr-sky{height:11px;}}'
        + '@media (max-width:340px) and (max-height:660px){.tr-track{padding:24px 18px 20px;}.tr-tie{height:42px;min-width:42px;}.tr-send{min-height:42px;}.tr-engine{font-size:20px;}}'
        + '@media (prefers-reduced-motion: reduce){.tr-chug{animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-track-repair', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'track-repair.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return tool.isCorrect(); },
        hintKey: function () { return 'hintCheck'; }
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
