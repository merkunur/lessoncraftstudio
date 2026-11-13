#!/usr/bin/env node
/**
 * Part 12.2, English mathematics, STAGE 1: the new lessons of the designed year that can be written on pages that
 * exist are put into the units (frontend/content/units/defs/en.json). Run once (2026-11-13); kept as the record of
 * what was placed where, and why some ready lessons were held.
 *
 * Stage 1 ADDS: a lesson goes where the design puts it relative to the lessons that stand in the unit today. A unit
 * the design makes new is opened only when it holds four lessons today; the lessons the design moves into it come
 * with it. Lessons of today are not yet reordered and none leaves a unit: that is stage 2, done per grade when every
 * lesson of the grade's year exists (it removes pages' content, so it is done once).
 *
 * Held (25 of the 39 ready lessons are placed):
 *   - the unit cannot open yet (fewer than four lessons today): Story Problems Within 20 (1 ready), Adding Within 100
 *     and Subtracting Tens (1), Fact Strategies Within 20 (2), Teen Numbers and Counting to 100 (3)
 *   - one real asset only (a lesson needs two): Draw the shape (K-372 has no tool, no screen practice)
 *   - the four lessons the teacher leads without a page: the unit system has no such lesson form yet
 *   - two "use" rulings were overruled after reading the published page (now "change"): Ten and some more (G2-206
 *     prints a "×10" frame, not for Kindergarten), Unit fractions on the number line (G3-406 asks for any fraction)
 * Comparing Numbers to 10 cannot open (3 lessons): its two ready lessons stand in Counting to 10, after the lesson the
 * design moves with them, until it opens.
 *
 *   node scripts/units/year/place-ready.en.math.js      (refuses to run twice)
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

// 1. a tool models a point (frontend/content/teaching-graph/tools.json): the tool the year design names for the lesson
{
  const f = 'frontend/content/teaching-graph/tools.json'; const raw = read(f); const j = JSON.parse(raw);
  const add = { 'ten-frame': ['K:one-more-one-less', 'K:take-away'], 'number-line': ['K:compare-groups'], 'doubling-mirror': ['1:near-doubles'] };
  for (const [k, ps] of Object.entries(add)) for (const p of ps) if (!j.tools[k].points.includes(p)) j.tools[k].points.push(p);
  writeJsonLike(f, raw, j);
}

// 2. an objective a point's page teaches in another grade than the point's own code (the US crosswalk)
{
  const f = 'frontend/content/curricula/en/crosswalk-overrides.json'; const raw = read(f); const j = JSON.parse(raw);
  const set = (id, rows, why) => { j.points[id] = { rows: rows.map(([rid, rel]) => ({ id: rid, rel })), why, review: 'year design en.review-1.json' }; };
  set('K:compare-groups', [['K.CC.C.6', 'teaches'], ['K.CC.C.7', 'teaches']], 'The page Color the Greater Number compares two written numerals from 1 to 10, which is K.CC.C.7; the pages with two groups are K.CC.C.6.');
  set('1:word-problems', [['1.OA.A.1', 'teaches'], ['K.OA.A.2', 'teaches']], 'Level 1 of the addition and subtraction story pages stays within 10 with a picture of the objects: the Kindergarten standard K.OA.A.2. The year design places those pages in Kindergarten.');
  set('2:bundle-ten-ones', [['1.NBT.B.2.a', 'teaches'], ['2.NBT.A.1.a', 'teaches']], 'More Than Nine of a Kind, level 1, shows more than nine ten-rods to trade for a hundred: 2.NBT.A.1.a (100 as a bundle of ten tens).');
  set('1:true-false-equations', [['1.OA.D.7', 'teaches']], 'The Grade 1 lesson True or False? hands out the page of that name: the children decide whether equations are true or false, which is 1.OA.D.7 itself. (The earlier "extends" was written when the only lesson on the point was a Grade 3 lesson.)');
  set('3:column-regrouping', [['3.NBT.A.2', 'teaches'], ['2.NBT.B.7', 'teaches']], 'Adding and subtracting three-digit numbers in columns with a new ten or hundred is taught in Grade 2 (2.NBT.B.7: within 1000 with strategies based on place value, related to a written method) and made fluent in Grade 3.');
  set('2:equal-shares-shapes', [['2.G.A.3', 'teaches'], ['1.G.A.3', 'teaches']], 'Deciding whether a circle or rectangle is cut into equal shares, and naming halves and fourths, is 1.G.A.3; thirds and the Grade 2 wording are 2.G.A.3.');
  writeJsonLike(f, raw, j);
}

// 3. the units
const f = 'frontend/content/units/defs/en.json'; const raw = read(f); const defs = JSON.parse(raw);
const unit = (id) => { const u = defs.units.find((x) => x.id === id); if (!u) throw new Error('no unit ' + id); return u; };
const keyOf = (l) => l.id || l.point;
const all = new Set(defs.units.flatMap((u) => u.lessons.map(keyOf)));
const lesson = (u, key) => { const l = u.lessons.find((x) => keyOf(x) === key); if (!l) throw new Error(u.id + ' has no lesson ' + key); return l; };
/** puts lesson L into unit u after the lesson `after` (null = first) */
const put = (u, after, L) => {
  if (all.has(keyOf(L))) throw new Error(keyOf(L) + ' is placed already: this script ran before');
  all.add(keyOf(L));
  const i = after === null ? 0 : u.lessons.findIndex((x) => keyOf(x) === after) + 1;
  if (after !== null && i === 0) throw new Error(u.id + ' has no lesson ' + after);
  u.lessons.splice(i, 0, L);
};
const take = (u, key) => { const i = u.lessons.findIndex((x) => keyOf(x) === key); if (i < 0) throw new Error(u.id + ' has no lesson ' + key); return u.lessons.splice(i, 1)[0]; };
const says = (u, count, text) => { u.metaDescription = text; if (!text.includes(count + ' lessons')) throw new Error(u.id + ': the description does not say ' + count + ' lessons'); if (u.lessons.length !== count) throw new Error(u.id + ' has ' + u.lessons.length + ' lessons, the description says ' + count); };

// pins: a lesson of today keeps what it shows when its point gains an objective row or a tool
Object.assign(lesson(unit('k-counting-to-10'), 'K:compare-groups'), { tool: null, standards: ['K.CC.C.6'] });
lesson(unit('g1-add-subtract-within-10'), '1:word-problems').standards = ['1.OA.A.1'];
lesson(unit('g2-place-value-to-1000'), '2:bundle-ten-ones').standards = ['1.NBT.B.2.a'];
lesson(unit('g2-equal-groups-equal-shares'), '2:equal-shares-shapes').standards = ['2.G.A.3'];
lesson(unit('g3-rounding-adding-subtracting'), '3:column-regrouping').standards = ['3.NBT.A.2'];

// ── Kindergarten ──
{
  const u = unit('k-counting-to-10');
  put(u, 'K:count-out-n', { point: 'K:conservation', types: ['K-445'], tool: 'the-queue' });
  put(u, 'K:compare-groups', { point: 'K:one-more-one-less', types: ['K-443'], core: { 'K-443': 3 }, tool: 'ten-frame' });
  put(u, 'K:one-more-one-less', { point: 'K:compare-groups', id: 'K:compare-groups#which-number-is-greater', types: ['K-606'], core: { 'K-606': 1 }, tool: 'number-line', activity: null, standards: ['K.CC.C.7'] });
  says(u, 10, 'A three-week Kindergarten math unit: 10 lessons on matching one to one, writing numbers, counting to 10, quick looks, comparing groups and numbers, and one more and one less, each with a teacher note.');
}
{
  const u = unit('k-shapes');
  put(u, 'K:count-sides', { point: '2:flat-or-solid', types: ['G2-244'] });
  says(u, 5, 'A two-week Kindergarten math unit: 5 lessons on naming shapes, counting sides, flat and solid shapes, building with tangram pieces, and mirror pictures, each with a teacher note.');
}
{
  const u = unit('k-counting-in-order-to-20');
  put(u, null, { point: 'K:numeral-formation', id: 'K:numeral-formation#write-11-to-20', types: ['K-253'], activity: 'rivets-number-forge.numeral-album.k-cc-a-3' });
  put(u, 'K:before-after-back', { point: 'K:count-on', types: ['K-444'] });
  says(u, 6, 'A two-week Kindergarten math unit: 6 lessons on writing the numbers 11 to 20, counting forward to 20, connecting dots in order, counting back from 10, counting on, and first, second, third.');
}
{
  const bonds = unit('k-putting-together-number-bonds');
  const moved = take(bonds, 'K:combine-groups');
  const u = { id: 'k-adding-and-taking-away-within-10', slug: 'adding-and-taking-away-within-10-kindergarten-unit', status: 'live', grade: 'K', subject: 'math',
    title: 'Adding and Taking Away Within 10', metaTitle: 'Kindergarten Math Lesson Plans: Adding and Taking Away Within 10',
    metaDescription: 'A two-week Kindergarten math unit: 4 lessons on putting two groups together, taking away on a ten-frame, and adding and take-away stories within 10, each with a teacher note.',
    weeks: 2, lessons: [moved] };
  defs.units.splice(defs.units.indexOf(bonds), 0, u);
  put(u, 'K:combine-groups', { point: 'K:take-away', types: ['K-451'], tool: 'ten-frame', standards: ['K.OA.A.1'] });
  put(u, 'K:take-away', { point: '1:word-problems', id: '1:word-problems#adding-stories-within-10', types: ['G1-238'], core: { 'G1-238': 1 }, tool: null, activity: 'ten-frame.solve-the-story.k-oa-a-2', standards: ['K.OA.A.2'] });
  put(u, '1:word-problems#adding-stories-within-10', { point: '1:word-problems', id: '1:word-problems#take-away-stories-within-10', types: ['G1-239'], core: { 'G1-239': 1 }, tool: null, activity: null, standards: ['K.OA.A.2'] });
  says(u, 4, u.metaDescription);
  put(bonds, 'K:number-bonds-k', { point: 'K:number-bonds-k', id: 'K:number-bonds-k#take-apart-8-and-9', types: ['K-416', 'K-417'], tool: 'part-whole-frame', activity: 'chuffer.rail-decompose.k-oa-a-3', standards: ['K.OA.A.3'] });
  put(bonds, 'K:number-bonds-k#take-apart-8-and-9', { point: '1:make-10', id: '1:make-10#how-many-more-to-make-10', types: ['G1-106', 'K-457'], tool: 'ten-frame', activity: null, standards: ['K.OA.A.4'] });
  put(bonds, '1:make-10#how-many-more-to-make-10', { point: 'K:number-bonds-k', id: 'K:number-bonds-k#partners-of-10', types: ['K-277'], tool: 'rekenrek', activity: null, standards: ['K.OA.A.4'] });
  bonds.title = 'Number Bonds and Partners of 10';
  bonds.metaTitle = 'Kindergarten Math Lesson Plans: Number Bonds and Partners of 10';
  says(bonds, 7, 'A three-week Kindergarten math unit: 7 lessons on number bonds to 5 and to 10, taking apart 8 and 9, and the partners of 10, with a first look at partners that make 20 and at odd and even.');
  const plan = defs.plans.find((p) => p.id === 'plan-k-math');
  plan.units.splice(plan.units.indexOf('k-putting-together-number-bonds'), 0, u.id);
}
// ── Grade 1 ──
{
  const u = unit('g1-add-subtract-within-10');
  put(u, '1:missing-number-equations', { point: '1:true-false-equations', types: ['G1-443'], tool: 'number-balance' });
  says(u, 9, 'A five-week Grade 1 math unit: 9 lessons on adding and subtracting within 10 and on true and false equations, each with a teacher note, practice pages (most at three levels), and on-screen practice.');
}
{
  const u = unit('g1-doubles-three-addends-number-walls');
  put(u, '1:doubles-halves', { point: '1:near-doubles', types: ['G1-449'], core: { 'G1-449': 1 }, tool: 'doubling-mirror' });
  put(u, '1:near-doubles', { point: '1:fluency-within-20', id: '1:fluency-within-20#make-ten-to-add', types: ['G1-439'], core: { 'G1-439': 1 }, tool: 'rekenrek', activity: 'ten-stones.add-sub-within-20.1-oa-c-6' });
  says(u, 6, 'A three-week Grade 1 math unit: 6 lessons on doubles and halves, near doubles, making ten to add, odd and even numbers, adding three groups, and addition pyramids (number walls), with teacher notes.');
}
{
  const u = unit('g1-time-calendar-coins');
  put(u, '1:time-set-hands', { point: '1:time-read', id: '1:time-read#match-the-clocks', types: ['G1-150'], core: { 'G1-150': 3 }, tool: 'learning-clock', activity: 'clock-digital.read-half-hour.1-md-b-3' });
  says(u, 6, 'A three-week Grade 1 math unit: 6 lessons on time to the hour and half hour on clocks with hands and digital clocks, the calendar, ordinal numbers, and counting coins, each with a teacher note.');
}
{
  const u = unit('g1-shapes-measuring-graphs');
  put(u, '1:patterns-missing', { point: '2:equal-shares-shapes', id: '2:equal-shares-shapes#equal-shares-halves-and-fourths', types: ['G2-232'], core: { 'G2-232': 1 }, tool: 'fraction-kitchen', activity: 'fractions.partition-equal-shares.1-g-a-3', standards: ['1.G.A.3'] });
  says(u, 8, 'A four-week Grade 1 math unit: 8 lessons on shapes, tangram puzzles, measuring length, sorting, picture graphs, bar graphs, patterns, and equal shares (halves and fourths), with teacher notes.');
}
// ── Grade 2 ──
{
  const pv = unit('g2-place-value-to-1000'), k = unit('g2-add-subtract-within-1000');
  const u = { id: 'g2-adding-and-subtracting-within-100', slug: 'adding-and-subtracting-within-100-grade-2-unit', status: 'live', grade: '2', subject: 'math',
    title: 'Adding and Subtracting Within 100', metaTitle: 'Grade 2 Math Lesson Plans: Adding and Subtracting Within 100',
    metaDescription: 'A three-week Grade 2 math unit: 5 lessons on number lines that do not start at zero, jumps on the hundreds chart and on an empty number line, adding and subtracting in columns, and practice within 100.',
    weeks: 3, lessons: [take(pv, '2:number-line-not-from-zero'), take(pv, '2:hundreds-chart-moves')] };
  defs.units.splice(defs.units.indexOf(k), 0, u);
  put(u, '2:hundreds-chart-moves', { point: '1:open-number-line', types: ['G1-438'], tool: 'open-number-line', standards: ['2.NBT.B.5'] });
  u.lessons.push(take(k, '2:column-method'), take(k, '2:add-sub-within-100-practice'));
  says(u, 5, u.metaDescription);
  put(pv, '2:bundle-ten-ones', { point: '2:bundle-ten-ones', id: '2:bundle-ten-ones#ten-tens-make-one-hundred', types: ['G2-404'], core: { 'G2-404': 1 }, tool: 'exchange-machine', activity: null, standards: ['2.NBT.A.1.a'] });
  put(pv, '2:expanded-form-digit-value', { point: '2:expanded-form-digit-value', id: '2:expanded-form-digit-value#expanded-form-with-a-zero', types: ['G2-401'], core: { 'G2-401': 3 }, tool: 'place-value-lab', activity: 'match-pairs.three-ways-to-show-a-number.2-nbt-a-3', standards: ['2.NBT.A.3'] });
  says(pv, 8, 'A four-week Grade 2 math unit: 8 lessons that review tens and ones and skip counting, then teach hundreds, tens, and ones, expanded form, comparing, and 100 more and 100 less.');
  put(k, '2:add-with-blocks', { point: '3:column-regrouping', id: '3:column-regrouping#add-three-digit-numbers', types: ['G3-361'], tool: 'exchange-machine', activity: null, standards: ['2.NBT.B.7'] });
  put(k, '2:subtract-with-blocks', { point: '3:column-regrouping', id: '3:column-regrouping#subtract-across-a-zero', types: ['G3-362'], core: { 'G3-362': 3 }, tool: 'exchange-machine', activity: 'place-value-regroup.subtract-decompose-hundred.2-nbt-b-7', standards: ['2.NBT.B.7'] });
  k.title = 'Adding and Subtracting Within 1,000';
  k.metaTitle = 'Grade 2 Math Lesson Plans: Adding and Subtracting Within 1,000';
  says(k, 4, 'A two-week Grade 2 math unit: 4 lessons on adding and subtracting three-digit numbers with blocks and in columns, with a new ten or hundred and across a zero, each with a teacher note.');
  const plan = defs.plans.find((p) => p.id === 'plan-2-math');
  plan.units.splice(plan.units.indexOf('g2-add-subtract-within-1000'), 0, u.id);
}
{
  const u = unit('g2-measurement-time-money');
  put(u, '2:calendar', { point: '1:coins', id: '1:coins#count-mixed-coins', types: ['G1-229'], tool: 'money-mat', activity: 'money.count-out.2-md-c-8', standards: ['2.MD.C.8'] });
  says(u, 6, 'A four-week Grade 2 math unit: 6 lessons on measuring with a ruler, time to the nearest five minutes, the calendar, counting mixed coins, and shopping with money, each with a teacher note.');
}
{
  const u = unit('g2-graphs-and-grids');
  put(u, '2:bar-graphs', { point: '1:bar-graphs', id: '1:bar-graphs#make-a-graph-from-counts', types: ['G1-147'], tool: 'class-graph', activity: null, standards: ['2.MD.D.10'] });
  says(u, 5, 'A two-week Grade 2 math unit: 5 lessons on making a graph from counts, bar graphs and line plots, plus a first look at picture graphs with a key and at squares on a grid, each with a teacher note.');
}
// ── Grade 3 ──
{
  const u = unit('g3-division');
  put(u, '3:mult-div-relationship', { point: '3:times-tables', id: '3:times-tables#the-facts-we-still-need', types: ['G3-407'], core: { 'G3-407': 3 }, tool: 'folding-wall', activity: null });
  says(u, 6, 'A three-week Grade 3 math unit: 6 lessons on sharing, making groups, fact families, the facts still to learn, and word problems, with a first look at remainders, a Grade 4 standard.');
}
writeJsonLike(f, raw, defs);
console.log('placed: ' + defs.units.reduce((n, u) => n + u.lessons.length, 0) + ' lessons in ' + defs.units.length + ' units');
