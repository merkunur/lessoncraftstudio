#!/usr/bin/env node
/**
 * import-ltr-panels.js — Level Set 2026-09-28 (Letter Tracing, one page per letter): the 11 native panels'
 * strings → data/tracing/letter-tracing-levelset.json (the per-letter title template, read by K-238 copyStrings
 * for NEW copies only) and i18n/level-instructions.json (the printed level-1 and level-3 instructions of
 * K-238 and the range faces that carry those levels).
 *
 *   node tools/level-set/import-ltr-panels.js <dir>
 *
 * <dir> holds ltr-text-<loc>.json = { title, instrL1, instrL3 } for all 11 locales. Refuses (throws) on a
 * missing locale, a title without {UNIT}, a title > 70 chars with the locale's longest unit filled in, or an
 * instruction > 150 chars — a level instruction missing for one locale would make every build of that level throw.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const T = require('../../types/k/K-238-letter-tracing.js');

const dir = process.argv[2];
if (!dir) throw new Error('usage: import-ltr-panels.js <dir>');
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
// which faces print which level (the wave config): L1 = numbered strokes, L3 = two letters to write alone
const L1 = ['K-238', 'K-254', 'K-255', 'K-257'];
const L3 = ['K-238', 'K-254', 'K-255', 'K-256', 'K-257', 'K-258'];
const ROOT = path.join(__dirname, '..', '..');
const out = { _note: 'Level Set 2026-09-28 — Letter Tracing: the per-letter page title ({UNIT} = "A a", "ß", "IJ ij"), by 11 native panels; importer tools/level-set/import-ltr-panels.js. Read by K-238 copyStrings for NEW copies only (a unit is set); the published pages never read it.' };
const instrFile = path.join(ROOT, 'i18n', 'level-instructions.json');
const instr = JSON.parse(fs.readFileSync(instrFile, 'utf8'));
const problems = [];
for (const loc of LOCS) {
  const f = path.join(dir, `ltr-text-${loc}.json`);
  if (!fs.existsSync(f)) { problems.push(`${loc}: ${f} missing`); continue; }
  const P = JSON.parse(fs.readFileSync(f, 'utf8'));
  if (!P.title || !P.title.includes('{UNIT}')) problems.push(`${loc}: title must carry {UNIT}`);
  const longest = T.unitAxis.units(loc).map((u) => T.unitAxis.tokens(u, loc).UNIT).sort((a, b) => b.length - a.length)[0];
  if (P.title && P.title.replace('{UNIT}', longest).length > 70) problems.push(`${loc}: title > 70 with "${longest}"`);
  for (const k of ['instrL1', 'instrL3']) {
    if (!P[k] || typeof P[k] !== 'string') problems.push(`${loc}: ${k} missing`);
    else if (P[k].length > 150) problems.push(`${loc}: ${k} is ${P[k].length} chars > 150`);
    else if (/\{/.test(P[k])) problems.push(`${loc}: ${k} carries a token`);
  }
  out[loc] = { title: P.title };
  for (const id of L1) ((instr[id] = instr[id] || {})['1'] = instr[id]['1'] || {})[loc] = P.instrL1;
  for (const id of L3) ((instr[id] = instr[id] || {})['3'] = instr[id]['3'] || {})[loc] = P.instrL3;
}
if (problems.length) { for (const p of problems) console.log('FAIL ' + p); process.exit(1); }
fs.writeFileSync(path.join(ROOT, 'data', 'tracing', 'letter-tracing-levelset.json'), JSON.stringify(out, null, 1) + '\n');
fs.writeFileSync(instrFile, JSON.stringify(instr, null, 1) + '\n');
console.log(`written: ${LOCS.length} titles, level-1 instructions for ${L1.join(' ')}, level-3 for ${L3.join(' ')}`);
