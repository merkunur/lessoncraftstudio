#!/usr/bin/env node
/**
 * Part 12.3, English literacy, sixteenth run (2026-11-17): the lesson Maps, Diagrams, and Photos for the Grade 3 unit
 * Reading to Learn: Informational Texts (g3-reading-to-learn-informational-texts), on the two Grade 3 page types of
 * "Year pages, literacy P" (types/_shared/info-text-g3d.js; five texts with a grid map of real places and five texts
 * with a chain of steps, data/literacy/info-graphics-g3.en.json).
 *
 *   Maps, diagrams, and photos   G3-510 Read the Text and the Map, G3-511 Read the Text and Diagram
 *                                NEW point 3:maps-diagrams-photos   RI.3.7
 *   The lesson stands after "Text features and search tools", as the year design has it (the unit then has 5 lessons).
 *
 * The lesson has two real assets: the map page (day 1) and the diagram page (day 2). No screen activity and no tool of
 * the site teaches RI.3.7 yet. The library has drawings only, so the pages show maps and diagrams and no photos; the
 * note says so. Texas rows for the new point; every other curriculum: not yet read. The teacher note (read by the
 * reviewer of the pages) is added to scripts/units/notes/en-literacy-year3.js by this script.
 *
 *   node scripts/units/year/place-ready-p.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
 * Then: build-points · after-publish.sh ylp · every curricula/build-<x>.js · notes/apply.js · assemble --loc=en · pacing ·
 *       assemble · build-guide --unit · build-year-plan --plan=plan-3-literacy · build-looks; the unit check of the
 *       unit, if it has one, is built again (its lesson numbers move).
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
if (!NOTES_IN || !fs.existsSync(NOTES_IN)) throw new Error('usage: place-ready-p.en.literacy.js <notes.json> (the reviewed teacher note)');
const NOTES = JSON.parse(fs.readFileSync(NOTES_IN, 'utf8'));
const POINTS = [
  { tp: '3:maps-diagrams-photos', code: 'RI.3.7', types: ['G3-510', 'G3-511'], lesson: ['G3-510', 'G3-511'],
    skill: 'Use a map or a diagram together with the words of a text to answer where, when, why, and how questions, and tell which source gave the answer',
    tx: [['ELAR.3.9.D.ii', 'teaches'], ['ELAR.3.10.C', 'prepares']],
    txWhy: 'Reading a map or a diagram together with the words of an informational text, and saying which of the two gave an answer, uses «features such as sections, tables, graphs, timelines, bullets, numbers, and bold and italicized font to support understanding»; it prepares «explain the author\'s use of print and graphic features to achieve specific purposes».' },
];
const UNIT_ID = 'g3-reading-to-learn-informational-texts', AFTER_POINT = '3:text-features-search-tools';
const DESIGN_UNIT = 'new:information-texts-g3';
const DESC = 'A Grade 3 reading unit on informational texts: 5 lessons on answering with evidence, main idea and key details, search tools, maps and diagrams, and cause and effect.';
const DESIGN_MARKS = { 'Maps, diagrams, and photos': '3:maps-diagrams-photos' };

// ---- everything is read and checked first
if (DESC.length < 110 || DESC.length > 170) throw new Error('description of ' + DESC.length + ' characters');
for (const p of POINTS) { const n = NOTES[p.tp]; if (!n || !n.title || !n.objective || !n.mistake || !n.words || !n.watch) throw new Error('no whole teacher note of ' + p.tp);
  const len = n.objective.length + n.mistake.length + n.words.length + n.watch.length; if (len > 1930) throw new Error('the note of ' + p.tp + ' has ' + len + ' letters (a sheet of the teacher guide holds about 1,900)'); }
const out = [];   // [file, text]
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before'); j.points.push({ tp: p.tp, grade: '3', strand: 'Reading: Informational Text', code: p.code, skill: p.skill }); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  const list = j.subjects.literacy['3']; const at = list.indexOf(AFTER_POINT); if (at < 0) throw new Error('order: no ' + AFTER_POINT);
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
      : { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-17 for the English informational texts with a map or a diagram of Grade 3 (Part 12.3); a language gets its own texts, and no unit of this language teaches the point yet. Read it against the wording when the first such texts of this language are written.', review: 'year-design 2026-11-17' };
  }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
  const u = defs.units.find((x) => x.id === UNIT_ID); if (!u) throw new Error('no unit ' + UNIT_ID);
  if (u.lessons.some((l) => POINTS.some((p) => p.tp === l.point))) throw new Error('the lesson is in the unit already');
  const at = u.lessons.findIndex((l) => l.point === AFTER_POINT); if (at < 0) throw new Error('no lesson ' + AFTER_POINT + ' to stand after');
  if (!/4 lessons/.test(u.metaDescription)) throw new Error('the description of ' + UNIT_ID + ' is not the one this script replaces: ' + u.metaDescription);
  u.lessons.splice(at + 1, 0, ...POINTS.map((p) => ({ point: p.tp, types: p.lesson, activity: null })));
  u.metaDescription = DESC;
  out.push([f, jsonLike(raw, defs)]);
  console.log('to place: lesson ' + (at + 2) + ' of ' + UNIT_ID + ' (' + u.lessons.length + ' lessons)');
}
{
  const f = 'scripts/units/year/design.en.literacy.json', raw = read(f), design = JSON.parse(raw);
  let marked = 0;
  (function walk(o) { if (Array.isArray(o)) return o.forEach(walk); if (o && typeof o === 'object') { if (o.id === DESIGN_UNIT && o.lessons) { for (const l of o.lessons) if (DESIGN_MARKS[l.title]) { if (l.placed) throw new Error('the design lesson ' + l.title + ' is placed already'); l.placed = DESIGN_MARKS[l.title]; marked++; } return; } Object.values(o).forEach(walk); } })(design);
  if (marked !== POINTS.length) throw new Error('the design names ' + marked + ' of the ' + POINTS.length + ' lesson(s)');
  out.push([f, jsonLike(raw, design)]);
}
{
  const f = 'scripts/units/notes/en-literacy-year3.js', raw = read(f); let s = raw.replace(/\r\n/g, '\n');
  if (POINTS.some((p) => s.includes("'" + p.tp + "'"))) throw new Error('the note of the lesson is in ' + f + ' already');
  const BS = String.fromCharCode(92);
  const q = (x) => "'" + String(x).split(BS).join(BS + BS).split("'").join(BS + "'") + "'";
  const block = POINTS.map((p) => { const n = NOTES[p.tp]; return `    ${q(p.tp)}: {\n      title: ${q(n.title)},\n      objective: ${q(n.objective)},\n      note: {\n        mistake: ${q(n.mistake)},\n        words: ${q(n.words)},\n        watch: ${q(n.watch)},\n      },\n    },\n`; }).join('');
  const end = '  },\n};\n'; if (!s.endsWith(end)) throw new Error(f + ' does not end as expected');
  const head = ' * `node scripts/units/notes/apply.js` merges every file'; if (s.split(head).length !== 2) throw new Error(f + ': no place for the head line');
  s = s.replace(head, () => ' * The note of the lesson Maps, Diagrams, and Photos (G3-510, G3-511) was added by place-ready-p.en.literacy.js; the\n * reviewer of the pages read it (2026-11-17, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.push([f, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('point added: ' + POINTS.map((p) => p.tp).join(', ') + '; lesson placed; note written; design marked');
