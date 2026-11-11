#!/usr/bin/env node
/**
 * The 40 seat pictures, side by side, for a human read (a file name can lie about what a picture shows).
 *
 *   node scripts/class-results/seat-icons-sheet.js          → out/class-results/seat-icons.png + a check of the files
 *
 * It reads SEAT_ICONS from frontend/lib/class-results/store.ts and fails when a picture file is missing, when a
 * key points into a black-and-white theme, or when two seats would get the same file. The sheet draws each
 * picture at the size the class page uses (96 px) with its seat number and key, on the class page's ground colour.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const sharp = require(path.join(REPO, 'node_modules', 'sharp'));
const LIB = path.join(REPO, 'image-library-webp', 'themes');

const src = fs.readFileSync(path.join(REPO, 'frontend', 'lib', 'class-results', 'store.ts'), 'utf8');
const block = /export const SEAT_ICONS: readonly string\[\] = \[([\s\S]*?)\];/.exec(src);
if (!block) { console.error('SEAT_ICONS not found in store.ts'); process.exit(1); }
const icons = [...block[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);

let fails = 0;
const fail = (m) => { fails++; console.log('FAIL  ' + m); };
if (icons.length !== 40) fail('expected 40 seat pictures, found ' + icons.length);
if (new Set(icons).size !== icons.length) fail('a picture is listed twice');
const stems = icons.map((k) => k.split('/')[1]);
const dupStem = stems.filter((s, i) => stems.indexOf(s) !== i);
if (dupStem.length) fail('two seats share an animal name (a child could not tell them apart by name): ' + dupStem.join(', '));
for (const k of icons) {
  const [theme, stem] = k.split('/');
  if (/\b(bw|sw|bn|nb|zw|sh|pb|mv|sv)\b/i.test(theme)) fail(k + ': a black-and-white theme');
  for (const size of ['1x', '2x']) if (!fs.existsSync(path.join(LIB, theme, stem + '@' + size + '.webp'))) fail(k + ': no @' + size + ' file');
}
if (fails) { console.log(fails + ' problem(s)'); process.exit(1); }

(async () => {
  const COLS = 8, CELL = 150, PAD = 14, W = COLS * CELL, H = Math.ceil(icons.length / COLS) * CELL;
  const parts = [];
  for (let i = 0; i < icons.length; i++) {
    const [theme, stem] = icons[i].split('/');
    const x = (i % COLS) * CELL, y = Math.floor(i / COLS) * CELL;
    const img = await sharp(path.join(LIB, theme, stem + '@2x.webp')).resize(96, 96, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
    parts.push({ input: img, left: x + (CELL - 96) / 2, top: y + PAD });
    const label = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${CELL}" height="34"><text x="${CELL / 2}" y="14" font-family="Arial" font-size="13" font-weight="700" text-anchor="middle" fill="#146B5E">${i + 1}</text><text x="${CELL / 2}" y="30" font-family="Arial" font-size="11" text-anchor="middle" fill="#333">${stem}</text></svg>`);
    parts.push({ input: label, left: x, top: y + PAD + 100 });
  }
  const out = path.join(REPO, 'out', 'class-results', 'seat-icons.png');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await sharp({ create: { width: W, height: H, channels: 4, background: '#FBF3E4' } }).composite(parts).png().toFile(out);
  console.log('seat pictures: 40 files present, all colour, all different → ' + path.relative(REPO, out));
})();
