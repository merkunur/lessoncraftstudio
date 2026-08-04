#!/usr/bin/env node
/* =====================================================================
   measure-jar-sprites.js — the packing constants for Estimation Jar
   ---------------------------------------------------------------------
   Produces `pack: { r70, cy, rotMax }` for every set in
   `mini tools/estimation-jar-sets.json`, measured from the alpha channel
   of the shipped sprite.

   WHY THIS EXISTS. The jar now draws exactly N real objects, so the pile
   height is the quantity. But the sprite canvases are all square while
   the INK inside them is not: measured, effective coverage spans ~3.3x
   across the eleven sets. A single global object size would therefore
   make a jar of seashells read three times fuller than a jar of
   snowflakes at the SAME N — the exact dishonesty this rebuild exists to
   remove, reintroduced one layer down.

   THE THREE CONSTANTS
     r70    radius, as a fraction of the canvas, of the disc about the
            alpha centroid containing 70% of the alpha mass. This is the
            PACKING radius, not the bounding box: it deliberately
            discounts thin appendages (a cherry stem, a lollipop stick)
            because those SHOULD be allowed to overlap a neighbour.
     cy     alpha centroid Y as a fraction of the canvas. Objects are
            drawn at `-S*cy`, so the visual mass lands on the packed
            point rather than the canvas centre. Without it a lollipop's
            candy floats a sixth of a canvas above where it belongs.
     rotMax rotation half-range in degrees. The sprites carry BAKED
            directional light, so free rotation lights the pile from
            every direction at once and reads as stickers. Radially
            symmetric sets tolerate more.

   ⚠ THIS SCRIPT IS THE GROUND TRUTH AND IT MUST STAY RUNNABLE.
   `verify-estimation-jar.js` re-derives these numbers and fails when the
   JSON disagrees, so a hand-edited constant cannot survive. Re-run this
   whenever a set is added.

   Usage:  node scripts/measure-jar-sprites.js [--json] [--write]
   ===================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');
const sharp = require(path.join(__dirname, '..', 'frontend', 'node_modules', 'sharp'));

const ROOT = path.join(__dirname, '..');
/* EJ_DATA_DIR so verify-estimation-jar.js can point this at the sets
   file UNDER TEST — measuring a mutated constant against the real
   sprite, rather than against itself. */
const SETS = path.join(process.env.EJ_DATA_DIR || path.join(ROOT, 'mini tools'), 'estimation-jar-sets.json');
const WEBP = path.join(ROOT, 'image-library-webp', 'themes');

/* Radially symmetric sets tolerate a wider rotation range: with no
   up-direction of their own, a larger spin still reads as the same
   object. Everything else is capped so the baked highlight stays
   coherently up-left across the pile. */
const SYMMETRIC = new Set(['star', 'snowflake', 'seashell', 'blueberry', 'circle', 'ball']);
const ROT_ASYM = 22;
const ROT_SYM = 40;

/* The alpha floor. Children's illustrations carry soft antialiased
   edges and occasional near-transparent glow; counting those as mass
   drags the centroid toward the canvas centre and inflates r70. 24/255
   keeps genuine soft edges and discards the halo. */
const ALPHA_FLOOR = 24;

async function measureOne(file) {
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const W = info.width, H = info.height, ch = info.channels;
  let mass = 0, sx = 0, sy = 0, inked = 0;
  let minX = W, maxX = -1, minY = H, maxY = -1;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const a = data[(y * W + x) * ch + (ch - 1)];
      if (a < ALPHA_FLOOR) continue;
      const w = a / 255;
      mass += w; sx += x * w; sy += y * w; inked++;
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
  }
  if (!mass) throw new Error('no alpha mass in ' + file);

  const cx = sx / mass, cy = sy / mass;

  /* r70 — walk a radial histogram out from the centroid until 70% of the
     mass is enclosed. Histogram rather than a sort: 1M pixels sorted by
     radius is needless when a 1px-resolution bucket is exact enough for
     a fraction we then round to three places. */
  const maxR = Math.ceil(Math.hypot(Math.max(cx, W - cx), Math.max(cy, H - cy)));
  const hist = new Float64Array(maxR + 2);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const a = data[(y * W + x) * ch + (ch - 1)];
      if (a < ALPHA_FLOOR) continue;
      hist[Math.round(Math.hypot(x - cx, y - cy))] += a / 255;
    }
  }
  let acc = 0, r70 = maxR;
  for (let r = 0; r < hist.length; r++) {
    acc += hist[r];
    if (acc >= mass * 0.70) { r70 = r; break; }
  }

  return {
    w: W, h: H,
    coverage: inked / (W * H),
    cx: cx / W,
    cy: cy / H,
    r70: r70 / W,
    inkW: (maxX - minX + 1) / W,
    inkH: (maxY - minY + 1) / H
  };
}

async function main() {
  const asJson = process.argv.includes('--json');
  const write = process.argv.includes('--write');
  const cfg = JSON.parse(fs.readFileSync(SETS, 'utf8'));
  const rows = [];

  for (const s of cfg.sets) {
    const file = path.join(WEBP, s.imageDir, s.imageFile + '@2x.webp');
    if (!fs.existsSync(file)) {
      console.error('MISSING  ' + s.id + '  ' + file);
      process.exitCode = 1;
      continue;
    }
    const m = await measureOne(file);
    rows.push({
      id: s.id,
      noun: s.noun,
      r70: +m.r70.toFixed(3),
      cy: +m.cy.toFixed(3),
      cx: +m.cx.toFixed(3),
      rotMax: SYMMETRIC.has(s.noun) ? ROT_SYM : ROT_ASYM,
      coverage: +m.coverage.toFixed(3),
      inkAspect: +(m.inkW / m.inkH).toFixed(2),
      px: m.w
    });
  }

  if (asJson) { console.log(JSON.stringify(rows, null, 2)); return; }

  console.log('set          px    cover  inkAsp   cx     cy    r70   rotMax');
  console.log('--------------------------------------------------------------');
  for (const r of rows) {
    console.log(
      r.id.padEnd(12) + String(r.px).padEnd(6) +
      r.coverage.toFixed(3).padEnd(7) + String(r.inkAspect).padEnd(8) +
      r.cx.toFixed(3).padEnd(7) + r.cy.toFixed(3).padEnd(7) +
      r.r70.toFixed(3).padEnd(7) + r.rotMax);
  }

  const cov = rows.map(r => r.coverage);
  const r70s = rows.map(r => r.r70);
  const cys = rows.map(r => r.cy);
  console.log('--------------------------------------------------------------');
  console.log('coverage spread  ' + (Math.max(...cov) / Math.min(...cov)).toFixed(2) + 'x'
    + '   (min ' + Math.min(...cov).toFixed(3) + ' max ' + Math.max(...cov).toFixed(3) + ')');
  console.log('r70 spread       ' + (Math.max(...r70s) / Math.min(...r70s)).toFixed(2) + 'x'
    + '   (min ' + Math.min(...r70s).toFixed(3) + ' max ' + Math.max(...r70s).toFixed(3) + ')');
  console.log('cy range         ' + Math.min(...cys).toFixed(3) + ' .. ' + Math.max(...cys).toFixed(3));
  console.log('cx range         ' + Math.min(...rows.map(r => r.cx)).toFixed(3)
    + ' .. ' + Math.max(...rows.map(r => r.cx)).toFixed(3)
    + '   (if this is tight, the draw call needs no cx term)');

  if (write) {
    for (const s of cfg.sets) {
      const r = rows.find(x => x.id === s.id);
      if (r) s.pack = { r70: r.r70, cy: r.cy, rotMax: r.rotMax };
    }
    fs.writeFileSync(SETS, JSON.stringify(cfg, null, 2) + '\n');
    console.log('\nwrote pack constants into ' + SETS);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
