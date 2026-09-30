/**
 * Rhyming Words Level Set probe (build level, no render): every face × level × locale × a spread of units/seeds
 * through build + screen + key, reporting how many copies build and the refusal reasons.
 *   node tools/level-set/probe-rhy.js [--locales=en,de] [--seeds=20]
 */
'use strict';
const { loadType } = require('../../lib/load-types.js');
const { makeRng, instanceSeed } = require('../../lib/rng.js');

const args = process.argv.slice(2);
const LOCS = ((args.find((a) => a.startsWith('--locales=')) || '').slice(10) || 'en,de,es,fr,it,pt,nl,sv,da,no,fi').split(',');
const SEEDS = +((args.find((a) => a.startsWith('--seeds=')) || '').slice(8) || 12);
const FACES = ['G1-309', 'K-352', 'G1-343', 'G1-344', 'G1-345', 'G1-346'];
let bad = 0;
for (const loc of LOCS) {
  const line = [];
  for (const id of FACES) {
    const spec = loadType(id);
    for (const lv of [1, 2, 3]) {
      const units = [null, ...((spec.unitAxis && spec.unitAxis.applicable !== false && spec.unitAxis.units(loc)) || []).slice(0, 8)];
      let ok = 0; const why = new Map();
      for (const unit of units) for (let sv = 1; sv <= SEEDS; sv++) {
        const seed = instanceSeed({ typeId: id, theme: null, difficulty: lv, seedEpoch: 1, variant: sv, unit });
        try {
          let meta = null;
          for (const extra of [{}, ...(spec.interactive ? [{ interactive: true }, { answerKey: true }] : [])]) {
            const b = spec.build({ theme: null, difficulty: lv, locale: loc, unit }, { rng: makeRng(seed), variant: 2, seedVariant: sv, ...extra });
            if (meta && JSON.stringify(b.meta) !== meta) throw new Error('screen/key drew different content');
            meta = JSON.stringify(b.meta);
          }
          ok++;
        } catch (e) { const k = String(e.message).replace(/"[^"]*"/g, '"…"').slice(0, 140); why.set(k, (why.get(k) || 0) + 1); }
      }
      line.push(`${id.slice(3)}L${lv}:${ok}/${units.length * SEEDS}`);
      if (!ok) { bad++; line.push(`   !! ${[...why.entries()].slice(0, 2).map(([k, n]) => `${n}× ${k}`).join(' | ')}`); }
    }
  }
  console.log(loc + ': ' + line.join(' '));
}
process.exitCode = bad ? 1 : 0;
