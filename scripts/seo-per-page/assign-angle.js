#!/usr/bin/env node
/* Fit every page with a phrase people really type.
 *
 * 3,771 of 3,793 en pages sit in a group whose only difference is decorative
 * theme — 330 are the same kindergarten beginning-sounds sheet. They cannot all
 * win "beginning sounds worksheets kindergarten", and no amount of unique prose
 * changes that. So each page is fitted with a DIFFERENT real query it can
 * honestly answer: by age, by subject, by occasion, by format, by the game or
 * puzzle or exercise a parent is actually looking for.
 *
 * Honest fit is the whole discipline. A phrase naming "kindergarten" may only be
 * worn by a kindergarten page; one naming a theme only by that theme's page; one
 * naming Italian only by an Italian deck. Anything else is a false promise, and a
 * visitor who bounces teaches Google the page answers badly — the opposite of
 * the point.
 *
 * Usage:
 *   node scripts/seo-per-page/assign-angle.js --locale=en            (report)
 *   node scripts/seo-per-page/assign-angle.js --locale=en --write    (save assignments)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const BANK_DIR = path.join(ROOT, 'docs', 'SEO', 'harvests', 'angles');
const LANDING_DIR = path.join(ROOT, 'frontend', 'content', 'seo-landing');
const FACTS_DIR = path.join(ROOT, 'docs', 'seo-per-page', 'deck-facts');
const OUT_DIR = path.join(ROOT, 'docs', 'seo-per-page', 'assignments');

const esc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const norm = (s) => String(s || '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

/* Level vocabulary: how each of our levels is actually spoken, including the
 * plain ages parents use ("worksheets for 5 year olds") rather than only the
 * school stage. A phrase using ANY of these words is claiming that stage. */
const LEVEL_WORDS = {
  preschool: ['preschool', 'pre k', 'prek', 'pre-k', 'toddler', 'toddlers', 'nursery',
    'early years', '3 year old', '3 year olds', '4 year old', '4 year olds', 'little ones'],
  kindergarten: ['kindergarten', 'kinder', 'reception', 'kindergartener', 'kindergarteners',
    '5 year old', '5 year olds'],
  'grade-1': ['grade 1', '1st grade', 'first grade', 'year 1', '6 year old', '6 year olds'],
  'grade-2': ['grade 2', '2nd grade', 'second grade', 'year 2', '7 year old', '7 year olds'],
  'grade-3': ['grade 3', '3rd grade', 'third grade', 'year 3', '8 year old', '8 year olds'],
  'language-beginner': ['beginner', 'beginners', 'esl', 'eal', 'second language'],
};
const ALL_LEVEL_WORDS = [...new Set(Object.values(LEVEL_WORDS).flat())];

const LANGUAGES = ['danish', 'dutch', 'french', 'german', 'finnish', 'spanish',
  'italian', 'portuguese', 'swedish', 'norwegian'];

/* Languages we do not teach. A phrase naming one is never wearable by anything
 * we publish — "free printable arabic worksheets for beginners" was assigned to
 * a GERMAN crossword before this existed. */
const FOREIGN = ['arabic', 'japanese', 'chinese', 'mandarin', 'hindi', 'russian',
  'korean', 'hebrew', 'greek', 'turkish', 'polish', 'urdu', 'tamil', 'thai',
  'vietnamese', 'latin', 'irish', 'welsh', 'afrikaans', 'indonesian', 'farsi'];

/* SUBJECT CLAIMS — the hole that let a beginning-sounds sheet advertise
 * "addition worksheets kindergarten free".
 *
 * The first honest-fit check validated level, theme and language, reported zero
 * violations, and was wrong: a phrase also claims a SUBJECT and an ACTIVITY
 * KIND. Reading the assignments showed a phonics page wearing addition, a
 * German crossword wearing calligraphy, and another wearing "scavenger hunt".
 *
 * So each subject word lists the worksheet types entitled to claim it. A phrase
 * carrying a subject word no type on this page owns is not wearable.
 */
const SUBJECT_OWNERS = {
  addition: ['addition', 'code-addition', 'math-worksheet', 'math-puzzle', 'picture-arithmetic'],
  subtraction: ['subtraction', 'math-worksheet', 'math-puzzle', 'picture-arithmetic'],
  multiplication: ['arrays-multiplication'],
  division: [],
  math: ['addition', 'subtraction', 'code-addition', 'math-worksheet', 'math-puzzle',
    'counting-pictures', 'counting-frames', 'chart-count', 'graphing-data', 'number-charts',
    'number-lines', 'base-ten', 'comparing-numbers', 'comparing-groups', 'picture-arithmetic',
    'arrays-multiplication', 'fractions', 'measurement', 'telling-time', 'geometry', 'sudoku'],
  counting: ['counting-pictures', 'counting-frames', 'chart-count', 'find-and-count',
    'tally-counting', 'graphing-data', 'comparing-groups', 'number-charts'],
  phonics: ['find-and-count', 'alphabet-train', 'matching', 'beginning-sounds', 'letter-knowledge'],
  'beginning sounds': ['find-and-count', 'beginning-sounds', 'alphabet-train', 'matching'],
  'initial sounds': ['find-and-count', 'beginning-sounds', 'alphabet-train', 'matching'],
  'letter sounds': ['find-and-count', 'beginning-sounds', 'alphabet-train', 'matching'],
  alphabet: ['alphabet-train', 'letter-knowledge', 'find-and-count', 'matching'],
  spelling: ['wordsearch', 'word-scramble', 'crossword', 'word-guess', 'cryptogram'],
  'sight words': ['wordsearch', 'word-guess', 'matching', 'crossword'],
  reading: ['wordsearch', 'crossword', 'word-guess', 'matching', 'word-scramble'],
  writing: [], handwriting: [], cursive: [], tracing: [], calligraphy: [],
  'scavenger hunt': [], colouring: [], coloring: [], craft: [], origami: [],
  shapes: ['geometry', 'picture-sort', 'shadow-match', 'grid-match'],
  fractions: ['fractions'],
  'telling time': ['telling-time'], clock: ['telling-time'],
  money: [], measurement: ['measurement', 'comparing-sizes', 'big-small'],
  patterns: ['pattern-train', 'pattern-worksheet', 'patterns'],
  graph: ['chart-count', 'graphing-data'], graphing: ['chart-count', 'graphing-data'],
  science: ['science-match', 'science-sequence'],
  // added after reading real assignments: a letter-spotting sheet had been given
  // "worksheets for 5 year olds maths" and "number worksheets kindergarten",
  // because only the spelling "math" was in this list
  maths: ['addition', 'subtraction', 'code-addition', 'math-worksheet', 'math-puzzle',
    'counting-pictures', 'counting-frames', 'chart-count', 'graphing-data', 'number-charts',
    'number-lines', 'base-ten', 'comparing-numbers', 'comparing-groups', 'picture-arithmetic',
    'arrays-multiplication', 'fractions', 'measurement', 'telling-time', 'geometry', 'sudoku'],
  number: ['counting-pictures', 'counting-frames', 'number-charts', 'number-lines',
    'comparing-numbers', 'base-ten', 'chart-count', 'addition', 'subtraction', 'math-worksheet'],
  numbers: ['counting-pictures', 'counting-frames', 'number-charts', 'number-lines',
    'comparing-numbers', 'base-ten', 'chart-count', 'addition', 'subtraction', 'math-worksheet'],
  numeracy: ['counting-pictures', 'counting-frames', 'number-charts', 'comparing-numbers',
    'addition', 'subtraction', 'math-worksheet'],
};

/* Ages below our range. "activities for 2 year olds" reached a page for
 * language beginners because LEVEL_WORDS starts at three. */
const TOO_YOUNG = ['1 year old', '1 year olds', '2 year old', '2 year olds',
  'baby', 'babies', 'infant', 'infants'];
const SUBJECT_WORDS = Object.keys(SUBJECT_OWNERS);

/* ARTEFACT CLAIMS — the same permissive-OR bug as subjects, one level up.
 *
 * The bank filter accepts a phrase containing ANY artefact word, so "printable
 * masks for kids" passes on "printable" and reached a German crossword page,
 * along with stickers, booklets, flashcards, memory games and cutting practice.
 * I had already patched exactly this shape once by blacklisting "posters".
 * Patching masks, then stickers, then booklets is a list that is never finished.
 *
 * So an artefact word is OWNED, like a subject: only the types that actually
 * produce that thing may claim it. Words for things we do not publish own
 * nothing, which makes them unwearable by construction — no blacklist to keep
 * up to date, and a new junk artefact fails closed instead of shipping.
 */
const ANY_TYPE = '*';
const ARTEFACT_OWNERS = {
  // generic — anything we publish is one of these
  worksheet: ANY_TYPE, worksheets: ANY_TYPE, printable: ANY_TYPE, printables: ANY_TYPE,
  'activity sheet': ANY_TYPE, 'activity sheets': ANY_TYPE, 'activity page': ANY_TYPE,
  'activity pages': ANY_TYPE, 'practice sheet': ANY_TYPE, 'practice sheets': ANY_TYPE,
  'work sheet': ANY_TYPE, 'work sheets': ANY_TYPE, handout: ANY_TYPE, handouts: ANY_TYPE,
  workbook: ANY_TYPE, workbooks: ANY_TYPE,
  // specific — only the type that makes it
  crossword: ['crossword'], crosswords: ['crossword'],
  'word search': ['wordsearch'], 'word searches': ['wordsearch'], wordsearch: ['wordsearch'],
  maze: ['picture-path', 'picture-trail', 'treasure-hunt'],
  mazes: ['picture-path', 'picture-trail', 'treasure-hunt'],
  sudoku: ['sudoku'], bingo: ['bingo'],
  puzzle: ['crossword', 'wordsearch', 'sudoku', 'math-puzzle', 'missing-pieces',
    'picture-path', 'picture-trail', 'treasure-hunt', 'word-scramble', 'cryptogram',
    'grid-match', 'visual-logic'],
  puzzles: ['crossword', 'wordsearch', 'sudoku', 'math-puzzle', 'missing-pieces',
    'picture-path', 'picture-trail', 'treasure-hunt', 'word-scramble', 'cryptogram',
    'grid-match', 'visual-logic'],
  matching: ['matching', 'shadow-match', 'grid-match', 'science-match', 'visual-matching'],
  sorting: ['picture-sort', 'sorting-categories', 'odd-one-out'],
  'cut and paste': ['picture-sort', 'missing-pieces', 'alphabet-train'],
  // things we do NOT publish: owned by nobody, therefore never wearable
  mask: [], masks: [], sticker: [], stickers: [], booklet: [], booklets: [],
  flashcard: [], flashcards: [], 'flash card': [], 'flash cards': [],
  'memory game': [], 'memory games': [], 'cutting practice': [], 'task card': [],
  'task cards': [], 'colouring page': [], 'colouring pages': [],
  'coloring page': [], 'coloring pages': [], tracing: [],
};
const ARTEFACT_WORDS = Object.keys(ARTEFACT_OWNERS)
  .sort((a, b) => b.length - a.length);   // longest first: "word search" before "search"

/* Every type's OWN NAME is a subject only it may claim — derived, not listed.
 *
 * A find-and-count page was fitted with "printable big and small worksheets",
 * because "big or small" is a different worksheet type and my hand-written
 * SUBJECT_OWNERS did not mention it. That list has now been one word short five
 * times (math/maths, number, initial sound, big and small...). Hand-maintaining
 * a vocabulary that must cover 60 types is the wrong shape.
 *
 * The taxonomy already names every type. Take those names as owned subject
 * words, so adding a worksheet type to the catalogue extends this automatically
 * and a name I never thought of still fails closed.
 */
function deriveTypeNameOwners(locale) {
  const tax = JSON.parse(fs.readFileSync(
    path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'), 'utf8')).axes || {};
  const owners = {};
  const STOP = new Set(['worksheet', 'worksheets', 'picture', 'pictures', 'kids',
    'and', 'the', 'for', 'with', 'from']);
  for (const [key, e] of Object.entries(tax['exercise-type'] || {})) {
    const name = (e.name && (e.name[locale] || e.name.en)) || '';
    const words = String(name).toLowerCase().replace(/[^\p{L}\s]/gu, ' ').split(/\s+/)
      .filter((w) => w.length > 3 && !STOP.has(w));
    // the full name, and each distinctive word in it, belong to this type
    const phrases = [String(name).toLowerCase().trim(), ...words].filter(Boolean);
    for (const ph of phrases) {
      if (!ph || ph.length < 4) continue;
      owners[ph] = owners[ph] || [];
      if (!owners[ph].includes(key)) owners[ph].push(key);
    }
  }
  return owners;
}

function buildMatchers(locale) {
  const tax = JSON.parse(fs.readFileSync(
    path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'), 'utf8')).axes || {};
  const themeName = new Map();     // theme key -> spoken name
  for (const [key, e] of Object.entries(tax.theme || {})) {
    const n = (e.name && (e.name[locale] || e.name.en)) || key.replace(/_/g, ' ');
    themeName.set(key, String(n).toLowerCase().replace(/\s+\d+$/, '').trim());
  }
  const derived = deriveTypeNameOwners(locale);
  const themeVocab = [...new Set([...themeName.values()])].filter((t) => t.length > 3);
  const themeRe = new RegExp('\\b(' + themeVocab.map(esc).join('|') + ')\\b', 'i');
  const levelRe = new RegExp('\\b(' + ALL_LEVEL_WORDS.map(esc).join('|') + ')\\b', 'i');
  const langRe = new RegExp('\\b(' + LANGUAGES.join('|') + ')\\b', 'i');
  return { themeName, themeRe, levelRe, langRe, derived };
}

/** Attributes a phrase CLAIMS. Anything claimed must be true of the wearer. */
function claimsOf(phrase, m) {
  const p = ' ' + norm(phrase) + ' ';
  const levels = new Set();
  for (const [lvl, words] of Object.entries(LEVEL_WORDS)) {
    if (words.some((w) => p.includes(' ' + norm(w) + ' '))) levels.add(lvl);
  }
  const themes = new Set();
  for (const t of new Set([...m.themeName.values()])) {
    if (t.length > 3 && p.includes(' ' + t + ' ')) themes.add(t);
  }
  const langs = new Set();
  for (const l of LANGUAGES) if (p.includes(' ' + l + ' ')) langs.add(l);
  // languages we do not teach at all
  const foreign = FOREIGN.some((f) => p.includes(' ' + f + ' '))
    || TOO_YOUNG.some((y) => p.includes(' ' + y + ' '));
  /* Subjects, matched with singular/plural tolerance.
   *
   * "Initial Sound Worksheets Grade 2" landed on a MATH page because the list
   * held "initial sounds" and the phrase said "initial sound". Patching one
   * missing plural at a time is how this vocabulary has been wrong three times,
   * so match both forms instead of adding another entry. */
  const subjects = new Set();
  const derivedWords = Object.keys((m && m.derived) || {});
  for (const w of derivedWords) if (p.includes(' ' + w + ' ')) subjects.add(w);
  for (const w of SUBJECT_WORDS) {
    const singular = w.replace(/s$/, '');
    if (p.includes(' ' + w + ' ') || p.includes(' ' + singular + ' ')
      || p.includes(' ' + singular + 's ')) subjects.add(w);
  }
  // artefacts the phrase claims to be
  const artefacts = new Set();
  for (const w of ARTEFACT_WORDS) if (p.includes(' ' + w + ' ')) artefacts.add(w);
  return { levels, themes, langs, foreign, subjects, artefacts, derived: (m && m.derived) || {} };
}

/* EVERY CONTENT WORD MUST BE EXPLAINED BY THE PAGE.
 *
 * Seven times a phrase carried a concept my "things we do not make" lists did
 * not model — posters, masks, stickers, flashcards, memory games, sub plans,
 * classroom rules, cut-and-glue. That set is unbounded, so the list was always
 * one entry short and the eighth escape was guaranteed.
 *
 * Inverted here: a word survives only if THIS PAGE accounts for it — its level,
 * its theme, its worksheet type or mode, its target language — or it is one of
 * the neutral words every printable title carries. Anything else is a claim
 * nothing on the page supports, whatever it happens to be, with no foresight
 * required about what junk exists.
 *
 * The head-noun idea alone was not enough: "helping hands worksheet for kids"
 * has a perfectly good head noun, and the modifiers carried the lie.
 */
const NEUTRAL = new Set([
  'free', 'printable', 'printables', 'print', 'printing', 'pdf', 'download', 'downloadable',
  'online', 'worksheet', 'worksheets', 'sheet', 'sheets', 'activity', 'activities',
  'page', 'pages', 'exercise', 'exercises', 'practice', 'practise', 'game', 'games',
  'puzzle', 'puzzles', 'fun', 'easy', 'simple', 'quick', 'best', 'great', 'good',
  'for', 'the', 'a', 'an', 'and', 'or', 'to', 'with', 'of', 'in', 'on', 'at', 'by',
  'kids', 'kid', 'children', 'child', 'students', 'student', 'toddlers', 'toddler',
  'preschoolers', 'preschooler', 'kindergarteners', 'beginners', 'beginner',
  'little', 'ones', 'young', 'early', 'years', 'year', 'old', 'olds', 'age', 'ages',
  'home', 'homeschool', 'homeschooling', 'classroom', 'class', 'school', 'teacher',
  'teachers', 'parents', 'learning', 'learn', 'teaching', 'teach', 'education',
  'educational', 'set', 'pack', 'bundle', 'collection', 'no', 'prep',
]);

function pageVocabulary(l, m, tax) {
  const c = l.coordinate || {};
  const v = new Set();
  const add = (s) => { for (const w of norm(s).split(' ')) if (w) v.add(w); };
  for (const w of (LEVEL_WORDS[c.level] || [])) add(w);
  add(String(c.level || '').replace(/-/g, ' '));
  for (const part of String(c.theme || '').split('-vs-')) {
    const n = m.themeName.get(part);
    if (n) add(n);
    add(part.replace(/_/g, ' '));
  }
  const te = ((tax['exercise-type'] || {})[c.type] || {}).name;
  if (te) add(te.en || '');
  add(String(c.type || '').replace(/-/g, ' '));
  add(String(c.mode || '').replace(/-/g, ' '));
  const lm = /^([a-z]+)-/.exec(l.slug);
  if (lm && LANGUAGES.includes(lm[1])) add(lm[1]);
  return v;
}

function unexplainedWords(phrase, vocab) {
  const out = [];
  for (const w of norm(phrase).split(' ')) {
    if (!w || NEUTRAL.has(w) || /^\d+$/.test(w)) continue;
    if (vocab.has(w)) continue;
    out.push(w);
  }
  return out;
}

function pageAttrs(l, m) {
  const c = l.coordinate || {};
  const themes = new Set();
  for (const part of String(c.theme || '').split('-vs-')) {
    const n = m.themeName.get(part);
    if (n) themes.add(n);
  }
  const mm = /^([a-z]+)-/.exec(l.slug);
  const lang = mm && LANGUAGES.includes(mm[1]) ? mm[1] : null;
  return { level: c.level || null, themes, lang, type: c.type, mode: c.mode };
}

/** Can this page honestly wear this phrase? */
function wearable(claims, attrs) {
  // a claimed level must be the page's level
  if (claims.levels.size && !claims.levels.has(attrs.level)) return false;
  // a claimed theme must be one of the page's themes
  // EVERY theme named must be this page's. "winter clothing worksheets" reached a
  // clothing page because one of its two themes matched; winter is a different sheet.
  if (claims.themes.size) {
    for (const t of claims.themes) if (!attrs.themes.has(t)) return false;
  }
  // a claimed language must be the page's target language
  if (claims.langs.size) {
    if (!attrs.lang || !claims.langs.has(attrs.lang)) return false;
  }
  // we teach none of these
  if (claims.foreign) return false;
  // a claimed subject must be one this worksheet type actually teaches
  for (const sub of claims.subjects) {
    const owners = SUBJECT_OWNERS[sub] || (claims.derived && claims.derived[sub]) || [];
    if (!owners.includes(attrs.type)) return false;
  }
  // a claimed artefact must be a thing this page actually IS
  for (const art of claims.artefacts) {
    const owners = ARTEFACT_OWNERS[art];
    if (owners === ANY_TYPE) continue;
    if (!Array.isArray(owners) || !owners.includes(attrs.type)) return false;
  }
  return true;
}

function run(locale, opts) {
  const bankFile = path.join(BANK_DIR, `${locale}.clean.json`);
  if (!fs.existsSync(bankFile)) throw new Error(`no cleaned bank for ${locale} — run clean-bank.js`);
  const bank = JSON.parse(fs.readFileSync(bankFile, 'utf8'));
  const phrases = Object.entries(bank.byGroup).flatMap(([g, list]) => list.map((q) => ({ q, group: g })));

  const landings = JSON.parse(fs.readFileSync(
    path.join(LANDING_DIR, `${locale}.json`), 'utf8')).landings;
  const m = buildMatchers(locale);

  // precompute what each phrase claims — done once, not per page
  for (const p of phrases) p.claims = claimsOf(p.q, m);

  // sibling groups: same skill, same age — the pages that currently compete
  const groups = new Map();
  for (const l of landings) {
    const c = l.coordinate || {};
    const k = [c.type, c.mode == null ? 'null' : c.mode, c.level].join('|');
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(l);
  }

  /* Claim by QUERY, not by string.
   *
   * Claiming raw strings let "Printable Mazes for 5 Year Olds" and "Printable
   * Mazes for 5 Year Olds Pdf" go to two different pages, and "Subtraction
   * Worksheets for Grade 2" and "Subtraction Printable Worksheets for Grade 2"
   * to two more. Autocomplete returns one query in many surface forms; those
   * pages then compete with each other exactly as before.
   *
   * My own gate caught this — the first defect this session that reading the
   * output did not reveal, because at a glance the strings do look different.
   *
   * Strip the words every title carries and sort what remains: that signature is
   * the query. 4,660 bank strings reduce to 2,698 real queries, which is the
   * true capacity and is smaller than the page count. Better to know.
   */
  const GATE = require('./gate-template-fingerprint.js');
  const querySig = (q) => GATE.querySignature(q, locale);

  const TAXA = JSON.parse(fs.readFileSync(
    path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'), 'utf8')).axes || {};

  const claimed = new Set();        // corpus-wide within this locale, keyed by QUERY
  const assignments = [];
  const groupAngleCount = new Map();

  // biggest groups first: they are the most contested and need the most choice
  const ordered = [...groups.entries()].sort((a, b) => b[1].length - a[1].length);

  for (const [gkey, pages] of ordered) {
    pages.sort((a, b) => (a.slug < b.slug ? -1 : 1));
    const angleUse = new Map();     // angle group -> how many pages in this sibling set use it
    for (const page of pages) {
      const attrs = pageAttrs(page, m);
      let best = null; let bestScore = -1e9;

      const vocab = pageVocabulary(page, m, TAXA);
      for (const p of phrases) {
        if (claimed.has(querySig(p.q))) continue;
        if (!wearable(p.claims, attrs)) continue;
        // every content word must be accounted for by THIS page
        if (unexplainedWords(p.q, vocab).length) continue;
        let score = 0;
        // a phrase that names THIS page's own theme or level is longer-tail
        if (p.claims.themes.size) score += 40;
        if (p.claims.levels.size) score += 25;
        if (p.claims.langs.size) score += 30;
        // spread: prefer an angle this sibling group has used least
        score -= (angleUse.get(p.group) || 0) * 6;
        // a little length preference: mid-length phrases read best as titles
        const words = p.q.split(/\s+/).length;
        score -= Math.abs(words - 5) * 2;
        if (score > bestScore) { bestScore = score; best = p; }
      }

      if (best) {
        claimed.add(querySig(best.q));
        angleUse.set(best.group, (angleUse.get(best.group) || 0) + 1);
        assignments.push({ slug: page.slug, phrase: best.q, angle: best.group, composed: false });
      } else {
        assignments.push({ slug: page.slug, phrase: null, angle: null, composed: true });
      }
    }
    groupAngleCount.set(gkey, angleUse);
  }

  const fitted = assignments.filter((a) => a.phrase).length;
  const needComposed = assignments.length - fitted;

  console.log(`[${locale}] ${assignments.length} pages | banked phrase ${fitted} | need composing ${needComposed}`
    + ` (bank ${phrases.length})`);

  // angle spread on the most contested groups — a group leaning on one angle has
  // rebuilt the same failure in a nicer suit, even if every string differs
  console.log('\nangle spread, most contested sibling groups:');
  for (const [gkey, use] of [...groupAngleCount.entries()].slice(0, 6)) {
    const n = groups.get(gkey).length;
    const spread = [...use.entries()].sort((a, b) => b[1] - a[1])
      .map(([g, c]) => `${g}:${c}`).join(' ');
    console.log(`  ${String(n).padStart(4)}p ${gkey.padEnd(42)} ${spread || '(none)'}`);
  }

  if (opts.write) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    const out = path.join(OUT_DIR, `${locale}.json`);
    fs.writeFileSync(out, JSON.stringify({ locale, bank: bankFile, assignments }, null, 1));
    console.log(`\n-> ${path.relative(ROOT, out)}`);
  }
  return { assignments, fitted, needComposed };
}

if (require.main === module) {
  const a = process.argv.slice(2);
  const locale = (a.find((x) => x.startsWith('--locale=')) || '').split('=')[1] || 'en';
  run(locale, { write: a.includes('--write') });
}

module.exports = { run, claimsOf, wearable, buildMatchers, LEVEL_WORDS, pageVocabulary, unexplainedWords, NEUTRAL };
