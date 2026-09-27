#!/usr/bin/env node
/**
 * contact-sheet.js — a labelled grid of library pictures, so a person can OPEN
 * every picture before it goes on a worksheet (a filename is not a picture).
 *
 *   node scripts/worksheet-gen/tools/contact-sheet.js <out.png> "theme/noun" "theme/noun" …
 *   node scripts/worksheet-gen/tools/contact-sheet.js <out.png> --theme="fruits" [--theme=…]
 *
 * Pictures come from the local cache (cache/themes-512); each cell shows the
 * picture over "theme/noun".
 */
'use strict';
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const resolve = require('../image-cache/resolve.js');

const out = process.argv[2];
const args = process.argv.slice(3);
const m = resolve.manifest();
const items = [];
for (const a of args) {
  if (a.startsWith('--theme=')) {
    const t = a.slice(8);
    for (const [noun, e] of Object.entries(m.themes[t].nouns)) items.push({ theme: t, noun, file: e.files[0] });
  } else {
    const [t, noun] = a.split('/');
    const e = m.themes[t] && m.themes[t].nouns[noun];
    if (!e) { console.error('not in cache: ' + a); continue; }
    items.push({ theme: t, noun, file: e.files[0] });
  }
}
const CELL = 180, PIC = 140, COLS = 8;
const rows = Math.ceil(items.length / COLS);
(async () => {
  const comps = [];
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const src = path.join(__dirname, '..', 'cache', 'themes-512', it.theme, it.file);
    const img = await sharp(src).resize(PIC, PIC, { fit: 'contain', background: '#ffffff' }).png().toBuffer();
    const x = (i % COLS) * CELL, y = Math.floor(i / COLS) * CELL;
    comps.push({ input: img, left: x + 20, top: y + 4 });
    const label = `${it.theme}/${it.noun}`.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    comps.push({ input: Buffer.from(`<svg width="${CELL}" height="30"><text x="${CELL / 2}" y="20" font-size="13" font-family="Arial" text-anchor="middle">${label}</text></svg>`), left: x, top: y + PIC + 8 });
  }
  await sharp({ create: { width: COLS * CELL, height: rows * CELL, channels: 3, background: '#ffffff' } }).composite(comps).png().toFile(out);
  console.log(items.length + ' pictures → ' + out);
})();
