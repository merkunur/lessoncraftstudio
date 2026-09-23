#!/usr/bin/env node
/**
 * verify-top-side-view.js — the gate of primitives/top-side-view.js (G1-379 `maps` F1; design
 * docs/worksheet-gen/b5-designs/G1-379-maps.md §3 F1 "Verify" + §5 PR6).
 *
 *   node scripts/worksheet-gen/qa/verify-top-side-view.js [--no-sheet]
 *
 * NODE — every MAPS.TOPSIDE model x both views at box 84: token hexes only, no <text>; the ONE
 *   scale stamped on both views equals min(84/ex, 84/ey, 84/ez) computed HERE from the record's
 *   solids (the gate re-derives the extents, never reads meta); each view's larger side >= 56
 *   (the K floor); a view under 56 THROWS; an unknown model THROWS; the design's class table
 *   (circle cup/bucket/roundTable/tree · rect rectTable/bed/car/house · square chair/cone) and
 *   the never-together pairs are present.
 * RENDER (the element's markup rasterised at 4x, measured):
 *   - both views from ONE record: the rendered INK x-extents agree within +-1 px (the tree's
 *     scalloped crown within +-6 units x s) — the width seen from the front IS the width seen
 *     from above;
 *   - the side view STANDS: its lowest ink row is the bottom of the box (+-2 px);
 *   - each view's rendered larger side >= 55 px (56 less the anti-aliasing);
 *   - REGISTRATION (PR6): the house's top view === map-symbol 'house' — the map-symbol is drawn
 *     at the top view's rendered bbox and the two are compared pixel by pixel: silhouette IoU
 *     >= 0.92 AND dark-half (luma < 150) IoU >= 0.85.
 * POISON — PR6 a house top view with its roof halves swapped -> registration; P-scale the
 *   bucket's top fitted at its OWN scale (84 / width) instead of the one scale -> the x-extent rule.
 * SHEET — out/dev/G1-379-top-side-view-{colour,grey}.png: every model side | top at 84 (+ 168).
 */
'use strict';
const tokens = require('../primitives/_tokens.js');
const TSV = require('../primitives/top-side-view.js');
const MS = require('../primitives/map-symbol.js');
const { MAPS } = require('../data/b5/maps.js');
const H = require('./b5-maps-harness.js');

const PALETTE = new Set(Object.values(tokens.color).map((c) => c.toUpperCase()));
const CLASSES = { cup: 'circle', bucket: 'circle', roundTable: 'circle', tree: 'circle', rectTable: 'rect', bed: 'rect', car: 'rect', house: 'rect', chair: 'square', cone: 'square' };
let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }

/** the extents, re-derived here from the record (independent of the primitive's extentsOf) */
function extents(rec) {
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity, z0 = Infinity, z1 = -Infinity;
  const add = (a, b, c, d, e, f) => { x0 = Math.min(x0, a); x1 = Math.max(x1, b); y0 = Math.min(y0, c); y1 = Math.max(y1, d); z0 = Math.min(z0, e); z1 = Math.max(z1, f); };
  for (const o of rec.solids) {
    if (o.type === 'box' || o.type === 'gableY') add(o.x0, o.x1, o.y0, o.y1, o.z0, o.z1);
    else if (o.type === 'cyl') add(o.cx - o.r, o.cx + o.r, o.cy - o.r, o.cy + o.r, o.z0, o.z1);
    else if (o.type === 'frustum') { const R = Math.max(o.r0, o.r1); add(o.cx - R, o.cx + R, o.cy - R, o.cy + R, o.z0, o.z1); }
    else if (o.type === 'crown') add(o.cx - o.r, o.cx + o.r, o.cy - o.r, o.cy + o.r, o.cz - o.r, o.cz + o.r);
    else if (o.type === 'cylY') add(o.cx - o.r, o.cx + o.r, o.y0, o.y1, o.cz - o.r, o.cz + o.r);
    else if (o.type === 'handle') add(o.x0, o.x1, o.cy - o.t / 2, o.cy + o.t / 2, o.z0, o.z1);
    else if (o.type === 'arc') add(o.cx - o.r, o.cx + o.r, o.cy - 1, o.cy + 1, o.z0, o.z0 + o.h);
  }
  return { ex: x1 - x0, ey: y1 - y0, ez: z1 - z0 };
}

async function measure(page, items, tag) {
  await H.openDoc(page, `top-side-measure-${tag}`, items.map((it, i) => `<div id="v${i}" style="display:inline-block;margin:6px">${it.svg}</div>`).join(''));
  return page.evaluate(async (n) => {
    const out = [];
    for (let i = 0; i < n; i++) {
      const svg = document.querySelector(`#v${i} svg`);
      const r = await window.__raster(svg, 4);
      let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      for (let y = 0; y < r.h; y++) for (let x = 0; x < r.w; x++) if (r.alpha[y * r.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
      out.push({ x0: x0 / 4, x1: (x1 + 1) / 4, y0: y0 / 4, y1: (y1 + 1) / 4, H: r.h / 4, alpha: r.alpha, luma: r.luma });
    }
    return out;
  }, items.length);
}

/** Registration: the map-symbol house drawn over the top view's rendered bbox, compared pixel by pixel. */
async function registration(page, topSvg) {
  const [m] = await measure(page, [{ svg: topSvg }], 'reg-top');
  const bw = m.x1 - m.x0, bh = m.y1 - m.y0;
  // the map-symbol's ink spans x 3..41 / y 6..38 of its 44 box (rect 4..40 / 7..37, stroke 2)
  const kx = bw / 38, ky = bh / 32, sx = m.x0 - 3 * kx, sy = m.y0 - 6 * ky;
  const sym = `<svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" viewBox="0 0 84 84" style="overflow:visible"><g transform="translate(${sx} ${sy}) scale(${kx} ${ky})">${MS.symbolBody('house')}</g></svg>`;
  const [a, b] = await measure(page, [{ svg: topSvg }, { svg: sym }], 'reg-pair');
  let si = 0, su = 0, di = 0, du = 0;
  for (let p = 0; p < a.alpha.length; p++) {
    if (a.alpha[p] && b.alpha[p]) si++;
    if (a.alpha[p] || b.alpha[p]) su++;
    const da = a.alpha[p] && a.luma[p] < 150, db = b.alpha[p] && b.luma[p] < 150;
    if (da && db) di++;
    if (da || db) du++;
  }
  return { sil: si / su, dark: du ? di / du : 0 };
}

function pairRule(m, side, top, s) {
  const f = [];
  const tol = m === 'tree' ? 6 * s : 1;
  const d = Math.max(Math.abs(side.x0 - top.x0), Math.abs(side.x1 - top.x1));
  if (d > tol) f.push(`${m}: side and top ink x-extents differ by ${d.toFixed(2)} px (> ${tol.toFixed(1)}) — two scales, not one record`);
  if (Math.abs(side.y1 - side.H) > 2) f.push(`${m}: the side view does not stand on the bottom of its box (${(side.H - side.y1).toFixed(1)} px above)`);
  for (const [nm, v] of [['side', side], ['top', top]]) if (Math.max(v.x1 - v.x0, v.y1 - v.y0) < 55) f.push(`${m} ${nm}: rendered larger side ${Math.max(v.x1 - v.x0, v.y1 - v.y0).toFixed(1)} < 56`);
  return f;
}

async function main() {
  const models = Object.keys(MAPS.TOPSIDE);
  ok(models.slice().sort().join() === Object.keys(CLASSES).sort().join(), `TOPSIDE models [${models}] ≠ the design's ten`);
  for (const m of models) ok(MAPS.TOPSIDE[m].cls === CLASSES[m], `${m}: class ${MAPS.TOPSIDE[m].cls} ≠ ${CLASSES[m]}`);
  ok(JSON.stringify(MAPS.TOPSIDE_NEVER_TOGETHER) === JSON.stringify([['cup', 'bucket'], ['rectTable', 'bed']]), 'never-together pairs ≠ the design');
  const items = [];
  for (const m of models) {
    const e = extents(MAPS.TOPSIDE[m]);
    const s = Math.min(84 / e.ex, 84 / e.ey, 84 / e.ez);
    for (const view of ['side', 'top']) {
      const svg = TSV.topSideView({ model: m, view }).svg;
      for (const h of svg.match(/#[0-9a-fA-F]{6}\b/g) || []) ok(PALETTE.has(h.toUpperCase()), `${m} ${view}: off-palette ${h}`);
      ok(!/<text/.test(svg), `${m} ${view}: a <text> in a view`);
      ok(Math.abs(+svg.match(/data-lcs-scale="([\d.]+)"/)[1] - s) < 0.01, `${m} ${view}: stamped scale ≠ the one-scale ${s.toFixed(3)}`);
      const big = Math.max(e.ex * s, view === 'side' ? e.ez * s : e.ey * s);
      ok(big >= 56 - 1e-6, `${m} ${view}: larger side ${big.toFixed(1)} < 56`);
      items.push({ m, view, svg, s });
    }
  }
  for (const [what, fn] of [['unknown model', () => TSV.topSideView({ model: 'boat', view: 'top' })], ['a view under 56', () => TSV.topSideView({ model: 'x', view: 'top', record: { solids: [{ type: 'box', x0: 0, x1: 100, y0: 0, y1: 20, z0: 0, z1: 200 }] } })]]) {
    let threw = false; try { fn(); } catch (e) { threw = true; } ok(threw, `${what} must THROW`);
  }
  const log = []; let killed = 0, total = 0;
  const judgeP = (name, f, re) => { total++; const k = f.some((x) => re.test(x)); log.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };
  let pngs = [];
  await H.withBrowser(async (page) => {
    const ms = await measure(page, items, 'all');
    const f = [];
    for (let i = 0; i < items.length; i += 2) f.push(...pairRule(items[i].m, ms[i], ms[i + 1], items[i].s));
    f.forEach((x) => ok(false, 'render: ' + x)); assertions += items.length;
    console.log('render (ink w x h, side | top): ' + models.map((m, j) => { const a = ms[2 * j], b = ms[2 * j + 1]; return `${m} ${(a.x1 - a.x0).toFixed(0)}x${(a.y1 - a.y0).toFixed(0)}|${(b.x1 - b.x0).toFixed(0)}x${(b.y1 - b.y0).toFixed(0)}`; }).join(' · '));
    const reg = await registration(page, TSV.topSideView({ model: 'house', view: 'top' }).svg);
    ok(reg.sil >= 0.92 && reg.dark >= 0.85, `house top ≠ map-symbol house (silhouette IoU ${reg.sil.toFixed(3)}, dark IoU ${reg.dark.toFixed(3)}) — registration`);
    console.log(`registration: house top vs map-symbol house — silhouette IoU ${reg.sil.toFixed(3)}, dark-half IoU ${reg.dark.toFixed(3)}`);
    log.push(`  control: ${f.length} findings, registration ${reg.sil.toFixed(2)} / ${reg.dark.toFixed(2)}`);
    // PR6 roof halves swapped (the first tealSoft rect becomes teal, the teal half-path becomes tealSoft)
    const good = TSV.topSideView({ model: 'house', view: 'top' }).svg;
    const swapped = good.replace(/(<rect [^>]*fill=")#DDEBE8(")/, '$1__T__$2').replace(/(<path d="M[^"]+" fill=")#146B5E(")/, '$1#DDEBE8$2').replace('__T__', '#146B5E');
    const r6 = await registration(page, swapped);
    judgeP('PR6 house top ≠ map-symbol (halves swapped)', r6.sil >= 0.92 && r6.dark >= 0.85 ? [] : [`registration fails (dark IoU ${r6.dark.toFixed(3)})`], /registration fails/);
    // P-scale: the bucket's TOP drawn at its own fit (s = 84 / width, 1.75) instead of the one scale (84 / height, 1.448)
    const flat = { solids: MAPS.TOPSIDE.bucket.solids.filter((o) => o.type !== 'arc').map((o) => ({ ...o, z1: 20 })) };
    const [ps, pt] = await measure(page, [{ svg: TSV.topSideView({ model: 'bucket', view: 'side' }).svg }, { svg: TSV.topSideView({ model: 'bucket', view: 'top', record: flat }).svg }], 'pscale');
    judgeP('P-scale bucket top at its own scale', pairRule('bucket', ps, pt, TSV.scaleOf(MAPS.TOPSIDE.bucket, 84)), /two scales/);
    if (!process.argv.includes('--no-sheet')) {
      const cell = (m, px) => `<figure style="margin:6px;display:inline-flex;flex-direction:column;align-items:center;gap:4px;background:#fff;padding:6px;border:1px solid #C8BFAE"><div style="display:flex;gap:14px;align-items:flex-end"><div style="border-bottom:3px solid #146B5E">${TSV.topSideView({ model: m, view: 'side', box: px }).svg}</div>${TSV.topSideView({ model: m, view: 'top', box: px }).svg}</div><figcaption>${m} side | top ${px}</figcaption></figure>`;
      const body = `<div>${models.map((m) => cell(m, 84)).join('')}</div><div>${models.slice(0, 5).map((m) => cell(m, 168)).join('')}</div><div>${models.slice(5).map((m) => cell(m, 168)).join('')}</div>`;
      pngs = await H.sheet(page, 'top-side-view', body);
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
