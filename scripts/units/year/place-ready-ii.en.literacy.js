#!/usr/bin/env node
/**
 * Part 12.3, English literacy, thirty-fourth run (2026-11-17): the Grade 3 unit Point of View and Comparing Texts on the
 * nine page types of "Year pages, literacy II" (types/_shared/comparing-texts-g3.js). Four lessons have two page
 * types; the lesson on literal and nonliteral language has one page type and the screen activity of its point
 * (Gabby's Funny Sayings, gabby-sayings.idioms.l-3-5-a), which assemble.js takes from the point itself.
 *
 *   Point of View and Comparing Texts (NEW unit, the last of the Grade 3 literacy plan, as the year design has it)
 *     Chapters, scenes, and stanzas        G3-572, G3-573            NEW 3:chapters-scenes-stanzas   RL.3.5
 *     Whose point of view?                 G3-574, G3-575            NEW 3:point-of-view             RL.3.6
 *     Literal and nonliteral language      G3-576 + screen activity  NEW 3:literal-nonliteral        L.3.5.a
 *     Two books by one author              G3-577, G3-578            NEW 3:two-books-one-author      RL.3.9
 *     Two texts on one topic               G3-579, G3-580            NEW 3:two-texts-one-topic       RI.3.9
 *
 * Texas rows for the five new points; every other curriculum: not yet read.
 *
 *   node scripts/units/year/place-ready-ii.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
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
if (!NF || !fs.existsSync(NF)) throw new Error('usage: place-ready-ii.en.literacy.js <notes.json>');
const straight = (s) => String(s).split('’').join("'").split('‘').join("'");
const NOTES = JSON.parse(fs.readFileSync(NF, 'utf8'));
const POINTS = [
  {"tp":"3:chapters-scenes-stanzas","code":"RL.3.5","strand":"Reading: Literature","types":["G3-572","G3-573"],"max":1480,"design":"Chapters, scenes, and stanzas","skill":"Name the parts of a play, a poem and a chapter book (scene, stanza, chapter) and tell how each part builds on the one before","tx":[["ELAR.3.9.B","teaches"],["ELAR.3.9.C","teaches"],["ELAR.3.8.C","prepares"]],"txWhy":"Finding in which stanza something happens and how a stanza builds on the one before is «structural elements such as stanzas in a variety of poems»; reading a play with a cast, scenes and stage directions and writing a next scene is «elements of drama such as characters, dialogue, setting, and acts»; telling how one chapter builds on the one before prepares «analyze plot elements, including the sequence of events»."},
  {"tp":"3:point-of-view","code":"RL.3.6","strand":"Reading: Literature","types":["G3-574","G3-575"],"max":1480,"design":"Whose point of view?","skill":"Tell who is telling a story, what the narrator or a character thinks, and how one's own point of view differs","tx":[["ELAR.3.10.E","teaches"]],"txWhy":"Deciding whether a story is told by a character who says I or by a narrator outside the story, and retelling a part with I and my as another character, is «identify the use of literary devices, including first- or third-person point of view»."},
  {"tp":"3:literal-nonliteral","code":"L.3.5.a","strand":"Language","types":["G3-576"],"activities":["gabby-sayings.idioms.l-3-5-a"],"max":1930,"design":"Literal and nonliteral language","skill":"Tell the literal from the nonliteral meaning of words and phrases in a sentence (sayings such as lend a hand, spill the beans)","tx":[["ELAR.3.10.D","teaches"]],"txWhy":"Deciding whether a phrase means just what its words say in this sentence or is a saying with another meaning, and writing that meaning, is the «literal and figurative language» part of «describe how the author's use of imagery, literal and figurative language such as simile, and sound devices ... achieves specific purposes»."},
  {"tp":"3:two-books-one-author","code":"RL.3.9","strand":"Reading: Literature","types":["G3-577","G3-578"],"max":1480,"design":"Two books by one author","skill":"Compare and contrast the lessons, settings and plots of two stories by one author about the same characters","tx":[["ELAR.3.6.H","teaches"],["ELAR.3.8.A","prepares"],["ELAR.3.8.C","prepares"],["ELAR.3.8.D","prepares"]],"txWhy":"Sorting what is true of Story 1, of Story 2 and of both and writing how two stories by one author are alike and different is «synthesize information to create new understanding»; naming each story's lesson, problem, ending and setting in a chart prepares «infer the theme of a work», «analyze plot elements» and «explain the influence of the setting on the plot»."},
  {"tp":"3:two-texts-one-topic","code":"RI.3.9","strand":"Reading: Informational Text","types":["G3-579","G3-580"],"max":1480,"design":"Two texts on one topic","skill":"Compare and contrast the most important points and key details of two texts on the same topic","tx":[["ELAR.3.6.H","teaches"],["ELAR.3.9.D.i","teaches"]],"txWhy":"Sorting facts as given by Text 1, by Text 2 or by both and writing how the two texts are alike and different is «synthesize information to create new understanding»; choosing each text's most important point apart from its key details is «the central idea with supporting evidence»."},
];
const GRADE = "3";
const UNIT = {"id":"g3-point-of-view-and-comparing-texts","slug":"point-of-view-and-comparing-texts-grade-3-unit","status":"live","grade":"3","subject":"literacy","title":"Point of View and Comparing Texts","metaTitle":"Point of View and Comparing Texts: Grade 3 Reading","metaDescription":"Grade 3 reading lessons: chapters, scenes and stanzas, point of view, literal and nonliteral language, two stories by one author, and two texts on one topic.","weeks":2};
const PLAN_ID = "plan-3-literacy";
const DESIGN_UNIT = "new:comparing-texts-g3";
const AFTER_UNIT = "g3-narrative-writing", ORDER_AFTER = "3:words-for-effect";   // the unit it follows in the plan; the point its points follow in the order
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
      : { none: 'not yet read against this curriculum', why: "The point was added on 2026-11-17 for the reading of Grade 3 (Part 12.3: chapters, scenes and stanzas, point of view, literal and nonliteral language, two stories by one author, two texts on one topic); the sayings and the texts are English. Read it against the wording when the first literacy units of this language are designed.", review: 'year-design 2026-11-17' };
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
  s = s.replace(head, () => ' * The five notes of the unit Point of View and Comparing Texts (G3-572 to G3-580) were added by place-ready-ii.en.literacy.js;\n * the reviewer of the pages read them (2026-11-17, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.push([NOTES_FILE, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; unit placed after ' + AFTER_UNIT + ' in ' + PLAN_ID + '; notes written; design marked');
