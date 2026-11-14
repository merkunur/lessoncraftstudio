#!/usr/bin/env node
/**
 * Part 12.2, English mathematics, STAGE 1, twenty-second run (2026-11-14): the lesson the "Year pages Z" made possible
 * (see place-ready.en.math.js for the rules of stage 1).
 *
 *   Kindergarten  Adding and Taking Away Within 10 (the design's order: last, after the take-away stories)
 *       Two kinds together: put-together stories   K-643, after Some go away   (Number Bonds Board: the whole under
 *                                                  the cloth, two parts in two colors; it is listed for the point)
 *
 *   The point 1:word-problems already carries K.OA.A.2 for the two Kindergarten story lessons; this one teaches the
 *   third kind of story the standard names (put together, total unknown).
 *
 *   node scripts/units/year/place-ready-z.en.math.js      (refuses to run twice)
 * Then: node scripts/units/notes/apply.js · node scripts/units/assemble.js --loc=en · node scripts/units/apply-pacing-to-defs.js
 *       · assemble again (and assemble --loc=de, --loc=sv: unchanged)
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
const keyOf = (l) => l.id || l.point;
const F = 'frontend/content/units/defs/en.json', raw = read(F), defs = JSON.parse(raw);
const unit = (id) => { const u = defs.units.find((x) => x.id === id); if (!u) throw new Error('no unit ' + id); return u; };
const all = new Set(defs.units.flatMap((x) => x.lessons.map(keyOf)));
const after = (u, key, L) => { if (all.has(keyOf(L))) throw new Error(keyOf(L) + ' is placed already: this script ran before'); const i = u.lessons.findIndex((x) => keyOf(x) === key); if (i < 0) throw new Error('no lesson ' + key + ' in ' + u.id); u.lessons.splice(i + 1, 0, L); all.add(keyOf(L)); };
const describe = (u, text) => { if (text.length < 110 || text.length > 170 || !text.includes(' ' + u.lessons.length + ' lessons')) throw new Error(u.id + ' description: ' + text.length + ' characters, ' + u.lessons.length + ' lessons'); u.metaDescription = text; };

const tools = JSON.parse(read('frontend/content/teaching-graph/tools.json'));
if (!tools.tools['part-whole-frame'].points.includes('1:word-problems')) throw new Error('the Number Bonds Board is not listed for 1:word-problems');

const k = unit('k-adding-and-taking-away-within-10');
after(k, '1:word-problems#take-away-stories-within-10', { point: '1:word-problems', id: '1:word-problems#two-kinds-together', types: ['K-643'], tool: 'part-whole-frame', activity: null, standards: ['K.OA.A.2'] });
const weeks = { 2: 'two', 3: 'three' }[k.weeks];
if (!weeks) throw new Error('k-adding-and-taking-away-within-10: ' + k.weeks + ' weeks');
describe(k, `A ${weeks}-week Kindergarten math unit: 5 lessons on putting two groups together, taking away on a ten-frame, and adding, take-away, and put-together stories.`);

writeJsonLike(F, raw, defs);
console.log(k.id + ' (' + k.weeks + ' weeks): ' + k.lessons.map(keyOf).join(' · '));
