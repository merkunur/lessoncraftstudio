#!/usr/bin/env node
/**
 * pt-sheet.js — contact sheet of TRACED drawings (the human read: a word list cannot see a picture).
 *   node tools/pt-sheet.js --band=P1 [--n=48] [--offset=0] [--keys=a,b,c] [--orig]  → out/pt/sheet-<band>-<offset>.png
 *   --orig puts the source drawing beside each trace.
 */
'use strict';
const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const { traceDrawing, pathD } = require('../lib/pt-trace.js');
const LIB = path.join(__dirname, '..', 'cache', 'themes');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const idx = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'pt', 'index.json'), 'utf8'));
const band = arg('band', 'P1'), n = +arg('n', 48), off = +arg('offset', 0), orig = process.argv.includes('--orig');
let keys = arg('keys', '') ? arg('keys', '').split(',') : Object.keys(idx).filter((k) => idx[k].band === band).slice(off, off + n);
const T = 220, COLS = orig ? 6 : 8;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
(async () => {
  const tiles = [];
  for (const k of keys) {
    const file = path.join(LIB, k + '@3x.webp');
    const tr = await traceDrawing(file);
    const s = T / tr.W, dash = Math.max(5, tr.sw * 2.2), gap = dash * 0.75;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${T}" height="${T + 18}"><rect width="100%" height="100%" fill="#fff"/>`
      + tr.blobs.map((b) => `<path transform="scale(${s})" d="${b.d}" fill="#333"/>`).join('')
      + tr.paths.map((p) => `<path d="${pathD(p.pts, s, 0, 0, p.closed)}" fill="none" stroke="#444" stroke-width="${(tr.sw * 0.7 * s).toFixed(2)}" stroke-linecap="round" stroke-dasharray="${(dash * s).toFixed(2)} ${(gap * s).toFixed(2)}"/>`).join('')
      + `<text x="4" y="${T + 13}" font-family="Arial" font-size="10" fill="#900">${esc(k.slice(0, 34))} ${idx[k] ? idx[k].band + ' d' + idx[k].density : ''}</text></svg>`;
    tiles.push(await sharp(Buffer.from(svg)).png().toBuffer());
    if (orig) tiles.push(await sharp(file).flatten({ background: '#fff' }).resize(T, T).extend({ bottom: 18, background: '#fff' }).png().toBuffer());
  }
  const rows = Math.ceil(tiles.length / COLS);
  const comp = tiles.map((b, i) => ({ input: b, left: (i % COLS) * (T + 6), top: ((i / COLS) | 0) * (T + 24) }));
  const out = path.join(__dirname, '..', 'out', 'pt', `sheet-${arg('keys', '') ? 'keys' : band}-${off}.png`);
  await sharp({ create: { width: COLS * (T + 6), height: rows * (T + 24), channels: 3, background: '#ccc' } }).composite(comp).png().toFile(out);
  console.log(out, keys.length);
})().catch((e) => { console.error(e); process.exit(1); });
