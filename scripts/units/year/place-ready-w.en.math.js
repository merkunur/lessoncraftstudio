#!/usr/bin/env node
/**
 * Part 12.2, English mathematics, STAGE 1, eighteenth run (2026-11-14): the lessons the "Year pages W" made possible
 * (see place-ready.en.math.js for the rules of stage 1).
 *
 *   Grade 3  Division (the design's order: the unit's last lesson; the unit also finishes the multiplication facts)
 *       Multiply by tens                 G3-491 and, as its warm-up, G3-366 Times Table of 10 (published, used by no
 *                                        lesson yet), after the remainders lesson       (no tool: ten-rods on the board)
 *   Grade 3  Fractions (the design's order: after equivalent fractions)
 *       Whole numbers as fractions       G3-492, after Equivalent fractions             (Fraction Kitchen: a whole food
 *                                        cut into equal parts and counted; the tool is listed for the point here)
 *   Grade 2  Equal Groups and Equal Shares (the design's order: after the arrays lesson)
 *       Rows and columns of squares      G2-515, after Arrays                           (The Baking Tray)
 *   The English registry gains the row each lesson shows (frontend/content/curricula/en/crosswalk-overrides.json):
 *   multiplying a one-digit number by a multiple of ten is 3.NBT.A.3, a whole number written as a fraction is
 *   3.NF.A.3.c, a rectangle cut into rows and columns of same-size squares is 2.G.A.2.
 *
 *   After the run, five lessons of today were pinned to the objectives they showed before (a `standards` list in the
 *   units file, set by hand the same day): Arrays (2.OA.C.4, 3.OA.A.1), the three lessons on the multiplication facts
 *   (3.OA.C.7) and Equivalent fractions (3.NF.A.3.a, 3.NF.A.3.b). A new row of a point is otherwise shown by every
 *   lesson of the point.
 *
 *   node scripts/units/year/place-ready-w.en.math.js      (refuses to run twice)
 * Then: node scripts/curricula/build-en.js · node scripts/units/notes/apply.js · node scripts/units/assemble.js --loc=en
 *       · node scripts/units/apply-pacing-to-defs.js · assemble again
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
const F = 'frontend/content/units/defs/en.json', raw = read(F), defs = JSON.parse(raw);
const unit = (id) => { const u = defs.units.find((x) => x.id === id); if (!u) throw new Error('no unit ' + id); return u; };
const keyOf = (l) => l.id || l.point;
const all = new Set(defs.units.flatMap((x) => x.lessons.map(keyOf)));
const after = (u, key, L) => { if (all.has(keyOf(L))) throw new Error(keyOf(L) + ' is placed already: this script ran before'); const i = u.lessons.findIndex((x) => keyOf(x) === key); if (i < 0) throw new Error('no lesson ' + key + ' in ' + u.id); u.lessons.splice(i + 1, 0, L); all.add(keyOf(L)); };
const describe = (u, text) => { if (text.length < 110 || text.length > 170 || !text.includes(' ' + u.lessons.length + ' lessons')) throw new Error(u.id + ' description: ' + text.length + ' characters, ' + u.lessons.length + ' lessons'); u.metaDescription = text; };

// 0. a tool models a point (frontend/content/teaching-graph/tools.json): the Fraction Kitchen cuts one whole food into
//    equal parts and names them, and its tray shows that two fourths fill one half: equal fractions
{
  const f = 'frontend/content/teaching-graph/tools.json'; const r = read(f); const j = JSON.parse(r);
  if (!j.tools['fraction-kitchen'].points.includes('3:equivalent-fractions')) j.tools['fraction-kitchen'].points.push('3:equivalent-fractions');
  writeJsonLike(f, r, j);
}

// 1. the registry rows the three lessons show
{
  const f = 'frontend/content/curricula/en/crosswalk-overrides.json'; const r = read(f); const j = JSON.parse(r);
  const set = (id, rows, why) => { if (j.points[id]) throw new Error('an override for ' + id + ' exists'); j.points[id] = { rows: rows.map((rid) => ({ id: rid, rel: 'teaches' })), why, review: 'year-design 2026-11-14' }; };
  const add = (id, row, why) => { const o = j.points[id]; if (!o || !o.rows) throw new Error('no override for ' + id); if (o.rows.some((x) => x.id === row)) throw new Error(row + ' is on ' + id + ' already'); o.rows.push({ id: row, rel: 'teaches' }); o.why += ' ' + why; };
  set('3:times-tables', ['3.OA.C.7', '3.NBT.A.3'], 'The point carries 3.OA.C.7 for its pages on the multiplication facts. Multiply by Tens multiplies a one-digit number by a multiple of ten from 20 to 90 with the facts and place value (4 × 6 tens = 24 tens = 240): 3.NBT.A.3. Each lesson of a unit shows the one it teaches.');
  add('3:equivalent-fractions', '3.NF.A.3.c', 'Whole Numbers as Fractions (year design 2026-11-14) writes whole numbers as fractions and finds fractions that are equal to whole numbers (3 = 3/1, 6/1 = 6, 4/4 = 1): 3.NF.A.3.c.');
  add('2:arrays', '2.G.A.2', 'Rows and Columns of Squares (year design 2026-11-14) has the child cut a rectangle into rows and columns of same-size squares and count them: 2.G.A.2.');
  writeJsonLike(f, r, j);
}

// 2. the units
const g3d = unit('g3-division');
after(g3d, '3:division-remainder', { point: '3:times-tables', id: '3:times-tables#multiply-by-tens', types: ['G3-491', 'G3-366'], tool: null, activity: null, standards: ['3.NBT.A.3'] });
describe(g3d, 'A three-week Grade 3 math unit: 7 lessons on sharing, making groups, fact families, the facts still to learn, hard facts, remainders, and multiplying by tens.');

const g3f = unit('g3-fractions');
// the lesson of today on equal fractions keeps no tool: its note was written without one, and a tool listed for a
// point is given to every lesson of the point that does not say otherwise
{ const old = g3f.lessons.find((x) => keyOf(x) === '3:equivalent-fractions'); if (!old || 'tool' in old) throw new Error('the equal-fractions lesson of today'); old.tool = null; }
after(g3f, '3:equivalent-fractions', { point: '3:equivalent-fractions', id: '3:equivalent-fractions#whole-numbers-as-fractions', types: ['G3-492'], tool: 'fraction-kitchen', activity: null, standards: ['3.NF.A.3.c'] });
describe(g3f, 'A four-week Grade 3 math unit: 9 lessons on equal parts, naming fractions, the whole, fractions on a number line, comparing, equivalent fractions, and whole numbers.');

const g2 = unit('g2-equal-groups-equal-shares');
after(g2, '2:arrays', { point: '2:arrays', id: '2:arrays#rows-and-columns-of-squares', types: ['G2-515'], tool: 'baking-tray', activity: null, standards: ['2.G.A.2'] });
describe(g2, 'A four-week Grade 2 math unit: 8 lessons on odd and even, equal groups, arrays, rows and columns of squares, sharing, and halves, thirds, and fourths.');

writeJsonLike(F, raw, defs);
for (const u of [g3d, g3f, g2]) console.log(u.id + ': ' + u.lessons.map(keyOf).join(' · '));
