#!/usr/bin/env node
/**
 * A contact sheet of worksheet thumbnails, for reading the pages a guest teacher script goes with (Daily Teaching
 * System, Part 5, rule 4: scripts are checked against the picture, not the directions).
 *
 *   node scripts/sub-plans/contact-sheet.js <out.png> <columns> <cell width> <png>=<label> ...
 *
 * Every cell is the page scaled to the cell width with its label (block, slug) printed above it. Output goes to
 * out/sub-plans/thumbs/ (gitignored).
 */
'use strict';
const path = require('path');
const sharp = require(path.join(__dirname, '..', '..', 'frontend', 'node_modules', 'sharp'));
const [out, colsArg, wArg, ...items] = process.argv.slice(2);
const cols = Number(colsArg), W = Number(wArg), H = Math.round(W * 620 / 480), LABEL = 22;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
(async () => {
  const cells = items.map((x) => { const i = x.indexOf('='); return { file: x.slice(0, i), label: x.slice(i + 1) }; });
  const rows = Math.ceil(cells.length / cols);
  const comp = [];
  for (let i = 0; i < cells.length; i++) {
    const x = (i % cols) * W, y = Math.floor(i / cols) * (H + LABEL);
    const img = await sharp(cells[i].file).resize(W, H, { fit: 'contain', background: '#ffffff' }).png().toBuffer();
    comp.push({ input: img, left: x, top: y + LABEL });
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + LABEL + '"><rect width="100%" height="100%" fill="#14332d"/><text x="4" y="16" font-family="Arial" font-size="14" fill="#ffffff">' + esc(cells[i].label.slice(0, Math.floor(W / 7.2))) + '</text></svg>';
    comp.push({ input: Buffer.from(svg), left: x, top: y });
  }
  await sharp({ create: { width: cols * W, height: rows * (H + LABEL), channels: 3, background: '#ffffff' } }).composite(comp).png().toFile(out);
  console.log(out + ': ' + cells.length + ' pages');
})().catch((e) => { console.error(e.stack || e.message); process.exit(1); });
