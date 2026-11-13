#!/usr/bin/env node
/**
 * Part 12.2, English mathematics, STAGE 1, second run (2026-11-13): the lessons the "Year pages D" made possible
 * (see place-ready.en.math.js for the rules of stage 1). Two units of the designed year reach four lessons and open:
 *
 *   Kindergarten  Teen Numbers and Counting to 100   Ten and some more (K-627, new page) · Teen numbers on two
 *                 ten-frames (K-448) · Count to 100 on the hundreds chart (G1-129) · Count by tens to 100 (G1-123)
 *   Grade 1       Adding Within 100                  Add tens to a number (G1-558, new page) · Add ones to a two-digit
 *                 number (G1-559, new) · Add ones and make a new ten (G1-557, new) · Add two two-digit numbers (G2-203)
 *
 * The Grade 1 unit is called "Adding Within 100 and Subtracting Tens" in the design. Its two subtraction lessons wait
 * for pages, and a unit keeps its title once it is live: it opens under the name that is true today and stays true.
 * The two Kindergarten lessons on Grade 1 pages hand out LEVEL 1 as their page (the hundreds chart with eight boxes,
 * the tens rows with two): level 2 is the page the Grade 1 lesson on the same point hands out a year later.
 * Held again: Fact Strategies Within 20 (Grade 2) holds three lessons with "Use ten to subtract" (G1-556); its fourth
 * waits for a change to G1-220.
 *
 *   node scripts/units/year/place-ready-d.en.math.js      (refuses to run twice)
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

// 1. a tool models a point (frontend/content/teaching-graph/tools.json): the tool the year design names for the lesson.
//    Each is added BEHIND the tool that models the point today, so a lesson that names no tool keeps the one it shows.
{
  const f = 'frontend/content/teaching-graph/tools.json'; const raw = read(f); const j = JSON.parse(raw);
  const add = { 'counting-cups': ['K:teen-numbers', '1:skip-counting'], 'number-hotel': ['1:mental-math-to-100'] };
  for (const [k, ps] of Object.entries(add)) for (const p of ps) if (!j.tools[k].points.includes(p)) j.tools[k].points.push(p);
  const first = (p) => Object.keys(j.tools).find((k) => j.tools[k].points.includes(p));
  for (const [p, t] of [['K:teen-numbers', 'ten-frame'], ['1:skip-counting', 'choral-counting'], ['1:mental-math-to-100', 'open-number-line']]) if (first(p) !== t) throw new Error(p + ': the first tool is now ' + first(p));
  writeJsonLike(f, raw, j);
}

// 2. an objective a point's page teaches in another grade than the point's own code (the US crosswalk)
{
  const f = 'frontend/content/curricula/en/crosswalk-overrides.json'; const raw = read(f); const j = JSON.parse(raw);
  const set = (id, rows, why) => { if (j.points[id]) throw new Error(id + ' has an override already'); j.points[id] = { rows: rows.map(([rid, rel]) => ({ id: rid, rel })), why, review: 'year design en.review-1.json' }; };
  set('1:hundreds-chart', [['1.NBT.A.1', 'teaches'], ['1.NBT.C.5', 'teaches'], ['K.CC.A.1', 'teaches']], 'Level 1 of The Hundreds Chart shows the numbers 1 to 100 with eight boxes to fill: counting to 100 by ones, K.CC.A.1. The year design places that page in Kindergarten, near the hundredth day of school.');
  set('2:add-with-blocks', [['2.NBT.B.7', 'teaches'], ['1.NBT.C.4', 'teaches']], 'Level 2 of Add the Blocks adds two two-digit numbers shown as rods and cubes with no new ten and a sum up to 99: 1.NBT.C.4 (adding within 100 with concrete models, tens with tens and ones with ones).');
  writeJsonLike(f, raw, j);
}

// 3. the units
const f = 'frontend/content/units/defs/en.json'; const raw = read(f); const defs = JSON.parse(raw);
const unit = (id) => { const u = defs.units.find((x) => x.id === id); if (!u) throw new Error('no unit ' + id); return u; };
const keyOf = (l) => l.id || l.point;
const all = new Set(defs.units.flatMap((u) => u.lessons.map(keyOf)));
const lesson = (u, key) => { const l = u.lessons.find((x) => keyOf(x) === key); if (!l) throw new Error(u.id + ' has no lesson ' + key); return l; };
const fresh = (L) => { if (all.has(keyOf(L))) throw new Error(keyOf(L) + ' is placed already: this script ran before'); all.add(keyOf(L)); return L; };
const says = (u, count, text) => { u.metaDescription = text; if (!text.includes(count + ' lessons')) throw new Error(u.id + ': the description does not say ' + count + ' lessons'); if (u.lessons.length !== count) throw new Error(u.id + ' has ' + u.lessons.length + ' lessons, the description says ' + count); };
const openAfter = (after, plan, u) => {
  if (defs.units.some((x) => x.id === u.id || x.slug === u.slug)) throw new Error(u.id + ' exists');
  defs.units.splice(defs.units.findIndex((x) => x.id === after) + 1, 0, u);
  const p = defs.plans.find((x) => x.id === plan); if (!p || !p.units.includes(after)) throw new Error(plan + ' has no ' + after);
  p.units.splice(p.units.indexOf(after) + 1, 0, u.id);
  return u;
};

// pins: a lesson of today keeps what it shows when its point gains an objective row
lesson(unit('g1-hundreds-chart-skip-counting'), '1:hundreds-chart').standards = ['1.NBT.A.1', '1.NBT.C.5'];
lesson(unit('g2-add-subtract-within-1000'), '2:add-with-blocks').standards = ['2.NBT.B.7'];

// ── Kindergarten ──
{
  const u = openAfter('k-putting-together-number-bonds', 'plan-k-math', { id: 'k-teen-numbers-and-counting-to-100', slug: 'teen-numbers-and-counting-to-100-kindergarten-unit', status: 'live', grade: 'K', subject: 'math',
    title: 'Teen Numbers and Counting to 100', metaTitle: 'Kindergarten Math Lesson Plans: Teen Numbers and Counting to 100', metaDescription: '', weeks: 2,
    lessons: [
      fresh({ point: 'K:teen-numbers', id: 'K:teen-numbers#ten-and-some-more', types: ['K-627'], tool: 'counting-cups', activity: null, standards: ['K.NBT.A.1'] }),
      fresh({ point: 'K:teen-numbers', types: ['K-448'], tool: 'ten-frame', standards: ['K.NBT.A.1'] }),
      fresh({ point: '1:hundreds-chart', id: '1:hundreds-chart#count-to-100', types: ['G1-129'], core: { 'G1-129': 1 }, tool: 'number-hotel', activity: null, standards: ['K.CC.A.1'] }),
      fresh({ point: '1:skip-counting', id: '1:skip-counting#count-by-tens-to-100', types: ['G1-123'], core: { 'G1-123': 1 }, tool: 'counting-cups', activity: 'posy-egg-cartons.count-tens.k-cc-a-1', standards: ['K.CC.A.1'] }),
    ] });
  says(u, 4, 'A two-week Kindergarten math unit: 4 lessons on teen numbers as ten and some more, counting to 100 on the hundreds chart, and counting by tens, with teacher notes.');
}
// ── Grade 1 ──
{
  const u = openAfter('g1-hundreds-chart-skip-counting', 'plan-1-math', { id: 'g1-adding-within-100', slug: 'adding-within-100-grade-1-unit', status: 'live', grade: '1', subject: 'math',
    title: 'Adding Within 100', metaTitle: 'Grade 1 Math Lesson Plans: Adding Within 100', metaDescription: '', weeks: 2,
    lessons: [
      fresh({ point: '1:mental-math-to-100', types: ['G1-558'], core: { 'G1-558': 1 }, tool: 'number-hotel', standards: ['1.NBT.C.4'] }),
      fresh({ point: '1:mental-math-to-100', id: '1:mental-math-to-100#add-ones-to-a-two-digit-number', types: ['G1-559'], core: { 'G1-559': 1 }, tool: 'number-hotel', activity: null, standards: ['1.NBT.C.4'] }),
      fresh({ point: '1:mental-math-to-100', id: '1:mental-math-to-100#add-ones-and-make-a-new-ten', types: ['G1-557'], tool: 'open-number-line', activity: null, standards: ['1.NBT.C.4'] }),
      fresh({ point: '2:add-with-blocks', id: '2:add-with-blocks#add-two-two-digit-numbers', types: ['G2-203'], tool: null, activity: 'place-value-regroup.add-compose-ten.1-nbt-c-4', standards: ['1.NBT.C.4'] }),
    ] });
  says(u, 4, 'A two-week Grade 1 math unit: 4 lessons on adding tens, adding ones with and without a new ten, and adding two two-digit numbers with rods and cubes, with teacher notes.');
}
writeJsonLike(f, raw, defs);
console.log('placed: ' + defs.units.reduce((n, u) => n + u.lessons.length, 0) + ' lessons in ' + defs.units.length + ' units');
