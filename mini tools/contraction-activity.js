/* =====================================================================
   NIB'S APOSTROPHE SEAT — ACTIVITY SKIN  (contraction-activity.js)
   ---------------------------------------------------------------------
   L.2.2.c · contractions — CLARITY-FIRST redesign of #77. The lcs-shell skin
   over contraction-core.js. answerType:'state'. EN-ONLY-by-design (non-EN 404).

   Nib the apostrophe-spirit stands in the empty seat a dropped letter leaves.
   Each round shows two words (e.g. do + not) + Nib; the child taps one of three
   contraction chips — the correctly-written one (don't), a misplaced apostrophe
   (do'nt), and no apostrophe (dont). Correct = the chip string === the core's
   derived correct contraction, DERIVED not stored. Correct → the contraction +
   a memorial note show + Nib glows (resolve; shell Check hidden until
   `.lcs-app.nib-resolved`). Wrong → a warm nudge, no advance. 0 lines to any
   core / lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.ContractionCore;
  var LANG = 'en';   // content locale; set in init from api.lang (de fan-out §A.13.54)

  var L = {
    en: {
      q: 'Put the words together — which contraction is right?',
      win: 'Yes! {note}', winNote: 'The apostrophe stands right where the missing letters were!',
      hear: '🔊 Hear it',
      nudge: 'The apostrophe stands EXACTLY where the missing letters were — look for that spot!'
    },
    de: {
      q: 'Setze die Wörter zusammen – welche Kurzform ist richtig?',
      win: 'Genau! {note}', winNote: 'Aus zwei Wörtern wird ein kurzes Wort!',
      hear: '🔊 Anhören',
      nudge: 'Nicht ganz – welche Kurzform passt zu diesen zwei Wörtern?'
    },
    fr: {
      q: 'Mets les deux mots ensemble. Quelle écriture est correcte ?',
      win: 'Bravo ! {note}', winNote: "L'apostrophe remplace juste la lettre qui saute !",
      hear: '🔊 Écouter',
      nudge: "Presque ! Quand un petit mot rencontre une voyelle, sa lettre saute et l'apostrophe prend sa place. Essaie encore !"
    },
    es: {
      q: 'Junta las dos palabras: ¿cuál contracción es la correcta?',
      win: '¡Sí! {note}', winNote: '¡Dos palabras se juntan en una sola!',
      hear: '🔊 Escúchalo',
      nudge: 'Casi. Júntalas otra vez, ¡tú puedes!'
    }
  };
  /* Locales whose chips are the free [fusion, ...foils] pick (de Verschmelzung / fr élision / es al-del) — NOT the en apostrophe-insertion core path. */
  var FUSION_LANGS = { de: 1, fr: 1, es: 1 };
  function txt(k, a) { var s = (L[LANG] && L[LANG][k]) || L.en[k] || k; return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; }); }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  /* German PRÄPOSITION-ARTIKEL-VERSCHMELZUNG wrapper (activity-layer; 0 lines to contraction-core.js).
     The core's apostrophe chip/grade path is bypassed for de: chips = [fusion, ...foils]; correct = round.fusion. */
  function deChips(round) { return [round.fusion].concat(round.foils || []); }
  function deIsAnswer(round, str) { return str === round.fusion; }

  /* fr élision aria: l'ami & lami are homophonous /lami/, so a bare read wouldn't distinguish them.
     Name the structural mark: apostrophe / espace / (neither → "en un seul mot"). */
  function frAria(str) {
    if (String(str).indexOf("'") >= 0) return String(str).replace(/'/g, ' apostrophe ');
    if (String(str).indexOf(' ') >= 0) return String(str).replace(/ /g, ' espace ');
    return String(str) + ' en un seul mot';
  }

  function nibSVG() {
    /* Nib — a coral apostrophe-spirit (a comma-curl with a little face) */
    return '<svg class="ct-nib-svg" viewBox="0 0 40 50" width="34" height="42" aria-hidden="true">' +
      '<circle cx="20" cy="28" r="14" fill="#FBE0D2" opacity=".5"/>' +   /* halo */
      '<path d="M14 26 q3 13 -5 20 q13 -3 16 -17z" fill="#F2784B" stroke="#C2410C" stroke-width="1.5"/>' +   /* curl tail */
      '<circle cx="21" cy="17" r="11.5" fill="#F2784B" stroke="#C2410C" stroke-width="1.8"/>' +
      '<g class="ct-eyes-open"><circle cx="17" cy="16" r="2" fill="#fff"/><circle cx="17" cy="16" r="1.1" fill="#5A2410"/><circle cx="25" cy="16" r="2" fill="#fff"/><circle cx="25" cy="16" r="1.1" fill="#5A2410"/></g>' +
      '<g class="ct-eyes-happy"><path d="M14.5 16 q2.5 -2.5 5 0" stroke="#fff" stroke-width="1.9" fill="none" stroke-linecap="round"/><path d="M22.5 16 q2.5 -2.5 5 0" stroke="#fff" stroke-width="1.9" fill="none" stroke-linecap="round"/></g>' +
      '<path d="M17 21 q4 3 8 0" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>';
  }

  var ContractionActivity = {
    id: 'contraction-activity',
    strings: {
      title: { en: "Nib's Apostrophe Seat", de: 'Zwirbels Kurzform-Wirbel', fr: 'La place de Nib', es: 'Rulo junta las palabras' },
      instruction: { en: 'Pick the contraction with the apostrophe in exactly the right spot!', de: 'Tippe die richtige Kurzform an!', fr: "Tape le mot où l'apostrophe est à la bonne place !", es: 'Une las dos palabras y toca la contracción bien escrita.' },
      q: { en: '{q}', de: '{q}', fr: '{q}', es: '{q}' }
    },

    init: function (api) {
      this._api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = []; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._finds = 0; this._round = null; this._resolved = false; this._token = 0;
      this._nonConf = {}; this._lit = null; this._chipOrder = null;
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('ct-style')) return;
      var s = el('style'); s.id = 'ct-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.ct-root{display:flex;flex-direction:column;align-items:center;gap:11px;width:100%;max-width:min(96vw,620px);margin:0 auto;}',
        '.ct-words{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;font:800 clamp(1.15rem,4.6vw,1.55rem)/1.1 "Baloo 2",Nunito,system-ui,sans-serif;color:#2A3A36;}',
        '.ct-plus{color:#C2410C;font-size:.85em;}',
        '.ct-arrow{color:#9a8a6a;font-size:.7em;}',
        '.ct-result{min-height:1.2em;font:800 clamp(1.2rem,5vw,1.7rem)/1.1 "Baloo 2",Nunito,sans-serif;color:#C2410C;}',
        '.ct-say{display:flex;align-items:center;gap:8px;width:100%;}',
        '.ct-nib{flex:0 0 auto;}',
        '.ct-line-msg{flex:1 1 auto;min-height:1.1em;text-align:center;font:700 .88rem/1.22 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.ct-line-msg.miss{color:#C2410C;}',
        '.ct-hear{align-self:center;border:2px solid #146B5E;border-radius:999px;background:#fff;color:#146B5E;font:700 .82rem/1 Nunito,sans-serif;padding:6px 16px;min-height:44px;cursor:pointer;}',
        '.ct-strip{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;width:100%;}',
        '.ct-cand{display:flex;align-items:center;justify-content:center;text-align:center;padding:12px 20px;border:3px solid #146B5E;border-radius:14px;background:#fff;cursor:pointer;min-height:52px;min-width:104px;font:800 clamp(1.05rem,4vw,1.28rem)/1.1 "Baloo 2",Nunito,system-ui,sans-serif;color:#0F4A40;letter-spacing:.5px;}',
        '.ct-cand.dim{opacity:.4;}',
        '.ct-cand.lit{box-shadow:0 0 0 3px #F2C14E;background:#FFFBEF;}',
        '.ct-nib-svg .ct-eyes-happy{display:none;}.ct-nib[data-pose=happy] .ct-eyes-open{display:none;}.ct-nib[data-pose=happy] .ct-eyes-happy{display:block;}',
        '.ct-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:380px){.ct-root{gap:6px;}.ct-words{font-size:1.08rem;}.ct-result{font-size:1.2rem;}.ct-cand{padding:9px 12px;min-width:86px;min-height:48px;}}',
        '.lcs-app:not(.nib-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'contraction.apostrophe.l-2-2-c';
      var tries = ['/mini-tools/contraction-activities.json', 'contraction-activities.json', '../mini tools/contraction-activities.json'];
      (function attempt(i) {
        if (i >= tries.length) return;
        fetch(tries[i]).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
          .then(function (rows) {
            var row = rows.find(function (x) { return x.id === id; }) || rows[0];
            self._activityRow = row;
            self._pool = (row && row.params && ((row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds)) || [];
            self._order = null; self._orderForPool = null; self._curPass = 0;
            if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
          }).catch(function () { attempt(i + 1); });
      }(0));
    },

    _shuffle: function (a) { for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(Math.random() * (k + 1)); var t = a[k]; a[k] = a[j]; a[j] = t; } return a; },
    _bandOrder: function (pool, prev) {
      var self = this, order = this._shuffle(pool.map(function (_, i) { return i; }));
      if (prev && order.length > 1) { var g = 0; while (order.join(',') === prev.join(',') && g++ < 12) order = self._shuffle(pool.map(function (_, i) { return i; })); }
      return order;
    },
    nextTask: function (ctx) {
      var pool = this._pool || []; if (!pool.length) return null;
      var n = pool.length, index = (ctx && ctx.index) || 0, pass = Math.floor(index / n);
      if (!this._order || this._orderForPool !== pool) { this._order = this._bandOrder(pool); this._orderForPool = pool; this._curPass = 0; }
      else if (pass > this._curPass) { this._order = this._bandOrder(pool, this._order); this._curPass = pass; }
      return this._makeTask(pool[this._order[index % n]]);
    },

    _makeTask: function (round) {
      return {
        id: round.id, promptKey: 'q', promptArgs: { q: txt('q') }, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1; this._nonConf = {}; this._lit = null;
      this._chipOrder = this._shuffle(FUSION_LANGS[LANG] ? deChips(round) : Core.chipStrings(round));   /* shuffle the 3 chips; position ≠ answer */
      if (this._app) this._app.classList.remove('nib-resolved');
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var root = el('div', 'ct-root');

      /* the two words (→ contraction on resolve) */
      var words = el('div', 'ct-words');
      var w1 = el('span'); w1.textContent = round.word1;
      var plus = el('span', 'ct-plus'); plus.textContent = '+';
      var w2 = el('span'); w2.textContent = round.word2;
      words.append(w1, plus, w2);
      if (this._resolved) { var ar = el('span', 'ct-arrow'); ar.textContent = '→'; var res = el('span', 'ct-result'); res.textContent = (FUSION_LANGS[LANG] ? round.fusion : Core.deriveCorrect(round)); words.append(ar, res); }
      root.appendChild(words);

      /* Nib + live line */
      var say = el('div', 'ct-say');
      var nb = el('div', 'ct-nib'); nb.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); nb.innerHTML = nibSVG();
      var msg = el('p', 'ct-line-msg'); msg.setAttribute('aria-live', 'polite');
      say.append(nb, msg); root.appendChild(say); this._nib = nb;

      /* Hear it */
      var self = this, hear = el('button', 'ct-hear'); hear.type = 'button'; hear.textContent = txt('hear');
      hear.addEventListener('click', function () {
        var t = (LANG === 'de' ? (round.word1 + ' ' + round.word2 + ' wird zu ' + round.fusion + '.')
          : LANG === 'fr' ? (round.word1 + ' ' + round.word2 + ' devient ' + round.fusion + '.')
          : LANG === 'es' ? (round.word1 + ' ' + round.word2 + ' nos da ' + round.fusion + '.')
          : (round.word1 + ' ' + round.word2 + ' makes a contraction.'));
        if (global.LCSAudio && global.LCSAudio.speak) { try { global.LCSAudio.speak({ type: 'ui', text: t, lang: LANG, rate: 0.92 }); } catch (e) { } }
      });
      root.appendChild(hear);

      this._renderChips(root, round);
      root.appendChild(this._srMirror(round));
      stage.appendChild(root);
    },

    _renderChips: function (root, round) {
      var self = this, tok = this._token;
      var strip = el('div', 'ct-strip');
      var order = this._chipOrder || (FUSION_LANGS[LANG] ? deChips(round) : Core.chipStrings(round));
      order.forEach(function (str) {
        var b = el('button', 'ct-cand' + (self._nonConf[str] ? ' dim' : '') + (self._lit === str ? ' lit' : ''));
        b.type = 'button'; b.setAttribute('data-str', str);
        b.textContent = str;
        /* en: spell out (apostrophe position is the point); de: the bare short form;
           fr: name the apostrophe/space/joined-ness (l'ami & lami are homophonous /lami/ — the WRITTEN mark is the point). */
        b.setAttribute('aria-label', LANG === 'fr' ? frAria(str) : (LANG === 'de' || LANG === 'es') ? str : str.split('').join(' '));
        b.addEventListener('click', function () {
          if (self._resolved || self._nonConf[str] || self._token !== tok) return;
          if (FUSION_LANGS[LANG] ? deIsAnswer(round, str) : Core.isAnswer(round, str)) { self._lit = str; self._resolve(); }
          else { self._nonConf[str] = 1; self._nudge(); }
        });
        strip.appendChild(b);
      });
      root.appendChild(strip);
    },

    _resolve: function () {
      this._resolved = true; this._finds += 1;
      if (this._app) this._app.classList.add('nib-resolved');
      this.render();
      var line = this._api.stage.querySelector('.ct-line-msg');
      if (line) { line.textContent = txt('win', { note: txt('winNote') }); line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(txt('win', { note: txt('winNote') }));
    },
    _nudge: function () {
      this._api.sound && this._api.sound(440);
      this.render();
      var line = this._api.stage.querySelector('.ct-line-msg');
      if (line) { line.textContent = txt('nudge'); line.classList.add('miss'); }
      this._api.announce && this._api.announce(txt('nudge'));
    },

    _srMirror: function (round) {
      var wrap = el('div', 'ct-sronly'); wrap.setAttribute('aria-live', 'polite');
      if (LANG === 'fr') {
        var frC = deChips(round).map(frAria).join(' ; ');
        wrap.innerHTML = '<p>' + round.word1 + ' ' + round.word2 + '. ' + txt('q') + ' Au choix : ' + frC + '.</p>';
        return wrap;
      }
      if (LANG === 'de') {
        var deC = deChips(round).join('; ');
        wrap.innerHTML = '<p>' + round.word1 + ' ' + round.word2 + '. ' + txt('q') + ' Zur Auswahl: ' + deC + '.</p>';
        return wrap;
      }
      if (LANG === 'es') {
        var esC = deChips(round).join('; ');
        wrap.innerHTML = '<p>' + round.word1 + ' ' + round.word2 + '. ' + txt('q') + ' Opciones: ' + esC + '.</p>';
        return wrap;
      }
      var chips = Core.chipStrings(round).map(function (s) { return s.split('').join(' '); }).join('; ');
      wrap.innerHTML = '<p>' + round.word1 + ' plus ' + round.word2 + '. ' + txt('q') + ' Choices spelled out: ' + chips + '.</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.ContractionActivity = ContractionActivity;

}(typeof window !== 'undefined' ? window : this));
