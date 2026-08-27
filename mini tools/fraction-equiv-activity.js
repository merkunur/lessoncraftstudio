/* =====================================================================
   CRUMB'S SAME-AMOUNT BAKERY — ACTIVITY SKIN  (fraction-equiv-activity.js)
   ---------------------------------------------------------------------
   3.NF.A.3 · equivalent fractions — CLARITY-FIRST redesign of #86. The lcs-shell
   skin over fraction-equiv-core.js. answerType:'state'. EN-ONLY-by-design (404).

   Crumb the mouse shows a REFERENCE fraction (numerals + a proportion-shaded
   bar). The child taps the candidate (of 3) whose bar is just as full — the
   SAME amount. Correct = the tapped candidate isEquivalent to ref, DERIVED not
   stored. Correct → the card glows + a "same amount, just more/fewer pieces!"
   note + Crumb happy (resolve; shell Check hidden until `.lcs-app.crumb-resolved`).
   Wrong → a warm nudge ("a little more/less — find the bar just as full"), no
   advance. 0 lines to any core / lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.FractionEquivCore;
  var C = { T: '#146B5E', BODY: '#EAF4F1', SH: '#F2784B', TX: '#0F4A40' };

  var LANG = 'en';
  var L = {
    en: {
      q: 'Which one is the same amount?',
      win: 'Yes! {ref} and {cand} — the same amount, just {dir} pieces!',
      winSame: 'Yes! {ref} and {cand} — the same amount, cut a different way!',
      hear: '🔊 Hear',
      nudge: 'Not quite — that bar is a little {rel}. Find the one just as full as {ref}.',
      more: 'more', fewer: 'fewer', less: 'less'
    },
    de: {
      q: 'Welcher Bruch zeigt gleich viel?',
      win: 'Ja! {ref} und {cand} — gleich viel, nur {dir} Stücke!',
      winSame: 'Ja! {ref} und {cand} — gleich viel, nur anders geteilt!',
      hear: '🔊 Hören',
      nudge: 'Nicht ganz — dieser Balken zeigt etwas {rel}. Finde den, der genauso voll ist wie {ref}.',
      more: 'mehr', fewer: 'weniger', less: 'weniger'
    },
    fr: {
      q: 'Quelle fraction montre la même quantité ?',
      win: 'Oui ! {ref} et {cand} — la même quantité, juste {dir} de morceaux !',
      winSame: 'Oui ! {ref} et {cand} — la même quantité, découpée autrement !',
      hear: '🔊 Écouter',
      nudge: 'Pas tout à fait — cette barre montre un peu {rel}. Trouve celle qui est aussi remplie que {ref}.',
      more: 'plus', fewer: 'moins', less: 'moins'
    },
    es: {
      q: '¿Qué fracción muestra la misma cantidad?',
      win: '¡Sí! {ref} y {cand} — la misma cantidad, solo que en {dir} pedazos.',
      winSame: '¡Sí! {ref} y {cand} — la misma cantidad, partida de otra forma.',
      hear: '🔊 Escuchar',
      nudge: 'Casi. Esa barra muestra un poco {rel}. Busca la que esté igual de llena que {ref}.',
      more: 'más', fewer: 'menos', less: 'menos'
    },
    pt: {
      q: 'Qual fração mostra a mesma quantidade?',
      win: 'Isso! {ref} e {cand} — a mesma quantidade, só que em {dir} pedaços.',
      winSame: 'Isso! {ref} e {cand} — a mesma quantidade, dividida de outro jeito.',
      hear: '🔊 Ouvir',
      nudge: 'Quase. Essa barra mostra um pouco {rel}. Procure a que está tão cheia quanto {ref}.',
      more: 'mais', fewer: 'menos', less: 'menos'
    },
    it: {
      q: 'Quale frazione mostra la stessa quantità?',
      win: 'Sì! {ref} e {cand} — la stessa quantità, solo con {dir} pezzi!',
      winSame: 'Sì! {ref} e {cand} — la stessa quantità, tagliata in un altro modo!',
      hear: '🔊 Ascolta',
      nudge: 'Quasi! Quella barra mostra un poco {rel}. Trova quella piena come {ref}.',
      more: 'più', fewer: 'meno', less: 'meno'
    }
  };
  function txt(k, a) { var s = (L[LANG] && L[LANG][k]) || L.en[k] || k; return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; }); }
  /* spoken German fraction word: "ein Halb", "zwei Viertel" (denoms 2/3/4/6/8) */
  var NUMCARD = { 1: 'ein', 2: 'zwei', 3: 'drei', 4: 'vier', 5: 'fünf', 6: 'sechs', 7: 'sieben' };
  var FRACNOUN = { 2: 'Halb', 3: 'Drittel', 4: 'Viertel', 5: 'Fünftel', 6: 'Sechstel', 8: 'Achtel' };
  function bruchwort(num, den) { return (NUMCARD[num] || num) + ' ' + (FRACNOUN[den] || (den + 'tel')); }
  /* spoken French fraction word: "un demi", "deux quarts", "trois huitièmes" (plural adds -s except invariable "tiers") */
  var NUMCARD_FR = { 1: 'un', 2: 'deux', 3: 'trois', 4: 'quatre', 5: 'cinq', 6: 'six', 7: 'sept' };
  var FRACNOUN_FR = { 2: 'demi', 3: 'tiers', 4: 'quart', 5: 'cinquième', 6: 'sixième', 8: 'huitième' };
  function bruchwortFr(num, den) {
    var word = FRACNOUN_FR[den] || (den + 'ième');
    if (num > 1 && word.charAt(word.length - 1) !== 's') word += 's';
    return (NUMCARD_FR[num] || num) + ' ' + word;
  }
  /* spoken Spanish fraction word: "un medio", "dos cuartos", "un tercio" (plural adds -s; denoms 2/3/4/6/8) */
  var NUMCARD_ES = { 1: 'un', 2: 'dos', 3: 'tres', 4: 'cuatro', 5: 'cinco', 6: 'seis', 7: 'siete' };
  var FRACNOUN_ES = { 2: 'medio', 3: 'tercio', 4: 'cuarto', 5: 'quinto', 6: 'sexto', 7: 'séptimo', 8: 'octavo' };
  function fraccionwort(num, den) {
    var word = FRACNOUN_ES[den] || (den + 'avo');
    if (num > 1) word += 's';
    return (NUMCARD_ES[num] || num) + ' ' + word;
  }
  /* spoken Brazilian-Portuguese fraction word: "um meio", "dois quartos", "um terço" (denoms 2/3/4/6/8;
     all fraction nouns are regular masculine -o → plural +s; masculine cardinals um/dois/três) */
  var NUMCARD_PT = { 1: 'um', 2: 'dois', 3: 'três', 4: 'quatro', 5: 'cinco', 6: 'seis', 7: 'sete' };
  var FRACNOUN_PT = { 2: 'meio', 3: 'terço', 4: 'quarto', 5: 'quinto', 6: 'sexto', 8: 'oitavo' };
  function bruchwortPt(num, den) {
    var word = FRACNOUN_PT[den] || (den + ' avos');
    if (num > 1) word += 's';
    return (NUMCARD_PT[num] || num) + ' ' + word;
  }
  /* spoken Italian fraction word: "un mezzo", "due terzi", "cinque ottavi" (denoms 2/3/4/5/6/8;
     ordinal masc -o → plural -i for num>1; 1 is "un" [no apostrophe before a vowel: "un ottavo"]). */
  var NUMCARD_IT = { 1: 'un', 2: 'due', 3: 'tre', 4: 'quattro', 5: 'cinque', 6: 'sei', 7: 'sette' };
  var FRACNOUN_IT = { 2: 'mezzo', 3: 'terzo', 4: 'quarto', 5: 'quinto', 6: 'sesto', 8: 'ottavo' };
  function bruchwortIt(num, den) {
    var word = FRACNOUN_IT[den] || (den + 'esimo');
    if (num > 1) word = word.replace(/o$/, 'i');
    return (NUMCARD_IT[num] || num) + ' ' + word;
  }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }
  function fracStr(f) { return f.num + '/' + f.den; }

  /* segmented proportion bar + stacked num/line/den numerals, all in ONE svg so
     the visual-qa "not-sparse / not-tiny" content bbox = this card-filling svg. */
  function candSVG(f) {
    var n = f.num, d = f.den, bx = 6, bw = 88, by = 6, bh = 40, seg = bw / d, parts = '';
    for (var i = 0; i < d; i++) {
      var x = bx + i * seg, fill = i < n ? C.SH : C.BODY;
      parts += '<rect x="' + x.toFixed(2) + '" y="' + by + '" width="' + seg.toFixed(2) + '" height="' + bh + '" fill="' + fill + '"/>';
      if (i > 0) parts += '<line x1="' + x.toFixed(2) + '" y1="' + by + '" x2="' + x.toFixed(2) + '" y2="' + (by + bh) + '" stroke="' + C.T + '" stroke-width="1"/>';
    }
    parts += '<rect x="' + bx + '" y="' + by + '" width="' + bw + '" height="' + bh + '" rx="5" fill="none" stroke="' + C.T + '" stroke-width="3"/>';
    var fy = 68;
    parts += '<text x="50" y="' + fy + '" text-anchor="middle" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="18" fill="' + C.TX + '">' + n + '</text>'
      + '<line x1="40" y1="' + (fy + 4) + '" x2="60" y2="' + (fy + 4) + '" stroke="' + C.TX + '" stroke-width="2.6"/>'
      + '<text x="50" y="' + (fy + 21) + '" text-anchor="middle" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="18" fill="' + C.TX + '">' + d + '</text>';
    return '<svg class="fe-cand-svg" viewBox="0 0 100 94" width="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' + parts + '</svg>';
  }

  /* the reference: fraction on the left + a wide proportion bar (not gate-measured) */
  function refSVG(f) {
    var n = f.num, d = f.den, bx = 60, bw = 154, by = 14, bh = 28, seg = bw / d, parts = '';
    parts += '<text x="26" y="26" text-anchor="middle" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="22" fill="' + C.TX + '">' + n + '</text>'
      + '<line x1="13" y1="31" x2="39" y2="31" stroke="' + C.TX + '" stroke-width="3"/>'
      + '<text x="26" y="50" text-anchor="middle" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="22" fill="' + C.TX + '">' + d + '</text>';
    for (var i = 0; i < d; i++) {
      var x = bx + i * seg, fill = i < n ? C.SH : C.BODY;
      parts += '<rect x="' + x.toFixed(2) + '" y="' + by + '" width="' + seg.toFixed(2) + '" height="' + bh + '" fill="' + fill + '"/>';
      if (i > 0) parts += '<line x1="' + x.toFixed(2) + '" y1="' + by + '" x2="' + x.toFixed(2) + '" y2="' + (by + bh) + '" stroke="' + C.T + '" stroke-width="1"/>';
    }
    parts += '<rect x="' + bx + '" y="' + by + '" width="' + bw + '" height="' + bh + '" rx="5" fill="none" stroke="' + C.T + '" stroke-width="3"/>';
    return '<svg class="fe-ref-svg" viewBox="0 0 220 58" width="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' + parts + '</svg>';
  }

  function crumbSVG() {
    /* Crumb — a tiny round bakery mouse (grey body, big ears, pink nose) */
    return '<svg class="fe-crumb-svg" viewBox="0 0 48 46" width="40" height="38" aria-hidden="true">' +
      '<circle cx="13" cy="14" r="7" fill="#C9CBD4" stroke="#8A8D9B" stroke-width="1.5"/>' +   /* left ear */
      '<circle cx="31" cy="14" r="7" fill="#C9CBD4" stroke="#8A8D9B" stroke-width="1.5"/>' +   /* right ear */
      '<circle cx="13" cy="14" r="3.4" fill="#F4C9D2"/><circle cx="31" cy="14" r="3.4" fill="#F4C9D2"/>' +
      '<ellipse cx="22" cy="28" rx="14" ry="13" fill="#D7D9E1" stroke="#8A8D9B" stroke-width="1.6"/>' +
      '<g class="fe-eyes-open"><circle cx="17" cy="26" r="2" fill="#2B2B2B"/><circle cx="27" cy="26" r="2" fill="#2B2B2B"/></g>' +
      '<g class="fe-eyes-happy"><path d="M15 26 q2 -2.4 4 0" stroke="#2B2B2B" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M25 26 q2 -2.4 4 0" stroke="#2B2B2B" stroke-width="1.7" fill="none" stroke-linecap="round"/></g>' +
      '<circle cx="22" cy="31" r="2.3" fill="#E8889A"/>' +   /* nose */
      '<path d="M22 33 v3 M22 35 q-4 1 -7 0 M22 35 q4 1 7 0" stroke="#8A8D9B" stroke-width="1" fill="none"/></svg>';   /* whiskers */
  }

  var FractionEquivActivity = {
    id: 'fraction-equiv-activity',
    strings: {
      title: { en: "Crumb's Same-Amount Bakery", de: "Krümels Gleich-viel-Bäckerei", fr: 'La boulangerie de Miette', es: 'La panadería de Migaja', pt: 'A padaria da Migalha', it: 'Il forno di Briciola' },
      instruction: { en: 'Find the fraction that shows the same amount as Crumb’s piece.', de: 'Finde den Bruch, der gleich viel zeigt wie Krümels Stück.', fr: 'Trouve la fraction qui montre la même quantité que la part de Miette.', es: 'Encuentra la fracción que muestra la misma cantidad que el pedazo de Migaja.', pt: 'Encontre a fração que mostra a mesma quantidade que o pedaço da Migalha.', it: 'Trova la frazione che mostra la stessa quantità del pezzo di Briciola.' },
      q: { en: '{q}', de: '{q}', fr: '{q}', es: '{q}', it: '{q}' }
    },

    init: function (api) {
      this._api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = []; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._round = null; this._resolved = false; this._token = 0;
      this._nonAns = {}; this._lit = -1; this._candOrder = null;
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('fe-style')) return;
      var s = el('style'); s.id = 'fe-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.fe-root{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;max-width:min(96vw,560px);margin:0 auto;}',
        '.fe-ref{width:100%;max-width:300px;background:#FFFDF6;border:3px solid #146B5E;border-radius:14px;padding:6px 12px;}',
        '.fe-ref-svg{display:block;}',
        '.fe-row{display:flex;gap:8px;width:100%;justify-content:center;}',
        '.fe-cand{flex:1 1 0;min-width:0;max-width:118px;background:#FFFDF6;border:3px solid #C9B98E;border-radius:14px;padding:7px 6px 5px;cursor:pointer;display:flex;align-items:center;justify-content:center;}',
        '.fe-cand-svg{display:block;}',
        '.fe-cand.dim{opacity:.4;}',
        '.fe-cand.lit{border-color:#F2784B;box-shadow:0 0 0 3px #F2C14E;background:#FFFBEF;}',
        '.fe-say{display:flex;align-items:center;gap:8px;width:100%;justify-content:center;}',
        '.fe-crumb{flex:0 0 auto;}',
        '.fe-msg{flex:1 1 auto;min-height:1.1em;text-align:center;font:700 .86rem/1.18 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;max-width:300px;}',
        '.fe-msg.miss{color:#C2410C;}',
        '.fe-hear{flex:0 0 auto;border:2px solid #146B5E;border-radius:999px;background:#fff;color:#146B5E;font:700 .8rem/1 Nunito,sans-serif;padding:7px 14px;min-height:44px;cursor:pointer;}',
        '.fe-crumb-svg .fe-eyes-happy{display:none;}.fe-crumb[data-pose=happy] .fe-eyes-open{display:none;}.fe-crumb[data-pose=happy] .fe-eyes-happy{display:block;}',
        '.fe-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:380px){.fe-root{gap:6px;}.fe-ref{padding:5px 10px;}.fe-row{gap:6px;}.fe-cand{padding:5px 4px 4px;}.fe-say{gap:6px;}}',
        '@media (max-width:340px){.fe-hear{display:none;}}',
        '.lcs-app:not(.crumb-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'fraction-equiv.same-amount.3-nf-a-3';
      var tries = ['/mini-tools/fraction-equiv-activities.json', 'fraction-equiv-activities.json', '../mini tools/fraction-equiv-activities.json'];
      (function attempt(i) {
        if (i >= tries.length) return;
        fetch(tries[i]).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
          .then(function (rows) {
            var row = rows.find(function (x) { return x.id === id; }) || rows[0];
            self._activityRow = row;
            self._pool = (row && row.params && row.params.rounds) || [];
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
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1; this._nonAns = {}; this._lit = -1;
      this._candOrder = this._shuffle((round.candidates || []).map(function (_, i) { return i; }));   /* shuffle display so equiv position ≠ answer */
      if (this._app) this._app.classList.remove('crumb-resolved');
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var self = this, tok = this._token;
      var root = el('div', 'fe-root');

      var ref = el('div', 'fe-ref'); ref.innerHTML = refSVG(round.ref); root.appendChild(ref);

      var row = el('div', 'fe-row');
      var order = this._candOrder || (round.candidates || []).map(function (_, i) { return i; });
      order.forEach(function (ci) {
        var f = round.candidates[ci];
        var b = el('button', 'fe-cand' + (self._nonAns[ci] ? ' dim' : '') + (self._lit === ci ? ' lit' : ''));
        b.type = 'button'; b.setAttribute('data-ci', ci);
        b.setAttribute('aria-label', LANG === 'de' ? (f.num + ' von ' + f.den) : LANG === 'fr' ? (f.num + ' sur ' + f.den) : LANG === 'es' ? (f.num + ' de ' + f.den) : LANG === 'it' ? (f.num + ' su ' + f.den) : (f.num + ' over ' + f.den));
        b.innerHTML = candSVG(f);
        b.addEventListener('click', function () {
          if (self._resolved || self._nonAns[ci] || self._token !== tok) return;
          if (Core.isAnswer(round, ci)) { self._lit = ci; self._resolve(ci); }
          else { self._nonAns[ci] = 1; self._nudge(round, ci); }
        });
        row.appendChild(b);
      });
      root.appendChild(row);

      /* Crumb + live msg + Hear in ONE compact footer row */
      var say = el('div', 'fe-say');
      var cr = el('div', 'fe-crumb'); cr.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); cr.innerHTML = crumbSVG();
      var msg = el('p', 'fe-msg'); msg.setAttribute('aria-live', 'polite');
      var hear = el('button', 'fe-hear'); hear.type = 'button'; hear.textContent = txt('hear');
      hear.addEventListener('click', function () {
        var t = (LANG === 'de')
          ? 'Krümel hat ' + bruchwort(round.ref.num, round.ref.den) + ' gebacken. ' + txt('q')
          : (LANG === 'fr')
          ? 'Miette a préparé ' + bruchwortFr(round.ref.num, round.ref.den) + '. ' + txt('q')
          : (LANG === 'es')
          ? 'Migaja preparó ' + fraccionwort(round.ref.num, round.ref.den) + '. ' + txt('q')
          : (LANG === 'pt')
          ? 'A Migalha preparou ' + bruchwortPt(round.ref.num, round.ref.den) + '. ' + txt('q')
          : (LANG === 'it')
          ? 'Briciola ha preparato ' + bruchwortIt(round.ref.num, round.ref.den) + '. ' + txt('q')
          : 'Crumb made ' + round.ref.num + ' out of ' + round.ref.den + '. ' + txt('q');
        if (global.LCSAudio && global.LCSAudio.speak) { try { global.LCSAudio.speak({ type: 'ui', text: t, lang: (LANG === 'pt' ? 'pt-BR' : LANG), rate: 0.92 }); } catch (e) { } }
      });
      say.append(cr, msg, hear); root.appendChild(say); this._crumb = cr;

      root.appendChild(this._srMirror(round));
      stage.appendChild(root);
    },

    _resolve: function (ci) {
      this._resolved = true;
      if (this._app) this._app.classList.add('crumb-resolved');
      var round = this._round, cand = round.candidates[ci];
      this.render();
      var line = this._api.stage.querySelector('.fe-msg');
      var note;
      if (cand.den === round.ref.den) note = txt('winSame', { ref: fracStr(round.ref), cand: fracStr(cand) });
      else note = txt('win', { ref: fracStr(round.ref), cand: fracStr(cand), dir: cand.den > round.ref.den ? txt('more') : txt('fewer') });
      if (line) { line.textContent = note; line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(note);
    },
    _nudge: function (round, ci) {
      var rel = Core.relation(round, ci);
      var msgText = txt('nudge', { rel: rel === 'more' ? txt('more') : txt('less'), ref: fracStr(round.ref) });
      this._api.sound && this._api.sound(440);
      this.render();
      var line = this._api.stage.querySelector('.fe-msg');
      if (line) { line.textContent = msgText; line.classList.add('miss'); }
      this._api.announce && this._api.announce(msgText);
    },

    _srMirror: function (round) {
      var wrap = el('div', 'fe-sronly'); wrap.setAttribute('aria-live', 'polite');
      var sep = LANG === 'de' ? ' von ' : LANG === 'fr' ? ' sur ' : LANG === 'es' ? ' de ' : LANG === 'pt' ? ' de ' : LANG === 'it' ? ' su ' : ' over ';
      var cs = (round.candidates || []).map(function (x) { return x.num + sep + x.den; }).join(', ');
      wrap.innerHTML = (LANG === 'de')
        ? '<p>Krümels Stück ist ' + round.ref.num + ' von ' + round.ref.den + '. ' + txt('q') + ' Die Auswahl: ' + cs + '.</p>'
        : (LANG === 'fr')
        ? '<p>Le morceau de Miette est ' + round.ref.num + ' sur ' + round.ref.den + '. ' + txt('q') + ' Les choix sont : ' + cs + '.</p>'
        : (LANG === 'es')
        ? '<p>El pedazo de Migaja es ' + round.ref.num + ' de ' + round.ref.den + '. ' + txt('q') + ' Las opciones son: ' + cs + '.</p>'
        : (LANG === 'pt')
        ? '<p>O pedaço da Migalha é ' + round.ref.num + ' de ' + round.ref.den + '. ' + txt('q') + ' As opções são: ' + cs + '.</p>'
        : (LANG === 'it')
        ? '<p>Il pezzo di Briciola è ' + round.ref.num + ' su ' + round.ref.den + '. ' + txt('q') + ' Le opzioni sono: ' + cs + '.</p>'
        : '<p>Crumb’s piece is ' + round.ref.num + ' over ' + round.ref.den + '. ' + txt('q') + ' The choices are: ' + cs + '.</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.FractionEquivActivity = FractionEquivActivity;

}(typeof window !== 'undefined' ? window : this));
