#!/usr/bin/env node
/**
 * Part 12.3, English literacy, eighth run (2026-11-16): the Grade 3 unit Reading to Learn: Informational Texts, on
 * the eight Grade 3 page types of "Year pages, literacy G and H" (types/_shared/info-text-g3.js, -g3b.js, -g3c.js).
 *
 *   Grade 3  Reading to Learn: Informational Texts (NEW unit)
 *     Answer with evidence             G3-494, G3-495 Ask and Answer            point 3:answer-with-evidence (run G)     RI.3.1
 *     Main idea and key details        G3-497 each paragraph, G3-496 whole text  point 3:main-idea-key-details (run G)    RI.3.2
 *     Text features and search tools   G3-498 use them, G3-499 which tool        NEW point 3:text-features-search-tools  RI.3.5
 *     Events in order, cause, effect   G3-500 events in order, G3-501 causes     NEW point 3:events-cause-effect         RI.3.3
 *   The design's lesson on maps, diagrams and photos (RI.3.7) is not placed: its pages do not exist yet.
 *   Grade 3 literacy now has two units (with g3-words-and-their-meanings); a plan needs three, so NO plan is made.
 *
 * Every lesson has two real assets: two page types of its point. Texas rows for the two new points; every other
 * curriculum: not yet read. The design is marked. The four teacher notes are scripts/units/notes/en-literacy-year3.js.
 *
 *   node scripts/units/year/place-ready-h.en.literacy.js      (refuses to run twice; it checks everything before it writes)
 * Then: build-points · after-publish.sh ylh · every curricula/build-<x>.js · notes/apply.js · assemble --loc=en · pacing · assemble
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
  { tp: '3:text-features-search-tools', grade: '3', strand: 'Reading: Informational Text', code: 'RI.3.5', types: ['G3-498', 'G3-499'],
    skill: 'Use the table of contents, headings, key words in bold, a sidebar, the glossary, and the index of a text to find information quickly',
    tx: ['ELAR.3.9.D.ii'], txWhy: 'Finding a page in the table of contents, a word in the index or the glossary, a key word in bold and the fact of a sidebar, and choosing the tool that gives an answer fastest, is «features such as sections, tables, graphs, timelines, bullets, numbers, and bold and italicized font to support understanding» of informational text.' },
  { tp: '3:events-cause-effect', grade: '3', strand: 'Reading: Informational Text', code: 'RI.3.3', types: ['G3-500', 'G3-501'],
    skill: 'Describe how the events, steps, and ideas of an informational text connect, with words of time and sequence and of cause and effect',
    tx: ['ELAR.3.9.D.iii', 'ELAR.3.7.D'], txWhy: 'Matching and writing causes and effects and joining them with because or so is «organizational patterns such as cause and effect» of informational text; writing the four events or steps of a text in order with first, next, then and finally is «retell and paraphrase texts in ways that maintain meaning and logical order».' },
];
const UNIT = { id: 'g3-reading-to-learn-informational-texts', slug: 'reading-to-learn-informational-texts-grade-3-unit', status: 'live', grade: '3', subject: 'literacy',
  title: 'Reading to Learn: Informational Texts', metaTitle: 'Grade 3 Lesson Plans: Reading to Learn from Informational Texts',
  metaDescription: 'A Grade 3 reading unit on informational texts: 4 lessons on answering with evidence, main idea and key details, search tools, and cause and effect.', weeks: 2,
  lessons: [
    { point: '3:answer-with-evidence', types: ['G3-494', 'G3-495'], activity: null },
    { point: '3:main-idea-key-details', types: ['G3-497', 'G3-496'], activity: null },
    { point: '3:text-features-search-tools', types: ['G3-498', 'G3-499'], activity: null },
    { point: '3:events-cause-effect', types: ['G3-500', 'G3-501'], activity: null },
  ] };
const AFTER = 'g3-words-and-their-meanings';
const DESIGN_MARKS = { 'RI.3.1': '3:answer-with-evidence', 'RI.3.2': '3:main-idea-key-details', 'RI.3.5': '3:text-features-search-tools', 'RI.3.3': '3:events-cause-effect' };

// ---- everything is read and checked first
if (UNIT.metaDescription.length < 110 || UNIT.metaDescription.length > 170) throw new Error('description of ' + UNIT.metaDescription.length + ' characters');
const out = [];   // [file, text]
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before'); j.points.push({ tp: p.tp, grade: p.grade, strand: p.strand, code: p.code, skill: p.skill }); }
  for (const l of UNIT.lessons) if (!j.points.some((x) => x.tp === l.point)) throw new Error('no point ' + l.point);
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  const list = j.subjects.literacy['3']; const at = list.indexOf('3:main-idea-key-details'); if (at < 0) throw new Error('order: no 3:main-idea-key-details');
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
      : { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-16 for the English informational texts of Grade 3 (Part 12.3); a language gets its own texts, and no unit of this language teaches the point yet. Read it against the wording when the first informational texts of this language are written.', review: 'year-design 2026-11-16' };
  }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
  if (defs.units.some((x) => x.id === UNIT.id || x.slug === UNIT.slug)) throw new Error(UNIT.id + ' exists');
  const at = defs.units.findIndex((x) => x.id === AFTER); if (at < 0) throw new Error('no unit ' + AFTER);
  defs.units.splice(at + 1, 0, UNIT);
  out.push([f, jsonLike(raw, defs)]);
  console.log('to place: ' + UNIT.id + ' (' + UNIT.lessons.length + ' lessons) after ' + AFTER + '; ' + defs.units.length + ' units');
}
{
  const f = 'scripts/units/year/design.en.literacy.json', raw = read(f), design = JSON.parse(raw);
  let marked = 0;
  (function walk(o) { if (Array.isArray(o)) return o.forEach(walk); if (o && typeof o === 'object') { if (o.id === 'new:information-texts-g3' && o.lessons) { for (const l of o.lessons) if (DESIGN_MARKS[l.standard]) { if (l.placed) throw new Error('the design lesson ' + l.standard + ' is placed already'); l.placed = DESIGN_MARKS[l.standard]; marked++; } return; } Object.values(o).forEach(walk); } })(design);
  if (marked !== 4) throw new Error('the design names ' + marked + ' of the four lessons');
  out.push([f, jsonLike(raw, design)]);
}
{ const n = require(file('scripts/units/notes/en-literacy-year3.js')); for (const l of UNIT.lessons) if (!n.points[l.point]) throw new Error('no teacher note of ' + l.point); }

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; unit placed; design marked');
