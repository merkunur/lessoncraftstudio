#!/usr/bin/env node
/**
 * fdx-diversify.js — keeps the Find the Differences Level Set scenes apart (operator 2026-10-10: "the scenes shouldn't be
 * similar"). For every pair of scenes whose casts overlap past qa/fdx-distinct.js MAX_JACCARD (sky fillers excluded),
 * one shared drawing of the LATER scene is swapped for a catalogue drawing of the same kind and place that belongs in its
 * setting and that the whole set uses least; repeated until no pair overlaps. Writes data/fdx/cast-swaps.json
 * { sceneId: { fromSrc: toSrc } } which data/fdx/scenes.js applies; every swapped scene must still lay out, and every
 * swapped scene is READ again on a preview sheet before it is kept.
 *   node tools/fdx-diversify.js
 */
'use strict';
const fs = require('fs'); const path = require('path');
const OUT = path.join(__dirname, '..', 'data', 'fdx', 'cast-swaps.json');
fs.writeFileSync(OUT, '{}');   // start from the authored casts
delete require.cache[require.resolve('../data/fdx/scenes.js')];
const { SCENES } = require('../data/fdx/scenes.js');
const { CATALOG } = require('../data/fdx/catalog.js');
const { TAGS } = require('../lib/fdx-scenery.js');
const { layoutScene } = require('../lib/fdx-layout.js');
const MAX_J = 0.30, FILLER = /\/(sun|cloud|cloudy|moon|star|sky|snowflake)$/;
const srcOf = (c) => (typeof c === 'string' ? c : c.src);
const castSet = (s) => new Set(s.cast.map(srcOf).filter((c) => !FILLER.test(c)));
const heroes = new Set(SCENES.map((s) => srcOf(s.hero)));
const use = new Map();
for (const s of SCENES) for (const c of s.cast) use.set(srcOf(c), (use.get(srcOf(c)) || 0) + 1);
const swaps = {};
const ORIG = new Map(SCENES.map((s) => [s.id, s.cast.map(srcOf)]));
// a pair is too alike when it shares TWO or more drawings past MAX_J (one shared tree in two small scenes of different
// settings does not make them alike)
const jac = (a, b) => { const i = [...a].filter((x) => b.has(x)).length; return i < 2 ? 0 : i / (a.size + b.size - i || 1); };
let changed = true, rounds = 0;
while (changed && rounds++ < 40) {
  changed = false;
  for (let i = 0; i < SCENES.length; i++) for (let j = i + 1; j < SCENES.length; j++) {
    const A = castSet(SCENES[i]), Bs = SCENES[j], B = castSet(Bs);
    if (jac(A, B) <= MAX_J) continue;
    const shared = [...B].filter((x) => A.has(x)).sort((x, y) => (use.get(y) || 0) - (use.get(x) || 0));
    let done = false;
    for (const from of shared) {
      const c = CATALOG.get(from);
      const tags = TAGS[Bs.setting] || [];
      const inScene = new Set(Bs.cast.map(srcOf).concat(srcOf(Bs.hero)));
      // never a second drawing of one word in a scene (two koalas, two signposts), never a lone flag
      const word = (x) => x.split('/').pop().replace(/_\d+$/, '').replace(/s$/, '');
      const words = new Set([...inScene].filter((x) => x !== from).map(word));
      const cands = [...CATALOG.values()].filter((o) => !o.refused && !o.noword && !o.thin && !inScene.has(o.src) && !words.has(word(o.src)) && !/flag/.test(o.src) && !heroes.has(o.src) && !FILLER.test(o.src)
        && o.kind === c.kind && o.places[0] === c.places[0] && o.tags.some((t) => tags.includes(t)) && Math.abs(o.h - c.h) <= 0.4 * c.h)
        .sort((x, y) => (use.get(x.src) || 0) - (use.get(y.src) || 0) || (x.src < y.src ? -1 : 1));
      for (const to of cands) {
        const k = Bs.cast.findIndex((x) => srcOf(x) === from);
        const prev = Bs.cast[k];
        Bs.cast[k] = typeof prev === 'string' ? to.src : { ...prev, src: to.src };
        try { layoutScene(Bs); } catch (e) { Bs.cast[k] = prev; continue; }
        use.set(from, (use.get(from) || 1) - 1); use.set(to.src, (use.get(to.src) || 0) + 1);
        done = true; changed = true; break;
      }
      if (done) break;
    }
  }
}
// the swaps: authored drawing → final drawing, by position in the cast
for (const sc of SCENES) { const o = ORIG.get(sc.id); sc.cast.forEach((c, k) => { if (srcOf(c) !== o[k]) (swaps[sc.id] = swaps[sc.id] || {})[o[k]] = srcOf(c); }); }
fs.writeFileSync(OUT, JSON.stringify(swaps, null, 1));
let left = 0;
for (let i = 0; i < SCENES.length; i++) for (let j = i + 1; j < SCENES.length; j++) if (jac(castSet(SCENES[i]), castSet(SCENES[j])) > MAX_J) { left++; console.log('  still', SCENES[i].id, SCENES[j].id); }
console.log(`${Object.keys(swaps).length} scenes swapped (${Object.values(swaps).reduce((a, m) => a + Object.keys(m).length, 0)} drawings), ${left} pairs still over ${MAX_J}, ${rounds} rounds`);
