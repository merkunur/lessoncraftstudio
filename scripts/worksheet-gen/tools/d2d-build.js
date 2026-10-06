#!/usr/bin/env node
/**
 * d2d-build.js — Dot-to-Dot pictures from the 200 Color by Number scenes (Level Set 2026-10-06).
 *
 * For every scene of data/cbn/lineart-designs.js: compose it (lib/cbn-lineart.js compose — the same drawings, sizes and
 * places as the Color by Number sheet), take the HERO (the last item: the animal or object the scene is about), and
 * write data/d2d/<id>.json:
 *   art    — the scene's line art as a path, with the hero's OUTER outline erased (its inner lines — eyes, spots, a
 *            wing — stay): the child draws that outline by joining the dots
 *   lite   — the same for the hero alone on its ground (level 1: nothing else on the page)
 *   ink    — a coarse grid (CELL units) of where any printed line is, so a number is never placed on a line
 *   body   — the same grid for the hero's body, so a number is never placed inside the hero
 *   fit    — for each dot count N used by the faces: the N dots (picture units, clockwise, dot 1 at the top), how well
 *            their polygon covers the hero (iou), the closest pair of dots (minSp), whether the path crosses itself, and
 *            a complexity score (total turning / 2π: 1 = a convex blob, higher = ears, legs, tails)
 * Picture units: 600 × 560 (the scene box). Usage: node tools/d2d-build.js [--only=id,id]
 */
'use strict';
const fs = require('fs'); const path = require('path');
const L = require('../lib/cbn-lineart.js');
const { LINEART } = require('../data/cbn/lineart-designs.js');
const OUT = path.join(__dirname, '..', 'data', 'd2d');
const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : null; };
const only = arg('only') ? new Set(arg('only').split(',')) : null;

const W = L.CW, H = L.CH, U = L.UNIT;
const BAND = 18;            // px: how far into the hero the outer outline is erased (a 7-unit stroke is 14 px wide; 18 takes all of it)
const CELL = 4;             // units per grid cell
const MIN_SP = 22;          // units between any two dots (the page draws ~1.07 px per unit: ≥ 22 px, the K-285 rule)
const HERO_SCALE = 1.35;
const PROP_GAP = 16;         // units between the hero and a prop that stepped aside
const FRAME_GAP = 24;        // units between the hero and the frame (no dot on the frame)
const CRUMB = 40;            // px: hero ink left near the erased outline smaller than this is a crumb of it
const COUNTS = [10, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

function grid(mask) {
  const gw = Math.ceil(600 / CELL), gh = Math.ceil(560 / CELL), g = new Uint8Array(gw * gh), c = CELL * U;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (mask[y * W + x]) g[Math.floor(y / c) * gw + Math.floor(x / c)] = 1;
  // pack: a string of '0'/'1' rows is plain and diff-able; 21,000 chars
  let s = ''; for (const v of g) s += v ? '1' : '0';
  return { w: gw, h: gh, s };
}

/** Visvalingam–Whyatt down to n points (keeps the corners that carry the shape) */
function vw(ring, n) {
  const p = ring.map((q) => q.slice());
  const area = (a, b, c) => Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])) / 2;
  while (p.length > n) {
    let mi = -1, ma = Infinity;
    for (let i = 0; i < p.length; i++) {
      const A = area(p[(i - 1 + p.length) % p.length], p[i], p[(i + 1) % p.length]);
      if (A < ma) { ma = A; mi = i; }
    }
    p.splice(mi, 1);
  }
  return p;
}
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
function segInt(a, b, c, d) {
  const cr = (p, q, r) => (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]);
  const d1 = cr(c, d, a), d2 = cr(c, d, b), d3 = cr(a, b, c), d4 = cr(a, b, d);
  return ((d1 > 0) !== (d2 > 0)) && ((d3 > 0) !== (d4 > 0)) && d1 !== 0 && d2 !== 0 && d3 !== 0 && d4 !== 0;
}
function crosses(p) {
  const n = p.length;
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
    if (j === i + 1 || (i === 0 && j === n - 1)) continue;
    if (segInt(p[i], p[(i + 1) % n], p[j], p[(j + 1) % n])) return true;
  }
  return false;
}
function insidePoly(pt, poly) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if (((yi > pt[1]) !== (yj > pt[1])) && (pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi)) c = !c;
  }
  return c;
}

/**
 * N dots on the outline: the dense ring is first thinned to points MIN_SP/2 apart along the outline, then reduced to
 * N by Visvalingam–Whyatt; a pair of neighbours closer than MIN_SP is resolved by dropping the flatter one and
 * splitting the longest edge at the outline point nearest its middle. Returns null when N dots cannot keep MIN_SP.
 */
function dots(dense, N) {
  const thin = [dense[0]];
  for (const q of dense) if (dist(q, thin[thin.length - 1]) >= MIN_SP / 2) thin.push(q);
  if (dist(thin[0], thin[thin.length - 1]) < MIN_SP / 2) thin.pop();
  if (thin.length < N) return null;
  let p = vw(thin, N);
  const idxOf = (q) => thin.findIndex((t) => t[0] === q[0] && t[1] === q[1]);
  for (let guard = 0; guard < 200; guard++) {
    let bad = -1;
    for (let i = 0; i < p.length; i++) if (dist(p[i], p[(i + 1) % p.length]) < MIN_SP) { bad = i; break; }
    if (bad < 0) break;
    p.splice((bad + 1) % p.length, 1);
    // split the longest edge at the thinned outline point closest to its middle
    let li = 0, ll = -1;
    for (let i = 0; i < p.length; i++) { const d = dist(p[i], p[(i + 1) % p.length]); if (d > ll) { ll = d; li = i; } }
    const a = idxOf(p[li]), b = idxOf(p[(li + 1) % p.length]);
    if (a < 0 || b < 0) return null;
    const span = (b - a + thin.length) % thin.length;
    if (span < 2) return null;
    p.splice(li + 1, 0, thin[(a + Math.round(span / 2)) % thin.length]);
  }
  for (let i = 0; i < p.length; i++) for (let j = i + 1; j < p.length; j++) if (dist(p[i], p[j]) < MIN_SP) return { pts: p, minSp: dist(p[i], p[j]), ok: false };
  return { pts: p, ok: true };
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const report = [];
  /** the hero's body: its largest connected piece, and its bbox */
  const heroBody = (owner, hi) => {
    const raw = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) raw[i] = owner[i] === hi ? 1 : 0;
    const notRaw = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) notRaw[i] = raw[i] ? 0 : 1;
    const cc = L.components(notRaw, W, H);   // components() labels the pixels that are NOT blocked
    let big = null; for (const c of cc.comps) if (!big || c.area > big.area) big = c;
    const body = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) body[i] = raw[i] && cc.lab[i] === big.label ? 1 : 0;
    let x0 = W, y0 = H, x1 = 0, y1 = 0;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (body[y * W + x]) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    return { body, x0, y0, x1, y1 };
  };
  for (const d0 of LINEART) {
    if (only && !only.has(d0.id)) continue;
    // the hero drawn HERO_SCALE larger than on the Color by Number sheet (same scene, same place, same ground line): a
    // dot-to-dot figure fills the page, and a longer outline carries 20-30 dots that still keep its shape
    const hero0 = d0.items[d0.items.length - 1];
    // the enlarged hero must stay inside the frame (FRAME_GAP units clear): shrink in steps until it does
    let scale = HERO_SCALE, d, hi, ink, owner, body, x0, y0, x1, y1;
    for (let t = 0; ; t++) {
      d = { ...d0, items: [...d0.items.slice(0, -1), { ...hero0, h: hero0.h * scale, maxW: 580 }] };
      hi = d.items.length - 1;
      ink = await L.compose(d);
      owner = ink.owner;
      ({ body, x0, y0, x1, y1 } = heroBody(owner, hi));
      const g = FRAME_GAP * U;
      if ((x0 >= g && y0 >= g && x1 <= W - 1 - g && y1 <= H - 1 - g) || scale <= 1) break;
      scale = Math.max(1, scale * 0.92);
    }
    // the props (a barn, a house, a tree, a window) step aside from the enlarged hero: one whose drawing comes within
    // PROP_GAP units of the hero's body moves sideways, away from it, until it is that far clear; with no room inside the
    // frame it is left out (the sky, the ground and every prop that does not touch the hero stay). Otherwise the hero's
    // dots sit against the prop and their numbers can only go inside it.
    {
      const gp = Math.round(PROP_GAP * U), g = FRAME_GAP * U, props = [];
      const near = new Uint8Array(W * H);   // the hero's body dilated by gp (a square)
      const rowD = new Uint8Array(W * H);
      for (let y = 0; y < H; y++) { let last = -1e9; for (let x = 0; x < W; x++) { if (body[y * W + x]) last = x; if (x - last <= gp) rowD[y * W + x] = 1; } last = 1e9; for (let x = W - 1; x >= 0; x--) { if (body[y * W + x]) last = x; if (last - x <= gp) rowD[y * W + x] = 1; } }
      for (let x = 0; x < W; x++) { let last = -1e9; for (let y = 0; y < H; y++) { if (rowD[y * W + x]) last = y; if (y - last <= gp) near[y * W + x] = 1; } last = 1e9; for (let y = H - 1; y >= 0; y--) { if (rowD[y * W + x]) last = y; if (last - y <= gp) near[y * W + x] = 1; } }
      let moved = 0; const dropped = [];
      for (const it of d.items.slice(0, -1)) {
        const alone = await L.compose({ lines: [], items: [it], stroke: d.stroke });
        let touch = false, a0 = W, a1 = -1;
        for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (alone[y * W + x]) { if (near[y * W + x]) touch = true; if (x < a0) a0 = x; if (x > a1) a1 = x; }
        if (!touch) { props.push(it); continue; }
        const right = (a0 + a1) / 2 >= (x0 + x1) / 2;
        const dx = right ? (x1 + gp) - a0 : (x0 - gp) - a1;
        if (a0 + dx < g || a1 + dx > W - 1 - g) { dropped.push(it.src); continue; }
        props.push({ ...it, x: it.x + dx / U }); moved++;
      }
      if (moved || dropped.length) {
        d = { ...d, items: [...props, d.items[d.items.length - 1]] };
        hi = d.items.length - 1;
        ink = await L.compose(d);
        owner = ink.owner;
        ({ body, x0, y0, x1, y1 } = heroBody(owner, hi));
      }
      d.layout = { moved, dropped };
    }
    const rings = L.contours((x, y) => x >= 0 && y >= 0 && x < W && y < H && body[y * W + x] === 1, x0, y0, x1, y1);
    const ringArea = (r) => { let a = 0; for (let i = 0; i < r.length; i++) { const p = r[i], q = r[(i + 1) % r.length]; a += p[0] * q[1] - q[0] * p[1]; } return a / 2; };
    let outer = rings.reduce((m, r) => (!m || Math.abs(ringArea(r)) > Math.abs(ringArea(m)) ? r : m), null);
    if (ringArea(outer) < 0) outer = outer.slice().reverse();   // one winding for every scene
    let dense = L.rdp(outer, 1).map(([x, y]) => [+(x / U).toFixed(1), +(y / U).toFixed(1)]);
    // dot 1 = the top-most point (left-most of a flat top): the child always starts at the top
    let top = 0; dense.forEach((q, i) => { if (q[1] < dense[top][1] - 0.5 || (Math.abs(q[1] - dense[top][1]) <= 0.5 && q[0] < dense[top][0])) top = i; });
    dense = dense.slice(top).concat(dense.slice(0, top));

    // erase the outer outline: hero ink within BAND px of the outside
    const outside = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) outside[i] = body[i] ? 0 : 1;
    // the band follows the hero's own stroke (an enlarged drawing has a thicker line): stroke + 6 px, at least BAND
    const heroInk = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) heroInk[i] = owner[i] === hi && ink[i] ? 1 : 0;
    const band = Math.max(BAND, Math.round(L.strokeWidth(heroInk, W, H)) + 6);
    const near = L.dilate(outside, W, H, band);
    const art = ink.slice(); for (let i = 0; i < W * H; i++) if (owner[i] === hi && near[i]) art[i] = 0;
    // crumbs: small pieces of the hero's ink left just inside the erased band (a textured outline, a hatched rim)
    const nearer = L.dilate(outside, W, H, band * 2);
    const notArt = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) notArt[i] = art[i] && owner[i] === hi ? 0 : 1;
    const pieces = L.components(notArt, W, H);
    const crumbs = new Set(pieces.comps.filter((c) => c.area < CRUMB).map((c) => c.label));
    for (let i = 0; i < W * H; i++) if (art[i] && owner[i] === hi && nearer[i] && crumbs.has(pieces.lab[i])) art[i] = 0;
    const others = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) others[i] = owner[i] >= 0 && owner[i] !== hi ? 1 : 0;
    const artPath = L.maskPath((x, y) => x >= 0 && y >= 0 && x < W && y < H && art[y * W + x] === 1, [0, 0, W - 1, H - 1], U, 1.2);
    // lite: the hero and the ground line only
    // ⚠ NOT compose() of the hero alone: compose lays its items out itself, so a lone hero lands somewhere else than the
    // dots (found 2026-10-06 on a printed level-1 page: the fire truck whole, the dots around it). Taken from THIS
    // scene instead: the hero's own pixels of the erased art + the ground lines wherever the hero does not cover them
    const linesInk = await L.compose({ ...d, items: [] });
    const lite = new Uint8Array(W * H);
    for (let i = 0; i < W * H; i++) lite[i] = (owner[i] === hi ? art[i] : (owner[i] < 0 || owner[i] !== hi) && linesInk[i]) ? 1 : 0;
    const litePath = L.maskPath((x, y) => x >= 0 && y >= 0 && x < W && y < H && lite[y * W + x] === 1, [0, 0, W - 1, H - 1], U, 1.2);

    // fit per dot count: iou of the dot polygon against the body on a 2-unit grid
    const fit = {};
    for (const N of COUNTS) {
      const r = dots(dense, N);
      if (!r) { fit[N] = { ok: false, why: 'too few outline points' }; continue; }
      const p = r.pts;
      let inter = 0, uni = 0;
      for (let y = 0; y < 560; y += 2) for (let x = 0; x < 600; x += 2) {
        const b = body[Math.round(y * U) * W + Math.round(x * U)] === 1, q = insidePoly([x, y], p);
        if (b && q) inter++; if (b || q) uni++;
      }
      const iou = uni ? inter / uni : 0;
      let turn = 0;
      for (let i = 0; i < p.length; i++) {
        const a = p[(i - 1 + p.length) % p.length], b = p[i], c = p[(i + 1) % p.length];
        const t1 = Math.atan2(b[1] - a[1], b[0] - a[0]), t2 = Math.atan2(c[1] - b[1], c[0] - b[0]);
        let dt = t2 - t1; while (dt > Math.PI) dt -= 2 * Math.PI; while (dt < -Math.PI) dt += 2 * Math.PI;
        turn += Math.abs(dt);
      }
      let minSp = Infinity; for (let i = 0; i < p.length; i++) for (let j = i + 1; j < p.length; j++) minSp = Math.min(minSp, dist(p[i], p[j]));
      const cross = crosses(p);
      fit[N] = { pts: p, iou: +iou.toFixed(3), minSp: +minSp.toFixed(1), cross, complexity: +(turn / (2 * Math.PI)).toFixed(2), ok: r.ok && !cross && iou >= 0.88 };
    }
    fs.writeFileSync(path.join(OUT, d.id + '.json'), JSON.stringify({ id: d.id, w: 600, h: 560, hero: d.items[hi].src, names: d.names, band, heroScale: +scale.toFixed(3), layout: d.layout, art: artPath, lite: litePath, ink: grid(art), obj: grid(others), liteInk: grid(lite), body: grid(body), outline: dense, fit }));
    report.push(`${d.id.padEnd(22)} ${COUNTS.filter((n) => fit[n].ok).join(',') || '-'}  iou20=${fit[20].iou ?? '-'} cx20=${fit[20].complexity ?? '-'}`);
    process.stdout.write('.');
  }
  console.log('\n' + report.join('\n'));
})().catch((e) => { console.error(e); process.exit(1); });
