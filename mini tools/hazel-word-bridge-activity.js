/* =====================================================================
   HAZEL'S WORD BRIDGE — ACTIVITY  (hazel-word-bridge-activity.js)
   ---------------------------------------------------------------------
   CCSS L.1.1.g — conjunctions. Hazel the heron bridges two ideas; the child
   reads a two-clause sentence with a "___" and taps the joining word that
   fits. Validity DERIVED by conjunction-core.js (RELATION_CONJ; never a stored
   literal; no-answer-leak). answerType:'state' → tap a chip, shell Check
   grades; a wrong tap gives a DIFFUSE nudge. Per-pass reshuffle + the 4 chips
   shuffle per render (no position cue). Text + SVG char stub (CA5 later). No
   timer/score/streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.ConjunctionCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOOD: '#2FA56A', GOLD: '#E8A53A' };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text, rate) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: 'en', rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = rate || 0.95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function sayable(s) { return String(s || '').replace(/___/g, 'blank'); }

  function heronSVG(mood) {
    var happy = mood === 'happy';
    var eye = happy ? '<path d="M52 30 q3 -3 6 0" stroke="#2A2A35" stroke-width="2" fill="none" stroke-linecap="round"/>' : '<circle cx="55" cy="31" r="2.4" fill="#2A2A35"/>';
    return '<svg class="hwb-heron-svg" viewBox="0 0 100 100" role="img" aria-label="Hazel the heron">' +
      '<ellipse cx="42" cy="66" rx="24" ry="16" fill="#8AA6BD"/>' +              /* body */
      '<path d="M46 56 q4 -22 12 -28" stroke="#9DB6CA" stroke-width="9" fill="none" stroke-linecap="round"/>' +  /* neck */
      '<circle cx="56" cy="30" r="11" fill="#9DB6CA"/>' +                        /* head */
      eye +
      '<path d="M66 30 L86 33 L66 36 Z" fill="#F2A03B"/>' +                       /* long beak */
      '<path d="M40 82 L40 92 M50 82 L50 92" stroke="#C8A05A" stroke-width="3" stroke-linecap="round"/>' +   /* legs */
      '</svg>';
  }

  global.HazelWordBridgeActivity = {
    id: 'hazel-word-bridge-activity',

    strings: {
      title: { en: "Hazel's Word Bridge" },
      prompt: { en: 'Which joining word fits?' },
      hazelIntro: { en: 'A joining word bridges the two ideas!' },
      theAsk: { en: 'Which word joins the two parts?' },
      hintPick: { en: 'Tap the joining word that makes sense!' },
      hintWrong: { en: "That joining word doesn't fit — read it again." },
      win: { en: 'Yes! That word bridges the two ideas. 🌉' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this.sel = null; this._chips = null; this._spoke = false;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.view = Core.childView(round); this.sel = null; this._spoke = false;
      this._chips = shuffle(this.view.chips.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'hwb-wrap'); var root = api.el('div', 'hwb-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'hwb-row');
      var bird = api.el('div', 'hwb-heron'); bird.setAttribute('data-mood', this.sel ? 'happy' : 'idle'); bird.innerHTML = heronSVG(this.sel ? 'happy' : 'idle'); row.appendChild(bird);
      var say = api.el('div', 'hwb-say'); say.textContent = api.t('hazelIntro'); row.appendChild(say);
      root.appendChild(row);

      var sent = api.el('div', 'hwb-sent');
      var txt = api.el('span', 'hwb-senttxt'); txt.textContent = v.sentence; sent.appendChild(txt);
      var sp = api.el('button', 'hwb-spk'); sp.type = 'button'; sp.setAttribute('aria-label', 'hear the sentence'); sp.textContent = '🔊';
      sp.addEventListener('click', function () { speak(sayable(v.sentence)); }); sent.appendChild(sp);
      root.appendChild(sent);

      var ask = api.el('div', 'hwb-ask'); ask.textContent = api.t('theAsk'); root.appendChild(ask);

      var chips = api.el('div', 'hwb-chips');
      this._chips.forEach(function (w) {
        var b = api.el('button', 'hwb-chip' + (self.sel === w ? ' hwb-sel' : '')); b.type = 'button'; b.setAttribute('data-w', w);
        b.textContent = w; b.setAttribute('aria-label', w);
        b.addEventListener('click', function () { self._tap(w); });
        chips.appendChild(b);
      });
      root.appendChild(chips);

      wrap.appendChild(root); stage.appendChild(wrap);
      if (!this._spoke) { this._spoke = true; setTimeout(function () { speak(sayable(v.sentence)); }, 320); }
    },

    _tap: function (w) {
      if (this.sel === w) { this.sel = null; this.render(); return; }
      this.sel = w; this.api.sound && this.api.sound(540); speak(w); this.render();
    },

    isCorrect: function () { return this.sel != null && Core.isAnswer(this.round, this.sel); },
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
      fetch('/mini-tools/hazel-word-bridge-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[hazel-word-bridge] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.hwb-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,540px);margin:0 auto;}'
        + '.hwb-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:stretch;gap:clamp(5px,1.4vw,9px);background:linear-gradient(180deg,#FBF3E4,#E6EEF2);border-radius:20px;padding:clamp(7px,1.7vw,12px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        + '.hwb-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.hwb-heron{width:clamp(42px,9.5vw,54px);flex:0 0 auto;}.hwb-heron-svg{width:100%;height:auto;display:block;}'
        + '.hwb-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.1vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:78%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.hwb-sent{display:flex;align-items:center;gap:8px;background:#FFFDF6;border:2px solid ' + C.GOLD + ';border-radius:13px;padding:9px 13px;}'
        + '.hwb-senttxt{flex:1;min-width:0;font:700 clamp(14px,3.6vw,18px)/1.3 "Nunito",sans-serif;color:' + C.INK + ';}'
        + '.hwb-spk{flex:0 0 auto;width:34px;height:34px;border-radius:10px;border:0;background:#EAF2EE;font-size:17px;cursor:pointer;touch-action:manipulation;}'
        + '.hwb-ask{text-align:center;font:800 clamp(11.5px,2.9vw,13.5px)/1.2 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        + '.hwb-chips{display:flex;flex-wrap:wrap;gap:clamp(6px,1.8vw,10px);justify-content:center;}'
        + '.hwb-chip{min-height:48px;padding:9px 16px;border-radius:14px;border:2px solid rgba(20,107,94,.28);background:#fff;color:' + C.T + ';font:800 clamp(15px,4vw,19px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.hwb-chip.hwb-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;color:' + C.CORAL2 + ';transform:translateY(-2px);}'
        + '.hwb-chip:active{transform:translateY(1px);}'
        + '.hwb-spk:focus-visible,.hwb-chip:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.hwb-root{gap:clamp(4px,1.1vw,7px);}.hwb-heron{width:clamp(40px,8vw,48px);}}'
        + '@media (max-height:700px){.hwb-root{gap:4px;}.hwb-heron{width:clamp(36px,7vw,44px);}.hwb-sent{padding:7px 11px;}.hwb-senttxt{font-size:15px;}.hwb-chip{min-height:46px;padding:8px 14px;font-size:16px;}}'
        + '@media (max-height:640px){.hwb-root{gap:3px;padding:6px;}.hwb-row{display:none;}.hwb-sent{padding:6px 10px;}.hwb-senttxt{font-size:14px;}.hwb-chip{min-height:44px;padding:7px 12px;font-size:15px;}}'
        + '@media (max-width:380px){.hwb-root{gap:4px;padding:7px;}.hwb-senttxt{font-size:14px;}.hwb-chip{font-size:16px;padding:8px 13px;}}'
        + '@media (prefers-reduced-motion: reduce){.hwb-chip{transition:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-hazel-word-bridge', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'hazel-word-bridge.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return tool.isCorrect(); },
        hintKey: function (tool) { return tool.sel ? 'hintWrong' : 'hintPick'; }
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
