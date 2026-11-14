#!/usr/bin/env node
/**
 * English mathematics (2026-11-14): the Grade 3 unit Time, Temperature, Mass, and Volume no longer teaches 24-hour time.
 * A U.S. teacher-reviewer of the unit checks (scripts/assessments/reviews/en.review-g23-math.json, 2026-11-12): 24-hour
 * time is not taught in U.S. Grades K-3 (the Grade 3 standard, 3.MD.A.1, is time to the minute with a.m. and p.m.; Texas
 * 3.7C is the same), so a U.S. teacher cannot use the lesson. The lesson leaves the English unit; its pages stay (the
 * other languages teach it). The unit is paced again afterwards (apply-pacing-to-defs.js).
 *
 *   node scripts/units/year/drop-24-hour.en.math.js      (refuses to run twice)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const F = path.join(__dirname, '..', '..', '..', 'frontend', 'content', 'units', 'defs', 'en.json');
const raw = fs.readFileSync(F, 'utf8'), defs = JSON.parse(raw);
const u = defs.units.find((x) => x.id === 'g3-time-temperature-mass-volume');
const i = u.lessons.findIndex((l) => l.point === '3:time-12-24');
if (i < 0) throw new Error('the 24-hour lesson is not in the unit: this script ran before');
u.lessons.splice(i, 1);
const weeks = { 3: 'three', 4: 'four' }[u.weeks];
if (!weeks) throw new Error(u.weeks + ' weeks');
const text = `A ${weeks}-week Grade 3 math unit: ${u.lessons.length} lessons on time to the minute, elapsed time, adding and subtracting time, a thermometer, grams on a scale, and milliliters.`;
if (text.length < 110 || text.length > 170) throw new Error('description ' + text.length);
u.metaDescription = text;
const indent = (/^\{\r?\n(\s+)"/.exec(raw) || [, ' '])[1];
let out = JSON.stringify(defs, null, indent); if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
fs.writeFileSync(F, out + (raw.endsWith('\n') ? (raw.includes('\r\n') ? '\r\n' : '\n') : ''));
console.log(u.id + ': ' + u.lessons.map((l) => l.id || l.point).join(' · '));
