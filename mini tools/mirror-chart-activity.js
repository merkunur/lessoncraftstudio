/* =====================================================================
   mirror-chart-activity.js — ACTIVITY #130 of the one-by-one rebuild:
   "Word Doctor's Clinic" → THE MIRROR CHART (L.1.2.e; all 11 locales).
   Model: mirror-chart-core.js (MirrorChartCore) + mirror-chart-index.js.
   Design: docs/activities-rebuild/designs/130-word-clinic.md
   ---------------------------------------------------------------------
   The patient's chart (a clipboard with the library picture) stands beside
   the doctor's mirror, fogged. Under them, the letter boxes; under those,
   a tray of sound tiles (levels 1, 3, 4) or a word bank / the locale's
   keyboard (level 2). The mirror button reads the letters: the fog
   clears to show the picture they really spell — the patient's own
   (healed), another picture (cup for cap), one picture for a plural
   patient, or fog with the letters written in it. From the second miss
   the wrong box turns misty. No timer, no score.
   Test seams: window.MirrorChartActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._render2 / ._tile / ._press / ._back /
   ._box / ._bank / ._look / .FAST / .OK_MS.
   ===================================================================== */
var MirrorChartActivity = {
  id: 'mirror-chart',
  /* the drawn apparatus (the hierarchy gate): the chart, the mirror and its fog, the boxes */
  apparatusClasses: ['mc-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {en:"Word Doctor's Clinic",de:"Die Wortdoktor-Praxis",fr:"Le cabinet du docteur des mots",es:"El consultorio del doctor de palabras",pt:"O consultório do doutor das palavras",it:"L’ambulatorio del dottore delle parole",nl:"De woordendokter",sv:"Orddoktorns mottagning",da:"Orddoktorens klinik",no:"Orddoktorens legekontor",fi:"Sanalääkärin vastaanotto"},
    instruction: {en:"Spell the patient's name. Then look in the mirror: it shows what your letters spell.",de:"Schreib den Namen des Patienten. Dann schau in den Spiegel: Er zeigt, was deine Buchstaben ergeben.",fr:"Écris le nom du patient. Puis regarde dans le miroir : il montre ce que tes lettres écrivent.",es:"Escribe el nombre del paciente. Luego mira en el espejo: muestra lo que escriben tus letras.",pt:"Escreva o nome do paciente. Depois olhe no espelho: ele mostra o que as suas letras escrevem.",it:"Scrivi il nome del paziente. Poi guarda nello specchio: mostra quello che scrivono le tue lettere.",nl:"Schrijf de naam van de patiënt. Kijk dan in de spiegel: die laat zien wat je letters schrijven.",sv:"Skriv patientens namn. Titta sedan i spegeln: den visar vad dina bokstäver skriver.",da:"Skriv patientens navn. Se så i spejlet: det viser, hvad dine bogstaver staver.",no:"Skriv navnet til pasienten. Se så i speilet: det viser hva bokstavene dine staver.",fi:"Kirjoita potilaan nimi. Katso sitten peiliin: se näyttää, mitä kirjaimesi kirjoittavat."},
    instrBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    okBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    t1: {en:"Heal the sick sound: which letters go in the empty box?",de:"Heile den kranken Laut: Welche Buchstaben kommen in das leere Kästchen?",fr:"Soigne le son malade : quelles lettres vont dans la case vide ?",es:"Cura el sonido enfermo: ¿qué letras van en la casilla vacía?",pt:"Cure o som doente: que letras vão na casinha vazia?",it:"Cura il suono malato: quali lettere vanno nella casella vuota?",nl:"Genees de zieke klank: welke letters horen in het lege hokje?",sv:"Bota det sjuka ljudet: vilka bokstäver ska stå i den tomma rutan?",da:"Helbred den syge lyd: hvilke bogstaver skal stå i det tomme felt?",no:"Lege den syke lyden: hvilke bokstaver skal stå i den tomme ruta?",fi:"Paranna sairas äänne: mitkä kirjaimet tulevat tyhjään ruutuun?"},
    t2: {en:"Spell the patient's name.",de:"Schreib den Namen des Patienten.",fr:"Écris le nom du patient.",es:"Escribe el nombre del paciente.",pt:"Escreva o nome do paciente.",it:"Scrivi il nome del paziente.",nl:"Schrijf de naam van de patiënt.",sv:"Skriv patientens namn.",da:"Skriv patientens navn.",no:"Skriv navnet til pasienten.",fi:"Kirjoita potilaan nimi."},
    t3: {en:"Which rule letters go in the box?",de:"Welche Buchstaben verlangt die Regel im Kästchen?",fr:"Quelles lettres de la règle vont dans la case ?",es:"¿Qué letras de la regla van en la casilla?",pt:"Que letras da regra vão na casinha?",it:"Quali lettere della regola vanno nella casella?",nl:"Welke letters van de regel horen in het hokje?",sv:"Vilka bokstäver säger regeln att det ska stå i rutan?",da:"Hvilke bogstaver siger reglen skal stå i feltet?",no:"Hvilke bokstaver sier regelen skal stå i ruta?",fi:"Mitkä säännön kirjaimet tulevat ruutuun?"},
    t4: {en:"There are two patients! Spell more than one.",de:"Es sind zwei Patienten! Schreib die Mehrzahl.",fr:"Il y a deux patients ! Écris le pluriel.",es:"¡Hay dos pacientes! Escribe el plural.",pt:"São dois pacientes! Escreva o plural.",it:"Ci sono due pazienti! Scrivi il plurale.",nl:"Er zijn twee patiënten! Schrijf het meervoud.",sv:"Det är två patienter! Skriv plural.",da:"Der er to patienter! Skriv flertal.",no:"Det er to pasienter! Skriv flertall.",fi:"Potilaita on kaksi! Kirjoita monikko."},
    setLevel: {en:"What to do",de:"Was du tust",fr:"Que faire",es:"Qué hacer",pt:"O que fazer",it:"Che cosa fare",nl:"Wat je doet",sv:"Vad du gör",da:"Hvad du gør",no:"Hva du gjør",fi:"Mitä teet"},
    l1: {en:"Heal the sick sound",de:"Kranker Laut",fr:"Le son malade",es:"El sonido enfermo",pt:"O som doente",it:"Il suono malato",nl:"De zieke klank",sv:"Det sjuka ljudet",da:"Den syge lyd",no:"Den syke lyden",fi:"Sairas äänne"},
    l2: {en:"Write the word",de:"Wort schreiben",fr:"Écrire le mot",es:"Escribe la palabra",pt:"Escreva a palavra",it:"Scrivi la parola",nl:"Schrijf het woord",sv:"Skriv ordet",da:"Skriv ordet",no:"Skriv ordet",fi:"Kirjoita sana"},
    l3: {en:"Rule letters",de:"Rechtschreibregel",fr:"Lettres de la règle",es:"Letras de la regla",pt:"Letras da regra",it:"Lettere della regola",nl:"Spellingregel",sv:"Stavningsregel",da:"Stavereglen",no:"Staveregelen",fi:"Oikeinkirjoitussääntö"},
    l4: {en:"Plurals",de:"Mehrzahl",fr:"Le pluriel",es:"El plural",pt:"O plural",it:"Il plurale",nl:"Meervoud",sv:"Plural",da:"Flertal",no:"Flertall",fi:"Monikko"},
    setHelp: {en:"Help",de:"Hilfe",fr:"Aide",es:"Ayuda",pt:"Ajuda",it:"Aiuto",nl:"Hulp",sv:"Hjälp",da:"Hjælp",no:"Hjelp",fi:"Apu"},
    helpAll: {en:"Every clue",de:"Alle Hilfen",fr:"Tous les indices",es:"Todas las pistas",pt:"Todas as pistas",it:"Tutti gli aiuti",nl:"Alle hulp",sv:"All hjälp",da:"Al hjælp",no:"All hjelp",fi:"Kaikki vihjeet"},
    helpBoxFirst: {en:"Boxes and first letter",de:"Kästchen und erster Buchstabe",fr:"Cases et première lettre",es:"Casillas y primera letra",pt:"Casinhas e primeira letra",it:"Caselle e prima lettera",nl:"Hokjes en eerste letter",sv:"Rutor och första bokstaven",da:"Felter og første bogstav",no:"Ruter og første bokstav",fi:"Ruudut ja ensimmäinen kirjain"},
    helpBoxBank: {en:"Boxes and word bank",de:"Kästchen und Wörterkiste",fr:"Cases et banque de mots",es:"Casillas y banco de palabras",pt:"Casinhas e banco de palavras",it:"Caselle e banca di parole",nl:"Hokjes en woordenlijst",sv:"Rutor och ordlista",da:"Felter og ordliste",no:"Ruter og ordliste",fi:"Ruudut ja sanalista"},
    helpFirst: {en:"First letter only",de:"Nur erster Buchstabe",fr:"Seulement la première lettre",es:"Solo la primera letra",pt:"Só a primeira letra",it:"Solo la prima lettera",nl:"Alleen de eerste letter",sv:"Bara första bokstaven",da:"Kun første bogstav",no:"Bare første bokstav",fi:"Vain ensimmäinen kirjain"},
    helpBank: {en:"Word bank only",de:"Nur Wörterkiste",fr:"Seulement la banque de mots",es:"Solo el banco de palabras",pt:"Só o banco de palavras",it:"Solo la banca di parole",nl:"Alleen de woordenrij",sv:"Bara ordlistan",da:"Kun ordlisten",no:"Bare ordlista",fi:"Vain sanalista"},
    helpLine: {en:"Plain line",de:"Nur eine Linie",fr:"Une ligne simple",es:"Solo una línea",pt:"Só uma linha",it:"Solo una riga",nl:"Alleen een lijn",sv:"Bara en linje",da:"Kun en linje",no:"Bare en linje",fi:"Pelkkä viiva"},
    mirror: {en:"Mirror",de:"Spiegel",fr:"Miroir",es:"Espejo",pt:"Espelho",it:"Specchio",nl:"Spiegel",sv:"Spegel",da:"Spejl",no:"Speil",fi:"Peili"},
    hintEmpty: {en:"The mirror needs a letter in every box.",de:"Der Spiegel braucht in jedem Kästchen einen Buchstaben.",fr:"Le miroir a besoin d’une lettre dans chaque case.",es:"El espejo necesita una letra en cada casilla.",pt:"O espelho precisa de uma letra em cada casinha.",it:"Lo specchio ha bisogno di una lettera in ogni casella.",nl:"De spiegel heeft in elk hokje een letter nodig.",sv:"Spegeln behöver en bokstav i varje ruta.",da:"Spejlet skal have et bogstav i hvert felt.",no:"Speilet trenger en bokstav i hver rute.",fi:"Peili tarvitsee kirjaimen joka ruutuun."},
    hintLine: {en:"Write the word on the line first.",de:"Schreib zuerst das Wort auf die Linie.",fr:"Écris d’abord le mot sur la ligne.",es:"Primero escribe la palabra en la línea.",pt:"Primeiro escreva a palavra na linha.",it:"Prima scrivi la parola sulla riga.",nl:"Schrijf eerst het woord op de lijn.",sv:"Skriv först ordet på linjen.",da:"Skriv først ordet på linjen.",no:"Skriv først ordet på linja.",fi:"Kirjoita ensin sana viivalle."},
    missOther: {en:"The mirror shows: {other}. That is not the patient. Which letters change it?",de:"Der Spiegel zeigt: {other}. Das ist nicht der Patient. Welche Buchstaben ändern das?",fr:"Le miroir montre : {other}. Ce n’est pas le patient. Quelles lettres changent tout ?",es:"El espejo muestra: {other}. Ese no es el paciente. ¿Qué letras lo cambian?",pt:"O espelho mostra: {other}. Esse não é o paciente. Que letras mudam isso?",it:"Lo specchio mostra: {other}. Non è il paziente. Quali lettere lo cambiano?",nl:"De spiegel laat zien: {other}. Dat is niet de patiënt. Welke letters veranderen het?",sv:"Spegeln visar: {other}. Det är inte patienten. Vilka bokstäver ändrar det?",da:"Spejlet viser: {other}. Det er ikke patienten. Hvilke bogstaver ændrer det?",no:"Speilet viser: {other}. Det er ikke pasienten. Hvilke bokstaver endrer det?",fi:"Peili näyttää: {other}. Se ei ole potilas. Mitkä kirjaimet muuttavat sen?"},
    missFog: {en:"The mirror can't find a picture for those letters. Say the word slowly.",de:"Der Spiegel findet zu diesen Buchstaben kein Bild. Sprich das Wort langsam.",fr:"Le miroir ne trouve pas d’image pour ces lettres. Dis le mot lentement.",es:"El espejo no encuentra un dibujo para esas letras. Di la palabra despacio.",pt:"O espelho não acha uma figura para essas letras. Fale a palavra devagar.",it:"Lo specchio non trova un’immagine per queste lettere. Di’ la parola piano piano.",nl:"De spiegel vindt geen plaatje bij die letters. Zeg het woord langzaam.",sv:"Spegeln hittar ingen bild till de bokstäverna. Säg ordet långsamt.",da:"Spejlet kan ikke finde et billede til de bogstaver. Sig ordet langsomt.",no:"Speilet finner ikke noe bilde til de bokstavene. Si ordet sakte.",fi:"Peili ei löydä kuvaa noille kirjaimille. Sano sana hitaasti."},
    missCount: {en:"The mirror shows one. There are two patients.",de:"Der Spiegel zeigt einen. Es sind zwei Patienten.",fr:"Le miroir montre une seule image. Il y a deux patients.",es:"El espejo muestra uno. Hay dos pacientes.",pt:"O espelho mostra um. São dois pacientes.",it:"Lo specchio mostra una sola immagine. I pazienti sono due.",nl:"De spiegel laat er één zien. Er zijn twee patiënten.",sv:"Spegeln visar en. Det är två patienter.",da:"Spejlet viser én. Der er to patienter.",no:"Speilet viser én. Det er to pasienter.",fi:"Peili näyttää yhden. Potilaita on kaksi."},
    missCapital: {en:"Nouns start with a capital letter.",de:"Namenwörter schreibt man groß.",fr:"Le mot commence par une majuscule.",es:"La palabra empieza con mayúscula.",pt:"A palavra começa com letra maiúscula.",it:"La parola comincia con la maiuscola.",nl:"Het woord begint met een hoofdletter.",sv:"Ordet börjar med stor bokstav.",da:"Ordet begynder med stort bogstav.",no:"Ordet begynner med stor bokstav.",fi:"Sana alkaa isolla kirjaimella."},
    missGlow: {en:"The misty box is the sick sound.",de:"Das neblige Kästchen ist der kranke Laut.",fr:"La case floue, c’est le son malade.",es:"La casilla borrosa es el sonido enfermo.",pt:"A casinha embaçada é o som doente.",it:"La casella appannata è il suono malato.",nl:"Het wazige hokje is de zieke klank.",sv:"Den dimmiga rutan är det sjuka ljudet.",da:"Det tågede felt er den syge lyd.",no:"Den tåkete ruta er den syke lyden.",fi:"Sumuinen ruutu on sairas äänne."},
    okHealed: {en:"All better! {word}: the mirror shows it too.",de:"Wieder gesund! {word}: Der Spiegel zeigt es auch.",fr:"Guéri ! {word} : le miroir le montre aussi.",es:"¡Ya está curado! {word}: el espejo también lo muestra.",pt:"Curado! {word}: o espelho também mostra.",it:"Guarito! {word}: lo mostra anche lo specchio.",nl:"Weer beter! {word}: de spiegel laat het ook zien.",sv:"Frisk igen! {word}: spegeln visar det också.",da:"Rask igen! {word}: spejlet viser det også.",no:"Frisk igjen! {word}: speilet viser det også.",fi:"Taas terve! {word}: peilikin näyttää sen."},
    okWord: {en:"All better! {word}: that is how it is spelled.",de:"Wieder gesund! {word}: So schreibt man es.",fr:"Guéri ! {word} : c’est comme ça qu’on l’écrit.",es:"¡Ya está curado! {word}: así se escribe.",pt:"Curado! {word}: é assim que se escreve.",it:"Guarito! {word}: si scrive così.",nl:"Weer beter! {word}: zo schrijf je het.",sv:"Frisk igen! {word}: så stavas det.",da:"Rask igen! {word}: sådan staves det.",no:"Frisk igjen! {word}: slik staves det.",fi:"Taas terve! {word}: näin se kirjoitetaan."},
    okPlural: {en:"All better! {word}: more than one.",de:"Wieder gesund! {word}: mehr als einer.",fr:"Guéris ! {word} : plus d’un.",es:"¡Ya están curados! {word}: más de uno.",pt:"Curados! {word}: mais de um.",it:"Guariti! {word}: più di uno.",nl:"Weer beter! {word}: meer dan één.",sv:"Friska igen! {word}: fler än en.",da:"Raske igen! {word}: flere end én.",no:"Friske igjen! {word}: flere enn én.",fi:"Taas terveitä! {word}: useampi kuin yksi."},
    aTile: {en:"Tile {t}",de:"Kärtchen {t}",fr:"Étiquette {t}",es:"Ficha {t}",pt:"Peça {t}",it:"Tessera {t}",nl:"Kaartje {t}",sv:"Bricka {t}",da:"Brik {t}",no:"Brikke {t}",fi:"Kortti {t}"},
    aBox: {en:"Box {n}: {t}",de:"Kästchen {n}: {t}",fr:"Case {n} : {t}",es:"Casilla {n}: {t}",pt:"Casinha {n}: {t}",it:"Casella {n}: {t}",nl:"Hokje {n}: {t}",sv:"Ruta {n}: {t}",da:"Felt {n}: {t}",no:"Rute {n}: {t}",fi:"Ruutu {n}: {t}"},
    aKey: {en:"{t}",de:"{t}",fr:"{t}",es:"{t}",pt:"{t}",it:"{t}",nl:"{t}",sv:"{t}",da:"{t}",no:"{t}",fi:"{t}"},
    aBack: {en:"Delete",de:"Löschen",fr:"Effacer",es:"Borrar",pt:"Apagar",it:"Cancella",nl:"Wissen",sv:"Radera",da:"Slet",no:"Slett",fi:"Poista"},
    aShift: {en:"Capital letter",de:"Großbuchstabe",fr:"Majuscule",es:"Mayúscula",pt:"Letra maiúscula",it:"Maiuscola",nl:"Hoofdletter",sv:"Stor bokstav",da:"Stort bogstav",no:"Stor bokstav",fi:"Iso kirjain"},
    aNone: {en:"No ending",de:"Keine Endung",fr:"Pas de terminaison",es:"Sin terminación",pt:"Sem terminação",it:"Nessuna desinenza",nl:"Geen uitgang",sv:"Ingen ändelse",da:"Ingen endelse",no:"Ingen endelse",fi:"Ei päätettä"},
    aBank: {en:"Word: {t}",de:"Wort: {t}",fr:"Mot : {t}",es:"Palabra: {t}",pt:"Palavra: {t}",it:"Parola: {t}",nl:"Woord: {t}",sv:"Ord: {t}",da:"Ord: {t}",no:"Ord: {t}",fi:"Sana: {t}"},
    aListen: {en:"Listen",de:"Anhören",fr:"Écouter",es:"Escuchar",pt:"Ouvir",it:"Ascolta",nl:"Luisteren",sv:"Lyssna",da:"Lyt",no:"Lytt",fi:"Kuuntele"},
    aMirror: {en:"Look in the mirror",de:"In den Spiegel schauen",fr:"Regarder dans le miroir",es:"Mirar en el espejo",pt:"Olhar no espelho",it:"Guardare nello specchio",nl:"In de spiegel kijken",sv:"Titta i spegeln",da:"Se i spejlet",no:"Se i speilet",fi:"Katso peiliin"},
    srShows: {en:"The mirror shows {t}.",de:"Der Spiegel zeigt {t}.",fr:"Le miroir montre {t}.",es:"El espejo muestra {t}.",pt:"O espelho mostra {t}.",it:"Lo specchio mostra {t}.",nl:"De spiegel laat {t} zien.",sv:"Spegeln visar {t}.",da:"Spejlet viser {t}.",no:"Speilet viser {t}.",fi:"Peili näyttää: {t}."},
    srFog: {en:"The mirror is foggy: {t}.",de:"Der Spiegel ist beschlagen: {t}.",fr:"Le miroir est embué : {t}.",es:"El espejo está empañado: {t}.",pt:"O espelho está embaçado: {t}.",it:"Lo specchio è appannato: {t}.",nl:"De spiegel is beslagen: {t}.",sv:"Spegeln är immig: {t}.",da:"Spejlet er dugget: {t}.",no:"Speilet er dugget: {t}.",fi:"Peili on huurussa: {t}."},
  },/*STRINGS-END*/

  defaults: { level: '1', help: 'all' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: '1', labelKey: 'l1' }, { value: '2', labelKey: 'l2' }, { value: '3', labelKey: 'l3' }, { value: '4', labelKey: 'l4' }] },
    { key: 'help', type: 'choice', labelKey: 'setHelp', options: [{ value: 'all', labelKey: 'helpAll' }, { value: 'boxfirst', labelKey: 'helpBoxFirst' }, { value: 'boxbank', labelKey: 'helpBoxBank' }, { value: 'first', labelKey: 'helpFirst' }, { value: 'bank', labelKey: 'helpBank' }, { value: 'line', labelKey: 'helpLine' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._trays = {};
    this._timers = []; this._ro = null; this._view = {}; this._healed = 0;
    injectMirrorChartCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } if (this._kh) { document.removeEventListener('keydown', this._kh); this._kh = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return MirrorChartCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return MirrorChartCore.levelOf(this._setting('level')); },
  _help: function () { return MirrorChartCore.helpOf(this._setting('help')); },
  _key: function () { return this._loc() + '/' + this._level() + (this._level() === '2' ? '/' + this._help() : ''); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = MirrorChartCore.rounds(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._trays = {}; this._healed = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = MirrorChartCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._loc(), this._level(), this._help(), Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._trays = P.trays; this._orderForPool = pool; if (pass > this._pass) this._healed = 0; this._pass = pass; }
    var r = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'mirrorchart.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { var line = this._t('t' + this._level()); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers();
    this.st = MirrorChartCore.newState(this._loc(), this._level(), r, this._trays && this._trays[r], this._help());
    this._view = { note: '', ok: '', swirl: false }; this._shift = false;
    this._setPrompt();
  },

  /* ---------------- render ---------------- */
  render: function () {
    this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : this._pool[0], 0); this._render2(); this._watchWidth();
    var self = this;
    if (!this._kh && typeof document !== 'undefined') { this._kh = function (e) { self._physical(e); }; document.addEventListener('keydown', this._kh); }
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
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'mc-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="mc-main"></div><div class="mc-foot"></div><p class="mc-note" aria-live="polite"></p><p class="mc-sr" aria-live="polite"></p>';
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
  _el: function (tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; },
  _dims: function () { var W = this._width(), B = MirrorChartCore.band(W); return { W: W, wide: B.wide, tiny: B.tiny, xs: B.xs, one: B.wide ? 150 : B.tiny ? 80 : 96, two: B.wide ? 110 : B.tiny ? 64 : 72 }; },
  _img: function (path, size, cls) { return '<img' + (cls ? ' class="' + cls + '"' : '') + ' src="/image-library-webp/themes/' + path + '@2x.webp" alt="" width="' + size + '" height="' + size + '" draggable="false">'; },
  _pics: function (path, two, D, cls) { return two ? '<span class="mc-two">' + this._img(path, D.two, cls) + this._img(path, D.two, cls + ' mc-back') + '</span>' : this._img(path, D.one, cls); },
  _sr: function (s) { var el = this._qs('.mc-sr'); if (el) el.textContent = s; },
  /* German nouns begin with a capital: the German keyboard has a capital key (one letter), so the capital is the child's own choice — a lower-case start leaves the mirror fogged */
  _capNext: function () { var st = this.st; return !!(st && st.loc === 'de' && st.rd.kind === 'write' && this._shift); },

  _paint_: function () {
    var C = MirrorChartCore, st = this.st, rd = st.rd, D = this._dims(), v = this._view, self = this, mist = C.misty(st) || [], m = st.mirror;
    this._wrap.className = 'mc-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.tiny ? ' is-tiny' : '') + (D.xs ? ' is-xs' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' k-' + rd.kind + (rd.kind === 'write' ? ' h-' + rd.help : '');
    var main = this._qs('.mc-main'); main.innerHTML = '';
    /* the chart and the mirror */
    var row = this._el('div', 'mc-row');
    var chart = this._el('div', 'mc-chart mc-art' + (st.done ? ' is-ok' : ''));
    chart.innerHTML = '<span class="mc-clip mc-art"></span>' + (rd.pic ? '<span class="mc-patient">' + this._pics(rd.pic, rd.kind === 'plural', D, 'mc-pic') + '</span>' : '<span class="mc-patient mc-wordcard">' + esc(st.done ? rd.target : '?') + '</span>');
    if (this._healed) { var al = this._el('span', 'mc-album mc-art'); for (var h = 0; h < Math.min(8, this._healed); h++) al.insertAdjacentHTML('beforeend', '<i></i>'); chart.appendChild(al); }
    var ls = this._btn('mc-listen', 'listen', this._t('aListen'), '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="#146B5E"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="#146B5E" stroke-width="2" stroke-linecap="round"/></svg>');
    ls.addEventListener('click', function () { self._listen(); }); chart.appendChild(ls);
    row.appendChild(chart);
    var mir = this._el('div', 'mc-mirror mc-art' + (m && !st.done && m.kind !== 'match' ? ' is-miss' : '') + (st.done ? ' is-ok' : '') + (v.swirl ? ' is-swirl' : ''));
    var inner = '';
    if (!m) inner = '<span class="mc-fog mc-art"></span>';
    else if (m.kind === 'match' && m.word) inner = '<span class="mc-clear">' + esc(m.letters) + '</span>';
    else if (m.kind === 'match' || m.kind === 'other' || m.kind === 'count') inner = '<span class="mc-shows">' + this._pics(m.pic, m.number === 1 && m.kind !== 'count', D, 'mc-pic') + '</span>';
    else inner = '<span class="mc-fog mc-art"></span><span class="mc-finger">' + esc(m.letters) + '</span>';
    mir.innerHTML = '<span class="mc-glass mc-art">' + inner + '</span>';
    row.appendChild(mir);
    main.appendChild(row);
    /* the boxes */
    var boxes = this._el('div', 'mc-boxes');
    if (rd.kind === 'fill' || rd.kind === 'rule') {
      rd.boxes.forEach(function (g, i) {
        if (i !== rd.sick) { boxes.appendChild(self._el('span', 'mc-box is-given', esc(g))); return; }
        var t = st.tile != null ? rd.tiles[st.tile] : null, b = self._btn('mc-box is-sick' + (t ? ' is-full' : '') + (mist.indexOf(i) >= 0 ? ' is-misty' : '') + (st.done ? ' is-healed' : ''), 'box-' + i, self._t('aBox', { n: i + 1, t: t || '…' }), t ? esc(t) : '');
        b.disabled = st.done || !t; b.addEventListener('click', function () { self._box(i); }); boxes.appendChild(b);
      });
    } else if (rd.kind === 'plural') {
      var tt = st.tile != null ? /^(.*?)(?:-(\d))?$/.exec(rd.tiles[st.tile]) : null, drop = tt && tt[2] ? +tt[2] : 0;
      rd.sg.split('').forEach(function (c, i) { boxes.appendChild(self._el('span', 'mc-box is-given' + (i >= rd.sg.length - drop ? ' is-drop' : ''), esc(c))); });
      var eb = self._btn('mc-box is-sick is-end' + (tt ? ' is-full' : '') + (mist.indexOf('end') >= 0 ? ' is-misty' : '') + (st.done ? ' is-healed' : ''), 'box-end', self._t('aBox', { n: rd.sg.length + 1, t: tt ? (tt[1] || self._t('aNone')) : '…' }), tt ? (tt[1] ? esc(tt[1]) : '–') : '');
      eb.disabled = st.done || !tt; eb.addEventListener('click', function () { self._box('end'); }); boxes.appendChild(eb);
    } else if (rd.parts.boxes) {
      st.letters.forEach(function (c, i) {
        var given = i < st.given, b = self._btn('mc-box' + (given ? ' is-given' : ' is-sick') + (c != null && !given ? ' is-full' : '') + (mist.indexOf(i) >= 0 ? ' is-misty' : '') + (st.done ? ' is-healed' : ''), 'box-' + i, self._t('aBox', { n: i + 1, t: c || '…' }), c != null ? esc(c) : '');
        b.disabled = st.done || given || c == null; b.addEventListener('click', function () { self._box(i); }); boxes.appendChild(b);
      });
    } else {
      var line = this._el('div', 'mc-line' + (mist.length ? ' is-misty' : '') + (st.done ? ' is-healed' : ''));
      line.innerHTML = st.letters.map(function (c, i) { return '<span class="mc-lc' + (i < st.given ? ' is-given' : '') + (mist.indexOf(i) >= 0 ? ' is-misty' : '') + '">' + esc(c) + '</span>'; }).join('') + (st.done ? '' : '<span class="mc-caret"></span>');
      boxes.appendChild(line);
    }
    main.appendChild(boxes);
    /* the tray, the bank, the keyboard */
    if (rd.kind !== 'write') {
      var tray = this._el('div', 'mc-tray');
      rd.order.forEach(function (i) {
        var t = rd.tiles[i].replace(/-\d$/, ''), on = st.tile === i, b = self._btn('mc-tile' + (on ? ' is-in' : '') + (st.show >= 2 && on && !st.done ? ' is-dim' : ''), 'tile-' + i, t === '' ? self._t('aNone') : self._t('aTile', { t: t }), t === '' ? '–' : (rd.kind === 'plural' ? '-' : '') + esc(t));
        b.disabled = st.done; b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.addEventListener('click', function () { self._tile(i); }); tray.appendChild(b);
      });
      main.appendChild(tray);
    } else {
      if (rd.parts.bank) {
        var bank = this._el('div', 'mc-bank');
        rd.order.forEach(function (j) { var w = rd.bank[j], b = self._btn('mc-bankw', 'bank-' + j, self._t('aBank', { t: w }), esc(w)); b.disabled = st.done; b.addEventListener('click', function () { self._bank(j); }); bank.appendChild(b); });
        main.appendChild(bank);
      }
      if (!rd.parts.bank) {
        var keys = this._el('div', 'mc-keys'), cap = this._capNext();
        rd.keys.forEach(function (c) { var k = cap ? c.toUpperCase() : c, b = self._btn('mc-key', 'key-' + c, self._t('aKey', { t: k }), esc(k)); b.disabled = st.done; b.addEventListener('click', function () { self._press(c); }); keys.appendChild(b); });
        var bk = this._btn('mc-key is-back', 'back', this._t('aBack'), '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M9 6h11v12H9l-6-6z" fill="none" stroke="#2F2A3B" stroke-width="2" stroke-linejoin="round"/><path d="M12 9.5l5 5M17 9.5l-5 5" stroke="#2F2A3B" stroke-width="2" stroke-linecap="round"/></svg>');
        bk.disabled = st.done; bk.addEventListener('click', function () { self._back(); }); keys.appendChild(bk);
        if (st.loc === 'de') { var sh = this._btn('mc-key is-shift' + (cap ? ' is-on' : ''), 'shift', this._t('aShift'), '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M12 3l8 9h-4.5v8h-7v-8H4z" fill="' + (cap ? '#146B5E' : 'none') + '" stroke="#2F2A3B" stroke-width="2" stroke-linejoin="round"/></svg>'); sh.disabled = st.done; sh.setAttribute('aria-pressed', cap ? 'true' : 'false'); sh.addEventListener('click', function () { self._shift = !self._shift; self.api.sound(500); self._paint(); }); keys.appendChild(sh); }
        main.appendChild(keys);
      }
    }
    var foot = this._qs('.mc-foot'); foot.innerHTML = '';
    var mb = this._btn('mc-look', 'check', this._t('aMirror'), '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><ellipse cx="12" cy="9" rx="6" ry="7" fill="#DDF1EC" stroke="#FFF" stroke-width="2.2"/><path d="M12 16v6M9 22h6" stroke="#FFF" stroke-width="2.2" stroke-linecap="round"/></svg><span>' + esc(this._t('mirror')) + '</span>');
    mb.disabled = st.done; mb.addEventListener('click', function () { self._look(); });
    /* on a phone the keyboard takes the height: the mirror button becomes its last key (like Enter) */
    var inKeys = D.tiny && rd.kind === 'write' && !rd.parts.bank && this._qs('.mc-keys');
    if (inKeys) { mb.className += ' is-key'; inKeys.appendChild(mb); foot.style.display = 'none'; } else { foot.style.display = ''; foot.appendChild(mb); }
    var note = this._qs('.mc-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'mc-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'mc-note is-hint'; }
    else { note.textContent = ''; note.className = 'mc-note'; }
  },

  /* ---------------- the hand ---------------- */
  _moved: function () { this._clearTimers(); this._view.note = ''; this._view.ok = ''; this._view.swirl = false; },
  _tile: function (i) { var r = MirrorChartCore.place(this.st, i); if (r === 'no') return; this._moved(); this.api.sound(r === 'in' ? 560 : 340); this._paint(); },
  _box: function (i) {
    var C = MirrorChartCore, st = this.st, r;
    if (st.rd.kind === 'write') r = C.clearBox(st, i); else r = st.tile != null ? C.place(st, st.tile) : 'no';
    if (r === 'no') return; this._moved(); this.api.sound(340); this._paint();
  },
  _press: function (c, up) { var C = MirrorChartCore, st = this.st, ch = this._capNext() || up ? c.toUpperCase() : c; this._shift = false; var r = C.type(st, ch); if (r === 'no' || r === 'full') return; this._moved(); this.api.sound(600); this._paint(); },
  _back: function () { var r = MirrorChartCore.back(this.st); if (r === 'no') return; this._moved(); this.api.sound(320); this._paint(); },
  _bank: function (j) { var r = MirrorChartCore.bank(this.st, j); if (r === 'no') return; this._moved(); this.api.sound(560); this._paint(); },
  _physical: function (e) {
    var st = this.st; if (!st || st.done || !this._wrap || !this._wrap.isConnected || st.rd.kind !== 'write' || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'Backspace') { e.preventDefault(); this._back(); return; }
    if (e.key === 'Enter') { e.preventDefault(); this._look(); return; }
    if (e.key && e.key.length === 1 && st.rd.keys.indexOf(e.key.toLowerCase()) >= 0 && !st.rd.parts.bank) { e.preventDefault(); this._press(e.key.toLowerCase(), e.key !== e.key.toLowerCase()); }
  },
  _listen: function () { var st = this.st; if (typeof LCSAudio !== 'undefined' && LCSAudio.speak) { try { LCSAudio.speak({ type: 'word', text: st.rd.target, lang: this.api.lang, rate: 0.85 }); } catch (e) {} } },
  _look: function () {
    var C = MirrorChartCore, st = this.st, v = this._view, self = this; if (st.done) return;
    this._clearTimers();
    var res = C.check(st);
    if (res.result === 'empty') { v.ok = ''; v.note = this._t(C.hint(st)); this.api.sound(400); this._paint(); this.api.announce(v.note); return; }
    if (res.result === 'ok') { this._success(); return; }
    var m = res.mirror; v.ok = ''; v.swirl = true; v.note = this._t(C.hint(st), { other: m.letters });
    this.api.sound(220); this._paint(); this.api.announce(v.note);
    this._sr(this._t(m.kind === 'fog' || m.kind === 'capital' ? 'srFog' : 'srShows', { t: m.letters }));
    if (st.show === 2) this._listen();
  },
  _success: function () {
    var C = MirrorChartCore, st = this.st, v = this._view, msg = this._t(C.okKey(st), { word: st.rd.target });
    v.swirl = true; v.note = ''; v.ok = msg; this._healed++;
    this.api.sound(988); this._paint(); this.api.announce(msg);
    this._listen();
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectMirrorChartCSS() {
  if (typeof document === 'undefined' || document.getElementById('mc-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.mc-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:12px;user-select:none;-webkit-user-select:none;} .mc-wrap:focus{outline:none;}'
  + '.mc-main{display:flex;flex-direction:column;align-items:stretch;gap:12px;}'
  /* the chart and the mirror */
  + '.mc-row{display:flex;justify-content:center;align-items:stretch;gap:16px;}'
  + '.mc-chart{position:relative;flex:1 1 0;max-width:260px;min-height:220px;display:flex;align-items:center;justify-content:center;padding:26px 10px 12px;border-radius:14px;background:#FFFDF4;box-shadow:inset 0 0 0 3px #2F2A3B,0 4px 0 #C9B48E;}'
  + '.mc-chart.is-ok{box-shadow:inset 0 0 0 3px #2E8C7E,0 0 18px rgba(255,201,60,.8);}'
  + '.mc-clip{position:absolute;left:50%;top:-8px;width:80px;height:20px;margin-left:-40px;border-radius:6px;background:#9AA3AE;box-shadow:inset 0 0 0 3px #5E6670;}'
  + '.mc-patient{display:flex;align-items:center;justify-content:center;} .mc-pic{display:block;object-fit:contain;}'
  + '.mc-wordcard{min-width:110px;min-height:110px;font-family:' + H + ';font-weight:800;font-size:44px;color:#5E6670;}'
  + '.mc-two{position:relative;display:flex;align-items:flex-end;} .mc-two .mc-back{margin-left:-20%;transform:translateY(-10%);}'
  + '.mc-listen{position:absolute;z-index:2;right:6px;top:6px;width:44px;height:44px;padding:0;border:0;border-radius:50%;background:#FFF;box-shadow:0 0 0 2px #C9E5DE;cursor:pointer;display:flex;align-items:center;justify-content:center;}'
  + '.mc-album{position:absolute;left:8px;top:14px;display:flex;flex-wrap:wrap;gap:3px;max-width:60px;} .mc-album i{display:block;width:12px;height:15px;border-radius:2px;background:#DDF1EC;box-shadow:inset 0 0 0 2px #2E8C7E;}'
  + '.mc-mirror{flex:1 1 0;max-width:260px;min-height:220px;display:flex;align-items:center;justify-content:center;}'
  + '.mc-glass{position:relative;display:flex;align-items:center;justify-content:center;width:100%;height:100%;min-height:220px;border-radius:50%;overflow:hidden;background:#FBF3E4;box-shadow:inset 0 0 0 10px #146B5E,inset 0 0 0 13px #0E4A41,0 4px 0 #0E4A41;}'
  + '.mc-mirror.is-miss .mc-glass{box-shadow:inset 0 0 0 10px #E0663A,inset 0 0 0 13px #A8431F,0 4px 0 #A8431F;} .mc-mirror.is-ok .mc-glass{box-shadow:inset 0 0 0 10px #146B5E,inset 0 0 0 13px #0E4A41,0 0 18px rgba(255,201,60,.85);}'
  + '.mc-fog{position:absolute;inset:13px;border-radius:50%;background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.95),rgba(236,240,243,.88) 45%,rgba(214,222,228,.9) 100%);}'
  + '.mc-finger{position:relative;z-index:1;font-family:' + H + ';font-weight:800;font-size:34px;color:rgba(94,102,112,.55);letter-spacing:2px;transform:rotate(-6deg);max-width:80%;overflow-wrap:anywhere;text-align:center;}'
  + '.mc-clear{font-family:' + H + ';font-weight:800;font-size:38px;color:#146B5E;max-width:80%;overflow-wrap:anywhere;text-align:center;}'
  + '.mc-mirror.is-swirl .mc-shows,.mc-mirror.is-swirl .mc-clear{animation:mcSwirl .4s ease-out;} @keyframes mcSwirl{0%{opacity:0;transform:scale(.6) rotate(-20deg);}100%{opacity:1;transform:none;}}'
  /* the boxes */
  + '.mc-boxes{display:flex;justify-content:center;flex-wrap:wrap;gap:6px;}'
  + '.mc-box{display:inline-flex;align-items:center;justify-content:center;min-width:52px;height:64px;padding:0 6px;box-sizing:border-box;border-radius:10px;font-family:' + H + ';font-weight:800;font-size:36px;line-height:1;color:' + INK + ';background:#FFF8E8;box-shadow:inset 0 0 0 3px #C9B48E;}'
  + 'button.mc-box{border:0;margin:0;cursor:pointer;} button.mc-box:disabled{cursor:default;}'
  + '.mc-box.is-sick{background:#FFFDF4;box-shadow:none;border:3px dashed #B98A55 !important;} .mc-box.is-sick.is-full{border:3px solid #E0A15E !important;background:#FBE9D2;}'
  + '.mc-box.is-misty{filter:blur(1.5px);opacity:.6;border-color:#9AA3AE !important;} .mc-box.is-healed.is-sick{color:#E0663A;border-color:#2E8C7E !important;background:#DDF1EC;}'
  + '.mc-box.is-drop{opacity:.35;text-decoration:line-through;}'
  + '.mc-line{display:flex;align-items:flex-end;justify-content:center;min-width:240px;min-height:64px;padding:0 10px 6px;border-bottom:4px solid #B98A55;font-family:' + H + ';font-weight:800;font-size:36px;color:' + INK + ';}'
  + '.mc-lc.is-given{color:#5E6670;} .mc-lc.is-misty{filter:blur(1.5px);opacity:.6;} .mc-line.is-healed{color:#146B5E;border-color:#2E8C7E;}'
  + '.mc-caret{display:inline-block;width:3px;height:36px;margin-left:3px;background:#E0663A;animation:mcBlink 1s steps(2) infinite;} @keyframes mcBlink{50%{opacity:0;}}'
  /* tiles, bank, keys */
  + '.mc-tray,.mc-bank{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;padding:8px;border-radius:12px;background:#EFE3C8;box-shadow:inset 0 0 0 3px #D9C29A;}'
  + '.mc-tile,.mc-bankw{display:inline-flex;align-items:center;justify-content:center;min-width:56px;min-height:56px;padding:4px 14px;border:0;border-radius:12px;background:#FFF8E8;box-shadow:inset 0 0 0 3px #C9B48E,0 4px 0 #C9B48E;font-family:' + H + ';font-weight:800;font-size:30px;line-height:1;color:' + INK + ';cursor:pointer;}'
  + '.mc-bankw{font-size:24px;} .mc-tile.is-in{background:#FBE9D2;box-shadow:inset 0 0 0 3px #E0A15E,0 4px 0 #E0A15E;} .mc-tile.is-dim{opacity:.45;} .mc-tile:disabled,.mc-bankw:disabled{cursor:default;}'
  + '.mc-keys{display:flex;flex-wrap:wrap;justify-content:center;gap:5px;}'
  + '.mc-key{min-width:44px;min-height:44px;padding:0;border:0;border-radius:9px;background:#FFF;box-shadow:inset 0 0 0 2px #C9B48E,0 3px 0 #C9B48E;font-family:' + H + ';font-weight:800;font-size:22px;color:' + INK + ';cursor:pointer;} .mc-key.is-back{min-width:64px;display:inline-flex;align-items:center;justify-content:center;} .mc-key.is-shift{min-width:64px;display:inline-flex;align-items:center;justify-content:center;} .mc-key.is-shift.is-on{background:#DDF1EC;box-shadow:inset 0 0 0 3px #146B5E,0 3px 0 #0E4A41;} .mc-key:disabled{cursor:default;}'
  + '.mc-foot{display:flex;justify-content:center;} .mc-look{display:inline-flex;align-items:center;gap:8px;min-width:150px;min-height:56px;padding:8px 26px;border:0;border-radius:28px;background:#146B5E;box-shadow:0 5px 0 #0E4A41;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;cursor:pointer;} .mc-look:disabled{opacity:.5;cursor:default;}'
  + '.mc-note{margin:0;min-height:1.3em;max-width:640px;align-self:center;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .mc-note.is-hint{color:#9A3D1C;}'
  + '.mc-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  /* phones */
  + '.mc-wrap.is-narrow,.mc-wrap.is-narrow .mc-main{gap:9px;} .mc-wrap.is-narrow .mc-row{gap:8px;}'
  + '.mc-wrap.is-narrow .mc-chart,.mc-wrap.is-narrow .mc-mirror,.mc-wrap.is-narrow .mc-glass{min-height:150px;} .mc-wrap.is-narrow .mc-chart{padding:22px 6px 8px;} .mc-wrap.is-narrow .mc-glass{box-shadow:inset 0 0 0 7px #146B5E,inset 0 0 0 9px #0E4A41,0 3px 0 #0E4A41;} .mc-wrap.is-narrow .mc-fog{inset:9px;}'
  + '.mc-wrap.is-narrow .mc-listen{right:2px;top:2px;} .mc-wrap.is-narrow .mc-chart{padding-top:30px;} .mc-wrap.is-narrow .mc-wordcard{font-size:34px;min-width:80px;min-height:80px;} .mc-wrap.is-narrow .mc-finger{font-size:24px;} .mc-wrap.is-narrow .mc-clear{font-size:26px;}'
  + '.mc-wrap.is-narrow .mc-box{min-width:44px;height:52px;font-size:28px;padding:0 4px;} .mc-wrap.is-narrow .mc-line{min-height:52px;font-size:28px;min-width:180px;} .mc-wrap.is-narrow .mc-caret{height:28px;}'
  + '.mc-wrap.is-narrow .mc-tile,.mc-wrap.is-narrow .mc-bankw{min-width:48px;min-height:48px;font-size:24px;padding:2px 10px;} .mc-wrap.is-narrow .mc-bankw{font-size:20px;} .mc-wrap.is-narrow .mc-tray,.mc-wrap.is-narrow .mc-bank{gap:6px;padding:6px;}'
  + '.mc-wrap.is-narrow .mc-key{font-size:19px;} .mc-wrap.is-narrow .mc-keys{gap:4px;}'
  + '.mc-wrap.is-narrow .mc-look{min-height:48px;min-width:130px;padding:6px 18px;font-size:20px;} .mc-wrap.is-narrow .mc-note{font-size:17px;} .mc-wrap .mc-look.is-key{min-height:44px;min-width:96px;padding:0 12px;border-radius:9px;font-size:17px;box-shadow:0 3px 0 #0E4A41;}'
  + '.mc-wrap.is-tiny .mc-chart,.mc-wrap.is-tiny .mc-mirror,.mc-wrap.is-tiny .mc-glass{min-height:112px;} .mc-wrap.is-tiny .mc-box{min-width:44px;height:48px;font-size:24px;} .mc-wrap.is-narrow .mc-chart{justify-content:flex-start;padding-left:10px;} .mc-wrap.is-narrow .mc-album{display:none;} .mc-wrap.is-tiny .mc-chart{padding:20px 8px 8px;} .mc-wrap.is-tiny.k-write.h-boxfirst .mc-chart,.mc-wrap.is-tiny.k-write.h-boxfirst .mc-mirror,.mc-wrap.is-tiny.k-write.h-boxfirst .mc-glass,.mc-wrap.is-tiny.k-write.h-first .mc-chart,.mc-wrap.is-tiny.k-write.h-first .mc-mirror,.mc-wrap.is-tiny.k-write.h-first .mc-glass,.mc-wrap.is-tiny.k-write.h-line .mc-chart,.mc-wrap.is-tiny.k-write.h-line .mc-mirror,.mc-wrap.is-tiny.k-write.h-line .mc-glass{min-height:84px;} .mc-wrap.is-tiny.k-write.h-boxfirst .mc-chart,.mc-wrap.is-tiny.k-write.h-first .mc-chart,.mc-wrap.is-tiny.k-write.h-line .mc-chart{padding:12px 8px 6px;} .mc-wrap.is-tiny.k-write.h-boxfirst .mc-pic,.mc-wrap.is-tiny.k-write.h-first .mc-pic,.mc-wrap.is-tiny.k-write.h-line .mc-pic{width:64px;height:64px;} .mc-wrap.is-tiny.k-write.h-boxfirst .mc-line,.mc-wrap.is-tiny.k-write.h-first .mc-line,.mc-wrap.is-tiny.k-write.h-line .mc-line{min-height:40px;} .mc-wrap.is-tiny.k-write.h-boxfirst .mc-keys,.mc-wrap.is-tiny.k-write.h-first .mc-keys,.mc-wrap.is-tiny.k-write.h-line .mc-keys{gap:2px;} .mc-wrap.is-tiny.k-write.h-boxfirst,.mc-wrap.is-tiny.k-write.h-boxfirst .mc-main,.mc-wrap.is-tiny.k-write.h-first,.mc-wrap.is-tiny.k-write.h-first .mc-main,.mc-wrap.is-tiny.k-write.h-line,.mc-wrap.is-tiny.k-write.h-line .mc-main{gap:6px;} .mc-wrap.is-tiny .mc-keys{gap:3px;} .mc-wrap.is-tiny,.mc-wrap.is-tiny .mc-main{gap:8px;}'
  /* a solved round on a phone: the tray, the keys and the button give their room to the shell's Next */
  + '.mc-wrap.is-narrow.is-done .mc-tray,.mc-wrap.is-narrow.is-done .mc-bank,.mc-wrap.is-narrow.is-done .mc-keys,.mc-wrap.is-narrow.is-done .mc-foot{display:none;}'
  + '.mc-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.mc-wrap *{animation:none !important;transition:none !important;}}'
  + '.mc-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'mc-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.MirrorChartActivity = MirrorChartActivity;
