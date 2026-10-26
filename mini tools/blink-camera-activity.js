/* =====================================================================
   blink-camera-activity.js — ACTIVITY #60 of the one-by-one rebuild:
   "Read Common Sight Words" → THE BLINK CAMERA (RF.K.3.c, 11 locales).
   Design sheet: docs/activities-rebuild/designs/060-choice-board.md
   ---------------------------------------------------------------------
   THE INVENTION: a sight word is a word you can read in a blink. A toy
   camera shows the word in its lens for one blink while the board lies
   face down; the iris spins shut, the board flips up, and the child finds
   the word they "photographed" among its look-alikes — on four cards, in
   a grid of twelve tiles (bracket every copy, then say how many), or in a
   short story. A right answer develops a photo that goes into the album.
   The dial on the camera sets the blink (long · medium · short); the
   camera can be snapped again any time, and that is never a miss.

   ACTIVITY LAYER ONLY: the model is blink-camera-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity on success).
   Test seams: window.BlinkCameraActivity.st / ._order / ._pool / .FAST /
   .HOLD (the shutter stays open until ._shut()).
   ===================================================================== */
'use strict';

var BlinkCameraActivity = {
  id: 'blink-camera',
  apparatusClasses: ['bcm-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:         {en:'The Blink Camera',de:'Die Blitzkamera',nl:'De flitscamera',da:'Lynkameraet',sv:'Blixtkameran',no:'Lynkameraet',es:'La cámara relámpago',it:'La fotocamera lampo',pt:'A câmera relâmpago',fr:'L’appareil photo éclair',fi:'Välähdyskamera'},
    instruction:   {en:'Snap the camera. The word shows for one blink — find it!',de:'Drück auf den Auslöser. Das Wort blitzt kurz auf – finde es!',nl:'Druk op de knop. Het woord flitst even op – zoek het!',da:'Tryk på udløseren. Ordet vises i et glimt – find det!',sv:'Tryck på avtryckaren. Ordet syns bara ett ögonblick – hitta det!',no:'Trykk på utløseren. Ordet vises et øyeblikk – finn det!',es:'Aprieta el botón. La palabra aparece un instante: ¡encuéntrala!',it:'Premi il pulsante. La parola appare in un lampo: trovala!',pt:'Aperte o botão. A palavra aparece num piscar de olhos — encontre-a!',fr:'Appuie sur le déclencheur. Le mot apparaît en un éclair : trouve-le !',fi:'Paina laukaisinta. Sana näkyy hetken – etsi se!'},
    check:         {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kolla',no:'Sjekk',es:'Revisar',it:'Controlla',pt:'Conferir',fr:'Vérifier',fi:'Tarkista'},
    pSnap:         {en:'Snap the camera, then tap the word you saw.',de:'Drück auf den Auslöser und tippe dann das Wort an, das du gesehen hast.',nl:'Druk op de knop en tik dan op het woord dat je zag.',da:'Tryk på udløseren, og tryk så på det ord, du så.',sv:'Tryck på avtryckaren och tryck sedan på ordet du såg.',no:'Trykk på utløseren, og trykk så på ordet du så.',es:'Aprieta el botón de la cámara y luego toca la palabra que viste.',it:'Premi il pulsante della fotocamera, poi tocca la parola che hai visto.',pt:'Aperte o botão da câmera e depois toque na palavra que você viu.',fr:'Appuie sur le déclencheur, puis touche le mot que tu as vu.',fi:'Paina laukaisinta ja kosketa sitten sanaa, jonka näit.'},
    pHunt:         {en:'Snap the camera, then find every copy of the word.',de:'Drück auf den Auslöser und finde dann das Wort überall, wo es steht.',nl:'Druk op de knop en zoek dan het woord overal waar het staat.',da:'Tryk på udløseren, og find så ordet alle de steder, det står.',sv:'Tryck på avtryckaren och hitta sedan ordet överallt där det står.',no:'Trykk på utløseren, og finn så ordet overalt der det står.',es:'Aprieta el botón y encuentra la palabra todas las veces que aparece.',it:'Premi il pulsante, poi trova la parola ogni volta che compare.',pt:'Aperte o botão e encontre a palavra todas as vezes que ela aparece.',fr:'Appuie sur le déclencheur, puis trouve le mot partout où il est écrit.',fi:'Paina laukaisinta ja etsi sitten sana kaikkialta, missä se on.'},
    pStory:        {en:'Snap the camera, then find the word in the story.',de:'Drück auf den Auslöser und finde dann das Wort in der Geschichte.',nl:'Druk op de knop en zoek dan het woord in het verhaal.',da:'Tryk på udløseren, og find så ordet i historien.',sv:'Tryck på avtryckaren och hitta sedan ordet i berättelsen.',no:'Trykk på utløseren, og finn så ordet i fortellingen.',es:'Aprieta el botón de la cámara y luego encuentra la palabra en el cuento.',it:'Premi il pulsante della fotocamera, poi trova la parola nella storia.',pt:'Aperte o botão da câmera e depois encontre a palavra na história.',fr:'Appuie sur le déclencheur, puis trouve le mot dans l’histoire.',fi:'Paina laukaisinta ja etsi sitten sana tarinasta.'},
    hintEmpty:     {en:'Snap the camera, then find the word you saw.',de:'Drück auf den Auslöser und finde dann das Wort, das du gesehen hast.',nl:'Druk op de knop en zoek dan het woord dat je zag.',da:'Tryk på udløseren, og find så det ord, du så.',sv:'Tryck på avtryckaren och hitta sedan ordet du såg.',no:'Trykk på utløseren, og finn så ordet du så.',es:'Aprieta el botón de la cámara y luego busca la palabra que viste.',it:'Premi il pulsante della fotocamera, poi cerca la parola che hai visto.',pt:'Aperte o botão da câmera e depois procure a palavra que você viu.',fr:'Appuie sur le déclencheur, puis cherche le mot que tu as vu.',fi:'Paina laukaisinta ja etsi sitten sana, jonka näit.'},
    hintLook:      {en:'Look again. Read every letter.',de:'Schau noch einmal. Lies jeden Buchstaben.',nl:'Kijk nog eens. Lees elke letter.',da:'Se igen. Læs hvert bogstav.',sv:'Titta igen. Läs varje bokstav.',no:'Se igjen. Les hver bokstav.',es:'Mira otra vez. Lee cada letra.',it:'Guarda di nuovo. Leggi ogni lettera.',pt:'Olhe de novo. Leia cada letra.',fr:'Regarde encore. Lis chaque lettre.',fi:'Katso uudelleen. Lue jokainen kirjain.'},
    hintPhoto:     {en:'Look at the photo. Which card has the same letters, in the same order?',de:'Schau dir das Foto an. Welche Karte hat dieselben Buchstaben in derselben Reihenfolge?',nl:'Kijk naar de foto. Welke kaart heeft dezelfde letters, in dezelfde volgorde?',da:'Se på fotoet. Hvilket kort har de samme bogstaver i samme rækkefølge?',sv:'Titta på fotot. Vilket kort har samma bokstäver i samma ordning?',no:'Se på fotoet. Hvilket kort har de samme bokstavene i samme rekkefølge?',es:'Mira la foto. ¿Qué tarjeta tiene las mismas letras, en el mismo orden?',it:'Guarda la foto. Quale carta ha le stesse lettere, nello stesso ordine?',pt:'Olhe a foto. Qual cartão tem as mesmas letras, na mesma ordem?',fr:'Regarde la photo. Quelle carte a les mêmes lettres, dans le même ordre ?',fi:'Katso valokuvaa. Missä kortissa on samat kirjaimet samassa järjestyksessä?'},
    hintWrong:     {en:'Some brackets were on look-alikes.',de:'Einige Rahmen waren um Wörter, die nur ähnlich aussehen.',nl:'Een paar kadertjes stonden om woorden die er alleen op lijken.',da:'Nogle rammer sad på ord, der bare ligner det.',sv:'Några ramar satt på ord som bara liknar det.',no:'Noen rammer satt på ord som bare ligner det.',es:'Algunos marcos estaban en palabras que solo se parecen.',it:'Alcune cornici erano su parole che le somigliano soltanto.',pt:'Algumas molduras estavam em palavras que só se parecem.',fr:'Des cadres étaient sur des mots qui lui ressemblent seulement.',fi:'Osa kehyksistä oli samannäköisten sanojen ympärillä.'},
    hintWrongMore: {en:'Some brackets were on look-alikes. There are more copies to find.',de:'Einige Rahmen waren um Wörter, die nur ähnlich aussehen. Es gibt noch mehr zu finden.',nl:'Een paar kadertjes stonden om woorden die er alleen op lijken. Er zijn er nog meer te vinden.',da:'Nogle rammer sad på ord, der bare ligner det. Der er flere at finde.',sv:'Några ramar satt på ord som bara liknar det. Det finns fler att hitta.',no:'Noen rammer satt på ord som bare ligner det. Det er flere å finne.',es:'Algunos marcos estaban en palabras que solo se parecen. Faltan más por encontrar.',it:'Alcune cornici erano su parole che le somigliano soltanto. Ce ne sono ancora da trovare.',pt:'Algumas molduras estavam em palavras que só se parecem. Ainda há mais para encontrar.',fr:'Des cadres étaient sur des mots qui lui ressemblent seulement. Il en reste à trouver.',fi:'Osa kehyksistä oli samannäköisten sanojen ympärillä. Löydettävää on vielä lisää.'},
    hintMore:      {en:'There are more copies to find.',de:'Es gibt noch mehr zu finden.',nl:'Er zijn er nog meer te vinden.',da:'Der er flere at finde.',sv:'Det finns fler att hitta.',no:'Det er flere å finne.',es:'Faltan más por encontrar.',it:'Ce ne sono ancora da trovare.',pt:'Ainda há mais para encontrar.',fr:'Il en reste à trouver.',fi:'Löydettävää on vielä lisää.'},
    hintCap:       {en:'There are more copies to find. With a capital letter at the start, it is still the same word.',de:'Es gibt noch mehr zu finden. Auch mit großem Anfangsbuchstaben ist es dasselbe Wort.',nl:'Er zijn er nog meer te vinden. Met een hoofdletter aan het begin is het nog steeds hetzelfde woord.',da:'Der er flere at finde. Med stort begyndelsesbogstav er det stadig det samme ord.',sv:'Det finns fler att hitta. Med stor bokstav i början är det fortfarande samma ord.',no:'Det er flere å finne. Med stor forbokstav er det fortsatt det samme ordet.',es:'Faltan más por encontrar. Con mayúscula al principio, sigue siendo la misma palabra.',it:'Ce ne sono ancora da trovare. Con la maiuscola all’inizio è sempre la stessa parola.',pt:'Ainda há mais para encontrar. Com letra maiúscula no começo, continua sendo a mesma palavra.',fr:'Il en reste à trouver. Avec une majuscule au début, c’est toujours le même mot.',fi:'Löydettävää on vielä lisää. Isolla alkukirjaimella se on silti sama sana.'},
    hintFrames:    {en:'Find the words with the dashed line. Do they match the photo?',de:'Finde die Wörter mit der gestrichelten Linie. Passen sie zum Foto?',nl:'Zoek de woorden met de stippellijn. Passen ze bij de foto?',da:'Find ordene med den stiplede linje. Passer de til fotoet?',sv:'Hitta orden med den streckade linjen. Stämmer de med fotot?',no:'Finn ordene med den stiplede linjen. Stemmer de med fotoet?',es:'Busca las palabras con la línea punteada. ¿Son iguales a la foto?',it:'Trova le parole con la linea tratteggiata. Sono uguali alla foto?',pt:'Procure as palavras com a linha pontilhada. Elas são iguais à foto?',fr:'Trouve les mots entourés de pointillés. Sont-ils pareils à la photo ?',fi:'Etsi sanat, joiden ympärillä on katkoviiva. Ovatko ne samat kuin valokuvassa?'},
    hintWrongPhoto:{en:'Some brackets were on look-alikes. Compare them with the photo.',de:'Einige Rahmen waren um Wörter, die nur ähnlich aussehen. Vergleiche sie mit dem Foto.',nl:'Een paar kadertjes stonden om woorden die er alleen op lijken. Vergelijk ze met de foto.',da:'Nogle rammer sad på ord, der bare ligner det. Sammenlign dem med fotoet.',sv:'Några ramar satt på ord som bara liknar det. Jämför dem med fotot.',no:'Noen rammer satt på ord som bare ligner det. Sammenlign dem med fotoet.',es:'Algunos marcos estaban en palabras que solo se parecen. Compáralas con la foto.',it:'Alcune cornici erano su parole che le somigliano soltanto. Confrontale con la foto.',pt:'Algumas molduras estavam em palavras que só se parecem. Compare com a foto.',fr:'Des cadres étaient sur des mots qui lui ressemblent seulement. Compare-les avec la photo.',fi:'Osa kehyksistä oli samannäköisten sanojen ympärillä. Vertaa niitä valokuvaan.'},
    hintCount:     {en:'How many did you find?',de:'Wie viele hast du gefunden?',nl:'Hoeveel heb je er gevonden?',da:'Hvor mange fandt du?',sv:'Hur många hittade du?',no:'Hvor mange fant du?',es:'¿Cuántas encontraste?',it:'Quante ne hai trovate?',pt:'Quantas você encontrou?',fr:'Combien en as-tu trouvé ?',fi:'Montako löysit?'},
    hintCountAgain:{en:'Count the brackets.',de:'Zähl die Rahmen.',nl:'Tel de kadertjes.',da:'Tæl rammerne.',sv:'Räkna ramarna.',no:'Tell rammene.',es:'Cuenta los marcos.',it:'Conta le cornici.',pt:'Conte as molduras.',fr:'Compte les cadres.',fi:'Laske kehykset.'},
    okSnap:        {en:'{w} — you read it in a blink!',de:'{w} – im Blitz gelesen!',nl:'{w} – in een flits gelezen!',da:'{w} – læst i et glimt!',sv:'{w} – läst på ett ögonblick!',no:'{w} – lest på et øyeblikk!',es:'{w}: ¡la leíste en un instante!',it:'{w}: letta in un lampo!',pt:'{w} — você leu num piscar de olhos!',fr:'{w} : lu en un éclair !',fi:'{w} – luit sen silmänräpäyksessä!'},
    okHunt:        {en:'{n} copies of {w}. Every one found!',de:'{n}-mal {w}. Du hast jedes gefunden!',nl:'{n} keer {w}. Je hebt ze allemaal gevonden!',da:'{n} gange {w}. Du fandt dem alle!',sv:'{n} gånger {w}. Du hittade alla!',no:'{n} ganger {w}. Du fant alle!',es:'{n} veces {w}. ¡Las encontraste todas!',it:'{n} volte {w}. Le hai trovate tutte!',pt:'{n} vezes {w}. Você encontrou todas!',fr:'{n} fois {w}. Tu les as tous trouvés !',fi:'{w} {n} kertaa. Löysit jokaisen!'},
    okStory:       {en:'You found {w} {n} times in the story.',de:'Du hast {w} {n}-mal in der Geschichte gefunden.',nl:'Je vond {w} {n} keer in het verhaal.',da:'Du fandt {w} {n} gange i historien.',sv:'Du hittade {w} {n} gånger i berättelsen.',no:'Du fant {w} {n} ganger i fortellingen.',es:'Encontraste {w} {n} veces en el cuento.',it:'Hai trovato {w} {n} volte nella storia.',pt:'Você encontrou {w} {n} vezes na história.',fr:'Tu as trouvé {w} {n} fois dans l’histoire.',fi:'Löysit sanan {w} tarinasta {n} kertaa.'},
    okAlbum:       {en:'Your album is full: {n} words you can read in a blink!',de:'Dein Album ist voll: {n} Wörter, die du im Blitz lesen kannst!',nl:'Je album is vol: {n} woorden die je in een flits kunt lezen!',da:'Dit album er fyldt: {n} ord, du kan læse i et glimt!',sv:'Ditt album är fullt: {n} ord som du kan läsa på ett ögonblick!',no:'Albumet ditt er fullt: {n} ord du kan lese på et øyeblikk!',es:'Tu álbum está lleno: ¡{n} palabras que lees en un instante!',it:'Il tuo album è pieno: {n} parole che leggi in un lampo!',pt:'Seu álbum está cheio: {n} palavras que você lê num piscar de olhos!',fr:'Ton album est plein : {n} mots que tu lis en un éclair !',fi:'Albumisi on täynnä: {n} sanaa, jotka luet silmänräpäyksessä!'},
    setGame:       {en:'Game',de:'Spiel',nl:'Spel',da:'Spil',sv:'Spel',no:'Spill',es:'Juego',it:'Gioco',pt:'Jogo',fr:'Jeu',fi:'Peli'},
    gSnap:         {en:'Snap and find',de:'Knipsen und finden',nl:'Flitsen en vinden',da:'Knips og find',sv:'Knäpp och hitta',no:'Knips og finn',es:'Toma la foto y encuentra',it:'Scatta e trova',pt:'Fotografe e encontre',fr:'Clique et trouve',fi:'Kuvaa ja etsi'},
    gHunt:         {en:'Find every one',de:'Alle finden',nl:'Vind ze allemaal',da:'Find dem alle',sv:'Hitta alla',no:'Finn alle',es:'Encuéntralas todas',it:'Trovale tutte',pt:'Encontre todas',fr:'Trouve-les tous',fi:'Etsi kaikki'},
    gStory:        {en:'In the story',de:'In der Geschichte',nl:'In het verhaal',da:'I historien',sv:'I berättelsen',no:'I fortellingen',es:'En el cuento',it:'Nella storia',pt:'Na história',fr:'Dans l’histoire',fi:'Tarinassa'},
    setBlink:      {en:'Blink',de:'Blitz',nl:'Flits',da:'Glimt',sv:'Blinkning',no:'Øyeblikk',es:'Destello',it:'Lampo',pt:'Piscada',fr:'Éclair',fi:'Välähdys'},
    bLong:         {en:'Long',de:'Lang',nl:'Lang',da:'Lang',sv:'Lång',no:'Langt',es:'Largo',it:'Lungo',pt:'Longa',fr:'Long',fi:'Pitkä'},
    bMedium:       {en:'Medium',de:'Mittel',nl:'Middellang',da:'Mellem',sv:'Mellan',no:'Middels',es:'Medio',it:'Medio',pt:'Média',fr:'Moyen',fi:'Keskipitkä'},
    bShort:        {en:'Short',de:'Kurz',nl:'Kort',da:'Kort',sv:'Kort',no:'Kort',es:'Corto',it:'Breve',pt:'Curta',fr:'Court',fi:'Lyhyt'},
    ariaCamera:    {en:'Camera button',de:'Auslöser',nl:'Cameraknop',da:'Udløser',sv:'Avtryckare',no:'Utløser',es:'Botón de la cámara',it:'Pulsante di scatto',pt:'Botão da câmera',fr:'Déclencheur',fi:'Laukaisin'},
    ariaOpen:      {en:'Shutter open: {w}',de:'Verschluss offen: {w}',nl:'Sluiter open: {w}',da:'Lukkeren er åben: {w}',sv:'Slutaren är öppen: {w}',no:'Lukkeren er åpen: {w}',es:'Obturador abierto: {w}',it:'Otturatore aperto: {w}',pt:'Obturador aberto: {w}',fr:'Obturateur ouvert : {w}',fi:'Suljin auki: {w}'},
    ariaCard:      {en:'Card {n}: {w}',de:'Karte {n}: {w}',nl:'Kaart {n}: {w}',da:'Kort {n}: {w}',sv:'Kort {n}: {w}',no:'Kort {n}: {w}',es:'Tarjeta {n}: {w}',it:'Carta {n}: {w}',pt:'Cartão {n}: {w}',fr:'Carte {n} : {w}',fi:'Kortti {n}: {w}'},
    ariaDown:      {en:'Card {n}, face down',de:'Karte {n}, verdeckt',nl:'Kaart {n}, omgedraaid',da:'Kort {n}, med bagsiden op',sv:'Kort {n}, med baksidan upp',no:'Kort {n}, med baksiden opp',es:'Tarjeta {n}, boca abajo',it:'Carta {n}, coperta',pt:'Cartão {n}, virado para baixo',fr:'Carte {n}, face cachée',fi:'Kortti {n}, kuvapuoli alaspäin'},
    ariaPhoto:     {en:'Photo of {w}',de:'Foto von {w}',nl:'Foto van {w}',da:'Foto af {w}',sv:'Foto av {w}',no:'Foto av {w}',es:'Foto de {w}',it:'Foto di {w}',pt:'Foto de {w}',fr:'Photo de {w}',fi:'Valokuva sanasta {w}'},
    ariaDial:      {en:'Blink: {b}',de:'Blitz: {b}',nl:'Flits: {b}',da:'Glimt: {b}',sv:'Blinkning: {b}',no:'Øyeblikk: {b}',es:'Destello: {b}',it:'Lampo: {b}',pt:'Piscada: {b}',fr:'Éclair : {b}',fi:'Välähdys: {b}'},
    ariaAlbum:     {en:'Album photo: {w}',de:'Albumfoto: {w}',nl:'Albumfoto: {w}',da:'Albumfoto: {w}',sv:'Albumfoto: {w}',no:'Albumfoto: {w}',es:'Foto del álbum: {w}',it:'Foto dell’album: {w}',pt:'Foto do álbum: {w}',fr:'Photo de l’album : {w}',fi:'Albumin kuva: {w}'},
    ariaAlbumOpen: {en:'Album',de:'Album',nl:'Album',da:'Album',sv:'Album',no:'Album',es:'Álbum',it:'Album',pt:'Álbum',fr:'Album',fi:'Albumi'}
    /*STRINGS-END*/
  },

  defaults: { game: 'snap', blink: 'medium' },
  settings: [
    { key: 'game', type: 'choice', labelKey: 'setGame', options: [{ value: 'snap', labelKey: 'gSnap' }, { value: 'hunt', labelKey: 'gHunt' }, { value: 'story', labelKey: 'gStory' }] },
    { key: 'blink', type: 'choice', labelKey: 'setBlink', options: [{ value: 'long', labelKey: 'bLong' }, { value: 'medium', labelKey: 'bMedium' }, { value: 'short', labelKey: 'bShort' }] }
  ],

  OK_MS: 500, FAST: false, HOLD: false,
  B_KEY: { 'long': 'bLong', medium: 'bMedium', 'short': 'bShort' },
  DIAL: ['long', 'medium', 'short'],
  QUOTES: { en: ['“', '”'], de: ['„', '“'], nl: ['‘', '’'], da: ['»', '«'], sv: ['”', '”'], no: ['«', '»'], es: ['«', '»'], it: ['«', '»'], pt: ['“', '”'], fr: ['« ', ' »'], fi: ['”', '”'] },

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._deals = null; this._dealKey = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._afterOk = false; this._view = {}; this._album = []; this._albumOpen = false;
    this._flash = null;
    injectCameraCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; this._album = []; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return BlinkCameraCore.locale(((this.api && this.api.lang) || 'en').slice(0, 2)); },
  _game: function () { return BlinkCameraCore.game(this._loc(), this._set('game')); },
  _key: function () { return this._loc() + '/' + this._game(); },
  _blink: function () { var b = this._set('blink') || 'medium'; return this.DIAL.indexOf(b) >= 0 ? b : 'medium'; },
  _say: function (text) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'word', text: text, lang: this._loc(), rate: 0.9 }); } catch (e) {} },
  _q: function (s) { var Q = this.QUOTES[this._loc()] || this.QUOTES.en; return Q[0] + s + Q[1]; },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { this._pool = BlinkCameraCore.rounds(this._loc(), this._game()); this._poolKey = k; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = BlinkCameraCore;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); this._deals = null; this._album = []; }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); this._deals = null; this._album = []; }
    if (!this._deals || this._dealKey !== this._poolKey || this._deals.length !== n) {
      this._deals = pool[0].game === 'snap' ? C.dealCards(pool, Math.random) : pool[0].game === 'hunt' ? C.dealGrids(pool, Math.random) : pool.map(function () { return null; });
      this._dealKey = this._poolKey;
    }
    var r = pool[this._order[index % n]], deal = this._deals[this._order[index % n]];
    var pk = r.game === 'snap' ? 'pSnap' : r.game === 'hunt' ? 'pHunt' : 'pStory';
    var ck = r.game === 'snap' ? 'okSnap' : r.game === 'hunt' ? 'okHunt' : 'okStory';
    /* the shell interpolates the celebration with promptArgs */
    var pa = { w: this._q(r.target), n: r.copies || 1 };
    return {
      id: 'blink-camera.' + r.loc + '.' + r.id, promptKey: pk, promptArgs: pa, celebrateKey: ck, answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._busy = false; tool._afterOk = false; tool._view = {}; tool._flash = null;
        tool.st = C.newState(r, r.game === 'snap' ? { cards: deal } : r.game === 'hunt' ? { tiles: deal } : {});
      },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var C = BlinkCameraCore, r0 = C.rounds(this._loc(), 'snap')[0]; this.st = C.newState(r0, {}); }
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
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected || self._busy || (self.st && self.st.open)) return; last = w; self._render2(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var L = this._L = BlinkCameraCore.layout(this._width());
    var wrap = api.el('div', 'bcm-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + (L.W < 340 ? ' is-tiny' : '')); this._wrap = wrap; wrap.tabIndex = -1;
    [['cam', L.cam], ['lens', L.lens], ['btn', L.btn], ['word', L.word], ['card', L.card], ['cardh', L.cardH], ['cardf', L.cardF], ['tile', L.tile], ['tileh', L.tileH], ['tilef', L.tileF], ['pic', L.pic], ['story', L.story], ['ntile', L.ntile]].forEach(function (p) { wrap.style.setProperty('--bcm-' + p[0], p[1] + 'px'); });
    this._top = api.el('div', 'bcm-top'); wrap.appendChild(this._top);
    this._photoRow = api.el('div', 'bcm-photorow'); wrap.appendChild(this._photoRow);
    this._board = api.el('div', 'bcm-board'); wrap.appendChild(this._board);
    var ask = api.el('div', 'bcm-ask'); wrap.appendChild(ask);
    var note = api.el('p', 'bcm-note'); note.setAttribute('aria-live', 'polite'); this._note = note; ask.appendChild(note);
    var chk = api.el('button', 'bcm-check'); chk.type = 'button'; chk.setAttribute('data-k', 'check');
    chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; ask.appendChild(chk);
    var live = api.el('div', 'bcm-sr'); live.setAttribute('aria-live', 'assertive'); this._live = live; wrap.appendChild(live);
    wrap.addEventListener('keydown', function (ev) { self._onKey(ev); });
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
    if (!this._top) return;
    var st = this.st, C = BlinkCameraCore, r = st.r, v = this._view;
    this._wrap.className = this._wrap.className.replace(/ is-g-\w+/g, '') + ' is-g-' + r.game;
    this._wrap.classList.toggle('is-fast', !!this.FAST);
    this._paintTop(); this._paintPhoto(); this._paintBoard();
    var h = C.hint(st), msg = '';
    if (st.done) msg = v.albumFull ? this._t('okAlbum', { n: this._album.length }) : '';
    else if (h && !this._busy) msg = this._t(h);
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(!st.done && st.show && st.last && /wrong|hunt|count$/.test(st.last.result)));
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!(this._busy || st.open);
    this._checkBtn.textContent = this._t('check');
  },
  /* the camera: body, shutter button, blink dial, lens with its iris, photo slot — and the album */
  _paintTop: function () {
    var el = this._top, st = this.st, self = this, v = this._view, L = this._L, r = st.r; el.innerHTML = '';
    var cam = this.api.el('div', 'bcm-cam' + (st.open || this._flash ? ' is-open' : '') + (v.group ? ' is-group' : ''));
    var body = this.api.el('div', 'bcm-body'); body.setAttribute('aria-hidden', 'true'); cam.appendChild(body);
    var lens = this.api.el('div', 'bcm-lens'); lens.setAttribute('aria-hidden', 'true');
    var shown = v.group ? '' : (this._flash || (st.open ? r.target : ''));
    var word = this.api.el('span', 'bcm-lword'); word.textContent = shown; word.style.setProperty('--len', Math.max(2, shown.length));
    lens.appendChild(word);
    if (v.group) { var g = this.api.el('span', 'bcm-group'); g.textContent = this._album.join(' · '); lens.appendChild(g); }
    lens.insertAdjacentHTML('beforeend', irisSVG());
    cam.appendChild(lens);
    var btn = this.api.el('button', 'bcm-shutter' + (v.nudge ? ' is-nudge' : '')); btn.type = 'button'; btn.setAttribute('data-k', 'shutter'); btn.setAttribute('aria-label', this._t('ariaCamera'));
    btn.addEventListener('click', function () { self._snap(); }); cam.appendChild(btn);
    var dial = this.api.el('button', 'bcm-dial'); dial.type = 'button'; dial.setAttribute('data-k', 'dial');
    var b = this._blink(); dial.setAttribute('aria-label', this._t('ariaDial', { b: this._t(this.B_KEY[b]) }));
    dial.setAttribute('data-blink', b);
    this.DIAL.forEach(function (x) { var d = self.api.el('i', x === b ? 'is-lit' : ''); dial.appendChild(d); });
    dial.addEventListener('click', function () { self._turnDial(); }); cam.appendChild(dial);
    var slot = this.api.el('span', 'bcm-slot'); slot.setAttribute('aria-hidden', 'true'); cam.appendChild(slot);
    el.appendChild(cam);
    /* the album: one frame per round of the pass (a dot strip on a phone that opens the frames) */
    var n = this._pool ? this._pool.length : 8, al = this.api.el('div', 'bcm-album' + (L.mode === 'wide' || this._albumOpen ? ' is-frames' : ' is-dots') + (v.ripple ? ' is-ripple' : ''));
    var C = BlinkCameraCore, photoNow = C.photoOn(st) || (st.done && v.won);
    if (L.mode !== 'wide' && photoNow) { el.appendChild(this._photoEl()); }
    else if (L.mode !== 'wide') {
      var strip = this.api.el('button', 'bcm-dots'); strip.type = 'button'; strip.setAttribute('data-k', 'album'); strip.setAttribute('aria-label', this._t('ariaAlbumOpen')); strip.setAttribute('aria-expanded', String(!!this._albumOpen));
      for (var d = 0; d < n; d++) strip.appendChild(this.api.el('i', d < this._album.length ? 'is-full' : ''));
      strip.addEventListener('click', function () { self._albumOpen = !self._albumOpen; self._paint(); });
      el.appendChild(strip);
    }
    if (L.mode === 'wide' || this._albumOpen) {
      for (var i = 0; i < n; i++) (function (i) {
        var w = self._album[i];
        if (w === undefined) { var e = self.api.el('span', 'bcm-frame'); e.setAttribute('aria-hidden', 'true'); al.appendChild(e); return; }
        var f = self.api.el('button', 'bcm-frame is-full' + (v.newAt === i ? ' is-new' : '')); f.type = 'button'; f.setAttribute('data-k', 'frame' + i); f.textContent = w; f.style.setProperty('--l', Math.max(3, w.length));
        f.setAttribute('aria-label', self._t('ariaAlbum', { w: w }));
        f.addEventListener('click', function () { self._flashWord(w); });
        al.appendChild(f);
      })(i);
      el.appendChild(al);
    }
  },
  /* the developed photo: pinned beside the board at miss 2, developing on a right answer */
  _paintPhoto: function () {
    var el = this._photoRow, st = this.st, C = BlinkCameraCore, v = this._view; el.innerHTML = '';
    var on = C.photoOn(st) || (st.done && v.won);
    if (!on || this._L.mode !== 'wide') return;   /* on a phone the photo sits beside the camera */
    el.appendChild(this._photoEl());
  },
  _photoEl: function () {
    var st = this.st, p = this.api.el('div', 'bcm-photo' + (st.done ? ' is-develop' : ' is-pinned')); p.setAttribute('role', 'img'); p.setAttribute('aria-label', this._t('ariaPhoto', { w: st.r.target }));
    var w = this.api.el('span', 'bcm-pword'); w.textContent = st.r.target; w.style.setProperty('--len', Math.max(2, st.r.target.length)); p.appendChild(w); return p;
  },
  _letters: function (el, word, d) {
    var glow = d ? d.glow : [], extra = d ? d.extra : [];
    for (var i = 0; i < word.length; i++) { var s = document.createElement('span'); s.textContent = word[i]; if (glow.indexOf(i) >= 0) s.className = 'is-diff'; else if (extra.indexOf(i) >= 0) s.className = 'is-extra'; el.appendChild(s); }
    if (d && d.missing) for (var m = 0; m < d.missing; m++) { var e = document.createElement('span'); e.className = 'is-miss'; e.textContent = ' '; el.appendChild(e); }
  },
  _paintBoard: function () {
    var el = this._board, st = this.st, C = BlinkCameraCore, r = st.r, self = this, v = this._view, up = C.visible(st); el.innerHTML = '';
    el.classList.toggle('is-down', !up);
    if (r.game === 'snap') {
      var row = this.api.el('div', 'bcm-cards'); el.appendChild(row);
      var photo = C.photoOn(st), L = st.last;
      st.cards.forEach(function (w, i) {
        var b = self.api.el('button', 'bcm-card' + (up ? '' : ' is-back') + (up && self._flipNow ? ' is-flip' : '') + (st.chosen === i ? ' is-sel' : '') + (v.shake === i ? ' is-shake' : '') + (st.done && v.won && C.isCopy(st, i) ? ' is-gold' : ''));
        b.type = 'button'; b.setAttribute('data-k', 'card' + i); b.setAttribute('data-card', i); b.style.setProperty('--i', i);
        b.setAttribute('aria-label', up ? self._t('ariaCard', { n: i + 1, w: w }) : self._t('ariaDown', { n: i + 1 }));
        if (up) { b.setAttribute('aria-pressed', String(st.chosen === i)); var f = self.api.el('span', 'bcm-cword'); f.style.setProperty('--len', Math.max(2, w.length)); self._letters(f, w, photo && L && L.card === i && st.chosen === i ? L.diff : null); b.appendChild(f); }
        else { var bk = self.api.el('span', 'bcm-back'); bk.setAttribute('aria-hidden', 'true'); b.appendChild(bk); }
        b.addEventListener('click', function () { self._choose(i); });
        row.appendChild(b);
      });
      return;
    }
    var counted = st.last && st.last.result === 'count' && st.show, order = st.brackets.slice().sort(function (a, b) { return a - b; });
    var framed = C.framed(st), cap = C.capGlow(st), tumble = v.tumble || [];
    var mark = function (b, i, word) {
      var on = st.brackets.indexOf(i) >= 0;
      if (on) b.classList.add('is-br');
      if (framed.indexOf(i) >= 0) b.classList.add('is-framed');
      if (cap.indexOf(i) >= 0) b.classList.add('is-capglow');
      if (st.done && v.won && C.isCopy(st, i)) b.classList.add('is-gold');
      if (tumble.indexOf(i) >= 0) b.classList.add('is-tumble');
      b.setAttribute('aria-pressed', String(on));
      if (counted && on) { var k = self.api.el('span', 'bcm-num'); k.textContent = String(order.indexOf(i) + 1); k.setAttribute('aria-hidden', 'true'); b.appendChild(k); }
      b.addEventListener('click', function () { self._toggle(i); });
    };
    if (r.game === 'hunt') {
      var grid = this.api.el('div', 'bcm-grid'); el.appendChild(grid);
      st.tiles.forEach(function (w, i) {
        var b = self.api.el('button', 'bcm-tile' + (up ? '' : ' is-back') + (up && self._flipNow ? ' is-flip' : '')); b.style.setProperty('--i', i % 4); b.type = 'button'; b.setAttribute('data-k', 'tile' + i); b.setAttribute('data-item', i);
        b.setAttribute('aria-label', up ? self._t('ariaCard', { n: i + 1, w: w }) : self._t('ariaDown', { n: i + 1 }));
        if (up) { var f = self.api.el('span', 'bcm-tword'); f.style.setProperty('--len', Math.max(2, w.length)); self._letters(f, w, tumble.indexOf(i) >= 0 ? C.diff(r.target, w) : null); b.appendChild(f); mark(b, i, w); }
        else { var bk = self.api.el('span', 'bcm-back'); bk.setAttribute('aria-hidden', 'true'); b.appendChild(bk); b.addEventListener('click', function () { self._toggle(i); }); }
        grid.appendChild(b);
      });
      if (st.phase === 'count') {
        var cs = this.api.el('div', 'bcm-count'); el.appendChild(cs);
        for (var n = 1; n <= C.COUNT_MAX; n++) (function (n) {
          var t = self.api.el('button', 'bcm-num-tile' + (st.count === n ? ' is-sel' : '') + (st.done && v.won && n === st.r.copies ? ' is-gold' : '')); t.type = 'button'; t.setAttribute('data-k', 'n' + n); t.textContent = String(n); t.setAttribute('aria-pressed', String(st.count === n));
          t.addEventListener('click', function () { self._count(n); }); cs.appendChild(t);
        })(n);
      }
      return;
    }
    /* the story: one picture, the sentences as tappable words */
    var box = this.api.el('div', 'bcm-story'); el.appendChild(box);
    var img = this.api.el('img', 'bcm-spic'); img.alt = ''; img.draggable = false; img.src = this._pic(r.pic); box.appendChild(img);
    var text = this.api.el('p', 'bcm-text'); box.appendChild(text);
    /* a word, its punctuation and an elided l’ before it stay on one line: a new unit starts only at a breaking space */
    var unit = null;
    r.tokens.forEach(function (tk, i) {
      var brk = tk.sp && !/[  ]/.test(tk.sp);
      if (!unit || brk) { if (unit && brk) text.appendChild(document.createTextNode(' ')); unit = self.api.el('span', 'bcm-unit'); text.appendChild(unit); }
      else if (tk.sp) unit.appendChild(document.createTextNode(tk.sp));
      if (!tk.word) { var p = self.api.el('span', 'bcm-punct'); p.textContent = tk.t; unit.appendChild(p); return; }
      var b = self.api.el('button', 'bcm-tok'); b.type = 'button'; b.setAttribute('data-k', 'tok' + i); b.setAttribute('data-item', i); b.textContent = tk.t; if (tk.elided) b.classList.add('is-elided');
      if (up) mark(b, i, tk.t); else { b.tabIndex = -1; b.addEventListener('click', function () { self._toggle(i); }); }
      unit.appendChild(b);
    });
  },

  /* ---------------- the hand ---------------- */
  _snap: function (ms) {
    var st = this.st, C = BlinkCameraCore, self = this;
    if (st.done || st.open || this._busy) return;
    this._flash = null; this._view = {};
    C.snap(st); this.api.sound(880); this._say(st.r.target);
    if (this._live) this._live.textContent = this._t('ariaOpen', { w: st.r.target });
    this._paint();
    if (this.HOLD) return;
    this._later(function () { self._shut(); }, this.FAST ? 0 : (ms || C.blinkFor(this._blink(), 0)) + 180);
  },
  _shut: function () { var st = this.st; if (!BlinkCameraCore.shut(st)) return; this.api.sound(660); if (this._live) this._live.textContent = ''; this._flipNow = true; this._paint(); this._flipNow = false; },
  _turnDial: function () {
    /* the dial and the Blink setting are one value: turning the dial sets it */
    var i = this.DIAL.indexOf(this._blink()); if (this.api && this.api.settings) this.api.settings.blink = this.DIAL[(i + 1) % this.DIAL.length];
    this.api.sound(520); this._paint();
  },
  /* an album photo flashes its word in the lens (free play: the board stays as it is) */
  _flashWord: function (w) {
    var self = this; if (this.st.open) return;
    this._flash = w; this.api.sound(880); this._paint();
    this._later(function () { self._flash = null; self._paint(); }, BlinkCameraCore.blinkFor(this._blink(), 0));
  },
  _nudge: function () { var self = this; this._view = { nudge: true }; this._paint(); this._later(function () { if (self._view.nudge) { self._view = {}; self._paint(); } }, 1600); },
  _choose: function (i) {
    if (this._busy || this.st.done) return;
    if (!BlinkCameraCore.visible(this.st)) { this._nudge(); return; }
    if (BlinkCameraCore.choose(this.st, i)) { this._view = {}; this.api.sound(587); this._paint(); }
  },
  _toggle: function (i) {
    if (this._busy || this.st.done) return;
    if (!BlinkCameraCore.visible(this.st)) { this._nudge(); return; }
    if (BlinkCameraCore.toggle(this.st, i)) { this._view = {}; this.api.sound(this.st.brackets.indexOf(i) >= 0 ? 740 : 330); this._paint(); }
  },
  _count: function (n) { if (this._busy) return; if (BlinkCameraCore.pickCount(this.st, n)) { this._view = {}; this.api.sound(587); this._paint(); } },
  _onKey: function (ev) {
    var k = ev.key;
    if ((k === 'd' || k === 'D') && !ev.ctrlKey && !ev.metaKey && !ev.altKey) { ev.preventDefault(); this._turnDial(); return; }
    if (k === 'Enter' && ev.target === this._wrap) { ev.preventDefault(); this._check(); }
  },

  _check: function () {
    if (this._busy || this.st.done || this.st.open) return;
    var self = this, st = this.st, C = BlinkCameraCore;
    var res = C.check(st);
    if (res.ok) return this._win();
    if (res.kase === 'empty') { this.api.sound(460); if (!st.up) this._nudge(); else { this._view = {}; this._paint(); } return; }
    if (res.kase === 'count-empty' || res.kase === 'found') { this.api.sound(res.kase === 'found' ? 784 : 460); this._view = {}; this._paint(); this.api.announce(this._note.textContent || ''); return; }
    this.api.sound(196);
    if (res.kase === 'wrong') {
      /* the card shakes; at miss 1 it flips back and the camera looks again, one blink longer */
      this._busy = true; this._view = { shake: res.card }; this._paint();
      this._later(function () {
        self._busy = false; self._view = {}; self._paint(); self.api.announce(self._note.textContent || '');
        if (res.reflash) self._snap(C.blinkFor(self._blink(), st.misses));
      }, this._ms(450));
      return;
    }
    /* hunts: the brackets on look-alikes tumble off */
    this._busy = true; this._view = { tumble: res.wrong || [] }; this._paint();
    this._later(function () { self._busy = false; self._view = {}; self._paint(); self.api.announce(self._note.textContent || ''); }, this._ms(700));
  },
  _win: function () {
    var self = this, st = this.st, n = this._pool ? this._pool.length : 8;
    this._busy = true;
    if (this._album.length < n && this._album.indexOf(st.r.target) < 0) this._album.push(st.r.target);
    var at = this._album.length - 1, full = this._album.length >= n;
    this._view = { won: true }; this.api.sound(659); this._paint();
    this._later(function () { self.api.sound(784); }, this._ms(110)); this._later(function () { self.api.sound(1046); }, this._ms(220));
    /* the photo develops, then lands in the album */
    this._later(function () {
      self._view = { won: true, newAt: at, ripple: full, albumFull: full }; self._busy = false; self._paint();
      if (full) { self._later(function () { self._view = { won: true, group: true, albumFull: true }; self._paint(); }, self._ms(500)); }
      self.api.announce(self._note.textContent || '');
    }, this._ms(1500));
    this._later(function () { self._afterOk = true; var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this._ms(1500) + this.OK_MS);
  }
};

/* the iris: six blades round the lens; they slide out (open) and back (shut) */
function irisSVG() {
  var blades = '';
  for (var i = 0; i < 6; i++) blades += '<g class="bcm-blade" style="transform:rotate(' + (i * 60) + 'deg)"><path d="M0 0 L58 -36 L74 6 L0 18 Z" fill="' + (i % 2 ? '#E9E1D2' : '#D7CDBB') + '" stroke="#2A2A35" stroke-width="2.4" stroke-linejoin="round"/></g>';
  return '<svg class="bcm-iris" viewBox="-50 -50 100 100" aria-hidden="true"><defs><clipPath id="bcm-clip"><circle r="47"/></clipPath></defs><g clip-path="url(#bcm-clip)">' + blades + '</g></svg>';
}

var bcmCssDone = false;
function injectCameraCSS() {
  if (bcmCssDone || typeof document === 'undefined') return;
  bcmCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', D = 'var(--lcs-font-display,\'Baloo 2\',sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.bcm-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:14px;--bcm-ink:#2A2A35;--bcm-teal:#146B5E;--bcm-coral:#F2784B;--bcm-cream:#FFF8EC;--bcm-gold:#E8B83A;user-select:none;-webkit-user-select:none;}'
  + '.bcm-wrap:focus{outline:none;} .bcm-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}'
  /* the camera */
  + '.bcm-top{display:flex;align-items:center;justify-content:center;gap:16px;width:100%;}'
  + '.bcm-wrap.is-narrow{gap:10px;} .bcm-wrap.is-narrow .bcm-top{flex-wrap:wrap;gap:10px;}'
  + '.bcm-cam{position:relative;width:var(--bcm-cam);height:calc(var(--bcm-cam) * .633);flex:none;margin-top:calc(var(--bcm-btn) * .36 + 4px);}'
  + '.bcm-body{position:absolute;inset:0;border-radius:22px;background:var(--bcm-teal);box-shadow:inset 0 0 0 3px var(--bcm-ink),0 5px 0 #0E4C43;}'
  + '.bcm-body::before{content:"";position:absolute;left:18%;top:-10px;width:22%;height:14px;border-radius:8px 8px 0 0;background:var(--bcm-teal);box-shadow:inset 0 3px 0 var(--bcm-ink),inset 3px 0 0 var(--bcm-ink),inset -3px 0 0 var(--bcm-ink);}'
  + '.bcm-body::after{content:"";position:absolute;left:23%;top:-4px;width:12%;height:6px;border-radius:3px;background:#BFE3DC;}'
  + '.bcm-lens{position:absolute;left:50%;top:50%;width:var(--bcm-lens);height:var(--bcm-lens);transform:translate(-50%,-50%);border-radius:50%;background:var(--bcm-cream);box-shadow:0 0 0 7px var(--bcm-ink),0 0 0 11px #46505C;display:flex;align-items:center;justify-content:center;overflow:hidden;}'
  + '.bcm-lword{position:relative;z-index:0;font-family:' + D + ';font-weight:800;line-height:1;color:var(--bcm-ink);white-space:nowrap;font-size:min(var(--bcm-word),calc(var(--bcm-lens) * .84 / (var(--len) * .58)));}'
  + '.bcm-group{position:absolute;inset:18%;display:flex;align-items:center;justify-content:center;text-align:center;font-family:' + D + ';font-weight:700;font-size:14px;line-height:1.25;color:var(--bcm-ink);}'
  + '.bcm-iris{position:absolute;inset:0;width:100%;height:100%;z-index:1;}'
  + '.bcm-blade path{transition:transform .18s ease-in-out;transform-origin:0 0;}'
  + '.bcm-cam.is-open .bcm-blade path{transform:translate(64px,-8px) rotate(28deg);}'
  + '.bcm-shutter{position:absolute;right:6%;top:calc(var(--bcm-btn) * -.36);width:var(--bcm-btn);height:var(--bcm-btn);padding:0;border:0;border-radius:50%;background:var(--bcm-coral);box-shadow:inset 0 0 0 3px var(--bcm-ink),0 4px 0 #B8532F;cursor:pointer;}'
  + '.bcm-shutter:active{transform:translateY(3px);box-shadow:inset 0 0 0 3px var(--bcm-ink),0 1px 0 #B8532F;}'
  + '.bcm-shutter.is-nudge{animation:bcm-nudge .5s ease-in-out 3;} @keyframes bcm-nudge{50%{box-shadow:inset 0 0 0 3px var(--bcm-ink),0 0 0 8px rgba(242,120,75,.45);transform:scale(1.08);}}'
  + '.bcm-dial{position:absolute;left:5%;top:50%;transform:translateY(-50%);width:44px;height:44px;padding:0;border:0;border-radius:50%;background:#E9E1D2;box-shadow:inset 0 0 0 3px var(--bcm-ink);display:flex;align-items:center;justify-content:center;gap:4px;cursor:pointer;}'
  + '.bcm-dial i{display:block;width:7px;height:7px;border-radius:50%;background:#8E8676;} .bcm-dial i.is-lit{background:var(--bcm-coral);box-shadow:0 0 0 2px #fff;width:9px;height:9px;}'
  + '.bcm-slot{position:absolute;left:50%;bottom:7px;width:min(120px,40%);height:5px;margin-left:min(-60px,-20%);border-radius:3px;background:var(--bcm-ink);}'
  /* the album */
  + '.bcm-album.is-frames{display:grid;grid-template-columns:repeat(2,56px);gap:6px;}'
  + '.bcm-wrap.is-narrow .bcm-album.is-frames{grid-template-columns:repeat(4,56px);flex-basis:100%;justify-content:center;}'
  + '.bcm-frame{width:56px;height:44px;box-sizing:border-box;border-radius:6px;border:2px dashed #C9B999;background:transparent;padding:0;}'
  + '.bcm-frame.is-full{border:0;background:#fff;box-shadow:inset 0 0 0 2px var(--bcm-ink),0 2px 0 #C9B999;font-family:' + D + ';font-weight:700;font-size:min(18px,calc(48px / (var(--l,3) * .55)));color:var(--bcm-ink);cursor:pointer;overflow:hidden;white-space:nowrap;}'
  + '.bcm-frame.is-new{animation:bcm-land .45s ease-out;} @keyframes bcm-land{0%{transform:translateY(30px) scale(.6);opacity:.2;}}'
  + '.bcm-album.is-ripple .bcm-frame.is-full{animation:bcm-ripple .6s ease-in-out;} @keyframes bcm-ripple{50%{transform:scale(1.12);box-shadow:inset 0 0 0 2px var(--bcm-gold),0 0 0 4px rgba(232,184,58,.45);}}'
  + '.bcm-dots{display:grid;grid-template-columns:repeat(2,12px);gap:7px;align-content:center;justify-content:center;min-height:44px;width:48px;padding:12px 0;border:0;border-radius:24px;background:#F3EAD8;cursor:pointer;}'
  + '.bcm-dots i{display:block;width:12px;height:12px;border-radius:50%;box-shadow:inset 0 0 0 2px #B9905B;} .bcm-dots i.is-full{background:var(--bcm-teal);box-shadow:none;}'
  /* the photo */
  + '.bcm-photorow{display:flex;justify-content:center;min-height:0;width:100%;}'
  + '.bcm-photo{display:flex;align-items:center;justify-content:center;min-width:120px;height:62px;padding:6px 16px 14px;box-sizing:border-box;background:#fff;border-radius:6px;box-shadow:inset 0 0 0 2px var(--bcm-ink),0 4px 10px rgba(0,0,0,.12);animation:bcm-slide .35s ease-out;}'
  + '.bcm-pword{font-family:' + D + ';font-weight:800;font-size:34px;line-height:1;color:var(--bcm-ink);}'
  + '.bcm-wrap.is-narrow .bcm-photo{min-width:76px;max-width:92px;height:56px;padding:4px 8px 12px;} .bcm-wrap.is-narrow .bcm-pword{font-size:min(28px,calc(76px / (var(--len) * .58)));}'
  + '.bcm-photo.is-develop .bcm-pword{animation:bcm-develop 1.2s ease-out;} @keyframes bcm-develop{0%{color:#BDBDBD;filter:blur(4px);}100%{color:var(--bcm-ink);filter:blur(0);}}'
  + '@keyframes bcm-slide{0%{transform:translateY(-24px);opacity:0;}}'
  /* the board */
  + '.bcm-board{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%;}'
  + '.bcm-cards{display:grid;grid-template-columns:repeat(4,var(--bcm-card));gap:16px;justify-content:center;}'
  + '.bcm-wrap.is-narrow .bcm-cards{grid-template-columns:repeat(2,var(--bcm-card));gap:8px;}'
  + '.bcm-card,.bcm-tile{position:relative;display:flex;align-items:center;justify-content:center;padding:0;border:0;border-radius:14px;background:var(--bcm-cream);box-shadow:inset 0 0 0 3px var(--bcm-ink),0 4px 0 #C9B999;cursor:pointer;color:var(--bcm-ink);font-family:' + D + ';font-weight:800;line-height:1;}' + '.bcm-card.is-flip,.bcm-tile.is-flip{animation:bcm-flip .24s ease-out both;animation-delay:calc(var(--i,0) * 60ms);}'
  + '.bcm-card{width:var(--bcm-card);height:var(--bcm-cardh);} .bcm-tile{width:var(--bcm-tile);height:var(--bcm-tileh);border-radius:12px;}'
  + '.bcm-cword{font-size:min(var(--bcm-cardf),calc((var(--bcm-card) - 18px) / (var(--len) * .6)));white-space:nowrap;}'
  + '.bcm-tword{font-size:min(var(--bcm-tilef),calc((var(--bcm-tile) - 16px) / (var(--len) * .6)));white-space:nowrap;}'
  + '.bcm-card.is-back,.bcm-tile.is-back{background:var(--bcm-teal);box-shadow:inset 0 0 0 3px var(--bcm-ink),0 4px 0 #0E4C43;animation:none;}'
  + '.bcm-back{display:block;width:30px;height:30px;border-radius:50%;background:#0E4C43;box-shadow:inset 0 0 0 4px #BFE3DC;}'
  + '@keyframes bcm-flip{0%{transform:rotateY(80deg);}}'
  + '.bcm-card.is-sel{transform:translateY(-6px);box-shadow:inset 0 0 0 4px var(--bcm-coral),0 0 0 4px rgba(242,120,75,.3),0 8px 0 #C9B999;}'
  + '.bcm-card.is-shake{animation:bcm-shake .15s ease-in-out 3;} @keyframes bcm-shake{25%{transform:translateX(-5px);}75%{transform:translateX(5px);}}'
  + '.bcm-cword span.is-diff,.bcm-tword span.is-diff{color:#D2501F;text-shadow:0 0 8px rgba(242,120,75,.6);}'
  + '.bcm-cword span.is-extra,.bcm-tword span.is-extra{color:#D2501F;border-left:2px dashed #D2501F;padding-left:1px;}'
  + '.bcm-cword span.is-miss{display:inline-block;width:.45em;border-bottom:3px dashed #D2501F;margin-left:2px;}'
  + '.is-gold{box-shadow:inset 0 0 0 3px var(--bcm-gold),0 0 0 5px rgba(232,184,58,.4),0 4px 0 #C9B999 !important;}'
  + '.bcm-grid{display:grid;grid-template-columns:repeat(4,var(--bcm-tile));gap:8px;justify-content:center;}'
  + '.bcm-wrap.is-narrow .bcm-grid{grid-template-columns:repeat(3,var(--bcm-tile));gap:4px;}'
  /* the camera-corner bracket */
  + '.is-br::after{content:"";position:absolute;inset:-5px;pointer-events:none;--c:var(--bcm-coral);background:linear-gradient(var(--c),var(--c)) top left/14px 4px no-repeat,linear-gradient(var(--c),var(--c)) top left/4px 14px no-repeat,linear-gradient(var(--c),var(--c)) top right/14px 4px no-repeat,linear-gradient(var(--c),var(--c)) top right/4px 14px no-repeat,linear-gradient(var(--c),var(--c)) bottom left/14px 4px no-repeat,linear-gradient(var(--c),var(--c)) bottom left/4px 14px no-repeat,linear-gradient(var(--c),var(--c)) bottom right/14px 4px no-repeat,linear-gradient(var(--c),var(--c)) bottom right/4px 14px no-repeat;animation:bcm-snapbr .12s ease-out;}'
  + '@keyframes bcm-snapbr{0%{inset:-14px;opacity:0;}}'
  + '.is-framed{outline:3px dashed var(--bcm-teal);outline-offset:3px;}'
  + '.is-capglow{background:#FFE9B8 !important;}'
  + '.is-tumble{animation:bcm-tumble .6s ease-in;} @keyframes bcm-tumble{30%{transform:rotate(-6deg);}100%{transform:none;}}'
  + '.bcm-num{position:absolute;right:-8px;top:-10px;min-width:22px;height:22px;padding:0 3px;box-sizing:border-box;border-radius:11px;background:var(--bcm-teal);color:#fff;font-family:' + B + ';font-weight:800;font-size:14px;line-height:22px;text-align:center;z-index:2;}'
  + '.bcm-count{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;} .bcm-wrap.is-narrow .bcm-count{gap:4px;}'
  + '.bcm-num-tile{width:var(--bcm-ntile);height:var(--bcm-ntile);padding:0;border:0;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 3px var(--bcm-ink),0 3px 0 #C9B999;font-family:' + D + ';font-weight:800;font-size:28px;color:var(--bcm-ink);cursor:pointer;}'
  + '.bcm-num-tile.is-sel{box-shadow:inset 0 0 0 4px var(--bcm-coral),0 0 0 4px rgba(242,120,75,.3);}'
  /* the story */
  + '.bcm-story{display:flex;align-items:flex-start;gap:16px;width:100%;max-width:620px;box-sizing:border-box;padding:12px 14px;border-radius:16px;background:#fff;box-shadow:inset 0 0 0 2px #E2D6BE;}'
  + '.bcm-wrap.is-narrow .bcm-story{display:block;padding:8px 10px;} .bcm-wrap.is-narrow .bcm-spic{float:left;margin:4px 8px 0 0;}'
  + '.bcm-spic{width:var(--bcm-pic);height:var(--bcm-pic);object-fit:contain;flex:none;}'
  + '.bcm-text{margin:0;font-family:' + B + ';font-size:var(--bcm-story);line-height:1.75;color:var(--bcm-ink);}'
  + '.bcm-tok{position:relative;display:inline-block;min-height:44px;min-width:24px;text-align:center;box-sizing:border-box;padding:0 2px;margin:0;border:0;border-radius:8px;background:transparent;font:inherit;font-weight:700;line-height:44px;color:inherit;cursor:pointer;}'
  + '.bcm-tok::before{content:"";position:absolute;top:0;bottom:0;left:-7px;right:-7px;} .bcm-tok.is-elided{padding-right:0;text-align:right;} .bcm-tok:hover{background:rgba(20,107,94,.08);} .bcm-tok.is-br::after{inset:2px -3px;}'
  + '.bcm-punct{font-weight:700;margin-left:-2px;} .bcm-unit{white-space:nowrap;}'
  + '.bcm-board.is-down .bcm-text{filter:blur(7px);opacity:.55;} .bcm-board.is-down .bcm-tok{cursor:default;}'
  /* the ask strip */
  + '.bcm-ask{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;}'
  + '.bcm-note{flex:1;min-height:28px;margin:0;font-weight:700;font-size:clamp(15px,2.3vw,18px);line-height:1.3;font-family:' + B + ';color:var(--bcm-teal);text-align:center;} .bcm-note:empty{display:none;} .bcm-note.is-ok{font-weight:800;} .bcm-note.is-wrong{color:#A6461F;}'
  + '.bcm-check{min-height:52px;padding:0 22px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;font-family:' + D + ';cursor:pointer;box-shadow:0 3px 0 #C95A31;flex:none;} .bcm-check[hidden]{display:none;} .bcm-check:disabled{opacity:.6;}'
  + '.bcm-wrap.is-narrow .bcm-note{text-align:left;}'
  + '.bcm-wrap.is-tiny{gap:6px;} .bcm-wrap.is-tiny .bcm-grid{gap:3px;}' + '.bcm-wrap.is-fast *,.bcm-wrap.is-fast *::before,.bcm-wrap.is-fast *::after{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.bcm-wrap *{animation-duration:.2s !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'bcm-css'; s.textContent = css; document.head.appendChild(s);
}
