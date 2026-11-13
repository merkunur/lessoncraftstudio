#!/usr/bin/env node
/**
 * Part 12.2, English mathematics, STAGE 1, eighth run (2026-11-13): the unit that opens Grade 2 in the year design,
 * Fact Strategies Within 20 (see place-ready.en.math.js for the rules of stage 1). It was held one lesson short: its
 * fourth lesson waited for a page of fact triangles and daily strips. The page built for Grade 1 since then (G1-566
 * Think Addition to Subtract) carries the lesson at its level without a number bond; the daily facts are a routine the
 * teacher leads, and the note says that the lesson has no worksheet for them.
 *
 *   Grade 2  Fact Strategies Within 20 (NEW unit, first of the year)
 *     Make ten to add: sums from 11 to 18                 G1-439 level 1 (the open number line; its harder page mixes
 *                                                         in subtraction, which lesson 3 teaches: not offered)
 *     Doubles and near doubles                            G1-449 level 2 (the child writes the double; Doubling Mirror)
 *     Use ten to subtract                                 G1-556 level 2 (rekenrek)
 *     Think addition to subtract, and start the daily facts   G1-566 level 3 (no number bond; Number Balance)
 *
 * All four pages are handed out by Grade 1 lessons too, one level lower (or with the bond); the Grade 2 lessons have
 * their own ids, titles and notes. All four show 2.OA.B.2: the registry has it for the three points (two of the rows were
 * added after the teacher-reviewer's reading of this unit).
 *
 *   node scripts/units/year/place-ready-l.en.math.js      (refuses to run twice)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const f = path.join(REPO, 'frontend/content/units/defs/en.json');
const raw = fs.readFileSync(f, 'utf8'); const defs = JSON.parse(raw);
const keyOf = (l) => l.id || l.point;
const all = new Set(defs.units.flatMap((u) => u.lessons.map(keyOf)));
const fresh = (L) => { if (all.has(keyOf(L))) throw new Error(keyOf(L) + ' is placed already: this script ran before'); all.add(keyOf(L)); return L; };
if (defs.units.some((x) => x.id === 'g2-fact-strategies-within-20')) throw new Error('g2-fact-strategies-within-20 exists');
const u = { id: 'g2-fact-strategies-within-20', slug: 'fact-strategies-within-20-grade-2-unit', status: 'live', grade: '2', subject: 'math',
  title: 'Fact Strategies Within 20', metaTitle: 'Grade 2 Math Lesson Plans: Fact Strategies Within 20',
  metaDescription: 'A two-week Grade 2 math unit: 4 lessons on making ten to add, doubles and near doubles, going back to ten to subtract, and thinking addition to subtract.', weeks: 2,
  lessons: [
    fresh({ point: '1:fluency-within-20', id: '1:fluency-within-20#make-ten-sums-11-to-18', types: ['G1-439'], core: { 'G1-439': 1 }, noHard: ['G1-439'], tool: 'open-number-line', activity: null, standards: ['2.OA.B.2'], standardsRel: { '2.OA.B.2': 'teaches' } }),
    fresh({ point: '1:near-doubles', id: '1:near-doubles#doubles-and-near-doubles', types: ['G1-449'], tool: 'doubling-mirror', activity: null, standards: ['2.OA.B.2', '1.OA.C.6'], standardsRel: { '2.OA.B.2': 'teaches' } }),
    fresh({ point: '1:fluency-within-20', id: '1:fluency-within-20#use-ten-to-subtract', types: ['G1-556'], tool: 'rekenrek', activity: null, standards: ['2.OA.B.2'], standardsRel: { '2.OA.B.2': 'teaches' } }),
    fresh({ point: '1:fact-families', id: '1:fact-families#think-addition-and-daily-facts', types: ['G1-566'], core: { 'G1-566': 3 }, tool: 'number-balance', activity: null, standards: ['2.OA.B.2', '1.OA.B.4', '1.OA.C.6'], standardsRel: { '2.OA.B.2': 'teaches' } }),
  ] };
if (u.metaDescription.length < 110 || u.metaDescription.length > 170) throw new Error('description of ' + u.metaDescription.length + ' characters');
// the design opens the Grade 2 year with it: in front of Place Value to 1,000
const first = 'g2-place-value-to-1000';
defs.units.splice(defs.units.findIndex((x) => x.id === first), 0, u);
const p = defs.plans.find((x) => x.id === 'plan-2-math'); const i = p.units.indexOf(first); if (i !== 0) throw new Error('plan-2-math does not begin with ' + first);
p.units.splice(0, 0, u.id);
const indent = (/^\{\r?\n(\s+)"/.exec(raw) || [, ' '])[1];
let out = JSON.stringify(defs, null, indent); if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
fs.writeFileSync(f, out + (raw.endsWith('\n') ? (raw.includes('\r\n') ? '\r\n' : '\n') : ''));
console.log('placed: ' + defs.units.reduce((n, x) => n + x.lessons.length, 0) + ' lessons in ' + defs.units.length + ' units');
