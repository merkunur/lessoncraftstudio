#!/usr/bin/env node
// pt-paths.js — debug: every traced path in its own colour (solid, thin) over the faint source; out/pt/paths.png
'use strict';
const path = require('path'); const sharp = require('sharp');
const { traceDrawing, pathD } = require('../lib/pt-trace.js');
(async () => {
  const file = path.join(__dirname, '..', 'cache', 'themes', process.argv[2] + '@3x.webp');
  const tr = await traceDrawing(file);
  const cols = ['#e6194b', '#3cb44b', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#9a6324', '#008080', '#800000'];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${tr.W}" height="${tr.H}">` + tr.paths.map((p, i) => `<path d="${pathD(p.pts, 1, 0, 0, p.closed)}" fill="none" stroke="${cols[i % cols.length]}" stroke-width="2.5"/><circle cx="${p.pts[0][0]}" cy="${p.pts[0][1]}" r="3" fill="${cols[i % cols.length]}"/>`).join('') + tr.blobs.map((b) => `<path d="${b.d}" fill="#000"/>`).join('') + '</svg>';
  const bg = await sharp(file).flatten({ background: '#fff' }).resize(tr.W, tr.H).modulate({ brightness: 1 }).linear(0.25, 190).png().toBuffer();
  await sharp(bg).composite([{ input: Buffer.from(svg) }]).png().toFile(path.join(__dirname, '..', 'out', 'pt', 'paths.png'));
  tr.paths.forEach((p, i) => { if (i < 200) process.stdout.write(i + ':' + p.pts.length + '/' + p.len.toFixed(0) + (p.closed ? 'c ' : ' ')); });
})();
