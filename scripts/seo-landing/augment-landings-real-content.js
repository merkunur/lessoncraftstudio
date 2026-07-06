#!/usr/bin/env node
/**
 * augment-landings-real-content.js — SEO real-cause program Unit 3 (2026-07-06).
 *
 * THE PROBLEM: the ~30k /worksheets/ landings carry slot-filled near-duplicate
 * prose (p1/p2/p3 differ only by theme tokens) → Google refuses to index them.
 * THE FIX ("differentiate in place", operator-locked): surface each deck's REAL
 * content — the actual word bank, sample problems, image nouns, deck stats and
 * generation date — as landing-page sections. That data lives ONLY on Hetzner
 * (per-deck manifest.json under /var/www/lcs-media/decks/), so this script runs
 * there and writes a per-locale AUGMENT file that render-landing-html.js merges
 * at render time. The 97MB git landing JSONs stay byte-untouched.
 *
 * Output: /var/www/lcs-media/landings-augment/<locale>.json
 *   { "<landing slug>": { realWords?, sampleProblems?, imageNouns?,
 *                         deckStats {problems,words,images}, siblingThumbs?,
 *                         contentDate } }
 *
 * ANSWER-BEARING HYGIENE (§17.8.9 extension, per the approved plan):
 *   - SHOW word banks where the words are PRINTED ON the worksheet itself
 *     (wordsearch word bank, find-and-count targets, matching item nouns,
 *     picture nouns generally — the pictures show them anyway).
 *   - NEVER show: cryptogram solution phrases, word-guess / word-scramble
 *     solution words, crossword answers, computed sums/results (sample
 *     problems are emitted WITHOUT results: "5 + 4 = ?").
 *
 * Usage (on Hetzner):
 *   node scripts/seo-landing/augment-landings-real-content.js --locales=en --dry-run
 *   node scripts/seo-landing/augment-landings-real-content.js --locales=all
 */
'use strict';

const fs = require('fs');
const path = require('path');

const REPO_CANDIDATES = [path.resolve(__dirname, '..', '..'), '/opt/lessoncraftstudio'];
function repoRoot() {
  for (const r of REPO_CANDIDATES) {
    if (fs.existsSync(path.join(r, 'frontend', 'config', 'topics-taxonomy.json'))) return r;
  }
  throw new Error('repo root not found');
}
const ROOT = repoRoot();
const LANDING_DIRS = [
  path.join(ROOT, 'content-data', 'seo-landing'),
  path.join(ROOT, 'frontend', 'content', 'seo-landing'),
];
const DECKS_DIR = process.env.LCS_DECKS_DIR || '/var/www/lcs-media/decks';
const OUT_DIR = process.env.LCS_AUGMENT_DIR || '/var/www/lcs-media/landings-augment';
const ALL_LOCALES = ['en', 'de', 'es', 'sv', 'nl', 'da', 'it', 'no', 'fr', 'pt', 'fi'];

/* ------------------------- per-type policy registry ------------------------- */

// Types whose word bank is printed on the worksheet → the words may be SHOWN.
const WORD_BANK_TYPES = new Set(['wordsearch', 'find-and-count']);

// Types whose picture nouns are visible on the sheet → nouns may be SHOWN.
// (The task is never "name the noun"; it is match/sort/count/compare/etc.)
const NOUN_TYPES = new Set([
  'matching', 'alphabet-train', 'picture-sort', 'prepositions', 'pattern-train',
  'pattern-worksheet', 'more-less', 'big-small', 'odd-one-out', 'shadow-match',
  'grid-match', 'bingo', 'chart-count', 'missing-pieces', 'find-objects',
  'treasure-hunt', 'sudoku', 'picture-trail', 'wordsearch', 'find-and-count',
]);

// Math types → sample problems WITHOUT results.
const MATH_TYPES = new Set(['addition', 'subtraction', 'code-addition', 'math-puzzle', 'math-worksheet']);

// Types whose word/phrase content IS the answer → never emit words/nouns.
const HIDE_WORD_TYPES = new Set(['cryptogram', 'word-guess', 'word-scramble', 'crossword']);

/* ------------------------------- helpers ------------------------------- */

function readJsonSafe(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { return null; }
}

function titleCaseWord(s) {
  // NOT regex-\b based (\b is ASCII-only → "fäustling" would become "FÄUstling").
  return String(s).trim().split(/\s+/).map((w) => {
    const lower = w === w.toUpperCase() ? w.toLowerCase() : w; // de-shout ALL-CAPS, keep native casing otherwise
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }).join(' ');
}

/** "balloon-1769383001639-820917d0.webp" → "Balloon"; "uncle-sam-...webp" → "Uncle Sam"; "cat 2" → "Cat" */
function nounFromFilename(fn) {
  let base = String(fn).replace(/\.(webp|png|jpg|jpeg)$/i, '');
  base = base.replace(/-\d{10,}-[0-9a-f]{6,}$/i, '');
  base = base.replace(/[-_]/g, ' ').replace(/\s+\d+$/, '').trim();
  if (!base || /^c[a-z0-9]{20,30}$/.test(base)) return null; // CUID upload dirs
  return titleCaseWord(base);
}

function uniq(arr) {
  const seen = new Set();
  const out = [];
  for (const x of arr) {
    if (x == null) continue;
    const k = String(x).toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(x);
  }
  return out;
}

function extractNouns(manifest) {
  const out = [];
  for (const ex of manifest.exercises || []) {
    if (ex && ex.image && (ex.image.word || ex.image.name)) out.push(titleCaseWord(ex.image.word || ex.image.name));
    if (ex && ex.leftValue && typeof ex.leftValue === 'object' && (ex.leftValue.word || ex.leftValue.name)) {
      out.push(titleCaseWord(ex.leftValue.word || ex.leftValue.name));
    }
  }
  if (out.length === 0 && Array.isArray(manifest.vocabulary)) {
    for (const v of manifest.vocabulary) {
      if (typeof v === 'string') out.push(titleCaseWord(v));
      else if (v && (v.word || v.name)) out.push(titleCaseWord(v.word || v.name));
    }
  }
  if (out.length === 0) {
    for (const f of manifest.images_used || []) {
      const n = nounFromFilename(typeof f === 'string' ? f : (f && f.path) || '');
      if (n) out.push(n);
    }
  }
  return uniq(out).slice(0, 24);
}

function extractWordBank(manifest, type) {
  if (type === 'wordsearch') {
    const words = (manifest.exercises || []).map((e) => e && e.word).filter(Boolean).map(titleCaseWord);
    if (words.length) return uniq(words);
    return uniq((manifest.vocabulary || []).filter((v) => typeof v === 'string').map(titleCaseWord));
  }
  if (type === 'find-and-count') {
    const t = [];
    for (const ex of manifest.exercises || []) {
      if (ex && ex.targetWords) t.push(...[].concat(ex.targetWords));
      if (ex && ex.targetWord) t.push(ex.targetWord);
    }
    if (t.length) return uniq(t.map(titleCaseWord));
    return uniq((manifest.vocabulary || []).filter((v) => typeof v === 'string').map(titleCaseWord));
  }
  return [];
}

function extractSampleProblems(manifest, type) {
  const op = type === 'subtraction' ? '−' : '+';
  const out = [];
  for (const ex of manifest.exercises || []) {
    if (!ex) continue;
    const a = ex.operandA != null ? ex.operandA : ex.a;
    const b = ex.operandB != null ? ex.operandB : ex.b;
    if (typeof a === 'number' && typeof b === 'number') {
      out.push(`${a} ${op} ${b} = ?`); // results are answer-bearing — never emitted
    }
  }
  return out.slice(0, 6);
}

function manifestPath(locale, deckSlug) {
  return path.join(DECKS_DIR, locale, deckSlug, 'manifest.json');
}

function augmentForLanding(locale, l) {
  const type = l.coordinate && l.coordinate.type;
  const manifest = readJsonSafe(manifestPath(locale, l.canonicalDeckSlug));
  const out = {};

  if (manifest) {
    if (!HIDE_WORD_TYPES.has(type)) {
      const bank = WORD_BANK_TYPES.has(type) ? extractWordBank(manifest, type) : [];
      if (bank.length >= 3) out.realWords = bank;
      if (NOUN_TYPES.has(type)) {
        const nouns = extractNouns(manifest);
        // Don't duplicate: nouns only when materially different from the bank.
        if (nouns.length >= 3 && (!out.realWords || nouns.join() !== out.realWords.join())) out.imageNouns = nouns;
      }
    }
    if (MATH_TYPES.has(type)) {
      const probs = extractSampleProblems(manifest, type);
      if (probs.length >= 2) out.sampleProblems = probs;
      // Math sheets show picture nouns too (the counting objects).
      const nouns = extractNouns(manifest);
      if (nouns.length >= 3) out.imageNouns = nouns;
    }
    const stats = {};
    if (Array.isArray(manifest.exercises) && manifest.exercises.length) stats.problems = manifest.exercises.length;
    if (out.realWords) stats.words = out.realWords.length;
    if (Array.isArray(manifest.images_used) && manifest.images_used.length) stats.images = manifest.images_used.length;
    if (Object.keys(stats).length) out.deckStats = stats;
    if (manifest.generated_at && /^\d{4}-\d{2}-\d{2}/.test(manifest.generated_at)) {
      out.contentDate = manifest.generated_at.slice(0, 10);
    }
  }

  // Sibling thumbnails (collapsed landings): real preview images of the other
  // decks this landing covers. Slugs only — renderer derives thumbnail URLs.
  if (Array.isArray(l.collapseSiblings) && l.collapseSiblings.length) {
    const sibs = l.collapseSiblings.filter((s) => s && s !== l.canonicalDeckSlug).slice(0, 4);
    if (sibs.length) out.siblingThumbs = sibs;
  }

  return Object.keys(out).length ? out : null;
}

/* ------------------------------- main ------------------------------- */

function parseArgs() {
  const args = { locales: ALL_LOCALES, dryRun: false };
  for (const a of process.argv.slice(2)) {
    if (a.startsWith('--locales=')) {
      const v = a.slice(10);
      args.locales = v === 'all' ? ALL_LOCALES.slice() : v.split(',');
    } else if (a === '--dry-run') args.dryRun = true;
    else { console.error('unknown arg: ' + a); process.exit(2); }
  }
  return args;
}

function main() {
  const args = parseArgs();
  const t0 = Date.now();
  if (!args.dryRun) fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const locale of args.locales) {
    let file = null;
    for (const dir of LANDING_DIRS) {
      const p = path.join(dir, `${locale}.json`);
      if (fs.existsSync(p)) { file = JSON.parse(fs.readFileSync(p, 'utf8')); break; }
    }
    if (!file) { console.warn(`(no landings for ${locale} — skipped)`); continue; }

    const aug = {};
    const perType = {};
    let withManifest = 0;
    for (const l of file.landings) {
      const a = augmentForLanding(locale, l);
      const type = (l.coordinate && l.coordinate.type) || '?';
      perType[type] = perType[type] || { total: 0, augmented: 0, words: 0, problems: 0 };
      perType[type].total++;
      if (a) {
        aug[l.slug] = a;
        perType[type].augmented++;
        if (a.realWords) perType[type].words++;
        if (a.sampleProblems) perType[type].problems++;
        if (a.contentDate || a.deckStats) withManifest++;
      }
    }

    const covered = Object.keys(aug).length;
    console.log(`${locale}: ${covered}/${file.landings.length} landings augmented (${withManifest} with manifest data)`);
    const weak = Object.entries(perType).filter(([, v]) => v.augmented < v.total * 0.5).map(([k, v]) => `${k}:${v.augmented}/${v.total}`);
    if (weak.length) console.log(`  weak coverage: ${weak.join(' ')}`);

    if (!args.dryRun) {
      const outPath = path.join(OUT_DIR, `${locale}.json`);
      const tmp = `${outPath}.tmp-${process.pid}`;
      fs.writeFileSync(tmp, JSON.stringify(aug), 'utf8');
      fs.renameSync(tmp, outPath);
    }
  }
  console.log(`DONE in ${((Date.now() - t0) / 1000).toFixed(1)}s${args.dryRun ? ' (dry-run, nothing written)' : ' → ' + OUT_DIR}`);
}

main();
