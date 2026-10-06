#!/usr/bin/env node
/**
 * apply-d2d-instructions.js — merges tools/level-set/d2d-instructions.js into i18n/level-instructions.json (Dot-to-Dot
 * Level Set 2026-10-06). Refuses when a string is missing for a locale, when an ABC string does not name the locale's
 * own 10th / last strip letter (data/b2/collation.js), or when a number range does not match the level's real range.
 *   node tools/level-set/apply-d2d-instructions.js [--check]
 */
'use strict';
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const FILE = path.join(ROOT, 'i18n', 'level-instructions.json');
const SRC = require('./d2d-instructions.js');
const { COLLATION } = require(path.join(ROOT, 'data', 'b2', 'collation.js'));
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const RANGE = { 'G1-285': ['2', '40'], 'G2-304': ['5', '100'], 'G2-314': ['10', '200'] };   // the ranges that are new on the page
const bad = [];
for (const [id, levels] of Object.entries(SRC)) for (const [lv, by] of Object.entries(levels)) for (const loc of LOCS) {
  const v = by[loc], s = v && typeof v === 'object' ? v.instruction : v;
  if (v && typeof v === 'object' && !v.title) bad.push(`${id} L${lv} ${loc}: object without a title`);
  if (!s || !s.trim()) { bad.push(`${id} L${lv} ${loc}: missing`); continue; }
  if (id === 'K-309') {
    const strip = [...COLLATION[loc].strip];
    const want = lv === '1' ? strip[9] : strip[strip.length - 1];
    // the letter as its own word (a letter, a case ending after a colon, or a closing stop)
    if (!new RegExp(`(?<!\\p{L})${want}(?!\\p{L}{2})`, 'u').test(s.replace(/^.*?(?<!\p{L})a(?!\p{L})/u, ''))) bad.push(`${id} L${lv} ${loc}: does not name "${want}"`);
  } else if (RANGE[id] && lv === '3') {
    for (const n of RANGE[id]) if (!new RegExp(`(?<!\\d)${n}(?!\\d)`).test(s)) bad.push(`${id} L${lv} ${loc}: does not name ${n}`);
  }
}
if (bad.length) { console.error(bad.join('\n')); process.exit(1); }
if (process.argv.includes('--check')) { console.log('ok —', Object.keys(SRC).length, 'faces'); process.exit(0); }
const L = JSON.parse(fs.readFileSync(FILE, 'utf8'));
let n = 0;
for (const [id, levels] of Object.entries(SRC)) {
  L[id] = L[id] || {};
  for (const [lv, by] of Object.entries(levels)) { L[id][lv] = { ...by }; n += Object.keys(by).length; }
}
fs.writeFileSync(FILE, JSON.stringify(L, null, 1) + '\n');
console.log('wrote', n, 'strings for', Object.keys(SRC).join(', '));
