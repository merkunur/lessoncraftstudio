/* =====================================================================
   counting-necklace-activity.js — ACTIVITY #9 of the one-by-one rebuild:
   "The Necklace That Won't Hold Still" (K.CC.B.4) — THE COUNTING NECKLACE.
   Design sheet: docs/activities-rebuild/009-counting-necklace.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: A NECKLACE WHOSE BEADS CANNOT BE SKIPPED. A round necklace
   with a clasp at the top; a tap slides the NEXT bead along the cord to the
   clasp side — beads cannot pass each other on a string, so each bead is
   counted once (K.CC.B.4a). The count shows (and is spoken) as the beads
   slide, then fades: "How many beads?" — the last number counted (B.4b).
   Then the necklace won't hold still: the beads glide apart, squeeze
   together, or one more bead comes on — "How many now?" (B.4b the number
   stays the same however the beads lie; B.4c one more). Three big number
   cards answer; a wrong card is named (the last number tells how many · the
   beads only moved · only one came on); Count again is always there. No
   mascot: a cord, a clasp, beads, number cards.

   ACTIVITY LAYER ONLY: the model is counting-necklace-core.js; lcs-shell.js
   is untouched. Test seams: window.CountingNecklaceActivity.st / ._order / ._pool.
   ===================================================================== */
'use strict';

var CountingNecklaceActivity = {
  id: 'counting-necklace',
  apparatusClasses: ['nk-'],

  strings: {
    title:          {en:'The Counting Necklace',de:'Die Zählkette',fr:'Le collier à compter',it:'La collana per contare',es:'El collar para contar',pt:'O colar de contar',nl:'De telketting',sv:'Räknehalsbandet',da:'Tællekæden',no:'Tellekjedet',fi:'Laskukaulakoru'},
    instruction:    {en:'Tap the necklace: the next bead slides past the clasp. Count each bead as it moves.',de:'Tippe auf die Kette: Die nächste Perle rutscht zum Verschluss. Zähle jede Perle, die rutscht.',fr:'Touche le collier : la perle suivante glisse jusqu’au fermoir. Compte chaque perle qui bouge.',it:'Tocca la collana: la perlina successiva scivola fino al gancio. Conta ogni perlina che si sposta.',es:'Toca el collar: la siguiente perla se desliza hasta el broche. Cuenta cada perla que se mueve.',pt:'Toque no colar: a próxima conta desliza até o fecho. Conte cada conta que se mexe.',nl:'Tik op de ketting: de volgende kraal schuift naar het slotje. Tel elke kraal die schuift.',sv:'Tryck på halsbandet: nästa pärla glider fram till låset. Räkna varje pärla som flyttas.',da:'Tryk på halskæden: Den næste perle glider hen til låsen. Tæl hver perle, der flytter sig.',no:'Trykk på halskjedet: Den neste perlen glir bort til låsen. Tell hver perle som flytter seg.',fi:'Napauta kaulakorua: seuraava helmi liukuu lukon luo. Laske jokainen helmi, joka liikkuu.'},
    promptCount:    {en:'How many beads are on the necklace?',de:'Wie viele Perlen sind an der Kette?',fr:'Combien de perles y a-t-il sur le collier ?',it:'Quante perline ci sono sulla collana?',es:'¿Cuántas perlas tiene el collar?',pt:'Quantas contas tem o colar?',nl:'Hoeveel kralen zitten er aan de ketting?',sv:'Hur många pärlor sitter på halsbandet?',da:'Hvor mange perler er der på halskæden?',no:'Hvor mange perler er det på halskjedet?',fi:'Montako helmeä kaulakorussa on?'},
    celebrate:      {en:'Yes — {n} beads!',de:'Genau: {n} Perlen!',fr:'Oui : {n} perles !',it:'Esatto: {n} perline!',es:'¡Exacto: {n} perlas!',pt:'Isso mesmo: {n} contas!',nl:'Precies: {n} kralen!',sv:'Precis: {n} pärlor!',da:'Præcis: {n} perler!',no:'Helt riktig: {n} perler!',fi:'Hienoa – {n} helmeä!'},
    qHowMany:       {en:'How many beads?',de:'Wie viele Perlen?',fr:'Combien de perles ?',it:'Quante perline?',es:'¿Cuántas perlas?',pt:'Quantas contas?',nl:'Hoeveel kralen?',sv:'Hur många pärlor?',da:'Hvor mange perler?',no:'Hvor mange perler?',fi:'Montako helmeä?'},
    qSpread:        {en:'The beads slid apart. How many beads now?',de:'Die Perlen sind auseinandergerutscht. Wie viele Perlen sind es jetzt?',fr:'Les perles se sont écartées. Combien de perles maintenant ?',it:'Le perline si sono allontanate. Quante perline ci sono adesso?',es:'Las perlas se separaron. ¿Cuántas perlas hay ahora?',pt:'As contas se separaram. Quantas contas há agora?',nl:'De kralen zijn uit elkaar geschoven. Hoeveel kralen zijn het nu?',sv:'Pärlorna gled isär. Hur många pärlor är det nu?',da:'Perlerne gled fra hinanden. Hvor mange perler er der nu?',no:'Perlene gled fra hverandre. Hvor mange perler er det nå?',fi:'Helmet liukuivat erilleen. Montako helmeä nyt on?'},
    qBunch:         {en:'The beads slid close together. How many beads now?',de:'Die Perlen sind eng zusammengerutscht. Wie viele Perlen sind es jetzt?',fr:'Les perles se sont serrées. Combien de perles maintenant ?',it:'Le perline si sono strette tra loro. Quante perline ci sono adesso?',es:'Las perlas se juntaron. ¿Cuántas perlas hay ahora?',pt:'As contas se juntaram. Quantas contas há agora?',nl:'De kralen zijn dicht tegen elkaar geschoven. Hoeveel kralen zijn het nu?',sv:'Pärlorna gled tätt ihop. Hur många pärlor är det nu?',da:'Perlerne gled tæt sammen. Hvor mange perler er der nu?',no:'Perlene gled tett sammen. Hvor mange perler er det nå?',fi:'Helmet liukuivat tiiviisti yhteen. Montako helmeä nyt on?'},
    qOneMore:       {en:'One more bead went on the necklace. How many beads now?',de:'Eine Perle ist dazugekommen. Wie viele Perlen sind es jetzt?',fr:'Une perle de plus est arrivée sur le collier. Combien de perles maintenant ?',it:'È arrivata un’altra perlina sulla collana. Quante perline ci sono adesso?',es:'Llegó una perla más al collar. ¿Cuántas perlas hay ahora?',pt:'Entrou mais uma conta no colar. Quantas contas há agora?',nl:'Er is nog één kraal bij gekomen. Hoeveel kralen zijn het nu?',sv:'En pärla till kom på halsbandet. Hur många pärlor är det nu?',da:'Der kom én perle mere på halskæden. Hvor mange perler er der nu?',no:'Det kom én perle til på halskjedet. Hvor mange perler er det nå?',fi:'Kaulakoruun tuli yksi helmi lisää. Montako helmeä nyt on?'},
    noteLast:       {en:'The last number you counted tells how many. Count again if you like.',de:'Die letzte Zahl, die du gezählt hast, sagt, wie viele es sind. Du kannst noch einmal zählen.',fr:'Le dernier nombre que tu as compté dit combien il y en a. Tu peux recompter.',it:'L’ultimo numero che hai contato dice quante sono. Se vuoi, conta di nuovo.',es:'El último número que contaste dice cuántas hay. Si quieres, vuelve a contar.',pt:'O último número que você contou diz quantas são. Se quiser, conte de novo.',nl:'Het laatste getal dat je telde, zegt hoeveel het er zijn. Je mag opnieuw tellen.',sv:'Det sista talet du räknade säger hur många det är. Du kan räkna igen.',da:'Det sidste tal, du talte, siger, hvor mange der er. Du må gerne tælle igen.',no:'Det siste tallet du telte, sier hvor mange det er. Du kan telle igjen.',fi:'Viimeinen luku, jonka laskit, kertoo, montako niitä on. Voit laskea uudelleen.'},
    noteMoved:      {en:'The beads only moved. No bead came on or fell off.',de:'Die Perlen sind nur gerutscht. Keine ist dazugekommen, keine ist abgefallen.',fr:'Les perles ont seulement bougé. Aucune n’est arrivée, aucune n’est tombée.',it:'Le perline si sono solo spostate. Nessuna è arrivata e nessuna è caduta.',es:'Las perlas solo se movieron. No llegó ninguna y no se cayó ninguna.',pt:'As contas só se mexeram. Nenhuma entrou e nenhuma caiu.',nl:'De kralen zijn alleen verschoven. Er kwam er geen bij en er viel er geen af.',sv:'Pärlorna flyttades bara. Ingen kom på och ingen föll av.',da:'Perlerne flyttede sig bare. Ingen kom til, og ingen faldt af.',no:'Perlene bare flyttet seg. Ingen kom til, og ingen falt av.',fi:'Helmet vain liikkuivat. Yhtään ei tullut lisää eikä pudonnut pois.'},
    noteOneOn:      {en:'One more bead went on — that is one more than before.',de:'Eine Perle ist dazugekommen – das ist eine mehr als vorher.',fr:'Une perle de plus est arrivée : ça fait une de plus qu’avant.',it:'È arrivata un’altra perlina: è una in più di prima.',es:'Llegó una perla más: es una más que antes.',pt:'Entrou mais uma conta: é uma a mais do que antes.',nl:'Er kwam één kraal bij: dat is er één meer dan eerst.',sv:'En pärla till kom på – det är en mer än förut.',da:'Der kom én perle mere på – det er én mere end før.',no:'Det kom én perle til – det er én mer enn før.',fi:'Yksi helmi tuli lisää – se on yksi enemmän kuin ennen.'},
    noteOnlyOne:    {en:'Only one bead went on, not more.',de:'Es ist nur eine Perle dazugekommen, nicht mehr.',fr:'Une seule perle est arrivée, pas plus.',it:'È arrivata una perlina sola, non di più.',es:'Llegó solo una perla, no más.',pt:'Entrou só uma conta, não mais.',nl:'Er kwam maar één kraal bij, niet meer.',sv:'Bara en pärla kom till, inte fler.',da:'Der kom kun én perle mere, ikke flere.',no:'Det kom bare én perle til, ikke flere.',fi:'Vain yksi helmi tuli lisää, ei enempää.'},
    recount:        {en:'Count again',de:'Noch mal zählen',fr:'Recompter',it:'Riconta',es:'Volver a contar',pt:'Contar de novo',nl:'Opnieuw tellen',sv:'Räkna igen',da:'Tæl igen',no:'Tell igjen',fi:'Laske uudelleen'},
    hintSlide:      {en:'Tap the necklace to slide the next bead past the clasp, and count.',de:'Tippe auf die Kette, damit die nächste Perle zum Verschluss rutscht, und zähle mit.',fr:'Touche le collier pour faire glisser la perle suivante jusqu’au fermoir, et compte.',it:'Tocca la collana per far scivolare la perlina successiva fino al gancio, e conta.',es:'Toca el collar para que la siguiente perla se deslice hasta el broche, y cuenta.',pt:'Toque no colar para a próxima conta deslizar até o fecho, e conte.',nl:'Tik op de ketting om de volgende kraal naar het slotje te schuiven, en tel mee.',sv:'Tryck på halsbandet så glider nästa pärla fram till låset – och räkna.',da:'Tryk på halskæden, så glider den næste perle hen til låsen – og tæl.',no:'Trykk på halskjedet, så glir den neste perlen bort til låsen – og tell.',fi:'Napauta kaulakorua, niin seuraava helmi liukuu lukon luo – ja laske.'},
    hintPick:       {en:'Tap the number that tells how many.',de:'Tippe auf die Zahl, die sagt, wie viele es sind.',fr:'Touche le nombre qui dit combien il y en a.',it:'Tocca il numero che dice quante sono.',es:'Toca el número que dice cuántas hay.',pt:'Toque no número que diz quantas são.',nl:'Tik op het getal dat zegt hoeveel het er zijn.',sv:'Tryck på talet som säger hur många det är.',da:'Tryk på det tal, der siger, hvor mange der er.',no:'Trykk på tallet som sier hvor mange det er.',fi:'Napauta lukua, joka kertoo, montako niitä on.'},
    necklaceLabel:  {en:'The necklace — tap to slide the next bead past the clasp',de:'Die Kette – tippen, damit die nächste Perle zum Verschluss rutscht',fr:'Le collier – touche pour faire glisser la perle suivante jusqu’au fermoir',it:'La collana – tocca per far scivolare la perlina successiva fino al gancio',es:'El collar: toca para deslizar la siguiente perla hasta el broche',pt:'O colar: toque para a próxima conta deslizar até o fecho',nl:'De ketting – tik om de volgende kraal naar het slotje te schuiven',sv:'Halsbandet – tryck så glider nästa pärla fram till låset',da:'Halskæden – tryk, så glider den næste perle hen til låsen',no:'Halskjedet – trykk, så glir den neste perlen bort til låsen',fi:'Kaulakoru – napauta, niin seuraava helmi liukuu lukon luo'},
    counterLabel:   {en:'Counted: {k}',de:'Gezählt: {k}',fr:'Comptées : {k}',it:'Contate: {k}',es:'Contadas: {k}',pt:'Contadas: {k}',nl:'Geteld: {k}',sv:'Räknat: {k}',da:'Talt: {k}',no:'Telt: {k}',fi:'Laskettu: {k}'},
    cardsLabel:     {en:'Number cards',de:'Zahlenkarten',fr:'Cartes nombres',it:'Carte dei numeri',es:'Tarjetas de números',pt:'Cartões de números',nl:'Getalkaarten',sv:'Talkort',da:'Talkort',no:'Tallkort',fi:'Lukukortit'},
    setRange:       {en:'Beads',de:'Perlen',fr:'Perles',it:'Perline',es:'Perlas',pt:'Contas',nl:'Kralen',sv:'Pärlor',da:'Perler',no:'Perler',fi:'Helmet'},
    rangeTo5:       {en:'Up to 5',de:'Bis 5',fr:'Jusqu’à 5',it:'Fino a 5',es:'Hasta 5',pt:'Até 5',nl:'Tot en met 5',sv:'Upp till 5',da:'Op til 5',no:'Opptil 5',fi:'5:een asti'},
    rangeTo10:      {en:'Up to 10',de:'Bis 10',fr:'Jusqu’à 10',it:'Fino a 10',es:'Hasta 10',pt:'Até 10',nl:'Tot en met 10',sv:'Upp till 10',da:'Op til 10',no:'Opptil 10',fi:'10:een asti'},
    setNumbers:     {en:'Counting numbers',de:'Zählzahlen',fr:'Nombres du comptage',it:'Numeri del conteggio',es:'Números al contar',pt:'Números da contagem',nl:'Telgetallen',sv:'Räknetal',da:'Tælletal',no:'Telletall',fi:'Luvut laskiessa'},
    numbersShown:   {en:'Shown',de:'Anzeigen',fr:'Affichés',it:'Visibili',es:'Visibles',pt:'Visíveis',nl:'Tonen',sv:'Visas',da:'Vises',no:'Vises',fi:'Näkyvissä'},
    numbersHidden:  {en:'Said aloud',de:'Laut sagen',fr:'Dits à voix haute',it:'Detti ad alta voce',es:'En voz alta',pt:'Em voz alta',nl:'Hardop zeggen',sv:'Sägs högt',da:'Siges højt',no:'Sies høyt',fi:'Ääneen'}
  },

  defaults: { range: 'to10', numbers: 'shown' },
  settings: [
    { key: 'range', type: 'choice', labelKey: 'setRange', options: [{ value: 'to5', labelKey: 'rangeTo5' }, { value: 'to10', labelKey: 'rangeTo10' }] },
    { key: 'numbers', type: 'choice', labelKey: 'setNumbers', options: [{ value: 'shown', labelKey: 'numbersShown' }, { value: 'hidden', labelKey: 'numbersHidden' }] }
  ],

  TWIST_MS: 750, FADE_MS: 900, CHECK_MS: 600,

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._ro = null; this._timers = []; this._freeze = null; this._fading = false;
    injectNecklaceCSS();
    void self;
  },
  destroy: function () {
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; }
    this._clearTimers();
  },
  onSettings: function () {
    this._pool = null; this._order = null;
    if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },

  /* ---------------- rounds ---------------- */
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _range: function () { var r = this.api && this.api.settings && this.api.settings.range; return CountingNecklaceCore.POOLS[r] ? r : 'to10'; },
  _shown: function () { var v = this.api && this.api.settings && this.api.settings.numbers; return v !== 'hidden'; },
  _ensurePool: function () { var key = this._range(); if (!this._pool || this._poolKey !== key) { this._pool = CountingNecklaceCore.rounds(key, 'nk'); this._poolKey = key; this._order = null; } return this._pool; },
  _shuffled: function (n, prev) {
    var a = [], i, j, t;
    for (i = 0; i < n; i++) a.push(i);
    for (var g = 0; g < 10; g++) {
      for (i = n - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; }
      if (!prev || n < 2 || a.join(',') !== prev.join(',')) break;
    }
    return a;
  },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length;
    var index = (opts && opts.index) || 0;
    if (!this._order || this._order.length !== n) { this._order = this._shuffled(n, null); this._curPass = Math.floor(index / n); }
    var pass = Math.floor(index / n);
    if (pass > this._curPass) { this._order = this._shuffled(n, this._order); this._curPass = pass; }
    var r = pool[this._order[index % n]];
    return {
      id: 'counting-necklace.' + r.id,
      promptKey: 'promptCount',
      promptArgs: { n: CountingNecklaceCore.finalAnswer(r) },
      celebrateKey: 'celebrate',
      answerType: 'state',
      setup: function (tool) { tool._clearTimers(); tool.st = CountingNecklaceCore.newState(r); tool._freeze = null; tool._fading = false; },
      check: function (tool) { return !!(tool.st && tool.st.done); },
      hintKey: function (tool) { return CountingNecklaceCore.hintKey(tool.st); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, t = api.t, self = this, C = CountingNecklaceCore;
    var stage = api.stage;
    stage.innerHTML = '';
    if (!this.st) this.st = C.newState(C.rounds('to10', 'nk')[1]);
    var wrap = api.el('div', 'nk-wrap'); this._wrap = wrap;

    /* the necklace: a button holding the SVG (cord, clasp, beads) */
    var btn = api.el('button', 'nk-necklace'); btn.type = 'button'; btn.setAttribute('aria-label', t('necklaceLabel'));
    btn.addEventListener('click', function () { self._slide(); });
    var NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('viewBox', '0 0 ' + C.VB + ' ' + C.VB); svg.setAttribute('class', 'nk-svg'); svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('focusable', 'false');
    var defs = document.createElementNS(NS, 'defs');
    var GRAD = { coral: ['#FFB199', '#F2784B', '#C9542B'], teal: ['#8FD9CF', '#2A9D8F', '#1C6E64'], gold: ['#FFE29A', '#F4B740', '#C68A16'], plum: ['#D2B3F4', '#9B5DE5', '#6B3BAA'], sky: ['#B6DCF7', '#4EA8DE', '#2C74A6'] };
    Object.keys(GRAD).forEach(function (k) {
      var g = document.createElementNS(NS, 'radialGradient'); g.setAttribute('id', 'nk-g-' + k); g.setAttribute('cx', '38%'); g.setAttribute('cy', '32%'); g.setAttribute('r', '72%');
      [['0%', GRAD[k][0]], ['55%', GRAD[k][1]], ['100%', GRAD[k][2]]].forEach(function (s) { var st = document.createElementNS(NS, 'stop'); st.setAttribute('offset', s[0]); st.setAttribute('stop-color', s[1]); g.appendChild(st); });
      defs.appendChild(g);
    });
    svg.appendChild(defs);
    var cord = document.createElementNS(NS, 'circle'); cord.setAttribute('cx', C.CX); cord.setAttribute('cy', C.CY); cord.setAttribute('r', C.R); cord.setAttribute('class', 'nk-cord'); svg.appendChild(cord);
    var clasp = document.createElementNS(NS, 'g'); clasp.setAttribute('class', 'nk-clasp');
    clasp.innerHTML = '<rect x="188" y="26" width="24" height="28" rx="7" class="nk-clasp-body"/><circle cx="200" cy="40" r="5" class="nk-clasp-pin"/>';
    svg.appendChild(clasp);
    this._beads = [];
    for (var i = 0; i < C.MAXB; i++) {
      var g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'nk-bead');
      g.innerHTML = '<circle cx="200" cy="40" r="' + C.BEAD + '" class="nk-bead-ball"/><ellipse cx="192" cy="31" rx="8" ry="5.5" class="nk-bead-shine"/><line x1="200" y1="' + (40 - C.BEAD + 3) + '" x2="200" y2="' + (40 + C.BEAD - 3) + '" class="nk-bead-hole"/>';
      svg.appendChild(g); this._beads.push(g);
    }
    btn.appendChild(svg);
    /* the count, in the middle of the necklace */
    var counter = api.el('div', 'nk-counter'); counter.setAttribute('aria-live', 'polite'); this._counter = counter; btn.appendChild(counter);
    this._necklace = btn;
    wrap.appendChild(btn);

    /* the panel: the question, three cards, the note, Count again */
    var panel = api.el('div', 'nk-panel'); this._panel = panel;
    /* the question stands in the middle of the necklace, where the count stood — next to the beads it asks about */
    var q = api.el('div', 'nk-question'); q.setAttribute('aria-live', 'polite'); this._question = q; btn.appendChild(q);
    var cards = api.el('div', 'nk-cards'); cards.setAttribute('role', 'group'); cards.setAttribute('aria-label', t('cardsLabel')); this._cards = cards;
    this._cardEls = [];
    for (var c = 0; c < 3; c++) { (function (ci) { var b = api.el('button', 'nk-card'); b.type = 'button'; b.addEventListener('click', function () { self._pick(ci); }); cards.appendChild(b); self._cardEls.push(b); }(c)); }
    panel.appendChild(cards);
    var note = api.el('div', 'nk-note'); note.setAttribute('aria-live', 'polite'); this._note = note; panel.appendChild(note);
    var rc = api.el('button', 'nk-recount'); rc.type = 'button'; rc.textContent = t('recount'); rc.addEventListener('click', function () { self._recount(); }); this._recountBtn = rc; panel.appendChild(rc);
    wrap.appendChild(panel);

    stage.appendChild(wrap);
    this._layout();
    this._paint(true);
    this._watchWidth();
  },
  _layout: function () {
    var L = this._L = CountingNecklaceCore.layout(this._width());
    var w = this._wrap;
    w.classList.toggle('is-row', L.mode === 'row');
    w.classList.toggle('is-stack', L.mode === 'stack');
    w.style.setProperty('--nk-d', L.D + 'px');
    w.style.setProperty('--nk-card', L.card + 'px');
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () {
      var w = self._width();
      if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return;
      last = w; self._layout(); self._paint(true);
    });
    this._ro.observe(this.api.stage);
  },

  /* paint; `instant` lays the beads without the slide (first paint, resize) */
  _paint: function (instant) {
    var st = this.st, t = this.api.t, C = CountingNecklaceCore, view = this._freeze || st;
    var wrap = this._wrap;
    wrap.classList.toggle('is-done', st.done);
    wrap.classList.toggle('is-instant', !!instant);
    /* beads */
    for (var i = 0; i < C.MAXB; i++) {
      var g = this._beads[i], on = i < view.total;
      g.style.display = on ? '' : 'none';
      if (!on) continue;
      g.style.transform = 'rotate(' + view.angles[i].toFixed(2) + 'deg)';
      g.querySelector('.nk-bead-ball').setAttribute('fill', 'url(#nk-g-' + st.colors[i] + ')');
      g.classList.toggle('is-counted', i < view.counted);
    }
    if (instant) { void wrap.offsetWidth; wrap.classList.remove('is-instant'); }
    /* the necklace takes taps only while counting */
    var counting = st.phase === 'count' && !this._freeze;
    this._necklace.disabled = !counting;
    this._necklace.classList.toggle('is-live', counting);
    /* the count in the middle */
    var showCount = this._shown() && (st.counted > 0) && (st.phase === 'count' || this._fading);
    this._counter.textContent = showCount ? String(st.counted) : '';
    this._counter.classList.toggle('is-on', showCount);
    this._counter.setAttribute('aria-label', showCount ? interp(t('counterLabel'), { k: st.counted }) : '');
    /* the question and the cards */
    var q = this._fading ? null : (this._freeze ? this._freeze.q : C.question(st));
    var qkey = !q ? '' : (this._freeze ? this._freeze.qkey : this._qKey());
    this._question.textContent = qkey ? t(qkey) : '';
    this._question.hidden = !qkey;
    /* the three cards stand from the start, blank and waiting, so the stage does not jump when the question comes */
    this._cards.classList.toggle('is-wait', !q);
    for (var c = 0; c < 3; c++) {
      var b = this._cardEls[c], v = q ? q.cards[c] : null;
      b.textContent = v === null ? '' : String(v);
      b.setAttribute('aria-hidden', v === null ? 'true' : 'false');
      var picked = q && view.picked === v;
      b.classList.toggle('is-right', !!(picked && v === q.answer));
      b.classList.toggle('is-wrong', !!(picked && v !== q.answer));
      b.disabled = !q || st.done || !!this._freeze;
    }
    /* the note and Count again */
    this._note.textContent = st.note ? t(st.note) : '';
    this._note.hidden = !st.note;
    this._recountBtn.hidden = st.done || !!this._freeze || !st.note;
  },
  _qKey: function () {
    var st = this.st;
    if (st.phase === 'howMany') return 'qHowMany';
    return { spread: 'qSpread', bunch: 'qBunch', oneMore: 'qOneMore' }[st.twist];
  },

  /* ---------------- the hand ---------------- */
  _slide: function () {
    var st = this.st, self = this;
    if (!st || this._freeze || !CountingNecklaceCore.slide(st)) return;
    this.api.sound(480 + 30 * st.counted);
    if (this._shown()) this._speakNumber(st.counted);
    this.api.track('slide', { n: st.total, counted: st.counted });
    if (st.phase !== 'count') {
      /* the last bead is across: the count stays a moment, then fades and the question comes */
      this._fading = true;
      this._paint();
      bounce(this._counter, 'nk-pop');
      this._later(function () { self._fading = false; self._paint(); }, this._shown() ? this.FADE_MS : 250);
      return;
    }
    this._paint();
    bounce(this._counter, 'nk-pop');
  },
  _pick: function (ci) {
    var st = this.st, self = this, C = CountingNecklaceCore;
    var q = C.question(st);
    if (!q || st.done || this._freeze || this._fading) return;
    var a = q.cards[ci], before = { total: st.total, angles: st.angles.slice(), counted: st.counted, q: q, qkey: this._qKey() };
    var res = C.pick(st, a);
    if (!res) return;
    this.api.track('pick', { phase: res.phase, a: a, ok: res.ok, id: st.id });
    if (!res.ok) {
      this.api.sound(300);
      this._paint();
      bounce(this._cardEls[ci], 'nk-wobble');
      return;
    }
    this.api.sound(660);
    if (res.phase === 'howMany') {
      /* the right card shows green with the beads still; then the necklace won't hold still */
      before.picked = a; this._freeze = before;
      this._paint();
      this._later(function () {
        self._freeze = null;
        if (self.st.twist === 'oneMore') {
          /* the new bead comes on at the clasp, then slides to its place */
          var nb = self._beads[self.st.n]; nb.style.display = ''; nb.classList.add('nk-arrive'); nb.style.transform = 'rotate(0deg)';
          void nb.getBoundingClientRect();
          requestAnimationFrame(function () { self._paint(); });
          self._later(function () { nb.classList.remove('nk-arrive'); }, 900);
        } else self._paint();
      }, this.TWIST_MS);
      return;
    }
    /* the last question: the round is done — the shell checks it */
    this._paint();
    this._speakNumber(q.answer);
    for (var i = 0; i < st.total; i++) (function (g, d) { self._later(function () { bounce(g, 'nk-glow'); }, 40 * d); }(this._beads[i], i));
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled && self.st.done) chk.click(); }, this.CHECK_MS);
  },
  _recount: function () {
    var st = this.st;
    if (!st || this._freeze || !CountingNecklaceCore.recount(st)) return;
    this._fading = false;
    this.api.sound(420);
    this._paint();
    this.api.track('recount', { id: st.id, phase: st.phase });
  },
  _speakNumber: function (n) {
    if (typeof LCSAudio === 'undefined' || !LCSAudio.speak) return;
    try { LCSAudio.speak({ type: 'number', text: String(n), lang: this.api.lang, rate: 1 }); } catch (e) { /* silent */ }
  }
};

function interp(s, args) { return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; }); }
function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void (el.getBoundingClientRect ? el.getBoundingClientRect() : 0); el.classList.add(cls); }

var nkCssDone = false;
function injectNecklaceCSS() {
  if (nkCssDone || typeof document === 'undefined') return;
  nkCssDone = true;
  var css = ''
  + '.nk-wrap{width:100%;position:relative;display:grid;gap:16px;align-items:center;--nk-d:420px;--nk-card:88px;}'
  + '.nk-wrap.is-row{grid-template-columns:var(--nk-d) minmax(0,1fr);}'
  + '.nk-wrap.is-stack{grid-template-columns:1fr;justify-items:center;gap:10px;}'
  /* the necklace */
  + '.nk-necklace{position:relative;width:var(--nk-d);height:var(--nk-d);padding:0;margin:0;border:0;border-radius:50%;background:radial-gradient(circle at 50% 50%,#FFFDF7 0 58%,#F7EBD6 59% 100%);box-shadow:inset 0 0 0 2px #EAD8B8,0 6px 16px rgba(60,35,10,.10);cursor:default;touch-action:manipulation;-webkit-tap-highlight-color:transparent;display:block;}'
  + '.nk-necklace.is-live{cursor:pointer;} .nk-necklace.is-live:hover{box-shadow:inset 0 0 0 3px var(--lcs-structure-soft),0 6px 16px rgba(60,35,10,.12);}'
  + '.nk-necklace:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:4px;}'
  + '.nk-svg{position:absolute;inset:0;width:100%;height:100%;display:block;overflow:visible;}'
  + '.nk-cord{fill:none;stroke:#8B5A2B;stroke-width:5;}'
  + '.nk-clasp-body{fill:#D9A441;stroke:#8E6A1D;stroke-width:3;} .nk-clasp-pin{fill:#8E6A1D;}'
  + '.nk-bead{transform-box:view-box;transform-origin:200px 200px;transition:transform .5s cubic-bezier(.3,.7,.2,1);}'
  + '.nk-wrap.is-instant .nk-bead{transition:none;}'
  + '.nk-bead-ball{stroke:rgba(0,0,0,.22);stroke-width:1.5;} .nk-bead-shine{fill:rgba(255,255,255,.55);} .nk-bead-hole{stroke:rgba(0,0,0,.18);stroke-width:3;stroke-linecap:round;}'
  + '.nk-bead.nk-arrive{animation:nk-arrive .8s cubic-bezier(.3,.7,.2,1) 1;} @keyframes nk-arrive{0%{opacity:0;}30%{opacity:1;}100%{opacity:1;}}'
  + '.nk-bead.nk-glow .nk-bead-ball{animation:nk-glow .6s ease 1;} @keyframes nk-glow{0%,100%{stroke-width:1.5;}50%{stroke:#F6D98A;stroke-width:7;}}'
  /* the count in the middle */
  + '.nk-counter{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-family:var(--lcs-font-display);font-weight:800;font-size:calc(var(--nk-d) * .26);line-height:1;color:var(--lcs-structure);opacity:0;transition:opacity .3s;pointer-events:none;}'
  + '.nk-counter.is-on{opacity:1;} .nk-counter.nk-pop{animation:nk-pop .35s var(--lcs-ease) 1;} @keyframes nk-pop{0%{transform:translate(-50%,-50%) scale(.7);}60%{transform:translate(-50%,-50%) scale(1.12);}100%{transform:translate(-50%,-50%) scale(1);}}'
  /* the panel */
  + '.nk-panel{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;min-width:0;width:100%;}'
  + '.nk-question{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:calc(var(--nk-d) * .58);font-family:var(--lcs-font-body);font-weight:800;font-size:max(15px,calc(var(--nk-d) * .048));line-height:1.3;color:var(--lcs-ink);text-align:center;pointer-events:none;} .nk-question[hidden]{display:none;}'
  + '.nk-cards{display:flex;gap:12px;justify-content:center;} .nk-cards.is-wait .nk-card{border-style:dashed;background:transparent;box-shadow:none;opacity:.55;}'
  + '.nk-wrap.is-row .nk-cards{flex-direction:column;align-self:stretch;width:100%;}'
  + '.nk-card{width:var(--nk-card);height:var(--nk-card);min-width:64px;min-height:64px;border-radius:18px;border:3px solid var(--lcs-structure-soft);background:#fff;font-family:var(--lcs-font-display);font-weight:800;font-size:calc(var(--nk-card) * .48);color:var(--lcs-structure);cursor:pointer;touch-action:manipulation;box-shadow:0 4px 0 var(--lcs-structure-soft);display:grid;place-items:center;padding:0;}'
  + '.nk-wrap.is-row .nk-card{width:100%;height:var(--nk-card);}'
  + '.nk-card:hover:not(:disabled){background:var(--lcs-structure-soft);} .nk-card:disabled{cursor:default;} .nk-card:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:3px;}'
  + '.nk-card.is-right{background:#E7F6EE;border-color:var(--lcs-good);color:#17694A;box-shadow:0 4px 0 #A9DCC2;}'
  + '.nk-card.is-wrong{background:#FFF0EA;border-color:var(--lcs-accent);color:#B3512A;box-shadow:0 4px 0 #F6C3AE;}'
  + '.nk-note{font-family:var(--lcs-font-body);font-weight:700;font-size:clamp(15px,1vw + 11px,18px);line-height:1.35;color:#B3512A;text-align:center;max-width:32ch;} .nk-note[hidden]{display:none;}'
  + '.nk-recount{min-height:48px;padding:0 18px;border-radius:24px;border:2px solid var(--lcs-structure);background:#fff;color:var(--lcs-structure);font-family:var(--lcs-font-body);font-weight:800;font-size:16px;cursor:pointer;touch-action:manipulation;} .nk-recount[hidden]{display:none;} .nk-recount:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;}'
  /* motion */
  + '.nk-wobble{animation:nk-wobble .45s var(--lcs-ease) 1;} @keyframes nk-wobble{0%,100%{transform:translateX(0);}25%{transform:translateX(-5px);}75%{transform:translateX(5px);}}'
  + '@media (prefers-reduced-motion:reduce){.nk-bead,.nk-counter,.nk-card{animation:none!important;transition:none!important;}}';
  var style = document.createElement('style');
  style.id = 'nk-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = CountingNecklaceActivity;
if (typeof window !== 'undefined') window.CountingNecklaceActivity = CountingNecklaceActivity;
