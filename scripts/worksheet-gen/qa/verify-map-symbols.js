#!/usr/bin/env node
/**
 * verify-map-symbols.js — the gate of primitives/map-symbol.js (G1-379 `maps`, design
 * docs/worksheet-gen/b5-designs/G1-379-maps.md §2 "NEW primitives/map-symbol.js").
 *
 *   node scripts/worksheet-gen/qa/verify-map-symbols.js [--no-sheet]
 *
 * NODE — every id at px 36/44/48: token hexes only, no <text>, no letter or digit in the
 *   markup's text content, viewBox 0 0 44 44, the root stamps; px 35 and an unknown id THROW.
 * RENDER (Chromium, the element's own markup rasterised at 4x, measured):
 *   - every pair distinct in GREYSCALE by at least one of: silhouette IoU <= 0.35, mean
 *     luminance difference >= 12 % (Rec.601 over the opaque pixels), or INK-PATTERN IoU <= 0.35
 *     (the pixels darker than luma 170: outline + interior marks, aligned in the same box);
 *     the NEAR-MISS pair (tree / bush) must ALSO keep silhouette IoU <= 0.55 (its outline
 *     carries it). DEVIATION (measured, _work/G1-379-build.md): the design's blanket "IoU <=
 *     0.55 for every pair AND (Δlum >= 12 % OR IoU <= 0.35)" is unsatisfiable by the design's
 *     own symbols — every compact top view fills the same 44 box (house/pond 0.79, pond/tent
 *     0.75, house/tree 0.76), and tree/bush is by design "same tone" (Δlum 1-3 %) — so the
 *     rule that no symbol reads as another is measured on what DOES tell them apart in mono:
 *     the ink pattern (outline shape + texture), measured max 0.27 on the shipped set;
 *   - the TOP-VIEW rule: no symbol's silhouette stands on a flat base and narrows upward
 *     (bottom 12 % rows as wide as the widest row AND the top 12 % rows < 45 % of it — the
 *     signature of a SIDE view: a triangle tent, a tree with a trunk on the ground);
 *   - every symbol fills >= 45 % of its box width (legible at 44 px);
 *   - the tree / bush near-miss: same box, IoU <= 0.55 measured and recorded.
 * POISON (each must FAIL for its own reason; the untouched primitive is the control):
 *   PR3 a bush drawn with the tree's scalloped ring -> IoU;
 *   PR4 a tent drawn as a coral triangle (a side view) -> the top-view rule.
 * SHEET — out/dev/G1-379-map-symbols-{colour,grey}.png at 40, 44 and 48 px (+ 96 px to read
 *   the drawing), for a human to READ.
 */
'use strict';
const tokens = require('../primitives/_tokens.js');
const MS = require('../primitives/map-symbol.js');
const H = require('./b5-maps-harness.js');

/** The pair the page teaches against (data/b5/maps.js NEAR_MISS; copied, the gate never trusts the bank). */
const NEAR_MISS = [['tree', 'bush']];
const PALETTE = new Set(Object.values(tokens.color).map((c) => c.toUpperCase()));
let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }

function nodeChecks(bodyOf) {
  const f = [];
  for (const id of MS.SYMBOL_IDS) for (const px of [36, 44, 48]) {
    const svg = bodyOf ? `<svg>${bodyOf(id)}</svg>` : MS.mapSymbol({ id, px }).svg;
    const hexes = svg.match(/#[0-9a-fA-F]{6}\b/g) || [];
    for (const h of hexes) if (!PALETTE.has(h.toUpperCase())) f.push(`${id}: off-palette ${h}`);
    if (/<text|<tspan/.test(svg)) f.push(`${id}: a <text> on a symbol`);
    if (/>[^<]*[\p{L}\d][^<]*</u.test(svg)) f.push(`${id}: a letter or digit printed`);
    if (!bodyOf) {
      if (!/viewBox="0 0 44 44"/.test(svg)) f.push(`${id}: viewBox ≠ 0 0 44 44`);
      if (!svg.includes(`data-lcs-symbol="${id}"`)) f.push(`${id}: no data-lcs-symbol stamp`);
      if (!new RegExp(`width="${px}"`).test(svg)) f.push(`${id}: width ≠ ${px}`);
    }
  }
  return f;
}

/** Render every symbol at 44 px from `bodies` (id -> inner markup) and measure. */
async function measure(page, bodies, tag) {
  const html = MS.SYMBOL_IDS.map((id) => `<svg id="s-${id}" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">${bodies[id]}</svg>`).join('');
  await H.openDoc(page, `map-symbols-measure-${tag}`, html);
  return page.evaluate(async (ids) => {
    const out = {};
    for (const id of ids) {
      const r = await window.__raster(document.getElementById('s-' + id), 4);
      let n = 0, sum = 0; const rowW = new Array(r.h).fill(0); const ink = r.luma.map((l, i) => (r.alpha[i] && l < 170 ? 1 : 0));
      let x0 = Infinity, x1 = -Infinity;
      for (let y = 0; y < r.h; y++) for (let x = 0; x < r.w; x++) { const i = y * r.w + x; if (r.alpha[i]) { n++; sum += r.luma[i]; rowW[y]++; x0 = Math.min(x0, x); x1 = Math.max(x1, x); } }
      out[id] = { mask: r.alpha, ink, n, meanLuma: n ? sum / n : 255, rowW, w: r.w, h: r.h, fillW: (x1 - x0 + 1) / r.w };
    }
    return out;
  }, MS.SYMBOL_IDS);
}

/** landing round 1 (2026-09-23): no symbol may carry two straight strokes that CROSS — an X over a disc reads as
 *  'no' / 'wrong' / 'forbidden' (the old tent). Pure markup: every <line> pair, proper segment intersection. */
function crossedStrokes(bodies) {
  const f = [];
  for (const [id, b] of Object.entries(bodies)) {
    const L = [...b.matchAll(/<line x1="([-\d.]+)" y1="([-\d.]+)" x2="([-\d.]+)" y2="([-\d.]+)"/g)].map((m) => m.slice(1).map(Number));
    const cr = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
    for (let i = 0; i < L.length; i++) for (let j = i + 1; j < L.length; j++) {
      const [p, q, r, s] = [[L[i][0], L[i][1]], [L[i][2], L[i][3]], [L[j][0], L[j][1]], [L[j][2], L[j][3]]];
      if (cr(p, q, r) * cr(p, q, s) < 0 && cr(r, s, p) * cr(r, s, q) < 0) f.push(`${id}: two straight strokes cross (an X reads as 'no' / 'wrong')`);
    }
  }
  return f;
}

function judgeSet(m) {
  const f = [];
  const ids = MS.SYMBOL_IDS;
  const pairs = [];
  for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) {
    const a = m[ids[i]], b = m[ids[j]];
    let inter = 0, uni = 0;
    for (let k = 0; k < a.mask.length; k++) { if (a.mask[k] && b.mask[k]) inter++; if (a.mask[k] || b.mask[k]) uni++; }
    const iou = inter / uni, dl = Math.abs(a.meanLuma - b.meanLuma) / 255;
    let ii = 0, iu = 0;
    for (let k = 0; k < a.ink.length; k++) { if (a.ink[k] && b.ink[k]) ii++; if (a.ink[k] || b.ink[k]) iu++; }
    const inkIou = iu ? ii / iu : 1;
    pairs.push({ a: ids[i], b: ids[j], iou, dl, inkIou });
    const near = NEAR_MISS.some(([x, y]) => (x === ids[i] && y === ids[j]) || (x === ids[j] && y === ids[i]));
    if (near && iou > 0.55) f.push(`IoU ${ids[i]}/${ids[j]} ${iou.toFixed(3)} > 0.55 (the near-miss silhouettes read as one — the outline must carry it)`);
    if (!(dl >= 0.12 || iou <= 0.35 || inkIou <= 0.35)) f.push(`${ids[i]}/${ids[j]}: IoU ${iou.toFixed(3)} > 0.35, ink-pattern IoU ${inkIou.toFixed(3)} > 0.35 and luminance differs by only ${(dl * 100).toFixed(1)} % (< 12 %) — one symbol in greyscale`);
  }
  for (const id of ids) {
    const s = m[id];
    const rows = s.rowW.map((w, y) => [y, w]).filter(([, w]) => w > 0);
    const maxW = Math.max(...rows.map(([, w]) => w));
    const k = Math.max(1, Math.round(rows.length * 0.12));
    const bottom = Math.max(...rows.slice(-k).map(([, w]) => w)), top = Math.max(...rows.slice(0, k).map(([, w]) => w));
    if (bottom >= 0.95 * maxW && top < 0.45 * maxW) f.push(`${id}: stands on a flat base and narrows upward — a SIDE view, not a top view (the top-view rule)`);
    if (s.fillW < 0.45) f.push(`${id}: fills only ${(s.fillW * 100).toFixed(0)} % of its box width`);
  }
  return { f, pairs };
}

async function main() {
  // node
  const nf = nodeChecks(); nf.forEach((x) => ok(false, 'node: ' + x)); assertions += MS.SYMBOL_IDS.length * 3 * 5;
  for (const [what, fn] of [['px 35', () => MS.mapSymbol({ id: 'tree', px: 35 })], ['unknown id', () => MS.mapSymbol({ id: 'castle' })]]) {
    let threw = false; try { fn(); } catch (e) { threw = true; } ok(threw, `${what} must THROW`);
  }
  const bodies = Object.fromEntries(MS.SYMBOL_IDS.map((id) => [id, MS.symbolBody(id)]));
  const T = tokens.color;
  const log = []; let killed = 0, total = 0;
  const judge = (name, f, re) => { total++; const k = f.some((x) => re.test(x)); log.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };
  let pngs = [];
  await H.withBrowser(async (page) => {
    crossedStrokes(bodies).forEach((x) => ok(false, 'node: ' + x)); assertions++;
    const m = await measure(page, bodies, 'control');
    const { f, pairs } = judgeSet(m);
    f.forEach((x) => ok(false, 'render: ' + x));
    assertions += pairs.length * 2 + MS.SYMBOL_IDS.length * 2;   // the pair rules (+ near-miss) and the per-symbol rules measured above
    const tb = pairs.find((p) => p.a === 'tree' && p.b === 'bush');
    const worst = pairs.slice().sort((a, b) => b.iou - a.iou).slice(0, 4);
    if (process.argv.includes('--table')) for (const p of pairs) console.log(`  ${p.a}/${p.b} iou ${p.iou.toFixed(3)} ink ${p.inkIou.toFixed(3)} dl ${(p.dl * 100).toFixed(1)}`);
    console.log(`render: tree/bush IoU ${tb.iou.toFixed(3)} lum Δ ${(tb.dl * 100).toFixed(1)} %; highest IoU ${worst.map((p) => `${p.a}/${p.b} ${p.iou.toFixed(2)}`).join(', ')}`);
    console.log('  mean luma ' + MS.SYMBOL_IDS.map((id) => `${id} ${m[id].meanLuma.toFixed(0)}`).join(' · '));
    log.push(`  control: ${f.length} findings`);
    // PR3 bush with the tree's scalloped ring
    const p3 = await measure(page, { ...bodies, bush: `<path d="${MS.scallopRing()}" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="1.5"/>` }, 'PR3');
    judge('PR3 bush with a scalloped ring', judgeSet(p3).f, /IoU bush\/tree|IoU tree\/bush/);
    // PR4 tent as a coral triangle (a side view)
    const p4 = await measure(page, { ...bodies, tent: `<path d="M22 6 L40 38 L4 38 Z" fill="${T.coral}" stroke="${T.ink}" stroke-width="2"/>` }, 'PR4');
    judge('PR4 tent as a coral triangle', judgeSet(p4).f, /tent: stands on a flat base/);
    // PR5 (landing round 1): the OLD tent — a coral disc with a white seam X
    const oldTent = `<circle cx="22" cy="22" r="14" fill="${T.coral}" stroke="${T.ink}" stroke-width="2"/><line x1="12.1" y1="12.1" x2="31.9" y2="31.9" stroke="${T.white}" stroke-width="2.5"/><line x1="31.9" y1="12.1" x2="12.1" y2="31.9" stroke="${T.white}" stroke-width="2.5"/>`;
    judge('PR5 the old tent (white seam X)', crossedStrokes({ ...bodies, tent: oldTent }), /tent: two straight strokes cross/);
    if (!process.argv.includes('--no-sheet')) {
      const cell = (id, px) => `<figure style="margin:6px;display:inline-flex;flex-direction:column;align-items:center;gap:4px"><div style="background:#fff;padding:4px;border:1px solid #C8BFAE">${MS.mapSymbol({ id, px }).svg}</div><figcaption>${id} ${px}</figcaption></figure>`;
      const body = [40, 44, 48, 96].map((px) => `<div>${MS.SYMBOL_IDS.map((id) => cell(id, px)).join('')}</div>`).join('');
      pngs = await H.sheet(page, 'map-symbols', body);
    }
  });
  console.log('poison:\n' + log.join('\n'));
  if (pngs.length) console.log('sheets:\n  ' + pngs.join('\n  '));
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 30).join('\n  '));
  const pass = !fails.length && killed === total;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${total} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${total} poisons killed)`);
  return pass;
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { main };
