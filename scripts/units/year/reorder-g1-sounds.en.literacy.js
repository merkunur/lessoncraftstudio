#!/usr/bin/env node
/**
 * Part 12.3, English literacy (2026-11-19, PLAN.md §11 ruling of that day): the Grade 1 unit Sounds and Short-Vowel
 * Words takes the order of the year design. Sounds are heard and segmented before word families are read:
 *
 *   rhyming · phoneme boxes · first, middle, or last sound · word families · spell picture words
 *
 * Rhyming stays first (the design leaves it out as below grade; removing a live lesson waits for the owner). No title,
 * meta title or meta description changes. Refuses to run when the unit is not in the order it found on 2026-11-19, and
 * reports "already done" when it is in the new order.
 *
 *   node scripts/units/year/reorder-g1-sounds.en.literacy.js
 * Then: assemble --loc=en · pacing · build-checks --unit=g1-sounds-spelling-syllables · build-guide --unit · build-year-plan
 *       --plan=plan-1-literacy · build-looks
 */
'use strict';
const fs = require('fs');
const path = require('path');
const F = path.join(__dirname, '..', '..', '..', 'frontend', 'content', 'units', 'defs', 'en.json');
const raw = fs.readFileSync(F, 'utf8');
const j = JSON.parse(raw);
const UNIT = 'g1-sounds-spelling-syllables';
const BEFORE = ['1:rhyming', '1:word-families-syllable-reading', '1:phoneme-boxes', '1:first-middle-last-sound', '1:spell-picture-words'];
const AFTER = ['1:rhyming', '1:phoneme-boxes', '1:first-middle-last-sound', '1:word-families-syllable-reading', '1:spell-picture-words'];
const units = Array.isArray(j.units) ? j.units : Object.values(j.units);
const u = units.find((x) => x.id === UNIT);
if (!u) throw new Error('unit ' + UNIT + ' not found');
const now = u.lessons.map((l) => l.id || l.point);
if (now.join() === AFTER.join()) { console.log('already done: ' + now.join(' · ')); process.exit(0); }
if (now.join() !== BEFORE.join()) throw new Error('the unit is not in the order this script was written for: ' + now.join(' · '));
const byKey = new Map(u.lessons.map((l) => [l.id || l.point, l]));
u.lessons = AFTER.map((k) => byKey.get(k));
const indent = (/^\{\r?\n(\s+)"/.exec(raw) || [, ' '])[1];
let out = JSON.stringify(j, null, indent);
if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
out += /\r?\n$/.test(raw) ? (raw.includes('\r\n') ? '\r\n' : '\n') : '';
fs.writeFileSync(F, out);
console.log('reordered ' + UNIT + ': ' + AFTER.join(' · '));
