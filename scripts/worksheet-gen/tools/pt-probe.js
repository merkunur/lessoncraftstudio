#!/usr/bin/env node
// pt-probe.js — trace drawings and render original | dashed trace side by side (out/pt/probe-<n>.png)
'use strict';
const path = require('path'); const fs = require('fs'); const sharp = require('sharp');
const { traceDrawing, pathD } = require('../lib/pt-trace.js');
const LIB = path.join(__dirname, '..', 'cache', 'themes');
(async () => {
  const list = process.argv.slice(2);
  const tiles = [];
  for (const rel of list) {
    const file = path.join(LIB, rel + '@3x.webp');
    const t0 = Date.now();
    const tr = await traceDrawing(file, { work: 800 });
    const dash = Math.max(6, tr.sw * 2.2), gap = dash * 0.75;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${tr.W}" height="${tr.H}" viewBox="0 0 ${tr.W} ${tr.H}"><rect width="100%" height="100%" fill="#fff"/>`
      + tr.blobs.map((b) => `<path d="${b.d}" fill="#222"/>`).join('')
      + tr.paths.map((p) => `<path d="${pathD(p.pts, 1, 0, 0, p.closed)}" fill="none" stroke="#333" stroke-width="${(tr.sw * 0.7).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${dash.toFixed(1)} ${gap.toFixed(1)}"/>`).join('') + '</svg>';
    const a = await sharp(file).flatten({ background: '#fff' }).resize(tr.W, tr.H).png().toBuffer();
    const b = await sharp(Buffer.from(svg)).png().toBuffer();
    tiles.push({ a, b, W: tr.W, H: tr.H });
    console.log(rel, 'sw', tr.sw.toFixed(2), 'paths', tr.paths.length, 'blobs', tr.blobs.length, (Date.now() - t0) + 'ms');
  }
  const W = 800, comps = [];
  tiles.forEach((t, i) => { comps.push({ input: t.a, left: 0, top: i * 810 }, { input: t.b, left: 810, top: i * 810 }); });
  await sharp({ create: { width: 1620, height: tiles.length * 810, channels: 3, background: '#ddd' } }).composite(comps).png().toFile(path.join(__dirname, '..', 'out', 'pt', 'probe.png'));
})().catch((e) => { console.error(e); process.exit(1); });
