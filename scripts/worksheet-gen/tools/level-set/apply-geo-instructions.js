#!/usr/bin/env node
/**
 * apply-geo-instructions.js — writes tools/level-set/geo-instructions.js (Geometry Level Set 2026-10-08) into
 * i18n/strings.<loc>.json (faces: every level), the types' own i18n.en, i18n/level-instructions.json (level) and
 * i18n/interactive-instructions.json "geometry" (screen). Refuses an empty string or a missing locale; idempotent.
 */
'use strict';
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const SRC = require('./geo-instructions.js');
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const bad = [];
const full = (by, what) => { for (const l of LOCS) if (!by[l] || !String(by[l]).trim()) bad.push(`${what} ${l}: empty`); };
for (const [id, by] of Object.entries(SRC.faces)) full(by, id);
for (const [id, lv] of Object.entries(SRC.level)) for (const [n, by] of Object.entries(lv)) full(by, id + ' L' + n);
for (const [k, by] of Object.entries(SRC.screen)) full(by, 'screen.' + k);
if (bad.length) { console.error(bad.join('\n')); process.exit(1); }
for (const l of LOCS) {
  const f = path.join(ROOT, 'i18n', `strings.${l}.json`);
  const S = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const [id, by] of Object.entries(SRC.faces)) S[id].instruction = by[l];
  fs.writeFileSync(f, JSON.stringify(S, null, 2) + '\n');
}
const FILES = { 'G3-341': 'g3/G3-341-types-of-angles.js', 'G3-340': 'g3/G3-340-classify-quadrilaterals.js' };
for (const [id, file] of Object.entries(FILES)) {
  const p = path.join(ROOT, 'types', file);
  fs.writeFileSync(p, fs.readFileSync(p, 'utf8').replace(/(instruction: ')[^']*(')/, (m0, a, b) => a + SRC.faces[id].en.replace(/'/g, "\'") + b));
}
const LF = path.join(ROOT, 'i18n', 'level-instructions.json');
const L = JSON.parse(fs.readFileSync(LF, 'utf8'));
for (const [id, lv] of Object.entries(SRC.level)) for (const [n, by] of Object.entries(lv)) { L[id] = L[id] || {}; L[id][n] = by; }
fs.writeFileSync(LF, JSON.stringify(L, null, 1) + '\n');
const IF = path.join(ROOT, 'i18n', 'interactive-instructions.json');
const I = JSON.parse(fs.readFileSync(IF, 'utf8'));
I.geometry = SRC.screen;
fs.writeFileSync(IF, JSON.stringify(I, null, 1) + '\n');
console.log('wrote faces', Object.keys(SRC.faces).join(','), '+ level G3-337 L3 + screen', Object.keys(SRC.screen).length, 'keys ×11');
