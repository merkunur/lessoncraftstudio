#!/usr/bin/env node
/**
 * apply-graph-instructions.js — writes tools/level-set/graph-instructions.js (Graphs and Data Level Set 2026-10-08)
 * into i18n/interactive-instructions.json "graphing-data". Refuses an empty string or a missing locale; idempotent.
 */
'use strict';
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const SRC = require('./graph-instructions.js');
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const bad = [];
for (const [k, by] of Object.entries(SRC.screen)) for (const l of LOCS) if (!by[l] || !String(by[l]).trim()) bad.push(`screen.${k} ${l}: empty`);
if (bad.length) { console.error(bad.join('\n')); process.exit(1); }
const IF = path.join(ROOT, 'i18n', 'interactive-instructions.json');
const I = JSON.parse(fs.readFileSync(IF, 'utf8'));
I['graphing-data'] = SRC.screen;
fs.writeFileSync(IF, JSON.stringify(I, null, 1) + '\n');
console.log('wrote graphing-data:', Object.keys(SRC.screen).length, 'keys ×11');
