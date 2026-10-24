/* =====================================================================
   ten-band-activity.js — ACTIVITY #94 of the one-by-one rebuild: "Bundle
   Bot — Make a Ten from Ten Ones" → THE TEN-POCKET BAND (1.NBT.B.2.a,
   11 locales). Design: docs/activities-rebuild/designs/094-bundle-bot.md
   ---------------------------------------------------------------------
   THE INVENTION: the lever wraps a band with exactly ten pockets around the
   loose cubes — ten clasps into one neat ten (CLUNK, onto the rack); fewer
   leaves an empty pocket and the band springs open; more and the extras are
   squeezed back out. A ten carried back to the plate is snipped open into
   ten loose cubes, and Bolt's count proves the number did not change.
   ACTIVITY LAYER ONLY: the model is ten-band-core.js; Bolt is the library
   picture toys/robot via lcs-pictures.js; the machine, the cubes, the band
   and the rack are drawn apparatus; lcs-shell.js untouched (the shell's
   Check is hidden and pressed by this activity when the round is right).
   Test seams: window.TenBandActivity.st / ._pool / ._order / ._ensurePool
   / .FAST / .OK_MS.
   ===================================================================== */
'use strict';

var TenBandActivity = {
  id: 'ten-band',
  apparatusClasses: ['tbd-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble: {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:       {en:'Bundle Bot',de:'Bündel-Bolt',nl:'Bundel-Bolt',da:'Bolts bundtemaskine',sv:'Bults buntmaskin',no:'Bolts buntemaskin',es:'Bolt agrupa decenas',it:'Bolt raggruppa le decine',pt:'Bolt agrupa dezenas',fr:'Bolt fait des dizaines',fi:'Boltin nippukone'},
    pBuild:      {en:'Make {n}.',de:'Bau die {n}.',nl:'Maak {n}.',da:'Lav {n}.',sv:'Bygg {n}.',no:'Lag {n}.',es:'Forma el {n}.',it:'Forma il numero {n}.',pt:'Forme o {n}.',fr:'Construis {n}.',fi:'Rakenna luku {n}.'},
    pUnbundle:   {en:'Bolt needs exactly {k} loose cubes. Keep the number {n}.',de:'Bolt braucht genau {k} einzelne Würfel. Die Zahl {n} soll bleiben.',nl:'Bolt heeft precies {k} losse blokjes nodig. Het getal {n} moet hetzelfde blijven.',da:'Bolt skal bruge præcis {k} løse klodser. Tallet {n} skal være det samme.',sv:'Bult behöver exakt {k} lösa klossar. Talet ska fortfarande vara {n}.',no:'Bolt trenger nøyaktig {k} løse klosser. Tallet {n} skal være det samme.',es:'Bolt necesita exactamente {k} cubos sueltos. El número {n} no debe cambiar.',it:'Bolt ha bisogno di esattamente {k} cubetti sfusi. Il numero {n} deve restare uguale.',pt:'Bolt precisa de exatamente {k} cubinhos soltos. O número {n} não pode mudar.',fr:'Bolt a besoin d’exactement {k} cubes isolés. Le nombre {n} ne doit pas changer.',fi:'Bolt tarvitsee tasan {k} irrallista kuutiota. Luvun {n} pitää pysyä samana.'},
    pRead:       {en:'How many cubes?',de:'Wie viele Würfel sind es?',nl:'Hoeveel blokjes zijn het?',da:'Hvor mange klodser er der?',sv:'Hur många klossar är det?',no:'Hvor mange klosser er det?',es:'¿Cuántos cubos hay?',it:'Quanti cubetti ci sono?',pt:'Quantos cubinhos há?',fr:'Combien y a-t-il de cubes ?',fi:'Montako kuutiota on?'},
    pTens:       {en:'Bundle every ten you can. Then fill in the tens and the ones.',de:'Bündle so viele Zehner wie möglich. Trag dann die Zehner und Einer ein.',nl:'Bundel zoveel tientallen als je kunt. Vul dan de tientallen en eenheden in.',da:'Bundt så mange tiere, som du kan. Skriv så tierne og enerne.',sv:'Bunta ihop så många tiotal du kan. Skriv sedan tiotalen och entalen.',no:'Bunt sammen så mange tiere du kan. Skriv så tierne og enerne.',es:'Agrupa todas las decenas que puedas. Luego anota las decenas y las unidades.',it:'Raggruppa tutte le decine che puoi. Poi scrivi le decine e le unità.',pt:'Agrupe todas as dezenas que puder. Depois escreva as dezenas e as unidades.',fr:'Fais toutes les dizaines possibles. Puis écris les dizaines et les unités.',fi:'Niputa niin monta kymppiä kuin voit. Kirjoita sitten kympit ja ykköset.'},
    headTens:    {en:'Tens',de:'Zehner',nl:'Tientallen',da:'Tiere',sv:'Tiotal',no:'Tiere',es:'Decenas',it:'Decine',pt:'Dezenas',fr:'Dizaines',fi:'Kympit'},
    headOnes:    {en:'Ones',de:'Einer',nl:'Eenheden',da:'Enere',sv:'Ental',no:'Enere',es:'Unidades',it:'Unità',pt:'Unidades',fr:'Unités',fi:'Ykköset'},
    hintStart:   {en:'Tap the hopper to get some cubes.',de:'Tipp auf den Trichter, dann kommen Würfel.',nl:'Tik op de trechter, dan komen er blokjes.',da:'Tryk på tragten for at få klodser.',sv:'Tryck på tratten så kommer det klossar.',no:'Trykk på trakten for å få klosser.',es:'Toca el embudo para que salgan cubos.',it:'Tocca l’imbuto per far uscire i cubetti.',pt:'Toque no funil para saírem cubinhos.',fr:'Touche l’entonnoir pour faire sortir des cubes.',fi:'Napauta suppiloa, niin saat kuutioita.'},
    hintType:    {en:'Type how many cubes.',de:'Tipp ein, wie viele Würfel es sind.',nl:'Typ hoeveel blokjes het zijn.',da:'Skriv, hvor mange klodser der er.',sv:'Skriv hur många klossar det är.',no:'Skriv hvor mange klosser det er.',es:'Escribe cuántos cubos hay.',it:'Scrivi quanti cubetti ci sono.',pt:'Digite quantos cubinhos há.',fr:'Tape combien il y a de cubes.',fi:'Kirjoita, montako kuutiota on.'},
    hintSlots:   {en:'Fill in the tens and the ones.',de:'Trag die Zehner und die Einer ein.',nl:'Vul de tientallen en de eenheden in.',da:'Skriv tierne og enerne.',sv:'Skriv tiotalen och entalen.',no:'Skriv tierne og enerne.',es:'Anota las decenas y las unidades.',it:'Scrivi le decine e le unità.',pt:'Escreva as dezenas e as unidades.',fr:'Écris les dizaines et les unités.',fi:'Kirjoita kympit ja ykköset.'},
    hintHiding:  {en:'Ten loose cubes are hiding — bundle them!',de:'Da verstecken sich zehn einzelne Würfel – bündle sie!',nl:'Er verstoppen zich tien losse blokjes — bundel ze!',da:'Ti løse klodser gemmer sig – bundt dem!',sv:'Tio lösa klossar gömmer sig – bunta ihop dem!',no:'Ti løse klosser gjemmer seg – bunt dem sammen!',es:'Hay diez cubos sueltos escondidos: ¡agrúpalos!',it:'Ci sono dieci cubetti sfusi nascosti: raggruppali!',pt:'Tem dez cubinhos soltos escondidos: agrupe-os!',fr:'Dix cubes isolés se cachent : fais-en une dizaine !',fi:'Kymmenen irrallista kuutiota piileskelee – niputa ne!'},
    hintCount:   {en:'Count Bolt’s tens: 10, 20, 30 … then the loose cubes.',de:'Zähl Bolts Zehner: 10, 20, 30 … dann die einzelnen Würfel.',nl:'Tel Bolts tientallen: 10, 20, 30 … en dan de losse blokjes.',da:'Tæl Bolts tiere: 10, 20, 30 … og så de løse klodser.',sv:'Räkna Bults tiotal: 10, 20, 30 … och sedan de lösa klossarna.',no:'Tell Bolts tiere: 10, 20, 30 … og så de løse klossene.',es:'Cuenta las decenas de Bolt: 10, 20, 30… y luego los cubos sueltos.',it:'Conta le decine di Bolt: 10, 20, 30 … poi i cubetti sfusi.',pt:'Conte as dezenas do Bolt: 10, 20, 30 … e depois os cubinhos soltos.',fr:'Compte les dizaines de Bolt : 10, 20, 30… puis les cubes isolés.',fi:'Laske Boltin kympit: 10, 20, 30 … ja sitten irralliset kuutiot.'},
    hintImpostor:{en:'Is that really ten? Pull the lever and see.',de:'Sind das wirklich zehn? Zieh am Hebel und schau.',nl:'Zijn dat er echt tien? Trek aan de hendel en kijk.',da:'Er det virkelig ti? Træk i håndtaget og se.',sv:'Är det verkligen tio? Dra i spaken och se.',no:'Er det virkelig ti? Dra i spaken og se.',es:'¿De verdad son diez? Jala la palanca y mira.',it:'Sono davvero dieci? Tira la leva e guarda.',pt:'São mesmo dez? Puxe a alavanca e veja.',fr:'Est-ce vraiment dix ? Tire le levier et regarde.',fi:'Onko niitä varmasti kymmenen? Vedä vivusta ja katso.'},
    hintSnip:    {en:'Snip one ten to get ten more loose cubes.',de:'Mach einen Zehner auf, dann hast du zehn einzelne Würfel mehr.',nl:'Knip één tiental open, dan heb je tien losse blokjes meer.',da:'Klip en tier op, så får du ti løse klodser mere.',sv:'Klipp upp ett tiotal, så får du tio lösa klossar till.',no:'Klipp opp en tier, så får du ti løse klosser til.',es:'Abre una decena y tendrás diez cubos sueltos más.',it:'Apri una decina e avrai dieci cubetti sfusi in più.',pt:'Abra uma dezena para ter mais dez cubinhos soltos.',fr:'Ouvre une dizaine pour avoir dix cubes isolés de plus.',fi:'Avaa yksi kymppi, niin saat kymmenen irrallista kuutiota lisää.'},
    hintTensByTens:{en:'Each ten is ten cubes. Count the tens by tens.',de:'Jeder Zehner hat zehn Würfel. Zähl die Zehner in Zehnerschritten.',nl:'Elk tiental is tien blokjes. Tel de tientallen met sprongen van tien.',da:'Hver tier er ti klodser. Tæl tierne ti ad gangen.',sv:'Varje tiotal är tio klossar. Räkna tiotalen tio i taget.',no:'Hver tier er ti klosser. Tell tierne ti om gangen.',es:'Cada decena son diez cubos. Cuenta las decenas de diez en diez.',it:'Ogni decina è fatta di dieci cubetti. Conta le decine di dieci in dieci.',pt:'Cada dezena tem dez cubinhos. Conte as dezenas de dez em dez.',fr:'Chaque dizaine, c’est dix cubes. Compte les dizaines de dix en dix.',fi:'Jokaisessa kympissä on kymmenen kuutiota. Laske kympit kymmenittäin: 10, 20, 30.'},
    hintStrong:  {en:'Count the tens by tens, then add the loose cubes.',de:'Zähl die Zehner in Zehnerschritten und nimm dann die einzelnen Würfel dazu.',nl:'Tel de tientallen met sprongen van tien en tel er dan de losse blokjes bij.',da:'Tæl tierne ti ad gangen, og læg så de løse klodser til.',sv:'Räkna tiotalen tio i taget och lägg sedan till de lösa klossarna.',no:'Tell tierne ti om gangen, og legg så til de løse klossene.',es:'Cuenta las decenas de diez en diez y luego suma los cubos sueltos.',it:'Conta le decine di dieci in dieci, poi aggiungi i cubetti sfusi.',pt:'Conte as dezenas de dez em dez e depois junte os cubinhos soltos.',fr:'Compte les dizaines de dix en dix, puis ajoute les cubes isolés.',fi:'Laske kympit kymmenittäin ja lisää sitten irralliset kuutiot.'},
    okBuild:     {en:'{t} tens and {o} ones make {n}!',de:'{t} Zehner und {o} Einer sind {n}!',nl:'{t} tientallen en {o} eenheden zijn samen {n}!',da:'{t} tiere og {o} enere giver {n}!',sv:'{t} tiotal och {o} ental blir {n}!',no:'{t} tiere og {o} enere blir {n}!',es:'{t} decenas y {o} unidades son {n}.',it:'{t} decine e {o} unità fanno {n}!',pt:'{t} dezenas e {o} unidades são {n}!',fr:'{t} dizaines et {o} unités, ça fait {n} !',fi:'{t} kymppiä ja {o} ykköstä on {n}!'},
    okBuildO1:   {en:'{t} tens and 1 one make {n}!',de:'{t} Zehner und 1 Einer sind {n}!',nl:'{t} tientallen en 1 eenheid zijn samen {n}!',da:'{t} tiere og 1 ener giver {n}!',sv:'{t} tiotal och 1 ental blir {n}!',no:'{t} tiere og 1 ener blir {n}!',es:'{t} decenas y 1 unidad son {n}.',it:'{t} decine e 1 unità fanno {n}!',pt:'{t} dezenas e 1 unidade são {n}!',fr:'{t} dizaines et 1 unité, ça fait {n} !',fi:'{t} kymppiä ja 1 ykkönen on {n}!'},
    okDecade:    {en:'{t} tens and no ones make {n}!',de:'{t} Zehner und keine Einer sind {n}!',nl:'{t} tientallen en geen eenheden zijn samen {n}!',da:'{t} tiere og ingen enere giver {n}!',sv:'{t} tiotal och inga ental blir {n}!',no:'{t} tiere og ingen enere blir {n}!',es:'{t} decenas y ninguna unidad son {n}.',it:'{t} decine e nessuna unità fanno {n}!',pt:'{t} dezenas e nenhuma unidade são {n}!',fr:'{t} dizaines et aucune unité, ça fait {n} !',fi:'{t} kymppiä ilman ykkösiä on {n}!'},
    okUnbundle:  {en:'Still {n}: {t} tens and {o} ones!',de:'Immer noch {n}: {t} Zehner und {o} Einer!',nl:'Nog steeds {n}: {t} tientallen en {o} eenheden!',da:'Stadig {n}: {t} tiere og {o} enere!',sv:'Fortfarande {n}: {t} tiotal och {o} ental!',no:'Fortsatt {n}: {t} tiere og {o} enere!',es:'Sigue siendo {n}: {t} decenas y {o} unidades.',it:'Sempre {n}: {t} decine e {o} unità!',pt:'Continua sendo {n}: {t} dezenas e {o} unidades!',fr:'Toujours {n} : {t} dizaines et {o} unités !',fi:'Yhä {n}: {t} kymppiä ja {o} ykköstä!'},
    okRead:      {en:'{t} tens and {o} ones — {n} cubes!',de:'{t} Zehner und {o} Einer – {n} Würfel!',nl:'{t} tientallen en {o} eenheden — {n} blokjes!',da:'{t} tiere og {o} enere – {n} klodser!',sv:'{t} tiotal och {o} ental – {n} klossar!',no:'{t} tiere og {o} enere – {n} klosser!',es:'{t} decenas y {o} unidades: {n} cubos.',it:'{t} decine e {o} unità: {n} cubetti!',pt:'{t} dezenas e {o} unidades: {n} cubinhos!',fr:'{t} dizaines et {o} unités : {n} cubes !',fi:'{t} kymppiä ja {o} ykköstä – {n} kuutiota!'},
    okRead1:     {en:'1 ten and {o} ones — {n} cubes!',de:'1 Zehner und {o} Einer – {n} Würfel!',nl:'1 tiental en {o} eenheden — {n} blokjes!',da:'1 tier og {o} enere – {n} klodser!',sv:'1 tiotal och {o} ental – {n} klossar!',no:'1 tier og {o} enere – {n} klosser!',es:'1 decena y {o} unidades: {n} cubos.',it:'1 decina e {o} unità: {n} cubetti!',pt:'1 dezena e {o} unidades: {n} cubinhos!',fr:'1 dizaine et {o} unités : {n} cubes !',fi:'1 kymppi ja {o} ykköstä – {n} kuutiota!'},
    check:       {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Comprobar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    setNumbers:  {en:'Numbers',de:'Zahlen',nl:'Getallen',da:'Tal',sv:'Tal',no:'Tall',es:'Números',it:'Numeri',pt:'Números',fr:'Nombres',fi:'Luvut'},
    r49:         {en:'To 49',de:'Bis 49',nl:'Tot 49',da:'Op til 49',sv:'Upp till 49',no:'Til 49',es:'Hasta 49',it:'Fino a 49',pt:'Até 49',fr:'Jusqu’à 49',fi:'49 asti'},
    r99:         {en:'To 99',de:'Bis 99',nl:'Tot 99',da:'Op til 99',sv:'Upp till 99',no:'Til 99',es:'Hasta 99',it:'Fino a 99',pt:'Até 99',fr:'Jusqu’à 99',fi:'99 asti'},
    setGaps:     {en:'When the band can’t close',de:'Wenn das Band nicht zugeht',nl:'Als de band niet dicht kan',da:'Når båndet ikke kan lukke sig',sv:'När bandet inte går ihop',no:'Når båndet ikke går igjen',es:'Si la banda no cierra',it:'Se la fascia non si chiude',pt:'Quando a faixa não fecha',fr:'Quand la bande ne ferme pas',fi:'Kun nauha ei mene kiinni'},
    gShow:       {en:'Show the empty pockets',de:'Leere Fächer zeigen',nl:'Lege vakjes laten zien',da:'Vis de tomme lommer',sv:'Visa de tomma fickorna',no:'Vis de tomme lommene',es:'Mostrar los huecos vacíos',it:'Mostra le tasche vuote',pt:'Mostrar os bolsos vazios',fr:'Montrer les cases vides',fi:'Näytä tyhjät taskut'},
    gSpring:     {en:'Just spring open',de:'Einfach aufspringen',nl:'Gewoon openspringen',da:'Bare spring op',sv:'Bara hoppa upp',no:'Bare sprett opp',es:'Solo abrirse de golpe',it:'Aprirsi e basta',pt:'Só abrir de uma vez',fr:'S’ouvrir d’un coup',fi:'Nauha vain ponnahtaa auki'},
    ariaPlate:   {en:'Press plate, loose cubes: {k}',de:'Pressplatte, einzelne Würfel: {k}',nl:'Persplaat, losse blokjes: {k}',da:'Presseplade, løse klodser: {k}',sv:'Pressplatta, lösa klossar: {k}',no:'Presseplate, løse klosser: {k}',es:'Placa de la prensa, cubos sueltos: {k}',it:'Piastra della pressa, cubetti sfusi: {k}',pt:'Placa da prensa, cubinhos soltos: {k}',fr:'Plateau de la presse, cubes isolés : {k}',fi:'Puristuslevy, irrallisia kuutioita: {k}'},
    ariaRack:    {en:'Tens on the rack: {t}',de:'Zehner im Regal: {t}',nl:'Tientallen in het rek: {t}',da:'Tiere på stativet: {t}',sv:'Tiotal på hyllan: {t}',no:'Tiere på stativet: {t}',es:'Decenas en el estante: {t}',it:'Decine sulla rastrelliera: {t}',pt:'Dezenas na estante: {t}',fr:'Dizaines sur le présentoir : {t}',fi:'Kympit telineessä: {t}'},
    ariaLever:   {en:'Lever: pull to bundle',de:'Hebel: ziehen zum Bündeln',nl:'Hendel: trek om te bundelen',da:'Håndtag: træk for at bundte',sv:'Spak: dra för att bunta ihop',no:'Spak: dra for å bunte',es:'Palanca: jala para agrupar',it:'Leva: tira per raggruppare',pt:'Alavanca: puxe para agrupar',fr:'Levier : tire pour grouper',fi:'Vipu: vedä niputtaaksesi'},
    ariaTen:     {en:'Ten {i}',de:'Zehner {i}',nl:'Tiental {i}',da:'Tier {i}',sv:'Tiotal {i}',no:'Tier {i}',es:'Decena {i}',it:'Decina {i}',pt:'Dezena {i}',fr:'Dizaine {i}',fi:'Kymppi {i}'},
    ariaSnip:    {en:'Open a ten into ten loose cubes',de:'Einen Zehner in zehn einzelne Würfel aufmachen',nl:'Een tiental openen in tien losse blokjes',da:'Åbn en tier til ti løse klodser',sv:'Öppna ett tiotal till tio lösa klossar',no:'Åpne en tier til ti løse klosser',es:'Abrir una decena en diez cubos sueltos',it:'Aprire una decina in dieci cubetti sfusi',pt:'Abrir uma dezena em dez cubinhos soltos',fr:'Ouvrir une dizaine en dix cubes isolés',fi:'Avaa kymppi kymmeneksi irralliseksi kuutioksi'},
    ariaHopper:  {en:'Hopper: tap for cubes',de:'Trichter: antippen für Würfel',nl:'Trechter: tik voor blokjes',da:'Tragt: tryk for klodser',sv:'Tratt: tryck för klossar',no:'Trakt: trykk for klosser',es:'Embudo: toca para que salgan cubos',it:'Imbuto: tocca per i cubetti',pt:'Funil: toque para saírem cubinhos',fr:'Entonnoir : touche pour faire sortir des cubes',fi:'Suppilo: napauta, niin tulee kuutioita'},
    ariaTakeOut: {en:'Take one out',de:'Einen herausnehmen',nl:'Eén eruit halen',da:'Tag én ud',sv:'Ta ut en',no:'Ta ut én',es:'Quitar uno',it:'Togline uno',pt:'Tirar um',fr:'En enlever un',fi:'Ota yksi pois'},
    ariaDel:     {en:'Delete',de:'Löschen',nl:'Wissen',da:'Slet',sv:'Radera',no:'Slett',es:'Borrar',it:'Cancella',pt:'Apagar',fr:'Effacer',fi:'Poista'},
    ariaSlotT:   {en:'Tens: {d}',de:'Zehner: {d}',nl:'Tientallen: {d}',da:'Tiere: {d}',sv:'Tiotal: {d}',no:'Tiere: {d}',es:'Decenas: {d}',it:'Decine: {d}',pt:'Dezenas: {d}',fr:'Dizaines : {d}',fi:'Kympit: {d}'},
    ariaSlotO:   {en:'Ones: {d}',de:'Einer: {d}',nl:'Eenheden: {d}',da:'Enere: {d}',sv:'Ental: {d}',no:'Enere: {d}',es:'Unidades: {d}',it:'Unità: {d}',pt:'Unidades: {d}',fr:'Unités : {d}',fi:'Ykköset: {d}'}
  },/*STRINGS-END*/

  defaults: { numbers: '49', gaps: 'show' },
  settings: [
    { key: 'numbers', type: 'choice', labelKey: 'setNumbers', options: [{ value: '49', labelKey: 'r49' }, { value: '99', labelKey: 'r99' }] },
    { key: 'gaps', type: 'choice', labelKey: 'setGaps', options: [{ value: 'show', labelKey: 'gShow' }, { value: 'spring', labelKey: 'gSpring' }] }
  ],
  OK_MS: 4200, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._pos = 0;
    this._timers = []; this._ro = null; this._view = {}; this._pics = {}; this._sel = null; this._slot = 't';
    injectBandCSS();
    var self = this;
    if (typeof LCSPictures !== 'undefined') LCSPictures.load('toys').then(function (th) { self._pics.toys = th; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () {});
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
  _loc: function () { return TenBandCore.locale(((this.api && this.api.lang) || 'en')); },
  _range: function () { return TenBandCore.rangeOf(this._setting('numbers')); },
  _gaps: function () { return TenBandCore.gapsOf(this._setting('gaps')); },
  _key: function () { return this._range(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = TenBandCore.ids(this._range()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = TenBandCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.slice();
      this._order = C.plan(this._range(), Math.random, prev).order; this._orderForPool = pool; this._pass = pass;
    }
    var idx = this._order[pos], pa = { msg: this._promptText(C.round(this._range(), idx)) }; this._pa = pa;
    return {
      id: 'tenband.' + this._loc() + '.' + this._key() + '.' + idx, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(idx, pos); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _promptText: function (r) {
    if (r.type === 'unbundle') return this._t('pUnbundle', { k: r.extra, n: r.n });
    if (r.type === 'read') return this._t('pRead');
    if (r.type === 'tens') return this._t('pTens');
    return this._t('pBuild', { n: r.n });
  },
  _start: function (idx, pos) {
    var C = TenBandCore;
    this._clearTimers(); this._view = {}; this._pos = pos || 0; this._sel = null; this._busy = false; this._slot = 't';
    this.st = C.newState(C.round(this._range(), idx), Math.random);
    var line = this._promptText(this.st.r); if (this._pa) this._pa.msg = line;
    var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line;
  },

  /* ---------------- render ---------------- */
  render: function () {
    this._ensurePool();
    if (!this.st) this._start(0, 0);
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
    var wrap = api.el('div', 'tbd-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="tbd-top"></div><div class="tbd-machine"><div class="tbd-platecol"></div><div class="tbd-rack" role="group"></div></div><div class="tbd-controls"></div><div class="tbd-pad" role="group"></div><div class="tbd-foot"></div><p class="tbd-note" aria-live="polite"></p>';
    wrap.addEventListener('keydown', function (e) { self._keydown(e); });
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
  _btn: function (cls, k, label, text) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (text != null) b.textContent = text; return b; },
  _paint_: function () {
    if (!this._wrap) return;
    var C = TenBandCore, st = this.st, r = st.r, W = this._width(), L = C.layout(W), v = this._view, self = this, i;
    var shown = !!(v.checked && (st.show > 0 || st.done)), strong = st.show >= 2 && !st.done, kind = st.last && st.last.reason;
    this._wrap.className = 'tbd-wrap ' + (L.wide ? 'is-wide' : 'is-narrow') + (L.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '');
    /* ---- the top: the order card, Bolt, the hopper ---- */
    var top = this._q('.tbd-top'); top.innerHTML = '';
    var card = this.api.el('div', 'tbd-card' + (strong && r.type !== 'read' && r.type !== 'tens' && r.type !== 'unbundle' ? ' is-split' : ''));
    if (r.type === 'read') { card.innerHTML = '<span class="tbd-typed">' + (st.typed || '?') + '</span>'; }
    else if (r.type === 'tens') {
      ['t', 'o'].forEach(function (w) {
        var sb = self._btn('tbd-slot' + (self._slot === w && !st.done ? ' is-on' : ''), 'slot-' + w, self._t(w === 't' ? 'ariaSlotT' : 'ariaSlotO', { d: st.slots[w] || '' }));
        sb.innerHTML = '<span class="tbd-slothead">' + self._t(w === 't' ? 'headTens' : 'headOnes') + '</span><span class="tbd-slotval">' + (st.slots[w] === '' ? '' : st.slots[w]) + '</span>';
        sb.disabled = st.done; sb.addEventListener('click', function () { self._slot = w; self._paint(); }); card.appendChild(sb);
      });
    } else card.innerHTML = '<span class="tbd-dt">' + r.t + '</span><span class="tbd-do">' + r.o + '</span>';
    top.appendChild(card);
    var bot = this.api.el('span', 'tbd-bot'); var th = this._pics.toys, size = L.wide ? 120 : 72;
    if (th && typeof LCSPictures !== 'undefined') { var im = LCSPictures.img(th, C.DATA.BOT[1], this._loc(), { size: size }); im.className = 'tbd-botpic'; im.alt = ''; im.style.width = im.style.height = size + 'px'; bot.appendChild(im); }
    bot.style.width = bot.style.height = size + 'px'; if (st.done) bot.className += ' is-spin'; top.appendChild(bot);
    var hop = this._btn('tbd-hopper', 'hopper', this._t('ariaHopper')); hop.innerHTML = '<svg viewBox="0 0 80 72" aria-hidden="true"><path d="M6 6 H74 L50 46 V66 H30 V46 Z" class="tbd-funnel"/></svg>';
    hop.disabled = st.done || r.material || !!this._busy; hop.addEventListener('click', function () { self._hopper(); }); top.appendChild(hop);
    /* ---- the plate ---- */
    var col = this._q('.tbd-platecol'); col.innerHTML = '';
    var plate = this.api.el('div', 'tbd-plate'); plate.setAttribute('data-k', 'plate'); plate.setAttribute('role', 'img'); plate.setAttribute('aria-label', this._t('ariaPlate', { k: st.plate.length }));
    var bigTens = r.type === 'tens' && st.plate.length >= 10;   /* tens round, unbundled: numbering 1..n would print the total, so show the first ten instead */
    var hiding = shown && (kind === 'tenHiding' || (bigTens && strong)) ? C.bandOrder(st.plate).slice(0, 10) : [], num = shown && !bigTens && (strong || kind === 'onesWrong' || (r.type === 'read' && st.show >= 2)), order = num ? C.bandOrder(st.plate) : null;
    st.plate.forEach(function (c, k) {
      var cu = document.createElement('span'); cu.className = 'tbd-cube' + (hiding.indexOf(k) >= 0 ? ' is-hiding' : '') + (v.band && v.band.taken && v.band.taken.indexOf(k) >= 0 ? ' is-in' : '');
      cu.style.left = (4 + 92 * (c.c % C.COLS + 0.5 + c.jx) / C.COLS) + '%'; cu.style.top = (6 + 88 * (Math.floor(c.c / C.COLS) + 0.5 + c.jy) / C.ROWS) + '%';   /* inside the plate's rim */
      if (num) { var nb = document.createElement('i'); nb.textContent = String(order.indexOf(k) + 1); cu.appendChild(nb); }
      plate.appendChild(cu);
    });
    col.appendChild(plate);
    /* the band, after a pull: ten pockets over the plate */
    if (v.band) {
      var band = this.api.el('div', 'tbd-band is-' + v.band.result);
      for (i = 0; i < 10; i++) { var pk = document.createElement('span'); var filled = v.band.result === 'clunk' || i < v.band.filled; pk.className = 'tbd-pocket' + (filled ? ' is-full' : (this._gaps() === 'show' ? ' is-empty' : ' is-blank')); band.appendChild(pk); }
      col.appendChild(band);
    }
    /* ---- the rack ---- */
    var rack = this._q('.tbd-rack'); rack.innerHTML = ''; rack.className = 'tbd-rack' + (r.cap > 5 && !L.wide ? ' is-two' : ''); rack.setAttribute('aria-label', this._t('ariaRack', { t: st.rack }));
    var goal = C.goal(r), labels = shown && (r.type !== 'unbundle' || strong);
    for (i = 0; i < r.cap; i++) (function (i) {
      var has = i < st.rack;
      if (has) {
        var rod = self.api.el('span', 'tbd-rod' + (shown && !st.done && r.type !== 'read' && i >= goal.rack ? ' is-extra' : '') + (shown && r.type === 'unbundle' && !st.done && i === st.rack - 1 ? ' is-snipme' : '')); rod.setAttribute('data-k', 'ten-' + i); rod.setAttribute('role', 'img'); rod.setAttribute('aria-label', self._t('ariaTen', { i: i + 1 }));
        for (var k = 0; k < 10; k++) { var rc = document.createElement('span'); rc.className = 'tbd-rcube'; rod.appendChild(rc); }
        var clasp = document.createElement('span'); clasp.className = 'tbd-clasp'; rod.appendChild(clasp);
        if (labels) { var lb = document.createElement('i'); lb.className = 'tbd-rlabel'; lb.textContent = r.type === 'read' && st.show < 2 ? '10' : String(10 * (i + 1)); rod.appendChild(lb); }
        rack.appendChild(rod);
      } else {
        var slot = self.api.el('span', 'tbd-rodslot' + (shown && !st.done && r.type !== 'read' && r.type !== 'unbundle' && i < goal.rack ? ' is-missing' : '')); rack.appendChild(slot);
      }
    })(i);
    /* ---- the controls: take one out, the lever ---- */
    var ctr = this._q('.tbd-controls'); ctr.innerHTML = '';
    if (!r.material) { var out = this._btn('tbd-out', 'takeout', this._t('ariaTakeOut'), '−'); out.disabled = st.done || !st.plate.length || !!this._busy; out.addEventListener('click', function () { self._takeOut(); }); ctr.appendChild(out); }
    /* a read round reads the board as it is (the success line names it): no lever, no snip */
    if (r.type === 'read') ctr.style.display = 'none'; else { ctr.style.display = '';
    var lev = this._btn('tbd-lever' + (v.stiff ? ' is-stiff' : '') + (v.pulled ? ' is-down' : ''), 'lever', this._t('ariaLever'));
    lev.innerHTML = '<span class="tbd-arm"></span><span class="tbd-knob"></span>';
    lev.disabled = st.done || !!this._busy; lev.addEventListener('click', function () { self._pull(); }); ctr.appendChild(lev);
    /* the snip: the last ten rides back under the press and the same ten-pocket band lets its ten cubes go (every ten is the same, so the last one is carried) */
    var sn = this._btn('tbd-snipbtn', 'snip', this._t('ariaSnip'), '✂'); sn.disabled = st.done || st.rack < 1 || !!this._busy; sn.addEventListener('click', function () { self._snip(); }); ctr.appendChild(sn); }
    /* ---- the keypad (read, tens) ---- */
    var pad = this._q('.tbd-pad'); pad.innerHTML = ''; pad.style.display = (r.type === 'read' || r.type === 'tens') && !st.done ? '' : 'none';
    if ((r.type === 'read' || r.type === 'tens') && !st.done) ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'del'].forEach(function (k) {
      var kb = self._btn('tbd-key' + (k === 'del' ? ' is-del' : ''), 'key-' + k, k === 'del' ? self._t('ariaDel') : null, k === 'del' ? '⌫' : k);
      kb.addEventListener('click', function () { self._keyPress(k); }); pad.appendChild(kb);
    });
    /* ---- Check ---- */
    var foot = this._q('.tbd-foot'); foot.innerHTML = '';
    if (!st.done) { var ck = this._btn('tbd-check', 'check', null, this._t('check')); ck.disabled = !!this._busy; ck.addEventListener('click', function () { self._check(); }); foot.appendChild(ck); }
    /* ---- the note ---- */
    var note = this._q('.tbd-note'), h = !this._busy ? C.hint(st) : null, t = '', cls = 'tbd-note';
    if (v.msg) { t = v.msg; cls += ' is-ok'; } else if (h) { t = this._t(h.key, h.args); cls += ' is-hint'; }
    note.className = cls; note.textContent = t;
  },

  /* ---------------- actions ---------------- */
  _edit: function (keepBand) { this._clearTimers(); this._busy = false; var b = keepBand ? this._view.band : null; this._view = b ? { band: b } : {}; this._paint(); },
  _hopper: function () { if (this._busy) return; if (TenBandCore.hopper(this.st)) { this.api.sound(330); this._sel = null; this._edit(); } else this.api.sound(160); },
  _takeOut: function () { if (this._busy) return; if (TenBandCore.takeOut(this.st)) { this.api.sound(280); this._edit(); } },
  _pull: function () {
    var C = TenBandCore, st = this.st, self = this; if (this._busy || st.done) return;
    var res = C.pull(st); if (!res) return;
    this._sel = null;
    if (res.result === 'stiff') { this._clearTimers(); this._view = { stiff: true }; this.api.sound(120); this._paint(); if (!this.FAST) this._later(function () { self._view.stiff = false; self._paint(); }, 500); return; }
    this._clearTimers(); this._view = { band: res, pulled: true }; this.api.sound(res.result === 'clunk' ? 140 : 600); this._paint();
    if (!this.FAST) this._later(function () { self._view = {}; self._paint(); }, res.result === 'clunk' ? 700 : (this._gaps() === 'show' ? 1100 : 450));
  },
  _snip: function () {
    var st = this.st; if (this._busy || st.done || st.rack < 1) return;
    if (TenBandCore.snip(st)) { this.api.sound(700); this._edit(); } else this._paint();
  },
  _keyPress: function (k) {
    var C = TenBandCore, st = this.st, r = st.r; if (this._busy || st.done) return;
    var ok = r.type === 'read' ? (k === 'del' ? C.del(st) : C.type(st, k)) : C.setSlot(st, this._slot, k === 'del' ? '' : k);
    if (r.type === 'tens' && ok && k !== 'del' && this._slot === 't') this._slot = 'o';
    if (ok) { this.api.sound(500); this._edit(); }
  },
  _keydown: function (e) {
    var k = e.key, st = this.st, r = st.r; if (st.done) return;
    if (/^[0-9]$/.test(k) && (r.type === 'read' || r.type === 'tens')) { this._keyPress(k); e.preventDefault(); }
    else if (k === 'Backspace' && (r.type === 'read' || r.type === 'tens')) { this._keyPress('del'); e.preventDefault(); }
    else if (k === 'h' || k === 'H') { this._hopper(); e.preventDefault(); }
    else if (k === 'l' || k === 'L') { this._pull(); e.preventDefault(); }
    else if (k === '-') { this._takeOut(); e.preventDefault(); }
  },
  _check: function () {
    var C = TenBandCore, st = this.st, r = st.r, self = this;
    if (this._busy || st.done) return;
    this._sel = null;
    var a = C.check(st); if (!a) return;
    if (a.result === 'none') { this._view = {}; this.api.sound(200); this._paint(); this.api.announce(this._q('.tbd-note').textContent || ''); return; }
    this._view = { checked: true };
    if (a.result === 'ok') {
      var msg = this._okText(r); this._view.msg = msg; this.api.sound(880); this._paint(); this.api.announce(msg);
      this._advance(msg.length * 60 + 2400);
    } else { this.api.sound(220); this._paint(); this.api.announce(this._q('.tbd-note').textContent || ''); }
  },
  _okText: function (r) {
    if (r.type === 'unbundle') return this._t('okUnbundle', { n: r.n, t: r.t - 1, o: r.o + 10 });
    if (r.type === 'read') return r.startRack === 1 ? this._t('okRead1', { o: r.startPlate, n: r.n }) : this._t('okRead', { t: r.startRack, o: r.startPlate, n: r.n });
    if (r.o === 0) return this._t('okDecade', { t: r.t, n: r.n });
    return this._t(r.o === 1 ? 'okBuildO1' : 'okBuild', { t: r.t, o: r.o, n: r.n });
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, Math.max(this.OK_MS, this.OK_MS === 4200 ? ms : 0));
  }
};

var tbdCssDone = false;
function injectBandCSS() {
  if (tbdCssDone || typeof document === 'undefined') return;
  tbdCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.tbd-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;} .tbd-wrap:focus{outline:none;}'
  + '.tbd-top{display:flex;align-items:center;justify-content:center;gap:16px;width:100%;}'
  + '.tbd-card{display:flex;align-items:center;justify-content:center;gap:2px;min-width:120px;height:72px;padding:0 14px;border-radius:12px;background:#FFFDF7;box-shadow:inset 0 0 0 3px #3A2E1F,0 3px 0 #C9B79A;font-family:' + H + ';font-weight:800;font-size:48px;color:#3A2E1F;}'
  + '.tbd-card.is-split .tbd-dt{color:#146B5E;} .tbd-card.is-split .tbd-do{color:#E0603A;margin-left:10px;} .tbd-typed{min-width:1.2em;text-align:center;color:#146B5E;}'
  + '.tbd-slot{display:flex;flex-direction:column;align-items:center;justify-content:center;min-width:64px;height:64px;margin:0 3px;border:0;border-radius:10px;background:#F6ECD6;box-shadow:inset 0 0 0 2px #8A6B42;cursor:pointer;padding:2px 6px;} .tbd-slot.is-on{box-shadow:inset 0 0 0 3px #1E8A78;background:#E4F4EF;}'
  + '.tbd-slothead{font-family:' + B + ';font-weight:800;font-size:13px;color:#6F6457;line-height:1;} .tbd-slotval{font-family:' + H + ';font-weight:800;font-size:30px;line-height:1.1;color:#3A2E1F;min-height:1.1em;}'
  + '.tbd-bot{display:block;flex:none;} .tbd-botpic{display:block;} .tbd-bot.is-spin .tbd-botpic{animation:tbdSpin .8s ease-in-out 1;} @keyframes tbdSpin{50%{transform:rotate(12deg) scale(1.06);}}'
  + '.tbd-hopper{width:80px;height:72px;border:0;padding:0;background:transparent;cursor:pointer;flex:none;} .tbd-hopper svg{width:100%;height:100%;display:block;} .tbd-funnel{fill:#E9D9BE;stroke:#3A2E1F;stroke-width:3;stroke-linejoin:round;} .tbd-hopper:disabled{opacity:.45;cursor:default;} .tbd-hopper:not(:disabled):active svg{transform:rotate(-4deg);}'
  /* the machine: plate (left) + rack (right) */
  + '.tbd-machine{display:flex;align-items:stretch;gap:10px;width:100%;max-width:660px;box-sizing:border-box;padding:12px;border-radius:16px;background:#146B5E;box-shadow:inset 0 0 0 3px #3A2E1F;}'
  + '.tbd-platecol{position:relative;flex:1;min-width:0;}'
  + '.tbd-plate{position:relative;display:block;width:100%;aspect-ratio:2 / 1;border-radius:10px;background:#C9D2D8;box-shadow:inset 0 0 0 3px #3A2E1F,inset 0 0 0 7px #E2E8EC;}'
  + '.tbd-cube{position:absolute;width:8.4%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:3px;background:#1E8A78;box-shadow:inset 0 0 0 2px #0F4F45,inset 0 4px 0 #5FC2AF;display:flex;align-items:center;justify-content:center;}'
  + '.tbd-cube.is-hiding{box-shadow:inset 0 0 0 2px #0F4F45,0 0 0 3px #F4CF62,0 0 8px #F4CF62;} .tbd-cube.is-in{opacity:.25;} .tbd-cube i{font-style:normal;font-family:' + H + ';font-weight:800;font-size:12px;color:#FFFDF7;line-height:1;}'
  + '.tbd-band{position:absolute;left:3%;right:3%;top:-8px;display:grid;grid-template-columns:repeat(10,1fr);gap:2px;padding:3px;border-radius:6px;background:repeating-linear-gradient(90deg,#F2784B 0 10px,#FBF3E4 10px 20px);box-shadow:0 0 0 2px #3A2E1F;}'
  + '.tbd-pocket{aspect-ratio:1;border-radius:3px;background:rgba(255,255,255,.6);} .tbd-pocket.is-full{background:#1E8A78;box-shadow:inset 0 3px 0 #5FC2AF;} .tbd-pocket.is-empty{background:#FFFDF7;box-shadow:inset 0 0 0 2px #E0603A;} .tbd-band.is-clunk{box-shadow:0 0 0 3px #3A2E1F,0 0 12px #F4CF62;} .tbd-band.is-spring{animation:tbdBoing .5s ease-out 1;} @keyframes tbdBoing{40%{transform:scaleX(1.05);}}'
  + '.tbd-rack{display:flex;gap:4px;align-items:flex-end;padding:6px;border-radius:10px;background:#0F5C4F;box-shadow:inset 0 0 0 2px #3A2E1F;}'
  + '.tbd-rod,.tbd-rodslot{position:relative;width:26px;height:180px;flex:none;border:0;padding:3px 3px 3px;border-radius:6px;display:flex;flex-direction:column-reverse;gap:2px;}'
  + '.tbd-rod{box-sizing:border-box;background:repeating-linear-gradient(180deg,#F2784B 0 6px,#FBF3E4 6px 12px);box-shadow:inset 0 0 0 2px #3A2E1F;} .tbd-rod.is-extra{box-shadow:inset 0 0 0 3px #E0603A,0 0 10px #E0603A;} .tbd-rod.is-snipme{outline:3px dashed #F4CF62;outline-offset:2px;}'
  + '.tbd-rcube{flex:1;border-radius:2px;background:#1E8A78;box-shadow:inset 0 2px 0 #5FC2AF;} .tbd-clasp{position:absolute;left:50%;top:44%;width:16px;height:16px;margin-left:-8px;border-radius:50%;background:#F4CF62;box-shadow:inset 0 0 0 2px #3A2E1F;}'
  + '.tbd-rlabel{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);padding:0 3px;border-radius:5px;background:#3A2E1F;font-style:normal;font-family:' + H + ';font-weight:800;font-size:13px;line-height:16px;color:#FFFDF7;white-space:nowrap;z-index:1;}'
  + '.tbd-rodslot{background:transparent;box-shadow:inset 0 0 0 2px rgba(255,253,247,.25);} .tbd-rodslot.is-missing{box-shadow:inset 0 0 0 2px #FFFDF7;border:2px dashed #F4CF62;box-sizing:border-box;}'
  + '.tbd-snipbtn{width:52px;height:52px;border:0;border-radius:50%;background:#FFFDF7;box-shadow:inset 0 0 0 3px #3A2E1F;font-size:24px;color:#3A2E1F;cursor:pointer;} .tbd-snipbtn:disabled{opacity:.4;cursor:default;}'
 + '.tbd-rack.is-two{display:grid;grid-template-columns:repeat(5,auto);align-content:center;} .tbd-wrap.is-narrow .tbd-rack.is-two .tbd-rod,.tbd-wrap.is-narrow .tbd-rack.is-two .tbd-rodslot{height:62px;width:14px;} .tbd-wrap.is-narrow .tbd-rack.is-two .tbd-rlabel{font-size:10px;line-height:13px;}'
  + '.tbd-controls{display:flex;align-items:center;justify-content:center;gap:16px;}'
  + '.tbd-out{width:52px;height:52px;border:0;border-radius:50%;background:#FFFDF7;box-shadow:inset 0 0 0 3px #3A2E1F;font-family:' + H + ';font-weight:800;font-size:30px;color:#3A2E1F;cursor:pointer;} .tbd-out:disabled{opacity:.4;cursor:default;}'
  + '.tbd-lever{position:relative;width:160px;height:64px;border:0;border-radius:14px;background:#E9D9BE;box-shadow:inset 0 0 0 3px #3A2E1F;cursor:pointer;} .tbd-arm{position:absolute;left:20px;right:44px;top:29px;height:8px;border-radius:4px;background:#6E7B85;transform-origin:left center;transform:rotate(-10deg);transition:transform .25s;} .tbd-knob{position:absolute;right:16px;top:12px;width:40px;height:40px;border-radius:50%;background:#D9412B;box-shadow:inset 0 -4px 0 #9C2A18;transition:transform .25s;}'
  + '.tbd-lever.is-down .tbd-arm{transform:rotate(12deg);} .tbd-lever.is-down .tbd-knob{transform:translateY(10px);} .tbd-lever.is-stiff{animation:tbdStiff .3s ease-in-out 2;} @keyframes tbdStiff{50%{transform:translateY(4px);}} .tbd-lever:disabled{opacity:.5;cursor:default;}'
  + '.tbd-pad{display:grid;grid-template-columns:repeat(6,48px);gap:5px;} .tbd-key{height:48px;border:0;border-radius:10px;background:#FFFDF7;box-shadow:inset 0 0 0 2px #8A6B42;font-family:' + H + ';font-weight:800;font-size:22px;color:#3A2E1F;cursor:pointer;}'
  + '.tbd-check{min-height:52px;padding:6px 28px;border:0;border-radius:14px;background:#1E8A78;box-shadow:0 4px 0 #0F5C4F;color:#fff;font-family:' + H + ';font-weight:800;font-size:20px;cursor:pointer;} .tbd-check:disabled{opacity:.5;cursor:default;}'
  + '.tbd-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:3px;}'
  + '.tbd-note{min-height:1.4em;margin:0;padding:0 8px;text-align:center;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.35;color:#2A2A35;max-width:640px;} .tbd-note:empty{display:none;} .tbd-note.is-hint{color:#B5461F;} .tbd-note.is-ok{color:#146B5E;}'
  /* phones */
  + '.tbd-wrap.is-narrow .tbd-top{gap:8px;} .tbd-wrap.is-narrow .tbd-card{min-width:84px;height:56px;font-size:36px;padding:0 8px;} .tbd-wrap.is-narrow .tbd-hopper{width:72px;height:64px;} .tbd-wrap.is-narrow .tbd-machine{padding:8px;gap:6px;}'
  + '.tbd-wrap.is-narrow .tbd-rod,.tbd-wrap.is-narrow .tbd-rodslot{width:16px;height:130px;padding:2px;gap:1px;} .tbd-wrap.is-narrow .tbd-clasp{width:12px;height:12px;margin-left:-6px;} .tbd-wrap.is-narrow .tbd-rack{gap:3px;padding:4px;} .tbd-wrap.is-narrow .tbd-cube i{font-size:9px;}'
  + '.tbd-wrap.is-narrow .tbd-slot{min-width:56px;height:52px;} .tbd-wrap.is-narrow .tbd-slotval{font-size:24px;} .tbd-wrap.is-narrow .tbd-slothead{font-size:11px;} .tbd-wrap.is-narrow .tbd-pad{grid-template-columns:repeat(6,44px);gap:4px;} .tbd-wrap.is-narrow .tbd-key{height:44px;} .tbd-wrap.is-narrow .tbd-note{font-size:17px;}'
  + '.tbd-wrap.is-narrow .tbd-rlabel{font-size:11px;} .tbd-wrap.is-narrow .tbd-lever{width:130px;height:56px;} .tbd-wrap.is-narrow .tbd-knob{width:34px;height:34px;top:11px;}'
  + '.tbd-wrap.is-tiny{gap:6px;} .tbd-wrap.is-tiny .tbd-rod,.tbd-wrap.is-tiny .tbd-rodslot{height:104px;} .tbd-wrap.is-tiny .tbd-lever{height:52px;} .tbd-wrap.is-tiny .tbd-knob{top:9px;} .tbd-wrap.is-tiny .tbd-pad{gap:3px;}'   /* the smallest phones: the rack sets the machine height */
 + '.tbd-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media print{.tbd-note,.tbd-foot,.tbd-pad,.tbd-controls{display:none;}}'
  + '@media (prefers-reduced-motion: reduce){.tbd-wrap *{animation:none !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'tbd-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.TenBandActivity = TenBandActivity;
