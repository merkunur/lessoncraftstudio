/* =====================================================================
   TOOL #5 — BLENDING BOARD   (blending-board.js)
   ---------------------------------------------------------------------
   Free-play manipulative (no `tasks`). Tool #2 of the Premium Tools
   Program pilot wave — the decoding sibling of Sound Boxes (tool #1):
   Sound Boxes = word → sounds (segmenting); Blending Board = sounds →
   word (blending).

   PEDAGOGY (locked by the 2026-07-16 expert-ensemble design):
     2–3 CARD COLUMNS (onset/vowel/coda, or syllable×syllable), each a
     swipeable ring-stack of grapheme cards. Flick a column (or tap its
     chevrons) → a new word stands. The BLEND SWEEP pulses each card in
     order at sweep pace — a visual metronome for continuous blending:
     THE CLASS voices the sounds (NO per-card audio EVER — the tool #1
     no-isolated-phoneme lock, extended); TTS speaks only the finished
     WHOLE word. Then the badge reveals: picture (real + illustrated),
     neutral tick (real, no image), or the friendly ROBOT (nonsense —
     "robot words" are decoding proof, never a trick). Badge only AFTER
     the blend (before it, children word-guess from the picture).
     Nonsense-word TTS is a per-locale deck flag (`nonwordTTS`) — ON in
     transparent orthographies, OFF where TTS mangles pseudowords.
     `sensitive`-flagged combos: real but no badge, never spoken.
     Clusters (st, fl) are ONE seamed card (sounds:2) — never a fourth
     column, which would manufacture illegal junk combos.
     No timers, no scores, no shame anywhere.

   DECKS ARE SCOPES: a deck = a stage of the locale's phonics
   progression, hand-classified over its FULL combo space (the `real`
   map; absence = robot word) in blending-board-deck-<locale>.json.
   The premium "My deck" editor is a SUBSET builder (toggle cards off
   until the deck matches "what we know") — a subset's combos are a
   subset of the base's, so the hand-marked map still covers it.
   ===================================================================== */
var BlendingBoard = {
  id: 'blending-board',

  /* CURATION FLAG: reviewed per-locale during the native fan-out;
     sv/da/no/fi carry [NSR-FLAG] until a native-speaker pass. */
  strings: {
    title:        {en:'Blending Board',de:'Lesemaschine',fr:'Tableau de syllabes',it:'Tabellone delle sillabe',es:'Tablero de sílabas',pt:'Quadro de sílabas',nl:'Klankenbord',sv:'Ljudtavla',da:'Lydtavle',no:'Lydtavle',fi:'Tavutaulu'},
    instruction:  {en:'Flick a column to build a word. Sweep across the cards to blend it.',de:'Wische eine Spalte, um ein Wort zu bauen. Streiche über die Karten, um es zusammenzuziehen.',fr:'Fais défiler une colonne pour former une syllabe ou un mot, puis balaie les cartes pour fusionner.',it:'Fai scorrere una colonna per formare una parola. Scorri sulle carte per unire i suoni.',es:'Desliza una columna para formar una palabra. Pasa el dedo por las tarjetas para unir los sonidos.',pt:'Deslize uma coluna para formar uma palavra. Passe o dedo pelas cartas para juntar os sons.',nl:'Veeg een kolom om een woord te bouwen. Veeg over de kaarten om te plakken.',sv:'Svep en kolumn för att bygga ett ord. Dra över korten för att ljuda ihop det.',da:'Svirp en kolonne for at bygge et ord. Stryg hen over kortene for at trække lydene sammen.',no:'Sveip en kolonne for å bygge et ord. Dra over kortene for å trekke lydene sammen.',fi:'Pyyhkäise saraketta ja rakenna sana. Vedä korttien yli, niin äänteet liukuvat yhteen.'},

    /* settings drawer */
    letterCase:   {en:'Letters',de:'Buchstaben',fr:'Lettres',it:'Lettere',es:'Letras',pt:'Letras',nl:'Letters',sv:'Bokstäver',da:'Bogstaver',no:'Bokstaver',fi:'Kirjaimet'},
    caseLower:    {en:'abc',de:'abc',fr:'abc',it:'abc',es:'abc',pt:'abc',nl:'abc',sv:'abc',da:'abc',no:'abc',fi:'abc'},
    caseUpper:    {en:'ABC',de:'ABC',fr:'ABC',it:'ABC',es:'ABC',pt:'ABC',nl:'ABC',sv:'ABC',da:'ABC',no:'ABC',fi:'ABC'},
    badges:       {en:'Word badges',de:'Wort-Symbole',fr:'Badges de mots',it:'Figurine delle parole',es:'Insignias de palabras',pt:'Figurinhas das palavras',nl:'Woordbadges',sv:'Ordmärken',da:'Ordmærker',no:'Ordmerker',fi:'Sanojen kuvat'},
    badgesAfter:  {en:'Reveal after blending',de:'Nach dem Zusammenziehen',fr:'Après la fusion',it:'Dopo aver unito i suoni',es:'Al unir los sonidos',pt:'Depois de juntar',nl:'Na het plakken',sv:'Efter ihopljudning',da:'Når lydene er trukket sammen',no:'Etter sammentrekking',fi:'Yhdistämisen jälkeen'},
    badgesHidden: {en:'Hidden',de:'Versteckt',fr:'Cachés',it:'Nascosti',es:'Ocultas',pt:'Escondidas',nl:'Verborgen',sv:'Dolda',da:'Skjulte',no:'Skjulte',fi:'Piilossa'},
    vowelTint:    {en:'Colour the vowel column',de:'Vokalspalte einfärben',fr:'Colorer la colonne des voyelles',it:'Colora la colonna delle vocali',es:'Colorear la columna de vocales',pt:'Colorir a coluna das vogais',nl:'Klinkerkolom kleuren',sv:'Färga vokalkolumnen',da:'Farv vokalkolonnen',no:'Farg vokalkolonnen',fi:'Väritä vokaalisarake'},
    speakOnBlend: {en:'Say the word after blending',de:'Wort nach dem Zusammenziehen vorsprechen',fr:'Dire le mot après la fusion',it:'Pronuncia la parola dopo aver unito i suoni',es:'Decir la palabra al unir',pt:'Dizer a palavra depois de juntar',nl:'Woord uitspreken na het plakken',sv:'Säg ordet efter ihopljudning',da:'Sig ordet, når lydene er trukket sammen',no:'Si ordet etter sammentrekking',fi:'Sano sana yhdistämisen jälkeen'},
    flickSound:   {en:'Card sounds',de:'Kartentöne',fr:'Sons des cartes',it:'Suoni delle carte',es:'Sonidos de las tarjetas',pt:'Sons das cartas',nl:'Kaartgeluiden',sv:'Kortljud',da:'Kortlyde',no:'Kortlyder',fi:'Korttiäänet'},

    /* panel */
    deckList:     {en:'Decks',de:'Kartensätze',fr:'Jeux de cartes',it:'Mazzi',es:'Barajas',pt:'Baralhos',nl:'Kaartensets',sv:'Kortlekar',da:'Kortsæt',no:'Kortsett',fi:'Korttisarjat'},
    myDeckTab:    {en:'My deck',de:'Mein Kartensatz',fr:'Mon jeu',it:'Il mio mazzo',es:'Mi baraja',pt:'Meu baralho',nl:'Mijn set',sv:'Min kortlek',da:'Mit kortsæt',no:'Mitt kortsett',fi:'Oma sarja'},
    wordsCount:   {en:'{n} real words',de:'{n} echte Wörter',fr:'{n} vrais mots',it:'{n} parole vere',es:'{n} palabras reales',pt:'{n} palavras de verdade',nl:'{n} echte woorden',sv:'{n} riktiga ord',da:'{n} rigtige ord',no:'{n} ekte ord',fi:'{n} oikeaa sanaa'},
    combosLine:   {en:'{c} combinations · {r} real words hiding',de:'{c} Kombinationen · {r} echte Wörter versteckt',fr:'{c} combinaisons · {r} vrais mots cachés',it:'{c} combinazioni · {r} parole vere nascoste',es:'{c} combinaciones · {r} palabras reales escondidas',pt:'{c} combinações · {r} palavras de verdade escondidas',nl:'{c} combinaties · {r} echte woorden verstopt',sv:'{c} kombinationer · {r} riktiga ord gömda',da:'{c} kombinationer · {r} rigtige ord gemt',no:'{c} kombinasjoner · {r} ekte ord gjemt',fi:'{c} yhdistelmää · {r} oikeaa sanaa piilossa'},
    tapOffHint:   {en:'Tap off the cards your class hasn’t learned yet.',de:'Schalte die Karten aus, die eure Klasse noch nicht gelernt hat.',fr:'Désactive les cartes que ta classe n’a pas encore apprises.',it:'Disattiva le carte che la classe non ha ancora imparato.',es:'Desactiva las tarjetas que tu clase aún no ha aprendido.',pt:'Desative as cartas que a turma ainda não aprendeu.',nl:'Zet de kaarten uit die je klas nog niet heeft geleerd.',sv:'Stäng av korten som klassen inte har lärt sig än.',da:'Slå de kort fra, som klassen ikke har lært endnu.',no:'Slå av kortene klassen ikke har lært ennå.',fi:'Poista käytöstä kortit, joita luokka ei vielä osaa.'},
    baseDeck:     {en:'Start from',de:'Ausgangs-Kartensatz',fr:'À partir de',it:'Parti da',es:'A partir de',pt:'A partir de',nl:'Beginnen met',sv:'Utgå från',da:'Start fra',no:'Start fra',fi:'Pohjana'},
    useThisDeck:  {en:'Use this deck',de:'Diesen Kartensatz verwenden',fr:'Utiliser ce jeu',it:'Usa questo mazzo',es:'Usar esta baraja',pt:'Usar este baralho',nl:'Deze set gebruiken',sv:'Använd denna kortlek',da:'Brug dette kortsæt',no:'Bruk dette kortsettet',fi:'Käytä tätä sarjaa'},
    premiumLine:  {en:'Custom decks are part of Premium — your starter deck is always free.',de:'Eigene Kartensätze gehören zu Premium – der erste Kartensatz bleibt immer kostenlos.',fr:'Les jeux personnalisés font partie de Premium – le jeu de départ reste gratuit.',it:'I mazzi personalizzati fanno parte di Premium: il mazzo iniziale resta gratuito.',es:'Las barajas personalizadas son parte de Premium: la baraja inicial siempre es gratis.',pt:'Baralhos personalizados fazem parte do Premium — o baralho inicial é sempre gratuito.',nl:'Eigen kaartensets horen bij Premium – de startset blijft altijd gratis.',sv:'Egna kortlekar ingår i Premium – startleken är alltid gratis.',da:'Egne kortsæt er en del af Premium – startsættet er altid gratis.',no:'Egne kortsett er en del av Premium – startsettet er alltid gratis.',fi:'Omat korttisarjat kuuluvat Premiumiin – aloitussarja on aina ilmainen.'},
    unlockLine:   {en:'Unlock all decks',de:'Alle Kartensätze freischalten',fr:'Débloquer tous les jeux',it:'Sblocca tutti i mazzi',es:'Desbloquear todas las barajas',pt:'Desbloquear todos os baralhos',nl:'Alle sets ontgrendelen',sv:'Lås upp alla kortlekar',da:'Lås alle kortsæt op',no:'Lås opp alle kortsett',fi:'Avaa kaikki sarjat'},
    lockedLabel:  {en:'Premium',de:'Premium',fr:'Premium',it:'Premium',es:'Premium',pt:'Premium',nl:'Premium',sv:'Premium',da:'Premium',no:'Premium',fi:'Premium'},
    copyLink:     {en:'Copy link to this word',de:'Link zu diesem Wort kopieren',fr:'Copier le lien vers ce mot',it:'Copia il link a questa parola',es:'Copiar el enlace de esta palabra',pt:'Copiar link desta palavra',nl:'Link naar dit woord kopiëren',sv:'Kopiera länk till ordet',da:'Kopiér link til ordet',no:'Kopier lenke til ordet',fi:'Kopioi linkki tähän sanaan'},
    copied:       {en:'Link copied!',de:'Link kopiert!',fr:'Lien copié !',it:'Link copiato!',es:'¡Enlace copiado!',pt:'Link copiado!',nl:'Link gekopieerd!',sv:'Länk kopierad!',da:'Link kopieret!',no:'Lenke kopiert!',fi:'Linkki kopioitu!'},
    siblingLink:  {en:'Segmenting today? → Sound Boxes',de:'Heute Laute gliedern? → Lautboxen',fr:'Segmenter aujourd’hui ? → Boîtes à sons',it:'Oggi segmentate? → Caselle dei suoni',es:'¿Hoy toca separar sonidos? → Cajas de sonidos',pt:'Hoje é dia de separar sons? → Caixas de sons',nl:'Vandaag hakken? → Klankdozen',sv:'Ljuda isär i dag? → Ljudrutor',da:'Lytte lyde ud i dag? → Lydbokse',no:'Lytte ut lyder i dag? → Lydbokser',fi:'Tänään äänteiden erottelua? → Äännelaatikot'},

    /* stage + aria */
    blendWord:    {en:'Blend the word',de:'Laute zusammenziehen',fr:'Fusionner les sons',it:'Unisci i suoni',es:'Unir los sonidos',pt:'Juntar os sons',nl:'Klanken plakken',sv:'Ljuda ihop ordet',da:'Træk lydene sammen',no:'Trekk lydene sammen',fi:'Yhdistä äänteet sanaksi'},
    shuffle:      {en:'Surprise word',de:'Überraschungswort',fr:'Mot surprise',it:'Parola a sorpresa',es:'Palabra sorpresa',pt:'Palavra surpresa',nl:'Verrassingswoord',sv:'Överraskningsord',da:'Overraskelsesord',no:'Overraskelsesord',fi:'Yllätyssana'},
    robotWord:    {en:'robot word!',de:'Quatschwort!',fr:'mot inventé !',it:'parola inventata!',es:'¡palabra inventada!',pt:'palavra-robô!',nl:'robotwoord!',sv:'tramsord!',da:'vrøvleord!',no:'tulleord!',fi:'robottisana!'},
    realWord:     {en:'a real word!',de:'ein echtes Wort!',fr:'un vrai mot !',it:'una parola vera!',es:'¡una palabra real!',pt:'palavra de verdade!',nl:'een echt woord!',sv:'ett riktigt ord!',da:'et rigtigt ord!',no:'et ekte ord!',fi:'oikea sana!'},
    colOnset:     {en:'First sound',de:'Anfangslaut',fr:'Premier son',it:'Primo suono',es:'Primer sonido',pt:'Primeiro som',nl:'Eerste klank',sv:'Första ljudet',da:'Første lyd',no:'Første lyd',fi:'Alkuäänne'},
    colVowel:     {en:'Vowel',de:'Vokal',fr:'Voyelle',it:'Vocale',es:'Vocal',pt:'Vogal',nl:'Klinker',sv:'Vokal',da:'Vokal',no:'Vokal',fi:'Vokaali'},
    colCoda:      {en:'Ending sound',de:'Endlaut',fr:'Dernier son',it:'Suono finale',es:'Sonido final',pt:'Som final',nl:'Eindklank',sv:'Sista ljudet',da:'Sidste lyd',no:'Sluttlyd',fi:'Loppuäänne'},
    colSyl1:      {en:'First syllable',de:'Erste Silbe',fr:'Première syllabe',it:'Prima sillaba',es:'Primera sílaba',pt:'Primeira sílaba',nl:'Eerste klankgroep',sv:'Första stavelsen',da:'Første stavelse',no:'Første stavelse',fi:'Ensimmäinen tavu'},
    colSyl2:      {en:'Second syllable',de:'Zweite Silbe',fr:'Deuxième syllabe',it:'Seconda sillaba',es:'Segunda sílaba',pt:'Segunda sílaba',nl:'Tweede klankgroep',sv:'Andra stavelsen',da:'Anden stavelse',no:'Andre stavelse',fi:'Toinen tavu'},
    colSyl3:      {en:'Third syllable',de:'Dritte Silbe',fr:'Troisième syllabe',it:'Terza sillaba',es:'Tercera sílaba',pt:'Terceira sílaba',nl:'Derde klankgroep',sv:'Tredje stavelsen',da:'Tredje stavelse',no:'Tredje stavelse',fi:'Kolmas tavu'},
    nextCard:     {en:'Next card',de:'Nächste Karte',fr:'Carte suivante',it:'Carta successiva',es:'Tarjeta siguiente',pt:'Próxima carta',nl:'Volgende kaart',sv:'Nästa kort',da:'Næste kort',no:'Neste kort',fi:'Seuraava kortti'},
    prevCard:     {en:'Previous card',de:'Vorherige Karte',fr:'Carte précédente',it:'Carta precedente',es:'Tarjeta anterior',pt:'Carta anterior',nl:'Vorige kaart',sv:'Föregående kort',da:'Forrige kort',no:'Forrige kort',fi:'Edellinen kortti'},
    wordNow:      {en:'The word is now: {w}.',de:'Das Wort ist jetzt: {w}.',fr:'Le mot est maintenant : {w}.',it:'La parola ora è: {w}.',es:'La palabra ahora es: {w}.',pt:'A palavra agora é: {w}.',nl:'Het woord is nu: {w}.',sv:'Ordet är nu: {w}.',da:'Ordet er nu: {w}.',no:'Ordet er nå: {w}.',fi:'Sana on nyt: {w}.'},
    isReal:       {en:'{w} — a real word!',de:'{w} – ein echtes Wort!',fr:'{w} — un vrai mot !',it:'{w} — una parola vera!',es:'{w}: ¡una palabra real!',pt:'{w} — uma palavra de verdade!',nl:'{w} — een echt woord!',sv:'{w} — ett riktigt ord!',da:'{w} — et rigtigt ord!',no:'{w} — et ekte ord!',fi:'{w} — oikea sana!'},
    isRobot:      {en:'{w} — a robot word!',de:'{w} – ein Quatschwort!',fr:'{w} — un mot inventé !',it:'{w} — una parola inventata!',es:'{w}: ¡una palabra inventada!',pt:'{w} — uma palavra-robô!',nl:'{w} — een robotwoord!',sv:'{w} — ett tramsord!',da:'{w} — et vrøvleord!',no:'{w} — et tulleord!',fi:'{w} — robottisana!'},
    loading:      {en:'Loading cards…',de:'Karten werden geladen…',fr:'Chargement des cartes…',it:'Caricamento carte…',es:'Cargando tarjetas…',pt:'Carregando cartas…',nl:'Kaarten laden…',sv:'Laddar kort…',da:'Indlæser kort…',no:'Laster kort…',fi:'Ladataan kortteja…'}
  },

  defaults: {
    letterCase: 'lower', badges: 'after', vowelTint: true,
    speakOnBlend: true, flickSound: true
  },

  settings: [
    { key:'letterCase', type:'choice', labelKey:'letterCase', options:[
        { value:'lower', labelKey:'caseLower' },
        { value:'upper', labelKey:'caseUpper' }
    ]},
    { key:'badges', type:'choice', labelKey:'badges', options:[
        { value:'after',  labelKey:'badgesAfter'  },
        { value:'hidden', labelKey:'badgesHidden' }
    ]},
    { key:'vowelTint',    type:'toggle', labelKey:'vowelTint'    },
    { key:'speakOnBlend', type:'toggle', labelKey:'speakOnBlend' },
    { key:'flickSound',   type:'toggle', labelKey:'flickSound'   }
  ],

  PITCHES: [523, 587, 659, 698, 784],
  STORE_KEY: 'lcs:blending-board:v1',

  /* Tiny inline fallback (offline / 404): the EN starter, trimmed. */
  FALLBACK_DATA: {
    locale: 'en', version: 0,
    decks: [{
      id: 'en-cvc-1', label: 'First words', free: true, type: 'word', stage: 's1',
      scope: ['s','m','t','p','c','h','a','i','o','n','g','d'], nonwordTTS: false,
      columns: [
        { role: 'onset', cards: ['s','m','t','p','c','h'] },
        { role: 'vowel', cards: ['a','i','o'] },
        { role: 'coda',  cards: ['t','n','p','g','d'] }
      ],
      real: {
        sat:{}, sit:{}, sad:{}, sap:{}, sip:{}, sin:{}, mat:{}, man:{}, mad:{},
        map:{noun:'map',themeDir:'camping'}, mop:{noun:'mop',themeDir:'around the house'},
        tan:{}, tap:{}, tin:{}, tip:{}, top:{}, pat:{}, pig:{noun:'pig',themeDir:'animals'},
        pin:{}, pit:{}, pot:{noun:'pot',themeDir:'around the house'},
        cat:{noun:'cat',themeDir:'animals'}, can:{noun:'can',themeDir:'At the Supermarket'},
        cap:{noun:'cap',themeDir:'accessories'}, cot:{}, cop:{},
        hat:{noun:'hat',themeDir:'accessories'}, hit:{}, hot:{}, hop:{}, hog:{}
      },
      chains: [], comboAudit: 'inline fallback subset of the shipped en starter deck'
    }]
  },

  /* =========================== lifecycle =========================== */

  init: function (api) {
    this.api = api;
    this.data = null;
    this.deckId = null;
    this.pos = [];
    this.premium = false;
    this.premiumKnown = false;
    this._blended = false;
    this._panelTab = 'decks';
    this._editorBase = null;      /* base deck id in the My-deck editor */
    this._editorEnabled = null;   /* {role: Set(values)} draft */
    this._hinted = false;

    this._store = this._loadStore();
    var saved = this._store.settings || {};
    for (var k in saved) {
      if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];
    }

    var params = new URLSearchParams(location.search);
    this._deepDeck = params.get('deck');
    this._deepCards = params.get('cards');

    this._fetchDecks();
    this._fetchEntitlement();
  },

  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY)) || {}; }
    catch (_) { return {}; }
  },
  _saveStore: function () {
    var s = this._store;
    s.lastDeckId = this.deckId;
    s.lastPositionByDeck = s.lastPositionByDeck || {};
    s.lastPositionByDeck[this.deckId] = this.pos.slice();
    s.settings = {};
    for (var i = 0; i < this.settings.length; i++) {
      var key = this.settings[i].key;
      s.settings[key] = this.api.settings[key];
    }
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(s)); } catch (_) {}
  },

  _fetchDecks: function () {
    var self = this;
    fetch('/mini-tools/blending-board-deck-' + this.api.lang + '.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .catch(function () { return self.FALLBACK_DATA; })
      .then(function (data) {
        self.data = data;
        self._applyEntryState();
        self.render();
      });
  },

  _applyEntryState: function () {
    var s = this._store;
    var deckId = null;
    if (this._deepDeck && this._deckById(this._deepDeck)) deckId = this._deepDeck;
    else if (s.lastDeckId && (s.lastDeckId === 'custom' ? this._customDeck() : this._deckById(s.lastDeckId))) deckId = s.lastDeckId;
    else deckId = this._firstFreeDeck();
    this.deckId = deckId;

    var deck = this.activeDeck();
    var n = deck ? deck.columns.length : 0;
    this.pos = [];
    for (var i = 0; i < n; i++) this.pos.push(0);

    if (this._deepCards && deck) {
      var vals = this._deepCards.split('.');
      for (var c = 0; c < Math.min(vals.length, n); c++) {
        var idx = deck.columns[c].cards.findIndex(function (card) {
          return (typeof card === 'string' ? card : card.g) === vals[c];
        });
        if (idx >= 0) this.pos[c] = idx;
      }
    } else if (s.lastPositionByDeck && Array.isArray(s.lastPositionByDeck[deckId])) {
      var saved = s.lastPositionByDeck[deckId];
      for (var p = 0; p < n; p++) {
        if (typeof saved[p] === 'number' && deck.columns[p] && saved[p] < deck.columns[p].cards.length) this.pos[p] = saved[p];
      }
    }
    this._deepDeck = this._deepCards = null;
  },

  _fetchEntitlement: function () {
    /* Single seam (tool #1 pattern): premium via the platform token;
       any failure → free tier. */
    var self = this;
    var token = null;
    try { token = localStorage.getItem('accessToken'); } catch (_) {}
    if (!token) { this.premiumKnown = true; return; }
    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        var tier = j && j.user && j.user.subscriptionTier;
        var sub = j && j.subscription;
        self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
        self.premiumKnown = true;
        if (self._panelEl) self._renderPanel();
      })
      .catch(function () { self.premiumKnown = true; });
  },

  /* ============================ data =============================== */

  _decks: function () { return (this.data && this.data.decks) || []; },
  _deckById: function (id) {
    var d = this._decks();
    for (var i = 0; i < d.length; i++) if (d[i].id === id) return d[i];
    return null;
  },
  _firstFreeDeck: function () {
    var d = this._decks();
    for (var i = 0; i < d.length; i++) if (d[i].free) return d[i].id;
    return d.length ? d[0].id : null;
  },
  _deckUnlocked: function (deck) { return !!(deck && (deck.free || this.premium)); },

  /* Materialize the custom deck (a card-subset of a base deck). */
  _customDeck: function () {
    var cd = this._store.customDeck;
    if (!cd || !cd.baseId) return null;
    var base = this._deckById(cd.baseId);
    if (!base) return null;
    var cols = [];
    for (var i = 0; i < base.columns.length; i++) {
      var col = base.columns[i];
      var enabled = (cd.enabled && cd.enabled[col.role]) || [];
      var cards = col.cards.filter(function (card) {
        return enabled.indexOf(typeof card === 'string' ? card : card.g) >= 0;
      });
      if (!cards.length) return null;   /* empty column = invalid custom */
      cols.push({ role: col.role, cards: cards });
    }
    return {
      id: 'custom', label: this.api.t('myDeckTab'), free: false,
      type: base.type, stage: base.stage, nonwordTTS: base.nonwordTTS,
      columns: cols, real: base.real || {}, chains: []
    };
  },

  activeDeck: function () {
    if (this.deckId === 'custom') return this._customDeck();
    return this._deckById(this.deckId);
  },

  cardAt: function (deck, c) {
    var card = deck.columns[c].cards[this.pos[c] % deck.columns[c].cards.length];
    return typeof card === 'string' ? { g: card, sounds: 1 } : { g: card.g, sounds: card.sounds || 1 };
  },

  currentWord: function () {
    var deck = this.activeDeck();
    if (!deck) return '';
    var w = '';
    for (var c = 0; c < deck.columns.length; c++) w += this.cardAt(deck, c).g;
    return w.toLowerCase();
  },

  realEntry: function () {
    var deck = this.activeDeck();
    if (!deck || deck.type === 'syllable') return null;
    return (deck.real || {})[this.currentWord()] || null;
  },

  isSensitive: function (entry) {
    return !!(entry && Array.isArray(entry.flags) && entry.flags.indexOf('sensitive') >= 0);
  },

  pitchFor: function (c, n) {
    var idx = n <= 1 ? 2 : Math.round(c * (this.PITCHES.length - 1) / (n - 1));
    return this.PITCHES[idx];
  },

  colLabel: function (role) {
    var map = { onset: 'colOnset', vowel: 'colVowel', coda: 'colCoda', syl1: 'colSyl1', syl2: 'colSyl2', syl3: 'colSyl3' };
    return this.api.t(map[role] || 'colOnset');
  },

  fmt: function (key, args) {
    var s = this.api.t(key);
    return s.replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; });
  },

  imgUrl: function (e) {
    return '/image-library-webp/themes/' + e.themeDir + '/' + e.noun + '@2x.webp';
  },

  _reducedMotion: function () {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  /* ============================ render ============================== */

  render: function () {
    var api = this.api, self = this;
    var stage = api.stage;
    stage.innerHTML = '';
    document.body.classList.add('bbd-wide');

    var wrap = api.el('div', 'bbd-wrap');
    stage.appendChild(wrap);
    this._wrap = wrap;

    if (!this.data) {
      var load = api.el('div', 'bbd-loading');
      load.textContent = api.t('loading');
      wrap.appendChild(load);
      return;
    }
    var deck = this.activeDeck();
    if (!deck) { this.deckId = this._firstFreeDeck(); deck = this.activeDeck(); }
    if (!deck) return;
    var n = deck.columns.length;
    if (this.pos.length !== n) { this.pos = []; for (var z = 0; z < n; z++) this.pos.push(0); }
    this._blended = false;

    /* ---- deck pill ---- */
    var pillRow = api.el('div', 'bbd-pillrow');
    var pill = api.el('button', 'bbd-pill');
    pill.type = 'button';
    var realCount = deck.type === 'word' ? Object.keys(deck.real || {}).length : 0;
    pill.textContent = deck.label + (deck.type === 'word' ? '  ·  ' + this.fmt('wordsCount', { n: realCount }) : '');
    pill.setAttribute('aria-label', api.t('deckList'));
    pill.addEventListener('click', function () { self._openPanel(); });
    pillRow.appendChild(pill);
    wrap.appendChild(pillRow);

    /* ---- badge slot (fixed, zero layout shift) ---- */
    var slot = api.el('div', 'bbd-badge-slot');
    if (deck.type === 'syllable') slot.classList.add('none');
    else slot.innerHTML = '<div class="bbd-badge-empty" aria-hidden="true"></div>';
    wrap.appendChild(slot);
    this._slotEl = slot;

    /* ---- column row ---- */
    var colRow = api.el('div', 'bbd-colrow');
    colRow.style.setProperty('--bbd-n', String(n));
    this._colEls = [];
    for (var c = 0; c < n; c++) this._buildColumn(colRow, deck, c, n);
    wrap.appendChild(colRow);
    this._colRow = colRow;

    /* ---- blend bar + shuffle ---- */
    var ctlRow = api.el('div', 'bbd-ctlrow');
    var blend = api.el('div', 'bbd-blendbar');
    blend.setAttribute('role', 'button');
    blend.setAttribute('tabindex', '0');
    blend.setAttribute('aria-label', api.t('blendWord'));
    blend.innerHTML = '<span class="bbd-chevrons" aria-hidden="true">›››</span>';
    this._attachBlendBar(blend);
    var shuffle = api.el('button', 'bbd-shuffle');
    shuffle.type = 'button';
    shuffle.setAttribute('aria-label', api.t('shuffle'));
    shuffle.title = api.t('shuffle');
    shuffle.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.2" cy="8.2" r="1.6" fill="currentColor" stroke="none"/><circle cx="15.8" cy="8.2" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="8.2" cy="15.8" r="1.6" fill="currentColor" stroke="none"/><circle cx="15.8" cy="15.8" r="1.6" fill="currentColor" stroke="none"/></svg>';
    shuffle.addEventListener('click', function () { self.shuffleAll(); });
    ctlRow.append(blend, shuffle);
    wrap.appendChild(ctlRow);
    this._blendEl = blend;

    /* one-time hint sweep */
    if (!this._hinted && !this._reducedMotion()) {
      this._hinted = true;
      blend.classList.add('hint');
      setTimeout(function () { blend.classList.remove('hint'); }, 1600);
    }

    /* keyboard */
    if (!this._keysBound) {
      this._keysBound = true;
      document.addEventListener('keydown', function (e) {
        if (e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
        if (self._panelEl && self._panelEl.classList.contains('open')) return;
        if (e.key === 'b' || e.key === 'B') { self.autoBlend(); }
        else if (e.key === 's' || e.key === 'S') { self.shuffleAll(); }
      });
    }

    this.paint();
  },

  _buildColumn: function (row, deck, c, n) {
    var api = this.api, self = this;
    var group = api.el('div', 'bbd-colgroup');
    var role = deck.columns[c].role;
    var isVowel = role === 'vowel' && api.settings.vowelTint;
    var count = deck.columns[c].cards.length;

    var up = api.el('button', 'bbd-chev up');
    up.type = 'button';
    up.setAttribute('aria-label', api.t('prevCard') + ', ' + this.colLabel(role));
    up.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 15l7-7 7 7"/></svg>';
    up.addEventListener('click', function () { self.flick(c, -1); });

    var well = api.el('div', 'bbd-well' + (isVowel ? ' vowel' : ''));
    var card = api.el('div', 'bbd-card');
    card.setAttribute('role', 'spinbutton');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', this.colLabel(role));
    card.setAttribute('aria-valuemin', '1');
    card.setAttribute('aria-valuemax', String(count));
    card.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp') { e.preventDefault(); self.flick(c, -1); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); self.flick(c, 1); }
      else if (e.key === 'Home') { e.preventDefault(); self.setPos(c, 0); }
      else if (e.key === 'End') { e.preventDefault(); self.setPos(c, count - 1); }
      else if (e.key === 'ArrowLeft' && c > 0) { e.preventDefault(); self._colEls[c - 1].card.focus(); }
      else if (e.key === 'ArrowRight' && c < n - 1) { e.preventDefault(); self._colEls[c + 1].card.focus(); }
    });
    this._attachCardGesture(card, c);
    well.appendChild(card);
    if (count > 1) {
      var peek = api.el('div', 'bbd-peek');
      peek.setAttribute('aria-hidden', 'true');
      well.appendChild(peek);
    }

    var down = api.el('button', 'bbd-chev down');
    down.type = 'button';
    down.setAttribute('aria-label', api.t('nextCard') + ', ' + this.colLabel(role));
    down.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 9l7 7 7-7"/></svg>';
    down.addEventListener('click', function () { self.flick(c, 1); });

    if (count <= 1) { up.style.visibility = 'hidden'; down.style.visibility = 'hidden'; well.classList.add('single'); }
    group.append(up, well, down);
    row.appendChild(group);
    this._colEls.push({ group: group, well: well, card: card, up: up, down: down });
  },

  /* card face HTML: per-letter spans with dotted seams on cluster cards */
  _faceHTML: function (cardInfo, isVowel) {
    var g = cardInfo.g;
    var cls = 'bbd-face' + (isVowel ? ' vowel' : '') + (g.length > 1 ? ' multi' : '');
    if (cardInfo.sounds > 1) {
      var parts = g.split('').map(function (ch) { return '<span class="bbd-seg">' + ch + '</span>'; });
      return '<span class="' + cls + ' seamed">' + parts.join('<span class="bbd-seam" aria-hidden="true"></span>') + '</span>';
    }
    var tie = (g.length > 1)
      ? '<svg class="bbd-tie" viewBox="0 0 60 12" aria-hidden="true"><path d="M4 2 Q30 14 56 2" fill="none" stroke="#F2784B" stroke-width="3" stroke-linecap="round"/></svg>'
      : '';
    return '<span class="' + cls + '"><span class="bbd-face-txt">' + g + '</span>' + tie + '</span>';
  },

  paint: function () {
    var deck = this.activeDeck();
    if (!deck || !this._colEls) return;
    var api = this.api;
    for (var c = 0; c < deck.columns.length; c++) {
      var info = this.cardAt(deck, c);
      var el = this._colEls[c];
      var isVowel = deck.columns[c].role === 'vowel' && api.settings.vowelTint;
      el.well.classList.toggle('vowel', isVowel);
      el.card.innerHTML = this._faceHTML(info, isVowel);
      el.card.setAttribute('aria-valuenow', String((this.pos[c] % deck.columns[c].cards.length) + 1));
      el.card.setAttribute('aria-valuetext', info.g);
    }
    this._wrap.classList.toggle('upper', api.settings.letterCase === 'upper');
    /* blend bar width bound to the column row (hero stays widest) — but
       capped so the shuffle die always fits beside it on narrow phones */
    var self = this;
    requestAnimationFrame(function () {
      if (!self._colEls || !self._colEls.length || !self._blendEl) return;
      var first = self._colEls[0].well.getBoundingClientRect();
      var last = self._colEls[self._colEls.length - 1].well.getBoundingClientRect();
      var w = Math.round(last.right - first.left);
      var row = self._blendEl.parentNode;
      if (row && row.clientWidth) w = Math.min(w, row.clientWidth - 44 - 24);
      if (w > 40) self._blendEl.style.width = w + 'px';
    });
    this._saveStore();
  },

  reset: function () {
    var deck = this.activeDeck();
    if (!deck) return;
    this.pos = deck.columns.map(function () { return 0; });
    this._clearBadge();
    this.paint();
  },

  onSettings: function (key) {
    this._saveStore();
  },

  /* ========================= interactions ========================== */

  setPos: function (c, idx) {
    var deck = this.activeDeck();
    if (!deck) return;
    var count = deck.columns[c].cards.length;
    this.pos[c] = ((idx % count) + count) % count;
    this._afterFlick(c);
  },

  flick: function (c, dir) {
    var deck = this.activeDeck();
    if (!deck) return;
    var count = deck.columns[c].cards.length;
    if (count < 2) return;
    this.pos[c] = ((this.pos[c] + dir) % count + count) % count;
    this._animateFlick(c, dir);
    this._afterFlick(c);
  },

  _animateFlick: function (c, dir) {
    var el = this._colEls && this._colEls[c];
    if (!el || this._reducedMotion()) return;
    var card = el.card;
    card.classList.remove('bbd-in-up', 'bbd-in-down');
    void card.offsetWidth;
    card.classList.add(dir > 0 ? 'bbd-in-up' : 'bbd-in-down');
  },

  _afterFlick: function (c) {
    var api = this.api, deck = this.activeDeck();
    this._blended = false;
    this._clearBadge();
    if (api.settings.flickSound) api.sound(this.pitchFor(c, deck.columns.length));
    this.paint();
    var word = this.currentWord();
    api.announce(this.cardAt(deck, c).g + '. ' + this.fmt('wordNow', { w: word.split('').join(' – ') }));
    api.track('flick', { col: c, word: word });
  },

  shuffleAll: function () {
    var deck = this.activeDeck(), self = this;
    if (!deck) return;
    var n = deck.columns.length;
    for (var c = 0; c < n; c++) {
      (function (col) {
        setTimeout(function () {
          var count = deck.columns[col].cards.length;
          if (count > 1) {
            var next = self.pos[col];
            while (next === self.pos[col]) next = Math.floor(Math.random() * count);
            self.pos[col] = next;
            self._animateFlick(col, 1);
            if (self.api.settings.flickSound) self.api.sound(self.pitchFor(col, n));
          }
          if (col === n - 1) {
            /* never let the die land on a sensitive combo — silently
               advance the first column until clear (bounded walk) */
            var guard = 0;
            while (self.isSensitive(self.realEntry()) && guard++ < deck.columns[0].cards.length) {
              self.pos[0] = (self.pos[0] + 1) % deck.columns[0].cards.length;
            }
            self._blended = false;
            self._clearBadge();
            self.paint();
            self.api.announce(self.fmt('wordNow', { w: self.currentWord() }));
          }
        }, col * 110);
      }(c));
    }
    this.api.track('shuffle');
  },

  /* ---- card gesture: vertical flick OR horizontal blend-sweep ---- */
  _attachCardGesture: function (card, c) {
    var self = this;
    var drag = null;
    card.addEventListener('pointerdown', function (e) {
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, axis: null, crossed: {}, t: Date.now(), lastY: e.clientY, lastT: Date.now() };
      try { card.setPointerCapture(e.pointerId); } catch (_) {}
    });
    card.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!drag.axis && Math.hypot(dx, dy) > 10) drag.axis = Math.abs(dy) >= Math.abs(dx) ? 'flick' : 'sweep';
      if (drag.axis === 'flick') {
        var h = card.getBoundingClientRect().height || 1;
        var clamped = Math.max(-h * 0.4, Math.min(h * 0.4, dy)) + (Math.abs(dy) > h * 0.4 ? (dy - Math.sign(dy) * h * 0.4) * 0.35 : 0);
        if (!self._reducedMotion()) card.style.transform = 'translateY(' + clamped + 'px)';
        drag.vel = (e.clientY - drag.lastY) / Math.max(1, Date.now() - drag.lastT);
        drag.lastY = e.clientY; drag.lastT = Date.now();
        drag.dy = dy;
      } else if (drag.axis === 'sweep') {
        self._sweepAt(e.clientX, drag.crossed);
      }
    });
    var up = function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var d = drag; drag = null;
      card.style.transform = '';
      if (d.axis === 'flick') {
        var h = card.getBoundingClientRect().height || 1;
        var commit = Math.abs(d.dy || 0) > h * 0.25 || Math.abs(d.vel || 0) > 0.45;
        if (commit) self.flick(c, (d.dy || 0) < 0 ? 1 : -1);
      } else if (d.axis === 'sweep') {
        var deck = self.activeDeck();
        if (deck && Object.keys(d.crossed).length === deck.columns.length) self._blendFinish();
      }
    };
    card.addEventListener('pointerup', up);
    card.addEventListener('pointercancel', up);
  },

  _sweepAt: function (x, crossed) {
    var deck = this.activeDeck();
    if (!deck || !this._colEls) return;
    for (var i = 0; i < this._colEls.length; i++) {
      var r = this._colEls[i].well.getBoundingClientRect();
      if (x >= r.left && x <= r.right && !crossed[i]) {
        crossed[i] = true;
        this._pulseCol(i);
        if (this.api.settings.flickSound) this.api.sound(this.pitchFor(i, this._colEls.length));
      }
    }
  },

  _pulseCol: function (i) {
    var el = this._colEls && this._colEls[i];
    if (!el) return;
    el.card.classList.remove('bbd-pulse');
    void el.card.offsetWidth;
    el.card.classList.add('bbd-pulse');
  },

  _attachBlendBar: function (bar) {
    var self = this;
    bar.addEventListener('click', function () { self.autoBlend(); });
    bar.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); self.autoBlend(); }
    });
    var down = false, crossed = null;
    bar.addEventListener('pointerdown', function (e) {
      down = true; crossed = {};
      try { bar.setPointerCapture(e.pointerId); } catch (_) {}
    });
    bar.addEventListener('pointermove', function (e) { if (down) self._sweepAt(e.clientX, crossed); });
    bar.addEventListener('pointerup', function () {
      if (!down) return;
      down = false;
      var deck = self.activeDeck();
      if (deck && crossed && Object.keys(crossed).length === deck.columns.length) self._blendFinish();
      crossed = null;
    });
  },

  autoBlend: function () {
    var self = this, deck = this.activeDeck();
    if (!deck || !this._colEls) return;
    var n = this._colEls.length;
    for (var i = 0; i < n; i++) {
      (function (idx) {
        setTimeout(function () {
          self._pulseCol(idx);
          if (self.api.settings.flickSound) self.api.sound(self.pitchFor(idx, n));
        }, idx * 260);
      }(i));
    }
    setTimeout(function () { self._blendFinish(); }, n * 260 + 80);
  },

  /* the blend payoff: beat → whole word (mouths first) → badge reveal */
  _blendFinish: function () {
    var self = this, api = this.api, deck = this.activeDeck();
    if (!deck || this._blended) return;
    this._blended = true;
    var word = this.currentWord();
    var entry = this.realEntry();
    var sensitive = this.isSensitive(entry);
    var isReal = !!entry;
    var isSyllable = deck.type === 'syllable';

    setTimeout(function () {
      /* speak the WHOLE product only: real words always (if enabled);
         robot words only where the locale's TTS reads pseudowords
         reliably (deck.nonwordTTS); syllable decks + sensitive: never. */
      if (api.settings.speakOnBlend && !isSyllable && !sensitive) {
        if (isReal || deck.nonwordTTS) {
          LCSAudio.speak({ type: 'word', text: word, lang: api.lang });
        }
      }
      if (!isSyllable) {
        if (api.settings.badges === 'after' && !sensitive) self._showBadge(word, entry);
        /* sensitive combos get a neutral announce — no real/robot claim */
        api.announce(sensitive ? word : self.fmt(isReal ? 'isReal' : 'isRobot', { w: word }));
        if (!sensitive) {
          if (isReal) { api.sound(659); setTimeout(function () { api.sound(880); }, 120); }
          else { api.sound(392); setTimeout(function () { api.sound(523); }, 100); }
        }
      } else {
        api.announce(word);
      }
      api.track('blend', { word: word, real: isReal });
    }, 600);
  },

  ROBOT_SVG: '<svg viewBox="0 0 64 64" aria-hidden="true" class="bbd-robot"><g transform="rotate(4 32 32)"><rect x="8" y="28" width="4" height="10" rx="2" fill="#146B5E"/><rect x="52" y="28" width="4" height="10" rx="2" fill="#146B5E"/><g class="bbd-antenna"><line x1="32" y1="18" x2="32" y2="10" stroke="#146B5E" stroke-width="3" stroke-linecap="round"/><circle cx="32" cy="8" r="4" fill="#F2784B"/></g><rect x="14" y="18" width="36" height="30" rx="10" fill="#E2F0EC" stroke="#146B5E" stroke-width="3"/><circle cx="26" cy="32" r="3.5" fill="#2A2A35"/><circle cx="25" cy="31" r="1.2" fill="#fff"/><circle cx="38" cy="32" r="3.5" fill="#2A2A35"/><circle cx="37" cy="31" r="1.2" fill="#fff"/><path d="M25 39 Q32 45 39 39" fill="none" stroke="#2A2A35" stroke-width="3" stroke-linecap="round"/><circle cx="21.5" cy="37" r="2.5" fill="#F2784B" opacity=".35"/><circle cx="42.5" cy="37" r="2.5" fill="#F2784B" opacity=".35"/></g></svg>',

  _showBadge: function (word, entry) {
    var api = this.api, slot = this._slotEl;
    if (!slot) return;
    var displayWord = api.settings.letterCase === 'upper' ? word.toUpperCase() : word;
    var html;
    if (entry && entry.noun && entry.themeDir) {
      html = '<div class="bbd-badge real"><div class="bbd-badge-circle"><img src="' + this.imgUrl(entry) + '" alt="" draggable="false"></div><div class="bbd-badge-word">' + displayWord + '</div></div>';
    } else if (entry) {
      html = '<div class="bbd-badge real"><div class="bbd-badge-circle tick"><svg viewBox="0 0 24 24" width="55%" height="55%" fill="none" stroke="#146B5E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5"/></svg></div><div class="bbd-badge-word">' + displayWord + ' <span class="bbd-badge-cap real">' + api.t('realWord') + '</span></div></div>';
    } else {
      html = '<div class="bbd-badge robot"><div class="bbd-badge-circle">' + this.ROBOT_SVG + '</div><div class="bbd-badge-word soft">' + displayWord + ' <span class="bbd-badge-cap">' + api.t('robotWord') + '</span></div></div>';
    }
    slot.innerHTML = html;
    var badge = slot.querySelector('.bbd-badge');
    var self = this;
    badge.addEventListener('click', function () {
      if (entry) LCSAudio.speak({ type: 'word', text: word, lang: api.lang });
      else { api.sound(392); setTimeout(function () { api.sound(523); }, 100); }
    });
  },

  _clearBadge: function () {
    var slot = this._slotEl;
    if (!slot) return;
    var deck = this.activeDeck();
    if (deck && deck.type === 'syllable') { slot.innerHTML = ''; return; }
    slot.innerHTML = '<div class="bbd-badge-empty" aria-hidden="true"></div>';
  },

  /* ========================= deck panel ============================ */

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
    var scrim = api.el('div', 'bbd-scrim');
    scrim.addEventListener('click', function () { self._closePanel(); });
    var panel = api.el('div', 'bbd-panel');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', api.t('deckList'));
    document.querySelector('.lcs-app').append(scrim, panel);
    this._panelEl = panel;
    this._scrimEl = scrim;
  },

  _renderPanel: function () {
    var api = this.api, self = this;
    var panel = this._panelEl;
    panel.innerHTML = '';

    var head = api.el('div', 'bbd-panel-head');
    var tabs = api.el('div', 'bbd-tabs');
    var mkTab = function (id, label) {
      var t = api.el('button', 'bbd-tab' + (self._panelTab === id ? ' active' : ''));
      t.type = 'button';
      t.textContent = label;
      t.addEventListener('click', function () { self._panelTab = id; self._renderPanel(); });
      return t;
    };
    tabs.append(mkTab('decks', api.t('deckList')), mkTab('custom', api.t('myDeckTab')));
    var x = api.el('button', 'bbd-panel-close');
    x.type = 'button';
    x.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    x.setAttribute('aria-label', 'Close');
    x.addEventListener('click', function () { self._closePanel(); });
    head.append(tabs, x);
    panel.appendChild(head);

    var body = api.el('div', 'bbd-panel-body');
    panel.appendChild(body);
    if (this._panelTab === 'decks') this._renderDecksTab(body);
    else this._renderCustomTab(body);

    /* footer: copy link + sibling cross-link */
    var foot = api.el('div', 'bbd-panel-foot');
    var copy = api.el('button', 'bbd-copylink');
    copy.type = 'button';
    copy.textContent = api.t('copyLink');
    copy.addEventListener('click', function () {
      var deck = self.activeDeck();
      var cards = [];
      for (var c = 0; c < deck.columns.length; c++) cards.push(self.cardAt(deck, c).g);
      var baseId = self.deckId === 'custom' ? (self._store.customDeck && self._store.customDeck.baseId) || self._firstFreeDeck() : self.deckId;
      var url = location.origin + location.pathname + '?lang=' + api.lang + '&deck=' + encodeURIComponent(baseId) + '&cards=' + encodeURIComponent(cards.join('.'));
      var done = function () { copy.textContent = api.t('copied'); setTimeout(function () { copy.textContent = api.t('copyLink'); }, 1600); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, done);
      else { try { prompt('', url); } catch (_) {} done(); }
    });
    var sib = document.createElement('a');
    sib.className = 'bbd-sibling';
    sib.href = '/mini-tools/sound-boxes.html?lang=' + api.lang;
    sib.textContent = api.t('siblingLink');
    foot.append(copy, sib);
    panel.appendChild(foot);
  },

  _renderDecksTab: function (body) {
    var api = this.api, self = this;
    this._decks().forEach(function (deck) {
      var unlocked = self._deckUnlocked(deck);
      var row = api.el('button', 'bbd-deck-row' + (self.deckId === deck.id ? ' active' : '') + (unlocked ? '' : ' locked'));
      row.type = 'button';
      var lab = api.el('span', 'bbd-deck-label');
      lab.textContent = deck.label;
      var meta = api.el('span', 'bbd-deck-meta');
      meta.textContent = deck.columns.length + ' × ' + (deck.type === 'word' ? self.fmt('wordsCount', { n: Object.keys(deck.real || {}).length }) : api.t('colSyl1'));
      row.append(lab, meta);
      if (!unlocked) {
        var lock = api.el('span', 'bbd-lock');
        lock.innerHTML = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
        lock.title = api.t('lockedLabel');
        row.appendChild(lock);
      }
      row.addEventListener('click', function () {
        if (!unlocked) { self._upsell(body); return; }
        self.deckId = deck.id;
        var saved = (self._store.lastPositionByDeck || {})[deck.id];
        self.pos = deck.columns.map(function (_, i) { return (saved && typeof saved[i] === 'number' && saved[i] < deck.columns[i].cards.length) ? saved[i] : 0; });
        self._closePanel();
        self.render();
      });
      body.appendChild(row);
    });

    /* read-only card strip for the active deck */
    var deck = this.activeDeck();
    if (deck) {
      var strip = api.el('div', 'bbd-cardstrip');
      deck.columns.forEach(function (col) {
        var seg = api.el('div', 'bbd-strip-col' + (col.role === 'vowel' ? ' vowel' : ''));
        var h = api.el('div', 'bbd-strip-head');
        h.textContent = self.colLabel(col.role);
        seg.appendChild(h);
        var list = api.el('div', 'bbd-strip-cards');
        col.cards.forEach(function (card) {
          var chip = api.el('span', 'bbd-strip-chip');
          chip.textContent = typeof card === 'string' ? card : card.g;
          list.appendChild(chip);
        });
        seg.appendChild(list);
        strip.appendChild(seg);
      });
      body.appendChild(strip);
    }
  },

  _upsell: function (body) {
    var api = this.api;
    var old = body.querySelector('.bbd-upsell');
    if (old) old.remove();
    var up = api.el('div', 'bbd-upsell');
    var txt = api.el('span'); txt.textContent = api.t('premiumLine');
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-blending-board';
    a.target = '_blank'; a.rel = 'noopener';
    a.textContent = api.t('unlockLine');
    up.append(txt, a);
    /* below the list / above the strip — never between rows */
    var strip = body.querySelector('.bbd-cardstrip');
    if (strip) body.insertBefore(up, strip); else body.appendChild(up);
  },

  /* ---- My deck: subset builder ---- */
  _renderCustomTab: function (body) {
    var api = this.api, self = this;
    var decks = this._decks();
    if (!decks.length) return;

    if (!this._editorBase) {
      var cd = this._store.customDeck;
      this._editorBase = (cd && cd.baseId && this._deckById(cd.baseId)) ? cd.baseId : this._firstFreeDeck();
      this._editorEnabled = null;
    }
    var base = this._deckById(this._editorBase);
    if (!this._editorEnabled) {
      this._editorEnabled = {};
      var cd2 = this._store.customDeck;
      var useSaved = cd2 && cd2.baseId === this._editorBase && cd2.enabled;
      for (var i = 0; i < base.columns.length; i++) {
        var col = base.columns[i];
        var all = col.cards.map(function (card) { return typeof card === 'string' ? card : card.g; });
        this._editorEnabled[col.role] = useSaved && Array.isArray(cd2.enabled[col.role])
          ? cd2.enabled[col.role].filter(function (v) { return all.indexOf(v) >= 0; })
          : all.slice();
        if (!this._editorEnabled[col.role].length) this._editorEnabled[col.role] = all.slice();
      }
    }

    /* base picker */
    var baseHead = api.el('p', 'bbd-hint');
    baseHead.textContent = api.t('baseDeck');
    body.appendChild(baseHead);
    var baseRow = api.el('div', 'bbd-baserow');
    decks.forEach(function (d) {
      var chip = api.el('button', 'bbd-base-chip' + (self._editorBase === d.id ? ' active' : ''));
      chip.type = 'button';
      chip.textContent = d.label;
      chip.addEventListener('click', function () {
        self._editorBase = d.id;
        self._editorEnabled = null;
        self._renderPanel();
      });
      baseRow.appendChild(chip);
    });
    body.appendChild(baseRow);

    var hint = api.el('p', 'bbd-hint small');
    hint.textContent = api.t('tapOffHint');
    body.appendChild(hint);

    /* per-column toggle grids */
    base.columns.forEach(function (col) {
      var sec = api.el('div', 'bbd-picksec' + (col.role === 'vowel' ? ' vowel' : ''));
      var h = api.el('div', 'bbd-strip-head');
      h.textContent = self.colLabel(col.role);
      sec.appendChild(h);
      var grid = api.el('div', 'bbd-pickgrid');
      col.cards.forEach(function (card) {
        var g = typeof card === 'string' ? card : card.g;
        var on = self._editorEnabled[col.role].indexOf(g) >= 0;
        var chip = api.el('button', 'bbd-pick');
        chip.type = 'button';
        chip.textContent = g;
        chip.setAttribute('aria-pressed', String(on));
        chip.addEventListener('click', function () {
          var arr = self._editorEnabled[col.role];
          var at = arr.indexOf(g);
          if (at >= 0) { if (arr.length > 1) arr.splice(at, 1); }
          else arr.push(g);
          self._renderPanel();
        });
        grid.appendChild(chip);
      });
      sec.appendChild(grid);
      body.appendChild(sec);
    });

    /* live combos + real-words line */
    var combos = 1;
    base.columns.forEach(function (col) { combos *= self._editorEnabled[col.role].length; });
    var realCount = 0;
    if (base.type === 'word') {
      var cols = base.columns.map(function (col) { return self._editorEnabled[col.role]; });
      for (var key in (base.real || {})) {
        if (self._composable(key, cols)) realCount++;
      }
    }
    var line = api.el('p', 'bbd-count-line');
    line.textContent = this.fmt('combosLine', { c: combos, r: realCount });
    body.appendChild(line);

    /* Use this deck (premium-locked action, preview free) */
    var use = api.el('button', 'bbd-btn primary' + (this.premium ? '' : ' locked'));
    use.type = 'button';
    use.textContent = api.t('useThisDeck');
    use.addEventListener('click', function () {
      if (!self.premium) {
        var old = body.querySelector('.bbd-upsell');
        if (old) old.remove();
        var up = api.el('div', 'bbd-upsell');
        var txt = api.el('span'); txt.textContent = api.t('premiumLine');
        var a = document.createElement('a');
        a.href = '/' + api.lang + '/pricing?from=tool-blending-board';
        a.target = '_blank'; a.rel = 'noopener';
        a.textContent = api.t('unlockLine');
        up.append(txt, a);
        use.insertAdjacentElement('beforebegin', up);
        return;
      }
      var enabled = {};
      base.columns.forEach(function (col) { enabled[col.role] = self._editorEnabled[col.role].slice(); });
      self._store.customDeck = { baseId: base.id, enabled: enabled, updatedAt: new Date().toISOString() };
      self.deckId = 'custom';
      self.pos = base.columns.map(function () { return 0; });
      self._saveStore();
      self._closePanel();
      self.render();
    });
    body.appendChild(use);
  },

  /* Is `word` composable from one value per column (arrays of surfaces)? */
  _composable: function (word, cols) {
    word = word.toLowerCase();
    var found = false;
    (function walk(pos, ci) {
      if (found) return;
      if (ci === cols.length) { if (pos === word.length) found = true; return; }
      for (var i = 0; i < cols[ci].length; i++) {
        var g = cols[ci][i].toLowerCase();
        if (word.startsWith(g, pos)) walk(pos + g.length, ci + 1);
      }
    })(0, 0);
    return found;
  }
};

/* per-tool styling: STAGE ONLY, consuming shell tokens. The sanctioned
   page-level touch is body.bbd-wide (projector width), tool-injected. */
(function injectCSS() {
  var css = ''
  + 'body.bbd-wide .lcs-app{max-width:min(1000px,96vw);}'
  + '.bbd-wrap{display:flex;flex-direction:column;align-items:center;'
  +   'gap:clamp(10px,2.2vmin,20px);width:100%;'
  +   '--bbd-c-ink:#146B5E;--bbd-c-well:#E2F0EC;--bbd-c-edge:rgba(20,107,94,.45);'
  +   '--bbd-v-ink:#C9502A;--bbd-v-well:#FDE8DE;--bbd-v-edge:rgba(201,80,42,.45);'
  +   '--bbd-gap:clamp(8px,2vmin,20px);}'
  + '.bbd-loading{padding:48px 0;color:var(--lcs-ink-soft);'
  +   'font-family:var(--lcs-font-body);font-weight:700;}'
  + '.bbd-wrap.upper .bbd-face,.bbd-wrap.upper .bbd-badge-word{text-transform:uppercase;}'

  /* deck pill */
  + '.bbd-pillrow{display:flex;justify-content:center;width:100%;}'
  + '.bbd-pill{font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(13px,2.2vmin,16px);color:var(--lcs-structure);'
  +   'background:var(--lcs-surface);border:1.5px solid var(--lcs-line);'
  +   'border-radius:var(--lcs-radius-pill);padding:7px 18px;'
  +   'min-height:var(--lcs-tap);display:inline-flex;align-items:center;'
  +   'box-shadow:var(--lcs-shadow-sm);cursor:pointer;'
  +   'transition:transform .1s var(--lcs-ease),background .12s;}'
  + '.bbd-pill:hover{background:var(--lcs-structure-soft);}'
  + '.bbd-pill:active{transform:scale(.97);}'

  /* badge slot */
  + '.bbd-badge-slot{height:clamp(76px,14vmin,128px);display:grid;'
  +   'place-items:center;width:100%;}'
  + '.bbd-badge-slot.none{height:clamp(10px,2vmin,18px);}'
  + '.bbd-badge-empty{width:clamp(46px,8.4vmin,78px);height:clamp(46px,8.4vmin,78px);'
  +   'border:2px dashed rgba(20,107,94,.18);border-radius:50%;}'
  + '.bbd-badge{display:flex;align-items:center;gap:12px;cursor:pointer;'
  +   'animation:bbdBadgeIn .32s cubic-bezier(.34,1.56,.64,1);}'
  + '@keyframes bbdBadgeIn{0%{transform:scale(.4);opacity:0;}'
  +   '70%{transform:scale(1.07);opacity:1;}100%{transform:scale(1);}}'
  + '.bbd-badge-circle{width:clamp(56px,12vmin,112px);height:clamp(56px,12vmin,112px);'
  +   'background:var(--lcs-surface);border-radius:50%;box-shadow:var(--lcs-shadow);'
  +   'display:grid;place-items:center;overflow:hidden;}'
  + '.bbd-badge-circle img{width:76%;height:76%;object-fit:contain;pointer-events:none;}'
  + '.bbd-badge-circle .bbd-robot{width:82%;height:82%;}'
  + '.bbd-badge .bbd-antenna{transform-origin:32px 18px;'
  +   'animation:bbdAntenna .6s var(--lcs-ease);}'
  + '@keyframes bbdAntenna{0%{transform:rotate(-8deg);}55%{transform:rotate(6deg);}100%{transform:rotate(0);}}'
  + '.bbd-badge-word{font-family:var(--lcs-font-display);font-weight:800;'
  +   'font-size:clamp(18px,3.4vmin,30px);color:var(--lcs-ink);'
  +   'display:flex;flex-direction:column;line-height:1.2;}'
  + '.bbd-badge-word.soft{color:var(--lcs-ink-soft);}'
  + '.bbd-badge-cap{font-size:clamp(12px,1.8vmin,15px);font-weight:800;'
  +   'color:var(--bbd-c-ink);letter-spacing:.02em;}'
  + '.bbd-badge-cap.real{color:var(--bbd-c-ink);}'

  /* columns */
  + '.bbd-colrow{display:flex;justify-content:center;align-items:flex-start;'
  +   'gap:var(--bbd-gap);width:100%;}'
  + '.bbd-colgroup{display:flex;flex-direction:column;align-items:center;gap:6px;'
  +   'width:min(clamp(96px,18vmin,200px),'
  +   'calc((100% - (var(--bbd-n,3) - 1)*var(--bbd-gap))/var(--bbd-n,3)));}'
  + '.bbd-chev{width:clamp(40px,7vmin,56px);height:clamp(40px,7vmin,56px);'
  +   'display:grid;place-items:center;border-radius:50%;position:relative;'
  +   'background:var(--lcs-surface);box-shadow:var(--lcs-shadow-sm);'
  +   'color:var(--lcs-structure);cursor:pointer;'
  +   'transition:transform .1s var(--lcs-ease),background .12s;}'
  + '.bbd-chev::before{content:"";position:absolute;inset:-6px;}'
  + '.bbd-chev:hover{background:var(--lcs-structure-soft);}'
  + '.bbd-chev:active{transform:scale(.92);}'
  + '.bbd-chev svg{width:50%;height:50%;}'
  + '.bbd-well{position:relative;overflow:hidden;width:100%;aspect-ratio:4/5.4;'
  +   'padding:7px 7px 14px;border-radius:20px;background:var(--bbd-c-well);'
  +   'border:3px solid var(--bbd-c-edge);'
  +   'box-shadow:inset 0 3px 8px rgba(20,30,28,.08),0 1px 0 rgba(255,255,255,.9);}'
  + '.bbd-well.vowel{background:var(--bbd-v-well);border-color:var(--bbd-v-edge);}'
  + '.bbd-well.single{border-width:1.5px;border-color:var(--lcs-line);}'
  + '.bbd-card{position:absolute;inset:7px 7px 14px;display:grid;place-items:center;'
  +   'background:var(--lcs-surface);border-radius:14px;cursor:grab;touch-action:none;'
  +   'box-shadow:0 3px 0 rgba(20,30,28,.10),0 6px 14px rgba(20,30,28,.10);}'
  + '.bbd-card:active{cursor:grabbing;}'
  + '.bbd-card:hover{transform:translateY(-2px);}'
  + '.bbd-card.bbd-in-up{animation:bbdInUp .3s cubic-bezier(.34,1.45,.64,1);}'
  + '.bbd-card.bbd-in-down{animation:bbdInDown .3s cubic-bezier(.34,1.45,.64,1);}'
  + '@keyframes bbdInUp{0%{transform:translateY(70%);opacity:0;}'
  +   '70%{transform:translateY(-3%);opacity:1;}100%{transform:none;}}'
  + '@keyframes bbdInDown{0%{transform:translateY(-70%);opacity:0;}'
  +   '70%{transform:translateY(3%);opacity:1;}100%{transform:none;}}'
  + '.bbd-card.bbd-pulse::after{content:"";position:absolute;inset:-2px;'
  +   'border-radius:14px;animation:bbdPulse .35s var(--lcs-ease);}'
  + '@keyframes bbdPulse{0%{box-shadow:0 0 0 0 rgba(242,120,75,.30);}'
  +   '100%{box-shadow:0 0 0 12px rgba(242,120,75,0);}}'
  + '.bbd-peek{position:absolute;left:50%;transform:translateX(-50%);bottom:5px;'
  +   'width:88%;height:14px;background:var(--lcs-surface);'
  +   'border:1.5px solid var(--lcs-line);border-radius:8px 8px 10px 10px;}'
  + '.bbd-peek::after{content:"";position:absolute;left:50%;transform:translateX(-50%);'
  +   'bottom:-6px;width:82%;height:14px;background:var(--lcs-surface);opacity:.6;'
  +   'border:1.5px solid var(--lcs-line);border-radius:8px 8px 10px 10px;}'
  + '.bbd-face{display:flex;align-items:center;justify-content:center;'
  +   'flex-direction:column;font-family:var(--lcs-font-display);font-weight:700;'
  +   'text-transform:lowercase;font-size:clamp(40px,11vmin,104px);line-height:1;'
  +   'letter-spacing:-.02em;color:var(--bbd-c-ink);}'
  + '.bbd-well.vowel .bbd-face{color:var(--bbd-v-ink);}'
  + '.bbd-face.multi{font-size:clamp(30px,8vmin,76px);}'
  + '.bbd-face.seamed{flex-direction:row;align-items:center;}'
  + '.bbd-seam{width:0;height:.9em;border-left:2.5px dotted rgba(20,107,94,.4);'
  +   'margin:0 3px;}'
  + '.bbd-tie{width:56%;max-width:64px;height:9px;margin-top:3px;}'

  /* blend bar + shuffle */
  + '.bbd-ctlrow{display:flex;align-items:center;justify-content:center;'
  +   'gap:clamp(10px,2.4vmin,22px);width:100%;}'
  + '.bbd-blendbar{width:min(500px,70%);height:24px;border-radius:12px;'
  +   'background:var(--lcs-structure-soft);display:grid;place-items:center;'
  +   'cursor:pointer;touch-action:none;position:relative;}'
  + '.bbd-blendbar::before{content:"";position:absolute;inset:-10px 0;}'
  + '.bbd-chevrons{color:var(--lcs-structure);opacity:.4;font-weight:800;'
  +   'font-size:15px;letter-spacing:6px;line-height:1;pointer-events:none;}'
  + '.bbd-blendbar.hint::after{content:"";position:absolute;left:4px;top:50%;'
  +   'width:12px;height:12px;margin-top:-6px;border-radius:50%;'
  +   'background:#F2784B;animation:bbdHint 1.4s var(--lcs-ease);}'
  + '@keyframes bbdHint{from{left:4px;opacity:1;}to{left:calc(100% - 16px);opacity:0;}}'
  + '.bbd-shuffle{width:var(--lcs-tap);height:var(--lcs-tap);flex:0 0 auto;'
  +   'min-width:var(--lcs-tap);display:grid;'
  +   'place-items:center;border-radius:50%;background:var(--lcs-surface);'
  +   'box-shadow:var(--lcs-shadow-sm);color:var(--lcs-structure);cursor:pointer;'
  +   'transition:transform .1s var(--lcs-ease),background .12s;}'
  + '.bbd-shuffle:hover{background:var(--lcs-structure-soft);}'
  + '.bbd-shuffle:active{transform:scale(.92) rotate(18deg);}'

  /* panel */
  + '.bbd-scrim{position:absolute;inset:0;background:rgba(38,51,47,.28);'
  +   'opacity:0;pointer-events:none;transition:opacity .2s;z-index:70;'
  +   'border-radius:inherit;}'
  + '.bbd-scrim.open{opacity:1;pointer-events:auto;}'
  + '.bbd-panel{position:absolute;left:50%;top:6%;transform:translateX(-50%) translateY(8px);'
  +   'width:min(560px,92%);max-height:86%;overflow:auto;background:var(--lcs-surface);'
  +   'border-radius:var(--lcs-radius);box-shadow:var(--lcs-shadow);z-index:71;'
  +   'opacity:0;pointer-events:none;transition:opacity .2s,transform .2s var(--lcs-ease);'
  +   'display:flex;flex-direction:column;}'
  + '.bbd-panel.open{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0);}'
  + '.bbd-panel-head{display:flex;align-items:center;justify-content:space-between;'
  +   'padding:14px 16px 10px;border-bottom:1px solid var(--lcs-line);}'
  + '.bbd-tabs{display:flex;gap:8px;}'
  + '.bbd-tab{font-family:var(--lcs-font-display);font-weight:700;font-size:14px;'
  +   'padding:7px 14px;border-radius:var(--lcs-radius-pill);'
  +   'color:var(--lcs-ink-soft);background:transparent;cursor:pointer;}'
  + '.bbd-tab.active{background:var(--lcs-structure);color:var(--lcs-surface);}'
  + '.bbd-panel-close{width:36px;height:36px;display:grid;place-items:center;'
  +   'border-radius:50%;color:var(--lcs-ink-soft);background:transparent;cursor:pointer;}'
  + '.bbd-panel-close:hover{background:var(--lcs-structure-soft);color:var(--lcs-structure);}'
  + '.bbd-panel-body{padding:12px 16px;display:flex;flex-direction:column;gap:8px;}'
  + '.bbd-panel-foot{padding:10px 16px 14px;border-top:1px solid var(--lcs-line);'
  +   'display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;}'
  + '.bbd-deck-row{display:flex;align-items:center;gap:10px;text-align:left;'
  +   'padding:11px 14px;border-radius:var(--lcs-radius-sm);cursor:pointer;'
  +   'background:var(--lcs-surface-2);border:1.5px solid var(--lcs-line);'
  +   'font-family:var(--lcs-font-body);}'
  + '.bbd-deck-row.active{border-color:var(--lcs-structure);'
  +   'background:var(--lcs-structure-soft);}'
  + '.bbd-deck-label{font-weight:800;color:var(--lcs-ink);flex:1;}'
  + '.bbd-deck-meta{font-size:12.5px;color:var(--lcs-ink-soft);font-weight:700;}'
  + '.bbd-deck-row.locked .bbd-deck-label{color:var(--lcs-ink-soft);}'
  + '.bbd-lock{color:var(--lcs-ink-soft);display:grid;place-items:center;}'
  + '.bbd-upsell{display:flex;flex-direction:column;gap:6px;padding:10px 14px;'
  +   'background:#FDE8DE;border-radius:var(--lcs-radius-sm);font-size:13.5px;'
  +   'font-family:var(--lcs-font-body);color:var(--lcs-ink);}'
  + '.bbd-upsell a{color:#C9502A;font-weight:800;text-decoration:underline;}'
  + '.bbd-cardstrip{display:flex;gap:10px;flex-wrap:wrap;margin-top:6px;}'
  + '.bbd-strip-col{flex:1;min-width:120px;background:var(--lcs-surface-2);'
  +   'border-radius:var(--lcs-radius-sm);padding:8px 10px;}'
  + '.bbd-strip-head{font-family:var(--lcs-font-body);font-weight:800;'
  +   'font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;'
  +   'color:var(--lcs-ink-soft);margin-bottom:6px;display:flex;align-items:center;gap:6px;}'
  + '.bbd-strip-col.vowel .bbd-strip-head::before,.bbd-picksec.vowel .bbd-strip-head::before'
  +   '{content:"";width:8px;height:8px;border-radius:50%;background:#C9502A;}'
  + '.bbd-strip-col:not(.vowel) .bbd-strip-head::before,.bbd-picksec:not(.vowel) .bbd-strip-head::before'
  +   '{content:"";width:8px;height:8px;border-radius:50%;background:#146B5E;}'
  + '.bbd-strip-cards{display:flex;gap:5px;flex-wrap:wrap;}'
  + '.bbd-strip-chip{font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:15px;color:var(--lcs-ink);background:var(--lcs-surface);'
  +   'border:1.5px solid var(--lcs-line);border-radius:8px;padding:2px 8px;'
  +   'text-transform:lowercase;}'
  + '.bbd-hint{margin:0;font-size:13.5px;color:var(--lcs-ink-soft);'
  +   'font-family:var(--lcs-font-body);font-weight:700;}'
  + '.bbd-hint.small{font-weight:400;}'
  + '.bbd-baserow{display:flex;gap:6px;flex-wrap:wrap;}'
  + '.bbd-base-chip{font-family:var(--lcs-font-body);font-weight:700;font-size:13px;'
  +   'padding:6px 12px;border-radius:var(--lcs-radius-pill);cursor:pointer;'
  +   'background:var(--lcs-surface-2);border:1.5px solid var(--lcs-line);'
  +   'color:var(--lcs-ink-soft);}'
  + '.bbd-base-chip.active{background:var(--lcs-structure-soft);'
  +   'border-color:var(--lcs-structure);color:var(--lcs-structure);}'
  + '.bbd-picksec{background:var(--lcs-surface-2);border-radius:var(--lcs-radius-sm);'
  +   'padding:8px 10px;}'
  + '.bbd-pickgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(48px,1fr));gap:6px;}'
  + '.bbd-pick{height:52px;border-radius:10px;font-family:var(--lcs-font-display);'
  +   'font-weight:700;font-size:20px;text-transform:lowercase;cursor:pointer;'
  +   'background:var(--lcs-surface-2);border:1.5px solid var(--lcs-line);'
  +   'color:var(--lcs-ink-soft);transition:all .12s var(--lcs-ease);}'
  + '.bbd-pick[aria-pressed="true"]{background:var(--lcs-surface);'
  +   'border:2px solid var(--bbd-c-ink,#146B5E);color:#146B5E;'
  +   'box-shadow:0 2px 0 rgba(20,30,28,.10),0 3px 8px rgba(20,30,28,.08);}'
  + '.bbd-picksec.vowel .bbd-pick[aria-pressed="true"]{border-color:#C9502A;color:#C9502A;}'
  + '.bbd-count-line{margin:2px 0 0;font-size:13.5px;font-weight:800;'
  +   'font-family:var(--lcs-font-body);color:var(--lcs-ink-soft);}'
  + '.bbd-btn{align-self:flex-start;font-family:var(--lcs-font-display);'
  +   'font-weight:800;font-size:14px;padding:9px 18px;'
  +   'border-radius:var(--lcs-radius-pill);cursor:pointer;'
  +   'background:var(--lcs-surface);border:1.5px solid var(--lcs-structure);'
  +   'color:var(--lcs-structure);}'
  + '.bbd-btn.primary{background:var(--lcs-structure);color:var(--lcs-surface);}'
  + '.bbd-btn.locked{opacity:.75;}'
  + '.bbd-copylink,.bbd-sibling{font-family:var(--lcs-font-body);font-weight:700;'
  +   'font-size:13px;color:var(--lcs-structure);background:transparent;'
  +   'border:none;cursor:pointer;text-decoration:underline;padding:0;}'

  /* narrow phones */
  + '@media (max-width:420px){'
  +   '.bbd-colrow{gap:6px;}'
  +   '.bbd-wrap{--bbd-gap:6px;}'
  +   '.bbd-well{border-width:2px;border-radius:14px;padding:5px 5px 10px;}'
  +   '.bbd-card{inset:5px 5px 10px;border-radius:10px;}'
  +   '.bbd-peek::after{display:none;}'
  + '}'

  /* reduced motion */
  + '@media (prefers-reduced-motion: reduce){'
  +   '.bbd-card.bbd-in-up,.bbd-card.bbd-in-down{animation:none;}'
  +   '.bbd-badge{animation:none;}'
  +   '.bbd-badge .bbd-antenna{animation:none;}'
  +   '.bbd-blendbar.hint::after{animation:none;display:none;}'
  +   '.bbd-card:hover{transform:none;}'
  + '}';
  var tag = document.createElement('style'); tag.textContent = css;
  document.head.appendChild(tag);
}());
