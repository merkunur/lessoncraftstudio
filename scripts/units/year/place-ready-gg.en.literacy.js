#!/usr/bin/env node
/**
 * Part 12.3, English literacy, thirty-second run (2026-11-17): the Grade 3 unit Informative Writing and Research on
 * the eight page types of "Year pages, literacy GG" (types/_shared/informative-writing-g3.js). Every lesson has two
 * page types: the first is read and marked on a model topic, the second is the child's own writing on another topic.
 *
 *   Informative Writing and Research (NEW unit, after Parts of Speech, before Sentences and Conventions)
 *     Take notes and sort them                   G3-556, G3-557   NEW 3:take-notes-and-sort          W.3.8
 *     Introduce a topic and group the facts      G3-558, G3-559   NEW 3:introduce-and-group          W.3.2.a
 *     Facts, definitions, and details            G3-560, G3-561   NEW 3:facts-definitions-details    W.3.2.b
 *     A short research report                    G3-562, G3-563   NEW 3:short-research-report        W.3.7
 *
 * Texas rows for the four new points; every other curriculum: not yet read.
 *
 *   node scripts/units/year/place-ready-gg.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
 * Then: build-points · build-assets · every curricula/build-<x>.js · notes/apply.js · assemble --loc=en · pacing ·
 *       assemble · build-guide --unit · build-year-plan --plan=plan-3-literacy · build-looks
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
if (!NF || !fs.existsSync(NF)) throw new Error('usage: place-ready-gg.en.literacy.js <notes.json>');
const straight = (s) => String(s).split('’').join("'").split('‘').join("'");
const NOTES = JSON.parse(fs.readFileSync(NF, 'utf8'));
const POINTS = [
  {"tp":"3:take-notes-and-sort","code":"W.3.8","strand":"Writing","types":["G3-556","G3-557"],"max":1480,"design":"Take notes and sort them","skill":"Take brief notes on a source in one's own words and sort the notes under headings","tx":[["ELAR.3.7.E","teaches"],["ELAR.3.13.C","teaches"]],"txWhy":"Choosing and writing a note of a few words for a sentence of a source and sorting notes under headings is «interact with sources in meaningful ways such as notetaking»; taking the notes a heading needs from one and from two printed sources is «identify and gather relevant information from a variety of sources»."},
  {"tp":"3:introduce-and-group","code":"W.3.2.a","strand":"Writing","types":["G3-558","G3-559"],"max":1480,"design":"Introduce a topic and group the facts","skill":"Introduce a topic with a sentence that fits all the notes, group related facts under headings, and plan an informative piece","tx":[["ELAR.3.11.A","teaches"],["ELAR.3.11.B.i","teaches"],["ELAR.3.12.B","prepares"]],"txWhy":"Filling the planner (an introduction, three headings with their notes, a concluding sentence) is «plan a first draft ... using a range of strategies such as ... mapping»; choosing and writing the introduction that covers every group of notes is the introduction part of «organizing with purposeful structure, including an introduction and a conclusion»; the plan prepares «compose informational texts ... using a clear central idea»."},
  {"tp":"3:facts-definitions-details","code":"W.3.2.b","strand":"Writing","types":["G3-560","G3-561"],"max":1480,"design":"Facts, definitions, and details","skill":"Develop a topic with facts, a definition of a hard word, and details, joined by linking words, and end with a concluding sentence","tx":[["ELAR.3.12.B","teaches"],["ELAR.3.11.B.ii","teaches"],["ELAR.3.11.B.i","teaches"]],"txWhy":"Drafting the planned piece in three parts is «compose informational texts, including brief compositions that convey information about a topic»; adding a definition and details to each fact is «developing an engaging idea with relevant details»; the concluding sentence is the conclusion part of «organizing with purposeful structure, including an introduction and a conclusion»."},
  {"tp":"3:short-research-report","code":"W.3.7","strand":"Writing","types":["G3-562","G3-563"],"max":1480,"design":"A short research report","skill":"Carry out a short research project: answer a research question with notes from two sources and write a short report with an introduction, three parts, a diagram, a concluding sentence and its sources","tx":[["ELAR.3.13.C","teaches"],["ELAR.3.13.E","teaches"],["ELAR.3.12.B","teaches"],["ELAR.3.13.A","prepares"],["ELAR.3.13.G","prepares"]],"txWhy":"Filling the note chart from Source A and Source B for a research question is «identify and gather relevant information from a variety of sources»; writing the report from those notes is «demonstrate understanding of information gathered» and «compose informational texts»; writing the research question on Level 3 prepares «generate questions on a topic for formal and informal inquiry», and the line that names both sources prepares «create a works cited page»."},
];
const GRADE = "3";
const UNIT = {"id":"g3-informative-writing-and-research","slug":"informative-writing-and-research-grade-3-unit","status":"live","grade":"3","subject":"literacy","title":"Informative Writing and Research","metaTitle":"Informative Writing and Research: Grade 3 Lessons","metaDescription":"Grade 3 lessons on informative writing and research: take notes from two sources, sort them under headings, introduce a topic, define words, and write a short report.","weeks":2};
const PLAN_ID = "plan-3-literacy";
const DESIGN_UNIT = "new:informative-writing-g3";
const AFTER_UNIT = "g3-parts-of-speech", ORDER_AFTER = "3:subject-verb-agreement";   // the unit it follows in the plan; the point its points follow in the order
const NOTES_FILE = "scripts/units/notes/en-literacy-year3.js";

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
      : { none: 'not yet read against this curriculum', why: "The point was added on 2026-11-17 for the informative writing and research of Grade 3 (Part 12.3: notes from sources, an introduction and grouped facts, facts with definitions and details, a short research report); the linking words and the sources are English. Read it against the wording when the first writing units of this language are designed.", review: 'year-design 2026-11-17' };
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
  s = s.replace(head, () => ' * The four notes of the unit Informative Writing and Research (G3-556 to G3-563) were added by place-ready-gg.en.literacy.js;\n * the reviewer of the pages read them (2026-11-17, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.push([NOTES_FILE, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; unit placed after ' + AFTER_UNIT + ' in ' + PLAN_ID + '; notes written; design marked');
