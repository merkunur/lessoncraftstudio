#!/usr/bin/env node
/**
 * The English bin faces of recycling (K-357 "draw a line to the bin it goes in", K-366 "circle the bin it goes in")
 * never draw a thing US curbside recycling refuses (2026-11-23, D-3 notes review): a sunscreen tube, a glue bottle, a
 * toothbrush, a comb, a plastic spoon, a bolt (and the pail, nut, pot and milk/oil bottles retired before). 400 seeds a
 * level. --poison: a page that draws one of them fails, and the check passes on the real data.
 */
'use strict';
const path = require('path');
const { loadType } = require(path.join(__dirname, '..', 'lib', 'load-types.js'));
const { makeRng, instanceSeed } = require(path.join(__dirname, '..', 'lib', 'rng.js'));
const NOT_CURBSIDE = ['sunscreen', 'glue', 'toothbrush', 'comb', 'spoon', 'bolt', 'bucket', 'nut', 'saucepan'];
const SEEDS = 400;
function drawn(b) { const s = JSON.stringify(b.meta || {}) + JSON.stringify(b.items || ''); return NOT_CURBSIDE.filter((id) => new RegExp('"' + id + '"|[",]' + id + '[",]').test(s)); }
function run(poison) {
  const bad = [];
  for (const id of ['K-357', 'K-366']) {
    const spec = loadType(id);
    for (const lv of [1, 2, 3]) {
      for (let sv = 1; sv <= SEEDS; sv++) {
        const seed = instanceSeed({ typeId: spec.id, theme: null, difficulty: lv, seedEpoch: 1, variant: sv, unit: null });
        let b; try { b = spec.build({ theme: null, difficulty: lv, locale: 'en', unit: null }, { rng: makeRng(seed), variant: sv, seedVariant: sv }); } catch (e) { bad.push(id + ' L' + lv + ' seed ' + sv + ' refused: ' + e.message.slice(0, 80)); continue; }
        if (poison && sv === 1) { b = Object.assign({}, b, { meta: Object.assign({}, b.meta, { items: [].concat((b.meta && b.meta.items) || [], ['toothbrush']) }) }); }
        const hit = drawn(b);
        if (hit.length) bad.push(id + ' L' + lv + ' seed ' + sv + ': ' + hit.join(','));
      }
    }
  }
  return bad;
}
if (process.argv.includes('--poison')) {
  const caught = run(true).some((x) => /toothbrush/.test(x));
  const clean = run(false).length === 0;
  console.log((caught ? 'poison caught' : 'POISON NOT CAUGHT') + '; control ' + (clean ? 'clean' : 'NOT clean'));
  process.exit(caught && clean ? 0 : 1);
}
const bad = run(false);
bad.slice(0, 10).forEach((x) => console.log('FAIL ' + x));
console.log(bad.length ? 'FAIL (' + bad.length + ')' : 'PASS: ' + SEEDS + ' seeds x 3 levels x 2 faces, English, no thing US curbside refuses');
process.exit(bad.length ? 1 : 0);
