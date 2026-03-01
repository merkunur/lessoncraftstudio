/**
 * Build image-vocabulary.js from raw database data
 * =================================================
 * v2: Dramatically improved pluralization heuristics for all 11 languages
 *
 * Improvements over v1:
 * - Compound word pluralization (Romance: head noun; Germanic: last word)
 * - Non-noun detection (colors, emotions, activities, sports → no plural)
 * - English: 100+ irregulars, uncountable nouns, -fish words
 * - German: Umlaut dictionary (80+ words), -mann compounds, proper -el/-er
 * - Swedish: 5 declension classes instead of single default
 * - Dutch: Vowel shortening, s→z/f→v voicing, diphthong handling
 * - Finnish: Better -nen, compound word handling
 * - Romance: Compound noun plurals with preposition detection
 *
 * Run locally: node scripts/build-image-vocabulary.js
 */

const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(
  path.join(__dirname, 'v2-data', 'image-vocabulary-raw.json'), 'utf8'
));

const LOCALES = ['en','de','fr','es','pt','it','nl','sv','da','no','fi'];

// ============================================================
// NON-PLURALIZABLE DETECTION
// ============================================================

// Keys that represent non-nouns — NEVER pluralized in ANY language
const NON_NOUN_KEYS = new Set([
  // Colors
  'beige','black','blue','brown','coral','crimson','gray','green',
  'pink','purple','red','scarlet','turquoise','white','yellow',
  // Emotions and states
  'angry','bored','capricious','confused','content','disgusted',
  'excited','happy','merry','sad','scared','shy','skeptical',
  'surprised','tired',
  // Weather adjectives
  'cloudy','cold','hot','partly-cloudy','rainy','stormy','sunny',
  // Activities and sports
  'badminton','baking','baseball','basketball','biking','bowling',
  'boxing','camping','chess','dancing','fencing','fishing','football',
  'golf','gymnastics','hiking','hockey','ice-skating','jumping',
  'knitting','photography','reading','running','scuba-diving','sewing',
  'singing','skating','skiing','sledding','snorkeling','snowboarding',
  'soccer','swimming','table-tennis','tennis','volleyball','writing',
  // Seasons and holidays
  'autumn','christmas','easter','halloween',
  // Other non-pluralizable
  'science','air-conditioning',
  // Planets and proper nouns (unique entities)
  'earth','jupiter','mars','mercury','neptune','saturn','uranus','venus','us',
]);

// Mass nouns: singular in English, but other languages may pluralize
const EN_MASS_NOUNS = new Set([
  'asparagus','bacon','bread','broccoli','butter','celery','cheese','chocolate',
  'corn','driftwood','food','garlic','gingerbread','grass','hair','hay','honey',
  'ice','lettuce','lightning','milk','oatmeal','oil','pasta','peanut-butter',
  'popcorn','porridge','rice','sand','seaweed','snow','spinach','toothpaste',
  'water','yogurt',
]);

// ============================================================
// ENGLISH PLURALIZATION
// ============================================================
const EN_IRREGULARS = {
  'child': 'Children', 'person': 'People', 'man': 'Men', 'woman': 'Women',
  'tooth': 'Teeth', 'foot': 'Feet', 'mouse': 'Mice', 'goose': 'Geese',
  'knife': 'Knives', 'wife': 'Wives', 'life': 'Lives', 'leaf': 'Leaves',
  'wolf': 'Wolves', 'half': 'Halves', 'loaf': 'Loaves', 'shelf': 'Shelves',
  'calf': 'Calves', 'elf': 'Elves', 'thief': 'Thieves',
  'ox': 'Oxen', 'die': 'Dice', 'louse': 'Lice',
  'cactus': 'Cacti', 'fungus': 'Fungi', 'octopus': 'Octopuses',
  'hippopotamus': 'Hippopotamuses', 'rhinoceros': 'Rhinoceroses',
  // Unchanged plurals
  'moose': 'Moose', 'sheep': 'Sheep', 'fish': 'Fish', 'deer': 'Deer',
  'bison': 'Bison', 'salmon': 'Salmon', 'trout': 'Trout',
  'shrimp': 'Shrimp', 'squid': 'Squid',
  // -fish compounds (unchanged)
  'angelfish': 'Angelfish', 'clownfish': 'Clownfish', 'starfish': 'Starfish',
  'swordfish': 'Swordfish', 'goldfish': 'Goldfish', 'pufferfish': 'Pufferfish',
  'jellyfish': 'Jellyfish',
  // Already plural / invariant
  'scissors': 'Scissors', 'glasses': 'Glasses', 'pants': 'Pants',
  'jeans': 'Jeans', 'shorts': 'Shorts', 'pliers': 'Pliers',
  'binoculars': 'Binoculars', 'tweezers': 'Tweezers',
  'sneakers': 'Sneakers', 'stairs': 'Stairs', 'tights': 'Tights',
  // Specific corrections
  'snowman': 'Snowmen', 'chef': 'Chefs', 'roof': 'Roofs',
  'belief': 'Beliefs', 'chief': 'Chiefs', 'cliff': 'Cliffs',
  'dwarf': 'Dwarves', 'hoof': 'Hooves',
  'reindeer': 'Reindeer', 'dice': 'Dice', 'triceratops': 'Triceratops',
  'scarf': 'Scarves', 'bookshelf': 'Bookshelves',
};

// -o words that take -oes (whitelist — all others take -s)
const EN_O_TO_OES = new Set([
  'potato','tomato','hero','echo','torpedo','veto',
  'domino','mosquito','mango','volcano','tornado','embargo','buffalo',
]);

function pluralizeEnSingle(word) {
  if (!word) return word;
  const lower = word.toLowerCase();

  if (EN_IRREGULARS[lower]) return EN_IRREGULARS[lower];

  // -man compound → -men (snowman→snowmen, but not ottoman, human, roman)
  if (lower.endsWith('man') && lower.length > 3 &&
      !lower.endsWith('oman') && !lower.endsWith('uman') && lower !== 'roman') {
    return word.slice(0, -3) + 'men';
  }

  // Already ends in -s (likely already plural or invariant)
  if (lower.endsWith('ss') || lower.endsWith('us')) return word + 'es';
  if (lower.endsWith('s') && !lower.endsWith('ss')) return word;

  // -y → -ies (but not after vowel)
  if (lower.endsWith('y') && !/[aeiou]y$/.test(lower)) {
    return word.slice(0, -1) + 'ies';
  }
  // -x, -ch, -sh, -z → -es
  if (lower.endsWith('x') || lower.endsWith('ch') || lower.endsWith('sh') || lower.endsWith('z')) {
    return word + 'es';
  }
  // -f → -ves: Only specific words (knife/wife/life/leaf/etc already in EN_IRREGULARS)
  // Remaining -f words that transform: scarf, half, etc. also in EN_IRREGULARS
  // Do NOT apply generic -fe→-ves (giraffe→Giraffes, carafe→Carafes, NOT -ves)
  // -o → -oes only for specific words (whitelist); all others take -s
  if (lower.endsWith('o') && EN_O_TO_OES.has(lower)) {
    return word + 'es';
  }
  return word + 's';
}

function pluralizeEn(word) {
  if (!word) return word;
  const parts = word.split(' ');
  if (parts.length > 1) {
    parts[parts.length - 1] = pluralizeEnSingle(parts[parts.length - 1]);
    return parts.join(' ');
  }
  return pluralizeEnSingle(word);
}

// ============================================================
// GERMAN PLURALIZATION + GENDER
// ============================================================

// Common German words that get umlaut in plural (dictionary approach)
const DE_UMLAUT_PLURALS = {
  // a → ä
  'Axt': 'Äxte', 'Arzt': 'Ärzte', 'Ast': 'Äste',
  'Ball': 'Bälle', 'Band': 'Bänder', 'Baum': 'Bäume',
  'Faden': 'Fäden', 'Fall': 'Fälle', 'Garten': 'Gärten',
  'Gast': 'Gäste', 'Graben': 'Gräben', 'Hahn': 'Hähne',
  'Hals': 'Hälse', 'Kamm': 'Kämme', 'Kanal': 'Kanäle',
  'Kalb': 'Kälber', 'Kraft': 'Kräfte', 'Laden': 'Läden',
  'Land': 'Länder', 'Macht': 'Mächte', 'Mangel': 'Mängel',
  'Mantel': 'Mäntel', 'Nacht': 'Nächte', 'Nagel': 'Nägel',
  'Palast': 'Paläste', 'Platz': 'Plätze', 'Rand': 'Ränder',
  'Raum': 'Räume', 'Sattel': 'Sättel', 'Satz': 'Sätze',
  'Schatz': 'Schätze', 'Traum': 'Träume', 'Wald': 'Wälder',
  'Wall': 'Wälle', 'Wand': 'Wände', 'Zaun': 'Zäune',
  'Rad': 'Räder', 'Bad': 'Bäder', 'Glas': 'Gläser',
  'Haus': 'Häuser',
  // o → ö
  'Block': 'Blöcke', 'Bock': 'Böcke', 'Boden': 'Böden',
  'Dorf': 'Dörfer', 'Koch': 'Köche', 'Kopf': 'Köpfe',
  'Korb': 'Körbe', 'Korn': 'Körner', 'Loch': 'Löcher',
  'Ofen': 'Öfen', 'Rock': 'Röcke', 'Sohn': 'Söhne',
  'Stock': 'Stöcke', 'Ton': 'Töne', 'Topf': 'Töpfe',
  'Volk': 'Völker', 'Wort': 'Wörter',
  // u → ü
  'Bruder': 'Brüder', 'Bruch': 'Brüche', 'Buch': 'Bücher',
  'Bug': 'Büge', 'Busch': 'Büsche', 'Flug': 'Flüge',
  'Fluss': 'Flüsse', 'Frucht': 'Früchte', 'Fuchs': 'Füchse',
  'Fuß': 'Füße', 'Gruft': 'Grüfte', 'Huhn': 'Hühner',
  'Hut': 'Hüte', 'Kuh': 'Kühe', 'Kunst': 'Künste',
  'Kuss': 'Küsse', 'Mund': 'Münder', 'Mutter': 'Mütter',
  'Nuss': 'Nüsse', 'Spruch': 'Sprüche', 'Strumpf': 'Strümpfe',
  'Stuhl': 'Stühle', 'Tochter': 'Töchter', 'Tuch': 'Tücher',
  'Turm': 'Türme', 'Wurm': 'Würmer', 'Wurst': 'Würste',
  'Zug': 'Züge',
  // au → äu
  'Brauch': 'Bräuche', 'Faust': 'Fäuste', 'Laus': 'Läuse',
  'Maus': 'Mäuse', 'Schlauch': 'Schläuche', 'Strauch': 'Sträucher',
  // Special compound umlauts
  'Kürbis': 'Kürbisse',
};

// Compound ending → gender (checked before suffix rules)
const DE_COMPOUND_GENDERS = {
  'baum': 'm', 'haus': 'n', 'stuhl': 'm', 'schrank': 'm', 'zug': 'm',
  'ball': 'm', 'hut': 'm', 'turm': 'm', 'topf': 'm', 'korb': 'm',
  'uhr': 'f', 'band': 'n', 'blech': 'n', 'tuch': 'n', 'buch': 'n',
  'bett': 'n', 'eck': 'n', 'boot': 'n', 'rad': 'n', 'brett': 'n',
  'feld': 'n', 'glas': 'n', 'hemd': 'n', 'tier': 'n', 'pferd': 'n',
  'schiff': 'n', 'zeug': 'n', 'spiel': 'n', 'kleid': 'n',
  'auto': 'n', 'feuer': 'n', 'wagen': 'm', 'messer': 'n',
  'kugel': 'f', 'tasche': 'f', 'kette': 'f', 'tasse': 'f',
  'matte': 'f', 'kanne': 'f', 'flasche': 'f', 'brille': 'f',
  'weste': 'f', 'hose': 'f', 'jacke': 'f', 'mütze': 'f',
  'lampe': 'f', 'maschine': 'f',
};

function genderDe(word) {
  if (!word) return 'm';
  const lower = word.toLowerCase();

  // Check compound endings first (e.g., Apfelbaum → m, Badewanne → f)
  for (const [ending, gender] of Object.entries(DE_COMPOUND_GENDERS)) {
    if (lower.endsWith(ending) && lower.length > ending.length) {
      return gender;
    }
  }

  // Feminine suffixes
  if (lower.endsWith('ung') || lower.endsWith('heit') || lower.endsWith('keit') ||
      lower.endsWith('schaft') || lower.endsWith('tion') || lower.endsWith('sion') ||
      lower.endsWith('tät') || lower.endsWith('enz') || lower.endsWith('anz') ||
      lower.endsWith('ik') || lower.endsWith('ur') ||
      lower.endsWith('ade') || lower.endsWith('age') || lower.endsWith('ine') ||
      lower.endsWith('isse') || lower.endsWith('itis')) {
    return 'f';
  }
  // Neuter suffixes
  if (lower.endsWith('chen') || lower.endsWith('lein') || lower.endsWith('ment') ||
      lower.endsWith('nis') || lower.endsWith('tum') || lower.endsWith('ium') ||
      lower.endsWith('ett') || lower.endsWith('ma')) {
    return 'n';
  }
  // -ie = feminine (Melodie, Energie), but NOT -ier (masculine agent)
  if (lower.endsWith('ie') && !lower.endsWith('ier')) return 'f';
  // -ei = feminine
  if (lower.endsWith('ei')) return 'f';
  // Masculine suffixes
  if (lower.endsWith('ling') || lower.endsWith('ismus') ||
      lower.endsWith('ist') || lower.endsWith('ant') ||
      lower.endsWith('ent') || lower.endsWith('ig') || lower.endsWith('ich')) {
    return 'm';
  }
  // -er agent nouns = masculine
  if (lower.endsWith('er') && lower.length > 4) return 'm';
  // -or = masculine
  if (lower.endsWith('or')) return 'm';
  // -e ending often feminine (but many exceptions)
  if (lower.endsWith('e') && !lower.endsWith('ee') && !lower.endsWith('sse') &&
      !lower.endsWith('tte') && lower.length > 4) {
    return 'f';
  }
  // -um = neuter
  if (lower.endsWith('um')) return 'n';
  return 'm';
}

// Compound endings that get umlaut plurals (checked before general rules)
const DE_COMPOUND_UMLAUTS = {
  'baum': 'bäume',   // der Baum → Bäume (masculine)
  'haus': 'häuser',  // das Haus → Häuser (neuter)
  'stuhl': 'stühle', // der Stuhl → Stühle (masculine)
  'schrank': 'schränke', // der Schrank → Schränke (masculine)
  'zug': 'züge',     // der Zug → Züge (masculine)
  'ball': 'bälle',   // der Ball → Bälle (masculine)
  'hut': 'hüte',     // der Hut → Hüte (masculine)
  'turm': 'türme',   // der Turm → Türme (masculine)
  'topf': 'töpfe',   // der Topf → Töpfe (masculine)
  'korb': 'körbe',   // der Korb → Körbe (masculine)
  'stock': 'stöcke', // der Stock → Stöcke (masculine)
  'kopf': 'köpfe',   // der Kopf → Köpfe (masculine)
  'platz': 'plätze', // der Platz → Plätze (masculine)
  'arzt': 'ärzte',   // der Arzt → Ärzte (masculine)
  'hals': 'hälse',   // der Hals → Hälse (masculine)
  // Non-umlaut compound endings (same mechanism, just suffix replacement)
  'band': 'bänder',  // das Band → Bänder (neuter)
  'tuch': 'tücher',  // das Tuch → Tücher (neuter)
  'uhr': 'uhren',    // die Uhr → Uhren (feminine)
  'schloss': 'schlösser', // das Schloss → Schlösser (neuter)
  'sack': 'säcke',   // der Sack → Säcke (masculine)
};

// Weak masculine nouns that take -en (not -e)
const DE_WEAK_ENDINGS = new Set([
  'ant','at','ent','ist','oge','oph','graph','graf','nom','soph',
]);

function pluralizeDeSingle(word) {
  if (!word) return word;

  // Check umlaut dictionary first (exact matches)
  if (DE_UMLAUT_PLURALS[word]) return DE_UMLAUT_PLURALS[word];

  // -mann compounds → -männer
  if (word.endsWith('mann')) return word.slice(0, -4) + 'männer';

  const lower = word.toLowerCase();

  // Check compound umlaut endings (e.g., Apfelbaum → Apfelbäume)
  for (const [ending, plural] of Object.entries(DE_COMPOUND_UMLAUTS)) {
    if (lower.endsWith(ending) && lower.length > ending.length) {
      return word.slice(0, -ending.length) + plural;
    }
  }

  // Diminutives: unchanged
  if (lower.endsWith('chen') || lower.endsWith('lein')) return word;
  // -e ending: add -n
  if (lower.endsWith('e') && !lower.endsWith('ee')) return word + 'n';
  // -el: usually unchanged (der Deckel, der Engel, der Würfel)
  // Feminine -el words that take -n (Bibel, Insel, etc.) handled by corrections
  if (lower.endsWith('el')) return word;
  // -er: usually unchanged
  if (lower.endsWith('er')) return word;
  // -en: usually unchanged
  if (lower.endsWith('en')) return word;
  // -ung, -heit, -keit, -schaft: add -en
  if (lower.endsWith('ung') || lower.endsWith('heit') || lower.endsWith('keit') ||
      lower.endsWith('schaft')) return word + 'en';
  // -tion, -sion: add -en
  if (lower.endsWith('tion') || lower.endsWith('sion')) return word + 'en';
  // -nis: add -se
  if (lower.endsWith('nis')) return word + 'se';
  // -ment: add -e
  if (lower.endsWith('ment')) return word + 'e';
  // Weak masculine nouns: -ent, -ant, -at, -ist, -oge, etc. → add -en
  for (const ending of DE_WEAK_ENDINGS) {
    if (lower.endsWith(ending) && lower.length > ending.length + 1) {
      return word + 'en';
    }
  }
  // -us → -en (Kaktus→Kakteen, Globus→Globen) but NOT -bus (Bus→Busse)
  if (lower.endsWith('us') && !lower.endsWith('bus')) {
    return word.slice(0, -2) + 'en';
  }
  // -bus → -busse
  if (lower.endsWith('bus')) return word + 'se';
  // -um → -en (Museum→Museen) but NOT -baum (handled above), -raum
  if (lower.endsWith('um') && !lower.endsWith('aum')) {
    return word.slice(0, -2) + 'en';
  }
  // Foreign words ending in -a, -o, -i: add -s
  if (lower.endsWith('a') || lower.endsWith('o') || lower.endsWith('i')) return word + 's';
  // -ling: add -e
  if (lower.endsWith('ling')) return word + 'e';
  // Default consonant ending: add -e
  if (/[bcdfghjklmnpqrstvwxyz]$/i.test(lower)) return word + 'e';
  return word + 'n';
}

function pluralizeDe(word) {
  if (!word) return word;
  const parts = word.split(' ');
  if (parts.length > 1) {
    parts[parts.length - 1] = pluralizeDeSingle(parts[parts.length - 1]);
    return parts.join(' ');
  }
  return pluralizeDeSingle(word);
}

// ============================================================
// FRENCH PLURALIZATION + GENDER
// ============================================================
const FR_PREPOSITIONS = new Set(['de','du','des','à','a','au','aux','en']);
// Words that never change form in plural but DON'T block pluralization of later words
const FR_INVARIABLE = new Set(['et','le','la','les','un','une','sous']);

function genderFr(word) {
  if (!word) return 'm';
  const lower = word.toLowerCase();
  if (lower.endsWith('tion') || lower.endsWith('sion') || lower.endsWith('ure') ||
      lower.endsWith('ade') || lower.endsWith('ance') || lower.endsWith('ence') ||
      lower.endsWith('ette') || lower.endsWith('elle') || lower.endsWith('esse') ||
      lower.endsWith('ine') || lower.endsWith('ise') || lower.endsWith('ose') ||
      lower.endsWith('ouse') || lower.endsWith('euse') || lower.endsWith('trice') ||
      lower.endsWith('rice') || lower.endsWith('ée') || lower.endsWith('té') ||
      lower.endsWith('ière') || lower.endsWith('ie')) {
    return 'f';
  }
  if (lower.endsWith('ment') || lower.endsWith('age') || lower.endsWith('isme') ||
      lower.endsWith('eur') || lower.endsWith('ier') || lower.endsWith('et') ||
      lower.endsWith('eau') || lower.endsWith('al') || lower.endsWith('ard') ||
      lower.endsWith('oir') || lower.endsWith('in') || lower.endsWith('ail') ||
      lower.endsWith('eil') || lower.endsWith('on') || lower.endsWith('ien')) {
    return 'm';
  }
  if (lower.endsWith('e') && !lower.endsWith('me') && !lower.endsWith('re') &&
      !lower.endsWith('le') && !lower.endsWith('ge') && !lower.endsWith('be') &&
      !lower.endsWith('pe') && !lower.endsWith('de') && !lower.endsWith('ne') &&
      !lower.endsWith('que') && !lower.endsWith('ste') && !lower.endsWith('vre') &&
      !lower.endsWith('tre') && !lower.endsWith('bre')) {
    return 'f';
  }
  return 'm';
}

// French -al words that DON'T become -aux (they take -s instead)
const FR_AL_EXCEPTIONS = new Set([
  'bal','carnaval','festival','récital','régal','chacal',
  'naval','banal','fatal','aval',
]);

function pluralizeFrSingle(word) {
  if (!word) return word;
  const lower = word.toLowerCase();
  if (lower.endsWith('s') || lower.endsWith('x') || lower.endsWith('z')) return word;
  if (lower.endsWith('eau') || lower.endsWith('au') || lower.endsWith('eu')) return word + 'x';
  if (lower.endsWith('al') && !FR_AL_EXCEPTIONS.has(lower)) {
    return word.slice(0, -2) + 'aux';
  }
  return word + 's';
}

function pluralizeFr(word) {
  if (!word) return word;
  const parts = word.split(' ');
  if (parts.length === 1) return pluralizeFrSingle(word);

  // Find preposition or d' contraction (these BLOCK pluralization of later words)
  let prepIdx = -1;
  for (let i = 1; i < parts.length; i++) {
    const lp = parts[i].toLowerCase();
    if (FR_PREPOSITIONS.has(lp) || lp.startsWith("d'") || lp.startsWith("l'")) {
      prepIdx = i;
      break;
    }
  }
  if (prepIdx > 0) {
    // Pluralize before preposition only, skip invariable words
    for (let i = 0; i < prepIdx; i++) {
      if (!FR_INVARIABLE.has(parts[i].toLowerCase())) {
        parts[i] = pluralizeFrSingle(parts[i]);
      }
    }
  } else {
    // No preposition: pluralize all nouns/adjectives, skip invariable words
    for (let i = 0; i < parts.length; i++) {
      if (!FR_INVARIABLE.has(parts[i].toLowerCase())) {
        parts[i] = pluralizeFrSingle(parts[i]);
      }
    }
  }
  return parts.join(' ');
}

// ============================================================
// SPANISH PLURALIZATION + GENDER
// ============================================================
const ES_PREPOSITIONS = new Set(['de','del','con','en','para','por','sin','sobre','a','al']);

function genderEs(word) {
  if (!word) return 'm';
  const lower = word.toLowerCase();
  if (lower.endsWith('ción') || lower.endsWith('sión') || lower.endsWith('dad') ||
      lower.endsWith('tad') || lower.endsWith('tud') || lower.endsWith('umbre') ||
      lower.endsWith('eza') || lower.endsWith('anza') || lower.endsWith('ncia')) {
    return 'f';
  }
  if (lower.endsWith('a')) {
    if (lower.endsWith('ma') && (lower.endsWith('tema') || lower.endsWith('grama') ||
        lower.endsWith('ema') || lower.endsWith('oma') || lower.endsWith('ima') ||
        lower.endsWith('isma') || lower.endsWith('asma'))) {
      return 'm';
    }
    return 'f';
  }
  if (lower.endsWith('o') || lower.endsWith('or') || lower.endsWith('aje') ||
      lower.endsWith('ón') || lower.endsWith('án') || lower.endsWith('és')) {
    return 'm';
  }
  return 'm';
}

function pluralizeEsSingle(word) {
  if (!word) return word;
  const lower = word.toLowerCase();
  // Accented -s endings (stressed final syllable): add -es
  if (lower.endsWith('ás')) return word + 'es';
  if (lower.endsWith('és')) return word.slice(0, -2) + 'eses';
  if (lower.endsWith('ís')) return word + 'es';
  if (lower.endsWith('ós')) return word + 'es';
  if (lower.endsWith('ús')) return word.slice(0, -2) + 'uses';
  // Unaccented -s or -x: invariant (lunes, crisis)
  if (lower.endsWith('s') || lower.endsWith('x')) return word;
  if (lower.endsWith('z')) return word.slice(0, -1) + 'ces';
  if (lower.endsWith('ón')) return word.slice(0, -2) + 'ones';
  if (lower.endsWith('án')) return word.slice(0, -2) + 'anes';
  if (lower.endsWith('ín')) return word.slice(0, -2) + 'ines';
  if (/[aeiouáéíóú]$/i.test(lower)) return word + 's';
  return word + 'es';
}

function pluralizeEs(word) {
  if (!word) return word;
  const parts = word.split(' ');
  if (parts.length === 1) return pluralizeEsSingle(word);

  let prepIdx = -1;
  for (let i = 1; i < parts.length; i++) {
    if (ES_PREPOSITIONS.has(parts[i].toLowerCase())) { prepIdx = i; break; }
  }
  if (prepIdx > 0) {
    for (let i = 0; i < prepIdx; i++) parts[i] = pluralizeEsSingle(parts[i]);
  } else {
    for (let i = 0; i < parts.length; i++) parts[i] = pluralizeEsSingle(parts[i]);
  }
  return parts.join(' ');
}

// ============================================================
// PORTUGUESE PLURALIZATION + GENDER
// ============================================================
const PT_PREPOSITIONS = new Set(['de','do','da','dos','das','com','em','para','por','sem','sobre']);

function genderPt(word) {
  if (!word) return 'm';
  const lower = word.toLowerCase();
  if (lower.endsWith('ção') || lower.endsWith('são') || lower.endsWith('dade') ||
      lower.endsWith('gem') || lower.endsWith('eza') || lower.endsWith('ade') ||
      lower.endsWith('ice') || lower.endsWith('ncia') || lower.endsWith('nça')) {
    return 'f';
  }
  if (lower.endsWith('a')) {
    if (lower.endsWith('ma') && (lower.endsWith('tema') || lower.endsWith('grama') ||
        lower.endsWith('ema') || lower.endsWith('oma'))) {
      return 'm';
    }
    return 'f';
  }
  if (lower.endsWith('o') || lower.endsWith('or') || lower.endsWith('ão') ||
      lower.endsWith('eiro') || lower.endsWith('mente')) {
    return 'm';
  }
  return 'm';
}

function pluralizePtSingle(word) {
  if (!word) return word;
  const lower = word.toLowerCase();
  if (lower.endsWith('ão')) return word.slice(0, -2) + 'ões';
  if (lower.endsWith('l')) {
    if (lower.endsWith('il')) return word.slice(0, -2) + 'is';
    if (lower.endsWith('el')) return word.slice(0, -2) + 'éis';
    if (lower.endsWith('ol')) return word.slice(0, -2) + 'óis';
    if (lower.endsWith('al')) return word.slice(0, -2) + 'ais';
    if (lower.endsWith('ul')) return word.slice(0, -2) + 'uis';
    return word.slice(0, -1) + 'is';
  }
  if (lower.endsWith('m')) return word.slice(0, -1) + 'ns';
  if (lower.endsWith('r') || lower.endsWith('z')) return word + 'es';
  if (lower.endsWith('s')) {
    if (lower.endsWith('ês') || lower.endsWith('ás') || lower.endsWith('ís') ||
        lower.endsWith('ós') || lower.endsWith('ús')) {
      return word + 'es';
    }
    return word; // Paroxytone -s words are invariant
  }
  if (/[aeiouáéíóú]$/i.test(lower)) return word + 's';
  return word + 's';
}

function pluralizePt(word) {
  if (!word) return word;
  const parts = word.split(' ');
  if (parts.length === 1) return pluralizePtSingle(word);

  let prepIdx = -1;
  for (let i = 1; i < parts.length; i++) {
    if (PT_PREPOSITIONS.has(parts[i].toLowerCase())) { prepIdx = i; break; }
  }
  if (prepIdx > 0) {
    for (let i = 0; i < prepIdx; i++) parts[i] = pluralizePtSingle(parts[i]);
  } else {
    for (let i = 0; i < parts.length; i++) parts[i] = pluralizePtSingle(parts[i]);
  }
  return parts.join(' ');
}

// ============================================================
// ITALIAN PLURALIZATION + GENDER
// ============================================================
const IT_PREPOSITIONS = new Set([
  'di','del','della','dello','dei','delle','degli',
  'da','dal','dalla','dallo','con','in','nel','nella',
  'nello','per','al','alla','allo',
]);

function genderIt(word) {
  if (!word) return 'm';
  const lower = word.toLowerCase();
  if (lower.endsWith('zione') || lower.endsWith('sione') || lower.endsWith('ezza') ||
      lower.endsWith('anza') || lower.endsWith('enza') || lower.endsWith('ina') ||
      lower.endsWith('etta') || lower.endsWith('essa') || lower.endsWith('trice') ||
      lower.endsWith('tà') || lower.endsWith('tù') || lower.endsWith('ura')) {
    return 'f';
  }
  if (lower.endsWith('a') && !lower.endsWith('ista') && !lower.endsWith('ema') &&
      !lower.endsWith('oma') && !lower.endsWith('ama')) {
    return 'f';
  }
  if (lower.endsWith('o') || lower.endsWith('ore') || lower.endsWith('one') ||
      lower.endsWith('iere') || lower.endsWith('ente') || lower.endsWith('ismo') ||
      lower.endsWith('amento') || lower.endsWith('mento')) {
    return 'm';
  }
  return 'm';
}

function pluralizeItSingle(word) {
  if (!word) return word;
  const lower = word.toLowerCase();
  // Foreign words ending in consonant: invariable
  if (/[bcdfghjklmnpqrstvwxyz]$/.test(lower)) return word;
  // Accented final vowel: invariable
  if (/[àèéìòù]$/.test(lower)) return word;
  // -ca → -che, -ga → -ghe
  if (lower.endsWith('ca')) return word.slice(0, -2) + 'che';
  if (lower.endsWith('ga')) return word.slice(0, -2) + 'ghe';
  // -cia, -gia → -ce, -ge (unstressed i drops)
  if (lower.endsWith('cia') || lower.endsWith('gia')) return word.slice(0, -2) + 'e';
  // -a → -e (feminine)
  if (lower.endsWith('a')) return word.slice(0, -1) + 'e';
  // -co → -chi, -go → -ghi (hard c/g preserved)
  if (lower.endsWith('co')) return word.slice(0, -2) + 'chi';
  if (lower.endsWith('go')) return word.slice(0, -2) + 'ghi';
  // -io → -i
  if (lower.endsWith('io')) return word.slice(0, -2) + 'i';
  // -o → -i
  if (lower.endsWith('o')) return word.slice(0, -1) + 'i';
  // -e → -i
  if (lower.endsWith('e')) return word.slice(0, -1) + 'i';
  return word;
}

function pluralizeIt(word) {
  if (!word) return word;
  const parts = word.split(' ');
  if (parts.length === 1) return pluralizeItSingle(word);

  let prepIdx = -1;
  for (let i = 1; i < parts.length; i++) {
    if (IT_PREPOSITIONS.has(parts[i].toLowerCase())) { prepIdx = i; break; }
  }
  if (prepIdx > 0) {
    for (let i = 0; i < prepIdx; i++) parts[i] = pluralizeItSingle(parts[i]);
  } else {
    for (let i = 0; i < parts.length; i++) parts[i] = pluralizeItSingle(parts[i]);
  }
  return parts.join(' ');
}

// ============================================================
// DUTCH PLURALIZATION + GENDER
// ============================================================
function genderNl(word) {
  if (!word) return 'd';
  const lower = word.toLowerCase();
  // Het-words: diminutives, -isme, -ment, -um, -sel, ge- prefix nouns
  if (lower.endsWith('je') || lower.endsWith('tje') || lower.endsWith('pje') ||
      lower.endsWith('isme') || lower.endsWith('ment') || lower.endsWith('um') ||
      lower.endsWith('sel') || lower.endsWith('schap')) {
    return 'h';
  }
  if (lower.startsWith('ge') && lower.length > 4 &&
      !lower.startsWith('geel') && !lower.startsWith('geen') && !lower.startsWith('geer')) {
    return 'h';
  }
  return 'd';
}

function pluralizeNlSingle(word) {
  if (!word) return word;
  const lower = word.toLowerCase();

  // Diminutives (-je): add -s
  if (lower.endsWith('je')) return word + 's';
  // Unstressed endings: add -s
  if (lower.endsWith('el') || lower.endsWith('em') || lower.endsWith('en') ||
      lower.endsWith('er') || lower.endsWith('erd') || lower.endsWith('aar') ||
      lower.endsWith('aard') || lower.endsWith('ie') || lower.endsWith('ier')) {
    return word + 's';
  }
  // -a, -i, -o, -u, -y: add -'s
  if (/[aiouy]$/.test(lower)) return word + "'s";
  // -e: add -n
  if (lower.endsWith('e')) return word + 'n';

  // Double vowel + f → single vowel + v + en (voicing + shortening)
  const dblVF = lower.match(/^(.*)([aeiou])\2f$/);
  if (dblVF) {
    return word.slice(0, dblVF[1].length) + word[dblVF[1].length] + 'ven';
  }
  // Double vowel + s → single vowel + z + en (voicing + shortening)
  const dblVS = lower.match(/^(.*)([aeiou])\2s$/);
  if (dblVS) {
    return word.slice(0, dblVS[1].length) + word[dblVS[1].length] + 'zen';
  }
  // Double vowel + consonant → single vowel + consonant + en (shortening)
  const dblV = lower.match(/^(.*)([aeiou])\2([bcdfghjklmnpqrtvwxz])$/);
  if (dblV) {
    return word.slice(0, dblV[1].length) + word[dblV[1].length] + word[word.length - 1] + 'en';
  }

  // Diphthong + s → diphthong + zen (huis→huizen)
  if (/(?:ui|ei|ij|ou|au)s$/.test(lower)) {
    return word.slice(0, -1) + 'zen';
  }
  // Diphthong + f → diphthong + ven (brief→brieven)
  if (/(?:ie|oe|eu|ui|ei|ij|ou|au)f$/.test(lower)) {
    return word.slice(0, -1) + 'ven';
  }

  // Default: add -en
  return word + 'en';
}

function pluralizeNl(word) {
  if (!word) return word;
  const parts = word.split(' ');
  if (parts.length > 1) {
    parts[parts.length - 1] = pluralizeNlSingle(parts[parts.length - 1]);
    return parts.join(' ');
  }
  return pluralizeNlSingle(word);
}

// ============================================================
// SWEDISH PLURALIZATION + GENDER
// ============================================================
// n=en-word (common), t=ett-word (neuter)

// Known ett-words from our dataset
const SV_ETT_WORDS = new Set([
  'barn','djur','träd','äpple','öga','öra','hjärta','hus','slott','skepp',
  'berg','land','ljus','blad','tak','golv','rum','bord','kort',
  'plan','spel','tåg','moln','regn','snö','glas','lock','ben',
  'finger','ansikte','hår','knä','bröst','flygplan','paraply','rep','nät',
  'ägg','brev','paket','kuvert','ark','papper','liv','tält','kök',
  'hjul','ankare','pussel','instrument','redskap','verktyg','smycke',
  'segel','fordon','gevär','badkar','lejon','piano','foto','zoo',
]);

function genderSv(word) {
  if (!word) return 'n';
  const lower = word.toLowerCase();
  if (SV_ETT_WORDS.has(lower)) return 't';
  if (lower.endsWith('skap') || lower.endsWith('eri') || lower.endsWith('ande') ||
      lower.endsWith('ende') || lower.endsWith('um') || lower.endsWith('ment')) {
    return 't';
  }
  return 'n';
}

function pluralizeSvSingle(word) {
  if (!word) return word;
  const lower = word.toLowerCase();

  // Ett-words are often unchanged in indefinite plural
  if (SV_ETT_WORDS.has(lower)) return word;

  // Class 1: -a → -or (flicka→flickor, lampa→lampor)
  if (lower.endsWith('a') && !lower.endsWith('ia')) return word.slice(0, -1) + 'or';
  // Class 4: -e → -ar (pojke→pojkar)
  if (lower.endsWith('e')) return word.slice(0, -1) + 'ar';
  // Unchanged: -are, -ande, -ende (agent/participial nouns)
  if (lower.endsWith('are') || lower.endsWith('ande') || lower.endsWith('ende')) return word;
  // Unchanged: -el, -er, -en
  if (lower.endsWith('el') || lower.endsWith('er') || lower.endsWith('en')) return word;

  // Class 3: -tion/-ion → -er
  if (lower.endsWith('tion') || lower.endsWith('ion')) return word + 'er';
  // Class 3: -het → -heter
  if (lower.endsWith('het')) return word + 'er';
  // Class 2: -ning → -ningar
  if (lower.endsWith('ning')) return word + 'ar';
  // Class 2: -ling → -lingar
  if (lower.endsWith('ling')) return word + 'ar';
  // Class 3: -nad → -nader
  if (lower.endsWith('nad')) return word + 'er';
  // Class 3: -or (agent: doktor→doktorer)
  if (lower.endsWith('or') && lower.length > 3) return word + 'er';
  // Class 3: -ör → -örer
  if (lower.endsWith('ör')) return word + 'er';
  // Class 3: -ant/-ent → -er
  if (lower.endsWith('ant') || lower.endsWith('ent')) return word + 'er';
  // Class 3: -ek/-ik → -er
  if (lower.endsWith('ek') || lower.endsWith('ik')) return word + 'er';
  // Class 3: -i → -ier
  if (lower.endsWith('i')) return word + 'er';

  // Default: -ar (Class 2, most common for consonant-ending en-words)
  return word + 'ar';
}

function pluralizeSv(word) {
  if (!word) return word;
  const parts = word.split(' ');
  if (parts.length > 1) {
    parts[parts.length - 1] = pluralizeSvSingle(parts[parts.length - 1]);
    return parts.join(' ');
  }
  return pluralizeSvSingle(word);
}

// ============================================================
// DANISH PLURALIZATION + GENDER
// ============================================================
function genderDa(word) {
  if (!word) return 'n';
  const lower = word.toLowerCase();
  if (lower.endsWith('skab') || lower.endsWith('eri') || lower.endsWith('ment') ||
      lower.endsWith('um') || lower.endsWith('ium')) {
    return 't';
  }
  return 'n';
}

function pluralizeDaSingle(word) {
  if (!word) return word;
  const lower = word.toLowerCase();
  if (lower.endsWith('e')) return word + 'r';
  if (lower.endsWith('el') || lower.endsWith('er') || lower.endsWith('en')) return word;
  if (lower.endsWith('tion')) return word + 'er';
  if (lower.endsWith('hed')) return word + 'er';
  if (lower.endsWith('ning')) return word + 'er';
  return word + 'er';
}

function pluralizeDa(word) {
  if (!word) return word;
  const parts = word.split(' ');
  if (parts.length > 1) {
    parts[parts.length - 1] = pluralizeDaSingle(parts[parts.length - 1]);
    return parts.join(' ');
  }
  return pluralizeDaSingle(word);
}

// ============================================================
// NORWEGIAN PLURALIZATION + GENDER
// ============================================================
function genderNo(word) {
  if (!word) return 'm';
  const lower = word.toLowerCase();
  if (lower.endsWith('ing') || lower.endsWith('ung') || lower.endsWith('het') ||
      lower.endsWith('else') || lower.endsWith('inne')) {
    return 'f';
  }
  if (lower.endsWith('skap') || lower.endsWith('eri') || lower.endsWith('ment') ||
      lower.endsWith('um') || lower.endsWith('ium')) {
    return 'n';
  }
  return 'm';
}

function pluralizeNoSingle(word) {
  if (!word) return word;
  const lower = word.toLowerCase();
  if (lower.endsWith('e')) return word + 'r';
  if (lower.endsWith('el') || lower.endsWith('er') || lower.endsWith('en')) return word;
  if (lower.endsWith('tion') || lower.endsWith('sjon')) return word + 'er';
  if (lower.endsWith('het')) return word + 'er';
  if (lower.endsWith('ning')) return word + 'er';
  return word + 'er';
}

function pluralizeNo(word) {
  if (!word) return word;
  const parts = word.split(' ');
  if (parts.length > 1) {
    parts[parts.length - 1] = pluralizeNoSingle(parts[parts.length - 1]);
    return parts.join(' ');
  }
  return pluralizeNoSingle(word);
}

// ============================================================
// FINNISH PLURALIZATION (no gender)
// ============================================================
function pluralizeFiSingle(word) {
  if (!word) return word;
  const lower = word.toLowerCase();
  // -nen → -set (nainen→naiset, keittiöiden but -nen words mostly use -set)
  if (lower.endsWith('nen')) return word.slice(0, -3) + 'set';
  // Vowel ending: add -t
  if (/[aeiouäöy]$/i.test(lower)) return word + 't';
  // -in → -imet
  if (lower.endsWith('in')) return word.slice(0, -2) + 'imet';
  // -as/-äs → -aat/-äät (simplified)
  if (lower.endsWith('as')) return word.slice(0, -1) + 'at';
  if (lower.endsWith('äs')) return word.slice(0, -1) + 'ät';
  // -is → -it
  if (lower.endsWith('is')) return word.slice(0, -1) + 'it';
  // -us → -ukset
  if (lower.endsWith('us')) return word.slice(0, -1) + 'kset';
  // -ys → -ykset
  if (lower.endsWith('ys')) return word.slice(0, -1) + 'kset';
  // -os/-ös → -okset/-ökset
  if (lower.endsWith('os') || lower.endsWith('ös')) return word.slice(0, -1) + 'kset';
  // -n → add -it
  if (lower.endsWith('n')) return word + 'it';
  // Default consonant ending
  return word + 'it';
}

function pluralizeFi(word) {
  if (!word) return word;
  return pluralizeFiSingle(word);
}

// ============================================================
// UNIFIED GENDER FUNCTION (handles multi-word)
// ============================================================
function getGender(word, locale) {
  if (!word) return locale === 'nl' ? 'd' : (locale === 'sv' ? 'n' : (locale === 'da' ? 'n' : 'm'));
  const parts = word.split(' ');
  let headNoun;

  // Romance languages: head noun is first word
  if (['fr','es','pt','it'].includes(locale)) {
    headNoun = parts[0];
  } else {
    // Germanic: head noun is last word
    headNoun = parts[parts.length - 1];
  }

  switch (locale) {
    case 'de': return genderDe(headNoun);
    case 'fr': return genderFr(headNoun);
    case 'es': return genderEs(headNoun);
    case 'pt': return genderPt(headNoun);
    case 'it': return genderIt(headNoun);
    case 'nl': return genderNl(headNoun);
    case 'sv': return genderSv(headNoun);
    case 'da': return genderDa(headNoun);
    case 'no': return genderNo(headNoun);
    default: return 'm';
  }
}

// ============================================================
// PLURALIZATION DISPATCHER
// ============================================================
function pluralize(word, locale) {
  switch (locale) {
    case 'en': return pluralizeEn(word);
    case 'de': return pluralizeDe(word);
    case 'fr': return pluralizeFr(word);
    case 'es': return pluralizeEs(word);
    case 'pt': return pluralizePt(word);
    case 'it': return pluralizeIt(word);
    case 'nl': return pluralizeNl(word);
    case 'sv': return pluralizeSv(word);
    case 'da': return pluralizeDa(word);
    case 'no': return pluralizeNo(word);
    case 'fi': return pluralizeFi(word);
    default: return word + 's';
  }
}

// ============================================================
// MASTER BUILD
// ============================================================
const entries = {};
const keys = Object.keys(raw).sort();

for (const key of keys) {
  const data = raw[key];
  const entry = {};
  const isNonNoun = NON_NOUN_KEYS.has(key);
  const isEnMassNoun = EN_MASS_NOUNS.has(key);

  // English (plural string only, no gender)
  if (isNonNoun || isEnMassNoun) {
    entry.en = data.en || key; // Keep singular
  } else {
    entry.en = pluralizeEn(data.en || key);
  }

  // Languages with gender: [plural, gender]
  for (const locale of ['de','fr','es','pt','it','nl','sv','da','no']) {
    if (data[locale]) {
      const gender = getGender(data[locale], locale);
      if (isNonNoun) {
        entry[locale] = [data[locale], gender]; // Keep singular
      } else {
        entry[locale] = [pluralize(data[locale], locale), gender];
      }
    }
  }

  // Finnish (plural string only, no gender)
  if (data.fi) {
    if (isNonNoun) {
      entry.fi = data.fi; // Keep singular
    } else {
      entry.fi = pluralizeFi(data.fi);
    }
  }

  entries[key] = entry;
}

// ============================================================
// APPLY CORRECTIONS
// ============================================================
const correctionsPath = path.join(__dirname, 'v2-data', 'vocabulary-corrections.json');
if (fs.existsSync(correctionsPath)) {
  const corrections = JSON.parse(fs.readFileSync(correctionsPath, 'utf8'));
  let corrected = 0;
  for (const [key, corr] of Object.entries(corrections)) {
    if (!entries[key]) continue;
    for (const locale of LOCALES) {
      if (corr[locale]) {
        entries[key][locale] = corr[locale];
        corrected++;
      }
    }
  }
  console.log(`Applied ${corrected} corrections from vocabulary-corrections.json`);
} else {
  console.log('No corrections file found, using heuristic-only output');
}

// ============================================================
// OUTPUT
// ============================================================
let output = `/**
 * IMAGE VOCABULARY - Global Image Name Dictionary
 * ================================================
 * Provides linguistically correct plural forms and grammatical gender
 * for all ${keys.length} unique images in the LessonCraftStudio image library.
 *
 * Used by: Find and Count, Prepositions (and future apps)
 * Languages: 11 (EN, DE, FR, ES, PT, IT, NL, SV, DA, NO, FI)
 *
 * Data format:
 *   key = base filename (e.g., "cat", "french-fries")
 *   en/fi = plural string only (no grammatical gender)
 *   other langs = [plural, gender] where gender is:
 *     m=masculine, f=feminine, n=neuter
 *     d=de-word (nl), h=het-word (nl)
 *     t=ett-word (sv), t=et-word (da)
 *
 * Generated: ${new Date().toISOString()}
 * Source: image_library_items database table (2,814 images, 100 themes)
 */

// eslint-disable-next-line no-unused-vars
const IMAGE_VOCABULARY = `;

output += '{\n';
const entryKeys = Object.keys(entries);
entryKeys.forEach((key, i) => {
  const comma = i < entryKeys.length - 1 ? ',' : '';
  output += `  ${JSON.stringify(key)}: ${JSON.stringify(entries[key])}${comma}\n`;
});
output += '}';

output += `;\n\n`;

// Article/quantifier tables (unchanged from v1)
output += `/**
 * PLURAL QUANTIFIERS - "all the" with gender agreement
 * Used by Find and Count for instruction text
 */
// eslint-disable-next-line no-unused-vars
const PLURAL_QUANTIFIERS = {
  en: { default: "all the" },
  de: { default: "alle" },
  fr: { m: "tous les", f: "toutes les" },
  es: { m: "todos los", f: "todas las" },
  pt: { m: "todos os", f: "todas as" },
  it: { m: "tutti i", f: "tutte le" },
  nl: { default: "alle" },
  sv: { default: "alla" },
  da: { default: "alle" },
  no: { default: "alle" },
  fi: { default: "kaikki" }
};

/**
 * DEFINITE ARTICLES - Singular definite articles by gender
 * Used by Prepositions for "the [shape]" constructions
 * German uses dative case (prepositions of location)
 */
// eslint-disable-next-line no-unused-vars
const DEFINITE_ARTICLES = {
  en: { default: "the" },
  de: { m: "dem", f: "der", n: "dem" },
  fr: { m: "le", f: "la" },
  es: { m: "el", f: "la" },
  pt: { m: "o", f: "a" },
  it: { m: "il", f: "la" },
  nl: { d: "de", h: "het" },
  sv: { n: "den", t: "det" },
  da: { n: "den", t: "det" },
  no: { m: "den", f: "den", n: "det" },
  fi: { default: "" }
};

/**
 * ImageVocab - Helper object for vocabulary lookups
 */
// eslint-disable-next-line no-unused-vars
const ImageVocab = {
  /**
   * Extract vocabulary key from an image file path
   * "/images/animals/cat-1769386104449-fcf95632.webp" -> "cat"
   * "/images/animals/cat-2-1769383278105-gvgurow7.webp" -> "cat"
   * "/images/food/french-fries-1769383320770-7r1otnn8.webp" -> "french-fries"
   */
  keyFromPath(path) {
    if (!path) return '';
    const filename = path.split('/').pop();
    const noExt = filename.replace(/\\.\\w+$/, '');
    const match = noExt.match(/^(.+)-(\\d{13})-([a-z0-9]+)$/);
    const baseName = match ? match[1].toLowerCase() : noExt.toLowerCase();
    return baseName.replace(/-\\d+$/, '');
  },

  /**
   * Get plural form for a vocabulary key in a locale
   */
  plural(key, locale) {
    const entry = IMAGE_VOCABULARY[key];
    if (!entry) return this._fallbackPlural(key, locale);
    const val = entry[locale];
    if (!val) return this._fallbackPlural(key, locale);
    return Array.isArray(val) ? val[0] : val;
  },

  /**
   * Get gender code for a vocabulary key in a locale
   * Returns: 'm','f','n','d','h','t' or null
   */
  gender(key, locale) {
    const entry = IMAGE_VOCABULARY[key];
    if (!entry) return null;
    const val = entry[locale];
    return Array.isArray(val) ? val[1] : null;
  },

  /**
   * Get singular definite article for a key in a locale
   */
  defArticle(key, locale) {
    const g = this.gender(key, locale);
    const articles = DEFINITE_ARTICLES[locale];
    if (!articles) return '';
    return articles[g] || articles.default || '';
  },

  /**
   * Get "all the" quantifier with correct gender for a list of keys
   * Rule: if ALL items are feminine -> feminine form; otherwise -> masculine
   */
  pluralQuantifier(keys, locale) {
    const quantifiers = PLURAL_QUANTIFIERS[locale];
    if (!quantifiers) return '';
    if (quantifiers.default) return quantifiers.default;
    const allFeminine = keys.every(k => this.gender(k, locale) === 'f');
    return allFeminine ? quantifiers.f : quantifiers.m;
  },

  /**
   * Improved rule-based fallback for unknown words (user-uploaded images)
   */
  _fallbackPlural(word, locale) {
    if (!word) return word;
    if (locale === 'en') {
      const lower = word.toLowerCase();
      if (lower.endsWith('s') || lower.endsWith('x') || lower.endsWith('ch') || lower.endsWith('sh') || lower.endsWith('z')) return word + 'es';
      if (lower.endsWith('y') && !/[aeiou]y$/.test(lower)) return word.slice(0, -1) + 'ies';
      if (lower.endsWith('fe')) return word.slice(0, -2) + 'ves';
      if (lower.endsWith('f') && !lower.endsWith('ff')) return word.slice(0, -1) + 'ves';
      return word + 's';
    }
    if (locale === 'de') {
      const lower = word.toLowerCase();
      if (lower.endsWith('e')) return word + 'n';
      if (lower.endsWith('el') || lower.endsWith('er') || lower.endsWith('en')) return word;
      return word + 'e';
    }
    if (locale === 'fr') {
      const lower = word.toLowerCase();
      if (lower.endsWith('eau') || lower.endsWith('au') || lower.endsWith('eu')) return word + 'x';
      if (lower.endsWith('al')) return word.slice(0, -2) + 'aux';
      if (lower.endsWith('s') || lower.endsWith('x') || lower.endsWith('z')) return word;
      return word + 's';
    }
    if (locale === 'es' || locale === 'pt') {
      const lower = word.toLowerCase();
      if (lower.endsWith('z')) return word.slice(0, -1) + 'ces';
      if (/[aeiou]$/.test(lower)) return word + 's';
      return word + 'es';
    }
    if (locale === 'it') {
      const lower = word.toLowerCase();
      if (lower.endsWith('o')) return word.slice(0, -1) + 'i';
      if (lower.endsWith('a')) return word.slice(0, -1) + 'e';
      if (lower.endsWith('e')) return word.slice(0, -1) + 'i';
      return word;
    }
    if (locale === 'nl') {
      const lower = word.toLowerCase();
      if (lower.endsWith('e')) return word + 'n';
      return word + 'en';
    }
    if (locale === 'sv' || locale === 'da' || locale === 'no') {
      const lower = word.toLowerCase();
      if (lower.endsWith('e')) return word + 'r';
      return word + 'er';
    }
    if (locale === 'fi') return word + 't';
    return word + 's';
  }
};
`;

const outPath = path.join(__dirname, '..', 'REFERENCE TRANSLATIONS', 'image-vocabulary.js');
fs.writeFileSync(outPath, output, 'utf8');
console.log(`Written ${keys.length} entries to ${outPath}`);
console.log(`File size: ${(fs.statSync(outPath).size / 1024).toFixed(1)} KB`);
