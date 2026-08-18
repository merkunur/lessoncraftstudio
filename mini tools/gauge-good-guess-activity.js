/* =====================================================================
   GAUGE'S GOOD GUESS — ACTIVITY  (gauge-good-guess-activity.js)
   ---------------------------------------------------------------------
   CCSS 2.MD.A.3 — estimate lengths. Gauge the goat guesses sizes by eye; the
   child reads the question, pictures the real size, and taps the sensible
   estimate. Validity DERIVED by estimate-length-core.js (the option === the
   answer; the correct magnitude is distributed across the bank). answerType:'state'
   tap-a-card + shell Check; cards shuffle. The per-round question renders on the
   stage. Text + SVG art only — no image-library, no audio dependency. No
   timer/score/streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.EstimateLengthCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', TAN: '#C9A66B' };

  var LANG = 'en';

  function speak(text) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: (LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG), rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = 0.95; u.lang = (LANG === 'es' ? 'es-MX' : LANG === 'de' ? 'de-DE' : LANG === 'fr' ? 'fr-FR' : LANG === 'pt' ? 'pt-BR' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function goatSVG() {
    return '<svg class="ggg-goat-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'es' ? 'Gauge la cabra' : LANG === 'pt' ? 'Palmira, a cabra' : 'Gauge the goat') + '">' +
      '<ellipse cx="46" cy="62" rx="24" ry="18" fill="#E6E0D6"/>' +                /* body */
      '<circle cx="74" cy="46" r="13" fill="#EFEAE0"/>' +                          /* head */
      '<path d="M66 36 q-6 -8 -2 -14 M82 36 q6 -8 2 -14" stroke="#B79B6E" stroke-width="4" fill="none" stroke-linecap="round"/>' + /* horns */
      '<circle cx="71" cy="45" r="2.2" fill="#2A2A35"/><circle cx="79" cy="45" r="2.2" fill="#2A2A35"/>' +
      '<path d="M70 53 q4 3 8 0" stroke="#B79B6E" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '<path d="M78 56 l4 6" stroke="#CFC6B6" stroke-width="4" stroke-linecap="round"/>' + /* beard */
      '<path d="M30 76 l-2 6 M42 78 l-1 6" stroke="#C9A66B" stroke-width="5" stroke-linecap="round"/>' +
      '</svg>';
  }

  global.GaugeGoodGuessActivity = {
    id: 'gauge-good-guess-activity',

    strings: {
      title: { en: "Gauge's Good Guess", de: 'Gauges gute Schätzung', fr: 'La bonne estimation de Gauge', es: 'El buen ojo de Gauge', pt: 'O bom olho da Palmira' },
      instruction: { en: 'Picture the real size, then tap the estimate that makes sense.', de: 'Stell dir die echte Größe vor und tippe dann auf die Schätzung, die passt.', fr: 'Imagine la taille réelle, puis touche l’estimation qui a du sens.', es: 'Imagina el tamaño real y luego toca la estimación que le queda bien.', pt: 'Imagine o tamanho real e toque na estimativa que faz sentido.' },
      prompt: { en: 'Tap the estimate that makes sense.', de: 'Tippe auf die Schätzung, die passt.', fr: 'Touche l’estimation qui a du sens.', es: 'Toca la estimación que le queda bien.', pt: 'Toque na estimativa que faz sentido.' },
      gaugeIntro: { en: 'I guess sizes by eye — picture how big it really is!', de: 'Ich schätze Größen mit dem Auge – stell dir vor, wie groß etwas wirklich ist!', fr: 'Je devine les tailles à l’œil — imagine la taille réelle !', es: '¡Yo calculo tamaños con la vista! Imagina qué tan grande es algo de verdad.', pt: 'Eu calculo tamanhos de olho — imagine o tamanho real!' },
      hintPick: { en: 'Think about the real object. Is it small, or really big?', de: 'Denk an den echten Gegenstand. Ist er klein oder richtig groß?', fr: 'Pense à l’objet réel. Est-il petit, ou vraiment grand ?', es: 'Piensa en el objeto real. ¿Es chiquito o de verdad enorme?', pt: 'Pense no objeto real. Ele é pequeno ou bem grande mesmo?' },
      hintWrong: { en: 'That size is way off. Picture the real thing again.', de: 'Diese Größe passt gar nicht. Stell dir das echte Ding noch einmal vor.', fr: 'Cette taille est loin du compte. Imagine à nouveau l’objet réel.', es: 'Ese tamaño no le queda para nada. Vuelve a imaginar el objeto real.', pt: 'Esse tamanho está bem longe. Imagine o objeto real de novo.' },
      win: { en: 'Yes! That is a sensible estimate. 📏', de: 'Ja! Das ist eine sinnvolle Schätzung. 📏', fr: 'Oui ! C’est une estimation qui a du sens. 📏', es: '¡Sí! Esa es una buena estimación. 📏', pt: 'Isso! Essa é uma boa estimativa. 📏' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this.sel = null; this._cards = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.view = Core.childView(round); this.sel = null;
      this._cards = shuffle(this.view.options.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'ggg-wrap'); var root = api.el('div', 'ggg-root');
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'ggg-row');
      var goat = api.el('div', 'ggg-goat'); goat.innerHTML = goatSVG(); row.appendChild(goat);
      var say = api.el('div', 'ggg-say'); say.textContent = api.t('gaugeIntro'); row.appendChild(say);
      root.appendChild(row);

      var q = api.el('div', 'ggg-q'); q.textContent = v.question; root.appendChild(q);

      var opts = api.el('div', 'ggg-opts');
      this._cards.forEach(function (o) {
        var b = api.el('button', 'ggg-opt' + (self.sel === o.id ? ' ggg-sel' : '')); b.type = 'button';
        b.setAttribute('data-id', o.id); b.setAttribute('aria-label', o.text);
        b.textContent = o.text;
        b.addEventListener('click', function () { self._tap(o.id, o.text); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
    },

    _tap: function (id, text) {
      if (this.sel === id) { this.sel = null; this.render(); return; }
      this.sel = id; this.api.sound && this.api.sound(560); speak(text); this.render();
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
      fetch('/mini-tools/gauge-good-guess-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[gauge-good-guess] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.ggg-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,520px);margin:0 auto;}'
        + '.ggg-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(9px,2.2vw,14px);background:linear-gradient(180deg,#FBF3E4,#F2EEE2);border-radius:20px;padding:clamp(11px,2.6vw,18px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(150,130,90,.1);}'
        + '.ggg-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.ggg-goat{width:clamp(46px,10vw,60px);flex:0 0 auto;}.ggg-goat-svg{width:100%;height:auto;display:block;}'
        + '.ggg-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.1vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:74%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.ggg-q{text-align:center;font:800 clamp(15px,4vw,20px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';max-width:94%;}'
        + '.ggg-opts{display:flex;flex-wrap:wrap;gap:clamp(8px,2.4vw,12px);justify-content:center;}'
        + '.ggg-opt{min-width:clamp(82px,25vw,120px);min-height:54px;padding:11px 18px;border-radius:14px;border:2px solid rgba(20,107,94,.24);background:#FFFDF8;color:' + C.INK + ';font:800 clamp(18px,4.8vw,23px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(150,130,90,.16);touch-action:manipulation;}'
        + '.ggg-opt.ggg-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;color:' + C.CORAL2 + ';transform:translateY(-2px);}'
        + '.ggg-opt:active{transform:translateY(1px);}'
        + '.ggg-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.ggg-root{gap:clamp(7px,1.7vw,11px);}.ggg-goat{width:clamp(42px,8vw,52px);}.ggg-opt{min-height:50px;}}'
        + '@media (max-height:700px){.ggg-root{gap:7px;padding:12px;}.ggg-row{display:none;}.ggg-q{font-size:16px;}.ggg-opt{min-height:48px;padding:9px 15px;font-size:19px;}}'
        + '@media (max-height:640px){.ggg-root{gap:6px;padding:10px;}.ggg-q{font-size:15px;}.ggg-opt{min-height:46px;font-size:18px;}}'
        + '@media (max-width:380px){.ggg-opt{min-width:74px;font-size:18px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-gauge-good-guess', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'gauge-good-guess.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
