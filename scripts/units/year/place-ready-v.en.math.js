#!/usr/bin/env node
/**
 * Part 12.2, English mathematics, STAGE 1, seventeenth run (2026-11-14): the lessons the "Year pages V" made possible
 * (see place-ready.en.math.js for the rules of stage 1).
 *
 *   Grade 1  Adding Within 100 (the design's order: the unit's last lesson)
 *       Add two two-digit numbers and make a new ten   G1-573, after Add two two-digit numbers   (Place Value Lab)
 *   Grade 2  Adding and Subtracting Within 100 (the design's order)
 *       Subtract and open a ten                        G2-513, after Add tens and ones            (The Exchange Machine)
 *       Add three and four two-digit numbers           G2-514, after the practice lesson, before
 *                                                      Why does it work?                          (The Exchange Machine)
 *     The Exchange Machine is each lesson's own choice of tool: its first four sums are 48 − 23 (no ten opened), 42 − 17,
 *     63 − 28 and 50 − 24, and its sixth is 38 + 25. It adds two numbers only; the note of the third lesson says so and
 *     goes to the board for three.
 *   The English registry gains a row for each of the two Grade 2 points (frontend/content/curricula/en/
 *   crosswalk-overrides.json): subtracting on the mat within 100 is 2.NBT.B.5, adding up to four two-digit numbers
 *   is 2.NBT.B.6.
 *
 *   node scripts/units/year/place-ready-v.en.math.js      (refuses to run twice)
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

// 1. the registry rows the two Grade 2 lessons show
{
  const f = 'frontend/content/curricula/en/crosswalk-overrides.json'; const r = read(f); const j = JSON.parse(r);
  const set = (id, rows, why) => { if (j.points[id]) throw new Error('an override for ' + id + ' exists'); j.points[id] = { rows: rows.map((rid) => ({ id: rid, rel: 'teaches' })), why, review: 'year-design 2026-11-14' }; };
  set('2:subtract-with-blocks', ['2.NBT.B.7', '2.NBT.B.5'], 'The point carries 2.NBT.B.7 for its page with base-ten blocks (Take Away the Blocks). Subtract and Open a Ten: Tens-and-Ones Mat subtracts a one- or two-digit number from a two-digit number in a drawing of sticks and dots: within 100, with a strategy based on place value (2.NBT.B.5).');
  set('2:column-method', ['2.NBT.B.5', '2.NBT.B.7', '2.NBT.B.6'], 'The column pages add and subtract two two-digit numbers (2.NBT.B.5) and two three-digit numbers (2.NBT.B.7). Add Three and Four Two-Digit Numbers adds three or four two-digit numbers in columns: 2.NBT.B.6. Each lesson of a unit shows the one it teaches.');
  writeJsonLike(f, r, j);
}

// 2. the units
const g1 = unit('g1-adding-within-100');
after(g1, '2:add-with-blocks#add-two-two-digit-numbers', { point: '2:add-with-blocks', id: '2:add-with-blocks#add-two-two-digit-numbers-and-make-a-new-ten', types: ['G1-573'], tool: 'place-value-lab', activity: null, standards: ['1.NBT.C.4'] });
describe(g1, 'A three-week Grade 1 math unit: 6 lessons on adding and subtracting tens, adding ones, and adding two-digit numbers with and without a new ten on a tens-and-ones mat.');

const g2 = unit('g2-adding-and-subtracting-within-100');
after(g2, '1:mental-math-to-100#add-tens-and-ones', { point: '2:subtract-with-blocks', id: '2:subtract-with-blocks#subtract-and-open-a-ten', types: ['G2-513'], tool: 'exchange-machine', activity: null, standards: ['2.NBT.B.5'] });
after(g2, '2:add-sub-within-100-practice', { point: '2:column-method', id: '2:column-method#add-three-and-four-two-digit-numbers', types: ['G2-514'], tool: 'exchange-machine', activity: null, standards: ['2.NBT.B.6'] });
describe(g2, 'A five-week Grade 2 math unit: 9 lessons on number lines, the hundreds chart, adding tens and ones, opening a ten to subtract, and adding and subtracting in columns.');

writeJsonLike(F, raw, defs);
for (const u of [g1, g2]) console.log(u.id + ': ' + u.lessons.map(keyOf).join(' · '));
