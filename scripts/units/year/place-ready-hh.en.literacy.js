#!/usr/bin/env node
/**
 * Part 12.3, English literacy, thirty-first run (2026-11-17): the Grade 3 unit Narrative Writing on the eight page
 * types of "Year pages, literacy HH" (types/_shared/narrative-writing-g3.js). Every lesson has two page types: the
 * first is read and marked, the second is the child's own writing.
 *
 *   Narrative Writing (NEW unit, after Sentences and Conventions, as the year design has it)
 *     Plan a story: characters, setting, problem   G3-564, G3-565   NEW 3:plan-a-story               W.3.3.a
 *     Dialogue and description                     G3-566, G3-567   NEW 3:dialogue-and-description   W.3.3.b
 *     Time words that order the events             G3-568, G3-569   NEW 3:time-words-in-stories      W.3.3.c
 *     Revise for words that work                   G3-570, G3-571   NEW 3:words-for-effect           L.3.3.a
 *
 * Texas rows for the four new points; every other curriculum: not yet read.
 *
 *   node scripts/units/year/place-ready-hh.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
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
if (!NF || !fs.existsSync(NF)) throw new Error('usage: place-ready-hh.en.literacy.js <notes.json>');
const straight = (s) => String(s).split('’').join("'").split('‘').join("'");
const NOTES = JSON.parse(fs.readFileSync(NF, 'utf8'));
const POINTS = [
  {"tp":"3:plan-a-story","code":"W.3.3.a","strand":"Writing","types":["G3-564","G3-565"],"max":1480,"design":"Plan a story: characters, setting, problem","skill":"Find the characters, the setting, the problem and the narrator of a story beginning, and plan a story of one's own with characters, a setting, a problem, three events and an ending","tx":[["ELAR.3.11.A","teaches"],["ELAR.3.8.C","prepares"],["ELAR.3.10.E","prepares"],["ELAR.3.12.A","prepares"]],"txWhy":"Filling the story planner beside a story mountain is «plan a first draft ... using a range of strategies such as ... mapping»; naming the problem of a story beginning and planning events and an ending prepares «analyze plot elements, including the sequence of events, the conflict, and the resolution»; telling a narrator who says I from one who is not in the story prepares «first- or third-person point of view»; the plan prepares the story of «compose literary texts, including personal narratives»."},
  {"tp":"3:dialogue-and-description","code":"W.3.3.b","strand":"Writing","types":["G3-566","G3-567"],"max":1480,"design":"Dialogue and description","skill":"Write dialogue with quotation marks, commas and end marks, and show what a character feels with an action, a thought or the way the character speaks","tx":[["ELAR.3.12.A","teaches"],["ELAR.3.11.B.ii","teaches"]],"txWhy":"Writing what characters say with quotation marks and showing a feeling with an action or a thought instead of naming it is the craft of «compose literary texts ... using genre characteristics and craft» and is «developing an engaging idea with relevant details»; the Grade 3 edit rows of 3.11.D do not name quotation marks, so none is claimed."},
  {"tp":"3:time-words-in-stories","code":"W.3.3.c","strand":"Writing","types":["G3-568","G3-569"],"max":1480,"design":"Time words that order the events","skill":"Use time words and phrases (first, next, after that, later that day, finally) to put the events of a story in order, and draft a story with a beginning, three events and an ending","tx":[["ELAR.3.12.A","teaches"],["ELAR.3.11.B.i","teaches"],["ELAR.3.11.D.v","prepares"]],"txWhy":"Drafting the planned story is «compose literary texts, including personal narratives»; writing it under Beginning, Middle and Ending with an ending that solves the problem is «organizing with purposeful structure, including an introduction and a conclusion»; choosing first, next, later that day and finally for the order of events prepares «adverbs that convey time»."},
  {"tp":"3:words-for-effect","code":"L.3.3.a","strand":"Language","types":["G3-570","G3-571"],"max":1480,"design":"Revise for words that work","skill":"Choose a more exact word for a tired word (said, went, nice, big, good, looked) by what the sentence tells, and revise a paragraph and sentences of one's own for word choice","tx":[["ELAR.3.11.C","teaches"]],"txWhy":"Replacing tired words with exact ones in a paragraph and in the child's own sentences is «revise drafts to improve sentence structure and word choice»."},
];
const GRADE = "3";
const UNIT = {"id":"g3-narrative-writing","slug":"narrative-writing-grade-3-unit","status":"live","grade":"3","subject":"literacy","title":"Narrative Writing","metaTitle":"Narrative Writing: Grade 3 Writing Lesson Plans","metaDescription":"A Grade 3 narrative writing unit: plan a story, write dialogue with quotation marks, show feelings, order events with time words, and revise tired words.","weeks":2};
const PLAN_ID = "plan-3-literacy";
const DESIGN_UNIT = "new:narrative-writing-g3";
const AFTER_UNIT = "g3-sentences-and-conventions", ORDER_AFTER = "3:capitals-in-titles";   // the unit it follows in the plan; the point its points follow in the order
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
      : { none: 'not yet read against this curriculum', why: "The point was added on 2026-11-17 for the narrative writing of Grade 3 (Part 12.3: planning a story, dialogue with quotation marks and showing feelings, time words, revising for exact words); the quotation marks, the comma rules and the tired words are those of American English. Read it against the wording when the first writing units of this language are designed.", review: 'year-design 2026-11-17' };
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
  s = s.replace(head, () => ' * The four notes of the unit Narrative Writing (G3-564 to G3-571) were added by place-ready-hh.en.literacy.js;\n * the reviewer of the pages read them (2026-11-17, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.push([NOTES_FILE, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; unit placed after ' + AFTER_UNIT + ' in ' + PLAN_ID + '; notes written; design marked');
