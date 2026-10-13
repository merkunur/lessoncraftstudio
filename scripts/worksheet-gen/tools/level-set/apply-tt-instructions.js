#!/usr/bin/env node
/**
 * apply-tt-instructions.js — writes tools/level-set/tt-instructions.js (Multiplication Tables Level Set 2026-10-13)
 * into i18n/level-instructions.json (G3-358 level 3; every table face level 1 + level 3) and
 * i18n/interactive-instructions.json "multiplication-tables". Refuses an empty string or a missing locale; idempotent.
 */
'use strict';
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const SRC = require('./tt-instructions.js');
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const bad = [];
const check = (name, by) => { for (const l of LOCS) if (!by[l] || !String(by[l]).trim()) bad.push(`${name} ${l}: empty`); };
check('anchors', SRC.anchors); check('missing', SRC.missing);
for (const [k, by] of Object.entries(SRC.screen)) check('screen.' + k, by);
if (bad.length) { console.error(bad.join('\n')); process.exit(1); }
const write = (f, obj) => fs.writeFileSync(f, JSON.stringify(obj, null, 1) + '\n');
const LF = path.join(ROOT, 'i18n', 'level-instructions.json');
const L = JSON.parse(fs.readFileSync(LF, 'utf8'));
L['G3-358'] = { 3: SRC.missing };
for (const id of SRC.TABLE_FACES) L[id] = { 1: SRC.anchors, 3: SRC.missing };
write(LF, L);
const IF = path.join(ROOT, 'i18n', 'interactive-instructions.json');
const I = JSON.parse(fs.readFileSync(IF, 'utf8'));
I['multiplication-tables'] = SRC.screen;
write(IF, I);
console.log(`wrote level instructions for ${1 + SRC.TABLE_FACES.length} faces and the screen instruction ×11`);
