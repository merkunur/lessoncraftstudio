#!/usr/bin/env node
/**
 * hm-ink-boxes.js — measure the INK box of every COLOUR library drawing (b8 Handmade Mazes).
 *
 * A library drawing is a square webp with transparent margins; a scene that places the square overlaps roads with
 * empty pixels and misjudges where a goal stands (measured 2026-10-11: an apple tree's trunk drawn over the goal
 * mouth while its square looked clear). Each entry = the alpha > 24 bounding box as fractions of the image, so a
 * scene places INK: { w, h, l, t } (width, height, left, top; all 0..1 of the square) + `foot` = the fraction of
 * the width where the ink touches the bottom (the drawing stands there).
 *
 *   node scripts/worksheet-gen/tools/hm-ink-boxes.js            → data/hm/ink-boxes.json (all colour themes)
 * Deterministic; re-run after the library changes. B&W themes are skipped (the BW test is `bw(\s+\d+)?$`).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const resolve = require('../image-cache/resolve.js');

(async () => {
  const m = resolve.manifest();
  const out = {};
  const BW = /\bbw(\s+\d+)?$/i;
  let n = 0;
  for (const [theme, t] of Object.entries(m.themes)) {
    // B&W themes included since 2026-10-11 (the maze + colouring face draws line art)
    for (const [noun, e] of Object.entries(t.nouns)) {
      const file = path.join(__dirname, '..', 'cache', 'themes', theme, noun + '@3x.webp');
      if (!fs.existsSync(file)) continue;
      const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      const W = info.width, H = info.height; let x0 = W, y0 = H, x1 = -1, y1 = -1;
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (data[(y * W + x) * 4 + 3] > 24) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
      if (x1 < 0) continue;
      // where the ink meets its own bottom row band (the lowest 3 % of the ink): the drawing's feet
      const band = Math.max(1, Math.round((y1 - y0) * 0.03)); let fs0 = W, fs1 = -1;
      for (let y = y1 - band; y <= y1; y++) for (let x = x0; x <= x1; x++) if (data[(y * W + x) * 4 + 3] > 24) { if (x < fs0) fs0 = x; if (x > fs1) fs1 = x; }
      const r = (v) => Math.round(v * 1000) / 1000;
      out[theme + '/' + noun] = { l: r(x0 / W), t: r(y0 / H), w: r((x1 - x0 + 1) / W), h: r((y1 - y0 + 1) / H), foot: r(((fs0 + fs1) / 2) / W) };
      n++;
    }
  }
  const dst = path.join(__dirname, '..', 'data', 'hm', 'ink-boxes.json');
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.writeFileSync(dst, JSON.stringify(out, null, 0).replace(/},"/g, '},\n"') + '\n');
  console.log('measured', n, 'drawings →', path.relative(process.cwd(), dst));
})();
