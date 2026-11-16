#!/usr/bin/env node
/**
 * Part 12.3, English literacy, fourth run (2026-11-16): the Grade 2 unit Reading to Learn: Informational Texts, on the
 * seven Grade 2 page types of "Year pages, literacy D and E" (types/_shared/info-text-g2.js and info-text-g2b.js) and
 * the page Compare Two Animals.
 *
 *   Grade 2  Reading to Learn: Informational Texts (NEW unit; the last unit of the Grade 2 literacy plan for now)
 *     The main topic and each paragraph   G2-519                       point 2:main-topic-paragraphs (run D)   RI.2.2
 *     Text features                       G2-523 name, G2-520 use      point 2:text-features (run D)           RI.2.5
 *     What the diagram shows              G2-521, G2-524 text/diagram  NEW point 2:diagram-and-text            RI.2.7
 *     Steps in order                      G2-522, G2-525 before/after  NEW point 2:steps-in-order              RI.2.3
 *     Two animals: same and different     G2-342                       point 2:compare-two-animals             RI.2.9
 *   The design's first lesson (clues to a mystery animal, RI.2.1) is not placed: its page G2-343 is one page with no
 *   second asset.
 *
 * Every lesson has two real assets: two page types of its point, or its page and the on-screen activity of its point.
 * G2-523 joins the point 2:text-features. Texas rows for the two new points; every other curriculum: not yet read.
 *
 *   node scripts/units/year/place-ready-e.en.literacy.js      (refuses to run twice)
 * Then: build-points · build-assets · every curricula/build-<x>.js · notes/apply.js · assemble --loc=en · pacing · assemble
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
  { tp: '2:diagram-and-text', grade: '2', strand: 'Reading: Informational Text', code: 'RI.2.7', types: ['G2-521', 'G2-524'], activities: [],
    skill: 'Read a diagram with labels and arrows together with a text and tell what the diagram adds to the text',
    tx: ['ELAR.2.9.D.ii', 'ELAR.2.10.C'], txWhy: 'Answering questions from a labeled diagram and telling which facts only the diagram gives is «features and graphics to locate and gain information» in informational text; saying what the diagram adds to the words is «discuss the author\'s use of print and graphic features to achieve specific purposes».' },
  { tp: '2:steps-in-order', grade: '2', strand: 'Reading: Informational Text', code: 'RI.2.3', types: ['G2-522', 'G2-525'], activities: [],
    skill: 'Describe the steps of a how-it-is-made text in order and tell why one step comes before another',
    tx: ['ELAR.2.9.D.iii'], txWhy: 'Putting the steps of a how-it-is-made text in order with first, next, then and finally, and telling why one step has to come before another, is «organizational patterns such as chronological order and cause and effect stated explicitly» in informational text.' },
];
// a second page type of a point that exists
const JOIN = { 'G2-523': '2:text-features' };
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before'); j.points.push({ tp: p.tp, grade: p.grade, strand: p.strand, code: p.code, skill: p.skill, ...(p.activities.length ? { activities: p.activities } : {}) }); }
  writeJsonLike(f, raw, j);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  const list = j.subjects.literacy['2']; const at = list.indexOf('2:text-features'); if (at < 0) throw new Error('order: no 2:text-features');
  list.splice(at + 1, 0, ...POINTS.map((p) => p.tp));
  writeJsonLike(f, raw, j);
}
{
  const f = 'frontend/content/teaching-graph/type-additions.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) for (const type of p.types) { if (j.types[type]) throw new Error(type + ' is listed already'); j.types[type] = p.tp; }
  for (const [type, tp] of Object.entries(JOIN)) { if (j.types[type]) throw new Error(type + ' is listed already'); j.types[type] = tp; }
  writeJsonLike(f, raw, j);
}
for (const loc of fs.readdirSync(file('frontend/content/curricula')).filter((d) => fs.existsSync(file(`frontend/content/curricula/${d}/crosswalk-authored.json`)))) {
  const f = `frontend/content/curricula/${loc}/crosswalk-authored.json`, raw = read(f), j = JSON.parse(raw);
  const holder = j.points || j;
  for (const p of POINTS) {
    if (holder[p.tp]) throw new Error(loc + ': ' + p.tp + ' is authored already');
    holder[p.tp] = loc === 'en-tx'
      ? { rows: p.tx.map((id) => ({ id, rel: 'teaches' })), why: p.txWhy, review: 'year-design 2026-11-16' }
      : { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-16 for the English informational texts of Grade 2 (Part 12.3); a language gets its own texts, and no unit of this language teaches the point yet. Read it against the wording when the first informational texts of this language are written.', review: 'year-design 2026-11-16' };
  }
  writeJsonLike(f, raw, j);
}
{
  const F = 'frontend/content/units/defs/en.json', raw = read(F), defs = JSON.parse(raw);
  const ID = 'g2-reading-to-learn-informational-texts';
  if (defs.units.some((x) => x.id === ID)) throw new Error(ID + ' exists');
  const u = { id: ID, slug: 'reading-to-learn-informational-texts-grade-2-unit', status: 'live', grade: '2', subject: 'literacy',
    title: 'Reading to Learn: Informational Texts', metaTitle: 'Grade 2 Lesson Plans: Reading to Learn from Informational Texts',
    metaDescription: 'A Grade 2 reading unit on informational texts: 5 lessons on the main topic, text features, diagrams, steps in order, and comparing two animal fact files.', weeks: 2,
    lessons: [
      { point: '2:main-topic-paragraphs', types: ['G2-519'] },
      { point: '2:text-features', types: ['G2-523', 'G2-520'], activity: null },
      { point: '2:diagram-and-text', types: ['G2-521', 'G2-524'], activity: null },
      { point: '2:steps-in-order', types: ['G2-522', 'G2-525'], activity: null },
      { point: '2:compare-two-animals', types: ['G2-342'], standards: ['RI.2.9'] },
    ] };
  if (u.metaDescription.length < 110 || u.metaDescription.length > 170) throw new Error('description of ' + u.metaDescription.length + ' characters');
  const p = defs.plans.find((x) => x.id === 'plan-2-literacy'); if (!p) throw new Error('no plan-2-literacy');
  const last = p.units[p.units.length - 1];
  const at = defs.units.findIndex((x) => x.id === last); if (at < 0) throw new Error('no unit ' + last);
  defs.units.splice(at + 1, 0, u);
  p.units.push(u.id);
  writeJsonLike(F, raw, defs);
  console.log('placed: ' + u.id + ' (' + u.lessons.length + ' lessons) after ' + last + '; ' + defs.units.length + ' units');
}
