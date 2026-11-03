#!/usr/bin/env node
/**
 * htd-symmetry.js — data/b7/htd-symmetry.json: how mirror-symmetric each How to Draw lesson the maker ships is, and where
 * its axis lies — the candidates of "Draw the Other Half" (K-495, makers 2026-11-02).
 *
 * Each lesson's finished drawing (S.full, 600 × 560 units) is rasterised at 2 px per unit; for every vertical axis within
 * ±12 % of the drawing's box centre (1-unit steps) the ink is mirrored about the axis and compared with itself
 * (IoU of the two masks, both dilated 3 px so a hand-drawn line a pixel off still meets its twin). The best axis wins.
 *   { <unit>: { axis: <x in units>, iou: 0..1 } }
 * A high score is NOT enough (a three-quarter view can score high and still be no mirror): the face's pick list is the
 * reviewed one in data/b7/htd-symmetry-review.js (read on contact sheets, tools/contact-sheet.js).
 *   node tools/htd-symmetry.js [--min=0.8]
 */
'use strict';
const fs = require('fs'), path = require('path');
const sharp = require('sharp');
const H = require('../lib/htd-faces.js');
const OUT = path.join(__dirname, '..', 'data', 'b7', 'htd-symmetry.json');
const K = 2, W = 600 * K, Hh = 560 * K;

async function mask(S) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${Hh}" viewBox="0 0 600 560"><rect width="600" height="560" fill="#fff"/><path d="${S.full}" fill="#000"/></svg>`;
  const { data } = await sharp(Buffer.from(svg)).greyscale().raw().toBuffer({ resolveWithObject: true });
  const m = new Uint8Array(W * Hh);
  for (let i = 0; i < m.length; i++) m[i] = data[i] < 128 ? 1 : 0;
  // dilate 3 px (separable)
  const R = 3, t = new Uint8Array(m.length), d = new Uint8Array(m.length);
  for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) { if (!m[y * W + x]) continue; for (let k = -R; k <= R; k++) { const xx = x + k; if (xx >= 0 && xx < W) t[y * W + xx] = 1; } }
  for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) { if (!t[y * W + x]) continue; for (let k = -R; k <= R; k++) { const yy = y + k; if (yy >= 0 && yy < Hh) d[yy * W + x] = 1; } }
  return { raw: m, dil: d };
}
function score(M, ax2) {
  // ax2 = 2 × axis in px: the mirror of x is ax2 - x
  let inter = 0, uni = 0;
  const { raw, dil } = M;
  for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) {
    const a = raw[y * W + x]; if (!a) continue;
    const mx = ax2 - x; const b = mx >= 0 && mx < W ? dil[y * W + mx] : 0;
    uni++; if (b) inter++;
  }
  return uni ? inter / uni : 0;
}
(async () => {
  const out = {};
  for (const u of H.pool()) {
    const S = H.B.stepsFor(u);
    const M = await mask(S);
    const [x0, , x1] = S.bbox, c = (x0 + x1) / 2, span = (x1 - x0) * 0.12;
    let best = { axis: c, iou: 0 };
    for (let a = c - span; a <= c + span; a += 1) { const s = score(M, Math.round(2 * a * K)); if (s > best.iou) best = { axis: +a.toFixed(1), iou: +s.toFixed(3) }; }
    out[u] = best;
  }
  fs.writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n');
  const min = +((process.argv.find((x) => x.startsWith('--min=')) || '--min=0.8').slice(6));
  const good = Object.entries(out).filter(([, v]) => v.iou >= min).sort((a, b) => b[1].iou - a[1].iou);
  console.log(`${good.length} of ${Object.keys(out).length} lessons ≥ ${min}`);
  for (const [u, v] of good) console.log(u.padEnd(44), v.iou, v.axis);
})().catch((e) => { console.error(e); process.exit(1); });
