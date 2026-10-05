#!/usr/bin/env node
/**
 * cbn-inspect.js — ONE worksheet's answer key at full size with every piece labelled, so it can be fixed piece by piece
 * (operator 2026-10-05: "fix each worksheet individually"): p<i> numbered part (red), m<i> compact-number piece (blue),
 * s<i> small piece (purple; a magenta ring = left white). The keys are the ones lineart-colours.js PIECE / HERO use.
 *   node tools/cbn-inspect.js <id> [--small]     (--small: label every small piece, not only the white ones)
 * → $TEMP/spl/insp/<id>.png
 */
'use strict';
const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const { DESIGNS, build, pieceColours } = require('../data/cbn/designs.js');
const R = require('../lib/cbn-render.js');
const id = process.argv[2];
const d = DESIGNS.find((x) => x.id === id);
if (!d) { console.error('no design ' + id); process.exit(1); }
const j = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'cbn', 'lineart', id + '.json'), 'utf8'));
const pc = pieceColours(d);
const S = 2, W = 600 * S, H = 560 * S;
const lab = (x, y, t, col, fs) => `<text x="${x * S}" y="${y * S + fs / 3}" font-family="Arial" font-weight="bold" font-size="${fs}" text-anchor="middle" fill="${col}" stroke="#fff" stroke-width="3" paint-order="stroke">${t}</text>`;
(async () => {
  const key = await sharp(Buffer.from(R.toSvg(build(d), { mode: 'colour', width: W, height: H }))).flatten({ background: '#fff' }).png().toBuffer();
  let marks = '';
  j.parts.forEach((p, i) => { if (!p.fixed) marks += lab(p.x, p.y, 'p' + i, '#C00', 22); });
  (j.mid || []).forEach((p, i) => { marks += lab(p.x, p.y, 'm' + i, '#06C', 18); });
  (j.small || []).forEach((p, i) => {
    const white = !pc.small[i];
    if (white && p.area >= 6) marks += `<circle cx="${p.x * S}" cy="${p.y * S}" r="${Math.max(6, p.r * S + 4)}" fill="none" stroke="#F0F" stroke-width="2"/>`;
    if ((white && p.area >= 6) || process.argv.includes('--small')) marks += lab(p.x, p.y, 's' + i, '#80C', 13);
  });
  const out = path.join(process.env.TEMP || '/tmp', 'spl', 'insp'); fs.mkdirSync(out, { recursive: true });
  await sharp(key).composite([{ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${marks}</svg>`) }]).png().toFile(path.join(out, id + '.png'));
  console.log(path.join(out, id + '.png'));
})();
