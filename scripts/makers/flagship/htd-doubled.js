#!/usr/bin/env node
/**
 * flagship/htd-doubled.js: How to Draw steps that only draw a line along a line already drawn (flagship visual check
 * 2026-11-08: read on the sheets, the spoon's step 3 is a second line hugging the outline of step 2 — the child traces
 * over its own line and learns nothing). For every library How to Draw record (data/fl/htd/<slug>.json) in the index, each
 * step after the first: the share of its new ink lying within NEAR picture units of the ink of the steps before it. A step
 * with share ≥ LIMIT doubles an earlier line; the picture is listed (out/flagship-check/htd-doubled.tsv) for the review.
 *   node scripts/makers/flagship/htd-doubled.js [--near=7] [--limit=0.7] [--only=slug,slug] [--poison]
 * --poison: a step made of the first step's own outline shifted 2 units must be flagged.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const WG = path.join(REPO, 'scripts', 'worksheet-gen');
const sharp = require(path.join(REPO, 'node_modules', 'sharp'));
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const NEAR = +arg('near', 7), LIMIT = +arg('limit', 0.7);
const IDX = JSON.parse(fs.readFileSync(path.join(WG, 'data', 'fl', 'index.json'), 'utf8')).pictures;
const FL = require(path.join(WG, 'lib', 'fl-art.js'));

/** the ink mask of one or more paths (picture units, 1 px per unit) */
async function mask(ds, W, H) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="#fff"/>${ds.map((d) => `<path d="${d}" fill="#000" fill-rule="nonzero"/>`).join('')}</svg>`;
  const { data } = await sharp(Buffer.from(svg)).greyscale().raw().toBuffer({ resolveWithObject: true });
  const m = new Uint8Array(W * H); for (let i = 0; i < m.length; i++) m[i] = data[i] < 128 ? 1 : 0; return m;
}
/** chamfer distance (units) from every pixel to the nearest set pixel of m */
function distTo(m, W, H) {
  const d = new Float32Array(W * H); for (let i = 0; i < d.length; i++) d[i] = m[i] ? 0 : 1e9;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = y * W + x; let v = d[i]; if (x > 0) v = Math.min(v, d[i - 1] + 1); if (y > 0) { v = Math.min(v, d[i - W] + 1); if (x > 0) v = Math.min(v, d[i - W - 1] + 1.4); if (x < W - 1) v = Math.min(v, d[i - W + 1] + 1.4); } d[i] = v; }
  for (let y = H - 1; y >= 0; y--) for (let x = W - 1; x >= 0; x--) { const i = y * W + x; let v = d[i]; if (x < W - 1) v = Math.min(v, d[i + 1] + 1); if (y < H - 1) { v = Math.min(v, d[i + W] + 1); if (x < W - 1) v = Math.min(v, d[i + W + 1] + 1.4); if (x > 0) v = Math.min(v, d[i + W - 1] + 1.4); } d[i] = v; }
  return d;
}

(async () => {
  const only = arg('only') ? new Set(arg('only').split(',')) : null, poison = process.argv.includes('--poison');
  const rows = []; let n = 0;
  for (const key of Object.keys(IDX).filter((k) => IDX[k].htd != null && (process.argv.includes('--with-new') || !IDX[k].n))) {
    const slug = FL.slugOf(key); if (only && !only.has(slug)) continue;
    const f = path.join(WG, 'data', 'fl', 'htd', slug + '.json'); if (!fs.existsSync(f)) continue;
    const r = JSON.parse(fs.readFileSync(f, 'utf8'));
    const W = Math.round(r.w || 600), H = Math.round(r.h || 560);
    const steps = r.steps.map((s) => s.d);
    if (poison) steps.splice(1, 0, `<g transform="translate(2 2)"></g>`) && (steps[1] = null);
    let worst = { share: 0, step: 0 };
    for (let i = 1; i < steps.length; i++) {
      const before = await mask(steps.slice(0, i).filter(Boolean), W, H);
      const now = poison && i === 1 ? await (async () => { const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#fff"/><path d="${steps[0]}" transform="translate(2 2)" fill="#000"/></svg>`; const { data } = await sharp(Buffer.from(svg)).greyscale().raw().toBuffer({ resolveWithObject: true }); const m = new Uint8Array(W * H); for (let k = 0; k < m.length; k++) m[k] = data[k] < 128 ? 1 : 0; return m; })() : await mask([steps[i]], W, H);
      const d = distTo(before, W, H);
      let tot = 0, near = 0;
      for (let k = 0; k < now.length; k++) if (now[k] && !before[k]) { tot++; if (d[k] <= NEAR) near++; }
      const share = tot ? near / tot : 1;
      if (share > worst.share) worst = { share, step: i + 1 };
    }
    n++;
    if (worst.share >= LIMIT) rows.push([key, slug, worst.step, worst.share.toFixed(2)]);
    if (poison) break;
  }
  if (poison) { console.log(rows.length ? 'poison: flagged ' + rows[0].join(' ') : 'POISON NOT CAUGHT'); process.exit(rows.length ? 0 : 1); }
  rows.sort((a, b) => b[3] - a[3]);
  const out = path.join(REPO, 'out', 'flagship-check', 'htd-doubled.tsv');
  fs.writeFileSync(out, rows.map((x) => x.join('\t')).join('\n') + '\n');
  console.log(`${n} pictures, ${rows.length} with a step whose new lines lie ≥ ${LIMIT * 100}% within ${NEAR} units of earlier lines → ${out}`);
})();
