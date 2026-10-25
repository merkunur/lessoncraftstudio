/* =====================================================================
   freezing-floes-activity.js — ACTIVITY #113 of the one-by-one rebuild:
   "Domino's Two-Part Words" → THE FREEZING FLOES (RF.1.3.e; all 11
   locales).
   Design: docs/activities-rebuild/designs/113-domino-two-part.md
   ---------------------------------------------------------------------
   THE INVENTION: syllables are ice floes that only freeze together when
   they really make the picture's word, in the right order. The floes bob
   on a pond; tap one and it floats into the glowing slot under a picture
   (tap a picture to make its slot glow), or drag it to any slot. Every
   slot has three seats, whatever the word. Check is the cold snap: the
   pieces that are the word, from the left, freeze white and stay; a wrong
   piece cracks off and drifts back to the pond. When every word holds,
   the penguin waddles across the shelf and the words go onto the two
   ice shelves — two-piece words and three-piece words. Clues: Join the
   floes · Missing piece · Mixed-up word (tap two pieces to swap) · Read
   and find (push the frozen word to its picture).
   ACTIVITY LAYER ONLY: the model is freezing-floes-core.js; pictures are
   the library's; lcs-shell.js untouched (the shell's Check is hidden and
   pressed by this activity when right).
   Test seams: window.FreezingFloesActivity.st / ._pool / ._order / ._ensurePool /
   ._start / ._dims / ._render2 / .FAST / .OK_MS.
   ===================================================================== */
'use strict';

var FreezingFloesActivity = {
  id: 'freezing-floes',
  apparatusClasses: ['ff-'],

  /*STRINGS-BEGIN*/strings: {
    title:        {en:'Domino\'s Two-Part Words',de:'Silben lesen',nl:'Lees per lettergreep',da:'Læs stavelser',sv:'Läs stavelser',no:'Les stavelser',es:'Leer por sílabas',it:'Leggi per sillabe',pt:'Leia por sílabas',fr:'Lis les syllabes',fi:'Lue tavuittain'},
    instrBubble:  {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:     {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    check:        {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Comprobar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    tJoin:        {en:'Push the pieces into each picture\'s slot to make its word.',de:'Schieb die Silben in das Fach unter jedem Bild, bis das Wort dasteht.',nl:'Duw de lettergrepen in het vakje van elk plaatje, zodat het woord ontstaat.',da:'Skub stavelserne ind i rummet under hvert billede, så ordet står der.',sv:'Skjut stavelserna in i facket under varje bild så att ordet blir klart.',no:'Skyv stavelsene inn i rommet under hvert bilde, så ordet står der.',es:'Empuja las sílabas al hueco de cada dibujo para formar su palabra.',it:'Spingi le sillabe nello spazio di ogni figura per formare la sua parola.',pt:'Empurre as sílabas para o espaço de cada figura e forme a palavra.',fr:'Pousse les syllabes dans la case de chaque image pour former son mot.',fi:'Työnnä tavut kunkin kuvan lokeroon niin, että sana syntyy.'},
    tMissing:     {en:'Which piece is missing? Push it into the gap.',de:'Welche Silbe fehlt? Schieb sie in die Lücke.',nl:'Welke lettergreep ontbreekt? Duw hem in het gat.',da:'Hvilken stavelse mangler? Skub den ind i hullet.',sv:'Vilken stavelse saknas? Skjut in den i luckan.',no:'Hvilken stavelse mangler? Skyv den inn i hullet.',es:'¿Qué sílaba falta? Empújala al hueco.',it:'Quale sillaba manca? Spingila nello spazio vuoto.',pt:'Qual sílaba está faltando? Empurre-a para o espaço vazio.',fr:'Quelle syllabe manque ? Pousse-la dans le trou.',fi:'Mikä tavu puuttuu? Työnnä se aukkoon.'},
    tMixed:       {en:'The pieces are mixed up. Tap two pieces to swap them.',de:'Die Silben sind durcheinander. Tippe zwei Silben an, um sie zu tauschen.',nl:'De lettergrepen staan door elkaar. Tik twee lettergrepen aan om ze te wisselen.',da:'Stavelserne er blandet sammen. Tryk på to stavelser for at bytte dem.',sv:'Stavelserna är blandade. Tryck på två stavelser för att byta plats på dem.',no:'Stavelsene er blandet. Trykk på to stavelser for å bytte dem.',es:'Las sílabas están desordenadas. Toca dos sílabas para cambiarlas de lugar.',it:'Le sillabe sono in disordine. Tocca due sillabe per scambiarle.',pt:'As sílabas estão embaralhadas. Toque em duas sílabas para trocá-las.',fr:'Les syllabes sont dans le désordre. Touche deux syllabes pour les échanger.',fi:'Tavut ovat sekaisin. Napauta kahta tavua vaihtaaksesi niiden paikat.'},
    tRead:        {en:'Read the frozen word. Push it to its picture.',de:'Lies das gefrorene Wort. Schieb es zu seinem Bild.',nl:'Lees het bevroren woord. Duw het naar het goede plaatje.',da:'Læs det frosne ord. Skub det hen til dets billede.',sv:'Läs det frusna ordet. Skjut det till rätt bild.',no:'Les det frosne ordet. Skyv det til riktig bilde.',es:'Lee la palabra congelada. Llévala a su dibujo.',it:'Leggi la parola ghiacciata. Spingila verso la sua figura.',pt:'Leia a palavra congelada. Leve-a até a figura certa.',fr:'Lis le mot gelé. Pousse-le vers son image.',fi:'Lue jäätynyt sana. Työnnä se oikean kuvan luo.'},
    nudge:        {en:'Tap a piece of ice: it floats to the glowing slot.',de:'Tippe eine Eisscholle an: Sie schwimmt zum leuchtenden Fach.',nl:'Tik een ijsschots aan: hij drijft naar het oplichtende vakje.',da:'Tryk på en isflage: Den flyder hen til det lysende rum.',sv:'Tryck på ett isflak: det flyter till det lysande facket.',no:'Trykk på et isflak: Det flyter til det lysende rommet.',es:'Toca un pedazo de hielo: flota hasta el hueco que brilla.',it:'Tocca un pezzo di ghiaccio: galleggia fino allo spazio che brilla.',pt:'Toque num pedaço de gelo: ele flutua até o espaço que brilha.',fr:'Touche un morceau de glace : il flotte jusqu’à la case qui brille.',fi:'Napauta jäälauttaa: se lipuu hohtavaan lokeroon.'},
    hintEmpty:    {en:'Push the pieces of each picture\'s word into its slot.',de:'Schieb die Silben jedes Wortes in das Fach unter seinem Bild.',nl:'Duw de lettergrepen van elk woord in het vakje onder het plaatje.',da:'Skub stavelserne fra hvert ord ind i rummet under billedet.',sv:'Skjut varje ords stavelser in i facket under bilden.',no:'Skyv stavelsene i hvert ord inn i rommet under bildet.',es:'Empuja las sílabas de cada palabra al hueco de su dibujo.',it:'Spingi le sillabe di ogni parola nello spazio della sua figura.',pt:'Empurre as sílabas de cada palavra para o espaço da figura.',fr:'Pousse les syllabes de chaque mot dans la case de son image.',fi:'Työnnä kunkin sanan tavut sen kuvan lokeroon.'},
    hintMissingEmpty:{en:'Push a piece of ice into the gap.',de:'Schieb eine Eisscholle in die Lücke.',nl:'Duw een ijsschots in het gat.',da:'Skub en isflage ind i hullet.',sv:'Skjut in ett isflak i luckan.',no:'Skyv et isflak inn i hullet.',es:'Empuja un pedazo de hielo al hueco.',it:'Spingi un pezzo di ghiaccio nello spazio vuoto.',pt:'Empurre um pedaço de gelo para o espaço vazio.',fr:'Pousse un morceau de glace dans le trou.',fi:'Työnnä jäälautta aukkoon.'},
    hintReadEmpty:{en:'Push the frozen word to one of the pictures.',de:'Schieb das gefrorene Wort zu einem der Bilder.',nl:'Duw het bevroren woord naar een van de plaatjes.',da:'Skub det frosne ord hen til et af billederne.',sv:'Skjut det frusna ordet till en av bilderna.',no:'Skyv det frosne ordet til et av bildene.',es:'Lleva la palabra congelada a uno de los dibujos.',it:'Spingi la parola ghiacciata verso una delle figure.',pt:'Leve a palavra congelada até uma das figuras.',fr:'Pousse le mot gelé vers une des images.',fi:'Työnnä jäätynyt sana jonkin kuvan luo.'},
    hintCrack:    {en:'Some words cracked. Read each piece out loud. Which pieces make the picture\'s name?',de:'Manche Wörter sind gesprungen. Lies jede Silbe laut. Welche Silben ergeben den Namen des Bildes?',nl:'Sommige woorden zijn gebarsten. Lees elke lettergreep hardop. Welke lettergrepen vormen de naam van het plaatje?',da:'Nogle ord er revnet. Læs hver stavelse højt. Hvilke stavelser giver billedets navn?',sv:'Några ord sprack. Läs varje stavelse högt. Vilka stavelser blir bildens namn?',no:'Noen ord sprakk. Les hver stavelse høyt. Hvilke stavelser blir navnet på bildet?',es:'Algunas palabras se rompieron. Lee cada sílaba en voz alta. ¿Qué sílabas forman el nombre del dibujo?',it:'Alcune parole si sono rotte. Leggi ogni sillaba ad alta voce. Quali sillabe formano il nome della figura?',pt:'Algumas palavras racharam. Leia cada sílaba em voz alta. Quais sílabas formam o nome da figura?',fr:'Des mots se sont fendus. Lis chaque syllabe à voix haute. Quelles syllabes font le nom de l’image ?',fi:'Jotkin sanat halkesivat. Lue jokainen tavu ääneen. Mistä tavuista tulee kuvan nimi?'},
    hintStart:    {en:'Start with the piece that begins the picture\'s name, then find what comes next.',de:'Fang mit der Silbe an, mit der der Name des Bildes beginnt, und such dann die nächste.',nl:'Begin met de lettergreep waarmee de naam van het plaatje begint, en zoek dan de volgende.',da:'Begynd med den stavelse, billedets navn starter med, og find så den næste.',sv:'Börja med stavelsen som bildens namn börjar med och leta sedan upp nästa.',no:'Begynn med stavelsen som navnet på bildet starter med, og finn så den neste.',es:'Comienza con la sílaba con la que empieza el nombre del dibujo y luego busca la siguiente.',it:'Comincia dalla sillaba con cui inizia il nome della figura, poi cerca quella dopo.',pt:'Comece pela sílaba que inicia o nome da figura e depois procure a próxima.',fr:'Commence par la syllabe qui ouvre le nom de l’image, puis cherche la suivante.',fi:'Aloita tavusta, jolla kuvan nimi alkaa, ja etsi sitten seuraava.'},
    hintMixed2:   {en:'Which piece comes first in the picture\'s name? The frost shows it.',de:'Welche Silbe kommt im Namen des Bildes zuerst? Der Frost zeigt sie dir.',nl:'Welke lettergreep komt eerst in de naam van het plaatje? De rijp laat het zien.',da:'Hvilken stavelse kommer først i billedets navn? Frosten viser den.',sv:'Vilken stavelse kommer först i bildens namn? Frosten visar den.',no:'Hvilken stavelse kommer først i navnet på bildet? Frosten viser den.',es:'¿Qué sílaba va primero en el nombre del dibujo? La escarcha te la muestra.',it:'Quale sillaba viene per prima nel nome della figura? La brina te la mostra.',pt:'Qual sílaba vem primeiro no nome da figura? A geada mostra qual é.',fr:'Quelle syllabe vient en premier dans le nom de l’image ? Le givre te la montre.',fi:'Mikä tavu tulee ensin kuvan nimessä? Huurre näyttää sen.'},
    hintRead:     {en:'Read the word again, piece by piece. Which picture is it?',de:'Lies das Wort noch einmal, Silbe für Silbe. Welches Bild ist es?',nl:'Lees het woord nog eens, lettergreep voor lettergreep. Welk plaatje is het?',da:'Læs ordet igen, stavelse for stavelse. Hvilket billede er det?',sv:'Läs ordet igen, stavelse för stavelse. Vilken bild är det?',no:'Les ordet igjen, stavelse for stavelse. Hvilket bilde er det?',es:'Lee otra vez la palabra, sílaba por sílaba. ¿Qué dibujo es?',it:'Rileggi la parola, sillaba per sillaba. Quale figura è?',pt:'Leia a palavra de novo, sílaba por sílaba. Qual é a figura?',fr:'Relis le mot, syllabe par syllabe. Quelle image est-ce ?',fi:'Lue sana uudelleen tavu tavulta. Mikä kuva se on?'},
    hintRead2:    {en:'Say each picture\'s name. Which one starts with {first}?',de:'Sag den Namen jedes Bildes. Welches Bild fängt mit {first} an?',nl:'Zeg de naam van elk plaatje. Welke begint met {first}?',da:'Sig navnet på hvert billede. Hvilket begynder med {first}?',sv:'Säg namnet på varje bild. Vilket börjar med {first}?',no:'Si navnet på hvert bilde. Hvilket begynner med {first}?',es:'Di el nombre de cada dibujo. ¿Cuál empieza con {first}?',it:'Di’ il nome di ogni figura. Quale comincia con {first}?',pt:'Fale o nome de cada figura. Qual começa com {first}?',fr:'Dis le nom de chaque image. Laquelle commence par {first} ?',fi:'Sano jokaisen kuvan nimi. Minkä kuvan nimi alkaa tavulla {first}?'},
    okJoin:       {en:'{list}: all frozen!',de:'{list}: alles gefroren!',nl:'{list}: alles bevroren!',da:'{list}: alt er frosset!',sv:'{list}: allt har frusit!',no:'{list}: alt er frosset!',es:'{list}: ¡todo congelado!',it:'{list}: tutto ghiacciato!',pt:'{list}: tudo congelado!',fr:'{list} : tout est gelé !',fi:'{list}: kaikki jäätyi!'},
    okMissing:    {en:'{parts} = {word}!',de:'{parts} = {word}!',nl:'{parts} = {word}!',da:'{parts} = {word}!',sv:'{parts} = {word}!',no:'{parts} = {word}!',es:'¡{parts} = {word}!',it:'{parts} = {word}!',pt:'{parts} = {word}!',fr:'{parts} = {word} !',fi:'{parts} = {word}!'},
    okMixed:      {en:'{parts}: {word}, all in order!',de:'{parts}: {word}, alles in der richtigen Reihenfolge!',nl:'{parts}: {word}, alles op volgorde!',da:'{parts}: {word}, alt i rigtig rækkefølge!',sv:'{parts}: {word}, allt i rätt ordning!',no:'{parts}: {word}, alt i riktig rekkefølge!',es:'{parts}: ¡{word}, todo en orden!',it:'{parts}: {word}, tutto in ordine!',pt:'{parts}: {word}, tudo na ordem certa!',fr:'{parts} : {word}, tout est dans l’ordre !',fi:'{parts}: {word}, kaikki oikeassa järjestyksessä!'},
    okRead:       {en:'{parts}: {word}!',de:'{parts}: {word}!',nl:'{parts}: {word}!',da:'{parts}: {word}!',sv:'{parts}: {word}!',no:'{parts}: {word}!',es:'{parts}: ¡{word}!',it:'{parts}: {word}!',pt:'{parts}: {word}!',fr:'{parts} : {word} !',fi:'{parts}: {word}!'},
    aShelf:       {en:'Ice shelves: two-piece and three-piece words you made',de:'Eisregal: deine Wörter mit zwei und drei Silben',nl:'IJsplank: je woorden met twee en drie lettergrepen',da:'Ishylde: dine ord med to og tre stavelser',sv:'Ishylla: dina ord med två och tre stavelser',no:'Ishylle: ordene dine med to og tre stavelser',es:'Estante de hielo: tus palabras de dos y tres sílabas',it:'Mensola di ghiaccio: le tue parole di due e tre sillabe',pt:'Prateleira de gelo: suas palavras de duas e três sílabas',fr:'Étagère de glace : tes mots de deux et trois syllabes',fi:'Jäähylly: kaksi- ja kolmitavuiset sanasi'},
    aPic:         {en:'Picture: {name}. Tap to send the ice here.',de:'Bild: {name}. Tippen, um das Eis hierher zu schicken.',nl:'Plaatje: {name}. Tik om het ijs hierheen te sturen.',da:'Billede: {name}. Tryk for at sende isen herhen.',sv:'Bild: {name}. Tryck för att skicka isen hit.',no:'Bilde: {name}. Trykk for å sende isen hit.',es:'Dibujo: {name}. Toca para mandar el hielo aquí.',it:'Figura: {name}. Tocca per mandare qui il ghiaccio.',pt:'Figura: {name}. Toque para mandar o gelo para cá.',fr:'Image : {name}. Touche pour envoyer la glace ici.',fi:'Kuva: {name}. Napauta lähettääksesi jään tänne.'},
    aInlet:       {en:'Slot: {pieces}. Tap to take the last piece back.',de:'Fach: {pieces}. Tippen nimmt die letzte Silbe zurück.',nl:'Vakje: {pieces}. Tik om de laatste lettergreep terug te nemen.',da:'Rum: {pieces}. Tryk for at tage den sidste stavelse tilbage.',sv:'Fack: {pieces}. Tryck för att ta tillbaka den sista stavelsen.',no:'Rom: {pieces}. Trykk for å ta tilbake den siste stavelsen.',es:'Hueco: {pieces}. Toca para quitar la última sílaba.',it:'Spazio: {pieces}. Tocca per togliere l’ultima sillaba.',pt:'Espaço: {pieces}. Toque para tirar a última sílaba.',fr:'Case : {pieces}. Touche pour reprendre la dernière syllabe.',fi:'Lokero: {pieces}. Napauta ottaaksesi viimeisen tavun takaisin.'},
    aInletEmpty:  {en:'Slot: empty',de:'Fach: leer',nl:'Vakje: leeg',da:'Rum: tomt',sv:'Fack: tomt',no:'Rom: tomt',es:'Hueco: vacío',it:'Spazio: vuoto',pt:'Espaço: vazio',fr:'Case : vide',fi:'Lokero: tyhjä'},
    aFloe:        {en:'Ice piece: {s}',de:'Eisscholle: {s}',nl:'IJsschots: {s}',da:'Isflage: {s}',sv:'Isflak: {s}',no:'Isflak: {s}',es:'Pedazo de hielo: {s}',it:'Pezzo di ghiaccio: {s}',pt:'Pedaço de gelo: {s}',fr:'Morceau de glace : {s}',fi:'Jäälautta: {s}'},
    aWord:        {en:'Frozen word: {w}',de:'Gefrorenes Wort: {w}',nl:'Bevroren woord: {w}',da:'Frosset ord: {w}',sv:'Fruset ord: {w}',no:'Frosset ord: {w}',es:'Palabra congelada: {w}',it:'Parola ghiacciata: {w}',pt:'Palavra congelada: {w}',fr:'Mot gelé : {w}',fi:'Jäätynyt sana: {w}'},
    aCracked:     {en:'Cracked: {s} floated away.',de:'Gesprungen: {s} treibt davon.',nl:'Gebarsten: {s} drijft weg.',da:'Revnet: {s} flyder væk.',sv:'Sprucket: {s} flyter iväg.',no:'Sprukket: {s} flyter bort.',es:'Se rompió: {s} se aleja flotando.',it:'Rotto: {s} si allontana.',pt:'Rachou: {s} saiu flutuando.',fr:'Fendu : {s} s’éloigne.',fi:'Halkesi: {s} lipui pois.'},
    aPenguin:     {en:'Penguin',de:'Pinguin',nl:'Pinguïn',da:'Pingvin',sv:'Pingvin',no:'Pingvin',es:'Pingüino',it:'Pinguino',pt:'Pinguim',fr:'Manchot',fi:'Pingviini'},
    setClue:      {en:'Clue',de:'Aufgabe',nl:'Opdracht',da:'Opgave',sv:'Uppgift',no:'Oppgave',es:'Actividad',it:'Attività',pt:'Atividade',fr:'Consigne',fi:'Tehtävä'},
    cJoin:        {en:'Join the floes',de:'Silben verbinden',nl:'Lettergrepen koppelen',da:'Sæt stavelser sammen',sv:'Sätt ihop stavelser',no:'Sett sammen stavelser',es:'Une las sílabas',it:'Unisci le sillabe',pt:'Junte as sílabas',fr:'Assemble les syllabes',fi:'Yhdistä tavut'},
    cMissing:     {en:'Missing piece',de:'Fehlende Silbe',nl:'Ontbrekende lettergreep',da:'Manglende stavelse',sv:'Stavelsen som saknas',no:'Stavelsen som mangler',es:'Sílaba que falta',it:'Sillaba mancante',pt:'Sílaba que falta',fr:'Syllabe manquante',fi:'Puuttuva tavu'},
    cMixed:       {en:'Mixed-up word',de:'Durcheinander',nl:'Door elkaar',da:'Blandet ord',sv:'Blandat ord',no:'Blandet ord',es:'Palabra desordenada',it:'Parola in disordine',pt:'Palavra embaralhada',fr:'Mot mélangé',fi:'Sekaisin oleva sana'},
    cRead:        {en:'Read and find',de:'Lesen und finden',nl:'Lezen en zoeken',da:'Læs og find',sv:'Läs och hitta',no:'Les og finn',es:'Lee y encuentra',it:'Leggi e trova',pt:'Leia e encontre',fr:'Lis et trouve',fi:'Lue ja löydä'}
  },/*STRINGS-END*/

  defaults: { clue: 'join' },
  settings: [
    { key: 'clue', type: 'choice', labelKey: 'setClue', options: [{ value: 'join', labelKey: 'cJoin' }, { value: 'missing', labelKey: 'cMissing' }, { value: 'mixed', labelKey: 'cMixed' }, { value: 'read', labelKey: 'cRead' }] }
  ],
  OK_MS: 4200, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._at = 0;
    this._timers = []; this._ro = null; this._view = {}; this._shelf = { 2: [], 3: [] }; this._drag = null; this._dragEl = null; this._dragEnd = 0; this._nudged = false;
    injectFreezingFloesCSS();
  },
  destroy: function () { this._clearTimers(); this._endDrag(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return FreezingFloesCore.locale(((this.api && this.api.lang) || 'en')); },
  _clue: function () { return FreezingFloesCore.clueOf(this._setting('clue')); },
  _key: function () { return this._loc() + '/' + this._clue(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = FreezingFloesCore.rounds(this._loc(), this._clue(), 0); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = FreezingFloesCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var P = C.plan(this._loc(), this._clue(), Math.random, fresh ? null : this._prev, pass);
      this._prev = P.order; this._order = P.order.slice(); this._pos = P.pos; this._orders = P.orders; this._perms = P.perms; this._set = P.set; this._orderForPool = pool; this._pass = pass;
    }
    var r = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'freezingfloes.' + this._key() + '.' + (this._set || 0) + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { var line = this._t({ join: 'tJoin', missing: 'tMissing', mixed: 'tMixed', read: 'tRead' }[this.st.clue]); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers(); this._endDrag(); this._at = at || 0;
    var i = this._at, opts = { rnd: Math.random, pos: this._pos ? this._pos[i] : null, order: this._orders ? this._orders[i] : null, perm: this._perms ? this._perms[i] : null };
    this.st = FreezingFloesCore.newState(this._loc(), this._clue(), this._set || 0, r, opts);
    this._view = { note: '', ok: '', walk: false, cracked: null };
    if (!this._nudged && this.st.clue === 'join') { this._view.note = this._t('nudge'); this._view.nudge = true; }
    this._setPrompt();
  },
  _clearHelp: function () { if (this._view.nudge) this._nudged = true; this._view.note = ''; this._view.nudge = false; this._view.cracked = null; },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : this._pool[0], 0); this._render2(); this._watchWidth(); },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected || self._drag) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'ff-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="ff-shelves" role="list"></div><div class="ff-shelf"></div><div class="ff-pond"></div><div class="ff-foot"></div><p class="ff-note" aria-live="polite"></p><p class="ff-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  _dims: function () {
    var W = this._width(), w = Math.min(W, 700), B = FreezingFloesCore.band(W), many = this.st ? this.st.pics.length > 1 : true;
    var pic = many ? (B.wide ? 112 : 64) : (B.wide ? 150 : B.tiny ? 96 : 112);
    return { w: w, wide: B.wide, tiny: B.tiny, many: many, pic: pic, rows: many && !B.wide };
  },
  _img: function (key) { return '/image-library-webp/themes/' + FreezingFloesCore.word(this._loc(), key).pic + '@2x.webp'; },
  _speak: function (text) { try { if (window.LCSAudio && window.LCSAudio.speak) window.LCSAudio.speak({ type: 'word', text: text, lang: this._loc(), rate: 0.85 }); } catch (e) {} },
  _sr: function (s) { var el = this._qs('.ff-sr'); if (el) el.textContent = s; },

  _paint_: function () {
    var C = FreezingFloesCore, st = this.st, D = this._dims(), v = this._view, self = this;
    this._wrap.className = 'ff-wrap ' + (D.wide ? 'is-wide' : 'is-narrow') + (D.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' clue-' + st.clue + (D.rows ? ' is-rows' : '') + (D.many ? ' is-many' : ' is-one');
    this._wrap.style.setProperty('--ff-pic', D.pic + 'px');
    /* the two ice shelves: two-piece and three-piece words made so far */
    var sh = this._qs('.ff-shelves'); sh.setAttribute('aria-label', this._t('aShelf')); sh.innerHTML = '';
    [2, 3].forEach(function (n) {
      var row = document.createElement('div'); row.className = 'ff-ledge'; row.setAttribute('role', 'listitem');
      row.innerHTML = '<span class="ff-mark" aria-hidden="true">' + new Array(n + 1).join('<i></i>') + '</span>' + self._shelf[n].slice(-4).map(function (w) { return '<span class="ff-tag">' + esc(w) + '</span>'; }).join('');
      sh.appendChild(row);
    });
    /* the ice shelf: pictures, each with its three-seat slot */
    var shelf = this._qs('.ff-shelf'); shelf.innerHTML = '';
    var frost = C.frost(st) || [];
    st.pics.forEach(function (key, i) {
      var w = C.word(st.loc, key), col = document.createElement('div'); col.className = 'ff-col' + (st.clue !== 'mixed' && st.active === i && !st.done ? ' is-active' : '') + (st.done ? ' is-frozen' : '');
      var pic = self._btn('ff-pic', 'pic-' + i, self._t('aPic', { name: w.w }), '<img src="' + self._img(key) + '" alt="" width="' + D.pic + '" height="' + D.pic + '" draggable="false"><span class="ff-ice" aria-hidden="true"></span>');
      pic.style.width = pic.style.height = (D.pic + 8) + 'px';
      pic.addEventListener('click', function () { if (FreezingFloesCore.setActive(st, i) === 'set') { self._paint(); } self._speak(w.w); });
      col.appendChild(pic);
      col.appendChild(self._inlet(i, frost));
      shelf.appendChild(col);
    });
    /* the penguin steps aside when a picture on the shelf is a penguin */
    var peng = document.createElement('img'); if (st.pics.indexOf('penguin') >= 0) peng.style.display = 'none'; peng.className = 'ff-penguin' + (v.walk ? ' is-walk' : ''); peng.src = '/image-library-webp/themes/animals/penguin@2x.webp'; peng.alt = this._t('aPenguin'); peng.setAttribute('draggable', 'false');
    shelf.appendChild(peng);
    /* the pond */
    var pond = this._qs('.ff-pond'); pond.innerHTML = ''; pond.classList.toggle('is-empty', st.clue === 'read' ? st.at >= 0 : !st.pond.length);
    if (st.clue === 'read') {
      if (st.at < 0) {
        var wd = C.word(st.loc, st.pics[st.right]), g = this._btn('ff-group', 'group', this._t('aWord', { w: st.group.map(function (id) { return st.floes[id].s; }).join('') }),
          st.group.map(function (id, k) { return (k ? '<i class="ff-seam is-frozen"></i>' : '') + '<span class="ff-piece">' + esc(st.floes[id].s) + '</span>'; }).join(''));
        g.disabled = st.done; this._wireDrag(g, { group: true }); g.addEventListener('click', function () { if (self._afterDrag(g)) return; self._moveWord(st.active); });
        pond.appendChild(g); void wd;
      }
    } else st.pond.forEach(function (id, n) {
      var f = st.floes[id], b = self._btn('ff-floe' + (frost.indexOf(id) >= 0 ? ' is-frost' : '') + (v.cracked && v.cracked.indexOf(id) >= 0 ? ' is-cracked' : ''), 'floe-' + id, self._t('aFloe', { s: f.s }), '<span class="ff-piece">' + esc(f.s) + '</span>');
      b.style.animationDelay = (-(n * 1.3) % 7) + 's';
      b.disabled = st.done || st.clue === 'mixed';
      self._wireDrag(b, { id: id });
      b.addEventListener('click', function () { if (self._afterDrag(b)) return; self._place(id, null); });
      pond.appendChild(b);
    });
    var foot = this._qs('.ff-foot'); foot.innerHTML = '';
    var chk = this._btn('ff-check', 'check', null, '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7" stroke="#FFF" stroke-width="2.4" stroke-linecap="round"/></svg><span>' + esc(this._t('check')) + '</span>');
    chk.disabled = st.done; chk.addEventListener('click', function () { self._check(); });
    foot.appendChild(chk);
    var note = this._qs('.ff-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'ff-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'ff-note' + (v.nudge ? ' is-nudge' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'ff-note'; }
  },
  /* a slot: three seats; Join / Missing / Read — the slot is one button (tap hands back the last piece, or brings the
     frozen word); Mixed-up — each seat is a button (tap two to swap) */
  _inlet: function (i, frost) {
    var C = FreezingFloesCore, st = this.st, self = this, S = st.inlets[i], pieces = S.filter(function (x) { return x != null; }).map(function (id) { return st.floes[id].s; });
    var seatHtml = function (k) {
      var id = S[k], gap = st.clue === 'missing' && k === st.gap && id == null, fz = st.frozen[i][k] || (st.given && st.given[k]);
      return (k && S[k - 1] != null && id != null ? '<i class="ff-seam' + (st.frozen[i][k] && st.frozen[i][k - 1] || st.done ? ' is-frozen' : '') + '"></i>' : '') +
        '<span class="ff-seat' + (id != null ? ' is-full' : '') + (fz ? ' is-frozen' : '') + (gap ? ' is-gap' : '') + '">' + (id != null ? esc(st.floes[id].s) : '') + '</span>';
    };
    if (st.clue === 'mixed') {
      var box = document.createElement('div'); box.className = 'ff-inlet is-mixed'; box.setAttribute('role', 'group');
      S.forEach(function (id, k) {
        if (id == null) return;
        var fz = st.frozen[i][k], b = self._btn('ff-mseat' + (fz ? ' is-frozen' : '') + (st.sel === k ? ' is-sel' : '') + (frost.indexOf(id) >= 0 ? ' is-frost' : ''), 'seat-' + k, self._t('aFloe', { s: st.floes[id].s }), esc(st.floes[id].s));
        b.disabled = st.done || fz;
        b.setAttribute('data-seat', String(k));
        self._wireDrag(b, { seat: k });
        b.addEventListener('click', function () { if (self._afterDrag(b)) return; self._tapSeat(k); });
        box.appendChild(b);
      });
      return box;
    }
    var hasBack = st.clue === 'read' ? st.at === i : S.some(function (id, k) { return id != null && !st.frozen[i][k] && !(st.given && st.given[k]); });
    var b2 = this._btn('ff-inlet' + (st.marks && st.marks.wrongPic === i ? ' is-wrong' : ''), 'inlet-' + i, pieces.length ? this._t('aInlet', { pieces: pieces.join(' ') }) : this._t('aInletEmpty'), [0, 1, 2].map(seatHtml).join(''));
    b2.setAttribute('data-inlet', String(i));
    b2.disabled = st.done || (st.clue === 'read' ? false : !hasBack);
    b2.addEventListener('click', function () {
      if (self._afterDrag(b2)) return;
      if (st.clue === 'read') { if (st.at === i) self._back(i); else self._moveWord(i); return; }
      self._back(i);
    });
    return b2;
  },

  /* ---------------- the hand ---------------- */
  _place: function (id, i) {
    var C = FreezingFloesCore, st = this.st, r = C.place(st, id, i);
    if (r !== 'placed') { this.api.sound(200); this._paint(); return; }
    this.api.sound(440); this._clearHelp(); this._paint();
  },
  _back: function (i) { if (FreezingFloesCore.unseat(this.st, i) === 'no') return; this.api.sound(300); this._clearHelp(); this._paint(); },
  _moveWord: function (i) { if (FreezingFloesCore.moveWord(this.st, i) !== 'moved') return; this.api.sound(440); this._clearHelp(); this._paint(); },
  _tapSeat: function (k) {
    var st = this.st;
    if (st.sel == null) { st.sel = k; this.api.sound(520); this._paint(); return; }
    if (st.sel === k) { st.sel = null; this._paint(); return; }
    var a = st.sel; st.sel = null;
    if (FreezingFloesCore.swap(st, a, k) === 'swapped') { this.api.sound(600); this._clearHelp(); }
    this._paint();
  },
  _wireDrag: function (el, what) {
    var self = this;
    el.addEventListener('pointerdown', function (e) {
      if (e.button != null && e.button !== 0) return; if (el.disabled || self.st.done) return;
      var dr = { el: el, what: what, x: e.clientX, y: e.clientY, moved: false, ghost: null };
      self._endDrag(); self._drag = dr;
      dr.move = function (ev) {
        if (!dr.moved && Math.abs(ev.clientX - dr.x) + Math.abs(ev.clientY - dr.y) < 8) return;
        if (!dr.moved) { dr.moved = true; el.classList.add('is-dragging'); var g = document.createElement('div'); g.className = 'ff-dragfloe'; g.textContent = el.textContent; document.body.appendChild(g); dr.ghost = g; }
        ev.preventDefault(); dr.ghost.style.left = ev.clientX + 'px'; dr.ghost.style.top = ev.clientY + 'px';
      };
      dr.up = function (ev) {
        var moved = dr.moved, x = ev.clientX, y = ev.clientY; self._endDrag();
        if (!moved) return; self._dragEl = el; self._dragEnd = Date.now();
        if (what.seat != null) { var s = self._at2(x, y, '[data-seat]', 'data-seat'); if (s >= 0 && s !== what.seat) { self.st.sel = what.seat; self._tapSeat(s); } else self._paint(); return; }
        var inl = self._at2(x, y, '[data-inlet]', 'data-inlet');
        if (inl < 0) { self._paint(); return; }
        if (what.group) self._moveWord(inl); else self._place(what.id, inl);
      };
      window.addEventListener('pointermove', dr.move, { passive: false }); window.addEventListener('pointerup', dr.up); window.addEventListener('pointercancel', dr.up);
    });
  },
  _afterDrag: function (el) { return this._dragEl === el && Date.now() - this._dragEnd < 400; },
  _endDrag: function () {
    var dr = this._drag; if (!dr) return;
    window.removeEventListener('pointermove', dr.move); window.removeEventListener('pointerup', dr.up); window.removeEventListener('pointercancel', dr.up);
    if (dr.ghost && dr.ghost.parentNode) dr.ghost.parentNode.removeChild(dr.ghost);
    if (dr.el) dr.el.classList.remove('is-dragging'); this._drag = null;
  },
  _at2: function (x, y, sel, attr) { var els = this._wrap ? this._wrap.querySelectorAll(sel) : []; for (var i = 0; i < els.length; i++) { var r = els[i].getBoundingClientRect(); if (x >= r.left - 6 && x <= r.right + 6 && y >= r.top - 10 && y <= r.bottom + 10) return +els[i].getAttribute(attr); } return -1; },

  /* ---------------- the cold snap ---------------- */
  _check: function () {
    var C = FreezingFloesCore, st = this.st, v = this._view;
    if (st.done) return;
    this._nudged = true; st.sel = null;
    var a = C.check(st);
    if (a.result === 'ok') { this._success(); return; }
    var h = C.hint(st); v.nudge = false; v.note = this._t(h.key, h.args);
    if (a.result === 'tray') { this.api.sound(200); this._paint(); this.api.announce(v.note); return; }
    this.api.sound(180); v.cracked = st.marks && st.marks.cracked ? st.marks.cracked.slice() : null;
    if (v.cracked && v.cracked.length) this._sr(v.cracked.map(function (id) { return this._t('aCracked', { s: st.floes[id].s }); }, this).join(' '));
    this._paint(); this.api.announce(v.note);
  },
  _success: function () {
    var C = FreezingFloesCore, st = this.st, v = this._view, self = this, words = st.pics.map(function (k) { return C.word(st.loc, k); });
    var parts = function (w, sep) { return w.syl.join(sep); };
    if (st.clue === 'join') v.ok = this._t('okJoin', { list: words.map(function (w) { return parts(w, '–'); }).join(', ') });
    else if (st.clue === 'missing') v.ok = this._t('okMissing', { parts: parts(words[0], ' + '), word: words[0].w });
    else if (st.clue === 'mixed') v.ok = this._t('okMixed', { parts: parts(words[0], '–'), word: words[0].w });
    else { var w = words[st.right]; v.ok = this._t('okRead', { parts: parts(w, '–'), word: w.w }); }
    (st.clue === 'read' ? [words[st.right]] : words).forEach(function (w) { var n = w.syl.length >= 3 ? 3 : 2; self._shelf[n].push(w.w); });
    v.walk = !this.FAST;
    this.api.sound(988); this._paint(); this.api.announce(v.ok);
    this._advance(v.ok.length * 60 + 3800);
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, Math.max(this.OK_MS, this.OK_MS === 4200 ? ms : 0));
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectFreezingFloesCSS() {
  if (typeof document === 'undefined' || document.getElementById('ff-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif";
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.ff-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:12px;user-select:none;-webkit-user-select:none;} .ff-wrap:focus{outline:none;} .ff-wrap.is-narrow{gap:9px;}'
  + '.ff-shelves{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;width:100%;} .ff-ledge{display:flex;align-items:center;gap:4px;min-height:26px;padding:2px 8px;border-radius:8px;background:#E8F4F8;box-shadow:inset 0 -3px 0 #BFDCE6;} .ff-mark{display:inline-flex;gap:2px;margin-right:4px;} .ff-mark i{display:block;width:10px;height:8px;border-radius:2px;background:#FFFFFF;box-shadow:0 0 0 1px #8FB9C8;}'
  + '.ff-tag{padding:0 5px;border-radius:4px;background:#FFFFFF;box-shadow:0 0 0 1px #8FB9C8;font-family:' + H + ';font-weight:700;font-size:13px;line-height:1.3;color:#1F4E5F;} .ff-wrap.is-narrow .ff-shelves{display:none;}'
  + '.ff-shelf{position:relative;display:flex;justify-content:center;align-items:flex-start;gap:14px;width:100%;padding:10px 6px 12px;box-sizing:border-box;border-radius:16px;background:linear-gradient(#F4FBFD,#DDF0F6);box-shadow:inset 0 -5px 0 #BFDCE6;}'
  + '.ff-wrap.is-rows .ff-shelf{flex-direction:column;align-items:stretch;gap:6px;padding:6px 8px 8px;}'
  + '.ff-col{display:flex;flex-direction:column;align-items:center;gap:8px;border-radius:14px;padding:4px;} .ff-wrap.is-rows .ff-col{flex-direction:row;gap:8px;padding:2px;}'
  + '.ff-col.is-active{box-shadow:0 0 0 3px #7FD3EE;background:rgba(255,255,255,.55);}'
  + '.ff-pic{position:relative;display:flex;align-items:center;justify-content:center;padding:0;border:3px solid #1F4E5F;border-radius:16px;background:#FFF8EC;cursor:pointer;overflow:hidden;flex:none;} .ff-pic img{display:block;object-fit:contain;pointer-events:none;}'
  + '.ff-ice{position:absolute;inset:0;background:linear-gradient(160deg,rgba(255,255,255,.55),rgba(190,230,245,.35));opacity:0;transition:opacity .4s;} .ff-col.is-frozen .ff-ice{opacity:1;} .ff-wrap.is-fast .ff-ice{transition:none;}'
  + '.ff-inlet{display:flex;align-items:center;justify-content:center;gap:0;min-width:calc(var(--ff-pic) + 8px);min-height:48px;padding:4px 6px;box-sizing:border-box;border:0;border-radius:12px;background:#9FD3E3;box-shadow:inset 0 3px 6px rgba(31,78,95,.35);cursor:pointer;} .ff-inlet:disabled{cursor:default;}'
  + '.ff-wrap.is-rows .ff-inlet{flex:1;} .ff-wrap.is-one .ff-inlet{min-width:220px;min-height:60px;} .ff-inlet.is-wrong{box-shadow:inset 0 3px 6px rgba(31,78,95,.35),0 0 0 3px #E0503C;}'
  + '.ff-seat{display:inline-flex;align-items:center;justify-content:center;min-width:16px;height:38px;padding:0 5px;border-radius:7px;font-family:' + H + ';font-weight:800;font-size:20px;line-height:1;color:#1F4E5F;} .ff-seat.is-full{background:#FFFDF7;box-shadow:0 2px 0 #BFDCE6;} .ff-seat.is-gap{min-width:34px;outline:2px dashed #FFFFFF;outline-offset:-4px;} .ff-seat:not(.is-full):not(.is-gap){min-width:4px;padding:0;}'
  + '.ff-seat.is-frozen{background:#FFFFFF;box-shadow:0 2px 0 #8FB9C8,inset 0 0 0 1.5px #7FD3EE;} .ff-wrap.is-one .ff-seat{height:48px;font-size:28px;padding:0 9px;}'
  + '.ff-seam{display:inline-block;width:3px;height:30px;margin:0 1px;border-radius:2px;background:#1F4E5F;opacity:.6;} .ff-seam.is-frozen{background:#FFFFFF;opacity:1;box-shadow:0 0 4px #7FD3EE;}'
  + '.ff-inlet.is-mixed{cursor:default;gap:6px;} .ff-mseat{min-width:56px;min-height:52px;padding:0 10px;border:0;border-radius:10px;background:#FFFDF7;box-shadow:0 3px 0 #BFDCE6;font-family:' + H + ';font-weight:800;font-size:28px;color:#1F4E5F;cursor:pointer;touch-action:none;} .ff-mseat.is-sel{box-shadow:0 0 0 4px #F4CF62;} .ff-mseat.is-frozen{background:#FFFFFF;box-shadow:0 3px 0 #8FB9C8,inset 0 0 0 2px #7FD3EE;cursor:default;} .ff-mseat.is-frost{box-shadow:0 0 0 4px #7FD3EE,0 0 14px #BFE9F7;}'
  + '.ff-penguin{position:absolute;left:4px;bottom:2px;width:44px;height:44px;object-fit:contain;pointer-events:none;} .ff-wrap.is-wide .ff-penguin{width:96px;height:96px;} .ff-penguin.is-walk{animation:ffWalk 2.6s ease-in-out forwards;} @keyframes ffWalk{0%{transform:none;}15%{transform:translateX(18%) translateY(-6px) rotate(-6deg);}30%{transform:translateX(30%) rotate(6deg);}50%{transform:translateX(50%) translateY(-6px) rotate(-6deg);}75%{transform:translateX(70%) rotate(6deg);}100%{transform:translateX(82%) rotate(-80deg);}}'
  + '.ff-wrap.is-narrow .ff-penguin{display:none;}'
  + '.ff-pond{position:relative;display:flex;flex-wrap:wrap;justify-content:center;align-content:center;gap:12px 14px;width:100%;min-height:90px;padding:14px 10px;box-sizing:border-box;border-radius:18px;background:radial-gradient(ellipse at 30% 30%,#D3EEF5 0,#BFE3EE 55%,#A9D6E4 100%);box-shadow:inset 0 2px 8px rgba(31,78,95,.25);} .ff-wrap.clue-mixed .ff-pond,.ff-pond.is-empty{display:none;}'
  + '.ff-floe{min-width:70px;min-height:50px;padding:0 14px;border:0;border-radius:18px 14px 20px 12px;background:#FFFDF7;box-shadow:0 4px 0 #8FB9C8,0 6px 10px rgba(31,78,95,.18);font-family:' + H + ';font-weight:800;font-size:28px;color:#1F4E5F;cursor:grab;touch-action:none;animation:ffBob 7s ease-in-out infinite;}'
  + '.ff-wrap.is-narrow .ff-floe{min-width:52px;min-height:44px;padding:0 9px;font-size:22px;} .ff-wrap.is-narrow .ff-pond{gap:8px 10px;padding:10px 8px;min-height:64px;} .ff-wrap.is-tiny .ff-floe{min-width:44px;min-height:44px;font-size:19px;padding:0 6px;border-radius:14px 12px 16px 10px;} .ff-wrap.is-tiny .ff-pond{gap:6px 6px;padding:8px 6px;} .ff-wrap.is-tiny .ff-wrap,.ff-wrap.is-tiny{gap:7px;}'
  + '.ff-floe.is-frost{box-shadow:0 0 0 4px #7FD3EE,0 0 16px #BFE9F7;} .ff-floe.is-cracked{animation:ffCrack .5s ease-out;} .ff-floe.is-dragging{opacity:.4;} .ff-wrap.is-fast .ff-floe{animation:none;}'
  + '@keyframes ffBob{0%,100%{transform:translate(0,0) rotate(-1deg);}33%{transform:translate(4px,-4px) rotate(1deg);}66%{transform:translate(-3px,3px) rotate(0deg);}} @keyframes ffCrack{0%{transform:translateX(0);}30%{transform:translateX(-10px) rotate(-6deg);}60%{transform:translateX(8px) rotate(4deg);}100%{transform:none;}}'
  + '.ff-group{display:inline-flex;align-items:center;min-height:56px;padding:0 14px;border:0;border-radius:16px;background:#FFFFFF;box-shadow:0 4px 0 #8FB9C8,0 0 0 2px #7FD3EE;font-family:' + H + ';font-weight:800;font-size:30px;color:#1F4E5F;cursor:grab;touch-action:none;}'
  + '.ff-piece{padding:0 2px;} .ff-dragfloe{position:fixed;z-index:9999;pointer-events:none;min-width:56px;height:50px;margin:-25px 0 0 -28px;padding:0 10px;box-sizing:border-box;border-radius:16px;background:#FFFDF7;box-shadow:0 6px 14px rgba(31,78,95,.3);display:flex;align-items:center;justify-content:center;font-family:' + H + ';font-weight:800;font-size:26px;color:#1F4E5F;}'
  + '.ff-foot{display:flex;justify-content:center;width:100%;}'
  + '.ff-check{display:inline-flex;align-items:center;gap:8px;min-width:150px;min-height:54px;padding:8px 26px;border:0;border-radius:16px;background:#1F7A99;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;box-shadow:0 4px 0 #13546B;cursor:pointer;} .ff-check:disabled{opacity:.5;cursor:default;}'
  + '.ff-note{margin:0;min-height:1.3em;max-width:560px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .ff-note.is-hint{color:#8A3B1F;} .ff-note.is-nudge{color:#5E6770;} .ff-wrap.is-narrow .ff-note{font-size:17px;}'
  + '.ff-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.ff-wrap.is-tiny .ff-check{min-width:112px;padding:8px 14px;font-size:20px;} .ff-wrap.is-tiny .ff-seat{font-size:17px;padding:0 3px;}'
  + '.ff-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'ff-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.FreezingFloesActivity = FreezingFloesActivity;
