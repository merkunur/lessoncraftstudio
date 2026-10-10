#!/usr/bin/env node
/** fdx-scenery-sheet.js — every setting × variant of lib/fdx-scenery.js rendered in colour + line, for READING. */
'use strict';
const path = require('path'); const fs = require('fs'); const sharp = require('sharp');
const F = require('../lib/fd-scene.js'); const { sceneryFor, SETTINGS } = require('../lib/fdx-scenery.js');
const out = process.argv[2] || path.join(process.env.TEMP || '.', 'spl', 'fdx', 'scenery.png');
const only = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7).split(',').filter(Boolean);
(async () => {
  const tiles = [];
  for (const s of SETTINGS) {
    if (only.length && !only.includes(s)) continue;
    for (const v of [0, 1, 2]) {
      const sc = sceneryFor(s, v, v === 1);
      const bg = await F.backgroundFor({ lines: sc.lines, fixed: sc.fixed, hy: sc.hy, stroke: 7 });
      const scene = { bg, items: [] };
      const svg = F.renderPanel(scene, [], { mode: 'colour', width: 300 });
      const lab = `<svg width="300" height="22"><text x="150" y="16" font-size="15" font-family="Arial" text-anchor="middle">${s} ${v}${v === 1 ? ' (mirror)' : ''}</text></svg>`;
      tiles.push({ img: await sharp(Buffer.from(svg)).png().toBuffer(), lab: Buffer.from(lab) });
    }
  }
  const COLS = 6, TW = 310, TH = 310;
  const rows = Math.ceil(tiles.length / COLS);
  const comps = [];
  tiles.forEach((t, i) => { const x = (i % COLS) * TW, y = Math.floor(i / COLS) * TH; comps.push({ input: t.img, left: x + 5, top: y + 2 }, { input: t.lab, left: x + 5, top: y + 284 }); });
  await sharp({ create: { width: COLS * TW, height: rows * TH, channels: 3, background: '#fff' } }).composite(comps).png().toFile(out);
  console.log(tiles.length, 'tiles →', out);
})().catch((e) => { console.error(e); process.exit(1); });
