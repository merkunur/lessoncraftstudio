#!/usr/bin/env node
/**
 * Part 12.2, English mathematics, STAGE 1, twentieth run (2026-11-14): the lesson the "Year pages Y" made possible
 * (see place-ready.en.math.js for the rules of stage 1).
 *
 *   Grade 3  Shapes and Data
 *       Measure to the nearest quarter inch   G3-493, after A line plot with halves     (Ruler, now listed for the point)
 *     The design had it before the lesson that reads a line plot in halves, and this script first placed it there.
 *     The US teacher-reviewer of the note asked for the other order (read a plot before making one, halves before
 *     quarters, as Grade 2 has it): the lesson was moved to the end of the unit by hand the same day, and the line
 *     below is corrected so that the record says where the lesson stands.
 *
 *   The lesson teaches 3.MD.B.4 (measure to halves and fourths of an inch and show the data on a line plot), which
 *   the reading lesson only prepares: the lesson says so itself (`standardsRel`).
 *   Pinned so that no lesson of today changes: the lessons on reading a line plot in halves keep no tool, in English
 *   and in German (a tool listed for a point is given to every lesson of the point that names none).
 *
 *   node scripts/units/year/place-ready-y.en.math.js      (refuses to run twice)
 * Then: node scripts/units/notes/apply.js · node scripts/units/assemble.js --loc=en · node
 *       scripts/units/apply-pacing-to-defs.js · assemble again (and assemble --loc=de: unchanged)
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

// 0. a tool models a point: the Ruler in inches, with eight small spaces to the inch
{
  const f = 'frontend/content/teaching-graph/tools.json'; const r = read(f); const j = JSON.parse(r);
  if (!j.tools.ruler.points.includes('3:line-plot-halves')) j.tools.ruler.points.push('3:line-plot-halves');
  writeJsonLike(f, r, j);
}
// … and the German lesson of today on that point keeps no tool
{
  const f = 'frontend/content/units/defs/de.json'; const r = read(f); const j = JSON.parse(r);
  const ls = j.units.flatMap((u) => u.lessons).filter((x) => keyOf(x) === '3:line-plot-halves');
  if (ls.length !== 1) throw new Error('de: ' + ls.length + ' lessons on 3:line-plot-halves');
  pin(ls, '3:line-plot-halves', 'tool', null);
  writeJsonLike(f, r, j);
}

// 1. the unit
const g3 = unit('g3-shapes-and-data');
pin(g3.lessons, '3:line-plot-halves', 'tool', null);
after(g3, '3:line-plot-halves', { point: '3:line-plot-halves', id: '3:line-plot-halves#measure-to-the-quarter-inch', types: ['G3-493'], tool: 'ruler', activity: null, standards: ['3.MD.B.4'], standardsRel: { '3.MD.B.4': 'teaches' } });
describe(g3, 'A four-week Grade 3 math unit: 6 lessons on right angles, rectangles and squares, lines of symmetry, scaled graphs, line plots, and measuring to the quarter inch.');

writeJsonLike(F, raw, defs);
console.log(g3.id + ': ' + g3.lessons.map(keyOf).join(' · '));
