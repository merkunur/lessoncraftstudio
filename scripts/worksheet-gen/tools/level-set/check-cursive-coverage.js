#!/usr/bin/env node
/**
 * check-cursive-coverage.js — the operator's requirement for the Cursive Level Set (2026-09-28): EVERY lowercase
 * letter and EVERY capital of the alphabet has a page, at EVERY level, in EVERY script a locale teaches.
 * Reads the built waves (waves/wave-cur-<loc>.json), rebuilds each copy's letters and compares the union with the
 * bank's lessons (lowercase) and the level-set capitals list. The published level-2 page counts for its group.
 *   node tools/level-set/check-cursive-coverage.js [--poison]   (--poison drops one copy and must FAIL)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { loadType } = require('../../lib/load-types.js');
const { makeRng } = require('../../lib/rng.js');
const { bank } = require('../../lib/b6-common.js');
const LS = require('../../data/b6/cursive-writing-levelset.json');

const poison = process.argv.includes('--poison');
let fails = 0, checked = 0;
for (const loc of ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'da', 'no']) {
  const wave = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'waves', `wave-cur-${loc}.json`), 'utf8'));
  const b = bank('cursive-writing', loc);
  for (const [id, key] of [['G2-377', 'letters'], ['G2-384', 'capitals']]) {
    const spec = loadType(id);
    const pubUnit = spec.unitAxis.exemplar(loc, spec);
    for (const [lv, copies0] of Object.entries(wave.levels[id] || {})) {
      const copies = poison ? copies0.slice(1) : copies0;
      const byUnit = {};
      for (const c of copies) {
        const m = spec.build({ difficulty: Number(lv), locale: loc, unit: c.unit }, { rng: makeRng('cov'), variant: c.copy, seedVariant: c.seedVariant }).meta;
        (byUnit[c.unit || pubUnit] = byUnit[c.unit || pubUnit] || new Set());
        for (const x of m[key]) byUnit[c.unit || pubUnit].add(x);
      }
      if (id === 'G2-377' && lv === '2') {   // the published page = lesson 0 of the published script
        const m = spec.build({ difficulty: 2, locale: loc, unit: null }, { rng: makeRng('cov') }).meta;
        (byUnit[pubUnit] = byUnit[pubUnit] || new Set()); m.letters.forEach((x) => byUnit[pubUnit].add(x));
      }
      for (const u of Object.keys(byUnit)) {
        const want = key === 'letters' ? new Set(b.lessons[u].flat()) : new Set(LS[loc].capitals.map((c) => c.capital));
        const missing = [...want].filter((x) => !byUnit[u].has(x));
        checked++;
        if (missing.length) { fails++; console.log(`FAIL ${loc} ${id} L${lv} ${u}: no page for ${missing.join(' ')}`); }
      }
    }
  }
}
console.log(`${checked} (locale, face, level, script) cells checked, ${fails} missing letters`);
if (poison) { console.log(fails ? 'poison killed' : 'POISON SURVIVED'); process.exit(fails ? 0 : 1); }
process.exit(fails ? 1 : 0);
