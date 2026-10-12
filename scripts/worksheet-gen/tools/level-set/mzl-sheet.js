#!/usr/bin/env node
/**
 * mzl-sheet.js — a review sheet of rendered Maze Puzzles pages (2026-10-12): N page PNGs side by side, each labelled,
 * so every page is READ by a person before it publishes (and side by side, so near-twins show).
 *
 *   node tools/level-set/mzl-sheet.js <out.png> [--cols=4] [--w=420] <page.png> <page.png> …
 * A page PNG is cropped to its maze frame region by default (--full keeps the whole page).
 */
'use strict';
const sharp = require('sharp');
const path = require('path');
const args = process.argv.slice(2);
const out = args.shift();
const opt = (k, d) => { const a = args.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=')[1] : d; };
const COLS = +opt('cols', 4), W = +opt('w', 420); const FULL = args.includes('--full');
const files = args.filter((a) => !a.startsWith('--'));
(async () => {
  const cells = [];
  for (const f of files) {
    const img = sharp(f); const m = await img.metadata();
    const crop = FULL ? null : { left: 0, top: Math.round(m.height * 0.1), width: m.width, height: Math.round(m.height * 0.83) };
    const buf = await (crop ? sharp(f).extract(crop) : sharp(f)).resize({ width: W }).png().toBuffer();
    const mm = await sharp(buf).metadata();
    cells.push({ buf, h: mm.height, label: path.basename(f).replace(/\.png$/, '') });
  }
  const H = Math.max(...cells.map((c) => c.h)) + 26; const rows = Math.ceil(cells.length / COLS);
  const comp = [];
  cells.forEach((c, i) => {
    const x = (i % COLS) * (W + 10), y = Math.floor(i / COLS) * (H + 10);
    comp.push({ input: c.buf, left: x, top: y + 24 });
    const lab = c.label.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    comp.push({ input: Buffer.from(`<svg width="${W}" height="22"><text x="4" y="16" font-size="14" font-family="Arial" fill="#222">${lab}</text></svg>`), left: x, top: y });
  });
  await sharp({ create: { width: COLS * (W + 10), height: rows * (H + 10), channels: 3, background: '#FFFFFF' } }).composite(comp).png().toFile(out);
  console.log(cells.length + ' pages → ' + out);
})();
