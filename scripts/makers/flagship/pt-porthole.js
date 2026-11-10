#!/usr/bin/env node
/**
 * flagship/pt-porthole.js: Picture Tracing first-tracing pages (K-419, the porthole scene) whose picture crosses the round
 * frame (flagship visual check 2026-11-08: read on the sheets, a ladle's handle ran through the porthole's rim and its bowl
 * sat on the ring). For every library picture of the face's pool at each level, it composes the porthole page with that
 * picture (lib/ptx.js reskin + lib/pt-scene.js composeSceneSync, as K-418 does), renders it once WITHOUT the frame and
 * finds the picture's ink farther than R units from the porthole's centre (338, 360). A picture with any such ink is listed
 * (data/fl/pt-porthole.json { refused: { "<level>": [keys] } }), and K-418 leaves it out of that face's picker.
 *   node scripts/makers/flagship/pt-porthole.js [--r=296] [--poison]
 * --poison: a picture moved 120 units right must be caught.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const WG = path.join(REPO, 'scripts', 'worksheet-gen');
const sharp = require(path.join(REPO, 'node_modules', 'sharp'));
const PTX = require(path.join(WG, 'lib', 'ptx.js'));
const { composeSceneSync } = require(path.join(WG, 'lib', 'pt-scene.js'));
const { sceneFor } = require(path.join(WG, 'data', 'b9', 'face-scenes.js'));
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=')[1] : d; };
const R = +arg('r', 296), CX = 338, CY = 360;

async function outside(scene) {
  const bare = { ...scene, decor: [] };   // the picture alone: the frame's own rings are not the picture's ink
  const o = composeSceneSync(bare);
  const { data, info } = await sharp(Buffer.from(o.svg)).flatten({ background: '#fff' }).greyscale().raw().toBuffer({ resolveWithObject: true });
  const sx = info.width / o.W, sy = info.height / o.H;
  let n = 0;
  for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
    if (data[y * info.width + x] > 220) continue;   // the grey dashed guides are the picture too
    const ux = x / sx, uy = y / sy;
    if (Math.hypot(ux - CX, uy - CY) > R) n++;
  }
  return n;
}

(async () => {
  const base = sceneFor('first-tracing', {});
  if (process.argv.includes('--poison')) {
    const s = PTX.reskin(base, 'animals bw 5/bat', []);
    const moved = { ...s, items: s.items.map((it) => ({ ...it, x: it.x + 120 })) };
    const a = await outside(s), b = await outside(moved);
    console.log(`poison: in place ${a} px outside, moved ${b} px outside`);
    process.exit(a === 0 && b > 50 ? 0 : 1);
  }
  const out = { note: 'scripts/makers/flagship/pt-porthole.js — do not edit', r: R, refused: {} };
  for (const level of [1, 2, 3]) {
    const units = PTX.makerUnits('K-419', level);
    const scenes = units.map((u) => (u ? PTX.resolvePtx(u, {}).scene : base)).filter((s) => (s.decor || []).some((d) => d.m === 'circle' && d.a && d.a[2] > 250));
    const bad = [];
    for (const key of PTX.artPool('first-tracing', level)) {
      let hit = 0;
      for (const sc of scenes.slice(0, 1)) hit += await outside(PTX.reskin(sc, key, []));
      if (hit > 30) bad.push(key);
    }
    out.refused[level] = bad.sort();
    console.log(`first-tracing L${level}: ${scenes.length} porthole scenes, ${PTX.artPool('first-tracing', level).length} pictures, ${bad.length} cross the frame`);
  }
  fs.writeFileSync(path.join(WG, 'data', 'fl', 'pt-porthole.json'), JSON.stringify(out) + '\n');
})();
