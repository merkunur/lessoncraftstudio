#!/usr/bin/env node
/**
 * Part 12.3, English literacy, thirty-sixth run (2026-11-17): the Grade 2 unit Writing to Inform on the six page
 * types of "Year pages, literacy LL" (types/_shared/informative-writing-g2.js), as the year design has it: the lesson
 * An animal fact file MOVES here from the unit Reading Stories and Writing (which keeps its slug and title), and
 * three new lessons follow it. Every new lesson has two page types.
 *
 *   Writing to Inform (NEW unit, after Reading to Learn: Informational Texts)
 *     An animal fact file                          G2-339, G2-340   MOVED 2:animal-fact-file
 *     Plan an informative piece                    G2-565, G2-566   NEW 2:plan-informative-piece    W.2.2
 *     Draft with facts and a closing               G2-567, G2-568   NEW 2:draft-facts-closing       W.2.2
 *     Research with two books: a class report      G2-569, G2-570   NEW 2:research-class-report     W.2.7
 *
 * The unit check of Reading Stories and Writing loses its part on the animal fact file and keeps three (story
 * questions, missing words, cursive): rebuild it after this script (assessments/build-checks.js --unit).
 * Texas rows for the three new points; every other curriculum: not yet read.
 *
 *   node scripts/units/year/place-ready-ll.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
 * Then: build-points · build-assets · every curricula/build-<x>.js · notes/apply.js · assemble --loc=en · pacing ·
 *       assemble · build-guide --unit · build-year-plan --plan=plan-2-literacy · build-looks
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
if (!NF || !fs.existsSync(NF)) throw new Error('usage: place-ready-ll.en.literacy.js <notes.json>');
const straight = (s) => String(s).split('’').join("'").split('‘').join("'");
const NOTES = JSON.parse(fs.readFileSync(NF, 'utf8'));
const POINTS = [
  {"tp":"2:plan-informative-piece","code":"W.2.2","strand":"Writing","types":["G2-565","G2-566"],"max":1480,"design":"Plan an informative piece","skill":"Find the topic sentence and the closing sentence of an informative piece, sort facts under headings, and plan a piece with a topic sentence, facts, a definition, and a closing sentence","tx":[["ELAR.2.11.A","teaches"],["ELAR.2.11.B.i","prepares"]],"txWhy":"Filling the planner (a topic sentence, three facts, a definition, a closing sentence) from a box of facts is «plan a first draft by generating ideas for writing»; sorting facts under two headings and crossing out the sentence that does not belong prepares «organizing with structure»."},
  {"tp":"2:draft-facts-closing","code":"W.2.2","strand":"Writing","types":["G2-567","G2-568"],"max":1480,"design":"Draft with facts and a closing","skill":"Write an informative piece with a topic sentence, facts joined by also, another, and and, a definition, and a closing sentence that gives no new fact","tx":[["ELAR.2.12.B","teaches"],["ELAR.2.11.B.i","teaches"],["ELAR.2.11.B.ii","teaches"]],"txWhy":"Writing the piece from the plan is «compose informational texts, including procedural texts and reports»; keeping the facts of one heading together between a topic sentence and a closing sentence is «organizing with structure»; the facts and the definition of a word are «developing an idea with specific and relevant details»."},
  {"tp":"2:research-class-report","code":"W.2.7","strand":"Writing","types":["G2-569","G2-570"],"max":1480,"design":"Research with two books: a class report","skill":"Read two short books on one topic, take short notes that keep each fact true and tell which book it came from, and write one part of a class report","tx":[["ELAR.2.13.C","teaches"],["ELAR.2.13.E","teaches"],["ELAR.2.13.G","teaches"],["ELAR.2.13.F","prepares"],["ELAR.2.12.B","teaches"]],"txWhy":"Taking notes from two short books to answer the class question is «identify and gather relevant sources and information to answer the questions»; writing the facts in own words under a heading is «demonstrate understanding of information gathered»; the part of the class report is «use an appropriate mode of delivery, whether written, oral, or multimodal, to present results» and a report as 2.12.B names it; marking which book a fact came from and naming both titles prepares «cite sources appropriately». The question is given, so 2.13.A (generate questions) is not claimed."},
];
const GRADE = "2";
const UNIT = {"id":"g2-writing-to-inform","slug":"writing-to-inform-grade-2-unit","status":"live","grade":"2","subject":"literacy","title":"Writing to Inform","metaTitle":"Writing to Inform: Grade 2 Informative Writing Unit","metaDescription":"Grade 2 informative writing lessons: an animal fact file, a plan with facts under headings, a draft with a definition and a closing, and a class report from two books.","weeks":2};
const PLAN_ID = "plan-2-literacy";
const DESIGN_UNIT = "new:informative-writing-g2";
const AFTER_UNIT = "g2-reading-to-learn-informational-texts", ORDER_AFTER = "2:compare-two-animals";   // the unit it follows in the plan; the point its points follow in the order
const MOVED_FROM = "g2-stories-facts-and-writing", MOVED = ["2:animal-fact-file"];   // lessons of a live unit that move into this one, whole
const LESSON_ORDER = ["2:animal-fact-file","2:plan-informative-piece","2:draft-facts-closing","2:research-class-report"];   // the unit's lessons, moved and new
const OLD_RE = new RegExp("^A Grade 2 unit: 8 lessons on story questions"), OLD_DESCRIPTION = "A Grade 2 unit: 7 lessons on story questions, context clues, describing a picture, retelling, characters, fables, and cursive.";   // the unit the lessons leave says what it still holds
const NOTES_FILE = "scripts/units/notes/en-literacy-year2.js";

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
  for (const tp of MOVED) { const mi = list.indexOf(tp); if (mi < 0) throw new Error('no point ' + tp + ' in the order'); list.splice(mi, 1); }
  const at2 = list.indexOf(ORDER_AFTER); if (at2 < 0) throw new Error('no point ' + ORDER_AFTER + ' in the order');
  list.splice(at2 + 1, 0, ...LESSON_ORDER);
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
      : { none: 'not yet read against this curriculum', why: "The point was added on 2026-11-17 for the informative writing of Grade 2 (Part 12.3: planning a piece with facts under headings, drafting with a definition, linking words and a closing sentence, a class report from two books); the linking words and the texts are English. Read it against the wording when the first writing units of this language are designed.", review: 'year-design 2026-11-17' };
  }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
  if (defs.units.some((x) => x.id === UNIT.id || x.slug === UNIT.slug)) throw new Error('the unit exists already');
  const plan = defs.plans.find((x) => x.id === PLAN_ID); if (!plan) throw new Error('no plan ' + PLAN_ID);
  const old = defs.units.find((x) => x.id === MOVED_FROM); if (!old) throw new Error('no unit ' + MOVED_FROM);
  const taken = {};
  for (const tp of MOVED) { const mi = old.lessons.findIndex((l) => l.point === tp); if (mi < 0) throw new Error(MOVED_FROM + ' has no lesson ' + tp); taken[tp] = old.lessons.splice(mi, 1)[0]; }
  if (!OLD_RE.test(old.metaDescription)) throw new Error('the description of ' + MOVED_FROM + ' is not the one this script was written for: ' + old.metaDescription);
  old.metaDescription = OLD_DESCRIPTION;
  if (old.lessons.length < 4) throw new Error(MOVED_FROM + ' would keep ' + old.lessons.length + ' lessons');
  if (LESSON_ORDER.length !== MOVED.length + POINTS.length || LESSON_ORDER.some((tp) => !taken[tp] && !POINTS.some((p) => p.tp === tp))) throw new Error('the lesson order does not name the moved and the new lessons');
  const unit = Object.assign({}, UNIT, { lessons: LESSON_ORDER.map((tp) => { if (taken[tp]) return taken[tp]; const p = POINTS.find((x) => x.tp === tp); return Object.assign({ point: p.tp, types: p.types }, p.days ? { days: p.days } : {}); }) });   // days: 3 = a writing lesson whose pages take three days (pacing.js)
  console.log(MOVED_FROM + ' keeps: ' + old.lessons.map((l) => l.point).join(' · '));
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
  s = s.replace(head, () => ' * The three notes of the unit Writing to Inform (G2-565 to G2-570) were added by place-ready-ll.en.literacy.js;\n * the reviewer of the pages read them (2026-11-17, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.push([NOTES_FILE, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; unit placed after ' + AFTER_UNIT + ' in ' + PLAN_ID + '; notes written; design marked');
