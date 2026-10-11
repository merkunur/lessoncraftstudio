#!/usr/bin/env node
/**
 * htd-fragments.js — how many FLOATING FRAGMENTS a "finish" / outline-trace copy leaves (Level Set, 2026-10-11). A copy
 * with some steps removed can keep orphan bits of a line the removed step crossed (tyre-tread dashes round an erased rim,
 * the cut stub of a wattle): a child then traces specks. For every omission a face may ask for, the kept drawing
 * (data/htdx/<slug>.json .keep) is rasterised and its small ink components (< 0.35 % of the kept ink) are counted against
 * the whole drawing's; the surplus is the fragment count. Written to data/htdx/fragments.json, read by htd-allocate.js.
 *   node tools/level-set/htd-fragments.js
 */
'use strict';
const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const ROOT = path.join(__dirname, '..', '..');
const { UNITS } = require(path.join(ROOT, 'data', 'htdx', 'units.js'));
const W = 700;
async function smallComps(d, vb) {
  const h = Math.round(W * vb[3] / vb[2]);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}" width="${W}" height="${h}"><rect x="${vb[0]}" y="${vb[1]}" width="${vb[2]}" height="${vb[3]}" fill="#fff"/><path d="${d}" fill="#000"/></svg>`;
  const { data, info } = await sharp(Buffer.from(svg)).greyscale().raw().toBuffer({ resolveWithObject: true });
  const N = info.width * info.height, ink = new Uint8Array(N); let tot = 0;
  for (let i = 0; i < N; i++) if (data[i] < 128) { ink[i] = 1; tot++; }
  const seen = new Uint8Array(N); let small = 0; const lim = 0.0035 * tot;
  for (let i = 0; i < N; i++) {
    if (!ink[i] || seen[i]) continue;
    let n = 0; const st = [i]; seen[i] = 1;
    while (st.length) { const p = st.pop(); n++; const x = p % info.width, y = (p / info.width) | 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= info.width || yy >= info.height) continue; const q = yy * info.width + xx; if (ink[q] && !seen[q]) { seen[q] = 1; st.push(q); } } }
    if (n < lim) small++;
  }
  return small;
}
(async () => {
  const out = {};
  for (const u of UNITS) {
    const S = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'htdx', u.htdx + '.json'), 'utf8'));
    const [x0, y0, x1, y1] = S.bbox, vb = [x0 - 8, y0 - 8, x1 - x0 + 16, y1 - y0 + 16];
    const base = await smallComps(S.full, vb);
    const n = S.steps.length, inner = S.steps.map((s, i) => i).filter((i) => i >= 1 && (i <= n - 2 || n < 3));
    const largest = inner.slice().sort((a, b) => S.steps[b].share - S.steps[a].share)[0];
    const keys = { finish1: [largest], finish2: inner, finish3: S.steps.map((s, i) => i).filter((i) => i >= 1), trace3: S.steps.map((s, i) => i).filter((i) => i >= 1) };
    out[u.slug] = {};
    for (const [k, set] of Object.entries(keys)) {
      const key = set.join(',');
      out[u.slug][k] = S.keep && S.keep[key] != null ? Math.max(0, (await smallComps(S.keep[key], vb)) - base) : 99;
    }
  }
  fs.writeFileSync(path.join(ROOT, 'data', 'htdx', 'fragments.json'), JSON.stringify(out, null, 1) + '\n');
  const hist = {}; for (const v of Object.values(out)) for (const [k, c] of Object.entries(v)) { hist[k] = hist[k] || {}; const b = c > 6 ? '7+' : c; hist[k][b] = (hist[k][b] || 0) + 1; }
  console.log(JSON.stringify(hist));
  for (const s of ['lsx-vehicles-bw-2-dump-truck', 'lsx-farm-bw-turkey', 'lsx-sea-life-bw-lobster', 'lsx-vehicles-bw-2-helicopter-2', 'lsx-animals-bw-2-dog', 'lsx-farm-bw-sheep']) console.log(s, JSON.stringify(out[s]));
})().catch((e) => { console.error(e); process.exit(1); });
