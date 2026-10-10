#!/usr/bin/env node
/**
 * fdx-colour-sheet.js — every drawing the Level Set scenes use, painted alone with its catalogue colour plan, 40 per sheet,
 * for READING (a cat painted pink, a zebra painted black, a dog with a black head were found this way).
 *   node tools/fdx-colour-sheet.js <outDir> [--heroes] [--from=N --count=M]
 */
'use strict';
const path = require('path'); const fs = require('fs'); const sharp = require('sharp');
const F = require('../lib/fd-scene.js'); const { CATALOG, PLANS } = require('../data/fdx/catalog.js'); const { SCENES } = require('../data/fdx/scenes.js');
const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
const heroesOnly = process.argv.includes('--heroes');
const set = new Set();
for (const s of SCENES) { set.add(typeof s.hero === 'string' ? s.hero : s.hero.src); if (!heroesOnly) for (const c of s.cast) set.add(typeof c === 'string' ? c : c.src); }
const list = [...set].sort();
const T = 200, COLS = 8, PER = 40;
(async () => {
  for (let k = 0; k * PER < list.length; k++) {
    const part = list.slice(k * PER, (k + 1) * PER), comps = [];
    for (let i = 0; i < part.length; i++) {
      const src = part[i], c = CATALOG.get(src);
      const it = { src, x: 300, y: 520, h: 440, colour: PLANS[src] || [c.colours[0]], maxW: 520 };
      const spec = { id: 'sheet', items: [it], lines: [], fixed: [], stroke: 7 };
      const scene = await F.buildLayers(spec, { inherit: false });
      const svg = F.renderPanel(scene, [], { mode: 'colour', width: T, frame: false });
      const x = (i % COLS) * T, y = Math.floor(i / COLS) * (T + 22);
      comps.push({ input: await sharp(Buffer.from(svg)).png().toBuffer(), left: x, top: y });
      comps.push({ input: Buffer.from(`<svg width="${T}" height="20"><text x="${T / 2}" y="15" font-size="12" font-family="Arial" text-anchor="middle">${src.replace(/&/g, '&amp;')}</text></svg>`), left: x, top: y + T });
    }
    const rows = Math.ceil(part.length / COLS);
    await sharp({ create: { width: COLS * T, height: rows * (T + 22), channels: 3, background: '#fff' } }).composite(comps).png().toFile(path.join(out, `c${String(k).padStart(2, '0')}.png`));
    console.log('sheet', k);
  }
  console.log(list.length, 'drawings');
})().catch((e) => { console.error(e); process.exit(1); });
