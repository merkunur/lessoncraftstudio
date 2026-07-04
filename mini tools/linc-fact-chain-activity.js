/* =====================================================================
   LINC'S FACT CHAIN — ACTIVITY  (linc-fact-chain-activity.js)
   ---------------------------------------------------------------------
   CCSS RI.K.3 — describe the connection between two facts. Linc the lizard links
   facts into a chain; the child reads a stem fact and taps the fact that
   connects (what happens next / what it causes). Validity DERIVED by
   fact-connect-core.js (the option === the answer). answerType:'state' tap-a-card
   + shell Check; cards shuffle. The stem fact + question render on the stage.
   Text + SVG art only — no image-library, no audio dependency. No
   timer/score/streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.FactConnectCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GREEN: '#5E9E4E' };
  var LANG = 'en';   // content locale; set in init from api.lang (de fan-out §A.13.54)

  function speak(text) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: LANG, rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = 0.95; u.lang = (LANG === 'de' ? 'de-DE' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function lizardSVG() {
    return '<svg class="lfc-liz-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'de' ? 'Ketti, die Eidechse' : 'Linc the lizard') + '">' +
      '<path d="M20 64 q14 -10 30 -6 q16 4 30 -8" fill="none" stroke="#5E9E4E" stroke-width="12" stroke-linecap="round"/>' +
      '<circle cx="80" cy="50" r="11" fill="#73B85F"/>' +
      '<circle cx="83" cy="48" r="2.3" fill="#2A2A35"/>' +
      '<path d="M88 49 q4 1 6 -1" stroke="#3F6B33" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '<path d="M30 70 l-4 7 M44 72 l-2 7 M58 70 l3 7" stroke="#5E9E4E" stroke-width="4" stroke-linecap="round"/>' +
      '</svg>';
  }

  global.LincFactChainActivity = {
    id: 'linc-fact-chain-activity',

    strings: {
      title: { en: "Linc's Fact Chain", de: 'Kettis Faktenkette' },
      instruction: { en: 'Read the first fact, then tap the one that connects to it.', de: 'Lies den ersten Fakt und tippe dann auf den Fakt, der dazu passt.' },
      prompt: { en: 'Read it, then tap the fact that connects.', de: 'Lies den Fakt. Tippe dann auf das, was dazu passt.' },
      lincIntro: { en: 'Facts link together like a chain — find the next link!', de: 'Fakten hängen zusammen wie eine Kette – finde das nächste Glied!' },
      hintPick: { en: 'Think: what would really happen after the first fact?', de: 'Überlege: Was passiert nach dem ersten Fakt wirklich?' },
      hintWrong: { en: 'That one does not fit. What follows from the first fact?', de: 'Der passt nicht. Was folgt aus dem ersten Fakt?' },
      win: { en: 'Yes! Those two facts connect. 🔗', de: 'Ja! Diese zwei Fakten gehören zusammen. 🔗' }
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
      var wrap = api.el('div', 'lfc-wrap'); var root = api.el('div', 'lfc-root');
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'lfc-row');
      var liz = api.el('div', 'lfc-liz'); liz.innerHTML = lizardSVG(); row.appendChild(liz);
      var stem = api.el('button', 'lfc-stem'); stem.type = 'button'; stem.setAttribute('aria-label', LANG === 'de' ? 'den ersten Fakt anhören' : 'hear the first fact');
      stem.textContent = v.stem;
      stem.addEventListener('click', function () { speak(v.stem); });
      row.appendChild(stem);
      root.appendChild(row);

      var q = api.el('div', 'lfc-q'); q.textContent = v.question; root.appendChild(q);

      var opts = api.el('div', 'lfc-opts');
      this._cards.forEach(function (o) {
        var b = api.el('button', 'lfc-opt' + (self.sel === o.id ? ' lfc-sel' : '')); b.type = 'button';
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
      fetch('/mini-tools/linc-fact-chain-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var pool = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(pool.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[linc-fact-chain] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.lfc-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,540px);margin:0 auto;}'
        + '.lfc-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(9px,2.2vw,14px);background:linear-gradient(180deg,#FBF3E4,#EBF2E6);border-radius:20px;padding:clamp(10px,2.4vw,16px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(100,150,80,.1);}'
        + '.lfc-row{display:flex;align-items:center;gap:clamp(7px,2vw,12px);justify-content:center;width:100%;}'
        + '.lfc-liz{width:clamp(46px,10vw,60px);flex:0 0 auto;}.lfc-liz-svg{width:100%;height:auto;display:block;}'
        + '.lfc-stem{flex:1 1 auto;max-width:360px;text-align:left;background:#fff;border:2px solid rgba(94,158,78,.32);border-left:6px solid ' + C.GREEN + ';border-radius:8px;padding:10px 13px;font:800 clamp(14px,3.5vw,17px)/1.3 "Baloo 2",sans-serif;color:' + C.INK + ';cursor:pointer;box-shadow:0 2px 0 rgba(100,150,80,.14);}'
        + '.lfc-q{text-align:center;font:800 clamp(13.5px,3.5vw,17px)/1.2 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        + '.lfc-opts{display:flex;flex-direction:column;gap:clamp(8px,2vw,11px);align-items:stretch;width:100%;max-width:340px;}'
        + '.lfc-opt{min-height:48px;padding:11px 15px;border-radius:13px;border:2px solid rgba(20,107,94,.24);background:#FFFDF8;color:' + C.INK + ';font:700 clamp(14px,3.7vw,17px)/1.2 "Nunito",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(120,130,90,.16);touch-action:manipulation;text-align:center;}'
        + '.lfc-opt.lfc-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;color:' + C.CORAL2 + ';transform:translateY(-2px);}'
        + '.lfc-opt:active{transform:translateY(1px);}'
        + '.lfc-stem:focus-visible,.lfc-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.lfc-root{gap:clamp(7px,1.7vw,11px);}.lfc-liz{width:clamp(40px,8vw,50px);}.lfc-opt{min-height:46px;}}'
        + '@media (max-height:700px){.lfc-root{gap:7px;padding:11px;}.lfc-liz{width:clamp(38px,7vw,44px);}.lfc-stem{font-size:14px;padding:8px 11px;}.lfc-q{font-size:14px;}.lfc-opt{min-height:44px;padding:9px 13px;font-size:14.5px;}}'
        + '@media (max-height:640px){.lfc-root{gap:6px;padding:9px;}.lfc-stem{font-size:13px;}.lfc-q{font-size:13px;}.lfc-opt{min-height:42px;font-size:14px;}}'
        + '@media (max-width:380px){.lfc-opt{font-size:14px;}.lfc-stem{font-size:13.5px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-linc-fact-chain', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'linc-fact-chain.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
