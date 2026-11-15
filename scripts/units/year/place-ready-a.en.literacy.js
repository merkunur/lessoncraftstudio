#!/usr/bin/env node
/**
 * Part 12.3, English literacy, first run (2026-11-15): the first unit built for the designed literacy year,
 * Reading to Learn: Informational Texts (Grade 1; "informational text" is the American term: reviewer 2026-11-15), on the three page types of "Year pages, literacy A".
 *
 *   Grade 1  Reading to Learn: Information Texts (NEW unit; the design places it late in the year, after the units on
 *            words: here it is the last unit of the Grade 1 plan)
 *     Facts in the text                          G1-575 Read the Facts                  NEW point 1:info-text-key-details   RI.1.1
 *     The main topic and key details             G1-576 Main Topic and Key Details      NEW point 1:main-topic-key-details  RI.1.2
 *     Text features                              G1-578 Name the Text Features, then
 *                                                G1-577 Use the Text Features           NEW point 1:text-features           RI.1.5
 *     Two fact files on one topic                G2-342 Compare Two Animals (published) point 2:compare-two-animals, a further
 *                                                lesson of Grade 1 ("#two-fact-files-grade-1")                             RI.1.9
 *
 * A lesson needs two real assets (the unit assembler's filler gate): lessons 1, 2 and 4 have a page and practice on
 * screen (an activity of their point: a fact and its key detail; the big idea of a short text; two tales, same and
 * different), lesson 3 has two pages.
 *
 * Three NEW teaching points (frontend/content/teaching-graph/extra-points.json, order.json, type-additions.json): no
 * point of Grade 1 was about a text that informs. English (CCSS) reads its rows from each point's code; Texas gets its
 * own rows; every other curriculum gets "not yet read against this curriculum": the pages are English texts, and no
 * unit of another language teaches the points yet.
 *
 *   node scripts/units/year/place-ready-a.en.literacy.js      (refuses to run twice)
 * Then: node scripts/teaching-graph/build-points.js · node scripts/curricula/build-<each>.js · node scripts/units/notes/apply.js
 *       · node scripts/units/assemble.js --loc=en · node scripts/units/apply-pacing-to-defs.js · assemble again
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const file = (f) => path.join(REPO, f);
const read = (f) => fs.readFileSync(file(f), 'utf8');
const writeJsonLike = (f, raw, obj) => {   // keeps the file's indent and line ends
  const indent = (/^\{\r?\n(\s+)"/.exec(raw) || [, ' '])[1];
  let out = JSON.stringify(obj, null, indent); if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
  fs.writeFileSync(file(f), out + (raw.endsWith('\n') ? (raw.includes('\r\n') ? '\r\n' : '\n') : ''));
};
const POINTS = [
  { tp: '1:info-text-key-details', grade: '1', strand: 'Reading: Informational Text', code: 'RI.1.1', types: ['G1-575'], activities: ['atlas-fact-files.key-detail.ri-k-1'],
    skill: 'Ask and answer questions about key details in a short informational text and find the sentence that tells the answer',
    tx: ['ELAR.1.6.B', 'ELAR.1.7.C'], txWhy: 'Asking and answering questions about a short informational text is «generate questions about text before, during, and after reading to deepen understanding and gain information»; pointing to the sentence that tells the answer is «use text evidence to support an appropriate response».' },
  { tp: '1:main-topic-key-details', grade: '1', strand: 'Reading: Informational Text', code: 'RI.1.2', types: ['G1-576'], activities: ['nila-pond.main-idea-net.ri-k-2', 'marina-headline-desk.main-topic.ri-2-2'],
    skill: 'Name the main topic of an informational text and retell two or three key details that tell about it',
    tx: ['ELAR.1.9.D.i', 'ELAR.1.6.G'], txWhy: 'Naming the main topic and its key details is «the central idea and supporting evidence» of informational text; choosing which details are key is «evaluate details to determine what is most important».' },
  { tp: '1:text-features', grade: '1', strand: 'Reading: Informational Text', code: 'RI.1.5', types: ['G1-578', 'G1-577'],
    skill: 'Use headings, bold words, a caption and a glossary to find facts and word meanings in an informational text',
    tx: ['ELAR.1.9.D.ii'], txWhy: 'Finding a fact from a heading, a bold word, a caption or the glossary is «features and simple graphics to locate or gain information» in informational text.' },
];

// 1. the teaching graph
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before'); j.points.push(Object.assign({ tp: p.tp, grade: p.grade, strand: p.strand, code: p.code, skill: p.skill }, p.activities ? { activities: p.activities } : {})); }
  writeJsonLike(f, raw, j);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  const list = j.subjects.literacy['1']; const at = list.indexOf('1:story-writing'); if (at < 0) throw new Error('order: no 1:story-writing');
  list.splice(at + 1, 0, ...POINTS.map((p) => p.tp));
  writeJsonLike(f, raw, j);
}
{
  const f = 'frontend/content/teaching-graph/type-additions.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) for (const type of p.types) { if (j.types[type]) throw new Error(type + ' is listed already'); j.types[type] = p.tp; }
  writeJsonLike(f, raw, j);
}

// 2. the curricula: Texas reads the points against its own wording; the others have not read them yet
for (const loc of fs.readdirSync(file('frontend/content/curricula')).filter((d) => fs.existsSync(file(`frontend/content/curricula/${d}/crosswalk-authored.json`)))) {
  const f = `frontend/content/curricula/${loc}/crosswalk-authored.json`, raw = read(f), j = JSON.parse(raw);
  const holder = j.points || j;
  for (const p of POINTS) {
    if (holder[p.tp]) throw new Error(loc + ': ' + p.tp + ' is authored already');
    holder[p.tp] = loc === 'en-tx'
      ? { rows: p.tx.map((id) => ({ id, rel: 'teaches' })), why: p.txWhy, review: 'year-design 2026-11-15' }
      : { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-15 for the English informational texts of Grade 1 (Part 12.3); a language gets its own texts, and no unit of this language teaches the point yet. Read it against the wording when the first informational texts of this language are written.', review: 'year-design 2026-11-15' };
  }
  writeJsonLike(f, raw, j);
}

// 2b. the English registry row the fourth lesson shows: two fact files in tables are not yet two running texts, so the
//     page PREPARES RI.1.9 as it prepares RI.2.9 (the registry's own ruling on the point)
{
  const f = 'frontend/content/curricula/en/crosswalk-overrides.json', raw = read(f), j = JSON.parse(raw);
  const cur = j.points['2:compare-two-animals'];
  if (!cur || !Array.isArray(cur.rows)) throw new Error('no override rows for 2:compare-two-animals');
  if (cur.rows.some((r) => r.id === 'RI.1.9')) throw new Error('RI.1.9 is on 2:compare-two-animals already');
  cur.rows.push({ id: 'RI.1.9', rel: 'prepares' });
  cur.why = (cur.why ? cur.why + ' ' : '') + 'In Grade 1 the same page prepares RI.1.9 (basic similarities and differences between two texts on one topic): a lesson of the Grade 1 unit on information texts uses it.';
  writeJsonLike(f, raw, j);
}

// 3. the unit
{
  const F = 'frontend/content/units/defs/en.json', raw = read(F), defs = JSON.parse(raw);
  const ID = 'g1-reading-to-learn-informational-texts';
  if (defs.units.some((x) => x.id === ID)) throw new Error(ID + ' exists');
  const u = { id: ID, slug: 'reading-to-learn-informational-texts-grade-1-unit', status: 'live', grade: '1', subject: 'literacy',
    title: 'Reading to Learn: Informational Texts', metaTitle: 'Grade 1 Lesson Plans: Reading to Learn from Informational Texts',
    metaDescription: 'A two-week Grade 1 reading unit with short informational texts: 4 lessons on key details, the main topic, text features, and comparing two animal fact files.', weeks: 2,
    lessons: [
      { point: '1:info-text-key-details', types: ['G1-575'] },
      { point: '1:main-topic-key-details', types: ['G1-576'] },
      { point: '1:text-features', types: ['G1-578', 'G1-577'], activity: null },
      { point: '2:compare-two-animals', id: '2:compare-two-animals#two-fact-files-grade-1', types: ['G2-342'], standards: ['RI.1.9'], standardsRel: { 'RI.1.9': 'prepares' } },
    ] };
  if (u.metaDescription.length < 110 || u.metaDescription.length > 170) throw new Error('description of ' + u.metaDescription.length + ' characters');
  const last = 'g1-words-and-how-they-work';
  const at = defs.units.findIndex((x) => x.id === last); if (at < 0) throw new Error('no unit ' + last);
  defs.units.splice(at + 1, 0, u);
  const p = defs.plans.find((x) => x.id === 'plan-1-literacy'); if (!p || p.units[p.units.length - 1] !== last) throw new Error('plan-1-literacy does not end with ' + last);
  p.units.push(u.id);
  writeJsonLike(F, raw, defs);
  console.log('placed: ' + u.id + ' (' + u.lessons.length + ' lessons); ' + defs.units.length + ' units');
}
