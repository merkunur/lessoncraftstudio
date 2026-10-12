#!/usr/bin/env node
/**
 * mzl-waves.js — the Maze Puzzles Level Set waves (2026-10-12) from data/hmx/allocation.json: one wave per locale,
 * waves/wave-mzl-<loc>.json, every copy pinned to its scene (unit 'hmx-…'). Never indexed; PDF + draw-the-way screen +
 * answer key. The prefix 'mzl' is this family's alone (tools/level-set/build-waves.js refuses to overwrite).
 *   node tools/level-set/mzl-waves.js [--locales=en,de]
 */
'use strict';
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const A = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'hmx', 'allocation.json'), 'utf8'));
const LOCALES = ((process.argv.find((a) => a.startsWith('--locales=')) || '').slice(10) || 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const REFUSED = require('../../data/hmx/refusals.js');
for (const loc of LOCALES) {
  const levels = {}; const refused = REFUSED[loc] || {};
  for (const [id, lvs] of Object.entries(A.faces)) for (const [lv, list] of Object.entries(lvs)) {
    const kept = list.filter((c) => !refused[c.unit]);
    if (!kept.length) continue;
    (levels[id] = levels[id] || {})[lv] = kept.map((c) => { if (!Number.isInteger(c.seedVariant)) throw new Error('mzl-waves: ' + id + ' c' + c.copy + ' is not pinned (run tools/level-set/mzl-pin.js)'); return { copy: c.copy, unit: c.unit, seedVariant: c.seedVariant }; });
  }
  const wave = {
    id: 'wave-mzl-' + loc,
    _note: 'Maze Puzzles Level Set 2026-10-12: original scenes (data/hmx), one scene per worksheet, three levels per face (data/hmx/levels.js). Visible to teachers, never indexed; PDF + draw-the-way screen + answer key.',
    // unitInSlug false: a copy number is unique per face, so the slug needs no scene id
    indexable: false, interactive: true, unitInSlug: false, seedEpoch: 1, locales: [loc], themes: [], themesPerType: 1, difficulties: [1, 2, 3],
    types: Object.keys(levels), levels,
  };
  const f = path.join(ROOT, 'waves', wave.id + '.json');
  if (fs.existsSync(f) && !JSON.parse(fs.readFileSync(f, 'utf8')).id.startsWith('wave-mzl-')) throw new Error('refusing to overwrite ' + f);
  fs.writeFileSync(f, JSON.stringify(wave, null, 2) + '\n');
  console.log(wave.id, Object.values(levels).flatMap((l) => Object.values(l)).flat().length, 'copies');
}
