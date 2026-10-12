#!/usr/bin/env node
/**
 * mzl-pin.js — pin every Maze Puzzles Level Set copy to a seed that BUILDS (2026-10-12). For each copy in
 * data/hmx/allocation.json it tries seedVariant 1, 2, 3 … (≤ 12) and keeps the first one whose page builds through the
 * face's own type — in all eleven locales for a label face (alphabets, sound pools, number runs: the page differs per
 * locale), once for a picture face (the page is the same in every locale). The seed is the one enumerate.js gives the
 * copy (theme null, seedEpoch 1, variant = seedVariant, unit = the scene), so a pinned copy is the page that ships.
 * The reliability sweep (hmx-reliability.js) says a scene builds at a level; the pin makes the shipped draw certain.
 *   node tools/level-set/mzl-pin.js [--faces=K-405,G1-420]
 */
'use strict';
const fs = require('fs'); const path = require('path');
const { makeRng, instanceSeed } = require('../../lib/rng.js');
const { loadType } = require('../../lib/load-types.js');
const { skinOf } = require('../../lib/hmx.js');
const { FACES } = require('../../data/b8/maze-puzzles.js');
const { SCENES } = require('../../data/hm/scenes.js');
const ROOT = path.join(__dirname, '..', '..');
const F = path.join(ROOT, 'data', 'hmx', 'allocation.json');
const A = JSON.parse(fs.readFileSync(F, 'utf8'));
const only = ((process.argv.find((a) => a.startsWith('--faces=')) || '').slice(8)).split(',').filter(Boolean);
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const MAX = 12; const failed = [];
const merge = (process.argv.find((a) => a.startsWith('--merge=')) || '').slice(8);
if (merge) {
  const pins = Object.assign({}, ...merge.split(',').map((f) => JSON.parse(fs.readFileSync(f, 'utf8'))));
  let n = 0, miss = [];
  for (const [t, lvs] of Object.entries(A.faces)) for (const list of Object.values(lvs)) for (const c of list) { const v = pins[t + ' ' + c.copy]; if (v) { c.seedVariant = v; n++; } else miss.push(t + ' c' + c.copy); }
  fs.writeFileSync(F, JSON.stringify(A, null, 1) + '\n'); console.log('merged ' + n + ' pins' + (miss.length ? '; UNPINNED ' + miss.join(', ') : '')); process.exit(miss.length ? 1 : 0);
}
for (const [typeId, lvs] of Object.entries(A.faces)) {
  if (only.length && !only.includes(typeId)) continue;
  const spec = loadType(typeId);
  for (const [lv, list] of Object.entries(lvs)) for (const c of list) {
    const face = skinOf(c.unit).face; const base = SCENES[FACES[face].scene];
    const perLocale = !!(base.labels && ['seq', 'sound', 'pred', 'ops'].includes(base.labels.rule)) || (base.maze && base.maze.gen === 'hex');
    let pinned = 0;
    for (let s = 1; s <= MAX && !pinned; s++) {
      const ok = (perLocale ? LOCS : ['en']).every((loc) => {
        try { spec.build({ theme: null, difficulty: +lv, locale: loc, unit: c.unit }, { rng: makeRng(instanceSeed({ typeId, theme: null, difficulty: +lv, seedEpoch: 1, variant: s, unit: c.unit })), variant: c.copy, seedVariant: s }); return true; } catch (e) { return false; }
      });
      if (ok) pinned = s;
    }
    if (pinned) c.seedVariant = pinned; else { delete c.seedVariant; failed.push(`${typeId} L${lv} c${c.copy} ${c.unit}`); }
    console.log(`${typeId} L${lv} c${c.copy}`.padEnd(18), c.unit.padEnd(28), pinned ? 'seedVariant ' + pinned : 'NO SEED BUILDS (1..' + MAX + ')');
  }
}
// --out=<file>: write only the pins (a parallel run, one process per face; then merge them with --merge=<files>)
const outArg = (process.argv.find((a) => a.startsWith('--out=')) || '').slice(6);
if (outArg) {
  const pins = {};
  for (const [t, lvs] of Object.entries(A.faces)) if (!only.length || only.includes(t)) for (const list of Object.values(lvs)) for (const c of list) if (c.seedVariant) pins[t + ' ' + c.copy] = c.seedVariant;
  fs.writeFileSync(outArg, JSON.stringify(pins));
} else fs.writeFileSync(F, JSON.stringify(A, null, 1) + '\n');
if (failed.length) { console.log('UNPINNED: ' + failed.join(', ')); process.exit(1); }
console.log('every copy pinned');
