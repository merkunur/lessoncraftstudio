/* =====================================================================
   hour-road-activity.js — ACTIVITY #101 of the one-by-one rebuild:
   "Sprocket's Clock" (to the half-hour) → THE HOUR ROAD (1.MD.B.3, 11 locales).
   Design: docs/activities-rebuild/designs/101-clock-digital.md
   ---------------------------------------------------------------------
   THE INVENTION: under the clock lies its rim unrolled into a straight
   road — thirteen posts (12, 1, … 11, 12) with a half stone between every
   two. The child reads both hands and taps a digital card; on Check
   Sprocket's marker walks to that card's spot on the road, the road ROLLS
   BACK UP into a ring of its own length round the dial (post k on numeral
   k's ray) and the marker slides along its ray to the short hand's tip:
   a right card lands exactly on the tip; a wrong one lands half a segment
   or a whole segment away, joined to the tip by a dashed coral arc. Then
   the clock runs half an hour: half a lap of the long hand, half a
   segment of the short hand and the marker together.
   ACTIVITY LAYER ONLY: the model is hour-road-core.js; the clock, road,
   posts, stones, cards and the marker token are drawn apparatus; Sprocket
   is the library picture farm animals/rooster (never shrunk, never on the
   road); lcs-shell.js untouched (the shell's Check is hidden and pressed
   by this activity when the round is right).
   Test seams: window.HourRoadActivity.st / ._pool / ._order / ._ensurePool /
   ._start / ._view / .FAST / .OK_MS.
   ===================================================================== */
'use strict';

var HourRoadActivity = {
  id: 'hour-road',
  apparatusClasses: ['hr-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble: {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:       {en:'Sprocket\'s Clock',de:'Sprockets Uhr',nl:'De klok van Kukel',da:'Sprockets ur',sv:'Tores klocka',no:'Sprockets klokke',es:'El reloj de Sprocket',it:'L’orologio di Sprocket',pt:'O relógio do Sprocket',fr:'L’horloge de Sprocket',fi:'Sprocketin kello'},
    name:        {en:'Sprocket',de:'Sprocket',nl:'Kukel',da:'Sprocket',sv:'Tore',no:'Sprocket',es:'Sprocket',it:'Sprocket',pt:'Sprocket',fr:'Sprocket',fi:'Sprocket'},
    tTask:       {en:'Read both hands. Tap the matching digital time.',de:'Lies beide Zeiger ab. Tippe auf die passende digitale Uhrzeit.',nl:'Kijk naar beide wijzers. Tik op de digitale tijd die erbij past.',da:'Aflæs begge visere. Tryk på det digitale klokkeslæt, der passer.',sv:'Läs av båda visarna. Tryck på den digitala tid som passar.',no:'Les av begge viserne. Trykk på det digitale klokkeslettet som passer.',es:'Lee las dos manecillas. Toca la hora digital que corresponde.',it:'Leggi le due lancette. Tocca l’ora digitale giusta.',pt:'Leia os dois ponteiros. Toque na hora digital que combina.',fr:'Lis les deux aiguilles. Touche l’heure numérique qui correspond.',fi:'Katso molempia viisareita. Napauta sopivaa digitaalista aikaa.'},
    check:       {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Comprobar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    hintNone:    {en:'Look where the long hand points, and where the short hand points. Then tap a card.',de:'Schau, wohin der große Zeiger zeigt und wohin der kleine Zeiger zeigt. Tippe dann auf eine Karte.',nl:'Kijk waar de grote wijzer naar wijst en waar de kleine wijzer naar wijst. Tik dan op een kaartje.',da:'Se, hvor den store viser peger, og hvor den lille viser peger. Tryk så på et kort.',sv:'Titta vart den långa visaren pekar och vart den korta visaren pekar. Tryck sedan på ett kort.',no:'Se hvor den store viseren peker, og hvor den lille viseren peker. Trykk så på et kort.',es:'Mira hacia dónde apunta la manecilla larga y hacia dónde apunta la corta. Luego toca una tarjeta.',it:'Guarda dove punta la lancetta lunga e dove punta quella corta. Poi tocca una carta.',pt:'Veja para onde aponta o ponteiro grande e para onde aponta o pequeno. Depois toque em um cartão.',fr:'Regarde où pointe la grande aiguille et où pointe la petite. Puis touche une carte.',fi:'Katso, mihin pitkä viisari osoittaa ja mihin lyhyt viisari osoittaa. Napauta sitten korttia.'},
    hintLong:    {en:'Look at the long hand: on the 12 it is o\'clock, on the 6 it is half past.',de:'Schau auf den großen Zeiger: Auf der 12 ist es eine volle Stunde, auf der 6 ist es halb.',nl:'Kijk naar de grote wijzer: op de 12 is het een heel uur, op de 6 is het half.',da:'Se på den store viser: På 12 er klokken hel, på 6 er den halv.',sv:'Titta på den långa visaren: på 12 är klockan hel, på 6 är den halv.',no:'Se på den store viseren: På 12 er det hel time, på 6 er det halv.',es:'Mira la manecilla larga: en el 12 es en punto, en el 6 es y media.',it:'Guarda la lancetta lunga: sul 12 è l’ora esatta, sul 6 è e mezza.',pt:'Veja o ponteiro grande: no 12 é hora exata, no 6 é e meia.',fr:'Regarde la grande aiguille : sur le 12, c’est l’heure pile ; sur le 6, c’est la demie.',fi:'Katso pitkää viisaria: kun se on 12:n kohdalla, kello on tasan, ja kun se on 6:n kohdalla, kello on puoli.'},
    hintNext:    {en:'The marker went one hour too far. Look at the number the short hand has just passed.',de:'Die Figur ist eine Stunde zu weit gelaufen. Schau, an welcher Zahl der kleine Zeiger gerade vorbei ist.',nl:'Het pionnetje ging een uur te ver. Kijk welk getal de kleine wijzer net voorbij is.',da:'Brikken gik en time for langt. Se, hvilket tal den lille viser lige er gået forbi.',sv:'Pjäsen gick en timme för långt. Titta på vilket tal den korta visaren just har passerat.',no:'Brikken gikk en time for langt. Se hvilket tall den lille viseren akkurat har passert.',es:'La ficha se pasó una hora. Mira qué número acaba de pasar la manecilla corta.',it:'La pedina è andata un’ora troppo avanti. Guarda quale numero ha appena superato la lancetta corta.',pt:'A ficha foi uma hora longe demais. Veja por qual número o ponteiro pequeno acabou de passar.',fr:'Le pion est allé une heure trop loin. Regarde quel nombre la petite aiguille vient de dépasser.',fi:'Nappula meni tunnin liian pitkälle. Katso, minkä numeron ohi lyhyt viisari on juuri mennyt.'},
    hintShort:   {en:'The marker stopped half an hour too soon. Look at the long hand.',de:'Die Figur ist eine halbe Stunde zu früh stehen geblieben. Schau auf den großen Zeiger.',nl:'Het pionnetje stopte een half uur te vroeg. Kijk naar de grote wijzer.',da:'Brikken stoppede en halv time for tidligt. Se på den store viser.',sv:'Pjäsen stannade en halvtimme för tidigt. Titta på den långa visaren.',no:'Brikken stoppet en halvtime for tidlig. Se på den store viseren.',es:'La ficha se detuvo media hora antes. Mira la manecilla larga.',it:'La pedina si è fermata mezz’ora troppo presto. Guarda la lancetta lunga.',pt:'A ficha parou meia hora antes. Veja o ponteiro grande.',fr:'Le pion s’est arrêté une demi-heure trop tôt. Regarde la grande aiguille.',fi:'Nappula pysähtyi puoli tuntia liian aikaisin. Katso pitkää viisaria.'},
    hintWatch:   {en:'Watch the marker walk round to the tip of the short hand, and look where the long hand points.',de:'Schau zu, wie die Figur bis zur Spitze des kleinen Zeigers läuft, und schau, wohin der große Zeiger zeigt.',nl:'Kijk hoe het pionnetje naar de punt van de kleine wijzer loopt, en kijk waar de grote wijzer naar wijst.',da:'Se brikken gå hen til spidsen af den lille viser, og se, hvor den store viser peger.',sv:'Se hur pjäsen går fram till spetsen på den korta visaren, och titta vart den långa visaren pekar.',no:'Se brikken gå bort til spissen av den lille viseren, og se hvor den store viseren peker.',es:'Mira cómo la ficha camina hasta la punta de la manecilla corta y fíjate hacia dónde apunta la larga.',it:'Guarda la pedina che cammina fino alla punta della lancetta corta, e guarda dove punta quella lunga.',pt:'Veja a ficha andar até a ponta do ponteiro pequeno e veja para onde aponta o grande.',fr:'Regarde le pion marcher jusqu’au bout de la petite aiguille, et regarde où pointe la grande.',fi:'Katso, kun nappula kävelee lyhyen viisarin kärkeen, ja katso, mihin pitkä viisari osoittaa.'},
    okTime:      {en:'{d} — {p}!',de:'{d} – {p}!',nl:'{d} – {p}!',da:'{d} – {p}!',sv:'{d} – {p}!',no:'{d} – {p}!',es:'¡{d}, {p}!',it:'{d} – {p}!',pt:'{d} – {p}!',fr:'{d} – {p} !',fi:'{d} – {p}!'},
    aClock00:    {en:'Clock: the long hand is on the 12, the short hand is on the {h}.',de:'Uhr: Der große Zeiger steht auf der 12, der kleine Zeiger auf der {h}.',nl:'Klok: de grote wijzer staat op de 12, de kleine wijzer op de {h}.',da:'Ur: Den store viser står på 12, den lille viser på {h}.',sv:'Klocka: den långa visaren står på 12, den korta visaren på {h}.',no:'Klokke: Den store viseren står på 12, den lille viseren på {h}.',es:'Reloj: la manecilla larga está en el 12 y la corta en el {h}.',it:'Orologio: la lancetta lunga è sul numero 12, quella corta sul numero {h}.',pt:'Relógio: o ponteiro grande está no 12 e o pequeno está no {h}.',fr:'Horloge : la grande aiguille est sur le 12, la petite sur le {h}.',fi:'Kello: pitkä viisari on 12:n kohdalla, lyhyt viisari {h}:n kohdalla.'},
    aClock30:    {en:'Clock: the long hand is on the 6, the short hand is halfway between the {h} and the {h2}.',de:'Uhr: Der große Zeiger steht auf der 6, der kleine Zeiger genau zwischen der {h} und der {h2}.',nl:'Klok: de grote wijzer staat op de 6, de kleine wijzer precies tussen de {h} en de {h2}.',da:'Ur: Den store viser står på 6, den lille viser midt mellem {h} og {h2}.',sv:'Klocka: den långa visaren står på 6, den korta visaren mitt emellan {h} och {h2}.',no:'Klokke: Den store viseren står på 6, den lille viseren midt mellom {h} og {h2}.',es:'Reloj: la manecilla larga está en el 6 y la corta, a la mitad entre el {h} y el {h2}.',it:'Orologio: la lancetta lunga è sul numero 6, quella corta a metà tra il numero {h} e il numero {h2}.',pt:'Relógio: o ponteiro grande está no 6 e o pequeno está no meio, entre o {h} e o {h2}.',fr:'Horloge : la grande aiguille est sur le 6, la petite à mi-chemin entre le {h} et le {h2}.',fi:'Kello: pitkä viisari on 6:n kohdalla, lyhyt viisari puolivälissä {h}:n ja {h2}:n välissä.'},
    aRoad:       {en:'The clock\'s numbers laid out as a road',de:'Die Zahlen der Uhr als Weg',nl:'De getallen van de klok als een weg',da:'Urets tal lagt ud som en vej',sv:'Klockans tal utlagda som en väg',no:'Klokkens tall lagt ut som en vei',es:'Los números del reloj como un camino',it:'I numeri dell’orologio stesi come una strada',pt:'Os números do relógio como uma estrada',fr:'Les nombres de l’horloge en forme de route',fi:'Kellon numerot tienä'},
    aMarker:     {en:'{name}\'s marker: drag it along the road',de:'{name}s Figur: zieh sie den Weg entlang',nl:'Het pionnetje van {name}: sleep het langs de weg',da:'{name}s brik: træk den hen ad vejen',sv:'{name}s pjäs: dra den längs vägen',no:'{name}s brikke: dra den langs veien',es:'La ficha de {name}: arrástrala por el camino',it:'La pedina di {name}: trascinala lungo la strada',pt:'A ficha do {name}: arraste-a pela estrada',fr:'Le pion de {name} : fais-le glisser le long de la route',fi:'Sprocketin nappula: vedä sitä tietä pitkin'},
    setTimes:    {en:'Times',de:'Uhrzeiten',nl:'Tijden',da:'Klokkeslæt',sv:'Tider',no:'Klokkeslett',es:'Horas',it:'Orari',pt:'Horários',fr:'Heures',fi:'Ajat'},
    tBoth:       {en:'O\'clock and half past',de:'Volle und halbe Stunden',nl:'Hele en halve uren',da:'Hele og halve timer',sv:'Hela och halva timmar',no:'Hele og halve timer',es:'Horas en punto y medias horas',it:'Ore esatte e mezz’ore',pt:'Horas exatas e meias horas',fr:'Heures pile et demies',fi:'Tasa- ja puolitunnit'},
    tHalf:       {en:'Half past only',de:'Nur halbe Stunden',nl:'Alleen halve uren',da:'Kun halve timer',sv:'Bara halva timmar',no:'Bare halve timer',es:'Solo medias horas',it:'Solo mezz’ore',pt:'Só meias horas',fr:'Seulement les demies',fi:'Vain puolitunnit'},
    setRoad:     {en:'Road',de:'Weg',nl:'Weg',da:'Vej',sv:'Väg',no:'Vei',es:'Camino',it:'Strada',pt:'Estrada',fr:'Route',fi:'Tie'},
    rShown:      {en:'Always shown',de:'Immer zu sehen',nl:'Altijd zichtbaar',da:'Altid synlig',sv:'Alltid synlig',no:'Alltid synlig',es:'Siempre visible',it:'Sempre visibile',pt:'Sempre visível',fr:'Toujours visible',fi:'Aina näkyvissä'},
    rCheck:      {en:'Only to check',de:'Nur zum Prüfen',nl:'Alleen bij controleren',da:'Kun ved tjek',sv:'Bara vid kontroll',no:'Bare ved sjekk',es:'Solo al comprobar',it:'Solo al controllo',pt:'Só ao verificar',fr:'Seulement à la vérification',fi:'Vain tarkistettaessa'}
  },/*STRINGS-END*/

  /*TIMES-BEGIN*/TIMES: {
    en: { sep:':', o:['one o\'clock','two o\'clock','three o\'clock','four o\'clock','five o\'clock','six o\'clock','seven o\'clock','eight o\'clock','nine o\'clock','ten o\'clock','eleven o\'clock','twelve o\'clock'], h:['half past one','half past two','half past three','half past four','half past five','half past six','half past seven','half past eight','half past nine','half past ten','half past eleven','half past twelve'] },
    de: { sep:':', o:['ein Uhr','zwei Uhr','drei Uhr','vier Uhr','fünf Uhr','sechs Uhr','sieben Uhr','acht Uhr','neun Uhr','zehn Uhr','elf Uhr','zwölf Uhr'], h:['halb zwei','halb drei','halb vier','halb fünf','halb sechs','halb sieben','halb acht','halb neun','halb zehn','halb elf','halb zwölf','halb eins'] },
    nl: { sep:':', o:['één uur','twee uur','drie uur','vier uur','vijf uur','zes uur','zeven uur','acht uur','negen uur','tien uur','elf uur','twaalf uur'], h:['half twee','half drie','half vier','half vijf','half zes','half zeven','half acht','half negen','half tien','half elf','half twaalf','half één'] },
    da: { sep:':', o:['klokken et','klokken to','klokken tre','klokken fire','klokken fem','klokken seks','klokken syv','klokken otte','klokken ni','klokken ti','klokken elleve','klokken tolv'], h:['halv to','halv tre','halv fire','halv fem','halv seks','halv syv','halv otte','halv ni','halv ti','halv elleve','halv tolv','halv et'] },
    sv: { sep:':', o:['klockan ett','klockan två','klockan tre','klockan fyra','klockan fem','klockan sex','klockan sju','klockan åtta','klockan nio','klockan tio','klockan elva','klockan tolv'], h:['halv två','halv tre','halv fyra','halv fem','halv sex','halv sju','halv åtta','halv nio','halv tio','halv elva','halv tolv','halv ett'] },
    no: { sep:':', o:['klokka ett','klokka to','klokka tre','klokka fire','klokka fem','klokka seks','klokka sju','klokka åtte','klokka ni','klokka ti','klokka elleve','klokka tolv'], h:['halv to','halv tre','halv fire','halv fem','halv seks','halv sju','halv åtte','halv ni','halv ti','halv elleve','halv tolv','halv ett'] },
    es: { sep:':', o:['la una en punto','las dos en punto','las tres en punto','las cuatro en punto','las cinco en punto','las seis en punto','las siete en punto','las ocho en punto','las nueve en punto','las diez en punto','las once en punto','las doce en punto'], h:['la una y media','las dos y media','las tres y media','las cuatro y media','las cinco y media','las seis y media','las siete y media','las ocho y media','las nueve y media','las diez y media','las once y media','las doce y media'] },
    it: { sep:':', o:['l’una in punto','le due in punto','le tre in punto','le quattro in punto','le cinque in punto','le sei in punto','le sette in punto','le otto in punto','le nove in punto','le dieci in punto','le undici in punto','le dodici in punto'], h:['l’una e mezza','le due e mezza','le tre e mezza','le quattro e mezza','le cinque e mezza','le sei e mezza','le sette e mezza','le otto e mezza','le nove e mezza','le dieci e mezza','le undici e mezza','le dodici e mezza'] },
    pt: { sep:':', o:['uma hora','duas horas','três horas','quatro horas','cinco horas','seis horas','sete horas','oito horas','nove horas','dez horas','onze horas','doze horas'], h:['uma e meia','duas e meia','três e meia','quatro e meia','cinco e meia','seis e meia','sete e meia','oito e meia','nove e meia','dez e meia','onze e meia','doze e meia'] },
    fr: { sep:':', o:['une heure','deux heures','trois heures','quatre heures','cinq heures','six heures','sept heures','huit heures','neuf heures','dix heures','onze heures','douze heures'], h:['une heure et demie','deux heures et demie','trois heures et demie','quatre heures et demie','cinq heures et demie','six heures et demie','sept heures et demie','huit heures et demie','neuf heures et demie','dix heures et demie','onze heures et demie','douze heures et demie'] },
    fi: { sep:':', o:['kello yksi','kello kaksi','kello kolme','kello neljä','kello viisi','kello kuusi','kello seitsemän','kello kahdeksan','kello yhdeksän','kello kymmenen','kello yksitoista','kello kaksitoista'], h:['puoli kaksi','puoli kolme','puoli neljä','puoli viisi','puoli kuusi','puoli seitsemän','puoli kahdeksan','puoli yhdeksän','puoli kymmenen','puoli yksitoista','puoli kaksitoista','puoli yksi'] }
  },/*TIMES-END*/

  defaults: { times: 'both', road: 'shown' },
  settings: [
    { key: 'times', type: 'choice', labelKey: 'setTimes', options: [{ value: 'both', labelKey: 'tBoth' }, { value: 'half', labelKey: 'tHalf' }] },
    { key: 'road', type: 'choice', labelKey: 'setRoad', options: [{ value: 'shown', labelKey: 'rShown' }, { value: 'check', labelKey: 'rCheck' }] }
  ],
  OK_MS: 4200, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._pos = 0;
    this._timers = []; this._ro = null; this._view = {}; this._pics = {}; this._places = []; this._raf = 0; this._busy = false;
    injectRoadCSS();
    var self = this;
    if (typeof LCSPictures !== 'undefined') LCSPictures.load('farm animals').then(function (t) { self._pics.farm = t; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () {});
  },
  destroy: function () { this._stopAnim(); this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; if (!('name' in a)) a.name = this.api && this.api.t ? this.api.t('name') : 'Sprocket'; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return HourRoadCore.locale(((this.api && this.api.lang) || 'en')); },
  _times: function () { return HourRoadCore.timesOf(this._setting('times')); },
  _road: function () { return HourRoadCore.roadOf(this._setting('road')); },
  _key: function () { return this._times(); },
  /* the time in the celebration, written exactly as on the cards (h:mm), so the child sees the same digits twice */
  _digital: function (t) { var T = this.TIMES[this._loc()] || this.TIMES.en; return t.h + T.sep + (t.m < 10 ? '0' + t.m : String(t.m)); },
  _phrase: function (t) { var T = this.TIMES[this._loc()] || this.TIMES.en; return (t.m ? T.h : T.o)[t.h - 1]; },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = HourRoadCore.ids(this._times()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = HourRoadCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      /* _order holds POSITIONS into _pool (the test seam's contract); the plan works on round ids */
      var prevIds = fresh ? null : this._order.map(function (p) { return pool[p]; });
      this._order = C.plan(this._times(), Math.random, prevIds).order.map(function (id) { return pool.indexOf(id); }); this._orderForPool = pool; this._pass = pass;
    }
    var id = pool[this._order[pos]], pa = { msg: this._t('tTask') }; this._pa = pa;
    return {
      id: 'hourroad.' + this._loc() + '.' + this._key() + '.' + id, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(id, pos); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _start: function (id, pos) {
    var C = HourRoadCore;
    this._stopAnim(); this._clearTimers(); this._pos = pos || 0; this._busy = false;
    var order = C.cardOrder(Math.random, this._places);
    this.st = C.newState(C.round(id), order);
    this._places.push(C.rightPlace(this.st)); if (this._places.length > 5) this._places.splice(0, 3);   /* trim in threes: the bag position (length mod 3) survives */
    this._resetView();
  },
  _resetView: function () { var p = HourRoadCore.roadPos(this.st.r.target); this._view = { s: 0, mk: 0, ring: 0, disp: p, arc: null, glow: false, hop: false, note: '', ok: '', free: false, showRoad: false }; },

  /* ---------------- render ---------------- */
  render: function () {
    this._ensurePool();
    if (!this.st) this._start(this._pool[0], 0);
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
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'hr-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="hr-stage"></div><div class="hr-cards" role="group"></div><div class="hr-foot"></div><p class="hr-note" aria-live="polite"></p>';
    wrap.addEventListener('keydown', function (e) { self._keydown(e); });
    this._qs = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  /* the geometry, in px: the dial, Sprocket's perch, the road and its ring (R = road length / 2π, concentric with the dial) */
  _dims: function () {
    var C = HourRoadCore, w = this._width(), B = C.band(w), S = Math.min(w, 660), wide = B.wide;
    var rD = wide ? 145 : Math.max(96, Math.min(118, S * (B.tiny ? 0.355 : 0.37))), rs = wide ? 96 : 64;
    var cx = S / 2, cy = Math.max(rD + 26, rs + 0.574 * rD + 6);   /* Sprocket's feet on the rim at 55° from the 12 */
    var L = S - 32, x0 = (S - L) / 2, signR = wide ? 12 : 9.5, bandH = wide ? 26 : 20, roadH = wide ? 72 : B.tiny ? 52 : 58;
    var roadTop = cy + rD + 30, yBand = roadTop + roadH - bandH / 2;
    return { w: w, S: S, wide: wide, tiny: B.tiny, rD: rD, rs: rs, cx: cx, cy: cy, L: L, x0: x0, signR: signR, bandH: bandH, roadTop: roadTop, yBand: yBand, H: roadTop + roadH + 6, R: L / (2 * Math.PI), tip: 0.46 * rD, longR: 0.62 * rD, numR: 0.76 * rD, numF: wide ? 26 : Math.round(rD * 0.18), tickL: wide ? 12 : B.tiny ? 7 : 9 };   /* the long hand stops short of the numerals, so it never hides the number it points at */
  },
  /* a point l px along the road, the road rolled by s (0 = straight under the clock, 1 = the ring round the dial). The END
     states are exact — the ring has the road's own length (R = L / 2π) and post k sits on numeral k's ray — and in
     between each point travels straight from its road spot to its ring spot, so the moving road never leaves the
     stretch between the road and the clock (it never sweeps over the cards). */
  _roadPt: function (D, l, s) {
    var a = 2 * Math.PI * l / D.L, rx = D.cx + D.R * Math.sin(a), ry = D.cy - D.R * Math.cos(a);
    return { x: D.x0 + l + (rx - D.x0 - l) * s, y: D.yBand + (ry - D.yBand) * s };
  },
  _paint_: function () {
    if (!this._wrap) return;
    var st = this.st, D = this._dims(), v = this._view;
    this._wrap.className = 'hr-wrap ' + (D.wide ? 'is-wide' : 'is-narrow') + (D.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + this._times();
    this._paintStage(D);
    this._paintCards(D);
    var self = this, foot = this._qs('.hr-foot'); foot.innerHTML = '';
    var ck = this._btn('hr-check', 'check', null); ck.textContent = this._t('check'); ck.disabled = st.done || this._busy;
    ck.addEventListener('click', function () { self._check(); }); foot.appendChild(ck);
    if (v.free) { var rd = this.api.el('span', 'hr-readout'); rd.textContent = HourRoadCore.fmt(HourRoadCore.timeAt(v.mk)); foot.appendChild(rd); }
    var note = this._qs('.hr-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'hr-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'hr-note is-hint'; }
    else { note.textContent = ''; note.className = 'hr-note'; }
  },
  _paintStage: function (D) {
    var C = HourRoadCore, st = this.st, v = this._view, stage = this._qs('.hr-stage'), self = this;
    stage.style.width = D.S + 'px'; stage.style.height = D.H + 'px';
    var f = function (x) { return Math.round(x * 10) / 10; };
    var pol = function (r, deg) { var a = deg * Math.PI / 180; return { x: D.cx + r * Math.sin(a), y: D.cy - r * Math.cos(a) }; };
    var svg = '';
    /* the clock */
    var rim = D.wide ? 6 : 4.5, numR = D.numR, numF = D.numF;
    svg += '<circle cx="' + f(D.cx) + '" cy="' + f(D.cy) + '" r="' + f(D.rD) + '" fill="#FFF8E7" stroke="#146B5E" stroke-width="' + rim + '"/>';
    /* the road (or its ring) lies on the face, UNDER the ticks and numerals, so a rolled ring never hides a number */
    var showRoad = this._road() === 'shown' || v.showRoad || st.done;
    svg += this._roadSvg(D, v.s, showRoad);
    for (var m = 0; m < 60; m++) { var a1 = pol(D.rD - rim / 2 - 2, m * 6), a2 = pol(D.rD - rim / 2 - (m % 5 ? 5 : D.tickL), m * 6); svg += '<line x1="' + f(a1.x) + '" y1="' + f(a1.y) + '" x2="' + f(a2.x) + '" y2="' + f(a2.y) + '" stroke="#3A2E1F" stroke-width="' + (m % 5 ? 1.2 : 2.6) + '" stroke-linecap="round"/>'; }
    for (var h = 1; h <= 12; h++) { var q = pol(numR, h * 30); svg += '<text class="hr-num" x="' + f(q.x) + '" y="' + f(q.y) + '" font-size="' + numF + '" text-anchor="middle" dominant-baseline="central">' + h + '</text>'; }
    /* the minutes collars: 00 at the 12, 30 at the 6 (the long hand's two places) */
    var cw = D.wide ? 34 : 28, chh = D.wide ? 20 : 17, cf = D.wide ? 13 : 11.5;
    var lng = ((C.longAngle(Math.round(v.disp)) % 360) + 360) % 360, onTop = Math.abs(v.disp - Math.round(v.disp)) < 1e-6 && lng === 0, onBot = Math.abs(v.disp - Math.round(v.disp)) < 1e-6 && lng === 180;
    svg += '<rect class="hr-collar' + (onTop ? ' is-on' : '') + '" x="' + f(D.cx - cw / 2) + '" y="' + f(D.cy - D.rD - chh - 4) + '" width="' + cw + '" height="' + chh + '" rx="' + chh / 2 + '"/><text class="hr-ctext" x="' + f(D.cx) + '" y="' + f(D.cy - D.rD - chh / 2 - 4) + '" font-size="' + cf + '" text-anchor="middle" dominant-baseline="central">00</text>';
    svg += '<rect class="hr-collar' + (onBot ? ' is-on' : '') + '" x="' + f(D.cx - cw / 2) + '" y="' + f(D.cy + D.rD + 4) + '" width="' + cw + '" height="' + chh + '" rx="' + chh / 2 + '"/><text class="hr-ctext" x="' + f(D.cx) + '" y="' + f(D.cy + D.rD + 4 + chh / 2) + '" font-size="' + cf + '" text-anchor="middle" dominant-baseline="central">30</text>';
    /* the dashed arc of a miss: from where the marker landed to the short hand's tip, along the tip circle */
    if (v.arc) { var A = pol(D.tip, v.arc[0]), B = pol(D.tip, v.arc[1]), sweep = v.arc[1] > v.arc[0] ? 1 : 0, big = Math.abs(v.arc[1] - v.arc[0]) > 180 ? 1 : 0; svg += '<path class="hr-arc" d="M' + f(A.x) + ' ' + f(A.y) + ' A' + f(D.tip) + ' ' + f(D.tip) + ' 0 ' + big + ' ' + sweep + ' ' + f(B.x) + ' ' + f(B.y) + '" fill="none" stroke="#F2784B" stroke-width="' + (D.wide ? 5 : 4) + '" stroke-dasharray="' + (D.wide ? '9 7' : '7 6') + '" stroke-linecap="round"/>'; }
    /* the hands (the long hand turns continuously: one lap per hour = two road half-segments) */
    var sa = C.shortAngle(v.disp), la = 180 * v.disp, st1 = pol(D.tip, sa), lg = pol(D.longR, la);
    svg += '<line x1="' + f(D.cx) + '" y1="' + f(D.cy) + '" x2="' + f(lg.x) + '" y2="' + f(lg.y) + '" stroke="#146B5E" stroke-width="' + (D.wide ? 6 : 4.5) + '" stroke-linecap="round" class="hr-long' + (v.longGlow ? ' is-glow' : '') + '"/>';
    svg += '<line x1="' + f(D.cx) + '" y1="' + f(D.cy) + '" x2="' + f(st1.x) + '" y2="' + f(st1.y) + '" stroke="#F2784B" stroke-width="' + (D.wide ? 12 : 9) + '" stroke-linecap="round"/>';
    svg += '<circle class="hr-tip' + (v.glow ? ' is-glow' : '') + '" cx="' + f(st1.x) + '" cy="' + f(st1.y) + '" r="' + (D.wide ? 7 : 6) + '"/>';
    svg += '<circle cx="' + f(D.cx) + '" cy="' + f(D.cy) + '" r="' + (D.wide ? 8 : 6) + '" fill="#C9A54E" stroke="#8C6A45" stroke-width="2"/>';
    /* the marker: on the road (ring 0) or slid along its ray towards the tip (ring 0…1) */
    if (showRoad) { var mp = this._markerPt(D); svg += this._markerSvg(D, mp.x, mp.y); }
    stage.innerHTML = '<svg class="hr-svg" width="' + f(D.S) + '" height="' + f(D.H) + '" viewBox="0 0 ' + f(D.S) + ' ' + f(D.H) + '" aria-hidden="true" focusable="false">' + svg + '</svg>';
    /* what the clock says, for a screen reader */
    var tg = st.r.target, sr = this.api.el('p', 'hr-sr'); sr.textContent = tg.m ? this._t('aClock30', { h: tg.h, h2: tg.h % 12 + 1 }) : this._t('aClock00', { h: tg.h }); stage.appendChild(sr);
    if (showRoad) { var rl = this.api.el('p', 'hr-sr'); rl.textContent = this._t('aRoad'); stage.appendChild(rl); }
    /* Sprocket, full size, perched on the clock's right shoulder */
    var th = this._pics.farm;
    if (th && typeof LCSPictures !== 'undefined') {
      var im = LCSPictures.img(th, 'rooster', this._loc(), {}); im.alt = ''; im.className = 'hr-rooster' + (v.hop ? ' is-hop' : '');
      var fx = D.cx + 0.819 * D.rD, fy = D.cy - 0.574 * D.rD;
      im.style.width = im.style.height = D.rs + 'px'; im.style.left = (fx - D.rs * 0.45) + 'px'; im.style.top = (fy - D.rs) + 'px';
      stage.appendChild(im);
    }
    /* the marker's handle: a 44 px button, live in free play (after the round is solved) */
    if (showRoad && v.free) {
      var mp2 = this._markerPt(D), mk = this._btn('hr-mk', 'marker', this._t('aMarker'));
      mk.style.left = (mp2.x - 22) + 'px'; mk.style.top = (mp2.y - 22) + 'px';
      mk.addEventListener('pointerdown', function (e) { self._dragMarker(e); });
      mk.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { self._freeTo(HourRoadCore.snap(self._view.mk + (e.key === 'ArrowLeft' ? -1 : 1))); e.preventDefault(); e.stopPropagation(); } });
      stage.appendChild(mk);
    }
  },
  _roadSvg: function (D, s, show) {
    var f = function (x) { return Math.round(x * 10) / 10; }, self = this, N = 96, pts = [];
    for (var i = 0; i <= N; i++) { var p = this._roadPt(D, D.L * i / N, s); pts.push(f(p.x) + ',' + f(p.y)); }
    var bw = D.bandH * (1 - 0.45 * s);   /* the band thins as it rolls, so the ring sits inside the numerals */
    var out = '<polyline points="' + pts.join(' ') + '" fill="none" stroke="#8C6A45" stroke-width="' + f(bw + 5) + '" stroke-linecap="round" stroke-linejoin="round"/>';
    out += '<polyline class="hr-band" points="' + pts.join(' ') + '" fill="none" stroke="#EBD9B4" stroke-width="' + f(bw) + '" stroke-linecap="round" stroke-linejoin="round"/>';
    if (!show) return out;
    var half = this._times() === 'half', sr = (half ? 7 : 5) * (D.wide ? 1 : 0.85), signFade = Math.max(0, 1 - s * 2.5);
    for (var k = 0; k < 12; k++) { var q = this._roadPt(D, D.L * (k + 0.5) / 12, s); out += '<circle class="hr-stone" cx="' + f(q.x) + '" cy="' + f(q.y) + '" r="' + f(sr) + '"/>'; }
    for (var j = 0; j <= 12; j++) {
      var pp = this._roadPt(D, D.L * j / 12, s);
      out += '<circle cx="' + f(pp.x) + '" cy="' + f(pp.y) + '" r="' + (D.wide ? 4 : 3.2) + '" fill="#6B4A2B"/>';
      if (signFade > 0) {
        var top = D.roadTop + D.signR + 1, op = ' opacity="' + f(signFade) + '"';
        out += '<line x1="' + f(pp.x) + '" y1="' + f(top) + '" x2="' + f(pp.x) + '" y2="' + f(pp.y) + '" stroke="#8C6A45" stroke-width="' + (D.wide ? 4 : 3) + '"' + op + '/>';
        out += '<circle cx="' + f(pp.x) + '" cy="' + f(top) + '" r="' + D.signR + '" fill="#FFF8E7" stroke="#8C6A45" stroke-width="2"' + op + '/>';
        out += '<text class="hr-sign" x="' + f(pp.x) + '" y="' + f(top) + '" font-size="' + (D.wide ? 14 : 11.5) + '" text-anchor="middle" dominant-baseline="central"' + op + '>' + (j === 0 ? 12 : j) + '</text>';
      }
    }
    return out;
  },
  _markerPt: function (D) {
    var v = this._view, l = D.L * v.mk / HourRoadCore.T_FULL, onRoad = this._roadPt(D, l, v.s);
    if (!v.ring) return onRoad;
    var a = HourRoadCore.shortAngle(v.mk) * Math.PI / 180, r = D.R + (D.tip - D.R) * v.ring;
    return { x: D.cx + r * Math.sin(a), y: D.cy - r * Math.cos(a) };
  },
  _markerSvg: function (D, x, y) {
    var f = function (n) { return Math.round(n * 10) / 10; }, r = D.wide ? 13 : 10, c = r * 0.42;
    var out = '<g class="hr-marker">';
    out += '<circle cx="' + f(x - c) + '" cy="' + f(y - r * 0.92) + '" r="' + f(r * 0.32) + '" fill="#D9472B"/><circle cx="' + f(x) + '" cy="' + f(y - r * 1.05) + '" r="' + f(r * 0.36) + '" fill="#D9472B"/><circle cx="' + f(x + c) + '" cy="' + f(y - r * 0.92) + '" r="' + f(r * 0.32) + '" fill="#D9472B"/>';
    out += '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + r + '" fill="#F2784B" stroke="#3A2E1F" stroke-width="3"/></g>';
    return out;
  },
  _paintCards: function (D) {
    var C = HourRoadCore, st = this.st, box = this._qs('.hr-cards'), self = this;
    box.innerHTML = '';
    [0, 1, 2].forEach(function (i) {
      var t = C.cardAt(st, i), right = st.done && i === C.rightPlace(st);
      var b = self._btn('hr-card' + (st.chosen === i ? ' is-chosen' : '') + (right ? ' is-right' : ''), 'card-' + i, C.fmt(t));
      b.innerHTML = '<span class="hr-hh">' + t.h + '</span><span class="hr-col">:</span><span class="hr-mm">' + (t.m < 10 ? '0' + t.m : t.m) + '</span>';
      b.disabled = st.done || self._busy;
      b.addEventListener('click', function () { self._choose(i); });
      box.appendChild(b);
    });
  },

  /* ---------------- motion ---------------- */
  _stopAnim: function () { if (this._raf) { cancelAnimationFrame(this._raf); this._raf = 0; } this._steps = null; },
  _reduced: function () { try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; } },
  /* run steps [{ms, fn(p)}] one after another (FAST / reduced motion: each step at its end at once) */
  _run: function (steps, done) {
    var self = this; this._stopAnim();
    if (this.FAST || this._reduced() || typeof requestAnimationFrame === 'undefined') { steps.forEach(function (s) { s.fn(1); }); this._paint(); if (done) done(); return; }
    var i = 0, t0 = 0;
    var tick = function (now) {
      if (!t0) t0 = now;
      var s = steps[i], p = s.ms ? Math.min(1, (now - t0) / s.ms) : 1;
      s.fn(p); self._paint_();
      if (p >= 1) { i++; t0 = 0; if (i >= steps.length) { self._raf = 0; if (done) done(); return; } }
      self._raf = requestAnimationFrame(tick);
    };
    this._raf = requestAnimationFrame(tick);
  },
  _ease: function (p) { return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; },

  /* ---------------- actions ---------------- */
  _choose: function (i) {
    if (this._busy || this.st.done) return;
    if (HourRoadCore.choose(this.st, i) !== 'chosen') return;
    this._stopAnim(); this._resetView(); this.api.sound(440); this._paint();
  },
  _check: function () {
    var C = HourRoadCore, st = this.st, self = this, v = this._view;
    if (this._busy || st.done) return;
    this._stopAnim(); this._resetView(); v = this._view;
    var a = C.check(st);
    if (a.result === 'none') { this.api.sound(200); v.note = this._t('hintNone'); this._paint(); this.api.announce(v.note); return; }
    var tc = a.landing.t, tt = C.roadPos(st.r.target), E = this._ease;
    this._busy = true; v.showRoad = true;
    var steps = [
      { ms: Math.min(1200, 120 * Math.max(1, tc)), fn: function (p) { v.mk = tc * p; } },
      { ms: 900, fn: function (p) { v.s = E(p); } },
      { ms: 300, fn: function (p) { v.ring = p; } }
    ];
    if (a.result === 'ok') {
      steps.push({ ms: 150, fn: function () { v.glow = true; v.hop = true; } });
      steps.push({ ms: 1200, fn: function (p) { var e = E(p); v.disp = tt + e; v.mk = tc + e; } });
      steps.push({ ms: 500, fn: function () {} });
      steps.push({ ms: 0, fn: function () { v.disp = tt; v.mk = tc; v.hop = false; } });
      steps.push({ ms: 600, fn: function (p) { v.ring = 1 - E(Math.min(1, p * 2)); v.s = 1 - E(p); } });
      this._run(steps, function () {
        self._busy = false; v.glow = false; v.ring = 0; v.s = 0; v.free = true; v.ok = self._okText(); self.api.sound(880); self._paint(); self.api.announce(v.ok);
        self._advance(v.ok.length * 60 + 2800);
      });
      return;
    }
    /* a miss: the road stays rolled, a dashed arc measures the distance to the tip */
    this.api.sound(220);
    var miss2 = st.show >= 2, key = C.hint(st).key;
    this._run(steps, function () {
      v.arc = [C.shortAngle(tt) + 15 * a.landing.diff, C.shortAngle(tt)];   /* the short way round (12:30 for 11:30 crosses the 12) */
      v.longGlow = (st.landed.kind === 'minutes' || st.landed.kind === 'halfShort');
      v.note = self._t(key); self._paint(); self.api.announce(v.note);
      if (!miss2) { self._busy = false; self._paint(); return; }
      /* miss 2: the marker walks the ring from the 12 post to the short hand's tip, the long hand turning a lap per post */
      self._run([
        { ms: 0, fn: function () { v.arc = null; v.mk = 0; v.ring = 1; v.disp = 0; } },
        { ms: Math.min(2600, 150 * Math.max(1, tt)), fn: function (p) { v.mk = tt * p; v.disp = tt * p; } }
      ], function () { v.glow = true; self._busy = false; self._paint(); });
    });
  },
  _okText: function () { var t = this.st.r.target; return this._t('okTime', { d: this._digital(t), p: this._phrase(t) }); },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, Math.max(this.OK_MS, this.OK_MS === 4200 ? ms : 0));
  },
  /* free play: the marker drives the clock (one post = one hour = one lap of the long hand) */
  _freeTo: function (p) { var v = this._view; v.mk = p; v.disp = p; this._paint(); if (this.st.done) this._advance(3500); },
  _dragMarker: function (e) {
    var self = this, v = this._view; if (!v.free || (e.button != null && e.button !== 0)) return;
    e.preventDefault();
    var D = this._dims(), R = this._qs('.hr-stage').getBoundingClientRect();
    var at = function (cx) { return Math.max(0, Math.min(HourRoadCore.T_FULL, (cx - R.left - D.x0) / D.L * HourRoadCore.T_FULL)); };
    var move = function (ev) { v.mk = at(ev.clientX); v.disp = v.mk; self._paint_(); };
    var up = function (ev) { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); self._freeTo(HourRoadCore.snap(at(ev.clientX))); };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up);
  },
  _keydown: function () {}
};

var hrCssDone = false;
function injectRoadCSS() {
  if (hrCssDone || typeof document === 'undefined') return;
  hrCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.hr-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;user-select:none;-webkit-user-select:none;} .hr-wrap:focus{outline:none;} .hr-wrap.is-narrow{gap:8px;}'
  + '.hr-stage{position:relative;} .hr-svg{display:block;overflow:visible;}'
  + '.hr-num{font-family:' + H + ';font-weight:700;fill:#3A2E1F;} .hr-sign{font-family:' + H + ';font-weight:800;fill:#3A2E1F;} .hr-ctext{font-family:' + H + ';font-weight:800;fill:#146B5E;}'
  + '.hr-collar{fill:#FFF8E7;stroke:#B98A55;stroke-width:2;} .hr-collar.is-on{fill:#DFF0EA;stroke:#146B5E;stroke-width:3;}'
  + '.hr-stone{fill:#A39D92;stroke:#6F6A62;stroke-width:1.5;} .hr-tip{fill:#F2784B;stroke:#3A2E1F;stroke-width:2;} .hr-tip.is-glow{fill:#F4CF62;stroke:#C9A54E;stroke-width:4;}'
  + '.hr-long.is-glow{stroke:#1E8C78;filter:drop-shadow(0 0 4px #F4CF62);}'
  + '.hr-rooster{position:absolute;display:block;pointer-events:none;transform-origin:50% 100%;} .hr-rooster.is-hop{animation:hrHop .45s ease-out 2;} @keyframes hrHop{40%{transform:translateY(-14px) rotate(-4deg);}}'
  + '.hr-wrap.is-fast .hr-rooster{animation:none !important;}'
  + '.hr-mk{position:absolute;width:44px;height:44px;border:0;border-radius:50%;background:transparent;padding:0;cursor:grab;touch-action:none;z-index:3;} .hr-mk:focus-visible{outline:3px solid #146B5E;outline-offset:2px;}'
  + '.hr-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;margin:0;}'
  + '.hr-cards{display:flex;gap:12px;justify-content:center;width:100%;max-width:600px;} .hr-wrap.is-narrow .hr-cards{gap:8px;}'
  + '.hr-card{flex:1 1 0;max-width:180px;height:84px;border:0;border-radius:14px;background:#3A2E1F;box-shadow:0 4px 0 #1F1810;padding:6px;display:flex;align-items:center;justify-content:center;gap:2px;cursor:pointer;transition:transform .08s;font-family:' + H + ';font-weight:800;font-size:40px;line-height:1;}'
  + '.hr-wrap.is-narrow .hr-card{height:62px;font-size:28px;border-radius:12px;padding:4px;}'
  + '.hr-wrap.is-tiny{gap:6px;} .hr-wrap.is-tiny .hr-cards{gap:6px;} .hr-wrap.is-tiny .hr-card{height:56px;font-size:24px;padding:3px;gap:1px;} .hr-wrap.is-tiny .hr-hh,.hr-wrap.is-tiny .hr-mm{min-width:1.15em;padding:0 .06em;border-radius:6px;}'
  + '.hr-hh,.hr-mm{display:inline-flex;align-items:center;justify-content:center;min-width:1.25em;height:1.35em;padding:0 .12em;border-radius:8px;} .hr-hh{background:#FBE3D6;color:#7A2E12;} .hr-mm{background:#DFF0EA;color:#0F4A40;} .hr-col{color:#FFF8E7;}'
  + '.hr-card.is-chosen{transform:translateY(-4px);box-shadow:0 0 0 4px #146B5E,0 6px 0 #1F1810;} .hr-card.is-right{box-shadow:0 0 0 4px #F4CF62,0 4px 0 #1F1810;} .hr-card:disabled{cursor:default;} .hr-card:focus-visible{outline:3px solid #F4CF62;outline-offset:3px;}'
  + '.hr-foot{display:flex;align-items:center;justify-content:center;gap:12px;} .hr-check{min-width:150px;min-height:54px;padding:0 26px;border:0;border-radius:16px;background:#1E8C78;color:#fff;font-family:' + H + ';font-weight:800;font-size:22px;cursor:pointer;box-shadow:0 4px 0 #0E5E50;} .hr-check:disabled{opacity:.5;cursor:default;}'
  + '.hr-readout{font-family:' + H + ';font-weight:800;font-size:26px;color:#0F4A40;background:#DFF0EA;border-radius:10px;padding:4px 12px;}'
  + '.hr-note{margin:0;min-height:1.3em;max-width:560px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .hr-note.is-hint{color:#8A3B1F;} .hr-wrap.is-narrow .hr-note{font-size:17px;}'
  + '.hr-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var s = document.createElement('style'); s.id = 'hr-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.HourRoadActivity = HourRoadActivity;
