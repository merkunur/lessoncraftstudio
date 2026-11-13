#!/usr/bin/env node
/**
 * Part 12.2, English mathematics, STAGE 1, seventh run (2026-11-13): the lessons the "Year pages K" made possible (see
 * place-ready.en.math.js for the rules of stage 1).
 *
 *   Grade 2  Adding and Subtracting Within 100  + Add tens and ones, then put them together (G2-504, level 2: a new
 *                                                 ten in every sum; with the Place Value Lab)
 *   Grade 3  Division                           + Break a hard fact into two easy ones (G3-483, level 2: the child
 *                                                 draws the line; with the Baking Tray)
 *
 *   Grade 2  Graphs and Grids                   "Find a square on a grid" moves in front of "Read a line plot" (see below)
 *
 *   node scripts/units/year/place-ready-k.en.math.js      (refuses to run twice)
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

// the place-value blocks model adding by tens and ones too
{
  const f = 'frontend/content/teaching-graph/tools.json'; const raw = read(f); const j = JSON.parse(raw);
  if (!j.tools['place-value-lab'].points.includes('1:mental-math-to-100')) j.tools['place-value-lab'].points.push('1:mental-math-to-100');
  // the lab stands before the other tools of the point in the file, so it becomes the point's first tool: every lesson of
  // today on that point names its tool (or none), which this asserts in the three languages that have units
  for (const loc of ['en', 'de', 'sv']) {
    const d = JSON.parse(read('frontend/content/units/defs/' + loc + '.json'));
    for (const u of d.units) for (const l of u.lessons) if (l.point === '1:mental-math-to-100' && !('tool' in l)) throw new Error(loc + ' ' + u.id + ': a lesson on 1:mental-math-to-100 names no tool and would gain the place-value lab');
  }
  writeJsonLike(f, raw, j);
}

const f = 'frontend/content/units/defs/en.json'; const raw = read(f); const defs = JSON.parse(raw);
const unit = (id) => { const u = defs.units.find((x) => x.id === id); if (!u) throw new Error('no unit ' + id); return u; };
const keyOf = (l) => l.id || l.point;
const all = new Set(defs.units.flatMap((u) => u.lessons.map(keyOf)));
const fresh = (L) => { if (all.has(keyOf(L))) throw new Error(keyOf(L) + ' is placed already: this script ran before'); all.add(keyOf(L)); return L; };
const put = (u, after, L) => { fresh(L); const i = u.lessons.findIndex((x) => keyOf(x) === after) + 1; if (i === 0) throw new Error(u.id + ' has no lesson ' + after); u.lessons.splice(i, 0, L); };
const says = (u, count, text) => {
  u.metaDescription = text;
  if (!text.includes(count + ' lessons')) throw new Error(u.id + ': the description does not say ' + count + ' lessons');
  if (u.lessons.length !== count) throw new Error(u.id + ' has ' + u.lessons.length + ' lessons, the description says ' + count);
  if (text.length < 110 || text.length > 170) throw new Error(u.id + ': a description of ' + text.length + ' characters');
};
{
  const u = unit('g2-adding-and-subtracting-within-100');
  put(u, '1:open-number-line', { point: '1:mental-math-to-100', id: '1:mental-math-to-100#add-tens-and-ones', types: ['G2-504'], tool: 'place-value-lab', activity: null, standards: ['2.NBT.B.5'] });
  says(u, 7, 'A four-week Grade 2 math unit: 7 lessons on number lines, jumps on the hundreds chart and an open number line, adding tens and ones, column sums, and mixed practice.');
}
{
  const u = unit('g3-division');
  // after "The facts we still need": the class first sorts the facts it knows from those left (teacher-reviewer)
  put(u, '3:times-tables#the-facts-we-still-need', { point: '3:times-tables', id: '3:times-tables#break-a-hard-fact', types: ['G3-483'], tool: 'baking-tray', activity: null });   // the point's own standard, 3.OA.C.7 (know the facts, using strategies), is the one the page shows
  says(u, 7, 'A four-week Grade 3 math unit: 7 lessons on sharing, making groups, fact families, the facts still to learn, breaking hard facts apart, word problems, and remainders.');
}
// The new Grade 2 lesson adds two class days before Graphs and Grids, which put "Find a square on a grid" on day 91 of
// 135, one day after the two thirds of the year that a mid-year sub pack may review (pack g2-middle-1 hands out its
// page; gate P8). The lesson moves in front of "Read a line plot" in its unit (the two do not build on each other),
// so it is taught on day 89.
{
  const u = unit('g2-graphs-and-grids');
  const i = u.lessons.findIndex((x) => keyOf(x) === '2:grid-coordinates'), j = u.lessons.findIndex((x) => keyOf(x) === '2:line-plots');
  if (i < 0 || j < 0) throw new Error('g2-graphs-and-grids: lessons not found');
  if (i > j) u.lessons.splice(j, 0, u.lessons.splice(i, 1)[0]);
}
writeJsonLike(f, raw, defs);
console.log('placed: ' + defs.units.reduce((n, u) => n + u.lessons.length, 0) + ' lessons in ' + defs.units.length + ' units');
