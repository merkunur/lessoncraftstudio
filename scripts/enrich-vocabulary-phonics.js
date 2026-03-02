/**
 * Enrich vocabulary with phonics data
 * ====================================
 * Computes phonics analysis per word per locale.
 *
 * English gets FULL analysis:
 *   syl  - syllable count
 *   pat  - consonant/vowel pattern (e.g. "CVC", "CVCC")
 *   wf   - word family / rime unit (e.g. "-at", "-og") — only for CVC/CVCC words
 *   onset - initial consonant(s) (e.g. "k" for cat, "str" for string)
 *   rime  - vowel + final consonants (e.g. "at" for cat)
 *   vs   - vowel sound (e.g. "short_a", "long_e") — only for single-vowel-sound words
 *   lc   - letter count
 *
 * Other 10 languages get BASIC analysis:
 *   syl  - syllable count
 *   pat  - consonant/vowel pattern
 *   lc   - letter count
 *
 * Run: node scripts/enrich-vocabulary-phonics.js
 *
 * Reads:  scripts/v2-data/image-vocabulary-raw.json
 * Writes: scripts/v2-data/vocabulary-phonics.json
 */

const fs = require('fs');
const path = require('path');

const RAW_PATH = path.join(__dirname, 'v2-data', 'image-vocabulary-raw.json');
const OUT_PATH = path.join(__dirname, 'v2-data', 'vocabulary-phonics.json');

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

// ============================================================
// LANGUAGE-SPECIFIC VOWELS AND DIGRAPHS
// ============================================================

// Vowel sets per language (lowercase)
const VOWELS = {
  en: new Set('aeiouy'.split('')),
  de: new Set('aeiou\u00e4\u00f6\u00fc'.split('')),     // äöü
  fr: new Set('aeiouy\u00e0\u00e2\u00e8\u00e9\u00ea\u00eb\u00ee\u00ef\u00f4\u00f9\u00fb\u00fc\u0153'.split('')),
  es: new Set('aeiou\u00e1\u00e9\u00ed\u00f3\u00fa\u00fc'.split('')),
  pt: new Set('aeiou\u00e0\u00e1\u00e2\u00e3\u00e9\u00ea\u00ed\u00f3\u00f4\u00f5\u00fa\u00fc'.split('')),
  it: new Set('aeiou\u00e0\u00e8\u00e9\u00ec\u00ed\u00f2\u00f3\u00f9\u00fa'.split('')),
  nl: new Set('aeiouy\u00e9\u00eb\u00ef\u00f6\u00fc'.split('')),
  sv: new Set('aeiouy\u00e5\u00e4\u00f6'.split('')),      // åäö
  da: new Set('aeiouy\u00e6\u00f8\u00e5'.split('')),       // æøå
  no: new Set('aeiouy\u00e6\u00f8\u00e5'.split('')),       // æøå
  fi: new Set('aeiouy\u00e4\u00f6'.split('')),              // äö
};

// Consonant digraphs per language — treated as single consonant units
// Order matters: longer digraphs first (trigraphs before digraphs)
const CONSONANT_DIGRAPHS = {
  en: ['tch', 'dge', 'sh', 'ch', 'th', 'ph', 'wh', 'ck', 'ng', 'wr', 'kn', 'gn', 'gh', 'qu'],
  de: ['sch', 'tsch', 'ch', 'pf', 'tz', 'ph', 'qu', 'ng', 'ck', 'sp', 'st'],
  fr: ['ch', 'ph', 'gn', 'qu', 'ng'],
  es: ['ch', 'll', 'rr', 'qu', 'gu'],
  pt: ['ch', 'lh', 'nh', 'rr', 'ss', 'qu', 'gu'],
  it: ['ch', 'gh', 'gl', 'gn', 'sc', 'qu'],
  nl: ['ch', 'ng', 'nk', 'sch', 'sj', 'tj', 'qu'],
  sv: ['sk', 'sj', 'ng', 'nk', 'tj', 'dj', 'gn', 'qu'],
  da: ['sk', 'sj', 'ng', 'nk', 'tj', 'dj', 'qu'],
  no: ['sk', 'sj', 'ng', 'nk', 'tj', 'dj', 'kj', 'gn', 'qu'],
  fi: ['ng', 'nk'],
};

// Vowel digraphs per language — treated as single vowel units
const VOWEL_DIGRAPHS = {
  en: ['ea', 'ee', 'oo', 'ai', 'ay', 'oa', 'ow', 'ou', 'ie', 'ey', 'oi', 'oy', 'au', 'aw'],
  de: ['ei', 'ai', 'eu', 'au', 'ie', '\u00e4u'],      // äu
  fr: ['ou', 'au', 'eau', 'ai', 'ei', 'eu', 'oi', '\u0153u'],
  es: ['ai', 'ei', 'au', 'eu', 'ue', 'ie'],
  pt: ['ou', 'ai', 'ei', 'au', 'eu', '\u00e3o', '\u00f5e'],
  it: ['ai', 'au', 'ei', 'eu', 'ie', 'io', 'uo', 'ua'],
  nl: ['aa', 'ee', 'oo', 'uu', 'ie', 'oe', 'eu', 'ui', 'ei', 'ij', 'ou', 'au', 'ai', 'oi'],
  sv: [],
  da: [],
  no: [],
  fi: ['ai', 'ei', 'oi', 'ui', 'yi', 'au', 'eu', 'ou', 'ie', 'uo', '\u00e4i', '\u00f6i', '\u00e4y'],
};

// ============================================================
// TOKENIZE: split word into C/V units respecting digraphs
// ============================================================

/**
 * Tokenize a word into phoneme-like units, classifying each as C or V.
 * Digraphs are kept together as single units.
 *
 * @param {string} word - The word to tokenize (lowercase, cleaned)
 * @param {string} locale - The language code
 * @returns {{ units: string[], pattern: string }} - units array and CV pattern string
 */
function tokenize(word, locale) {
  const vowelSet = VOWELS[locale] || VOWELS.en;
  const cDigraphs = CONSONANT_DIGRAPHS[locale] || [];
  const vDigraphs = VOWEL_DIGRAPHS[locale] || [];

  // Sort digraphs by length descending for greedy matching
  const allDigraphs = [
    ...cDigraphs.map(d => ({ str: d, type: 'C' })),
    ...vDigraphs.map(d => ({ str: d, type: 'V' })),
  ].sort((a, b) => b.str.length - a.str.length);

  const units = [];
  const types = [];
  let i = 0;

  while (i < word.length) {
    let matched = false;

    // Try digraphs first (greedy, longest match)
    for (const dg of allDigraphs) {
      if (word.substring(i, i + dg.str.length) === dg.str) {
        units.push(dg.str);
        types.push(dg.type);
        i += dg.str.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      const ch = word[i];
      units.push(ch);
      types.push(vowelSet.has(ch) ? 'V' : 'C');
      i++;
    }
  }

  return { units, pattern: types.join('') };
}

// ============================================================
// SYLLABLE COUNTING
// ============================================================

/**
 * Count syllables by counting vowel groups in the tokenized form.
 * A vowel group = consecutive V units.
 */
function countSyllables(word, locale) {
  const { pattern } = tokenize(word, locale);
  let count = 0;
  let inVowel = false;
  for (const ch of pattern) {
    if (ch === 'V') {
      if (!inVowel) count++;
      inVowel = true;
    } else {
      inVowel = false;
    }
  }

  // English silent-e adjustment
  if (locale === 'en' && count > 1 && word.endsWith('e')) {
    const beforeE = word[word.length - 2];
    if (!VOWELS.en.has(beforeE)) {
      count--;
    }
  }

  return Math.max(1, count);
}

// ============================================================
// ENGLISH-SPECIFIC: ONSET/RIME, WORD FAMILY, VOWEL SOUND
// ============================================================

/**
 * Split an English word into onset + rime.
 * Onset = initial consonant cluster before first vowel.
 * Rime = from first vowel to end of word.
 */
function splitOnsetRime(word) {
  const lower = word.toLowerCase();
  const vowelSet = VOWELS.en;

  // Handle English consonant digraphs at start
  const startDigraphs = ['thr', 'str', 'shr', 'spl', 'spr', 'scr', 'squ',
    'th', 'sh', 'ch', 'ph', 'wh', 'wr', 'kn', 'gn', 'bl', 'br', 'cl',
    'cr', 'dr', 'fl', 'fr', 'gl', 'gr', 'pl', 'pr', 'sk', 'sl', 'sm',
    'sn', 'sp', 'st', 'sw', 'tr', 'tw', 'qu'];

  let onset = '';
  let rimeStart = 0;

  // Find where the first vowel starts
  for (let i = 0; i < lower.length; i++) {
    if (vowelSet.has(lower[i])) {
      onset = lower.substring(0, i);
      rimeStart = i;
      break;
    }
    if (i === lower.length - 1) {
      // No vowel found — entire word is onset
      return { onset: lower, rime: '' };
    }
  }

  const rime = lower.substring(rimeStart);
  return { onset, rime };
}

/**
 * Get the phonetic onset (initial sound) for an English word.
 * Handles silent letters and digraphs.
 */
function getPhoneticOnset(word) {
  const lower = word.toLowerCase();

  // Silent letter patterns
  if (lower.startsWith('kn')) return 'n';
  if (lower.startsWith('wr')) return 'r';
  if (lower.startsWith('gn')) return 'n';
  if (lower.startsWith('ps')) return 's';

  // Digraphs
  const digraphOnsets = ['thr', 'str', 'shr', 'spl', 'spr', 'scr',
    'th', 'sh', 'ch', 'ph', 'wh', 'bl', 'br', 'cl', 'cr', 'dr',
    'fl', 'fr', 'gl', 'gr', 'pl', 'pr', 'sk', 'sl', 'sm', 'sn',
    'sp', 'st', 'sw', 'tr', 'tw', 'qu'];

  for (const dg of digraphOnsets) {
    if (lower.startsWith(dg)) return dg;
  }

  // c before e/i/y → "s" sound
  if (lower[0] === 'c' && (lower[1] === 'e' || lower[1] === 'i' || lower[1] === 'y')) {
    return 's';
  }

  // g before e/i → sometimes "j" sound, but too inconsistent (gift vs giraffe)
  // Keep as 'g' and let the app handle it

  // Default: first letter
  return lower[0] || '';
}

/**
 * Classify the English vowel sound of a CVC-type word.
 * Only works reliably for single-syllable words with a clear vowel.
 */
function classifyVowelSound(word) {
  const { rime } = splitOnsetRime(word);
  if (!rime) return null;

  const vowel = rime[0];
  const afterVowel = rime.substring(1);

  // Silent-e pattern: VCe → long vowel
  if (afterVowel.length === 2 && afterVowel[1] === 'e' && !VOWELS.en.has(afterVowel[0])) {
    switch (vowel) {
      case 'a': return 'long_a';
      case 'i': return 'long_i';
      case 'o': return 'long_o';
      case 'u': return 'long_u';
      case 'e': return 'long_e';
    }
  }

  // Vowel digraph patterns
  if (rime.startsWith('ee') || rime.startsWith('ea')) return 'long_e';
  if (rime.startsWith('ai') || rime.startsWith('ay')) return 'long_a';
  if (rime.startsWith('oa') || (rime.startsWith('ow') && afterVowel === 'w')) return 'long_o';
  if (rime.startsWith('oo')) return 'oo';
  if (rime.startsWith('ou') || rime.startsWith('ow')) return 'ou';
  if (rime.startsWith('oi') || rime.startsWith('oy')) return 'oi';
  if (rime.startsWith('au') || rime.startsWith('aw')) return 'au';

  // Single short vowel in closed syllable (CVC pattern)
  if (afterVowel.length >= 1 && !VOWELS.en.has(afterVowel[0])) {
    switch (vowel) {
      case 'a': return 'short_a';
      case 'e': return 'short_e';
      case 'i': return 'short_i';
      case 'o': return 'short_o';
      case 'u': return 'short_u';
    }
  }

  return null;
}

/**
 * Get the word family (rime unit) for an English word.
 * Only meaningful for short words (CVC, CVCC, CCVC patterns).
 * Returns e.g. "-at", "-og", "-ig"
 */
function getWordFamily(word, pattern) {
  // Only compute word families for short patterns where they're pedagogically useful
  const validPatterns = new Set(['CVC', 'CVCC', 'CCVC', 'CCVCC', 'CVCV']);
  // Use the simplified pattern (collapsing consecutive same types)
  if (!validPatterns.has(pattern)) return null;

  const { rime } = splitOnsetRime(word);
  if (!rime || rime.length < 2) return null;

  return '-' + rime;
}

// ============================================================
// CLEAN WORD for analysis
// ============================================================

/**
 * Clean a word for phonics analysis.
 * Returns { clean, isCompound, fullLc }
 *   clean: the primary word to analyze (single word, lowercase)
 *   isCompound: true if original has spaces/hyphens
 *   fullLc: letter count of the full original word
 */
function cleanWord(word, locale) {
  if (!word) return { clean: '', isCompound: false, fullLc: 0 };
  const w = word.trim();

  // Full letter count (all letters in the full expression)
  const fullLc = w.toLowerCase().replace(/[^a-z\u00c0-\u024f]/g, '').length;

  // Split on spaces and hyphens
  const parts = w.split(/[\s-]+/);
  const isCompound = parts.length > 1;

  // For analysis, use the primary (last) word for English, first word otherwise
  let primary;
  if (isCompound) {
    primary = locale === 'en' ? parts[parts.length - 1] : parts[0];
  } else {
    primary = w;
  }

  return { clean: primary.toLowerCase(), isCompound, fullLc };
}

// ============================================================
// COMPUTE PHONICS FOR ONE ENTRY
// ============================================================

function computePhonicsEn(word) {
  const { clean, isCompound, fullLc } = cleanWord(word, 'en');
  if (!clean) return null;

  const lc = clean.replace(/[^a-z]/g, '').length;
  if (lc === 0) return null;

  const syl = countSyllables(clean, 'en');
  const { pattern } = tokenize(clean, 'en');

  // Simplify pattern: collapse consecutive same types
  const simplifiedPattern = pattern.replace(/C{2,}/g, m => 'C'.repeat(m.length))
    .replace(/V{2,}/g, m => 'V'.repeat(m.length));

  const result = {
    syl,
    pat: simplifiedPattern,
    lc: fullLc, // letter count of the full word/phrase
  };

  // Mark compound words so apps can filter them out for pure CVC activities
  if (isCompound) result.cmp = true;

  // Only compute advanced phonics for single-syllable or simple words
  if (syl <= 2) {
    const phoneticOnset = getPhoneticOnset(clean);

    result.onset = phoneticOnset;
    result.rime = splitOnsetRime(clean).rime;

    const vs = classifyVowelSound(clean);
    if (vs) result.vs = vs;

    const wf = getWordFamily(clean, simplifiedPattern);
    if (wf) result.wf = wf;
  }

  return result;
}

function computePhonicsBasic(word, locale) {
  const { clean, isCompound, fullLc } = cleanWord(word, locale);
  if (!clean) return null;

  const lc = clean.replace(/[^a-z\u00c0-\u024f]/g, '').length;
  if (lc === 0) return null;

  const syl = countSyllables(clean, locale);
  const { pattern } = tokenize(clean, locale);

  const simplifiedPattern = pattern.replace(/C{2,}/g, m => 'C'.repeat(m.length))
    .replace(/V{2,}/g, m => 'V'.repeat(m.length));

  const result = {
    syl,
    pat: simplifiedPattern,
    lc: fullLc,
  };

  if (isCompound) result.cmp = true;

  return result;
}

// ============================================================
// MAIN
// ============================================================

function main() {
  console.log('Computing vocabulary phonics data...\n');

  const raw = JSON.parse(fs.readFileSync(RAW_PATH, 'utf8'));
  const keys = Object.keys(raw);
  console.log('Total vocabulary entries:', keys.length);

  const phonics = {};
  const stats = {
    totalPairs: 0,
    enCVC: 0,
    enWithWordFamily: 0,
    enWithVowelSound: 0,
    vowelSounds: {},
    wordFamilies: {},
    patternCounts: {},
    byLocale: {},
  };

  for (const locale of LOCALES) {
    stats.byLocale[locale] = { computed: 0, failed: 0 };
  }

  for (const key of keys) {
    const entry = raw[key];
    phonics[key] = {};

    for (const locale of LOCALES) {
      const word = entry[locale];
      if (!word) {
        stats.byLocale[locale].failed++;
        continue;
      }

      let result;
      if (locale === 'en') {
        result = computePhonicsEn(word);
      } else {
        result = computePhonicsBasic(word, locale);
      }

      if (result) {
        phonics[key][locale] = result;
        stats.totalPairs++;
        stats.byLocale[locale].computed++;

        // English-specific stats
        if (locale === 'en') {
          if (result.pat === 'CVC' && !result.cmp) stats.enCVC++;
          if (result.wf) {
            stats.enWithWordFamily++;
            stats.wordFamilies[result.wf] = (stats.wordFamilies[result.wf] || 0) + 1;
          }
          if (result.vs) {
            stats.enWithVowelSound++;
            stats.vowelSounds[result.vs] = (stats.vowelSounds[result.vs] || 0) + 1;
          }
          // Track pattern distribution
          const pat = result.pat;
          stats.patternCounts[pat] = (stats.patternCounts[pat] || 0) + 1;
        }
      } else {
        stats.byLocale[locale].failed++;
      }
    }
  }

  // Write output
  fs.writeFileSync(OUT_PATH, JSON.stringify(phonics, null, 2) + '\n', 'utf8');

  // Print summary
  console.log('\n=== Phonics Computation Complete ===');
  console.log('Total word-locale pairs computed:', stats.totalPairs);
  console.log('\nPer-locale:');
  for (const locale of LOCALES) {
    const s = stats.byLocale[locale];
    console.log('  ' + locale + ': ' + s.computed + ' computed, ' + s.failed + ' failed');
  }

  console.log('\n--- English-specific ---');
  console.log('Pure CVC words:', stats.enCVC);
  console.log('Words with word family:', stats.enWithWordFamily);
  console.log('Words with vowel sound:', stats.enWithVowelSound);

  console.log('\nEnglish vowel sound distribution:');
  for (const [vs, count] of Object.entries(stats.vowelSounds).sort((a, b) => b[1] - a[1])) {
    console.log('  ' + vs + ': ' + count);
  }

  console.log('\nEnglish word families (3+ members):');
  const families = Object.entries(stats.wordFamilies)
    .filter(([_, c]) => c >= 3)
    .sort((a, b) => b[1] - a[1]);
  for (const [wf, count] of families) {
    console.log('  ' + wf + ': ' + count);
  }

  console.log('\nEnglish pattern distribution (top 10):');
  const patterns = Object.entries(stats.patternCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  for (const [pat, count] of patterns) {
    console.log('  ' + pat + ': ' + count);
  }

  // Spot checks
  console.log('\n=== Spot Checks ===');
  const checks = ['cat', 'dog', 'sun', 'hat', 'bed', 'pig', 'fox', 'bus', 'map', 'net',
    'cake', 'kite', 'bone', 'frog', 'drum', 'ship', 'star', 'elephant', 'butterfly'];
  for (const k of checks) {
    if (phonics[k]) {
      const en = phonics[k].en;
      if (en) {
        const parts = ['pat=' + en.pat, 'syl=' + en.syl, 'lc=' + en.lc];
        if (en.onset !== undefined) parts.push('onset=' + en.onset);
        if (en.rime) parts.push('rime=' + en.rime);
        if (en.vs) parts.push('vs=' + en.vs);
        if (en.wf) parts.push('wf=' + en.wf);
        console.log(k + ' (' + raw[k].en + '): ' + parts.join(', '));
      }
    }
  }

  // Multi-language spot check
  console.log('\nMulti-language: cat');
  if (phonics['cat']) {
    for (const locale of LOCALES) {
      if (phonics['cat'][locale]) {
        console.log('  ' + locale + ' (' + raw['cat'][locale] + '): ' + JSON.stringify(phonics['cat'][locale]));
      }
    }
  }

  const fileSize = fs.statSync(OUT_PATH).size;
  console.log('\nOutput file:', OUT_PATH);
  console.log('File size:', (fileSize / 1024).toFixed(1) + ' KB');
}

main();
