#!/usr/bin/env node
/* Clean the harvested wardrobe before any page wears it.
 *
 * Autocomplete drifts. Seeded with our own type name "big or small" it offered
 * "does free people clothing run big or small"; "adding" plus "3 year old" gave
 * "adding 3 year old to magic key". Those are real queries — for other people.
 *
 * Three predicates, each MEASURED against the real bank rather than assumed,
 * because my first attempt at two of them over-blocked:
 *
 *   - "clothing worksheets for kids" was dropped because I had blacklisted
 *     "clothing" as off-domain. Clothing is one of our themes.
 *   - "4th of july worksheets for kids" was dropped because bare "4th" looked
 *     like fourth grade. It is a theme.
 *
 * Both are the same error I keep making: blocking a category when the problem
 * is one phrase inside it. The filters below target the drift itself.
 *
 * Usage: node scripts/seo-per-page/clean-bank.js --in=<progress-or-bank.json> --locale=en
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT_DIR = path.join(ROOT, 'docs', 'SEO', 'harvests', 'angles');

/** A phrase must be about children's learning material at all. */
const EDU = new RegExp('\\b(' + [
  'kids?', 'children', 'child', 'toddlers?', 'preschool\\w*', 'kindergarten\\w*',
  'grade', 'grader', 'students?', 'classroom', 'homeschool\\w*', 'teachers?',
  'worksheets?', 'printables?', 'activit(y|ies)', 'learning', 'educational',
  'early years', 'pre-?k', 'eyfs', 'reception', 'nursery', 'little ones',
  'practice', 'exercises?', 'puzzles?', 'games?', 'flashcards?', 'lesson',
].join('|') + ')\\b', 'i');

/** Drift, named specifically. Never a whole category we actually sell into. */
const OFF_DOMAIN = new RegExp('\\b(' + [
  'nyc', 'near me', 'magic key', 'run big or small', 'free size', 'free people',
  'resume', 'insurance', 'loan', 'casino', 'dating', 'for adults', 'for teens',
  'college', 'university', 'gcse', 'sat prep', 'act prep',
].join('|') + ')\\b', 'i');

/** Above our K-3 ceiling — must name a GRADE, so "4th of july" survives. */
const ABOVE_K3 = /\b(?:4th|5th|6th|7th|8th|9th|1[0-2]th|fourth|fifth|sixth|seventh|eighth)\s+grade\b|\b(?:middle|high)\s+school\b|\bgrade\s*(?:[4-9]|1[0-2])\b/i;

/** Promises a printable worksheet cannot keep. */
const WRONG_INTENT = new RegExp('(' + [
  'duolingo', 'babbel', 'rosetta', 'busuu', 'khan academy', '\\bixl\\b', 'twinkl',
  'teacherspayteachers', 'education\\.com', 'splashlearn', 'starfall',
  '\\bapps?\\b', 'youtube', 'netflix', '\\bmovies?\\b', '\\bcourse\\b', '\\bclasses\\b',
  '^how to\\b', '^is\\b', '^why\\b', '^what is\\b', '\\bsalary\\b', '\\bjobs?\\b',
].join('|') + ')', 'i');

function classify(q) {
  if (!EDU.test(q)) return 'no-edu-signal';
  if (OFF_DOMAIN.test(q)) return 'off-domain';
  if (ABOVE_K3.test(q)) return 'above-k3';
  if (WRONG_INTENT.test(q)) return 'wrong-intent';
  if (q.length < 10 || q.split(/\s+/).length < 2) return 'too-short';
  return 'keep';
}

function run(inFile, locale) {
  const raw = JSON.parse(fs.readFileSync(inFile, 'utf8'));
  // accept either a finished bank ({byGroup}) or a checkpoint ({bank})
  const entries = raw.bank
    ? Object.entries(raw.bank).map(([q, m]) => [q, m.group])
    : Object.entries(raw.byGroup || {}).flatMap(([g, list]) => list.map((q) => [q, g]));

  const kept = {};
  const dropped = {};
  let keep = 0;
  for (const [q, group] of entries) {
    const verdict = classify(q);
    if (verdict === 'keep') { (kept[group] = kept[group] || []).push(q); keep++; }
    else (dropped[verdict] = dropped[verdict] || []).push(q);
  }
  for (const g of Object.keys(kept)) kept[g].sort();

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const out = path.join(OUT_DIR, `${locale}.clean.json`);
  fs.writeFileSync(out, JSON.stringify({
    locale, total: keep, source: path.basename(inFile), byGroup: kept,
  }, null, 1));

  console.log(`[${locale}] ${entries.length} harvested -> ${keep} kept (${Math.round(keep / entries.length * 100)}%)`);
  for (const [why, list] of Object.entries(dropped).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`   dropped ${String(list.length).padStart(5)}  ${why.padEnd(15)} e.g. ${JSON.stringify(list.slice(0, 2))}`);
  }
  console.log('   kept by group:', Object.fromEntries(Object.entries(kept).map(([g, l]) => [g, l.length])));
  console.log(`   -> ${path.relative(ROOT, out)}`);
  return { kept, keep };
}

if (require.main === module) {
  const a = process.argv.slice(2);
  const inFile = (a.find((x) => x.startsWith('--in=')) || '').split('=')[1];
  const locale = (a.find((x) => x.startsWith('--locale=')) || '').split('=')[1] || 'en';
  if (!inFile) { console.error('--in=<file> required'); process.exit(2); }
  run(inFile, locale);
}

module.exports = { classify, run, EDU, OFF_DOMAIN, ABOVE_K3, WRONG_INTENT };
