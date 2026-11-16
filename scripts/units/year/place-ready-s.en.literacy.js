#!/usr/bin/env node
/**
 * Part 12.3, English literacy, eighteenth run (2026-11-18): two Grade 2 phonics units on the eleven Grade 2 page types
 * of "Year pages, literacy S and W" (types/_shared/vowels-g2.js and vowels-g2b.js).
 *
 *   Long Vowels and Vowel Teams (NEW unit, FIRST in the Grade 2 literacy plan, as the year design has it)
 *     Review: the digraph sh            G2-372                      point 2:digraphs   MOVED from Spelling, Word Building,
 *                                                                                       and Word Choice (which keeps five)
 *     Short or long vowel?              G2-530 + Add the Magic e (screen)            NEW 2:short-or-long-vowel         RF.2.3.a
 *     Vowel teams for long a, e, and o  G2-531 + Build Vowel-Team Words (screen)     NEW 2:vowel-teams-long-a-e-o      RF.2.3.b
 *     oo, ou, ow, oi, and oy            G2-532, G2-543                               NEW 2:vowel-sounds-oo-ou-ow-oi-oy RF.2.3.b
 *   Bossy R and Longer Words (NEW unit, after Sentences and Grammar, as the design has it)
 *     Bossy r: ar and or                G2-533, G2-544                               NEW 2:bossy-r-ar-or               RF.2.3.b
 *     er, ir, and ur                    G2-534, G2-545                               NEW 2:er-ir-ur                    RF.2.3.e
 *     Long vowels in two-syllable words G2-546, G2-547                               NEW 2:long-vowels-two-syllable-words RF.2.3.c
 *     Tricky words: could, would, should  G2-548 + the tool Heart Words              NEW 2:tricky-words-could-would-should RF.2.3.f
 *
 * Every lesson has two real assets. No screen activity and no tool of the site teaches the vowel sounds of oo, ou, ow,
 * oi, oy, bossy r, or long vowels in two-syllable words in English (read 2026-11-18: the Blending Board deck has no such
 * set, the Syllable Splitter is a clapping tool with five fitting words), so those lessons have two page types: the
 * pattern page for day 1 and a page to read for meaning for day 2. Heart Words holds could, would, should, friend and
 * because (with the Teacher plan; a teacher can type any word for free), so it is the second asset of the last lesson.
 * Texas rows for the seven new points; every other curriculum: not yet read.
 *
 *   node scripts/units/year/place-ready-s.en.literacy.js <round-1 notes.json> <round-3 notes.json>
 *   (refuses to run twice; checks before it writes)
 * Then: build-points · after-publish.sh · every curricula/build-<x>.js · notes/apply.js · assemble --loc=en · pacing ·
 *       assemble · the unit check of the unit that lost a lesson · build-guide --unit (three units) ·
 *       build-year-plan --plan=plan-2-literacy · build-looks
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const file = (f) => path.join(REPO, f);
const read = (f) => fs.readFileSync(file(f), 'utf8');
const jsonLike = (raw, obj) => {   // keeps the file's indent and line ends
  const indent = (/^\{\r?\n(\s+)"/.exec(raw) || [, ' '])[1];
  let out = JSON.stringify(obj, null, indent); if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
  return out + (/\r?\n$/.test(raw) ? (raw.includes('\r\n') ? '\r\n' : '\n') : '');
};
const [N1, N3] = process.argv.slice(2);
if (!N1 || !N3 || !fs.existsSync(N1) || !fs.existsSync(N3)) throw new Error('usage: place-ready-s.en.literacy.js <round-1 notes.json> <round-3 notes.json>');
const R1 = JSON.parse(fs.readFileSync(N1, 'utf8')), R3 = JSON.parse(fs.readFileSync(N3, 'utf8'));
const NOTES = Object.assign({}, { '2:short-or-long-vowel': R1['2:short-or-long-vowel'], '2:vowel-teams-long-a-e-o': R1['2:vowel-teams-long-a-e-o'] }, R3);
const DEC = '«decoding words with short, long, or variant vowels, trigraphs, and blends»';
const SPELL = '«spelling one-syllable and multisyllabic words with closed syllables; open syllables; VCe syllables; vowel teams, including digraphs and diphthongs; r-controlled syllables; and final stable syllables»';
const MULTI = '«decoding multisyllabic words with closed syllables; open syllables; VCe syllables; vowel teams, including digraphs and diphthongs; r-controlled syllables; and final stable syllables»';
const U1 = 'g2-long-vowels-and-vowel-teams', U2 = 'g2-bossy-r-and-longer-words';
const POINTS = [
  { tp: '2:short-or-long-vowel', unit: U1, code: 'RF.2.3.a', types: ['G2-530'], activities: ['cvc-builder.build-magic-e.rf-1-3-silent-e'], design: 'Short or long vowel?', max: 1930,
    skill: 'Tell short from long vowels in regularly spelled one-syllable words and sort the words by vowel sound',
    tx: [['ELAR.2.2.A.ii', 'teaches'], ['ELAR.2.2.B.i', 'teaches']], txWhy: 'Sorting one-syllable words by a short or a long vowel is «distinguishing between long and short vowel sounds in one-syllable and multi-syllable words»; reading them is ' + DEC + '.' },
  { tp: '2:vowel-teams-long-a-e-o', unit: U1, code: 'RF.2.3.b', types: ['G2-531'], activities: ['syllable-builder.build-vowel-teams.rf-1-3'], design: 'Vowel teams for long a, e, and o', max: 1930,
    skill: 'Read and spell words with the vowel teams ai, ay, ee, ea, oa, and ow and choose the team a word takes',
    tx: [['ELAR.2.2.B.i', 'teaches'], ['ELAR.2.2.C.i', 'teaches']], txWhy: 'Reading words with ai, ay, ee, ea, oa, and ow is ' + DEC + '; choosing and writing the team is ' + SPELL + '.' },
  { tp: '2:vowel-sounds-oo-ou-ow-oi-oy', unit: U1, code: 'RF.2.3.b', types: ['G2-532', 'G2-543'], activities: [], design: 'oo, ou, ow, oi, and oy', max: 1480,
    skill: 'Read and spell words with oo (moon, book), ou and ow (cloud, cow), and oi and oy (coin, boy)',
    tx: [['ELAR.2.2.B.i', 'teaches'], ['ELAR.2.2.C.i', 'teaches']], txWhy: 'Reading words with oo, ou, ow, oi, and oy is ' + DEC + ' (the variant vowels); writing them is ' + SPELL + ' (the diphthongs).' },
  { tp: '2:bossy-r-ar-or', unit: U2, code: 'RF.2.3.b', types: ['G2-533', 'G2-544'], activities: [], design: 'ar and or', max: 1480,
    skill: 'Read and spell words where r changes the vowel: ar as in car and or as in fork',
    tx: [['ELAR.2.2.C.i', 'teaches'], ['ELAR.2.2.B.iii', 'prepares']], txWhy: 'Reading and writing one-syllable words with ar and or is ' + SPELL + ' (the r-controlled syllables); it prepares ' + MULTI + '.' },
  { tp: '2:er-ir-ur', unit: U2, code: 'RF.2.3.e', types: ['G2-534', 'G2-545'], activities: [], design: 'er, ir, and ur: one sound, three spellings', max: 1480,
    skill: 'Read words with er, ir, and ur, which say the same sound, and check which spelling a word takes',
    tx: [['ELAR.2.2.C.i', 'teaches'], ['ELAR.2.2.B.iii', 'prepares']], txWhy: 'Reading words with er, ir, and ur and checking their spelling is ' + SPELL + ' (the r-controlled syllables); it prepares ' + MULTI + '.' },
  { tp: '2:long-vowels-two-syllable-words', unit: U2, code: 'RF.2.3.c', types: ['G2-546', 'G2-547'], activities: [], design: 'Long vowels in two-syllable words', max: 1480,
    skill: 'Split and read two-syllable words that have a long vowel in one syllable (rainbow, cupcake, paper)',
    tx: [['ELAR.2.2.B.iii', 'teaches'], ['ELAR.2.2.B.v', 'prepares']], txWhy: 'Splitting and reading two-syllable words with a vowel team, a silent e, or an open syllable is ' + MULTI + '; it prepares «decoding words using knowledge of syllable division patterns such as VCCV, VCV, and VCCCV».' },
  { tp: '2:tricky-words-could-would-should', unit: U2, code: 'RF.2.3.f', types: ['G2-548'], activities: [], tool: 'heart-words', design: 'Tricky words: could, would, should', max: 1930,
    skill: 'Read and spell common words with a part that does not follow the rules (could, would, should, because, friend)',
    tx: [['ELAR.2.2.B.vii', 'teaches']], txWhy: 'Reading and writing could, would, should, because, and friend by mapping their sounds and learning the tricky part is «identifying and reading high-frequency words from a research-based list».' },
];
const MOVED = { tp: '2:digraphs', from: 'g2-spelling-and-word-building' };
const UNITS = [
  { id: U1, slug: 'long-vowels-and-vowel-teams-grade-2-unit', status: 'live', grade: '2', subject: 'literacy', title: 'Long Vowels and Vowel Teams',
    metaTitle: 'Grade 2 Lesson Plans: Long Vowels and Vowel Teams',
    metaDescription: 'A Grade 2 phonics unit: 4 lessons that review the digraph sh, then teach short and long vowels, the vowel teams ai, ay, ee, ea, oa, ow, and oo, ou, ow, oi, oy.', weeks: 2,
    place: { before: 'g2-sentences-and-grammar' } },
  { id: U2, slug: 'bossy-r-and-longer-words-grade-2-unit', status: 'live', grade: '2', subject: 'literacy', title: 'Bossy R and Longer Words',
    metaTitle: 'Grade 2 Lesson Plans: Bossy R and Longer Words',
    metaDescription: 'A Grade 2 phonics unit: 4 lessons on bossy r (ar, or, er, ir, ur), long vowels in two-syllable words, and the heart words could, would, and should.', weeks: 2,
    place: { after: 'g2-sentences-and-grammar' } },
];
const FROM_DESCRIPTION = 'A Grade 2 unit: 5 lessons on spelling rules, compound words, root words, synonyms, and more exact words for "said."';
const PLAN_ID = 'plan-2-literacy';
const DESIGN_UNITS = { [U1]: 'new:long-vowels-and-vowel-teams-g2', [U2]: 'new:r-controlled-and-longer-words' };
const ORDER_AFTER = { [U1]: '2:digraphs', [U2]: '2:pronouns' };

// ---- everything is read and checked first
for (const u of UNITS) { if (u.metaDescription.length < 110 || u.metaDescription.length > 170) throw new Error('description of ' + u.id + ': ' + u.metaDescription.length + ' characters'); if (u.metaTitle.length > 60) throw new Error('meta title of ' + u.id); }
if (FROM_DESCRIPTION.length < 110 || FROM_DESCRIPTION.length > 170) throw new Error('description of the unit the lesson leaves: ' + FROM_DESCRIPTION.length + ' characters');
for (const p of POINTS) {
  const n = NOTES[p.tp]; if (!n || !n.title || !n.objective || !n.mistake || !n.words || !n.watch) throw new Error('no whole teacher note of ' + p.tp);
  n.words = n.words.split('With Premium:').join('With the Teacher plan:');   // the site's paid plan is the Teacher plan
  if (/Premium/.test(n.objective + n.mistake + n.words + n.watch)) throw new Error('the note of ' + p.tp + ' still names Premium');
  const len = n.objective.length + n.mistake.length + n.words.length + n.watch.length; if (len > p.max) throw new Error('the note of ' + p.tp + ' has ' + len + ' letters (its sheet holds about ' + p.max + ')');
}
const out = [];   // [file, text]
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before');
    j.points.push(Object.assign({ tp: p.tp, grade: '2', strand: 'Foundational Skills', code: p.code, skill: p.skill }, p.activities.length ? { activities: p.activities } : {})); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/tools.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS.filter((x) => x.tool)) { const t = j.tools[p.tool]; if (!t) throw new Error('no tool ' + p.tool); if (t.points.includes(p.tp)) throw new Error(p.tool + ' lists ' + p.tp + ' already'); t.points.push(p.tp); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  const list = j.subjects.literacy['2'];
  for (const u of [U1, U2]) { const at = list.indexOf(ORDER_AFTER[u]); if (at < 0) throw new Error('order: no ' + ORDER_AFTER[u]); list.splice(at + 1, 0, ...POINTS.filter((p) => p.unit === u).map((p) => p.tp)); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/type-additions.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) for (const type of p.types) { if (j.types[type]) throw new Error(type + ' is listed already'); j.types[type] = p.tp; }
  out.push([f, jsonLike(raw, j)]);
}
for (const loc of fs.readdirSync(file('frontend/content/curricula')).filter((d) => fs.existsSync(file(`frontend/content/curricula/${d}/crosswalk-authored.json`)))) {
  const f = `frontend/content/curricula/${loc}/crosswalk-authored.json`, raw = read(f), j = JSON.parse(raw);
  const holder = j.points || j;
  for (const p of POINTS) {
    if (holder[p.tp]) throw new Error(loc + ': ' + p.tp + ' is authored already');
    holder[p.tp] = loc === 'en-tx'
      ? { rows: p.tx.map(([id, rel]) => ({ id, rel })), why: p.txWhy, review: 'year-design 2026-11-18' }
      : { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-18 for the English phonics of Grade 2 (Part 12.3: long and short vowels, vowel teams, bossy r, two-syllable words, heart words); they are spellings of English, and another language teaches its own. Read it against the wording when the phonics units of this language are designed.', review: 'year-design 2026-11-18' };
  }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
  if (defs.units.some((x) => UNITS.some((u) => u.id === x.id || u.slug === x.slug))) throw new Error('a unit exists already');
  const from = defs.units.find((x) => x.id === MOVED.from); if (!from) throw new Error('no unit ' + MOVED.from);
  const i = from.lessons.findIndex((l) => l.point === MOVED.tp); if (i < 0) throw new Error(MOVED.from + ' has no lesson ' + MOVED.tp);
  const moved = from.lessons.splice(i, 1)[0];
  if (from.lessons.length < 4) throw new Error(MOVED.from + ' would keep ' + from.lessons.length + ' lessons');
  if (!/6 lessons that review the digraph sh/.test(from.metaDescription)) throw new Error('the description of ' + MOVED.from + ' is not the one this script replaces: ' + from.metaDescription);
  from.metaDescription = FROM_DESCRIPTION;
  const plan = defs.plans.find((x) => x.id === PLAN_ID); if (!plan) throw new Error('no plan ' + PLAN_ID);
  for (const u of UNITS) {
    const lessons = POINTS.filter((p) => p.unit === u.id).map((p) => ({ point: p.tp, types: p.types }));
    const unit = { id: u.id, slug: u.slug, status: u.status, grade: u.grade, subject: u.subject, title: u.title, metaTitle: u.metaTitle, metaDescription: u.metaDescription, weeks: u.weeks,
      lessons: u.id === U1 ? [moved, ...lessons] : lessons };
    const anchor = u.place.before || u.place.after, off = u.place.before ? 0 : 1;
    const a = defs.units.findIndex((x) => x.id === anchor); if (a < 0) throw new Error('no unit ' + anchor);
    defs.units.splice(a + off, 0, unit);
    const k = plan.units.indexOf(anchor); if (k < 0) throw new Error(PLAN_ID + ' does not hold ' + anchor);
    plan.units.splice(k + off, 0, u.id);
    console.log('to place: ' + u.id + ' (' + unit.lessons.length + ' lessons) ' + (u.place.before ? 'before ' : 'after ') + anchor);
  }
  out.push([f, jsonLike(raw, defs)]);
  console.log(MOVED.from + ' keeps ' + from.lessons.length + ' lessons; ' + PLAN_ID + ': ' + plan.units.join(' > '));
}
{
  const f = 'scripts/units/year/design.en.literacy.json', raw = read(f), design = JSON.parse(raw);
  let marked = 0;
  (function walk(o) { if (Array.isArray(o)) return o.forEach(walk); if (o && typeof o === 'object') { const uid = Object.keys(DESIGN_UNITS).find((k) => DESIGN_UNITS[k] === o.id); if (uid && o.lessons) { for (const l of o.lessons) { const p = POINTS.find((x) => x.unit === uid && x.design === l.title); if (p) { if (l.placed) throw new Error('the design lesson ' + l.title + ' is placed already'); l.placed = p.tp; marked++; } } return; } Object.values(o).forEach(walk); } })(design);
  if (marked !== POINTS.length) throw new Error('the design names ' + marked + ' of the ' + POINTS.length + ' lessons');
  out.push([f, jsonLike(raw, design)]);
}
{
  const f = 'scripts/units/notes/en-literacy-year2.js', raw = read(f); let s = raw.replace(/\r\n/g, '\n');
  if (POINTS.some((p) => s.includes("'" + p.tp + "'"))) throw new Error('a note of the units is in ' + f + ' already');
  const BS = String.fromCharCode(92);
  const q = (x) => "'" + String(x).split(BS).join(BS + BS).split("'").join(BS + "'") + "'";
  const block = POINTS.map((p) => { const n = NOTES[p.tp]; return `    ${q(p.tp)}: {\n      title: ${q(n.title)},\n      objective: ${q(n.objective)},\n      note: {\n        mistake: ${q(n.mistake)},\n        words: ${q(n.words)},\n        watch: ${q(n.watch)},\n      },\n    },\n`; }).join('');
  const end = '  },\n};\n'; if (!s.endsWith(end)) throw new Error(f + ' does not end as expected');
  const head = ' * `node scripts/units/notes/apply.js` merges every file'; if (s.split(head).length !== 2) throw new Error(f + ': no place for the head line');
  s = s.replace(head, () => ' * The seven notes of the units Long Vowels and Vowel Teams and Bossy R and Longer Words (G2-530 to G2-534, G2-543 to\n * G2-548) were added by place-ready-s.en.literacy.js; the reviewer of the pages read them (2026-11-18, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.push([f, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; units placed in ' + PLAN_ID + '; notes written; design marked');
