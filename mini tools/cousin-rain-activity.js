/* =====================================================================
   cousin-rain-activity.js — ACTIVITY #78 of the one-by-one rebuild:
   "Mim's Memory Baskets" → THE COUSIN RAIN (L.K.5.A, 11 locales).
   Design sheet: docs/activities-rebuild/designs/078-mims-baskets.md
   ---------------------------------------------------------------------
   THE INVENTION: Mim's basket tips and her things spill onto the grass.
   The baskets below carry NO labels — the child makes the groups. A basket
   holding two or more things of ONE kind makes the little cloud over it
   rain down a cousin, a new member of that kind. At Check a basket that
   mixes kinds makes its cloud split in two, and each half rains a cousin
   onto its own relatives — two families side by side, and in the colour
   and shape rounds the cousins never share the confusing look. Two clouds:
   each cloud shows its rule as two pictures; things with both go in the
   middle basket, and at Check every thing catches the drops of the traits
   it really has.
   ACTIVITY LAYER ONLY: the model is cousin-rain-core.js; pictures through
   lcs-pictures.js; lcs-shell.js untouched (the shell's Check is hidden and
   pressed by this activity on success). Test seams:
   window.CousinRainActivity.st / ._pool / ._order / ._ensurePool / .FAST.
   ===================================================================== */
'use strict';

var CousinRainActivity = {
  id: 'cousin-rain',
  apparatusClasses: ['cr-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble: {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:       {en:'Mim’s Memory Baskets',de:'Mims Erinnerungskörbe',nl:'Mims geheugenmanden',da:'Mims huskekurve',sv:'Mims minneskorgar',no:'Mims huskekurver',es:'Las canastas de la memoria de Mim',it:'I cestini della memoria di Mim',pt:'Os cestos da memória da Mimi',fr:'Les paniers à souvenirs de Mim',fi:'Mimin muistikorit'},
    tL1:         {en:'Same kind, same basket.',de:'Gleiche Sorte, gleicher Korb.',nl:'Zelfde soort, zelfde mand.',da:'Samme slags, samme kurv.',sv:'Samma sort, samma korg.',no:'Samme slag, samme kurv.',es:'Mismo tipo, misma canasta.',it:'Stesso tipo, stesso cestino.',pt:'Mesmo tipo, mesmo cesto.',fr:'Même sorte, même panier.',fi:'Samanlaiset samaan koriin.'},
    tL2:         {en:'Which one is a different kind? Put it in the little basket.',de:'Welches Ding gehört zu einer anderen Sorte? Leg es in den kleinen Korb.',nl:'Welke is van een andere soort? Leg die in de kleine mand.',da:'Hvilken er en anden slags? Læg den i den lille kurv.',sv:'Vilken är av en annan sort? Lägg den i den lilla korgen.',no:'Hvilken er av et annet slag? Legg den i den lille kurven.',es:'¿Cuál es de otro tipo? Ponlo en la canasta chiquita.',it:'Quale è di un altro tipo? Mettilo nel cestino piccolo.',pt:'Qual é de outro tipo? Coloque no cesto pequeno.',fr:'Lequel est d’une autre sorte ? Mets-le dans le petit panier.',fi:'Mikä on erilainen? Laita se pieneen koriin.'},
    tL3:         {en:'Put each thing under its cloud. The middle basket is for both clouds.',de:'Leg jedes Ding unter seine Wolke. Der mittlere Korb ist für beide Wolken.',nl:'Leg elk ding onder zijn wolk. De middelste mand is voor allebei de wolken.',da:'Læg hver ting under sin sky. Kurven i midten er til begge skyer.',sv:'Lägg varje sak under sitt moln. Korgen i mitten är för båda molnen.',no:'Legg hver ting under skyen sin. Kurven i midten er for begge skyene.',es:'Pon cada cosa debajo de su nube. La canasta de en medio es para las dos nubes.',it:'Metti ogni cosa sotto la sua nuvola. Il cestino in mezzo è per tutte e due le nuvole.',pt:'Coloque cada coisa embaixo da sua nuvem. O cesto do meio é para as duas nuvens.',fr:'Mets chaque chose sous son nuage. Le panier du milieu est pour les deux nuages.',fi:'Laita jokainen asia oman pilvensä alle. Keskimmäinen kori on kummallekin pilvelle.'},
    check:       {en:'Check',de:'Prüfen',nl:'Controleren',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Revisar',it:'Controlla',pt:'Conferir',fr:'Vérifier',fi:'Tarkista'},
    hMeadow:     {en:'Mim still has things on the grass. Put every one in a basket.',de:'Auf der Wiese liegt noch etwas. Leg alles in einen Korb.',nl:'Er ligt nog iets in het gras. Leg alles in een mand.',da:'Der ligger stadig noget på græsset. Læg det hele i en kurv.',sv:'Det ligger fortfarande saker på gräset. Lägg allt i en korg.',no:'Det ligger fortsatt noe på gresset. Legg alt i en kurv.',es:'Todavía quedan cosas en el pasto. Pon todo en una canasta.',it:'C’è ancora qualcosa sul prato. Metti tutto in un cestino.',pt:'Ainda tem coisas na grama. Coloque tudo em um cesto.',fr:'Il reste des choses dans l’herbe. Mets tout dans un panier.',fi:'Nurmikolla on vielä kuvia. Laita kaikki koreihin.'},
    hMixed:      {en:'Mim’s cloud split in two: two different kinds are in one basket.',de:'Mims Wolke hat sich geteilt: In einem Korb sind zwei verschiedene Sorten.',nl:'Mims wolk is in tweeën gesplitst: in één mand zitten twee soorten.',da:'Mims sky er delt i to: Der er to forskellige slags i én kurv.',sv:'Mims moln delade sig: det finns två olika sorter i en korg.',no:'Skyen til Mim delte seg i to: Det er to forskjellige slag i én kurv.',es:'La nube de Mim se partió en dos: hay dos tipos distintos en una canasta.',it:'La nuvola di Mim si è divisa in due: in un cestino ci sono due tipi diversi.',pt:'A nuvem da Mimi se dividiu em duas: tem dois tipos diferentes em um cesto.',fr:'Le nuage de Mim s’est coupé en deux : il y a deux sortes différentes dans un panier.',fi:'Mimin pilvi jakautui kahtia: yhdessä korissa on kahta eri lajia.'},
    hSwapped:    {en:'The little basket is for the one that is a different kind.',de:'Der kleine Korb ist für das Ding, das zu einer anderen Sorte gehört.',nl:'De kleine mand is voor die ene van een andere soort.',da:'Den lille kurv er til den ene, der er en anden slags.',sv:'Den lilla korgen är till den som är av en annan sort.',no:'Den lille kurven er til den ene som er av et annet slag.',es:'La canasta chiquita es para la cosa que es de otro tipo.',it:'Il cestino piccolo è per quello di un altro tipo.',pt:'O cesto pequeno é para a coisa que é de outro tipo.',fr:'Le petit panier est pour celui qui est d’une autre sorte.',fi:'Pieni kori on sille yhdelle, joka on erilainen.'},
    hTraits:     {en:'Look at the raindrops each thing caught.',de:'Schau, welche Regentropfen jedes Ding gefangen hat.',nl:'Kijk welke regendruppels elk ding heeft opgevangen.',da:'Se, hvilke regndråber hver ting har fanget.',sv:'Titta på regndropparna som varje sak fångade.',no:'Se på regndråpene hver ting fanget.',es:'Mira las gotas de lluvia que atrapó cada cosa.',it:'Guarda le gocce di pioggia che ha preso ogni cosa.',pt:'Olhe as gotas de chuva que cada coisa pegou.',fr:'Regarde les gouttes de pluie que chaque chose a attrapées.',fi:'Katso, mitä sadepisaroita kukin asia sai.'},
    hMiss2:      {en:'Follow the dotted line: this one’s family is over there.',de:'Folge der gepunkteten Linie: Dort ist seine Familie.',nl:'Volg de stippellijn: daar is zijn familie.',da:'Følg den prikkede linje: Dér er dens familie.',sv:'Följ den prickade linjen: där är dess familj.',no:'Følg den prikkete linjen: Der er familien dens.',es:'Sigue la línea de puntos: allá está su familia.',it:'Segui la linea tratteggiata: la sua famiglia è là.',pt:'Siga a linha pontilhada: a família dela está lá.',fr:'Suis la ligne pointillée : sa famille est là-bas.',fi:'Seuraa pisteviivaa: sen perhe on tuolla.'},
    hMiss2L3:    {en:'Follow the dotted line to the basket that matches its raindrops.',de:'Folge der gepunkteten Linie zu dem Korb, der zu seinen Regentropfen passt.',nl:'Volg de stippellijn naar de mand die bij zijn regendruppels past.',da:'Følg den prikkede linje til den kurv, der passer til dens regndråber.',sv:'Följ den prickade linjen till korgen som passar till dess regndroppar.',no:'Følg den prikkete linjen til kurven som passer til regndråpene dens.',es:'Sigue la línea de puntos hasta la canasta que va con sus gotas.',it:'Segui la linea tratteggiata fino al cestino giusto per le sue gocce.',pt:'Siga a linha pontilhada até o cesto que combina com as gotas dela.',fr:'Suis la ligne pointillée jusqu’au panier qui va avec ses gouttes.',fi:'Seuraa pisteviivaa koriin, joka sopii sen sadepisaroihin.'},
    setLevel:    {en:'Round types',de:'Runden',nl:'Soort rondes',da:'Slags runder',sv:'Typer av omgångar',no:'Typer runder',es:'Tipo de rondas',it:'Tipi di turno',pt:'Tipos de rodada',fr:'Types de manches',fi:'Kierrostyypit'},
    l1:          {en:'Sort',de:'Sortieren',nl:'Sorteren',da:'Sortér',sv:'Sortera',no:'Sorter',es:'Clasificar',it:'Smista',pt:'Separar',fr:'Trier',fi:'Lajittele'},
    l2:          {en:'The stray',de:'Was passt nicht?',nl:'Eentje anders',da:'Den, der ikke passer',sv:'Den som inte passar',no:'Den som ikke passer',es:'El que no va',it:'Quello diverso',pt:'O diferente',fr:'L’intrus',fi:'Ei kuulu joukkoon'},
    l3:          {en:'Two clouds',de:'Zwei Wolken',nl:'Twee wolken',da:'To skyer',sv:'Två moln',no:'To skyer',es:'Dos nubes',it:'Due nuvole',pt:'Duas nuvens',fr:'Deux nuages',fi:'Kaksi pilveä'},
    setBaskets:  {en:'Baskets',de:'Körbe',nl:'Manden',da:'Kurve',sv:'Korgar',no:'Kurver',es:'Canastas',it:'Cestini',pt:'Cestos',fr:'Paniers',fi:'Korit'},
    bAny:        {en:'Two to four',de:'Zwei bis vier',nl:'Twee tot vier',da:'To til fire',sv:'Två till fyra',no:'To til fire',es:'De dos a cuatro',it:'Da due a quattro',pt:'De dois a quatro',fr:'De deux à quatre',fi:'Kahdesta neljään'},
    bTwo:        {en:'Two',de:'Zwei',nl:'Twee',da:'To',sv:'Två',no:'To',es:'Dos',it:'Due',pt:'Dois',fr:'Deux',fi:'Kaksi'},
    setRain:     {en:'Helping rain',de:'Hilfsregen',nl:'Hulpregen',da:'Hjælperegn',sv:'Hjälpregn',no:'Hjelperegn',es:'Lluvia que ayuda',it:'Pioggia d’aiuto',pt:'Chuva que ajuda',fr:'Pluie qui aide',fi:'Apusade'},
    rLive:       {en:'While sorting',de:'Beim Sortieren',nl:'Tijdens het sorteren',da:'Mens du sorterer',sv:'Medan du sorterar',no:'Mens du sorterer',es:'Mientras clasificas',it:'Mentre smisti',pt:'Enquanto separa',fr:'Pendant le tri',fi:'Lajittelun aikana'},
    rCheck:      {en:'Only at Check',de:'Erst beim Prüfen',nl:'Pas bij Controleren',da:'Først ved Tjek',sv:'Först vid Kontrollera',no:'Først ved Sjekk',es:'Solo al Revisar',it:'Solo con Controlla',pt:'Só ao Conferir',fr:'Seulement à Vérifier',fi:'Vasta tarkistaessa'},
    ariaMim:     {en:'Mim, the little cloud',de:'Mim, die kleine Wolke',nl:'Mim, het wolkje',da:'Mim, den lille sky',sv:'Mim, det lilla molnet',no:'Mim, den lille skyen',es:'Mim, la nubecita',it:'Mim, la nuvoletta',pt:'Mimi, a nuvenzinha',fr:'Mim, le petit nuage',fi:'Mim, pieni pilvi'},
    ariaMeadow:  {en:'Grass: tap here to put a thing back',de:'Wiese: hier tippen, um etwas zurückzulegen',nl:'Gras: tik hier om iets terug te leggen',da:'Græs: tryk her for at lægge noget tilbage',sv:'Gräs: tryck här för att lägga tillbaka en sak',no:'Gress: trykk her for å legge noe tilbake',es:'Pasto: toca aquí para regresar una cosa',it:'Prato: tocca qui per rimettere giù una cosa',pt:'Grama: toque aqui para devolver uma coisa',fr:'Herbe : touche ici pour reposer une chose',fi:'Nurmikko: napauta tästä, niin asia palaa takaisin'},
    bBasket:     {en:'Basket {n}',de:'Korb {n}',nl:'Mand {n}',da:'Kurv {n}',sv:'Korg {n}',no:'Kurv {n}',es:'Canasta {n}',it:'Cestino {n}',pt:'Cesto {n}',fr:'Panier {n}',fi:'Kori {n}'},
    bBig:        {en:'Big basket',de:'Großer Korb',nl:'Grote mand',da:'Stor kurv',sv:'Stor korg',no:'Stor kurv',es:'Canasta grande',it:'Cestino grande',pt:'Cesto grande',fr:'Grand panier',fi:'Iso kori'},
    bLittle:     {en:'Little basket',de:'Kleiner Korb',nl:'Kleine mand',da:'Lille kurv',sv:'Liten korg',no:'Liten kurv',es:'Canasta chiquita',it:'Cestino piccolo',pt:'Cesto pequeno',fr:'Petit panier',fi:'Pieni kori'},
    bLeft:       {en:'Left basket',de:'Linker Korb',nl:'Linker mand',da:'Venstre kurv',sv:'Vänster korg',no:'Venstre kurv',es:'Canasta de la izquierda',it:'Cestino a sinistra',pt:'Cesto da esquerda',fr:'Panier de gauche',fi:'Vasen kori'},
    bMid:        {en:'Middle basket',de:'Mittlerer Korb',nl:'Middelste mand',da:'Midterste kurv',sv:'Korgen i mitten',no:'Midterste kurv',es:'Canasta de en medio',it:'Cestino in mezzo',pt:'Cesto do meio',fr:'Panier du milieu',fi:'Keskimmäinen kori'},
    bRight:      {en:'Right basket',de:'Rechter Korb',nl:'Rechter mand',da:'Højre kurv',sv:'Höger korg',no:'Høyre kurv',es:'Canasta de la derecha',it:'Cestino a destra',pt:'Cesto da direita',fr:'Panier de droite',fi:'Oikea kori'},
    ariaBasket:  {en:'{b}: {list}',de:'{b}: {list}',nl:'{b}: {list}',da:'{b}: {list}',sv:'{b}: {list}',no:'{b}: {list}',es:'{b}: {list}',it:'{b}: {list}',pt:'{b}: {list}',fr:'{b} : {list}',fi:'{b}: {list}'},
    sEmpty:      {en:'empty',de:'leer',nl:'leeg',da:'tom',sv:'tom',no:'tom',es:'vacía',it:'vuoto',pt:'vazio',fr:'vide',fi:'tyhjä'},
    sPicked:     {en:'picked up',de:'aufgehoben',nl:'opgepakt',da:'samlet op',sv:'upplockad',no:'plukket opp',es:'levantado',it:'preso',pt:'pego',fr:'pris',fi:'nostettu'},
    ariaRuleA:   {en:'Left cloud: {list}',de:'Linke Wolke: {list}',nl:'Linkerwolk: {list}',da:'Venstre sky: {list}',sv:'Vänstra molnet: {list}',no:'Venstre sky: {list}',es:'Nube de la izquierda: {list}',it:'Nuvola a sinistra: {list}',pt:'Nuvem da esquerda: {list}',fr:'Nuage de gauche : {list}',fi:'Vasen pilvi: {list}'},
    ariaRuleB:   {en:'Right cloud: {list}',de:'Rechte Wolke: {list}',nl:'Rechterwolk: {list}',da:'Højre sky: {list}',sv:'Högra molnet: {list}',no:'Høyre sky: {list}',es:'Nube de la derecha: {list}',it:'Nuvola a destra: {list}',pt:'Nuvem da direita: {list}',fr:'Nuage de droite : {list}',fi:'Oikea pilvi: {list}'},
    ariaRain:    {en:'{b}: Mim’s cloud added one more: {c}.',de:'{b}: Mims Wolke hat noch eins dazugegeben: {c}.',nl:'{b}: Mims wolk heeft er nog een bij gedaan: {c}.',da:'{b}: Mims sky har givet én mere: {c}.',sv:'{b}: Mims moln gav en till: {c}.',no:'{b}: Skyen til Mim ga én til: {c}.',es:'{b}: la nube de Mim le dio otra cosa: {c}.',it:'{b}: la nuvola di Mim ha regalato un’altra cosa: {c}.',pt:'{b}: a nuvem da Mimi deu mais uma coisa: {c}.',fr:'{b}\u202F: le nuage de Mim a donné une chose de plus\u202F: {c}.',fi:'{b} sai Mimin pilveltä yhden lisää: {c}.'}
  },/*STRINGS-END*/

  defaults: { level: 'l1', baskets: 'any', rain: 'live' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'l1', labelKey: 'l1' }, { value: 'l2', labelKey: 'l2' }, { value: 'l3', labelKey: 'l3' }] },
    { key: 'baskets', type: 'choice', labelKey: 'setBaskets', options: [{ value: 'any', labelKey: 'bAny' }, { value: 'two', labelKey: 'bTwo' }] },
    { key: 'rain', type: 'choice', labelKey: 'setRain', options: [{ value: 'live', labelKey: 'rLive' }, { value: 'check', labelKey: 'rCheck' }] }
  ],

  OK_MS: 500, FAST: false, LONG_MS: 650,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._view = {}; this._pics = {}; this._rosy = 0; this._prevCousins = {}; this._drag = null;
    injectRainCSS();
  },
  destroy: function () { this._clearTimers(); this._endDrag(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this.st && this.st.r.level !== 'l3' && this.st.rain !== this._rain()) { this.st.rain = this._rain(); this._prevCousins = CousinRainCore.cousins(this.st); if (this._wrap) this._paint(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return CousinRainCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return CousinRainCore.levelOf(this._setting('level')); },
  _baskets: function () { return CousinRainCore.basketsOf(this._setting('baskets')); },
  _rain: function () { return CousinRainCore.rainOf(this._setting('rain')); },
  _key: function () { var l = this._level(); return l + '.' + (l === 'l1' ? this._baskets() : 'any'); },

  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = CousinRainCore.ids(this._level(), this._baskets()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = CousinRainCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.slice();
      this._order = C.plan(this._level(), this._baskets(), Math.random, prev); this._orderForPool = pool;
      this._pass = pass;
    }
    var idx = this._order[pos], level = this._level(), r = C.round(level, idx);
    var pa = { msg: this._t(level === 'l1' ? 'tL1' : level === 'l2' ? 'tL2' : 'tL3') }; this._pa = pa;
    return {
      id: 'rain.' + this._loc() + '.' + r.id, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(idx); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _start: function (idx) {
    var C = CousinRainCore, r = C.round(this._level(), idx);
    this._clearTimers(); this._endDrag(); this._busy = false; this._view = { spill: true };
    this.st = C.newState(r, this._rain());
    this._prevCousins = {};
    var line = this._t(r.level === 'l1' ? 'tL1' : r.level === 'l2' ? 'tL2' : 'tL3');
    if (this._pa) this._pa.msg = line;
    var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line;
    this._loadPics();
    var self = this, st = this.st;
    this._later(function () { if (self.st === st && self._view.spill) { self._view.spill = false; if (self._wrap) self._paint(); } }, this._ms(1300));
  },
  _loadPics: function () {
    var self = this, dirs = {}, C = CousinRainCore;
    dirs[C.DATA.MIM.split('/')[0]] = 1;
    Object.keys(C.DATA.PIC).forEach(function (k) { dirs[C.DATA.PIC[k].split('/')[0]] = 1; });
    Object.keys(dirs).forEach(function (dir) {
      if (self._pics[dir] || typeof LCSPictures === 'undefined') return;
      LCSPictures.load(dir).then(function (th) { self._pics[dir] = th; if (self._wrap && self._wrap.isConnected && !self._drag) self._paint(); }).catch(function () {});
    });
  },
  /* a library picture by its 'theme/key' path, or null while its theme loads */
  _picPath: function (path, size, cls) {
    var i = path.lastIndexOf('/'), th = this._pics[path.slice(0, i)], key = path.slice(i + 1);
    if (!th || !th.nouns[key]) return null;
    var im = LCSPictures.img(th, key, this._loc(), { size: size }); im.className = 'cr-pic' + (cls ? ' ' + cls : ''); im.style.width = size + 'px'; im.style.height = size + 'px';
    return im;
  },
  _pic: function (key, size, cls) { return this._picPath(CousinRainCore.DATA.PIC[key], size, cls); },
  _name: function (key) {
    var path = CousinRainCore.DATA.PIC[key], i = path.lastIndexOf('/'), th = this._pics[path.slice(0, i)];
    if (!th) return key;
    var own = CousinRainCore.DATA.LABEL[this._loc()];
    return (own && own[key]) || LCSPictures.label(th, path.slice(i + 1), this._loc());
  },
  _basketName: function (b) {
    var lv = this.st.r.level;
    if (lv === 'l2') return this._t(b === 0 ? 'bBig' : 'bLittle');
    if (lv === 'l3') return this._t(['bLeft', 'bMid', 'bRight'][b]);
    return this._t('bBasket', { n: b + 1 });
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var C = CousinRainCore; this.st = C.newState(C.round(this._level(), C.opener(this._level(), this._baskets())), this._rain()); this._loadPics(); }
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
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected || self._drag) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'cr-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="cr-sky"></div><div class="cr-rules"></div><div class="cr-meadow"></div><div class="cr-baskets"></div><svg class="cr-threads" aria-hidden="true"></svg><p class="cr-note" aria-live="polite"></p><div class="cr-row"><button type="button" class="cr-check" data-k="check"></button></div><span class="cr-tag" aria-hidden="true"></span>';
    this._q = function (s) { return wrap.querySelector(s); };
    this._q('.cr-check').addEventListener('click', function () { self._check(); });
    this._q('.cr-meadow').addEventListener('click', function (ev) { if (self._eat()) return; if (ev.target.closest('.cr-thing')) return; self._toMeadow(); });
    wrap.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && self.st.sel !== null) { ev.preventDefault(); self._toMeadow(); }
    });
    wrap.addEventListener('pointerdown', function (ev) { self._down(ev); });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx || this._wrap).focus(); }
  },
  _paint_: function () {
    if (!this._wrap) return;
    var C = CousinRainCore, st = this.st, r = st.r, L = this._L = C.layout(this._width());
    this._wrap.className = 'cr-wrap is-' + L.mode + (L.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + r.level + ' is-nb' + r.nb + (st.sel !== null ? ' is-holding' : '') + (st.rain === 'live' ? '' : ' is-dry');
    this._wrap.style.setProperty('--cr-pic', L.pic + 'px');
    this._wrap.style.setProperty('--cr-cloud', L.cloud + 'px');
    this._wrap.style.setProperty('--cr-rosy', String(1 + this._rosy * 0.12));
    this._paintSky();
    this._paintRules();
    this._paintMeadow();
    this._paintBaskets();
    var h = C.hint(st), v = this._view, msg = v.msg || (h ? this._t(h) : '');
    var note = this._q('.cr-note'); note.textContent = msg;
    note.className = 'cr-note' + (st.done ? ' is-ok' : h ? ' is-hint' : '');
    var chk = this._q('.cr-check'); chk.textContent = this._t('check'); chk.disabled = !!this._busy || st.done;
    var self = this;
    if (typeof requestAnimationFrame !== 'undefined') requestAnimationFrame(function () { self._paintThreads(); }); else this._paintThreads();
  },
  /* the sky: Mim (the library's smiling cloud) beside the hill where her basket tipped */
  _paintSky: function () {
    var C = CousinRainCore, st = this.st, L = this._L, sky = this._q('.cr-sky'); sky.innerHTML = '';
    sky.style.display = st.r.level === 'l3' ? 'none' : '';   /* Two clouds: the rule clouds are the sky */
    var mim = this.api.el('span', 'cr-mim' + (st.done ? ' is-glad' : '')); mim.setAttribute('role', 'img'); mim.setAttribute('aria-label', this._t('ariaMim'));
    var im = this._picPath(C.DATA.MIM, L.mim); if (im) { im.alt = ''; mim.appendChild(im); }
    sky.appendChild(mim);
    var hill = this.api.el('span', 'cr-hill' + (this._view.spill ? ' is-tip' : '') + (st.done ? ' is-full' : ''));
    hill.setAttribute('aria-hidden', 'true');
    hill.innerHTML = '<svg viewBox="0 0 160 80"><path d="M2 78 Q80 6 158 78 Z" fill="#8CC56B" stroke="#4E7A35" stroke-width="3"/><g class="cr-hb"><path d="M54 30 L106 30 L98 62 L62 62 Z" fill="#D9A15B" stroke="#7A5226" stroke-width="2.5"/><path d="M58 40 H102 M60 50 H100 M70 30 V62 M80 30 V62 M90 30 V62" stroke="#A8743A" stroke-width="2"/><path d="M60 31 Q80 6 100 31" fill="none" stroke="#7A5226" stroke-width="3"/><g class="cr-hbfill"><circle cx="70" cy="28" r="6" fill="#F2784B"/><circle cx="82" cy="25" r="6" fill="#2FA56A"/><circle cx="93" cy="28" r="6" fill="#FFD86B"/></g></g></svg>';
    sky.appendChild(hill);
  },
  /* Two clouds: each cloud shows its rule as two pictures hanging under it */
  _paintRules: function () {
    var st = this.st, r = st.r, L = this._L, box = this._q('.cr-rules'), self = this; box.innerHTML = '';
    if (r.level !== 'l3') { box.style.display = 'none'; return; }
    box.style.display = '';
    r.rule.forEach(function (rule, k) {
      var half = self.api.el('div', 'cr-rule is-' + (k ? 'b' : 'a'));
      half.setAttribute('role', 'img');
      half.setAttribute('aria-label', self._t(k ? 'ariaRuleB' : 'ariaRuleA', { list: rule.pics.map(function (p) { return self._name(p); }).join(', ') }));
      var cl = self.api.el('span', 'cr-rcloud'), im = self._picPath(CousinRainCore.DATA.MIM, L.cloud); if (im) { im.alt = ''; cl.appendChild(im); }
      half.appendChild(cl);
      var pics = self.api.el('span', 'cr-rpics');
      rule.pics.forEach(function (p) { var hang = self.api.el('span', 'cr-hang'), pi = self._pic(p, L.pic); if (pi) { pi.alt = ''; hang.appendChild(pi); } pics.appendChild(hang); });
      half.appendChild(pics);
      box.appendChild(half);
    });
  },
  /* the grass: the spilled things keep their spots (an empty spot stays a spot, so nothing jumps under the finger) */
  _paintMeadow: function () {
    var C = CousinRainCore, st = this.st, r = st.r, L = this._L, self = this, box = this._q('.cr-meadow'), v = this._view;
    box.innerHTML = ''; box.setAttribute('role', 'group'); box.setAttribute('aria-label', this._t('ariaMeadow'));
    box.className = 'cr-meadow' + (st.sel !== null && st.place[st.sel] !== null ? ' is-target' : '');
    var rows = C.rowsFor(st.meadow.length), at = 0, wobble = st.last && st.last.reason === 'meadow';
    var shown = 0;
    rows.forEach(function (n) {
      var left = 0; for (var c0 = 0; c0 < n; c0++) if (st.place[st.meadow[at + c0]] === null) left++;
      if (!left) { at += n; return; }   /* a row whose things have all gone collapses */
      shown++;
      var row = self.api.el('div', 'cr-mrow');
      for (var c = 0; c < n; c++, at++) {
        var i = st.meadow[at];
        if (st.place[i] !== null) { row.appendChild(self.api.el('span', 'cr-spot')); continue; }
        var b = self.api.el('button', 'cr-thing' + (st.sel === i ? ' is-sel' : '') + (v.spill ? ' is-spill' : '') + (wobble ? ' is-bob' : ''));
        b.type = 'button'; b.setAttribute('data-k', 'thing-' + i); b.setAttribute('data-i', String(i));
        if (v.spill) b.style.animationDelay = (self.FAST ? 0 : at * 60) + 'ms';
        b.setAttribute('aria-label', self._name(r.things[i].key) + (st.sel === i ? ', ' + self._t('sPicked') : ''));
        b.setAttribute('aria-pressed', st.sel === i ? 'true' : 'false');
        b.disabled = st.done;
        var im = self._pic(r.things[i].key, L.pic); if (im) { im.alt = ''; b.appendChild(im); }
        b.addEventListener('click', (function (k) { return function (ev) { ev.stopPropagation(); if (self._eat()) return; self._tapThing(k); }; })(i));
        row.appendChild(b);
      }
      box.appendChild(row);
    });
    if (!shown) box.className += ' is-empty';
  },
  /* the baskets: no labels; a little cloud over each (l1/l2); two rain curtains over the three (l3) */
  _paintBaskets: function () {
    var C = CousinRainCore, st = this.st, r = st.r, L = this._L, self = this, box = this._q('.cr-baskets'), v = this._view;
    box.innerHTML = '';
    var cz = C.cousins(st), sp = C.split(st), bd = C.badges(st), th = C.threads(st), targets = {}, misplaced = {};
    th.forEach(function (t) { targets[t.to] = 1; misplaced[t.thing] = 1; });
    var cols = r.level === 'l3' ? 3 : L.mode === 'wide' ? r.nb : Math.min(r.nb, 2);
    box.style.setProperty('--cr-cols', String(cols));
    if (r.level === 'l3') {
      var ca = this.api.el('span', 'cr-curtain is-a'), cb = this.api.el('span', 'cr-curtain is-b');
      if (bd) { ca.className += ' is-raining'; cb.className += ' is-raining'; }
      box.appendChild(ca); box.appendChild(cb);
    }
    var fresh = {};
    for (var b = 0; b < r.nb; b++) {
      var col = this.api.el('div', 'cr-bcol' + (r.level === 'l2' && b === 1 ? ' is-little' : '') + (targets[b] ? ' is-target' : ''));
      col.setAttribute('data-b', String(b));
      /* the little cloud */
      if (r.level !== 'l3') {
        var split = sp[b], pure = cz[b] !== undefined, raining = pure && self._prevCousins[b] !== cz[b] && !st.done;
        if (raining) fresh[b] = cz[b];
        var cloud = this.api.el('span', 'cr-bcloud' + (split ? ' is-split' : pure ? ' is-full' : '') + (raining ? ' is-rain' : '') + (st.done ? ' is-lift' : ''));
        cloud.setAttribute('aria-hidden', 'true');
        var nClouds = split ? split.length : 1;
        for (var q = 0; q < nClouds; q++) { var ci = self._picPath(C.DATA.MIM, L.cloud); if (ci) { ci.alt = ''; cloud.appendChild(ci); } }
        if (raining || split) { var drops = this.api.el('span', 'cr-drops'); for (var d = 0; d < 12; d++) { var dr = this.api.el('i', 'cr-drop'); dr.style.left = (6 + (d * 37) % 88) + '%'; dr.style.animationDelay = (self.FAST ? 0 : (d % 6) * 70) + 'ms'; drops.appendChild(dr); } cloud.appendChild(drops); }
        col.appendChild(cloud);
      }
      /* the basket */
      var bk = this.api.el('button', 'cr-basket' + (st.sel !== null && st.place[st.sel] !== b ? ' is-open' : ''));
      bk.type = 'button'; bk.setAttribute('data-k', 'basket-' + b); bk.setAttribute('data-b', String(b));
      var here = C.inBasket(st, b);
      bk.setAttribute('aria-label', this._t('ariaBasket', { b: this._basketName(b), list: here.length ? here.map(function (i) { return self._name(r.things[i].key); }).join(', ') : this._t('sEmpty') }));
      bk.disabled = st.done;
      var heap = this.api.el('span', 'cr-heap');
      var addThing = function (parent, i) {
        var it = self.api.el('span', 'cr-item' + (st.sel === i ? ' is-sel' : '') + (misplaced[i] ? ' is-misplaced' : '') + (bd && st.place[i] !== r.things[i].want ? ' is-off' : ''));
        it.setAttribute('data-i', String(i));
        var im = self._pic(r.things[i].key, L.pic); if (im) { im.alt = ''; it.appendChild(im); }
        if (bd) { var bs = self.api.el('span', 'cr-badges'); if (bd[i].a) bs.appendChild(self.api.el('i', 'cr-badge is-a')); if (bd[i].b) bs.appendChild(self.api.el('i', 'cr-badge is-b')); it.appendChild(bs); }
        parent.appendChild(it);
      };
      var addCousin = function (parent, key, fall) {
        var it = self.api.el('span', 'cr-item cr-cousin' + (fall ? ' is-fall' : '')); it.setAttribute('data-cousin', key);
        var im = self._pic(key, L.pic); if (im) { im.alt = ''; it.appendChild(im); }
        parent.appendChild(it);
      };
      if (sp[b]) {
        sp[b].forEach(function (fam, f) {
          var g = self.api.el('span', 'cr-fam is-f' + (f % 2));
          fam.things.forEach(function (i) { addThing(g, i); });
          addCousin(g, fam.cousin, true);
          heap.appendChild(g);
        });
      } else {
        here.forEach(function (i) { addThing(heap, i); });
        if (cz[b] !== undefined) addCousin(heap, cz[b], !!fresh[b] || (st.done && self._prevCousins[b] !== cz[b]));
      }
      bk.appendChild(heap);
      bk.addEventListener('click', (function (k) { return function (ev) { if (self._eat()) return; self._tapBasket(k, ev); }; })(b));
      col.appendChild(bk);
      box.appendChild(col);
    }
    var ann = Object.keys(fresh);
    if (ann.length && !st.done) { var bb = +ann[0]; this.api.announce(this._t('ariaRain', { b: this._basketName(bb), c: this._name(fresh[bb]) })); this.api.sound(1180); }
    this._prevCousins = cz;
  },
  /* miss 2: a dotted thread from each misplaced thing to the basket its family is in */
  _paintThreads: function () {
    var svg = this._q && this._q('.cr-threads'); if (!svg) return;
    var C = CousinRainCore, th = C.threads(this.st), wrap = this._wrap;
    if (!th.length || !wrap.isConnected) { svg.innerHTML = ''; svg.style.display = 'none'; return; }
    var W = wrap.getBoundingClientRect(), parts = [];
    svg.style.display = ''; svg.setAttribute('viewBox', '0 0 ' + Math.round(W.width) + ' ' + Math.round(W.height));
    th.forEach(function (t) {
      var a = wrap.querySelector('.cr-item[data-i="' + t.thing + '"]'), b = wrap.querySelector('.cr-basket[data-b="' + t.to + '"]');
      if (!a || !b) return;
      var A = a.getBoundingClientRect(), B = b.getBoundingClientRect();
      var x1 = A.left + A.width / 2 - W.left, y1 = A.top + A.height / 2 - W.top, x2 = B.left + B.width / 2 - W.left, y2 = B.top + B.height * 0.35 - W.top;
      var mx = (x1 + x2) / 2, my = Math.min(y1, y2) - 40;
      parts.push('<path d="M' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' Q' + mx.toFixed(1) + ' ' + my.toFixed(1) + ' ' + x2.toFixed(1) + ' ' + y2.toFixed(1) + '" class="cr-thread"/>');
    });
    svg.innerHTML = parts.join('');
  },

  /* ---------------- the hand ---------------- */
  _eat: function () { if (this._noClick) { this._noClick = false; return true; } return false; },
  _tapThing: function (i) {
    if (this._busy || this.st.done) return;
    CousinRainCore.select(this.st, i); this._view = {}; this.api.sound(this.st.sel !== null ? 700 : 420); this._paint();
  },
  _tapBasket: function (b, ev) {
    if (this._busy || this.st.done) return;
    var C = CousinRainCore, st = this.st;
    if (st.sel !== null) { this._drop(st.sel, b); return; }
    var hit = ev && ev.target && ev.target.closest ? ev.target.closest('[data-i]') : null, here = C.inBasket(st, b);
    var i = hit ? +hit.getAttribute('data-i') : (ev && ev.detail === 0 && here.length ? here[here.length - 1] : -1);   /* a keyboard press lifts the last thing put in */
    if (i < 0) return;
    C.select(st, i); this._view = {}; this.api.sound(700); this._paint();
  },
  _drop: function (i, b) {
    var C = CousinRainCore;
    if (!C.placeAt(this.st, i, b)) return;
    this._view = {}; this.api.sound(b === null ? 380 : 520); this._paint();
  },
  _toMeadow: function () { var st = this.st; if (st.sel === null || st.done) return; if (st.place[st.sel] === null) { st.sel = null; this._paint(); return; } this._drop(st.sel, null); },
  /* drag: a press that moves lifts the thing and it follows the finger; a press that stays shows its name */
  _down: function (ev) {
    if (this.st.done || this._busy || ev.button > 0) return;
    var el = ev.target.closest('[data-i]'); if (!el || !this._wrap.contains(el)) return;
    var self = this, i = +el.getAttribute('data-i');
    this._drag = { i: i, x: ev.clientX, y: ev.clientY, el: el, moved: false, ghost: null, id: ev.pointerId };
    this._drag.long = setTimeout(function () { if (self._drag && !self._drag.moved) self._showName(i, el); }, this.LONG_MS);
    var move = function (e) { self._move(e); }, up = function (e) { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); document.removeEventListener('pointercancel', up); self._up(e); };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  _move: function (ev) {
    var d = this._drag; if (!d) return;
    if (!d.moved && Math.abs(ev.clientX - d.x) + Math.abs(ev.clientY - d.y) < 10) return;
    if (!d.moved) {
      d.moved = true; clearTimeout(d.long);
      var im = d.el.querySelector('img'); if (!im) return;
      var g = im.cloneNode(true); g.className = 'cr-ghost'; g.style.width = im.style.width; g.style.height = im.style.height;
      document.body.appendChild(g); d.ghost = g; d.w = parseFloat(im.style.width) || 64;
      d.el.classList.add('is-dragging'); this._wrap.classList.add('is-holding');
    }
    if (d.ghost) { d.ghost.style.left = (ev.clientX - d.w / 2) + 'px'; d.ghost.style.top = (ev.clientY - d.w / 2) + 'px'; }
    if (ev.cancelable) ev.preventDefault();
  },
  _up: function (ev) {
    var d = this._drag; if (!d) return;
    clearTimeout(d.long);
    if (d.moved) {
      this._noClick = true; var self = this; setTimeout(function () { self._noClick = false; }, 0);
      if (d.ghost) d.ghost.style.display = 'none';
      var under = document.elementFromPoint(ev.clientX, ev.clientY), bk = under && under.closest ? under.closest('.cr-bcol') : null, mw = under && under.closest ? under.closest('.cr-meadow') : null;
      this._endDrag();
      if (bk && this._wrap.contains(bk)) this._drop(d.i, +bk.getAttribute('data-b'));
      else if (mw && this._wrap.contains(mw)) this._drop(d.i, null);
      else this._paint();
      return;
    }
    if (d.named) { this._noClick = true; var s2 = this; setTimeout(function () { s2._noClick = false; }, 0); }
    this._drag = null;
  },
  _endDrag: function () { var d = this._drag; if (!d) return; clearTimeout(d.long); if (d.ghost && d.ghost.parentNode) d.ghost.parentNode.removeChild(d.ghost); this._drag = null; },
  /* a long press: the thing's word under it for a moment (and spoken where a voice works) — the word is vocabulary */
  _showName: function (i, el) {
    var key = this.st.r.things[i].key, word = this._name(key), tag = this._q('.cr-tag'), W = this._wrap.getBoundingClientRect(), R = el.getBoundingClientRect();
    if (this._drag) this._drag.named = true;
    tag.textContent = word; tag.style.left = (R.left + R.width / 2 - W.left) + 'px'; tag.style.top = (R.bottom - W.top + 2) + 'px'; tag.classList.add('is-on');
    if (typeof LCSAudio !== 'undefined' && LCSAudio.speak) { try { LCSAudio.speak({ type: 'word', text: word, lang: this.api.lang, rate: 0.9 }); } catch (e) {} }
    this._later(function () { tag.classList.remove('is-on'); }, 1500);
  },
  _check: function () {
    if (this._busy || this.st.done) return;
    var C = CousinRainCore, st = this.st, res = C.check(st), self = this;
    this._view = {};
    if (!res.ok) {
      this.api.sound(res.reason === 'meadow' ? 460 : 220); this._paint();
      this.api.announce(this._q('.cr-note').textContent || ''); return;
    }
    var msg = C.success(this._loc(), st);
    if (this._pa) this._pa.msg = msg; this._view = { msg: msg };
    this._rosy = (this._rosy + 1) % 8;
    this.api.sound(1046); this._later(function () { self.api.sound(1318); }, this._ms(140));
    this._paint(); this.api.announce(msg);
    if (typeof LCSAudio !== 'undefined' && LCSAudio.speak) { try { LCSAudio.speak({ type: 'word', text: msg, lang: this.api.lang, rate: 0.9 }); } catch (e) {} }
    this._later(function () { var n = self._q('.cr-note'); if (n && n.scrollIntoView) n.scrollIntoView({ block: 'nearest' }); }, 0);   /* a long line on a small phone: bring it into view */
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);   /* time to read (or hear) the whole line */
  }
};

var crCssDone = false;
function injectRainCSS() {
  if (crCssDone || typeof document === 'undefined') return;
  crCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.cr-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;}'
  + '.cr-wrap:focus{outline:none;}'
  + '.cr-pic{display:block;object-fit:contain;pointer-events:none;}'
  /* the sky */
  + '.cr-sky{display:flex;align-items:flex-end;justify-content:center;gap:18px;}'
  + '.cr-mim img{filter:saturate(var(--cr-rosy,1));transition:filter .6s;} .cr-mim{animation:crFloat 4s ease-in-out infinite;} @keyframes crFloat{50%{transform:translateY(-5px);}}'
  + '.cr-mim.is-glad{animation:crGlad .5s ease-in-out 3;} @keyframes crGlad{50%{transform:translateY(-10px) scale(1.05);}}'
  + '.cr-hill{display:block;width:150px;height:76px;} .cr-hill svg{width:100%;height:100%;display:block;overflow:visible;}'
  + '.cr-hb{transform-origin:80px 62px;transition:transform .4s ease-out;} .cr-hill.is-tip .cr-hb{animation:crTip 1.2s ease-out;} @keyframes crTip{0%{transform:rotate(0);}25%{transform:rotate(-8deg);}55%{transform:rotate(38deg);}100%{transform:rotate(0);}}'
  + '.cr-hbfill{opacity:0;transition:opacity .5s .3s;} .cr-hill.is-full .cr-hbfill{opacity:1;}'
  /* two clouds and their rules */
  + '.cr-rules{display:grid;grid-template-columns:1fr 1fr;gap:12px;width:100%;max-width:700px;}'
  + '.cr-rule{display:flex;align-items:center;justify-content:center;gap:8px;padding:6px 8px;border-radius:18px;}'
  + '.cr-rule.is-a{background:#E2F3F0;box-shadow:inset 0 0 0 3px #1A9A8C;} .cr-rule.is-b{background:#FDE9E1;box-shadow:inset 0 0 0 3px #F2784B;}'
  + '.cr-rpics{display:flex;gap:8px;} .cr-hang{position:relative;display:block;}'
  /* the grass */
  + '.cr-meadow{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;max-width:700px;padding:10px 8px;box-sizing:border-box;border-radius:24px;background:radial-gradient(ellipse at 50% 120%,#CFE8B5 0,#E4F2D4 70%);box-shadow:inset 0 0 0 2px #B6D69A;}'
  + '.cr-meadow.is-empty{min-height:28px;padding:0;} .cr-wrap.is-narrow .cr-meadow.is-empty{min-height:22px;padding:0;}'
  + '.cr-meadow.is-target{box-shadow:inset 0 0 0 3px #2FA56A;cursor:pointer;}'
  + '.cr-mrow{display:flex;justify-content:center;gap:12px;}'
  + '.cr-thing,.cr-spot{display:flex;align-items:center;justify-content:center;width:calc(var(--cr-pic) + 14px);height:calc(var(--cr-pic) + 14px);padding:0;border:0;border-radius:18px;background:transparent;}'
  + '.cr-thing{position:relative;cursor:grab;touch-action:none;transition:transform .12s;} .cr-thing::after{content:"";position:absolute;left:18%;right:18%;bottom:2px;height:8px;border-radius:50%;background:rgba(78,122,53,.22);z-index:-1;}'
  + '.cr-thing.is-sel{transform:translateY(-8px) scale(1.12);background:rgba(255,255,255,.7);box-shadow:0 0 0 3px #146B5E,0 10px 14px rgba(0,0,0,.18);}'
  + '.cr-thing.is-spill{animation:crSpill .7s cubic-bezier(.3,1.4,.5,1) both;} @keyframes crSpill{0%{transform:translate(0,-140px);opacity:0;}60%{opacity:1;}85%{transform:translate(0,6px);}100%{transform:none;}}'
  + '.cr-thing.is-bob{animation:crBob .5s ease-in-out 2;} @keyframes crBob{50%{transform:translateY(-8px);}}'
  + '.cr-thing.is-dragging,.cr-item.is-dragging{opacity:.3;}'
  + '.cr-ghost{position:fixed;z-index:9999;pointer-events:none;transform:scale(1.15);filter:drop-shadow(0 10px 8px rgba(0,0,0,.25));}'
  /* the baskets */
  + '.cr-baskets{position:relative;display:grid;grid-template-columns:repeat(var(--cr-cols),minmax(0,1fr));column-gap:12px;row-gap:8px;width:100%;max-width:700px;}'
  + '.cr-bcol{display:flex;flex-direction:column;align-items:center;min-width:0;}'
  + '.cr-bcloud{position:relative;display:flex;justify-content:center;height:calc(var(--cr-cloud) * .62);margin-bottom:-6px;opacity:.38;transition:opacity .3s,transform .3s;z-index:2;pointer-events:none;}'
  + '.cr-bcloud img{width:var(--cr-cloud);height:var(--cr-cloud);margin-top:calc(var(--cr-cloud) * -.24);}'
  + '.cr-bcloud.is-full,.cr-bcloud.is-split{opacity:1;} .cr-bcloud.is-split img + img{margin-left:calc(var(--cr-cloud) * -.28);} .cr-bcloud.is-split img:first-child{transform:rotate(-8deg);} .cr-bcloud.is-split img + img{transform:rotate(8deg);}'
  + '.cr-bcloud.is-rain{animation:crPuff .5s ease-out;} @keyframes crPuff{0%{transform:scale(1);}50%{transform:scale(1.12);}100%{transform:scale(1);}}'
  + '.cr-bcloud.is-lift{transform:translateY(-6px);}'
  + '.cr-wrap.is-dry .cr-bcloud:not(.is-split):not(.is-lift){visibility:hidden;}'
  + '.cr-drops{position:absolute;left:10%;right:10%;top:55%;height:calc(var(--cr-pic) * .9);pointer-events:none;}'
  + '.cr-drop{position:absolute;top:0;width:6px;height:11px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:#5AB4E6;opacity:0;animation:crFall .6s ease-in forwards;} @keyframes crFall{0%{transform:translateY(0);opacity:0;}20%{opacity:1;}100%{transform:translateY(calc(var(--cr-pic) * .8));opacity:0;}}'
  + '.cr-basket{position:relative;display:flex;align-items:flex-end;justify-content:center;width:100%;min-height:calc(var(--cr-pic) + 30px);padding:6px 6px 20px;border:0;border-radius:16px 16px 34px 34px;box-sizing:border-box;cursor:pointer;'
    + 'background:repeating-linear-gradient(90deg,rgba(122,82,38,.18) 0 3px,transparent 3px 16px),repeating-linear-gradient(0deg,rgba(122,82,38,.16) 0 3px,transparent 3px 14px),#E2B06C;box-shadow:inset 0 0 0 3px #A8743A,0 5px 0 #8A5E2C;}'
  + '.cr-basket::after{content:"";position:absolute;left:10px;right:10px;bottom:6px;height:8px;border-radius:4px;background:#A8743A;}'
  + '.cr-basket.is-open{box-shadow:inset 0 0 0 3px #A8743A,0 0 0 4px #9CC9BE,0 5px 0 #8A5E2C;}'
  + '.cr-basket:disabled{cursor:default;color:inherit;opacity:1;}'
  + '.cr-bcol.is-little .cr-basket{width:62%;min-height:calc(var(--cr-pic) + 22px);transform:rotate(-4deg) translateY(10px);border-radius:14px 14px 26px 26px;}'
  + '.cr-bcol.is-target .cr-basket{box-shadow:inset 0 0 0 3px #A8743A,0 0 0 4px #2FA56A,0 0 18px rgba(47,165,106,.6),0 5px 0 #8A5E2C;outline:3px dashed #2FA56A;outline-offset:6px;}'
  + '.cr-heap{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:center;row-gap:4px;max-width:100%;padding:0 calc(var(--cr-pic) * .18);box-sizing:border-box;}'
  + '.cr-item{position:relative;display:block;margin:0 calc(var(--cr-pic) * -.18);}'
  + '.cr-item.is-sel{transform:translateY(-10px) scale(1.1);filter:drop-shadow(0 0 4px #146B5E);z-index:3;}'
  + '.cr-cousin img{filter:drop-shadow(0 0 5px #FFD86B) drop-shadow(0 0 2px #FFD86B);} .cr-cousin.is-fall{animation:crCousin .55s .35s cubic-bezier(.3,1.5,.5,1) both;} @keyframes crCousin{0%{transform:translateY(-90px);opacity:0;}100%{transform:none;opacity:1;}}'
  + '.cr-fam{display:flex;align-items:flex-end;margin:0 4px;padding:0 calc(var(--cr-pic) * .18) 4px;border-bottom:5px solid #1A9A8C;border-radius:0 0 8px 8px;} .cr-fam.is-f1{border-bottom-color:#F2784B;}'
  + '.cr-item.is-misplaced img{filter:drop-shadow(0 0 5px #F2784B) drop-shadow(0 0 3px #F2784B);} .cr-item.is-off img{filter:drop-shadow(0 0 5px #E0A030);}'
  + '.cr-badges{position:absolute;right:2px;top:0;display:flex;gap:2px;} .cr-badge{display:block;width:16px;height:20px;border-radius:50% 50% 50% 50%/62% 62% 38% 38%;box-shadow:0 0 0 2px #FFFFFF;animation:crBadge .4s ease-out both;} .cr-badge.is-a{background:#1A9A8C;} .cr-badge.is-b{background:#F2784B;} @keyframes crBadge{from{transform:translateY(-30px);opacity:0;}}'
  + '.cr-curtain{grid-row:1;height:10px;border-radius:5px;margin:0 6px;background:repeating-linear-gradient(90deg,currentColor 0 8px,transparent 8px 14px);opacity:.75;} .cr-curtain.is-a{grid-column:1 / 3;color:#1A9A8C;} .cr-curtain.is-b{grid-row:2;grid-column:2 / 4;color:#F2784B;}'
  + '.cr-wrap.is-l3 .cr-bcol{grid-row:3;} .cr-curtain.is-raining{animation:crCurtain .6s ease-in-out 2;} @keyframes crCurtain{50%{transform:translateY(4px);opacity:1;}}'
  + '.cr-threads{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;overflow:visible;z-index:5;} .cr-thread{fill:none;stroke:#2FA56A;stroke-width:4;stroke-dasharray:2 9;stroke-linecap:round;}'
  + '.cr-tag{position:absolute;z-index:6;transform:translateX(-50%);padding:3px 10px;border-radius:10px;background:#146B5E;color:#FFFFFF;font-family:' + B + ';font-weight:800;font-size:17px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .2s;} .cr-tag.is-on{opacity:1;}'
  + '.cr-thing:focus-visible,.cr-basket:focus-visible,.cr-check:focus-visible{outline:3px solid #146B5E;outline-offset:3px;}'
  + '.cr-row{display:flex;justify-content:center;}'
  + '.cr-check{min-height:52px;min-width:120px;padding:0 26px;border:0;border-radius:26px;background:#146B5E;color:#FFFFFF;font-family:' + B + ';font-weight:800;font-size:20px;box-shadow:0 4px 0 #0C4A41;cursor:pointer;} .cr-check:disabled{opacity:.5;cursor:default;}'
  + '.cr-note{min-height:1.4em;margin:0;padding:0 8px;text-align:center;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.35;color:#2A2A35;max-width:640px;} .cr-note:empty{min-height:0;display:none;} .cr-note.is-hint{color:#B5461F;} .cr-note.is-ok{color:#146B5E;}'
  + '.cr-wrap.is-done .cr-row,.cr-wrap.is-done .cr-meadow.is-empty{display:none;}'
  + '.cr-wrap.is-done .cr-heap{animation:crHop .45s ease-in-out 2;} @keyframes crHop{50%{transform:translateY(-8px);}}'
  /* phones */
  + '.cr-wrap.is-narrow{gap:8px;} .cr-wrap.is-narrow .cr-hill{width:96px;height:50px;} .cr-wrap.is-narrow .cr-sky{gap:12px;}'
  + '.cr-wrap.is-narrow .cr-mrow{gap:6px;} .cr-wrap.is-narrow .cr-meadow{padding:6px 4px;gap:4px;border-radius:18px;} .cr-wrap.is-narrow .cr-thing,.cr-wrap.is-narrow .cr-spot{width:calc(var(--cr-pic) + 8px);height:calc(var(--cr-pic) + 8px);}'
  + '.cr-wrap.is-narrow .cr-baskets{column-gap:8px;} .cr-wrap.is-narrow .cr-bcloud{margin-bottom:-18px;} .cr-wrap.is-narrow .cr-basket{min-height:calc(var(--cr-pic) + 24px);padding:4px 4px 16px;border-radius:12px 12px 26px 26px;} .cr-wrap.is-narrow .cr-basket::after{bottom:5px;height:6px;left:8px;right:8px;}'
  + '.cr-wrap.is-narrow .cr-rules{grid-template-columns:1fr 1fr;gap:8px;} .cr-wrap.is-narrow .cr-rule{padding:6px 4px;border-radius:26px;} .cr-wrap.is-narrow .cr-rcloud{display:none;} .cr-wrap.is-narrow .cr-rpics{gap:4px;}'
  + '.cr-wrap.is-narrow .cr-note{font-size:17px;} .cr-wrap.is-narrow .cr-check{font-size:18px;min-width:104px;}'
  + '.cr-wrap.is-tiny .cr-sky{display:none;} .cr-wrap.is-tiny{gap:6px;} .cr-wrap.is-tiny .cr-meadow{padding:4px 2px;gap:2px;} .cr-wrap.is-tiny .cr-baskets{row-gap:4px;} .cr-wrap.is-tiny .cr-curtain{height:8px;} .cr-wrap.is-tiny .cr-rule{padding:4px 2px;} .cr-wrap.is-tiny .cr-basket{min-height:calc(var(--cr-pic) + 18px);}'
  + '.cr-wrap.is-fast *,.cr-wrap.is-fast *::after{animation:none !important;transition:none !important;}'
  + '@media print{.cr-row,.cr-note,.cr-threads{display:none;}}'
  + '@media (prefers-reduced-motion: reduce){.cr-wrap *{animation-duration:.2s !important;transition-duration:.05s !important;}}';
  var s = document.createElement('style'); s.id = 'cr-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.CousinRainActivity = CousinRainActivity;
