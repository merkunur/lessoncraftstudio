#!/usr/bin/env node
/**
 * Part 12.3, English literacy, third run (2026-11-15): the Kindergarten unit Reading to Learn: Fact Texts, on the four
 * page types of "Year pages, literacy B and C" (types/_shared/fact-text-k.js).
 *
 *   Kindergarten  Reading to Learn: Fact Texts (NEW unit; the design places it late in the year: here it is the last
 *                 unit of the Kindergarten literacy plan)
 *     Find the facts                    K-645 Find the Facts          point K:fact-text-key-details (placed by run 2)  RI.K.1
 *     What is it all about?             K-646 What Is It All About?   point K:fact-text-main-topic  (placed by run 2)  RI.K.2
 *     Pictures that teach               K-647 Pictures That Teach     NEW point K:pictures-and-text                     RI.K.7
 *     First, then                       K-648 First, Then             NEW point K:first-then                            RI.K.3
 *   The design's fifth lesson (two texts on one topic, RI.K.9) is not placed: no page compares two read-aloud texts yet.
 *
 * Every lesson has two real assets: its page and the on-screen activity of its point (a fact and its key detail; the
 * big idea of a short text; the picture that goes with a part of a story; two facts that belong together).
 * Texas rows for the two new points; every other curriculum: not yet read.
 *
 *   node scripts/units/year/place-ready-c.en.literacy.js      (refuses to run twice)
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
  { tp: 'K:pictures-and-text', grade: 'K', strand: 'Reading: Informational Text', code: 'RI.K.7', types: ['K-647'], activities: ['otto-picture-book.which-picture.rl-k-7'],
    skill: 'Tell which picture goes with which sentence of a fact text, and what the picture shows of it',
    tx: ['ELAR.K.8.D.ii'], txWhy: 'Drawing a line from each sentence of a fact text to the picture that goes with it is «titles and simple graphics to gain information» in informational text.' },
  { tp: 'K:first-then', grade: 'K', strand: 'Reading: Informational Text', code: 'RI.K.3', types: ['K-648'], activities: ['linc-fact-chain.connect.ri-k-3'],
    skill: 'Tell what comes first and what comes next in a fact text that tells a change',
    tx: ['ELAR.K.8.D.iii'], txWhy: 'Showing what comes first and what comes next in a text that tells a change is «the steps in a sequence with adult assistance» of informational text.' },
];
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before'); j.points.push({ tp: p.tp, grade: p.grade, strand: p.strand, code: p.code, skill: p.skill, activities: p.activities }); }
  writeJsonLike(f, raw, j);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  const list = j.subjects.literacy.K; const at = list.indexOf('K:fact-text-main-topic'); if (at < 0) throw new Error('order: no K:fact-text-main-topic');
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
      : { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-15 for the English fact texts of Kindergarten (Part 12.3); a language gets its own texts, and no unit of this language teaches the point yet. Read it against the wording when the first fact texts of this language are written.', review: 'year-design 2026-11-15' };
  }
  writeJsonLike(f, raw, j);
}
{
  const F = 'frontend/content/units/defs/en.json', raw = read(F), defs = JSON.parse(raw);
  const ID = 'k-reading-to-learn-fact-texts';
  if (defs.units.some((x) => x.id === ID)) throw new Error(ID + ' exists');
  const u = { id: ID, slug: 'reading-to-learn-fact-texts-kindergarten-unit', status: 'live', grade: 'K', subject: 'literacy',
    title: 'Reading to Learn: Fact Texts', metaTitle: 'Kindergarten Lesson Plans: Reading to Learn from Fact Texts',
    metaDescription: 'A two-week Kindergarten reading unit on short nonfiction texts in big print: 4 lessons on key details, the main topic, matching pictures to words, and first and next.', weeks: 2,
    lessons: [
      { point: 'K:fact-text-key-details', types: ['K-645'] },
      { point: 'K:fact-text-main-topic', types: ['K-646'] },
      { point: 'K:pictures-and-text', types: ['K-647'] },
      { point: 'K:first-then', types: ['K-648'] },
    ] };
  if (u.metaDescription.length < 110 || u.metaDescription.length > 170) throw new Error('description of ' + u.metaDescription.length + ' characters');
  const p = defs.plans.find((x) => x.id === 'plan-k-literacy'); if (!p) throw new Error('no plan-k-literacy');
  const last = p.units[p.units.length - 1];
  const at = defs.units.findIndex((x) => x.id === last); if (at < 0) throw new Error('no unit ' + last);
  defs.units.splice(at + 1, 0, u);
  p.units.push(u.id);
  writeJsonLike(F, raw, defs);
  console.log('placed: ' + u.id + ' (' + u.lessons.length + ' lessons) after ' + last + '; ' + defs.units.length + ' units');
}
