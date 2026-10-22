#!/usr/bin/env node
/**
 * build-family-portraits.js — turns the operator's family portraits (2026-10-22,
 * "the illustrations on the family members worksheets are terrible — replace all
 * of them with the images in `family images`") into the page-ready busts that
 * primitives/family-figure.js embeds.
 *
 *   node scripts/worksheet-gen/tools/build-family-portraits.js [--src=<dir>]
 *
 * Each source PNG (1080², black line art, alpha) is flattened on white, trimmed
 * to its ink box, padded to the figure's 5:6 box (bust bottom on the box bottom,
 * centred), scaled to OUT_W × OUT_H and written as a grayscale PNG to
 * data/b5/family-portraits/<age>-<sex>-<n>.png, plus manifest.json.
 *
 * Mapping: the CAST table below (old → elder · young → adult · teenager → child ·
 * toddler → baby, with the reviewed exceptions recorded there).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const argSrc = process.argv.find((a) => a.startsWith('--src='));
const SRC = argSrc ? argSrc.slice(6) : path.join(ROOT, 'family images');
const OUT = path.join(__dirname, '..', 'data', 'b5', 'family-portraits');
const OUT_W = 400, OUT_H = 480;          // the figure box is 100:120
const INK = 170;                         // a pixel darker than this is ink
const MARGIN = 0.03;                     // white kept round the ink box, as a share of the box

/* THE CAST — which source picture plays which (age, sex, n). n is the order a family draws them in (n 1 first).
 * Pedagogy review 2026-10-22: "teenager girl 1" (long layered hair, slim adult face) reads as a young woman — next to
 * "young woman 1" the two look the same age, which defeats a page whose point is telling generations apart. She is
 * RETIRED. The child-girl set is teenager girl 2, 3, then the toddler girl as the third girl (only 11 of 853 pages draw
 * three girls of the child generation, none of them with a baby girl; assignPortraits gives the older sister a teenager). */
const CAST = [
  ['old woman 1.png', 'elder', 'f', 1], ['old woman 2.png', 'elder', 'f', 2],
  ['old man 1.png', 'elder', 'm', 1], ['old man 2.png', 'elder', 'm', 2],
  ['young woman 1.png', 'adult', 'f', 1], ['young woman 2.png', 'adult', 'f', 2],
  ['young man 1.png', 'adult', 'm', 1], ['young man 2.png', 'adult', 'm', 2],
  ['teenager girl 2.png', 'child', 'f', 1], ['teenager girl 3.png', 'child', 'f', 2], ['toddler girl.png', 'child', 'f', 3],
  ['teenager boy 1.png', 'child', 'm', 1], ['teenager boy 2.png', 'child', 'm', 2], ['teenager boy 3.png', 'child', 'm', 3],
  ['toddler girl.png', 'baby', 'f', 1], ['toddler boy .png', 'baby', 'm', 1],
];
const RETIRED = { 'teenager girl 1.png': 'reads as a young woman (pedagogy review 2026-10-22)' };

async function inkBox(buf, w, h, c) {
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (buf[(y * w + x) * c] < INK) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  }
  if (x1 < 0) throw new Error('no ink');
  return { x0, y0, x1, y1 };
}

async function build([file, age, sex, n]) {
  const id = { age, sex, n };
  const flat = sharp(path.join(SRC, file)).flatten({ background: '#ffffff' }).grayscale();
  const { data, info } = await flat.clone().raw().toBuffer({ resolveWithObject: true });
  const b = await inkBox(data, info.width, info.height, info.channels);
  const iw = b.x1 - b.x0 + 1, ih = b.y1 - b.y0 + 1;
  // the 5:6 canvas is fitted to the ink HEIGHT (so every head reads at the same size); shoulders wider
  // than the canvas run off its sides, as a bust's do. The bust bottom sits on the canvas bottom.
  const ch = Math.ceil(ih * (1 + 2 * MARGIN)), cw = Math.ceil(ch * OUT_W / OUT_H);
  const cut = Math.max(0, iw - cw);                         // ink wider than the canvas: trim both sides equally
  const cx0 = b.x0 + Math.floor(cut / 2), cwid = iw - cut;
  const crop = await flat.clone().extract({ left: cx0, top: b.y0, width: cwid, height: ih }).png().toBuffer();
  const left = Math.round((cw - cwid) / 2), top = ch - ih;
  const canvas = await sharp({ create: { width: cw, height: ch, channels: 3, background: '#ffffff' } })
    .composite([{ input: crop, left, top }])
    .png().toBuffer();
  // sharp resizes BEFORE it composites inside one pipeline, so the resize is its own step
  const png = await sharp(canvas)
    .resize(OUT_W, OUT_H, { kernel: 'lanczos3' })
    .grayscale()
    .png({ compressionLevel: 9, palette: true, colours: 16 })
    .toBuffer();
  const name = `${id.age}-${id.sex}-${id.n}.png`;
  fs.writeFileSync(path.join(OUT, name), png);
  return { ...id, file: name, source: file, bytes: png.length, ink: { w: iw, h: ih } };
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  for (const f of fs.readdirSync(OUT).filter((x) => x.endsWith('.png'))) fs.unlinkSync(path.join(OUT, f));
  const files = fs.readdirSync(SRC).filter((f) => /\.png$/i.test(f)).sort();
  for (const f of files) if (!CAST.some((c) => c[0] === f) && !RETIRED[f]) { console.error('NOT CAST (add it to CAST or RETIRED): ' + f); process.exitCode = 1; }
  for (const [f, why] of Object.entries(RETIRED)) console.log(`retired: ${f} — ${why}`);
  const items = [];
  for (const c of CAST) {
    if (!files.includes(c[0])) { console.error('MISSING source: ' + c[0]); process.exitCode = 1; continue; }
    const r = await build(c);
    items.push(r);
    console.log(`${r.file.padEnd(16)} ${String(r.bytes).padStart(6)} B  <- ${c[0]}`);
  }
  const manifest = {};
  for (const r of items) ((manifest[r.age] = manifest[r.age] || {})[r.sex] = manifest[r.age][r.sex] || []).push(r);
  for (const a of Object.values(manifest)) for (const s of Object.keys(a)) a[s] = a[s].sort((p, q) => p.n - q.n).map((r) => r.file);
  fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify({ size: [OUT_W, OUT_H], portraits: manifest }, null, 2) + '\n');
  console.log(JSON.stringify(manifest));
})();
