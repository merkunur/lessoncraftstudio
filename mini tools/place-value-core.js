/* =====================================================================
   PLACE VALUE — SHARED CORE   (place-value-core.js)
   ---------------------------------------------------------------------
   Engine E12 per the master arc. Two-column tens/ones mat for first
   exposure to CCSS 1.NBT.B.2 ("the two digits of a two-digit number
   represent amounts of tens and ones").

   Kid mechanic: tap "Add ten" to drop a ten-rod into the Tens column;
   tap "Add one" to drop a unit-cube into the Ones column; tap any
   placed rod or cube to remove it (any-item removal, NOT LIFO, matches
   ten-frame's spatial-pedagogy precedent). A live readout shows the
   running build. On Check, engine compares its OWN state against the
   targetTens / targetOnes pair (strict decomposition — 13 ones for 13
   fails; bundling is the pedagogical point).

   API CONTRACT (sibling-shape with TenFrameCore / WordBuilderCore):
     init(api)                — wire api; zero state
     setupTask(opts)          — { target, maxTens=9, maxOnes=9 }; resets
                                 counts to 0; derives targetTens/Ones
     addTen() / addOne()      — bump count (no-op at cap); paint + speak
                                 placed unit ("ten" / "one")
     removeTen(i) / removeOne(i) — remove the specific placed item; silent
     render()                 — build DOM skeleton inside api.stage
     paint()                  — reflect tens/ones onto existing DOM
     reset()                  — counts back to 0
     injectCSS()              — one-shot stage CSS (idempotent)

   tool.tensCount + tool.onesCount expose state for the per-task check
   function (answerType: 'state'). Engine has NO 'check' or 'showFeedback'
   method — the per-task `check(tool)` in the activity tasks array reads
   tensCount + onesCount directly; the shell handles the celebrate /
   try-again chrome.

   The blocks (cubes + rods) are BOTH coral — same semantic ("counted
   thing"), just bundled. The Tens column gets a soft teal-tinted
   background to mark "this is the tens PLACE" without recoloring the
   blocks. See plan doctrine § "Base-ten block visuals".
   ===================================================================== */
window.PlaceValueCore = {

  /* EN + DE + ES + IT + FR shipped. Additional locales fan-out one at a
     time per the §A.13.48 plan-mode-per-locale + 3-agent ensemble
     discipline. Engine falls back to `en` via api.t() if any unfilled
     locale routes here. The manifest row's `slug` map gates URL resolution
     before the engine ever boots — if a locale lacks a slug,
     /<locale>/activities/... 404s. */
  strings: {
    title:        { en: 'Place Value', de: 'Stellenwert', es: 'Valor posicional', it: 'Valore posizionale', fr: 'Valeur de position' },
    instruction:  {
      en: 'Tap to add tens and ones. Tap a block to remove it.',
      de: 'Tippe, um Zehner und Einer hinzuzufügen. Tippe auf einen Stein, um ihn zu entfernen.',
      es: 'Toca para añadir decenas y unidades. Toca un bloque para quitarlo.',
      it: 'Tocca per aggiungere decine e unità. Tocca un blocco per rimuoverlo.',
      fr: 'Touche pour ajouter des dizaines et des unités. Touche un bloc pour le retirer.'
    },
    tensLabel:    { en: 'Tens',     de: 'Zehner',              es: 'Decenas',                 it: 'Decine',                                              fr: 'Dizaines' },
    onesLabel:    { en: 'Ones',     de: 'Einer',               es: 'Unidades',                it: 'Unità',                                               fr: 'Unités' },
    buildLabel:   { en: 'Build',    de: 'Wert',                es: 'Valor',                   it: 'Valore',                                              fr: 'Valeur' },
    addTenLabel:  { en: 'Add ten',  de: 'Zehner hinzufügen',   es: 'Añadir una decena',       it: 'Aggiungi una decina',                                 fr: 'Ajoute une dizaine' },
    addOneLabel:  { en: 'Add one',  de: 'Einer hinzufügen',    es: 'Añadir una unidad',       it: 'Aggiungi una unità',                                  fr: 'Ajoute une unité' },
    /* wordTen / wordOne are the placed-unit names spoken on tap. DE + ES
       + IT + FR all use the place-unit nouns (NOT cardinals) to reinforce
       the 1.NBT.B.2 place-value vocabulary the activity teaches and to
       match the column labels the kid sees. ES "decena/unidad", IT
       "decina/unità", FR "dizaine/unité" all feminine singular. */
    wordTen:      { en: 'ten',      de: 'Zehner',              es: 'decena',                  it: 'decina',                                              fr: 'dizaine' },
    wordOne:      { en: 'one',      de: 'Einer',               es: 'unidad',                  it: 'unità',                                               fr: 'unité' },
    /* Screen-reader fragments for placed-block aria-labels. */
    srTenRod:     { en: 'ten-rod',  de: 'Zehnerstab',          es: 'barra de diez',           it: 'barra di dieci',                                      fr: 'barre de dix' },
    srUnitCube:   { en: 'unit-cube',de: 'Einerwürfel',         es: 'cubo de uno',             it: 'cubo da uno',                                         fr: 'cube unité' },
    srRemove:     { en: 'remove',   de: 'entferne',            es: 'quitar',                  it: 'rimuovi',                                             fr: 'retire' }
  },

  defaults: {},
  settings: [],

  /* ---- state + setup ---- */
  init: function (api) {
    this.api = api;
    this.targetNumber = 0;
    this.targetTens = 0;
    this.targetOnes = 0;
    this.tensCount = 0;
    this.onesCount = 0;
    this.maxTens = 9;
    this.maxOnes = 9;
    this.readOnly = false;
    this.language = (api && api.lang) || 'en';
  },

  /* Per-task hook. opts = { target, maxTens=9, maxOnes=9 }. Derives the
     decomposition deterministically so per-task `check(tool)` is just
     `tool.tensCount === tool.targetTens && tool.onesCount === tool.targetOnes`. */
  setupTask: function (opts) {
    opts = opts || {};
    var target = (typeof opts.target === 'number' && opts.target >= 0) ? opts.target : 0;
    this.targetNumber = target;
    this.targetTens = Math.floor(target / 10);
    this.targetOnes = target % 10;
    this.maxTens = (typeof opts.maxTens === 'number') ? opts.maxTens : 9;
    this.maxOnes = (typeof opts.maxOnes === 'number') ? opts.maxOnes : 9;
    this.tensCount = 0;
    this.onesCount = 0;
    this.readOnly = false;
  },

  /* Derived build value for prompt readout + hints. */
  builtValue: function () { return this.tensCount * 10 + this.onesCount; },

  addTen: function () {
    if (this.readOnly) return;
    if (this.tensCount >= this.maxTens) return;
    this.tensCount++;
    this._speakWord(this.api.t('wordTen'));
    this.api.sound(660);
    this.paint();
    this._announceBuild();
  },

  addOne: function () {
    if (this.readOnly) return;
    if (this.onesCount >= this.maxOnes) return;
    this.onesCount++;
    this._speakWord(this.api.t('wordOne'));
    this.api.sound(720);
    this.paint();
    this._announceBuild();
  },

  removeTen: function (idx) {
    if (this.readOnly) return;
    if (typeof idx !== 'number' || idx < 0 || idx >= this.tensCount) return;
    /* Any-item removal: the index of the tapped rod doesn't actually matter
       for the count semantics (rods are indistinguishable); we just decrement.
       The animation key is per-position so the right rod fades out. */
    this.tensCount--;
    this.api.sound(380);
    this.paint();
    this._announceBuild();
  },

  removeOne: function (idx) {
    if (this.readOnly) return;
    if (typeof idx !== 'number' || idx < 0 || idx >= this.onesCount) return;
    this.onesCount--;
    this.api.sound(360);
    this.paint();
    this._announceBuild();
  },

  /* Speak placed unit ("ten" / "one") via LCSAudio. Type 'number' per the
     lcs-shell.js TYPES table; file-first then TTS fallback. Names the
     UNIT placed, not the running total — see plan doctrine § "Audio". */
  _speakWord: function (word) {
    if (!word) return;
    if (!window.LCSAudio || !window.LCSAudio.speak) return;
    window.LCSAudio.speak({
      type: 'number',
      text: String(word),
      lang: this.language,
      rate: 0.9
    });
  },

  _announceBuild: function () {
    var built = this.builtValue();
    this.api.announce(this.api.t('buildLabel') + ': ' + built);
  },

  /* Number-words 0-99 for the celebration speech, per-locale.
       lang  = 'en' | 'de' | 'es' | 'it' | … (default: this.language || 'en')
       mode  = 'cardinal' (default) | 'attributive' | 'attributive-fem'
       capitalize = boolean (capitalize first letter; e.g. sentence-start "Ein")

     At the 4th-locale fan-out (IT), the per-locale logic was promoted from
     inline if/else branches into a `_NUMBER_WORD_HELPERS` config table per
     §A.13's refactor-during-already-opened-surface doctrine. Adding a new
     locale = add one entry to `_NUMBER_WORD_HELPERS`. The dispatcher below
     stays trivial.

     Per-locale grammar:
       EN: mode is ignored (cardinal === attributive in English).
       DE: mode = 'attributive' returns 'ein' before masculine nouns (Zehner
           / Einer); mode = 'cardinal' returns 'eins' standalone. Compound
           20-99 is units-first: 'einundzwanzig' (1 + 'und' + 20).
       ES: mode = 'attributive-fem' returns 'una' for 1 (feminine, before
           decena/unidad) and 'cero' for 0; cardinal handles compounds via
           <tens> y <ones>.
       IT: mode = 'attributive-fem' returns 'una' for 1 (feminine, before
           decina/unità) and 'zero' for 0; cardinal handles compounds with
           vowel-elision before uno (1) and otto (8) — e.g. venti+uno =
           'ventuno', trenta+otto = 'trentotto'. Compound `tre` takes the
           grave-é accent: ventitré, trentatré, ..., novantatré. */
  _numberWord: function (n, lang, mode, capitalize) {
    lang = lang || (this && this.language) || 'en';
    mode = mode || 'cardinal';
    if (n < 0 || n > 99) return String(n);
    var helper = (this._NUMBER_WORD_HELPERS && this._NUMBER_WORD_HELPERS[lang])
                  ? this._NUMBER_WORD_HELPERS[lang]
                  : this._NUMBER_WORD_HELPERS.en;
    var word = helper(n, mode);
    if (capitalize && word && word.length > 0) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  },

  _NUMBER_WORD_HELPERS: {
    en: function (n, mode) {
      /* 0-19 lookup; 20-99 = tens-word + "-" + ones-word (or tens-word
         alone when ones===0). mode is ignored (cardinal===attributive). */
      var ones = ['zero','one','two','three','four','five','six','seven','eight','nine',
                  'ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
      var tens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
      if (n < 20) return ones[n];
      var t = Math.floor(n / 10), o = n % 10;
      return (o === 0) ? tens[t] : (tens[t] + '-' + ones[o]);
    },
    de: function (n, mode) {
      /* Units-first compound: 'einundzwanzig' = 1 + 'und' + 20. */
      var onesCard = ['null','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun'];
      var onesAttr = ['null','ein', 'zwei','drei','vier','fünf','sechs','sieben','acht','neun'];
      var teens    = ['zehn','elf','zwölf','dreizehn','vierzehn','fünfzehn','sechzehn','siebzehn','achtzehn','neunzehn'];
      var tens     = ['','','zwanzig','dreißig','vierzig','fünfzig','sechzig','siebzig','achtzig','neunzig'];
      if (n < 10) return (mode === 'attributive') ? onesAttr[n] : onesCard[n];
      if (n < 20) return teens[n - 10];
      var t = Math.floor(n / 10), o = n % 10;
      if (o === 0) return tens[t];
      return onesAttr[o] + 'und' + tens[t];  // e.g. einundzwanzig
    },
    es: function (n, mode) {
      /* 0-29 lookup (irregulars 11-15 + dieci-16-19 + veinti-21-29 are
         single contracted words). 30+ uses <tens> y <ones>. */
      var lookup = [
        'cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve',
        'diez','once','doce','trece','catorce','quince',
        'dieciséis','diecisiete','dieciocho','diecinueve',
        'veinte','veintiuno','veintidós','veintitrés','veinticuatro',
        'veinticinco','veintiséis','veintisiete','veintiocho','veintinueve'
      ];
      var attrFem = ['cero','una','dos','tres','cuatro','cinco','seis','siete','ocho','nueve'];
      var tens = ['','','veinte','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'];
      if (n < 10) return (mode === 'attributive-fem') ? attrFem[n] : lookup[n];
      if (n < 30) return lookup[n];
      var t = Math.floor(n / 10), o = n % 10;
      if (o === 0) return tens[t];
      return tens[t] + ' y ' + lookup[o];  // e.g. cuarenta y siete
    },
    it: function (n, mode) {
      /* 0-19 lookup. 20-99 = tens-word + ones-word with TWO grammar rules:
         (a) When ones is 1 or 8, drop the final vowel of the tens-word
             (vowel elision): venti+uno=ventuno, venti+otto=ventotto,
             trenta+uno=trentuno, ..., ottanta+otto=ottantotto.
         (b) When ones is 3, the ones-word in compound position takes the
             grave-é accent: ventitré, trentatré, ..., novantatré. */
      var lookup = [
        'zero','uno','due','tre','quattro','cinque','sei','sette','otto','nove',
        'dieci','undici','dodici','tredici','quattordici','quindici',
        'sedici','diciassette','diciotto','diciannove'
      ];
      var attrFem = ['zero','una','due','tre','quattro','cinque','sei','sette','otto','nove'];
      var tens = ['','','venti','trenta','quaranta','cinquanta','sessanta','settanta','ottanta','novanta'];
      /* Compound-position ones forms: same as standalone except 3 → 'tré'. */
      var onesForCompound = ['','uno','due','tré','quattro','cinque','sei','sette','otto','nove'];
      if (n < 10) return (mode === 'attributive-fem') ? attrFem[n] : lookup[n];
      if (n < 20) return lookup[n];
      var t = Math.floor(n / 10), o = n % 10;
      if (o === 0) return tens[t];
      var tensStr = tens[t];
      if (o === 1 || o === 8) tensStr = tensStr.slice(0, -1);  // elision: ventuno, ventotto
      return tensStr + onesForCompound[o];
    },
    fr: function (n, mode) {
      /* Standard France French. Handles:
         - 0-19 direct lookup (irregulars: 11 onze, 12 douze, …, 16 seize;
           17-19 are compound dix-sept / dix-huit / dix-neuf).
         - 20-69 regular pattern: <tens-word> + connector + <ones-word>.
             ones === 1 → " et un" (NO hyphen, with "et"): 21 vingt et un, …
             ones === 2-9 → "-" + ones-word: 22 vingt-deux, 47 quarante-sept.
         - 70-79 vigesimal: "soixante" + (10..19). 70=soixante-dix; 71 with
           "et" → "soixante et onze"; 72 soixante-douze; 79 soixante-dix-neuf.
         - 80: "quatre-vingts" with -s ONLY at exact 80.
         - 81-89: "quatre-vingt-" + ones-word (NO -s, NO "et"). 81=quatre-
           vingt-un, 89=quatre-vingt-neuf.
         - 90-99: "quatre-vingt-" + (10..19) (NO "et" even at 91). 90=quatre-
           vingt-dix, 91=quatre-vingt-onze, 99=quatre-vingt-dix-neuf.
         - attributive-fem: 0→"zéro", 1→"une" (feminine of "un"); 2-9 = cardinal. */
      var lookup = [
        'zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf',
        'dix','onze','douze','treize','quatorze','quinze','seize',
        'dix-sept','dix-huit','dix-neuf'
      ];
      var attrFem = ['zéro','une','deux','trois','quatre','cinq','six','sept','huit','neuf'];
      var tens20to60 = ['','','vingt','trente','quarante','cinquante','soixante'];
      if (n < 10) return (mode === 'attributive-fem') ? attrFem[n] : lookup[n];
      if (n < 20) return lookup[n];
      var t = Math.floor(n / 10), o = n % 10;
      if (t >= 2 && t <= 6) {
        /* 20-69 */
        if (o === 0) return tens20to60[t];
        if (o === 1) return tens20to60[t] + ' et un';
        return tens20to60[t] + '-' + lookup[o];
      }
      if (t === 7) {
        /* 70-79 = soixante + (10..19); "soixante et onze" at 71 */
        if (o === 0) return 'soixante-dix';
        if (o === 1) return 'soixante et onze';
        return 'soixante-' + lookup[10 + o];
      }
      if (t === 8) {
        /* 80 = "quatre-vingts" with -s; 81-89 = "quatre-vingt-" + ones (no -s, no "et") */
        if (o === 0) return 'quatre-vingts';
        return 'quatre-vingt-' + lookup[o];
      }
      /* t === 9: 90-99 = "quatre-vingt-" + (10..19), NO "et" */
      if (o === 0) return 'quatre-vingt-dix';
      return 'quatre-vingt-' + lookup[10 + o];
    }
  },

  /* Speak the full decomposition on correct Check, per-locale.
     EN: "four tens and two ones make forty-two"
     DE: "Vier Zehner und zwei Einer ergeben zweiundvierzig"
         (tens-first to mirror the columns even though spoken German
          number-words are units-first; Zehner/Einer invariant; "Ein"
          for tens=1 / "ein" for ones=1 — attributive form before
          masculine noun; "null" for the 0 case; plural verb "ergeben"
          because two subjects connect with "und")
     ES: "una decena y dos unidades son doce"
         (tens-first to mirror columns; Romance plural agreement on
          BOTH nouns — 1 → "una decena" / "una unidad" sg, 2+ → plural;
          decena → decenas (-s), unidad → unidades (-es after consonant);
          "cero" takes the plural form ("cero decenas" / "cero unidades")
          per the 1.NBT.B.2.C decade case; plural verb "son")
     IT: "una decina e due unità fanno dodici"
         (tens-first; mixed inflection within one locale — decina/decine
          INFLECTS for number (1st-declension feminine -a → -e), unità is
          INVARIANT (stressed -à doesn't decline). "una" attributive
          feminine for 1; "zero" for 0; 0 takes plural decine per the
          decade case. Plural verb "fanno". Non-elided "una unità" form
          per the operator spec — classroom-acceptable K-3 register.)
     FR: "une dizaine et deux unités font douze"
         (tens-first; BOTH nouns inflect — dizaine/dizaines, unité/unités.
          "une" attributive feminine for 1; "zéro" for 0. DIFFERENCE from
          ES/IT/DE/EN: SINGULAR noun after "zéro" per standard French
          grammar — "zéro unité" not "zéro unités" (zéro treated as <1 in
          agreement). Plural verb "font". Cardinal target via the FR
          number-word helper handles irregular forms soixante-douze,
          quatre-vingt-neuf, quatre-vingt-onze etc.)
     Type 'ui' for instruction-shaped sentences per lcs-shell.js TYPES;
     TTS picks the voice from the `lang` parameter. */
  speakDecomposition: function () {
    if (!window.LCSAudio || !window.LCSAudio.speak) return;
    var lang = this.language;
    var sentence;
    if (lang === 'fr') {
      var tensWordFR   = this._numberWord(this.targetTens,   'fr', 'attributive-fem', false);
      var onesWordFR   = this._numberWord(this.targetOnes,   'fr', 'attributive-fem', false);
      var targetWordFR = this._numberWord(this.targetNumber, 'fr', 'cardinal',         false);
      /* FR inflection: 0 or 1 → singular noun; 2+ → plural. Singular after
         "zéro" is the FR-specific decade-case rule (zéro treated as <1 in
         agreement) — different from ES/IT/DE/EN which take plural after 0. */
      var tensPartFR = tensWordFR + ' dizaine' + (this.targetTens >= 2 ? 's' : '');
      var onesPartFR = onesWordFR + ' unité'   + (this.targetOnes >= 2 ? 's' : '');
      sentence = tensPartFR + ' et ' + onesPartFR + ' font ' + targetWordFR;
    } else if (lang === 'it') {
      var tensWordIT   = this._numberWord(this.targetTens,   'it', 'attributive-fem', false);
      var onesWordIT   = this._numberWord(this.targetOnes,   'it', 'attributive-fem', false);
      var targetWordIT = this._numberWord(this.targetNumber, 'it', 'cardinal',         false);
      /* decina inflects: 1 → decina (singular), 0 or 2+ → decine (plural). */
      var tensPartIT = tensWordIT + ' decin' + (this.targetTens === 1 ? 'a' : 'e');
      /* unità INVARIANT regardless of number. */
      var onesPartIT = onesWordIT + ' unità';
      sentence = tensPartIT + ' e ' + onesPartIT + ' fanno ' + targetWordIT;
    } else if (lang === 'es') {
      var tensWordES   = this._numberWord(this.targetTens,   'es', 'attributive-fem', false);
      var onesWordES   = this._numberWord(this.targetOnes,   'es', 'attributive-fem', false);
      var targetWordES = this._numberWord(this.targetNumber, 'es', 'cardinal',         false);
      var tensPartES = tensWordES + ' decena' + (this.targetTens === 1 ? '' : 's');
      var onesPartES = onesWordES + ' unidad' + (this.targetOnes === 1 ? '' : 'es');
      sentence = tensPartES + ' y ' + onesPartES + ' son ' + targetWordES;
    } else if (lang === 'de') {
      /* tensWord capitalized as sentence-start ("Ein" / "Vier" / …);
         onesWord lower-case ("ein" / "zwei" / …); targetWord cardinal
         lower-case (TTS reads "zwölf" / "zweiundvierzig" naturally). */
      var tensWord  = this._numberWord(this.targetTens,   'de', 'attributive', true);
      var onesWord  = this._numberWord(this.targetOnes,   'de', 'attributive', false);
      var targetWord = this._numberWord(this.targetNumber, 'de', 'cardinal',    false);
      sentence = tensWord + ' Zehner und ' + onesWord + ' Einer ergeben ' + targetWord;
    } else {
      /* EN default: "N tens and M ones make T". Grammar: "one ten" (sg)
         vs "two tens" (pl); same for ones. For decade tasks (ones === 0)
         "zero ones" reads correctly per CCSS 1.NBT.B.2.C. */
      var tensWordEN   = this._numberWord(this.targetTens,   'en');
      var onesWordEN   = this._numberWord(this.targetOnes,   'en');
      var targetWordEN = this._numberWord(this.targetNumber, 'en');
      var tensPart = tensWordEN + ' ten' + (this.targetTens === 1 ? '' : 's');
      var onesPart = onesWordEN + ' one' + (this.targetOnes === 1 ? '' : 's');
      sentence = tensPart + ' and ' + onesPart + ' make ' + targetWordEN;
    }
    window.LCSAudio.speak({
      type: 'ui',
      text: sentence,
      lang: lang,
      rate: 0.9
    });
  },

  /* ---- render(): build DOM skeleton ONCE per task (called by shell after
     setupTask). Two-column mat: Tens | Ones. Each column has label at top,
     "Add" button below label, then placed-items area grows downward. Below
     the mat: "Build" readout showing the running total. ---- */
  render: function () {
    var self = this;
    var stage = this.api.stage;
    stage.innerHTML = '';

    var wrap = this.api.el('div', 'pv-wrap');

    var mat = this.api.el('div', 'pv-mat');

    /* TENS column */
    var tensCol = this.api.el('div', 'pv-col pv-col--tens');
    var tensLabel = this.api.el('div', 'pv-col-label');
    tensLabel.textContent = this.api.t('tensLabel');
    tensCol.appendChild(tensLabel);

    var addTenBtn = this.api.el('button', 'pv-add-btn pv-add-btn--ten');
    addTenBtn.type = 'button';
    addTenBtn.textContent = this.api.t('addTenLabel');
    addTenBtn.setAttribute('aria-label', this.api.t('addTenLabel'));
    addTenBtn.addEventListener('click', function () { self.addTen(); });
    tensCol.appendChild(addTenBtn);

    var tensTray = this.api.el('div', 'pv-tray pv-tray--tens');
    tensCol.appendChild(tensTray);

    mat.appendChild(tensCol);

    /* ONES column */
    var onesCol = this.api.el('div', 'pv-col pv-col--ones');
    var onesLabel = this.api.el('div', 'pv-col-label');
    onesLabel.textContent = this.api.t('onesLabel');
    onesCol.appendChild(onesLabel);

    var addOneBtn = this.api.el('button', 'pv-add-btn pv-add-btn--one');
    addOneBtn.type = 'button';
    addOneBtn.textContent = this.api.t('addOneLabel');
    addOneBtn.setAttribute('aria-label', this.api.t('addOneLabel'));
    addOneBtn.addEventListener('click', function () { self.addOne(); });
    onesCol.appendChild(addOneBtn);

    var onesTray = this.api.el('div', 'pv-tray pv-tray--ones');
    onesCol.appendChild(onesTray);

    mat.appendChild(onesCol);

    wrap.appendChild(mat);

    /* "Build" readout — large running total below the mat. */
    var readout = this.api.el('div', 'pv-readout');
    var readoutLabel = this.api.el('span', 'pv-readout-label');
    readoutLabel.textContent = this.api.t('buildLabel');
    var readoutNum = this.api.el('span', 'pv-readout-num');
    readoutNum.textContent = '0';
    readout.append(readoutLabel, readoutNum);
    wrap.appendChild(readout);

    stage.appendChild(wrap);

    /* Stash refs for paint(). */
    this._tensTray = tensTray;
    this._onesTray = onesTray;
    this._readoutNum = readoutNum;
    this._addTenBtn = addTenBtn;
    this._addOneBtn = addOneBtn;

    this.paint();
  },

  /* ---- paint(): reflect current tensCount / onesCount onto trays + readout
     + Add-button disabled state. Re-renders the trays each call (cheap: max
     9 rods + 9 cubes = 18 SVG nodes). No DOM persistence between paints. ---- */
  paint: function () {
    if (!this._tensTray) return;
    var self = this;

    /* Tens tray: tensCount rods, each tappable to remove. */
    this._tensTray.innerHTML = '';
    for (var ti = 0; ti < this.tensCount; ti++) {
      var rodWrap = document.createElement('button');
      rodWrap.type = 'button';
      rodWrap.className = 'pv-block pv-rod';
      rodWrap.dataset.idx = String(ti);
      rodWrap.setAttribute('aria-label',
        this.api.t('srRemove') + ' ' + this.api.t('srTenRod') + ' ' + (ti + 1));
      rodWrap.innerHTML = this._rodSvg();
      (function (idx) {
        rodWrap.addEventListener('click', function () { self.removeTen(idx); });
      }(ti));
      this._tensTray.appendChild(rodWrap);
    }

    /* Ones tray: onesCount cubes in a 2-wide grid, each tappable to remove. */
    this._onesTray.innerHTML = '';
    for (var oi = 0; oi < this.onesCount; oi++) {
      var cubeWrap = document.createElement('button');
      cubeWrap.type = 'button';
      cubeWrap.className = 'pv-block pv-cube';
      cubeWrap.dataset.idx = String(oi);
      cubeWrap.setAttribute('aria-label',
        this.api.t('srRemove') + ' ' + this.api.t('srUnitCube') + ' ' + (oi + 1));
      cubeWrap.innerHTML = this._cubeSvg();
      (function (idx) {
        cubeWrap.addEventListener('click', function () { self.removeOne(idx); });
      }(oi));
      this._onesTray.appendChild(cubeWrap);
    }

    /* Readout. */
    if (this._readoutNum) this._readoutNum.textContent = String(this.builtValue());

    /* Add-buttons disable at cap. */
    if (this._addTenBtn) this._addTenBtn.disabled = (this.tensCount >= this.maxTens) || this.readOnly;
    if (this._addOneBtn) this._addOneBtn.disabled = (this.onesCount >= this.maxOnes) || this.readOnly;
  },

  reset: function () {
    this.tensCount = 0;
    this.onesCount = 0;
    this.readOnly = false;
    this.paint();
  },

  /* ---- inline SVGs for ten-rod + unit-cube ----
     Per plan doctrine § "Base-ten block visuals":
       • Both coral (#F2784B) — same semantic, different bundling
       • Unit cube: viewBox 0 0 100 100, rect rx=12, white highlight at 0.35 opacity
       • Ten rod: viewBox 0 0 100 500 (1:5), 10 stacked unit-cube divisions with
         thin white divider lines between stripes (reads "10 ones bundled")
       • No stroke; fill-only; same corner radius as the existing token style. */
  _cubeSvg: function () {
    return [
      '<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">',
        '<rect x="4" y="4" width="92" height="92" rx="12" ry="12" fill="#F2784B"/>',
        '<rect x="14" y="14" width="34" height="22" rx="6" ry="6" fill="#FFFFFF" opacity="0.35"/>',
      '</svg>'
    ].join('');
  },

  _rodSvg: function () {
    /* Single coral rect with thin white horizontal divider lines at the
       9 internal stripe boundaries (between the 10 unit divisions). Stripe
       height = 50px in viewBox units (500 / 10). Dividers at y = 50,100,...450. */
    var dividers = '';
    for (var i = 1; i < 10; i++) {
      var y = i * 50;
      dividers += '<line x1="6" y1="' + y + '" x2="94" y2="' + y +
                  '" stroke="#FFFFFF" stroke-opacity="0.45" stroke-width="2"/>';
    }
    return [
      '<svg viewBox="0 0 100 500" preserveAspectRatio="xMidYMid meet" aria-hidden="true">',
        '<rect x="4" y="4" width="92" height="492" rx="12" ry="12" fill="#F2784B"/>',
        /* Stripe highlights at the top of each unit division for the "10 cubes
           stacked" read — a soft white wash at the top 12px of each stripe. */
        '<rect x="14" y="14" width="34" height="14" rx="3" ry="3" fill="#FFFFFF" opacity="0.30"/>',
        dividers,
      '</svg>'
    ].join('');
  },

  /* ---- stage CSS — Direction A tokens, !important per §A.13.47 rule 6 ---- */
  _cssInjected: false,
  injectCSS: function () {
    if (this._cssInjected) return;
    this._cssInjected = true;
    var css = [
      /* Wrap: vertical stack of mat + readout, centered. */
      '.pv-wrap{display:flex !important;flex-direction:column !important;align-items:center !important;gap:clamp(10px,2.4vmin,18px) !important;width:100% !important;padding:0 clamp(4px,1.4vmin,12px) !important;}',

      /* Mat: two-column grid at ALL widths (don't stack phone — the
         spatial Tens-vs-Ones separation IS the place-value cognition).
         Tens column hugs its single-rod content (auto); Ones column gets
         the remaining width (1fr) for its 2-wide cube grid. */
      '.pv-mat{display:grid !important;grid-template-columns:auto 1fr !important;gap:clamp(12px,3vw,28px) !important;align-items:start !important;justify-content:center !important;width:100% !important;max-width:540px !important;}',

      /* Column: vertical stack, label + Add button + tray. The Tens column
         carries a soft teal-tinted wash to mark "this is the tens PLACE"
         without recoloring the blocks. */
      '.pv-col{display:flex !important;flex-direction:column !important;align-items:center !important;gap:clamp(8px,1.8vmin,14px) !important;padding:clamp(8px,2vmin,14px) clamp(6px,1.6vmin,12px) !important;border-radius:18px !important;}',
      '.pv-col--tens{background:rgba(20,107,94,0.06) !important;}',
      '.pv-col--ones{background:rgba(20,107,94,0.02) !important;}',

      /* Column label: small teal cap, uppercase, leans on Baloo 2. */
      '.pv-col-label{font-family:var(--lcs-font-display) !important;font-weight:800 !important;color:var(--lcs-structure) !important;text-transform:uppercase !important;letter-spacing:0.08em !important;font-size:clamp(12px,2.6vw,16px) !important;}',

      /* Add buttons: chunky coral pill, mirror Check-button cascade but
         smaller. Coral so they read as "the action" against the teal-wash
         column background. */
      '.pv-add-btn{',
      '  font-family:var(--lcs-font-display) !important;',
      '  font-weight:800 !important;',
      '  font-size:clamp(13px,2.8vw,17px) !important;',
      '  color:#FFFFFF !important;',
      '  background:linear-gradient(180deg,#F58A60 0%,#F2784B 100%) !important;',
      '  border:0 !important;',
      '  border-radius:999px !important;',
      '  padding:clamp(8px,1.8vmin,12px) clamp(14px,3.4vw,22px) !important;',
      '  cursor:pointer !important;',
      '  touch-action:manipulation !important;',
      '  box-shadow:0 3px 0 rgba(195,82,40,0.45),0 5px 12px rgba(242,120,75,0.28),inset 0 1px 0 rgba(255,255,255,0.35) !important;',
      '  transition:transform .12s cubic-bezier(.2,.8,.2,1),box-shadow .12s,opacity .15s !important;',
      '  min-width:clamp(72px,16vw,120px) !important;',
      '  line-height:1 !important;',
      '}',
      '.pv-add-btn:hover:not(:disabled){transform:translateY(-1px) !important;box-shadow:0 4px 0 rgba(195,82,40,0.45),0 6px 14px rgba(242,120,75,0.32),inset 0 1px 0 rgba(255,255,255,0.4) !important;}',
      '.pv-add-btn:active:not(:disabled){transform:translateY(1px) !important;box-shadow:0 2px 0 rgba(195,82,40,0.45),0 3px 6px rgba(242,120,75,0.25),inset 0 1px 0 rgba(255,255,255,0.3) !important;}',
      '.pv-add-btn:focus-visible{outline:2px solid var(--lcs-structure) !important;outline-offset:3px !important;}',
      '.pv-add-btn:disabled{opacity:0.45 !important;cursor:not-allowed !important;transform:none !important;}',

      /* Tens tray: vertical column of rods stacked downward. */
      '.pv-tray--tens{display:flex !important;flex-direction:column !important;align-items:center !important;gap:clamp(4px,1vmin,8px) !important;min-width:clamp(36px,9vw,64px) !important;max-height:clamp(360px,86vw,640px) !important;overflow-y:auto !important;padding:clamp(4px,1vmin,8px) !important;}',

      /* Ones tray: 2-column grid of cubes. */
      '.pv-tray--ones{display:grid !important;grid-template-columns:repeat(2,minmax(0,1fr)) !important;gap:clamp(6px,1.4vmin,10px) !important;justify-items:center !important;align-content:start !important;width:100% !important;max-width:clamp(120px,40vw,220px) !important;max-height:clamp(360px,86vw,640px) !important;overflow-y:auto !important;padding:clamp(4px,1vmin,8px) !important;}',

      /* Block-button base: removes default <button> chrome so the SVG
         block sits clean; the SVG is the entire visual. */
      '.pv-block{',
      '  background:transparent !important;',
      '  border:0 !important;',
      '  padding:0 !important;',
      '  margin:0 !important;',
      '  cursor:pointer !important;',
      '  touch-action:manipulation !important;',
      '  display:block !important;',
      '  line-height:0 !important;',
      '  transition:transform .12s cubic-bezier(.2,.8,.2,1),filter .15s,opacity .25s !important;',
      '  animation:pv-pop .22s cubic-bezier(.2,.8,.2,1) !important;',
      '}',
      '.pv-block:hover{transform:translateY(-2px) !important;filter:drop-shadow(0 4px 6px rgba(20,30,28,0.18)) !important;}',
      '.pv-block:active{transform:translateY(1px) scale(.96) !important;}',
      '.pv-block:focus-visible{outline:2px solid var(--lcs-structure) !important;outline-offset:3px !important;border-radius:4px !important;}',

      /* Cube + rod sizing — vw + px only per §A.13.47 rule 1.
         Rod capped at max-height 180px (px, not vh) to prevent iframe-
         grow-iframe cycle. */
      '.pv-cube svg{width:clamp(22px,5.5vw,40px) !important;height:clamp(22px,5.5vw,40px) !important;display:block !important;filter:drop-shadow(0 2px 3px rgba(20,30,28,0.16)) !important;}',
      '.pv-rod svg{width:clamp(14px,3.2vw,28px) !important;height:clamp(70px,16vw,140px) !important;max-height:180px !important;display:block !important;filter:drop-shadow(0 2px 4px rgba(20,30,28,0.18)) !important;}',

      /* Readout: pill carrying the running total, large + teal + Baloo 2. */
      '.pv-readout{display:inline-flex !important;align-items:center !important;gap:14px !important;background:linear-gradient(180deg,#FFFEFB 0%,#FAF1DF 100%) !important;padding:clamp(6px,1.4vmin,10px) clamp(16px,3vw,24px) !important;border-radius:999px !important;box-shadow:inset 0 1px 0 rgba(255,255,255,0.8),0 4px 10px rgba(20,30,28,0.08) !important;}',
      '.pv-readout-label{font-family:var(--lcs-font-body) !important;font-weight:700 !important;color:var(--lcs-ink-soft) !important;text-transform:uppercase !important;letter-spacing:0.06em !important;font-size:clamp(11px,2.2vw,14px) !important;}',
      '.pv-readout-num{font-family:var(--lcs-font-display) !important;font-weight:800 !important;color:var(--lcs-structure) !important;font-size:clamp(28px,7vw,52px) !important;line-height:1 !important;min-width:1.6em !important;text-align:center !important;}',

      /* Pop-in animation for newly-placed blocks. */
      '@keyframes pv-pop{from{transform:scale(.3);opacity:0;}to{transform:scale(1);opacity:1;}}',

      /* Mobile <= 599: tighten tray padding + gap; cubes stay readable. */
      '@media (max-width: 599px){',
      '  .pv-mat{gap:clamp(10px,2.6vw,16px) !important;max-width:96vw !important;}',
      '  .pv-col{padding:clamp(6px,1.6vw,10px) clamp(4px,1vw,8px) !important;}',
      '  .pv-tray--ones{max-width:clamp(110px,36vw,180px) !important;}',
      '}',

      /* Desktop >= 768: scale rod + cube up. */
      '@media (min-width: 768px){',
      '  .pv-cube svg{width:clamp(32px,4.5vw,46px) !important;height:clamp(32px,4.5vw,46px) !important;}',
      '  .pv-rod svg{width:clamp(24px,2.8vw,34px) !important;height:clamp(110px,14vw,170px) !important;max-height:180px !important;}',
      '  .pv-mat{max-width:600px !important;}',
      '}'
    ].join('\n');
    var tag = document.createElement('style');
    tag.textContent = css;
    document.head.appendChild(tag);
  }
};
