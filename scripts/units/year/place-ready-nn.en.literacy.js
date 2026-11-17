#!/usr/bin/env node
/**
 * Part 12.3, English literacy, thirty-eighth run (2026-11-17): the Grade 2 unit Stories: Beginnings, Endings, and
 * Versions on the eight page types of "Year pages, literacy NN" (types/_shared/stories-compare-g2.js). Every lesson
 * has two page types: the first is read and marked, the second is written or read aloud.
 *
 *   Stories: Beginnings, Endings, and Versions (NEW unit, after Writing to Inform, before Opinion Writing and Letters)
 *     How a story begins and ends                  G2-576, G2-577   NEW 2:story-beginning-ending   RL.2.5
 *     Different voices for different characters    G2-578, G2-579   NEW 2:character-voices         RL.2.6
 *     Two versions of one tale                     G2-580, G2-581   NEW 2:two-versions-of-a-tale   RL.2.9
 *     Book club talk: build on what others say     G2-582, G2-583   NEW 2:build-on-others-talk     SL.2.1.b
 *
 * Texas rows for the four new points; every other curriculum: not yet read.
 *
 *   node scripts/units/year/place-ready-nn.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
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
if (!NF || !fs.existsSync(NF)) throw new Error('usage: place-ready-nn.en.literacy.js <notes.json>');
const straight = (s) => String(s).split('’').join("'").split('‘').join("'");
const NOTES = JSON.parse(fs.readFileSync(NF, 'utf8'));
const POINTS = [
  {"tp":"2:story-beginning-ending","code":"RL.2.5","strand":"Reading: Literature","types":["G2-576","G2-577"],"max":1480,"design":"How a story begins and ends","skill":"Describe how the beginning of a story introduces the characters, the setting and the problem, and how the ending solves the problem","tx":[["ELAR.2.8.C","teaches"],["ELAR.2.8.D","prepares"]],"txWhy":"Naming the problem the beginning sets up and how the ending solves it is «describe and understand plot elements, including the main events, the conflict, and the resolution»; telling where the beginning happens prepares «describe the importance of the setting»."},
  {"tp":"2:character-voices","code":"RL.2.6","strand":"Reading: Literature","types":["G2-578","G2-579"],"max":1480,"design":"Different voices for different characters","skill":"Tell who is speaking in a story and what each character thinks, and read each character in a voice that fits","tx":[["ELAR.2.9.C","teaches"],["ELAR.2.4","teaches"],["ELAR.2.8.B","prepares"]],"txWhy":"Reading a short play with a narrator and three characters is «discuss elements of drama such as characters, dialogue, and setting»; reading each part in a voice that fits is the prosody of «use appropriate fluency rate, accuracy, and prosody when reading grade-level text»; telling what each character thinks prepares «describe the main character’s internal and external traits»."},
  {"tp":"2:two-versions-of-a-tale","code":"RL.2.9","strand":"Reading: Literature","types":["G2-580","G2-581"],"max":1480,"design":"Two versions of one tale","skill":"Compare and contrast two versions of the same tale: tell what is the same and what is different in the characters, the setting, the problem and the ending","tx":[["ELAR.2.9.A","teaches"],["ELAR.2.8.C","prepares"],["ELAR.2.6.H","prepares"]],"txWhy":"Two versions of a traditional tale (The Three Little Pigs, The Lion and the Mouse) are «well-known children’s literature such as folktales, fables, and fairy tales»; sorting the facts of both by characters, setting, problem and ending uses the plot elements of 2.8.C, and writing how the versions are alike and different prepares «synthesize information to create new understanding». Texas names no comparison of versions of its own in Grade 2."},
  {"tp":"2:build-on-others-talk","code":"SL.2.1.b","strand":"Speaking and Listening","types":["G2-582","G2-583"],"max":1480,"design":"Book club talk: build on what others say","skill":"Build on what others say in a talk about a book: agree, add, or see it another way, with a reason, linked to what a classmate said","tx":[["ELAR.2.1.D","teaches"],["ELAR.2.1.C","teaches"],["ELAR.2.7.B","prepares"]],"txWhy":"Choosing and writing the reply that builds on a classmate’s comment is «work collaboratively with others by following agreed-upon rules for discussion, including listening to others, speaking when recognized, making appropriate contributions»; staying with the idea under discussion is «share information and ideas that focus on the topic under discussion»; the one thing to say about the book on the talk card prepares «write brief comments on literary or informational texts»."},
];
const GRADE = "2";
const UNIT = {"id":"g2-stories-beginnings-endings-and-versions","slug":"stories-beginnings-endings-and-versions-grade-2-unit","status":"live","grade":"2","subject":"literacy","title":"Stories: Beginnings, Endings, and Versions","metaTitle":"Grade 2 Stories Unit: Beginnings, Endings, Versions","metaDescription":"A Grade 2 reading unit on how stories begin and end, different voices for different characters, two versions of one tale, and book club talk.","weeks":2};
const PLAN_ID = "plan-2-literacy";
const DESIGN_UNIT = "new:stories-compare-g2";
const AFTER_UNIT = "g2-writing-to-inform", ORDER_AFTER = "2:research-class-report";   // the unit it follows in the plan; the point its points follow in the order
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
      : { none: 'not yet read against this curriculum', why: "The point was added on 2026-11-17 for the story reading of Grade 2 (Part 12.3: how a story begins and ends, who is speaking and what characters think, two versions of one tale, building on what others say in a book talk); the stories, the tales and the talk stems are English. Read it against the wording when the first reading units of this language are designed.", review: 'year-design 2026-11-17' };
  }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
  if (defs.units.some((x) => x.id === UNIT.id || x.slug === UNIT.slug)) throw new Error('the unit exists already');
  const plan = defs.plans.find((x) => x.id === PLAN_ID); if (!plan) throw new Error('no plan ' + PLAN_ID);
  const unit = Object.assign({}, UNIT, { lessons: POINTS.map((p) => Object.assign({ point: p.tp, types: p.types }, p.days ? { days: p.days } : {})) });   // a point's screen activity comes from the point itself; days: 3 = a writing lesson whose pages take three days (pacing.js)
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
  s = s.replace(head, () => ' * The four notes of the unit Stories: Beginnings, Endings, and Versions (G2-576 to G2-583) were added by place-ready-nn.en.literacy.js;\n * the reviewer of the pages read them (2026-11-17, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.push([NOTES_FILE, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; unit placed after ' + AFTER_UNIT + ' in ' + PLAN_ID + '; notes written; design marked');
