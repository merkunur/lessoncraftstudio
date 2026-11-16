#!/usr/bin/env node
/**
 * Part 12.3, English literacy, eleventh run (2026-11-17): the Grade 1 unit Reading Stories: Characters and Lessons,
 * on the five Grade 1 page types of "Year pages, literacy K" (types/_shared/story-g1.js; five short original stories
 * of data/literacy/stories.en.json, key g1). The unit stands second in the Grade 1 literacy plan, after Reading
 * Sentences and Stories (the design: sentence reading leads straight into short stories).
 *
 *   Find the answer in the story          G1-579   NEW point 1:story-key-details            RL.1.1   + Fable's Picture Stories (screen)
 *   Characters, setting, and big events   G1-580   NEW point 1:characters-setting-events    RL.1.3   + Marlo's Magnifier (screen)
 *   Retell the story and tell its lesson  G1-581   NEW point 1:retell-and-lesson            RL.1.2   + Juniper's Story Lantern (screen)
 *   Words that show feelings and senses   G1-582   NEW point 1:feeling-and-sense-words      RL.1.4   + the Feelings Check-In tool
 *   Who is telling the story?             G1-583   NEW point 1:who-tells-the-story          RL.1.6   + Lumen's Lighthouse Windows (screen)
 *
 * Every lesson has two real assets: its page type and an activity on screen or a tool (a lesson needs two, units/gates.js
 * P3). The sixth lesson of the design, the book talk (SL.1.1.a, led by the teacher), is NOT placed: a lesson the teacher
 * leads needs a tool or practice on screen as its second asset, and no tool with a teaching point models a discussion
 * (Name Sticks is a classroom tool and names no point, teaching-graph/gates.js G3). It stays open in the design.
 * Texas rows for the five new points; every other curriculum: not yet read. The teacher notes (read by the reviewer of
 * the pages) are added to scripts/units/notes/en-literacy-year1.js by this script.
 *
 *   node scripts/units/year/place-ready-k.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
 * Then: build-points · after-publish.sh ylk · every curricula/build-<x>.js · notes/apply.js · assemble --loc=en · pacing ·
 *       assemble · build-guide --unit · build-year-plan --plan=plan-1-literacy · build-looks
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
if (!NOTES_IN || !fs.existsSync(NOTES_IN)) throw new Error('usage: place-ready-k.en.literacy.js <notes.json> (the five reviewed teacher notes)');
const NOTES = JSON.parse(fs.readFileSync(NOTES_IN, 'utf8'));
const POINTS = [
  { tp: '1:story-key-details', code: 'RL.1.1', types: ['G1-579'], activities: ['picture-story.read.rl-k-1'],
    skill: 'Ask and answer questions about key details in a short story and find the sentence that tells the answer',
    tx: [['ELAR.1.7.C', 'teaches']], txWhy: 'Answering a question about a story and underlining the sentence that tells the answer is «use text evidence to support an appropriate response».' },
  { tp: '1:characters-setting-events', code: 'RL.1.3', types: ['G1-580'], activities: ['marlo-magnifier.trait-evidence.rl-1-3'],
    skill: 'Describe the characters, the setting, and the big event of a story with key details',
    tx: [['ELAR.1.8.D', 'teaches'], ['ELAR.1.8.C', 'teaches'], ['ELAR.1.8.B', 'prepares']], txWhy: 'Naming where a story takes place is «describe the setting»; choosing and writing the big thing that happens is «describe plot elements, including the main events»; naming the two characters and what kind of animal each is leads toward «describe the main characters and the reasons for their actions» (the reasons are not asked on these pages).' },
  { tp: '1:retell-and-lesson', code: 'RL.1.2', types: ['G1-581'], activities: ['juniper-story-lantern.central-message.rl-1-2'],
    skill: 'Retell a story by its beginning, middle, and end and tell the lesson it teaches',
    tx: [['ELAR.1.7.D', 'teaches'], ['ELAR.1.8.A', 'teaches']], txWhy: 'Putting three sentences in order and writing the beginning, the middle and the end is «retell texts in ways that maintain meaning»; choosing or writing the lesson of the story is «discuss topics and determine theme using text evidence with adult assistance».' },
  { tp: '1:feeling-and-sense-words', code: 'RL.1.4', types: ['G1-582'], activities: [], tool: 'feelings-check-in',
    skill: 'Find words in a story that tell how a character feels and words that appeal to the senses',
    tx: [['ELAR.1.10.D', 'teaches']], txWhy: 'Finding the words of a story that tell a feeling or what is seen, heard, tasted or touched, and naming the sense each speaks to, is «discuss how the author uses words that help the reader visualize».' },
  { tp: '1:who-tells-the-story', code: 'RL.1.6', types: ['G1-583'], activities: ['point-of-view.who-told.rl-1-6'],
    skill: 'Identify who is telling the story at different points: the narrator or one of the characters',
    tx: [['ELAR.1.10.E', 'prepares']], txWhy: 'Telling the narrator\'s sentences from the words a character speaks is a first step toward «listen to and experience first- and third-person texts»: the stories are told in the third person, and the children hear who tells and who speaks.' },
];
const UNIT = { id: 'g1-reading-stories-characters-and-lessons', slug: 'reading-stories-characters-and-lessons-grade-1-unit', status: 'live', grade: '1', subject: 'literacy',
  title: 'Reading Stories: Characters and Lessons', metaTitle: 'Grade 1 Lesson Plans: Stories, Characters, and Lessons',
  metaDescription: 'A Grade 1 reading unit on short stories: 5 lessons on key details, characters and setting, retelling and the lesson, feeling words, and who tells the story.', weeks: 3,
  lessons: POINTS.map((p) => ({ point: p.tp, types: p.types })) };
const AFTER = 'g1-reading-sentences-and-stories', PLAN_ID = 'plan-1-literacy', AFTER_POINT = '1:story-sequencing';
const DESIGN_UNIT = 'new:reading-stories-g1';
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
    j.points.push(Object.assign({ tp: p.tp, grade: '1', strand: 'Reading: Literature', code: p.code, skill: p.skill }, p.activities.length ? { activities: p.activities } : {})); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  const list = j.subjects.literacy['1']; const at = list.indexOf(AFTER_POINT); if (at < 0) throw new Error('order: no ' + AFTER_POINT);
  list.splice(at + 1, 0, ...POINTS.map((p) => p.tp));
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/type-additions.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) for (const type of p.types) { if (j.types[type]) throw new Error(type + ' is listed already'); j.types[type] = p.tp; }
  out.push([f, jsonLike(raw, j)]);
}
{
  // the Feelings Check-In tool names the feelings with their faces: the lesson on feeling words opens with it
  const f = 'frontend/content/teaching-graph/tools.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS.filter((x) => x.tool)) { const t = j.tools[p.tool]; if (!t || t.kind === 'classroom') throw new Error('no teaching tool ' + p.tool); if ((t.points || []).includes(p.tp)) throw new Error(p.tool + ' names ' + p.tp + ' already'); t.points = [...(t.points || []), p.tp]; }
  out.push([f, jsonLike(raw, j)]);
}
for (const loc of fs.readdirSync(file('frontend/content/curricula')).filter((d) => fs.existsSync(file(`frontend/content/curricula/${d}/crosswalk-authored.json`)))) {
  const f = `frontend/content/curricula/${loc}/crosswalk-authored.json`, raw = read(f), j = JSON.parse(raw);
  const holder = j.points || j;
  for (const p of POINTS) {
    if (holder[p.tp]) throw new Error(loc + ': ' + p.tp + ' is authored already');
    holder[p.tp] = loc === 'en-tx'
      ? { rows: p.tx.map(([id, rel]) => ({ id, rel })), why: p.txWhy, review: 'year-design 2026-11-17' }
      : { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-17 for the English stories of Grade 1 (Part 12.3); a language gets its own stories, and no unit of this language teaches the point yet. Read it against the wording when the first stories of this language are written.', review: 'year-design 2026-11-17' };
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
  const f = 'scripts/units/notes/en-literacy-year1.js', raw = read(f); let s = raw.replace(/\r\n/g, '\n');
  if (POINTS.some((p) => s.includes("'" + p.tp + "'"))) throw new Error('a note of the unit is in ' + f + ' already');
  const BS = String.fromCharCode(92);
  const q = (x) => "'" + String(x).split(BS).join(BS + BS).split("'").join(BS + "'") + "'";
  const block = POINTS.map((p) => { const n = NOTES[p.tp]; return `    ${q(p.tp)}: {\n      title: ${q(n.title)},\n      objective: ${q(n.objective)},\n      note: {\n        mistake: ${q(n.mistake)},\n        words: ${q(n.words)},\n        watch: ${q(n.watch)},\n      },\n    },\n`; }).join('');
  const end = '  },\n};\n'; if (!s.endsWith(end)) throw new Error(f + ' does not end as expected');
  const head = ' * `node scripts/units/notes/apply.js` merges every file'; if (s.split(head).length !== 2) throw new Error(f + ': no place for the head line');
  s = s.replace(head, () => ' * The five notes of the unit Reading Stories: Characters and Lessons (G1-579 to G1-583) were added by\n * place-ready-k.en.literacy.js; the reviewer of the story pages read them (2026-11-17, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.push([f, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; unit placed in ' + PLAN_ID + '; notes written; design marked');
