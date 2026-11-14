#!/usr/bin/env node
/**
 * Part 12.2, English mathematics, STAGE 1, sixteenth run (2026-11-14): the lessons the "Year pages U" made possible
 * (see place-ready.en.math.js for the rules of stage 1).
 *
 *   Grade 3  Area and Perimeter (the unit of today; the design's order)
 *       Area of a rectangle: multiply the side lengths   G3-488, after Area: count the squares       (Baking Tray)
 *       Area of an L-shape                               G3-489, after Same area, different shape    (Baking Tray)
 *       Find the missing side                            G3-490, after Perimeter: walk the edge      (All the Way Round)
 *     The unit grows from five lessons to eight. Each lesson names the tool that models its teaching point already.
 *
 *   node scripts/units/year/place-ready-u.en.math.js      (refuses to run twice)
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
{
  const t = JSON.parse(read('frontend/content/teaching-graph/tools.json')).tools;
  if (!t['baking-tray'].points.includes('3:area-model') || !t['unroll-tape'].points.includes('3:perimeter')) throw new Error('the tools do not model the two points');
}
const F = 'frontend/content/units/defs/en.json', raw = read(F), defs = JSON.parse(raw);
const u = defs.units.find((x) => x.id === 'g3-area-perimeter-volume'); if (!u) throw new Error('no unit');
const keyOf = (l) => l.id || l.point;
const all = new Set(defs.units.flatMap((x) => x.lessons.map(keyOf)));
const after = (key, L) => { if (all.has(keyOf(L))) throw new Error(keyOf(L) + ' is placed already: this script ran before'); const i = u.lessons.findIndex((x) => keyOf(x) === key); if (i < 0) throw new Error('no lesson ' + key); u.lessons.splice(i + 1, 0, L); all.add(keyOf(L)); };
u.lessons.find((x) => keyOf(x) === '3:area-model').standards = ['3.MD.C.7.a'];   // each area lesson shows its own part of 3.MD.C.7 (US teacher-reviewer)
after('3:area-model', { point: '3:area-model', id: '3:area-model#area-of-a-rectangle-multiply-the-side-lengths', types: ['G3-488'], tool: 'baking-tray', activity: null, standards: ['3.MD.C.7.b'] });
after('3:same-area', { point: '3:area-model', id: '3:area-model#area-of-an-l-shape', types: ['G3-489'], tool: 'baking-tray', activity: null, standards: ['3.MD.C.7.d'] });
after('3:perimeter', { point: '3:perimeter', id: '3:perimeter#find-the-missing-side', types: ['G3-490'], tool: 'unroll-tape', activity: null });
const text = 'A four-week Grade 3 math unit: 8 lessons on area from counting squares to multiplying side lengths, L-shapes, perimeter with a missing side, and cubes in a solid.';
if (text.length < 110 || text.length > 170 || !text.includes(' ' + u.lessons.length + ' lessons')) throw new Error('description: ' + text.length + ' characters, ' + u.lessons.length + ' lessons');
u.metaDescription = text;
writeJsonLike(F, raw, defs);
console.log('placed: ' + u.lessons.map(keyOf).join(' · '));
