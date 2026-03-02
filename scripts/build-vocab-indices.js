/**
 * Build vocab-indices.js — precomputed filter maps for apps
 * ==========================================================
 * Reads enriched vocabulary + phonics data and produces a compact
 * browser-loadable JS file with precomputed indices and a query helper.
 *
 * Run: node scripts/build-vocab-indices.js
 *
 * Reads:
 *   - scripts/v2-data/image-vocabulary-raw.json (enriched with _themes, _type, etc.)
 *   - scripts/v2-data/vocabulary-phonics.json
 *
 * Writes:
 *   - REFERENCE TRANSLATIONS/vocab-indices.js
 */

const fs = require('fs');
const path = require('path');

const RAW_PATH = path.join(__dirname, 'v2-data', 'image-vocabulary-raw.json');
const PHONICS_PATH = path.join(__dirname, 'v2-data', 'vocabulary-phonics.json');
const OUT_PATH = path.join(__dirname, '..', 'REFERENCE TRANSLATIONS', 'vocab-indices.js');

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

function main() {
  console.log('Building vocab-indices.js...\n');

  const raw = JSON.parse(fs.readFileSync(RAW_PATH, 'utf8'));
  const phonics = JSON.parse(fs.readFileSync(PHONICS_PATH, 'utf8'));
  const keys = Object.keys(raw);

  // ============================================================
  // 1. SEMANTIC INDEX
  // ============================================================
  const semantic = {};
  for (const key of keys) {
    for (const tag of raw[key]._semantic) {
      if (!semantic[tag]) semantic[tag] = [];
      semantic[tag].push(key);
    }
  }
  // Sort each list alphabetically
  for (const tag of Object.keys(semantic)) {
    semantic[tag].sort();
  }

  // ============================================================
  // 2. CVC INDEX (English, non-compound, by vowel sound)
  // ============================================================
  const cvc = {};
  for (const key of keys) {
    const p = phonics[key];
    if (p && p.en && p.en.pat === 'CVC' && p.en.vs && p.en.cmp !== true) {
      const vs = p.en.vs;
      if (!cvc[vs]) cvc[vs] = [];
      cvc[vs].push(key);
    }
  }
  for (const vs of Object.keys(cvc)) {
    cvc[vs].sort();
  }

  // ============================================================
  // 3. WORD FAMILY INDEX (English, non-compound, 2+ members)
  // ============================================================
  const wordFamilyAll = {};
  for (const key of keys) {
    const p = phonics[key];
    if (p && p.en && p.en.wf && p.en.cmp !== true) {
      const wf = p.en.wf;
      if (!wordFamilyAll[wf]) wordFamilyAll[wf] = [];
      wordFamilyAll[wf].push(key);
    }
  }
  // Only keep families with 2+ members
  const wordFamily = {};
  for (const [wf, members] of Object.entries(wordFamilyAll)) {
    if (members.length >= 2) {
      wordFamily[wf] = members.sort();
    }
  }

  // ============================================================
  // 4. COUNTABLE INDEX
  // ============================================================
  const countable = keys.filter(k => raw[k]._countable).sort();

  // ============================================================
  // 5. DIFFICULTY INDEX
  // ============================================================
  const difficulty = {};
  for (let d = 1; d <= 5; d++) {
    difficulty[d] = keys.filter(k => raw[k]._difficulty === d).sort();
  }

  // ============================================================
  // 6. LETTER COUNT INDEX (English, non-compound)
  // ============================================================
  const letterCount = {};
  for (const key of keys) {
    const p = phonics[key];
    if (p && p.en && p.en.cmp !== true) {
      const lc = p.en.lc;
      if (!letterCount[lc]) letterCount[lc] = [];
      letterCount[lc].push(key);
    }
  }
  for (const lc of Object.keys(letterCount)) {
    letterCount[lc].sort();
  }

  // ============================================================
  // 7. BEGINNING SOUND INDEX (English, non-compound)
  // ============================================================
  const beginSound = {};
  for (const key of keys) {
    const p = phonics[key];
    if (p && p.en && p.en.onset && p.en.cmp !== true) {
      const onset = p.en.onset;
      if (!beginSound[onset]) beginSound[onset] = [];
      beginSound[onset].push(key);
    }
  }
  for (const s of Object.keys(beginSound)) {
    beginSound[s].sort();
  }

  // ============================================================
  // 8. TYPE INDEX
  // ============================================================
  const type = {};
  for (const key of keys) {
    const t = raw[key]._type;
    if (!type[t]) type[t] = [];
    type[t].push(key);
  }
  for (const t of Object.keys(type)) {
    type[t].sort();
  }

  // ============================================================
  // 9. THEME INDEX (all themes per key, reversed: theme → keys)
  // ============================================================
  const theme = {};
  for (const key of keys) {
    for (const t of raw[key]._themes) {
      if (!theme[t]) theme[t] = [];
      theme[t].push(key);
    }
  }
  for (const t of Object.keys(theme)) {
    theme[t].sort();
  }

  // ============================================================
  // 10. PATTERN INDEX (English only — other locales use runtime query)
  // ============================================================
  const pattern = {};
  const enPatterns = {};
  for (const key of keys) {
    const p = phonics[key];
    if (p && p.en && p.en.cmp !== true) {
      const pat = p.en.pat;
      if (!enPatterns[pat]) enPatterns[pat] = [];
      enPatterns[pat].push(key);
    }
  }
  // Only keep patterns with 3+ members
  for (const [pat, members] of Object.entries(enPatterns)) {
    if (members.length >= 3) {
      pattern[pat] = members.sort();
    }
  }

  // ============================================================
  // 11. SYLLABLE INDEX (English only — other locales use runtime query)
  // ============================================================
  const syllable = {};
  for (const key of keys) {
    const p = phonics[key];
    if (p && p.en && p.en.cmp !== true) {
      const syl = p.en.syl;
      if (!syllable[syl]) syllable[syl] = [];
      syllable[syl].push(key);
    }
  }
  for (const s of Object.keys(syllable)) {
    syllable[s].sort();
  }

  // ============================================================
  // BUILD OUTPUT
  // ============================================================

  // Convert arrays to comma-separated strings for compact storage
  function toCSV(arr) {
    return arr.join(',');
  }

  function mapToCSV(obj) {
    const result = {};
    for (const [k, v] of Object.entries(obj)) {
      result[k] = toCSV(v);
    }
    return result;
  }

  const index = {
    semantic: mapToCSV(semantic),
    cvc: mapToCSV(cvc),
    wordFamily: mapToCSV(wordFamily),
    countable: toCSV(countable),
    difficulty: mapToCSV(difficulty),
    letterCount: mapToCSV(letterCount),
    beginSound: mapToCSV(beginSound),
    type: mapToCSV(type),
    theme: mapToCSV(theme),
    pattern: mapToCSV(pattern),
    syllable: mapToCSV(syllable),
  };

  // Build the JS file
  const jsContent = `/**
 * Vocabulary Indices — precomputed filter maps
 * =============================================
 * Auto-generated by scripts/build-vocab-indices.js
 * DO NOT EDIT MANUALLY
 *
 * All index values are comma-separated key strings for compact storage.
 * Use VocabQuery helpers to parse and query.
 *
 * Generated: ${new Date().toISOString().split('T')[0]}
 * Entries: ${keys.length}
 */

/* eslint-disable */
// @ts-nocheck

const VOCAB_INDEX = ${JSON.stringify(index, null, 2)};

/**
 * VocabQuery — query helper for VOCAB_INDEX
 *
 * Usage:
 *   VocabQuery.bySemantic('animal')        → ['alligator','alpaca','ant',...]
 *   VocabQuery.byCVC('short_a')            → ['bag','bat','can',...]
 *   VocabQuery.byWordFamily('-at')          → ['bat','cat','hat',...]
 *   VocabQuery.byDifficulty(1)             → ['ant','apple','arm',...]
 *   VocabQuery.byLetterCount(3)            → ['ant','arm','axe',...]
 *   VocabQuery.byBeginSound('b')           → ['badge','bag','bat',...]
 *   VocabQuery.byType('noun')              → ['accordion','acorn',...]
 *   VocabQuery.byTheme('animals')          → ['antelope','bat','camel',...]
 *   VocabQuery.byPattern('CVC')             → ['bag','bat','bed',...]
 *   VocabQuery.bySyllable(1)               → ['ant','arm','axe',...]
 *   VocabQuery.countable()                 → ['accordion','acorn',...]
 *
 *   // Compound query: intersection of multiple filters
 *   VocabQuery.query({
 *     semantic: 'animal',
 *     cvc: 'short_a',
 *     difficulty: 1,
 *   })  → ['bat','cat',...]
 *
 *   // With shuffle + limit
 *   VocabQuery.query({ semantic: 'animal', difficulty: 1 }, { shuffle: true, limit: 6, seed: 42 })
 */
const VocabQuery = {
  /** Parse a comma-separated string into an array */
  _parse(str) {
    return str ? str.split(',') : [];
  },

  /** Intersect multiple arrays */
  _intersect(arrays) {
    if (arrays.length === 0) return [];
    if (arrays.length === 1) return arrays[0];
    const setA = new Set(arrays[0]);
    for (let i = 1; i < arrays.length; i++) {
      const setB = new Set(arrays[i]);
      for (const item of setA) {
        if (!setB.has(item)) setA.delete(item);
      }
    }
    return [...setA];
  },

  /** Seeded PRNG (Mulberry32) for reproducible shuffles */
  _mulberry32(seed) {
    return function() {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  },

  /** Shuffle array in place using seeded PRNG */
  _shuffle(arr, rng) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  },

  // --- Single-index queries ---

  bySemantic(tag) {
    return this._parse(VOCAB_INDEX.semantic[tag]);
  },

  byCVC(vowelSound) {
    return this._parse(VOCAB_INDEX.cvc[vowelSound]);
  },

  byWordFamily(family) {
    return this._parse(VOCAB_INDEX.wordFamily[family]);
  },

  byDifficulty(level) {
    return this._parse(VOCAB_INDEX.difficulty[level]);
  },

  byLetterCount(n) {
    return this._parse(VOCAB_INDEX.letterCount[n]);
  },

  byBeginSound(sound) {
    return this._parse(VOCAB_INDEX.beginSound[sound]);
  },

  byType(typeName) {
    return this._parse(VOCAB_INDEX.type[typeName]);
  },

  byTheme(themeName) {
    return this._parse(VOCAB_INDEX.theme[themeName]);
  },

  byPattern(pat) {
    return this._parse(VOCAB_INDEX.pattern[pat]);
  },

  bySyllable(count) {
    return this._parse(VOCAB_INDEX.syllable[count]);
  },

  countable() {
    return this._parse(VOCAB_INDEX.countable);
  },

  // --- Available keys/values ---

  semanticTags() {
    return Object.keys(VOCAB_INDEX.semantic).sort();
  },

  vowelSounds() {
    return Object.keys(VOCAB_INDEX.cvc).sort();
  },

  wordFamilies() {
    return Object.keys(VOCAB_INDEX.wordFamily).sort();
  },

  beginSounds() {
    return Object.keys(VOCAB_INDEX.beginSound).sort();
  },

  themes() {
    return Object.keys(VOCAB_INDEX.theme).sort();
  },

  // --- Compound query ---

  /**
   * Query with multiple filters (intersection).
   *
   * @param {Object} filters - Filter criteria
   * @param {string} [filters.semantic] - Semantic tag
   * @param {string} [filters.cvc] - CVC vowel sound
   * @param {string} [filters.wordFamily] - Word family
   * @param {number} [filters.difficulty] - Difficulty level (1-5)
   * @param {number} [filters.letterCount] - Letter count
   * @param {string} [filters.beginSound] - Beginning sound
   * @param {string} [filters.type] - Word type (noun, adjective, etc.)
   * @param {string} [filters.theme] - Theme name
   * @param {boolean} [filters.countable] - Countable nouns only
   * @param {string} [filters.pattern] - English CVC pattern (e.g. 'CVC', 'CVCC')
   * @param {number} [filters.syllable] - English syllable count
   *
   * @param {Object} [options] - Query options
   * @param {boolean} [options.shuffle] - Shuffle results
   * @param {number} [options.limit] - Limit result count
   * @param {number} [options.seed] - PRNG seed for reproducible shuffle
   *
   * @returns {string[]} Array of matching vocabulary keys
   */
  query(filters, options) {
    var sets = [];

    if (filters.semantic) sets.push(this.bySemantic(filters.semantic));
    if (filters.cvc) sets.push(this.byCVC(filters.cvc));
    if (filters.wordFamily) sets.push(this.byWordFamily(filters.wordFamily));
    if (filters.difficulty) sets.push(this.byDifficulty(filters.difficulty));
    if (filters.letterCount) sets.push(this.byLetterCount(filters.letterCount));
    if (filters.beginSound) sets.push(this.byBeginSound(filters.beginSound));
    if (filters.type) sets.push(this.byType(filters.type));
    if (filters.theme) sets.push(this.byTheme(filters.theme));
    if (filters.countable) sets.push(this.countable());
    if (filters.pattern) sets.push(this.byPattern(filters.pattern));
    if (filters.syllable) sets.push(this.bySyllable(filters.syllable));

    var result = this._intersect(sets);

    if (options) {
      if (options.shuffle) {
        var seed = options.seed || (Date.now() ^ Math.random() * 0xFFFFFFFF);
        var rng = this._mulberry32(seed);
        result = this._shuffle(result.slice(), rng);
      }
      if (options.limit && result.length > options.limit) {
        result = result.slice(0, options.limit);
      }
    }

    return result;
  }
};
`;

  fs.writeFileSync(OUT_PATH, jsContent, 'utf8');

  // ============================================================
  // STATS
  // ============================================================
  const fileSize = fs.statSync(OUT_PATH).size;
  console.log('=== Build Complete ===');
  console.log('Output:', OUT_PATH);
  console.log('File size:', (fileSize / 1024).toFixed(1) + ' KB');
  console.log('\nIndex sizes:');
  console.log('  semantic:', Object.keys(semantic).length, 'tags');
  console.log('  cvc:', Object.keys(cvc).length, 'vowel sounds');
  console.log('  wordFamily:', Object.keys(wordFamily).length, 'families');
  console.log('  countable:', countable.length, 'entries');
  console.log('  difficulty:', Object.keys(difficulty).length, 'levels');
  console.log('  letterCount:', Object.keys(letterCount).length, 'letter counts');
  console.log('  beginSound:', Object.keys(beginSound).length, 'sounds');
  console.log('  type:', Object.keys(type).length, 'types');
  console.log('  theme:', Object.keys(theme).length, 'themes');
  console.log('  pattern:', Object.keys(pattern).length, 'patterns (English)');
  console.log('  syllable:', Object.keys(syllable).length, 'syllable counts (English)');

  // CVC summary for validation
  console.log('\nCVC words per vowel sound:');
  for (const [vs, arr] of Object.entries(cvc).sort()) {
    console.log('  ' + vs + ': ' + arr.length);
  }

  console.log('\nWord families (top 10):');
  const topFamilies = Object.entries(wordFamily).sort((a, b) => b[1].length - a[1].length).slice(0, 10);
  for (const [wf, arr] of topFamilies) {
    console.log('  ' + wf + ' (' + arr.length + '): ' + arr.join(', '));
  }
}

main();
