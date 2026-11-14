#!/usr/bin/env node
/**
 * Part 12.2, English mathematics, STAGE 1, twenty-third run (2026-11-14): the lesson the "Year pages AA" made possible
 * (see place-ready.en.math.js for the rules of stage 1).
 *
 *   Kindergarten  Shapes All Around (the design's order: right after Flat or solid?)
 *       Name the solid shapes   K-644, after Flat or solid?, with G2-243 Solid Shapes Around Us at its first level (three
 *                               solids matched to things). No practice on screen: Professor Pip's Museum, the point's
 *                               K.G.A.2 activity, has no cone pedestal (a cone goes to its Mystery Gallery).
 *
 *   The point 2:solids-in-real-life already carries K.G.A.2 in the English registry (crosswalk-overrides.json); its
 *   Grade 2 lesson (G2-243) keeps its own activity.
 *
 *   node scripts/units/year/place-ready-aa.en.math.js      (refuses to run twice)
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


const k = unit('k-shapes');
after(k, '2:flat-or-solid', { point: '2:solids-in-real-life', id: '2:solids-in-real-life#name-the-solid-shapes', types: ['K-644', 'G2-243'], core: { 'G2-243': 1 }, tool: null, activity: null, standards: ['K.G.A.2'] });
const weeks = { 2: 'two', 3: 'three', 4: 'four' }[k.weeks];
if (!weeks) throw new Error('k-shapes: ' + k.weeks + ' weeks');
describe(k, `A ${weeks}-week Kindergarten math unit: 6 lessons on naming shapes, counting sides, flat and solid shapes, naming solids, tangram pieces, and mirror pictures.`);

writeJsonLike(F, raw, defs);
console.log(k.id + ' (' + k.weeks + ' weeks): ' + k.lessons.map(keyOf).join(' · '));
