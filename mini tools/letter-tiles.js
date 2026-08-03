/* =====================================================================
   TOOL #6 — LETTER TILES   (letter-tiles.js)
   ---------------------------------------------------------------------
   Free-play manipulative (no `tasks`). Tool #3 of the Premium Tools
   Program pilot wave — the ENCODING member of the phonics trio:
   Sound Boxes = segmenting · Blending Board = blending · Letter Tiles =
   the open magnetic board where the child spells.

   PEDAGOGY (locked by the 2026-07-16 expert-ensemble design):
     An open whiteboard with faint baseline rows; tiles snap to the
     nearest baseline (y) but sit freely in x; tiles that "kiss" a
     neighbour straighten to 0° while loose tiles keep a ±2° magnet
     jitter. Tap a tile = speak its ANCHOR WORD ("A → Affe") — the
     Anlauttabelle mechanism itself; NEVER letter names, NEVER isolated
     phonemes (the trio audio lock). Picture-alphabet tile faces
     (anchor image on every tile) default ON — the generalized
     Anlauttabelle, in 11 locales.
     The CHECK is manual, never automatic: it reads the active tile
     cluster aloud. Real words glow + badge (picture or tick). Unknown
     strings are simply READ (nonwordTTS-gated) — the open board is
     invented-spelling territory: no robot badge here, no red-X, no
     judgment of a child's authentic writing. Sensitive strings are
     inert (never spoken/badged — the shipped doctrine).
     Prompt mode deals picture cards from the sound-boxes bank (same
     stages teachers know); optional ghost sockets come 1:1 from the
     bank word's grapheme `boxes` — tool #1's segmentation data reused
     as tool #3's scaffold.

   DATA: letter-tiles-<locale>.json (tray inventory + curated anchors +
   extraWords + neverSpeak) + runtime merge with the sound-boxes bank
   displays and blending-deck real maps = the validation lexicon.
   ===================================================================== */
var LetterTiles = {
  id: 'letter-tiles',

  /* CURATION FLAG: reviewed per-locale during the native fan-out;
     sv/da/no/fi carry [NSR-FLAG] until a native-speaker pass. */
  strings: {
    title: {en:'Letter Tiles',de:'Magnetbuchstaben',fr:'Lettres magnétiques',it:'Lettere magnetiche',es:'Letras magnéticas',pt:'Alfabeto móvel',nl:'Letterdoos',sv:'Magnetbokstäver',da:'Magnetbogstaver',no:'Magnetbokstaver',fi:'Magneettikirjaimet'},
    instruction: {en:'Drag letters onto the board to build words. Tap a tile to hear its word.',de:'Ziehe Buchstaben auf die Tafel und baue Wörter. Tippe auf einen Buchstaben und höre sein Anlautwort.',fr:'Fais glisser les lettres sur le tableau pour former des mots. Touche une lettre pour entendre son mot.',it:'Trascina le lettere sulla lavagna e costruisci parole. Tocca una lettera per ascoltare la sua parola guida.',es:'Arrastra letras al tablero para formar palabras. Toca una letra para escuchar su palabra.',pt:'Arraste letras para o quadro e forme palavras. Toque em uma letra para ouvir a palavra dela.',nl:'Sleep letters naar het bord en bouw woorden. Tik op een letter en hoor het woordje dat erbij hoort.',sv:'Dra bokstäver till tavlan och bygg ord. Tryck på en bokstav så hör du dess ord.',da:'Træk bogstaver op på tavlen, og byg ord. Tryk på et bogstav, og hør dets ord.',no:'Dra bokstaver til tavla og bygg ord. Trykk på en bokstav og hør ordet som hører til.',fi:'Vedä kirjaimia taululle ja rakenna sanoja. Napauta kirjainta, niin kuulet sen sanan.'},

    /* settings */
    letterCase:   {en:'Letters',de:'Buchstaben',fr:'Lettres',it:'Lettere',es:'Letras',pt:'Letras',nl:'Letters',sv:'Bokstäver',da:'Bogstaver',no:'Bokstaver',fi:'Kirjaimet'},
    caseLower:    {en:'abc',de:'abc',fr:'abc',it:'abc',es:'abc',pt:'abc',nl:'abc',sv:'abc',da:'abc',no:'abc',fi:'abc'},
    caseUpper:    {en:'ABC',de:'ABC',fr:'ABC',it:'ABC',es:'ABC',pt:'ABC',nl:'ABC',sv:'ABC',da:'ABC',no:'ABC',fi:'ABC'},
    pictureAlphabet:{en:'Picture alphabet',de:'Anlautbilder',fr:'Alphabet illustré',it:'Alfabetiere',es:'Abecedario ilustrado',pt:'Abecedário ilustrado',nl:'Letterplaatjes',sv:'Bildalfabet',da:'Billedalfabet',no:'Bildealfabet',fi:'Kuva-aakkoset'},
    guides: {en:'Word card helpers',de:'Wortkarten-Hilfen',fr:'Aides pour les cartes',it:'Aiuti delle carte',es:'Ayudas de las tarjetas',pt:'Apoios dos cartões',nl:'Kaarthulpjes',sv:'Kortstöd',da:'Hjælp til ordkort',no:'Hjelp til ordkortene',fi:'Sanakorttien tuki'},
    guidesOff:    {en:'Open board',de:'Freie Tafel',fr:'Tableau libre',it:'Lavagna libera',es:'Tablero libre',pt:'Quadro livre',nl:'Vrij bord',sv:'Fri tavla',da:'Fri tavle',no:'Fri tavle',fi:'Vapaa taulu'},
    guidesBoxes: {en:'Letter boxes',de:'Buchstabenkästchen',fr:'Une case par lettre',it:'Caselle delle lettere',es:'Cajas de letras',pt:'Caixas de letras',nl:'Lettervakjes',sv:'Bokstavsrutor',da:'Bogstavbokse',no:'Bokstavbokser',fi:'Kirjainlaatikot'},
    tileSound: {en:'Anchor words on tap',de:'Anlautwörter beim Tippen',fr:'Mots-repères au toucher',it:'Parole guida al tocco',es:'Palabra guía al tocar',pt:'Palavra-chave ao tocar',nl:'Woord bij de letter',sv:'Bokstavens ord vid tryck',da:'Forlydsord ved tryk',no:'Ord til bokstavene',fi:'Kirjainten sanat'},
    speakOnCheck: {en:'Say the word on check',de:'Wort beim Prüfen vorsprechen',fr:'Dire le mot quand on vérifie',it:'Pronuncia la parola al controllo',es:'Decir la palabra al revisar',pt:'Falar a palavra ao conferir',nl:'Woord voorlezen bij het nakijken',sv:'Säg ordet vid kontroll',da:'Sig ordet ved tjek',no:'Les ordet høyt ved sjekk',fi:'Sano sana tarkistettaessa'},

    /* stage + panel */
    freeBuild: {en:'Free build',de:'Freies Bauen',fr:'Construction libre',it:'Costruzione libera',es:'Construcción libre',pt:'Construção livre',nl:'Vrij bouwen',sv:'Fritt bygge',da:'Byg frit',no:'Fri bygging',fi:'Vapaa rakentelu'},
    wordCards: {en:'Word cards',de:'Wortkarten',fr:'Cartes de mots',it:'Carte delle parole',es:'Tarjetas de palabras',pt:'Cartões de palavras',nl:'Woordkaarten',sv:'Ordkort',da:'Ordkort',no:'Ordkort',fi:'Sanakortit'},
    myWordsTab:   {en:'My words',de:'Meine Wörter',fr:'Mes mots',it:'Le mie parole',es:'Mis palabras',pt:'Minhas palavras',nl:'Mijn woorden',sv:'Mina ord',da:'Mine ord',no:'Mine ord',fi:'Omat sanat'},
    cardOf: {en:'card {i}/{n}',de:'Karte {i}/{n}',fr:'carte {i}/{n}',it:'carta {i}/{n}',es:'tarjeta {i}/{n}',pt:'cartão {i}/{n}',nl:'kaart {i}/{n}',sv:'kort {i}/{n}',da:'kort {i}/{n}',no:'kort {i}/{n}',fi:'kortti {i}/{n}'},
    checkWord:    {en:'Read the word',de:'Wort vorlesen',fr:'Lire le mot',it:'Leggi la parola',es:'Leer la palabra',pt:'Ler a palavra',nl:'Woord voorlezen',sv:'Läs ordet',da:'Læs ordet',no:'Les ordet',fi:'Lue sana'},
    nextCard: {en:'Next card',de:'Nächste Karte',fr:'Carte suivante',it:'Carta successiva',es:'Tarjeta siguiente',pt:'Próximo cartão',nl:'Volgende kaart',sv:'Nästa kort',da:'Næste kort',no:'Neste kort',fi:'Seuraava kortti'},
    hearCard:     {en:'Hear the word',de:'Wort anhören',fr:'Écouter le mot',it:'Ascolta la parola',es:'Escuchar la palabra',pt:'Ouvir a palavra',nl:'Woord beluisteren',sv:'Hör ordet',da:'Hør ordet',no:'Hør ordet',fi:'Kuuntele sana'},
    closePrompt: {en:'Back to free build',de:'Zurück zum freien Bauen',fr:'Retour au tableau libre',it:'Torna alla lavagna libera',es:'Volver al tablero libre',pt:'Voltar à construção livre',nl:'Terug naar vrij bouwen',sv:'Tillbaka till fritt bygge',da:'Tilbage til den frie tavle',no:'Tilbake til fri bygging',fi:'Takaisin vapaaseen rakenteluun'},
    myWordsHint: {en:'Type this week’s words — one per line.',de:'Geben Sie die Wörter der Woche ein – ein Wort pro Zeile.',fr:'Saisissez les mots de la semaine – un par ligne.',it:'Scrivi le parole della settimana: una per riga.',es:'Escribe las palabras de la semana: una por línea.',pt:'Digite as palavras da semana — uma por linha.',nl:'Typ de woorden van deze week – één per regel.',sv:'Skriv veckans ord – ett per rad.',da:'Skriv ugens ord – ét pr. linje.',no:'Skriv ukens ord – ett per linje.',fi:'Kirjoita viikon sanat – yksi sana riville.'},
    addWords:     {en:'Add words',de:'Wörter hinzufügen',fr:'Ajouter les mots',it:'Aggiungi parole',es:'Agregar palabras',pt:'Adicionar palavras',nl:'Woorden toevoegen',sv:'Lägg till ord',da:'Tilføj ord',no:'Legg til ord',fi:'Lisää sanat'},
    useTheseCards: {en:'Use these cards',de:'Diese Karten verwenden',fr:'Utiliser ces cartes',it:'Usa queste carte',es:'Usar estas tarjetas',pt:'Usar estes cartões',nl:'Deze kaarten gebruiken',sv:'Använd dessa kort',da:'Brug disse kort',no:'Bruk disse kortene',fi:'Käytä näitä kortteja'},
    premiumLine: {en:'Custom word cards and pinned boards are part of Premium — the board and starter cards are always free.',de:'Eigene Wortkarten und gespeicherte Tafeln gehören zu Premium – Tafel und Startkarten bleiben immer kostenlos.',fr:'Les cartes personnalisées et les tableaux épinglés font partie de Premium – le tableau et les cartes de départ restent gratuits.',it:'Le carte personalizzate e le lavagne salvate fanno parte di Premium: lavagna e carte iniziali restano gratuite.',es:'Las tarjetas personalizadas y los tableros guardados son parte de Premium: el tablero y las tarjetas iniciales siempre son gratis.',pt:'Cartões personalizados e quadros fixados fazem parte do Premium — o quadro e os cartões iniciais são sempre gratuitos.',nl:'Eigen woordkaarten en vastgezette borden horen bij Premium – het bord en de startkaarten blijven altijd gratis.',sv:'Egna ordkort och sparade tavlor ingår i Premium – tavlan och startkorten är alltid gratis.',da:'Egne ordkort og gemte tavler er en del af Premium – tavlen og startkortene er altid gratis.',no:'Egne ordkort og lagrede tavler er en del av Premium – tavla og startkortene er alltid gratis.',fi:'Omat sanakortit ja tallennetut taulut kuuluvat Premiumiin – taulu ja aloituskortit ovat aina ilmaisia.'},
    unlockLine: {en:'Unlock all word cards',de:'Alle Wortkarten freischalten',fr:'Débloquer toutes les cartes',it:'Sblocca tutte le carte',es:'Desbloquear todas las tarjetas',pt:'Desbloquear todos os cartões',nl:'Alle woordkaarten ontgrendelen',sv:'Lås upp alla ordkort',da:'Lås alle ordkort op',no:'Lås opp alle ordkort',fi:'Avaa kaikki sanakortit'},
    lockedLabel:  {en:'Premium',de:'Premium',fr:'Premium',it:'Premium',es:'Premium',pt:'Premium',nl:'Premium',sv:'Premium',da:'Premium',no:'Premium',fi:'Premium'},
    copyLink: {en:'Copy link to this card',de:'Link zu dieser Karte kopieren',fr:'Copier le lien vers cette carte',it:'Copia il link a questa carta',es:'Copiar el enlace de esta tarjeta',pt:'Copiar link deste cartão',nl:'Link naar deze kaart kopiëren',sv:'Kopiera länk till kortet',da:'Kopiér link til kortet',no:'Kopier lenke til kortet',fi:'Kopioi linkki korttiin'},
    copied:       {en:'Link copied!',de:'Link kopiert!',fr:'Lien copié !',it:'Link copiato!',es:'¡Enlace copiado!',pt:'Link copiado!',nl:'Link gekopieerd!',sv:'Länk kopierad!',da:'Link kopieret!',no:'Lenke kopiert!',fi:'Linkki kopioitu!'},
    trioLabel: {en:'Phonics tools:',de:'Werkzeuge zum Lesenlernen:',fr:'Outils de phonologie :',it:'Strumenti fonologici:',es:'Herramientas de conciencia fonológica:',pt:'Ferramentas de alfabetização:',nl:'Klankhulpjes:',sv:'Ljudverktyg:',da:'Lydværktøjer:',no:'Lydverktøy:',fi:'Äännetyökalut:'},
    siblingSbx:   {en:'Sound Boxes',de:'Lautboxen',fr:'Boîtes à sons',it:'Caselle dei suoni',es:'Cajas de sonidos',pt:'Caixas de sons',nl:'Klankdozen',sv:'Ljudrutor',da:'Lydbokse',no:'Lydbokser',fi:'Äännelaatikot'},
    siblingBbd:   {en:'Blending Board',de:'Lesemaschine',fr:'Tableau de syllabes',it:'Tabellone delle sillabe',es:'Tablero de sílabas',pt:'Quadro de sílabas',nl:'Klankenbord',sv:'Ljudtavla',da:'Lydtavle',no:'Lydtavle',fi:'Tavutaulu'},
    siblingHwd: {en:'Heart Words',de:'Merkwörter',fr:'Mots à cœur',it:'Parole del cuore',es:'Palabras con corazón',pt:'Palavras de coração',nl:'Hartwoorden',sv:'Hjärteord',da:'Hjerteord',no:'Hjerteord'},
    moreTiles:    {en:'More letters',de:'Mehr Buchstaben',fr:'Plus de lettres',it:'Altre lettere',es:'Más letras',pt:'Mais letras',nl:'Meer letters',sv:'Fler bokstäver',da:'Flere bogstaver',no:'Flere bokstaver',fi:'Lisää kirjaimia'},
    isReal: {en:'{w} — a real word!',de:'{w} – ein echtes Wort!',fr:'{w} — un vrai mot !',it:'{w} — una parola vera!',es:'¡{w} es una palabra real!',pt:'{w} — uma palavra de verdade!',nl:'{w} — een echt woord!',sv:'{w} — ett riktigt ord!',da:'{w} — et rigtigt ord!',no:'{w} — et ekte ord!',fi:'{w} — oikea sana!'},
    cardMatch: {en:'Yes! {w}!',de:'Ja! {w}!',fr:'Oui ! {w} !',it:'Sì! {w}!',es:'¡Sí! ¡{w}!',pt:'Sim! {w}!',nl:'Ja! {w}!',sv:'Ja! {w}!',da:'Ja! {w}!',no:'Ja! {w}!',fi:'Juuri niin! {w}!'},
    lookAgain: {en:'Listen again and check your letters.',de:'Hör noch einmal und prüfe deine Buchstaben.',fr:'Écoute encore et vérifie tes lettres.',it:'Ascolta di nuovo e controlla le lettere.',es:'Escucha otra vez y revisa tus letras.',pt:'Ouça de novo e confira as letras.',nl:'Luister nog eens en kijk goed naar je letters.',sv:'Lyssna igen och titta på dina bokstäver.',da:'Lyt igen og se på dine bogstaver.',no:'Lytt igjen og se på bokstavene dine.',fi:'Kuuntele uudelleen ja tarkista kirjaimet.'},
    tileOnBoard:  {en:'{g} placed. The word is now: {w}.',de:'{g} gelegt. Das Wort ist jetzt: {w}.',fr:'{g} posé. Le mot est maintenant : {w}.',it:'{g} messa. La parola ora è: {w}.',es:'{g} colocada. La palabra ahora es: {w}.',pt:'{g} colocada. A palavra agora é: {w}.',nl:'{g} gelegd. Het woord is nu: {w}.',sv:'{g} lagd. Ordet är nu: {w}.',da:'{g} lagt. Ordet er nu: {w}.',no:'{g} lagt. Ordet er nå: {w}.',fi:'{g} asetettu. Sana on nyt: {w}.'},
    tileRemoved: {en:'{g} back in the tray.',de:'{g} zurück in den Kasten.',fr:'{g} de retour dans le bac.',it:'{g} di nuovo nella scatola.',es:'{g} de vuelta a la bandeja.',pt:'{g} de volta à bandeja.',nl:'{g} terug in de doos.',sv:'{g} tillbaka i lådan.',da:'{g} tilbage i bakken.',no:'{g} tilbake i boksen.',fi:'{g} takaisin laatikkoon.'},
    loading:      {en:'Loading letters…',de:'Buchstaben werden geladen…',fr:'Chargement des lettres…',it:'Caricamento lettere…',es:'Cargando letras…',pt:'Carregando letras…',nl:'Letters laden…',sv:'Laddar bokstäver…',da:'Indlæser bogstaver…',no:'Laster bokstaver…',fi:'Ladataan kirjaimia…'}
  },

  defaults: {
    letterCase: 'lower', pictureAlphabet: true, guides: 'boxes',
    tileSound: true, speakOnCheck: true
  },

  settings: [
    { key:'letterCase', type:'choice', labelKey:'letterCase', options:[
        { value:'lower', labelKey:'caseLower' },
        { value:'upper', labelKey:'caseUpper' }
    ]},
    { key:'pictureAlphabet', type:'toggle', labelKey:'pictureAlphabet' },
    { key:'guides', type:'choice', labelKey:'guides', options:[
        { value:'boxes', labelKey:'guidesBoxes' },
        { value:'off',   labelKey:'guidesOff'   }
    ]},
    { key:'tileSound',    type:'toggle', labelKey:'tileSound'    },
    { key:'speakOnCheck', type:'toggle', labelKey:'speakOnCheck' }
  ],

  PITCHES: [523, 587, 659, 698, 784],
  STORE_KEY: 'lcs:letter-tiles:v1',

  FALLBACK_DATA: {
    locale: 'en', version: 0, nonwordTTS: false,
    tray: 'abcdefghijklmnopqrstuvwxyz'.split('').map(function (ch) {
      return { g: ch, kind: 'aeiou'.indexOf(ch) >= 0 ? 'vowel' : 'consonant', anchor: null };
    }),
    extraWords: { cat: {}, dog: {}, sun: {}, hat: {}, pig: {}, and: {}, the: {} },
    neverSpeak: [], comboAudit: 'inline fallback'
  },

  /* =========================== lifecycle =========================== */

  init: function (api) {
    this.api = api;
    /* correct hyphenation for long compound titles (fi Magneettikirjaimet,
       de Magnetbuchstaben) — pairs with the scoped .lcs-title override */
    try { document.documentElement.lang = api.lang; } catch (_) {}
    this.data = null;
    this.bank = null;        /* sound-boxes bank (prompt cards + lexicon) */
    this.lexicon = {};       /* word -> {noun?, themeDir?} */
    this.inert = {};         /* sensitive ∪ neverSpeak */
    this.boardTiles = [];    /* {id,g,x(0-1000),row,rot,el} */
    this.mode = 'free';      /* 'free' | 'prompt' */
    this.listId = null;      /* bank stage id | 'custom' */
    this.cardIdx = 0;
    this.premium = false;
    this._z = 10;
    this._tileSeq = 0;
    this._activeId = null;   /* last-touched board tile id */
    this._panelTab = 'cards';
    this._sheetOpen = false;

    this._store = this._loadStore();
    var saved = this._store.settings || {};
    for (var k in saved) {
      if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];
    }
    var params = new URLSearchParams(location.search);
    this._deepList = params.get('list');
    this._deepCard = params.get('card');

    this._fetchAll();
    this._fetchEntitlement();
  },

  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY)) || {}; }
    catch (_) { return {}; }
  },
  _saveStore: function () {
    var s = this._store;
    s.board = { tiles: this.boardTiles.map(function (t) { return { g: t.g, x: t.x, row: t.row, rot: t.rot }; }), updatedAt: new Date().toISOString() };
    s.mode = this.mode;
    s.lastListId = this.listId;
    s.lastCardIdx = this.cardIdx;
    s.settings = {};
    for (var i = 0; i < this.settings.length; i++) {
      var key = this.settings[i].key;
      s.settings[key] = this.api.settings[key];
    }
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(s)); } catch (_) {}
  },

  _fetchAll: function () {
    var self = this, lang = this.api.lang;
    var got = { tiles: false };
    fetch('/mini-tools/letter-tiles-' + lang + '.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .catch(function () { return self.FALLBACK_DATA; })
      .then(function (d) {
        self.data = d;
        self._mergeLexicon(d.extraWords || {}, null);
        (d.neverSpeak || []).forEach(function (w) { self.inert[w] = true; });
        self._applyEntryState();
        self.render();
      });
    fetch('/mini-tools/sound-boxes-bank-' + lang + '.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (b) {
        if (!b) return;
        self.bank = b;
        (b.words || []).forEach(function (w) {
          var key = String(w.display).toLowerCase();
          var sens = w.flags && w.flags.indexOf('sensitive') >= 0;
          if (sens) { self.inert[key] = true; return; }
          self.lexicon[key] = self.lexicon[key] || { noun: w.noun, themeDir: w.themeDir };
        });
        /* the prompt card + deep-linked card need the bank */
        if (self._deepListPending && self.data) {
          var cards = self._cards();
          for (var ci = 0; ci < cards.length; ci++) if (cards[ci].id === self._deepListPending) { self.cardIdx = ci; break; }
          self._deepListPending = null;
        }
        if (self.mode === 'prompt' && self._slotEl) {
          self._renderSlot();
          self._renderSockets();
          self._refreshPill();
        }
        if (self._panelEl) self._renderPanel();
      });
    fetch('/mini-tools/blending-board-deck-' + lang + '.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (dk) {
        if (!dk) return;
        (dk.decks || []).forEach(function (deck) {
          var real = deck.real || {};
          for (var w in real) {
            var key = w.toLowerCase();
            if (real[w].flags && real[w].flags.indexOf('sensitive') >= 0) { self.inert[key] = true; continue; }
            if (!self.lexicon[key]) self.lexicon[key] = real[w].noun ? { noun: real[w].noun, themeDir: real[w].themeDir } : {};
          }
        });
      });
  },

  _mergeLexicon: function (words) {
    for (var w in words) {
      var e = words[w];
      if (e && e.flags && e.flags.indexOf('sensitive') >= 0) { this.inert[w] = true; continue; }
      if (!this.lexicon[w]) this.lexicon[w] = (e && e.noun) ? { noun: e.noun, themeDir: e.themeDir } : {};
    }
  },

  _applyEntryState: function () {
    var s = this._store;
    /* board resume */
    if (s.board && Array.isArray(s.board.tiles)) {
      var self = this;
      this.boardTiles = s.board.tiles
        .filter(function (t) { return t && t.g; })
        .map(function (t) { return { id: 'r' + (self._tileSeq++), g: t.g, x: t.x || 100, row: t.row || 0, rot: typeof t.rot === 'number' ? t.rot : self._jitter() }; });
    }
    /* prompt resume / deep link */
    if (this._deepList) { this.mode = 'prompt'; this.listId = this._deepList; }
    else if (s.mode === 'prompt' && s.lastListId) { this.mode = 'prompt'; this.listId = s.lastListId; this.cardIdx = s.lastCardIdx || 0; }
    this._deepListPending = this._deepCard;
  },

  _fetchEntitlement: function () {
    var self = this;
    var token = null;
    try { token = localStorage.getItem('accessToken'); } catch (_) {}
    if (!token) { return; }
    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        var tier = j && j.user && j.user.subscriptionTier;
        var sub = j && j.subscription;
        self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
        if (self._panelEl) self._renderPanel();
      })
      .catch(function () {});
  },

  /* ============================ helpers ============================ */

  fmt: function (key, args) {
    var s = this.api.t(key);
    return s.replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; });
  },
  imgUrl: function (e) { return '/image-library-webp/themes/' + e.themeDir + '/' + e.noun + '@2x.webp'; },
  _jitter: function () { return (Math.random() * 4 - 2); },
  _reducedMotion: function () {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  _vowelSet: function () {
    var set = {};
    (this.data && this.data.tray || []).forEach(function (t) { if (t.kind === 'vowel') set[t.g.toLowerCase()] = true; });
    return set;
  },
  _trayEntry: function (g) {
    var tray = (this.data && this.data.tray) || [];
    for (var i = 0; i < tray.length; i++) if (tray[i].g === g) return tray[i];
    return null;
  },
  _isWarm: function (entry) {
    if (!entry) return false;
    if (entry.kind === 'vowel') return true;
    if (entry.kind === 'digraph') return !!entry.warm;
    return false;
  },

  /* prompt cards: bank words of the current stage, or custom */
  _cards: function () {
    if (this.listId === 'custom') {
      return (this._store.myWords || []).map(function (w, i) {
        return { id: 'custom-' + i, display: w.text, boxes: null, noun: null, themeDir: null };
      });
    }
    var self = this;
    return ((this.bank && this.bank.words) || []).filter(function (w) { return w.stage === self.listId; });
  },
  currentCard: function () {
    var cards = this._cards();
    if (!cards.length) return null;
    if (this.cardIdx >= cards.length) this.cardIdx = 0;
    return cards[this.cardIdx];
  },
  _stageUnlocked: function (st) { return !!(st && (st.free || this.premium)); },

  /* ============================ render ============================== */

  render: function () {
    var api = this.api, self = this;
    var stage = api.stage;
    stage.innerHTML = '';
    document.body.classList.add('ltl-wide');

    var wrap = api.el('div', 'ltl-wrap');
    stage.appendChild(wrap);
    this._wrap = wrap;

    if (!this.data) {
      var load = api.el('div', 'ltl-loading');
      load.textContent = api.t('loading');
      wrap.appendChild(load);
      return;
    }

    /* deep-linked card index (after bank load) */
    if (this._deepListPending && this.bank) {
      var cards = this._cards();
      for (var ci = 0; ci < cards.length; ci++) if (cards[ci].id === this._deepListPending) { this.cardIdx = ci; break; }
      this._deepListPending = null;
    }

    /* ---- mode pill ---- */
    var pillRow = api.el('div', 'ltl-pillrow');
    var pill = api.el('button', 'ltl-pill');
    pill.type = 'button';
    if (this.mode === 'prompt') {
      var st = this._stageById(this.listId);
      var label = this.listId === 'custom' ? api.t('myWordsTab') : (st ? st.label : '');
      pill.textContent = label + '  ·  ' + this.fmt('cardOf', { i: this.cardIdx + 1, n: this._cards().length });
    } else {
      pill.textContent = api.t('freeBuild');
    }
    pill.setAttribute('aria-label', api.t('wordCards'));
    pill.addEventListener('click', function () { self._openPanel(); });
    pillRow.appendChild(pill);
    wrap.appendChild(pillRow);

    /* ---- card slot (prompt card OR check badge) ---- */
    var slot = api.el('div', 'ltl-slot');
    wrap.appendChild(slot);
    this._slotEl = slot;
    this._renderSlot();

    /* ---- board ---- */
    var board = api.el('div', 'ltl-board');
    board.setAttribute('role', 'group');
    board.setAttribute('aria-label', api.t('title'));
    wrap.appendChild(board);
    this._boardEl = board;

    var check = api.el('button', 'ltl-check');
    check.type = 'button';
    check.setAttribute('aria-label', api.t('checkWord'));
    check.title = api.t('checkWord');
    check.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 6l1.2 2.4L21 9.6l-2.8 1.2L17 13l-1.2-2.2L13 9.6l2.8-1.2z" fill="currentColor" stroke="none"/></svg>';
    check.addEventListener('click', function () { self.check(); });
    board.appendChild(check);

    /* underline for the active cluster */
    var under = api.el('div', 'ltl-underline');
    under.setAttribute('aria-hidden', 'true');
    board.appendChild(under);
    this._underEl = under;

    /* sockets container (prompt scaffold) */
    var sockets = api.el('div', 'ltl-sockets');
    sockets.setAttribute('aria-hidden', 'true');
    board.appendChild(sockets);
    this._socketsEl = sockets;

    /* ---- tray ---- */
    var trayWrap = api.el('div', 'ltl-traywrap');
    var tray = api.el('div', 'ltl-tray');
    tray.setAttribute('role', 'toolbar');
    tray.setAttribute('aria-label', api.t('moreTiles'));
    this._trayEl = tray;
    this._buildTray(tray);
    trayWrap.appendChild(tray);
    var sheetBtn = api.el('button', 'ltl-sheetbtn');
    sheetBtn.type = 'button';
    sheetBtn.setAttribute('aria-label', api.t('moreTiles'));
    sheetBtn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>';
    sheetBtn.addEventListener('click', function () { self._toggleSheet(); });
    trayWrap.appendChild(sheetBtn);
    wrap.appendChild(trayWrap);

    /* rebuild board tiles from state */
    requestAnimationFrame(function () {
      self._layoutMetrics();
      self.boardTiles.forEach(function (t) { self._mountTile(t); });
      self._renderSockets();
      self.paint();
    });

    /* keyboard */
    if (!this._keysBound) {
      this._keysBound = true;
      document.addEventListener('keydown', function (e) {
        if (e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
        if (self._panelEl && self._panelEl.classList.contains('open')) return;
        if (e.key === 'c' || e.key === 'C') self.check();
      });
    }
  },

  _layoutMetrics: function () {
    var b = this._boardEl;
    if (!b) return;
    var h = b.clientHeight || 320;
    var tile = Math.max(44, Math.min(84, Math.round(window.innerWidth * 0.085)));
    this._tileH = tile;
    this._rowPitch = tile + 18;
    this._rowCount = Math.max(2, Math.floor(h / this._rowPitch));
    b.style.setProperty('--ltl-row', this._rowPitch + 'px');
    b.style.setProperty('--ltl-tile', tile + 'px');
  },

  paint: function () {
    /* body-level classes so the tray sheet + fly clones (outside the
       wrap) re-case and show/hide anchors too */
    document.body.classList.toggle('ltl-upper', this.api.settings.letterCase === 'upper');
    document.body.classList.toggle('ltl-anlaut', !!this.api.settings.pictureAlphabet);
    this._paintUnderline();
    this._saveStore();
  },

  reset: function () {
    /* sweep the board clear — tiles fly home (or vanish under reduced motion) */
    var self = this;
    this.boardTiles.slice().forEach(function (t) { self._removeTile(t, true); });
    this.boardTiles = [];
    this._clearBadge();
    this._paintUnderline();
    this._saveStore();
  },

  onSettings: function () { this._saveStore(); },

  /* ====================== tray + tile faces ======================== */

  _tileFaceHTML: function (entry) {
    var api = this.api;
    var g = entry.g;
    var warm = this._isWarm(entry);
    var multi = g.length > 1;
    var anchor = entry.anchor;
    var img = (anchor && api.settings.pictureAlphabet !== false)
      ? '<img class="ltl-anchor" src="' + this.imgUrl(anchor) + '" alt="" draggable="false">'
      : '';
    var tie = multi
      ? '<svg class="ltl-tie" viewBox="0 0 60 12" aria-hidden="true"><path d="M4 2 Q30 14 56 2" fill="none" stroke="#F2784B" stroke-width="3" stroke-linecap="round"/></svg>'
      : '';
    return '<span class="ltl-face' + (warm ? ' warm' : '') + (multi ? ' multi' : '') + '">' +
           img + '<span class="ltl-face-txt">' + g + '</span>' + tie + '</span>';
  },

  _buildTray: function (tray) {
    var api = this.api, self = this;
    tray.innerHTML = '';
    var groups = { letters: [], digraphs: [] };
    (this.data.tray || []).forEach(function (t) {
      (t.kind === 'digraph' ? groups.digraphs : groups.letters).push(t);
    });
    var addTile = function (into) {
      return function (entry) {
        var el = api.el('button', 'ltl-traytile' + (self._isWarm(entry) ? ' warm' : '') + (entry.anchor ? '' : ' quiet'));
        el.type = 'button';
        el.setAttribute('data-g', entry.g);
        el.setAttribute('aria-label', entry.g + (entry.anchor ? ' — ' + entry.anchor.word : ''));
        el.innerHTML = self._tileFaceHTML(entry);
        self._attachTrayGesture(el, entry);
        el.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); self._placeAuto(entry.g); }
        });
        into.appendChild(el);
      };
    };
    /* two group containers, no divider element — a wrapped digraph row
       never drags a stray separator mark along */
    var gLetters = api.el('span', 'ltl-group');
    groups.letters.forEach(addTile(gLetters));
    tray.appendChild(gLetters);
    if (groups.digraphs.length) {
      var gDigraphs = api.el('span', 'ltl-group ltl-group-digraphs');
      groups.digraphs.forEach(addTile(gDigraphs));
      tray.appendChild(gDigraphs);
    }
  },

  /* tray gesture: tap = anchor word; drag = clone onto the board;
     phone: horizontal move scrolls the tray (axis lock) */
  _attachTrayGesture: function (el, entry) {
    var self = this;
    var drag = null;
    el.addEventListener('pointerdown', function (e) {
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, axis: null, clone: null, scrollStart: self._trayEl.scrollLeft };
      try { el.setPointerCapture(e.pointerId); } catch (_) {}
    });
    el.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!drag.axis && Math.hypot(dx, dy) > 10) {
        drag.axis = (Math.abs(dx) > Math.abs(dy) && self._trayEl.scrollWidth > self._trayEl.clientWidth) ? 'scroll' : 'drag';
      }
      if (drag.axis === 'scroll') {
        self._trayEl.scrollLeft = drag.scrollStart - dx;
      } else if (drag.axis === 'drag') {
        if (!drag.clone) {
          var r = el.getBoundingClientRect();
          var clone = document.createElement('div');
          clone.className = 'ltl-fly';
          clone.innerHTML = self._tileFaceHTML(entry);
          clone.style.left = r.left + 'px'; clone.style.top = r.top + 'px';
          clone.style.width = r.width + 'px'; clone.style.height = r.height + 'px';
          document.body.appendChild(clone);
          drag.clone = clone;
        }
        drag.clone.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(1.1)';
      }
    });
    var up = function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var d = drag; drag = null;
      if (d.clone) {
        d.clone.remove();
        var br = self._boardEl.getBoundingClientRect();
        if (e.clientX >= br.left && e.clientX <= br.right && e.clientY >= br.top && e.clientY <= br.bottom) {
          self._dropNew(entry.g, e.clientX, e.clientY);
        }
      } else if (!d.axis) {
        /* tap: anchor word */
        self._tapTile(entry, el);
      }
    };
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
  },

  _tapTile: function (entry, el) {
    var api = this.api;
    el.classList.remove('ltl-wiggle');
    void el.offsetWidth;
    el.classList.add('ltl-wiggle');
    if (entry.anchor && api.settings.tileSound) {
      LCSAudio.speak({ type: 'word', text: entry.anchor.word, lang: api.lang });
      api.announce(entry.g + ' — ' + entry.anchor.word);
    } else {
      api.announce(entry.g);
    }
    api.track('tap', { g: entry.g });
  },

  /* ======================= board engine ============================ */

  _boardW: function () { return this._boardEl ? this._boardEl.clientWidth : 600; },

  _tileWFor: function (g) {
    /* approximate width: square for single letters, wider for digraphs */
    return g.length > 1 ? Math.round(this._tileH * (0.8 + 0.45 * g.length)) : this._tileH;
  },

  _xToPx: function (x) { return x / 1000 * this._boardW(); },
  _pxToX: function (px) { return Math.max(0, Math.min(1000, Math.round(px / this._boardW() * 1000 / 4) * 4)); },

  _dropNew: function (g, clientX, clientY) {
    var br = this._boardEl.getBoundingClientRect();
    var row = Math.max(0, Math.min(this._rowCount - 1, Math.floor((clientY - br.top) / this._rowPitch)));
    var x = this._pxToX(clientX - br.left - this._tileWFor(g) / 2);
    var t = { id: 'b' + (this._tileSeq++), g: g, x: x, row: row, rot: this._jitter() };
    this.boardTiles.push(t);
    this._settle(t);
    this._mountTile(t);
    this._activeId = t.id;
    this.api.sound(t.kissed ? 523 : 392);
    this._clearBadge();
    this._paintUnderline();
    this.api.announce(this.fmt('tileOnBoard', { g: g, w: this._clusterWord(this._activeCluster()) }));
    this.api.track('place', { g: g });
    this._saveStore();
  },

  /* snap y→row (given), kiss-snap x against same-row neighbours,
     resolve overlaps; sets t.kissed + straightens rotation when kissed */
  _settle: function (t) {
    var self = this;
    var w = this._tileWFor(t.g);
    var px = this._xToPx(t.x);
    var others = this.boardTiles.filter(function (o) { return o !== t && o.row === t.row; })
      .sort(function (a, b) { return a.x - b.x; });
    t.kissed = false;

    /* socket snap (prompt scaffold) has priority */
    if (this._socketRects) {
      for (var s = 0; s < this._socketRects.length; s++) {
        var sr = this._socketRects[s];
        if (sr.row === t.row && Math.abs(this._xToPx(t.x) + w / 2 - sr.cx) < 30) {
          t.x = this._pxToX(sr.cx - w / 2);
          t.kissed = true;
          t.rot = 0;
          return;
        }
      }
    }

    for (var i = 0; i < others.length; i++) {
      var o = others[i];
      var ow = this._tileWFor(o.g);
      var oPx = this._xToPx(o.x);
      /* kiss right side of o */
      if (Math.abs(px - (oPx + ow + 6)) < w * 0.35) { px = oPx + ow + 6; t.kissed = true; break; }
      /* kiss left side of o */
      if (Math.abs((px + w + 6) - oPx) < w * 0.35) { px = oPx - w - 6; t.kissed = true; break; }
      /* ANY overlap resolves to the nearest kiss side — letters never stack */
      var overlap = Math.min(px + w, oPx + ow) - Math.max(px, oPx);
      if (overlap > 0) {
        var newCenter = px + w / 2, oCenter = oPx + ow / 2;
        px = newCenter < oCenter ? oPx - w - 6 : oPx + ow + 6;
        t.kissed = true;
        break;
      }
    }
    px = Math.max(4, Math.min(this._boardW() - w - 4, px));
    t.x = this._pxToX(px);
    if (t.kissed) t.rot = 0;
    else if (t.rot === 0) t.rot = this._jitter();
    /* straighten neighbours that now kiss this tile */
    others.forEach(function (o) {
      var ow = self._tileWFor(o.g), oPx = self._xToPx(o.x), tPx = self._xToPx(t.x);
      if (Math.abs(oPx + ow + 6 - tPx) < 2 || Math.abs(tPx + w + 6 - oPx) < 2) { o.rot = 0; if (o.el) self._positionTile(o); }
    });
  },

  _mountTile: function (t) {
    var api = this.api, self = this;
    var entry = this._trayEntry(t.g) || { g: t.g, kind: 'consonant', anchor: null };
    var el = api.el('button', 'ltl-tile' + (this._isWarm(entry) ? ' warm' : ''));
    el.type = 'button';
    el.setAttribute('data-id', t.id);
    el.setAttribute('aria-label', t.g);
    el.innerHTML = this._tileFaceHTML(entry);
    t.el = el;
    this._positionTile(t);
    if (!this._reducedMotion()) {
      el.classList.add('ltl-settle');
      setTimeout(function () { el.classList.remove('ltl-settle'); }, 260);
    }
    this._attachBoardGesture(el, t, entry);
    el.addEventListener('keydown', function (e) {
      var step = 12;
      if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); self._removeTile(t); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); t.x = Math.max(0, t.x - self._pxToX(step)); self._settle(t); self._positionTile(t); self._afterMove(t); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); t.x = Math.min(1000, t.x + self._pxToX(step)); self._settle(t); self._positionTile(t); self._afterMove(t); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); t.row = Math.max(0, t.row - 1); self._settle(t); self._positionTile(t); self._afterMove(t); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); t.row = Math.min(self._rowCount - 1, t.row + 1); self._settle(t); self._positionTile(t); self._afterMove(t); }
    });
    this._boardEl.appendChild(el);
  },

  _positionTile: function (t) {
    if (!t.el) return;
    t.el.style.left = this._xToPx(t.x) + 'px';
    t.el.style.top = (t.row * this._rowPitch + 9) + 'px';
    t.el.style.zIndex = String(this._z);
    t.el.style.setProperty('--ltl-rot', (this._reducedMotion() ? 0 : t.rot) + 'deg');
  },

  _afterMove: function (t) {
    this._activeId = t.id;
    this._clearBadge();
    this._paintUnderline();
    this.api.sound(t.kissed ? 523 : 392);
    this._saveStore();
  },

  _attachBoardGesture: function (el, t, entry) {
    var self = this;
    var drag = null;
    el.addEventListener('pointerdown', function (e) {
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: false, startX: t.x, startRow: t.row };
      self._z++;
      el.style.zIndex = String(self._z);
      try { el.setPointerCapture(e.pointerId); } catch (_) {}
    });
    el.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!drag.moved && Math.hypot(dx, dy) > 8) {
        drag.moved = true;
        el.classList.add('dragging');
      }
      if (drag.moved) el.style.transform = 'translate(' + dx + 'px,' + dy + 'px) rotate(0deg) scale(1.08)';
    });
    var up = function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var d = drag; drag = null;
      el.classList.remove('dragging');
      el.style.transform = '';
      if (!d.moved) { self._activeId = t.id; self._paintUnderline(); self._tapTile(entry, el); return; }
      var br = self._boardEl.getBoundingClientRect();
      if (e.clientX < br.left || e.clientX > br.right || e.clientY < br.top || e.clientY > br.bottom) {
        self._removeTile(t);
        return;
      }
      t.row = Math.max(0, Math.min(self._rowCount - 1, Math.floor((e.clientY - br.top) / self._rowPitch)));
      t.x = self._pxToX(e.clientX - br.left - self._tileWFor(t.g) / 2);
      self._settle(t);
      self._positionTile(t);
      self._afterMove(t);
    };
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
  },

  _removeTile: function (t, silent) {
    var idx = this.boardTiles.indexOf(t);
    if (idx >= 0) this.boardTiles.splice(idx, 1);
    if (t.el) { t.el.remove(); t.el = null; }
    if (!silent) {
      this.api.sound(330);
      this.api.announce(this.fmt('tileRemoved', { g: t.g }));
      this._clearBadge();
      this._paintUnderline();
      this._saveStore();
    }
  },

  /* auto-place (keyboard / sheet tap): first empty prompt socket when the
     scaffold is up, else right of the active cluster, else middle row 12% */
  _placeAuto: function (g) {
    var cluster = this._activeCluster();
    var x, row;
    var socket = this._firstEmptySocket();
    if (socket) {
      row = socket.row;
      x = this._pxToX(socket.cx - this._tileWFor(g) / 2);
    } else if (cluster && cluster.length) {
      var last = cluster[cluster.length - 1];
      row = last.row;
      x = this._pxToX(this._xToPx(last.x) + this._tileWFor(last.g) + 6);
    } else {
      row = Math.floor(this._rowCount / 2);
      x = 120;
    }
    var t = { id: 'b' + (this._tileSeq++), g: g, x: x, row: row, rot: 0, kissed: true };
    this.boardTiles.push(t);
    this._settle(t);
    this._mountTile(t);
    this._activeId = t.id;
    this.api.sound(523);
    this._clearBadge();
    this._paintUnderline();
    this.api.announce(this.fmt('tileOnBoard', { g: g, w: this._clusterWord(this._activeCluster()) }));
    this._saveStore();
  },

  /* first prompt socket with no tile centered on it (null when no scaffold) */
  _firstEmptySocket: function () {
    if (!this._socketRects) return null;
    for (var i = 0; i < this._socketRects.length; i++) {
      var sr = this._socketRects[i];
      var taken = false;
      for (var j = 0; j < this.boardTiles.length; j++) {
        var t = this.boardTiles[j];
        if (t.row !== sr.row) continue;
        var cx = this._xToPx(t.x) + this._tileWFor(t.g) / 2;
        if (Math.abs(cx - sr.cx) < 30) { taken = true; break; }
      }
      if (!taken) return sr;
    }
    return null;
  },

  /* ======================= clusters + check ======================== */

  _clusters: function () {
    var self = this;
    var byRow = {};
    this.boardTiles.forEach(function (t) { (byRow[t.row] = byRow[t.row] || []).push(t); });
    var clusters = [];
    Object.keys(byRow).forEach(function (row) {
      var tiles = byRow[row].sort(function (a, b) { return a.x - b.x; });
      var cur = [];
      for (var i = 0; i < tiles.length; i++) {
        if (cur.length) {
          var prev = cur[cur.length - 1];
          var gap = self._xToPx(tiles[i].x) - (self._xToPx(prev.x) + self._tileWFor(prev.g));
          if (gap > self._tileH * 0.5) { clusters.push(cur); cur = []; }
        }
        cur.push(tiles[i]);
      }
      if (cur.length) clusters.push(cur);
    });
    return clusters;
  },

  _activeCluster: function () {
    var clusters = this._clusters();
    if (!clusters.length) return null;
    for (var i = 0; i < clusters.length; i++) {
      for (var j = 0; j < clusters[i].length; j++) {
        if (clusters[i][j].id === this._activeId) return clusters[i];
      }
    }
    return clusters[clusters.length - 1];
  },

  _clusterWord: function (cluster) {
    if (!cluster) return '';
    return cluster.map(function (t) { return t.g; }).join('').toLowerCase();
  },

  _paintUnderline: function () {
    var u = this._underEl;
    if (!u) return;
    var cluster = this._activeCluster();
    if (!cluster || cluster.length < 2) { u.style.display = 'none'; return; }
    var first = cluster[0], last = cluster[cluster.length - 1];
    var left = this._xToPx(first.x);
    var right = this._xToPx(last.x) + this._tileWFor(last.g);
    u.style.display = 'block';
    u.style.left = left + 'px';
    u.style.width = (right - left) + 'px';
    u.style.top = (first.row * this._rowPitch + 9 + this._tileH + 5) + 'px';
  },

  /* pronounceability gate for nonword TTS */
  _speakable: function (word) {
    if (!word || word.length > 12) return false;
    if (/(.)\1\1/.test(word)) return false;
    var vowels = this._vowelSet();
    var hasVowel = false;
    for (var i = 0; i < word.length; i++) if (vowels[word[i]]) { hasVowel = true; break; }
    return hasVowel;
  },

  check: function () {
    var api = this.api, self = this;
    var cluster = this._activeCluster();
    if (!cluster || !cluster.length) return;
    var word = this._clusterWord(cluster);

    /* the metronome: L→R pulse + pentatonic ladder */
    var n = cluster.length;
    cluster.forEach(function (t, i) {
      setTimeout(function () {
        if (!t.el) return;
        t.el.classList.remove('ltl-pulse');
        void t.el.offsetWidth;
        t.el.classList.add('ltl-pulse');
        api.sound(self.PITCHES[Math.min(i, 4)]);
      }, i * 260);
    });

    setTimeout(function () {
      var sensitive = !!self.inert[word];
      var entry = self.lexicon[word] || null;

      if (self.mode === 'prompt') {
        var card = self.currentCard();
        var target = card ? String(card.display).toLowerCase() : null;
        if (target && word === target) {
          self._glow(cluster);
          if (api.settings.speakOnCheck) LCSAudio.speak({ type: 'word', text: card.display, lang: api.lang });
          api.sound(659); setTimeout(function () { api.sound(880); }, 120);
          api.announce(self.fmt('cardMatch', { w: card.display }));
          self._cardCelebrate();
          api.track('prompt:match', { word: word });
          return;
        }
        /* mismatch: the CARD reacts (look again), tiles never do */
        self._cardPulse();
        if (card) LCSAudio.speak({ type: 'word', text: card.display, lang: api.lang, rate: 0.8 });
        api.announce(api.t('lookAgain'));
        api.track('prompt:miss', { word: word });
        return;
      }

      /* free build */
      if (sensitive) { api.track('check', { word: word, r: 'inert' }); return; }
      if (entry) {
        self._glow(cluster);
        if (api.settings.speakOnCheck) LCSAudio.speak({ type: 'word', text: word, lang: api.lang });
        api.sound(659); setTimeout(function () { api.sound(880); }, 120);
        self._showBadge(word, entry);
        api.announce(self.fmt('isReal', { w: word }));
        api.track('check', { word: word, r: 'real' });
      } else if (self.data.nonwordTTS && self._speakable(word)) {
        if (api.settings.speakOnCheck) LCSAudio.speak({ type: 'word', text: word, lang: api.lang });
        api.sound(523);
        api.announce(word);
        api.track('check', { word: word, r: 'spoken' });
      } else {
        /* quiet shimmer — the board reacts like a fridge door */
        cluster.forEach(function (t) {
          if (!t.el) return;
          t.el.classList.remove('ltl-shimmer');
          void t.el.offsetWidth;
          t.el.classList.add('ltl-shimmer');
        });
        api.announce(word.split('').join(' '));
        api.track('check', { word: word, r: 'quiet' });
      }
    }, n * 260 + 200);
  },

  _glow: function (cluster) {
    cluster.forEach(function (t, i) {
      setTimeout(function () { if (t.el) t.el.classList.add('ltl-glow'); }, i * 100);
    });
    setTimeout(function () {
      cluster.forEach(function (t) { if (t.el) t.el.classList.remove('ltl-glow'); });
    }, cluster.length * 100 + 1400);
  },

  /* ===================== card slot + prompt ========================= */

  _renderSlot: function () {
    var api = this.api, self = this;
    var slot = this._slotEl;
    if (!slot) return;
    slot.innerHTML = '';
    if (this.mode === 'prompt') {
      var card = this.currentCard();
      if (!card) {
        /* bank still loading → hold the mode, show the empty slot;
           bank loaded but the list is really empty → drop to free */
        if (!this.bank && this.listId !== 'custom') {
          slot.innerHTML = '<div class="ltl-slot-empty" aria-hidden="true"></div>';
          return;
        }
        this.mode = 'free'; this._renderSlot(); return;
      }
      var c = api.el('div', 'ltl-card');
      var faceBtn = api.el('button', 'ltl-card-face');
      faceBtn.type = 'button';
      faceBtn.setAttribute('aria-label', card.display + '. ' + api.t('hearCard'));
      if (card.noun && card.themeDir) {
        var img = document.createElement('img');
        img.alt = ''; img.draggable = false;
        img.src = this.imgUrl(card);
        faceBtn.appendChild(img);
      } else {
        var spk = api.el('span', 'ltl-card-spk');
        spk.innerHTML = '<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/></svg>';
        faceBtn.appendChild(spk);
      }
      var badge = api.el('span', 'ltl-card-badge');
      badge.innerHTML = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/></svg>';
      faceBtn.appendChild(badge);
      faceBtn.addEventListener('click', function () {
        LCSAudio.speak({ type: 'word', text: card.display, lang: api.lang });
      });
      var next = api.el('button', 'ltl-card-next');
      next.type = 'button';
      next.setAttribute('aria-label', api.t('nextCard'));
      next.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>';
      next.addEventListener('click', function () { self.nextCard(); });
      var close = api.el('button', 'ltl-card-close');
      close.type = 'button';
      close.setAttribute('aria-label', api.t('closePrompt'));
      close.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
      close.addEventListener('click', function () { self.exitPrompt(); });
      /* the × pins to the CARD FACE corner, not the row corner */
      var faceWrap = api.el('span', 'ltl-card-facewrap');
      faceWrap.append(faceBtn, close);
      c.append(faceWrap, next);
      slot.appendChild(c);
      this._cardEl = c;
      /* auto-speak the dealt word */
      if (!this._firstDeal) this._firstDeal = true;
      else LCSAudio.speak({ type: 'word', text: card.display, lang: api.lang });
    } else {
      slot.innerHTML = '<div class="ltl-slot-empty" aria-hidden="true"></div>';
      this._cardEl = null;
    }
  },

  _cardPulse: function () {
    if (!this._cardEl) return;
    this._cardEl.classList.remove('ltl-card-pulse');
    void this._cardEl.offsetWidth;
    this._cardEl.classList.add('ltl-card-pulse');
  },
  _cardCelebrate: function () {
    if (!this._cardEl) return;
    this._cardEl.classList.add('ltl-card-match');
    var next = this._cardEl.querySelector('.ltl-card-next');
    if (next) { next.classList.remove('ltl-next-pulse'); void next.offsetWidth; next.classList.add('ltl-next-pulse'); }
  },

  nextCard: function () {
    var cards = this._cards();
    if (!cards.length) return;
    this.cardIdx = (this.cardIdx + 1) % cards.length;
    this.api.sound(520);
    this._renderSlot();
    this._renderSockets();
    this._refreshPill();
    this._saveStore();
  },

  exitPrompt: function () {
    this.mode = 'free';
    this._renderSlot();
    this._renderSockets();
    this._refreshPill();
    this._saveStore();
  },

  enterPrompt: function (listId) {
    this.mode = 'prompt';
    this.listId = listId;
    this.cardIdx = 0;
    this._renderSlot();
    this._renderSockets();
    this._refreshPill();
    this._saveStore();
  },

  _refreshPill: function () {
    var pill = this._wrap && this._wrap.querySelector('.ltl-pill');
    if (!pill) return;
    var api = this.api;
    if (this.mode === 'prompt') {
      var st = this._stageById(this.listId);
      var label = this.listId === 'custom' ? api.t('myWordsTab') : (st ? st.label : '');
      pill.textContent = label + '  ·  ' + this.fmt('cardOf', { i: this.cardIdx + 1, n: this._cards().length });
    } else {
      pill.textContent = api.t('freeBuild');
    }
  },

  _stageById: function (id) {
    var st = (this.bank && this.bank.stages) || [];
    for (var i = 0; i < st.length; i++) if (st[i].id === id) return st[i];
    return null;
  },

  /* ghost sockets from the bank word's grapheme boxes (tool #1 data) */
  _renderSockets: function () {
    var box = this._socketsEl;
    if (!box) return;
    box.innerHTML = '';
    this._socketRects = null;
    if (this.mode !== 'prompt' || this.api.settings.guides !== 'boxes') return;
    var card = this.currentCard();
    if (!card || !card.boxes) return;
    var row = Math.floor(this._rowCount / 2);
    var self = this;
    var parts = [];
    var tail = '';
    card.boxes.forEach(function (g) {
      var m = /^(.+)_(.+)$/.exec(g);
      if (m) { parts.push({ g: m[1], magic: true }); tail += m[2]; }
      else parts.push({ g: g });
    });
    if (card.silentTail) tail += card.silentTail;
    if (tail) tail.split('').forEach(function (ch) { parts.push({ g: ch, grey: true }); });

    var widths = parts.map(function (p) { return self._tileWFor(p.g); });
    var total = widths.reduce(function (a, b) { return a + b + 8; }, -8);
    var startPx = Math.max(8, (this._boardW() - total) / 2);
    var rects = [];
    var px = startPx;
    parts.forEach(function (p, i) {
      var s = document.createElement('div');
      s.className = 'ltl-socket' + (p.grey ? ' grey' : '') + (p.magic ? ' magic' : '');
      s.style.left = px + 'px';
      s.style.top = (row * self._rowPitch + 9) + 'px';
      s.style.width = widths[i] + 'px';
      s.style.height = self._tileH + 'px';
      box.appendChild(s);
      rects.push({ cx: px + widths[i] / 2, row: row });
      px += widths[i] + 8;
    });
    this._socketRects = rects;
  },

  /* ========================= badges ================================ */

  _showBadge: function (word, entry) {
    var api = this.api, slot = this._slotEl;
    if (!slot || this.mode === 'prompt') return;
    var displayWord = api.settings.letterCase === 'upper' ? word.toUpperCase() : word;
    var html;
    if (entry && entry.noun && entry.themeDir) {
      html = '<div class="ltl-badge"><div class="ltl-badge-circle"><img src="' + this.imgUrl(entry) + '" alt="" draggable="false"></div><div class="ltl-badge-word">' + displayWord + '</div></div>';
    } else {
      html = '<div class="ltl-badge"><div class="ltl-badge-circle tick"><svg viewBox="0 0 24 24" width="55%" height="55%" fill="none" stroke="#146B5E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5"/></svg></div><div class="ltl-badge-word">' + displayWord + '</div></div>';
    }
    slot.innerHTML = html;
    var self = this;
    slot.querySelector('.ltl-badge').addEventListener('click', function () {
      LCSAudio.speak({ type: 'word', text: word, lang: api.lang });
    });
  },

  _clearBadge: function () {
    if (this.mode === 'free' && this._slotEl && this._slotEl.querySelector('.ltl-badge')) {
      this._slotEl.innerHTML = '<div class="ltl-slot-empty" aria-hidden="true"></div>';
    }
  },

  /* ========================= sheet (phone) ========================= */

  _toggleSheet: function () {
    var self = this, api = this.api;
    if (this._sheetEl) {
      this._sheetEl.classList.toggle('open');
      this._sheetOpen = this._sheetEl.classList.contains('open');
      return;
    }
    var sheet = api.el('div', 'ltl-sheet');
    var grid = api.el('div', 'ltl-sheet-grid');
    (this.data.tray || []).forEach(function (entry) {
      var b = api.el('button', 'ltl-traytile sheet' + (self._isWarm(entry) ? ' warm' : ''));
      b.type = 'button';
      b.setAttribute('aria-label', entry.g);
      b.innerHTML = self._tileFaceHTML(entry);
      b.addEventListener('click', function () { self._placeAuto(entry.g); });
      grid.appendChild(b);
    });
    sheet.appendChild(grid);
    document.querySelector('.lcs-app').appendChild(sheet);
    this._sheetEl = sheet;
    requestAnimationFrame(function () { sheet.classList.add('open'); self._sheetOpen = true; });
  },

  /* ========================= panel ================================= */

  _openPanel: function () {
    if (!this._panelEl) this._buildPanel();
    this._renderPanel();
    this._panelEl.classList.add('open');
    this._scrimEl.classList.add('open');
  },
  _closePanel: function () {
    if (this._panelEl) { this._panelEl.classList.remove('open'); this._scrimEl.classList.remove('open'); }
  },
  _buildPanel: function () {
    var api = this.api, self = this;
    var scrim = api.el('div', 'ltl-scrim');
    scrim.addEventListener('click', function () { self._closePanel(); });
    var panel = api.el('div', 'ltl-panel');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', api.t('wordCards'));
    document.querySelector('.lcs-app').append(scrim, panel);
    this._panelEl = panel;
    this._scrimEl = scrim;
  },

  _renderPanel: function () {
    var api = this.api, self = this;
    var panel = this._panelEl;
    panel.innerHTML = '';

    var head = api.el('div', 'ltl-panel-head');
    var tabs = api.el('div', 'ltl-tabs');
    var mkTab = function (id, label) {
      var t = api.el('button', 'ltl-tab' + (self._panelTab === id ? ' active' : ''));
      t.type = 'button';
      t.textContent = label;
      t.addEventListener('click', function () { self._panelTab = id; self._renderPanel(); });
      return t;
    };
    tabs.append(mkTab('cards', api.t('wordCards')), mkTab('custom', api.t('myWordsTab')));
    var x = api.el('button', 'ltl-panel-close');
    x.type = 'button';
    x.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    x.setAttribute('aria-label', 'Close');
    x.addEventListener('click', function () { self._closePanel(); });
    head.append(tabs, x);
    panel.appendChild(head);

    var body = api.el('div', 'ltl-panel-body');
    panel.appendChild(body);
    if (this._panelTab === 'cards') this._renderCardsTab(body);
    else this._renderCustomTab(body);

    /* footer: free-build link + copy-link (prompt) + the trio line */
    var foot = api.el('div', 'ltl-panel-foot');
    var free = api.el('button', 'ltl-linkbtn');
    free.type = 'button';
    free.textContent = api.t('freeBuild');
    free.addEventListener('click', function () { self.exitPrompt(); self._closePanel(); });
    foot.appendChild(free);
    if (this.mode === 'prompt' && this.listId !== 'custom') {
      var card = this.currentCard();
      if (card) {
        var copy = api.el('button', 'ltl-linkbtn');
        copy.type = 'button';
        copy.textContent = api.t('copyLink');
        copy.addEventListener('click', function () {
          var url = location.origin + location.pathname + '?lang=' + api.lang + '&list=' + encodeURIComponent(self.listId) + '&card=' + encodeURIComponent(card.id);
          var done = function () { copy.textContent = api.t('copied'); setTimeout(function () { copy.textContent = api.t('copyLink'); }, 1600); };
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, done);
          else { try { prompt('', url); } catch (_) {} done(); }
        });
        foot.appendChild(copy);
      }
    }
    var trio = api.el('span', 'ltl-trio');
    var lbl = api.el('span', 'ltl-trio-label');
    lbl.textContent = api.t('trioLabel') + ' ';
    var a1 = document.createElement('a');
    a1.className = 'ltl-linkbtn';
    a1.href = '/mini-tools/sound-boxes.html?lang=' + api.lang;
    a1.textContent = api.t('siblingSbx');
    var dot = api.el('span', 'ltl-trio-label');
    dot.textContent = ' · ';
    var a2 = document.createElement('a');
    a2.className = 'ltl-linkbtn';
    a2.href = '/mini-tools/blending-board.html?lang=' + api.lang;
    a2.textContent = api.t('siblingBbd');
    trio.append(lbl, a1, dot, a2);
    /* Heart Words ships in TEN locales — never link it from the fi build. */
    if (['en','de','fr','it','es','pt','nl','sv','da','no'].indexOf(api.lang) >= 0) {
      var a3 = document.createElement('a');
      a3.className = 'ltl-linkbtn';
      a3.href = '/mini-tools/heart-words.html?lang=' + api.lang;
      a3.textContent = api.t('siblingHwd');
      var dot2 = api.el('span', 'ltl-trio-label');
      dot2.textContent = ' · ';
      trio.append(dot2, a3);
    }
    foot.appendChild(trio);
    panel.appendChild(foot);
  },

  _renderCardsTab: function (body) {
    var api = this.api, self = this;
    var stages = (this.bank && this.bank.stages) || [];
    stages.forEach(function (st) {
      var unlocked = self._stageUnlocked(st);
      var count = ((self.bank && self.bank.words) || []).filter(function (w) { return w.stage === st.id; }).length;
      var row = api.el('button', 'ltl-stage-row' + (self.mode === 'prompt' && self.listId === st.id ? ' active' : '') + (unlocked ? '' : ' locked'));
      row.type = 'button';
      var lab = api.el('span', 'ltl-stage-label');
      lab.textContent = st.label;
      var meta = api.el('span', 'ltl-stage-meta');
      meta.textContent = String(count);
      row.append(lab, meta);
      if (!unlocked) {
        var lock = api.el('span', 'ltl-lock');
        lock.innerHTML = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
        lock.title = api.t('lockedLabel');
        row.appendChild(lock);
      }
      row.addEventListener('click', function () {
        if (!unlocked) { self._upsell(body); return; }
        self.enterPrompt(st.id);
        self._closePanel();
      });
      body.appendChild(row);
    });

    /* thumbnail grid for the active stage */
    if (this.mode === 'prompt' && this.listId !== 'custom') {
      var cards = this._cards();
      if (cards.length) {
        var grid = api.el('div', 'ltl-wordgrid');
        cards.forEach(function (w, i) {
          var cell = api.el('button', 'ltl-wordcell' + (i === self.cardIdx ? ' active' : ''));
          cell.type = 'button';
          if (w.noun && w.themeDir) {
            var im = document.createElement('img');
            im.loading = 'lazy'; im.alt = w.display; im.draggable = false;
            im.src = self.imgUrl(w);
            cell.appendChild(im);
          }
          var t = api.el('span'); t.textContent = w.display;
          cell.appendChild(t);
          cell.addEventListener('click', function () {
            self.cardIdx = i;
            self._renderSlot();
            self._renderSockets();
            self._refreshPill();
            self._closePanel();
            self._saveStore();
          });
          grid.appendChild(cell);
        });
        body.appendChild(grid);
      }
    }
  },

  _upsell: function (body) {
    var api = this.api;
    var old = body.querySelector('.ltl-upsell');
    if (old) old.remove();
    var up = api.el('div', 'ltl-upsell');
    var txt = api.el('span'); txt.textContent = api.t('premiumLine');
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-letter-tiles';
    a.target = '_blank'; a.rel = 'noopener';
    a.textContent = api.t('unlockLine');
    up.append(txt, a);
    var grid = body.querySelector('.ltl-wordgrid');
    if (grid) body.insertBefore(up, grid); else body.appendChild(up);
  },

  _renderCustomTab: function (body) {
    var api = this.api, self = this;
    var hint = api.el('p', 'ltl-hint');
    hint.textContent = api.t('myWordsHint');
    body.appendChild(hint);
    var ta = document.createElement('textarea');
    ta.className = 'ltl-textarea';
    ta.rows = 3;
    ta.value = (this._store.myWordsDraft || []).map(function (w) { return w.text; }).join('\n');
    body.appendChild(ta);
    var add = api.el('button', 'ltl-btn');
    add.type = 'button';
    add.textContent = api.t('addWords');
    add.addEventListener('click', function () {
      var words = ta.value.split(/[\s,;]+/).map(function (s) { return s.trim().toLowerCase(); })
        .filter(Boolean).slice(0, 20).map(function (t) { return { text: t }; });
      self._store.myWordsDraft = words;
      self._renderPanel();
    });
    body.appendChild(add);

    var draft = this._store.myWordsDraft || [];
    if (draft.length) {
      var list = api.el('div', 'ltl-draftlist');
      draft.forEach(function (w) {
        var chip = api.el('span', 'ltl-draftchip');
        chip.textContent = w.text;
        list.appendChild(chip);
      });
      body.appendChild(list);

      var use = api.el('button', 'ltl-btn primary' + (this.premium ? '' : ' locked'));
      use.type = 'button';
      use.textContent = api.t('useTheseCards');
      use.addEventListener('click', function () {
        if (!self.premium) {
          var old = body.querySelector('.ltl-upsell');
          if (old) old.remove();
          var up = api.el('div', 'ltl-upsell');
          var txt = api.el('span'); txt.textContent = api.t('premiumLine');
          var a = document.createElement('a');
          a.href = '/' + api.lang + '/pricing?from=tool-letter-tiles';
          a.target = '_blank'; a.rel = 'noopener';
          a.textContent = api.t('unlockLine');
          up.append(txt, a);
          use.insertAdjacentElement('beforebegin', up);
          return;
        }
        self._store.myWords = draft.slice();
        self._saveStore();
        self.enterPrompt('custom');
        self._closePanel();
      });
      body.appendChild(use);
    }
  }
};

/* per-tool styling: STAGE ONLY, consuming shell tokens. The sanctioned
   page-level touch is body.ltl-wide (projector width), tool-injected. */
(function injectCSS() {
  var css = ''
  + 'body.ltl-wide .lcs-app{max-width:min(1100px,96vw);}'
  /* long compound titles (fi Magneettikirjaimet, de Magnetbuchstaben):
     never a bare mid-word break (shell default overflow-wrap:anywhere);
     at phone widths the header stacks so the title owns the full row */
  + 'body.ltl-wide .lcs-title{overflow-wrap:break-word;word-break:normal;hyphens:auto;}'
  + '@media (max-width:480px){'
  +   'body.ltl-wide .lcs-header{flex-direction:column;align-items:flex-start;gap:8px;}'
  +   'body.ltl-wide .lcs-title{font-size:clamp(18px,6vw,26px);}'
  + '}'
  + '.ltl-wrap{display:flex;flex-direction:column;align-items:center;'
  +   'gap:clamp(8px,1.8vmin,16px);width:100%;}'
  + '.ltl-loading{padding:48px 0;color:var(--lcs-ink-soft);'
  +   'font-family:var(--lcs-font-body);font-weight:700;}'
  + 'body.ltl-upper .ltl-face-txt,body.ltl-upper .ltl-badge-word{text-transform:uppercase;}'
  + 'body:not(.ltl-anlaut) .ltl-anchor{display:none;}'

  /* pill */
  + '.ltl-pillrow{display:flex;justify-content:center;width:100%;}'
  + '.ltl-pill{font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(13px,2.2vmin,16px);color:var(--lcs-structure);'
  +   'background:var(--lcs-surface);border:1.5px solid var(--lcs-line);'
  +   'border-radius:var(--lcs-radius-pill);padding:7px 18px;'
  +   'min-height:var(--lcs-tap);display:inline-flex;align-items:center;'
  +   'box-shadow:var(--lcs-shadow-sm);cursor:pointer;'
  +   'transition:transform .1s var(--lcs-ease),background .12s;}'
  + '.ltl-pill:hover{background:var(--lcs-structure-soft);}'
  + '.ltl-pill:active{transform:scale(.97);}'

  /* card slot */
  + '.ltl-slot{height:clamp(84px,15vmin,140px);display:grid;place-items:center;width:100%;}'
  + '.ltl-slot-empty{width:clamp(46px,8vmin,72px);height:clamp(46px,8vmin,72px);'
  +   'border:2px dashed rgba(20,107,94,.18);border-radius:50%;}'
  + '.ltl-card{position:relative;display:flex;align-items:center;gap:8px;'
  +   'transform:rotate(-2deg);}'
  + '.ltl-card-facewrap{position:relative;display:inline-flex;}'
  + '.ltl-card-face{position:relative;width:clamp(76px,13.5vmin,124px);'
  +   'height:clamp(76px,13.5vmin,124px);display:grid;place-items:center;'
  +   'background:var(--lcs-surface);border:5px solid #fff;outline:1.5px solid var(--lcs-line);'
  +   'border-radius:12px;box-shadow:var(--lcs-shadow);cursor:pointer;padding:5px;}'
  + '.ltl-card-face img{max-width:100%;max-height:100%;object-fit:contain;pointer-events:none;}'
  + '.ltl-card-spk{color:var(--lcs-structure);}'
  + '.ltl-card-badge{position:absolute;right:4px;bottom:4px;width:24px;height:24px;'
  +   'display:grid;place-items:center;color:var(--lcs-structure);'
  +   'background:var(--lcs-surface);border-radius:50%;box-shadow:var(--lcs-shadow-sm);'
  +   'pointer-events:none;}'
  + '.ltl-card-next{width:44px;height:44px;display:grid;place-items:center;border-radius:50%;'
  +   'background:var(--lcs-surface);box-shadow:var(--lcs-shadow-sm);'
  +   'color:var(--lcs-structure);cursor:pointer;'
  +   'transition:transform .1s var(--lcs-ease),background .12s;}'
  + '.ltl-card-next:hover{background:var(--lcs-structure-soft);}'
  + '.ltl-card-next:active{transform:scale(.92);}'
  + '.ltl-card-close{position:absolute;top:-10px;right:-10px;width:28px;height:28px;'
  +   'display:grid;place-items:center;border-radius:50%;color:var(--lcs-ink-soft);'
  +   'background:var(--lcs-surface);box-shadow:var(--lcs-shadow-sm);cursor:pointer;}'
  + '.ltl-card.ltl-card-pulse .ltl-card-face{animation:ltlCardPulse .5s var(--lcs-ease);}'
  + '@keyframes ltlCardPulse{0%{transform:scale(1);}40%{transform:scale(1.06);}100%{transform:scale(1);}}'
  + '.ltl-card.ltl-card-match .ltl-card-face{outline-color:#F2784B;}'
  + '.ltl-next-pulse{animation:ltlNextPulse .9s var(--lcs-ease) 2;}'
  + '@keyframes ltlNextPulse{0%{box-shadow:0 0 0 0 rgba(242,120,75,.35);}'
  +   '100%{box-shadow:0 0 0 10px rgba(242,120,75,0);}}'

  /* badge (free-build check result, in the slot) */
  + '.ltl-badge{display:flex;align-items:center;gap:12px;cursor:pointer;'
  +   'animation:ltlBadgeIn .32s cubic-bezier(.34,1.56,.64,1);}'
  + '@keyframes ltlBadgeIn{0%{transform:scale(.4);opacity:0;}'
  +   '70%{transform:scale(1.07);opacity:1;}100%{transform:scale(1);}}'
  + '.ltl-badge-circle{width:clamp(56px,11vmin,100px);height:clamp(56px,11vmin,100px);'
  +   'background:var(--lcs-surface);border-radius:50%;box-shadow:var(--lcs-shadow);'
  +   'display:grid;place-items:center;overflow:hidden;}'
  + '.ltl-badge-circle img{width:76%;height:76%;object-fit:contain;pointer-events:none;}'
  + '.ltl-badge-word{font-family:var(--lcs-font-display);font-weight:800;'
  +   'font-size:clamp(18px,3.2vmin,28px);color:var(--lcs-ink);}'

  /* board */
  /* =====================================================================
     ⚠⚠ THIS TOOL WAS CLIPPING IN ITALIAN AND GERMAN AT 1366x900 — the
     CONTROL cell, the narrowest desktop the programme measures, and it has
     been doing it in production. Lowest reachable control 948 of 900: 48px
     of an unreachable button, in two of eleven languages.
     NOTHING IN THE REPO COULD SEE IT. The shared gate measures 1366 in
     ENGLISH, and its locale sweep runs at 1920/2560 and only for tools
     already touched. A survey of all 48 tools x de/it/fi at 1366x900 found
     exactly this one, which is why the survey was worth running instead of
     assuming either that it was systemic or that it was unique.
     THE MECHANISM IS `46vh` INSIDE A MANIPULATIVE — the third instance in
     this programme after calendar-wall, and number-sieve's source already
     documents the ban: the iframe grows to its content, so a vh rule is a
     feedback loop the shell has no path for. Italian and German wrap the
     chip rows one line further than English, and a board sized off the
     VIEWPORT cannot know that.
     The fix is confined to short viewports, where the clip happens: 38vh
     at 900 is 342px against 414px, which shed 72px and leaves the lowest
     control at 876. Above 1100px tall the board keeps its full 46vh/560px,
     so no big board loses anything.
     ⚠ This DOES change a render at or below 1366, deliberately. The
     programme's neutrality rule protects shipped layouts from the TIERS;
     it does not protect a 48px unreachable control from being fixed. */
  + '.ltl-board{position:relative;width:100%;height:clamp(300px,46vh,560px);'
  +   'background:repeating-linear-gradient(to bottom,transparent 0 calc(var(--ltl-row,80px) - 2px),'
  +   'rgba(20,107,94,.07) calc(var(--ltl-row,80px) - 2px) var(--ltl-row,80px)),var(--lcs-surface);'
  +   'border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius);'
  +   'box-shadow:inset 0 2px 10px rgba(20,30,28,.05),0 1px 0 rgba(255,255,255,.9);'
  +   'touch-action:none;overflow:hidden;}'
  /* ⚠ AFTER the base rule, never before it. Both are `.ltl-board` at the same
     specificity, so SOURCE ORDER decides — a media block placed ABOVE the
     declaration it overrides does nothing at all. I wrote it above first; it
     would have shipped inert and the clip would have survived a green run. */
  /* =====================================================================
     ⚠⚠ NO CARD TIER HERE EITHER — measured, then withdrawn. I wrote this
     tool the same 1240/1560/1740 ladder as its siblings and it passed
     everything: fits at every tier floor in Italian AND German, local-test
     PASS, shared gate green, 41.1% -> 66.1%.
     Then I checked whether the CONTENTS grew, which is the question the
     FILL floor does not ask. `:418` computes
         tile = max(44, min(84, round(innerWidth * 0.085)))
     so the tile is PINNED AT 84px from about 988px of viewport upward. A
     wider board would have meant more empty board and the same letters —
     the rekenrek defect exactly, found the same way, on the same day.
     ⚠ Unlike rekenrek the fix here is small: the 84 ceiling is one number,
     and it could be raised per tier. It is still GEOMETRY code rather than
     a card width, and it belongs in a commit that measures the result on a
     board with tiles actually placed — they do not exist at rest, which is
     why the first content-scale probe could not see them at all.
     THE CLIP FIX BELOW STAYS. That one is a live 48px defect in two
     languages and is independent of any of this.
     ===================================================================== */
  + '@media (max-height:1100px){'
  +   '.ltl-board{height:clamp(260px,38vh,460px);}'
  + '}'
  + '.ltl-check{position:absolute;right:10px;bottom:10px;width:52px;height:52px;'
  +   'display:grid;place-items:center;border-radius:50%;z-index:20;'
  +   'background:var(--lcs-surface);box-shadow:var(--lcs-shadow-sm);'
  +   'color:var(--lcs-structure);cursor:pointer;'
  +   'transition:transform .1s var(--lcs-ease),background .12s;}'
  + '.ltl-check:hover{background:var(--lcs-structure-soft);}'
  + '.ltl-check:active{transform:scale(.92);}'
  + '.ltl-underline{position:absolute;height:0;border-bottom:3px dotted rgba(20,107,94,.25);'
  +   'pointer-events:none;display:none;z-index:1;}'
  + '.ltl-sockets{position:absolute;inset:0;pointer-events:none;z-index:0;}'
  + '.ltl-socket{position:absolute;border:2px dashed rgba(20,107,94,.18);'
  +   'border-radius:12px;}'
  + '.ltl-socket.grey{border-color:rgba(90,107,100,.22);background:rgba(90,107,100,.04);}'
  /* magic-e: the tool-#1 coral arc over the vowel socket */
  + '.ltl-socket.magic::after{content:"";position:absolute;left:20%;right:-60%;top:-12px;'
  +   'height:14px;border:2.5px solid rgba(242,120,75,.55);border-bottom:none;'
  +   'border-radius:12px 12px 0 0;}'

  /* tiles (board) */
  + '.ltl-tile{position:absolute;height:var(--ltl-tile,64px);min-width:var(--ltl-tile,64px);'
  +   'padding:0 .28em;border-radius:14px;display:grid;place-items:center;z-index:5;'
  +   'background:linear-gradient(180deg,#FFFEFB 0%,#F7EBD3 100%);cursor:grab;'
  +   'box-shadow:inset 0 1px 0 rgba(255,255,255,.8),0 3px 0 0 #E6D8AF,0 5px 10px rgba(20,30,28,.10);'
  +   'transform:rotate(var(--ltl-rot,0deg));touch-action:none;border:none;}'
  + '.ltl-tile.dragging{cursor:grabbing;'
  +   'filter:drop-shadow(0 10px 16px rgba(20,30,28,.22));z-index:50;}'
  + '.ltl-tile.ltl-settle{animation:ltlSettle .26s cubic-bezier(.34,1.56,.64,1);}'
  + '@keyframes ltlSettle{0%{transform:rotate(var(--ltl-rot,0deg)) scale(1.1);}'
  +   '100%{transform:rotate(var(--ltl-rot,0deg)) scale(1);}}'
  + '.ltl-tile.ltl-pulse::after{content:"";position:absolute;inset:-2px;border-radius:14px;'
  +   'animation:ltlPulse .35s var(--lcs-ease);}'
  + '@keyframes ltlPulse{0%{box-shadow:0 0 0 0 rgba(242,120,75,.30);}'
  +   '100%{box-shadow:0 0 0 12px rgba(242,120,75,0);}}'
  + '.ltl-tile.ltl-glow{background:#FFF6EC;'
  +   'box-shadow:inset 0 1px 0 rgba(255,255,255,.8),0 3px 0 0 #F2B48A,'
  +   '0 0 0 5px rgba(242,120,75,.20);}'
  + '.ltl-tile.ltl-shimmer{animation:ltlShimmer .8s var(--lcs-ease);}'
  + '@keyframes ltlShimmer{0%{opacity:1;}45%{opacity:.55;}100%{opacity:1;}}'

  /* two-channel vowel/consonant signal: ink color + a top-edge cap */
  + '.ltl-tile::before,.ltl-traytile::before{content:"";position:absolute;top:0;'
  +   'left:12%;right:12%;height:5px;border-radius:0 0 4px 4px;'
  +   'background:#E2F0EC;pointer-events:none;}'
  + '.ltl-tile.warm::before,.ltl-traytile.warm::before{background:#FDE8DE;}'

  /* tile face (shared board + tray) */
  /* ⚠ THE ANCHOR PICTURE IS IN FLOW, ABOVE THE LETTER. It must never be
     absolutely positioned again, and the reason is worth keeping:
     `.ltl-anchor` used to be `position:absolute` with NEGATIVE top/right,
     written to hang the badge outside the tile's top-right corner. But its
     nearest positioned ancestor was `.ltl-face` — a shrink-to-fit flex box
     inside a `place-items:center` tile, so its box is only as wide as THE
     GLYPH. The offsets were therefore measured from the letter's own edges
     and pulled the badge straight back on top of it: ~92% coverage in the
     tray (a 21px floor-sized disc over a ~23px glyph), ~69% on the board.
     It shipped that way from the tool's first commit on 2026-07-16.
     Restoring the authored intent is NOT possible: `.ltl-tray` becomes
     `overflow-x:auto` at <=560px and `.ltl-sheet` is `overflow:auto`, and a
     non-visible overflow on one axis forces the other to `auto` — so a badge
     hanging outside the tile is simply clipped on a phone.
     In flow, in the column this face already was, overlap is STRUCTURALLY
     IMPOSSIBLE rather than tuned away. It fits at every size: picture .30 +
     glyph .52 = .82 of the tile (44px tray -> 36px; 84px board -> 69px).
     Gate: local-test-letter-tiles.js asserts the anchor rect never
     intersects the glyph rect. */
  + '.ltl-face{display:flex;flex-direction:column;align-items:center;'
  +   'justify-content:center;line-height:1;gap:calc(var(--ltl-tile,64px)*.04);}'
  + '.ltl-face-txt{font-family:var(--lcs-font-display);font-weight:700;'
  +   'text-transform:lowercase;letter-spacing:-.02em;'
  +   'font-size:calc(var(--ltl-tile,64px)*.52);color:#146B5E;}'
  + '.ltl-face.warm .ltl-face-txt{color:#C9502A;}'
  + '.ltl-face.multi .ltl-face-txt{font-size:calc(var(--ltl-tile,64px)*.4);}'
  /* no background/border-radius/box-shadow: those punched the badge out of
     the glyph it was covering. In flow they are only noise, and the source
     WebP already carries a real alpha channel. */
  + '.ltl-anchor{display:block;flex:0 0 auto;'
  +   'width:max(15px,calc(var(--ltl-tile,64px)*.30));'
  +   'height:max(15px,calc(var(--ltl-tile,64px)*.30));'
  +   'object-fit:contain;pointer-events:none;}'
  + '.ltl-tie{width:60%;max-width:56px;height:8px;margin-top:2px;}'
  + '.ltl-wiggle{animation:ltlWiggle .3s var(--lcs-ease);}'
  + '@keyframes ltlWiggle{0%{rotate:0deg;}30%{rotate:2deg;}70%{rotate:-2deg;}100%{rotate:0deg;}}'

  /* tray */
  + '.ltl-traywrap{display:flex;align-items:center;gap:8px;width:100%;}'
  + '.ltl-tray{--ltl-tile:clamp(44px,6vmin,56px);display:flex;flex-wrap:wrap;'
  +   'justify-content:center;gap:6px;flex:1;padding:10px 12px;'
  +   'background:var(--lcs-surface-2);border:1px solid var(--lcs-line);'
  +   'border-radius:var(--lcs-radius);box-shadow:inset 0 2px 6px rgba(20,30,28,.06);'
  +   'touch-action:pan-x;}'
  + '.ltl-traytile{position:relative;height:var(--ltl-tile);min-width:var(--ltl-tile);'
  +   'padding:0 .24em;border-radius:11px;display:grid;place-items:center;'
  +   'background:linear-gradient(180deg,#FFFEFB 0%,#F7EBD3 100%);cursor:grab;'
  +   'box-shadow:inset 0 1px 0 rgba(255,255,255,.8),0 2px 0 0 #E6D8AF,'
  +   '0 4px 8px rgba(20,30,28,.08),0 6px 0 -3px rgba(230,216,175,.6);'
  +   'touch-action:none;border:none;}'
  + '.ltl-traytile:hover{transform:translateY(-2px);}'
  + '.ltl-traytile.quiet .ltl-face-txt{opacity:.8;}'
  + '.ltl-group{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;}'
  + '.ltl-sheetbtn{display:none;width:var(--lcs-tap);height:var(--lcs-tap);flex:0 0 auto;'
  +   'place-items:center;border-radius:50%;background:var(--lcs-surface);'
  +   'box-shadow:var(--lcs-shadow-sm);color:var(--lcs-structure);cursor:pointer;}'

  /* fly clone */
  + '.ltl-fly{--ltl-tile:clamp(44px,6vmin,56px);position:fixed;z-index:80;display:grid;'
  +   'place-items:center;pointer-events:none;border-radius:11px;'
  +   'background:linear-gradient(180deg,#FFFEFB 0%,#F7EBD3 100%);'
  +   'filter:drop-shadow(0 10px 16px rgba(20,30,28,.22));}'

  /* panel + sheet */
  + '.ltl-scrim{position:absolute;inset:0;background:rgba(38,51,47,.28);'
  +   'opacity:0;pointer-events:none;transition:opacity .2s;z-index:70;border-radius:inherit;}'
  + '.ltl-scrim.open{opacity:1;pointer-events:auto;}'
  + '.ltl-panel{position:absolute;left:50%;top:6%;transform:translateX(-50%) translateY(8px);'
  +   'width:min(560px,92%);max-height:86%;overflow:auto;background:var(--lcs-surface);'
  +   'border-radius:var(--lcs-radius);box-shadow:var(--lcs-shadow);z-index:71;'
  +   'opacity:0;pointer-events:none;transition:opacity .2s,transform .2s var(--lcs-ease);'
  +   'display:flex;flex-direction:column;}'
  + '.ltl-panel.open{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0);}'
  + '.ltl-panel-head{display:flex;align-items:center;justify-content:space-between;'
  +   'padding:14px 16px 10px;border-bottom:1px solid var(--lcs-line);}'
  + '.ltl-tabs{display:flex;gap:8px;}'
  + '.ltl-tab{font-family:var(--lcs-font-display);font-weight:700;font-size:14px;'
  +   'padding:7px 14px;border-radius:var(--lcs-radius-pill);'
  +   'color:var(--lcs-ink-soft);background:transparent;cursor:pointer;}'
  + '.ltl-tab.active{background:var(--lcs-structure);color:var(--lcs-surface);}'
  + '.ltl-panel-close{width:36px;height:36px;display:grid;place-items:center;'
  +   'border-radius:50%;color:var(--lcs-ink-soft);background:transparent;cursor:pointer;}'
  + '.ltl-panel-close:hover{background:var(--lcs-structure-soft);color:var(--lcs-structure);}'
  + '.ltl-panel-body{padding:12px 16px;display:flex;flex-direction:column;gap:8px;}'
  + '.ltl-panel-foot{padding:10px 16px 14px;border-top:1px solid var(--lcs-line);'
  +   'display:flex;align-items:center;gap:12px;flex-wrap:wrap;}'
  + '.ltl-stage-row{display:flex;align-items:center;gap:10px;text-align:left;'
  +   'padding:11px 14px;border-radius:var(--lcs-radius-sm);cursor:pointer;'
  +   'background:var(--lcs-surface-2);border:1.5px solid var(--lcs-line);'
  +   'font-family:var(--lcs-font-body);}'
  + '.ltl-stage-row.active{border-color:var(--lcs-structure);background:var(--lcs-structure-soft);}'
  + '.ltl-stage-label{font-weight:800;color:var(--lcs-ink);flex:1;}'
  + '.ltl-stage-meta{font-size:12.5px;color:var(--lcs-ink-soft);font-weight:700;}'
  + '.ltl-stage-row.locked .ltl-stage-label{color:var(--lcs-ink-soft);}'
  + '.ltl-lock{color:var(--lcs-ink-soft);display:grid;place-items:center;}'
  + '.ltl-upsell{display:flex;flex-direction:column;gap:6px;padding:10px 14px;'
  +   'background:#FDE8DE;border-radius:var(--lcs-radius-sm);font-size:13.5px;'
  +   'font-family:var(--lcs-font-body);color:var(--lcs-ink);}'
  + '.ltl-upsell a{color:#C9502A;font-weight:800;text-decoration:underline;}'
  + '.ltl-wordgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(84px,1fr));'
  +   'gap:8px;margin-top:6px;}'
  + '.ltl-wordcell{display:flex;flex-direction:column;align-items:center;gap:4px;'
  +   'padding:8px 4px;border-radius:var(--lcs-radius-sm);cursor:pointer;'
  +   'background:var(--lcs-surface);border:1.5px solid var(--lcs-line);'
  +   'font-family:var(--lcs-font-body);font-weight:700;font-size:12.5px;color:var(--lcs-ink);}'
  + '.ltl-wordcell img{width:44px;height:44px;object-fit:contain;}'
  + '.ltl-wordcell.active{border-color:var(--lcs-structure);background:var(--lcs-structure-soft);}'
  + '.ltl-hint{margin:0;font-size:13.5px;color:var(--lcs-ink-soft);font-family:var(--lcs-font-body);}'
  + '.ltl-textarea{width:100%;box-sizing:border-box;resize:vertical;'
  +   'font-family:var(--lcs-font-body);font-size:15px;padding:10px 12px;'
  +   'border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-sm);'
  +   'background:var(--lcs-surface-2);color:var(--lcs-ink);}'
  + '.ltl-btn{align-self:flex-start;font-family:var(--lcs-font-display);'
  +   'font-weight:800;font-size:14px;padding:9px 18px;border-radius:var(--lcs-radius-pill);'
  +   'cursor:pointer;background:var(--lcs-surface);border:1.5px solid var(--lcs-structure);'
  +   'color:var(--lcs-structure);}'
  + '.ltl-btn.primary{background:var(--lcs-structure);color:var(--lcs-surface);}'
  + '.ltl-btn.locked{opacity:.75;}'
  + '.ltl-draftlist{display:flex;gap:6px;flex-wrap:wrap;}'
  + '.ltl-draftchip{font-family:var(--lcs-font-display);font-weight:700;font-size:15px;'
  +   'color:var(--lcs-ink);background:var(--lcs-surface-2);'
  +   'border:1.5px solid var(--lcs-line);border-radius:8px;padding:3px 10px;'
  +   'text-transform:lowercase;}'
  + '.ltl-linkbtn{font-family:var(--lcs-font-body);font-weight:700;font-size:13px;'
  +   'color:var(--lcs-structure);background:transparent;border:none;cursor:pointer;'
  +   'text-decoration:underline;padding:0;}'
  + '.ltl-trio{margin-left:auto;display:inline-flex;align-items:center;gap:4px;'
  +   'font-size:13px;font-family:var(--lcs-font-body);}'
  + '.ltl-trio-label{color:var(--lcs-ink-soft);font-weight:700;}'
  + '.ltl-sheet{position:absolute;left:0;right:0;bottom:0;max-height:46%;overflow:auto;'
  +   'background:var(--lcs-surface);border-radius:var(--lcs-radius) var(--lcs-radius) 0 0;'
  +   'box-shadow:0 -8px 24px rgba(20,30,28,.18);z-index:60;padding:14px;'
  +   'transform:translateY(100%);transition:transform .25s var(--lcs-ease);}'
  + '.ltl-sheet.open{transform:none;}'
  + '.ltl-sheet-grid{--ltl-tile:48px;display:grid;'
  +   'grid-template-columns:repeat(auto-fill,minmax(52px,1fr));gap:8px;}'
  + '.ltl-traytile.sheet{width:100%;}'

  /* narrow phones: single-row scrollable tray + sheet button.
     ⚠ The anchor-shrink rule that used to live here is GONE. Its comment read
     "keep the letter dominant over the anchor picture at small tile sizes" —
     it was a band-aid over the absolute-positioning defect above, it only
     ever applied below 560px (so the desktop case, where the operator found
     the bug, had no mitigation at all), and it is now the same .30 size the
     base rule uses. Leaving it would silently shrink the picture on phones
     for no reason. ⚠ Note this overflow-x is also WHY the picture cannot
     hang outside the tile: a non-visible overflow on one axis forces the
     other to auto, which clips it. */
  + '@media (max-width:560px){'
  +   '.ltl-tray{flex-wrap:nowrap;overflow-x:auto;justify-content:flex-start;'
  +     'scrollbar-width:thin;}'
  +   '.ltl-group{flex-wrap:nowrap;}'
  +   '.ltl-sheetbtn{display:grid;}'
  + '}'

  /* reduced motion */
  + '@media (prefers-reduced-motion: reduce){'
  +   '.ltl-tile,.ltl-traytile{transform:none !important;}'
  +   '.ltl-tile.ltl-settle,.ltl-badge,.ltl-wiggle{animation:none;}'
  +   '.ltl-traytile:hover{transform:none;}'
  + '}';
  var tag = document.createElement('style'); tag.textContent = css;
  document.head.appendChild(tag);
}());
