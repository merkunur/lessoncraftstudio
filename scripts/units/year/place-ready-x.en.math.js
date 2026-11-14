#!/usr/bin/env node
/**
 * Part 12.2, English mathematics, STAGE 1, nineteenth run (2026-11-14): the lessons the "Year pages X" made possible
 * (see place-ready.en.math.js for the rules of stage 1).
 *
 *   Grade 1  Shapes, Measuring, and Graphs (the design's order: right after the lesson on measuring with units)
 *       No gaps, no overlaps             G1-574, after Measure with units               (Measurement Bench: its length
 *                                        bench lays paper clips along an object and closes gaps and overlaps)
 *                                        (G1-480 Paper Clip Measuring was planned as a second page: it is a maker
 *                                        template with no published page, so the lesson's second material is the tool)
 *   Grade 2  Measurement, Time, and Money (the design's order: before Estimate, then measure)
 *       Same length, two units           G2-517, after Measure with a ruler             (The Unit Handle)
 *   Grade 2  Graphs and Grids (the design's order: after the lesson on reading a line plot)
 *       Measure and make a line plot     G2-516, after Line plots                       (Ruler, now listed for the point)
 *
 *   The English registry (frontend/content/curricula/en/crosswalk-overrides.json): measuring one object in two units
 *   and telling why the numbers differ is 2.MD.A.2, a new row of the point "measure length with units"; the lesson on
 *   MAKING a line plot from measured lengths teaches 2.MD.D.9, which the reading lesson only prepares (the lesson says
 *   so itself: `standardsRel`).
 *   Pinned so that no lesson of today changes: the lesson on measuring with units keeps its two Grade 1 objectives;
 *   the lessons on reading a line plot keep no tool, in English, German and Swedish (a tool listed for a point is
 *   given to every lesson of the point that names none).
 *
 *   node scripts/units/year/place-ready-x.en.math.js      (refuses to run twice)
 * Then: node scripts/curricula/build-en.js · node scripts/units/notes/apply.js · node scripts/units/assemble.js --loc=en
 *       · node scripts/units/apply-pacing-to-defs.js · assemble again (and assemble --loc=de, --loc=sv: unchanged)
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
const pin = (lessons, key, field, value) => { const l = lessons.find((x) => keyOf(x) === key); if (!l) throw new Error('no lesson ' + key); if (field in l) throw new Error(key + ' has its ' + field + ' already'); l[field] = value; };

// 0. a tool models a point: the Ruler (an object between two handles on a ruler in inches or centimeters) for the
//    lesson that measures before it plots
{
  const f = 'frontend/content/teaching-graph/tools.json'; const r = read(f); const j = JSON.parse(r);
  if (!j.tools.ruler.points.includes('2:line-plots')) j.tools.ruler.points.push('2:line-plots');
  writeJsonLike(f, r, j);
}
// … and the lessons of today on that point keep no tool, in German and Swedish too
for (const loc of ['de', 'sv']) {
  const f = 'frontend/content/units/defs/' + loc + '.json'; const r = read(f); const j = JSON.parse(r);
  const ls = j.units.flatMap((u) => u.lessons).filter((x) => keyOf(x) === '2:line-plots');
  if (ls.length !== 1) throw new Error(loc + ': ' + ls.length + ' lessons on 2:line-plots');
  pin(ls, '2:line-plots', 'tool', null);
  writeJsonLike(f, r, j);
}

// 1. the registry row the Grade 2 lesson on two units shows
{
  const f = 'frontend/content/curricula/en/crosswalk-overrides.json'; const r = read(f); const j = JSON.parse(r);
  if (j.points['1:measure-length-units']) throw new Error('an override for 1:measure-length-units exists');
  j.points['1:measure-length-units'] = { rows: ['1.MD.A.1', '1.MD.A.2', '2.MD.A.2'].map((id) => ({ id, rel: 'teaches' })), why: 'The point carries 1.MD.A.1 and 1.MD.A.2 for its pages on ordering lengths and measuring with units laid end to end. Same Length, Two Units measures one ribbon with paper clips and with cubes and asks which unit was needed more often: measuring twice with units of different lengths and relating the two numbers to the size of the unit is 2.MD.A.2. Each lesson of a unit shows the one it teaches.', review: 'year-design 2026-11-14' };
  writeJsonLike(f, r, j);
}

// 2. the units
const g1 = unit('g1-shapes-measuring-graphs');
pin(g1.lessons, '1:measure-length-units', 'standards', ['1.MD.A.1', '1.MD.A.2']);
after(g1, '1:measure-length-units', { point: '1:measure-length-units', id: '1:measure-length-units#no-gaps-no-overlaps', types: ['G1-574'], tool: 'measurement-bench', activity: null, standards: ['1.MD.A.2'] });
describe(g1, 'A five-week Grade 1 math unit: 9 lessons on shapes, tangram puzzles, measuring length with no gaps, sorting, picture and bar graphs, patterns, and halves and fourths.');

const g2m = unit('g2-measurement-time-money');
after(g2m, '2:measure-with-ruler', { point: '1:measure-length-units', id: '1:measure-length-units#same-length-two-units', types: ['G2-517'], tool: 'unit-handle', activity: null, standards: ['2.MD.A.2'] });
describe(g2m, 'A five-week Grade 2 math unit: 8 lessons on measuring with a ruler and in two units, time to five minutes, the calendar, counting mixed coins, and shopping with money.');

const g2g = unit('g2-graphs-and-grids');
pin(g2g.lessons, '2:line-plots', 'tool', null);
after(g2g, '2:line-plots', { point: '2:line-plots', id: '2:line-plots#measure-and-make-a-line-plot', types: ['G2-516'], tool: 'ruler', activity: null, standards: ['2.MD.D.9'], standardsRel: { '2.MD.D.9': 'teaches' } });
describe(g2g, 'A three-week Grade 2 math unit: 6 lessons on making a graph from counts, bar graphs, reading and making line plots, picture graphs with a key, and grids.');

writeJsonLike(F, raw, defs);
for (const u of [g1, g2m, g2g]) console.log(u.id + ': ' + u.lessons.map(keyOf).join(' · '));
