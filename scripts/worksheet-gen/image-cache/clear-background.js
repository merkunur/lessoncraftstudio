/**
 * clear-background.js — a library picture saved WITHOUT transparency (an opaque white square around the drawing) gets
 * its background made transparent: the near-white pixels connected to the picture's border become alpha 0, with a soft
 * one-pixel fringe. Enclosed white (a seal's body inside its outline) stays white.
 *
 * Found 2026-11-02 by the makers' collision gate: 3 of 2,837 pictures (animals bw/seal, birds/flamingo,
 * household bw/toilet) printed a white box on the cream cards, and the box — not the drawing — met the unit squares of
 * a measuring page. Run after derive.js (derive.js calls it); idempotent: a picture that already has transparent
 * corners is left alone.
 *
 * Usage: node scripts/worksheet-gen/image-cache/clear-background.js [--check]   (--check: list, change nothing)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const CACHE = path.join(__dirname, '..', 'cache');
const DIRS = [path.join(CACHE, 'themes'), path.join(CACHE, 'themes-512')];
sharp.cache(false);   // Windows: a cached handle keeps the file open, and the write back fails
const WHITE = 232;   // a pixel this light in all three channels is background when it touches the border

/** is the picture opaque at all four corners? (a transparent library picture never is) */
function opaqueCorners(data, W, H) {
  const a = (x, y) => data[(y * W + x) * 4 + 3];
  return a(0, 0) > 8 && a(W - 1, 0) > 8 && a(0, H - 1) > 8 && a(W - 1, H - 1) > 8;
}

/** flood the near-white region connected to the border to alpha 0; the pixels next to it get a half alpha */
function clear(data, W, H) {
  const light = (i) => data[i * 4] >= WHITE && data[i * 4 + 1] >= WHITE && data[i * 4 + 2] >= WHITE;
  const seen = new Uint8Array(W * H);
  const stack = [];
  for (let x = 0; x < W; x++) stack.push(x, (H - 1) * W + x);
  for (let y = 0; y < H; y++) stack.push(y * W, y * W + W - 1);
  let cleared = 0;
  while (stack.length) {
    const i = stack.pop();
    if (seen[i] || !light(i)) continue;
    seen[i] = 1; data[i * 4 + 3] = 0; cleared++;
    const x = i % W, y = (i / W) | 0;
    if (x > 0) stack.push(i - 1); if (x < W - 1) stack.push(i + 1);
    if (y > 0) stack.push(i - W); if (y < H - 1) stack.push(i + W);
  }
  // the fringe: an opaque light pixel touching the cleared region keeps half its alpha (no white halo on the cream)
  for (let i = 0; i < W * H; i++) {
    if (seen[i] || data[i * 4 + 3] === 0) continue;
    const x = i % W, y = (i / W) | 0;
    const near = (x > 0 && seen[i - 1]) || (x < W - 1 && seen[i + 1]) || (y > 0 && seen[i - W]) || (y < H - 1 && seen[i + W]);
    if (near && data[i * 4] > 200 && data[i * 4 + 1] > 200 && data[i * 4 + 2] > 200) data[i * 4 + 3] = 128;
  }
  return cleared / (W * H);
}

async function clearFile(file, check) {
  const { data, info } = await sharp(fs.readFileSync(file)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  if (!opaqueCorners(data, info.width, info.height)) return null;
  if (check) return 'opaque';
  const frac = clear(data, info.width, info.height);
  if (frac < 0.05) throw new Error(`clear-background: ${file} — its border is not a light background (${(frac * 100).toFixed(1)} % cleared); fix the picture by hand`);
  const out = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).webp({ quality: 88, alphaQuality: 95 }).toBuffer();
  fs.writeFileSync(file, out);
  return `${(frac * 100).toFixed(0)} % cleared`;
}

async function clearAll({ check = false } = {}) {
  const done = [];
  for (const root of DIRS) {
    if (!fs.existsSync(root)) continue;
    for (const theme of fs.readdirSync(root)) {
      const dir = path.join(root, theme);
      if (!fs.statSync(dir).isDirectory()) continue;
      for (const f of fs.readdirSync(dir)) {
        if (!/\.(webp|png)$/i.test(f)) continue;
        const r = await clearFile(path.join(dir, f), check);
        if (r) done.push(`${path.relative(CACHE, path.join(dir, f))}: ${r}`);
      }
    }
  }
  return done;
}

module.exports = { clearAll, clear, opaqueCorners };

if (require.main === module) {
  clearAll({ check: process.argv.includes('--check') }).then((d) => {
    console.log(d.length ? d.join('\n') : 'clear-background: every picture has a transparent background');
  }).catch((e) => { console.error(e.message); process.exit(1); });
}
