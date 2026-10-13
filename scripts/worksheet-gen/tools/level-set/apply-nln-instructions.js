#!/usr/bin/env node
/**
 * apply-nln-instructions.js — writes tools/level-set/nln-instructions.js (Number Lines Level Set 2026-10-13) into
 * i18n/interactive-instructions.json "number-lines" and i18n/level-instructions.json (G1-274 level 3). Refuses an empty
 * string or a missing locale; idempotent.
 */
'use strict';
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const SRC = require('./nln-instructions.js');
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const bad = [];
for (const [k, by] of Object.entries(SRC.screen)) for (const l of LOCS) if (!by[l] || !String(by[l]).trim()) bad.push(`screen.${k} ${l}: empty`);
if (bad.length) { console.error(bad.join('\n')); process.exit(1); }
const LF = path.join(ROOT, 'i18n', 'level-instructions.json');
const LI = JSON.parse(fs.readFileSync(LF, 'utf8'));
LI['G1-274'] = { 3: Object.fromEntries(LOCS.map((l) => [l, SRC.g1274L3[l] || JSON.parse(fs.readFileSync(path.join(ROOT, 'i18n', `strings.${l}.json`), 'utf8'))['G1-274'].instruction])) };
fs.writeFileSync(LF, JSON.stringify(LI, null, 1) + '\n');
const IF = path.join(ROOT, 'i18n', 'interactive-instructions.json');
const I = JSON.parse(fs.readFileSync(IF, 'utf8'));
I['number-lines'] = SRC.screen;
fs.writeFileSync(IF, JSON.stringify(I, null, 1) + '\n');
console.log(`wrote ${Object.keys(SRC.screen).length} screen instructions × ${LOCS.length} locales + G1-274 level 3`);
