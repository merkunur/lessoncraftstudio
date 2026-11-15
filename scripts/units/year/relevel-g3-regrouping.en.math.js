#!/usr/bin/env node
/**
 * English mathematics (2026-11-15): the Grade 3 unit Rounding, Adding, and Subtracting hands out three-digit pages.
 * A U.S. teacher-reviewer of the unit check (scripts/assessments/reviews/en.review-f1115-math.json): lesson 4 "Add and
 * subtract with regrouping" handed out G3-359 (two-digit sums only) and G3-360 (two-digit differences) — Grade 2 work in
 * a unit on 3.NBT.A.2 (within 1,000); lesson 5 "Make it balance" handed out level 2 of G3-350 (within 20).
 *   lesson 4 → G3-357 Addition and Subtraction with Regrouping and G3-363 Regrouping Review, both at level 3 (three-digit,
 *              adding and subtracting) — the same teaching point; no other English lesson hands them out
 *   lesson 5 stays at level 2 of G3-350: it has no published level-3 page (its harder pages are a page to build)
 * Run apply-pacing-to-defs.js afterwards (a changed lesson can change the counted weeks).
 *
 *   node scripts/units/year/relevel-g3-regrouping.en.math.js      (refuses to run twice)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const F = path.join(__dirname, '..', '..', '..', 'frontend', 'content', 'units', 'defs', 'en.json');
const raw = fs.readFileSync(F, 'utf8'), defs = JSON.parse(raw);
const u = defs.units.find((x) => x.id === 'g3-rounding-adding-subtracting');
const reg = u.lessons.find((l) => l.point === '3:column-regrouping');
const bal = u.lessons.find((l) => l.point === '3:balance-equations');
if (!reg || !bal) throw new Error('lessons not found');
if (reg.types.join() !== 'G3-359,G3-360') throw new Error('lesson 4 is ' + reg.types.join() + ': this script ran before');
reg.types = ['G3-357', 'G3-363'];
reg.core = { 'G3-357': 3, 'G3-363': 3 };
const indent = (/^\{\r?\n(\s+)"/.exec(raw) || [, ' '])[1];
let out = JSON.stringify(defs, null, indent); if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
fs.writeFileSync(F, out + (raw.endsWith('\n') ? (raw.includes('\r\n') ? '\r\n' : '\n') : ''));
console.log(u.id + ': lesson 4 → G3-357, G3-363 at level 3');
