/* =====================================================================
   VERA'S VERB MATCH — ACTIVITY  (vera-verb-match-activity.js)
   ---------------------------------------------------------------------
   CCSS L.1.1.c — subject–verb agreement. Vera the vole matches the verb to its
   subject; the child reads a sentence and taps the be-verb (am/is/are) that
   agrees. Validity DERIVED by be-agreement-core.js (the card === the correct
   form). answerType:'state' tap-a-card + shell Check; cards shuffle; the
   selected card fills the blank. Text + SVG art only — no image-library, no
   audio dependency. No timer/score/streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.BeAgreementCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', PLUM: '#9B6FB0' };
  var LANG = 'en';
  var FORMS_DE = ['bin', 'ist', 'sind'];
  function vvmForms() { return LANG === 'de' ? FORMS_DE : Core.FORMS; }
  function vvmGrade(round, id) { return vvmForms()[id] === round.correct; }

  function speak(text) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: LANG, rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = 0.95; u.lang = LANG === 'de' ? 'de-DE' : 'en-US'; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function voleSVG() {
    return '<svg class="vvm-vole-svg" viewBox="0 0 100 100" role="img" aria-label="Vera the vole">' +
      '<ellipse cx="50" cy="62" rx="24" ry="20" fill="#9C8472"/>' +                /* body */
      '<circle cx="50" cy="38" r="16" fill="#B49C88"/>' +                          /* head */
      '<circle cx="40" cy="28" r="6" fill="#B49C88"/><circle cx="60" cy="28" r="6" fill="#B49C88"/>' + /* ears */
      '<circle cx="44" cy="37" r="2.3" fill="#2A2A35"/><circle cx="56" cy="37" r="2.3" fill="#2A2A35"/>' +
      '<ellipse cx="50" cy="44" rx="4" ry="3" fill="#5E4A3C"/>' +                  /* nose */
      '<path d="M50 47 v5" stroke="#5E4A3C" stroke-width="1.6"/>' +
      '<path d="M30 74 l-4 6 M44 78 l-2 6" stroke="#9C8472" stroke-width="5" stroke-linecap="round"/>' +
      '</svg>';
  }

  global.VeraVerbMatchActivity = {
    id: 'vera-verb-match-activity',

    strings: {
      title: { en: "Vera's Verb Match", de: 'Veras Verb-Werkstatt' },
      instruction: { en: 'Tap am, is, or are to match the subject.', de: 'Tippe die richtige Form: bin, ist oder sind.' },
      prompt: { en: 'Tap the verb that matches the subject.', de: 'Welche Form passt in den Satz?' },
      veraIntro: { en: 'AM goes with I, IS with one, ARE with many!', de: 'Merke: „bin" bei ich, „ist" bei einem, „sind" bei vielen!' },
      hintPick: { en: 'Is the subject I, one, or many? Pick am, is, or are.', de: 'Tippe zuerst auf bin, ist oder sind.' },
      hintWrong: { en: 'Read the subject again — I → am, one → is, many → are.', de: 'Schau aufs Subjekt: einer oder viele? Probier es noch einmal!' },
      win: { en: 'Yes! The verb matches the subject. 🌿', de: 'Super gemacht! Alle Sätze sind richtig. 🌿' }
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
      if (LANG === 'de') this.view.choices = FORMS_DE.map(function (f, i) { return { id: i, word: f }; });
      this._cards = shuffle(this.view.choices.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'vvm-wrap'); var root = api.el('div', 'vvm-root');
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;
      var selWord = null; if (self.sel != null) { for (var i = 0; i < v.choices.length; i++) { if (v.choices[i].id === self.sel) selWord = v.choices[i].word; } }

      var row = api.el('div', 'vvm-row');
      var vole = api.el('div', 'vvm-vole'); vole.innerHTML = voleSVG(); row.appendChild(vole);
      var say = api.el('div', 'vvm-say'); say.textContent = api.t('veraIntro'); row.appendChild(say);
      root.appendChild(row);

      var sent = api.el('div', 'vvm-sent');
      var b = api.el('span', 'vvm-txt'); b.textContent = v.before + ' '; sent.appendChild(b);
      var blank = api.el('span', 'vvm-blank' + (selWord ? ' vvm-filled' : '')); blank.textContent = selWord || '___'; sent.appendChild(blank);
      var a = api.el('span', 'vvm-txt'); a.textContent = ' ' + v.after; sent.appendChild(a);
      root.appendChild(sent);

      var opts = api.el('div', 'vvm-opts');
      this._cards.forEach(function (o) {
        var btn = api.el('button', 'vvm-opt' + (self.sel === o.id ? ' vvm-sel' : '')); btn.type = 'button';
        btn.setAttribute('data-id', o.id); btn.setAttribute('aria-label', o.word);
        btn.textContent = o.word;
        btn.addEventListener('click', function () { self._tap(o.id, o.word); });
        opts.appendChild(btn);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
    },

    _tap: function (id, word) {
      if (this.sel === id) { this.sel = null; this.render(); return; }
      this.sel = id; this.api.sound && this.api.sound(560); speak(word); this.render();
    },

    isCorrect: function () { return vvmGrade(this.round, this.sel); },
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
      fetch('/mini-tools/vera-verb-match-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[vera-verb-match] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.vvm-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,520px);margin:0 auto;}'
        + '.vvm-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(10px,2.4vw,16px);background:linear-gradient(180deg,#FBF3E4,#F1ECF4);border-radius:20px;padding:clamp(11px,2.6vw,18px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(120,100,150,.1);}'
        + '.vvm-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.vvm-vole{width:clamp(44px,9.5vw,58px);flex:0 0 auto;}.vvm-vole-svg{width:100%;height:auto;display:block;}'
        + '.vvm-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.1vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:74%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.vvm-sent{text-align:center;background:#fff;border:2px dashed rgba(155,111,176,.32);border-radius:13px;padding:clamp(10px,2.6vw,16px);font:700 clamp(15px,4vw,20px)/1.4 "Nunito",sans-serif;color:' + C.INK + ';max-width:94%;}'
        + '.vvm-blank{display:inline-block;min-width:48px;text-align:center;font:800 clamp(15px,4vw,20px)/1 "Baloo 2",sans-serif;color:' + C.PLUM + ';border-bottom:3px solid rgba(155,111,176,.5);padding:0 4px;}'
        + '.vvm-blank.vvm-filled{color:' + C.CORAL2 + ';border-bottom-color:' + C.CORAL + ';}'
        + '.vvm-opts{display:flex;flex-wrap:wrap;gap:clamp(8px,2.4vw,12px);justify-content:center;}'
        + '.vvm-opt{min-width:clamp(74px,22vw,104px);min-height:54px;padding:11px 18px;border-radius:14px;border:2px solid rgba(20,107,94,.24);background:#FFFDF8;color:' + C.INK + ';font:800 clamp(18px,4.8vw,23px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(130,110,150,.16);touch-action:manipulation;}'
        + '.vvm-opt.vvm-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;color:' + C.CORAL2 + ';transform:translateY(-2px);}'
        + '.vvm-opt:active{transform:translateY(1px);}'
        + '.vvm-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.vvm-root{gap:clamp(7px,1.7vw,12px);}.vvm-vole{width:clamp(40px,8vw,50px);}.vvm-opt{min-height:50px;}}'
        + '@media (max-height:700px){.vvm-root{gap:8px;padding:12px;}.vvm-row{display:none;}.vvm-sent{font-size:17px;padding:11px;}.vvm-blank{font-size:17px;}.vvm-opt{min-height:48px;padding:9px 15px;font-size:19px;}}'
        + '@media (max-height:640px){.vvm-root{gap:7px;padding:10px;}.vvm-sent{font-size:16px;}.vvm-opt{min-height:46px;font-size:18px;}}'
        + '@media (max-width:380px){.vvm-opt{min-width:70px;font-size:18px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-vera-verb-match', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'vera-verb-match.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return vvmGrade(round, tool.sel); },
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
