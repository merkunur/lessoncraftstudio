#!/usr/bin/env node
/**
 * Build the per-deck vocabulary map that lets a thumbnail's alt text say what is
 * actually on the sheet.
 *
 * Today every deck thumbnail on a topic hub carries the same shape of sentence —
 * "Preview of Word Scramble worksheet featuring Furniture for grade 1" — which
 * describes the CATEGORY, not the picture. `buildOgImageAlt` already has a
 * `{vocab}` slot and already has native templates in all 11 locales; nothing has
 * ever filled it. This fills it.
 *
 *   before  Free interactive Word Search worksheet (Animals) for kindergarten.
 *   after   Free interactive Word Search worksheet (Animals) for kindergarten:
 *           owl, giraffe, and panda.
 *
 * Output: frontend/content/deck-vocab/<locale>.json — { "<deck-slug>": [names] }
 * Read at render by frontend/lib/seo/deck-vocab.ts.
 *
 * TWO HONESTY RULES, both learned by reading the extracted data rather than
 * assuming, and both of which would otherwise have shipped lies:
 *
 *  1. `nouns` are ENGLISH image-library keys in EVERY locale — the German facts
 *     for a German deck still say "cake", "us", "hotdog". Dropping them into a
 *     German page would print English nouns to German readers. They are
 *     translated here through image-vocabulary.js (§6, read-only per §10.3), at
 *     BUILD time, so nothing is looked up at render.
 *
 *  2. For word puzzles, `nouns` is the theme's image POOL, not what is printed.
 *     A wordsearch deck lists 12 nouns and contains no pictures at all — its 6
 *     printed words are in `words`. Naming pool nouns would describe a picture
 *     that is not there. So word puzzles use `words` exclusively.
 *
 * Cryptogram is excluded outright: it decodes a sentence and has no vocabulary.
 *
 * Usage: node scripts/seo-per-page/build-deck-vocab.js [--locale=en] [--check]
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const FACTS_DIR = path.join(ROOT, 'docs', 'seo-per-page', 'deck-facts');
const OUT_DIR = path.join(ROOT, 'frontend', 'content', 'deck-vocab');
const VOCAB_JS = path.join(ROOT, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js');

const LOCALES = ['en', 'de', 'es', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi', 'pt'];

/** Puzzle families whose `nouns` is a theme pool rather than what is depicted. */
const WORD_PUZZLE_TYPES = new Set(['wordsearch', 'crossword', 'word-scramble', 'word-guess']);
/** No vocabulary at all — a decoded sentence. */
const EXCLUDED_TYPES = new Set(['cryptogram']);

/** How many names an alt sentence can carry before it stops being a sentence. */
const MAX_NAMES = 3;

/** Read IMAGE_VOCABULARY out of the reference file without executing it. */
function loadVocabulary() {
  const src = fs.readFileSync(VOCAB_JS, 'utf8');
  const m = src.match(/const IMAGE_VOCABULARY = (\{[\s\S]*?\n\});/);
  if (!m) throw new Error('image-vocabulary.js: IMAGE_VOCABULARY object not found');
  return JSON.parse(m[1]);
}

/**
 * Image-library key for a noun as the extractor recorded it.
 * The extractor kept human spacing ("french fries"); the vocabulary is keyed
 * with hyphens ("french-fries").
 */
function vocabKey(noun) {
  return String(noun)
    .toLowerCase()
    // upload residue: "pig 1769383293282 maf6gj" — a timestamp and a random id
    .replace(/\s+\d{6,}\b.*$/, '')
    // duplicate marker: "cat 2" is still a cat
    .replace(/\s+\d+$/, '')
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * Strip the same residue from a printed word, and undo shouting.
 *
 * Only word-puzzle families shout — a wordsearch prints SCHWAN, ANTILOPE in its
 * grid — so de-shouting is scoped to them. The picture families already store
 * properly-cased labels ("Kuchen", "USA", "Hotdog"), and lower-casing those
 * turned USA into "Usa".
 *
 * Short all-caps tokens are left alone even inside a puzzle, because they are
 * acronyms rather than shouting: USA and US are not "Usa" and "Us".
 */
function cleanPrinted(word, deShout) {
  const w = String(word).replace(/\s+\d{6,}\b.*$/, '').replace(/\s+\d+$/, '').trim();
  if (!w) return null;
  if (!deShout) return w;
  if (w.length <= 3) return w; // acronym, not shouting
  if (w === w.toUpperCase() && /\p{Lu}/u.test(w)) {
    return w.charAt(0) + w.slice(1).toLowerCase();
  }
  return w;
}

function dedupeCap(names) {
  const seen = new Set();
  const out = [];
  for (const n of names) {
    if (!n) continue;
    const k = n.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(n);
    if (out.length >= MAX_NAMES) break;
  }
  return out;
}

/**
 * The names this deck may honestly claim are on its sheet, in `locale`.
 * Returns [] when nothing can be claimed — the alt text then keeps its current
 * (vocab-free) wording, which is the correct outcome, not a failure.
 */
function namesFor(facts, locale, vocabulary, stats) {
  const type = String(facts.type || '');
  if (EXCLUDED_TYPES.has(type)) { stats.excludedType++; return []; }

  const isPuzzle = WORD_PUZZLE_TYPES.has(type);
  const printed = dedupeCap((facts.words || []).map((w) => cleanPrinted(w, isPuzzle)));

  // Rule 2: word puzzles may only name what is printed.
  if (isPuzzle) {
    if (!printed.length) stats.wordPuzzleNoWords++;
    return printed;
  }

  // Picture families: the printed labels are already in the deck's language and
  // are genuinely on the page, so they beat a translation lookup.
  if (printed.length) return printed;

  // Rule 1: fall back to image nouns, TRANSLATED — never the raw English key.
  const translated = [];
  for (const noun of facts.nouns || []) {
    const key = vocabKey(noun);
    const entry = vocabulary[key];
    if (!entry) { stats.unknownKeys.add(key); continue; }
    const forms = entry[locale];
    if (!forms || !forms[0]) { stats.missingLocaleForm++; continue; }
    translated.push(forms[0]);
    if (translated.length >= MAX_NAMES * 2) break; // room for dedupe
  }
  if (!translated.length && (facts.nouns || []).length) stats.nounsAllUnresolved++;
  return dedupeCap(translated);
}

function buildLocale(locale, vocabulary) {
  const factsPath = path.join(FACTS_DIR, `${locale}.json`);
  if (!fs.existsSync(factsPath)) {
    console.log(`[${locale}] no facts file — skipped`);
    return null;
  }
  const decks = JSON.parse(fs.readFileSync(factsPath, 'utf8')).decks;
  const stats = {
    total: 0, withNames: 0, excludedType: 0, wordPuzzleNoWords: 0,
    missingLocaleForm: 0, nounsAllUnresolved: 0, unknownKeys: new Set(),
  };

  const map = {};
  for (const facts of Object.values(decks)) {
    stats.total++;
    if (!facts.slug) continue;
    const names = namesFor(facts, locale, vocabulary, stats);
    if (names.length) { map[facts.slug] = names; stats.withNames++; }
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const out = path.join(OUT_DIR, `${locale}.json`);
  fs.writeFileSync(out, JSON.stringify(map, null, 0));

  const pct = Math.round((stats.withNames / stats.total) * 100);
  console.log(
    `[${locale}] ${stats.withNames}/${stats.total} decks (${pct}%) gain real vocabulary`
    + `  | cryptogram skipped ${stats.excludedType}`
    + `, word-puzzle w/o printed words ${stats.wordPuzzleNoWords}`
    + `, unresolved noun keys ${stats.unknownKeys.size}`
    + `  -> ${path.relative(ROOT, out)} (${Math.round(fs.statSync(out).size / 1024)} KB)`,
  );
  if (stats.unknownKeys.size) {
    console.log(`        e.g. unresolved: ${[...stats.unknownKeys].slice(0, 6).join(', ')}`);
  }
  return { locale, ...stats, unknownKeys: [...stats.unknownKeys] };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const only = (args.find((a) => a.startsWith('--locale=')) || '').split('=')[1];
  const vocabulary = loadVocabulary();
  console.log(`image-vocabulary.js: ${Object.keys(vocabulary).length} entries loaded (read-only)\n`);
  const targets = only ? [only] : LOCALES;
  for (const loc of targets) buildLocale(loc, vocabulary);
}

module.exports = { namesFor, vocabKey, cleanPrinted, loadVocabulary, WORD_PUZZLE_TYPES, EXCLUDED_TYPES };
