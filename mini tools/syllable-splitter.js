/* =====================================================================
   TOOL #22 — SYLLABLE SPLITTER   (syllable-splitter.js)
   ---------------------------------------------------------------------
   Free-play manipulative (no `tasks` — the shell renders zero activity
   chrome). Reading Corner, Wave 3. Ships in ALL ELEVEN locales.

   PEDAGOGY: an illustrated word card appears; the class claps the
   syllables while a child taps the drum once per clap. Each tap draws a
   syllable ARC under the word — the German Silbenboegen convention. The
   word then snaps into syllable cards to scramble and rebuild, and a
   sorting mode drops picture cards into clap-count pens.

   THE TWO CONVENTIONS (the subtlest thing in this tool):
     ARCS follow `oralChunks` — arcs are what the class CLAPS.
     CARDS follow `chunks`    — cards are how the word is WRITTEN.
   They are identical in 10 of 11 locales. French diverges: `pomme` takes
   ONE arc and TWO cards, because French CP teaches syllabes orales and
   syllabes ecrites as different things. When a deck declares an
   oralConvention other than same-as-written, the tool says so on screen
   rather than leaving the difference looking like a bug.

   WHAT IS VERIFIED: the syllable COUNT comes from the platform's
   multi-source syllable gate and is never re-authored here (the build
   gate asserts it byte-equal). The displayed BOUNDARY is native-ratified
   — English pipeline boundaries are typographic by design, so the en
   deck authors them. Copy must claim the count, never the boundary.

   NO GRADING: the drum accepts any number of taps. The tool never tells
   a child the clap count was wrong — the teacher and the class decide.
   No scores, no timers, no streaks, no verdicts.
   ===================================================================== */
var SyllableSplitter = {
  id: 'syllable-splitter',

  /* CURATION FLAG: en authored; the other ten carry drafts until their
     native ensemble pass lands via apply-syllable-splitter-fanout. */
  strings: {
    title:        {en:'Syllable Splitter',de:'Silbenklatschen',fr:'Frappe les syllabes',it:'Batti le sillabe',es:'Palmas y sílabas',pt:'Bata palmas nas sílabas',nl:'Klap de klankgroepen',sv:'Klappa stavelser',da:'Klap stavelserne',no:'Klapp stavelsene',fi:'Taputa tavut'},
    instruction:  {en:'Say the word, then tap the drum once for every clap you hear.',de:'Sprecht das Wort und tippt für jede Silbe einmal auf die Trommel.',fr:'Dites le mot, puis tapez une fois sur le tambour pour chaque syllabe entendue.',it:'Dite la parola, poi battete il tamburo una volta per ogni sillaba che sentite.',es:'Digan la palabra y toquen el tambor una vez por cada palmada.',pt:'Digam a palavra e batam no tambor uma vez a cada palmada.',nl:'Zeg het woord hardop en tik één keer op de trommel voor elke klap die je hoort.',sv:'Säg ordet och tryck på trumman en gång för varje klapp.',da:'Sig ordet, og tryk på trommen én gang for hvert klap.',no:'Si ordet, og trykk på trommen én gang for hvert klapp.',fi:'Sanokaa sana ääneen ja napauttakaa rumpua kerran jokaisen tavun kohdalla.'},

    /* modes */
    modeClap:     {en:'Clap it',de:'Klatschen',fr:'Frapper',it:'Batti',es:'Dar palmas',pt:'Bater palmas',nl:'Klappen',sv:'Klappa',da:'Klappe',no:'Klappe',fi:'Taputa'},
    modeBuild:    {en:'Build it',de:'Zusammensetzen',fr:'Reconstruire',it:'Ricomponi',es:'Armar',pt:'Montar',nl:'Bouwen',sv:'Bygga',da:'Bygge',no:'Bygge',fi:'Kokoa'},
    modeSort:     {en:'Sort them',de:'Sortieren',fr:'Trier',it:'Smista',es:'Clasificar',pt:'Separar',nl:'Sorteren',sv:'Sortera',da:'Sortere',no:'Sortere',fi:'Lajittele'},

    /* clap face */
    tapDrum:      {en:'Tap the drum',de:'Auf die Trommel tippen',fr:'Taper sur le tambour',it:'Batti il tamburo',es:'Toca el tambor',pt:'Bata no tambor',nl:'Tik op de trommel',sv:'Tryck på trumman',da:'Tryk på trommen',no:'Trykk på trommen',fi:'Napauta rumpua'},
    clearArcs:    {en:'Start again',de:'Noch einmal',fr:'Recommencer',it:'Ricomincia',es:'Empezar de nuevo',pt:'Começar de novo',nl:'Opnieuw',sv:'Börja om',da:'Start forfra',no:'Start på nytt',fi:'Aloita alusta'},
    hearWord:     {en:'Hear the word',de:'Wort anhören',fr:'Écouter le mot',it:'Ascolta la parola',es:'Escuchar la palabra',pt:'Ouvir a palavra',nl:'Luister naar het woord',sv:'Lyssna på ordet',da:'Hør ordet',no:'Hør ordet',fi:'Kuuntele sana'},
    arcOf:        {en:'Clap {i} of {n}',de:'Silbe {i} von {n}',fr:'Frappe {i} sur {n}',it:'Sillaba {i} di {n}',es:'Palmada {i} de {n}',pt:'Sílaba {i} de {n}',nl:'Klankgroep {i} van {n}',sv:'Klapp {i} av {n}',da:'Klap {i} af {n}',no:'Klapp {i} av {n}',fi:'Tavu {i}/{n}'},
    oralNote:     {en:'We clap what we hear — the writing can split differently.',de:'Wir klatschen, was wir hören – geschrieben kann es anders getrennt sein.',fr:'On frappe ce qu’on entend : à l’écrit, le e final ajoute souvent une syllabe de plus.',it:'Battiamo quello che sentiamo: nello scritto la divisione può essere diversa.',es:'Damos palmas a lo que oímos: la separación escrita puede ser distinta.',pt:'Batemos palmas no que ouvimos — na escrita a separação pode ser diferente.',nl:'We klappen wat we horen — op papier kan de verdeling anders zijn.',sv:'Vi klappar det vi hör – i skrift kan delningen se annorlunda ut.',da:'Vi klapper det, vi hører – på skrift kan delingen være en anden.',no:'Vi klapper det vi hører – i skrift kan delingen bli en annen.',fi:'Taputamme sen, minkä kuulemme – kirjoitettuna jako voi olla toinen.'},

    /* build face */
    buildHint:    {en:'Put the parts back in order.',de:'Setzt die Silben wieder in die passende Reihenfolge.',fr:'Remets les syllabes dans l’ordre.',it:'Rimetti le sillabe in ordine.',es:'Ordena las sílabas para armar la palabra.',pt:'Coloquem as sílabas de volta na ordem.',nl:'Zet de stukjes weer op volgorde.',sv:'Lägg delarna i ordning igen.',da:'Sæt delene i rækkefølge igen.',no:'Sett delene sammen igjen i rekkefølge.',fi:'Järjestä tavut takaisin sanaksi.'},
    scramble:     {en:'Mix them up',de:'Mischen',fr:'Mélanger',it:'Mescola',es:'Mezclar',pt:'Misturar',nl:'Husselen',sv:'Blanda',da:'Bland dem',no:'Bland dem',fi:'Sekoita'},

    /* sort face */
    sortHint:     {en:'Drag each picture to its clap pen.',de:'Zieht jedes Bild in das Gehege mit seiner Silbenzahl.',fr:'Glisse chaque image dans le bon enclos.',it:'Trascina ogni immagine nel suo recinto.',es:'Arrastra cada imagen al corral que le toca.',pt:'Arraste cada figura para o curral certo.',nl:'Sleep elk plaatje naar de juiste wei.',sv:'Dra varje bild till sin hage.',da:'Træk hvert billede hen til sin fold.',no:'Dra hvert bilde til sin egen innhegning.',fi:'Vedä jokainen kuva omaan aitaukseensa.'},
    penLabel:     {en:'{n} claps',de:'{n} Silben',fr:'{n} frappes',it:'{n} sillabe',es:'{n} palmadas',pt:'{n} sílabas',nl:'{n} klankgroepen',sv:'{n} klapp',da:'{n} klap',no:'{n} klapp',fi:'{n} tavua'},
    penOne:       {en:'1 clap',de:'1 Silbe',fr:'1 frappe',it:'1 sillaba',es:'1 palmada',pt:'1 sílaba',nl:'1 klankgroep',sv:'1 klapp',da:'1 klap',no:'1 klapp',fi:'1 tavu'},
    backToPile:   {en:'Back to the pile',de:'Zurück zum Stapel',fr:'Retour à la pile',it:'Torna al mucchio',es:'Volver al montón',pt:'Voltar para o monte',nl:'Terug naar de stapel',sv:'Tillbaka till högen',da:'Tilbage til bunken',no:'Tilbake til bunken',fi:'Takaisin pinoon'},

    /* shelves + premium */
    shelfPick:    {en:'Word sets',de:'Wortsammlungen',fr:'Séries de mots',it:'Gruppi di parole',es:'Grupos de palabras',pt:'Grupos de palavras',nl:'Woordsets',sv:'Ordgrupper',da:'Ordsæt',no:'Ordsett',fi:'Sanaryhmät'},
    shelfClose:   {en:'Close',de:'Schließen',fr:'Fermer',it:'Chiudi',es:'Cerrar',pt:'Fechar',nl:'Sluiten',sv:'Stäng',da:'Luk',no:'Lukk',fi:'Sulje'},
    lockedShelf:  {en:'Premium set',de:'Premium-Sammlung',fr:'Série Premium',it:'Gruppo Premium',es:'Grupo Premium',pt:'Grupo Premium',nl:'Premium-set',sv:'Premiumgrupp',da:'Premiumsæt',no:'Premiumsett',fi:'Premium-ryhmä'},
    gatePremium:  {en:'These sets and the sorting pens are part of Premium — your first set is always free.',de:'Diese Wortsammlungen und die Silbengehege gehören zu Premium – eure erste Sammlung bleibt immer kostenlos.',fr:'Ces séries et le tri dans les enclos font partie de Premium – la première série reste gratuite.',it:'Questi gruppi e i recinti fanno parte di Premium: il primo gruppo resta sempre gratuito.',es:'Estos grupos y los corrales son parte de Premium: el primer grupo siempre es gratis.',pt:'Estes grupos e os currais de palmas fazem parte do Premium — o primeiro grupo é sempre gratuito.',nl:'Deze woordsets en de sorteerweides horen bij Premium — je eerste set blijft altijd gratis.',sv:'De här grupperna och hagarna ingår i Premium – den första gruppen är alltid gratis.',da:'Disse sæt og foldene er en del af Premium – det første sæt er altid gratis.',no:'Disse ordsettene og innhegningene hører til Premium – det første settet er alltid gratis.',fi:'Nämä sanaryhmät ja lajitteluaitaukset kuuluvat Premiumiin – ensimmäinen ryhmä on aina ilmainen.'},
    unlock:       {en:'See Premium',de:'Premium ansehen',fr:'Découvrir Premium',it:'Scopri Premium',es:'Ver Premium',pt:'Ver o Premium',nl:'Bekijk Premium',sv:'Se Premium',da:'Se Premium',no:'Se Premium',fi:'Katso Premium'},

    /* nav + settings */
    prevWord:     {en:'Previous word',de:'Vorheriges Wort',fr:'Mot précédent',it:'Parola precedente',es:'Palabra anterior',pt:'Palavra anterior',nl:'Vorig woord',sv:'Föregående ord',da:'Forrige ord',no:'Forrige ord',fi:'Edellinen sana'},
    nextWord:     {en:'Next word',de:'Nächstes Wort',fr:'Mot suivant',it:'Parola successiva',es:'Palabra siguiente',pt:'Próxima palavra',nl:'Volgend woord',sv:'Nästa ord',da:'Næste ord',no:'Neste ord',fi:'Seuraava sana'},
    setVoice:     {en:'Say syllables aloud',de:'Silben vorsprechen',fr:'Dire les syllabes à voix haute',it:'Pronuncia le sillabe ad alta voce',es:'Decir las sílabas en voz alta',pt:'Dizer as sílabas em voz alta',nl:'Klankgroepen hardop zeggen',sv:'Läs stavelserna högt',da:'Sig stavelserne højt',no:'Si stavelsene høyt',fi:'Sano tavut ääneen'},
    setDrum:      {en:'Drum sound',de:'Trommelklang',fr:'Son du tambour',it:'Suono del tamburo',es:'Sonido del tambor',pt:'Som do tambor',nl:'Trommelgeluid',sv:'Trumljud',da:'Trommelyd',no:'Trommelyd',fi:'Rummun ääni'},

    /* sibling phonics tools */
    trioLabel:    {en:'Phonics tools:',de:'Werkzeuge zum Lesenlernen:',fr:'Outils de phonologie :',it:'Strumenti fonologici:',es:'Herramientas de conciencia fonológica:',pt:'Ferramentas de alfabetização:',nl:'Hulpmiddelen voor klanken:',sv:'Ljudverktyg:',da:'Lydværktøjer:',no:'Lydverktøy:',fi:'Lukemisen työkalut:'},
    siblingSbx:   {en:'Sound Boxes',de:'Lautboxen',fr:'Boîtes à sons',it:'Caselle dei suoni',es:'Cajas de sonidos',pt:'Caixas de sons',nl:'Klankdozen',sv:'Ljudrutor',da:'Lydbokse',no:'Lydbokser',fi:'Äännelaatikot'},
    siblingBbd:   {en:'Blending Board',de:'Lesemaschine',fr:'Tableau de syllabes',it:'Tabellone delle sillabe',es:'Tablero de sílabas',pt:'Quadro de sílabas',nl:'Klankenbord',sv:'Ljudtavla',da:'Lydtavle',no:'Lydtavle',fi:'Tavutaulu'},
    siblingLtl:   {en:'Letter Tiles',de:'Magnetbuchstaben',fr:'Lettres magnétiques',it:'Lettere magnetiche',es:'Letras magnéticas',pt:'Alfabeto móvel',nl:'Letterdoos',sv:'Magnetbokstäver',da:'Magnetbogstaver',no:'Magnetbokstaver',fi:'Magneettikirjaimet'},
    siblingHwd:   {en:'Heart Words',de:'Merkwörter',fr:'Mots à cœur',it:'Parole del cuore',es:'Palabras con corazón',pt:'Palavras de coração',nl:'Hartwoorden',sv:'Hjärteord',da:'Hjerteord',no:'Hjerteord',fi:'Sydänsanat'}
  },

  /* Emergency deck if the per-locale fetch 404s. Free shelf only, so a
     network failure still leaves a complete working free tool. */
  FALLBACK_DECK: {
    locale: 'en', version: 1, oralConvention: 'same-as-written', curation: 'fallback',
    pens: [1, 2, 3],
    shelves: [{ id: 's1', label: 'Two-clap words', free: true }],
    words: [
      { id:'baby',   display:'baby',   count:2, chunks:['ba','by'],    oralCount:2, oralChunks:['ba','by'],    noun:'baby',   imageDir:'toys',                imageFile:'baby',   shelf:'s1' },
      { id:'bunny',  display:'bunny',  count:2, chunks:['bun','ny'],   oralCount:2, oralChunks:['bun','ny'],   noun:'bunny',  imageDir:'easter',              imageFile:'bunny',  shelf:'s1' },
      { id:'carrot', display:'carrot', count:2, chunks:['car','rot'],  oralCount:2, oralChunks:['car','rot'],  noun:'carrot', imageDir:'At the Supermarket',  imageFile:'carrot', shelf:'s1' },
      { id:'tiger',  display:'tiger',  count:2, chunks:['ti','ger'],   oralCount:2, oralChunks:['ti','ger'],   noun:'tiger',  imageDir:'animals',             imageFile:'tiger',  shelf:'s1' },
      { id:'monkey', display:'monkey', count:2, chunks:['mon','key'],  oralCount:2, oralChunks:['mon','key'],  noun:'monkey', imageDir:'zoo animals',         imageFile:'monkey', shelf:'s1' },
      { id:'pencil', display:'pencil', count:2, chunks:['pen','cil'],  oralCount:2, oralChunks:['pen','cil'],  noun:'pencil', imageDir:'around the house',    imageFile:'pencil', shelf:'s1' }
    ]
  },

  defaults: { voice: true, drum: true },
  settings: [
    { key: 'voice', type: 'toggle', labelKey: 'setVoice' },
    { key: 'drum', type: 'toggle', labelKey: 'setDrum' }
  ],

  STORE_KEY: 'lcs:syllable-splitter:v1',
  ENT_TRUST_DAYS: 14,

  /* =================================================================
     PURE ENGINE — no DOM. The build gate calls these directly.
     ================================================================= */

  shelfById: function (id) {
    var sh = (this.deck && this.deck.shelves) || [];
    for (var i = 0; i < sh.length; i++) if (sh[i].id === id) return sh[i];
    return null;
  },

  _shelfUnlocked: function (shelf) { return !!(shelf && (shelf.free || this.premium)); },

  firstFreeShelf: function () {
    var sh = (this.deck && this.deck.shelves) || [];
    for (var i = 0; i < sh.length; i++) if (sh[i].free) return sh[i].id;
    return sh.length ? sh[0].id : null;
  },

  /* THE STRUCTURAL GATE — a locked shelf yields nothing at all, so
     premium words never reach the DOM. */
  wordsForShelf: function (shelfId) {
    if (!this._shelfUnlocked(this.shelfById(shelfId))) return [];
    var all = (this.deck && this.deck.words) || [], out = [];
    for (var i = 0; i < all.length; i++) if (all[i].shelf === shelfId) out.push(all[i]);
    return out;
  },

  /* THE TWO-CONVENTION CONTRACT.
     Arcs are what the class CLAPS; cards are how the word is WRITTEN. */
  arcsFor: function (word) { return (word && word.oralChunks) || []; },
  cardsFor: function (word) { return (word && word.chunks) || []; },

  /* True when this deck's clapping split differs from its written split
     anywhere — drives the on-screen explanation so a difference is never
     mistaken for a bug. */
  hasOralDivergence: function () {
    return !!(this.deck && this.deck.oralConvention && this.deck.oralConvention !== 'same-as-written');
  },

  wordDiverges: function (w) {
    if (!w) return false;
    var a = this.arcsFor(w), c = this.cardsFor(w);
    if (a.length !== c.length) return true;
    for (var i = 0; i < a.length; i++) if (a[i] !== c[i]) return true;
    return false;
  },

  /* Every locale's pens, with the count that actually fills them. */
  wordsWithCount: function (n, pool) {
    var src = pool || this._visibleWords(), out = [];
    for (var i = 0; i < src.length; i++) if (src[i].oralCount === n) out.push(src[i]);
    return out;
  },

  _visibleWords: function () {
    var sh = (this.deck && this.deck.shelves) || [], out = [];
    for (var i = 0; i < sh.length; i++) {
      if (!this._shelfUnlocked(sh[i])) continue;
      out = out.concat(this.wordsForShelf(sh[i].id));
    }
    return out;
  },

  resolveDeepLink: function (params, premium) {
    if (!params) return null;
    var sid = params.set, wid = params.word;
    if (!sid && !wid) return null;
    var all = (this.deck && this.deck.words) || [], i;
    if (!sid && wid) for (i = 0; i < all.length; i++) if (all[i].id === wid) { sid = all[i].shelf; break; }
    var shelf = this.shelfById(sid);
    if (!shelf) return null;
    if (!shelf.free && !premium) return null;
    var idx = 0, list = [];
    for (i = 0; i < all.length; i++) if (all[i].shelf === sid) list.push(all[i]);
    if (wid) for (i = 0; i < list.length; i++) if (list[i].id === wid) { idx = i; break; }
    /* Sorting pens are premium — refuse the mode HERE rather than trusting
       the caller to filter it, so the pure function is the whole gate. */
    var mode = params.mode || null;
    if (mode === 'sort' && !premium) mode = null;
    if (mode && mode !== 'clap' && mode !== 'build' && mode !== 'sort') mode = null;
    return { shelf: sid, index: idx, mode: mode };
  },

  /* deterministic scramble seeded off the word, with an identity guard so
     a rebuild never opens already solved (the syllable-builder precedent) */
  scrambleOrder: function (n, seedStr) {
    var seed = 0, i, j, t, a = [];
    for (i = 0; i < n; i++) a.push(i);
    for (i = 0; i < String(seedStr).length; i++) seed = (seed * 31 + String(seedStr).charCodeAt(i)) >>> 0;
    seed = (seed + (this._scrambleSalt || 0)) >>> 0;
    for (i = a.length - 1; i > 0; i--) {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      j = seed % (i + 1);
      t = a[i]; a[i] = a[j]; a[j] = t;
    }
    var same = true;
    for (i = 0; i < a.length; i++) if (a[i] !== i) { same = false; break; }
    if (same && a.length > 1) { t = a[0]; a[0] = a[1]; a[1] = t; }
    return a;
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
    injectSyllableSplitterCSS();

    this.deck = null;
    this.shelfId = null;
    this.index = 0;
    this.mode = 'clap';
    this.taps = 0;
    this.built = [];
    this.order = [];
    this.penOf = {};
    this.premiumKnown = false;
    this._deepPending = this._readParams();
    this._timers = [];
    this._store = this._loadStore();
    this._scrambleSalt = 0;

    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';

    this._fetchDeck();
    this._fetchEntitlement();

    document.addEventListener('keydown', function (e) {
      if (!self._wrap) return;
      var t = e.target || {};
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') { self.go(1); e.preventDefault(); }
      else if (e.key === 'ArrowLeft') { self.go(-1); e.preventDefault(); }
      else if (e.key === ' ') { self.onDrum(); e.preventDefault(); }
    });
  },

  _readParams: function () {
    var q = {};
    try {
      var p = new URLSearchParams(location.search);
      if (p.get('set')) q.set = p.get('set');
      if (p.get('word')) q.word = p.get('word');
      if (p.get('mode')) q.mode = p.get('mode');
    } catch (_) {}
    return (q.set || q.word || q.mode) ? q : null;
  },

  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY)) || {}; } catch (_) { return {}; }
  },
  _saveStore: function () {
    var s = this._store || {};
    s.v = 1; s.lastShelf = this.shelfId;
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(s)); } catch (_) {}
  },

  _fetchDeck: function () {
    var self = this;
    fetch('/mini-tools/syllable-splitter-' + this.api.lang + '.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .catch(function () { return self.FALLBACK_DECK; })
      .then(function (d) {
        self.deck = (d && d.words && d.words.length) ? d : self.FALLBACK_DECK;
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

  _settle: function () { if (!this.deck) return; this._applyEntryState(); if (this._wrap) this.render(); },

  _applyEntryState: function () {
    if (!this.deck) return;
    var d = this._deepPending ? this.resolveDeepLink(this._deepPending, this.premium) : null;
    if (d) {
      this.shelfId = d.shelf; this.index = d.index;
      if (d.mode && (d.mode === 'clap' || d.mode === 'build' || (d.mode === 'sort' && this.premium))) this.mode = d.mode;
      if (this.premiumKnown) this._deepPending = null;
    } else if (!this.shelfId || !this._shelfUnlocked(this.shelfById(this.shelfId))) {
      this.shelfId = (this._store.lastShelf && this._shelfUnlocked(this.shelfById(this._store.lastShelf)))
        ? this._store.lastShelf : this.firstFreeShelf();
      this.index = 0;
    }
    if (this.mode === 'sort' && !this.premium) this.mode = 'clap';
    this._resetWordState();
  },

  _resetWordState: function () { this.taps = 0; this.built = []; this.order = []; },

  list: function () { return this.wordsForShelf(this.shelfId); },

  current: function () {
    var l = this.list();
    if (!l.length) return null;
    if (this.index >= l.length) this.index = 0;
    if (this.index < 0) this.index = l.length - 1;
    return l[this.index];
  },

  go: function (d) {
    var l = this.list();
    if (!l.length) return;
    this.index = (this.index + d + l.length) % l.length;
    this._resetWordState();
    this.render();
  },

  /* =================================================================
     SPEECH — whole words and SYLLABLES. Never an isolated phoneme.
     ================================================================= */

  speakWord: function () {
    var w = this.current();
    if (!w) return;
    try { LCSAudio.speak({ type: 'word', text: w.display, lang: this.api.lang }); } catch (_) {}
  },
  speakSyllable: function (text) {
    try { LCSAudio.speak({ type: 'syllable', text: text, lang: this.api.lang, rate: 0.85 }); } catch (_) {}
  },

  /* =================================================================
     THE DRUM — a noise burst through a lowpass plus a pitch-dropping
     thump, velocity-varied so repeated taps never machine-gun.
     (Adapted from the rekenrek clack.)
     ================================================================= */

  _ctx: function () {
    if (this._audio === undefined || this._audio === null) {
      try {
        var AC = window.AudioContext || window.webkitAudioContext;
        this._audio = AC ? new AC() : false;
      } catch (_) { this._audio = false; }
    }
    return this._audio;
  },

  _noiseBuf: function (ctx) {
    if (!this._noise) {
      var len = Math.floor(ctx.sampleRate * 0.1), buf = ctx.createBuffer(1, len, ctx.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      this._noise = buf;
    }
    return this._noise;
  },

  boom: function () {
    if (!this.api.settings.drum) return;
    var now = Date.now();
    if (now - (this._lastBoom || 0) < 30) return;
    this._lastBoom = now;
    var ctx = this._ctx();
    if (!ctx) return;
    if (ctx.state === 'suspended') { try { ctx.resume(); } catch (_) {} }
    var t = ctx.currentTime, decay = 0.25;

    var noise = ctx.createBufferSource();
    noise.buffer = this._noiseBuf(ctx);
    var lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 480 * (0.92 + Math.random() * 0.16);
    lp.Q.value = 2;
    var ng = ctx.createGain();
    ng.gain.setValueAtTime(0.22, t);
    ng.gain.exponentialRampToValueAtTime(0.001, t + decay * 0.5);
    noise.connect(lp); lp.connect(ng); ng.connect(ctx.destination);
    noise.start(t); noise.stop(t + decay);

    var osc = ctx.createOscillator();
    osc.type = 'sine';
    var f0 = 92 * (0.95 + Math.random() * 0.1);
    osc.frequency.setValueAtTime(f0, t);
    osc.frequency.exponentialRampToValueAtTime(f0 * 0.55, t + decay);
    var og = ctx.createGain();
    og.gain.setValueAtTime(0.26, t);
    og.gain.exponentialRampToValueAtTime(0.001, t + decay);
    osc.connect(og); og.connect(ctx.destination);
    osc.start(t); osc.stop(t + decay + 0.02);
  },

  onDrum: function () {
    if (this.mode !== 'clap') return;
    var w = this.current();
    if (!w) return;
    var arcs = this.arcsFor(w);
    this.boom();
    /* Taps are NEVER refused — the class decides how many claps a word
       has. Past the last syllable the drum still sounds; it simply has
       no further arc to draw. */
    if (this.taps < arcs.length) {
      this.taps++;
      this._paintArcs();
      var i = this.taps - 1;
      this.api.announce(this.fmt('arcOf', { i: this.taps, n: arcs.length }) + ': ' + arcs[i]);
      if (this.api.settings.voice) {
        var self = this, txt = arcs[i];
        this._after(120, function () { self.speakSyllable(txt); });
      }
      if (this.taps === arcs.length && this.api.settings.voice) {
        var s2 = this;
        this._after(180 + 380, function () { s2.speakWord(); });
      }
    }
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
    var wrap = api.el('div', 'ss-wrap');
    this._wrap = wrap;

    if (!this.deck) { wrap.appendChild(api.el('div', 'ss-loading')); api.stage.appendChild(wrap); return; }

    /* top row: set pill + mode switch */
    var top = api.el('div', 'ss-toprow');
    var pill = api.el('button', 'ss-pill');
    pill.type = 'button';
    var shelf = this.shelfById(this.shelfId);
    pill.textContent = shelf ? shelf.label : api.t('shelfPick');
    pill.addEventListener('click', function () { self.panelOpen = true; self.render(); });
    top.appendChild(pill);

    var modes = api.el('div', 'ss-modes');
    [['clap', 'modeClap'], ['build', 'modeBuild'], ['sort', 'modeSort']].forEach(function (m) {
      var b = api.el('button', 'ss-mode' + (self.mode === m[0] ? ' ss-on' : '') + (m[0] === 'sort' && !self.premium ? ' ss-locked' : ''));
      b.type = 'button';
      b.textContent = api.t(m[1]);
      b.addEventListener('click', function () {
        if (m[0] === 'sort' && !self.premium) { self.gateOpen = true; self.render(); return; }
        self.mode = m[0]; self._resetWordState(); self.render();
      });
      modes.appendChild(b);
    });
    top.appendChild(modes);
    wrap.appendChild(top);

    if (this.mode === 'sort') wrap.appendChild(this._buildSort());
    else wrap.appendChild(this._buildCard());

    if (this.mode !== 'sort') {
      var nav = api.el('div', 'ss-nav');
      var p = api.el('button', 'ss-navbtn'); p.type = 'button'; p.innerHTML = '&#8249;';
      p.setAttribute('aria-label', api.t('prevWord'));
      p.addEventListener('click', function () { self.go(-1); });
      var n = api.el('button', 'ss-navbtn'); n.type = 'button'; n.innerHTML = '&#8250;';
      n.setAttribute('aria-label', api.t('nextWord'));
      n.addEventListener('click', function () { self.go(1); });
      nav.appendChild(p); nav.appendChild(n);
      wrap.appendChild(nav);
    }

    if (this.panelOpen) wrap.appendChild(this._buildPanel());
    if (this.gateOpen) wrap.appendChild(this._buildGate());
    api.stage.appendChild(wrap);

    if (this.mode === 'clap') this._after(0, function () { self._paintArcs(); });
  },

  _imgUrl: function (w) {
    return '/image-library-webp/themes/' + encodeURIComponent(w.imageDir) + '/' + w.imageFile + '@2x.webp';
  },

  _picture: function (w, cls) {
    var api = this.api;
    var img = api.el('img', cls || 'ss-pic');
    img.src = this._imgUrl(w);
    img.alt = w.display;
    /* the native-image-drag bug class: an <img> starts an HTML5 drag and
       pointercancel kills the gesture — all three parts are required */
    img.draggable = false;
    img.addEventListener('dragstart', function (e) { e.preventDefault(); });
    return img;
  },

  _buildCard: function () {
    var self = this, api = this.api;
    var w = this.current();
    var card = api.el('div', 'ss-card');
    if (!w) {
      var e = api.el('p', 'ss-empty'); e.textContent = api.t('shelfPick');
      card.appendChild(e); return card;
    }

    card.appendChild(this._picture(w));

    if (this.mode === 'clap') {
      /* the word, one span per ORAL chunk — arcs are what we clap */
      var wordRow = api.el('div', 'ss-wordrow');
      this._wordRow = wordRow;
      var arcs = this.arcsFor(w);
      this._spanEls = [];
      for (var i = 0; i < arcs.length; i++) {
        var sp = api.el('span', 'ss-syl');
        sp.textContent = arcs[i];
        wordRow.appendChild(sp);
        this._spanEls.push(sp);
      }
      card.appendChild(wordRow);

      var spk = api.el('button', 'ss-speak');
      spk.type = 'button';
      spk.setAttribute('aria-label', api.t('hearWord'));
      spk.innerHTML = this._speakerSVG(22);
      spk.addEventListener('click', function () { self.speakWord(); });
      card.appendChild(spk);

      var drum = api.el('button', 'ss-drum');
      drum.type = 'button';
      drum.setAttribute('aria-label', api.t('tapDrum'));
      drum.innerHTML = this._drumSVG();
      drum.addEventListener('click', function () {
        drum.classList.remove('ss-hit'); void drum.offsetWidth; drum.classList.add('ss-hit');
        self.onDrum();
      });
      card.appendChild(drum);

      var again = api.el('button', 'ss-again');
      again.type = 'button';
      again.textContent = api.t('clearArcs');
      again.addEventListener('click', function () { self.taps = 0; self._paintArcs(); });
      card.appendChild(again);

      /* when this locale claps differently from how it writes, SAY so */
      if (this.hasOralDivergence() && this.wordDiverges(w)) {
        var note = api.el('p', 'ss-oralnote');
        note.textContent = api.t('oralNote');
        card.appendChild(note);
      }
    } else {
      card.appendChild(this._buildRebuild(w));
    }
    return card;
  },

  /* ---- clap face: the arcs ---- */
  _paintArcs: function () {
    var row = this._wordRow;
    if (!row || this.mode !== 'clap') return;
    if (this._arcEl) { this._arcEl.remove(); this._arcEl = null; }
    var rowR = row.getBoundingClientRect();
    if (!rowR.width) return;
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'ss-arcs');
    svg.setAttribute('width', rowR.width);
    svg.setAttribute('height', 26);
    svg.style.top = rowR.height + 'px';
    for (var i = 0; i < this.taps && i < this._spanEls.length; i++) {
      var r = this._spanEls[i].getBoundingClientRect();
      var x1 = r.left - rowR.left + 2, x2 = r.right - rowR.left - 2;
      var mid = (x1 + x2) / 2;
      var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', 'M' + x1 + ' 3 Q' + mid + ' 25 ' + x2 + ' 3');
      p.setAttribute('class', 'ss-arc');
      svg.appendChild(p);
    }
    row.appendChild(svg);
    this._arcEl = svg;
  },

  /* ---- build face: scramble + rebuild using the WRITTEN chunks ---- */
  _buildRebuild: function (w) {
    var self = this, api = this.api;
    var cards = this.cardsFor(w);
    if (!this.order.length) this.order = this.scrambleOrder(cards.length, w.id);
    if (!this.built.length) for (var z = 0; z < cards.length; z++) this.built.push(null);

    var box = api.el('div', 'ss-build');
    var hint = api.el('p', 'ss-hint'); hint.textContent = api.t('buildHint');
    box.appendChild(hint);

    var slots = api.el('div', 'ss-slots');
    for (var i = 0; i < cards.length; i++) {
      (function (idx) {
        var s = api.el('button', 'ss-slot' + (self.built[idx] !== null ? ' ss-filled' : ''));
        s.type = 'button';
        s.textContent = self.built[idx] !== null ? cards[self.built[idx]] : '';
        s.addEventListener('click', function () {
          if (self.built[idx] === null) return;
          self.built[idx] = null;
          try { self.api.sound(440); } catch (_) {}
          self.render();
        });
        slots.appendChild(s);
      })(i);
    }
    box.appendChild(slots);

    var tray = api.el('div', 'ss-tray');
    for (var k = 0; k < this.order.length; k++) {
      (function (ci) {
        var used = self.built.indexOf(ci) >= 0;
        var t = api.el('button', 'ss-piece' + (used ? ' ss-used' : ''));
        t.type = 'button';
        t.textContent = cards[ci];
        t.disabled = used;
        t.addEventListener('click', function () {
          var free = self.built.indexOf(null);
          if (free < 0) return;
          self.built[free] = ci;
          try { self.api.sound(660); } catch (_) {}
          if (self.api.settings.voice) self.speakSyllable(cards[ci]);
          var done = self.built.every(function (x, n) { return x === n; });
          self.render();
          if (done && self.api.settings.voice) self._after(260, function () { self.speakWord(); });
        });
        tray.appendChild(t);
      })(this.order[k]);
    }
    box.appendChild(tray);

    var mix = api.el('button', 'ss-again');
    mix.type = 'button';
    mix.textContent = api.t('scramble');
    mix.addEventListener('click', function () {
      self._scrambleSalt = (self._scrambleSalt || 0) + 7;
      self.built = []; self.order = [];
      self.render();
    });
    box.appendChild(mix);
    return box;
  },

  /* ---- sort face: drag pictures into clap pens (premium) ---- */
  _buildSort: function () {
    var self = this, api = this.api;
    var box = api.el('div', 'ss-sort');
    var hint = api.el('p', 'ss-hint'); hint.textContent = api.t('sortHint');
    box.appendChild(hint);

    var pens = (this.deck && this.deck.pens) || [1, 2, 3];
    var pool = this._visibleWords();
    if (!this._sortPool) {
      var pick = [], i, n;
      for (i = 0; i < pens.length; i++) {
        var band = this.wordsWithCount(pens[i], pool);
        for (n = 0; n < 3 && n < band.length; n++) pick.push(band[n]);
      }
      this._sortPool = pick;
    }

    var penRow = api.el('div', 'ss-pens');
    this._penEls = {};
    for (var p = 0; p < pens.length; p++) {
      (function (pn) {
        var pen = api.el('div', 'ss-pen');
        pen.dataset.pen = pn;
        var lab = api.el('div', 'ss-penlab');
        lab.textContent = pn === 1 ? api.t('penOne') : self.fmt('penLabel', { n: pn });
        pen.appendChild(lab);
        var slot = api.el('div', 'ss-penslot');
        pen.appendChild(slot);
        penRow.appendChild(pen);
        self._penEls[pn] = { pen: pen, slot: slot };
      })(pens[p]);
    }
    box.appendChild(penRow);

    var pile = api.el('div', 'ss-pile');
    this._pileEl = pile;
    box.appendChild(pile);

    this._sortPool.forEach(function (w) {
      var tile = api.el('div', 'ss-tile');
      tile.appendChild(self._picture(w, 'ss-tilepic'));
      var cap = api.el('span', 'ss-tilecap'); cap.textContent = w.display;
      tile.appendChild(cap);
      tile.setAttribute('tabindex', '0');
      self._wireDrag(tile, w);
      var pen = self.penOf[w.id];
      if (pen && self._penEls[pen]) self._penEls[pen].slot.appendChild(tile);
      else pile.appendChild(tile);
    });

    var back = api.el('button', 'ss-again');
    back.type = 'button';
    back.textContent = api.t('backToPile');
    back.addEventListener('click', function () { self.penOf = {}; self.render(); });
    box.appendChild(back);
    return box;
  },

  /* pointer drag with a 10px drag-vs-tap threshold so a tile is still
     tappable to hear its word; never re-renders mid-gesture */
  _wireDrag: function (tile, w) {
    var self = this;
    tile.addEventListener('dragstart', function (e) { e.preventDefault(); });
    tile.addEventListener('pointerdown', function (e) {
      if (e.button) return;
      e.preventDefault();
      var sx = e.clientX, sy = e.clientY, moved = false, ghost = null;
      try { tile.setPointerCapture(e.pointerId); } catch (_) {}

      var onMove = function (ev) {
        var dx = ev.clientX - sx, dy = ev.clientY - sy;
        if (!moved && Math.sqrt(dx * dx + dy * dy) < 10) return;
        if (!moved) {
          moved = true;
          var r = tile.getBoundingClientRect();
          ghost = tile.cloneNode(true);
          ghost.className = 'ss-tile ss-ghost';
          ghost.style.width = r.width + 'px';
          ghost.style.height = r.height + 'px';
          document.body.appendChild(ghost);
          tile.classList.add('ss-dragging');
        }
        ghost.style.left = (ev.clientX - 34) + 'px';
        ghost.style.top = (ev.clientY - 34) + 'px';
        self._hover(ev.clientX, ev.clientY);
      };
      var onUp = function (ev) {
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onUp);
        document.removeEventListener('pointercancel', onUp);
        try { tile.releasePointerCapture(e.pointerId); } catch (_) {}
        if (ghost) { ghost.remove(); ghost = null; }
        tile.classList.remove('ss-dragging');
        self._clearHover();
        if (!moved) { if (self.api.settings.voice) { self.speakWordOf(w); } return; }
        var pen = self._penAt(ev.clientX, ev.clientY);
        if (pen === null) delete self.penOf[w.id]; else self.penOf[w.id] = pen;
        try { self.api.sound(pen ? 660 : 440); } catch (_) {}
        self.render();
      };
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
      document.addEventListener('pointercancel', onUp);
    });
    tile.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      var pens = (self.deck && self.deck.pens) || [1, 2, 3];
      var cur = self.penOf[w.id] || null;
      var i = cur === null ? -1 : pens.indexOf(cur);
      var next = (i + 1 >= pens.length) ? null : pens[i + 1];
      if (next === null) delete self.penOf[w.id]; else self.penOf[w.id] = next;
      self.render();
    });
  },

  speakWordOf: function (w) {
    try { LCSAudio.speak({ type: 'word', text: w.display, lang: this.api.lang }); } catch (_) {}
  },

  _penAt: function (x, y) {
    for (var k in this._penEls) {
      if (!Object.prototype.hasOwnProperty.call(this._penEls, k)) continue;
      var r = this._penEls[k].pen.getBoundingClientRect();
      if (x >= r.left - 16 && x <= r.right + 16 && y >= r.top - 24 && y <= r.bottom + 24) return parseInt(k, 10);
    }
    return null;
  },
  _hover: function (x, y) {
    var pen = this._penAt(x, y);
    for (var k in this._penEls) {
      if (!Object.prototype.hasOwnProperty.call(this._penEls, k)) continue;
      this._penEls[k].pen.classList.toggle('ss-over', parseInt(k, 10) === pen);
    }
  },
  _clearHover: function () {
    for (var k in this._penEls) {
      if (!Object.prototype.hasOwnProperty.call(this._penEls, k)) continue;
      this._penEls[k].pen.classList.remove('ss-over');
    }
  },

  /* =================================================================
     PANEL + GATE
     ================================================================= */

  _buildPanel: function () {
    var self = this, api = this.api;
    var scrim = api.el('div', 'ss-scrim');
    scrim.addEventListener('click', function (e) { if (e.target === scrim) { self.panelOpen = false; self.render(); } });
    var panel = api.el('div', 'ss-panel');

    var head = api.el('div', 'ss-panel-head');
    var h = api.el('h2', 'ss-panel-title'); h.textContent = api.t('shelfPick');
    head.appendChild(h);
    var close = api.el('button', 'ss-panel-close'); close.type = 'button';
    close.textContent = api.t('shelfClose');
    close.addEventListener('click', function () { self.panelOpen = false; self.render(); });
    head.appendChild(close);
    panel.appendChild(head);

    (this.deck.shelves || []).forEach(function (shelf) {
      var open = self._shelfUnlocked(shelf);
      var sec = api.el('div', 'ss-sec' + (open ? '' : ' ss-locked'));
      var row = api.el('button', 'ss-secrow'); row.type = 'button';
      var lbl = api.el('span', 'ss-seclabel'); lbl.textContent = shelf.label;
      row.appendChild(lbl);
      if (!open) { var lk = api.el('span', 'ss-lock'); lk.textContent = api.t('lockedShelf'); row.appendChild(lk); }
      row.addEventListener('click', function () {
        if (!open) { self.gateOpen = true; self.panelOpen = false; self.render(); return; }
        self.shelfId = shelf.id; self.index = 0; self.panelOpen = false;
        self._sortPool = null; self._resetWordState(); self._saveStore(); self.render();
      });
      sec.appendChild(row);
      /* THE STRUCTURAL GATE — a locked set emits no word list at all */
      if (open) {
        var grid = api.el('div', 'ss-wordgrid');
        self.wordsForShelf(shelf.id).forEach(function (word) {
          var c = api.el('button', 'ss-wordchip'); c.type = 'button';
          c.textContent = word.display;
          c.addEventListener('click', function () {
            self.shelfId = shelf.id;
            var l = self.list();
            for (var z = 0; z < l.length; z++) if (l[z].id === word.id) { self.index = z; break; }
            self.panelOpen = false; self._resetWordState(); self._saveStore(); self.render();
          });
          grid.appendChild(c);
        });
        sec.appendChild(grid);
      }
      panel.appendChild(sec);
    });

    panel.appendChild(this._buildSiblings());
    scrim.appendChild(panel);
    return scrim;
  },

  _buildGate: function () {
    var self = this, api = this.api;
    var scrim = api.el('div', 'ss-scrim');
    scrim.addEventListener('click', function (e) { if (e.target === scrim) { self.gateOpen = false; self.render(); } });
    var g = api.el('div', 'ss-gate');
    var p = api.el('p', 'ss-gate-line'); p.textContent = api.t('gatePremium');
    g.appendChild(p);
    var a = api.el('a', 'ss-gate-cta');
    a.href = '/' + api.lang + '/pricing?from=tool-syllable-splitter';
    a.target = '_top';
    a.textContent = api.t('unlock');
    g.appendChild(a);
    var c = api.el('button', 'ss-gate-close'); c.type = 'button';
    c.textContent = api.t('shelfClose');
    c.addEventListener('click', function () { self.gateOpen = false; self.render(); });
    g.appendChild(c);
    scrim.appendChild(g);
    return scrim;
  },

  _buildSiblings: function () {
    var api = this.api;
    var f = api.el('div', 'ss-siblings');
    var lbl = api.el('span', 'ss-sib-label'); lbl.textContent = api.t('trioLabel') + ' ';
    f.appendChild(lbl);
    var defs = [
      { file: 'sound-boxes', key: 'siblingSbx' },
      { file: 'blending-board', key: 'siblingBbd' },
      { file: 'letter-tiles', key: 'siblingLtl' }
    ];
    /* Heart Words ships in TEN locales — never link it from the fi build. */
    if (['en','de','fr','it','es','pt','nl','sv','da','no'].indexOf(api.lang) >= 0)
      defs.push({ file: 'heart-words', key: 'siblingHwd' });
    for (var i = 0; i < defs.length; i++) {
      if (i) { var sep = api.el('span', 'ss-sib-sep'); sep.textContent = ' · '; f.appendChild(sep); }
      var a = api.el('a', 'ss-sib-link');
      a.href = '/mini-tools/' + defs[i].file + '.html?lang=' + api.lang;
      a.target = '_top';
      a.textContent = api.t(defs[i].key);
      f.appendChild(a);
    }
    return f;
  },

  _speakerSVG: function (s) {
    return '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" aria-hidden="true" focusable="false">'
      + '<path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/>'
      + '<path d="M16.5 8.5a5 5 0 0 1 0 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  },

  _drumSVG: function () {
    return '<svg viewBox="0 0 64 52" width="72" height="58" aria-hidden="true" focusable="false">'
      + '<ellipse cx="32" cy="16" rx="26" ry="11" fill="#FFF3DC" stroke="#146B5E" stroke-width="3"/>'
      + '<path d="M6 16v18c0 6 11.6 11 26 11s26-5 26-11V16" fill="#F2784B" stroke="#146B5E" stroke-width="3" stroke-linejoin="round"/>'
      + '<path d="M8 20l16 16M56 20L40 36M32 19v26" stroke="#FFFDF7" stroke-width="2.5" stroke-linecap="round" opacity=".75"/>'
      + '</svg>';
  },

  reset: function () {
    this._clearTimers();
    this._resetWordState();
    this.penOf = {};
    this._sortPool = null;
    this.mode = 'clap';
    this.panelOpen = false; this.gateOpen = false;
    this.render();
  },

  onSettings: function () { this._saveStore(); this.render(); }
};

/* =====================================================================
   CSS — injected once, tool-scoped with the ss- prefix.
   ===================================================================== */
function injectSyllableSplitterCSS() {
  if (document.getElementById('ss-style')) return;
  var st = document.createElement('style');
  st.id = 'ss-style';
  st.textContent = ''
    + '.ss-wrap{display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;padding:4px 8px 12px;box-sizing:border-box}'
    + '.ss-loading{min-height:180px}'
    + '.ss-toprow{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;width:100%}'
    + '.ss-pill{font:600 15px/1.2 Nunito,system-ui,sans-serif;color:#146B5E;background:#FFF9EE;border:2px solid #146B5E33;'
    + 'border-radius:999px;padding:9px 18px;min-height:44px;cursor:pointer}'
    + '.ss-modes{display:flex;gap:6px}'
    + '.ss-mode{font:600 14px/1 Nunito,system-ui,sans-serif;color:#146B5E;background:#FFFDF7;border:2px solid #146B5E22;'
    + 'border-radius:999px;padding:10px 14px;min-height:44px;cursor:pointer}'
    + '.ss-mode.ss-on{background:#146B5E;color:#FFFDF7;border-color:#146B5E}'
    + '.ss-mode.ss-locked{opacity:.62}'

    /* card */
    + '.ss-card{position:relative;width:fit-content;max-width:100%;min-width:min(100%,300px);margin-inline:auto;'
    + 'background:#FFFDF7;border:2px solid #146B5E22;border-radius:22px;padding:18px 18px 16px;'
    + 'box-shadow:0 3px 0 #146B5E14,0 10px 26px -14px #146B5E55;display:flex;flex-direction:column;align-items:center;gap:12px}'
    + '.ss-pic{width:min(180px,42vw);height:auto;flex:0 0 auto;user-select:none;-webkit-user-drag:none}'
    + '.ss-speak{width:44px;height:44px;flex:0 0 auto;border-radius:50%;border:2px solid #146B5E22;background:#FFF9EE;'
    + 'color:#146B5E;cursor:pointer;display:flex;align-items:center;justify-content:center}'

    /* the word + arcs */
    + '.ss-wordrow{position:relative;display:flex;justify-content:center;align-items:flex-end;'
    + 'font:700 clamp(24px,7vw,42px)/1.05 "Baloo 2",Nunito,system-ui,sans-serif;color:#3A3226;'
    + 'letter-spacing:.5px;margin-bottom:30px;flex:0 0 auto}'
    /* No gap between syllable spans: Silbenboegen sit under a NORMALLY
       written word. Spacing them out would read as separate words and
       give the split away before the class has clapped it. */
    + '.ss-syl{padding:0}'
    + '.ss-arcs{position:absolute;left:0;pointer-events:none;overflow:visible}'
    + '.ss-arc{fill:none;stroke:#F2784B;stroke-width:3.5;stroke-linecap:round;'
    + 'stroke-dasharray:120;stroke-dashoffset:120;animation:ss-draw .32s ease forwards}'
    + '@keyframes ss-draw{to{stroke-dashoffset:0}}'

    /* drum */
    + '.ss-drum{background:none;border:none;cursor:pointer;padding:4px;min-height:58px;flex:0 0 auto;line-height:0}'
    + '.ss-drum.ss-hit{animation:ss-thump .18s ease}'
    + '@keyframes ss-thump{50%{transform:scale(.93)}}'
    + '.ss-again{font:600 14px/1 Nunito,system-ui,sans-serif;color:#146B5E;background:#FFF3DC;border:2px solid #146B5E33;'
    + 'border-radius:999px;padding:10px 16px;min-height:44px;cursor:pointer;flex:0 0 auto}'
    + '.ss-oralnote{font:italic 500 13px/1.45 Nunito,system-ui,sans-serif;color:#7A6A55;text-align:center;'
    + 'margin:0;max-width:min(380px,86vw)}'
    + '.ss-empty{font:500 15px/1.5 Nunito,system-ui,sans-serif;color:#7A6A55;padding:30px 10px}'

    /* build */
    + '.ss-build{display:flex;flex-direction:column;align-items:center;gap:12px}'
    + '.ss-hint{font:500 14px/1.4 Nunito,system-ui,sans-serif;color:#7A6A55;margin:0;text-align:center}'
    + '.ss-slots{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}'
    + '.ss-slot{min-width:64px;min-height:56px;border:3px dashed #146B5E44;border-radius:14px;background:#FFF9EE;'
    + 'font:700 clamp(18px,4.6vw,26px)/1 "Baloo 2",Nunito,system-ui,sans-serif;color:#3A3226;cursor:pointer;padding:6px 10px}'
    + '.ss-slot.ss-filled{border-style:solid;border-color:#146B5E;background:#FFFFFF}'
    + '.ss-tray{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}'
    + '.ss-piece{min-height:52px;border:2px solid #F2784B;border-radius:12px;background:#FFF6F1;'
    + 'font:700 clamp(17px,4.4vw,24px)/1 "Baloo 2",Nunito,system-ui,sans-serif;color:#3A3226;cursor:pointer;padding:8px 14px}'
    + '.ss-piece.ss-used{opacity:.3;cursor:default}'

    /* sort */
    + '.ss-sort{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%}'
    + '.ss-pens{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;width:100%}'
    + '.ss-pen{flex:1 1 150px;max-width:220px;min-height:120px;border:3px solid #146B5E33;border-radius:16px;'
    + 'background:#FFF9EE;padding:8px;display:flex;flex-direction:column;gap:6px}'
    + '.ss-pen.ss-over{border-color:#F2784B;background:#FFF3DC}'
    + '.ss-penlab{font:700 13px/1 Nunito,system-ui,sans-serif;color:#146B5E;text-align:center}'
    + '.ss-penslot{display:flex;flex-wrap:wrap;gap:5px;justify-content:center;min-height:70px}'
    + '.ss-pile{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;padding:8px;border-top:2px dashed #146B5E22;width:100%}'
    + '.ss-tile{width:74px;min-height:74px;background:#FFFDF7;border:2px solid #146B5E22;border-radius:12px;'
    + 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:4px;cursor:grab;touch-action:none}'
    + '.ss-tilepic{width:46px;height:auto;user-select:none;-webkit-user-drag:none;pointer-events:none}'
    + '.ss-tilecap{font:600 11px/1 Nunito,system-ui,sans-serif;color:#3A3226}'
    + '.ss-tile.ss-dragging{opacity:.35}'
    + '.ss-ghost{position:fixed;z-index:90;pointer-events:none;opacity:.92;box-shadow:0 8px 20px -8px #00000066}'

    /* panel + gate */
    + '.ss-nav{display:flex;gap:14px}'
    + '.ss-navbtn{width:48px;height:48px;border-radius:50%;border:2px solid #146B5E33;background:#FFF9EE;color:#146B5E;'
    + 'font:700 24px/1 Nunito,system-ui,sans-serif;cursor:pointer}'
    + '.ss-scrim{position:fixed;inset:0;background:#3A322680;display:flex;align-items:center;justify-content:center;padding:16px;z-index:70}'
    + '.ss-panel{background:#FFFDF7;border-radius:20px;max-width:520px;width:100%;max-height:82vh;overflow:auto;padding:16px;z-index:71}'
    + '.ss-panel-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}'
    + '.ss-panel-title{font:700 18px/1.2 "Baloo 2",Nunito,system-ui,sans-serif;color:#146B5E;margin:0}'
    + '.ss-panel-close{font:600 14px/1 Nunito,system-ui,sans-serif;color:#146B5E;background:#FFF3DC;border:2px solid #146B5E33;'
    + 'border-radius:999px;padding:9px 14px;min-height:44px;cursor:pointer}'
    + '.ss-sec{border-top:1px solid #146B5E1A;padding:10px 0}'
    + '.ss-secrow{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;background:none;'
    + 'border:none;cursor:pointer;padding:8px 4px;min-height:44px;text-align:left}'
    + '.ss-seclabel{font:700 15px/1.3 Nunito,system-ui,sans-serif;color:#3A3226}'
    + '.ss-lock{font:600 11px/1 Nunito,system-ui,sans-serif;color:#9A8F7E;background:#F3ECDD;border-radius:999px;padding:5px 9px;white-space:nowrap}'
    + '.ss-sec.ss-locked .ss-seclabel{color:#9A8F7E}'
    + '.ss-wordgrid{display:flex;flex-wrap:wrap;gap:6px;padding:4px 4px 0}'
    + '.ss-wordchip{font:600 14px/1 Nunito,system-ui,sans-serif;color:#3A3226;background:#FFF9EE;border:2px solid #146B5E22;'
    + 'border-radius:999px;padding:9px 13px;min-height:44px;cursor:pointer}'
    + '.ss-gate{background:#FFFDF7;border-radius:20px;max-width:420px;width:100%;padding:20px;text-align:center;z-index:71}'
    + '.ss-gate-line{font:600 16px/1.45 Nunito,system-ui,sans-serif;color:#3A3226;margin:0 0 14px}'
    + '.ss-gate-cta{display:inline-block;font:700 15px/1 Nunito,system-ui,sans-serif;color:#FFFDF7;background:#F2784B;'
    + 'border-radius:999px;padding:14px 22px;text-decoration:none;min-height:44px;box-sizing:border-box}'
    + '.ss-gate-close{display:block;margin:12px auto 0;font:600 14px/1 Nunito,system-ui,sans-serif;color:#7A6A55;'
    + 'background:none;border:none;cursor:pointer;min-height:44px}'
    + '.ss-siblings{font:500 13px/1.5 Nunito,system-ui,sans-serif;color:#7A6A55;text-align:center;margin-top:10px}'
    + '.ss-sib-link{color:#146B5E;text-decoration:underline}'

    + '@media (max-width:420px){'
    + '.ss-card{padding:14px 12px 12px;border-radius:18px}'
    + '.ss-pen{flex:1 1 100px;min-height:104px}'
    + '.ss-tile{width:64px;min-height:64px}'
    + '.ss-tilepic{width:38px}'
    + '}'
    + 'body.ss-wide{overflow-y:auto}'

    + '@media (prefers-reduced-motion:reduce){'
    + '.ss-arc{animation:none;stroke-dashoffset:0}'
    + '.ss-drum.ss-hit{animation:none}'
    + '}'

    + '@media print{'
    + '.ss-toprow,.ss-drum,.ss-again,.ss-nav,.ss-scrim,.ss-speak,.ss-siblings{display:none !important}'
    + '.ss-card{box-shadow:none;border:1.5pt solid #666;page-break-inside:avoid;break-inside:avoid}'
    + '.ss-wordrow{color:#000}'
    + '}';
  document.head.appendChild(st);
}
