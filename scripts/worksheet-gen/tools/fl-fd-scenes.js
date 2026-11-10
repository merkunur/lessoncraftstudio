#!/usr/bin/env node
/**
 * fl-fd-scenes.js — scenes that bring every remaining drawing into Find the Differences (docs/makers/FLAGSHIP.md). The 277
 * Level Set scenes hold about 740 library drawings; this groups the others by the settings their catalogue tags name and
 * writes data/fl/fd-scenes.json: { id 'fdl-…', setting, variant, mirror, hero, cast, level }, each laid out by the same
 * lib/fdx-layout.js (a drawing that finds no room goes to the next scene).
 *   node tools/fl-fd-scenes.js
 */
'use strict';
require('../data/fl/fd-catalog-node.js');
const fs = require('fs'); const path = require('path');
const { CATALOG } = require('../data/fdx/catalog.js');
const X = require('../lib/fdx-layout.js');
const { TAGS } = require('../lib/fdx-scenery.js');
const { SCENES } = require('../data/fdx/scenes.js');
const { slugOf } = require('../lib/fl-art.js');
const { makeRng } = require('../lib/rng.js');

const used = new Set();
for (const s of SCENES) { used.add(s.hero); for (const c of s.cast) used.add(typeof c === 'string' ? c : c.src); }
const free = [...CATALOG.values()].filter((c) => !c.refused && !c.thin && !used.has(c.src) && c.places.length).sort((a, b) => (a.src < b.src ? -1 : 1));
console.log('drawings to place: ' + free.length);
const settings = Object.keys(TAGS);
const load = new Map(settings.map((s) => [s, []]));
const unplaced = [];
for (const c of free) {
  const fit = settings.filter((s) => c.tags.some((t) => TAGS[s].includes(t)));
  if (!fit.length) { unplaced.push(c); continue; }
  fit.sort((a, b) => load.get(a).length - load.get(b).length);
  load.get(fit[0]).push(c);
}
// a drawing with no setting of its own: a room for things, a park for the rest
for (const c of unplaced) { const s = c.places[0] === 's' ? 'park' : c.places.includes('t') ? 'kitchen' : c.kind === 'animal' ? 'meadow' : 'livingroom'; load.get(s).push(c); }
const SIZES = [7, 6, 8, 5];
const out = []; let k = 0, dropped = 0; const why = {}; let left = [];
const rng = makeRng('fl-fd-scenes');
for (let round = 0; round < 4; round++) {
 if (round) { for (const v of load.values()) v.length = 0; for (const [st, c] of left) load.get(st).push(c); left = []; }
 for (const [setting, list0] of load) {
  const list = rng.shuffle(list0.slice());
  let at = 0, v = 0;
  while (at < list.length) {
    const n = SIZES[k % SIZES.length]; k++;
    let chunk = list.slice(at, at + n); at += n;
    chunk.sort((a, b) => ({ animal: 0, person: 0, vehicle: 1 }[a.kind] ?? 2) - ({ animal: 0, person: 0, vehicle: 1 }[b.kind] ?? 2) || b.h - a.h);
    const hero = chunk[0];
    let spec = null;
    for (let tries = 0; tries < 5 && chunk.length >= 2; tries++) {
      const cast = chunk.slice(1).map((c) => c.src);
      const s = { id: 'fdl-' + slugOf(hero.src), names: { en: hero.src }, setting, variant: v % 3, hero: hero.src, cast, level: cast.length + 1 <= 6 ? 1 : cast.length + 1 >= 10 ? 3 : 2, mirror: !!(v % 2), seed: 'fdl' + k };
      try { X.layoutScene(s); spec = s; break; } catch (e) { why[e.message.replace(/^[^:]+: /, '').replace(/[a-z]+ bw( \d)?\/\S+/gi, '#').slice(0, 44)] = (why[e.message.replace(/^[^:]+: /, '').replace(/[a-z]+ bw( \d)?\/\S+/gi, '#').slice(0, 44)] || 0) + 1; const bad = chunk.pop(); if (bad) { dropped++; left.push([setting, bad]); } }
    }
    if (spec) out.push(spec);
    v++;
  }
 }
}
fs.writeFileSync(path.join(__dirname, '..', 'data', 'fl', 'fd-scenes.json'), JSON.stringify(out));
const placed = new Set(out.flatMap((s) => [s.hero, ...s.cast]));
console.log(`${out.length} scenes, ${placed.size} drawings placed, ${free.length - placed.size} left out`);
console.log(Object.entries(why).sort((a, b) => b[1] - a[1]).slice(0, 8));
const lv = {}; for (const s of out) lv[s.level] = (lv[s.level] || 0) + 1; console.log(lv);
