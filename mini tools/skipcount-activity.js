/* =====================================================================
   HOPPER'S LILY HOPS — ACTIVITY SKIN  (skipcount-activity.js)
   ---------------------------------------------------------------------
   2.NBT.A.2 · skip-count by 5s/10s/100s — CLARITY-FIRST. The lcs-shell skin
   over skipcount-core.js. answerType:'state'. EN-ONLY pilot.

   The child SEES the skip-count pattern: a single wide row of numbered
   lily-pad stepping stones, the hops between them carrying a "+5/+10/+100"
   arc label. One pad is blank (?); the child taps the missing number.
     • fill      — tap the number that goes on the blank pad (fwd OR down).
     • whichstep — a complete row, no labels → tap how big each hop is.
   The question (with the step) flows through the SHELL prompt banner (one
   prompt, no duplicate). A correct tap → the blank pad fills + the row glows
   + Hopper wiggles (resolve; shell Check hidden until `.lcs-app.hopper-
   resolved`). A wrong tap → a warm nudge, no advance. 0 lines to any core /
   lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.SkipCountCore;
  var LANG = 'en';                               /* content locale (api.lang = ?lang=xx); set in init(). */

  var L = {
    en: {
      win: 'Yes — {note}',
      winFill: '{a} comes next in the count!',
      winFillMid: '{a} fills the gap!',
      winStep: 'each hop is +{a}!',
      nFill: 'Count the hops with Hopper: keep adding {s}.',
      nStep: 'Look how much each number grows.',
      srBlank: 'blank',
      srWhich: 'A skip-counting row: {shown}. How big is each hop? Choices: {choices}.',
      srFillFwd: 'Skip-counting by {step}: {shown}. Which number is missing? Choices: {choices}.',
      srFillBack: 'Skip-counting by {step}, counting down: {shown}. Which number is missing? Choices: {choices}.'
    },
    /* DE — native ensemble (linguist + Klasse-2 educator). „Sprung" = the frog's
       hop (narrative); „{step}er-Schritte" = the math term (task). „rückwärts"
       explicit on backward rounds. Digits only — no spelled-out number words. */
    de: {
      win: 'Genau — {note}',
      winFill: '{a} kommt als Nächstes in der Zahlenreihe!',
      winFillMid: '{a} füllt die Lücke!',
      winStep: 'jeder Sprung ist +{a}!',
      nFill: 'Zähl die Sprünge mit Hopper: immer {s} weiter.',
      nStep: 'Schau, um wie viel sich jede Zahl verändert.',
      srBlank: 'leere Stelle',
      srWhich: 'Eine Zahlenreihe in Schritten: {shown}. Wie groß ist jeder Sprung? Zur Auswahl: {choices}.',
      srFillFwd: 'Zählen in {step}er-Schritten: {shown}. Welche Zahl fehlt? Zur Auswahl: {choices}.',
      srFillBack: 'Rückwärts zählen in {step}er-Schritten: {shown}. Welche Zahl fehlt? Zur Auswahl: {choices}.'
    },
    /* FR — native ensemble (linguiste + pédagogue CE1, programmes officiels).
       Terme math « compter de {step} en {step} » (JAMAIS « compter par 10 »,
       calque) ; « un bond » = le saut narratif de la grenouille ; à rebours =
       « en reculant » (registre enfant). Chiffres uniquement. Espaces avant ! ? : */
    fr: {
      win: 'Bravo — {note}',
      winFill: '{a} vient ensuite dans la suite !',
      winFillMid: '{a} complète la suite !',
      winStep: 'chaque bond fait +{a} !',
      nFill: "Compte les bonds avec Hopper : continue d'ajouter {s}.",
      nStep: 'Regarde de combien chaque nombre change.',
      srBlank: 'case vide',
      srWhich: 'Une suite de nombres qui avance par bonds : {shown}. De combien avance chaque bond ? Choix : {choices}.',
      srFillFwd: 'Compter de {step} en {step} : {shown}. Quel nombre manque ? Choix : {choices}.',
      srFillBack: 'Compter de {step} en {step} en reculant : {shown}. Quel nombre manque ? Choix : {choices}.'
    },
    /* es-MX — native ensemble (lingüista + pedagoga de 2º, planes y programas SEP).
       Término correcto "contar de {step} en {step}" — NUNCA el calco "contar por 5".
       "brinco/brincar" = el salto de la rana (masc. → "cada brinco es +5" limpio);
       hacia atrás = descendente; "serie" (no "sucesión"). Solo dígitos. */
    es: {
      win: '¡Sí! {note}',
      winFill: '¡{a} sigue en la cuenta!',
      winFillMid: '¡{a} completa el hueco!',
      winStep: '¡cada brinco es +{a}!',
      nFill: 'Cuenta los brincos con Hopper: sigue sumando {s}.',
      nStep: 'Mira cuánto crece cada número.',
      srBlank: 'espacio vacío',
      srWhich: 'Una serie de conteo: {shown}. ¿De cuánto es cada brinco? Opciones: {choices}.',
      srFillFwd: 'Contando de {step} en {step}: {shown}. ¿Qué número falta? Opciones: {choices}.',
      srFillBack: 'Contando de {step} en {step} hacia atrás: {shown}. ¿Qué número falta? Opciones: {choices}.'
    },
    /* pt-BR — native ensemble (linguista + pedagoga do 2º ano, BNCC). "pulo" = o salto do
       sapo (narrativa); "contar de {step} em {step}" = o termo matemático (NUNCA o calco
       "contar por 5"). Contagem regressiva = "para trás". Só dígitos, sem números por extenso. */
    pt: {
      win: 'Isso! {note}',
      winFill: '{a} vem em seguida na contagem!',
      winFillMid: '{a} completa a sequência!',
      winStep: 'cada pulo é +{a}!',
      nFill: 'Conte os pulos com o Hopper: continue somando {s}.',
      nStep: 'Veja quanto cada número cresce.',
      srBlank: 'espaço vazio',
      srWhich: 'Uma sequência de contagem: {shown}. De quanto é cada pulo? Opções: {choices}.',
      srFillFwd: 'Contando de {step} em {step}: {shown}. Qual número está faltando? Opções: {choices}.',
      srFillBack: 'Contando de {step} em {step} para trás: {shown}. Qual número está faltando? Opções: {choices}.'
    },
    /* it — native ensemble (linguista + pedagoga classe seconda, Indicazioni nazionali). "salto" = il
       salto della rana (narrativa); "contare a salti di {step}" / "contare di {step} in {step}" = il
       termine matematico (MAI il calco "contare per {step}"). Contare all'indietro = contare in senso
       regressivo (verso il basso), NON "a ritroso". Nucleo Numeri. Solo cifre, nessun numero per esteso. */
    it: {
      win: 'Sì! {note}',
      winFill: '{a} viene subito dopo nella conta!',
      winFillMid: '{a} completa la sequenza!',
      winStep: 'ogni salto è +{a}!',
      nFill: 'Conta i salti con Hopper: continua ad aggiungere {s}.',
      nStep: 'Guarda quanto cresce ogni numero.',
      srBlank: 'spazio vuoto',
      srWhich: 'Una sequenza a salti: {shown}. Di quanto è ogni salto? Opzioni: {choices}.',
      srFillFwd: 'Conta di {step} in {step}: {shown}. Quale numero manca? Opzioni: {choices}.',
      srFillBack: 'Conta di {step} in {step} all\'indietro: {shown}. Quale numero manca? Opzioni: {choices}.'
    },
    /* nl — native ensemble (linguist + Groep 4 rekenen-wiskunde educator, SLO-kerndoelen). "springend
       tellen" / "in sprongen van {step} tellen" (NOOIT de calque "tellen per 5"); "de sprong" (kikkersprong,
       NOOIT "stap"); terugtellen; het getal = onzijdig → welk/elk getal. nStep = "verandert" (backward-safe:
       op −10 wordt een getal niet groter). Alleen cijfers. */
    nl: {
      win: 'Ja — {note}',
      winFill: '{a} komt als volgende in de getallenrij!',
      winFillMid: '{a} vult de lege plek!',
      winStep: 'elke sprong is +{a}!',
      nFill: 'Tel de sprongen met Hopper: blijf er steeds {s} bij optellen.',
      nStep: 'Kijk hoeveel elk getal steeds verandert.',
      srBlank: 'lege plek',
      srWhich: 'Een getallenrij in sprongen: {shown}. Hoe groot is elke sprong? Keuzes: {choices}.',
      srFillFwd: 'Tellen in sprongen van {step}: {shown}. Welk getal ontbreekt? Keuzes: {choices}.',
      srFillBack: 'Terugtellen in sprongen van {step}: {shown}. Welk getal ontbreekt? Keuzes: {choices}.'
    }
  };
  function txt(k, a) {
    var s = (L[LANG] && L[LANG][k]) || L.en[k] || k;
    return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; });
  }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  var C = { T: '#146B5E', INK: '#0F4A40', CORAL: '#F2784B', PAD: '#8BC4A0', PADDK: '#4E8A5C', LIT: '#F2C14E' };

  function hopperSVG() {
    return '<svg class="sc-hopper-svg" viewBox="0 0 56 50" width="36" height="34" aria-hidden="true">' +
      '<ellipse cx="28" cy="34" rx="18" ry="14" fill="#8BC4A0" stroke="#4E8A5C" stroke-width="2"/>' +
      '<ellipse cx="13" cy="42" rx="7" ry="4" fill="#6FB089"/><ellipse cx="43" cy="42" rx="7" ry="4" fill="#6FB089"/>' +
      '<circle cx="19" cy="15" r="8" fill="#8BC4A0" stroke="#4E8A5C" stroke-width="2"/>' +   /* eye bumps */
      '<circle cx="37" cy="15" r="8" fill="#8BC4A0" stroke="#4E8A5C" stroke-width="2"/>' +
      '<g class="sc-eyes-open"><circle cx="19" cy="15" r="3" fill="#2B2B2B"/><circle cx="37" cy="15" r="3" fill="#2B2B2B"/></g>' +
      '<g class="sc-eyes-happy"><path d="M16 15 q3 -3 6 0" stroke="#2B2B2B" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M34 15 q3 -3 6 0" stroke="#2B2B2B" stroke-width="1.8" fill="none" stroke-linecap="round"/></g>' +
      '<path d="M20 33 q8 7 16 0" stroke="#356B4B" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';
  }

  /* a lily pad (flat ellipse + a wedge notch) with its number, or a coral "?" */
  function lilyPad(cx, padY, value, glow) {
    var rx = 42, ry = 15;
    var pad = '<ellipse cx="' + cx + '" cy="' + (padY + 3) + '" rx="' + rx + '" ry="' + (ry - 2) + '" fill="#6FA886"/>' +
      '<ellipse class="sc-pad" cx="' + cx + '" cy="' + padY + '" rx="' + rx + '" ry="' + ry + '" fill="' + C.PAD + '" stroke="' + C.PADDK + '" stroke-width="2.5"' + (glow ? ' filter="url(#sc-glow)"' : '') + '/>' +
      '<path d="M' + cx + ' ' + padY + ' L' + (cx + rx - 4) + ' ' + (padY - 7) + ' A' + rx + ' ' + ry + ' 0 0 1 ' + (cx + rx - 4) + ' ' + (padY + 7) + ' Z" fill="#FBF3E4"/>';
    var label = (value === null)
      ? '<text x="' + cx + '" y="' + (padY + 9) + '" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="30" fill="' + C.CORAL + '" text-anchor="middle">?</text>'
      : '<text x="' + cx + '" y="' + (padY + 8) + '" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="24" fill="' + C.INK + '" text-anchor="middle">' + value + '</text>';
    return pad + label;
  }
  /* a dashed hop arc between two pads, with an optional +step label at the apex */
  function hopArc(cx1, cx2, padTopY, label) {
    var apexY = padTopY - 34, midX = (cx1 + cx2) / 2;
    var arc = '<path d="M' + (cx1 + 14) + ' ' + padTopY + ' Q' + midX + ' ' + apexY + ' ' + (cx2 - 14) + ' ' + padTopY + '" fill="none" stroke="' + C.T + '" stroke-width="2.2" stroke-dasharray="4 4" opacity=".8"/>';
    var lab = label ? '<text x="' + midX + '" y="' + (apexY + 12) + '" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="15" fill="' + C.T + '" text-anchor="middle">' + label + '</text>' : '';
    return arc + lab;
  }

  var SkipCountActivity = {
    id: 'skipcount-activity',
    strings: {
      title: { en: "Hopper's Lily Hops", de: 'Hoppers Seerosen-Sprünge', fr: 'Les bonds de Hopper sur les nénuphars', es: 'Los brincos de Hopper', pt: 'Os pulos do Hopper', it: 'I salti di Hopper', nl: 'Hoppers waterlelie-sprongen' },
      instruction: { en: 'Help Hopper the frog skip-count across the pond!', de: 'Hilf dem Frosch Hopper, in Schritten über den Teich zu hüpfen!', fr: "Aide Hopper la grenouille à compter par bonds à travers l'étang !", es: '¡Ayuda a Hopper la rana a contar saltando por el estanque!', pt: 'Ajude o sapo Hopper a contar pulando pela lagoa!', it: 'Aiuta la rana Hopper a contare a salti attraverso lo stagno!', nl: 'Help kikker Hopper om in sprongen over de vijver te tellen!' },
      qfill: { en: 'Count by {step}s. Which number is missing?', de: 'Zähle in {step}er-Schritten weiter. Welche Zahl fehlt?', fr: 'Compte de {step} en {step}. Quel nombre manque ?', es: 'Cuenta de {step} en {step}. ¿Qué número falta?', pt: 'Conte de {step} em {step}. Qual número está faltando?', it: 'Conta di {step} in {step}. Quale numero manca?', nl: 'Tel verder in sprongen van {step}. Welk getal ontbreekt?' },
      qfillback: { en: 'Counting down by {step}s. Which number is missing?', de: 'Zähle rückwärts in {step}er-Schritten. Welche Zahl fehlt?', fr: 'Compte de {step} en {step} en reculant. Quel nombre manque ?', es: 'Cuenta de {step} en {step} hacia atrás. ¿Qué número falta?', pt: 'Conte de {step} em {step} para trás. Qual número está faltando?', it: 'Conta di {step} in {step} all\'indietro. Quale numero manca?', nl: 'Tel terug in sprongen van {step}. Welk getal ontbreekt?' },
      qstep: { en: 'How big is each hop?', de: 'Wie groß ist jeder Sprung?', fr: 'De combien Hopper avance-t-il à chaque bond ?', es: '¿De cuánto es cada brinco?', pt: 'De quanto é cada pulo?', it: 'Di quanto è ogni salto?', nl: 'Hoe groot is elke sprong?' }
    },

    init: function (api) {
      this._api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = []; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._finds = 0; this._round = null; this._resolved = false; this._token = 0;
      this._nonConf = {}; this._choiceOrder = null;
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('sc-style')) return;
      var s = el('style'); s.id = 'sc-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.sc-root{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;max-width:min(96vw,640px);margin:0 auto;}',
        '.sc-say{display:flex;align-items:center;gap:8px;width:100%;}',
        '.sc-hopper{flex:0 0 auto;}',
        '.sc-line-msg{flex:1 1 auto;min-height:1.1em;text-align:center;font:700 .88rem/1.2 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.sc-line-msg.miss{color:#C2410C;}',
        '.sc-board{width:100%;max-width:min(96vw,640px);display:flex;flex-direction:column;gap:14px;align-items:center;}',
        '.sc-scene{width:100%;height:auto;display:block;}',
        '.sc-row{display:flex;justify-content:center;align-items:stretch;width:100%;gap:16px;}',
        '.sc-cand{flex:1 1 0;min-width:0;max-width:200px;min-height:clamp(56px,9.5vw,96px);border:3.5px solid #146B5E;border-radius:18px;background:#fff;color:#0F4A40;cursor:pointer;font:800 clamp(1.5rem,6vw,2.7rem)/1 Baloo 2,Nunito,sans-serif;display:flex;align-items:center;justify-content:center;}',
        '.sc-cand.sel{box-shadow:0 0 0 3px #F2784B;}',
        '.sc-cand.dim{opacity:.4;}',
        '.sc-hopper-svg .sc-eyes-happy{display:none;}',
        '.sc-hopper[data-pose=happy] .sc-eyes-open{display:none;}.sc-hopper[data-pose=happy] .sc-eyes-happy{display:block;}',
        '.sc-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:380px){.sc-root{gap:8px;}.sc-cand{min-height:52px;font-size:1.25rem;}.sc-line-msg{font-size:.82rem;}}',
        '.lcs-app:not(.hopper-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'skipcount.fill.2-nbt-a-2';
      var tries = ['/mini-tools/skipcount-activities.json', 'skipcount-activities.json', '../mini tools/skipcount-activities.json'];
      (function attempt(i) {
        if (i >= tries.length) return;
        fetch(tries[i]).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
          .then(function (rows) {
            var row = rows.find(function (x) { return x.id === id; }) || rows[0];
            self._activityRow = row; self._pool = (row && row.params && row.params.rounds) || [];
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
      var pk = round.cog === 'whichstep' ? 'qstep' : (round.step < 0 ? 'qfillback' : 'qfill');
      return {
        id: round.id, promptKey: pk, promptArgs: { step: Math.abs(round.step) }, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1; this._nonConf = {};
      this._choiceOrder = this._shuffle(Core.choices(round).slice());
      if (this._app) this._app.classList.remove('hopper-resolved');
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var root = el('div', 'sc-root');

      var say = el('div', 'sc-say');
      var ho = el('div', 'sc-hopper'); ho.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); ho.innerHTML = hopperSVG();
      var msg = el('p', 'sc-line-msg'); msg.setAttribute('aria-live', 'polite');
      say.append(ho, msg); root.appendChild(say); this._hopper = ho;

      this._renderScene(root);
      root.appendChild(this._srMirror());
      stage.appendChild(root);
    },

    _renderScene: function (root) {
      var self = this, r = this._round, tok = this._token;
      var snap = Core.snapshot(r), seq = snap.sequence, n = seq.length;
      var board = el('div', 'sc-board');

      var cellW = 130, H = 90, padY = 66, W = n * cellW;
      var cx = function (i) { return i * cellW + cellW / 2; };
      var defs = '<defs><filter id="sc-glow" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#F2C14E"/></filter></defs>';
      var parts = '';
      /* hop arcs first (behind pads). +step label ONLY on `fill` (scaffolds);
         hidden on `whichstep` (the child must derive the step). */
      var stepLabel = r.cog === 'fill' ? ((r.step < 0 ? '−' : '+') + snap.step) : '';
      for (var i = 0; i < n - 1; i++) parts += hopArc(cx(i), cx(i + 1), padY - 13, stepLabel);
      for (var j = 0; j < n; j++) {
        var val = (seq[j] === null) ? (this._resolved ? Core.answerValue(r) : null) : seq[j];
        parts += lilyPad(cx(j), padY, val, this._resolved && r.cog === 'fill' && j === r.unknownIndex);
      }
      var scene = '<svg class="sc-scene" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' + defs + parts + '</svg>';
      var wrap = el('div'); wrap.style.width = '100%'; wrap.style.maxWidth = Math.min(n * 150, 640) + 'px'; wrap.innerHTML = scene;
      board.appendChild(wrap);

      var row = el('div', 'sc-row');
      this._choiceOrder.forEach(function (val) {
        var b = el('button', 'sc-cand' + (self._nonConf[val] ? ' dim' : ''));
        b.type = 'button';
        b.textContent = r.cog === 'whichstep' ? ('+' + val) : String(val);
        b.setAttribute('aria-label', r.cog === 'whichstep' ? ('hops of ' + val) : String(val));
        b.addEventListener('click', function () {
          if (self._resolved || self._nonConf[val] || self._token !== tok) return;
          if (Core.isAnswer(r, val)) self._resolve();
          else { self._nonConf[val] = 1; self._nudge(r.cog === 'whichstep' ? 'nStep' : 'nFill'); }
        });
        row.appendChild(b);
      });
      board.appendChild(row);
      root.appendChild(board);
    },

    _resolve: function () {
      var r = this._round, a = Core.answerValue(r);
      this._resolved = true; this._finds += 1;
      if (this._app) this._app.classList.add('hopper-resolved');
      this.render();
      var note;
      if (r.cog === 'whichstep') note = txt('winStep', { a: a });
      else note = txt(r.unknownIndex === r.length - 1 ? 'winFill' : 'winFillMid', { a: a });
      var line = this._api.stage.querySelector('.sc-line-msg');
      if (line) { line.textContent = txt('win', { note: note }); line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(txt('win', { note: note }));
    },
    _nudge: function (key) {
      var r = this._round;
      this._api.sound && this._api.sound(440);
      this.render();
      var line = this._api.stage.querySelector('.sc-line-msg');
      if (line) { line.textContent = txt(key, { s: Math.abs(r.step) }); line.classList.add('miss'); }
      this._api.announce && this._api.announce(txt(key, { s: Math.abs(r.step) }));
    },

    _srMirror: function () {
      var r = this._round, wrap = el('div', 'sc-sronly'); wrap.setAttribute('aria-live', 'polite');
      var snap = Core.snapshot(r);
      var blank = txt('srBlank');
      var shown = snap.sequence.map(function (v) { return v === null ? blank : v; }).join(', ');
      var msg = (r.cog === 'whichstep')
        ? txt('srWhich', { shown: shown, choices: this._choiceOrder.map(function (v) { return '+' + v; }).join(', ') })
        : txt(snap.direction === 'down' ? 'srFillBack' : 'srFillFwd', { shown: shown, step: snap.step, choices: this._choiceOrder.join(', ') });
      wrap.innerHTML = '<p>' + msg + '</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.SkipCountActivity = SkipCountActivity;

}(typeof window !== 'undefined' ? window : this));
