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

  freeMax: function () { return (this.data && this.data.freeMax) || 30; },
  premiumMax: function () { return (this.data && this.data.premiumMax) || 200; },
  ceiling: function () { return this.premium ? this.premiumMax() : this.freeMax(); },

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
    var cap = premium ? this.premiumMax() : this.freeMax();
    var c = parseInt(params.count, 10);
    if (!isFinite(c) || c < 1) c = null;
    if (c !== null && c > cap) c = cap;   /* never hand a free visitor a premium-size jar */
    return { set: sid, count: c };
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
    this.count = 12;          /* never rendered before the reveal */
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
      if (d.count) this.count = d.count;
      if (this.premiumKnown) this._deepPending = null;
    } else if (!this.setId || !this.setById(this.setId)) {
      var open = this.setsFor();
      var last = this._store.lastSet;
      this.setId = (last && this.setById(last)) ? last : (open.length ? open[0].id : null);
    }
    if (this.count > this.ceiling()) this.count = this.ceiling();
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

  _imgUrl: function (s) {
    return '/image-library-webp/themes/' + encodeURIComponent(s.imageDir) + '/' + s.imageFile + '@2x.webp';
  },

  /* ---- the jar. clipPath keyed to the body path, so contents can never
     escape the glass (the wondering-jar recipe). ---- */
  _jarSVG: function (fill, clumped) {
    var id = 'ejc' + (++this._uid || (this._uid = 1));
    var body = 'M26 24 Q50 18 74 24 L72 96 Q50 104 28 96 Z';
    var inner = '';
    if (clumped) {
      var topY = 94 - Math.max(0.25, Math.min(0.92, fill)) * 66;
      var seed = Math.round(fill * 131) + 7;
      var rnd = function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
      for (var y = 92; y > topY; y -= 7) {
        for (var x = 30; x <= 70; x += 8) {
          var jx = (rnd() - 0.5) * 7, jy = (rnd() - 0.5) * 6;
          inner += '<circle cx="' + (x + jx).toFixed(1) + '" cy="' + (y + jy).toFixed(1) + '" r="6.5" class="ej-blob"/>';
        }
      }
    }
    return '<svg viewBox="0 0 100 110" class="ej-jarsvg" role="img" aria-label="jar">'
      + '<defs><clipPath id="' + id + '"><path d="' + body + '"/></clipPath></defs>'
      + '<rect x="30" y="14" width="40" height="8" rx="4" fill="#C99A5B"/>'
      + '<path d="' + body + '" fill="rgba(180,220,210,.45)" stroke="rgba(20,107,94,.35)" stroke-width="2.5"/>'
      + (clumped ? '<g clip-path="url(#' + id + ')">' + inner + '</g>' : '')
      + '<ellipse cx="42" cy="34" rx="16" ry="9" fill="#fff" opacity="0.28"/>'
      + '</svg>';
  },

  /* a perceptible but INEXACT fill height — you must not be able to read
     the count off the glass */
  _fillFor: function (n) {
    var cap = this.ceiling();
    return 0.3 + Math.max(0, Math.min(1, n / cap)) * 0.58;
  },

  _buildFill: function () {
    var self = this, api = this.api;
    var box = api.el('div', 'ej-card');

    var set = this.setById(this.setId);
    var jar = api.el('div', 'ej-jar');
    jar.innerHTML = this._jarSVG(this._fillFor(this.count), true);
    box.appendChild(jar);

    var pick = api.el('button', 'ej-pill');
    pick.type = 'button';
    pick.textContent = api.t('pickSet');
    pick.addEventListener('click', function () { self.panelOpen = true; self.render(); });
    box.appendChild(pick);

    if (set) {
      var prev = api.el('img', 'ej-setpic');
      prev.src = this._imgUrl(set); prev.alt = '';
      prev.draggable = false;
      prev.addEventListener('dragstart', function (e) { e.preventDefault(); });
      box.appendChild(prev);
    }

    /* the count control. This IS the secret — it is only ever on the fill
       face, which the teacher leaves before the class estimates. */
    var lbl = api.el('div', 'ej-lbl'); lbl.textContent = api.t('howMany');
    box.appendChild(lbl);

    var row = api.el('div', 'ej-countrow');
    var mk = function (delta, sym) {
      var b = api.el('button', 'ej-stepbtn'); b.type = 'button'; b.textContent = sym;
      b.setAttribute('aria-label', sym === '−' ? api.t('nudgeDown') : api.t('nudgeUp'));
      b.addEventListener('click', function () {
        self.count = Math.max(1, Math.min(self.ceiling(), self.count + delta));
        self.render();
      });
      return b;
    };
    row.appendChild(mk(-10, '−'));
    var val = api.el('span', 'ej-countval'); val.textContent = String(this.count);
    row.appendChild(val);
    row.appendChild(mk(10, '+'));
    box.appendChild(row);

    var hint = api.el('p', 'ej-hint'); hint.textContent = api.t('secretHint');
    box.appendChild(hint);

    var go = api.el('button', 'ej-go'); go.type = 'button';
    go.textContent = api.t('stageGuess');
    go.addEventListener('click', function () { self.stage = 'guess'; self.pending = null; self._saveStore(); self.render(); });
    box.appendChild(go);
    return box;
  },

  /* ---- the guess face: tap the line, nudge, commit ---- */
  _buildGuess: function () {
    var self = this, api = this.api;
    var box = api.el('div', 'ej-card');

    var jar = api.el('div', 'ej-jar ej-jarsmall');
    jar.innerHTML = this._jarSVG(this._fillFor(this.count), true);
    box.appendChild(jar);

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

    if (this.guesses.length) {
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
    this.guesses.push(this.pending);
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
    /* committed guesses — anonymous, identical, unordered */
    for (i = 0; i < this.guesses.length; i++) {
      d = api.el('span', 'ej-dot');
      d.style.left = ((this.guesses[i] / max) * 100) + '%';
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
    + '.ej-jar{width:min(190px,44vw);flex:0 0 auto}'
    + '.ej-jar.ej-jarsmall{width:min(120px,28vw)}'
    + '.ej-jarsvg{width:100%;height:auto;display:block}'
    /* The clump is ABSTRACT on purpose: how many blobs are drawn follows the
       fill HEIGHT, never the count, so nothing in the glass can be counted.
       It therefore must not impersonate the filling either — at #F2A65A a jar
       of cherries read as a jar of oranges, which looks like a bug and quietly
       invites a child to count what is only decoration. A soft neutral says
       "full of something" and leaves the answer where it belongs. */
    + '.ej-blob{fill:#DCCDB4;opacity:.9;stroke:#C9B899;stroke-width:.5}'
    + '.ej-setpic{width:52px;height:auto;flex:0 0 auto;user-select:none;-webkit-user-drag:none}'
    + '.ej-pill{font:600 15px/1.2 Nunito,system-ui,sans-serif;color:#146B5E;background:#FFF9EE;border:2px solid #146B5E33;'
    + 'border-radius:999px;padding:9px 18px;min-height:44px;cursor:pointer;flex:0 0 auto}'
    + '.ej-lbl{font:700 13px/1 Nunito,system-ui,sans-serif;color:#7A6A55;text-transform:uppercase;letter-spacing:.06em}'
    + '.ej-countrow,.ej-guessctl{display:flex;align-items:center;gap:10px;flex-wrap:nowrap}'
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
