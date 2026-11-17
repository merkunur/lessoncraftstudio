#!/usr/bin/env node
/**
 * Part 12.3, English literacy, thirtieth run (2026-11-17): the Grade 3 unit Opinion Writing on the eight page
 * types of "Year pages, literacy FF" (types/_shared/opinion-writing-g3.js). Every lesson has two page types: the
 * first is read and marked, the second is the child's own writing.
 *
 *   Opinion Writing (NEW unit, after Reading to Learn: Informational Texts, as the year design has it)
 *     State an opinion and plan the reasons      G3-548, G3-549   NEW 3:opinion-and-reasons      W.3.1.a
 *     Reasons with linking words                 G3-550, G3-551   NEW 3:linking-words            W.3.1.c
 *     End with a concluding statement            G3-552, G3-553   NEW 3:concluding-statement     W.3.1.d
 *     Revise and edit an opinion piece           G3-554, G3-555   NEW 3:revise-and-edit          W.3.5
 *
 * Texas rows for the four new points; every other curriculum: not yet read.
 *
 *   node scripts/units/year/place-ready-ff.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
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
if (!NF || !fs.existsSync(NF)) throw new Error('usage: place-ready-ff.en.literacy.js <notes.json>');
const straight = (s) => String(s).split('’').join("'").split('‘').join("'");
const NOTES = JSON.parse(fs.readFileSync(NF, 'utf8'));
const POINTS = [
  {"tp":"3:opinion-and-reasons","code":"W.3.1.a","strand":"Writing","types":["G3-548","G3-549"],"max":1480,"design":"State an opinion and plan the reasons","skill":"Tell an opinion from a fact, find the opinion, the reasons and the conclusion of an opinion piece, and plan an opinion piece with reasons","tx":[["ELAR.3.9.E.ii","teaches"],["ELAR.3.9.E.i","teaches"],["ELAR.3.11.A","teaches"],["ELAR.3.12.C","prepares"]],"txWhy":"Checking fact or opinion for each sentence is «distinguishing facts from opinion»; underlining the opinion of a piece is «identifying the claim»; filling the planner (opinion, reasons with examples, conclusion) is «plan a first draft ... using a range of strategies such as ... mapping»; the plan prepares the opinion essay of «compose argumentative texts, including opinion essays»."},
  {"tp":"3:linking-words","code":"W.3.1.c","strand":"Writing","types":["G3-550","G3-551"],"max":1480,"design":"Reasons with linking words","skill":"Connect an opinion and its reasons with linking words (because, since, therefore, for example) and draft a whole opinion piece","tx":[["ELAR.3.12.C","teaches"],["ELAR.3.11.B.ii","teaches"],["ELAR.3.11.B.i","prepares"]],"txWhy":"Drafting the piece from introduction to conclusion is «compose argumentative texts, including opinion essays, using genre characteristics and craft»; giving each reason an example and joining them with because, since, therefore and for example is «developing an engaging idea with relevant details»; the introduction and the conclusion boxes of the draft prepare «organizing with purposeful structure, including an introduction and a conclusion»."},
  {"tp":"3:concluding-statement","code":"W.3.1.d","strand":"Writing","types":["G3-552","G3-553"],"max":1480,"design":"End with a concluding statement","skill":"End an opinion piece with a concluding statement that says the opinion again in new words","tx":[["ELAR.3.11.B.i","teaches"]],"txWhy":"Choosing the conclusion of a piece (not a new reason, not the opinion copied word for word) and writing conclusions of one's own is the conclusion part of «organizing with purposeful structure, including an introduction and a conclusion»."},
  {"tp":"3:revise-and-edit","code":"W.3.5","strand":"Writing","types":["G3-554","G3-555"],"max":1480,"design":"Revise and edit an opinion piece","skill":"With a checklist and a partner, revise an opinion piece (add a reason or an example, take out what does not belong) and edit it for capitals, end marks and commas","tx":[["ELAR.3.11.C","teaches"]],"txWhy":"Crossing out the sentence that does not belong, adding a sentence with a linking word after a partner's comment and fixing capitals, end marks and commas is «revise drafts ... by adding, deleting, combining, and rearranging ideas for coherence and clarity»; the edit rows of 3.11.D name other conventions (verb tense, nouns, adjectives) and are not claimed."},
];
const GRADE = "3";
const UNIT = {"id":"g3-opinion-writing","slug":"opinion-writing-grade-3-unit","status":"live","grade":"3","subject":"literacy","title":"Opinion Writing","metaTitle":"Opinion Writing: Grade 3 Writing Lesson Plans","metaDescription":"A Grade 3 opinion writing unit: state an opinion, plan reasons with examples, join them with linking words, end with a conclusion, then revise and edit.","weeks":2};
const PLAN_ID = "plan-3-literacy";
const DESIGN_UNIT = "new:opinion-writing-g3";
const AFTER_UNIT = "g3-reading-to-learn-informational-texts", ORDER_AFTER = "3:events-cause-effect";   // the unit it follows in the plan; the point its points follow in the order
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
      : { none: 'not yet read against this curriculum', why: "The point was added on 2026-11-17 for the opinion writing of Grade 3 (Part 12.3: opinion and reasons, linking words, a concluding statement, revising and editing with a checklist and a partner); the linking words and the comma rules are those of English. Read it against the wording when the first writing units of this language are designed.", review: 'year-design 2026-11-17' };
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
  s = s.replace(head, () => ' * The four notes of the unit Opinion Writing (G3-548 to G3-555) were added by place-ready-ff.en.literacy.js;\n * the reviewer of the pages read them (2026-11-17, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.push([NOTES_FILE, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; unit placed after ' + AFTER_UNIT + ' in ' + PLAN_ID + '; notes written; design marked');
