#!/usr/bin/env node
/**
 * build-picture-signatures.js — a small LOOK signature of every cached colour-theme picture (2026-10-08, Graphs and
 * Data): the picture flattened on white, fitted into 8×8 cells, each cell's mean colour in CIE Lab. Two pictures whose
 * signatures are close look alike at icon size. The picture is TRIMMED to its object first (thin pictures were
 * "close" only because both were mostly white) (an apple, a pomegranate and a fig were three "different" categories of
 * one tally graph). Written to data/picture-signatures.json, read synchronously by lib/picture-distinct.js.
 *   node tools/build-picture-signatures.js
 */
'use strict';
const fs = require('fs'); const path = require('path');
const sharp = require('sharp');
const { manifest } = require('../image-cache/resolve.js');
const CACHE = path.join(__dirname, '..', 'cache');
const N = 8;
const bw = (t) => /\bbw(\s+\d+)?$/i.test(t);

function lab([r, g, b]) {
  const f = (c) => { c /= 255; return c > 0.04045 ? ((c + 0.055) / 1.055) ** 2.4 : c / 12.92; };
  const R = f(r), G = f(g), B = f(b);
  const X = (R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047, Y = R * 0.2126 + G * 0.7152 + B * 0.0722, Z = (R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883;
  const h = (v) => (v > 0.008856 ? Math.cbrt(v) : 7.787 * v + 16 / 116);
  return [116 * h(Y) - 16, 500 * (h(X) - h(Y)), 200 * (h(Y) - h(Z))].map((v) => Math.round(v));
}

(async () => {
  const M = manifest(); const out = {}; let n = 0;
  for (const [theme, t] of Object.entries(M.themes || M)) {
    if (bw(theme) || !t || !t.nouns) continue;
    for (const [noun, v] of Object.entries(t.nouns)) {
      if (!v.vocabKey || !v.files || !v.files[0]) continue;
      const f512 = path.join(CACHE, 'themes-512', theme, v.files[0]), f = fs.existsSync(f512) ? f512 : path.join(CACHE, 'themes', theme, v.files[0]);
      if (!fs.existsSync(f)) continue;
      const trimmed = await sharp(f).flatten({ background: '#ffffff' }).trim({ threshold: 12 }).toBuffer();
      const { data } = await sharp(trimmed).resize(N, N, { fit: 'contain', background: '#ffffff' })
        .removeAlpha().raw().toBuffer({ resolveWithObject: true });
      const cells = [];
      for (let i = 0; i < N * N; i++) cells.push(...lab([data[i * 3], data[i * 3 + 1], data[i * 3 + 2]]));
      (out[theme] = out[theme] || {})[noun] = cells; n++;
    }
  }
  fs.writeFileSync(path.join(__dirname, '..', 'data', 'picture-signatures.json'), JSON.stringify(out));
  console.log(`${n} pictures in ${Object.keys(out).length} colour themes`);
})();
