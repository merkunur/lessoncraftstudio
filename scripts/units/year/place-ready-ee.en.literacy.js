#!/usr/bin/env node
/**
 * Part 12.3, English literacy, twenty-ninth run (2026-11-17): the Kindergarten unit How Books and Print Work on
 * the eight page types of "Year pages, literacy EE" (types/_shared/print-concepts-k.js). Every lesson has two page
 * types: no screen activity or tool of the site teaches these.
 *
 *   How Books and Print Work (NEW unit, second in the Kindergarten literacy plan, as the year design has it)
 *     Front cover, back cover, and title page      K-665, K-666   NEW K:book-parts               RI.K.5
 *     Read left to right, top to bottom            K-667, K-668   NEW K:left-to-right            RF.K.1.a
 *     One spoken word, one written word            K-669, K-670   NEW K:spoken-written-words     RF.K.1.b
 *     Spaces between words: count the words        K-671, K-672   NEW K:spaces-between-words     RF.K.1.c
 *
 * Texas rows for the four new points; every other curriculum: not yet read.
 *
 *   node scripts/units/year/place-ready-ee.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
 * Then: build-points · build-assets · every curricula/build-<x>.js · notes/apply.js · assemble --loc=en · pacing ·
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
const NF = process.argv[2];
if (!NF || !fs.existsSync(NF)) throw new Error('usage: place-ready-ee.en.literacy.js <notes.json>');
const straight = (s) => String(s).split('’').join("'").split('‘').join("'");
const NOTES = JSON.parse(fs.readFileSync(NF, 'utf8'));
const POINTS = [
  {"tp":"K:book-parts","code":"RI.K.5","strand":"Reading: Informational Text","types":["K-665","K-666"],"max":1480,"design":"Front cover, back cover, and title page","skill":"Identify the front cover, the back cover, and the title page of a book, and find the title and the author on them","tx":[["ELAR.K.2.D.i","teaches"]],"txWhy":"Telling the front cover, the title page and the back cover apart and making a cover and a title page of one's own is «identifying the front cover, back cover, and title page of a book»."},
  {"tp":"K:left-to-right","code":"RF.K.1.a","strand":"Foundational Skills","types":["K-667","K-668"],"max":1480,"design":"Read left to right, top to bottom","skill":"Follow print from left to right and from top to bottom, with the return sweep to the next line, and page by page","tx":[["ELAR.K.2.D.ii","teaches"]],"txWhy":"Marking where reading starts and stops, drawing the arrow under each line and back to the next line, and numbering lines and pages is «knowing that reading moves from top to bottom and left to right with return sweep»; holding a book and turning its pages is done with a real book, as the note says."},
  {"tp":"K:spoken-written-words","code":"RF.K.1.b","strand":"Foundational Skills","types":["K-669","K-670"],"max":1480,"design":"One spoken word, one written word","skill":"Match each spoken word to one written word, and tell a written word from a single letter and from a scribble","tx":[["ELAR.K.2.D.iv","teaches"],["ELAR.K.2.D.iii","teaches"]],"txWhy":"Circling the word among a letter, a digit and a scribble is «recognizing the difference between a letter and a printed word»; putting one dot under each word of a sentence the teacher says is «recognizing word boundaries»."},
  {"tp":"K:spaces-between-words","code":"RF.K.1.c","strand":"Foundational Skills","types":["K-671","K-672"],"max":1480,"design":"Spaces between words: count the words","skill":"See that words are separated by spaces in print: count the words of a sentence and leave a finger space between words","tx":[["ELAR.K.2.D.iii","teaches"]],"txWhy":"Drawing a line in each space, counting the words of a sentence, and gluing or copying words with finger spaces is «recognizing that sentences are comprised of words separated by spaces and recognizing word boundaries»."},
];
const GRADE = "K";
const UNIT = {"id":"k-how-books-and-print-work","slug":"how-books-and-print-work-kindergarten-unit","status":"live","grade":"K","subject":"literacy","title":"How Books and Print Work","metaTitle":"How Books and Print Work: Kindergarten Print Concepts","metaDescription":"Kindergarten print concepts: the parts of a book, reading left to right and top to bottom, one written word for each spoken word, and the spaces between words.","weeks":2};
const PLAN_ID = "plan-k-literacy";
const DESIGN_UNIT = "new:how-print-works";
const AFTER_UNIT = "k-letters-and-handwriting", ORDER_AFTER = "K:all-about-me-personal";   // the unit it follows in the plan; the point its points follow in the order
const NOTES_FILE = "scripts/units/notes/en-literacy-yeark.js";

// ---- everything is read and checked first
if (UNIT.metaDescription.length < 110 || UNIT.metaDescription.length > 170) throw new Error('description: ' + UNIT.metaDescription.length + ' characters');
if (UNIT.metaTitle.length > 60) throw new Error('meta title: ' + UNIT.metaTitle.length);
for (const p of POINTS) {
  const n = NOTES[p.tp]; if (!n || !n.title || !n.objective || !n.mistake || !n.words || !n.watch) throw new Error('no whole teacher note of ' + p.tp);
  for (const k of ['title', 'objective', 'mistake', 'words', 'watch']) n[k] = straight(n[k]);
  if (/\bfree\b|Premium/i.test(n.title + n.objective + n.mistake + n.words + n.watch)) throw new Error('the note of ' + p.tp + ' says free or Premium');
  const len = n.objective.length + n.mistake.length + n.words.length + n.watch.length; if (len > p.max) throw new Error('the note of ' + p.tp + ' has ' + len + ' letters (its sheet holds about ' + p.max + ')');
}
const out = [];   // [file, text]
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  const all = JSON.parse(read('frontend/content/teaching-graph/points.json')); const allPts = Array.isArray(all.points || all) ? (all.points || all) : Object.values(all.points || all);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp) || allPts.some((x) => (x.tp || x.id) === p.tp)) throw new Error(p.tp + ' exists: this script ran before');
    j.points.push(Object.assign({ tp: p.tp, grade: GRADE, strand: p.strand, code: p.code, skill: p.skill }, p.activities ? { activities: p.activities } : {})); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  const list = j.subjects.literacy[GRADE], at = list.indexOf(ORDER_AFTER); if (at < 0) throw new Error('no point ' + ORDER_AFTER + ' in the order');
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
      : { none: 'not yet read against this curriculum', why: "The point was added on 2026-11-17 for the print concepts of Kindergarten (Part 12.3: the parts of a book, reading left to right and top to bottom, one written word for each spoken word, the spaces between words); the direction of print and the pages are those of English books. Read it against the wording when the first literacy units of this language are designed.", review: 'year-design 2026-11-17' };
  }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
  if (defs.units.some((x) => x.id === UNIT.id || x.slug === UNIT.slug)) throw new Error('the unit exists already');
  const plan = defs.plans.find((x) => x.id === PLAN_ID); if (!plan) throw new Error('no plan ' + PLAN_ID);
  const unit = Object.assign({}, UNIT, { lessons: POINTS.map((p) => ({ point: p.tp, types: p.types })) });   // a point's screen activity comes from the point itself
  const a = defs.units.findIndex((x) => x.id === AFTER_UNIT), b = plan.units.indexOf(AFTER_UNIT); if (a < 0 || b < 0) throw new Error('no unit ' + AFTER_UNIT + ' in ' + PLAN_ID);
  defs.units.splice(a + 1, 0, unit);
  plan.units.splice(b + 1, 0, UNIT.id);
  out.push([f, jsonLike(raw, defs)]);
  console.log(UNIT.id + ': ' + unit.lessons.map((l) => l.point + ' [' + l.types.join('+') + ']').join(' · '));
  console.log(PLAN_ID + ': ' + plan.units.join(' > '));
}
{
  const f = 'scripts/units/year/design.en.literacy.json', raw = read(f), design = JSON.parse(raw);
  let marked = 0;
  (function walk(o) { if (Array.isArray(o)) return o.forEach(walk); if (o && typeof o === 'object') { if (o.id === DESIGN_UNIT && o.lessons) { for (const l of o.lessons) { const p = POINTS.find((x) => x.design === l.title); if (p) { if (l.placed) throw new Error('the design lesson ' + l.title + ' is placed already'); l.placed = p.tp; marked++; } } return; } Object.values(o).forEach(walk); } })(design);
  if (marked !== POINTS.length) throw new Error('the design names ' + marked + ' of the ' + POINTS.length + ' lessons');
  out.push([f, jsonLike(raw, design)]);
}
{
  const raw = read(NOTES_FILE); let s = raw.replace(/\r\n/g, '\n');
  if (POINTS.some((p) => s.includes("'" + p.tp + "'"))) throw new Error('a note of the lessons is in ' + NOTES_FILE + ' already');
  const BS = String.fromCharCode(92);
  const q = (x) => "'" + String(x).split(BS).join(BS + BS).split("'").join(BS + "'") + "'";
  const block = POINTS.map((p) => { const n = NOTES[p.tp]; return `    ${q(p.tp)}: {\n      title: ${q(n.title)},\n      objective: ${q(n.objective)},\n      note: {\n        mistake: ${q(n.mistake)},\n        words: ${q(n.words)},\n        watch: ${q(n.watch)},\n      },\n    },\n`; }).join('');
  const end = '  },\n};\n'; if (!s.endsWith(end)) throw new Error(NOTES_FILE + ' does not end as expected');
  const head = ' * `node scripts/units/notes/apply.js` merges every file'; if (s.split(head).length !== 2) throw new Error(NOTES_FILE + ': no place for the head line');
  s = s.replace(head, () => ' * The four notes of the unit How Books and Print Work (K-665 to K-672) were added by place-ready-ee.en.literacy.js;\n * the reviewer of the pages read them (2026-11-17, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.push([NOTES_FILE, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; unit placed after ' + AFTER_UNIT + ' in ' + PLAN_ID + '; notes written; design marked');
