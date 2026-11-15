#!/usr/bin/env node
/**
 * Part 12.3, English literacy, fourth run (2026-11-15): the two teaching points of "Year pages, literacy D", the
 * Grade 2 pages on an informational text of three parts: G2-519 Main Topic and Paragraphs (RI.2.2) and G2-520
 * Glossary and Index (RI.2.5).
 *
 * The pages are published; their UNIT (information texts, six lessons in the design) is not placed yet: two of its
 * lessons wait for pages that do not exist (a text with a labeled diagram, RI.2.7; the steps of how something is
 * made, RI.2.3), and a lesson needs two real assets. This script only gives the two pages their teaching points, so
 * that every published type sits under a point. English (CCSS) reads its rows from each point's code; Texas gets
 * its own rows; every other curriculum gets "not yet read against this curriculum".
 *
 *   node scripts/units/year/add-points-d.en.literacy.js      (refuses to run twice)
 * Then: node scripts/teaching-graph/build-points.js · build-assets.js · every scripts/curricula/build-<x>.js
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
  { tp: '2:main-topic-paragraphs', grade: '2', strand: 'Reading: Informational Text', code: 'RI.2.2', types: ['G2-519'], activities: ['marina-headline-desk.main-topic.ri-2-2'],
    skill: 'Name the main topic of an informational text of several paragraphs and what each paragraph is mostly about',
    tx: ['ELAR.2.9.D.i', 'ELAR.2.6.G'], txWhy: 'Naming the main topic of the whole text and what each paragraph is mostly about is «the central idea and supporting evidence with adult assistance» of informational text; matching each statement to its paragraph is «evaluate details read to determine key ideas».' },
  { tp: '2:text-features', grade: '2', strand: 'Reading: Informational Text', code: 'RI.2.5', types: ['G2-520'], activities: [],
    skill: 'Use headings, bold print, captions, a glossary, and an index to find facts in an informational text',
    tx: ['ELAR.2.9.D.ii', 'ELAR.2.2.D'], txWhy: 'Finding a fact from a heading, a bold word, a caption, the glossary or the index is «features and graphics to locate and gain information» in informational text; looking a word up in the glossary of the text is «use a dictionary or glossary to find words».' },
];
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before'); j.points.push({ tp: p.tp, grade: p.grade, strand: p.strand, code: p.code, skill: p.skill, ...(p.activities.length ? { activities: p.activities } : {}) }); }
  writeJsonLike(f, raw, j);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  const list = j.subjects.literacy['2']; const at = list.indexOf('2:mystery-animal'); if (at < 0) throw new Error('order: no 2:mystery-animal');
  list.splice(at + 1, 0, ...POINTS.map((p) => p.tp));
  writeJsonLike(f, raw, j);
}
{
  const f = 'frontend/content/teaching-graph/type-additions.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) for (const type of p.types) { if (j.types[type]) throw new Error(type + ' is listed already'); j.types[type] = p.tp; }
  writeJsonLike(f, raw, j);
}
for (const loc of fs.readdirSync(file('frontend/content/curricula')).filter((d) => fs.existsSync(file(`frontend/content/curricula/${d}/crosswalk-authored.json`)))) {
  const f = `frontend/content/curricula/${loc}/crosswalk-authored.json`, raw = read(f), j = JSON.parse(raw);
  const holder = j.points || j;
  for (const p of POINTS) {
    if (holder[p.tp]) throw new Error(loc + ': ' + p.tp + ' is authored already');
    holder[p.tp] = loc === 'en-tx'
      ? { rows: p.tx.map((id) => ({ id, rel: 'teaches' })), why: p.txWhy, review: 'year-design 2026-11-15' }
      : { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-15 for the English informational texts of Grade 2 (Part 12.3); a language gets its own texts, and no unit of this language teaches the point yet. Read it against the wording when the first informational texts of this language are written.', review: 'year-design 2026-11-15' };
  }
  writeJsonLike(f, raw, j);
}
console.log('points added: ' + POINTS.map((p) => p.tp).join(', '));
