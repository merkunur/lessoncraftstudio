#!/usr/bin/env node
/**
 * A sub day for EVERY WEEK of the English (US) school year (Daily Teaching System, Part 5.4): for each grade, one full
 * day of review for every week 1..N of its longest plan (K 28, Grade 1 30, Grade 2 32, Grade 3 30), written into
 * frontend/content/sub-plans/defs/en.json AFTER the 24 days of lists/build-en-defs.js (which keeps these as they are,
 * and this file keeps those): the assembler hands each grade's pages out in the order of the file, so the 24 days
 * keep every page they had.
 *
 * A week day is review only (scripts/sub-plans/position.js, refusedWeek): a point of an earlier grade, a point no
 * plan of the grade teaches (drawing, puzzles, science), or a point of the grade whose lesson is taught by the end of
 * that week in its own plan. Gate P8 checks it.
 *
 * How a day is chosen, week by week and block by block, from the POOLS below (pages a class can do at their seats
 * after one example, with directions short enough to read aloud; what was left out and why is in EXCLUDED):
 *   - a block takes a point that is not in the day before (no point in two neighbouring weeks of a grade) and not
 *     twice in one day;
 *   - the main blocks (reading, word work, writing, math) lean on what the plans taught in the last four weeks; the
 *     other blocks take the point that has waited longest (spaced review), so older points come back;
 *   - a worksheet type whose pages are all handed out in the grade (rule 2: a page once per grade) is not taken again,
 *     and is reported;
 *   - a type of the same point is rotated (the one used least comes first);
 *   - no worksheet family twice in a day (two reading pages only when one is a story and one an informational text);
 *     an End-of-the-day type at most 3 times in a grade; in Grade 3 a lower-grade type at most twice per kind of block.
 *
 *   node scripts/sub-plans/lists/build-en-weeks.js            writes defs/en.json, prints the report
 *   node scripts/sub-plans/lists/build-en-weeks.js --plan     writes nothing; out/sub-plans/weeks-plan.json lists
 *                                                             every block with the pages the assembler will give it
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const { pagesOf } = require('../../units/catalog.js');
const { planWeeks, refused, HOLIDAY_PAGE, SKIP_PAGE } = require('../position.js');
const OUT = path.join(REPO, 'frontend', 'content', 'sub-plans', 'defs', 'en.json');
const PLAN_ONLY = process.argv.includes('--plan');
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));

const GRADES = {
  K: { id: 'k', word: 'Kindergarten', slug: 'kindergarten', blocks: 'letters and sounds, writing, and math' },
  1: { id: 'g1', word: 'First Grade', slug: 'first-grade', blocks: 'reading, word work, writing, and math' },
  2: { id: 'g2', word: 'Second Grade', slug: 'second-grade', blocks: 'reading, word work, writing, and math' },
  3: { id: 'g3', word: 'Third Grade', slug: 'third-grade', blocks: 'reading, word work, writing, and math' },
};

// The blocks of a day, in the order of the day. A slot names the kinds it may take (the first that the chosen point
// has); `main` slots lean on what was taught in the last four weeks. Minutes are what the page takes (Part 5.2 rule 6):
// Kindergarten 75-105 minutes of seat work, Grades 1-3 about 135-150 (Grades 2-3 with a ninth block, science or
// social studies, as their pages take less time each).
const SLOTS = {
  K: (w) => [['morning'], ['reading', 'main'], ...(w >= 7 ? [['phonics', 'main']] : []), ['writing', 'main'], ['math', 'main'], ['numbers'], ['logic'], ['closing']],
  1: () => [['morning'], ['reading', 'main'], ['phonics', 'main'], ['writing', 'main'], ['math', 'main'], ['problems|numbers'], ['logic'], ['closing']],
  2: () => [['morning'], ['reading', 'main'], ['phonics', 'main'], ['writing', 'main'], ['math', 'main'], ['problems|numbers'], ['science|social'], ['logic'], ['closing']],
  3: () => [['morning'], ['reading', 'main'], ['phonics', 'main'], ['writing', 'main'], ['math', 'main'], ['problems|numbers'], ['science|social'], ['logic'], ['closing']],
};
const MINUTES = {
  K: { morning: 10, reading: 15, phonics: 10, writing: 15, math: 10, numbers: 10, logic: 10, closing: 10 },
  1: { morning: 15, reading: 20, phonics: 20, writing: 20, math: 20, numbers: 20, problems: 20, logic: 15, closing: 10 },
  2: { morning: 10, reading: 20, phonics: 15, writing: 20, math: 15, numbers: 15, problems: 15, science: 15, social: 15, logic: 15, closing: 10 },
  3: { morning: 10, reading: 20, phonics: 15, writing: 20, math: 15, numbers: 15, problems: 15, science: 15, social: 15, logic: 15, closing: 10 },
};

// The worksheet types a day is chosen from, per grade and kind of block (lists/en-weeks-pools.js).
const POOLS = require('./en-weeks-pools.js');

// Worksheet types left out of the week days, decided from each type's printed title and directions
// (scripts/worksheet-gen/i18n/strings.en.json) and its pages. A guest teacher runs seat work after one example; these
// need something else.
const EXCLUDED = {
  // cutting, gluing, folding or cards to cut out
  'K-240': 'cut and paste', 'K-264': 'cut and paste', 'K-353': 'cut out the tangram pieces', 'K-381': 'cut and paste', 'K-324': 'cards to cut out', 'K-347': 'cards to cut out', 'K-349': 'cards to cut out', 'K-350': 'cards to cut out',
  'K-348': 'cards to cut out', 'K-654': 'cut and glue cards', 'K-659': 'cut and glue strips', 'G1-324': 'cards to cut out', 'G1-388': 'cut and paste', 'G1-389': 'cut and paste', 'G1-608': 'cut and sort', 'K-628': 'a little book to fold', 'K-629': 'a little book to fold', 'K-630': 'a little book to fold',
  // a partner, a friend or a grown-up, dice, real objects, a tangram set or a week of watching
  'K-346': 'a friend\'s name', 'K-631': 'talk with a grown-up', 'G1-111': 'Roll and Add: dice', 'G1-150': 'Clock Partners', 'G1-369': 'sharing with friends', 'G1-623': 'a partner checks the writing', 'G1-354': 'needs a tangram set',
  'G1-399': 'an experiment with water', 'G1-405': 'a chart filled in over a week', 'K-364': 'a weather chart filled in over a week', 'K-360': 'counting on one\'s own body: a guest cannot check it', 'G1-574': 'paper clips to measure with',
  // the teacher reads the text or the story aloud and leads the talk (speaking and listening)
  'K-642': 'the teacher reads the stories aloud', 'K-643': 'the teacher reads the stories aloud', 'K-645': 'listen to the text', 'K-646': 'listen to the text', 'K-647': 'listen to the text', 'K-648': 'listen to the text', 'K-649': 'listen to the texts',
  'K-650': 'listen to the story', 'K-651': 'listen and retell', 'K-652': 'listen to the story', 'K-653': 'listen to the story', 'K-665': 'a print-concept lesson the teacher leads', 'K-666': 'a print-concept lesson the teacher leads', 'K-667': 'the teacher reads each sentence',
  'K-668': 'a print-concept lesson the teacher leads', 'K-669': 'the teacher says the words', 'K-670': 'the teacher says the words', 'K-671': 'the teacher reads each sentence', 'K-672': 'a print-concept lesson the teacher leads', 'K-679': 'author\'s chair', 'K-680': 'author\'s chair',
  'K-685': 'two stories read aloud', 'K-686': 'two stories read aloud', 'K-683': 'a lesson on words with two meanings', 'K-684': 'a lesson on words with two meanings', 'K-681': 'the teacher says the sounds', 'K-682': 'the teacher says the sounds', 'K-661': 'a phonics lesson the teacher leads',
  'K-662': 'a phonics lesson the teacher leads', 'K-663': 'a phonics lesson the teacher leads', 'K-664': 'a phonics lesson the teacher leads', 'K-673': 'an opinion lesson', 'K-674': 'an opinion lesson', 'K-675': 'a lesson on facts and labels', 'K-676': 'a lesson on facts and labels',
  'K-677': 'a small-moment lesson', 'K-678': 'a small-moment lesson', 'G2-582': 'building on others\' talk', 'G2-583': 'building on others\' talk', 'G2-578': 'reading parts aloud in voices', 'G2-579': 'reading parts aloud in voices', 'G3-508': 'a story discussion', 'G3-509': 'a story discussion',
  'G2-569': 'a class research report', 'G2-570': 'a class research report', 'G3-562': 'a research report', 'G3-563': 'a research report', 'G3-556': 'notes from sources', 'G3-557': 'notes from sources', 'G3-577': 'two books by one author', 'G3-578': 'two books by one author',
  'G1-603': 'a heart-word lesson the teacher leads', 'G1-600': 'a syllable lesson the teacher leads', 'G1-622': 'an edit lesson', 'G1-618': 'an opinion lesson', 'G1-620': 'a lesson on facts and a closing', 'G1-610': 'a spelling-rule lesson', 'G1-609': 'defining words aloud', 'G1-617': 'the second day of the true story (its plan is another page)',
  // a puzzle whose answer a guest teacher cannot check or explain
  'G1-349': 'logic grid', 'G2-319': 'logic grid', 'G2-344': 'logic grid', 'G2-345': 'logic grid', 'G3-378': 'logic grid', 'G3-379': 'logic grid', 'G3-351': 'logic cabinet', 'G3-353': 'two-attribute sort with a grid', 'G1-158': 'picture sudoku (one page, in a day of Part 5.1)',
  'K-320': 'marks counted from a flag on long rows', 'K-336': 'marks counted from a flag at either end',
  // not K-3 work in US classrooms, or the wrong grade's signs
  'G3-355': 'the 24-hour clock', 'G3-394': 'the order of the planets', 'G3-395': 'the order of the planets', 'G3-400': 'an experiment', 'G2-209': '× signs at Grade 2 (review of Part 5.2)', 'G2-210': '× signs at Grade 2', 'G2-213': '× signs at Grade 2',
  'G2-507': 'chance (no K-2 standard)', 'G2-508': 'chance (no K-2 standard)', 'G3-484': 'chance (no K-3 standard)',
  // letters and alphabet order: not in the first weeks of Kindergarten (from week 12 they are review)
  'K-222': 'capital and small letters: needs letter names', 'K-223': 'alphabet order', 'K-309': 'ABC dot-to-dot', 'K-409': 'ABC maze', 'K-410': 'abc maze', 'K-412': 'a sound maze whose pictures decide the way',
  // a holiday page (HOLIDAY_PAGE): no type is left out for it, its holiday pages are skipped page by page
  'K-429': 'Christmas Eve picture',
  // cursive: the strokes need the teacher's model
  'G2-377': 'cursive', 'G2-384': 'cursive', 'G2-385': 'cursive', 'G2-386': 'cursive', 'G2-387': 'reading cursive', 'G3-401': 'cursive sentences',
  // pictures whose word a child does not say (read off the pages, Part 5 rule 4); the page of the type in a day of
  // Part 5.1 keeps its block
  'K-221': 'the week pages show a uniform (u) and a xylophone (x) where a child says shirt and does not hear /ks/',
  'K-226': 'ending sounds of key (y), orca (a), cow (w), kiwi (i), ox (x): letters a child does not hear at the end',
  'K-329': 'sounds counted in mirror, kitchen, weasel, turkey: too hard to count for a kindergartner and a guest teacher',
  'K-340': 'a sheep and a duck as the picture of a season: two right answers',
  // the teacher must do something the page does not print, or a partner is needed
  'G1-624': 'the teacher says a sound for each picture that the page does not print', 'G1-584': 'read both words to a partner',
  'G1-529': 'the path has two parts and the page asks for three directions',
  'G1-314': 'the blending page asks for "lego" (a brand)',
  'G1-244': 'picture words to spell without a word bank (watermelon, coconut, blackberry): the review of Part 5.1 replaced such a page',
  'G1-260': 'picture words to spell without a word bank (scooter, balloon, crayons): the page the review of Part 5.1 replaced',
  'G1-291': 'picture words to spell from the first letter only (dolphin, raccoon)',
  'G1-303': 'picture words to spell in letter boxes without a word bank (sandbox, crayons, scooter)',
  'G2-563': 'capital letters in holiday names (a holiday page in other words)', 'G2-564': 'capital letters in holiday names',
};

function parsePool(grade) {
  const out = [];
  for (const [kind, text] of Object.entries(POOLS[grade])) {
    for (const raw of text.split(';').map((x) => x.trim()).filter(Boolean)) {
      const [point, type, ...rest] = raw.split(/\s+/);
      const e = { kind, point, type, minutes: MINUTES[grade][kind], order: out.length };
      for (const r of rest) { if (/^\d+$/.test(r)) e.minutes = Number(r); else if (r === 'hard') e.level = 'hard'; else if (r === 'once') e.once = true; else if (/^to\d+$/.test(r)) e.to = Number(r.slice(2)); else if (/^from\d+$/.test(r)) e.from = Number(r.slice(4)); else throw new Error(grade + ' ' + raw + ': unknown "' + r + '"'); }
      out.push(e);
    }
  }
  return out;
}

const C = path.join(REPO, 'frontend', 'content');
const points = new Map(readJson(path.join(C, 'teaching-graph', 'points.json')).points.map((p) => [p.id, p]));
const strings = readJson(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'strings.en.json'));
const unitsFile = readJson(path.join(C, 'units', 'units.en.json'));
const weeksOf = planWeeks(unitsFile);
const pages = pagesOf('en');
const PAGE_TITLES = readJson(path.join(__dirname, '..', 'page-titles.json')).titles;
// the worksheet family of each type (scripts/sub-plans/type-families.js): a day hands out no family twice, except a
// story and an informational text (review of Part 5.4: two puzzles of one kind, or two pages of mental math, in a day)
const FAMILY = readJson(path.join(__dirname, '..', 'type-families.json')).types;
const keysOf = (f) => [f.family, f.topic].filter(Boolean);
const familyClash = (type, today) => { const a = FAMILY[type]; if (!a) return 'no family known for ' + type; for (const t of today) { const b = FAMILY[t]; if (!b || !keysOf(a).some((k) => keysOf(b).includes(k))) continue; if (a.family === 'reading-comprehension' && b.family === a.family && [a.kind, b.kind].sort().join() === 'info,story') continue; return true; } return false; };
// variety across the year (review of Part 5.4): an End-of-the-day type at most 3 times in a grade; in Grade 3 a type of
// a lower grade at most twice in one kind of block
const CAP_CLOSING = 3, CAP_LOWER_G3 = 2;
// the points of the 24 days of Parts 5.1-5.2 come first: their scripts were read by the reviews (a fixed set, so that
// writing a new script never moves a page to another week)
const scripted = new Set(readJson(OUT).packs.filter((p) => p.position !== 'week').flatMap((p) => p.blocks.map((b) => b.point)));
const file = readJson(OUT);
const fixed = file.packs.filter((p) => p.position !== 'week');
const before = new Map(file.packs.filter((p) => p.position === 'week').map((p) => [p.id, p]));
const problems = [];

/** the assembler's way of handing out pages (scripts/sub-plans/assemble.js): core (or hard), then hard, then easy */
function takePages(used, type, level) {
  const pg = pages.get(type);
  const pick = (r) => { const x = pg[r].find((y) => !used.has(y.slug) && !HOLIDAY_PAGE.test(y.slug) && !SKIP_PAGE.has(y.slug)); if (x) used.add(x.slug); return x ? x.slug : null; };
  const up = level === 'hard';
  const core = pick(up ? 'hard' : 'core');
  if (!core) return null;
  return { core, hard: up ? null : pick('hard'), easy: pick(up ? 'core' : 'easy') };
}
const hasPage = (used, type, level) => { const pg = pages.get(type); return !!pg && pg[level === 'hard' ? 'hard' : 'core'].some((y) => !used.has(y.slug) && !HOLIDAY_PAGE.test(y.slug) && !SKIP_PAGE.has(y.slug)); };

const weekPacks = [], plan = [], report = {};
for (const grade of ['K', '1', '2', '3']) {
  const G = GRADES[grade];
  const N = Math.max(...unitsFile.plans.filter((p) => String(p.grade) === grade).map((p) => p.weeks));
  const pool = parsePool(grade);
  const R = (report[grade] = { days: 0, points: new Set(), types: new Set(), ranOut: new Set(), minutes: [] });
  for (const e of pool) {
    const p = points.get(e.point);
    if (!p) { problems.push(grade + ' pool: no teaching point ' + e.point); continue; }
    if (!p.types.includes(e.type)) problems.push(grade + ' pool: ' + e.type + ' is no type of ' + e.point);
    if (EXCLUDED[e.type]) problems.push(grade + ' pool: ' + e.type + ' is on the list of types left out (' + EXCLUDED[e.type] + ')');
    if (!pages.get(e.type) || !strings[e.type]) problems.push(grade + ' pool: ' + e.type + ' has no published page or no strings');
    else if (/\{[A-Za-z_]+\}/.test(strings[e.type].printTitle || strings[e.type].title)) problems.push(grade + ' pool: the title of ' + e.type + ' carries a placeholder');
  }
  if (problems.length) continue;
  // the pages the 24 days of this grade already hand out, in the assembler's order
  const used = new Set();
  for (const d of fixed.filter((x) => String(x.grade) === grade)) for (const b of d.blocks) takePages(used, b.type, b.level);
  // the first week each point may be reviewed in this grade
  const firstWeek = new Map();
  for (const e of pool) if (!firstWeek.has(e.point)) { let f = null; for (let w = 1; w <= N; w++) if (!refused(points.get(e.point), grade, 'week', weeksOf, w)) { f = w; break; } firstWeek.set(e.point, f); }
  const lastUse = new Map(), entryUses = new Map(), kindTypeUses = new Map();
  let prev = new Set();
  for (let w = 1; w <= N; w++) {
    const today = new Set(), todayTypes = [], blocks = [];
    for (const [kinds, main] of SLOTS[grade](w)) {
      const allowedKinds = kinds.split('|');
      let best = null;
      for (const e of pool) {
        if (!allowedKinds.includes(e.kind)) continue;
        const f = firstWeek.get(e.point);
        if (f == null || w < f || (e.from && w < e.from) || (e.to && w > e.to)) continue;
        if (today.has(e.point)) continue;
        if (prev.has(e.point)) continue;
        if (e.once && entryUses.get(e)) continue;
        const ktu = kindTypeUses.get(e.kind + ' ' + e.type) || 0;
        if (e.kind === 'closing' && ktu >= CAP_CLOSING) continue;
        if (grade === '3' && !e.type.startsWith('G3-') && ktu >= CAP_LOWER_G3) continue;
        const clash = familyClash(e.type, todayTypes);
        if (typeof clash === 'string') { problems.push(grade + ' pool: ' + clash); continue; }
        if (clash) continue;
        if (!hasPage(used, e.type, e.level)) { if (pool.some((x) => x.type === e.type) && pages.get(e.type)) R.ranOut.add(e.type); continue; }
        const gap = lastUse.has(e.point) ? w - lastUse.get(e.point) : 99;
        const fresh = w - f <= 3 && points.get(e.point).grade === grade;
        const score = (main ? (fresh ? 60 : 0) : (fresh ? 8 : 0)) + Math.min(gap, 14) * 3 + (lastUse.has(e.point) ? 0 : 6) - (entryUses.get(e) || 0) * 4 + (scripted.has(e.point) ? 12 : 0);
        if (!best || score > best.score) best = { e, score };
      }
      if (!best) {
        // why each entry of the kind was left out (the day's other blocks, the week before, the plans)
        const why = pool.filter((e) => allowedKinds.includes(e.kind)).map((e) => e.type + (today.has(e.point) ? ' (point today)' : prev.has(e.point) ? ' (point last week)' : firstWeek.get(e.point) == null || w < firstWeek.get(e.point) ? ' (not taught yet)' : (e.from && w < e.from) || (e.to && w > e.to) ? ' (from/to)' : familyClash(e.type, todayTypes) === true ? ' (family today)' : !hasPage(used, e.type, e.level) ? ' (no page left)' : ' (cap or once)'));
        problems.push(grade + ' week ' + w + ': no point is left for the block ' + kinds + ': ' + why.join(', '));
        continue;
      }
      const e = best.e;
      const pg = takePages(used, e.type, e.level);
      today.add(e.point); todayTypes.push(e.type); lastUse.set(e.point, w); entryUses.set(e, (entryUses.get(e) || 0) + 1);
      kindTypeUses.set(e.kind + ' ' + e.type, (kindTypeUses.get(e.kind + ' ' + e.type) || 0) + 1);
      // a page that prints a title of its own (mazes, tracing pages, scenes, stories) gives the block that title
      const printed = PAGE_TITLES[pg.core];
      blocks.push({ key: e.kind, minutes: e.minutes, point: e.point, type: e.type, ...(e.level ? { level: e.level } : {}), ...(printed ? { title: printed } : {}) });
      plan.push({ grade, week: w, key: e.kind, minutes: e.minutes, point: e.point, type: e.type, ...(e.level ? { level: e.level } : {}), ...pg });
      R.points.add(e.point); R.types.add(e.type);
    }
    prev = today;
    const id = G.id + '-week-' + w;
    const minutes = blocks.reduce((n, b) => n + b.minutes, 0);
    R.days++; R.minutes.push(minutes);
    const metaDescription = 'No-prep emergency sub plans for week ' + w + ' of ' + G.word.toLowerCase() + ': ' + blocks.length + ' review blocks in ' + G.blocks + ', with a script for the guest teacher.';
    weekPacks.push({
      id, slug: G.slug + '-sub-plans-week-' + w, status: (before.get(id) || {}).status || 'pilot', grade, position: 'week', week: w,
      title: G.word + ' Sub Plans: Week ' + w,
      metaTitle: G.word + ' Emergency Sub Plans: Week ' + w,
      metaDescription,
      blocks,
    });
  }
}
for (const p of weekPacks) { if (p.metaTitle.length > 70) problems.push(p.id + ': metaTitle has ' + p.metaTitle.length + ' characters'); if (p.metaDescription.length < 110 || p.metaDescription.length > 170) problems.push(p.id + ': the meta description has ' + p.metaDescription.length + ' characters'); }
if (problems.length) { for (const p of problems) console.log('FAIL  ' + p); console.log(problems.length + ' problem(s); nothing written'); process.exit(1); }

for (const [g, R] of Object.entries(report)) {
  const mins = R.minutes.slice().sort((a, b) => a - b);
  console.log('grade ' + g + ': ' + R.days + ' days, ' + R.points.size + ' points, ' + R.types.size + ' worksheet types, ' + mins[0] + '-' + mins[mins.length - 1] + ' minutes' + (R.ranOut.size ? '; ran out of pages: ' + [...R.ranOut].sort().join(', ') : ''));
}
fs.mkdirSync(path.join(REPO, 'out', 'sub-plans'), { recursive: true });
fs.writeFileSync(path.join(REPO, 'out', 'sub-plans', 'weeks-plan.json'), JSON.stringify(plan, null, 1) + '\n');
if (PLAN_ONLY) { console.log('plan only: out/sub-plans/weeks-plan.json (' + plan.length + ' blocks); nothing written'); process.exit(0); }
fs.writeFileSync(OUT, JSON.stringify({ $comment: file.$comment, packs: fixed.concat(weekPacks) }, null, 1) + '\n');
console.log('en: ' + fixed.length + ' days kept, ' + weekPacks.length + ' week days → ' + path.relative(REPO, OUT));
