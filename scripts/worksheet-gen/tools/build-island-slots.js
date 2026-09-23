#!/usr/bin/env node
/**
 * build-island-slots.js — writes ISLE_1.slots into data/b5/island.js (between the SLOTS
 * markers) for the G1-379 `maps` family (design G1-379-maps.md §2 "NEW primitives/island-map.js").
 *
 *   node scripts/worksheet-gen/tools/build-island-slots.js [--check]
 *
 * For every SIZE (symbol px on an island drawn w px wide) and every footpath CONFIG
 * (none / P1 / P2 / P1P2) it lays a STAGGERED lattice of symbol centres at pitch 1.18 x the
 * symbol + 9 px (two neighbouring boxes, in a row or across rows, keep >= 8 px — 1.18 x at 44 px —
 * gap — the gate's pairwise rule) and keeps a centre iff
 *   - the centre and all four corners of its box are inside the coast, the centre >= 0.64 x
 *     symbol from the coast and every corner >= 2 units inside it;
 *   - its box clears every DRAWN band (river 18+3, road 16+3, the config's footpaths, the
 *     spring) by >= 6.5 px (MEASURED deviation from the design's 9 + 0.59 x symbol, which left
 *     a 44 px box 2.5 px from the river band — the gate's rule is 6 px);
 *   - its box keeps >= 9 px from the DRAWN bridge's box (rails +-21 units along the path with
 *     their flares; the design's "30 units from the slot" measured 5.3-6.7 px, under the 8 px rule);
 * and keeps the best of a 3-unit offset sweep (max count, ties -> the first). --check
 * recomputes and exits 1 if the committed slots differ (a geometry edit without a rebuild).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const IM = require('../primitives/island-map.js');

const FILE = path.join(__dirname, '..', 'data', 'b5', 'island.js');
/** [symPx, islandW]: base d2/d3 (44 on 615), base d1 (48 on 615), F5 (40 on 533). */
const SIZES = [[44, 615], [48, 615], [40, 533]];
const CONFIGS = { none: [], P1: ['P1'], P2: ['P2'], P1P2: ['P1', 'P2'] };

function slotsFor(isle, symPx, w, paths) {
  const g = IM.islandGeometry(isle);
  const scale = w / isle.view.w;
  const s = symPx / scale, h = s / 2;
  const pitch = s + 9 / scale;   // the symbol + 9 px (the gate asks >= 8 px between boxes; 1.18 x at 44 px)
  // [polyline, drawn half-width] — the river band 18 + its 1.5 edges, the road 16 + its 1.5 lines, a footpath's 2 px dash
  const lines = [[g.river, (isle.river.band + 3) / 2], [g.road, (isle.road.width + 3) / 2], ...paths.map((p) => [g.paths[p], 1])];
  const bridges = [g.crossings.A, ...paths.map((p) => g.crossings[isle.footpaths[p].bridge])];
  // MEASURED deviation (the design's 9 + 0.59 x symbol = 36 units left a 44 px box 2.5 px from the river band;
  // the gate's rule is "no symbol within 6 px of a band"): the box edge must clear the DRAWN band by 6.5 px
  const clearOf = (half) => h + half + 6.5 / scale;   // (the spring: a disc, centre distance)
  const okAt = (x, y) => {
    const c = [x, y];
    if (!IM.pointInPoly(c, g.coast) || IM.distToPolyline(c, g.coast, true) < 0.64 * s) return false;
    for (const q of [[x - h, y - h], [x + h, y - h], [x - h, y + h], [x + h, y + h]]) if (!IM.pointInPoly(q, g.coast) || IM.distToPolyline(q, g.coast, true) < 2) return false;
    // the BOX (not its centre) against the band: a diagonal band meets a box corner first
    const boxDist = (p) => Math.hypot(Math.max(x - h - p[0], 0, p[0] - x - h), Math.max(y - h - p[1], 0, p[1] - y - h));
    for (const [l, half] of lines) {
      let d = Infinity;
      for (let i = 0; i < l.length - 1; i++) for (let k = 0; k <= 4; k++) d = Math.min(d, boxDist([l[i][0] + (l[i + 1][0] - l[i][0]) * k / 4, l[i][1] + (l[i + 1][1] - l[i][1]) * k / 4]));
      if (d < half + 6.5 / scale) return false;
    }
    const sp = isle.river.pts[0];
    if (Math.hypot(x - sp[0], y - sp[1]) < clearOf(isle.river.springR + 1)) return false;
    for (const b of bridges) {
      // the drawn bridge's own box (rails +-21 along the path, +-(halfW + 7) across it, rotated) vs the symbol box: >= 9 px
      const halfW = b === g.crossings.A ? isle.road.width / 2 + 3 : 6;
      const cs = Math.cos(b.angle), sn = Math.sin(b.angle);
      const pts = [[-21, -halfW - 7], [21, -halfW - 7], [21, halfW + 7], [-21, halfW + 7]].map(([u, v]) => [b.x + u * cs - v * sn, b.y + u * sn + v * cs]);
      const bx0 = Math.min(...pts.map((p) => p[0])), bx1 = Math.max(...pts.map((p) => p[0])), by0 = Math.min(...pts.map((p) => p[1])), by1 = Math.max(...pts.map((p) => p[1]));
      const gap = Math.max(bx0 - (x + h), (x - h) - bx1, by0 - (y + h), (y - h) - by1);
      if (gap < 9 / scale) return false;
    }
    return true;
  };
  let best = [];
  for (let ox = 0; ox < pitch; ox += 3) for (let oy = 0; oy < pitch; oy += 3) {
    const got = [];
    for (let r = 0, y = oy; y < isle.view.h; r++, y += pitch) for (let x = ox + (r % 2 ? pitch / 2 : 0); x < isle.view.w; x += pitch) if (okAt(x, y)) got.push([+x.toFixed(1), +y.toFixed(1)]);
    if (got.length > best.length) best = got;
  }
  return best;
}

function build(isle) {
  const out = {};
  for (const [px, w] of SIZES) {
    const k = IM.slotKey(px, w);
    out[k] = {};
    for (const [name, paths] of Object.entries(CONFIGS)) out[k][name] = slotsFor(isle, px, w, paths);
  }
  return out;
}

function main() {
  const isle = { ...IM.ISLE_1, slots: undefined };
  const slots = build(isle);
  for (const [k, v] of Object.entries(slots)) console.log(`${k}: ` + Object.entries(v).map(([c, a]) => `${c} ${a.length}`).join(' · '));
  const src = fs.readFileSync(FILE, 'utf8');
  const block = `/* SLOTS:BEGIN — generated by tools/build-island-slots.js; do not edit */\n  slots: ${JSON.stringify(slots)},\n  /* SLOTS:END */`;
  const next = src.replace(/\/\* SLOTS:BEGIN[\s\S]*?\/\* SLOTS:END \*\//, block);
  if (process.argv.includes('--check')) {
    const same = JSON.stringify(IM.ISLE_1.slots) === JSON.stringify(slots);
    console.log(same ? 'PASS (committed slots are current)' : 'FAIL (the committed slots differ from the geometry — rebuild)');
    return same;
  }
  fs.writeFileSync(FILE, next);
  console.log('wrote ' + FILE);
  return true;
}

if (require.main === module) process.exit(main() ? 0 : 1);
module.exports = { build, slotsFor, SIZES, CONFIGS };
