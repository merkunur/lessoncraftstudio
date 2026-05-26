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

  /* EN + DE + ES + IT + FR + PT + NL + SV + DA + NO + FI shipped — FULL
     11-locale E12 rollout complete. PT is Brazilian Portuguese (locale
     code 'pt' only, NEVER 'pt-BR' per CLAUDE.md §6). NO is Norwegian
     Bokmål (matches E9 syllable-builder Bokmål locking). FI is Finnish
     (Uralic; opposite-of-everyone-else partitive case after numbers).
     Additional locales fan-out one at a time per the §A.13.48 plan-mode-
     per-locale + 3-agent ensemble discipline. Engine falls back to `en`
     via api.t() if any unfilled locale routes here. The manifest row's
     `slug` map gates URL resolution before the engine ever boots — if a
     locale lacks a slug, /<locale>/activities/... 404s. */
  strings: {
    title:        { en: 'Place Value', de: 'Stellenwert', es: 'Valor posicional', it: 'Valore posizionale', fr: 'Valeur de position', pt: 'Valor posicional', nl: 'Plaatswaarde', sv: 'Platsvärde', da: 'Pladsværdi', no: 'Plassverdi', fi: 'Paikka-arvo' },
    instruction:  {
      en: 'Tap to add tens and ones. Tap a block to remove it.',
      de: 'Tippe, um Zehner und Einer hinzuzufügen. Tippe auf einen Stein, um ihn zu entfernen.',
      es: 'Toca para añadir decenas y unidades. Toca un bloque para quitarlo.',
      it: 'Tocca per aggiungere decine e unità. Tocca un blocco per rimuoverlo.',
      fr: 'Touche pour ajouter des dizaines et des unités. Touche un bloc pour le retirer.',
      pt: 'Toque para adicionar dezenas e unidades. Toque em um bloco para removê-lo.',
      nl: 'Tik om tientallen en eenheden toe te voegen. Tik op een blok om het te verwijderen.',
      sv: 'Tryck för att lägga till tiotal och ental. Tryck på ett block för att ta bort det.',
      da: 'Tryk for at tilføje tiere og enere. Tryk på en klods for at fjerne den.',
      no: 'Trykk for å legge til tiere og enere. Trykk på en blokk for å fjerne den.',
      fi: 'Napauta lisätäksesi kymmeniä ja ykkösiä. Napauta palikkaa poistaaksesi sen.'
    },
    tensLabel:    { en: 'Tens',     de: 'Zehner',              es: 'Decenas',                 it: 'Decine',                                              fr: 'Dizaines',                                            pt: 'Dezenas',                                             nl: 'Tientallen',                                          sv: 'Tiotal',                                              da: 'Tiere',                                               no: 'Tiere',                                               fi: 'Kymmenet' },
    onesLabel:    { en: 'Ones',     de: 'Einer',               es: 'Unidades',                it: 'Unità',                                               fr: 'Unités',                                              pt: 'Unidades',                                            nl: 'Eenheden',                                            sv: 'Ental',                                               da: 'Enere',                                               no: 'Enere',                                               fi: 'Ykköset' },
    buildLabel:   { en: 'Build',    de: 'Wert',                es: 'Valor',                   it: 'Valore',                                              fr: 'Valeur',                                              pt: 'Valor',                                               nl: 'Waarde',                                              sv: 'Värde',                                               da: 'Værdi',                                               no: 'Verdi',                                               fi: 'Arvo' },
    addTenLabel:  { en: 'Add ten',  de: 'Zehner hinzufügen',   es: 'Añadir una decena',       it: 'Aggiungi una decina',                                 fr: 'Ajoute une dizaine',                                  pt: 'Adicionar uma dezena',                                nl: 'Tiental toevoegen',                                   sv: 'Lägg till ett tiotal',                                da: 'Tilføj en tier',                                      no: 'Legg til en tier',                                    fi: 'Lisää kymmen' },
    addOneLabel:  { en: 'Add one',  de: 'Einer hinzufügen',    es: 'Añadir una unidad',       it: 'Aggiungi una unità',                                  fr: 'Ajoute une unité',                                    pt: 'Adicionar uma unidade',                               nl: 'Eenheid toevoegen',                                   sv: 'Lägg till ett ental',                                 da: 'Tilføj en ener',                                      no: 'Legg til en ener',                                    fi: 'Lisää ykkönen' },
    /* wordTen / wordOne are the placed-unit names spoken on tap. All
       locales use the place-unit nouns (NOT cardinals) to reinforce the
       1.NBT.B.2 place-value vocabulary the activity teaches and to match
       the column labels the kid sees. SV "tiotal" / "ental" are NEUTER
       nouns with zero-plural (invariant). DA "tier" / "ener" are COMMON-
       gender nouns that DECLINE (tier/tiere, ener/enere); tap-utterance
       speaks the singular form per "one rod was just placed". NO "tier" /
       "ener" are COMMON-gender nouns that DECLINE identically to DA.
       FI "kymmen" / "ykkönen" are nominative-singular Finnish nouns; the
       count-governed case-switch is in speakDecomposition, not here. */
    wordTen:      { en: 'ten',      de: 'Zehner',              es: 'decena',                  it: 'decina',                                              fr: 'dizaine',                                             pt: 'dezena',                                              nl: 'tiental',                                             sv: 'tiotal',                                              da: 'tier',                                                no: 'tier',                                                fi: 'kymmen' },
    wordOne:      { en: 'one',      de: 'Einer',               es: 'unidad',                  it: 'unità',                                               fr: 'unité',                                               pt: 'unidade',                                             nl: 'eenheid',                                             sv: 'ental',                                               da: 'ener',                                                no: 'ener',                                                fi: 'ykkönen' },
    /* Screen-reader fragments for placed-block aria-labels. */
    srTenRod:     { en: 'ten-rod',  de: 'Zehnerstab',          es: 'barra de diez',           it: 'barra di dieci',                                      fr: 'barre de dix',                                        pt: 'barra de dez',                                        nl: 'tienstaaf',                                           sv: 'tiostav',                                             da: 'tier-stang',                                          no: 'tierstav',                                            fi: 'kymmensauva' },
    srUnitCube:   { en: 'unit-cube',de: 'Einerwürfel',         es: 'cubo de uno',             it: 'cubo da uno',                                         fr: 'cube unité',                                          pt: 'cubinho',                                             nl: 'blokje',                                              sv: 'enhetskub',                                           da: 'ener-terning',                                        no: 'enerterning',                                         fi: 'ykköskuutio' },
    srRemove:     { en: 'remove',   de: 'entferne',            es: 'quitar',                  it: 'rimuovi',                                             fr: 'retire',                                              pt: 'remova',                                              nl: 'verwijder',                                           sv: 'ta bort',                                             da: 'fjern',                                               no: 'fjern',                                               fi: 'poista' },

    /* ---- 3-place activity (2.NBT.A.1) strings — EN-only for now.
       These keys are read ONLY when this.places contains 'hundreds'.
       2-place activity ignores them entirely (byte-identical behavior). */
    hundredsLabel:   { en: 'Hundreds' },
    addHundredLabel: { en: 'Add hundred' },
    wordHundred:     { en: 'hundred' },      // tap-utterance, singular (matches ten/one convention)
    srHundredsFlat:  { en: 'hundreds-flat' } // sr-only aria-label fragment
  },

  defaults: {},
  settings: [],

  /* ---- state + setup ---- */
  init: function (api) {
    this.api = api;
    this.targetNumber = 0;
    this.targetHundreds = 0;  // 3-place mode only; 0 in 2-place mode
    this.targetTens = 0;
    this.targetOnes = 0;
    this.hundredsCount = 0;   // 3-place mode only
    this.tensCount = 0;
    this.onesCount = 0;
    this.maxHundreds = 0;     // 0 in 2-place mode (gates rendering)
    this.maxTens = 9;
    this.maxOnes = 9;
    this.readOnly = false;
    this.places = ['tens', 'ones'];  // default 2-place; 3-place activity sets ['hundreds','tens','ones']
    this.language = (api && api.lang) || 'en';
  },

  /* Per-task hook. opts = { target, places?, maxHundreds=9, maxTens=9, maxOnes=9 }.
     When opts.places is omitted or doesn't include 'hundreds', behaves
     BYTE-IDENTICAL to the original 2-place engine (this.places defaults to
     ['tens','ones']; derivation uses target/10 and target%10; hundreds state
     stays at zero). When opts.places includes 'hundreds', derives
     hundreds/tens/ones from target/100/10/1 for the 2.NBT.A.1 activity. */
  setupTask: function (opts) {
    opts = opts || {};
    var target = (typeof opts.target === 'number' && opts.target >= 0) ? opts.target : 0;
    this.targetNumber = target;
    this.places = Array.isArray(opts.places) ? opts.places.slice() : ['tens', 'ones'];
    var has3 = this.places.indexOf('hundreds') >= 0;
    if (has3) {
      this.targetHundreds = Math.floor(target / 100);
      this.targetTens = Math.floor((target % 100) / 10);
      this.targetOnes = target % 10;
      this.maxHundreds = (typeof opts.maxHundreds === 'number') ? opts.maxHundreds : 9;
    } else {
      this.targetHundreds = 0;
      this.targetTens = Math.floor(target / 10);
      this.targetOnes = target % 10;
      this.maxHundreds = 0;
    }
    this.maxTens = (typeof opts.maxTens === 'number') ? opts.maxTens : 9;
    this.maxOnes = (typeof opts.maxOnes === 'number') ? opts.maxOnes : 9;
    this.hundredsCount = 0;
    this.tensCount = 0;
    this.onesCount = 0;
    this.readOnly = false;
  },

  /* Derived build value for prompt readout + hints. In 2-place mode
     hundredsCount is always 0 → byte-identical to original tens*10 + ones. */
  builtValue: function () { return this.hundredsCount * 100 + this.tensCount * 10 + this.onesCount; },

  addHundred: function () {
    if (this.readOnly) return;
    if (this.hundredsCount >= this.maxHundreds) return;
    this.hundredsCount++;
    this._speakWord(this.api.t('wordHundred'));
    this.api.sound(560);  // lower pitch than ten (660) — hundred is "bigger"
    this.paint();
    this._announceBuild();
  },

  removeHundred: function (idx) {
    if (this.readOnly) return;
    if (typeof idx !== 'number' || idx < 0 || idx >= this.hundredsCount) return;
    this.hundredsCount--;
    this.api.sound(340);
    this.paint();
    this._announceBuild();
  },

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
    if (n < 0 || n > 999) return String(n);
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
         alone when ones===0). 100-999 = ones-word + "hundred" + " " +
         sub99(remainder) — US Common Core convention with NO "and"
         between hundreds and tens (305 = "three hundred five", NOT
         "three hundred and five"). Round hundreds: 200 = "two hundred".
         Zero-tens: 305 = "three hundred five". Zero-ones: 420 = "four
         hundred twenty". mode is ignored (cardinal===attributive). */
      var ones = ['zero','one','two','three','four','five','six','seven','eight','nine',
                  'ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
      var tens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
      function sub99(m) {
        if (m < 20) return ones[m];
        var t = Math.floor(m / 10), o = m % 10;
        return (o === 0) ? tens[t] : (tens[t] + '-' + ones[o]);
      }
      if (n < 100) return sub99(n);
      var h = Math.floor(n / 100), rem = n % 100;
      var hPart = ones[h] + ' hundred';
      if (rem === 0) return hPart;
      return hPart + ' ' + sub99(rem);
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
    },
    pt: function (n, mode) {
      /* Brazilian Portuguese ('pt' canonical per CLAUDE.md §6; NEVER pt-BR).
         0-19 lookup with BR-canonical forms: 14=quatorze (BR-preferred over
         catorze), 16=dezesseis, 17=dezessete, 19=dezenove (NOT EU forms
         dezasseis/dezassete/dezanove). 20-99: <tens-word> + " e " +
         <ones-word>, simple compound.
         attributive-fem: 1→"uma" (feminine of "um"), 2→"duas" (feminine
         plural of "dois"). PT specificity vs ES which has only 1→"una"
         (ES 2 is invariant "dos"). 3-9 are invariant for gender. */
      var lookup = [
        'zero','um','dois','três','quatro','cinco','seis','sete','oito','nove',
        'dez','onze','doze','treze','quatorze','quinze',
        'dezesseis','dezessete','dezoito','dezenove'
      ];
      var attrFem = ['zero','uma','duas','três','quatro','cinco','seis','sete','oito','nove'];
      var tens = ['','','vinte','trinta','quarenta','cinquenta','sessenta','setenta','oitenta','noventa'];
      if (n < 10) return (mode === 'attributive-fem') ? attrFem[n] : lookup[n];
      if (n < 20) return lookup[n];
      var t = Math.floor(n / 10), o = n % 10;
      if (o === 0) return tens[t];
      return tens[t] + ' e ' + lookup[o];  // e.g. quarenta e sete; setenta e dois
    },
    nl: function (n, mode) {
      /* Standard Dutch. 0-12 direct lookup; 13-19 irregular teens with
         morphological stems (dertien/veertien). Tens 20-90 with irregular
         forms (dertig/veertig/tachtig). 20-99: units-first compound
         <onesForCompound> + connector + <tens-word> where connector is
         "ën" (TREMA) when ones is 2 or 3, else plain "en". The trema
         marks vowel-collision: twee+en→tweeën (two syllables); without
         trema "tweeen" could misread as a digraph.
         attributive: 1→"één" (with acute accents) to disambiguate from
         indefinite article "een" (which means "a/an"). K-1 readers benefit
         from the visual disambiguator before noun. */
      var lookup = [
        'nul','een','twee','drie','vier','vijf','zes','zeven','acht','negen',
        'tien','elf','twaalf','dertien','veertien','vijftien','zestien',
        'zeventien','achttien','negentien'
      ];
      var attr = ['nul','één','twee','drie','vier','vijf','zes','zeven','acht','negen'];
      var tens = ['','','twintig','dertig','veertig','vijftig','zestig','zeventig','tachtig','negentig'];
      var onesForCompound = ['','een','twee','drie','vier','vijf','zes','zeven','acht','negen'];
      if (n < 10) return (mode === 'attributive') ? attr[n] : lookup[n];
      if (n < 20) return lookup[n];
      var t = Math.floor(n / 10), o = n % 10;
      if (o === 0) return tens[t];
      var joinPart = (o === 2 || o === 3) ? 'ën' : 'en';  // trema when ones is 2 or 3
      return onesForCompound[o] + joinPart + tens[t];  // e.g. tweeëntwintig, zevenenveertig
    },
    sv: function (n, mode) {
      /* Swedish. 0-19 lookup; 20-99 = tens-first concat (no space, no
         joiner). Tens-words have IRREGULAR forms (load-bearing):
           fyrtio (NOT fyratio — 40)
           sjuttio (NOT sjutio — 70)
         attributive: 1→"ett" (neuter form before neuter nouns tiotal/
         ental). Cardinal[1] also "ett" (locked as Swedish K-1 counting
         default; "en" is the common-gender variant, not emitted here). */
      var lookup = [
        'noll','ett','två','tre','fyra','fem','sex','sju','åtta','nio',
        'tio','elva','tolv','tretton','fjorton','femton','sexton',
        'sjutton','arton','nitton'
      ];
      var attr = ['noll','ett','två','tre','fyra','fem','sex','sju','åtta','nio'];
      var tens = ['','','tjugo','trettio','fyrtio','femtio','sextio','sjuttio','åttio','nittio'];
      if (n < 10) return (mode === 'attributive') ? attr[n] : lookup[n];
      if (n < 20) return lookup[n];
      var t = Math.floor(n / 10), o = n % 10;
      if (o === 0) return tens[t];
      return tens[t] + lookup[o];  // e.g. fyrtiosju, sjuttiotvå, åttionio
    },
    fi: function (n, mode) {
      /* Finnish (Uralic; not Indo-European). 0-19 lookup; 20-99 =
         AGGLUTINATED compound (tens-first, single word, no joiner,
         no space). Teens 11-19 use "-toista" suffix (yksitoista,
         kaksitoista, ..., yhdeksäntoista). Tens 20-90: Xkymmentä
         (kaksikymmentä 20, ..., yhdeksänkymmentä 90). Compound 21-99
         is single agglutinated word: tens[t] + lookup[o] without space
         (neljäkymmentäseitsemän 47, seitsemänkymmentäkaksi 72,
         kahdeksankymmentäyhdeksän 89, yhdeksänkymmentäyhdeksän 99).
         Cardinal[10] = "kymmenen" — the genitive form of the noun
         "kymmen" functions as the standalone cardinal "10" in Finnish.
         Attributive mode: same as cardinal lookup for the number-word
         itself. Finnish has no gender — the number-word doesn't change
         form for attributive use. What CHANGES is the case of the
         COUNTED NOUN (nominative sg at 1, partitive sg at 0 or 2+) —
         that case-switch lives in speakDecomposition, not here. */
      var lookup = [
        'nolla','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän',
        'kymmenen','yksitoista','kaksitoista','kolmetoista','neljätoista','viisitoista','kuusitoista',
        'seitsemäntoista','kahdeksantoista','yhdeksäntoista'
      ];
      var attr = ['nolla','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän'];
      var tens = ['','','kaksikymmentä','kolmekymmentä','neljäkymmentä','viisikymmentä','kuusikymmentä','seitsemänkymmentä','kahdeksankymmentä','yhdeksänkymmentä'];
      if (n < 10) return (mode === 'attributive') ? attr[n] : lookup[n];
      if (n < 20) return lookup[n];
      var t = Math.floor(n / 10), o = n % 10;
      if (o === 0) return tens[t];
      return tens[t] + lookup[o];  // agglutinated: neljäkymmentäseitsemän, kahdeksankymmentäyhdeksän
    },
    no: function (n, mode) {
      /* Norwegian Bokmål. 0-19 lookup; 20-99 = TENS-FIRST concat (no
         space, no joiner; modern post-1951 reform; mirrors SV pattern;
         OPPOSITE of DA's ones-first compound).
         Tens-words 20-90 IRREGULAR (load-bearing Norwegian-specific):
           tjue    (20; NOT pre-1951 "tyve" which is DA's form)
           tretti  (30; NOT pre-1951 "tredve")
           førti   (40; ø vowel — irregular)
           femti
           seksti
           sytti
           åtti    (80; å vowel — irregular)
           nitti
         "sju" preferred over "syv" per modern K-1 Bokmål convention.
         attributive: 1 → "én" with acute accent (K-1 emphatic form
         before noun, distinguishes from indefinite article "en").
         Cardinal[1] also "én". Compound examples: 21=tjueén,
         47=førtisju, 72=syttito, 89=åttini, 99=nittini. */
      var lookup = [
        'null','én','to','tre','fire','fem','seks','sju','åtte','ni',
        'ti','elleve','tolv','tretten','fjorten','femten','seksten',
        'sytten','atten','nitten'
      ];
      var attr = ['null','én','to','tre','fire','fem','seks','sju','åtte','ni'];
      var tens = ['','','tjue','tretti','førti','femti','seksti','sytti','åtti','nitti'];
      if (n < 10) return (mode === 'attributive') ? attr[n] : lookup[n];
      if (n < 20) return lookup[n];
      var t = Math.floor(n / 10), o = n % 10;
      if (o === 0) return tens[t];
      return tens[t] + lookup[o];  // tens-first concat: førtisju, syttito, åttini
    },
    da: function (n, mode) {
      /* Danish. 0-19 lookup; 20-99 = ONES-FIRST + "og" (and) + TENS-word
         compound (Germanic, like German "einundzwanzig").
         Tens-words 50/60/70/80/90 are VICESIMAL (base-20) — load-bearing
         irregulars rooted in Old Norse halv-tredje-sinds-tyve etc.:
           halvtreds (50 = 2.5 × 20)
           tres      (60 = 3   × 20)
           halvfjerds(70 = 3.5 × 20)
           firs      (80 = 4   × 20)
           halvfems  (90 = 4.5 × 20)
         Regular tens 20=tyve, 30=tredive, 40=fyrre.
         attributive: 1 → "en" (common-gender form before common-gender
         nouns tier / ener — both common gender, taking the "en" article).
         Cardinal[1] also "en" (locked as Danish K-1 default; "et" is the
         neuter variant, not emitted here for tier/ener). Compound
         examples: 21=enogtyve, 47=syvogfyrre, 50=halvtreds, 72=tooghalv-
         fjerds, 89=niogfirs, 90=halvfems, 99=niooghalvfems. */
      var lookup = [
        'nul','en','to','tre','fire','fem','seks','syv','otte','ni',
        'ti','elleve','tolv','tretten','fjorten','femten','seksten',
        'sytten','atten','nitten'
      ];
      var attr = ['nul','en','to','tre','fire','fem','seks','syv','otte','ni'];
      var tens = ['','','tyve','tredive','fyrre','halvtreds','tres','halvfjerds','firs','halvfems'];
      if (n < 10) return (mode === 'attributive') ? attr[n] : lookup[n];
      if (n < 20) return lookup[n];
      var t = Math.floor(n / 10), o = n % 10;
      if (o === 0) return tens[t];
      return lookup[o] + 'og' + tens[t];  // ones-first: syvogfyrre, niogfirs, tooghalvfjerds
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
     PT: "uma dezena e duas unidades são doze"
         (Brazilian Portuguese; tens-first; BOTH nouns inflect —
          dezena/dezenas, unidade/unidades. PT-SPECIFIC divergence from
          ES/IT/FR: 1 → "uma" AND 2 → "duas" both have feminine forms
          (ES only has "una"/1; IT has only "una"/1; FR has only "une"/1).
          Zero takes plural per ES/IT/DE/EN convention (opposite of FR
          singular-after-zéro). Plural verb "são". Cardinal target uses
          Brazilian forms: dezesseis/dezessete/dezenove etc.)
     NL: "één tiental en twee eenheden maken twaalf"
         (Standard Dutch; tens-first; BOTH nouns inflect — tiental/
          tientallen (neuter -tal → -tallen), eenheid/eenheden (-eid →
          -eden). 1 → accented "één" disambiguates from indefinite article
          "een" (=a/an). Zero takes plural (matches Germanic+Romance
          convention; opposite of FR). Plural verb "maken". Cardinal target
          is units-first compound with TREMA rule: tweeënzeventig at 72,
          negenentachtig at 89, etc.)
     SV: "ett tiotal och två ental blir tolv"
         (Swedish; tens-first; place-unit nouns INVARIANT (zero-plural
          neuter nouns — ett tiotal, fyra tiotal, noll tiotal all same
          word form; same as får/får sheep). NO plural suffix. "ett" =
          neuter "a/one" before neuter noun. Copula "blir" (becomes) —
          K-1 Swedish math convention. Cardinal target tens-first compound
          with irregular tens-words: fyrtiosju, sjuttiotvå, åttionio.)
     DA: "en tier og to enere er tolv"
         (Danish; tens-first; place-unit nouns DECLINE — tier/tiere,
          ener/enere (common-gender). Zero takes plural (matches Germanic
          + Romance convention; opposite of FR). Copula "er" (is/equals) —
          K-1 Danish math convention. Cardinal target is ones-first
          compound with "og" (Germanic pattern, like DE): syvogfyrre at
          47, niogfirs at 89. Vicesimal tens-words 50-90 (halvtreds /
          tres / halvfjerds / firs / halvfems) are the load-bearing
          Danish-specific irregularity rooted in Old Norse base-20.)
     NO: "én tier og to enere blir tolv"
         (Norwegian Bokmål; tens-first; place-unit nouns DECLINE
          identically to DA — tier/tiere, ener/enere (common-gender).
          Zero takes plural (matches Germanic+Romance convention;
          opposite of FR). Copula "blir" (becomes) — K-1 Norwegian
          Bokmål math-decomposition convention; mirrors SV. Acute "én"
          for count=1 — K-1 emphatic form distinguishing from indefinite
          article "en". Cardinal target is TENS-FIRST concat (post-1951
          reform; mirrors SV): førtisju at 47, åttini at 89. Irregular
          ø/å tens-words førti (40) and åtti (80) are the load-bearing
          Norwegian-specific irregularity.)
     FI: "yksi kymmen ja kaksi ykköstä on kaksitoista"
         (Finnish, Uralic; tens-first. LOAD-BEARING case-rule OPPOSITE
          to every prior locale: count=1 → NOMINATIVE singular
          (kymmen / ykkönen); count=0 or 2+ → PARTITIVE singular
          (kymmentä / ykköstä — NOT pluralized; Finnish counts govern
          partitive SG, not partitive PL). Zero takes partitive
          (Finnish-canonical decade case: "nolla ykköstä"). Copula "on"
          (3sg of olla = is/equals) — K-1 Finnish math convention.
          Cardinal target is AGGLUTINATED single-word compound:
          neljäkymmentäseitsemän at 47, kahdeksankymmentäyhdeksän at 89.
          Teens use -toista suffix: kaksitoista 12, yhdeksäntoista 19.)
     Type 'ui' for instruction-shaped sentences per lcs-shell.js TYPES;
     TTS picks the voice from the `lang` parameter. */
  speakDecomposition: function () {
    if (!window.LCSAudio || !window.LCSAudio.speak) return;
    var lang = this.language;
    var sentence;
    /* 3-place mode (activity 2 — 2.NBT.A.1). Gated on this.places
       including 'hundreds'. EN-only for now; future fan-out adds other
       locale branches here. Zero places ARE spoken — naming "0 tens" is
       the 2.NBT.A.1 teaching point. */
    if (this.places && this.places.indexOf('hundreds') >= 0) {
      if (lang === 'en') {
        var hWordEN3 = this._numberWord(this.targetHundreds, 'en');
        var tWordEN3 = this._numberWord(this.targetTens,     'en');
        var oWordEN3 = this._numberWord(this.targetOnes,     'en');
        var nWordEN3 = this._numberWord(this.targetNumber,   'en');
        var hPartEN3 = hWordEN3 + ' hundred' + (this.targetHundreds === 1 ? '' : 's');
        var tPartEN3 = tWordEN3 + ' ten'     + (this.targetTens     === 1 ? '' : 's');
        var oPartEN3 = oWordEN3 + ' one'     + (this.targetOnes     === 1 ? '' : 's');
        sentence = hPartEN3 + ', ' + tPartEN3 + ', and ' + oPartEN3 + ' make ' + nWordEN3;
      }
      /* Other locales in 3-place mode without an EN-3P branch leave
         `sentence` undefined → falls through to the 2-place branches
         below (graceful degradation; will not occur in shipped state). */
    }
    if (sentence) {
      // 3-place sentence resolved above; skip 2-place branches.
    } else if (lang === 'fi') {
      var tensWordFI   = this._numberWord(this.targetTens,   'fi', 'attributive', false);
      var onesWordFI   = this._numberWord(this.targetOnes,   'fi', 'attributive', false);
      var targetWordFI = this._numberWord(this.targetNumber, 'fi', 'cardinal',     false);
      /* FI case-rule (LOAD-BEARING — opposite of every prior locale):
           count=1   → NOMINATIVE singular (kymmen / ykkönen)
           count=0 OR 2+ → PARTITIVE singular (kymmentä / ykköstä —
                      NOT pluralized; Finnish counts govern partitive
                      SG, not partitive PL).
         Copula "on" (3sg present of olla = is/equals) — Finnish K-1
         math-decomposition convention; matches existing FI math
         precedent in ten-frame + choice-board + syllable-builder.
         Cardinal target via FI helper handles agglutinated tens-first
         compound: neljäkymmentäseitsemän, kahdeksankymmentäyhdeksän. */
      var tensNounFI = (this.targetTens === 1) ? 'kymmen' : 'kymmentä';
      var onesNounFI = (this.targetOnes === 1) ? 'ykkönen' : 'ykköstä';
      sentence = tensWordFI + ' ' + tensNounFI + ' ja ' + onesWordFI + ' ' + onesNounFI + ' on ' + targetWordFI;
    } else if (lang === 'no') {
      var tensWordNO   = this._numberWord(this.targetTens,   'no', 'attributive', false);
      var onesWordNO   = this._numberWord(this.targetOnes,   'no', 'attributive', false);
      var targetWordNO = this._numberWord(this.targetNumber, 'no', 'cardinal',     false);
      /* NO inflection: tier/ener are COMMON-gender nouns that decline
         identically to DA. count=1 → singular (tier/ener); count=0 or
         2+ → plural (tiere/enere). Zero takes plural per Germanic+
         Romance convention. Copula "blir" (3sg/3pl present of "bli" =
         "to become") — K-1 Norwegian Bokmål math-decomposition
         convention; mirrors SV. Cardinal target via NO helper handles
         modern post-1951 tens-first compound with irregular ø/å tens-
         words (førti, åtti). Acute "én" emitted by helper's attributive
         lookup at count=1. */
      var tensNounNO = (this.targetTens === 1) ? 'tier' : 'tiere';
      var onesNounNO = (this.targetOnes === 1) ? 'ener' : 'enere';
      sentence = tensWordNO + ' ' + tensNounNO + ' og ' + onesWordNO + ' ' + onesNounNO + ' blir ' + targetWordNO;
    } else if (lang === 'da') {
      var tensWordDA   = this._numberWord(this.targetTens,   'da', 'attributive', false);
      var onesWordDA   = this._numberWord(this.targetOnes,   'da', 'attributive', false);
      var targetWordDA = this._numberWord(this.targetNumber, 'da', 'cardinal',     false);
      /* DA inflection: tier/ener are COMMON-gender nouns that decline.
         count=1 → singular (tier/ener); count=0 or 2+ → plural (tiere/enere).
         Zero takes plural per Germanic+Romance convention. Copula "er"
         (3sg/3pl present of "være" = is/equals) — K-1 Danish math
         decomposition convention. Cardinal target via DA helper handles
         vicesimal tens (halvtreds/halvfjerds/firs) + ones-first compound. */
      var tensNounDA = (this.targetTens === 1) ? 'tier' : 'tiere';
      var onesNounDA = (this.targetOnes === 1) ? 'ener' : 'enere';
      sentence = tensWordDA + ' ' + tensNounDA + ' og ' + onesWordDA + ' ' + onesNounDA + ' er ' + targetWordDA;
    } else if (lang === 'sv') {
      var tensWordSV   = this._numberWord(this.targetTens,   'sv', 'attributive', false);
      var onesWordSV   = this._numberWord(this.targetOnes,   'sv', 'attributive', false);
      var targetWordSV = this._numberWord(this.targetNumber, 'sv', 'cardinal',     false);
      /* SV: tiotal/ental are NEUTER nouns with ZERO-PLURAL morphology.
         Same form singular and plural (like får/får sheep, bord/bord
         table). NEVER append a plural suffix. Copula "blir" (becomes)
         per K-1 Swedish math-decomposition convention. */
      var tensPartSV = tensWordSV + ' tiotal';   // INVARIANT
      var onesPartSV = onesWordSV + ' ental';    // INVARIANT
      sentence = tensPartSV + ' och ' + onesPartSV + ' blir ' + targetWordSV;
    } else if (lang === 'nl') {
      var tensWordNL   = this._numberWord(this.targetTens,   'nl', 'attributive', false);
      var onesWordNL   = this._numberWord(this.targetOnes,   'nl', 'attributive', false);
      var targetWordNL = this._numberWord(this.targetNumber, 'nl', 'cardinal',     false);
      /* NL inflection: 1 → singular noun; 0 or 2+ → plural.
         tiental → tientallen (Dutch neuter -tal → -tallen suffix);
         eenheid → eenheden (Dutch -eid → -eden suffix).
         Plural verb "maken" (3pl present of maken = "to make"). */
      var tensPartNL = tensWordNL + ' tiental' + (this.targetTens === 1 ? '' : 'len');
      var onesPartNL = onesWordNL + ' eenhe' + (this.targetOnes === 1 ? 'id' : 'den');
      sentence = tensPartNL + ' en ' + onesPartNL + ' maken ' + targetWordNL;
    } else if (lang === 'pt') {
      var tensWordPT   = this._numberWord(this.targetTens,   'pt', 'attributive-fem', false);
      var onesWordPT   = this._numberWord(this.targetOnes,   'pt', 'attributive-fem', false);
      var targetWordPT = this._numberWord(this.targetNumber, 'pt', 'cardinal',         false);
      /* PT inflection: 1 → singular; 0 or 2+ → plural (zero takes plural).
         Plural verb "são". Note feminine "duas" at ones=2 (e.g., 12 → "uma
         dezena e duas unidades são doze") — PT divergence from ES "dos"
         invariant. */
      var tensPartPT = tensWordPT + ' dezena' + (this.targetTens === 1 ? '' : 's');
      var onesPartPT = onesWordPT + ' unidade' + (this.targetOnes === 1 ? '' : 's');
      sentence = tensPartPT + ' e ' + onesPartPT + ' são ' + targetWordPT;
    } else if (lang === 'fr') {
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

    /* 3-place mode (activity 2 — 2.NBT.A.1): add the .pv-mat--3p
       modifier class which scopes the narrower tray/manipulative
       sizings (CSS below at the .pv-mat--3p selectors), AND override
       grid-template-columns inline so the default `auto auto` becomes
       `auto auto auto`. 2-place mode does NEITHER — the existing CSS
       default applies and tens/ones trays render byte-identical. */
    var has3places = this.places && this.places.indexOf('hundreds') >= 0;
    if (has3places) {
      mat.classList.add('pv-mat--3p');
      mat.style.gridTemplateColumns = 'repeat(' + this.places.length + ', auto)';
    }

    /* HUNDREDS column — APPENDED FIRST in 3-place mode so column order is
       hundreds → tens → ones (mirrors written place-value order). In
       2-place mode this block is skipped entirely; mat contains only
       tens + ones columns in the same order as before (byte-identical). */
    var addHundredBtn = null;
    var hundredsTray = null;
    if (has3places) {
      var hundredsCol = this.api.el('div', 'pv-col pv-col--hundreds');
      var hundredsLabel = this.api.el('div', 'pv-col-label');
      hundredsLabel.textContent = this.api.t('hundredsLabel');
      hundredsCol.appendChild(hundredsLabel);

      addHundredBtn = this.api.el('button', 'pv-add-btn pv-add-btn--hundred');
      addHundredBtn.type = 'button';
      addHundredBtn.textContent = this.api.t('addHundredLabel');
      addHundredBtn.setAttribute('aria-label', this.api.t('addHundredLabel'));
      addHundredBtn.addEventListener('click', function () { self.addHundred(); });
      hundredsCol.appendChild(addHundredBtn);

      hundredsTray = this.api.el('div', 'pv-tray pv-tray--hundreds');
      hundredsCol.appendChild(hundredsTray);

      mat.appendChild(hundredsCol);
    }

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

    /* Stash refs for paint(). hundreds refs are null in 2-place mode
       (paint() guards on this._hundredsTray presence). */
    this._hundredsTray = hundredsTray;
    this._tensTray = tensTray;
    this._onesTray = onesTray;
    this._readoutNum = readoutNum;
    this._addHundredBtn = addHundredBtn;
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

    /* Hundreds tray (3-place mode only): hundredsCount flats, each
       tappable to remove. In 2-place mode this._hundredsTray is null
       (the guard skips the loop entirely). */
    if (this._hundredsTray) {
      this._hundredsTray.innerHTML = '';
      for (var hi = 0; hi < this.hundredsCount; hi++) {
        var flatWrap = document.createElement('button');
        flatWrap.type = 'button';
        flatWrap.className = 'pv-block pv-flat';
        flatWrap.dataset.idx = String(hi);
        flatWrap.setAttribute('aria-label',
          this.api.t('srRemove') + ' ' + this.api.t('srHundredsFlat') + ' ' + (hi + 1));
        flatWrap.innerHTML = this._flatSvg();
        (function (idx) {
          flatWrap.addEventListener('click', function () { self.removeHundred(idx); });
        }(hi));
        this._hundredsTray.appendChild(flatWrap);
      }
    }

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
    if (this._addHundredBtn) this._addHundredBtn.disabled = (this.hundredsCount >= this.maxHundreds) || this.readOnly;
    if (this._addTenBtn) this._addTenBtn.disabled = (this.tensCount >= this.maxTens) || this.readOnly;
    if (this._addOneBtn) this._addOneBtn.disabled = (this.onesCount >= this.maxOnes) || this.readOnly;
  },

  reset: function () {
    this.hundredsCount = 0;
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
       height = 50px in viewBox units (500 / 10). Dividers at y = 50,100,...450.
       preserveAspectRatio="none" lets the rod stretch to fill the parent
       box's full height (the new tens-column layout uses a fixed column
       height and rods sit side-by-side at full column height) — internal
       stripes spread evenly across the stretched box; visual remains "tall
       thin stick with 10 internal stripes." */
    var dividers = '';
    for (var i = 1; i < 10; i++) {
      var y = i * 50;
      dividers += '<line x1="6" y1="' + y + '" x2="94" y2="' + y +
                  '" stroke="#FFFFFF" stroke-opacity="0.45" stroke-width="2"/>';
    }
    return [
      '<svg viewBox="0 0 100 500" preserveAspectRatio="none" aria-hidden="true">',
        '<rect x="4" y="4" width="92" height="492" rx="12" ry="12" fill="#F2784B"/>',
        /* Stripe highlights at the top of each unit division for the "10 cubes
           stacked" read — a soft white wash at the top 12px of each stripe. */
        '<rect x="14" y="14" width="34" height="14" rx="3" ry="3" fill="#FFFFFF" opacity="0.30"/>',
        dividers,
      '</svg>'
    ].join('');
  },

  _flatSvg: function () {
    /* Hundreds-flat: 10×10 grid square. Same coral fill #F2784B as cube
       and rod (per Direction A: same color, same semantic, just bundled).
       9 horizontal + 9 vertical white divider lines partition the flat
       into 100 visible unit cells — the load-bearing teaching cue that
       a flat = 10 rods = 100 cubes. Smaller rx=6 (vs cube's rx=12) so
       the flat reads as a "rigid grid of units" rather than a soft
       rounded block. preserveAspectRatio="xMidYMid meet" keeps the flat
       square at any size. Small white highlight at top-left echoes the
       cube's highlight motif. */
    var lines = '';
    for (var i = 1; i < 10; i++) {
      var pos = i * 10;
      lines += '<line x1="' + pos + '" y1="4" x2="' + pos + '" y2="96" stroke="#FFFFFF" stroke-opacity="0.45" stroke-width="0.6"/>';
      lines += '<line x1="4" y1="' + pos + '" x2="96" y2="' + pos + '" stroke="#FFFFFF" stroke-opacity="0.45" stroke-width="0.6"/>';
    }
    return [
      '<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">',
        '<rect x="4" y="4" width="92" height="92" rx="6" ry="6" fill="#F2784B"/>',
        '<rect x="14" y="14" width="14" height="10" rx="2" ry="2" fill="#FFFFFF" opacity="0.30"/>',
        lines,
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
         Both columns auto-sized to their fixed-height trays; centered. */
      '.pv-mat{display:grid !important;grid-template-columns:auto auto !important;gap:clamp(12px,3vw,24px) !important;align-items:stretch !important;justify-content:center !important;width:100% !important;max-width:540px !important;}',

      /* Column: vertical stack, label + Add button + tray. The Tens column
         carries a soft teal-tinted wash to mark "this is the tens PLACE"
         without recoloring the blocks. */
      '.pv-col{display:flex !important;flex-direction:column !important;align-items:center !important;gap:clamp(8px,1.8vmin,14px) !important;padding:clamp(8px,2vmin,14px) clamp(6px,1.6vmin,12px) !important;border-radius:18px !important;}',
      '.pv-col--hundreds{background:rgba(20,107,94,0.10) !important;}',
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

      /* Tens tray: HORIZONTAL stack of vertical rods, all rods stretch to
         fill column height. FIXED height (NOT max-height) + overflow:hidden
         — engine content NEVER exceeds the iframe's min-height floor
         (66.67vh desktop / 85vh mobile), so iframe stays at floor and the
         card height is locked regardless of how many rods are placed.
         align-items:stretch (NOT flex-end) so rods cleanly fill column
         height without the layout-instability of mixing flex-end + height:100%. */
      '.pv-tray--tens{display:flex !important;flex-direction:row !important;align-items:stretch !important;justify-content:center !important;gap:clamp(2px,0.6vw,4px) !important;width:clamp(180px,46vw,280px) !important;height:clamp(180px,38vw,280px) !important;overflow:hidden !important;padding:clamp(6px,1.4vw,12px) clamp(6px,1vw,10px) !important;background:rgba(255,255,255,0.4) !important;border-radius:14px !important;box-shadow:inset 0 1px 3px rgba(20,30,28,0.06) !important;}',

      /* Ones tray: 3-WIDE grid (was 2-wide). 9 cubes → 3 rows. Same fixed
         height as tens for visual parity. Cubes anchor at bottom matching
         the rods\' baseline. */
      '.pv-tray--ones{display:grid !important;grid-template-columns:repeat(3,clamp(28px,6vw,44px)) !important;grid-auto-rows:clamp(28px,6vw,44px) !important;gap:clamp(4px,1vw,8px) !important;justify-content:center !important;align-content:end !important;width:auto !important;height:clamp(180px,38vw,280px) !important;overflow:hidden !important;padding:clamp(6px,1.4vw,12px) clamp(6px,1vw,10px) !important;background:rgba(255,255,255,0.3) !important;border-radius:14px !important;box-shadow:inset 0 1px 3px rgba(20,30,28,0.06) !important;}',

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
         Each rod is a narrow vertical block; .pv-rod (the parent button)
         carries width + height; the SVG inside fills it 100% via the
         preserveAspectRatio="none" baked into _rodSvg. Cube SVG sized
         square to fit its 3-wide grid cell. */
      '.pv-rod{width:clamp(14px,3.2vw,22px) !important;flex-shrink:0 !important;align-self:stretch !important;}',
      '.pv-rod svg{width:100% !important;height:100% !important;display:block !important;filter:drop-shadow(0 2px 4px rgba(20,30,28,0.18)) !important;}',
      '.pv-cube{flex-shrink:0 !important;}',
      '.pv-cube svg{width:clamp(28px,6vw,44px) !important;height:clamp(28px,6vw,44px) !important;display:block !important;filter:drop-shadow(0 2px 3px rgba(20,30,28,0.16)) !important;}',
      /* Flat (hundreds-block): square aspect; sizing scoped under
         .pv-mat--3p (the only mode where hundreds-tray renders). */
      '.pv-flat{flex-shrink:0 !important;}',

      /* Readout: pill carrying the running total, large + teal + Baloo 2. */
      '.pv-readout{display:inline-flex !important;align-items:center !important;gap:14px !important;background:linear-gradient(180deg,#FFFEFB 0%,#FAF1DF 100%) !important;padding:clamp(6px,1.4vmin,10px) clamp(16px,3vw,24px) !important;border-radius:999px !important;box-shadow:inset 0 1px 0 rgba(255,255,255,0.8),0 4px 10px rgba(20,30,28,0.08) !important;}',
      '.pv-readout-label{font-family:var(--lcs-font-body) !important;font-weight:700 !important;color:var(--lcs-ink-soft) !important;text-transform:uppercase !important;letter-spacing:0.06em !important;font-size:clamp(11px,2.2vw,14px) !important;}',
      '.pv-readout-num{font-family:var(--lcs-font-display) !important;font-weight:800 !important;color:var(--lcs-structure) !important;font-size:clamp(28px,7vw,52px) !important;line-height:1 !important;min-width:1.6em !important;text-align:center !important;}',

      /* Pop-in animation for newly-placed blocks. */
      '@keyframes pv-pop{from{transform:scale(.3);opacity:0;}to{transform:scale(1);opacity:1;}}',

      /* Mobile <= 599: tighter sizing; 3-wide cubes shrink. */
      '@media (max-width: 599px){',
      '  .pv-mat{gap:clamp(8px,2vw,14px) !important;max-width:96vw !important;}',
      '  .pv-col{padding:clamp(6px,1.6vw,10px) clamp(4px,1vw,8px) !important;}',
      '  .pv-tray--tens{width:clamp(170px,48vw,230px) !important;height:clamp(170px,46vw,240px) !important;}',
      '  .pv-tray--ones{height:clamp(170px,46vw,240px) !important;grid-template-columns:repeat(3,clamp(24px,6vw,36px)) !important;grid-auto-rows:clamp(24px,6vw,36px) !important;}',
      '  .pv-rod{width:clamp(14px,3.6vw,22px) !important;}',
      '  .pv-cube svg{width:clamp(24px,6vw,36px) !important;height:clamp(24px,6vw,36px) !important;}',
      '}',

      /* Tablet 768-1023 — own breakpoint per §A.13.47 rule 8.
         9 rods × 18px + 8 gaps × 3px + 20px padding = 206px → tray 240. */
      '@media (min-width: 768px) and (max-width: 1023px){',
      '  .pv-mat{max-width:600px !important;}',
      '  .pv-tray--tens{width:clamp(240px,30vw,280px) !important;height:clamp(220px,24vw,260px) !important;gap:clamp(3px,0.5vw,4px) !important;}',
      '  .pv-tray--ones{height:clamp(220px,24vw,260px) !important;grid-template-columns:repeat(3,clamp(30px,3.4vw,40px)) !important;grid-auto-rows:clamp(30px,3.4vw,40px) !important;}',
      '  .pv-rod{width:clamp(18px,2.2vw,22px) !important;}',
      '  .pv-cube svg{width:clamp(30px,3.4vw,40px) !important;height:clamp(30px,3.4vw,40px) !important;}',
      '}',

      /* Desktop >= 1024.
         9 rods × 22px + 8 gaps × 4px + 20px padding = 250px → tray 280. */
      '@media (min-width: 1024px){',
      '  .pv-mat{max-width:620px !important;}',
      '  .pv-tray--tens{width:clamp(280px,16vw,320px) !important;height:clamp(240px,16vw,280px) !important;gap:clamp(3px,0.4vw,4px) !important;}',
      '  .pv-tray--ones{height:clamp(240px,16vw,280px) !important;grid-template-columns:repeat(3,clamp(34px,2.6vw,44px)) !important;grid-auto-rows:clamp(34px,2.6vw,44px) !important;}',
      '  .pv-rod{width:clamp(20px,1.4vw,22px) !important;}',
      '  .pv-cube svg{width:clamp(34px,2.6vw,44px) !important;height:clamp(34px,2.6vw,44px) !important;}',
      '}',

      /* === 3-PLACE MODE (.pv-mat--3p) — activity 2 / 2.NBT.A.1 ===
         Three columns must fit side-by-side at phone 375px without
         stacking (the spatial Hundreds-Tens-Ones cognition IS the
         place-value teaching point). Trays + manipulatives scale
         narrower than 2-place mode. Scoped via .pv-mat--3p so the
         2-place mat (no --3p class) preserves its byte-identical
         original sizing across all breakpoints. */
      '.pv-mat--3p{max-width:96vw !important;gap:clamp(6px,1.6vw,14px) !important;}',
      '.pv-mat--3p .pv-col{padding:clamp(6px,1.4vw,10px) clamp(3px,0.8vw,7px) !important;}',
      '.pv-mat--3p .pv-col-label{font-size:clamp(10px,2.2vw,14px) !important;}',
      '.pv-mat--3p .pv-add-btn{font-size:clamp(11px,2.2vw,14px) !important;padding:clamp(6px,1.4vmin,9px) clamp(8px,2vw,14px) !important;min-width:clamp(48px,12vw,100px) !important;}',
      /* Tens tray narrower in 3-place: width ~28vw instead of 46vw. */
      '.pv-mat--3p .pv-tray--tens{width:clamp(92px,24vw,140px) !important;height:clamp(150px,32vw,220px) !important;gap:clamp(1px,0.4vw,3px) !important;}',
      /* Ones tray smaller 3-wide cells in 3-place. */
      '.pv-mat--3p .pv-tray--ones{grid-template-columns:repeat(3,clamp(18px,4.6vw,30px)) !important;grid-auto-rows:clamp(18px,4.6vw,30px) !important;height:clamp(150px,32vw,220px) !important;}',
      /* Hundreds tray: 3-wide grid of flats. Slightly more opaque than
         ones-tray to distinguish; same fixed height for column parity. */
      '.pv-mat--3p .pv-tray--hundreds{display:grid !important;grid-template-columns:repeat(3,clamp(24px,6.4vw,42px)) !important;grid-auto-rows:clamp(24px,6.4vw,42px) !important;gap:clamp(3px,0.8vw,6px) !important;justify-content:center !important;align-content:end !important;width:auto !important;height:clamp(150px,32vw,220px) !important;overflow:hidden !important;padding:clamp(6px,1.4vw,12px) clamp(4px,1vw,10px) !important;background:rgba(255,255,255,0.5) !important;border-radius:14px !important;box-shadow:inset 0 1px 3px rgba(20,30,28,0.06) !important;}',
      /* Manipulative SVG sizing in 3-place mode. */
      '.pv-mat--3p .pv-rod{width:clamp(9px,2.4vw,15px) !important;}',
      '.pv-mat--3p .pv-cube svg{width:clamp(18px,4.6vw,30px) !important;height:clamp(18px,4.6vw,30px) !important;}',
      '.pv-mat--3p .pv-flat svg{width:clamp(24px,6.4vw,42px) !important;height:clamp(24px,6.4vw,42px) !important;display:block !important;filter:drop-shadow(0 2px 4px rgba(20,30,28,0.18)) !important;}'
    ].join('\n');
    var tag = document.createElement('style');
    tag.textContent = css;
    document.head.appendChild(tag);
  }
};
