#!/usr/bin/env node
/**
 * htd-ring-clear.js — is the place a "draw it in the picture" page rings EMPTY? (Level Set 2026-10-11; the visual review found
 * level-1 rings on a stepping stone, a rug edge, a path). Each original scene (data/fd/<fdx id>.json) is rendered with its hero
 * removed and the share of ink inside the ring ellipse (hero box + 10 px at the page width) is measured. Written to
 * data/htdx/ring-clear.json (slug → ink share); htd-allocate.js lets only rings under 2 % carry level 1.
 *   node tools/level-set/htd-ring-clear.js
 */
'use strict';
const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const ROOT = path.join(__dirname, '..', '..');
const { UNITS } = require(path.join(ROOT, 'data', 'htdx', 'units.js'));
const FD = require(path.join(ROOT, 'lib', 'fd-scene.js'));
(async () => {
  const out = {};
  for (const u of UNITS.filter((x) => x.fdxScene)) {
    const scene = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'fd', u.fdxScene + '.json'), 'utf8'));
    const hero = scene.items.find((l) => l.idx === u.fdxHero), w = 640, h = Math.round(w * scene.h / scene.w), s = w / scene.w;
    let svg = FD.renderPanel(scene, [{ kind: 'remove', item: u.fdxHero }], { mode: 'line', width: w, frame: false, clipId: 'rc' });
    if (!/^<svg[^>]*xmlns=/.test(svg)) svg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    const { data, info } = await sharp(Buffer.from(svg)).flatten({ background: '#fff' }).greyscale().raw().toBuffer({ resolveWithObject: true });
    const [x0, y0, x1, y1] = hero.bbox, cx = (x0 + x1) / 2 * s * info.width / w, cy = (y0 + y1) / 2 * s * info.height / h;
    const rx = ((x1 - x0) / 2 * s + 10) * info.width / w, ry = ((y1 - y0) / 2 * s + 10) * info.height / h;
    let n = 0, ink = 0;
    for (let y = Math.max(0, Math.floor(cy - ry)); y < Math.min(info.height, cy + ry); y++) for (let x = Math.max(0, Math.floor(cx - rx)); x < Math.min(info.width, cx + rx); x++) {
      if (((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 > 1) continue; n++; if (data[y * info.width + x] < 140) ink++;
    }
    out[u.slug] = +(ink / Math.max(1, n)).toFixed(4);
  }
  fs.writeFileSync(path.join(ROOT, 'data', 'htdx', 'ring-clear.json'), JSON.stringify(out, null, 1) + '\n');
  const v = Object.entries(out).sort((a, b) => a[1] - b[1]);
  console.log(v.length, 'under 2%:', v.filter((x) => x[1] < 0.02).length);
  for (const k of ['lsx-sea-life-bw-2-snail', 'lsx-animals-bw-3-cat-2', 'lsx-animals-bw-5-bird', 'lsx-animals-bw-5-panda', 'lsx-animals-bw-3-deer']) console.log(k, out[k]);
})().catch((e) => { console.error(e); process.exit(1); });
