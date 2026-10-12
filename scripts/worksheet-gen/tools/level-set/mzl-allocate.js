#!/usr/bin/env node
/**
 * mzl-allocate.js — give every Maze Puzzles Level Set scene ONE level (2026-10-12): data/hmx/allocation.json.
 *
 * One scene = one worksheet. Within a face the scenes are spread over the three levels as evenly as possible (the
 * remainder goes to level 2, then level 1), in scene-file order so neighbouring scenes (often the same kind of world)
 * land on different levels; a scene goes only to a level where the reliability sweep built it reliably
 * (out/hmx/rel-<face>.json from tools/level-set/hmx-reliability.js --json; at least RATE of the draws build — the copy is then
 * pinned to a building seed by mzl-pin.js). A scene that builds at no level is left out
 * and reported — never forced. Copy numbers run per face from 2 (copy 1 is the published page).
 *   node tools/level-set/mzl-allocate.js
 */
'use strict';
const fs = require('fs'); const path = require('path');
const { allSkins } = require('../../lib/hmx.js');
const { FACES } = require('../../data/b8/maze-puzzles.js');
const ROOT = path.join(__dirname, '..', '..');
// a level is open to a scene when the sweep built it at least this often; the shipped draw is then PINNED to a seed that
// builds (tools/level-set/mzl-pin.js), so a rare unlucky seed never reaches a page
const RATE = 0.7;

const byFace = {};
for (const sk of allSkins()) (byFace[sk.face] = byFace[sk.face] || []).push(sk.id);
const out = { _about: 'Maze Puzzles Level Set allocation (tools/level-set/mzl-allocate.js): face type id → level → [{copy, unit}]', faces: {} };
const left = []; let total = 0;
for (const [face, ids] of Object.entries(byFace)) {
  // rel-<face>.json, then any split or re-measure files rel-<face>-*.json (a later file's level entry overrides)
  const dir = path.join(ROOT, 'out', 'hmx');
  const files = fs.readdirSync(dir).filter((f) => f === 'rel-' + face + '.json' || (f.startsWith('rel-' + face + '-') && f.endsWith('.json'))).sort((x, y) => x.length - y.length || x.localeCompare(y));
  if (!files.length) throw new Error('mzl-allocate: no reliability file for ' + face + ' (run tools/level-set/hmx-reliability.js --json)');
  const rel = {};
  for (const f of files) for (const [id, lvs] of Object.entries(JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')))) rel[id] = { ...(rel[id] || {}), ...lvs };
  const unmeasured = ids.filter((id) => !rel[id]); if (unmeasured.length) throw new Error('mzl-allocate: ' + face + ' scenes never measured: ' + unmeasured.join(', '));
  const only = (require('../../data/hmx/levels.js')[face] || {}).only;
  const okAt = (id, lv) => (!only || only.includes(lv)) && rel[id] && rel[id][lv] && rel[id][lv].n > 0 && rel[id][lv].ok / rel[id][lv].n >= RATE;
  const lvs = only || [1, 2, 3]; const n = ids.length; const want = { 1: 0, 2: 0, 3: 0 };
  for (const lv of lvs) want[lv] = Math.floor(n / lvs.length);
  for (const lv of [2, 1, 3].filter((l) => lvs.includes(l)).slice(0, n % lvs.length)) want[lv]++;
  const got = { 1: [], 2: [], 3: [] };
  ids.forEach((id, i) => {
    const pref = [[1, 2, 3], [2, 3, 1], [3, 1, 2]][i % 3];
    const lv = pref.find((l) => got[l].length < want[l] && okAt(id, l)) || pref.find((l) => okAt(id, l));
    if (!lv) { left.push(id); return; }
    got[lv].push(id);
  });
  const typeId = FACES[face].id; out.faces[typeId] = {}; let copy = 2;
  for (const lv of [1, 2, 3]) { out.faces[typeId][lv] = got[lv].map((unit) => ({ copy: copy++, unit })); total += got[lv].length; }
  console.log(face.padEnd(16), typeId.padEnd(7), [1, 2, 3].map((l) => 'L' + l + ' ' + got[l].length).join('  '));
}
fs.writeFileSync(path.join(ROOT, 'data', 'hmx', 'allocation.json'), JSON.stringify(out, null, 1) + '\n');
console.log('allocated ' + total + ' worksheets' + (left.length ? '; LEFT OUT (no level builds N/N): ' + left.join(', ') : ''));
process.exit(left.length ? 1 : 0);
