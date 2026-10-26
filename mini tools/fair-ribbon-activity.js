/* =====================================================================
   fair-ribbon-activity.js — ACTIVITY #91 of the one-by-one rebuild:
   "The Sharing Jar — Make It Fair" → THE FAIR RIBBON (1.OA.D.8, 11 locales).
   Design sheet: docs/activities-rebuild/designs/091-sharing-jar.md
   ---------------------------------------------------------------------
   THE INVENTION: a gold ribbon is tied across both jars at the fair
   height. The child says a number first (taps a tile), then Check makes
   exactly that many beads move: the right number stops the beads on the
   ribbon and the two friends lean in; too few leaves a gap under the
   ribbon (or beads still above it); too many pushes past it — and now
   Pim has less, so Pim goes quiet. In a start round the child's number
   tints the start beads, which must meet the glowing new ones exactly.
   ACTIVITY LAYER ONLY: the model is fair-ribbon-core.js; Pim (a hedgehog)
   and Bo (a mouse) are library pictures via lcs-pictures.js; lcs-shell.js
   untouched (the shell's Check is hidden and pressed by this activity when
   the jars are fair). Test seams: window.FairRibbonActivity.st / ._pool /
   ._order / ._ensurePool / .FAST.
   ===================================================================== */
'use strict';

var FairRibbonActivity = {
  id: 'fair-ribbon',
  apparatusClasses: ['fr-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble: {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:       {en:'The Sharing Jar',de:'Das faire Perlenglas',nl:'De eerlijke kralenpot',da:'Den retfærdige perlekrukke',sv:'Den rättvisa pärlburken',no:'Den rettferdige perlekrukka',es:'El frasco justo',it:'Il barattolo giusto',pt:'O pote justo',fr:'Le pot de perles juste',fi:'Reilu helmipurkki'},
    pMore:       {en:'How many more beads does Bo need?',de:'Wie viele Perlen braucht Bo noch?',nl:'Hoeveel kralen heeft Bo nog nodig?',da:'Hvor mange perler mere skal Bo have?',sv:'Hur många pärlor till behöver Bo?',no:'Hvor mange perler til trenger Bo?',es:'¿Cuántas cuentas más necesita Bo?',it:'Quante perline in più servono a Bo?',pt:'De quantas contas a mais Bo precisa?',fr:'Combien de perles de plus faut-il à Bo ?',fi:'Montako helmeä lisää Bo tarvitsee?'},
    pHmm:        {en:'How many more beads does Pim have than Bo?',de:'Wie viele Perlen hat Pim mehr als Bo?',nl:'Hoeveel kralen heeft Pim meer dan Bo?',da:'Hvor mange flere perler har Pim end Bo?',sv:'Hur många fler pärlor har Pim än Bo?',no:'Hvor mange flere perler har Pim enn Bo?',es:'¿Cuántas cuentas más tiene Pim que Bo?',it:'Quante perline ha Pim più di Bo?',pt:'Quantas contas Pim tem a mais que Bo?',fr:'Combien de perles Pim a-t-il de plus que Bo ?',fi:'Montako helmeä enemmän Pimillä on kuin Bolla?'},
    pGive:       {en:'Pim took some of Bo’s beads. Bo had {s}. How many must Pim give back?',de:'Pim hat Bo Perlen weggenommen. Bo hatte {s}. Wie viele muss Pim zurückgeben?',nl:'Pim heeft kralen van Bo gepakt. Bo had er {s}. Hoeveel moet Pim teruggeven?',da:'Pim har taget nogle af Bos perler. Bo havde {s}. Hvor mange skal Pim give tilbage?',sv:'Pim har tagit några av Bos pärlor. Bo hade {s}. Hur många måste Pim ge tillbaka?',no:'Pim har tatt noen av Bos perler. Bo hadde {s}. Hvor mange må Pim gi tilbake?',es:'Pim tomó cuentas de Bo. Bo tenía {s}. ¿Cuántas tiene que devolver Pim?',it:'Pim ha preso delle perline di Bo. Bo ne aveva {s}. Quante ne deve restituire Pim?',pt:'Pim pegou contas do Bo. Bo tinha {s}. Quantas Pim precisa devolver?',fr:'Pim a pris des perles à Bo. Bo en avait {s}. Combien de perles Pim doit-il rendre ?',fi:'Pim otti Bon helmiä. Bolla oli {s}. Montako Pimin pitää antaa takaisin?'},
    pPut:        {en:'Pim took too many. How many should go back in the pile?',de:'Pim hat zu viele genommen. Wie viele müssen zurück auf den Haufen?',nl:'Pim heeft er te veel gepakt. Hoeveel moeten terug op de stapel?',da:'Pim tog for mange. Hvor mange skal tilbage i bunken?',sv:'Pim tog för många. Hur många ska tillbaka till högen?',no:'Pim tok for mange. Hvor mange skal tilbake i haugen?',es:'Pim tomó demasiadas. ¿Cuántas tienen que volver al montón?',it:'Pim ne ha prese troppe. Quante devono tornare nel mucchio?',pt:'Pim pegou demais. Quantas devem voltar para o monte?',fr:'Pim en a pris trop. Combien doivent retourner sur le tas ?',fi:'Pim otti liikaa. Montako pitää laittaa takaisin kasaan?'},
    pStart:      {en:'Bo just got {r} beads and now has {t}. How many did Bo have at the start?',de:'Bo hat gerade {r} Perlen bekommen und hat jetzt {t}. Wie viele hatte Bo am Anfang?',nl:'Bo kreeg net {r} kralen en heeft er nu {t}. Hoeveel had Bo in het begin?',da:'Bo har lige fået {r} perler og har nu {t}. Hvor mange havde Bo i starten?',sv:'Bo fick nyss {r} pärlor och har nu {t}. Hur många hade Bo från början?',no:'Bo fikk nettopp {r} perler og har nå {t}. Hvor mange hadde Bo til å begynne med?',es:'Bo acaba de recibir {r} cuentas y ahora tiene {t}. ¿Cuántas tenía Bo al principio?',it:'Bo ha appena ricevuto {r} perline e ora ne ha {t}. Quante ne aveva Bo all’inizio?',pt:'Bo acabou de ganhar {r} contas e agora tem {t}. Quantas Bo tinha no começo?',fr:'Bo vient de recevoir {r} perles et en a maintenant {t}. Combien de perles Bo avait-il au début ?',fi:'Bo sai juuri {r} helmeä, ja nyt hänellä on {t}. Montako helmeä Bolla oli alussa?'},
    hNone:       {en:'Say a number first — tap a tile.',de:'Sag zuerst eine Zahl – tipp auf ein Kärtchen.',nl:'Zeg eerst een getal — tik op een kaartje.',da:'Sig først et tal – tryk på en brik.',sv:'Säg ett tal först – tryck på en bricka.',no:'Si et tall først – trykk på en brikke.',es:'Primero di un número: toca una ficha.',it:'Prima di’ un numero: tocca una tessera.',pt:'Primeiro diga um número: toque numa ficha.',fr:'Dis d’abord un nombre : touche une carte.',fi:'Sano ensin luku – napauta laattaa.'},
    hGap:        {en:'Still a gap under the ribbon.',de:'Unter dem Band ist noch eine Lücke.',nl:'Onder het lint is nog een gat.',da:'Der er stadig et hul under båndet.',sv:'Det finns fortfarande en lucka under bandet.',no:'Det er fortsatt et hull under båndet.',es:'Todavía queda un hueco debajo del listón.',it:'C’è ancora un vuoto sotto il nastro.',pt:'Ainda tem um espaço embaixo da fita.',fr:'Il reste un trou sous le ruban.',fi:'Nauhan alla on vielä tyhjää.'},
    hAbove:      {en:'Pim’s jar is still above the ribbon.',de:'Pims Glas ist noch über dem Band.',nl:'De pot van Pim komt nog boven het lint uit.',da:'Pims krukke er stadig over båndet.',sv:'Pims burk är fortfarande över bandet.',no:'Pims krukke er fortsatt over båndet.',es:'El frasco de Pim todavía pasa del listón.',it:'Il barattolo di Pim supera ancora il nastro.',pt:'O pote do Pim ainda passa da fita.',fr:'Le pot de Pim dépasse encore le ruban.',fi:'Pimin purkki on yhä nauhan yläpuolella.'},
    hOver:       {en:'Too many — now Pim has less!',de:'Zu viele – jetzt hat Pim weniger!',nl:'Te veel — nu heeft Pim minder!',da:'For mange – nu har Pim færre!',sv:'För många – nu har Pim färre!',no:'For mange – nå har Pim færre!',es:'¡Demasiadas! Ahora Pim tiene menos.',it:'Troppe! Ora Pim ne ha di meno.',pt:'Demais! Agora o Pim tem menos.',fr:'Trop ! Maintenant, c’est Pim qui en a moins.',fi:'Liikaa – nyt Pimillä on vähemmän!'},
    hStart:      {en:'Look where the start beads meet the new ones.',de:'Schau, wo die Start-Perlen auf die neuen treffen.',nl:'Kijk waar de beginkralen de nieuwe raken.',da:'Se, hvor startperlerne møder de nye.',sv:'Titta var startpärlorna möter de nya.',no:'Se hvor startperlene møter de nye.',es:'Mira dónde se juntan las cuentas del principio con las nuevas.',it:'Guarda dove le perline dell’inizio incontrano quelle nuove.',pt:'Veja onde as contas do começo encontram as novas.',fr:'Regarde où les perles du début rejoignent les nouvelles.',fi:'Katso, missä alun helmet kohtaavat uudet.'},
    hCountDash:  {en:'Count the dashed beads — that’s how far off it was.',de:'Zähl die gestrichelten Perlen – so weit lag die Zahl daneben.',nl:'Tel de gestippelde kralen — zoveel zat je ernaast.',da:'Tæl de stiplede perler – det er forskellen.',sv:'Räkna de streckade pärlorna – det är skillnaden.',no:'Tell de stiplede perlene – det er forskjellen.',es:'Cuenta las cuentas punteadas: eso es lo que faltó o sobró.',it:'Conta le perline tratteggiate: è di tanto che hai sbagliato.',pt:'Conte as contas tracejadas: foi essa a diferença.',fr:'Compte les perles en pointillés : c’est l’écart.',fi:'Laske katkoviivahelmet – sen verran meni ohi.'},
    hCountGlow:  {en:'Count the numbered beads — that’s how far off it was.',de:'Zähl die nummerierten Perlen – so weit lag die Zahl daneben.',nl:'Tel de genummerde kralen — zoveel zat je ernaast.',da:'Tæl de nummererede perler – det er forskellen.',sv:'Räkna de numrerade pärlorna – det är skillnaden.',no:'Tell de nummererte perlene – det er forskjellen.',es:'Cuenta las cuentas con número: eso es lo que faltó o sobró.',it:'Conta le perline numerate: è di tanto che hai sbagliato.',pt:'Conte as contas numeradas: foi essa a diferença.',fr:'Compte les perles numérotées : c’est l’écart.',fi:'Laske numeroidut helmet – sen verran meni ohi.'},
    hTooFar:     {en:'Way too many — try a much smaller number.',de:'Viel zu viele – versuch eine viel kleinere Zahl.',nl:'Veel te veel — probeer een veel kleiner getal.',da:'Alt for mange – prøv et meget mindre tal.',sv:'Alldeles för många – prova ett mycket mindre tal.',no:'Altfor mange – prøv et mye mindre tall.',es:'¡Demasiadas! Prueba con un número mucho más pequeño.',it:'Davvero troppe! Prova un numero molto più piccolo.',pt:'Demais! Tente um número bem menor.',fr:'Beaucoup trop ! Essaie un nombre bien plus petit.',fi:'Aivan liikaa – kokeile paljon pienempää lukua.'},
    okMore:      {en:'{b} and {n} more make {a} — now it’s fair!',de:'{b} und {n} mehr sind {a} – jetzt ist es fair!',nl:'{b} en nog {n} is {a} — nu is het eerlijk!',da:'{b} og {n} mere giver {a} – nu er det retfærdigt!',sv:'{b} och {n} till blir {a} – nu är det rättvist!',no:'{b} og {n} til blir {a} – nå er det rettferdig!',es:'¡{b} y {n} más son {a}! Ahora es parejo.',it:'{b} e altre {n} fanno {a}: ora è giusto!',pt:'{b} e mais {n} dão {a}: agora está justo!',fr:'{b} et encore {n}, ça fait {a} : maintenant, c’est juste !',fi:'{b} ja {n} lisää on {a} – nyt on reilua!'},
    okHmm:       {en:'Pim had {n} more than Bo: {a} take away {b} is {n}.',de:'Pim hatte {n} mehr als Bo: {a} minus {b} ist {n}.',nl:'Pim had er {n} meer dan Bo: {a} min {b} is {n}.',da:'Pim havde {n} flere end Bo: {a} minus {b} er {n}.',sv:'Pim hade {n} fler än Bo: {a} minus {b} är {n}.',no:'Pim hadde {n} flere enn Bo: {a} minus {b} er {n}.',es:'Pim tenía {n} más que Bo: {a} menos {b} es {n}.',it:'Pim ne aveva {n} più di Bo: {a} meno {b} fa {n}.',pt:'Pim tinha {n} a mais que Bo: {a} menos {b} é {n}.',fr:'Pim en avait {n} de plus que Bo : {a} moins {b}, c’est {n}.',fi:'Pimillä oli {n} enemmän kuin Bolla: {a} miinus {b} on {n}.'},
    okGive:      {en:'Bo gets {n} back: {r} and {n} make {s} again.',de:'Bo bekommt {n} zurück: {r} und {n} sind wieder {s}.',nl:'Bo krijgt er {n} terug: {r} en {n} is weer {s}.',da:'Bo får {n} tilbage: {r} og {n} giver {s} igen.',sv:'Bo får tillbaka {n}: {r} och {n} blir {s} igen.',no:'Bo får {n} tilbake: {r} og {n} blir {s} igjen.',es:'Bo recupera {n}: {r} y {n} vuelven a ser {s}.',it:'Bo ne riceve {n} indietro: {r} e {n} fanno di nuovo {s}.',pt:'Bo recebe {n} de volta: {r} e {n} dão {s} de novo.',fr:'Bo en récupère {n} : {r} et {n}, ça refait {s}.',fi:'Bo saa {n} takaisin: {r} ja {n} on taas {s}.'},
    okPut:       {en:'Pim puts {n} back: {a} take away {n} is {t} — fair!',de:'Pim legt {n} zurück: {a} minus {n} ist {t} – fair!',nl:'Pim legt er {n} terug: {a} min {n} is {t} — eerlijk!',da:'Pim lægger {n} tilbage: {a} minus {n} er {t} – retfærdigt!',sv:'Pim lägger tillbaka {n}: {a} minus {n} är {t} – rättvist!',no:'Pim legger {n} tilbake: {a} minus {n} er {t} – rettferdig!',es:'Pim regresa {n} al montón: {a} menos {n} es {t}. ¡Parejo!',it:'Pim ne rimette {n}: {a} meno {n} fa {t}. Giusto!',pt:'Pim devolve {n} ao monte: {a} menos {n} é {t}. Justo!',fr:'Pim en remet {n} : {a} moins {n}, c’est {t} — c’est juste !',fi:'Pim laittaa {n} takaisin: {a} miinus {n} on {t} – reilua!'},
    okStart:     {en:'Bo had {n}: {n} and {r} make {t}.',de:'Bo hatte {n}: {n} und {r} sind {t}.',nl:'Bo had er {n}: {n} en {r} is {t}.',da:'Bo havde {n}: {n} og {r} giver {t}.',sv:'Bo hade {n}: {n} och {r} blir {t}.',no:'Bo hadde {n}: {n} og {r} blir {t}.',es:'Bo tenía {n}: {n} y {r} son {t}.',it:'Bo ne aveva {n}: {n} e {r} fanno {t}.',pt:'Bo tinha {n}: {n} e {r} dão {t}.',fr:'Bo en avait {n} : {n} et {r}, ça fait {t}.',fi:'Bolla oli {n}: {n} ja {r} on {t}.'},
    okAll:       {en:'Every jar is fair!',de:'Alle Gläser sind fair!',nl:'Alle potten zijn eerlijk!',da:'Alle krukker er retfærdige!',sv:'Alla burkar är rättvisa!',no:'Alle krukkene er rettferdige!',es:'¡Todos los frascos están parejos!',it:'Tutti i barattoli sono giusti!',pt:'Todos os potes estão justos!',fr:'Tous les pots sont justes !',fi:'Kaikki purkit ovat reiluja!'},
    check:       {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Comprobar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    setJars:     {en:'Jars',de:'Gläser',nl:'Potten',da:'Krukker',sv:'Burkar',no:'Krukker',es:'Frascos',it:'Barattoli',pt:'Potes',fr:'Pots',fi:'Purkit'},
    jClear:      {en:'Clear (to 10)',de:'Durchsichtig (bis 10)',nl:'Doorzichtig (tot 10)',da:'Gennemsigtige (op til 10)',sv:'Genomskinliga (upp till 10)',no:'Gjennomsiktige (til 10)',es:'Transparentes (hasta 10)',it:'Trasparenti (fino a 10)',pt:'Transparentes (até 10)',fr:'Transparents (jusqu’à 10)',fi:'Läpinäkyvät (10 asti)'},
    jFrosted:    {en:'Frosted (to 20)',de:'Milchglas (bis 20)',nl:'Matglas (tot 20)',da:'Matterede (op til 20)',sv:'Frostade (upp till 20)',no:'Matt glass (til 20)',es:'Esmerilados (hasta 20)',it:'Smerigliati (fino a 20)',pt:'Foscos (até 20)',fr:'Givrés (jusqu’à 20)',fi:'Huurteiset (20 asti)'},
    setStory:    {en:'Story',de:'Geschichten',nl:'Verhalen',da:'Historier',sv:'Berättelser',no:'Historier',es:'Historias',it:'Storie',pt:'Histórias',fr:'Histoires',fi:'Tarinat'},
    sAll:        {en:'All kinds',de:'Alle Arten',nl:'Alle soorten',da:'Alle slags',sv:'Alla sorter',no:'Alle typer',es:'Todos los tipos',it:'Tutti i tipi',pt:'Todos os tipos',fr:'Tous les types',fi:'Kaikki tyypit'},
    sMore:       {en:'Only “how many more”',de:'Nur „wie viele mehr“',nl:'Alleen „hoeveel meer”',da:'Kun „hvor mange flere“',sv:'Bara ”hur många fler”',no:'Bare «hvor mange flere»',es:'Solo «cuántas más»',it:'Solo «quante in più»',pt:'Só “quantas a mais”',fr:'Seulement « combien de plus »',fi:'Vain ”kuinka monta enemmän”'},
    ariaJarPim:  {en:'Pim’s jar: {n} beads',de:'Pims Glas: {n} Perlen',nl:'De pot van Pim: {n} kralen',da:'Pims krukke: {n} perler',sv:'Pims burk: {n} pärlor',no:'Pims krukke: {n} perler',es:'El frasco de Pim: {n} cuentas',it:'Il barattolo di Pim: {n} perline',pt:'O pote do Pim: {n} contas',fr:'Le pot de Pim : {n} perles',fi:'Pimin purkki: {n} helmeä'},
    ariaJarBo:   {en:'Bo’s jar: {n} beads',de:'Bos Glas: {n} Perlen',nl:'De pot van Bo: {n} kralen',da:'Bos krukke: {n} perler',sv:'Bos burk: {n} pärlor',no:'Bos krukke: {n} perler',es:'El frasco de Bo: {n} cuentas',it:'Il barattolo di Bo: {n} perline',pt:'O pote do Bo: {n} contas',fr:'Le pot de Bo : {n} perles',fi:'Bon purkki: {n} helmeä'}
  },/*STRINGS-END*/

  defaults: { jars: 'clear', story: 'all' },
  settings: [
    { key: 'jars', type: 'choice', labelKey: 'setJars', options: [{ value: 'clear', labelKey: 'jClear' }, { value: 'frosted', labelKey: 'jFrosted' }] },
    { key: 'story', type: 'choice', labelKey: 'setStory', options: [{ value: 'all', labelKey: 'sAll' }, { value: 'more', labelKey: 'sMore' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._swap = null; this._pos = 0;
    this._timers = []; this._ro = null; this._view = {}; this._pics = {};
    injectRibbonCSS();
    var self = this;
    if (typeof LCSPictures !== 'undefined') LCSPictures.load('forest creatures').then(function (th) { self._pics['forest creatures'] = th; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () {});
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return FairRibbonCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return FairRibbonCore.levelOf(this._setting('jars')); },
  _story: function () { return FairRibbonCore.storyOf(this._setting('story')); },
  _key: function () { return this._level() + '.' + this._story(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = FairRibbonCore.ids(this._level(), this._story()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = FairRibbonCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.slice(), p = C.plan(this._level(), this._story(), Math.random, prev);
      this._order = p.order; this._swap = p.swap; this._orderForPool = pool; this._pass = pass;
    }
    var idx = this._order[pos], sw = !!this._swap[pos], pa = { msg: this._promptText(C.round(this._level(), this._story(), idx)) }; this._pa = pa;
    return {
      id: 'ribbon.' + this._loc() + '.' + this._key() + '.' + idx, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(idx, sw, pos); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _promptText: function (r) {
    if (r.kind === 'more') return this._t('pMore');
    if (r.kind === 'hmm') return this._t('pHmm');
    if (r.kind === 'give') return this._t('pGive', { s: r.x });
    if (r.kind === 'put') return this._t('pPut');
    return this._t('pStart', { r: r.fresh, t: r.y });
  },
  _start: function (idx, swap, pos) {
    var C = FairRibbonCore;
    this._clearTimers(); this._view = {}; this._swapNow = !!swap; this._pos = pos || 0;
    this.st = C.newState(C.round(this._level(), this._story(), idx));
    var line = this._promptText(this.st.r); if (this._pa) this._pa.msg = line;
    var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line;
  },

  /* ---------------- render ---------------- */
  render: function () {
    this._ensurePool();
    if (!this.st) this._start(0, false, 0);
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
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'fr-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="fr-stage"></div><div class="fr-tiles" role="group"></div><div class="fr-foot"></div><p class="fr-note" aria-live="polite"></p>';
    wrap.addEventListener('keydown', function (e) { self._key_(e); });
    this._q = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _pic: function (key, size, cls) {
    var th = this._pics['forest creatures']; if (!th || typeof LCSPictures === 'undefined') return null;
    var im = LCSPictures.img(th, key, this._loc(), { size: size }); im.className = cls; im.alt = ''; im.style.width = size + 'px'; im.style.height = size + 'px'; return im;
  },
  /* what the jars show now */
  _shown: function () {
    var C = FairRibbonCore, st = this.st, v = this._view;
    if ((v.acted || st.done || st.show >= 2) && st.acted) return st.acted;
    return C.rest(st.r);
  },
  _paint_: function () {
    if (!this._wrap) return;
    var C = FairRibbonCore, st = this.st, r = st.r, W = this._width(), L = C.layout(W), v = this._view, self = this;
    this._wrap.className = 'fr-wrap ' + (L.wide ? 'is-wide' : 'is-narrow') + (L.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '');
    var shown = this._shown(), res = (v.acted || st.done || st.show >= 2) && st.acted ? st.acted.result : null, mood = C.mood(r, res || 'rest');
    if (!res) mood = r.kind === 'start' ? { pim: 'glow', bo: 'glow' } : { pim: 'glow', bo: 'quiet' };
    /* ---- the stage: [friend][jars][friend] on a wide screen; the friends under the jars on a phone ---- */
    var stage = this._q('.fr-stage'); stage.innerHTML = '';
    var pic = L.wide ? 96 : 64, left = this._swapNow ? 'bo' : 'pim', right = this._swapNow ? 'pim' : 'bo';
    var friend = function (who, side) {
      var box = self.api.el('span', 'fr-friend is-' + side + ' is-' + (mood[who] || 'glow') + (mood.lean ? ' is-lean' : ''));
      var im = self._pic(C.DATA.FRIENDS[who][1], pic, 'fr-pic' + ((who === 'pim') === (side === 'left') ? ' is-flip' : ''));   /* the hedgehog faces left, the mouse right: each friend faces the jars */ if (im) box.appendChild(im);
      box.style.width = box.style.height = pic + 'px'; box.setAttribute('data-who', who); return box;
    };
    var svgBox = this.api.el('div', 'fr-jars'); svgBox.innerHTML = jarsSVG(this, shown, L, left, right, res); this._view.anim = false;
    svgBox.addEventListener('click', function (e) { var g = e.target.closest && e.target.closest('[data-jar]'); if (g) self._count(g.getAttribute('data-jar')); });
    stage.appendChild(friend(left, 'left')); stage.appendChild(svgBox); stage.appendChild(friend(right, 'right'));
    /* ---- the tiles ---- */
    var tiles = this._q('.fr-tiles'), inGrid = r.top === 20 && !L.wide; tiles.innerHTML = ''; tiles.className = 'fr-tiles' + (inGrid ? ' is-twenty' : '');
    for (var n = 1; n <= r.top; n++) (function (n) {
      var b = self.api.el('button', 'fr-tile' + (st.chosen === n ? ' is-on' : '') + (v.shimmer ? ' is-shimmer' : '')); b.type = 'button'; b.setAttribute('data-k', 'tile-' + n); b.textContent = String(n);
      b.setAttribute('aria-pressed', st.chosen === n ? 'true' : 'false'); b.disabled = st.done || !!self._busy;
      b.addEventListener('click', function () { self._choose(n); }); tiles.appendChild(b);
    })(n);
    /* ---- Check ---- */
    var foot = this._q('.fr-foot'); foot.innerHTML = '';
    if (!st.done) { var ck = this.api.el('button', 'fr-check'); ck.type = 'button'; ck.setAttribute('data-k', 'check'); ck.textContent = this._t('check'); ck.disabled = !!this._busy; ck.addEventListener('click', function () { self._check(); }); (inGrid ? tiles : foot).appendChild(ck); }
    /* ---- the note ---- */
    var note = this._q('.fr-note'), hk = C.hint(st), t = '', cls = 'fr-note';
    if (v.msg) { t = v.msg; cls += ' is-ok'; }
    else if (hk) { t = this._t(hk); cls += ' is-hint'; }
    note.className = cls; note.textContent = t;
  },

  /* ---------------- actions ---------------- */
  _choose: function (n) {
    if (this._busy || !FairRibbonCore.choose(this.st, n)) return;
    this._clearTimers(); this._view = {}; this.api.sound(500 + n * 10); this._paint();
  },
  _check: function () {
    var C = FairRibbonCore, st = this.st, self = this, r = st.r;
    if (this._busy || st.done) return;
    var a = C.check(st); if (!a) return;
    if (a.result === 'none') { this._view = { shimmer: true }; this.api.sound(200); this._paint(); this.api.announce(this._q('.fr-note').textContent || ''); return; }
    this._view = { acted: true, anim: true };
    if (a.result === 'fair') {
      var n = st.chosen, msg = r.kind === 'more' ? this._t('okMore', { b: r.bo, n: n, a: r.pim }) : r.kind === 'hmm' ? this._t('okHmm', { n: n, a: r.pim, b: r.bo }) : r.kind === 'give' ? this._t('okGive', { n: n, r: r.bo, s: r.x }) : r.kind === 'put' ? this._t('okPut', { n: n, a: r.pim, t: r.bo }) : this._t('okStart', { n: n, r: r.fresh, t: r.y });
      if (this._pos === (this._pool ? this._pool.length : 9) - 1) msg += ' ' + this._t('okAll');
      this._view.msg = msg; this.api.sound(880);
      this._paint(); this.api.announce(msg);
      this._advance(msg.length * 60 + 2400);
      return;
    }
    this.api.sound(220); this._paint(); this.api.announce(this._q('.fr-note').textContent || '');
    /* miss 1: the beads drift back after a moment (miss 2 keeps the showing so the marked beads can be counted) */
    if (st.show < 2 && !this.FAST) this._later(function () { if (self.st === st && !st.done && st.show < 2) { self._view = {}; self._paint(); } }, 1600);
  },
  /* tap a jar: its beads light one by one from the bottom (a visible count, no numbers); frosted jars only once cleared */
  _count: function (who) {
    var st = this.st; if (!st || (st.r.level === 'frosted' && !st.acted && st.misses < 2)) return;
    var g = this._wrap && this._wrap.querySelector('[data-jar="' + who + '"]'); if (!g) return;
    var beads = [].slice.call(g.querySelectorAll('.fr-bead')).filter(function (c) { return !/is-dash/.test(c.getAttribute('class')); }), self = this;
    beads.forEach(function (c, i) { if (self.FAST) c.classList.add('is-lit'); else self._later(function () { c.classList.add('is-lit'); }, i * 160); });
    this._later(function () { beads.forEach(function (c) { c.classList.remove('is-lit'); }); }, this.FAST ? 1e9 : beads.length * 160 + 900);
  },
  _key_: function (e) {
    var k = e.key, st = this.st;
    if (/^[0-9]$/.test(k) && !st.done) {
      var now = Date.now(), d = k === '0' ? 10 : +k;
      if (st.r.top === 20 && this._typedOne && now - this._typedAt < 600) d = 10 + (+k);
      this._typedOne = k === '1'; this._typedAt = now;
      if (d >= 1 && d <= st.r.top) this._choose(d);
      e.preventDefault();
    } else if (k === 'Enter' && e.target && e.target.classList && e.target.classList.contains('fr-tile')) { /* the tile button's own Enter chooses it */ }
    else if (k === 'Enter') { e.preventDefault(); this._check(); }
    else if (k === 'j' || k === 'J' || k === 'k' || k === 'K') { this._count(/j/i.test(k) === !this._swapNow ? 'pim' : 'bo'); }
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

/* the two jars, the fair ribbon, the pencil mark, the spill pile, the frost */
function jarsSVG(self, shown, L, left, right, res) {
  var st = self.st, r = st.r, frosted = r.level === 'frosted', reveal = !frosted || !!st.acted || st.misses >= 2, anim = !!(self._view.anim && !self.FAST), moved = 0;
  var cap = FairRibbonCore.CAP[r.level], d = L.wide ? (frosted ? 14 : 26) : L.tiny ? (frosted ? 9 : 18) : (frosted ? 11 : 21);
  var jw = L.wide ? 64 : L.tiny ? 40 : 46, gap = L.wide ? 140 : L.tiny ? 52 : 80, jh = cap * d + 6, lid = 14, pad = L.tiny ? 8 : 14, top = Math.max(18, Math.ceil((FairRibbonCore.ROOM - 0.08) * d - 15)) + (r.kind === 'hmm' ? Math.ceil(r.top / 5) * 9 : 0);   /* room for an overshoot heaped above the rim, and for the lifted beads */
  var W = jw * 2 + gap + pad * 2, H = top + lid + jh + 12, base = top + lid + jh;
  var xs = { left: pad, right: pad + jw + gap }, f = function (x) { return x.toFixed(1); };
  var who = { left: left, right: right };
  var s = '<svg class="fr-svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="group" aria-label="' + self._t('ariaJarPim', { n: r.pim }) + ' · ' + self._t('ariaJarBo', { n: r.bo }) + '">';
  s += '<rect x="0" y="' + (base + 2) + '" width="' + W + '" height="6" rx="3" class="fr-table"/>';
  /* the spill pile between the jars */
  for (var p = 0; p < 7; p++) s += '<circle cx="' + f(W / 2 - 18 + (p % 4) * 12 + (p > 3 ? 6 : 0)) + '" cy="' + f(base - 4 - (p > 3 ? 8 : 0)) + '" r="5" class="fr-bead is-pile"/>';
  var ribY = base - 3 - r.ribbon * d;
  ['left', 'right'].forEach(function (side) {
    var x = xs[side], owner = who[side], layers = owner === 'pim' ? shown.P : shown.B, count = layers.filter(function (k) { return k !== 'dash'; }).length;
    var mood = (res === 'fair') ? 'glow' : (res === 'over' ? (owner === 'pim' ? 'quiet' : 'glow') : (r.kind === 'start' || owner === 'pim' ? 'glow' : 'quiet'));
    if (mood === 'glow') s += '<rect x="' + f(x - 6) + '" y="' + f(top - 4) + '" width="' + f(jw + 12) + '" height="' + f(jh + lid + 8) + '" rx="14" class="fr-halo' + (res === 'fair' ? ' is-gold' : '') + '"/>';
    s += '<g data-jar="' + owner + '"><rect x="' + x + '" y="' + (top + lid) + '" width="' + jw + '" height="' + jh + '" rx="10" class="fr-glass"/>';
    s += '<rect x="' + f(x + 3) + '" y="' + top + '" width="' + f(jw - 6) + '" height="' + lid + '" rx="4" class="fr-lid"/>';
    for (var t = 5; t < cap; t += 5) s += '<line x1="' + f(x + 2) + '" y1="' + f(base - 3 - t * d) + '" x2="' + f(x + 8) + '" y2="' + f(base - 3 - t * d) + '" class="fr-tick"/>';
    /* the beads, bottom up */
    var marked = 0, markKind = st.show >= 2 && st.last && st.last.fits && st.last.mark;
    var gapX = side === 'left' ? x + jw + 9 : x - 9, isMover = function (k) { return st.acted && (k === 'mv' || k === 'over' || k === 'st' || (k === 'dash' && (r.kind === 'hmm' || r.kind === 'put'))); };
    layers.forEach(function (k, i) {
      var cy = base - 3 - (i + 0.5) * d, cx = x + jw / 2, rr = d * 0.42;
      var mv = anim && isMover(k); s += '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(rr) + '" class="fr-bead is-' + k + (mv ? ' is-in' : '') + '"' + (mv ? ' style="animation-delay:' + (moved++ * 140) + 'ms"' : '') + '/>';
      var isMark = (markKind === 'dash' && (k === 'dash' || k === 'gapb')) || (markKind === 'glow' && (k === 'over' || k === 'still'));
      if (isMark) { marked++; var inside = rr >= 8; s += '<text x="' + f(inside ? cx : gapX) + '" y="' + f(cy + (inside ? rr : 6) * 0.45) + '" class="fr-num" font-size="' + f(inside ? rr * 1.3 : 12) + '">' + marked + '</text>'; }
    });
    if (frosted) {
      if (!reveal) s += '<rect x="' + f(x + 2) + '" y="' + (top + lid + 2) + '" width="' + f(jw - 4) + '" height="' + (jh - 4) + '" rx="8" class="fr-frost"/>';
      s += '<text x="' + f(x + jw / 2) + '" y="' + f(top + lid - 2) + '" class="fr-lidnum">' + (owner === 'pim' ? r.pim : r.bo) + '</text>';
    }
    /* START: a gold bracket beside the beads Bo just got */
    if (r.kind === 'start' && owner === 'bo' && reveal) { var bx = side === 'left' ? x + jw + 5 : x - 5, bs = side === 'left' ? -4 : 4, y1 = base - 3 - r.bo * d + 2, y2 = base - 3 - (r.bo - r.fresh) * d - 2; s += '<path d="M' + f(bx + bs) + ' ' + f(y1) + 'H' + f(bx) + 'V' + f(y2) + 'H' + f(bx + bs) + '" class="fr-bracket"/>'; }
    if (r.mark != null && owner === 'bo') s += '<line x1="' + f(x + jw - 12) + '" y1="' + f(base - 3 - r.mark * d) + '" x2="' + f(x + jw - 2) + '" y2="' + f(base - 3 - r.mark * d) + '" class="fr-pencil"/>';
    s += '</g>';
    /* the lifted beads (HOW MANY MORE) hover above Pim's jar, in rows of five */
    if (owner === 'pim' && shown.lifted && r.kind === 'hmm') for (var h = 0; h < shown.lifted; h++) s += '<circle cx="' + f(x + jw / 2 + ((h % 5) - 2) * 8.5) + '" cy="' + f(top - 6 - Math.floor(h / 5) * 9) + '" r="4" class="fr-bead is-lift' + (anim ? ' is-up" style="animation-delay:' + (h * 140) + 'ms' : '') + '"/>';
  });
  /* the fair ribbon across both jars, with a bow on the left */
  s += '<line x1="' + f(xs.left - 8) + '" y1="' + f(ribY) + '" x2="' + f(xs.right + jw + 8) + '" y2="' + f(ribY) + '" class="fr-ribbon' + (res === 'fair' ? ' is-fair' : '') + '"/>';
  s += '<path d="M' + f(xs.left - 8) + ' ' + f(ribY) + 'l-7 -6v12z M' + f(xs.left - 8) + ' ' + f(ribY) + 'l7 -6v12z" class="fr-bow"/>';
  /* success: a ring of gold sparkles round the ribbon */
  if (res === 'fair') ['left', 'right'].forEach(function (sd) { var cx = xs[sd] + jw / 2; for (var q = 0; q < 8; q++) { var ang = q / 8 * Math.PI * 2; s += '<circle cx="' + f(cx + Math.cos(ang) * (jw / 2 + 12)) + '" cy="' + f(ribY + Math.sin(ang) * (jw / 2 + 4)) + '" r="' + (q % 2 ? 2.5 : 4) + '" class="fr-spark"/>'; } });
  return s + '</svg>';
}

var frCssDone = false;
function injectRibbonCSS() {
  if (frCssDone || typeof document === 'undefined') return;
  frCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.fr-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;} .fr-wrap:focus{outline:none;}'
  + '.fr-stage{display:flex;align-items:flex-end;justify-content:center;gap:10px;} .fr-wrap.is-tiny .fr-stage{gap:0;} .fr-wrap.is-tiny{gap:6px;}'
  + '.fr-jars{display:block;} .fr-svg{display:block;overflow:visible;}'
  + '.fr-friend{display:block;flex:none;transition:transform .5s,filter .5s;} .fr-pic{display:block;} .fr-pic.is-flip{transform:scaleX(-1);}'
  + '.fr-friend.is-quiet{filter:grayscale(.65) opacity(.8);} .fr-friend.is-left.is-quiet{transform:rotate(-6deg);} .fr-friend.is-right.is-quiet{transform:rotate(6deg);}'
  + '.fr-friend.is-left.is-lean{transform:rotate(10deg) translateX(6px);} .fr-friend.is-right.is-lean{transform:rotate(-10deg) translateX(-6px);}'
  + '.fr-table{fill:#D9B98A;} .fr-glass{fill:#EAF4F2;stroke:#3A2E1F;stroke-width:3;} .fr-lid{fill:#F6ECD6;stroke:#3A2E1F;stroke-width:2;} .fr-tick{stroke:#9DB7B1;stroke-width:1.5;}'
  + '.fr-halo{fill:#F4CF62;opacity:.22;} .fr-halo.is-gold{opacity:.5;}'
  + '.fr-bead{fill:#F2D488;stroke:#B48A2E;stroke-width:1.2;} .fr-bead.is-mv{fill:#F7C64E;} .fr-bead.is-new{fill:#FFE8A3;stroke:#D4A21E;stroke-width:2.2;} .fr-bead.is-st{fill:#7CC7B8;stroke:#1E8A78;}'
  + '.fr-bead.is-over,.fr-bead.is-still{fill:#F2784B;stroke:#9C3A1C;} .fr-bead.is-dash{fill:none;stroke:#7A6A50;stroke-width:1.4;stroke-dasharray:3 2;} .fr-bead.is-gapb{stroke:#7A6A50;stroke-width:1.6;stroke-dasharray:3 2;}'
  + '.fr-bead.is-pile{fill:#F2D488;opacity:.8;} .fr-bead.is-lift{fill:#F7C64E;} .fr-bead.is-lit{fill:#FFF3B0;stroke:#E0A800;stroke-width:2.4;}'
  + '.fr-bead.is-in{animation:frIn .45s ease-out both;} @keyframes frIn{from{transform:translateY(-40px);opacity:0;}to{transform:none;opacity:1;}} .fr-bead.is-up{animation:frIn .45s ease-out both;}'
  + '.fr-bracket{fill:none;stroke:#D4A21E;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;} .fr-spark{fill:#F4CF62;} .fr-jars [data-jar]{cursor:pointer;}'
  + '.fr-num{fill:#3A2E1F;text-anchor:middle;font-family:' + H + ';font-weight:800;}'
  + '.fr-frost{fill:#F3F6F8;stroke:#C5CDD6;stroke-width:1;} .fr-lidnum{fill:#3A2E1F;text-anchor:middle;font-family:' + H + ';font-weight:800;font-size:13px;}'
  + '.fr-pencil{stroke:#6B6B6B;stroke-width:3;stroke-linecap:round;}'
  + '.fr-ribbon{stroke:#D4A21E;stroke-width:4;stroke-linecap:round;} .fr-ribbon.is-fair{stroke:#E8B53A;stroke-width:5;} .fr-bow{fill:#D4A21E;}'
  + '.fr-tiles{display:grid;grid-template-columns:repeat(10,44px);gap:5px;justify-content:center;} .fr-wrap.is-narrow .fr-tiles{grid-template-columns:repeat(5,52px);}'
  + '.fr-tile{height:48px;border:0;border-radius:10px;background:#FFFDF7;box-shadow:inset 0 0 0 2px #8A6B42,0 3px 0 #C9A96E;font-family:' + H + ';font-weight:800;font-size:24px;color:#3A2E1F;cursor:pointer;transition:transform .15s;}'
  + '.fr-tile.is-on{transform:translateY(-6px);background:#FFF6D6;box-shadow:inset 0 0 0 3px #D4A21E,0 6px 0 #E8C26A;} .fr-tile.is-shimmer{animation:frShim .6s ease-in-out 1;} @keyframes frShim{50%{background:#FFF6D6;}} .fr-tile:disabled{cursor:default;}'
  + '.fr-check{min-height:52px;padding:6px 28px;border:0;border-radius:14px;background:#1E8A78;box-shadow:0 4px 0 #0F5C4F;color:#fff;font-family:' + H + ';font-weight:800;font-size:20px;cursor:pointer;} .fr-check:disabled{opacity:.5;cursor:default;}'
  + '.fr-wrap:not(.is-wide) .fr-tiles.is-twenty{grid-template-columns:repeat(6,44px);gap:4px;} .fr-tiles.is-twenty .fr-tile{height:44px;} .fr-tiles .fr-check{grid-column:span 4;min-height:44px;padding:0 8px;font-size:18px;}'
  + '.fr-tile:focus-visible,.fr-check:focus-visible{outline:3px solid #146B5E;outline-offset:3px;}'
  + '.fr-note{min-height:1.4em;margin:0;padding:0 8px;text-align:center;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.35;color:#2A2A35;max-width:640px;} .fr-note:empty{display:none;} .fr-note.is-hint{color:#B5461F;} .fr-note.is-ok{color:#146B5E;}'
  + '.fr-wrap.is-narrow .fr-note{font-size:17px;} .fr-wrap.is-tiny .fr-tiles{grid-template-columns:repeat(5,48px);gap:4px;} .fr-wrap.is-tiny .fr-tile{height:44px;}'
  + '.fr-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media print{.fr-note,.fr-foot{display:none;}}'
  + '@media (prefers-reduced-motion: reduce){.fr-wrap *{animation:none !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'fr-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.FairRibbonActivity = FairRibbonActivity;
