#!/usr/bin/env node
/* Dress each page: title, h1 and metaDescription from its assigned phrase plus
 * its own facts. Deterministic, no LLM, whole corpus in minutes.
 *
 * Measured on the live corpus before this ran:
 *   title 90% share a skeleton (worst repeat 468 pages)
 *   meta  90% (worst 468)
 *   h1    71% (worst 25)
 *
 * TITLE is easy: the assigned phrase is already unique per page, and real
 * queries differ in WORDING, not just in nouns, so the skeletons differ too.
 *
 * H1 and META are the trap. Twenty hand-written frames would put 3,793 pages on
 * twenty skeletons and my own gate would fail it — correctly. Writing two
 * hundred frames instead is curation, and curation is what I have got wrong at
 * every step of this work.
 *
 * So they are built the way the harvest seeds were built: small CLAUSE BANKS
 * crossed combinatorially. ~15 x ~15 x ~10 gives ~2,000 skeletons from forty
 * short pieces, chosen per page by a stable hash of its slug and filled with
 * that page's own facts. Cheap, varied, and nothing curated into a house style.
 *
 * Usage:
 *   node scripts/seo-per-page/dress-pages.js --locale=en          (report + samples)
 *   node scripts/seo-per-page/dress-pages.js --locale=en --write
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..', '..');
const LANDING_DIR = path.join(ROOT, 'frontend', 'content', 'seo-landing');
const FACTS_DIR = path.join(ROOT, 'docs', 'seo-per-page', 'deck-facts');
const ASSIGN_DIR = path.join(ROOT, 'docs', 'seo-per-page', 'assignments');

const META_MIN = 120;
const META_MAX = 170;

/* Stable per-page choice: same page always dresses the same way, and two pages
 * rarely collide because the hash spreads over ~2,000 combinations. */
function pick(list, slug, salt) {
  const h = crypto.createHash('sha1').update(slug + '|' + salt).digest();
  return list[h.readUInt32BE(0) % list.length];
}

/* ---- clause banks: short pieces, crossed, never whole sentences ---- */

const H1_OPEN = [
  'Print and go', 'One sheet', 'A quiet ten minutes', 'Ready to print',
  'No preparation needed', 'A single page', 'Grab a pencil', 'Everything on one page',
  'Straight from the printer', 'A calm activity', 'Made for small hands',
  'Simple to set up', 'Pencils out', 'One page, one task', 'A gentle challenge',
];
const H1_MID = [
  'that works on {subject}', 'for practising {subject}', 'built around {subject}',
  'to give {subject} a workout', 'where the focus is {subject}', 'aimed at {subject}',
  'that keeps {subject} interesting', 'turning {subject} into something to finish',
  'with {subject} at the centre', 'for children working on {subject}',
  'that puts {subject} in front of a child', 'shaped around {subject}',
  'so {subject} gets a proper turn', 'letting a child practise {subject}',
  'made to rehearse {subject}',
];
const H1_CLOSE = [
  'with {theme} pictures', 'using {theme}', 'on a {theme} page',
  'illustrated with {theme}', 'set among {theme}', 'dressed in {theme}',
  'and a {theme} border', 'against a {theme} backdrop', 'with {theme} to look at',
  'wrapped in {theme}',
];

const META_OPEN = [
  'Print this {noun} and hand it over.', 'One page, no preparation.',
  'A {noun} you can print in seconds.', 'Ready for the printer.',
  'Free to download and print.', 'A single sheet, nothing to cut out.',
  'Print it once, use it all week.', 'Download, print, done.',
  'A {noun} that needs no setup.', 'Straight to the printer, no fuss.',
  'One sheet you can print now.', 'A quick {noun} to print at home.',
  'Print at home or in class.', 'No prep, no laminating.',
  'A {noun} for the printer tray.',
];
const META_MID = [
  'It gives {level} children practice with {subject}',
  'Children work on {subject} while they go',
  'The task is {subject}, kept simple for {level}',
  'It asks a child to work through {subject}',
  'Aimed at {level}, focused on {subject}',
  'The practice here is {subject}',
  'Built for {level} and centred on {subject}',
  'A child practises {subject} without noticing',
  'It puts {subject} in front of a {level} child',
  'The whole page is {subject}',
  'Good for {level} children meeting {subject}',
  'It rehearses {subject} at {level} pace',
  'Made so {level} children can do {subject} alone',
  'The skill on offer is {subject}',
  'It walks a {level} child through {subject}',
];
const META_CLOSE = [
  'with {theme} to keep it friendly.', 'and {theme} throughout.',
  'illustrated with {theme}.', 'using {theme} pictures.',
  'on a {theme} page.', 'with {theme} for company.',
  'and a {theme} look.', 'wrapped around {theme}.',
  'with {theme} on every row.', 'and {theme} to colour the page.',
];

/* ---- describing the page in its own words ---- */

const SUBJECT_BY_TYPE = {
  wordsearch: 'hunting words in a letter grid', crossword: 'fitting words into a grid',
  'word-scramble': 'unscrambling words', 'word-guess': 'guessing the hidden word',
  matching: 'matching pictures to words', 'find-and-count': 'spotting and counting',
  'alphabet-train': 'putting letters in order', addition: 'adding small numbers',
  subtraction: 'taking away', 'code-addition': 'adding with a picture code',
  'math-worksheet': 'working through sums', 'math-puzzle': 'a number puzzle',
  'chart-count': 'counting and graphing', 'graphing-data': 'reading a picture graph',
  'counting-pictures': 'counting pictures', 'counting-frames': 'counting on a ten frame',
  'big-small': 'comparing sizes', 'more-less': 'comparing groups',
  'comparing-numbers': 'comparing numbers', 'comparing-sizes': 'ordering by size',
  'pattern-train': 'continuing a pattern', 'pattern-worksheet': 'finishing patterns',
  patterns: 'spotting a pattern', 'picture-sort': 'sorting into groups',
  'shadow-match': 'matching shapes to shadows', 'grid-match': 'copying a grid',
  'missing-pieces': 'finding the missing piece', sudoku: 'a picture sudoku',
  bingo: 'a picture bingo board', prepositions: 'position words',
  'find-objects': 'finding hidden objects', 'odd-one-out': 'spotting the odd one out',
  'picture-path': 'following a path', 'picture-trail': 'following a trail',
  'treasure-hunt': 'following directions', geometry: 'naming shapes',
  measurement: 'measuring', 'telling-time': 'reading a clock', fractions: 'halves and quarters',
  'number-charts': 'a number chart', 'number-lines': 'a number line',
  'base-ten': 'tens and ones', 'tally-counting': 'tally marks',
  'arrays-multiplication': 'arrays', 'picture-arithmetic': 'sums with pictures',
  cryptogram: 'decoding a message', 'letter-knowledge': 'letter recognition',
  'beginning-sounds': 'first sounds', 'science-match': 'matching in science',
  'science-sequence': 'putting a life cycle in order', 'visual-discrimination': 'looking closely',
  'visual-logic': 'a looking-and-thinking puzzle', 'visual-matching': 'matching by eye',
  'sorting-categories': 'sorting things out', 'position-words': 'where things are',
};

const LEVEL_SPOKEN = {
  preschool: 'preschool', kindergarten: 'kindergarten', 'grade-1': 'Year 1',
  'grade-2': 'Year 2', 'grade-3': 'Year 3', 'language-beginner': 'beginner',
};

function titleCase(s) {
  const small = new Set(['a', 'an', 'and', 'at', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'with', 'from']);
  return String(s).split(/\s+/).map((w, i) => {
    if (i > 0 && small.has(w.toLowerCase())) return w.toLowerCase();
    if (/^[A-ZÆØÅÄÖÜ]{2,}$/.test(w)) return w;          // keep real word-list capitals
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
}

function fill(tpl, vars) {
  return tpl.replace(/\{(\w+)\}/g, (_, k) => vars[k] || '');
}

function buildThemeWord(themeKey, themeName, facts) {
  // prefer what is really pictured; fall back to the theme's spoken name
  const nouns = (facts && facts.nouns) || [];
  if (nouns.length >= 2) return `${nouns[0]}, ${nouns[1]} and more`;
  if (nouns.length === 1) return nouns[0];
  return themeName || String(themeKey || '').replace(/[-_]/g, ' ');
}

function dress(page, facts, themeName, assignment, opts) {
  const c = page.coordinate || {};
  const phrase = assignment && assignment.phrase;
  if (!phrase) return null;

  const subject = SUBJECT_BY_TYPE[c.type] || 'this activity';
  const level = LEVEL_SPOKEN[c.level] || 'young';
  const theme = buildThemeWord(c.theme, themeName, facts);
  const noun = /puzzle|game/i.test(phrase) ? 'puzzle' : 'worksheet';
  const vars = { subject, level, theme, noun };

  /* TITLE ONLY. The clause-crossing above is kept for reference but is NOT used.
   *
   * Crossing clause banks gave ~2,000 skeletons and unreadable English:
   *   "Pencils out made to rehearse following directions set among 4th of july"
   *   "...in front of a child on a animals page"
   * I had optimised for the skeleton metric and produced word salad. A parent
   * who reads that leaves, which is worse for the page than a repeated frame.
   *
   * Title is where the measured harm is (90% shared skeleton, one skeleton
   * across 468 pages) and it is the SERP line and the ranking signal. The
   * existing h1 and meta are readable; they stay until they can be improved
   * without wrecking the language, which is separate, considered work — not
   * something to bolt on because a gauge asked for it.
   */
  return { title: titleCase(phrase) };
}

function run(locale, opts) {
  const landings = JSON.parse(fs.readFileSync(path.join(LANDING_DIR, `${locale}.json`), 'utf8'));
  const facts = new Map((JSON.parse(fs.readFileSync(
    path.join(FACTS_DIR, `${locale}.json`), 'utf8')).decks || []).map((d) => [d.slug, d]));
  const assign = new Map(JSON.parse(fs.readFileSync(
    path.join(ASSIGN_DIR, `${locale}.json`), 'utf8')).assignments.map((a) => [a.slug, a]));

  const tax = JSON.parse(fs.readFileSync(
    path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'), 'utf8')).axes || {};
  const themeName = new Map();
  for (const [k, e] of Object.entries(tax.theme || {})) {
    const n = (e.name && (e.name[locale] || e.name.en)) || k.replace(/_/g, ' ');
    themeName.set(k, String(n).toLowerCase().replace(/\s+\d+$/, '').trim());
  }

  let dressed = 0; let skipped = 0;
  const outOfBand = [];
  for (const l of landings.landings) {
    const a = assign.get(l.slug);
    const f = facts.get(l.canonicalDeckSlug);
    const c = l.coordinate || {};
    const d = dress(l, f, themeName.get(String(c.theme || '').split('-vs-')[0]), a, opts);
    if (!d) { skipped++; continue; }
    if (opts.write) { l.title = d.title; }
    else if (dressed < 12) {
      console.log(`  ${String(l.slug).slice(0, 38).padEnd(40)} ${d.title}`);
    }
    dressed++;
  }

  console.log(`\n[${locale}] dressed ${dressed}, skipped ${skipped}, meta out of band ${outOfBand.length}`);


  if (opts.write) {
    fs.writeFileSync(path.join(LANDING_DIR, `${locale}.json`), JSON.stringify(landings, null, 1));
    console.log(`   WROTE ${locale}.json — title only.`);
  }
}

if (require.main === module) {
  const a = process.argv.slice(2);
  const locale = (a.find((x) => x.startsWith('--locale=')) || '').split('=')[1] || 'en';
  run(locale, { write: a.includes('--write') });
}

module.exports = { dress, run };
