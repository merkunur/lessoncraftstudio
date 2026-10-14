#!/usr/bin/env node
/**
 * apply-tim-strings.js — writes tools/level-set/tim-strings.js (Telling Time Level Set 2026-10-14) into
 * i18n/interactive-instructions.json "telling-time" (the screen sentences + the hand names) and i18n/level-instructions.json
 * (level 1 of G1-233 / 234 / 235: the minute hand is printed). Refuses an empty string or a missing locale; idempotent.
 */
'use strict';
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const SRC = require('./tim-strings.js');
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const bad = [];
const check = (name, by) => { for (const l of LOCS) if (!by[l] || !String(by[l]).trim()) bad.push(`${name} ${l}: empty`); };
for (const [k, by] of Object.entries(SRC.screen)) check('screen.' + k, by);
for (const [k, by] of Object.entries(SRC.hand)) check('hand.' + k, by);
check('printedHour', SRC.printedHour);
if (bad.length) { console.error(bad.join('\n')); process.exit(1); }
const write = (f, obj) => fs.writeFileSync(f, JSON.stringify(obj, null, 1) + '\n');
const IF = path.join(ROOT, 'i18n', 'interactive-instructions.json');
const I = JSON.parse(fs.readFileSync(IF, 'utf8'));
I['telling-time'] = { ...SRC.screen, ...SRC.hand };
write(IF, I);
const LF = path.join(ROOT, 'i18n', 'level-instructions.json');
const L = JSON.parse(fs.readFileSync(LF, 'utf8'));
for (const id of SRC.HOUR_FACES) L[id] = { 1: SRC.printedHour };
write(LF, L);
console.log(`wrote ${Object.keys(SRC.screen).length} screen sentences + hand names ×11 and level 1 of ${SRC.HOUR_FACES.join(', ')}`);
