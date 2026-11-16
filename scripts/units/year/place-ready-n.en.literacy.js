#!/usr/bin/env node
/**
 * Part 12.3, English literacy, fifteenth run (2026-11-17): the Kindergarten unit Words and Sentences, on the seven
 * Kindergarten page types of "Year pages, literacy N" (types/_shared/sentences-k.js; the bank
 * data/literacy/sentences-k.en.json). The unit stands in the Kindergarten literacy plan after Reading Stories, as the
 * year design has it (with first words read, the class turns to the sentence).
 *
 *   Naming words and action words            K-654, K-658   NEW point K:naming-and-action-words    L.K.1.b
 *   A sentence starts with a capital letter  K-660, K-655   NEW point K:capital-letter             L.K.2.a
 *   A period or a question mark?             K-659, K-656   NEW point K:period-or-question-mark    L.K.2.b
 *   Say more: make the sentence longer       K-657          NEW point K:make-the-sentence-longer   L.K.1.f   + Sunny-Side Diner (screen)
 *
 * Every lesson has two real assets: two page types (a sort or a choice on day 1, the page to write on day 2), or its
 * page type and an activity on screen. The lesson of the design "In, on, under, next to" (L.K.1.e) is NOT placed: its
 * page type K-548 is a maker template whose Level Set (wave ylq) waits for the release of its corrected template.
 * Texas rows for the four new points; every other curriculum: not yet read. The teacher notes (read by the reviewer of
 * the pages) are added to scripts/units/notes/en-literacy-yeark.js by this script.
 *
 *   node scripts/units/year/place-ready-n.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
 * Then: build-points · after-publish.sh yln · every curricula/build-<x>.js · notes/apply.js · assemble --loc=en · pacing ·
 *       assemble · build-guide --unit · build-year-plan --plan=plan-k-literacy · build-looks
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
const NOTES_IN = process.argv[2];
if (!NOTES_IN || !fs.existsSync(NOTES_IN)) throw new Error('usage: place-ready-n.en.literacy.js <notes.json> (the four reviewed teacher notes)');
const NOTES = JSON.parse(fs.readFileSync(NOTES_IN, 'utf8'));
const TX = 'Texas states grammar and conventions inside the editing expectation of kindergarten; ';
const POINTS = [
  { tp: 'K:naming-and-action-words', code: 'L.K.1.b', types: ['K-654', 'K-658'], activities: [], design: 'Naming words and action words',
    skill: 'Tell naming words (nouns) from action words (verbs) and find the action word in a sentence',
    tx: [['ELAR.K.10.D.ii', 'teaches'], ['ELAR.K.10.D.iii', 'prepares']], txWhy: TX + 'telling an action word from a naming word and finding it in a sentence is the convention «verbs», and knowing a naming word prepares «singular and plural nouns».' },
  { tp: 'K:capital-letter', code: 'L.K.2.a', types: ['K-660', 'K-655'], activities: [], design: 'A sentence starts with a capital letter',
    skill: 'Find the capital letter at the start of a sentence and in the word I, and fix a sentence that starts with a small letter',
    tx: [['ELAR.K.10.D.vii', 'teaches']], txWhy: TX + 'finding and writing the capital at the start of a sentence is «capitalization of the first letter in a sentence and name» (the pages use no names).' },
  { tp: 'K:period-or-question-mark', code: 'L.K.2.b', types: ['K-659', 'K-656'], activities: [], design: 'A period or a question mark?',
    skill: 'Tell a telling sentence from an asking sentence and end it with a period or a question mark',
    tx: [['ELAR.K.10.D.viii', 'teaches']], txWhy: TX + 'ending a telling sentence with a period is «punctuation marks at the end of declarative sentences»; the question mark of an asking sentence goes one step further than the Texas kindergarten wording.' },
  { tp: 'K:make-the-sentence-longer', code: 'L.K.1.f', types: ['K-657'], activities: ['sunny-side-diner.compound-order.l-k-1-f'], design: 'Say more: make the sentence longer',
    skill: 'Say a complete sentence about a picture and make it longer with words that tell where or when',
    tx: [['ELAR.K.10.D.i', 'teaches']], txWhy: TX + 'saying a whole sentence about a picture and making it longer is the convention «complete sentences».' },
];
const UNIT = { id: 'k-words-and-sentences', slug: 'words-and-sentences-kindergarten-unit', status: 'live', grade: 'K', subject: 'literacy',
  title: 'Words and Sentences', metaTitle: 'Kindergarten Lesson Plans: Words and Sentences',
  metaDescription: 'A Kindergarten unit on words and sentences: 4 lessons on naming and action words, a capital at the start, the end mark, and longer sentences.', weeks: 2,
  lessons: POINTS.map((p) => ({ point: p.tp, types: p.types })) };
const AFTER = 'k-reading-stories', PLAN_ID = 'plan-k-literacy', AFTER_POINT = 'K:pictures-and-words';
const DESIGN_UNIT = 'new:words-and-sentences-k';
const DESIGN_MARKS = Object.fromEntries(POINTS.map((p) => [p.design, p.tp]));
const STRAND = 'Language';   // the strand of the other grammar points (K:singular-plural, 1:word-classes)

// ---- everything is read and checked first
if (UNIT.metaDescription.length < 110 || UNIT.metaDescription.length > 170) throw new Error('description of ' + UNIT.metaDescription.length + ' characters');
if (UNIT.metaTitle.length > 60) throw new Error('meta title of ' + UNIT.metaTitle.length + ' characters');
for (const p of POINTS) { const n = NOTES[p.tp]; if (!n || !n.title || !n.objective || !n.mistake || !n.words || !n.watch) throw new Error('no whole teacher note of ' + p.tp);
  const len = n.objective.length + n.mistake.length + n.words.length + n.watch.length; if (len > 1930) throw new Error('the note of ' + p.tp + ' has ' + len + ' letters (a sheet of the teacher guide holds about 1,900)'); }
const out = [];   // [file, text]
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before');
    j.points.push(Object.assign({ tp: p.tp, grade: 'K', strand: STRAND, code: p.code, skill: p.skill }, p.activities.length ? { activities: p.activities } : {})); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  const list = j.subjects.literacy['K']; const at = list.indexOf(AFTER_POINT); if (at < 0) throw new Error('order: no ' + AFTER_POINT);
  list.splice(at + 1, 0, ...POINTS.map((p) => p.tp));
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
      ? { rows: p.tx.map(([id, rel]) => ({ id, rel })), why: p.txWhy, review: 'year-design 2026-11-17' }
      : { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-17 for the English Kindergarten unit Words and Sentences (Part 12.3: naming and action words, the capital at the start, the end mark, longer sentences). Read it against the wording when the grammar units of this language are designed.', review: 'year-design 2026-11-17' };
  }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
  if (defs.units.some((x) => x.id === UNIT.id || x.slug === UNIT.slug)) throw new Error(UNIT.id + ' exists');
  const at = defs.units.findIndex((x) => x.id === AFTER); if (at < 0) throw new Error('no unit ' + AFTER);
  defs.units.splice(at + 1, 0, UNIT);
  const plan = defs.plans.find((x) => x.id === PLAN_ID); if (!plan) throw new Error('no plan ' + PLAN_ID);
  const k = plan.units.indexOf(AFTER); if (k < 0) throw new Error(PLAN_ID + ' does not hold ' + AFTER);
  plan.units.splice(k + 1, 0, UNIT.id);
  out.push([f, jsonLike(raw, defs)]);
  console.log('to place: ' + UNIT.id + ' (' + UNIT.lessons.length + ' lessons) after ' + AFTER + '; ' + PLAN_ID + ' has ' + plan.units.length + ' units; ' + defs.units.length + ' units');
}
{
  const f = 'scripts/units/year/design.en.literacy.json', raw = read(f), design = JSON.parse(raw);
  let marked = 0;
  (function walk(o) { if (Array.isArray(o)) return o.forEach(walk); if (o && typeof o === 'object') { if (o.id === DESIGN_UNIT && o.lessons) { for (const l of o.lessons) if (DESIGN_MARKS[l.title]) { if (l.placed) throw new Error('the design lesson ' + l.title + ' is placed already'); l.placed = DESIGN_MARKS[l.title]; marked++; } return; } Object.values(o).forEach(walk); } })(design);
  if (marked !== POINTS.length) throw new Error('the design names ' + marked + ' of the ' + POINTS.length + ' lessons');
  out.push([f, jsonLike(raw, design)]);
}
{
  const f = 'scripts/units/notes/en-literacy-yeark.js', raw = read(f); let s = raw.replace(/\r\n/g, '\n');
  if (POINTS.some((p) => s.includes("'" + p.tp + "'"))) throw new Error('a note of the unit is in ' + f + ' already');
  const BS = String.fromCharCode(92);
  const q = (x) => "'" + String(x).split(BS).join(BS + BS).split("'").join(BS + "'") + "'";
  const block = POINTS.map((p) => { const n = NOTES[p.tp]; return `    ${q(p.tp)}: {\n      title: ${q(n.title)},\n      objective: ${q(n.objective)},\n      note: {\n        mistake: ${q(n.mistake)},\n        words: ${q(n.words)},\n        watch: ${q(n.watch)},\n      },\n    },\n`; }).join('');
  const end = '  },\n};\n'; if (!s.endsWith(end)) throw new Error(f + ' does not end as expected');
  const head = ' * `node scripts/units/notes/apply.js` merges every file'; if (s.split(head).length !== 2) throw new Error(f + ': no place for the head line');
  s = s.replace(head, () => ' * The four notes of the unit Words and Sentences (K-654 to K-660) were added by place-ready-n.en.literacy.js;\n * the reviewer of the pages read them (2026-11-17, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.push([f, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; unit placed in ' + PLAN_ID + '; notes written; design marked');
