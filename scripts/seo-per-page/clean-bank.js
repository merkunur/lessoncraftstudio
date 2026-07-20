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
  // A printable is not a book, a DVD or a physical product. "learn german for
  // kids book" was assigned to a crossword page. \\bbook\\b leaves "workbook"
  // intact, since that is a single token.
  '\\bbooks?\\b', '\\bdvds?\\b', '\\bcds?\\b', 'subscription', '\\btoys?\\b', 'amazon',
  // Wrong audience, or teacher admin we do not make. Assigning "Free Printable
  // Games for Seniors" to a kindergarten treasure hunt, or "Homeschool
  // Assessment Test" to a word search, promises something that is not there.
  '\\bseniors?\\b', '\\belderly\\b', '\\badults?\\b', 'gradebook', 'grade book',
  '\\bassessment\\b', '\\btests?\\b', '\\bexams?\\b', 'certificate', '\\bawards?\\b',
  'lesson plan', 'report card', 'attendance', '\\broster\\b', '\\bplanner\\b',
  // Classroom decor we do not publish. "Printable English Posters for the
  // Classroom" reached a treasure-hunt page: it passed because "printable" is
  // an artefact word, though a poster is not what is on the other end.
  '\\bposters?\\b', '\\bbanners?\\b', '\\bbunting\\b', '\\bdecor\\b',
  '\\bdisplay\\b', '\\blabels?\\b', '\\bname tags?\\b', '\\bborders?\\b',
  '\\btemplates?\\b',
  /* SPECIAL EDUCATIONAL NEEDS — never claimed.
   *
   * "free printable worksheets for autistic students" was fitted to a generic
   * German crossword. A parent searching that needs materials genuinely designed
   * for their child — predictable structure, reduced sensory load, considered
   * language — and we publish none. Taking that click is worse than missing it:
   * it wastes the time of someone who had little to spare, on a promise we
   * cannot keep. This is not an SEO trade-off. */
  'autis\\w*', '\\basd\\b', '\\badhd\\b', 'dyslexi\\w*', 'dyspraxi\\w*',
  'special needs', 'special education', '\\bsen\\b', '\\bsend\\b', '\\biep\\b',
  'speech therapy', 'occupational therapy', 'sensory', 'down syndrome',
  'learning disab\\w*', 'nonverbal', 'non-verbal',
].join('|') + ')', 'i');

/* TWO signals, not one.
 *
 * A single education-ish word was not enough. The wide filter passed
 * "easy games to platinum ps5" (games), "easy piano sheet for children"
 * (children), "4th of july game world cup" (game) and "easy practice 5 libro
 * digitale" (practice) — and those reached real page titles before I read the
 * output and stopped it.
 *
 * A usable phrase must name BOTH a printable artefact we actually publish AND a
 * child or school audience. That takes the bank from 9,113 to 3,017, and what
 * survives is uniformly the sort of thing on this site.
 */
const ARTEFACT = /\b(worksheets?|printables?|activity sheets?|activity pages?|practice sheets?|work sheets?|handouts?|workbooks?|flash ?cards?|task cards?|colouring pages?|coloring pages?|word ?search(es)?|crosswords?|puzzles?|mazes?|cut and paste|tracing|matching|sorting|bingo|sudoku)\b/i;
const AUDIENCE = /\b(kids?|children|child|toddlers?|preschool\w*|kindergarten\w*|pre-?k|nursery|reception|eyfs|early years|students?|classroom|homeschool\w*|grade\s*[1-3]|1st grade|2nd grade|3rd grade|[3-8]\s*year olds?|little ones)\b/i;

function classify(q) {
  if (!ARTEFACT.test(q)) return 'not-a-printable';
  if (!AUDIENCE.test(q)) return 'no-child-audience';
  /* The old single-signal EDU test is NOT applied here any more. It is
   * subsumed by ARTEFACT + AUDIENCE, which is strictly stronger, and left in
   * the chain it only produced false rejections: "workbooks for 5 year olds"
   * was thrown out as having no education signal, because EDU happened not to
   * list "workbook". Kept as an export for the earlier callers. */
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
