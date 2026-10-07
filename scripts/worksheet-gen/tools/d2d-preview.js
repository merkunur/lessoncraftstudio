#!/usr/bin/env node
/**
 * d2d-preview.js — contact sheets of Dot-to-Dot scene pictures, to READ (a gate cannot see whether the joined dots
 * look like the animal). Six pictures per sheet, each with its id.
 *   node tools/d2d-preview.js --n=20 [--only=id,id] [--solved] [--lite] [--labelPx=20] [--out=dir]
 *     --solved   the dots joined in coral (what the child's finished drawing will look like)
 *     default    every scene whose fit at N is ok; writes <out>/d2d-<n>-<k>.png
 */
'use strict';
const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const sceneDotFigure = require('../primitives/scene-dot-figure.js');
const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : null; };
const N = +(arg('n') || 20), solved = process.argv.includes('--solved'), lite = process.argv.includes('--lite');
const labelPx = +(arg('labelPx') || 20);
const out = arg('out') || path.join(process.env.TEMP || '/tmp', 'spl', 'd2d');
const DIR = path.join(__dirname, '..', 'data', 'd2d');
const only = arg('only') ? arg('only').split(',') : null;
fs.mkdirSync(out, { recursive: true });

const ids = (only || fs.readdirSync(DIR).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''))).filter((id) => {
  const j = JSON.parse(fs.readFileSync(path.join(DIR, id + '.json'), 'utf8')); return j.fit[N] && j.fit[N].ok;
});
(async () => {
  const W = 640, H = 597, PER = 6, COLS = 3;
  for (let k = 0; k * PER < ids.length; k++) {
    const tiles = [];
    for (const [j, id] of ids.slice(k * PER, k * PER + PER).entries()) {
      const scene = JSON.parse(fs.readFileSync(path.join(DIR, id + '.json'), 'utf8'));
      let svg, err = null;
      try {
        const f = sceneDotFigure({ scene, count: N, lite, labelPx });
        svg = f.svg;
        if (solved) {
          const line = `<${/data-lcs-open/.test(f.svg) ? "polyline" : "polygon"} points="${f.points.map(([x, y]) => x.toFixed(1) + ',' + y.toFixed(1)).join(' ')}" fill="none" stroke="#F2784B" stroke-width="4" stroke-linejoin="round"/>`;
          svg = svg.replace(/<\/svg>\s*$/, line + '</svg>');
        }
      } catch (e) { err = e.message; svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#fee"/><text x="20" y="60" font-size="22">${err.replace(/[<&]/g, '')}</text></svg>`; }
      const cap = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="40"><rect width="${W}" height="40" fill="#fff"/><text x="10" y="28" font-family="Arial" font-size="24" font-weight="700">${id} · cx ${scene.fit[N].complexity} · s ${scene.fit[N].s} · dev ${scene.fit[N].dev}</text></svg>`;
      const img = await sharp(Buffer.from(svg.includes('xmlns=') ? svg : svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"'))).resize(W, H).png().toBuffer();
      tiles.push({ input: img, left: (j % COLS) * W, top: Math.floor(j / COLS) * (H + 40) + 40 });
      tiles.push({ input: Buffer.from(cap), left: (j % COLS) * W, top: Math.floor(j / COLS) * (H + 40) });
    }
    const file = path.join(out, `d2d-${N}${solved ? 's' : ''}${lite ? 'l' : ''}-${k}.png`);
    await sharp({ create: { width: COLS * W, height: 2 * (H + 40), channels: 3, background: '#ddd' } }).composite(tiles).png().toFile(file);
    console.log(file);
  }
  console.log(ids.length, 'pictures');
})().catch((e) => { console.error(e); process.exit(1); });
