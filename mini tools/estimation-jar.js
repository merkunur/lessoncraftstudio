/* =====================================================================
   TOOL #23 — ESTIMATION JAR   (estimation-jar.js)
   ---------------------------------------------------------------------
   Free-play manipulative (no `tasks` — the shell renders zero activity
   chrome). Morning Circle, Wave 3. This is the FIFTH Morning Circle tool
   and therefore the one that finally opens the suite footer that
   Calendar Wall deferred "until #5 ships".

   THE RITUAL: a jar fills with themed illustrated objects, clumped so it
   is deliberately UNCOUNTABLE. Children walk up and tap a number line to
   commit an estimate, which drops as an ANONYMOUS dot. Then the reveal:
   the objects fly out in GROUPS OF TEN into ten-frames, counted aloud
   (10, 20, 30 … then the leftover ones), so the count itself builds
   place value. The true count lands on the line among the dots.

   TWO DOCTRINE RULES, both mirrored from the already-gate-proven
   `estimate-jar-core.js` and both enforced by verify-estimation-jar.js:

     A. NO ACCURACY GRADIENT. `compare()` returns a SIGN — 'same' |
        'more' | 'fewer'. There is no distance, no gap, no rank, no
        "closest", no winner. An estimation jar is normally a
        competition; this one is not, and the gate bans the ranking
        vocabulary of all eleven locales so it cannot drift back.
     B. NO NUMERAL LEAK. `revealedCount()` THROWS before the reveal, so
        the true count is structurally unreachable — it must never sit
        in the DOM, an aria-label, the title or the live region while
        the children are still estimating.

   ANONYMITY BY CONSTRUCTION: an estimate is a position on a line. There
   is no name field to forget to omit, no order, and no running tally of
   who has gone. Estimates never leave the device.
   ===================================================================== */
var EstimationJar = {
  id: 'estimation-jar',

  /* CURATED: all eleven locales passed a 3-agent native ensemble (linguist +
     K-3 educator + marketing writer) and landed via
     apply-estimation-jar-fanout.js — 132 line-edits. The ensembles renamed
     the tool in five locales to clear names other products already own:
     pt dropped "pote" (Name Sticks / Class Timer), nl dropped both "schat-"
     (Shadow Match maker) and every vessel noun — Dutch has no natural
     non-"pot" jar word and "bokaal" reads as TROPHY, which the anti-ranking
     doctrine cannot carry — and da/no moved off the owned guess verbs onto
     their curricula's own term (overslag). de kept Schätzglas: `schätzen`
     is unowned and a different lemma from the `schatz-` makers. */
  strings: {
    title:        {en:'Estimation Jar',de:'Schätzglas',fr:'Le bocal mystère',it:'Quanti nel barattolo?',es:'El frasco de estimar',pt:'O vidro das estimativas',nl:'Hoeveel zitten erin?',sv:'Uppskattningsburken',da:'Overslagsglasset',no:'Overslagsglasset',fi:'Arviopurkki'},
    instruction:  {en:'Look at the jar. How many do you think are inside? Tap the line where your guess goes.',de:'Schaut euch das Glas an. Wie viele sind es wohl? Tippt eure Schätzung auf der Linie an.',fr:'Regardez le bocal. Combien y en a-t-il, à votre avis ? Touchez la ligne pour poser votre idée.',it:'Guardate il barattolo. Quanti saranno? Toccate la linea dove sta la vostra stima.',es:'Miren el frasco. ¿Qué número se imaginan? Toquen la línea donde va su idea.',pt:'Olhem o vidro. Quantos vocês acham que são? Toquem na linha onde fica o seu palpite.',nl:'Kijk goed. Hoeveel zouden het er zijn? Tik op de lijn waar jouw schatting hoort.',sv:'Titta på burken. Hur många tror ni att det är? Tryck på linjen.',da:'Se på glasset. Hvor mange mon der er? Tryk på linjen ved jeres bud.',no:'Se på glasset. Hvor mange tror dere det er? Trykk på tallinja der overslaget ditt hører hjemme.',fi:'Katsokaa purkkia. Montako niitä mahtaa olla? Napauttakaa viivaa oman arvionne kohdalta.'},
    privacyLine:  {en:'Guesses stay on this device and carry no names — they are never sent anywhere.',de:'Die Schätzungen bleiben auf diesem Gerät und tragen keine Namen – sie werden nie gesendet.',fr:'Les estimations restent sur cet appareil et ne portent aucun nom : elles ne sont jamais envoyées.',it:'Le stime restano su questo dispositivo e sono senza nome: non vengono mai inviate.',es:'Las estimaciones se quedan en este dispositivo y no llevan nombre: nunca salen de aquí.',pt:'As estimativas ficam neste aparelho e não levam nomes — nunca são enviadas.',nl:'De schattingen blijven op dit apparaat en zijn zonder naam — ze worden nooit verstuurd.',sv:'Uppskattningarna stannar på den här enheten, helt utan namn – de skickas aldrig vidare.',da:'Buddene bliver på denne enhed uden navne — de sendes aldrig nogen steder hen.',no:'Overslagene blir liggende på denne enheten og har ingen navn – de sendes aldri noe sted.',fi:'Arviot jäävät tälle laitteelle eikä niissä ole nimiä – niitä ei lähetetä mihinkään.'},

    /* stages */
    stageFill:    {en:'Fill the jar',de:'Glas füllen',fr:'Remplir le bocal',it:'Riempi il barattolo',es:'Llenar el frasco',pt:'Encher o vidro',nl:'Vullen',sv:'Fyll burken',da:'Fyld glasset',no:'Fyll glasset',fi:'Täytä purkki'},
    stageGuess:   {en:'Our guesses',de:'Unsere Schätzungen',fr:'Nos estimations',it:'Le nostre stime',es:'Nuestras ideas',pt:'Nossos palpites',nl:'Onze schattingen',sv:'Vad vi tror',da:'Vores bud',no:'Våre overslag',fi:'Meidän arviomme'},
    stageReveal:  {en:'Count them out',de:'Zusammen abzählen',fr:'Vider et compter',it:'Tiriamoli fuori',es:'Contemos juntos',pt:'Contar juntos',nl:'Samen uittellen',sv:'Räkna tillsammans',da:'Tæl dem op',no:'Tell dem opp',fi:'Lasketaan ne'},

    /* fill face */
    pickSet:      {en:'What’s in the jar?',de:'Was ist im Glas?',fr:'Qu’y a-t-il dans le bocal ?',it:'Che cosa c’è nel barattolo?',es:'¿Qué hay en el frasco?',pt:'O que tem no vidro?',nl:'Wat gaat erin?',sv:'Vad ska i burken?',da:'Hvad er der i glasset?',no:'Hva skal i glasset?',fi:'Mitä purkissa on?'},
    howMany:      {en:'How many to put in',de:'Wie viele sollen hinein?',fr:'Combien en mettre',it:'Quanti metterne',es:'Cantidad que va dentro',pt:'Quantos colocar',nl:'Hoeveel erin',sv:'Hur många ska i burken',da:'Hvor mange skal der i',no:'Hvor mange skal oppi',fi:'Montako purkkiin laitetaan'},
    secretHint:   {en:'Only you can see this number. Set it, then hand over to the class.',de:'Nur Sie sehen diese Zahl. Einstellen und dann an die Klasse übergeben.',fr:'Vous seul voyez ce nombre. Réglez-le, puis passez la main à la classe.',it:'Solo voi vedete questo numero. Impostatelo, poi date la parola alla classe.',es:'Solo tú ves este número. Ajústalo y pásale el turno a la clase.',pt:'Só você vê este número. Ajuste e passe a vez para a turma.',nl:'Alleen jij ziet dit getal. Stel het in en geef daarna de klas het woord.',sv:'Bara du ser det här talet. Ställ in det och lämna sedan över till klassen.',da:'Kun du ser dette tal. Vælg det, og giv så ordet videre til klassen.',no:'Bare du ser dette tallet. Still det inn, og gi ordet til klassen.',fi:'Vain sinä näet tämän luvun. Aseta se ja anna sitten vuoro luokalle.'},
    shakeJar:     {en:'Fill it up',de:'Auffüllen',fr:'Remplir',it:'Riempilo',es:'Llenar',pt:'Encher',nl:'Vullen maar',sv:'Fyll på',da:'Fyld op',no:'Fyll opp',fi:'Täytä'},

    /* guess face */
    addGuess:     {en:'Add this guess',de:'Schätzung eintragen',fr:'Ajouter cette estimation',it:'Aggiungi questa stima',es:'Agregar esta idea',pt:'Marcar este palpite',nl:'Deze schatting erbij',sv:'Sätt dit pricken',da:'Tilføj buddet',no:'Legg til overslaget',fi:'Lisää tämä arvio'},
    undoGuess:    {en:'Take the last one back',de:'Die letzte zurücknehmen',fr:'Retirer la dernière',it:'Togli l’ultima',es:'Quitar la última',pt:'Tirar o último',nl:'Laatste terugnemen',sv:'Ta bort den sista pricken',da:'Tag det sidste bud tilbage',no:'Ta tilbake den siste',fi:'Ota viimeisin pois'},
    nudgeDown:    {en:'A little less',de:'Etwas kleiner',fr:'Un peu moins',it:'Un po’ di meno',es:'Un poco menos',pt:'Um pouco menos',nl:'Iets lager',sv:'Lite färre',da:'Lidt færre',no:'Litt lavere',fi:'Hieman vähemmän'},
    nudgeUp:      {en:'A little more',de:'Etwas größer',fr:'Un peu plus',it:'Un po’ di più',es:'Un poco más',pt:'Um pouco mais',nl:'Iets hoger',sv:'Lite fler',da:'Lidt flere',no:'Litt høyere',fi:'Hieman enemmän'},
    nudgeDown10:  {en:'Ten fewer',de:'Zehn weniger',fr:'Dix de moins',it:'Dieci in meno',es:'Diez menos',pt:'Dez a menos',nl:'Tien minder',sv:'Tio färre',da:'Ti færre',no:'Ti færre',fi:'Kymmenen vähemmän'},
    nudgeUp10:    {en:'Ten more',de:'Zehn mehr',fr:'Dix de plus',it:'Dieci in più',es:'Diez más',pt:'Dez a mais',nl:'Tien meer',sv:'Tio fler',da:'Ti flere',no:'Ti flere',fi:'Kymmenen enemmän'},
    surprise:     {en:'Pick a number for me',de:'Zahl für mich auswählen',fr:'Choisir un nombre pour moi',it:'Scegli un numero per me',es:'Elige un número por mí',pt:'Escolha um número para mim',nl:'Kies een getal voor mij',sv:'Välj ett tal åt mig',da:'Vælg et tal for mig',no:'Velg et tall for meg',fi:'Valitse luku puolestani'},
    capAria:      {en:'Jar that holds up to {n}',de:'Glas für bis zu {n}',fr:'Bocal pouvant contenir jusqu’à {n}',it:'Barattolo che contiene fino a {n}',es:'Frasco para hasta {n}',pt:'Vidro que leva até {n}',nl:'Pot voor maximaal {n}',sv:'Burk som rymmer upp till {n}',da:'Glas der kan rumme op til {n}',no:'Glass som rommer opptil {n}',fi:'Purkki, johon mahtuu enintään {n}'},
    capLabel:     {en:'How big is the jar?',de:'Wie groß ist das Glas?',fr:'Quelle taille de bocal ?',it:'Quanto è grande il barattolo?',es:'¿De qué tamaño es el frasco?',pt:'Qual o tamanho do vidro?',nl:'Hoe groot is de pot?',sv:'Hur stor är burken?',da:'Hvor stort er glasset?',no:'Hvor stort er glasset?',fi:'Kuinka iso purkki on?'},
    guessesIn:    {en:'Every guess belongs on the line.',de:'Jede Schätzung gehört auf die Linie.',fr:'Chaque estimation a sa place sur la ligne.',it:'Ogni stima ha il suo posto sulla linea.',es:'Cada idea tiene su lugar en la línea.',pt:'Todo palpite tem lugar na linha.',nl:'Elke schatting hoort op de lijn.',sv:'Varje tanke får plats på linjen.',da:'Alle bud hører til på linjen.',no:'Alle overslag hører hjemme på tallinja.',fi:'Jokainen arvio kuuluu viivalle.'},

    /* reveal face */
    revealBtn:    {en:'Tip the jar out',de:'Glas ausleeren',fr:'Vider le bocal',it:'Svuota il barattolo',es:'Vaciar el frasco',pt:'Despejar o vidro',nl:'Alles eruit',sv:'Töm burken',da:'Tøm glasset',no:'Tøm glasset',fi:'Kaada purkki tyhjäksi'},
    revealHint:   {en:'They come out in tens, and we count together.',de:'Immer zehn auf einmal – und wir zählen alle laut mit.',fr:'On les sort dix par dix, et on compte ensemble.',it:'Escono dieci alla volta e contiamo insieme.',es:'Salen de diez en diez y contamos juntos.',pt:'Saem de dez em dez e contamos juntos.',nl:'Ze komen er met tien tegelijk uit, en we tellen samen mee.',sv:'De kommer ut tio i taget och vi räknar tillsammans.',da:'De kommer ud ti ad gangen, og vi tæller højt undervejs.',no:'De kommer ut ti og ti, og vi teller sammen.',fi:'Ne tulevat ulos kymmenittäin, ja lasketaan ne ääneen.'},
    theJarHeld:   {en:'The jar held {n}.',de:'Im Glas waren {n}.',fr:'Le bocal en contenait {n}.',it:'Nel barattolo ce n’erano {n}.',es:'En el frasco había {n}.',pt:'O vidro tinha {n}.',nl:'Er zaten er {n} in.',sv:'I burken fanns det {n}.',da:'I glasset var der {n}.',no:'I glasset var det {n}.',fi:'Purkissa oli {n}.'},
    neighbourhood:{en:'Look how many of us landed in the neighborhood.',de:'Schaut mal, wie viele von uns schon ganz nah dran waren.',fr:'Regardez comme nous étions nombreux dans les parages !',it:'Guardate quante delle nostre stime erano lì intorno.',es:'Miren cuántas de nuestras ideas quedaron por esa zona.',pt:'Vejam quantos de nós ficamos aqui em volta.',nl:'Kijk eens hoeveel van ons er in de buurt zaten.',sv:'Titta så många av oss som var nära.',da:'Se, hvor mange af os der var lige i nærheden.',no:'Se så mange av oss som var i nærheten!',fi:'Katsokaa, kuinka moni meistä oli samoilla main.'},
    again:        {en:'A new jar',de:'Ein neues Glas',fr:'Un nouveau bocal',it:'Un nuovo barattolo',es:'Un frasco nuevo',pt:'Um vidro novo',nl:'Opnieuw vullen',sv:'En ny burk',da:'Et nyt glas',no:'Et nytt glass',fi:'Uusi purkki'},

    /* sets + premium */
    setsTitle:    {en:'Jar fillings',de:'Füllungen fürs Glas',fr:'Ce qu’on met dans le bocal',it:'Contenuti del barattolo',es:'Cosas para el frasco',pt:'O que vai no vidro',nl:'Vullingen',sv:'Burkens innehåll',da:'Fyld til glasset',no:'Innhold til glasset',fi:'Purkin täytteet'},
    setsClose:    {en:'Close',de:'Schließen',fr:'Fermer',it:'Chiudi',es:'Cerrar',pt:'Fechar',nl:'Sluiten',sv:'Stäng',da:'Luk',no:'Lukk',fi:'Sulje'},
    lockedSet:    {en:'Premium filling',de:'Premium-Füllung',fr:'Contenu Premium',it:'Contenuto Premium',es:'Contenido Premium',pt:'Só no Premium',nl:'Premium-vulling',sv:'Premiuminnehåll',da:'Premium-fyld',no:'Premium-innhold',fi:'Premium-täyte'},
    gatePremium:  {en:'The seasonal fillings and jars past {n} are part of Premium — the starter jar is always free.',de:'Die saisonalen Füllungen und Mengen über {n} gehören zu Premium – das Startglas bleibt immer kostenlos.',fr:'Les contenus de saison et les bocaux de plus de {n} objets font partie de Premium : le bocal de départ reste gratuit.',it:'I contenuti stagionali e i barattoli oltre {n} fanno parte di Premium: il barattolo iniziale resta gratuito.',es:'Las colecciones de temporada y los frascos con más de {n} son parte de Premium: el frasco inicial siempre es gratis.',pt:'As opções sazonais e os vidros acima de {n} são do Premium — o vidro inicial é sempre grátis.',nl:'De seizoensvullingen en aantallen boven {n} horen bij Premium — de startvulling blijft altijd gratis.',sv:'Säsongens innehåll och burkar över {n} ingår i Premium – startburken är alltid gratis.',da:'Sæsonfyld og glas med over {n} ting hører til Premium – startglasset er altid gratis.',no:'Sesonginnholdet og glass over {n} hører til Premium – startglasset er alltid gratis.',fi:'Kausitäytteet ja yli {n} esineen purkit kuuluvat Premiumiin – aloituspurkki on aina ilmainen.'},
    unlock:       {en:'See Premium',de:'Premium ansehen',fr:'Découvrir Premium',it:'Scopri Premium',es:'Ver Premium',pt:'Ver o Premium',nl:'Bekijk Premium',sv:'Se Premium',da:'Se Premium',no:'Se Premium',fi:'Tutustu Premiumiin'},

    /* settings */
    setVoice:     {en:'Count aloud',de:'Laut mitzählen',fr:'Compter à voix haute',it:'Conta ad alta voce',es:'Contar en voz alta',pt:'Contar em voz alta',nl:'Hardop meetellen',sv:'Räkna högt',da:'Tæl højt',no:'Tell høyt',fi:'Laske ääneen'},
    setSeason:    {en:'Suggest by season',de:'Nach Jahreszeit vorschlagen',fr:'Proposer selon la saison',it:'Proponi per stagione',es:'Sugerir por temporada',pt:'Sugerir por estação',nl:'Voorstellen per seizoen',sv:'Föreslå efter årstid',da:'Foreslå efter årstid',no:'Foreslå etter årstid',fi:'Ehdota vuodenajan mukaan'},

    /* Morning Circle suite footer — opened by this tool (the fifth) */
    suiteLabel:   {en:'Morning meeting tools:',de:'Werkzeuge für den Morgenkreis:',fr:'Outils pour le rituel du matin :',it:'Strumenti per l’accoglienza:',es:'Para el círculo de la mañana:',pt:'Ferramentas para a rodinha:',nl:'Hulpmiddelen voor de dagopening:',sv:'Verktyg för samlingen:',da:'Værktøjer til morgensamlingen:',no:'Verktøy til morgensamlingen:',fi:'Aamupiirin työkalut:'},
    siblingCal:   {en:'Calendar Wall',de:'Kalendertafel',fr:'Calendrier de la classe',it:'Calendario della classe',es:'Calendario del salón',pt:'Mural do calendário',nl:'Dagopening',sv:'Samlingskalender',da:'Kalendervæg',no:'Kalendervegg',fi:'Kalenteriseinä'},
    siblingNte:   {en:'Number Talk Easel',de:'Blitzblick-Tafel',fr:'Cartes à points',it:'Immagini lampo',es:'Caballete numérico',pt:'Conversa numérica',nl:'Flitsbeelden',sv:'Blixtbilder',da:'Lynbilleder',no:'Kvikkbilder',fi:'Välähdyskuvat'},
    siblingWodb:  {en:'Which One Doesn’t Belong?',de:'Was passt nicht dazu?',fr:'Quel est l’intrus ?',it:'Chi è l’intruso?',es:'¿Cuál no encaja?',pt:'Qual não pertence?',nl:'Welke hoort er niet bij?',sv:'Vilken passar inte in?',da:'Hvad passer ikke ind?',no:'Hvilken passer ikke inn?',fi:'Mikä ei kuulu joukkoon?'},
    siblingChc:   {en:'Choral Counting',de:'Zählen im Chor',fr:'Comptons ensemble',it:'Contiamo insieme',es:'Conteo en coro',pt:'Contagem em coro',nl:'Samen tellen',sv:'Räkna i kör',da:'Tælle i kor',no:'Telle i kor',fi:'Lasketaan yhdessä'}
  },

  /* Copied from frontend/lib/seasonal-hub.ts:335-343 — that module imports
     `fs` and is server-only, so it cannot be reached from a mini-tool.
     Keep the two in step if the windows ever move. Only the UNIVERSAL
     seasons appear; 4th_of_july and thanksgivinng are en-only there. */
  SEASON_WINDOW: {
    christmas: [10, 11], easter: [1, 3], winter: [10, 1], spring: [1, 4], summer: [4, 7]
  },
  /* compound-number locales need a slower read past 100 (choral-counting:105) */
  RATE_SLOW: { de: 1, nl: 1, fi: 1, sv: 1, da: 1, no: 1 },

  FALLBACK_SETS: {
    version: 1, freeMax: 30, premiumMax: 200,
    sets: [
      { id: 'cherries',  noun: 'cherry',   imageDir: 'fruits',              imageFile: 'cherry',   season: null, free: true },
      { id: 'stars',     noun: 'star',     imageDir: 'shapes',              imageFile: 'star',     season: null, free: true },
      { id: 'lollipops', noun: 'lollipop', imageDir: 'desserts and sweets', imageFile: 'lollipop', season: null, free: true }
    ]
  },

  defaults: { voice: true, season: true },
  settings: [
    { key: 'voice', type: 'toggle', labelKey: 'setVoice' },
    { key: 'season', type: 'toggle', labelKey: 'setSeason' }
  ],

  STORE_KEY: 'lcs:estimation-jar:v1',
  ENT_TRUST_DAYS: 14,

  /* =================================================================
     PURE ENGINE — no DOM. The build gate calls these directly.
     ================================================================= */

  /* freeMax / premiumMax stay the TIER bounds — they clamp a deep link
     and they name the number in the paywall copy. They are no longer
     the jar: `ceiling()` below reads the teacher's chosen capacity. */
  freeMax: function () { return (this.data && this.data.freeMax) || 30; },
  premiumMax: function () { return (this.data && this.data.premiumMax) || 200; },

  /* THE STRUCTURAL GATE — locked sets are ABSENT, not hidden, so a
     premium filling never reaches the DOM for a free visitor. */
  setsFor: function () {
    var all = (this.data && this.data.sets) || [], out = [];
    for (var i = 0; i < all.length; i++) if (all[i].free || this.premium) out.push(all[i]);
    return out;
  },

  setById: function (id) {
    var s = this.setsFor();
    for (var i = 0; i < s.length; i++) if (s[i].id === id) return s[i];
    return null;
  },

  /* DOCTRINE A — the compare is a SIGN. Never a distance, never a rank.
     Deliberately returns a primitive string so no gradient can hide in
     an object field. */
  compare: function (guess, actual) {
    return actual === guess ? 'same' : (actual > guess ? 'more' : 'fewer');
  },

  /* DOCTRINE B — the truth is unreachable until the jar has been tipped
     out. Mirrors estimate-jar-core.js `getActual`, which throws for the
     same reason: a child must not be able to read the answer off the
     screen while the class is still estimating. */
  revealedCount: function (state) {
    if (!state || state.stage !== 'reveal')
      throw new Error('the count is not available before the jar is tipped out');
    return state.count;
  },

  /* =================================================================
     THE PACKING ENGINE — pure, DOM-free, and the honest core of the
     rebuild. Every function here is called directly by the build gate.

     THE ARCHITECTURAL INVERSION: the fill line is an OUTPUT, not an
     input. v1 computed a height from a formula and drew decorative
     blobs to match it; this places N objects by deposition and the top
     of the resulting pile IS the fill line. That is self-correcting for
     object shape — a jar of snowflakes and a jar of blueberries at the
     same N have honestly different fill heights — and it deletes a
     whole class of "the glass says one thing and the contents say
     another" bug.
     ================================================================= */

  /* mulberry32, the declared house idiom (draw-bag.js:266). The
     (seed*9301+49297)%233280 LCG this file used to carry is on the
     do-not-copy list: its low bits are visibly correlated, and this
     packer draws two jitters + a depth + a rotation from CONSECUTIVE
     calls per object — exactly the pattern that surfaces LCG banding as
     diagonal streaks across a pile. */
  mulberry32: function (s) {
    return function () {
      s = (s + 0x6D2B79F5) | 0;
      var t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  },

  /* ⚠ THE SEED DELIBERATELY DOES NOT INCLUDE N. Measured: seeding per
     count re-rolled the whole arrangement on every step, so the pile
     top moved DOWN as the teacher added an object — 83 non-monotonic
     steps in a 200-jar. Adding one object must add one object. Seeding
     per (set, capacity) makes the lattice stable, so packPile(n) is a
     PREFIX of packPile(n+1) and monotonicity holds by construction
     rather than by luck. It also stops the pile jumping about while the
     teacher dials the count in. */
  seedFor: function (setId, capacity) {
    var seed = 0, s = String(setId || '');
    for (var i = 0; i < s.length; i++) seed = (seed * 31 + s.charCodeAt(i)) | 0;
    return seed ^ (capacity * 2246823);
  },

  /* The glass interior, sampled. Inverting the béziers at runtime would
     be slower and no more accurate than lerping a table measured off
     the same path the SVG draws. y 60-100 is the neck, reached only by
     the overfill case. */
  PROFILE: [
    [48, 29], [62, 40], [76, 58], [84, 68], [88, 70], [120, 72.5],
    [160, 73], [200, 71.5], [214, 69], [224, 64], [232, 56], [238, 50]
  ],
  FILL_TOP: 88,      /* the capacity ring — a full jar's pile tops out here */
  FILL_BOTTOM: 238,

  interiorHalfWidthAt: function (y) {
    var P = this.PROFILE, i;
    if (y <= P[0][0]) return P[0][1];
    if (y >= P[P.length - 1][0]) return P[P.length - 1][1];
    for (i = 0; i < P.length - 1; i++) {
      if (y >= P[i][0] && y <= P[i + 1][0]) {
        var t = (y - P[i][0]) / (P[i + 1][0] - P[i][0]);
        return P[i][1] + t * (P[i + 1][1] - P[i][1]);
      }
    }
    return P[P.length - 1][1];
  },

  /* How many lattice slots sit at or below the capacity ring for a
     given object radius. Pure counting — no objects, no rng — so it is
     cheap enough to bisect at pack time. */
  slotsBelowRing: function (R) {
    var px = 2 * R * 0.90, py = 1.50 * R;
    var y = this.FILL_BOTTOM - R * 0.98, count = 0, guard = 0;
    while (y >= this.FILL_TOP && guard++ < 400) {
      var half = this.interiorHalfWidthAt(y);
      count += Math.max(1, Math.floor((2 * half - 2 * R) / px) + 1);
      y -= py;
    }
    return count;
  },

  /* ⚠ THE OBJECT RADIUS IS SOLVED, NOT TUNED.
     The obvious formula — R = sqrt(phi*A/(pi*capacity)) with a fitted
     efficiency phi — was tried first and abandoned on measurement: the
     lattice is DISCRETE, so no single phi lands a full jar on the ring
     at every capacity. Solving it showed a 30-jar jumping from y116 to
     y94 across 0.75 units of R, because that is one whole row appearing.
     A constant fitted to that is a constant fitted to a knife edge.

     So instead of fitting, ask the question directly: what is the
     largest R for which `capacity` objects still fit at or below the
     ring? Bisection over an exactly-computable slot count. That is true
     by construction for every capacity, needs no magic number, and the
     gate can check it in one line — the capacity-th object sits below
     the ring and the (capacity+1)-th does not. */
  packRadius: function (capacity) {
    var cap = Math.max(1, Math.floor(capacity || 30));
    this._radiusCache = this._radiusCache || {};
    if (this._radiusCache[cap]) return this._radiusCache[cap];
    var lo = 1.5, hi = 45, i, mid;
    /* slotsBelowRing is monotonically DECREASING in R, so bisect for the
       largest R that still holds `cap`. */
    for (i = 0; i < 44; i++) {
      mid = (lo + hi) / 2;
      if (this.slotsBelowRing(mid) >= cap) lo = mid; else hi = mid;
    }
    return (this._radiusCache[cap] = lo);
  },

  /* Offset-lattice deposition, bottom-up. Not a physics sim — a hex
     lattice with jitter, which is what a settled pile actually is.
     Returns viewBox-unit placements, so a resize NEVER re-packs (a pile
     that reshuffles when the projector resolution is detected, or
     mid-reveal, is the bug that rule exists to prevent).
     `rotN` is normalised to [-1,1] and multiplied by the set's own
     rotMax at draw time, so one packing serves every set. */
  packFull: function (capacity, setId) {
    var cap = Math.max(1, Math.floor(capacity || 30));
    var key = setId + '|' + cap;
    if (this._packCache && this._packCache.key === key) return this._packCache.slots;

    var R = this.packRadius(cap);
    var rnd = this.mulberry32(this.seedFor(setId, cap));
    var px = 2 * R * 0.90;          /* horizontal pitch, 10% overlap */
    var py = 1.50 * R;              /* vertical pitch (hex, nested)  */
    var out = [];
    var y = this.FILL_BOTTOM - R * 0.98;
    var row = 0, i, j, tmp;

    /* Deposit until the jar is full, plus a little headroom so an
       overfilled jar spills into the neck honestly rather than dropping
       objects on the floor. */
    while (out.length < cap * 1.35 && y > 52) {
      var half = this.interiorHalfWidthAt(y);
      var k = Math.max(1, Math.floor((2 * half - 2 * R) / px) + 1);
      /* ⚠ A STRICTLY ALTERNATING HALF-OFFSET IS STILL A LATTICE, and
         the render showed it: the pile read as visible columns. A
         per-row random offset destroys the vertical alignment the eye
         picks up (it detects it down to about 5 degrees), while the row
         PITCH stays regular so the pile still settles rather than
         floating. Offset is capped at a quarter-pitch so an odd row
         cannot be pushed past the wall. */
      var x0 = 100 - ((k - 1) * px) / 2 + (rnd() - 0.5) * px * 0.5;
      var slots = [];
      for (i = 0; i < k; i++) slots.push(i);
      /* EVERY row is shuffled, not just the last one. Filling a partial
         row left-to-right leaves a rectangular gap and the pile reads as
         a grid instantly; shuffling makes the surface look poured. Doing
         it to every row (rather than only the incomplete one) is what
         lets packPile(n) be a clean PREFIX — see seedFor. */
      for (i = slots.length - 1; i > 0; i--) {
        j = Math.floor(rnd() * (i + 1));
        tmp = slots[i]; slots[i] = slots[j]; slots[j] = tmp;
      }
      for (i = 0; i < slots.length; i++) {
        /* jitter raised from 0.16/0.13 after reading the render — at the
           lower values the pile still read as rows and columns, because
           0.16 of a pitch is only 0.29R against an object of radius R */
        var ox = x0 + slots[i] * px + (rnd() * 2 - 1) * px * 0.30;
        var oy = y + (rnd() * 2 - 1) * py * 0.24;
        /* ⚠ CLAMP TO THE WALL. Measured before this line: 328 objects in
           a 200-jar had their packing disc outside the glass, worst case
           8.8 units past it. The clip path would have hidden the crime
           and left a flat-sided pile. The r70 disc stays in; the sprite
           may still overhang, and a cherry stem sliced by the glass edge
           reads as BEHIND the glass, which is correct.
           ⚠ Measure the wall at the JITTERED height, not the row's. The
           first version used the row y and left 261 sub-unit breaches,
           because jitter lifts an object into a narrower part of the
           glass than the row it belongs to. */
        var lim = Math.max(0, this.interiorHalfWidthAt(oy) - R);
        if (ox > 100 + lim) ox = 100 + lim;
        if (ox < 100 - lim) ox = 100 - lim;
        var d = rnd();
        out.push({
          x: ox, y: oy, row: row, baseY: oy,
          rotN: rnd() * 2 - 1,
          depth: d,
          /* three discrete tint buckets: the variety lever, and free —
             three pre-rendered sprites instead of 200 composites */
          tint: d < 0.42 ? 0 : (d < 0.76 ? 1 : 2),
          scale: (1 - 0.10 * d) * (0.93 + rnd() * 0.14)
        });
      }
      y -= py; row++;
    }
    this._packCache = { key: key, slots: out, R: R, py: py };
    return out;
  },

  packPile: function (n, capacity, setId) {
    var cap = Math.max(1, Math.floor(capacity || 30));
    var all = this.packFull(cap, setId);
    var N = Math.max(0, Math.min(all.length, Math.floor(n || 0)));
    var R = this._packCache.R;
    var out = [], i;
    for (i = 0; i < N; i++) {
      var s = all[i];
      out.push({ x: s.x, y: s.baseY, row: s.row, rotN: s.rotN, depth: s.depth, tint: s.tint, scale: s.scale });
    }
    /* THE CROWN, applied at slice time because it depends on where the
       pile currently tops out. A poured pile domes in the middle; the
       weight ramps in over the top three rows so it reads as a dome and
       not a bulge. */
    var topRow = 0;
    for (i = 0; i < out.length; i++) if (out[i].row > topRow) topRow = out[i].row;
    for (i = 0; i < out.length; i++) {
      var o = out[i];
      var w = Math.max(0, Math.min(1, (o.row - (topRow - 2)) / 3));
      if (!w) continue;
      var half = this.interiorHalfWidthAt(o.y);
      var u = (o.x - 100) / Math.max(1, half);
      o.y -= R * 0.28 * Math.max(0, 1 - u * u) * w;
      /* re-clamp AFTER the crown: lifting an object moves it into a
         narrower part of the glass, so a point that was inside the wall
         at its packed height can be outside it once crowned. Measured
         at 292 sub-unit breaches before this line — small enough that
         the clip path would have swallowed them, which is exactly why
         it is worth closing rather than tolerating. */
      var lim = Math.max(0, this.interiorHalfWidthAt(o.y) - R);
      if (o.x > 100 + lim) o.x = 100 + lim;
      if (o.x < 100 - lim) o.x = 100 - lim;
    }
    return out;
  },

  /* Paint back-to-front. Sorting by DEPTH rather than by row is what
     stops the pile reading as scanlines — it interleaves rows in one
     comparator. Precedent at small counts: echo-grove-activity.js:162
     and mochi-feast-core.js:301 sort their sprites the same way. */
  paintOrder: function (placements) {
    return placements.slice().sort(function (a, b) {
      return (b.depth - a.depth) || (a.row - b.row);
    });
  },

  /* The reveal drains from the TOP, so the jar visibly empties. */
  drainOrder: function (placements) {
    return placements.slice().sort(function (a, b) { return a.y - b.y; });
  },

  /* The top of the pile, in viewBox units — the fill line, which is now
     measured off the placements rather than asserted by a formula. */
  pileTop: function (placements) {
    var top = this.FILL_BOTTOM, i;
    for (i = 0; i < placements.length; i++) if (placements[i].y < top) top = placements[i].y;
    return top;
  },

  /* =================================================================
     CAPACITY — the teacher's choice, never the subscription tier.
     ================================================================= */

  capacities: function () {
    var c = (this.data && this.data.capacities) || [
      { id: 'small', cap: 30, free: true },
      { id: 'medium', cap: 60, free: false },
      { id: 'large', cap: 200, free: false }
    ];
    return c;
  },
  openCapacities: function () {
    var all = this.capacities(), out = [], i;
    for (i = 0; i < all.length; i++) if (all[i].free || this.premium) out.push(all[i]);
    return out.length ? out : [all[0]];
  },
  capacityById: function (id) {
    var all = this.capacities(), i;
    for (i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  },
  /* THE CEILING IS THE JAR, NOT THE TIER. This is the single line that
     fixes the v1 defect where the same 30 cherries rendered as an
     88%-full jar for a free teacher and a 39%-full jar for a
     subscriber, and where the number line ran 0..200 for a jar of 24. */
  ceiling: function () {
    var c = this.capacityById(this.capacityId);
    if (c && (c.free || this.premium)) return c.cap;
    var open = this.openCapacities();
    return open[open.length - 1].cap;
  },

  /* A count the teacher did not have to think of. Decades are
     deliberately rejected: a multiple of ten leaves ZERO leftover ones,
     which skips the most valuable moment of the reveal; children carry a
     documented round-number bias in estimation, so a round answer
     rewards the bias instead of confronting it; and an exact "same" hit
     becomes artificially likely, which manufactures de-facto winners
     against Doctrine A. Multiples of five are down-weighted for the
     same reasons, more weakly. Takes an injected rng so the gate can
     prove the rejection rules rather than sample and hope. */
  pickCount: function (capacity, rnd) {
    var cap = Math.max(4, capacity || 30);
    var lo = Math.max(4, Math.round(cap * 0.25));
    var hi = Math.max(lo + 1, Math.round(cap * 0.85));
    var tries = 0, v;
    while (tries++ < 40) {
      v = lo + Math.floor(rnd() * (hi - lo + 1));
      if (v % 10 === 0) continue;
      if (v % 5 === 0 && rnd() < 0.75) continue;
      return v;
    }
    /* the loop is bounded, so it must still terminate on something
       legal — walk off the nearest decade rather than return one */
    v = lo + Math.floor((hi - lo) / 2);
    if (v % 10 === 0) v += 1;
    return Math.max(1, Math.min(cap, v));
  },

  /* 137 -> [10,10,10,10,10,10,10,10,10,10,10,10,10,7] */
  groupsOfTen: function (n) {
    var out = [], left = Math.max(0, Math.floor(n));
    while (left >= 10) { out.push(10); left -= 10; }
    if (left > 0) out.push(left);
    return out;
  },

  /* running totals spoken during the reveal: 10, 20, 30 … then the total */
  runningTotals: function (n) {
    var g = this.groupsOfTen(n), out = [], t = 0;
    for (var i = 0; i < g.length; i++) { t += g[i]; out.push(t); }
    return out;
  },

  /* month -> seasonal keys, nearest first (seasonal-hub.ts:351-359) */
  seasonsByProximity: function (month) {
    var self = this, keys = [];
    for (var k in this.SEASON_WINDOW) if (Object.prototype.hasOwnProperty.call(this.SEASON_WINDOW, k)) keys.push(k);
    function inWindow(k, m) {
      var w = self.SEASON_WINDOW[k], a = w[0], b = w[1];
      return a <= b ? (m >= a && m <= b) : (m >= a || m <= b);
    }
    return keys.filter(function (k) { return inWindow(k, month); });
  },

  resolveDeepLink: function (params, premium) {
    if (!params) return null;
    var sid = params.set;
    if (!sid) return null;
    var all = (this.data && this.data.sets) || [], found = null, i;
    for (i = 0; i < all.length; i++) if (all[i].id === sid) { found = all[i]; break; }
    if (!found) return null;
    if (!found.free && !premium) return null;
    var tierMax = premium ? this.premiumMax() : this.freeMax();
    var c = parseInt(params.count, 10);
    if (!isFinite(c) || c < 1) c = null;
    if (c !== null && c > tierMax) c = tierMax;   /* never hand a free visitor a premium-size jar */
    /* ⚠ A DEEP LINK MUST BRING ITS JAR WITH IT. The count ceiling is now
       the chosen capacity, not the tier, so a link asking for 200 landed
       in the default 30-jar and silently clamped to 30 — the link
       resolved, and quietly delivered a different lesson. Pick the
       smallest capacity that actually holds the request, within tier. */
    var capId = null;
    if (c !== null) {
      var caps = this.capacities(), i;
      for (i = 0; i < caps.length; i++) {
        if ((caps[i].free || premium) && caps[i].cap >= c) { capId = caps[i].id; break; }
      }
      if (!capId) {
        var open = [];
        for (i = 0; i < caps.length; i++) if (caps[i].free || premium) open.push(caps[i]);
        capId = open.length ? open[open.length - 1].id : null;
      }
    }
    return { set: sid, count: c, capacityId: capId };
  },

  fmt: function (key, args) {
    var s = this.api.t(key);
    for (var k in args) if (Object.prototype.hasOwnProperty.call(args, k))
      s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), args[k]);
    return s;
  },

  premium: false,

  /* =================================================================
     LIFECYCLE
     ================================================================= */

  init: function (api) {
    var self = this;
    this.api = api;
    /* ⚠ `body.ej-wide{overflow-y:auto}` has been in this stylesheet all along
       with NOTHING ever adding the class — a dead rule, found while fanning
       the tool out for wide boards. The class is the tool's own page scope
       and the tier block below needs it, so add it here and the overflow rule
       starts working too. */
    document.body.classList.add('ej-wide');
    injectEstimationJarCSS();

    this.data = null;
    this.stage = 'fill';
    this.setId = null;
    this.capacityId = 'small';
    /* 23, not the old 12. Above 20 so the tens-then-ones reveal the
       landing copy sells actually fires; not a decade, so the leftover
       ones — the place-value payload — are never empty; ones digit not
       zero; and it fits the free jar. The old 12 was counted out as
       "ten … twelve", which skips the exact move the tool teaches. */
    this.count = 23;          /* never rendered before the reveal */
    this.guesses = [];        /* anonymous values only — no names, no order meaning */
    this.pending = null;
    this.premiumKnown = false;
    this._deepPending = this._readParams();
    this._timers = [];
    this._store = this._loadStore();

    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';

    this._fetchSets();
    this._fetchEntitlement();

    document.addEventListener('keydown', function (e) {
      if (!self._wrap) return;
      var t = e.target || {};
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') return;
      if (self.stage !== 'guess' || self.pending === null) return;
      if (e.key === 'ArrowLeft') { self._nudge(-1); e.preventDefault(); }
      else if (e.key === 'ArrowRight') { self._nudge(1); e.preventDefault(); }
      else if (e.key === 'Enter') { self._commit(); e.preventDefault(); }
    });
  },

  _readParams: function () {
    var q = {};
    try {
      var p = new URLSearchParams(location.search);
      if (p.get('set')) q.set = p.get('set');
      if (p.get('count')) q.count = p.get('count');
    } catch (_) {}
    return q.set ? q : null;
  },

  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY)) || {}; } catch (_) { return {}; }
  },
  _saveStore: function () {
    var s = this._store || {};
    s.v = 1; s.lastSet = this.setId;
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(s)); } catch (_) {}
  },

  _fetchSets: function () {
    var self = this;
    fetch('/mini-tools/estimation-jar-sets.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .catch(function () { return self.FALLBACK_SETS; })
      .then(function (d) {
        self.data = (d && d.sets && d.sets.length) ? d : self.FALLBACK_SETS;
        self._applyEntryState();
        self.render();
      });
  },

  _fetchEntitlement: function () {
    var self = this, token = null;
    try { token = localStorage.getItem('accessToken'); } catch (_) {}

    var trustCache = function () {
      var ent = self._store.ent;
      if (ent && ent.checkedAt) {
        var age = (Date.now() - new Date(ent.checkedAt).getTime()) / 86400000;
        self.premium = (age <= self.ENT_TRUST_DAYS) ? ent.tier !== 'free' : false;
      } else self.premium = false;
      self.premiumKnown = true;
      self._settle();
    };

    if (!token) { self.premium = false; self.premiumKnown = true; self._settle(); return; }

    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) { self.premium = false; self.premiumKnown = true; self._settle(); return; }
        var tier = j.user && j.user.subscriptionTier;
        var sub = j.subscription;
        self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
        self._store.ent = { tier: self.premium ? 'full' : 'free', checkedAt: new Date().toISOString() };
        self._saveStore();
        self.premiumKnown = true;
        self._settle();
      })
      .catch(trustCache);
  },

  _settle: function () { if (!this.data) return; this._applyEntryState(); if (this._wrap) this.render(); },

  _applyEntryState: function () {
    if (!this.data) return;
    var d = this._deepPending ? this.resolveDeepLink(this._deepPending, this.premium) : null;
    if (d) {
      this.setId = d.set;
      if (d.capacityId) this.capacityId = d.capacityId;
      if (d.count) this.count = d.count;
      if (this.premiumKnown) this._deepPending = null;
    } else if (!this.setId || !this.setById(this.setId)) {
      var open = this.setsFor();
      var last = this._store.lastSet;
      this.setId = (last && this.setById(last)) ? last : (open.length ? open[0].id : null);
    }
    /* ⚠ LOCKING A CONTROL IS NOT ENOUGH — reset the state it produced.
       A subscriber who set a 200-jar and then lapsed must not still be
       sitting on one, or the paid capacity survives the entitlement. */
    var cap = this.capacityById(this.capacityId);
    if (!cap || (!cap.free && !this.premium)) {
      var openCaps = this.openCapacities();
      this.capacityId = openCaps[openCaps.length - 1].id;
    }
    if (this.count > this.ceiling()) this.count = this.ceiling();
    if (this.count < 1) this.count = 1;
  },

  /* =================================================================
     SPEECH — bare numerals only. TTS inflects, which is the moat:
     the board shows 21, the room hears einundzwanzig.
     ================================================================= */

  _speakNum: function (n) {
    if (!this.api.settings.voice) return;
    var rate = (n >= 100 && this.RATE_SLOW[this.api.lang]) ? 0.85 : 0.92;
    try { LCSAudio.speak({ type: 'number', text: String(n), lang: this.api.lang, rate: rate }); } catch (_) {}
  },
  _speakLine: function (text) {
    if (!this.api.settings.voice) return;
    try { LCSAudio.speak({ type: 'ui', text: text, lang: this.api.lang, rate: 0.95 }); } catch (_) {}
  },

  _after: function (ms, fn) { var id = setTimeout(fn, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },

  /* =================================================================
     RENDER
     ================================================================= */

  render: function () {
    var self = this, api = this.api;
    this._clearTimers();
    this._jarEls = [];
    this._bindResize();
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'ej-wrap');
    this._wrap = wrap;

    if (!this.data) { wrap.appendChild(api.el('div', 'ej-loading')); api.stage.appendChild(wrap); return; }

    /* stage strip */
    var strip = api.el('div', 'ej-stages');
    [['fill', 'stageFill'], ['guess', 'stageGuess'], ['reveal', 'stageReveal']].forEach(function (m) {
      var b = api.el('button', 'ej-stagebtn' + (self.stage === m[0] ? ' ej-on' : ''));
      b.type = 'button';
      b.textContent = api.t(m[1]);
      b.addEventListener('click', function () {
        /* moving back from reveal starts a fresh jar — the truth never
           travels backwards into an estimating stage */
        if (m[0] !== 'reveal' && self.stage === 'reveal') { self._newJar(); return; }
        if (m[0] === 'reveal') { self._reveal(); return; }
        self.stage = m[0]; self.render();
      });
      strip.appendChild(b);
    });
    wrap.appendChild(strip);

    if (this.stage === 'fill') wrap.appendChild(this._buildFill());
    else if (this.stage === 'guess') wrap.appendChild(this._buildGuess());
    else wrap.appendChild(this._buildReveal());

    wrap.appendChild(this._buildSiblings());
    if (this.panelOpen) wrap.appendChild(this._buildPanel());
    if (this.gateOpen) wrap.appendChild(this._buildGate());
    api.stage.appendChild(wrap);
  },

  _imgUrl: function (s, variant) {
    return '/image-library-webp/themes/' + encodeURIComponent(s.imageDir) + '/'
      + s.imageFile + '@' + (variant || '2x') + '.webp';
  },

  /* =================================================================
     THE GLASS — SVG, so the strokes stay crisp on a 2560 board and cost
     nothing to scale. Only the CONTENTS are canvas (see _paintPile).

     ⚠ `vector-effect="non-scaling-stroke"` is load-bearing on every
     stroked element here. Without it the 510px jar on a wide board
     renders a 7.6px cartoon outline. It is the single easiest thing in
     this file to drop by accident.
     ================================================================= */

  /* ⚠ The first geometry put the mouth at y56 and the shoulder at y98,
     which left a tall empty dome above the fill line: a jar at 23 of 30
     is 73% of its capacity but READ as barely half full, because the
     eye measures against the whole glass and not against the band the
     model fills. Raising the mouth to y44 and the shoulder to y86 makes
     the body dominate, so "how full does it look" and "how full is it"
     agree. Found by reading the render, not by any assertion. */
  JAR_BODY: 'M66 44 C66 58 24 64 24 86 C22 122 22 172 24 214 '
    + 'C24 231 33 240 46 243 L154 243 C167 240 176 231 176 214 '
    + 'C178 172 178 122 176 86 C176 64 134 58 134 44 Z',
  JAR_CLIP: 'M71 48 C71 61 29 67 29 88 C27 123 27 171 29 212 '
    + 'C29 227 37 235 48 238 L152 238 C163 235 171 227 171 212 '
    + 'C173 171 173 123 171 88 C171 67 129 61 129 48 Z',

  /* Behind the pile: the body tint only. Real glass is visible at its
     EDGES, where the light path through it is longest, and clear in the
     middle — the shipped flat rgba(180,220,210,.45) was milky, tinted
     the objects behind it, and read as plastic. Asymmetric on purpose:
     the light is up-left, matching the baked lighting in every sprite. */
  _glassBack: function (uid) {
    return '<svg class="ej-glassback" viewBox="0 0 200 260" aria-hidden="true" focusable="false">'
      + '<defs><linearGradient id="ejg' + uid + '" x1="0" y1="0" x2="1" y2="0">'
      + '<stop offset="0" stop-color="#146B5E" stop-opacity="0.15"/>'
      + '<stop offset="0.16" stop-color="#146B5E" stop-opacity="0.05"/>'
      + '<stop offset="0.46" stop-color="#146B5E" stop-opacity="0.015"/>'
      + '<stop offset="0.58" stop-color="#146B5E" stop-opacity="0.02"/>'
      + '<stop offset="0.86" stop-color="#146B5E" stop-opacity="0.06"/>'
      + '<stop offset="1" stop-color="#146B5E" stop-opacity="0.17"/>'
      + '</linearGradient></defs>'
      + '<path d="' + this.JAR_BODY + '" fill="url(#ejg' + uid + ')"/>'
      + '</svg>';
  },

  /* In front of the pile — and that is the whole trick of "behind
     glass": the glass is in FRONT of what is inside it. */
  _glassFront: function (uid, ariaLabel) {
    var s = '<svg class="ej-glassfront" viewBox="0 0 200 260" role="img" aria-label="'
      + this._esc(ariaLabel) + '">'
      + '<defs>'
      + '<linearGradient id="ejl' + uid + '" x1="0" y1="0" x2="1" y2="0">'
      + '<stop offset="0" stop-color="#B0864F"/><stop offset="0.28" stop-color="#D9B183"/>'
      + '<stop offset="0.62" stop-color="#C99A5B"/><stop offset="1" stop-color="#A87F4A"/>'
      + '</linearGradient>'
      + '<linearGradient id="eji' + uid + '" x1="0" y1="0" x2="0" y2="1">'
      + '<stop offset="0" stop-color="#3A3226" stop-opacity="0"/>'
      + '<stop offset="0.62" stop-color="#3A3226" stop-opacity="0.06"/>'
      + '<stop offset="1" stop-color="#3A3226" stop-opacity="0.16"/>'
      + '</linearGradient>'
      + '<clipPath id="ejk' + uid + '"><path d="' + this.JAR_CLIP + '"/></clipPath>'
      + '</defs>'
      /* base cast shadow, drawn first so it sits under the glass */
      + '<ellipse cx="100" cy="249" rx="60" ry="6" fill="#146B5E" opacity="0.05"/>'
      + '<ellipse cx="100" cy="248" rx="55" ry="4.5" fill="#146B5E" opacity="0.06"/>'
      + '<ellipse cx="100" cy="247" rx="48" ry="3" fill="#146B5E" opacity="0.07"/>'
      /* inner base shadow + wall occlusion, so the pile is grounded and
         does not look pasted onto the glass */
      + '<g clip-path="url(#ejk' + uid + ')">'
      + '<rect x="20" y="186" width="160" height="60" fill="url(#eji' + uid + ')"/>'
      + '<path d="' + this.JAR_CLIP + '" fill="none" stroke="#3A3226" stroke-opacity="0.07" stroke-width="6"/>'
      + '</g>'
      /* the silhouette — this is what keeps the jar from vanishing over
         cream; the fill deliberately does almost nothing */
      + '<path d="' + this.JAR_BODY + '" fill="none" stroke="#146B5E" stroke-opacity="0.42" '
      + 'stroke-width="3" vector-effect="non-scaling-stroke"/>'
      /* the capacity ring: a shallow downward arc reads as the FAR side
         of a moulded seam seen through the glass. It says "full is here"
         with no words, which is the whole design law. */
      + '<path class="ej-ring" d="M31 88 C58 94 142 94 169 88" fill="none" stroke="#146B5E" '
      + 'stroke-opacity="0.22" stroke-width="2" vector-effect="non-scaling-stroke"/>'
      /* Specular highlights. ⚠ Opacity dropped from 0.32 to 0.16 and the
         lozenge narrowed after reading a 200-cherry render: white at a
         third opacity over saturated red stopped reading as glass and
         started reading as a scratch down the picture. A highlight has
         to be legible over an EMPTY jar and invisible-as-an-object over
         a full one, and only the full jar shows you which it is. */
      + '<path d="M47 102 C43 138 43 176 48 206 C52 208 56 206 56 202 '
      + 'C52 172 52 138 56 106 C55 100 50 99 47 102 Z" fill="#FFFFFF" opacity="0.16"/>'
      + '<ellipse cx="152" cy="106" rx="4" ry="13" fill="#FFFFFF" opacity="0.12" '
      + 'transform="rotate(-8 152 106)"/>'
      + '<path d="M34 80 C40 64 62 56 74 50" fill="none" stroke="#FFFFFF" stroke-opacity="0.42" '
      + 'stroke-width="2.5" vector-effect="non-scaling-stroke"/>'
      /* A screw band, not the shipped flat rect (which read as a plank).
         Brass is a fourth hue in a three-hue system, kept because it is
         the single cue that reads "jar" instantly, and confined to under
         6% of the jar's area. A sealed jar is also the right object for
         the ritual: it is one you cannot reach into.
         ⚠ The band must OVERLAP the mouth plane (y44). The first version
         stopped at y44-48 against a mouth at y56 and read as a cork
         hovering above the jar — obvious in every render, invisible to
         every assertion. */
      + '<path d="M62 14 L138 14 L136 42 Q100 50 64 42 Z" fill="url(#ejl' + uid + ')"/>'
      + '<ellipse cx="100" cy="14" rx="38" ry="7" fill="#E0BC92"/>'
      + '<ellipse cx="100" cy="14" rx="38" ry="7" fill="none" stroke="#146B5E" '
      + 'stroke-opacity="0.28" stroke-width="2" vector-effect="non-scaling-stroke"/>'
      + '<path d="M66 23 Q100 26 134 23" stroke="#8E6E4E" stroke-opacity="0.28" stroke-width="1.5" '
      + 'fill="none" vector-effect="non-scaling-stroke"/>'
      + '<path d="M65 32 Q100 35 135 32" stroke="#8E6E4E" stroke-opacity="0.22" stroke-width="1.5" '
      + 'fill="none" vector-effect="non-scaling-stroke"/>'
      + '</svg>';
    return s;
  },

  _esc: function (s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  },

  /* =================================================================
     THE PILE — a <canvas>, and the deciding argument is DOCTRINE.

     200 SVG <image> nodes would be 200 COUNTABLE DOM nodes, so
     `document.querySelectorAll('.ej-obj').length` would BE the secret —
     walking straight around the accessor that throws to protect it. A
     canvas is one node with no children, and it carries aria-hidden, so
     the count is unreachable from the DOM, the a11y tree and the live
     region alike. Performance (a blit beats re-rasterising 200 <use>
     references) is the second reason, not the first.

     ⚠ This is close to a first for the codebase: exactly one other
     mini-tool uses canvas, none draws a library image with drawImage,
     and no tool anywhere handles devicePixelRatio — so the dpr handling
     below is invented here rather than inherited. It is capped at 2 (a
     3x phone would allocate a 786px backing store for no visible gain),
     and getContext failure falls back to the SVG blob clump.

     The asymmetry worth stating: post-reveal the ten-frames stay <img>.
     Doctrine B protects only the estimating stages, and once the jar is
     tipped out the count is public by design.
     ================================================================= */

  _spriteKey: function (setId, px, tint) { return setId + '|' + px + '|' + tint; },

  /* Three tint buckets, pre-rendered once per (set, size band). The
     depth tint is teal rather than neutral grey because cool
     desaturation reads specifically as "further back, through more
     glass" — it does double duty as depth and as glass, and it keeps
     the pile inside the Direction A palette. */
  TINTS: [0, 0.09, 0.18],

  _spriteFor: function (setId, img, px, tint) {
    this._sprites = this._sprites || {};
    var key = this._spriteKey(setId, px, tint);
    if (this._sprites[key]) return this._sprites[key];
    var c = document.createElement('canvas');
    c.width = px; c.height = px;
    var g = c.getContext('2d');
    if (!g) return null;
    g.imageSmoothingEnabled = true;
    try { g.imageSmoothingQuality = 'high'; } catch (_) {}
    g.drawImage(img, 0, 0, px, px);
    if (this.TINTS[tint]) {
      g.globalCompositeOperation = 'source-atop';
      g.fillStyle = 'rgba(20,107,94,' + this.TINTS[tint] + ')';
      g.fillRect(0, 0, px, px);
      g.globalCompositeOperation = 'source-over';
    }
    this._sprites[key] = c;
    return c;
  },

  _loadSprite: function (set, cb) {
    this._imgCache = this._imgCache || {};
    var self = this, key = set.id;
    var hit = this._imgCache[key];
    if (hit && hit.ready) { cb(hit.img); return; }
    if (hit) { hit.waiting.push(cb); return; }
    var img = new Image();
    var rec = { img: img, ready: false, waiting: [cb] };
    this._imgCache[key] = rec;
    img.onload = function () {
      rec.ready = true;
      for (var i = 0; i < rec.waiting.length; i++) rec.waiting[i](img);
      rec.waiting = [];
    };
    /* ⚠ the house failure affordance — sixteen mini-tools carry it and
       this one did not, so a 404 painted a broken-image glyph. Here a
       failed sprite simply leaves the pile unpainted rather than
       drawing a grid of missing-image boxes. */
    img.onerror = function () { rec.ready = false; rec.failed = true; rec.waiting = []; };
    img.src = this._imgUrl(set, '2x');
  },

  /* The whole draw loop. `-S * cy` is the lollipop fix: sprites are
     square but their INK is not centred in them (measured cy spans
     0.325 to 0.659), so drawing on the canvas centre floats a
     lollipop's candy a sixth of a canvas above where it belongs. */
  _paintPile: function (canvas, placements, set) {
    var self = this;
    if (!canvas || !set) return;
    var box = canvas.parentNode;
    var cssW = (box && box.clientWidth) || 0;
    if (!cssW) return;
    var cssH = cssW * 260 / 200;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var g;
    try { g = canvas.getContext('2d'); } catch (_) { g = null; }
    if (!g) { canvas.setAttribute('data-ej-nocanvas', '1'); return; }

    canvas.style.width = cssW + 'px';
    canvas.style.height = cssH + 'px';
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);

    var s = cssW / 200;                       /* viewBox units -> CSS px */
    g.setTransform(dpr * s, 0, 0, dpr * s, 0, 0);
    g.clearRect(0, 0, 200, 260);
    try { g.clip(new Path2D(this.JAR_CLIP)); } catch (_) {}

    this._loadSprite(set, function (img) {
      var pack = set.pack || { r70: 0.33, cy: 0.5, rotMax: 22 };
      var R = self.packRadius(self.capacityOf());
      var baseS = R / (pack.r70 || 0.33);
      /* one sprite size per pile, rounded up to a power-of-two-ish band
         so a resize does not re-render the offscreens on every pixel */
      var needPx = Math.max(16, Math.min(512, Math.pow(2, Math.ceil(Math.log(baseS * s * dpr * 1.15) / Math.LN2))));
      var order = self.paintOrder(placements);
      var rotK = (pack.rotMax || 22) * Math.PI / 180;
      for (var i = 0; i < order.length; i++) {
        var o = order[i];
        var sp = self._spriteFor(set.id, img, needPx, o.tint);
        if (!sp) continue;
        var S = baseS * o.scale;
        g.save();
        g.translate(o.x, o.y);
        g.rotate(o.rotN * rotK);
        g.drawImage(sp, -S * 0.5, -S * (pack.cy == null ? 0.5 : pack.cy), S, S);
        g.restore();
      }
    });
  },

  capacityOf: function () { return this.ceiling(); },

  /* =================================================================
     THE QUESTION IS AN IDENTITY.

     v1 cleared `guesses` only on a brand-new jar, and the stage strip
     was always live — so a teacher could take the class's estimates on
     a jar of 24, walk back to the fill face, change it to 60, and the
     same dots would stand against a jar the room never saw, with the
     reveal scoring them against it.

     The fix has to live in the MODEL rather than in a disabled
     attribute: a guess is an answer to a QUESTION, it carries that
     question's id, and an answer to a question nobody asked is not
     rendered and not counted.
     ================================================================= */
  questionId: function () {
    return String(this.setId) + '|' + this.capacityOf() + '|' + this.count;
  },
  _questionChanged: function () {
    var q = this.questionId();
    if (this._qid === q) return;
    this._qid = q;
    this.guesses = [];
    this.pending = null;
  },
  liveGuesses: function () {
    var q = this.questionId(), out = [], i;
    for (i = 0; i < this.guesses.length; i++) {
      if (this.guesses[i] && this.guesses[i].q === q) out.push(this.guesses[i].v);
    }
    return out;
  },

  /* Build the three-layer jar box. `n` is what actually goes in the
     glass; the reveal passes a shrinking n as the jar drains. */
  _buildJar: function (n, opts) {
    var self = this, api = this.api;
    opts = opts || {};
    var uid = (++this._uid || (this._uid = 1));
    var set = this.setById(this.setId);
    var box = api.el('div', 'ej-jar' + (opts.small ? ' ej-jarsmall' : ''));
    var inner = api.el('div', 'ej-jarbox');

    var back = api.el('div', 'ej-layer');
    back.innerHTML = this._glassBack(uid);
    inner.appendChild(back);

    var cv = api.el('canvas', 'ej-pile');
    cv.setAttribute('aria-hidden', 'true');
    inner.appendChild(cv);

    var front = api.el('div', 'ej-layer');
    /* the a11y name is the SET NOUN ONLY — never the count */
    front.innerHTML = this._glassFront(uid, set ? ('a jar of ' + set.noun + 's') : 'a jar');
    inner.appendChild(front);

    box.appendChild(inner);
    this._jarEls = this._jarEls || [];
    this._jarEls.push({ canvas: cv, n: n });
    /* paint after layout so clientWidth is real */
    this._after(0, function () { self._paintPile(cv, self.packPile(n, self.capacityOf(), self.setId), set); });
    return box;
  },

  /* A resize repaints; it must NEVER re-pack. A pile that reshuffles
     when the projector resolution is detected — or mid-reveal — is
     exactly the bug the (set, capacity) seed exists to prevent. */
  _bindResize: function () {
    var self = this;
    if (this._resizeBound) return;
    this._resizeBound = true;
    window.addEventListener('resize', function () {
      clearTimeout(self._rsTimer);
      self._rsTimer = setTimeout(function () { self._repaintJars(); }, 120);
    });
  },

  _repaintJars: function () {
    var set = this.setById(this.setId), i;
    if (!this._jarEls) return;
    for (i = 0; i < this._jarEls.length; i++) {
      var j = this._jarEls[i];
      if (j.canvas && j.canvas.parentNode) {
        this._paintPile(j.canvas, this.packPile(j.n, this.capacityOf(), this.setId), set);
      }
    }
  },

  _buildFill: function () {
    var self = this, api = this.api;
    var box = api.el('div', 'ej-card');

    var set = this.setById(this.setId);
    box.appendChild(this._buildJar(this.count));

    var pick = api.el('button', 'ej-pill');
    pick.type = 'button';
    pick.textContent = api.t('pickSet');
    pick.addEventListener('click', function () { self.panelOpen = true; self.render(); });
    box.appendChild(pick);

    /* THE JAR SIZE — a row of jar silhouettes, chosen by shape. No
       words: §23.2's design law, and it is also why this needs no noun
       in eleven languages. The GLASS never changes size between them —
       the OBJECTS do. Three physically different glasses would destroy
       cross-session comparison, because a child cannot tell whether
       today's jar holds more than yesterday's if the glass changed. */
    box.appendChild(this._buildCapacityRow());

    /* the count control. This IS the secret — it is only ever on the fill
       face, which the teacher leaves before the class estimates. */
    var lbl = api.el('div', 'ej-seclbl'); lbl.textContent = api.t('howMany');
    box.appendChild(lbl);

    var row = api.el('div', 'ej-countrow');
    /* ⚠ THE OPERATOR'S REPORT. v1 shipped only -10 and +10 over a
       default of 12, so the reachable set was a congruence class mod 10
       — a teacher could not set 17, every jar ended in the same digit,
       and the leftover-ones group (the place-value payload of the whole
       reveal) never varied. Four buttons, and the ones step first in
       reading order because it is the one used most.
       Deliberately NOT a slider: a slider connotes approximation, but
       the teacher's number is the one exact act in the ritual. */
    row.appendChild(this._stepBtn(-10, '−10', 'nudgeDown10'));
    row.appendChild(this._stepBtn(-1, '−', 'nudgeDown'));
    var val = api.el('span', 'ej-countval'); val.textContent = String(this.count);
    val.setAttribute('aria-live', 'off');
    row.appendChild(val);
    row.appendChild(this._stepBtn(1, '+', 'nudgeUp'));
    row.appendChild(this._stepBtn(10, '+10', 'nudgeUp10'));
    box.appendChild(row);

    var dice = api.el('button', 'ej-linkbtn'); dice.type = 'button';
    dice.textContent = api.t('surprise');
    dice.addEventListener('click', function () {
      self._rng = self._rng || self.mulberry32((Date.now() & 0x7fffffff) | 1);
      self.count = self.pickCount(self.ceiling(), self._rng);
      self._questionChanged();
      self.render();
    });
    box.appendChild(dice);

    var hint = api.el('p', 'ej-hint'); hint.textContent = api.t('secretHint');
    box.appendChild(hint);

    var go = api.el('button', 'ej-go'); go.type = 'button';
    go.textContent = api.t('stageGuess');
    go.addEventListener('click', function () { self.stage = 'guess'; self.pending = null; self._saveStore(); self.render(); });
    box.appendChild(go);
    return box;
  },

  /* One stepper, with press-and-hold repeat so a teacher can run 23 to
     140 without 117 taps. */
  _stepBtn: function (delta, sym, labelKey) {
    var self = this, api = this.api;
    var b = api.el('button', 'ej-stepbtn' + (Math.abs(delta) === 10 ? ' ej-step10' : ''));
    b.type = 'button';
    b.textContent = sym;
    b.setAttribute('aria-label', api.t(labelKey));
    var timer = null, ramp = null;
    var apply = function () {
      var next = Math.max(1, Math.min(self.ceiling(), self.count + delta));
      if (next === self.count) {
        /* AT THE CEILING, SAY SO. v1 clamped in silence while the
           paywall copy promised "jars past 30", so the tool advertised
           a paid affordance with no control behind it. */
        if (delta > 0 && !self.premium && self.count >= self.ceiling()) {
          self.gateOpen = true; self.render();
        }
        return false;
      }
      self.count = next;
      self._questionChanged();
      var v = self._wrap && self._wrap.querySelector('.ej-countval');
      if (v) v.textContent = String(self.count);
      self._repaintJars();
      return true;
    };
    var stop = function () { clearTimeout(timer); clearInterval(ramp); timer = ramp = null; };
    b.addEventListener('click', function () { apply(); });
    b.addEventListener('pointerdown', function () {
      timer = setTimeout(function () {
        ramp = setInterval(function () { if (!apply()) stop(); }, 90);
      }, 420);
    });
    ['pointerup', 'pointerleave', 'pointercancel', 'blur'].forEach(function (ev) {
      b.addEventListener(ev, stop);
    });
    return b;
  },

  _buildCapacityRow: function () {
    var self = this, api = this.api;
    var row = api.el('div', 'ej-caprow');
    var all = this.capacities();
    var maxCap = all[all.length - 1].cap;
    for (var i = 0; i < all.length; i++) {
      (function (c) {
        var locked = !c.free && !self.premium;
        var b = api.el('button', 'ej-capbtn'
          + (c.id === self.capacityId ? ' ej-on' : '') + (locked ? ' ej-locked' : ''));
        b.type = 'button';
        /* ⚠ THE FIRST VERSION DREW THREE DIFFERENT-SIZED JARS, and that
           is a lie about the model: the glass never changes size — the
           OBJECTS do. Drawing a small/medium/large glass told the
           teacher the opposite of what the control does. So: one jar,
           always the same size, holding dots at the size that capacity
           actually produces. The control now shows its own consequence,
           which is the only thing that makes it legible without a word. */
        /* Reuse the REAL packer, so the icon cannot drift from what the
           control does — the objects in it are at the true radius for
           that capacity, in the true lattice. Capped at a legible
           handful; the point is "big things, few" against "small
           things, many", which is exactly what capacity means here. */
        var rr = self.packRadius(c.cap);
        var dots = '', pp = self.packPile(Math.min(c.cap, 16), c.cap, 'ejicon'), q;
        for (q = 0; q < pp.length; q++) {
          dots += '<circle cx="' + pp[q].x.toFixed(0) + '" cy="' + pp[q].y.toFixed(0)
            + '" r="' + rr.toFixed(0) + '" fill="currentColor" opacity="0.55"/>';
        }
        self._packCache = null;   /* the icon must not poison the jar's cache */
        /* ⚠ stroke-width 10 + non-scaling-stroke rendered a SOLID BLOB at
           46px: non-scaling means screen pixels, so 10 was 10px on a
           46px icon. Caught by reading the render. */
        b.innerHTML = '<svg viewBox="0 0 200 260" style="height:44px;width:auto" aria-hidden="true">'
          + '<clipPath id="ejcc' + c.id + '"><path d="' + self.JAR_CLIP + '"/></clipPath>'
          + '<g clip-path="url(#ejcc' + c.id + ')">' + dots + '</g>'
          + '<path d="' + self.JAR_BODY + '" fill="none" stroke="currentColor" stroke-opacity="0.85" '
          + 'stroke-width="2" vector-effect="non-scaling-stroke"/></svg>';
        b.setAttribute('aria-label', self.fmt('capAria', { n: c.cap }));
        b.setAttribute('aria-pressed', c.id === self.capacityId ? 'true' : 'false');
        b.addEventListener('click', function () {
          if (locked) { self.gateOpen = true; self.render(); return; }
          if (self.capacityId === c.id) return;
          self.capacityId = c.id;
          if (self.count > self.ceiling()) self.count = self.ceiling();
          self._questionChanged();
          self._saveStore();
          self.render();
        });
        row.appendChild(b);
      }(all[i]));
    }
    return row;
  },

  /* ---- the guess face: tap the line, nudge, commit ---- */
  _buildGuess: function () {
    var self = this, api = this.api;
    var box = api.el('div', 'ej-card');

    box.appendChild(this._buildJar(this.count, { small: true }));

    box.appendChild(this._buildLine(false));

    var ctl = api.el('div', 'ej-guessctl');
    var minus = api.el('button', 'ej-stepbtn'); minus.type = 'button'; minus.textContent = '−';
    minus.setAttribute('aria-label', api.t('nudgeDown'));
    minus.addEventListener('click', function () { self._nudge(-1); });
    var pill = api.el('span', 'ej-pendpill');
    pill.textContent = this.pending === null ? '–' : String(this.pending);
    var plus = api.el('button', 'ej-stepbtn'); plus.type = 'button'; plus.textContent = '+';
    plus.setAttribute('aria-label', api.t('nudgeUp'));
    plus.addEventListener('click', function () { self._nudge(1); });
    ctl.appendChild(minus); ctl.appendChild(pill); ctl.appendChild(plus);
    box.appendChild(ctl);

    var add = api.el('button', 'ej-go'); add.type = 'button';
    add.textContent = api.t('addGuess');
    add.disabled = this.pending === null;
    add.addEventListener('click', function () { self._commit(); });
    box.appendChild(add);

    if (this.liveGuesses().length) {
      var undo = api.el('button', 'ej-linkbtn'); undo.type = 'button';
      undo.textContent = api.t('undoGuess');
      undo.addEventListener('click', function () { self.guesses.pop(); self.render(); });
      box.appendChild(undo);
    }

    var note = api.el('p', 'ej-hint'); note.textContent = api.t('guessesIn');
    box.appendChild(note);

    var priv = api.el('p', 'ej-privacy'); priv.textContent = api.t('privacyLine');
    box.appendChild(priv);
    return box;
  },

  _nudge: function (d) {
    if (this.pending === null) return;
    this.pending = Math.max(0, Math.min(this.ceiling(), this.pending + d));
    var p = this._wrap && this._wrap.querySelector('.ej-pendpill');
    if (p) p.textContent = String(this.pending);
    this._paintDots();
  },

  _commit: function () {
    if (this.pending === null) return;
    /* a guess carries the question it answers — see questionId() */
    this.guesses.push({ v: this.pending, q: this.questionId() });
    this.pending = null;
    try { this.api.sound(660); } catch (_) {}
    this.render();
  },

  /* ---- the number line. wondering-jar convention: x = (v/max)*1000 with
     NO inset, so a dot at left:(v/max*100)% sits exactly on its tick.
     (The free number-line tool insets its ticks by 18/1000 but positions
     its marker in container %, which drifts ~1.8% — do not copy that.) ---- */
  _buildLine: function (withTruth) {
    var self = this, api = this.api;
    var max = this.ceiling();
    var wrap = api.el('div', 'ej-linewrap');

    var step = max <= 30 ? 5 : (max <= 60 ? 10 : (max <= 120 ? 20 : 25));
    var svg = ['<svg class="ej-line" viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true">',
      '<line class="ej-axis" x1="0" y1="44" x2="1000" y2="44"/>'];
    for (var i = 0; i <= max; i += step) {
      var x = (i / max) * 1000;
      var bench = (i === 0 || i === max || (max > 60 && i % (step * 2) === 0));
      svg.push('<line class="ej-tick' + (bench ? ' ej-bench' : '') + '" x1="' + x + '" y1="' + (bench ? 22 : 30) + '" x2="' + x + '" y2="58"/>');
      svg.push('<text class="ej-lbl" x="' + Math.max(14, Math.min(986, x)) + '" y="76" text-anchor="middle">' + i + '</text>');
    }
    svg.push('</svg>');

    var track = api.el('div', 'ej-track');
    track.innerHTML = svg.join('');
    this._trackEl = track;

    track.addEventListener('click', function (e) {
      if (self.stage !== 'guess') return;
      var r = track.getBoundingClientRect();
      if (!r.width) return;
      /* map against the CONTENT box, not the border box — the track carries
         a --ej-in gutter so end markers don't overhang, and the SVG + dot
         layer both live inside it. Reading r.width here would shift every
         tap by the gutter and quietly break tick alignment. */
      var cs = window.getComputedStyle(track);
      var padL = parseFloat(cs.paddingLeft) || 0, padR = parseFloat(cs.paddingRight) || 0;
      var w = r.width - padL - padR;
      if (w <= 0) return;
      var pct = Math.max(0, Math.min(1, (e.clientX - r.left - padL) / w));
      self.pending = Math.round(pct * max);
      var p = self._wrap.querySelector('.ej-pendpill');
      if (p) p.textContent = String(self.pending);
      var add = self._wrap.querySelector('.ej-go');
      if (add) add.disabled = false;
      self._paintDots();
    });

    wrap.appendChild(track);
    this._dotsEl = api.el('div', 'ej-dots');
    track.appendChild(this._dotsEl);
    this._showTruth = !!withTruth;
    this._after(0, function () { self._paintDots(); });
    return wrap;
  },

  _paintDots: function () {
    var api = this.api, max = this.ceiling();
    var el = this._dotsEl;
    if (!el) return;
    el.innerHTML = '';
    var i, d;
    var live = this.liveGuesses();
    /* committed guesses — anonymous, identical, unordered */
    for (i = 0; i < live.length; i++) {
      d = api.el('span', 'ej-dot');
      d.style.left = ((live[i] / max) * 100) + '%';
      d.style.top = (14 + (i % 3) * 13) + 'px';
      el.appendChild(d);
    }
    if (this.pending !== null && this.stage === 'guess') {
      d = api.el('span', 'ej-dot ej-pending');
      d.style.left = ((this.pending / max) * 100) + '%';
      el.appendChild(d);
    }
    if (this._showTruth && this.stage === 'reveal') {
      var t = api.el('span', 'ej-truth');
      t.style.left = ((this.count / max) * 100) + '%';
      t.textContent = String(this.count);
      el.appendChild(t);
    }
  },

  /* ---- the reveal: out in tens, counted aloud ---- */
  _reveal: function () {
    if (this.stage === 'reveal') return;
    this.stage = 'reveal';
    this._revealStep = 0;
    this.render();
    this._runCount();
  },

  _newJar: function () {
    this.stage = 'fill';
    this.guesses = [];
    this.pending = null;
    this._revealStep = 0;
    this.render();
  },

  _runCount: function () {
    var self = this;
    var totals = this.runningTotals(this.count);
    var reduced = false;
    try { reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (_) {}
    var stepMs = reduced ? 350 : 700;
    totals.forEach(function (t, i) {
      self._after(i * stepMs, function () {
        self._revealStep = i + 1;
        self._paintFrames();
        self._speakNum(t);
        self.api.announce(String(t));
      });
    });
    this._after(totals.length * stepMs + 240, function () {
      self._paintDots();
      var line = self.fmt('theJarHeld', { n: self.count });
      self.api.announce(line + ' ' + self.api.t('neighbourhood'));
      self._speakLine(self.api.t('neighbourhood'));
      var el = self._wrap && self._wrap.querySelector('.ej-closing');
      if (el) { el.textContent = line + ' ' + self.api.t('neighbourhood'); el.classList.add('ej-show'); }
    });
  },

  _buildReveal: function () {
    var self = this, api = this.api;
    var box = api.el('div', 'ej-card');

    var frames = api.el('div', 'ej-frames');
    this._framesEl = frames;
    box.appendChild(frames);
    this._paintFrames();

    box.appendChild(this._buildLine(true));

    var close = api.el('p', 'ej-closing');
    box.appendChild(close);

    var again = api.el('button', 'ej-go'); again.type = 'button';
    again.textContent = api.t('again');
    again.addEventListener('click', function () { self._newJar(); });
    box.appendChild(again);
    return box;
  },

  /* ten-frames, the calendar-wall span recipe — cheap enough to tile 20 */
  _paintFrames: function () {
    var api = this.api, el = this._framesEl;
    if (!el) return;
    el.innerHTML = '';
    var set = this.setById(this.setId);
    var groups = this.groupsOfTen(this.count);
    var shown = this._revealStep || 0;
    for (var g = 0; g < groups.length && g < shown; g++) {
      var f = api.el('div', 'ej-tf');
      for (var i = 0; i < 10; i++) {
        var c = api.el('span', 'ej-tfcell' + (i < groups[g] ? ' ej-filled' : ''));
        if (i < groups[g] && set) {
          var im = api.el('img', 'ej-tfpic');
          im.src = this._imgUrl(set); im.alt = ''; im.draggable = false;
          c.appendChild(im);
        }
        f.appendChild(c);
      }
      el.appendChild(f);
    }
  },

  /* =================================================================
     PANEL / GATE / SIBLINGS
     ================================================================= */

  _buildPanel: function () {
    var self = this, api = this.api;
    var scrim = api.el('div', 'ej-scrim');
    scrim.addEventListener('click', function (e) { if (e.target === scrim) { self.panelOpen = false; self.render(); } });
    var panel = api.el('div', 'ej-panel');

    var head = api.el('div', 'ej-panel-head');
    var h = api.el('h2', 'ej-panel-title'); h.textContent = api.t('setsTitle');
    head.appendChild(h);
    var close = api.el('button', 'ej-panel-close'); close.type = 'button';
    close.textContent = api.t('setsClose');
    close.addEventListener('click', function () { self.panelOpen = false; self.render(); });
    head.appendChild(close);
    panel.appendChild(head);

    /* season-first ordering when the setting is on */
    var open = this.setsFor().slice();
    if (this.api.settings.season) {
      var near = this.seasonsByProximity(new Date().getMonth());
      open.sort(function (a, b) {
        var ai = a.season && near.indexOf(a.season) >= 0 ? 0 : 1;
        var bi = b.season && near.indexOf(b.season) >= 0 ? 0 : 1;
        return ai - bi;
      });
    }

    var grid = api.el('div', 'ej-setgrid');
    open.forEach(function (s) {
      var t = api.el('button', 'ej-settile' + (s.id === self.setId ? ' ej-on' : ''));
      t.type = 'button';
      var im = api.el('img', 'ej-tilepic');
      im.src = self._imgUrl(s); im.alt = ''; im.draggable = false;
      t.appendChild(im);
      t.addEventListener('click', function () {
        self.setId = s.id; self.panelOpen = false; self._saveStore(); self.render();
      });
      grid.appendChild(t);
    });
    panel.appendChild(grid);

    /* locked sets are COUNTED, never listed — no premium filling reaches
       the DOM for a free visitor */
    if (!this.premium) {
      var all = (this.data && this.data.sets) || [];
      var lockedN = all.length - open.length;
      if (lockedN > 0) {
        var row = api.el('button', 'ej-lockedrow'); row.type = 'button';
        row.textContent = api.t('lockedSet') + ' · +' + lockedN;
        row.addEventListener('click', function () { self.gateOpen = true; self.panelOpen = false; self.render(); });
        panel.appendChild(row);
      }
    }

    scrim.appendChild(panel);
    return scrim;
  },

  _buildGate: function () {
    var self = this, api = this.api;
    var scrim = api.el('div', 'ej-scrim');
    scrim.addEventListener('click', function (e) { if (e.target === scrim) { self.gateOpen = false; self.render(); } });
    var g = api.el('div', 'ej-gate');
    var p = api.el('p', 'ej-gate-line');
    p.textContent = this.fmt('gatePremium', { n: this.freeMax() });
    g.appendChild(p);
    var a = api.el('a', 'ej-gate-cta');
    a.href = '/' + api.lang + '/pricing?from=tool-estimation-jar';
    a.target = '_top';
    a.textContent = api.t('unlock');
    g.appendChild(a);
    var c = api.el('button', 'ej-gate-close'); c.type = 'button';
    c.textContent = api.t('setsClose');
    c.addEventListener('click', function () { self.gateOpen = false; self.render(); });
    g.appendChild(c);
    scrim.appendChild(g);
    return scrim;
  },

  /* The Morning Circle suite footer. Calendar Wall deliberately deferred
     this "until #5 ships" — Estimation Jar is #5, so it opens here. */
  _buildSiblings: function () {
    var api = this.api;
    var f = api.el('div', 'ej-siblings');
    var lbl = api.el('span', 'ej-sib-label'); lbl.textContent = api.t('suiteLabel') + ' ';
    f.appendChild(lbl);
    var defs = [
      { file: 'calendar-wall', key: 'siblingCal' },
      { file: 'number-talk-easel', key: 'siblingNte' },
      { file: 'wodb', key: 'siblingWodb' },
      { file: 'choral-counting', key: 'siblingChc' }
    ];
    for (var i = 0; i < defs.length; i++) {
      if (i) { var sep = api.el('span', 'ej-sib-sep'); sep.textContent = ' · '; f.appendChild(sep); }
      var a = api.el('a', 'ej-sib-link');
      a.href = '/mini-tools/' + defs[i].file + '.html?lang=' + api.lang;
      a.target = '_top';
      a.textContent = api.t(defs[i].key);
      f.appendChild(a);
    }
    return f;
  },

  reset: function () {
    this._clearTimers();
    this._newJar();
    this.panelOpen = false; this.gateOpen = false;
    this.render();
  },

  onSettings: function () { this._saveStore(); this.render(); }
};

/* =====================================================================
   CSS — injected once, tool-scoped with the ej- prefix.
   ===================================================================== */
function injectEstimationJarCSS() {
  if (document.getElementById('ej-style')) return;
  var st = document.createElement('style');
  st.id = 'ej-style';
  st.textContent = ''
    + '.ej-wrap{display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;padding:4px 8px 12px;box-sizing:border-box}'
    + '.ej-loading{min-height:180px}'
    + '.ej-stages{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}'
    + '.ej-stagebtn{font:600 14px/1 Nunito,system-ui,sans-serif;color:#146B5E;background:#FFFDF7;border:2px solid #146B5E22;'
    + 'border-radius:999px;padding:10px 15px;min-height:44px;cursor:pointer}'
    + '.ej-stagebtn.ej-on{background:#146B5E;color:#FFFDF7;border-color:#146B5E}'

    + '.ej-card{position:relative;width:100%;max-width:640px;margin-inline:auto;background:#FFFDF7;'
    + 'border:2px solid #146B5E22;border-radius:22px;padding:18px 16px 16px;'
    + 'box-shadow:0 3px 0 #146B5E14,0 10px 26px -14px #146B5E55;display:flex;flex-direction:column;align-items:center;gap:12px}'
    /* ⚠ 190px was TOO TIMID ON A PHONE and it was a legibility bug, not
       a taste one: at 320px it gives a 140px jar, and 200 objects in a
       140px jar draw at 9px — below any floor at which a children's
       illustration is still an object rather than a coloured speck. At
       82vw the same worst case is ~20px. The phone is a setup surface,
       but it still has to show real things. */
    + '.ej-jar{width:min(300px,82vw);flex:0 0 auto}'
    + '.ej-jar.ej-jarsmall{width:min(190px,52vw)}'
    + '.ej-jarbox{position:relative;width:100%;aspect-ratio:200/260}'
    + '.ej-layer{position:absolute;inset:0;pointer-events:none}'
    + '.ej-layer svg,.ej-glassback,.ej-glassfront{width:100%;height:100%;display:block}'
    + '.ej-pile{position:absolute;inset:0;width:100%;height:100%;display:block}'
    + '.ej-setpic{width:52px;height:auto;flex:0 0 auto;user-select:none;-webkit-user-drag:none}'
    /* the jar-size chooser — silhouettes, never words */
    + '.ej-caprow{display:flex;align-items:flex-end;gap:10px;justify-content:center}'
    + '.ej-capbtn{display:flex;align-items:flex-end;justify-content:center;min-width:52px;min-height:52px;'
    + 'padding:6px 10px;border:2px solid #146B5E22;border-radius:14px;background:#FFF9EE;color:#146B5E;cursor:pointer}'
    + '.ej-capbtn.ej-on{border-color:#F2784B;background:#FFF6F1}'
    + '.ej-capbtn.ej-locked{color:#B9AC98;border-style:dashed}'
    + '.ej-seclbl{font:700 13px/1 Nunito,system-ui,sans-serif;color:#7A6A55;text-transform:uppercase;letter-spacing:.06em}'
    + '.ej-step10{font-size:15px}'
    + '.ej-pill{font:600 15px/1.2 Nunito,system-ui,sans-serif;color:#146B5E;background:#FFF9EE;border:2px solid #146B5E33;'
    + 'border-radius:999px;padding:9px 18px;min-height:44px;cursor:pointer;flex:0 0 auto}'
    /* ⚠ `.ej-lbl` used to be declared TWICE — here for the uppercase
       section label and again below for the SVG tick numerals. Same
       class, two different elements, so the later `font:` shorthand won
       and the teacher-facing label silently rendered at 22px/600
       instead of 13px/700. The HTML one is now `.ej-seclbl`. */
    + '.ej-countrow,.ej-guessctl{display:flex;align-items:center;gap:8px;flex-wrap:nowrap}'
    + '.ej-stepbtn{width:48px;height:48px;flex:0 0 auto;border-radius:50%;border:2px solid #146B5E33;background:#FFF9EE;'
    + 'color:#146B5E;font:700 22px/1 Nunito,system-ui,sans-serif;cursor:pointer}'
    + '.ej-countval,.ej-pendpill{min-width:74px;text-align:center;'
    + 'font:700 clamp(24px,6vw,34px)/1 "Baloo 2",Nunito,system-ui,sans-serif;color:#3A3226}'
    + '.ej-hint{font:italic 500 13px/1.45 Nunito,system-ui,sans-serif;color:#7A6A55;text-align:center;margin:0;max-width:min(420px,90vw)}'
    + '.ej-privacy{font:500 12px/1.45 Nunito,system-ui,sans-serif;color:#9A8F7E;text-align:center;margin:0;max-width:min(430px,92vw)}'
    + '.ej-go{font:700 15px/1 Nunito,system-ui,sans-serif;color:#FFFDF7;background:#F2784B;border:none;'
    + 'border-radius:999px;padding:14px 22px;min-height:44px;cursor:pointer;flex:0 0 auto}'
    + '.ej-go:disabled{opacity:.42;cursor:default}'
    + '.ej-linkbtn{font:600 13px/1 Nunito,system-ui,sans-serif;color:#7A6A55;background:none;border:none;'
    + 'cursor:pointer;min-height:44px;text-decoration:underline}'

    /* the line */
    /* --ej-in is a GUTTER, not an axis inset. A dot sits centred on its tick
       (translate(-50%)), and the truth pill is wider still, so a marker at 0
       or at max hangs half its width past the line's ends and — measured at
       320px — reached the card edge. The gutter pads the TRACK and insets
       the dot layer BY THE SAME AMOUNT, so the SVG and the dots share one
       content box: the overhang lands in the gutter and tick-to-dot
       alignment is preserved by construction rather than by arithmetic.
       (This is why the free number-line tool drifts: it insets its ticks
       inside the viewBox but positions its marker in container %.) */
    + '.ej-linewrap{--ej-in:24px;width:100%;max-width:600px;padding:6px 4px 2px}'
    + '.ej-track{position:relative;box-sizing:border-box;width:100%;height:96px;'
    + 'padding-inline:var(--ej-in);cursor:pointer}'
    + '.ej-line{width:100%;height:80px;display:block;overflow:visible}'
    + '.ej-axis{stroke:#146B5E;stroke-width:3}'
    + '.ej-tick{stroke:#146B5E66;stroke-width:2}'
    + '.ej-tick.ej-bench{stroke:#146B5E;stroke-width:3}'
    + '.ej-lbl{font:600 22px Nunito,system-ui,sans-serif;fill:#7A6A55}'
    + '.ej-dots{position:absolute;left:var(--ej-in);top:0;right:var(--ej-in);height:96px;pointer-events:none}'
    + '.ej-dot{position:absolute;width:13px;height:13px;border-radius:50%;background:#9CC3E5;'
    + 'border:2px solid #FFFDF7;transform:translate(-50%,0);top:14px}'
    + '.ej-dot.ej-pending{background:#F2C94C;width:17px;height:17px;top:8px;animation:ej-bob .5s ease-in-out infinite alternate}'
    + '@keyframes ej-bob{to{transform:translate(-50%,-4px)}}'
    + '.ej-truth{position:absolute;top:52px;transform:translate(-50%,0);background:#F2784B;color:#FFFDF7;'
    + 'font:700 14px/1 Nunito,system-ui,sans-serif;padding:5px 9px;border-radius:999px;animation:ej-drop .4s ease}'
    + '@keyframes ej-drop{from{opacity:0;transform:translate(-50%,-14px)}}'

    /* ten-frames */
    + '.ej-frames{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;min-height:60px;width:100%}'
    + '.ej-tf{display:grid;grid-template-columns:repeat(5,1fr);gap:3px;padding:4px;'
    + 'background:#FFF9EE;border:2px solid #146B5E33;border-radius:8px}'
    + '.ej-tfcell{width:clamp(15px,2.6vmin,26px);aspect-ratio:1;border:1px solid #146B5E22;border-radius:3px;'
    + 'display:flex;align-items:center;justify-content:center}'
    + '.ej-tfcell.ej-filled{background:#FFFFFF;animation:ej-pop .22s ease}'
    + '.ej-tfpic{width:88%;height:auto;user-select:none;-webkit-user-drag:none}'
    + '@keyframes ej-pop{from{transform:scale(.2);opacity:0}}'
    + '.ej-closing{font:600 clamp(15px,3.6vw,19px)/1.45 Nunito,system-ui,sans-serif;color:#146B5E;'
    + 'text-align:center;margin:0;min-height:1.4em;opacity:0;transition:opacity .3s}'
    + '.ej-closing.ej-show{opacity:1}'

    /* panel + gate */
    + '.ej-scrim{position:fixed;inset:0;background:#3A322680;display:flex;align-items:center;justify-content:center;padding:16px;z-index:70}'
    + '.ej-panel{background:#FFFDF7;border-radius:20px;max-width:520px;width:100%;max-height:82vh;overflow:auto;padding:16px;z-index:71}'
    + '.ej-panel-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}'
    + '.ej-panel-title{font:700 18px/1.2 "Baloo 2",Nunito,system-ui,sans-serif;color:#146B5E;margin:0}'
    + '.ej-panel-close{font:600 14px/1 Nunito,system-ui,sans-serif;color:#146B5E;background:#FFF3DC;border:2px solid #146B5E33;'
    + 'border-radius:999px;padding:9px 14px;min-height:44px;cursor:pointer}'
    + '.ej-setgrid{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}'
    + '.ej-settile{width:74px;height:74px;background:#FFF9EE;border:2px solid #146B5E22;border-radius:12px;'
    + 'display:flex;align-items:center;justify-content:center;cursor:pointer;padding:6px}'
    + '.ej-settile.ej-on{border-color:#F2784B;background:#FFF6F1}'
    + '.ej-tilepic{max-width:100%;max-height:100%;user-select:none;-webkit-user-drag:none}'
    + '.ej-lockedrow{display:block;width:100%;margin-top:12px;font:600 14px/1 Nunito,system-ui,sans-serif;'
    + 'color:#9A8F7E;background:#F3ECDD;border:none;border-radius:12px;padding:12px;min-height:44px;cursor:pointer}'
    + '.ej-gate{background:#FFFDF7;border-radius:20px;max-width:420px;width:100%;padding:20px;text-align:center;z-index:71}'
    + '.ej-gate-line{font:600 16px/1.45 Nunito,system-ui,sans-serif;color:#3A3226;margin:0 0 14px}'
    + '.ej-gate-cta{display:inline-block;font:700 15px/1 Nunito,system-ui,sans-serif;color:#FFFDF7;background:#F2784B;'
    + 'border-radius:999px;padding:14px 22px;text-decoration:none;min-height:44px;box-sizing:border-box}'
    + '.ej-gate-close{display:block;margin:12px auto 0;font:600 14px/1 Nunito,system-ui,sans-serif;color:#7A6A55;'
    + 'background:none;border:none;cursor:pointer;min-height:44px}'
    + '.ej-siblings{font:500 13px/1.5 Nunito,system-ui,sans-serif;color:#7A6A55;text-align:center}'
    + '.ej-sib-link{color:#146B5E;text-decoration:underline}'

    + '@media (max-width:420px){'
    + '.ej-card{padding:14px 10px 12px;border-radius:18px}'
    + '.ej-tfcell{width:clamp(13px,3.4vmin,20px)}'
    + '.ej-settile{width:64px;height:64px}'
    + '}'
    + 'body.ej-wide{overflow-y:auto}'

    /* ---- wide board (§23 the apparatus a teacher teaches FROM) ----
       The card caps at 640px, and the jar inside it at `min(190px,44vw)` —
       44vw is 1126px at 2560, so the jar is pinned at its 190px ceiling and a
       wider card would only have added margin around the same small jar.
       Card and jar move together; the ten-frame proof grid and the readout
       type follow, since they are the parts a class reads from the back. */
    + '@media (min-width:1367px) and (min-height:880px){'
    +   'body.ej-wide .lcs-app{max-width:min(1192px,96vw);}'
    +   'body.ej-wide .ej-card{max-width:860px;}'
    +   'body.ej-wide .ej-jar{width:min(320px,44vw);}'
    +   'body.ej-wide .ej-jar.ej-jarsmall{width:min(176px,28vw);}'
    +   'body.ej-wide .ej-tfcell{width:clamp(15px,2.6vmin,36px);}'
    +   'body.ej-wide .ej-stagebtn{font-size:17px;}'
    + '}'
    + '@media (min-width:1800px) and (min-height:1080px){'
    +   'body.ej-wide .lcs-app{max-width:min(1560px,96vw);}'
    +   'body.ej-wide .ej-card{max-width:1080px;}'
    +   'body.ej-wide .ej-jar{width:min(430px,44vw);}'
    +   'body.ej-wide .ej-jar.ej-jarsmall{width:min(228px,28vw);}'
    +   'body.ej-wide .ej-tfcell{width:clamp(15px,2.6vmin,46px);}'
    +   'body.ej-wide .ej-stagebtn{font-size:19px;}'
    + '}'
    + '@media (min-width:2400px) and (min-height:1150px){'
    +   'body.ej-wide .lcs-app{max-width:min(1752px,96vw);}'
    +   'body.ej-wide .ej-card{max-width:1240px;}'
    +   'body.ej-wide .ej-jar{width:min(510px,44vw);}'
    +   'body.ej-wide .ej-jar.ej-jarsmall{width:min(264px,28vw);}'
    +   'body.ej-wide .ej-tfcell{width:clamp(15px,2.6vmin,54px);}'
    +   'body.ej-wide .ej-stagebtn{font-size:21px;}'
    + '}'

    + '@media (prefers-reduced-motion:reduce){'
    + '.ej-dot.ej-pending{animation:none}'
    + '.ej-tfcell.ej-filled{animation:none}'
    + '.ej-truth{animation:none}'
    + '.ej-closing{transition:none}'
    + '}'

    + '@media print{'
    + '.ej-stages,.ej-go,.ej-linkbtn,.ej-scrim,.ej-siblings,.ej-stepbtn{display:none !important}'
    + '.ej-card{box-shadow:none;border:1.5pt solid #666;page-break-inside:avoid;break-inside:avoid}'
    + '}';
  document.head.appendChild(st);
}
