/* =====================================================================
   CHUFFER'S SWITCHYARD — ACTIVITY  (chuffer-activity.js)
   ---------------------------------------------------------------------
   CCSS K.OA.A.3 — decompose a whole N into two parts in MORE THAN ONE WAY,
   the child STATING each split (the recording requirement). You're the
   switchman: a load of N crates forks into a Left car + a Right car; move
   crates between the cars, READ each car, STATE the split (5 = ☐ + ☐), and
   pull the coupler. Find EVERY distinct way → the route-book (staircase) fills.

   The decomposition is the child's NAMED CLAIM — the equation NEVER auto-prints;
   the coupler banks a way ONLY when the stated parts match the actual car-counts
   (a mismatch → a no-shame "count again"). Seven distinct act-types:
   decompose-record / predict-covariation / hunt-rung / make-ten / equation-build
   / predict-mirror / judge-route.

   Decomposition mechanics + the dedup'd manifest live in mini tools/
   rail-decompose-core.js (pure). answerType:'state'. Crates wrap to ten-frame
   arrays (the count-not-length cardinality aid). Chuffer = SVG STUB for CA5. No
   timer/score/streak; mis-states are no-shame instruction. 0 lines to the
   protected cores + lcs-shell.*.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.RailDecomposeCore;
  var C = { T: '#146B5E', BLUE: '#3FA7D6', BLUE2: '#2E7CA8', RED: '#F2784B', RED2: '#D9572F', CREAM: '#FBF3E4', GOLD: '#E8A53A', INK: '#2A2A35' };
  var WORDS = { 0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten' };
  var WORDS_DE = { 0: 'null', 1: 'eins', 2: 'zwei', 3: 'drei', 4: 'vier', 5: 'fünf', 6: 'sechs', 7: 'sieben', 8: 'acht', 9: 'neun', 10: 'zehn' };
  var WORDS_FR = { 0: 'zéro', 1: 'un', 2: 'deux', 3: 'trois', 4: 'quatre', 5: 'cinq', 6: 'six', 7: 'sept', 8: 'huit', 9: 'neuf', 10: 'dix' };
  var WORDS_ES = { 0: 'cero', 1: 'uno', 2: 'dos', 3: 'tres', 4: 'cuatro', 5: 'cinco', 6: 'seis', 7: 'siete', 8: 'ocho', 9: 'nueve', 10: 'diez' };
  /* Brazilian Portuguese — masculine-abstract cardinals (a number decomposes: "cinco é dois e três", um/dois not uma/duas). */
  var WORDS_PT = { 0: 'zero', 1: 'um', 2: 'dois', 3: 'três', 4: 'quatro', 5: 'cinco', 6: 'seis', 7: 'sete', 8: 'oito', 9: 'nove', 10: 'dez' };
  /* Italian — masculine-abstract cardinals (a number decomposes: "cinque è due e tre", genderless: uno/due not una/due). */
  var WORDS_IT = { 0: 'zero', 1: 'uno', 2: 'due', 3: 'tre', 4: 'quattro', 5: 'cinque', 6: 'sei', 7: 'sette', 8: 'otto', 9: 'nove', 10: 'dieci' };
  var WORDS_NL = { 0: 'nul', 1: 'één', 2: 'twee', 3: 'drie', 4: 'vier', 5: 'vijf', 6: 'zes', 7: 'zeven', 8: 'acht', 9: 'negen', 10: 'tien' };
  var LANG = 'en';
  function numWord(n) { return (LANG === 'es' ? WORDS_ES : (LANG === 'de' ? WORDS_DE : (LANG === 'fr' ? WORDS_FR : (LANG === 'pt' ? WORDS_PT : (LANG === 'it' ? WORDS_IT : (LANG === 'nl' ? WORDS_NL : WORDS))))))[n]; }

  function speak(text) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: String(text), lang: (LANG === 'es' ? 'es-MX' : (LANG === 'pt' ? 'pt-BR' : (LANG === 'it' ? 'it-IT' : LANG))), rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(String(text)); u.rate = .95; u.lang = (LANG === 'es' ? 'es-MX' : (LANG === 'de' ? 'de-DE' : (LANG === 'fr' ? 'fr-FR' : (LANG === 'pt' ? 'pt-BR' : (LANG === 'it' ? 'it-IT' : (LANG === 'nl' ? 'nl-NL' : 'en-US')))))); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function chufferSVG(mood) {
    var happy = mood === 'happy' || mood === 'haul';
    return '<svg class="cf-loco-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'nl' ? 'Tuf' : 'Chuffer') + '">'
      + '<rect x="22" y="38" width="46" height="34" rx="7" fill="#3FA7D6"/><rect x="60" y="28" width="20" height="44" rx="5" fill="#2E7CA8"/>'
      + '<circle cx="34" cy="78" r="9" fill="#2A2A35"/><circle cx="58" cy="78" r="9" fill="#2A2A35"/><circle cx="34" cy="78" r="3.5" fill="#fff"/><circle cx="58" cy="78" r="3.5" fill="#fff"/>'
      + '<rect x="40" y="22" width="9" height="14" rx="2" fill="#2A2A35"/>'
      + '<circle cx="70" cy="44" r="3.4" fill="#fff"/><circle cx="70" cy="44" r="1.6" fill="#2A2A35"/>'
      + (happy ? '<path d="M44 26 q4 -8 9 -3" stroke="#cfe9f6" stroke-width="5" fill="none" stroke-linecap="round"/>' : '') + '</svg>';
  }
  function crateGrid(api, count, kind) {
    var fr = api.el('div', 'cf-frame');
    for (var i = 0; i < 10; i++) {
      var cell = api.el('div', 'cf-cell' + (i < count ? ' cf-filled cf-' + kind : ''));
      fr.appendChild(cell);
    }
    return fr;
  }

  global.ChufferActivity = {
    id: 'chuffer-activity',
    reward: { id: 'chuffer-hill', label: "Chuffer's Hill", emoji: '🚂' },

    strings: {
      title: { en: "Chuffer's Switchyard", de: 'Chuffers Rangierbahnhof', fr: 'La gare de triage de Chuffer', es: 'El patio de Chuffer', pt: 'Pátio de Manobras do Chuffer', it: 'Lo scalo di Chuffer', nl: 'Het rangeerstation van Tuf' },
      prompt: { en: 'Split the load and say each way!', de: 'Teile die Ladung auf und sag jeden Weg!', fr: 'Partage la cargaison et dis chaque façon !', es: '¡Reparte la carga y di todas las formas!', pt: 'Divida a carga e diga cada jeito!', it: 'Scomponi il carico e nomina ogni modo!', nl: 'Splits de lading en zeg elke manier!' },
      baseHint: { en: 'Move crates, say the split, pull the coupler!', de: 'Schiebe Kisten, sag die Zerlegung, zieh die Kupplung!', fr: 'Déplace des caisses, dis la décomposition, tire l’attelage !', es: 'Desliza cajas, di el reparto y ¡jala el enganche!', pt: 'Mova as caixas, diga a divisão e puxe o engate!', it: 'Sposta le casse, nomina il modo, aggancia!', nl: 'Schuif kisten, zeg de splitsing, trek aan de koppeling!' },
      covaryHint: { en: 'Move ONE crate — what is the new split?', de: 'Schiebe EINE Kiste – wie heißt die neue Zerlegung?', fr: 'Déplace UNE caisse — quelle est la nouvelle décomposition ?', es: 'Mueve UNA caja… ¿cuál es el nuevo reparto?', pt: 'Mova UMA caixa — qual é a nova divisão?', it: 'Sposta UNA cassa: qual è il nuovo modo?', nl: 'Schuif ÉÉN kist — wat is de nieuwe splitsing?' },
      huntHint: { en: 'The route-book has a gap — find that way!', de: 'Im Fahrtenbuch fehlt ein Weg – finde ihn!', fr: 'Il manque une façon dans le carnet — trouve-la !', es: 'Falta una forma en la bitácora, ¡encuéntrala!', pt: 'Falta um jeito no caderno de rotas — ache esse!', it: 'Nel quaderno manca un modo: trovalo!', nl: 'In het ritboek ontbreekt een manier — vind die!' },
      maketenHint: { en: 'One car is sealed — find the partner to make 10!', de: 'Ein Wagen ist verschlossen – finde den Zehnerfreund!', fr: 'Un wagon est fermé — trouve le complément pour faire 10 !', es: 'Un vagón está cerrado: ¡encuentra la pareja del diez!', pt: 'Um vagão está lacrado — ache o amigo do dez!', it: 'Un vagone è chiuso: trova il suo amico del dieci!', nl: 'Eén wagon zit op slot — vind het vriendje van tien!' },
      equationHint: { en: 'Build this exact load: {a} + {b}!', de: 'Baue genau diese Ladung: {a} + {b}!', fr: 'Construis exactement cette cargaison : {a} + {b} !', es: 'Arma justo esta carga: ¡{a} + {b}!', pt: 'Monte esta carga certinha: {a} + {b}!', it: 'Forma questo carico: {a} + {b}!', nl: 'Bouw precies deze lading: {a} + {b}!' },
      mirrorHint: { en: 'You found {a} + {b} — what if we swap the cars?', de: 'Du hast {a} + {b} gefunden – was, wenn wir die Wagen tauschen?', fr: 'Tu as trouvé {a} + {b} — et si on échangeait les wagons ?', es: 'Encontraste {a} + {b}… ¿y si cambiamos los vagones?', pt: 'Você achou {a} + {b} — e se a gente trocar os vagões?', it: 'Hai fatto {a} + {b}: e se scambi i vagoni?', nl: 'Je vond {a} + {b} — en als we de wagons omwisselen?' },
      judgeHint: { en: 'Chuffer says a route — is it NEW, or one we have?', de: 'Chuffer nennt einen Weg – ist er NEU oder haben wir ihn schon?', fr: 'Chuffer propose une façon — est-elle NOUVELLE, ou déjà trouvée ?', es: 'Chuffer dice una forma… ¿es NUEVA o ya la tenemos?', pt: 'O Chuffer diz uma rota — é NOVA, ou já temos?', it: 'Chuffer dice un modo: è NUOVO o già fatto?', nl: 'Tuf noemt een manier — is die NIEUW, of hebben we hem al?' },
      sayA: { en: '?', de: '?', fr: '?', es: '?', pt: '?', it: '?', nl: '?' },
      coupler: { en: 'Pull the coupler! 🔗', de: 'Zieh die Kupplung! 🔗', fr: 'Tire l’attelage ! 🔗', es: '¡Jala el enganche! 🔗', pt: 'Puxe o engate! 🔗', it: 'Tira il gancio! 🔗', nl: 'Trek aan de koppeling! 🔗' },
      pickPrompt: { en: 'How many in this car?', de: 'Wie viele sind in diesem Wagen?', fr: 'Combien dans ce wagon ?', es: '¿Cuántas hay en este vagón?', pt: 'Quantas caixas neste vagão?', it: 'Quante casse in questo vagone?', nl: 'Hoeveel zitten er in deze wagon?' },
      newRoute: { en: 'New route!', de: 'Neuer Weg!', fr: 'Nouvelle façon !', es: '¡Es NUEVA!', pt: 'Rota nova!', it: 'Modo nuovo!', nl: 'Nieuwe manier!' },
      gotIt: { en: 'We have that!', de: 'Haben wir schon!', fr: 'On l’a déjà !', es: '¡Ya la tenemos!', pt: 'Essa a gente já tem!', it: 'Già fatto!', nl: 'Die hebben we al!' },
      swap: { en: 'Swap them!', de: 'Tausche sie!', fr: 'Échange-les !', es: '¡Cámbialos!', pt: 'Troque os vagões!', it: 'Scambiali!', nl: 'Wissel ze om!' },
      banked: { en: 'CLUNK! {a} and {b} — logged!', de: 'KLACK! {a} und {b} – eingetragen!', fr: 'CLAC ! {a} et {b} — enregistré !', es: '¡CLAC! {a} y {b}… ¡anotado!', pt: 'CLEC! {a} e {b} — anotado!', it: 'CLONK! {a} e {b}: segnato!', nl: 'KLONK! {a} en {b} — genoteerd!' },
      mirror: { en: 'Same crates, just swapped — {a} and {b}, OR {b} and {a}!', de: 'Gleiche Kisten, nur getauscht – {a} und {b} ODER {b} und {a}!', fr: 'Les mêmes caisses, juste échangées — {a} et {b}, OU {b} et {a} !', es: 'Las mismas cajas, solo cambiadas: ¡{a} y {b} O {b} y {a}!', pt: 'As mesmas caixas, só trocadas — {a} e {b}, OU {b} e {a}!', it: 'Stesse casse scambiate: {a} e {b}, O {b} e {a}!', nl: 'Dezelfde kisten, alleen omgewisseld — {a} en {b}, OF {b} en {a}!' },
      dupe: { en: 'Chuffer already knows that route — find a NEW way!', de: 'Diesen Weg kennt Chuffer schon – finde einen NEUEN!', fr: 'Chuffer connaît déjà cette façon — trouve-en une NOUVELLE !', es: 'Chuffer ya conoce esa forma… ¡busca una NUEVA!', pt: 'O Chuffer já conhece essa rota — ache um jeito NOVO!', it: 'Chuffer conosce già questo modo: trovane uno NUOVO!', nl: 'Deze manier kent Tuf al — vind een NIEUWE!' },
      mismatch: { en: "Let's count again — how many in each car?", de: 'Zählen wir noch mal – wie viele sind in jedem Wagen?', fr: 'Comptons encore — combien dans chaque wagon ?', es: 'Contemos otra vez… ¿cuántas hay en cada vagón?', pt: 'Vamos contar de novo — quantas caixas em cada vagão?', it: 'Contiamo di nuovo: quante casse per vagone?', nl: 'Laten we opnieuw tellen — hoeveel zitten er in elke wagon?' },
      win: { en: 'Chuffer reached the station! 🚂🎉', de: 'Chuffer ist am Bahnhof angekommen! 🚂🎉', fr: 'Chuffer est arrivé à la gare ! 🚂🎉', es: '¡Chuffer llegó a la estación! 🚂🎉', pt: 'O Chuffer chegou na estação! 🚂🎉', it: 'Chuffer è arrivato alla stazione! 🚂🎉', nl: 'Tuf is op het station aangekomen! 🚂🎉' },
      hintCheck: { en: 'Find every way to split the load.', de: 'Finde alle Wege, die Ladung zu zerlegen.', fr: 'Trouve toutes les façons de partager la cargaison.', es: 'Encuentra todas las formas de repartir la carga.', pt: 'Ache todos os jeitos de dividir a carga.', it: 'Trova ogni modo di scomporre il carico.', nl: 'Vind alle manieren om de lading te splitsen.' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.solved = false; this.solvedCount = 0; this.msg = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.cstate = Core.newState(round); this.solved = false; this.msg = null;
      this.statedA = null; this.statedB = null; this.picking = null;
      this.mirrorStep = false; this.judgeIdx = 0; this.act = round.actType;
    },

    _whole: function () { return this.round.whole; },
    announce: function (s) { if (this.api.announce) this.api.announce(s); },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'cf-wrap'); var root = api.el('div', 'cf-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var head = api.el('div', 'cf-head');
      var lo = api.el('div', 'cf-loco'); lo.innerHTML = chufferSVG(this.solved ? 'happy' : 'idle'); head.appendChild(lo);
      var say = api.el('div', 'cf-say'); say.textContent = this.msg || this._hint(); head.appendChild(say);
      root.appendChild(head);

      if (this.solved) this._renderDone(root);
      else if (this.act === 'judge-route') this._renderJudge(root);
      else this._renderBase(root);

      wrap.appendChild(root); stage.appendChild(wrap);
    },
    _hint: function () {
      var api = this.api, r = this.round;
      if (this.act === 'predict-covariation') return api.t('covaryHint');
      if (this.act === 'hunt-rung') return api.t('huntHint');
      if (this.act === 'make-ten') return api.t('maketenHint');
      if (this.act === 'equation-build') return api.t('equationHint').replace('{a}', r.givenEquation.a).replace('{b}', r.givenEquation.b);
      if (this.act === 'predict-mirror' && this.mirrorStep) return api.t('mirrorHint').replace('{a}', this.cstate.a).replace('{b}', this.cstate.b);
      if (this.act === 'judge-route') return api.t('judgeHint');
      return api.t('baseHint');
    },

    /* ----- the base flow: cars + shifter + route-card + coupler + staircase ----- */
    _renderBase: function (root) {
      var self = this, api = this.api, s = this.cstate, N = this._whole();
      var main = api.el('div', 'cf-main');

      // LEFT: the two cars + the shifter (the whole N lives in the route-card)
      var yard = api.el('div', 'cf-yard');
      var cars = api.el('div', 'cf-cars');
      cars.appendChild(this._car('a', s.a, s.sealed === 'a')); cars.appendChild(this._car('b', s.b, s.sealed === 'b'));
      yard.appendChild(cars);
      if (!s.sealed) {
        var sh = api.el('div', 'cf-shift');
        var lft = api.el('button', 'cf-shiftbtn'); lft.type = 'button'; lft.textContent = '◀'; lft.setAttribute('aria-label', LANG === 'es' ? 'mueve una caja al vagón azul' : LANG === 'de' ? 'eine Kiste in den blauen Wagen schieben' : (LANG === 'fr' ? 'déplacer une caisse vers le wagon bleu' : LANG === 'pt' ? 'levar uma caixa para o vagão azul' : LANG === 'it' ? 'sposta una cassa nel vagone azzurro' : LANG === 'nl' ? 'een kist naar de blauwe wagon schuiven' : 'move a crate to the blue car')); lft.addEventListener('click', function () { self._move('a'); });
        var lab = api.el('span', 'cf-shiftlab'); lab.textContent = (LANG === 'es' ? 'mueve una caja' : LANG === 'de' ? 'eine Kiste schieben' : (LANG === 'fr' ? 'déplacer une caisse' : LANG === 'pt' ? 'levar uma caixa' : LANG === 'it' ? 'sposta una cassa' : LANG === 'nl' ? 'een kist schuiven' : 'move a crate'));
        var rgt = api.el('button', 'cf-shiftbtn'); rgt.type = 'button'; rgt.textContent = '▶'; rgt.setAttribute('aria-label', LANG === 'es' ? 'mueve una caja al vagón rojo' : LANG === 'de' ? 'eine Kiste in den roten Wagen schieben' : (LANG === 'fr' ? 'déplacer une caisse vers le wagon rouge' : LANG === 'pt' ? 'levar uma caixa para o vagão vermelho' : LANG === 'it' ? 'sposta una cassa nel vagone rosso' : LANG === 'nl' ? 'een kist naar de rode wagon schuiven' : 'move a crate to the red car')); rgt.addEventListener('click', function () { self._move('b'); });
        sh.appendChild(lft); sh.appendChild(lab); sh.appendChild(rgt); yard.appendChild(sh);
      }
      main.appendChild(yard);

      // RIGHT: the route-card + (while PICKING: just the picker; else the coupler + the staircase)
      var side = api.el('div', 'cf-side');
      side.appendChild(this._routeCard());
      if (this.picking) { side.appendChild(this._picker()); }
      else {
        var coupler = api.el('button', 'cf-coupler' + ((this.statedA != null && this.statedB != null) ? '' : ' cf-off')); coupler.type = 'button'; coupler.textContent = api.t('coupler'); coupler.disabled = (this.statedA == null || this.statedB == null);
        if (this.statedA != null && this.statedB != null) coupler.addEventListener('click', function () { self._couple(); });
        side.appendChild(coupler);
        side.appendChild(this._staircase());
      }
      main.appendChild(side); root.appendChild(main);
    },
    _car: function (which, count, sealed) {
      var api = this.api, box = api.el('div', 'cf-carbox cf-car-' + which);
      var cap = api.el('div', 'cf-carcap'); cap.textContent = (which === 'a' ? (LANG === 'es' ? 'Vagón azul' : LANG === 'de' ? 'Blauer Wagen' : (LANG === 'fr' ? 'Wagon bleu' : LANG === 'pt' ? 'Vagão azul' : LANG === 'it' ? 'Vagone azzurro' : LANG === 'nl' ? 'Blauwe wagon' : 'Blue car')) : (LANG === 'es' ? 'Vagón rojo' : LANG === 'de' ? 'Roter Wagen' : (LANG === 'fr' ? 'Wagon rouge' : LANG === 'pt' ? 'Vagão vermelho' : LANG === 'it' ? 'Vagone rosso' : LANG === 'nl' ? 'Rode wagon' : 'Red car'))) + (sealed ? ' 🔒' : ''); box.appendChild(cap);
      box.appendChild(crateGrid(api, count, which));
      return box;
    },
    _move: function (toCar) { if (Core.move(this.cstate, toCar).changed) { this.statedA = null; this.statedB = null; this.msg = null; this.api.sound && this.api.sound(toCar === 'a' ? 520 : 560); this.render(); } },

    _routeCard: function () {
      var self = this, api = this.api, N = this._whole();
      var card = api.el('div', 'cf-route');
      card.appendChild(this._eqnum(N, 'cf-eq-whole'));
      var eq = api.el('span', 'cf-eqop'); eq.textContent = '='; card.appendChild(eq);
      var ba = api.el('button', 'cf-box cf-box-a' + (this.picking === 'a' ? ' cf-picking' : '')); ba.type = 'button'; ba.textContent = (this.statedA != null) ? this.statedA : '?'; ba.addEventListener('click', function () { self.picking = (self.picking === 'a' ? null : 'a'); self.render(); }); card.appendChild(ba);
      var pl = api.el('span', 'cf-eqop'); pl.textContent = '+'; card.appendChild(pl);
      var bb = api.el('button', 'cf-box cf-box-b' + (this.picking === 'b' ? ' cf-picking' : '')); bb.type = 'button'; bb.textContent = (this.statedB != null) ? this.statedB : '?'; bb.addEventListener('click', function () { self.picking = (self.picking === 'b' ? null : 'b'); self.render(); }); card.appendChild(bb);
      return card;
    },
    _eqnum: function (n, cls) { var e = this.api.el('span', 'cf-eqn ' + (cls || '')); e.textContent = n; return e; },
    _picker: function () {
      var self = this, api = this.api, N = this._whole(), box = api.el('div', 'cf-picker');
      var lab = api.el('div', 'cf-pickerlab'); lab.textContent = api.t('pickPrompt'); box.appendChild(lab);
      var chips = api.el('div', 'cf-chips');
      for (var i = 0; i <= N; i++) { (function (v) { var c = api.el('button', 'cf-chip'); c.type = 'button'; c.textContent = v; c.addEventListener('click', function () { if (self.picking === 'a') self.statedA = v; else self.statedB = v; self.picking = null; self.api.sound && self.api.sound(640); self.render(); }); chips.appendChild(c); })(i); }
      box.appendChild(chips); return box;
    },
    _couple: function () {
      var self = this, api = this.api;
      Core.stateParts(this.cstate, this.statedA, this.statedB);
      var res = Core.record(this.cstate);
      if (res === 'recorded') {
        this.api.sound && this.api.sound(880); this.msg = api.t('banked').replace('{a}', this.cstate.a).replace('{b}', this.cstate.b);
        speak(numWord(this._whole()) + (LANG === 'es' ? ' es ' : LANG === 'de' ? ' ist ' : (LANG === 'fr' ? ' c’est ' : LANG === 'pt' ? ' é ' : LANG === 'it' ? ' è ' : LANG === 'nl' ? ' is ' : ' is ')) + numWord(this.cstate.a) + (LANG === 'es' ? ' y ' : LANG === 'de' ? ' und ' : (LANG === 'fr' ? ' et ' : LANG === 'pt' ? ' e ' : LANG === 'it' ? ' e ' : LANG === 'nl' ? ' en ' : ' and ')) + numWord(this.cstate.b));
        this.statedA = null; this.statedB = null;
        if (this.act === 'predict-mirror' && this.cstate.a !== this.cstate.b && !this.mirrorStep) { this.mirrorStep = true; }
        this._checkDone(); if (!this.solved) this.render();
      } else if (res === 'mirror') {
        this.api.sound && this.api.sound(760); this.msg = api.t('mirror').replace('{a}', this.cstate.b).replace('{b}', this.cstate.a);
        this.statedA = null; this.statedB = null;
        if (this.act === 'predict-mirror') { this.solved = true; this._win(); return; }
        this.render();
      } else if (res === 'duplicate') { this.api.sound && this.api.sound(420); this.msg = api.t('dupe'); this.statedA = null; this.statedB = null; this.render(); }
      else { this.api.sound && this.api.sound(330); this.msg = api.t('mismatch'); this.statedA = null; this.statedB = null; this.render(); }
    },
    _checkDone: function () {
      var r = this.round, s = this.cstate, done = false;
      if (this.act === 'make-ten' || this.act === 'equation-build') { var k = (this.act === 'make-ten') ? Core.keyOf(r.sealedCar.k, r.whole - r.sealedCar.k) : Core.keyOf(r.givenEquation.a, r.givenEquation.b); done = !!s.manifest[k]; }
      else if (this.act === 'predict-mirror') { done = false; }   // completes on the mirror (handled in _couple)
      else done = Core.isComplete(r, s);
      if (done) this._win();
    },

    /* ----- judge-route: Chuffer proposes; the child judges new vs duplicate ----- */
    _renderJudge: function (root) {
      var self = this, api = this.api, r = this.round, prop = r.proposed[this.judgeIdx];
      var main = api.el('div', 'cf-main');
      var yard = api.el('div', 'cf-yard');
      var claim = api.el('div', 'cf-claim'); claim.innerHTML = (LANG === 'es' ? 'Chuffer dice: <b>' : LANG === 'de' ? 'Chuffer sagt: <b>' : (LANG === 'fr' ? 'Chuffer dit : <b>' : LANG === 'pt' ? 'O Chuffer diz: <b>' : LANG === 'it' ? 'Chuffer dice: <b>' : LANG === 'nl' ? 'Tuf zegt: <b>' : 'Chuffer says: <b>')) + r.whole + ' = ' + prop.a + ' + ' + prop.b + '</b>'; yard.appendChild(claim);
      var cars = api.el('div', 'cf-cars'); cars.appendChild(this._car('a', prop.a, false)); cars.appendChild(this._car('b', prop.b, false)); yard.appendChild(cars);
      main.appendChild(yard);
      var side = api.el('div', 'cf-side cf-judge');
      var nw = api.el('button', 'cf-jbtn cf-jnew'); nw.type = 'button'; nw.textContent = api.t('newRoute'); nw.addEventListener('click', function () { self._judge(true); });
      var got = api.el('button', 'cf-jbtn cf-jgot'); got.type = 'button'; got.textContent = api.t('gotIt'); got.addEventListener('click', function () { self._judge(false); });
      side.appendChild(nw); side.appendChild(got);
      side.appendChild(this._staircase());
      main.appendChild(side); root.appendChild(main);
    },
    _judge: function (sayNew) {
      var self = this, r = this.round, prop = r.proposed[this.judgeIdx], s = this.cstate;
      var key = Core.keyOf(prop.a, prop.b), isNew = !s.manifest[key];
      if (sayNew === isNew) {
        if (isNew) { s.manifest[key] = true; speak(numWord(r.whole) + (LANG === 'es' ? ' es ' : LANG === 'de' ? ' ist ' : (LANG === 'fr' ? ' c’est ' : LANG === 'pt' ? ' é ' : LANG === 'it' ? ' è ' : LANG === 'nl' ? ' is ' : ' is ')) + numWord(prop.a) + (LANG === 'es' ? ' y ' : LANG === 'de' ? ' und ' : (LANG === 'fr' ? ' et ' : LANG === 'pt' ? ' e ' : LANG === 'it' ? ' e ' : LANG === 'nl' ? ' en ' : ' and ')) + numWord(prop.b)); }
        this.api.sound && this.api.sound(820); this.msg = null; this.judgeIdx++;
        if (this.judgeIdx >= r.proposed.length) { this._win(); return; } this.render();
      } else { this.api.sound && this.api.sound(330); this.msg = (LANG === 'es') ? (isNew ? '¡Mira, todavía no está en la bitácora!' : 'Mira otra vez… esa ya la tenemos.') : (LANG === 'de') ? (isNew ? 'Schau – der steht noch nicht im Buch!' : 'Schau noch mal – den haben wir schon!') : (LANG === 'fr' ? (isNew ? 'Regarde — il n’est pas encore dans le carnet !' : 'Regarde encore — on l’a déjà, celui-là !') : (LANG === 'pt' ? (isNew ? 'Olha — ainda não está no caderno!' : 'Olha de novo — essa a gente já tem!') : LANG === 'it' ? (isNew ? 'Guarda: non è ancora sul quaderno!' : 'Guarda meglio: questo modo lo abbiamo già!') : LANG === 'nl' ? (isNew ? 'Kijk — die staat nog niet in het boek!' : 'Kijk nog eens — die hebben we al!') : (isNew ? "Look — it's not in the book yet!" : "Look again — we already have that one!"))); this.render(); }
    },

    _win: function () { this.solved = true; this.solvedCount = Math.min(this.solvedCount + 1, (this._pool && this._pool.length) || 9); this.api.sound && this.api.sound(940); this.render(); this.announce(this.api.t('win')); speak(LANG === 'es' ? 'Chuffer llegó a la estación' : LANG === 'de' ? 'Chuffer ist am Bahnhof angekommen' : (LANG === 'fr' ? 'Chuffer est arrivé à la gare' : LANG === 'pt' ? 'O Chuffer chegou na estação' : LANG === 'it' ? 'Chuffer è arrivato alla stazione' : LANG === 'nl' ? 'Tuf is op het station aangekomen' : 'Chuffer reached the station')); },

    _staircase: function () {
      var api = this.api, N = this._whole(), s = this.cstate, ways = Core.waysFor(N), book = api.el('div', 'cf-book');
      var title = api.el('div', 'cf-booktitle'); title.textContent = (LANG === 'es' ? 'La bitácora' : LANG === 'de' ? 'Fahrtenbuch' : (LANG === 'fr' ? 'Carnet de route' : LANG === 'pt' ? 'Caderno de rotas' : LANG === 'it' ? 'Quaderno di viaggio' : LANG === 'nl' ? 'Ritboek' : 'Route-book')); book.appendChild(title);
      var rungs = api.el('div', 'cf-rungs');
      ways.forEach(function (w) {
        var have = !!s.manifest[Core.keyOf(w.a, w.b)];
        var rung = api.el('div', 'cf-rung' + (have ? ' cf-have' : ' cf-gap'));
        rung.textContent = have ? (w.a + '+' + w.b) : '?';   // compact — the whole N is in the route-card
        rungs.appendChild(rung);
      });
      book.appendChild(rungs); return book;
    },

    _renderDone: function (root) {
      var api = this.api, N = this._whole();
      var hill = api.el('div', 'cf-hill');
      for (var i = 0; i < ((this._pool && this._pool.length) || 9); i++) { var p = api.el('span', 'cf-plank' + (i < this.solvedCount ? ' cf-plank-on' : '')); p.textContent = '🚂'; hill.appendChild(p); }
      root.appendChild(hill);
      if (this.act !== 'judge-route') { root.appendChild(this._staircase()); }
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
      fetch('/mini-tools/chuffer-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[chuffer] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.cf-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.cf-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.6vw,10px);background:linear-gradient(180deg,#FBF3E4,#F2E8D2);border-radius:20px;padding:clamp(8px,1.9vw,13px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        + '.cf-head{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;width:100%;}'
        + '.cf-loco{width:clamp(44px,10vw,56px);flex:0 0 auto;}.cf-loco-svg{width:100%;height:auto;display:block;}'
        + '.cf-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:5px 10px;font:700 clamp(12px,3vw,14px)/1.2 "Nunito",sans-serif;color:' + C.T + ';max-width:80%;}'
        + '.cf-main{display:flex;flex-direction:column;align-items:center;gap:clamp(8px,2vw,14px);width:100%;}'
        + '@media (min-width:768px){.cf-main{flex-direction:row;align-items:flex-start;justify-content:center;gap:22px;}.cf-side{width:auto;flex:0 1 auto;}.cf-yard{width:auto;flex:0 1 auto;}}'
        + '.cf-yard{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;}'
        + '.cf-whole{font:700 clamp(13px,3.4vw,16px)/1 "Nunito",sans-serif;color:' + C.T + ';}.cf-wholenum{font:800 clamp(20px,5.5vw,26px) "Baloo 2",sans-serif;color:' + C.T + ';}'
        /* cars */
        + '.cf-cars{display:flex;gap:clamp(8px,2.4vw,16px);justify-content:center;}'
        + '.cf-carbox{display:flex;flex-direction:column;align-items:center;gap:4px;}'
        + '.cf-carcap{font:800 clamp(11px,2.9vw,13px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.cf-frame{display:grid;grid-template-columns:repeat(5,clamp(15px,4vw,20px));grid-template-rows:repeat(2,clamp(15px,4vw,20px));gap:3px;background:#E7D9BD;padding:5px;border-radius:10px;box-shadow:inset 0 2px 5px rgba(120,90,40,.16);}'
        + '.cf-cell{width:clamp(15px,4vw,20px);height:clamp(15px,4vw,20px);border-radius:4px;background:#FCF6EA;border:1px solid rgba(20,107,94,.1);}'
        + '.cf-filled.cf-a{background:' + C.BLUE + ';border-color:' + C.BLUE2 + ';}.cf-filled.cf-b{background:' + C.RED + ';border-color:' + C.RED2 + ';}'
        /* shifter */
        + '.cf-shift{display:flex;align-items:center;gap:8px;}'
        + '.cf-shiftbtn{min-width:48px;min-height:48px;border-radius:13px;border:0;background:' + C.T + ';color:#fff;font:800 20px/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 #0e4f45;touch-action:manipulation;}.cf-shiftbtn:active{transform:translateY(2px);}'
        + '.cf-shiftlab{font:700 clamp(11px,2.8vw,13px)/1 "Nunito",sans-serif;color:' + C.T + ';}'
        /* route-card */
        + '.cf-side{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;}'
        + '.cf-route{display:inline-flex;align-items:center;gap:6px;background:#fff;border:2px solid rgba(20,107,94,.2);border-radius:14px;padding:6px 13px;}'
        + '.cf-eqn{font:800 clamp(22px,6vw,30px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}.cf-eqop{font:800 clamp(18px,5vw,24px)/1 "Baloo 2",sans-serif;color:#9a8f78;}'
        + '.cf-box{min-width:46px;min-height:46px;border-radius:11px;border:2px dashed ' + C.T + ';background:#F4FAF8;font:800 clamp(20px,5.5vw,26px)/1 "Baloo 2",sans-serif;color:' + C.T + ';cursor:pointer;touch-action:manipulation;}'
        + '.cf-box-a{color:' + C.BLUE2 + ';border-color:' + C.BLUE + ';}.cf-box-b{color:' + C.RED2 + ';border-color:' + C.RED + ';}'
        + '.cf-box.cf-picking{background:#FFF6E4;box-shadow:0 0 0 3px rgba(232,165,58,.3);}'
        + '.cf-picker{display:flex;flex-direction:column;align-items:stretch;gap:4px;background:#FFF9EC;border-radius:12px;padding:6px 8px;width:min(74vw,244px);margin:0 auto;}'
        + '.cf-pickerlab{font:700 clamp(11px,2.8vw,13px)/1 "Nunito",sans-serif;color:' + C.T + ';}'
        + '.cf-chips{display:flex;flex-wrap:nowrap;gap:4px;justify-content:flex-start;overflow-x:auto;width:100%;padding-bottom:2px;-webkit-overflow-scrolling:touch;}'
        + '.cf-chip{min-width:44px;min-height:44px;border-radius:10px;border:2px solid rgba(20,107,94,.2);background:#fff;color:' + C.T + ';font:800 clamp(15px,4vw,18px)/1 "Baloo 2",sans-serif;cursor:pointer;touch-action:manipulation;}.cf-chip:active{transform:translateY(1px);}'
        /* coupler */
        + '.cf-coupler{min-height:50px;padding:0 clamp(16px,5vw,26px);border-radius:15px;border:0;background:' + C.RED + ';color:#fff;font:800 clamp(14px,3.8vw,18px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.RED2 + ';touch-action:manipulation;}.cf-coupler:active{transform:translateY(2px);}.cf-coupler.cf-off{opacity:.45;box-shadow:0 3px 0 rgba(20,107,94,.25);}'
        /* judge */
        + '.cf-claim{font:700 clamp(13px,3.4vw,16px)/1.2 "Nunito",sans-serif;color:' + C.T + ';text-align:center;}.cf-claim b{font-family:"Baloo 2";font-size:clamp(18px,5vw,24px);}'
        + '.cf-judge{flex-direction:column;}.cf-jbtn{min-height:48px;min-width:130px;padding:0 18px;border-radius:14px;border:0;color:#fff;font:800 clamp(14px,3.8vw,17px)/1 "Baloo 2",sans-serif;cursor:pointer;touch-action:manipulation;}'
        + '.cf-jnew{background:' + C.T + ';box-shadow:0 3px 0 #0e4f45;}.cf-jgot{background:' + C.GOLD + ';color:#3a2a00;box-shadow:0 3px 0 #c8841f;}.cf-jbtn:active{transform:translateY(2px);}'
        /* route-book — a thin horizontal strip on phone (scrolls); the vertical staircase returns at desktop */
        + '.cf-book{background:#EAF2EE;border-radius:13px;padding:5px 8px;width:100%;max-width:300px;}'
        + '.cf-booktitle{font:800 clamp(10px,2.6vw,12px)/1 "Baloo 2",sans-serif;color:' + C.T + ';text-transform:uppercase;letter-spacing:.04em;text-align:center;margin-bottom:3px;}'
        + '.cf-rungs{display:flex;flex-direction:row;flex-wrap:wrap;gap:3px;justify-content:center;}'
        + '.cf-rung{font:800 clamp(12px,3.1vw,15px)/1.2 "Baloo 2",sans-serif;text-align:center;border-radius:7px;padding:2px 6px;white-space:nowrap;}'
        + '.cf-have{background:' + C.T + ';color:#fff;}.cf-gap{background:#fff;color:#b9b0a0;border:1px dashed rgba(20,107,94,.25);}'
        /* done */
        + '.cf-hill{display:flex;gap:2px;flex-wrap:wrap;justify-content:center;}'
        + '.cf-plank{font-size:clamp(15px,3.6vw,19px);filter:grayscale(1) opacity(.4);}.cf-plank-on{filter:none;}'
        + '.cf-shiftbtn:focus-visible,.cf-box:focus-visible,.cf-chip:focus-visible,.cf-coupler:focus-visible,.cf-jbtn:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:760px),(max-width:480px){.cf-root{gap:4px;padding:7px;}.cf-loco{width:clamp(38px,8vw,46px);}.cf-main{gap:6px;}.cf-yard{gap:5px;}.cf-side{gap:5px;}.cf-frame{grid-template-columns:repeat(5,15px);grid-template-rows:repeat(2,15px);}.cf-cell{width:15px;height:15px;}.cf-shiftbtn{min-width:44px;min-height:44px;}.cf-coupler{min-height:46px;}}'
        + '@media (max-height:640px){.cf-root{gap:3px;}.cf-main{gap:5px;}.cf-route{padding:4px 10px;}}'
        /* the 320×640 sub-floor — the shell header alone eats ~311px; compact everything so the active controls + the shell Check clear the fold */
        + '@media (max-height:660px){.cf-root{gap:3px;padding:6px;}.cf-loco{width:36px;}.cf-head{gap:6px;}.cf-yard{gap:4px;}.cf-side{gap:4px;}.cf-frame{grid-template-columns:repeat(5,13px);grid-template-rows:repeat(2,13px);gap:2px;padding:4px;}.cf-cell{width:13px;height:13px;}.cf-carcap{font-size:11px;}.cf-shiftbtn{min-width:44px;min-height:44px;font-size:18px;}.cf-route{padding:3px 9px;}.cf-eqn{font-size:22px;}.cf-box{min-height:40px;font-size:22px;}.cf-coupler{min-height:42px;}.cf-shiftbtn{min-height:42px;}.cf-book{display:none;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-chuffer', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'chuffer.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
