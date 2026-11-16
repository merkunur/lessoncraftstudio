#!/usr/bin/env node
/**
 * Part 12.3, English literacy, twelfth run (2026-11-17): the Kindergarten unit Reading Stories, on the four
 * Kindergarten page types of "Year pages, literacy L" (types/_shared/story-k.js; five read-aloud stories in four
 * picture panels, data/literacy/stories.en.json key k). The unit stands in the Kindergarten literacy plan after
 * Sorting Words and Telling Stories (which keeps its lesson on story order).
 *
 *   Who is in the story, and where?           K-650   NEW point K:story-who-where               RL.K.3   + Dot's Story Spine (screen)
 *   Retell the story: beginning, middle, end  K-651   NEW point K:retell-beginning-middle-end   RL.K.2   + Wake Up, Pip! (screen)
 *   Ask and answer questions about a story    K-652   NEW point K:story-questions               RL.K.1   + Fable's Picture Stories (screen)
 *   The pictures and the words                K-653   NEW point K:pictures-and-words            RL.K.7   + Otto's Picture Book (screen)
 *
 * Every lesson has two real assets: its page type and an activity on screen. The lesson of the design on two stories
 * (RL.K.9) is NOT placed: its page compares two stories side by side and is not built yet. Texas rows for the four new
 * points; every other curriculum: not yet read. The teacher notes (read by the reviewer of the pages) are added to
 * scripts/units/notes/en-literacy-yeark.js by this script.
 *
 *   node scripts/units/year/place-ready-l.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
 * Then: build-points · after-publish.sh yll · every curricula/build-<x>.js · notes/apply.js · assemble --loc=en · pacing ·
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
if (!NOTES_IN || !fs.existsSync(NOTES_IN)) throw new Error('usage: place-ready-l.en.literacy.js <notes.json> (the four reviewed teacher notes)');
const NOTES = JSON.parse(fs.readFileSync(NOTES_IN, 'utf8'));
const POINTS = [
  { tp: 'K:story-who-where', code: 'RL.K.3', types: ['K-650'], activities: ['story-spine.role.rl-k-3'],
    skill: 'Tell who a story is about, where it happens, and one big thing that happens in it',
    tx: [['ELAR.K.7.B', 'teaches'], ['ELAR.K.7.D', 'teaches'], ['ELAR.K.7.C', 'prepares']], txWhy: 'Circling, drawing and naming the animal a story is about is «identify and describe the main characters»; circling, drawing and naming the place is «describe the setting»; choosing and drawing one big thing that happens is a first step toward «describe the elements of plot development, including the main events, the problem, and the resolution».' },
  { tp: 'K:retell-beginning-middle-end', code: 'RL.K.2', types: ['K-651'], activities: ['wake-up-pip.retell-story.rl-k-2'],
    skill: 'Retell a story heard aloud in order: the beginning, the middle, and the end',
    tx: [['ELAR.K.6.D', 'teaches']], txWhy: 'Putting three pictures of a story in order, drawing its beginning, middle and end and telling it with First, Then, At the end is «retell texts in ways that maintain meaning».' },
  { tp: 'K:story-questions', code: 'RL.K.1', types: ['K-652'], activities: ['picture-story.read.rl-k-1'],
    skill: 'Answer who, where, what, and how questions about a story heard aloud, and ask a question about it',
    tx: [['ELAR.K.6.B', 'teaches'], ['ELAR.K.5.B', 'teaches']], txWhy: 'Circling the picture that answers a question about a story is «provide an oral, pictorial, or written response to a text»; drawing or telling a question of the child\'s own is «generate questions about text before, during, and after reading».' },
  { tp: 'K:pictures-and-words', code: 'RL.K.7', types: ['K-653'], activities: ['otto-picture-book.which-picture.rl-k-7'],
    skill: 'Match each part of a story heard aloud to the picture that shows it',
    tx: [['ELAR.K.6.E', 'teaches'], ['ELAR.K.9.C', 'prepares']], txWhy: 'Drawing a line from each part of a story to its picture, and drawing the picture that is missing, is «interact with sources in meaningful ways such as illustrating or writing»; seeing that each picture shows what its words tell leads toward «discuss with adult assistance the author\'s use of print and graphic features».' },
];
const UNIT = { id: 'k-reading-stories', slug: 'reading-stories-kindergarten-unit', status: 'live', grade: 'K', subject: 'literacy',
  title: 'Reading Stories', metaTitle: 'Kindergarten Lesson Plans: Reading Stories',
  metaDescription: 'A Kindergarten unit on read-aloud picture stories: 4 lessons on who and where, retelling in order, asking and answering questions, and pictures and words.', weeks: 2,
  lessons: POINTS.map((p) => ({ point: p.tp, types: p.types })) };
const AFTER = 'k-sorting-words-telling-stories', PLAN_ID = 'plan-k-literacy', AFTER_POINT = 'K:story-sequencing';
const DESIGN_UNIT = 'new:reading-stories-k';
const DESIGN_MARKS = Object.fromEntries(POINTS.map((p) => [p.code, p.tp]));

// ---- everything is read and checked first
if (UNIT.metaDescription.length < 110 || UNIT.metaDescription.length > 170) throw new Error('description of ' + UNIT.metaDescription.length + ' characters');
if (UNIT.metaTitle.length > 60) throw new Error('meta title of ' + UNIT.metaTitle.length + ' characters');
for (const p of POINTS) { const n = NOTES[p.tp]; if (!n || !n.title || !n.objective || !n.mistake || !n.words || !n.watch) throw new Error('no whole teacher note of ' + p.tp);
  const len = n.objective.length + n.mistake.length + n.words.length + n.watch.length; if (len > 1930) throw new Error('the note of ' + p.tp + ' has ' + len + ' letters (a sheet of the teacher guide holds about 1,900)'); }
const out = [];   // [file, text]
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before');
    j.points.push(Object.assign({ tp: p.tp, grade: 'K', strand: 'Reading: Literature', code: p.code, skill: p.skill }, p.activities.length ? { activities: p.activities } : {})); }
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
      : { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-17 for the English read-aloud stories of Kindergarten (Part 12.3); a language gets its own stories, and no unit of this language teaches the point yet. Read it against the wording when the first stories of this language are written.', review: 'year-design 2026-11-17' };
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
  (function walk(o) { if (Array.isArray(o)) return o.forEach(walk); if (o && typeof o === 'object') { if (o.id === DESIGN_UNIT && o.lessons) { for (const l of o.lessons) if (DESIGN_MARKS[l.standard]) { if (l.placed) throw new Error('the design lesson ' + l.standard + ' is placed already'); l.placed = DESIGN_MARKS[l.standard]; marked++; } return; } Object.values(o).forEach(walk); } })(design);
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
  s = s.replace(head, () => ' * The four notes of the unit Reading Stories (K-650 to K-653) were added by\n * place-ready-l.en.literacy.js; the reviewer of the story pages read them (2026-11-17, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.push([f, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; unit placed in ' + PLAN_ID + '; notes written; design marked');
