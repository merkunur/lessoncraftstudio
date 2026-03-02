/**
 * Enrich vocabulary metadata
 * ==========================
 * Adds _themes, _type, _countable, _semantic, _difficulty to each entry
 * in image-vocabulary-raw.json.
 *
 * Run: node scripts/enrich-vocabulary-metadata.js
 *
 * Reads:
 *   - scripts/v2-data/image-vocabulary-raw.json (source of truth)
 *   - scripts/v2-data/semantic-tags.json (theme→semantic mapping + key overrides)
 *   - image library/ folder structure (to find all themes per key)
 *
 * Writes:
 *   - scripts/v2-data/image-vocabulary-raw.json (in-place, adds underscore fields)
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// CONFIGURATION
// ============================================================

const RAW_PATH = path.join(__dirname, 'v2-data', 'image-vocabulary-raw.json');
const SEMANTIC_PATH = path.join(__dirname, 'v2-data', 'semantic-tags.json');
const IMAGE_LIB_DIR = path.join(__dirname, '..', 'image library');

// Skip these folders — they contain backgrounds/borders, not vocabulary images
const SKIP_FOLDERS = new Set(['BACKGROUNDS', 'BORDERS']);

// ============================================================
// NON-NOUN KEYS (copied from build-image-vocabulary.js)
// ============================================================

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
  // Activities and sports (gerunds / mass nouns)
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
  // Planets and proper nouns
  'earth','jupiter','mars','mercury','neptune','saturn','uranus','venus','us',
]);

// English mass nouns (uncountable in English)
const EN_MASS_NOUNS = new Set([
  'asparagus','bacon','bread','broccoli','butter','celery','cheese','chocolate',
  'corn','driftwood','food','garlic','gingerbread','grass','hair','hay','honey',
  'ice','lettuce','lightning','milk','oatmeal','oil','pasta','peanut-butter',
  'popcorn','porridge','rice','sand','seaweed','snow','spinach','toothpaste',
  'water','yogurt',
]);

// ============================================================
// TYPE CLASSIFICATION
// ============================================================

// Adjective keys (colors + emotions + weather adjectives + states)
const ADJECTIVE_KEYS = new Set([
  'beige','black','blue','brown','coral','crimson','gray','green',
  'pink','purple','red','scarlet','turquoise','white','yellow',
  'angry','bored','capricious','confused','content','disgusted',
  'excited','happy','merry','sad','scared','shy','skeptical',
  'surprised','tired',
  'cloudy','cold','hot','partly-cloudy','rainy','stormy','sunny',
]);

// Activity/gerund keys
const ACTIVITY_KEYS = new Set([
  'badminton','baking','baseball','basketball','biking','bowling',
  'boxing','camping','chess','dancing','fencing','fishing','football',
  'golf','gymnastics','hiking','hockey','ice-skating','jumping',
  'knitting','photography','reading','running','scuba-diving','sewing',
  'singing','skating','skiing','sledding','snorkeling','snowboarding',
  'soccer','swimming','table-tennis','tennis','volleyball','writing',
]);

// Proper nouns / unique entities
const PROPER_NOUN_KEYS = new Set([
  'earth','jupiter','mars','mercury','neptune','saturn','uranus','venus','us',
]);

// Seasons/holidays (treated as noun-concept)
const SEASON_HOLIDAY_KEYS = new Set([
  'autumn','christmas','easter','halloween',
]);

function classifyType(key) {
  if (ADJECTIVE_KEYS.has(key)) return 'adjective';
  if (ACTIVITY_KEYS.has(key)) return 'verb-gerund';
  if (PROPER_NOUN_KEYS.has(key)) return 'proper-noun';
  if (SEASON_HOLIDAY_KEYS.has(key)) return 'noun-concept';
  if (key === 'science' || key === 'air-conditioning') return 'noun-concept';
  return 'noun';
}

// ============================================================
// COUNTABILITY
// ============================================================

// These nouns are countable despite seeming abstract
const COUNTABLE_EXCEPTIONS = new Set([
  'snowflake', 'raindrop', 'star', 'cloud',
]);

// These nouns are NOT countable (mass nouns, concepts, unique entities)
const UNCOUNTABLE_EXTRA = new Set([
  'air-conditioning', 'science', 'music',
  ...EN_MASS_NOUNS,
]);

function isCountable(key, type) {
  // Only nouns can be countable
  if (type !== 'noun') return false;
  // Mass nouns and concepts are not countable
  if (UNCOUNTABLE_EXTRA.has(key)) return false;
  // Proper nouns not countable
  if (type === 'proper-noun') return false;
  // Shapes are countable (circle, square, etc.)
  // Default: nouns are countable
  return true;
}

// ============================================================
// DIFFICULTY SCORING
// ============================================================

// English vowels for syllable counting
const EN_VOWELS = new Set(['a','e','i','o','u','y']);

function countSyllablesEn(word) {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (w.length <= 2) return 1;

  let count = 0;
  let prevVowel = false;
  for (let i = 0; i < w.length; i++) {
    const isVowel = EN_VOWELS.has(w[i]);
    if (isVowel && !prevVowel) count++;
    prevVowel = isVowel;
  }

  // Silent e at end
  if (w.endsWith('e') && count > 1) count--;
  // Words like "tle", "ble" at end add a syllable
  if (w.endsWith('le') && w.length > 2 && !EN_VOWELS.has(w[w.length - 3])) count++;

  return Math.max(1, count);
}

// Common early-learning words get difficulty 1
const EASY_WORDS = new Set([
  'cat','dog','sun','hat','cup','bus','bed','box','pig','hen',
  'bat','ant','bee','car','cow','egg','fan','fox','jam','jet',
  'key','leg','map','net','pan','pen','pie','pot','rat','rug',
  'van','web','wig','zip','ball','bear','bird','boat','book',
  'cake','duck','fish','frog','hand','kite','lamp','moon','nest',
  'ring','shoe','star','tree','apple','house',
]);

function computeDifficulty(key, enWord) {
  const letters = enWord.toLowerCase().replace(/[^a-z]/g, '').length;
  const syllables = countSyllablesEn(enWord);

  // Easy override
  if (EASY_WORDS.has(key)) return 1;

  // Score based on length + syllables
  // 1-3 letters, 1 syllable → 1
  // 4-5 letters, 1-2 syllables → 2
  // 6-7 letters, 2 syllables → 3
  // 8-9 letters, 2-3 syllables → 4
  // 10+ letters or 4+ syllables → 5
  if (letters <= 3 && syllables <= 1) return 1;
  if (letters <= 5 && syllables <= 2) return 2;
  if (letters <= 7 && syllables <= 2) return 3;
  if (letters <= 9 && syllables <= 3) return 4;
  return 5;
}

// ============================================================
// THEME SCANNING
// ============================================================

function scanImageLibrary() {
  const keyToThemes = {};

  if (!fs.existsSync(IMAGE_LIB_DIR)) {
    console.warn('WARNING: Image library not found at', IMAGE_LIB_DIR);
    console.warn('Theme scanning will use _theme field from raw data only.');
    return keyToThemes;
  }

  const folders = fs.readdirSync(IMAGE_LIB_DIR).filter(function(f) {
    try {
      return fs.statSync(path.join(IMAGE_LIB_DIR, f)).isDirectory() && !SKIP_FOLDERS.has(f);
    } catch(e) { return false; }
  });

  for (const folder of folders) {
    const themeSlug = folder.toLowerCase().replace(/\s+/g, '_');
    try {
      const files = fs.readdirSync(path.join(IMAGE_LIB_DIR, folder))
        .filter(function(f) { return f.endsWith('.png'); });

      for (const f of files) {
        // Convert filename to vocabulary key:
        // "French fries.png" → "french-fries"
        const key = f.replace('.png', '').toLowerCase().replace(/\s+/g, '-');
        if (!keyToThemes[key]) keyToThemes[key] = new Set();
        keyToThemes[key].add(themeSlug);
      }
    } catch(e) {
      console.warn('Could not read folder:', folder, e.message);
    }
  }

  return keyToThemes;
}

// ============================================================
// SEMANTIC TAGGING
// ============================================================

function buildSemanticTags(key, themes, semanticConfig) {
  // Check for per-key override first
  if (semanticConfig.key_overrides[key]) {
    return semanticConfig.key_overrides[key];
  }

  // Build from theme→semantic mapping
  const tags = new Set();
  const themeMap = semanticConfig.theme_to_semantic;

  for (const theme of themes) {
    const themeTags = themeMap[theme];
    if (themeTags) {
      for (const t of themeTags) tags.add(t);
    }
  }

  // If no tags found, assign "object" as fallback
  if (tags.size === 0) tags.add('object');

  return [...tags].sort();
}

// ============================================================
// MAIN
// ============================================================

function main() {
  console.log('Enriching vocabulary metadata...\n');

  // Read source data
  const raw = JSON.parse(fs.readFileSync(RAW_PATH, 'utf8'));
  const semanticConfig = JSON.parse(fs.readFileSync(SEMANTIC_PATH, 'utf8'));

  // Scan image library for multi-theme mapping
  const keyToThemes = scanImageLibrary();
  const hasImageLib = Object.keys(keyToThemes).length > 0;

  const keys = Object.keys(raw);
  console.log('Total entries:', keys.length);

  // Stats counters
  const stats = {
    types: {},
    countable: 0,
    uncountable: 0,
    difficulty: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    multiTheme: 0,
    singleTheme: 0,
  };

  // Process each entry
  for (const key of keys) {
    const entry = raw[key];
    const currentTheme = entry._theme;
    const enWord = entry.en;

    // 1. _themes: all themes containing this image
    let themes;
    if (hasImageLib && keyToThemes[key]) {
      themes = [...keyToThemes[key]].sort();
    } else {
      // Fallback: use the single _theme from raw data
      themes = [currentTheme];
    }
    entry._themes = themes;
    if (themes.length > 1) stats.multiTheme++;
    else stats.singleTheme++;

    // 2. _type: part of speech classification
    const type = classifyType(key);
    entry._type = type;
    stats.types[type] = (stats.types[type] || 0) + 1;

    // 3. _countable: can this be meaningfully counted?
    const countable = isCountable(key, type);
    entry._countable = countable;
    if (countable) stats.countable++;
    else stats.uncountable++;

    // 4. _semantic: semantic category tags
    entry._semantic = buildSemanticTags(key, themes, semanticConfig);

    // 5. _difficulty: 1-5 based on English word length + syllables
    const difficulty = computeDifficulty(key, enWord);
    entry._difficulty = difficulty;
    stats.difficulty[difficulty]++;
  }

  // Write enriched data back
  fs.writeFileSync(RAW_PATH, JSON.stringify(raw, null, 2) + '\n', 'utf8');

  // Print summary
  console.log('\n=== Enrichment Complete ===');
  console.log('Entries enriched:', keys.length);
  console.log('\nType distribution:');
  for (const [t, c] of Object.entries(stats.types).sort()) {
    console.log('  ' + t + ': ' + c);
  }
  console.log('\nCountability:');
  console.log('  Countable: ' + stats.countable);
  console.log('  Uncountable: ' + stats.uncountable);
  console.log('\nDifficulty distribution:');
  for (let d = 1; d <= 5; d++) {
    console.log('  Level ' + d + ': ' + stats.difficulty[d]);
  }
  console.log('\nTheme coverage:');
  console.log('  Multi-theme: ' + stats.multiTheme);
  console.log('  Single-theme: ' + stats.singleTheme);

  // Spot checks
  console.log('\n=== Spot Checks ===');
  const checks = ['cat', 'dog', 'apple', 'angry', 'swimming', 'red', 'sun', 'elephant', 'french-fries', 'accordion'];
  for (const k of checks) {
    if (raw[k]) {
      const e = raw[k];
      console.log(k + ':');
      console.log('  themes:', JSON.stringify(e._themes));
      console.log('  type:', e._type, '| countable:', e._countable, '| difficulty:', e._difficulty);
      console.log('  semantic:', JSON.stringify(e._semantic));
    }
  }
}

main();
