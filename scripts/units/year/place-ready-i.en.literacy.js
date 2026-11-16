#!/usr/bin/env node
/**
 * Part 12.3, English literacy, ninth run (2026-11-16): the Grade 3 unit Stories: Evidence, Lessons, and Characters,
 * on the eight Grade 3 page types of "Year pages, literacy I" (types/_shared/story-g3.js and the story option of
 * info-text-g3.js / info-text-g3c.js; five fables and folktales of data/literacy/stories.en.json), and with it the
 * Grade 3 literacy PLAN (a plan needs three units; this is the third).
 *
 *   Grade 3  Stories: Evidence, Lessons, and Characters (NEW unit, the second of the Grade 3 literacy plan)
 *     Show where the story says it          G3-502, G3-503 Ask and Answer   NEW point 3:story-evidence       RL.3.1
 *     Retell a story, its central message   G3-505 retell, G3-504 message   NEW point 3:central-message      RL.3.2
 *     Characters: traits and actions        G3-506 traits, G3-507 causes    NEW point 3:characters-actions   RL.3.3
 *     Talk about a story                    G3-508 notes, G3-509 the talk   NEW point 3:story-discussion     SL.3.1.a
 *   NEW plan plan-3-literacy: g3-words-and-their-meanings, this unit, g3-reading-to-learn-informational-texts.
 *
 * Every lesson has two real assets: two page types of its point. Texas rows for the four new points; every other
 * curriculum: not yet read. The design is marked. The teacher notes are added to scripts/units/notes/en-literacy-year3.js
 * by this script (they were read by the reviewer of the pages, 2026-11-16; about 1,650 letters each).
 *
 *   node scripts/units/year/place-ready-i.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
 * Then: build-points · after-publish.sh yli · every curricula/build-<x>.js · notes/apply.js · assemble --loc=en · pacing ·
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
const NOTES_IN = process.argv[2];
if (!NOTES_IN || !fs.existsSync(NOTES_IN)) throw new Error('usage: place-ready-i.en.literacy.js <notes.json> (the four reviewed teacher notes)');
const NOTES = JSON.parse(fs.readFileSync(NOTES_IN, 'utf8'));
const POINTS = [
  { tp: '3:story-evidence', strand: 'Reading: Literature', code: 'RL.3.1', types: ['G3-502', 'G3-503'],
    skill: 'Ask and answer questions about a story and show the paragraph and the sentence that prove each answer',
    tx: ['ELAR.3.7.C', 'ELAR.3.6.B'], txWhy: 'Writing an answer about a story, naming the paragraph that proves it and copying the proving sentence is «use text evidence to support an appropriate response»; finding and writing the question a sentence of the story answers, and asking questions of one\'s own, is «generate questions about text before, during, and after reading to deepen understanding and gain information».' },
  { tp: '3:central-message', strand: 'Reading: Literature', code: 'RL.3.2', types: ['G3-504', 'G3-505'],
    skill: 'Retell a fable or folktale in order, determine its central message, and explain how the events of the story show it',
    tx: ['ELAR.3.8.A', 'ELAR.3.7.D'], txWhy: 'Choosing or writing the central message of a fable or folktale as a lesson for people, apart from a retelling and from a sentence that takes the story literally, is «infer the theme of a work, distinguishing theme from topic»; retelling the story in its four main events in order is «retell and paraphrase texts in ways that maintain meaning and logical order».' },
  { tp: '3:characters-actions', strand: 'Reading: Literature', code: 'RL.3.3', types: ['G3-506', 'G3-507'],
    skill: 'Describe the characters of a story by their traits and feelings and explain how what they do leads to what happens next',
    tx: ['ELAR.3.8.C', 'ELAR.3.6.F'], txWhy: 'Matching and writing what an action of a character leads to is «analyze plot elements, including the sequence of events, the conflict, and the resolution»; naming a trait of a character and copying the sentence that shows it is «make inferences and use evidence to support understanding».' },
  { tp: '3:story-discussion', strand: 'Speaking and Listening', code: 'SL.3.1.a', types: ['G3-508', 'G3-509'],
    skill: 'Come to a group talk about a story prepared, and use notes and the story itself to explain ideas',
    tx: ['ELAR.3.1.A', 'ELAR.3.1.D'], txWhy: 'Bringing notes and a question to a group talk and answering with a reason from the story is «listen actively, ask relevant questions to clarify information, and make pertinent comments»; taking turns in a group of four with sentence starters for adding on, agreeing and disagreeing is «work collaboratively with others by following agreed-upon rules, norms, and protocols».' },
];
const UNIT = { id: 'g3-stories-evidence-lessons-characters', slug: 'stories-evidence-lessons-and-characters-grade-3-unit', status: 'live', grade: '3', subject: 'literacy',
  title: 'Stories: Evidence, Lessons, and Characters', metaTitle: 'Grade 3 Lesson Plans: Stories, Their Lessons, and Characters',
  metaDescription: 'A Grade 3 reading unit on fables and folktales: 4 lessons on answering with evidence, the central message, character traits, and talking about a story.', weeks: 2,
  lessons: [
    { point: '3:story-evidence', types: ['G3-502', 'G3-503'], activity: null },
    { point: '3:central-message', types: ['G3-505', 'G3-504'], activity: null },
    { point: '3:characters-actions', types: ['G3-506', 'G3-507'], activity: null },
    { point: '3:story-discussion', types: ['G3-508', 'G3-509'], activity: null },
  ] };
const AFTER = 'g3-words-and-their-meanings';
const PLAN = { id: 'plan-3-literacy', slug: 'grade-3-reading-and-language-scope-and-sequence', grade: '3', subject: 'literacy',
  title: 'Grade 3 Reading and Language Scope and Sequence', metaTitle: 'Grade 3 ELA Scope and Sequence: Reading and Language ({weeks} Weeks)',
  metaDescription: "{units} Grade 3 reading and language units in teaching order, about {weeks} weeks in all (not a full year), with each unit's lessons and its Common Core standards.",
  // the words unit stays FIRST: the sub pack g3-early-1 reviews one of its lessons, and a pack for the early weeks may
  // only review what the plan has taught by then (units/gates.js P8 refused the stories unit in first place)
  units: ['g3-words-and-their-meanings', UNIT.id, 'g3-reading-to-learn-informational-texts'] };
const DESIGN_MARKS = { 'RL.3.1': '3:story-evidence', 'RL.3.2': '3:central-message', 'RL.3.3': '3:characters-actions', 'SL.3.1.a': '3:story-discussion' };

// ---- everything is read and checked first
if (UNIT.metaDescription.length < 110 || UNIT.metaDescription.length > 170) throw new Error('description of ' + UNIT.metaDescription.length + ' characters');
for (const p of POINTS) { const n = NOTES[p.tp]; if (!n || !n.title || !n.objective || !n.mistake || !n.words || !n.watch) throw new Error('no whole teacher note of ' + p.tp);
  const len = n.objective.length + n.mistake.length + n.words.length + n.watch.length; if (len > 1930) throw new Error('the note of ' + p.tp + ' has ' + len + ' letters (a sheet of the teacher guide holds about 1,900)'); }
const out = [];   // [file, text]
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before'); j.points.push({ tp: p.tp, grade: '3', strand: p.strand, code: p.code, skill: p.skill }); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  const list = j.subjects.literacy['3']; if (!Array.isArray(list)) throw new Error('order: no literacy list of grade 3');
  const k = list.indexOf('3:root-words-in-context'); if (k < 0) throw new Error('order: no 3:root-words-in-context');
  list.splice(k + 1, 0, ...POINTS.map((p) => p.tp));   // after the points of the words unit, the first of the plan
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
      : { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-16 for the English stories of Grade 3 (Part 12.3); a language gets its own stories, and no unit of this language teaches the point yet. Read it against the wording when the first stories of this language are written.', review: 'year-design 2026-11-16' };
  }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
  if (defs.units.some((x) => x.id === UNIT.id || x.slug === UNIT.slug)) throw new Error(UNIT.id + ' exists');
  if (defs.plans.some((x) => x.id === PLAN.id || x.slug === PLAN.slug)) throw new Error(PLAN.id + ' exists');
  for (const id of PLAN.units.filter((x) => x !== UNIT.id)) { if (!defs.units.some((x) => x.id === id)) throw new Error('no unit ' + id); if (defs.plans.some((x) => x.units.includes(id))) throw new Error(id + ' stands in a plan already'); }
  const at = defs.units.findIndex((x) => x.id === AFTER); if (at < 0) throw new Error('no unit ' + AFTER);
  defs.units.splice(at + 1, 0, UNIT);
  const after = defs.plans.findIndex((x) => x.id === 'plan-2-literacy'); if (after < 0) throw new Error('no plan-2-literacy to stand after');
  defs.plans.splice(after + 1, 0, PLAN);
  out.push([f, jsonLike(raw, defs)]);
  console.log('to place: ' + UNIT.id + ' (' + UNIT.lessons.length + ' lessons) after ' + AFTER + '; plan ' + PLAN.id + ' with ' + PLAN.units.length + ' units; ' + defs.units.length + ' units');
}
{
  const f = 'scripts/units/year/design.en.literacy.json', raw = read(f), design = JSON.parse(raw);
  let marked = 0;
  (function walk(o) { if (Array.isArray(o)) return o.forEach(walk); if (o && typeof o === 'object') { if (o.id === 'new:stories-key-details-g3' && o.lessons) { for (const l of o.lessons) if (DESIGN_MARKS[l.standard]) { if (l.placed) throw new Error('the design lesson ' + l.standard + ' is placed already'); l.placed = DESIGN_MARKS[l.standard]; marked++; } return; } Object.values(o).forEach(walk); } })(design);
  if (marked !== 4) throw new Error('the design names ' + marked + ' of the four lessons');
  out.push([f, jsonLike(raw, design)]);
}
{
  const f = 'scripts/units/notes/en-literacy-year3.js', raw = read(f); let s = raw.replace(/\r\n/g, '\n');
  if (POINTS.some((p) => s.includes("'" + p.tp + "'"))) throw new Error('a note of the unit is in ' + f + ' already');
  const BS = String.fromCharCode(92);
  const q = (x) => "'" + String(x).split(BS).join(BS + BS).split("'").join(BS + "'") + "'";
  const block = POINTS.map((p) => { const n = NOTES[p.tp]; return `    ${q(p.tp)}: {\n      title: ${q(n.title)},\n      objective: ${q(n.objective)},\n      note: {\n        mistake: ${q(n.mistake)},\n        words: ${q(n.words)},\n        watch: ${q(n.watch)},\n      },\n    },\n`; }).join('');
  const end = '  },\n};\n'; if (!s.endsWith(end)) throw new Error(f + ' does not end as expected');
  const head = ' * `node scripts/units/notes/apply.js` merges every file'; if (s.split(head).length !== 2) throw new Error(f + ': no place for the head line');
  s = s.replace(head, () => ' * The four notes of the unit Stories: Evidence, Lessons, and Characters (G3-502 to G3-509) were added by\n * place-ready-i.en.literacy.js; the reviewer of the story pages read them (2026-11-16, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.push([f, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; unit and plan placed; notes written; design marked');
