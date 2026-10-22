#!/usr/bin/env node
/**
 * ptl-waves.js — the Picture Tracing Level Set waves (2026-10-22) from the copy catalogue (lib/ptx.js, data/ptx/scenes-*.js):
 * one wave per locale, waves/wave-ptl-<loc>.json, every copy pinned to its scene (unit). 20 faces × 3 levels × 5 copies =
 * 300 per locale. Copies are numbered after the published page (copy 1, level 2): L1 2-6, L2 7-11, L3 12-16, in the
 * catalogue's order. Never indexed; PDF only (no screen, no answer key). The prefix 'ptl' is this family's alone.
 *   node tools/level-set/ptl-waves.js [--locales=en,de]
 */
'use strict';
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const { catalog } = require('../../lib/ptx.js');
const LOCALES = ((process.argv.find((a) => a.startsWith('--locales=')) || '').slice(10) || 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
/** face → level → [{ copy, unit }] (the allocation; also used by check-zips-ptl.js) */
function allocation() {
  const by = {};
  for (const e of catalog().values()) ((by[e.face] = by[e.face] || {})[e.level] = by[e.face][e.level] || []).push(e.id);
  const out = {};
  for (const [face, lvs] of Object.entries(by)) {
    let copy = 2; out[face] = {};
    for (const lv of [1, 2, 3]) {
      const list = (lvs[lv] || []).slice().sort();
      if (list.length !== 5) throw new Error(`ptl: ${face} L${lv} has ${list.length} copies (want 5)`);
      out[face][lv] = list.map((unit) => ({ copy: copy++, unit, seedVariant: 1 }));
    }
  }
  return out;
}
module.exports = { allocation };
if (require.main === module) {
  const levels = allocation();
  for (const loc of LOCALES) {
    const wave = {
      id: 'wave-ptl-' + loc,
      _note: 'Picture Tracing Level Set 2026-10-22: 300 original scenes per locale (data/ptx), skins over the 20 published faces, three levels per face (easier / as published / harder). Visible to teachers, never indexed; PDF only.',
      indexable: false, unitInSlug: false, seedEpoch: 1, locales: [loc], themes: [], themesPerType: 1, difficulties: [1, 2, 3],
      types: Object.keys(levels).sort(), levels,
    };
    const f = path.join(ROOT, 'waves', wave.id + '.json');
    if (fs.existsSync(f) && !JSON.parse(fs.readFileSync(f, 'utf8')).id.startsWith('wave-ptl-')) throw new Error('refusing to overwrite ' + f);
    fs.writeFileSync(f, JSON.stringify(wave, null, 2) + '\n');
    console.log(wave.id, Object.values(levels).flatMap((l) => Object.values(l)).flat().length, 'copies');
  }
}
