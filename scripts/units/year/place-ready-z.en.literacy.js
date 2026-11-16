#!/usr/bin/env node
/**
 * Part 12.3, English literacy, twenty-second run (2026-11-18): the Grade 1 unit Two-Syllable Words on the four page
 * types of "Year pages, literacy Z" (types/_shared/syllables-g1.js).
 *
 *   Two-Syllable Words (NEW unit, last in the Grade 1 literacy plan, as the year design has it)
 *     Every syllable has a vowel            G1-600 (day 1), G1-601 (day 2)            point 1:syllable-vowel (it existed
 *                                                                                      without a lesson)        RF.1.3.d
 *     Compound words and two-part words     G1-602 + Domino's Two-Part Words (screen) NEW 1:compound-and-two-part-words RF.1.3.e
 *     Syllables (split rab | bit)           G1-305, G1-325 + the tool Syllable Splitter  point 1:syllables-split  MOVED from
 *                                                                                      Sounds, Spelling, and Syllables
 *     Tricky words: said, was, of, could    G1-603 + the tool Heart Words             NEW 1:tricky-words-said-was-of-could RF.1.3.g
 *
 * The order is the reviewer's (2026-11-18): the vowel rule is the tool the split lesson uses, and compounds are the
 * easiest two-part words. The moved lesson no longer shows Domino's Two-Part Words (the lesson before it does): its
 * two page types and the tool are its assets. The unit it leaves keeps four lessons and takes the design's title
 * Sounds and Short-Vowel Words (its address stays). Texas rows for the two new points.
 *
 *   node scripts/units/year/place-ready-z.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
 * Then: build-points · build-assets · every curricula/build-<x>.js · notes/apply.js · assemble --loc=en · pacing ·
 *       assemble · build-checks --unit=g1-sounds-spelling-syllables (compare the card hashes) · build-guide --unit (two) ·
 *       build-year-plan --plan=plan-1-literacy · build-looks
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
const NF = process.argv[2];
if (!NF || !fs.existsSync(NF)) throw new Error('usage: place-ready-z.en.literacy.js <notes.json>');
const straight = (s) => String(s).split('’').join("'").split('‘').join("'");
const NOTES = JSON.parse(fs.readFileSync(NF, 'utf8'));
const OLD = 'g1-sounds-spelling-syllables', NEW = 'g1-two-syllable-words';
// the lessons of the new unit, in order; `existing` = the point is there already, `moved` = its lesson comes from OLD
const LESSONS = [
  { tp: '1:syllable-vowel', existing: true, types: ['G1-600', 'G1-601'], design: 'Every syllable has a vowel', max: 1480 },
  { tp: '1:compound-and-two-part-words', code: 'RF.1.3.e', types: ['G1-602'], activities: ['domino-two-part.two-syllable.rf-1-3-e'], design: 'Compound words and two-part words', max: 1930,
    skill: 'Read compound words and other two-part words by splitting them into two parts a first grader can read',
    tx: [['ELAR.1.2.B.iv', 'teaches'], ['ELAR.1.2.B.iii', 'teaches']], txWhy: 'Reading a compound word as two small words is «using knowledge of base words to decode common compound words and contractions»; splitting rab | bit and nap | kin into two closed syllables is «decoding words with closed syllables».' },
  { tp: '1:syllables-split', moved: true },
  { tp: '1:tricky-words-said-was-of-could', code: 'RF.1.3.g', types: ['G1-603'], activities: [], tool: 'heart-words', design: 'Tricky words: said, was, of, could', max: 1930,
    skill: 'Read and spell common irregular words (said, was, of, could) by mapping the regular sounds and remembering the tricky part',
    tx: [['ELAR.1.2.B.vi', 'teaches'], ['ELAR.1.2.C.iv', 'teaches']], txWhy: 'Reading said, was, of and could is «identifying and reading at least 100 high-frequency words from a research-based list»; writing them with their tricky part is «spelling high-frequency words from a research-based list».' },
];
const NEWPOINTS = LESSONS.filter((l) => !l.existing && !l.moved);
const NOTED = LESSONS.filter((l) => !l.moved);
const NEW_UNIT = { id: NEW, slug: 'two-syllable-words-grade-1-unit', status: 'live', grade: '1', subject: 'literacy', title: 'Two-Syllable Words',
  metaTitle: 'Grade 1 Phonics Lesson Plans: Two-Syllable Words',
  metaDescription: 'A Grade 1 phonics unit: 4 lessons on the vowel in every syllable, compound words, splitting words into syllables, and the heart words said, was, of, and could.', weeks: 2 };
const OLD_META = { title: 'Sounds and Short-Vowel Words', metaTitle: 'Grade 1 Lesson Plans: Sounds and Short-Vowel Words',
  metaDescription: 'A Grade 1 unit on short-vowel words: 4 lessons on rhymes, word families, sound boxes, and spelling picture words, each with a teacher note and pages to print.' };
const OLD_RE = /5 lessons on rhymes, word families, sound boxes, spelling picture words, and splitting words into syllables/;
const PLAN_ID = 'plan-1-literacy';
const DESIGN_UNIT = 'new:two-syllable-words';
const ORDER_AFTER = '1:syllable-vowel';
const NOTES_FILE = 'scripts/units/notes/en-literacy-year1.js';

// ---- everything is read and checked first
for (const [what, m] of [['the new unit', NEW_UNIT], ['the unit the lesson leaves', OLD_META]]) {
  if (m.metaDescription.length < 110 || m.metaDescription.length > 170) throw new Error('description of ' + what + ': ' + m.metaDescription.length + ' characters');
  if (m.metaTitle.length > 60) throw new Error('meta title of ' + what + ': ' + m.metaTitle.length);
}
for (const p of NOTED) {
  const n = NOTES[p.tp]; if (!n || !n.title || !n.objective || !n.mistake || !n.words || !n.watch) throw new Error('no whole teacher note of ' + p.tp);
  for (const k of ['title', 'objective', 'mistake', 'words', 'watch']) n[k] = straight(n[k]);
  if (/\bfree\b|Premium/i.test(n.title + n.objective + n.mistake + n.words + n.watch)) throw new Error('the note of ' + p.tp + ' says free or Premium');
  const len = n.objective.length + n.mistake.length + n.words.length + n.watch.length; if (len > p.max) throw new Error('the note of ' + p.tp + ' has ' + len + ' letters (its sheet holds about ' + p.max + ')');
}
const out = [];   // [file, text]
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  const all = JSON.parse(read('frontend/content/teaching-graph/points.json')); const allPts = Array.isArray(all.points || all) ? (all.points || all) : Object.values(all.points || all);
  for (const p of LESSONS.filter((l) => l.existing || l.moved)) if (!allPts.some((x) => (x.tp || x.id) === p.tp)) throw new Error('the point ' + p.tp + ' does not exist');
  for (const p of NEWPOINTS) { if (j.points.some((x) => x.tp === p.tp) || allPts.some((x) => (x.tp || x.id) === p.tp)) throw new Error(p.tp + ' exists: this script ran before');
    j.points.push(Object.assign({ tp: p.tp, grade: '1', strand: 'Foundational Skills', code: p.code, skill: p.skill }, p.activities.length ? { activities: p.activities } : {})); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/tools.json', raw = read(f), j = JSON.parse(raw);
  for (const p of NEWPOINTS.filter((x) => x.tool)) { const t = j.tools[p.tool]; if (!t) throw new Error('no tool ' + p.tool); if (t.points.includes(p.tp)) throw new Error(p.tool + ' lists ' + p.tp + ' already'); t.points.push(p.tp); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  const list = j.subjects.literacy['1'];
  const at = list.indexOf(ORDER_AFTER); if (at < 0) throw new Error('order: no ' + ORDER_AFTER);
  list.splice(at + 1, 0, ...NEWPOINTS.map((p) => p.tp));
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/type-additions.json', raw = read(f), j = JSON.parse(raw);
  for (const p of NOTED) for (const type of p.types) { if (j.types[type]) throw new Error(type + ' is listed already'); j.types[type] = p.tp; }
  out.push([f, jsonLike(raw, j)]);
}
for (const loc of fs.readdirSync(file('frontend/content/curricula')).filter((d) => fs.existsSync(file(`frontend/content/curricula/${d}/crosswalk-authored.json`)))) {
  const f = `frontend/content/curricula/${loc}/crosswalk-authored.json`, raw = read(f), j = JSON.parse(raw);
  const holder = j.points || j;
  for (const p of NEWPOINTS) {
    if (holder[p.tp]) throw new Error(loc + ': ' + p.tp + ' is authored already');
    holder[p.tp] = loc === 'en-tx'
      ? { rows: p.tx.map(([id, rel]) => ({ id, rel })), why: p.txWhy, review: 'year-design 2026-11-18' }
      : { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-18 for the English phonics of Grade 1 (Part 12.3: compound and two-part words, the irregular words said, was, of, could); these are spellings of English, and another language teaches its own. Read it against the wording when the phonics units of this language are designed.', review: 'year-design 2026-11-18' };
  }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
  if (defs.units.some((x) => x.id === NEW_UNIT.id || x.slug === NEW_UNIT.slug)) throw new Error('the new unit exists already');
  const old = defs.units.find((x) => x.id === OLD); if (!old) throw new Error('no unit ' + OLD);
  if (!OLD_RE.test(old.metaDescription)) throw new Error('the description of ' + OLD + ' is not the one this script replaces: ' + old.metaDescription);
  const lessons = LESSONS.map((p) => {
    if (!p.moved) return { point: p.tp, types: p.types };
    const i = old.lessons.findIndex((l) => l.point === p.tp); if (i < 0) throw new Error(OLD + ' has no lesson ' + p.tp);
    return Object.assign(old.lessons.splice(i, 1)[0], { activity: null });   // the lesson before it shows the activity this one showed
  });
  if (old.lessons.length < 4) throw new Error(OLD + ' would keep ' + old.lessons.length + ' lessons');
  Object.assign(old, OLD_META);
  const plan = defs.plans.find((x) => x.id === PLAN_ID); if (!plan) throw new Error('no plan ' + PLAN_ID);
  const unit = Object.assign({}, NEW_UNIT, { lessons });
  defs.units.splice(defs.units.findIndex((x) => x.id === plan.units[plan.units.length - 1]) + 1, 0, unit);
  plan.units.push(NEW_UNIT.id);
  out.push([f, jsonLike(raw, defs)]);
  console.log(OLD + ': ' + old.lessons.map((l) => l.point).join(' · '));
  console.log(NEW + ': ' + unit.lessons.map((l) => l.point + ' [' + l.types.join('+') + ']').join(' · '));
  console.log(PLAN_ID + ': ' + plan.units.join(' > '));
}
{
  const f = 'scripts/units/year/design.en.literacy.json', raw = read(f), design = JSON.parse(raw);
  let marked = 0;
  (function walk(o) { if (Array.isArray(o)) return o.forEach(walk); if (o && typeof o === 'object') { if (o.id === DESIGN_UNIT && o.lessons) { for (const l of o.lessons) { const p = NOTED.find((x) => x.design === l.title); if (p) { if (l.placed) throw new Error('the design lesson ' + l.title + ' is placed already'); l.placed = p.tp; marked++; } } return; } Object.values(o).forEach(walk); } })(design);
  if (marked !== NOTED.length) throw new Error('the design names ' + marked + ' of the ' + NOTED.length + ' lessons');
  out.push([f, jsonLike(raw, design)]);
}
{
  const raw = read(NOTES_FILE); let s = raw.replace(/\r\n/g, '\n');
  if (NOTED.some((p) => s.includes("'" + p.tp + "'"))) throw new Error('a note of the lessons is in ' + NOTES_FILE + ' already');
  const BS = String.fromCharCode(92);
  const q = (x) => "'" + String(x).split(BS).join(BS + BS).split("'").join(BS + "'") + "'";
  const block = NOTED.map((p) => { const n = NOTES[p.tp]; return `    ${q(p.tp)}: {\n      title: ${q(n.title)},\n      objective: ${q(n.objective)},\n      note: {\n        mistake: ${q(n.mistake)},\n        words: ${q(n.words)},\n        watch: ${q(n.watch)},\n      },\n    },\n`; }).join('');
  const end = '  },\n};\n'; if (!s.endsWith(end)) throw new Error(NOTES_FILE + ' does not end as expected');
  const head = ' * `node scripts/units/notes/apply.js` merges every file'; if (s.split(head).length !== 2) throw new Error(NOTES_FILE + ': no place for the head line');
  s = s.replace(head, () => ' * The three notes of the unit Two-Syllable Words (G1-600 to G1-603) were added by place-ready-z.en.literacy.js;\n * the reviewer of the pages read them (2026-11-18, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.push([NOTES_FILE, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + NEWPOINTS.map((p) => p.tp).join(', ') + '; unit ' + NEW + ' placed in ' + PLAN_ID + '; notes written; design marked');
