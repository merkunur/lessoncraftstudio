#!/usr/bin/env node
/**
 * build-fd-face-pins.js — data/b7/fd-face-pins.json, the scenes the five new Find-the-Differences faces of the maker
 * draw from (makers 2026-11-02: K-488 · K-489 · K-490 · K-491 · K-492, lib/fd-faces.js).
 *
 * A face asks a lot of one scene (six separated changes of three kinds; five copies at 243 px with big changes) and most
 * scenes cannot carry it (measured: 10 of 60 for the busiest level). So a maker page never walks a list that fails:
 * for every face × level, the entry lists, in the face's own scene order, every maker scene (data/b7 makerScenes) on
 * which the face composed (the face's pinFits: its own composition, three seeds). Copy n = the n-th entry.
 *   { faces: { <typeId>: { <level>: [ <scene id> … ] } } }
 *
 *   node tools/build-fd-face-pins.js [--faces=K-488,K-489] [--check]
 *     --check: rebuild in memory and fail when the file on disk differs (stale after a scene or face change)
 */
'use strict';
const fs = require('fs'), path = require('path');
const F = require('../lib/fd-faces.js');
const { loadType } = require('../lib/load-types.js');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const OUT = path.join(__dirname, '..', 'data', 'b7', 'fd-face-pins.json');
const FACES = arg('faces', 'K-488,K-489,K-490,K-491,K-492').split(',');

const t0 = Date.now();
const cache = new Map();
const scene = (id) => { if (!cache.has(id)) cache.set(id, F.loadScene(id)); return cache.get(id); };
const old = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : { faces: {} };
const out = { _note: 'tools/build-fd-face-pins.js — the maker scenes each new FD face composes on, per level (copy n = the n-th)', faces: { ...(old.faces || {}) } };
for (const id of FACES) {
  const type = loadType(id);
  if (typeof type.pinFits !== 'function') throw new Error(`${id}: no pinFits`);
  out.faces[id] = {};
  for (const lv of Object.keys(type.difficulty)) {
    const list = F.sceneOrder(id).filter((sid) => type.pinFits(scene(sid), +lv));
    out.faces[id][lv] = list;
    console.log(`${id} L${lv}: ${list.length} of ${F.sceneOrder(id).length} scenes`);
    if (list.length < 12) throw new Error(`${id} L${lv}: only ${list.length} scenes carry it (a maker face needs at least 12 copies)`);
  }
}
const text = JSON.stringify(out, null, 1) + '\n';
if (process.argv.includes('--check')) {
  const disk = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  if (disk !== text) { console.error('fd-face-pins: data/b7/fd-face-pins.json is STALE — run node tools/build-fd-face-pins.js'); process.exit(1); }
  console.log('fd-face-pins: current');
} else { fs.writeFileSync(OUT, text); console.log(`wrote ${path.relative(process.cwd(), OUT)} in ${Math.round((Date.now() - t0) / 1000)} s`); }
