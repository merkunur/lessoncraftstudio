#!/usr/bin/env node
/**
 * Part 12.3, English literacy, tenth run (2026-11-16): two lessons on fables for the Grade 2 unit Reading Stories and
 * Writing (g2-stories-facts-and-writing), on the four Grade 2 page types of "Year pages, literacy J"
 * (types/_shared/story-g2.js; five fables of data/literacy/stories.en.json, key g2).
 *
 *   How characters meet a challenge   G2-526, G2-527 What Happens and Why         NEW point 2:character-challenge   RL.2.3
 *   Fables: what is the lesson?       G2-529 Beginning, Middle, and End, G2-528   NEW point 2:fable-lesson          RL.2.2
 *   The lessons stand after "Retell with starters" (the unit then has 8 lessons).
 *
 * Every lesson has two real assets: two page types of its point. Texas rows for the two new points; every other
 * curriculum: not yet read. The design is marked. The two teacher notes (read by the reviewer of the pages,
 * 2026-11-16) are added to scripts/units/notes/en-literacy-year2.js by this script.
 *
 *   node scripts/units/year/place-ready-j.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
 * Then: build-points · after-publish.sh ylj · every curricula/build-<x>.js · notes/apply.js · assemble --loc=en · pacing ·
 *       assemble · build-guide --unit · build-year-plan --plan=plan-2-literacy · build-looks; the unit check of the
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
if (!NOTES_IN || !fs.existsSync(NOTES_IN)) throw new Error('usage: place-ready-j.en.literacy.js <notes.json> (the two reviewed teacher notes)');
const NOTES = JSON.parse(fs.readFileSync(NOTES_IN, 'utf8'));
const POINTS = [
  { tp: '2:character-challenge', code: 'RL.2.3', types: ['G2-526', 'G2-527'], lesson: ['G2-526', 'G2-527'],
    skill: 'Describe how a character in a story responds to a problem: what the character does and feels, and what happens because of it',
    tx: ['ELAR.2.8.C', 'ELAR.2.8.B'], txWhy: 'Naming the problem of a story, what the character does about it and what happens because of it is «describe and understand plot elements, including the main events, the conflict, and the resolution»; telling how the character feels, with the sentence that shows it, is «describe the main character\'s internal and external traits».' },
  { tp: '2:fable-lesson', code: 'RL.2.2', types: ['G2-528', 'G2-529'], lesson: ['G2-529', 'G2-528'],
    skill: 'Retell a fable by its beginning, middle, and end and tell the lesson it teaches',
    tx: ['ELAR.2.7.D', 'ELAR.2.8.A'], txWhy: 'Retelling a fable by its beginning, middle and end is «retell and paraphrase texts in ways that maintain meaning and logical order»; choosing or writing its lesson with the events that show it is «discuss topics and determine theme using text evidence with adult assistance».' },
];
const UNIT_ID = 'g2-stories-facts-and-writing', AFTER_POINT = '2:retell-with-starters';
const DESC = 'A Grade 2 unit: 8 lessons on story questions, context clues, describing a picture, retelling, characters, fables, an animal fact sheet, and cursive.';
const DESIGN_MARKS = { 'RL.2.3': '2:character-challenge', 'RL.2.2': '2:fable-lesson' };

// ---- everything is read and checked first
if (DESC.length < 110 || DESC.length > 170) throw new Error('description of ' + DESC.length + ' characters');
for (const p of POINTS) { const n = NOTES[p.tp]; if (!n || !n.title || !n.objective || !n.mistake || !n.words || !n.watch) throw new Error('no whole teacher note of ' + p.tp);
  const len = n.objective.length + n.mistake.length + n.words.length + n.watch.length; if (len > 1930) throw new Error('the note of ' + p.tp + ' has ' + len + ' letters (a sheet of the teacher guide holds about 1,900)'); }
const out = [];   // [file, text]
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before'); j.points.push({ tp: p.tp, grade: '2', strand: 'Reading: Literature', code: p.code, skill: p.skill }); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  const list = j.subjects.literacy['2']; const at = list.indexOf(AFTER_POINT); if (at < 0) throw new Error('order: no ' + AFTER_POINT);
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
      ? { rows: p.tx.map((id) => ({ id, rel: 'teaches' })), why: p.txWhy, review: 'year-design 2026-11-16' }
      : { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-16 for the English fables of Grade 2 (Part 12.3); a language gets its own stories, and no unit of this language teaches the point yet. Read it against the wording when the first stories of this language are written.', review: 'year-design 2026-11-16' };
  }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
  const u = defs.units.find((x) => x.id === UNIT_ID); if (!u) throw new Error('no unit ' + UNIT_ID);
  if (u.lessons.some((l) => POINTS.some((p) => p.tp === l.point))) throw new Error('a lesson is in the unit already');
  const at = u.lessons.findIndex((l) => l.point === AFTER_POINT); if (at < 0) throw new Error('no lesson ' + AFTER_POINT + ' to stand after');
  u.lessons.splice(at + 1, 0, ...POINTS.map((p) => ({ point: p.tp, types: p.lesson, activity: null })));
  u.metaDescription = DESC;
  out.push([f, jsonLike(raw, defs)]);
  console.log('to place: lessons ' + (at + 2) + ' and ' + (at + 3) + ' of ' + UNIT_ID + ' (' + u.lessons.length + ' lessons)');
}
{
  const f = 'scripts/units/year/design.en.literacy.json', raw = read(f), design = JSON.parse(raw);
  let marked = 0;
  (function walk(o) { if (Array.isArray(o)) return o.forEach(walk); if (o && typeof o === 'object') { if (o.id === UNIT_ID && o.lessons) { for (const l of o.lessons) if (DESIGN_MARKS[l.standard]) { if (l.placed) throw new Error('the design lesson ' + l.standard + ' is placed already'); l.placed = DESIGN_MARKS[l.standard]; marked++; } return; } Object.values(o).forEach(walk); } })(design);
  if (marked !== 2) throw new Error('the design names ' + marked + ' of the two lessons');
  out.push([f, jsonLike(raw, design)]);
}
{
  const f = 'scripts/units/notes/en-literacy-year2.js', raw = read(f); let s = raw.replace(/\r\n/g, '\n');
  if (POINTS.some((p) => s.includes("'" + p.tp + "'"))) throw new Error('a note of the lessons is in ' + f + ' already');
  const BS = String.fromCharCode(92);
  const q = (x) => "'" + String(x).split(BS).join(BS + BS).split("'").join(BS + "'") + "'";
  const block = POINTS.map((p) => { const n = NOTES[p.tp]; return `    ${q(p.tp)}: {\n      title: ${q(n.title)},\n      objective: ${q(n.objective)},\n      note: {\n        mistake: ${q(n.mistake)},\n        words: ${q(n.words)},\n        watch: ${q(n.watch)},\n      },\n    },\n`; }).join('');
  const end = '  },\n};\n'; if (!s.endsWith(end)) throw new Error(f + ' does not end as expected');
  const head = ' * `node scripts/units/notes/apply.js` merges every file'; if (s.split(head).length !== 2) throw new Error(f + ': no place for the head line');
  s = s.replace(head, () => ' * Two notes of the unit Reading Stories and Writing (how characters meet a challenge, G2-526 and G2-527; fables and\n * their lesson, G2-529 and G2-528) were added by place-ready-j.en.literacy.js; the reviewer of the story pages read\n * them (2026-11-16, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.push([f, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; lessons placed; notes written; design marked');
