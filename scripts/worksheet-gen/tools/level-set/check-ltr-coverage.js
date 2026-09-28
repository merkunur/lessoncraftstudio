#!/usr/bin/env node
/**
 * check-ltr-coverage.js — Level Set 2026-09-28 (Letter Tracing, one page per letter): every letter of every
 * locale's alphabet (K-238 unitAxis.units: capitals + specials + lowercase-only ß + panel extras) has its own
 * page at level 1, 2 AND 3 in waves/wave-ltr-<loc>.json, and every range page carries the levels the config gives it.
 *
 *   node tools/level-set/check-ltr-coverage.js [--poison]
 * --poison removes one letter from the en wave in memory; the check must then FAIL.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const T = require('../../types/k/K-238-letter-tracing.js');
const cfg = require('./letter-tracing.config.js');

const POISON = process.argv.includes('--poison');
let bad = 0;
for (const loc of ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi']) {
  const wave = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'waves', `wave-ltr-${loc}.json`), 'utf8'));
  if (POISON && loc === 'en') wave.levels['K-238']['2'] = wave.levels['K-238']['2'].filter((c) => c.unit !== 'Q');
  const units = T.unitAxis.units(loc);
  const miss = [];
  for (const lv of ['1', '2', '3']) {
    const have = new Set(((wave.levels['K-238'] || {})[lv] || []).map((c) => c.unit));
    for (const u of units) if (!have.has(u)) miss.push(`${u} L${lv}`);
    if (have.size !== ((wave.levels['K-238'] || {})[lv] || []).length) miss.push(`duplicate letter at L${lv}`);
  }
  for (const id of cfg.singleFaces) for (const lv of cfg.faces[id].levels.filter((l) => l !== 2)) {
    const n = ((wave.levels[id] || {})[lv] || []).length;
    if (n !== 1) miss.push(`${id} L${lv}: ${n} copies (want 1)`);
  }
  if (miss.length) { bad += miss.length; console.log(`${loc}: MISSING ${miss.join(', ')}`); }
  else console.log(`${loc}: ${units.length} letters × 3 levels + range levels — complete`);
}
if (POISON) { console.log(bad ? 'poison KILLED' : 'poison SURVIVED'); process.exit(bad ? 0 : 1); }
console.log(bad ? `\n${bad} gap(s)` : '\nevery letter has its page at every level');
process.exit(bad ? 1 : 0);
