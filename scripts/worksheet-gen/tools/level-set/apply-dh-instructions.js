#!/usr/bin/env node
/**
 * apply-dh-instructions.js — merges tools/level-set/dh-instructions.js into i18n/level-instructions.json (Doubles and
 * Halves Level Set 2026-10-07). A level that changes the instruction in only some locales gets the face's published
 * instruction in the others (a level entry must cover all 11: i18n/strings.js withLevelInstruction). Refuses an empty
 * string, and an inverse-level string that does not differ from the face's published one.
 *   node tools/level-set/apply-dh-instructions.js [--check]
 */
'use strict';
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const FILE = path.join(ROOT, 'i18n', 'level-instructions.json');
const SRC = require('./dh-instructions.js');
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const S = Object.fromEntries(LOCS.map((l) => [l, JSON.parse(fs.readFileSync(path.join(ROOT, 'i18n', `strings.${l}.json`), 'utf8'))]));
const INVERSE = new Set(['G1-271', 'G1-286', 'G1-287', 'G1-288', 'G1-296', 'G1-297', 'G1-298', 'G1-299']);   // level 3 asks backwards
const bad = [], out = {};
for (const [id, levels] of Object.entries(SRC)) for (const [lv, by] of Object.entries(levels)) {
  const full = {};
  for (const loc of LOCS) {
    const pub = S[loc][id] && S[loc][id].instruction;
    if (!pub) bad.push(`${id} ${loc}: no published instruction`);
    const v = by[loc] || pub, s = v && typeof v === 'object' ? v.instruction : v;
    if (v && typeof v === 'object' && !v.title) bad.push(`${id} L${lv} ${loc}: object without a title`);
    if (!s || !s.trim()) bad.push(`${id} L${lv} ${loc}: empty`);
    if (lv === '3' && INVERSE.has(id) && s === pub) bad.push(`${id} L3 ${loc}: same as the published instruction (the level asks backwards)`);
    full[loc] = v;
  }
  (out[id] = out[id] || {})[lv] = full;
}
if (bad.length) { console.error(bad.join('\n')); process.exit(1); }
if (process.argv.includes('--check')) { console.log('ok —', Object.keys(out).length, 'faces'); process.exit(0); }
const L = JSON.parse(fs.readFileSync(FILE, 'utf8'));
let n = 0;
for (const [id, levels] of Object.entries(out)) { L[id] = L[id] || {}; for (const [lv, by] of Object.entries(levels)) { L[id][lv] = by; n++; } }
fs.writeFileSync(FILE, JSON.stringify(L, null, 1) + '\n');
console.log('wrote', n, 'level entries for', Object.keys(out).join(', '));
