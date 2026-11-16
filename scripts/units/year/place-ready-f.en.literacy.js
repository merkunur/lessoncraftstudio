#!/usr/bin/env node
/**
 * Part 12.3, English literacy, fifth run (2026-11-16): the fifth lesson of the Kindergarten unit Reading to Learn: Fact
 * Texts, on the page type of "Year pages, literacy F" (types/_shared/two-texts-k.js).
 *
 *   Two texts, one topic   K-649 Two Texts, One Topic   NEW point K:two-texts-one-topic   RI.K.9
 *
 * The lesson has two real assets: its page and the on-screen activity of its point (two stories compared). With it the
 * unit teaches every lesson of its design. Texas row for the new point; every other curriculum: not yet read.
 *
 *   node scripts/units/year/place-ready-f.en.literacy.js      (refuses to run twice)
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
  { tp: 'K:two-texts-one-topic', grade: 'K', strand: 'Reading: Informational Text', code: 'RI.K.9', types: ['K-649'], activities: ['willow-story-corner.compare-tales.rl-k-9'],
    skill: 'Tell what two short fact texts on one topic both say and what only one of them says',
    tx: ['ELAR.K.5.E'], txWhy: 'Sorting what two fact texts on one topic both tell and what only one of them tells is «make connections to personal experiences, ideas in other texts, and society with adult assistance».' },
];
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before'); j.points.push({ tp: p.tp, grade: p.grade, strand: p.strand, code: p.code, skill: p.skill, activities: p.activities }); }
  writeJsonLike(f, raw, j);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  const list = j.subjects.literacy.K; const at = list.indexOf('K:first-then'); if (at < 0) throw new Error('order: no K:first-then');
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
      ? { rows: p.tx.map((id) => ({ id, rel: 'teaches' })), why: p.txWhy, review: 'year-design 2026-11-16' }
      : { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-16 for the English fact texts of Kindergarten (Part 12.3); a language gets its own texts, and no unit of this language teaches the point yet. Read it against the wording when the first fact texts of this language are written.', review: 'year-design 2026-11-16' };
  }
  writeJsonLike(f, raw, j);
}
{
  const F = 'frontend/content/units/defs/en.json', raw = read(F), defs = JSON.parse(raw);
  const u = defs.units.find((x) => x.id === 'k-reading-to-learn-fact-texts'); if (!u) throw new Error('no unit k-reading-to-learn-fact-texts');
  if (u.lessons.some((l) => l.point === 'K:two-texts-one-topic')) throw new Error('the lesson is in the unit already');
  u.lessons.push({ point: 'K:two-texts-one-topic', types: ['K-649'] });
  u.metaDescription = 'A Kindergarten reading unit on short nonfiction texts in big print: 5 lessons on key details, the main topic, pictures and words, first and next, and two texts.';
  if (u.metaDescription.length < 110 || u.metaDescription.length > 170) throw new Error('description of ' + u.metaDescription.length + ' characters');
  writeJsonLike(F, raw, defs);
  console.log('lesson added to ' + u.id + ' (' + u.lessons.length + ' lessons)');
}
