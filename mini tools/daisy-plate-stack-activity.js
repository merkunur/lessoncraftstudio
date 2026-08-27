/* =====================================================================
   DAISY'S PLATE STACK — ACTIVITY  (daisy-plate-stack-activity.js)
   ---------------------------------------------------------------------
   CCSS L.K.1.c — regular plural nouns. Daisy plates up the orders; the child
   reads a request for more-than-one and taps the correctly-spelled plural.
   Validity DERIVED by plural-noun-core.js (the /s/-or-/es/ rule; never a
   stored literal; no-answer-leak). answerType:'state' → tap a chip, shell
   Check grades; a wrong tap gives a DIFFUSE nudge. Per-pass reshuffle + the 3
   chips shuffle per render (no position cue). Text + SVG char stub (CA5 later).
   No timer/score/streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.PluralNounCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOOD: '#2FA56A', GOLD: '#E8A53A' };
  var LANG = 'en';

  function speak(text, rate) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: (LANG === 'pt') ? 'pt-BR' : LANG, rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = rate || 0.95; u.lang = (LANG === 'de') ? 'de-DE' : (LANG === 'fr') ? 'fr-FR' : (LANG === 'pt') ? 'pt-BR' : (LANG === 'it') ? 'it-IT' : 'en-US'; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function sayable(s) { return String(s || '').replace(/___/g, LANG === 'de' ? 'mehr als eins' : LANG === 'fr' ? 'plusieurs' : LANG === 'it' ? 'cose' : 'more than one'); }

  function duckSVG(mood) {
    var happy = mood === 'happy';
    var eye = happy ? '<path d="M55 40 q3 -3 6 0" stroke="#2A2A35" stroke-width="2.2" fill="none" stroke-linecap="round"/>' : '<circle cx="58" cy="41" r="2.6" fill="#2A2A35"/>';
    return '<svg class="dps-duck-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'fr' ? 'Marguerite la cane' : LANG === 'pt' ? 'Margarida, a pata' : LANG === 'it' ? 'Margherita la papera' : 'Daisy the duck') + '">' +
      '<ellipse cx="44" cy="60" rx="25" ry="20" fill="#F4D35E"/>' +              /* body */
      '<ellipse cx="44" cy="66" rx="16" ry="11" fill="#FBE7A8"/>' +             /* belly */
      '<circle cx="56" cy="42" r="13" fill="#F6DA6E"/>' +                        /* head */
      eye +
      '<path d="M66 40 q14 2 0 9 q-6 -1 -6 -4 Z" fill="#F2784B"/>' +             /* bill */
      '<path d="M20 56 q-9 -4 -3 8 q7 0 11 -5 Z" fill="#E7C24E"/>' +            /* wing/tail */
      '</svg>';
  }

  global.DaisyPlateStackActivity = {
    id: 'daisy-plate-stack-activity',

    strings: {
      title: { en: "Daisy's Plate Stack", de: "Ella die Ente", fr: 'Marguerite la cane', pt: 'Margarida, a pata', it: 'Margherita la papera' },
      prompt: { en: 'Which word means more than one?', de: "Welches Wort ist die Mehrzahl?", fr: 'Quel mot veut dire plusieurs ?', pt: 'Qual palavra quer dizer mais de um?', it: 'Quale parola vuol dire più di uno?' },
      duckIntro: { en: 'More than one, please! Which word is right?', de: "Mehr als eins, bitte! Welches Wort ist richtig?", fr: 'Plusieurs, s’il te plaît ! Quel mot est le bon ?', pt: 'Mais de um, por favor! Qual palavra está certa?', it: 'Più di uno, per favore! Quale parola è giusta?' },
      theAsk: { en: 'Tap the word that means more than one.', de: "Tippe das Wort für die Mehrzahl.", fr: 'Touche le mot qui veut dire plusieurs.', pt: 'Toque na palavra que quer dizer mais de um.', it: 'Tocca la parola che vuol dire più di uno.' },
      hintPick: { en: 'Tap the word that means more than one!', de: "Tippe die Mehrzahl an!", fr: 'Touche le mot au pluriel !', pt: 'Toque na palavra que quer dizer mais de um!', it: 'Tocca la parola che vuol dire più di uno!' },
      hintWrong: { en: "Not quite — does it add s or es? Read it again.", de: "Wir wollen mehr als eins. Welches Wort ist die Mehrzahl?", fr: 'Presque — il faut la marque du pluriel. Relis bien.', pt: 'Quase! Olhe bem como fica a terminação do plural. Leia de novo.', it: 'Quasi! Guarda bene come finisce il plurale. Rileggi.' },
      win: { en: 'Yes! That word means more than one. 🍽️', de: "Klasse! Genau die Mehrzahl — quak! 🦆", fr: 'Bravo ! C’est bien le pluriel. 🦆', pt: 'Isso! Essa palavra quer dizer mais de um. 🦆', it: 'Sì! Questa parola vuol dire più di uno. 🦆' }
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
      this.round = round;
      /* de rounds carry explicit {sentence, chips, answer} (German plural can't
         be rule-derived); en uses the core's +s/+es childView. */
      this.view = ((LANG === 'de' || LANG === 'fr' || LANG === 'pt' || LANG === 'it') && round.chips) ? { id: round.id, sentence: round.sentence, chips: round.chips.slice() } : Core.childView(round);
      this.sel = null; this._spoke = false;
      this._chips = shuffle(this.view.chips.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'dps-wrap'); var root = api.el('div', 'dps-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'dps-row');
      var duck = api.el('div', 'dps-duck'); duck.setAttribute('data-mood', this.sel ? 'happy' : 'idle'); duck.innerHTML = duckSVG(this.sel ? 'happy' : 'idle'); row.appendChild(duck);
      var say = api.el('div', 'dps-say'); say.textContent = api.t('duckIntro'); row.appendChild(say);
      root.appendChild(row);

      var sent = api.el('div', 'dps-sent');
      var txt = api.el('span', 'dps-senttxt'); txt.textContent = v.sentence; sent.appendChild(txt);
      var sp = api.el('button', 'dps-spk'); sp.type = 'button'; sp.setAttribute('aria-label', 'hear the order'); sp.textContent = '🔊';
      sp.addEventListener('click', function () { speak(sayable(v.sentence)); }); sent.appendChild(sp);
      root.appendChild(sent);

      var ask = api.el('div', 'dps-ask'); ask.textContent = api.t('theAsk'); root.appendChild(ask);

      var chips = api.el('div', 'dps-chips');
      this._chips.forEach(function (w) {
        var b = api.el('button', 'dps-chip' + (self.sel === w ? ' dps-sel' : '')); b.type = 'button'; b.setAttribute('data-w', w);
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

    isCorrect: function () { return this.sel != null && (((LANG === 'de' || LANG === 'fr' || LANG === 'it') && this.round.answer) ? (this.sel === this.round.answer) : Core.isAnswer(this.round, this.sel)); },
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
      fetch('/mini-tools/daisy-plate-stack-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(((row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds).map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[daisy-plate-stack] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.dps-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,520px);margin:0 auto;}'
        + '.dps-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:stretch;gap:clamp(5px,1.4vw,9px);background:linear-gradient(180deg,#FBF3E4,#EDE6DA);border-radius:20px;padding:clamp(7px,1.7vw,12px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(160,120,60,.08);}'
        + '.dps-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.dps-duck{width:clamp(44px,10vw,56px);flex:0 0 auto;}.dps-duck-svg{width:100%;height:auto;display:block;}'
        + '.dps-say{background:#fff;border:2px solid rgba(160,120,60,.22);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.1vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:78%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.dps-sent{display:flex;align-items:center;gap:8px;background:#FFFDF6;border:2px solid ' + C.GOLD + ';border-radius:13px;padding:9px 13px;}'
        + '.dps-senttxt{flex:1;min-width:0;font:700 clamp(15px,3.8vw,19px)/1.3 "Nunito",sans-serif;color:' + C.INK + ';}'
        + '.dps-spk{flex:0 0 auto;width:34px;height:34px;border-radius:10px;border:0;background:#EAF2EE;font-size:17px;cursor:pointer;touch-action:manipulation;}'
        + '.dps-ask{text-align:center;font:800 clamp(11.5px,2.9vw,13.5px)/1.2 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        + '.dps-chips{display:flex;flex-wrap:wrap;gap:clamp(8px,2.2vw,12px);justify-content:center;}'
        + '.dps-chip{min-height:50px;padding:11px 18px;border-radius:14px;border:2px solid rgba(20,107,94,.28);background:#fff;color:' + C.T + ';font:800 clamp(16px,4.4vw,21px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.dps-chip.dps-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;color:' + C.CORAL2 + ';transform:translateY(-2px);}'
        + '.dps-chip:active{transform:translateY(1px);}'
        + '.dps-spk:focus-visible,.dps-chip:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.dps-root{gap:clamp(4px,1.1vw,7px);}.dps-duck{width:clamp(42px,8vw,50px);}}'
        + '@media (max-height:700px){.dps-root{gap:4px;}.dps-duck{width:clamp(38px,7vw,46px);}.dps-sent{padding:7px 11px;}.dps-senttxt{font-size:16px;}.dps-chip{min-height:48px;padding:9px 15px;font-size:18px;}}'
        + '@media (max-height:640px){.dps-root{gap:3px;padding:6px;}.dps-row{display:none;}.dps-sent{padding:6px 10px;}.dps-senttxt{font-size:15px;}.dps-chip{min-height:46px;padding:8px 14px;font-size:17px;}}'
        + '@media (max-width:380px){.dps-root{gap:4px;padding:7px;}.dps-senttxt{font-size:15px;}.dps-chip{font-size:17px;padding:9px 14px;}}'
        + '@media (prefers-reduced-motion: reduce){.dps-chip{transition:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-daisy-plate-stack', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'daisy-plate-stack.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
