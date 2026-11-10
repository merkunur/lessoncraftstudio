#!/usr/bin/env node
/**
 * flagship/d2d-lookalikes.js: Dot to Dot pages whose numbered dots sit among the drawing's OWN small dots and circles
 * (operator 2026-11-08: "a very serious and thorough visual check for every single image in every single template"; read on
 * the contact sheets: ice-cream sprinkles, bath bubbles and mushroom spots beside the dots, so a child cannot tell which
 * dots to join). For every library picture in the Dot to Dot index and every dot count it is used at, it draws the picture
 * as the page draws it (fit.lite: the outline erased along the dotted stretch) and finds
 *   - dot-like blobs: small filled ink shapes (at most 20 units across, at least 55 % of their box inked);
 *   - small rings: small round closed white areas (at most 20 units across, roundish, 60 % of their box) — a drawn circle;
 * then counts those whose centre lies within NEAR units of a numbered dot. Only a REPEATED decoration counts (the picture
 * holds REPEAT or more such features in all — sprinkles, snow, spots, a row of circles): read on the sheets 2026-11-08, a
 * pair of eyes beside a dotted head is never taken for dots. A picture with LIMIT or more at any dot count it
 * is used at is listed (out/flagship-check/d2d-lookalikes.tsv) for the review to refuse.
 *   node scripts/makers/flagship/d2d-lookalikes.js [--only=id,id] [--near=24] [--limit=2] [--poison]
 * --poison adds four fake sprinkles beside the dots of one picture and must flag it.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const WG = path.join(REPO, 'scripts', 'worksheet-gen');
const sharp = require(path.join(REPO, 'node_modules', 'sharp'));
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const NEAR = +arg('near', 24), LIMIT = +arg('limit', 2), REPEAT = +arg('repeat', 6), MAXD = 20;
const D = path.join(WG, 'data', 'fl', 'd2d');
const IDX = JSON.parse(fs.readFileSync(path.join(WG, 'data', 'fl', 'index.json'), 'utf8')).pictures;
const { LINEART } = require(path.join(WG, 'data', 'fl', 'designs-all.js'));
const idOf = new Map(LINEART.map((d) => [d.items[0].src, d.id]));

/** the features of a drawing: [{ x, y, kind }] in picture units (600 × 560) */
async function features(dPath, W, H, extra) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="#fff"/><path d="${dPath}" fill="#000" fill-rule="evenodd"/>${extra || ''}</svg>`;
  const { data } = await sharp(Buffer.from(svg)).greyscale().raw().toBuffer({ resolveWithObject: true });
  const N = W * H, ink = new Uint8Array(N);
  for (let i = 0; i < N; i++) ink[i] = data[i] < 128 ? 1 : 0;
  const seen = new Uint8Array(N), st = new Int32Array(N), out = [];
  for (let s = 0; s < N; s++) {
    if (seen[s]) continue;
    const v = ink[s]; let top = 0, area = 0, x0 = W, y0 = H, x1 = 0, y1 = 0, sx = 0, sy = 0, edge = false;
    st[top++] = s; seen[s] = 1;
    while (top) {
      const p = st[--top], x = p % W, y = (p / W) | 0; area++; sx += x; sy += y;
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
      if (x === 0 || y === 0 || x === W - 1 || y === H - 1) edge = true;
      if (x > 0 && !seen[p - 1] && ink[p - 1] === v) { seen[p - 1] = 1; st[top++] = p - 1; }
      if (x < W - 1 && !seen[p + 1] && ink[p + 1] === v) { seen[p + 1] = 1; st[top++] = p + 1; }
      if (y > 0 && !seen[p - W] && ink[p - W] === v) { seen[p - W] = 1; st[top++] = p - W; }
      if (y < H - 1 && !seen[p + W] && ink[p + W] === v) { seen[p + W] = 1; st[top++] = p + W; }
    }
    const w = x1 - x0 + 1, h = y1 - y0 + 1, fill = area / (w * h), round = Math.min(w, h) / Math.max(w, h);
    if (edge || Math.max(w, h) > MAXD || area < 6) continue;
    if (v === 1 && fill >= 0.55 && round >= 0.5) out.push({ x: sx / area, y: sy / area, kind: 'blob', b: [x0, y0, x1, y1] });
    if (v === 0 && fill >= 0.6 && round >= 0.6 && Math.max(w, h) >= 4) out.push({ x: sx / area, y: sy / area, kind: 'ring', b: [x0, y0, x1, y1] });
  }
  // an eye's shine is a small white ring inside its pupil: not a decoration of its own
  return out.filter((q) => !(q.kind === 'ring' && out.some((o) => o.kind === 'blob' && q.x >= o.b[0] - 3 && q.x <= o.b[2] + 3 && q.y >= o.b[1] - 3 && q.y <= o.b[3] + 3)));
}

(async () => {
  const only = arg('only') ? new Set(arg('only').split(',')) : null;
  const poison = process.argv.includes('--poison');
  const keys = Object.keys(IDX).filter((k) => IDX[k].d2d && (process.argv.includes('--with-new') || !IDX[k].n));   // the library pictures (--with-new: the installed new drawings too)
  const rows = []; let done = 0;
  for (const key of keys) {
    const id = idOf.get(key); if (!id || (only && !only.has(id))) continue;
    const f = path.join(D, id + '.json'); if (!fs.existsSync(f)) continue;
    const rec = JSON.parse(fs.readFileSync(f, 'utf8'));
    let worst = { n: 0, at: null, kinds: '' };
    for (const N of Object.keys(IDX[key].d2d)) {
      const fit = rec.fit[N]; if (!fit || !fit.ok) continue;
      const d = fit.lite || fit.art; if (!d) continue;
      const extra = poison && !worst.poisoned ? fit.pts.slice(0, 4).map(([x, y]) => `<circle cx="${x + 12}" cy="${y + 6}" r="4" fill="#000"/>`).join('') : '';
      const feats = await features(d, rec.w || 600, rec.h || 560, extra);
      const near = feats.length >= REPEAT ? feats.filter((q) => fit.pts.some(([x, y]) => Math.hypot(q.x - x, q.y - y) <= NEAR)) : [];
      if (near.length > worst.n) worst = { n: near.length, at: N, kinds: [...new Set(near.map((q) => q.kind))].join('+'), total: feats.length };
    }
    if (worst.n >= LIMIT) rows.push([key, id, worst.n, worst.at, worst.kinds, worst.total]);
    if (++done % 200 === 0) console.log(`  ${done} / ${keys.length}, ${rows.length} flagged`);
    if (poison) break;
  }
  if (poison) { console.log(rows.length ? `poison: flagged (${rows[0].join(' ')})` : 'POISON NOT CAUGHT'); process.exit(rows.length ? 0 : 1); }
  rows.sort((a, b) => b[2] - a[2]);
  const out = path.join(REPO, 'out', 'flagship-check', 'd2d-lookalikes.tsv');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, rows.map((r) => r.join('\t')).join('\n') + '\n');
  console.log(`${done} pictures, ${rows.length} with ${LIMIT}+ look-alike dots or circles within ${NEAR} units of a numbered dot → ${out}`);
})();
