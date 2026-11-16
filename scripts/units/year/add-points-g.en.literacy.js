#!/usr/bin/env node
/**
 * Part 12.3, English literacy, seventh run (2026-11-16): the two teaching points of "Year pages, literacy G", the
 * Grade 3 pages on an informational text of four paragraphs (types/_shared/info-text-g3.js):
 *
 *   3:answer-with-evidence     G3-494 Answer with Evidence, G3-495 Ask and Answer                      RI.3.1
 *   3:main-idea-key-details    G3-496 Main Idea and Key Details, G3-497 The Main Idea of Each Paragraph  RI.3.2
 *
 * The pages are published; their UNIT is NOT placed. A unit needs at least four lessons and a plan at least three
 * units (scripts/units/assemble.js refused a unit of these two lessons and a Grade 3 literacy plan of two units,
 * 2026-11-16; the rules stand). The design's unit new:information-texts-g3 has three more lessons (text features and
 * search tools RI.3.5; maps, diagrams and photos RI.3.7; time order and cause and effect RI.3.3) whose pages do not
 * exist yet. When they are built, the unit to place is:
 *
 *   id g3-reading-to-learn-informational-texts, slug reading-to-learn-informational-texts-grade-3-unit,
 *   title "Reading to Learn: Informational Texts",
 *   lessons { point: '3:answer-with-evidence', types: ['G3-494', 'G3-495'] },
 *           { point: '3:main-idea-key-details', types: ['G3-497', 'G3-496'] }, then the three new lessons;
 *   Grade 3 literacy then has two units (with g3-words-and-their-meanings): its plan needs a third.
 * The two teacher notes are written and reviewed already: scripts/units/notes/en-literacy-year3.js.
 *
 * This script only gives the four pages their teaching points, so that every published type sits under a point.
 * English (CCSS) reads its rows from each point's code; Texas gets its own rows; every other curriculum gets "not
 * yet read against this curriculum".
 *
 *   node scripts/units/year/add-points-g.en.literacy.js      (refuses to run twice)
 * Then: node scripts/teaching-graph/build-points.js · after-publish.sh ylg · every scripts/curricula/build-<x>.js
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
const POINTS = [
  { tp: '3:answer-with-evidence', grade: '3', strand: 'Reading: Informational Text', code: 'RI.3.1', types: ['G3-494', 'G3-495'],
    skill: 'Ask and answer questions about an informational text and show the paragraph and the sentence that prove each answer',
    tx: ['ELAR.3.7.C', 'ELAR.3.6.B'], txWhy: 'Writing an answer, naming the paragraph that proves it and copying the proving sentence is «use text evidence to support an appropriate response»; finding and writing the question a sentence answers, and asking questions of one\'s own about the text, is «generate questions about text before, during, and after reading to deepen understanding and gain information».' },
  { tp: '3:main-idea-key-details', grade: '3', strand: 'Reading: Informational Text', code: 'RI.3.2', types: ['G3-496', 'G3-497'],
    skill: 'Determine the main idea of an informational text of four paragraphs, recount the key details that support it, and tell what each paragraph is mostly about',
    tx: ['ELAR.3.9.D.i', 'ELAR.3.6.G', 'ELAR.3.7.D'], txWhy: 'Choosing or writing the main idea of the whole text with the three key details that support it is «the central idea with supporting evidence» of informational text; telling what each paragraph is mostly about and setting a key detail apart from a small fact is «evaluate details read to determine key ideas»; the summary of the hardest page is «retell and paraphrase texts in ways that maintain meaning and logical order».' },
];
// ---- everything is read and checked first
const out = [];   // [file, text]
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before'); j.points.push({ tp: p.tp, grade: p.grade, strand: p.strand, code: p.code, skill: p.skill }); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  const list = j.subjects.literacy['3']; if (!Array.isArray(list)) throw new Error('order: no literacy list of grade 3');
  list.push(...POINTS.map((p) => p.tp));
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
      : { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-16 for the English informational texts of Grade 3 (Part 12.3); a language gets its own texts, and no unit of this language teaches the point yet. Read it against the wording when the first informational texts of this language are written.', review: 'year-design 2026-11-16' };
  }
  out.push([f, jsonLike(raw, j)]);
}
// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', '));
