#!/usr/bin/env node
/**
 * flagship/cbn-silent.js: the Color by Number sections a child sees on the printed page with NO number although the
 * answer key colours them (operator 2026-11-08: "you had missed a lot of sections in color by number templates").
 * A section is a closed white area of the printed line drawing; it is silent when no number sits in it and the key
 * paints it. Renders the printed picture (numbers on) beside the key with every silent section circled, and lists them.
 *   node scripts/makers/flagship/cbn-silent.js --ids=a,b [--out=sheet.png] [--min=60]
 *   node scripts/makers/flagship/cbn-silent.js --all [--min=60]     (every library picture that passed its gates + the 200 designs; summary only)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const WG = path.join(REPO, 'scripts', 'worksheet-gen');
const sharp = require(path.join(REPO, 'node_modules', 'sharp'));
const { DESIGNS, build, isLib, load } = require(path.join(WG, 'data', 'cbn', 'designs.js'));
const R = require(path.join(WG, 'lib', 'cbn-render.js'));

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const MIN = Number(arg('min', 60));   // picture units²: a smaller closed area is a crumb no child sees as a section
const S = 2;

function labelsOf(id) {
  if (isLib(id)) { const r = load(id); return r.labels.map(([x, y, rr, n]) => ({ x, y, r: rr, n })); }
  const l = JSON.parse(fs.readFileSync(path.join(WG, 'data', 'cbn', 'labels.json'), 'utf8'))[id];
  return (l.labels || []).map((x) => (Array.isArray(x) ? { x: x[0], y: x[1], r: x[2], n: x[3] } : x));
}

/** closed white areas of a raw RGB render that do not touch the border */
function areas(buf, w, h) {
  const white = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) if (buf[i * 3] >= 200 && buf[i * 3 + 1] >= 200 && buf[i * 3 + 2] >= 200) white[i] = 1;
  const seen = new Int32Array(w * h).fill(-1), q = new Int32Array(w * h), out = [];
  for (let s = 0; s < w * h; s++) {
    if (!white[s] || seen[s] >= 0) continue;
    const id = out.length; let hd = 0, tl = 0, edge = false; q[tl++] = s; seen[s] = id;
    while (hd < tl) { const i = q[hd++]; const x = i % w, y = (i / w) | 0; if (x === 0 || y === 0 || x === w - 1 || y === h - 1) edge = true; for (const n of [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, y > 0 ? i - w : -1, y < h - 1 ? i + w : -1]) if (n >= 0 && white[n] && seen[n] < 0) { seen[n] = id; q[tl++] = n; } }
    out.push({ id, n: tl, edge, pixels: q.slice(0, tl) });
  }
  return { out, seen };
}

/** the largest circle inside an area (chamfer distance to the nearest pixel outside it), in px */
function inscribed(a, W, H) {
  let x0 = W, y0 = H, x1 = 0, y1 = 0;
  for (const i of a.pixels) { const x = i % W, y = (i / W) | 0; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  const w = x1 - x0 + 3, h = y1 - y0 + 3, d = new Float32Array(w * h);
  for (const i of a.pixels) d[(((i / W) | 0) - y0 + 1) * w + (i % W) - x0 + 1] = 1e9;
  for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) { const k = y * w + x; if (d[k]) d[k] = Math.min(d[k], d[k - 1] + 3, d[k - w] + 3, d[k - w - 1] + 4, d[k - w + 1] + 4); }
  let m = 0;
  for (let y = h - 2; y > 0; y--) for (let x = w - 2; x > 0; x--) { const k = y * w + x; if (d[k]) { d[k] = Math.min(d[k], d[k + 1] + 3, d[k + w] + 3, d[k + w + 1] + 4, d[k + w - 1] + 4); if (d[k] > m) m = d[k]; } }
  return m / 3;
}

async function check(id) {
  const d = isLib(id) ? { id, kind: 'picture' } : DESIGNS.find((x) => x.id === id);
  const art = build(d);
  const W = art.w * S, H = art.h * S;
  // the printed drawing with NO numbers (the numbers would split a section), and the key
  const line = await sharp(Buffer.from(R.toSvg(art, { mode: 'line', width: W, height: H }))).flatten({ background: '#fff' }).raw().toBuffer();
  const key = await sharp(Buffer.from(R.toSvg(art, { mode: 'colour', width: W, height: H }))).flatten({ background: '#fff' }).raw().toBuffer();
  const labels = labelsOf(id);
  const { out, seen } = areas(line, W, H);
  const numbered = new Set(labels.map((l) => seen[Math.round(l.y * S) * W + Math.round(l.x * S)]).filter((x) => x >= 0));
  const silent = [];
  for (const a of out) {
    if (a.edge || a.n / (S * S) < MIN || numbered.has(a.id)) continue;
    let painted = 0;
    for (const i of a.pixels) { const r = key[i * 3], g = key[i * 3 + 1], b = key[i * 3 + 2]; if (!(r >= 235 && g >= 235 && b >= 235) && !(r < 90 && g < 90 && b < 90)) painted++; }
    if (painted / a.n < 0.5) continue;   // white in the key too: a natural white, the unpainted check's business
    let sx = 0, sy = 0; for (const i of a.pixels) { sx += i % W; sy += (i / W) | 0; }
    silent.push({ area: Math.round(a.n / (S * S)), x: sx / a.n / S, y: sy / a.n / S, r: inscribed(a, W, H) / S });
  }
  return { id, art, labels, silent };
}

(async () => {
  if (process.argv.includes('--all')) {
    const dir = path.join(WG, 'data', 'fl', 'cbn');
    const lib = fs.readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5)).filter((id) => JSON.parse(fs.readFileSync(path.join(dir, id + '.json'), 'utf8')).ok);
    const ids = DESIGNS.map((x) => x.id).concat(lib);
    const rows = [];
    let n = 0, withSilent = 0, total = 0;
    const hist = {};
    for (const id of ids) {
      const r = await check(id);
      if (++n % 200 === 0) console.log(`  ${n} / ${ids.length}`);
      if (!r.silent.length) continue;
      withSilent++; total += r.silent.length;
      for (const s of r.silent) { const b = (s.area >= 400 ? '400+' : s.area >= 150 ? '150-400' : '60-150') + (s.r >= 5.5 ? ' wide' : ' thin'); hist[b] = (hist[b] || 0) + 1; }
      rows.push(`${id}\t${r.silent.length}\t${r.silent.map((s) => s.area + '/' + s.r.toFixed(1)).join(' ')}`);
    }
    const OUT = path.join(REPO, 'out', 'flagship-check');
    fs.writeFileSync(path.join(OUT, 'cbn-silent.tsv'), rows.join('\n') + '\n');
    console.log(`${ids.length} pictures, ${withSilent} with silent sections, ${total} sections`, hist, '→ out/flagship-check/cbn-silent.tsv');
    return;
  }
  const ids = String(arg('ids', '')).split(',').filter(Boolean);
  const cells = [];
  const cw = 560, chh = Math.round(cw * 560 / 600);
  for (const id of ids) {
    const r = await check(id);
    const marks = r.silent.map((s) => `<circle cx="${s.x}" cy="${s.y}" r="${Math.max(10, Math.sqrt(s.area) * 0.8)}" fill="none" stroke="#E00" stroke-width="3"/>`).join('');
    const line = R.toSvg(r.art, { mode: 'line', labels: r.labels, width: cw, height: chh }).replace('</svg>', marks + '</svg>');
    const key = R.toSvg(r.art, { mode: 'colour', width: cw, height: chh }).replace('</svg>', marks + '</svg>');
    cells.push({ id, n: r.silent.length, a: await sharp(Buffer.from(line)).flatten({ background: '#fff' }).png().toBuffer(), b: await sharp(Buffer.from(key)).flatten({ background: '#fff' }).png().toBuffer() });
    console.log(`${id}: ${r.silent.length} silent section(s) ${r.silent.map((s) => s.area + 'u2').join(' ')}`);
  }
  const rowH = chh + 22;
  const comp = [];
  cells.forEach((c, i) => {
    comp.push({ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${cw * 2}" height="20"><text x="4" y="15" font-size="15" font-family="Arial">${c.id}: ${c.n} silent</text></svg>`), left: 0, top: i * rowH });
    comp.push({ input: c.a, left: 0, top: i * rowH + 22 }); comp.push({ input: c.b, left: cw + 10, top: i * rowH + 22 });
  });
  const out = arg('out', path.join(REPO, 'out', 'flagship-check', 'cbn-silent.png'));
  await sharp({ create: { width: cw * 2 + 10, height: rowH * cells.length, channels: 3, background: '#ccc' } }).composite(comp).png().toFile(out);
  console.log('sheet', out);
})();
