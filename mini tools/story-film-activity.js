/* =====================================================================
   story-film-activity.js — ACTIVITY #82 of the one-by-one rebuild:
   "Vet's Diagnosis Window" → THE STORY FILM (1.OA.A.1, 11 locales).
   Design sheet: docs/activities-rebuild/designs/082-vet-diagnosis.md
   ---------------------------------------------------------------------
   THE INVENTION: a patient arrives as an x-ray with a number story. The
   child puts the story's two numbers on the film's frames (one tile is a
   decoy), marks the frame we don't know and dials it. "Diagnose" plays
   the CHILD's model as a film, sentence by sentence: a number on the
   wrong frame stops the film there and glows with its sentence; a wrong
   dial spills dots over the landing frame or leaves its sockets empty.
   When the film fits, the fog lifts and the patient heals.
   ACTIVITY LAYER ONLY: the model is story-film-core.js; pictures through
   lcs-pictures.js; lcs-shell.js untouched (the shell's Check is hidden and
   pressed by this activity on success). Test seams:
   window.StoryFilmActivity.st / ._pool / ._order / ._ensurePool / .FAST.
   ===================================================================== */
'use strict';

var StoryFilmActivity = {
  id: 'story-film',
  apparatusClasses: ['sf-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble: {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:       {en:'Vet’s Diagnosis Window',de:'Beim Tierarzt',nl:'Bij de dierenarts',da:'Hos dyrlægen',sv:'Hos veterinären',no:'Hos veterinæren',es:'En el veterinario',it:'Dal veterinario',pt:'No veterinário',fr:'Chez le vétérinaire',fi:'Eläinlääkärillä'},
    tLine:       {en:'Put the numbers on the film, mark the mystery, then dial it.',de:'Leg die Zahlen auf den Film, markiere das Rätselfeld und stell die Zahl ein.',nl:'Leg de getallen op de film, markeer het raadselvak en stel het getal in.',da:'Læg tallene på filmen, markér gådefeltet, og indstil tallet.',sv:'Lägg talen på filmen, markera den hemliga rutan och ställ in talet.',no:'Legg tallene på filmen, merk gåtefeltet og still inn tallet.',es:'Pon los números en la película, marca el cuadro misterioso y elige el número.',it:'Metti i numeri sulla pellicola, segna il riquadro misterioso e scegli il numero.',pt:'Coloque os números no filme, marque o quadro misterioso e escolha o número.',fr:'Pose les nombres sur le film, marque la case mystère et règle le nombre.',fi:'Laita luvut filmille, merkitse arvoitusruutu ja valitse luku.'},
    tLineS:      {en:'Put the numbers on the film.',de:'Leg die Zahlen auf den Film.',nl:'Leg de getallen op de film.',da:'Læg tallene på filmen.',sv:'Lägg talen på filmen.',no:'Legg tallene på filmen.',es:'Pon los números en la película.',it:'Metti i numeri sulla pellicola.',pt:'Coloque os números no filme.',fr:'Pose les nombres sur le film.',fi:'Laita luvut filmille.'},
    diag:        {en:'Diagnose',de:'Diagnose',nl:'Diagnose',da:'Diagnose',sv:'Diagnos',no:'Diagnose',es:'¡Diagnostica!',it:'Diagnosi',pt:'Diagnosticar',fr:'Diagnostiquer',fi:'Diagnoosi'},
    hEmpty:      {en:'Every frame needs a number or the mystery mark.',de:'Jedes Feld braucht eine Zahl oder das Rätselzeichen.',nl:'Elk vak heeft een getal of het raadselteken nodig.',da:'Hvert felt skal have et tal eller gådemærket.',sv:'Varje ruta behöver ett tal eller ett frågetecken.',no:'Hvert felt trenger et tall eller gåtemerket.',es:'Cada cuadro necesita un número o la marca de misterio.',it:'Ogni riquadro ha bisogno di un numero o del segno del mistero.',pt:'Cada quadro precisa de um número ou da marca de mistério.',fr:'Chaque case a besoin d’un nombre ou de la marque mystère.',fi:'Jokainen ruutu tarvitsee luvun tai arvoitusmerkin.'},
    hMystery:    {en:'Which part of the story don’t we know? Tap that frame.',de:'Welchen Teil der Geschichte kennen wir nicht? Tippe auf dieses Feld.',nl:'Welk deel van het verhaal weten we niet? Tik op dat vak.',da:'Hvilken del af historien kender vi ikke? Tryk på det felt.',sv:'Vilken del av berättelsen vet vi inte? Tryck på den rutan.',no:'Hvilken del av fortellingen vet vi ikke? Trykk på det feltet.',es:'¿Qué parte del cuento no sabemos? Toca ese cuadro.',it:'Quale parte della storia non sappiamo? Tocca quel riquadro.',pt:'Que parte da história a gente não sabe? Toque nesse quadro.',fr:'Quelle partie de l’histoire ne connaît-on pas ? Touche cette case.',fi:'Mitä tarinan osaa emme tiedä? Napauta sitä ruutua.'},
    hMiss1:      {en:'The film doesn’t fit the story here. Look at the glowing frame.',de:'Hier passt der Film nicht zur Geschichte. Schau dir das leuchtende Feld an.',nl:'Hier past de film niet bij het verhaal. Kijk naar het oplichtende vak.',da:'Her passer filmen ikke til historien. Se på det lysende felt.',sv:'Här passar filmen inte till berättelsen. Titta på rutan som lyser.',no:'Her passer ikke filmen til fortellingen. Se på feltet som lyser.',es:'Aquí la película no coincide con el cuento. Mira el cuadro que brilla.',it:'Qui la pellicola non corrisponde alla storia. Guarda il riquadro che brilla.',pt:'Aqui o filme não combina com a história. Olhe o quadro que está brilhando.',fr:'Ici, le film ne correspond pas à l’histoire. Regarde la case qui brille.',fi:'Tässä filmi ei sovi tarinaan. Katso hehkuvaa ruutua.'},
    hCame:       {en:'Count the dots that came.',de:'Zähl die Punkte, die dazugekommen sind.',nl:'Tel de stippen die erbij gekomen zijn.',da:'Tæl de prikker, der kom til.',sv:'Räkna prickarna som kom till.',no:'Tell prikkene som kom til.',es:'Cuenta los puntos que llegaron.',it:'Conta i puntini che sono arrivati.',pt:'Conte os pontinhos que chegaram.',fr:'Compte les points qui sont arrivés.',fi:'Laske pisteet, jotka tulivat lisää.'},
    hWent:       {en:'Count the dots that went away.',de:'Zähl die Punkte, die weggegangen sind.',nl:'Tel de stippen die weggegaan zijn.',da:'Tæl de prikker, der forsvandt.',sv:'Räkna prickarna som försvann.',no:'Tell prikkene som forsvant.',es:'Cuenta los puntos que se fueron.',it:'Conta i puntini che sono andati via.',pt:'Conte os pontinhos que foram embora.',fr:'Compte les points qui sont partis.',fi:'Laske pisteet, jotka lähtivät pois.'},
    hBefore:     {en:'Count the dots that were there before.',de:'Zähl die Punkte, die vorher da waren.',nl:'Tel de stippen die er eerst waren.',da:'Tæl de prikker, der var der før.',sv:'Räkna prickarna som fanns från början.',no:'Tell prikkene som var der før.',es:'Cuenta los puntos que había antes.',it:'Conta i puntini che c’erano prima.',pt:'Conte os pontinhos que havia antes.',fr:'Compte les points qu’il y avait avant.',fi:'Laske pisteet, jotka olivat alussa.'},
    hPart:       {en:'Count the dots in the other part.',de:'Zähl die Punkte im anderen Teil.',nl:'Tel de stippen in het andere deel.',da:'Tæl prikkerne i den anden del.',sv:'Räkna prickarna i den andra delen.',no:'Tell prikkene i den andre delen.',es:'Cuenta los puntos de la otra parte.',it:'Conta i puntini nell’altra parte.',pt:'Conte os pontinhos da outra parte.',fr:'Compte les points de l’autre partie.',fi:'Laske toisen osan pisteet.'},
    hGap:        {en:'Count the dots without a partner.',de:'Zähl die Punkte ohne Partner.',nl:'Tel de stippen zonder partner.',da:'Tæl prikkerne uden makker.',sv:'Räkna prickarna utan kompis.',no:'Tell prikkene uten partner.',es:'Cuenta los puntos sin pareja.',it:'Conta i puntini senza compagno.',pt:'Conte os pontinhos sem par.',fr:'Compte les points sans partenaire.',fi:'Laske pisteet, joilla ei ole paria.'},
    hLong:       {en:'Count the dots in the long row.',de:'Zähl die Punkte in der langen Reihe.',nl:'Tel de stippen in de lange rij.',da:'Tæl prikkerne i den lange række.',sv:'Räkna prickarna i den långa raden.',no:'Tell prikkene i den lange raden.',es:'Cuenta los puntos de la fila larga.',it:'Conta i puntini nella fila lunga.',pt:'Conte os pontinhos da fileira comprida.',fr:'Compte les points de la longue rangée.',fi:'Laske pitkän rivin pisteet.'},
    hShort:      {en:'Count the dots in the short row.',de:'Zähl die Punkte in der kurzen Reihe.',nl:'Tel de stippen in de korte rij.',da:'Tæl prikkerne i den korte række.',sv:'Räkna prickarna i den korta raden.',no:'Tell prikkene i den korte raden.',es:'Cuenta los puntos de la fila corta.',it:'Conta i puntini nella fila corta.',pt:'Conte os pontinhos da fileira curta.',fr:'Compte les points de la courte rangée.',fi:'Laske lyhyen rivin pisteet.'},
    hAll:        {en:'Count all the dots in the last frame.',de:'Zähl alle Punkte im letzten Feld.',nl:'Tel alle stippen in het laatste vak.',da:'Tæl alle prikkerne i det sidste felt.',sv:'Räkna alla prickarna i den sista rutan.',no:'Tell alle prikkene i det siste feltet.',es:'Cuenta todos los puntos del último cuadro.',it:'Conta tutti i puntini nell’ultimo riquadro.',pt:'Conte todos os pontinhos do último quadro.',fr:'Compte tous les points de la dernière case.',fi:'Laske kaikki viimeisen ruudun pisteet.'},
    hTray:       {en:'Count the dots in one group.',de:'Zähl die Punkte in einer Gruppe.',nl:'Tel de stippen in één groepje.',da:'Tæl prikkerne i én gruppe.',sv:'Räkna prickarna i en grupp.',no:'Tell prikkene i én gruppe.',es:'Cuenta los puntos de un grupo.',it:'Conta i puntini in un gruppo.',pt:'Conte os pontinhos de um grupo.',fr:'Compte les points d’un groupe.',fi:'Laske yhden ryhmän pisteet.'},
    hTrays:      {en:'Count the groups.',de:'Zähl die Gruppen.',nl:'Tel de groepjes.',da:'Tæl grupperne.',sv:'Räkna grupperna.',no:'Tell gruppene.',es:'Cuenta los grupos.',it:'Conta i gruppi.',pt:'Conte os grupos.',fr:'Compte les groupes.',fi:'Laske ryhmät.'},
    setStories:  {en:'Stories',de:'Geschichten',nl:'Verhalen',da:'Historier',sv:'Berättelser',no:'Fortellinger',es:'Cuentos',it:'Storie',pt:'Histórias',fr:'Histoires',fi:'Tarinat'},
    w10:         {en:'Within 10',de:'bis 10',nl:'tot 10',da:'op til 10',sv:'upp till 10',no:'opp til 10',es:'hasta 10',it:'fino a 10',pt:'até 10',fr:'jusqu’à 10',fi:'10:een asti'},
    w20:         {en:'Within 20',de:'bis 20',nl:'tot 20',da:'op til 20',sv:'upp till 20',no:'opp til 20',es:'hasta 20',it:'fino a 20',pt:'até 20',fr:'jusqu’à 20',fi:'20:een asti'},
    grp:         {en:'Groups',de:'Gruppen',nl:'Groepjes',da:'Grupper',sv:'Grupper',no:'Grupper',es:'Grupos',it:'Gruppi',pt:'Grupos',fr:'Groupes',fi:'Ryhmät'},
    setRead:     {en:'Read aloud',de:'Vorlesen',nl:'Voorlezen',da:'Læs højt',sv:'Läs högt',no:'Les høyt',es:'Leer en voz alta',it:'Leggi ad alta voce',pt:'Ler em voz alta',fr:'Lire à voix haute',fi:'Lue ääneen'},
    rOn:         {en:'On',de:'An',nl:'Aan',da:'Til',sv:'På',no:'På',es:'Sí',it:'Sì',pt:'Sim',fr:'Oui',fi:'Päällä'},
    rOff:        {en:'Off',de:'Aus',nl:'Uit',da:'Fra',sv:'Av',no:'Av',es:'No',it:'No',pt:'Não',fr:'Non',fi:'Pois'},
    ariaN:       {en:'Frame: {n}',de:'Feld: {n}',nl:'Vak: {n}',da:'Felt: {n}',sv:'Ruta: {n}',no:'Felt: {n}',es:'Cuadro: {n}',it:'Riquadro: {n}',pt:'Quadro: {n}',fr:'Case : {n}',fi:'Ruutu: {n}'},
    ariaQ:       {en:'Frame: mystery',de:'Feld: Rätsel',nl:'Vak: raadsel',da:'Felt: gåde',sv:'Ruta: hemlig',no:'Felt: gåte',es:'Cuadro: misterio',it:'Riquadro: mistero',pt:'Quadro: mistério',fr:'Case : mystère',fi:'Ruutu: arvoitus'},
    ariaE:       {en:'Frame: empty',de:'Feld: leer',nl:'Vak: leeg',da:'Felt: tomt',sv:'Ruta: tom',no:'Felt: tomt',es:'Cuadro: vacío',it:'Riquadro: vuoto',pt:'Quadro: vazio',fr:'Case : vide',fi:'Ruutu: tyhjä'},
    ariaTile:    {en:'Number {n}',de:'Zahl {n}',nl:'Getal {n}',da:'Tal {n}',sv:'Tal {n}',no:'Tall {n}',es:'Número {n}',it:'Numero {n}',pt:'Número {n}',fr:'Nombre {n}',fi:'Luku {n}'},
    ariaMinus:   {en:'One less',de:'Eins weniger',nl:'Eén minder',da:'Én mindre',sv:'En mindre',no:'Én mindre',es:'Uno menos',it:'Uno in meno',pt:'Um a menos',fr:'Un de moins',fi:'Yksi vähemmän'},
    ariaPlus:    {en:'One more',de:'Eins mehr',nl:'Eén meer',da:'Én mere',sv:'En till',no:'Én til',es:'Uno más',it:'Uno in più',pt:'Um a mais',fr:'Un de plus',fi:'Yksi lisää'},
    ariaDial:    {en:'Mystery number: {n}',de:'Rätselzahl: {n}',nl:'Raadselgetal: {n}',da:'Gådetal: {n}',sv:'Hemligt tal: {n}',no:'Gåtetall: {n}',es:'Número misterioso: {n}',it:'Numero misterioso: {n}',pt:'Número misterioso: {n}',fr:'Nombre mystère : {n}',fi:'Arvoitusluku: {n}'},
    ariaRead:    {en:'Read the story aloud',de:'Geschichte vorlesen',nl:'Verhaal voorlezen',da:'Læs historien højt',sv:'Läs berättelsen högt',no:'Les fortellingen høyt',es:'Leer el cuento en voz alta',it:'Leggi la storia ad alta voce',pt:'Ler a história em voz alta',fr:'Lire l’histoire à voix haute',fi:'Lue tarina ääneen'}
  },/*STRINGS-END*/

  defaults: { stories: 'w20', read: 'on' },
  settings: [
    { key: 'stories', type: 'choice', labelKey: 'setStories', options: [{ value: 'w10', labelKey: 'w10' }, { value: 'w20', labelKey: 'w20' }, { value: 'grp', labelKey: 'grp' }] },
    { key: 'read', type: 'choice', labelKey: 'setRead', options: [{ value: 'on', labelKey: 'rOn' }, { value: 'off', labelKey: 'rOff' }] }
  ],

  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._trays = null;
    this._timers = []; this._ro = null; this._busy = false; this._view = {}; this._pics = {};
    injectFilmCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return StoryFilmCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return StoryFilmCore.levelOf(this._setting('stories')); },
  _key: function () { return this._level(); },

  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = StoryFilmCore.ids(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = StoryFilmCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.slice(), p = C.plan(this._level(), Math.random, prev);
      this._order = p.order; this._trays = p.trays; this._orderForPool = pool; this._pass = pass;
    }
    var idx = this._order[pos], tray = this._trays[pos], pa = { msg: this._line() }; this._pa = pa;
    return {
      id: 'film.' + this._loc() + '.' + this._level() + '.' + idx, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(idx, tray); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _start: function (idx, tray) {
    var C = StoryFilmCore, r = C.round(this._level(), idx);
    this._clearTimers(); this._busy = false; this._view = {};
    this.st = C.newState(r, tray || C.shuffle([0, 1, 2], Math.random));
    this._text = C.text(this._loc(), r);
    var line = this._line();
    if (this._pa) this._pa.msg = line;
    var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line;
    this._loadPics();
    if (!this.FAST) this._intro();
  },
  _line: function () { return this._t(StoryFilmCore.layout(this._width()).mode === 'narrow' ? 'tLineS' : 'tLine'); },
  _loadPics: function () {
    var self = this, r = this.st.r, dirs = {};
    r.pics.concat([r.patient, StoryFilmCore.DATA.BANDAGE]).forEach(function (p) { dirs[p.split('/')[0]] = 1; });
    Object.keys(dirs).forEach(function (dir) {
      if (self._pics[dir] || typeof LCSPictures === 'undefined') return;
      self._pics[dir] = 'loading';
      LCSPictures.load(dir).then(function (th) { self._pics[dir] = th; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () { delete self._pics[dir]; });
    });
  },
  _pic: function (path, size, cls) {
    var th = this._pics[path.split('/')[0]], key = path.split('/')[1];
    if (!th || th === 'loading' || !th.nouns[key]) return null;
    var im = LCSPictures.img(th, key, this._loc(), { size: size }); im.className = 'sf-pic' + (cls ? ' ' + cls : ''); im.alt = ''; im.style.width = size + 'px'; im.style.height = size + 'px';
    return im;
  },
  _speak: function () {
    if (this._setting('read') === 'off' || typeof LCSAudio === 'undefined' || !LCSAudio.speak) return;
    var t = this._text; try { LCSAudio.speak({ type: 'word', text: t.clauses.map(function (c) { return c.t; }).join(' ') + ' ' + t.q, lang: this.api.lang, rate: 0.9 }); } catch (e) {}
  },
  /* the intro film: the TRUE story, the unknown fogged — each clause lights with its frame; any tap skips */
  _intro: function () {
    var self = this, n = this._text.clauses.length, st = this.st;
    this._view.intro = 0; this._speak();
    var step = function (i) { if (self.st !== st || self._view.intro == null) return; self._view.intro = i; if (self._wrap) self._paint(); if (i < n) self._later(function () { step(i + 1); }, 850); else self._later(function () { if (self.st === st) { self._view.intro = null; if (self._wrap) self._paint(); } }, 900); };
    this._later(function () { step(1); }, 300);
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) this._start(0);
    this._render2();
    this._watchWidth();
  },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'sf-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="sf-top"><div class="sf-patient"></div><div class="sf-card"><p class="sf-story"></p><button type="button" class="sf-read" data-k="read"></button></div><div class="sf-things"></div></div>'
      + '<div class="sf-box"></div><div class="sf-tray" role="group"></div>'
      + '<div class="sf-park" hidden><div class="sf-dial"><button type="button" class="sf-dbtn" data-k="minus">−</button><span class="sf-dnum" aria-live="polite"></span><button type="button" class="sf-dbtn" data-k="plus">+</button></div><button type="button" class="sf-go" data-k="diag"></button></div>'
      + '<p class="sf-note" aria-live="polite"></p>';
    this._q = function (s) { return wrap.querySelector(s); };
    this._rd = this._q('.sf-read'); this._dialEl = this._q('.sf-dial'); this._goEl = this._q('.sf-go'); this._park = this._q('.sf-park');
    this._q('.sf-read').innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 12h5l7-6v20l-7-6H6z" fill="#146B5E"/><path d="M22 11a7 7 0 0 1 0 10" fill="none" stroke="#146B5E" stroke-width="3" stroke-linecap="round"/></svg>';
    this._q('.sf-read').setAttribute('aria-label', this._t('ariaRead'));
    this._q('.sf-read').addEventListener('click', function () { var o = self._setting('read'); self.api.settings.read = 'on'; self._speak(); self.api.settings.read = o; });
    this._q('[data-k="minus"]').setAttribute('aria-label', this._t('ariaMinus'));
    this._q('[data-k="plus"]').setAttribute('aria-label', this._t('ariaPlus'));
    this._q('[data-k="minus"]').addEventListener('click', function () { self._dial(-1); });
    this._q('[data-k="plus"]').addEventListener('click', function () { self._dial(1); });
    this._q('.sf-go').addEventListener('click', function () { self._check(); });
    wrap.addEventListener('pointerdown', function () { if (self._view.intro != null) { self._view.intro = null; self._paint(); } }, true);
    wrap.addEventListener('keydown', function (e) { if (e.key === 'ArrowUp') { self._dial(1); e.preventDefault(); } else if (e.key === 'ArrowDown') { self._dial(-1); e.preventDefault(); } });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _paint_: function () {
    if (!this._wrap) return;
    var C = StoryFilmCore, st = this.st, r = st.r, L = this._L = C.layout(this._width()), v = this._view, self = this, t = this._text;
    var f = st.last && st.last.reason === 'miss' && st.show >= 1 && !st.done ? st.last.film : null, truth = st.show >= 2 && !st.done;
    this._wrap.className = 'sf-wrap is-' + L.mode + (L.tiny ? ' is-tiny' : '') + ' is-' + r.d + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + (v.intro != null ? ' is-intro' : '');
    /* ---- the patient, the story, the things ---- */
    var pt = this._q('.sf-patient'); pt.innerHTML = '';
    var pim = this._pic(r.patient, L.patient, st.done ? 'is-healed' : 'is-xray'); if (pim) pt.appendChild(pim);
    if (st.done) { var band = this._pic(C.DATA.BANDAGE, 64, 'sf-band'); if (band) pt.appendChild(band); }
    var story = this._q('.sf-story'), rd = this._rd; if (rd.parentNode === story) this._q('.sf-card').appendChild(rd); story.innerHTML = '';
    t.clauses.forEach(function (c, i) {
      var lit = v.intro != null ? i === v.intro - 1 : v.play != null ? v.play === c.role : false;
      var bad = f && f.why === 'place' && f.srole === c.role;
      var sp = self.api.el('span', 'sf-cl' + (lit ? ' is-lit' : '') + (bad ? ' is-bad' : '')); sp.setAttribute('data-role', c.role);
      sp.innerHTML = esc(c.t).replace(/(\d+)/g, '<b class="sf-num">$1</b>');
      story.appendChild(sp); story.appendChild(document.createTextNode(' '));
    });
    var q = this.api.el('span', 'sf-q' + (st.done ? ' is-answer' : '')); q.textContent = st.done ? t.a : t.q; story.appendChild(q);
    if (L.mode === 'narrow') story.appendChild(rd);
    var th = this._q('.sf-things'); th.innerHTML = '';
    r.pics.forEach(function (p) { var im = self._pic(p, L.thing); if (im) th.appendChild(im); });
    /* phones: the patient and the story's pictures float inside the card, so the sentences get the full width */
    var card = this._q('.sf-card'), top = this._q('.sf-top');
    if (L.mode === 'narrow') { if (pt.parentNode !== card) { card.insertBefore(th, card.firstChild); card.insertBefore(pt, card.firstChild); } }
    else if (pt.parentNode !== top) { top.insertBefore(pt, card); top.appendChild(th); }
    /* ---- the light box ---- */
    this._park.appendChild(this._dialEl); this._park.appendChild(this._goEl);
    var box = this._q('.sf-box'); box.innerHTML = '';
    box.className = 'sf-box is-' + r.d + (st.done ? ' is-healed' : '');
    var roles = C.DATA.ROLES[r.d], frames = {};
    roles.forEach(function (role) { frames[role] = self._frame(role, f, truth); });
    if (r.d === 'change') {
      box.appendChild(frames.start); box.appendChild(this._chute(r.op)); box.appendChild(frames.change); box.appendChild(this._chute(r.op)); box.appendChild(frames.result);
    } else if (r.d === 'bracket') {
      var parts = this.api.el('div', 'sf-parts'); parts.appendChild(frames.part1); parts.appendChild(frames.part2); box.appendChild(parts);
      box.appendChild(this.api.el('span', 'sf-bracket')); box.appendChild(frames.whole);
    } else if (r.d === 'compare') {
      box.appendChild(frames.big); var row = this.api.el('div', 'sf-cmprow'); row.appendChild(frames.small); row.appendChild(frames.gap); box.appendChild(row);
    } else {
      var top = this.api.el('div', 'sf-grprow'); top.appendChild(frames.groups); top.appendChild(frames.each); box.appendChild(top); box.appendChild(frames.total);
    }
    if (st.done) box.appendChild(this.api.el('span', 'sf-fog'));
    /* ---- the tiles ---- */
    var tray = this._q('.sf-tray'); tray.innerHTML = '';
    st.tiles.forEach(function (tl) {
      var on = C.roleOfTile(st, tl.id);
      var b = self.api.el('button', 'sf-tile' + (st.sel === tl.id ? ' is-sel' : '') + (on ? ' is-out' : ''));
      b.type = 'button'; b.setAttribute('data-k', 'tile-' + tl.id); b.textContent = String(tl.n); b.setAttribute('aria-label', self._t('ariaTile', { n: tl.n }));
      b.setAttribute('aria-pressed', st.sel === tl.id ? 'true' : 'false'); b.disabled = st.done || !!on;
      b.addEventListener('click', function () { if (self._busy) return; if (StoryFilmCore.pick(st, tl.id)) self._paint(); });
      tray.appendChild(b);
    });
    tray.appendChild(this._goEl);   /* Diagnose sits with the tiles */
    if (st.mystery && !st.done) { var fw = box.querySelector('.sf-fw[data-role="' + st.mystery + '"]'); if (fw) fw.appendChild(this._dialEl); }   /* the mystery frame holds its own dial */
    /* ---- the dial, Diagnose ---- */
    var dial = this._dialEl; dial.classList.toggle('is-on', !!st.mystery && !st.done);
    this._q('.sf-dnum').textContent = String(st.dial); this._q('.sf-dnum').setAttribute('aria-label', this._t('ariaDial', { n: st.dial }));
    this._q('[data-k="minus"]').disabled = st.done || !st.mystery || st.dial <= 1 || this._busy;
    this._q('[data-k="plus"]').disabled = st.done || !st.mystery || st.dial >= r.max || this._busy;
    var go = this._q('.sf-go'); go.textContent = this._t('diag'); go.disabled = st.done || this._busy;
    /* ---- the note ---- */
    var note = this._q('.sf-note'), hk = C.hint(st), txt = '', cls = 'sf-note';
    if (v.msg) { txt = v.msg; cls += ' is-ok'; }
    else if (hk) { txt = this._t(hk); cls += ' is-hint'; }
    note.className = cls; note.textContent = txt;
  },
  /* one frame of the film: its sockets, its dots, its badge */
  _frame: function (role, f, truth) {
    var C = StoryFilmCore, st = this.st, r = st.r, self = this, v = this._view, L = this._L;
    var tileId = st.placed[role], tile = tileId ? C.tileOf(st, tileId) : null, isQ = st.mystery === role;
    var b = this.api.el('button', 'sf-frame is-' + role + (isQ ? ' is-q' : '') + (tile ? ' is-full' : ''));
    b.type = 'button'; b.setAttribute('data-k', 'frame-' + role); b.setAttribute('data-role', role); b.disabled = st.done || this._busy;
    var n = null, ghost = false, numbered = false, outline = null, spill = 0, gapN = 0, bad = false, lit = false;
    if (v.intro != null) {   /* the true story, the unknown fogged */
      var ci = r.cl.indexOf(role); if (role !== r.u && (ci < 0 || ci < v.intro)) n = r.v[role];
      lit = ci >= 0 && ci === v.intro - 1;
    } else if (truth) {
      n = r.full[role]; numbered = role === r.u;
    } else {
      n = isQ ? st.dial : tile ? tile.n : null; ghost = isQ;
      if (st.done) n = r.full[role], ghost = false;
      if (v.play != null) lit = v.play === role;
      if (f && f.at === role) {
        bad = true;
        if (f.why !== 'place') { outline = f.outline; n = f.arrive; spill = Math.max(0, f.arrive - f.outline); gapN = Math.max(0, f.outline - f.arrive); }
      }
    }
    if (bad) b.className += ' is-bad'; if (lit) b.className += ' is-lit';
    b.setAttribute('aria-label', isQ ? this._t('ariaQ') + ', ' + this._t('ariaDial', { n: st.dial }) : tile ? this._t('ariaN', { n: tile.n }) : this._t('ariaE'));
    b.innerHTML = dotsSVG(this._cap(role), n, { ghost: ghost, numbered: numbered, outline: outline, spill: spill, gap: gapN, mode: L.mode, tiny: L.tiny, kind: this._shape(role), each: this._eachFor(role), row10: r.d === 'change' || (r.d === 'compare' && role !== 'gap') });
    if (tile || isQ) { var bd = this.api.el('span', 'sf-badge' + (isQ ? ' is-q' : '')); bd.textContent = isQ ? '?' : String(tile.n); b.appendChild(bd); }
    b.addEventListener('click', function () { self._tapFrame(role); });
    var fw = this.api.el('div', 'sf-fw' + (this._half(role) ? ' is-half' : '')); fw.setAttribute('data-role', role); fw.appendChild(b);
    return fw;
  },
  _half: function (role) { var d = this.st.r.d; return (d === 'bracket' && role !== 'whole') || (d === 'compare' && role === 'gap') || (d === 'groups' && role !== 'total'); },
  _cap: function (role) { var r = this.st.r, w10 = r.level === 'w10';
    if (r.d === 'change') return w10 ? 10 : 20;
    if (r.d === 'bracket') return role === 'whole' ? (w10 ? 10 : 20) : 10;
    if (r.d === 'compare') return role === 'gap' ? 10 : (w10 ? 10 : 20);
    return role === 'total' ? 30 : role === 'groups' ? 8 : 8; },
  _shape: function (role) { var r = this.st.r; return r.d === 'groups' ? (role === 'groups' ? 'trays' : role === 'each' ? 'ring' : 'grid') : r.d === 'compare' && role !== 'gap' ? 'row' : 'grid'; },
  _eachFor: function (role) { var st = this.st; if (st.r.d !== 'groups' || role !== 'groups') return 0; var e = st.done ? st.r.full.each : StoryFilmCore.valueOf(st, 'each'); return e || 0; },
  _chute: function (op) { var c = this.api.el('span', 'sf-chute is-' + op); c.innerHTML = '<svg viewBox="0 0 64 24" aria-hidden="true">' + (op === 'add'   /* things come IN: an arrow into the film, with + */
      ? '<path d="M24 4v14M18 12l6 6 6-6" fill="none" stroke="#8FE3D6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="44" cy="12" r="9" fill="#8FE3D6"/><path d="M39 12h10M44 7v10" stroke="#13282A" stroke-width="2.6" stroke-linecap="round"/>'
      : '<path d="M18 6h14M26 1l6 5-6 5" fill="none" stroke="#F2B57B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 6v12" stroke="#F2B57B" stroke-width="3" stroke-linecap="round"/><circle cx="46" cy="12" r="9" fill="#F2B57B"/><path d="M41 12h10" stroke="#13282A" stroke-width="2.6" stroke-linecap="round"/>') + '</svg>'; return c; },

  /* ---------------- moves ---------------- */
  _tapFrame: function (role) {
    var C = StoryFilmCore, st = this.st;
    if (this._busy || st.done) return;
    if (st.sel) { if (C.place(st, role)) { this._view = {}; this.api.sound(620); this._paint(); } return; }
    if (st.placed[role]) { C.unplace(st, role); this._view = {}; this.api.sound(380); this._paint(); return; }
    C.markMystery(st, role); this._view = {}; this.api.sound(500); this._paint();
  },
  _dial: function (d) { var st = this.st; if (this._busy || !st.mystery) return; if (StoryFilmCore.setDial(st, st.dial + d)) { this._view = {}; this.api.sound(700 + st.dial * 10); this._paint(); } },
  _check: function () {
    if (this._busy || this.st.done) return;
    var C = StoryFilmCore, st = this.st, self = this, roles = C.DATA.ROLES[st.r.d];
    this._view = {};
    var res = C.check(st);
    if (res.reason === 'empty' || res.reason === 'mystery') { this.api.sound(460); this._paint(); this.api.announce(this._q('.sf-note').textContent || ''); return; }
    var finish = function () {
      self._busy = false; self._view = {};
      if (!res.ok) { self.api.sound(220); self._paint(); self.api.announce(self._q('.sf-note').textContent || ''); return; }
      var msg = C.equation(self._loc(), st.r);
      if (self._pa) self._pa.msg = msg; self._view = { msg: msg };
      self.api.sound(1046); self._later(function () { self.api.sound(1318); }, self._ms(140)); self._later(function () { self.api.sound(1568); }, self._ms(280));
      self._paint(); self.api.announce(self._text.a + ' ' + msg);
      self._later(function () { var n = self._q('.sf-note'); if (n && n.scrollIntoView) n.scrollIntoView({ block: 'nearest' }); }, 0);
      self._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, self.OK_MS);
    };
    if (this.FAST) { finish(); return; }
    /* the film plays the child's model, frame by frame, up to where it stops */
    var stop = res.ok ? roles.length : Math.max(0, roles.indexOf(res.film.at)), i = 0;
    this._busy = true;
    var step = function () { if (self.st !== st) return; if (i > stop || i >= roles.length) { finish(); return; } self._view.play = roles[i]; self._paint(); i++; self._later(step, 520); };
    step();
  }
};

function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
/* x-ray dots in sockets: grid (rows of 10, or 5 for a cap of 10), a single row, a ring (one tray) or a row of trays */
function dotsSVG(cap, n, o) {
  var wide = o.mode === 'wide', s = '', W, H;
  if (o.kind === 'trays') {
    var trays = Math.max(0, Math.min(12, n || 0)), tr = wide ? 22 : 15, tg = wide ? 8 : 5, show = Math.max(trays, 0), cols = Math.max(4, Math.min(6, show || 4));
    W = cols * (2 * tr + tg) + tg; H = Math.ceil(Math.max(show, 1) / cols) * (2 * tr + tg) + tg;
    for (var i = 0; i < show; i++) { var cx = tg + tr + (i % cols) * (2 * tr + tg), cy = tg + tr + Math.floor(i / cols) * (2 * tr + tg);
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + tr + '" class="sf-traycirc' + (o.ghost ? ' is-ghost' : '') + '"/>';
      for (var e = 0; e < Math.min(o.each || 0, 8); e++) { var a = e / Math.min(o.each, 8) * Math.PI * 2; s += '<circle cx="' + (cx + Math.cos(a) * tr * 0.55).toFixed(1) + '" cy="' + (cy + Math.sin(a) * tr * 0.55).toFixed(1) + '" r="' + (tr * 0.18).toFixed(1) + '" class="sf-dot"/>'; } }
    if (!show) s += '<circle cx="' + (tg + tr) + '" cy="' + (tg + tr) + '" r="' + tr + '" class="sf-traycirc is-empty"/>';
    return '<svg class="sf-dots" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true">' + s + '</svg>';
  }
  var count = o.outline != null ? o.outline : cap, cols2, pitch, rows, r;
  if (o.kind === 'row') { cols2 = cap; rows = 1; pitch = wide ? 26 : (cap > 10 ? 14 : 24); }
  else if (o.kind === 'ring') { cols2 = 4; rows = 2; pitch = wide ? 26 : 20; count = 8; }
  else { cols2 = cap > 10 || o.row10 ? 10 : 5; rows = Math.ceil(Math.max(count, cap) / cols2); pitch = wide ? 26 : o.tiny ? 19 : 22; }
  if (o.outline != null) rows = Math.max(1, Math.ceil(count / cols2));
  r = pitch * 0.38; var extra = o.spill || 0, ex = extra ? Math.min(extra, 10) : 0;
  W = cols2 * pitch + 8 + (ex ? pitch * 1.4 : 0); H = rows * pitch + 8;
  for (var k = 0; k < count; k++) {
    var x = 4 + (k % cols2) * pitch + pitch / 2, y = 4 + Math.floor(k / cols2) * pitch + pitch / 2, has = n != null && k < n;
    var isGap = o.gap && k >= count - o.gap;
    s += '<circle cx="' + x + '" cy="' + y + '" r="' + r.toFixed(1) + '" class="sf-sock' + (isGap ? ' is-gap' : '') + '"/>';
    if (has) s += o.numbered ? '<circle cx="' + x + '" cy="' + y + '" r="' + (r * 0.95).toFixed(1) + '" class="sf-ring"/><text x="' + x + '" y="' + (y + r * 0.42).toFixed(1) + '" class="sf-rnum" font-size="' + (r * 1.15).toFixed(1) + '">' + (k + 1) + '</text>' : '<circle cx="' + x + '" cy="' + y + '" r="' + (r * 0.8).toFixed(1) + '" class="sf-dot' + (o.ghost ? ' is-ghost' : '') + '"/>';
  }
  for (var q = 0; q < ex; q++) { var sx = 4 + cols2 * pitch + pitch * 0.7 + (q % 2) * pitch * 0.5, sy = 4 + pitch / 2 + Math.floor(q / 2) * (pitch * 0.55); s += '<circle cx="' + sx.toFixed(1) + '" cy="' + Math.min(H - r, sy).toFixed(1) + '" r="' + (r * 0.7).toFixed(1) + '" class="sf-dot is-spill"/>'; }
  if (n != null && n > count && !o.outline) for (var z = 0; z < Math.min(n - count, 10); z++) s += '<circle cx="' + (W - 6) + '" cy="' + (6 + z * 6) + '" r="3" class="sf-dot is-spill"/>';
  return '<svg class="sf-dots" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true">' + s + '</svg>';
}

var sfCssDone = false;
function injectFilmCSS() {
  if (sfCssDone || typeof document === 'undefined') return;
  sfCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.sf-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;}'
  + '.sf-top{display:flex;align-items:center;gap:12px;width:100%;max-width:680px;}'
  + '.sf-patient{position:relative;flex:0 0 auto;display:flex;align-items:center;justify-content:center;border-radius:50%;background:#13282A;box-shadow:inset 0 0 0 2px #8FE3D6;padding:6px;}'
  + '.sf-pic{display:block;object-fit:contain;pointer-events:none;} .sf-pic.is-xray{filter:grayscale(1) invert(1) brightness(.85) sepia(1) hue-rotate(140deg) saturate(2.6);opacity:.92;} .sf-pic.is-healed{animation:sfHop .32s ease-out 2;}'
  + '@keyframes sfHop{50%{transform:translateY(-12px);}}'
  + '.sf-band{position:absolute;right:-10px;top:-6px;transform:rotate(-24deg);animation:sfBand .4s ease-out both;} @keyframes sfBand{from{transform:translate(20px,-30px) rotate(-24deg);opacity:0;}}'
  + '.sf-card{position:relative;flex:1 1 auto;min-width:0;padding:10px 52px 10px 14px;border-radius:16px;background:#FFFDF7;box-shadow:inset 0 0 0 2.5px #0F4A40;}'
  + '.sf-story{margin:0;font-family:' + B + ';font-weight:700;font-size:18px;line-height:1.4;color:#2A2A35;}'
  + '.sf-num{color:#146B5E;font-weight:900;}'
  + '.sf-cl{border-radius:6px;padding:0 2px;transition:background .15s;} .sf-cl.is-lit{background:#D5F3EC;} .sf-cl.is-bad{background:#FFE2C2;box-shadow:0 0 0 2px #F2784B;} .sf-cl.is-bad .sf-num{display:inline-block;transform:scale(1.2);color:#B5461F;}'
  + '.sf-q{color:#0F4A40;font-weight:900;} .sf-q.is-answer{color:#146B5E;}'
  + '.sf-read{position:absolute;right:4px;top:4px;width:44px;height:44px;border:0;border-radius:50%;background:#EAF6F2;cursor:pointer;display:flex;align-items:center;justify-content:center;} .sf-read svg{width:22px;height:22px;}'
  + '.sf-things{flex:0 0 auto;display:flex;gap:6px;}'
  + '.sf-box{position:relative;display:flex;flex-direction:column;align-items:stretch;gap:6px;width:100%;max-width:640px;padding:12px;box-sizing:border-box;border-radius:18px;background:#13282A;box-shadow:inset 0 0 0 2px #8FE3D6,0 5px 0 #0B1A1B;overflow:hidden;}'
  + '.sf-frame{position:relative;display:flex;align-items:center;justify-content:center;min-height:56px;padding:6px 8px;border:0;border-radius:12px;background:#1D3A3C;box-shadow:inset 0 0 0 2px #3E6E6C;font:inherit;cursor:pointer;color:#EAFBF8;}'
  + '.sf-frame:disabled{cursor:default;opacity:1;} .sf-frame:focus-visible{outline:3px solid #FFD66B;outline-offset:2px;}'
  + '.sf-frame.is-q{background:repeating-linear-gradient(45deg,#2B4E50 0 8px,#24494A 8px 16px);box-shadow:inset 0 0 0 2px #8FE3D6;}'
  + '.sf-frame.is-lit{box-shadow:inset 0 0 0 3px #8FE3D6,0 0 14px #8FE3D6;} .sf-frame.is-bad{box-shadow:inset 0 0 0 3px #F2B57B,0 0 16px #F2784B;animation:sfPulse .7s ease-in-out 2;} @keyframes sfPulse{50%{transform:translateX(3px);}}'
  + '.sf-badge{position:absolute;left:6px;top:4px;min-width:28px;height:28px;padding:0 6px;box-sizing:border-box;border-radius:14px;display:flex;align-items:center;justify-content:center;background:#FFFDF7;color:#0F4A40;font-family:' + H + ';font-weight:800;font-size:19px;} .sf-badge.is-q{background:#8FE3D6;}'
  + '.sf-dots{display:block;max-width:100%;height:auto;}'
  + '.sf-sock{fill:#26484A;stroke:#3E6E6C;stroke-width:1.5;} .sf-sock.is-gap{fill:#5A3A22;stroke:#F2B57B;stroke-width:2;}'
  + '.sf-dot{fill:#EAFBF8;filter:drop-shadow(0 0 3px #8FE3D6);} .sf-dot.is-ghost{fill:#BDEDE4;opacity:.6;} .sf-dot.is-spill{fill:#FFC58A;filter:drop-shadow(0 0 3px #F2784B);}'
  + '.sf-ring{fill:none;stroke:#FFD66B;stroke-width:2;stroke-dasharray:3 2;} .sf-rnum{fill:#FFD66B;font-family:' + H + ';font-weight:800;text-anchor:middle;}'
  + '.sf-traycirc{fill:#24494A;stroke:#8FE3D6;stroke-width:2;} .sf-traycirc.is-ghost{stroke-dasharray:4 3;} .sf-traycirc.is-empty{opacity:.35;}'
  + '.sf-chute{display:flex;justify-content:center;height:22px;} .sf-chute svg{width:58px;height:22px;}'
  + '.sf-parts,.sf-cmprow,.sf-grprow{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;} .sf-cmprow{grid-template-columns:minmax(0,1fr) auto;}'
  + '.sf-bracket{display:block;height:14px;margin:0 22%;border:3px solid #8FE3D6;border-top:0;border-radius:0 0 12px 12px;}'
  + '.sf-fog{position:absolute;inset:0;opacity:0;background:radial-gradient(circle,rgba(255,255,255,.0) 0,rgba(234,251,248,.55) 100%);animation:sfFog .6s ease-out;pointer-events:none;} @keyframes sfFog{from{opacity:1;}to{opacity:0;}}'
  + '.sf-box.is-healed{box-shadow:inset 0 0 0 3px #8FE3D6,0 0 22px rgba(143,227,214,.6),0 5px 0 #0B1A1B;}'
  + '.sf-tray{display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:12px;min-height:56px;} .sf-tray .sf-go{margin-left:8px;}'
  + '.sf-tile{min-width:64px;height:56px;padding:0 10px;border:0;border-radius:14px;background:#FFFDF7;box-shadow:inset 0 0 0 3px #146B5E,0 4px 0 #9CC9BE;font-family:' + H + ';font-weight:800;font-size:30px;color:#0F4A40;cursor:pointer;}'
  + '.sf-tile.is-sel{background:#FFE9A8;box-shadow:inset 0 0 0 3px #B5861F,0 4px 0 #D9B95C;transform:translateY(-4px);} .sf-tile.is-out{opacity:.25;cursor:default;} .sf-tile:disabled{cursor:default;}'
  + '.sf-tile:focus-visible,.sf-go:focus-visible,.sf-dbtn:focus-visible,.sf-read:focus-visible{outline:3px solid #146B5E;outline-offset:3px;}'
  + '.sf-fw{position:relative;display:flex;flex-direction:column;min-width:0;} .sf-fw > .sf-frame{flex:1 1 auto;}'
  + '.sf-dial{display:flex;align-items:center;gap:6px;} .sf-fw:not(.is-half) > .sf-dial{position:absolute;right:8px;top:50%;transform:translateY(-50%);} .sf-fw:not(.is-half) > .sf-frame.is-q{padding-right:178px;}'
  + '.sf-fw.is-half > .sf-dial{justify-content:center;margin-top:5px;}'
  + '.sf-dbtn{width:52px;height:52px;border:0;border-radius:50%;background:#FFFDF7;box-shadow:inset 0 0 0 2.5px #146B5E;font-family:' + H + ';font-weight:800;font-size:28px;color:#146B5E;cursor:pointer;} .sf-dbtn:disabled{opacity:.35;cursor:default;}'
  + '.sf-dnum{min-width:64px;height:52px;display:flex;align-items:center;justify-content:center;border-radius:12px;background:#13282A;color:#EAFBF8;font-family:' + H + ';font-weight:800;font-size:32px;box-shadow:inset 0 0 0 2px #8FE3D6;}'
  + '.sf-go{height:52px;padding:0 22px;border:0;border-radius:26px;background:#146B5E;color:#FFFFFF;font-family:' + H + ';font-weight:800;font-size:20px;cursor:pointer;box-shadow:0 4px 0 #0F4A40;} .sf-go:disabled{opacity:.5;cursor:default;}'
  + '.sf-note{min-height:1.4em;margin:0;padding:0 8px;text-align:center;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.35;color:#2A2A35;max-width:640px;} .sf-note:empty{display:none;} .sf-note.is-hint{color:#B5461F;} .sf-note.is-ok{color:#146B5E;font-family:' + H + ';font-size:26px;}'
  /* phones */
  + '.sf-wrap.is-narrow{gap:7px;} .sf-wrap.is-narrow .sf-top{gap:8px;} .sf-wrap.is-narrow .sf-story{font-size:16px;line-height:1.35;} .sf-wrap.is-narrow .sf-card{padding:8px 40px 8px 10px;}'
  + '.sf-wrap.is-narrow .sf-things{flex-direction:column;gap:4px;} .sf-wrap.is-narrow .sf-box{padding:8px;gap:4px;} .sf-wrap.is-narrow .sf-frame{min-height:46px;padding:4px 6px;}'
  + '.sf-wrap.is-narrow .sf-chute{height:16px;} .sf-wrap.is-narrow .sf-chute svg{height:16px;} .sf-wrap.is-narrow .sf-tile{min-width:60px;height:50px;font-size:26px;} .sf-wrap.is-narrow .sf-dbtn{width:48px;height:48px;} .sf-wrap.is-narrow .sf-dnum{height:48px;min-width:56px;}'
  + '.sf-wrap.is-narrow .sf-go{height:48px;padding:0 16px;font-size:18px;} .sf-wrap.is-narrow .sf-note{font-size:17px;} .sf-wrap.is-narrow .sf-note.is-ok{font-size:22px;} .sf-wrap.is-narrow .sf-badge{min-width:24px;height:24px;font-size:16px;}'
  + '.sf-wrap.is-narrow .sf-card{display:flow-root;padding:6px 8px 6px 6px;} .sf-wrap.is-narrow .sf-card .sf-patient{float:left;margin:0 8px 2px 0;padding:3px;} .sf-wrap.is-narrow .sf-card .sf-things{float:right;flex-direction:row;margin:0 0 2px 6px;}'
  + '.sf-wrap.is-narrow .sf-read{position:static;display:inline-flex;vertical-align:middle;width:44px;height:44px;margin-left:2px;}'
  + '.sf-wrap.is-narrow .sf-chute{height:14px;} .sf-wrap.is-narrow .sf-chute svg{height:14px;width:40px;} .sf-wrap.is-narrow .sf-tile{height:48px;} .sf-wrap.is-narrow .sf-tray{min-height:48px;gap:10px;}'
  + '.sf-wrap.is-narrow .sf-dbtn{width:44px;height:44px;font-size:24px;} .sf-wrap.is-narrow .sf-dnum{height:44px;min-width:44px;font-size:26px;} .sf-wrap.is-narrow .sf-fw:not(.is-half) > .sf-frame.is-q{padding-right:148px;} .sf-wrap.is-narrow .sf-tray{gap:8px;} .sf-wrap.is-narrow .sf-tray .sf-go{margin-left:2px;}'
  + '.sf-wrap.is-tiny .sf-story{font-size:15px;line-height:1.3;} .sf-wrap.is-tiny .sf-card{padding:5px 6px 5px 5px;} .sf-wrap.is-tiny .sf-tile{min-width:52px;padding:0 6px;} .sf-wrap.is-tiny .sf-go{padding:0 12px;font-size:17px;}'
  + '.sf-wrap.is-tiny{gap:5px;} .sf-wrap.is-tiny .sf-top{gap:5px;}'
  + '.sf-wrap.is-tiny .sf-box{padding:6px;gap:3px;} .sf-wrap.is-tiny .sf-frame{min-height:44px;padding:2px 6px;} .sf-wrap.is-tiny .sf-chute{height:10px;} .sf-wrap.is-tiny .sf-chute svg{height:10px;}'
  + '.sf-wrap.is-fast *,.sf-wrap.is-fast *::after{animation:none !important;transition:none !important;}'
  + '@media print{.sf-tray,.sf-dial,.sf-note{display:none;}}'
  + '@media (prefers-reduced-motion: reduce){.sf-wrap *{animation-duration:.2s !important;transition-duration:.05s !important;}}';
  var s = document.createElement('style'); s.id = 'sf-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.StoryFilmActivity = StoryFilmActivity;
