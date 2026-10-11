#!/usr/bin/env node
/**
 * htd-page-sheets.js — contact sheets of rendered worksheet PAGES (PNG), for the human read of a whole Level Set.
 *   node tools/level-set/htd-page-sheets.js <pngDir> <outDir> [--per=8] [--cols=4] [--w=420] [--filter=regex]
 * Each cell = the page scaled to w px wide with its file name under it.
 */
'use strict';
const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const [dir, out] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const PER = +arg('per', 8), COLS = +arg('cols', 4), W = +arg('w', 420), CAP = 18, PAD = 8;
const re = arg('filter') ? new RegExp(arg('filter')) : null;
fs.mkdirSync(out, { recursive: true });
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.png') && (!re || re.test(f))).sort();
(async () => {
  for (let p = 0; p < files.length; p += PER) {
    const batch = files.slice(p, p + PER);
    const cells = [];
    for (const f of batch) { const buf = await sharp(path.join(dir, f)).resize({ width: W }).png().toBuffer(); const m = await sharp(buf).metadata(); cells.push({ f, buf, h: m.height }); }
    const H = Math.max(...cells.map((c) => c.h)), rows = Math.ceil(cells.length / COLS);
    const comp = [];
    cells.forEach((c, i) => {
      const x = (i % COLS) * (W + PAD), y = Math.floor(i / COLS) * (H + CAP + PAD);
      comp.push({ input: c.buf, left: x, top: y });
      const cap = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${CAP}"><text x="2" y="13" font-family="Arial" font-size="12" fill="#333">${c.f.replace(/\.png$/, '').replace(/&/g, '&amp;')}</text></svg>`);
      comp.push({ input: cap, left: x, top: y + H });
    });
    const file = path.join(out, `pages-${String(p / PER + 1).padStart(2, '0')}.png`);
    await sharp({ create: { width: COLS * (W + PAD), height: rows * (H + CAP + PAD), channels: 3, background: '#fff' } }).composite(comp).png().toFile(file);
    console.log(file);
  }
})().catch((e) => { console.error(e); process.exit(1); });
