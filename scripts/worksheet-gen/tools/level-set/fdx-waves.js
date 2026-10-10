#!/usr/bin/env node
/**
 * fdx-waves.js — the Find the Differences Level Set waves (2026-10-10) from data/fdx/allocation.json: one wave per locale,
 * waves/wave-fdl-<loc>.json, every copy pinned to its scene (unit) and painted flag ('@c'). Never indexed; PDF + tap
 * screen + answer key. The prefix 'fdl' is this family's alone (tools/level-set/build-waves.js refuses to overwrite).
 *   node tools/level-set/fdx-waves.js [--locales=en,de]
 */
'use strict';
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const A = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'fdx', 'allocation.json'), 'utf8'));
const LOCALES = ((process.argv.find((a) => a.startsWith('--locales=')) || '').slice(10) || 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
for (const loc of LOCALES) {
  const levels = {};
  for (const [id, lvs] of Object.entries(A.faces)) for (const [lv, list] of Object.entries(lvs)) {
    if (!list.length) continue;
    (levels[id] = levels[id] || {})[lv] = list.map((c) => ({ copy: c.copy, unit: c.unit, seedVariant: 1 }));
  }
  const wave = {
    id: 'wave-fdl-' + loc,
    _note: 'Find the Differences Level Set 2026-10-10: original scenes (data/fdx), one scene per worksheet, half painted, levels by scene density and change size. Visible to teachers, never indexed; PDF + tap screen + answer key.',
    // unitInSlug false: a copy number is unique per face, so the slug needs no scene id (a pair's id would be 40 characters)
    indexable: false, interactive: true, unitInSlug: false, seedEpoch: 1, locales: [loc], themes: [], themesPerType: 1, difficulties: [1, 2, 3],
    types: Object.keys(levels), levels,
  };
  const f = path.join(ROOT, 'waves', wave.id + '.json');
  if (fs.existsSync(f) && !JSON.parse(fs.readFileSync(f, 'utf8')).id.startsWith('wave-fdl-')) throw new Error('refusing to overwrite ' + f);
  fs.writeFileSync(f, JSON.stringify(wave, null, 2) + '\n');
  console.log(wave.id, Object.values(levels).flatMap((l) => Object.values(l)).flat().length, 'copies');
}
