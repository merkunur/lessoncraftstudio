/* =====================================================================
   WREN'S QUESTION WINDOW — ACTIVITY  (wren-question-window-activity.js)
   ---------------------------------------------------------------------
   CCSS L.K.1.d — question words. Wren takes orders at the diner window; the
   child reads a question with a "___" and taps the wh-word that fits.
   Validity DERIVED by question-word-core.js (QWORD_TABLE; never a stored
   literal; no-answer-leak). answerType:'state' → tap a chip, shell Check
   grades; a wrong tap gives a DIFFUSE nudge. Per-pass reshuffle + the 6 chips
   shuffle per render (no position cue). Text + SVG char stub (CA5 later). No
   timer/score/streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.QuestionWordCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOOD: '#2FA56A', GOLD: '#E8A53A' };
  var LANG = 'en';
  /* German Fragewörter (0 lines to question-word-core.js). Capitalized — the
     Fragewort is sentence-initial (Satzanfang → Großschreibung). */
  var QWORD_DE = { person: 'Wer', thing: 'Was', place: 'Wo', time: 'Wann', reason: 'Warum', manner: 'Wie' };
  var CHIPS_DE = ['Wer', 'Was', 'Wo', 'Wann', 'Warum', 'Wie'];
  /* French mots interrogatifs (0 lines to question-word-core.js). Capitalized —
     sentence-initial. Chips drop in as canonical un-elided forms. */
  var QWORD_FR = { person: 'Qui', thing: 'Que', place: 'Où', time: 'Quand', reason: 'Pourquoi', manner: 'Comment' };
  var CHIPS_FR = ['Qui', 'Que', 'Où', 'Quand', 'Pourquoi', 'Comment'];
  /* Per-locale maps (en falls to the English core). Behaviour-identical to the
     prior LANG==='de' ternary for en/de. */
  var QWORD_L10N = { de: QWORD_DE, fr: QWORD_FR };
  var CHIPS_L10N = { de: CHIPS_DE, fr: CHIPS_FR };
  function wqOracle(round) { var m = QWORD_L10N[LANG]; return m ? (m[round.asks] || '') : Core.oracle(round); }
  function wqChips() { var c = CHIPS_L10N[LANG]; return c ? c.slice() : Core.chips(); }
  function wqIsAnswer(round, str) { return str === wqOracle(round); }

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text, rate) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: LANG, rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = rate || 0.95; u.lang = LANG === 'de' ? 'de-DE' : LANG === 'fr' ? 'fr-FR' : 'en-US'; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function sayable(s) { return String(s || '').replace(/___/g, LANG === 'de' ? 'Lücke' : LANG === 'fr' ? 'trou' : 'blank'); }

  function wrenSVG(mood) {
    var happy = mood === 'happy';
    var eye = happy ? '<path d="M53 44 q3 -3 6 0" stroke="#2A2A35" stroke-width="2.2" fill="none" stroke-linecap="round"/>' : '<circle cx="56" cy="45" r="2.6" fill="#2A2A35"/>';
    return '<svg class="wqw-wren-svg" viewBox="0 0 100 100" role="img" aria-label="Wren the wren">' +
      '<ellipse cx="46" cy="56" rx="24" ry="22" fill="#A9763F"/>' +              /* body */
      '<ellipse cx="46" cy="64" rx="15" ry="12" fill="#E2C39A"/>' +             /* belly */
      '<circle cx="56" cy="44" r="12" fill="#B98850"/>' +                        /* head */
      eye +
      '<path d="M66 45 L78 47 L66 50 Z" fill="#F2A03B"/>' +                       /* beak */
      '<path d="M22 50 q-10 -6 -4 10 q8 0 12 -6 Z" fill="#8A5F30"/>' +           /* cocked tail */
      '</svg>';
  }

  global.WrenQuestionWindowActivity = {
    id: 'wren-question-window-activity',

    strings: {
      title: { en: "Wren's Question Window", de: 'Wrens Fragefenster', fr: 'Wren au guichet des questions' },
      prompt: { en: 'Which question word fits?', de: 'Welches Fragewort passt?', fr: 'Quel petit mot pose la question ?' },
      wrenIntro: { en: 'Help me ask it! Which question word fits?', de: 'Hallo, ich bin Wren! Jede Bestellung beginnt mit einer guten Frage.', fr: '🐦 Aide-moi à poser ma question !' },
      theAsk: { en: 'Which word fills the blank?', de: 'Welches Fragewort passt in die Lücke?', fr: 'Touche le mot qui va dans le trou.' },
      hintPick: { en: 'Tap the question word that fits!', de: 'Tippe ein Fragewort an: Wer, Was, Wo, Wann, Warum oder Wie.', fr: 'Quel mot ? Qui, Que, Où, Quand, Pourquoi ou Comment ?' },
      hintWrong: { en: "That word doesn't fit — read the question again.", de: 'Fast! Überlege: Fragt der Satz nach einer Person, einem Ding, einem Ort, einer Zeit oder einem Grund? Versuch es noch einmal.', fr: 'La question parle d’une personne, d’une chose, d’un lieu, d’un moment, d’une raison ou d’une manière ? Regarde encore !' },
      win: { en: 'Yes! That is the right question word. ❓', de: 'Stark gefragt! Wren reicht dir dein Essen durch das Fenster. 🐦', fr: 'Bravo ! Ta question est parfaite ! 🐦' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this.sel = null; this._chips = null; this._spoke = false;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.view = Core.childView(round); this.sel = null; this._spoke = false;
      var _c = CHIPS_L10N[LANG]; if (_c) this.view.chips = _c.slice();
      this._chips = shuffle(this.view.chips.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'wqw-wrap'); var root = api.el('div', 'wqw-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'wqw-row');
      var bird = api.el('div', 'wqw-wren'); bird.setAttribute('data-mood', this.sel ? 'happy' : 'idle'); bird.innerHTML = wrenSVG(this.sel ? 'happy' : 'idle'); row.appendChild(bird);
      var say = api.el('div', 'wqw-say'); say.textContent = api.t('wrenIntro'); row.appendChild(say);
      root.appendChild(row);

      var sent = api.el('div', 'wqw-sent');
      var txt = api.el('span', 'wqw-senttxt'); txt.textContent = v.sentence; sent.appendChild(txt);
      var sp = api.el('button', 'wqw-spk'); sp.type = 'button'; sp.setAttribute('aria-label', LANG === 'de' ? 'Frage anhören' : LANG === 'fr' ? 'écouter la question' : 'hear the question'); sp.textContent = '🔊';
      sp.addEventListener('click', function () { speak(sayable(v.sentence)); }); sent.appendChild(sp);
      root.appendChild(sent);

      var ask = api.el('div', 'wqw-ask'); ask.textContent = api.t('theAsk'); root.appendChild(ask);

      var chips = api.el('div', 'wqw-chips');
      this._chips.forEach(function (w) {
        var b = api.el('button', 'wqw-chip' + (self.sel === w ? ' wqw-sel' : '')); b.type = 'button'; b.setAttribute('data-w', w);
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

    isCorrect: function () { return this.sel != null && wqIsAnswer(this.round, this.sel); },
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
      fetch('/mini-tools/wren-question-window-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[wren-question-window] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.wqw-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,540px);margin:0 auto;}'
        + '.wqw-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:stretch;gap:clamp(5px,1.4vw,9px);background:linear-gradient(180deg,#FBF3E4,#EDE6DA);border-radius:20px;padding:clamp(7px,1.7vw,12px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(160,120,60,.08);}'
        + '.wqw-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.wqw-wren{width:clamp(42px,9.5vw,54px);flex:0 0 auto;}.wqw-wren-svg{width:100%;height:auto;display:block;}'
        + '.wqw-say{background:#fff;border:2px solid rgba(160,120,60,.22);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.1vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:78%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.wqw-sent{display:flex;align-items:center;gap:8px;background:#FFFDF6;border:2px solid ' + C.GOLD + ';border-radius:13px;padding:9px 13px;}'
        + '.wqw-senttxt{flex:1;min-width:0;font:700 clamp(14px,3.6vw,18px)/1.3 "Nunito",sans-serif;color:' + C.INK + ';}'
        + '.wqw-spk{flex:0 0 auto;width:34px;height:34px;border-radius:10px;border:0;background:#EAF2EE;font-size:17px;cursor:pointer;touch-action:manipulation;}'
        + '.wqw-ask{text-align:center;font:800 clamp(11.5px,2.9vw,13.5px)/1.2 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        + '.wqw-chips{display:flex;flex-wrap:wrap;gap:clamp(6px,1.8vw,10px);justify-content:center;}'
        + '.wqw-chip{min-height:48px;padding:9px 15px;border-radius:14px;border:2px solid rgba(20,107,94,.28);background:#fff;color:' + C.T + ';font:800 clamp(15px,4vw,19px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.wqw-chip.wqw-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;color:' + C.CORAL2 + ';transform:translateY(-2px);}'
        + '.wqw-chip:active{transform:translateY(1px);}'
        + '.wqw-spk:focus-visible,.wqw-chip:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.wqw-root{gap:clamp(4px,1.1vw,7px);}.wqw-wren{width:clamp(40px,8vw,48px);}}'
        + '@media (max-height:700px){.wqw-root{gap:4px;}.wqw-wren{width:clamp(36px,7vw,44px);}.wqw-sent{padding:7px 11px;}.wqw-senttxt{font-size:15px;}.wqw-chip{min-height:46px;padding:8px 13px;font-size:16px;}}'
        + '@media (max-height:640px){.wqw-root{gap:3px;padding:6px;}.wqw-row{display:none;}.wqw-sent{padding:6px 10px;}.wqw-senttxt{font-size:14px;}.wqw-chip{min-height:44px;padding:7px 12px;font-size:15px;}}'
        + '@media (max-width:380px){.wqw-root{gap:4px;padding:7px;}.wqw-senttxt{font-size:14px;}.wqw-chip{font-size:16px;padding:8px 12px;}}'
        + '@media (prefers-reduced-motion: reduce){.wqw-chip{transition:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-wren-question-window', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'wren-question-window.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
