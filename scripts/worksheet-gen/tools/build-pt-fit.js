#!/usr/bin/env node
/**
 * build-pt-fit.js — data/fl/pt-fit.json: which library pictures can stand in the scenes of the two Picture Tracing faces
 * that take any picture (first-tracing K-419, look-then-trace K-420; lib/ptx.js ART_FACES). Flagship visual check
 * 2026-11-08: the picker offered every picture of the level's bands, and a teacher's pick that could not stand in the
 * copy's scene was refused ("this picture does not fit this scene", 477 of 3,960 picks in English).
 *
 * For each face, level and library picture of that level's pool, it reskins every scene of the face's maker units at that
 * level (lib/ptx.js makerUnits, reskin) and composes it (the same composeSceneSync + checkMetrics test K-418 uses):
 *   fit  { "<mode>|<level>": { "<picture key>": [indexes into units[] of the scenes it fits] } } — only pictures that fit
 *        SOME scene but not every one are listed; a picture that fits none is in refused, one that fits all is absent
 *   refused { "<mode>|<level>": [picture keys that fit no scene] }
 * K-418 leaves refused pictures out of the picker, and draws a teacher's pick on the first scene from its copy on that
 * the picture fits (never refusing a picture the picker offered).
 *   node scripts/worksheet-gen/tools/build-pt-fit.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const WG = path.join(__dirname, '..');
const OUT = path.join(WG, 'data', 'fl', 'pt-fit.json');
const PTX = require(path.join(WG, 'lib', 'ptx.js'));
const { composeSceneSync } = require(path.join(WG, 'lib', 'pt-scene.js'));
const { checkMetrics } = require(path.join(WG, 'types', 'k', 'K-418-picture-tracing.js'));
const { sceneFor } = require(path.join(WG, 'data', 'b9', 'face-scenes.js'));

const FACES = [['K-419', 'first-tracing'], ['K-420', 'look-then-trace']];
const out = { note: 'tools/build-pt-fit.js — do not edit', fit: {}, refused: {} };
let tried = 0;
const sharp = require(path.join(WG, '..', '..', 'node_modules', 'sharp'));
/**
 * the porthole (every first-tracing scene draws its picture inside a round frame, inner ring r 308 round 338,360): a
 * picture whose drawing crosses the frame does not fit (flagship visual check 2026-11-08: a ladle's handle ran through the
 * rim on the stingray scene, whose big square box puts the corners outside the circle). The picture's ink is measured
 * once — its dark and grey-guide pixels as fractions of its placed box — and mapped into every scene's placed box.
 */
const PORT = { cx: 338, cy: 360, r: 300 };
const inkCache = new Map();
async function inkOf(key) {
  if (inkCache.has(key)) return inkCache.get(key);
  const sc = PTX.reskin(sceneFor('first-tracing', {}), key, []);
  const o = composeSceneSync({ ...sc, decor: [] });
  const p = (o.placed.find((q) => q.src === key) || o.placed[0]).box;
  const { data, info } = await sharp(Buffer.from(o.svg)).flatten({ background: '#fff' }).greyscale().raw().toBuffer({ resolveWithObject: true });
  const sx = info.width / o.W, sy = info.height / o.H, pts = [];
  for (let y = 0; y < info.height; y += 2) for (let x = 0; x < info.width; x += 2) {
    if (data[y * info.width + x] > 220) continue;
    pts.push([(x / sx - p.x0) / (p.x1 - p.x0), (y / sy - p.y0) / (p.y1 - p.y0)]);
  }
  inkCache.set(key, pts);
  return pts;
}
const crossesPorthole = (pts, box) => pts.some(([fx, fy]) => Math.hypot(box.x0 + fx * (box.x1 - box.x0) - PORT.cx, box.y0 + fy * (box.y1 - box.y0) - PORT.cy) > PORT.r);
(async () => {
for (const [face, mode] of FACES) {
  for (const level of [1, 2, 3]) {
    const units = PTX.makerUnits(face, level);
    // unit null = the face's published page (its own scene, as K-418 builds it)
    const scenes = units.map((u) => (u ? PTX.resolvePtx(u, {}).scene : sceneFor(mode, {})));
    const k = mode + '|' + level, fit = {}, refused = [];
    for (const key of PTX.artPool(mode, level)) {
      const ok = [];
      const pts = mode === 'first-tracing' ? await inkOf(key) : null;
      scenes.forEach((sc, i) => {
        if (!sc) return;
        tried++;
        const s2 = PTX.reskin(sc, key, []), o = composeSceneSync(s2);
        if (o.problems.length || checkMetrics(o.metrics, {}).length) return;
        if (pts) { const pl = o.placed.find((q) => q.src === key); if (pl && crossesPorthole(pts, pl.box)) return; }
        ok.push(i);
      });
      if (!ok.length) refused.push(key);
      else if (ok.length < scenes.filter(Boolean).length) fit[key] = ok;
    }
    out.fit[k] = fit; out.refused[k] = refused.sort();
    console.log(`${face} ${mode} L${level}: ${scenes.filter(Boolean).length} scenes, ${PTX.artPool(mode, level).length} pictures, ${refused.length} fit none, ${Object.keys(fit).length} fit some`);
  }
}
// Two Pictures to Trace (K-599, types/_shared/flagship-new.js two-trace): a picture that cannot be drawn at its level's
// size on half a page (under the band's floor, e.g. a wide picture at PreK) with any partner → refused['two-trace|<level>']
{
  const P = require(path.join(WG, 'lib', 'pt-faces.js'));
  for (const level of [1, 2, 3]) {
    const L = P.LEVEL[level], all = P.drawings('K-599', level), H = 700, half = Math.floor(H / 2), bad = [];
    // the page takes its partners from the list WITHOUT the refused pictures, so the partners shift with every refusal:
    // measured again on the narrowed list until no picture more is refused
    for (let round = 0; round < 6; round++) {
      const list = all.filter((k) => !bad.includes(k)), more = [];
      for (const src of list) {
        const at = list.indexOf(src);
        let ok = false;
        for (let j = 0; j < 12 && !ok; j++) {
          const other = list[(at + 37 + j) % list.length]; if (other === src) continue;
          tried++;
          try { P.composeFit({ W: 675, H, band: L.band, style: L.style, occlusion: false, decor: [], items: [{ src, x: 337, y: Math.round(half / 2), anchor: 'centre', fitBox: [600, half - 36], start: 'top' }, { src: other, x: 337, y: half + Math.round(half / 2), anchor: 'centre', fitBox: [600, half - 36], start: 'top' }] }, L.band); ok = true; } catch (e) { /* the next partner */ }
        }
        if (!ok) more.push(src);
      }
      if (!more.length) break;
      bad.push(...more);
    }
    const list = all;
    out.refused['two-trace|' + level] = bad.sort();
    console.log(`K-599 two-trace L${level}: ${list.length} pictures, ${bad.length} cannot be drawn at the level's size`);
  }
}
const text = JSON.stringify(out) + '\n';
if (process.argv.includes('--check')) {
  if (!fs.existsSync(OUT) || fs.readFileSync(OUT, 'utf8') !== text) { console.error('data/fl/pt-fit.json is stale — node scripts/worksheet-gen/tools/build-pt-fit.js'); process.exit(1); }
  console.log('pt-fit current');
} else { fs.writeFileSync(OUT, text); console.log(`wrote ${path.relative(process.cwd(), OUT)} (${tried} compositions, ${(text.length / 1024).toFixed(0)} KB)`); }
})();
