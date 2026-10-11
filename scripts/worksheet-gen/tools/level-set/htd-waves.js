#!/usr/bin/env node
/**
 * htd-waves.js — the How to Draw Level Set waves (2026-10-11) from data/htdx/allocation.json: one wave per locale,
 * waves/wave-htl-<loc>.json, every copy pinned to its drawing (unit 'lsx-…'). Never indexed; PDF only (a pencil task:
 * no screen version, no answer key). The prefix 'htl' is this family's alone (build-waves refuses to overwrite).
 *   node tools/level-set/htd-waves.js [--locales=en,de]
 */
'use strict';
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const A = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'htdx', 'allocation.json'), 'utf8'));
const LOCALES = ((process.argv.find((a) => a.startsWith('--locales=')) || '').slice(10) || 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
// the ORDER face (G1-418): each copy's mixed order comes from its seed. The visual review found two copies sharing one order and
// step 1 parked in the bottom slot; so per level the seedVariant is chosen so no two copies share an order and the slot of
// step 1 rotates through every slot (locale-neutral: the order is the same in every locale).
const { makeRng, instanceSeed } = require(path.join(ROOT, 'lib', 'rng.js'));
const ORDER_SV = {};
{
  const spec = require(path.join(ROOT, 'types', 'g1', 'G1-418-order-the-drawing-steps.js'));
  for (const [lv, list] of Object.entries(A.faces['G1-418'] || {})) {
    const used = new Set(); let slot = 0;
    for (const c of list) {
      let pick = null;
      for (let sv = 1; sv <= 400 && !pick; sv++) {
        const rng = makeRng(instanceSeed({ typeId: 'G1-418', theme: null, difficulty: +lv, seedEpoch: 1, variant: sv, unit: c.unit }));
        const order = spec.build({ difficulty: +lv, locale: 'en', unit: c.unit }, { rng, locale: 'en' }).meta.order;
        const n = order.length, s1 = order.indexOf('1');
        if (!used.has(order) && s1 === slot % n) pick = { sv, order };
      }
      if (!pick) throw new Error('G1-418: no seed for ' + c.unit);
      used.add(pick.order); slot++; ORDER_SV[c.unit + '|' + lv] = pick.sv;
    }
  }
}
for (const loc of LOCALES) {
  const levels = {};
  for (const [id, lvs] of Object.entries(A.faces)) for (const [lv, list] of Object.entries(lvs)) {
    if (!list.length) continue;
    (levels[id] = levels[id] || {})[lv] = list.map((c) => ({ copy: c.copy, unit: c.unit, seedVariant: (id === 'G1-418' && ORDER_SV[c.unit + '|' + lv]) || 1 }));
  }
  const wave = {
    id: 'wave-htl-' + loc,
    _note: 'How to Draw Level Set 2026-10-11: one library B&W drawing per worksheet (data/htdx, lessons read on contact sheets), levels by drawing complexity and support. Visible to teachers, never indexed; PDF only.',
    // unitInSlug false: a copy number is unique per face, so the slug needs no drawing id
    indexable: false, interactive: false, unitInSlug: false, seedEpoch: 1, locales: [loc], themes: [], themesPerType: 1, difficulties: [1, 2, 3],
    types: Object.keys(levels), levels,
  };
  const f = path.join(ROOT, 'waves', wave.id + '.json');
  if (fs.existsSync(f) && !JSON.parse(fs.readFileSync(f, 'utf8')).id.startsWith('wave-htl-')) throw new Error('refusing to overwrite ' + f);
  fs.writeFileSync(f, JSON.stringify(wave, null, 2) + '\n');
  console.log(wave.id, Object.values(levels).flatMap((l) => Object.values(l)).flat().length, 'copies');
}
