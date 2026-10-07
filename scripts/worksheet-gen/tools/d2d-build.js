#!/usr/bin/env node
/**
 * d2d-build.js — Dot-to-Dot pictures from the 200 Color by Number scenes (Level Set; v2 2026-10-07).
 *
 * v2 after the operator's review ("a line dividing the page", "the drawn part of the outlines … as if the continuation
 * of the connected dots"), to the standard of a good printed dot-to-dot: the picture is drawn with its OWN lines; one
 * stretch of its outline — centred on the top (head, ears, back) — is replaced by dots placed ON that line, close enough
 * that joining them gives the curve back (measured, not assumed). No ground line, no straight pre-printed remainder.
 *
 * For every scene of data/cbn/lineart-designs.js: compose it WITHOUT its ground lines, take the HERO (the last item),
 * enlarge it, move props off it, and write data/d2d/<id>.json (generated; not committed — rebuilds byte-identically):
 *   obj    — a coarse grid of the OTHER drawings (a number is never placed inside a barn)
 *   fit[N] — per dot count N: { ok, pts (picture units 600 × 560, dot 1 first), closed, s (spacing), dev (worst distance
 *            of the real outline from the joined dots), complexity (turning along the stretch / 2π),
 *            art / lite (the scene / the hero alone, with the outline erased along the stretch only), ink / liteInk }
 * Usage: node tools/d2d-build.js [--only=id,id]
 */
'use strict';
const fs = require('fs'); const path = require('path');
const L = require('../lib/cbn-lineart.js');
const sceneDotFigure = require('../primitives/scene-dot-figure.js');
const { LINEART } = require('../data/cbn/lineart-designs.js');
const OUT = path.join(__dirname, '..', 'data', 'd2d');
const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : null; };
const only = arg('only') ? new Set(arg('only').split(',')) : null;

const W = L.CW, H = L.CH, U = L.UNIT;
const BAND = 18;            // px: at least this far around the stretch the outline is erased
const CELL = 4;             // units per grid cell
const MIN_SP = 22;          // units between any two dots (the page draws ~1.07 px per unit: ≥ 22 px, the K-285 rule)
const SPACINGS = [40, 37, 34, 31, 28, 26, 24, 22];   // units between neighbouring dots, tried widest first
const DEV = 7;              // units: the real outline (smoothed over ±SMOOTH units: texture like fur or a tyre tread is not
                            // drawn by a child) may stray at most this far from the joined dots
const SMOOTH = 4;
const HERO_SCALE = 1.35;
const PROP_GAP = 16;        // units between the hero and a prop that stepped aside
const FRAME_GAP = 24;       // units between the hero and the frame (no dot on the frame)
const CLOSE = 2;            // units: gaps in the hero's strokes closed before its silhouette is filled
const CRUMB = 40;           // px: hero ink left in the erased zone smaller than this is a crumb of the outline
const COUNTS = [10, 20, 21, 26, 27, 29];   // 10 / 20 numbers; the alphabet strips: it 21, 26, es 27, Nordic 29

function grid(mask) {
  const gw = Math.ceil(600 / CELL), gh = Math.ceil(560 / CELL), g = new Uint8Array(gw * gh), c = CELL * U;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (mask[y * W + x]) g[Math.floor(y / c) * gw + Math.floor(x / c)] = 1;
  let s = ''; for (const v of g) s += v ? '1' : '0';
  return { w: gw, h: gh, s };
}
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
function segInt(a, b, c, d) {
  const cr = (p, q, r) => (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]);
  const d1 = cr(c, d, a), d2 = cr(c, d, b), d3 = cr(a, b, c), d4 = cr(a, b, d);
  return ((d1 > 0) !== (d2 > 0)) && ((d3 > 0) !== (d4 > 0)) && d1 !== 0 && d2 !== 0 && d3 !== 0 && d4 !== 0;
}
function crosses(p, closed) {
  const n = p.length, m = closed ? n : n - 1;
  for (let i = 0; i < m; i++) for (let j = i + 1; j < m; j++) {
    if (j === i + 1 || (closed && i === 0 && j === n - 1)) continue;
    if (segInt(p[i], p[(i + 1) % n], p[j], p[(j + 1) % n])) return true;
  }
  return false;
}
function segDist(p, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx * dx + dy * dy;
  const t = l2 ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2)) : 0;
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
}

/** the outline as a closed list of points ~1 unit apart, with the arc length at each */
function resample(ring) {
  const out = []; const n = ring.length;
  for (let i = 0; i < n; i++) {
    const a = ring[i], b = ring[(i + 1) % n], l = dist(a, b), k = Math.max(1, Math.ceil(l));
    for (let t = 0; t < k; t++) out.push([a[0] + (b[0] - a[0]) * t / k, a[1] + (b[1] - a[1]) * t / k]);
  }
  const s = [0]; for (let i = 1; i < out.length; i++) s.push(s[i - 1] + dist(out[i - 1], out[i]));
  const m = out.length, sm = out.map((_, i) => { let x = 0, y = 0; for (let k = -SMOOTH; k <= SMOOTH; k++) { const q = out[(i + k + m) % m]; x += q[0]; y += q[1]; } return [x / (2 * SMOOTH + 1), y / (2 * SMOOTH + 1)]; });
  return { p: out, sm, s, P: s[s.length - 1] + dist(out[out.length - 1], out[0]) };
}
const at = (R, len) => { const P = R.P; len = ((len % P) + P) % P; let lo = 0, hi = R.s.length - 1; while (lo < hi) { const m = (lo + hi + 1) >> 1; if (R.s[m] <= len) lo = m; else hi = m - 1; } return lo; };
function turning(R, i, w) {   // turning angle at point i over ±w points
  const n = R.p.length, a = R.p[(i - w + n) % n], b = R.p[i], c = R.p[(i + w) % n];
  const t1 = Math.atan2(b[1] - a[1], b[0] - a[0]), t2 = Math.atan2(c[1] - b[1], c[0] - b[0]);
  let d = t2 - t1; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return Math.abs(d);
}

/**
 * N dots along a stretch of the outline centred on arc position c (dot 1 at the stretch's start, clockwise), at spacing
 * s; each dot then snaps to the sharpest corner within s/3 of it (a corner is where the shape turns — it must carry a dot).
 * Whole outline when (N-1)·s would reach round (then evenly spaced and closed).
 */
function place(R, N, s, c) {
  const closed = N * s >= R.P - 1e-6;
  const sp = closed ? R.P / N : s, len = closed ? R.P : (N - 1) * sp, start = closed ? 0 : c - len / 2;
  let idx = Array.from({ length: N }, (_, k) => at(R, start + k * sp));
  // snap to corners
  const w = 6;
  idx = idx.map((i, k) => {
    if (!closed && (k === 0 || k === N - 1)) return i;
    let best = i, bt = turning(R, i, w);
    for (let d = -Math.round(sp / 3); d <= Math.round(sp / 3); d++) { const j = (i + d + R.p.length) % R.p.length, t = turning(R, j, w); if (t > bt + 0.05) { bt = t; best = j; } }
    return bt > 0.6 ? best : i;
  });
  const pts = idx.map((i) => [+R.p[i][0].toFixed(1), +R.p[i][1].toFixed(1)]);
  // worst distance of the outline (between consecutive dots, along the stretch) from the joined dots
  let dev = 0;
  const n = R.p.length;
  for (let k = 0; k < (closed ? N : N - 1); k++) {
    const a = idx[k], b = idx[(k + 1) % N]; let span = (b - a + n) % n; if (span > n / 2 && !closed) return null;   // snapped backwards
    for (let t = 1; t < span; t++) dev = Math.max(dev, segDist(R.sm[(a + t) % n], pts[k], pts[(k + 1) % N]));
  }
  let minSp = Infinity; for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) minSp = Math.min(minSp, dist(pts[i], pts[j]));
  let turn = 0; for (let k = 1; k < N - 1 + (closed ? 1 : 0); k++) {
    const a = pts[(k - 1 + N) % N], b = pts[k % N], cc = pts[(k + 1) % N];
    let d = Math.atan2(cc[1] - b[1], cc[0] - b[0]) - Math.atan2(b[1] - a[1], b[0] - a[0]); while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; turn += Math.abs(d);
  }
  return { pts, idx, closed, s: +sp.toFixed(1), dev: +dev.toFixed(1), minSp: +minSp.toFixed(1), cross: crosses(pts, closed), complexity: +(turn / (2 * Math.PI)).toFixed(2), arc: closed ? null : [start, start + len] };
}

/**
 * Dots the way a person places them: from a start on the outline, each next dot goes as far ahead as possible
 * (MIN_SP..smax units of outline) while the straight line to it still follows the outline within DEV units — so dots
 * land on the corners and the joined line gives the shape back. Returns the open stretch, or null when the outline has
 * a spike the line cannot follow at ≥ MIN_SP.
 */
function greedy(R, N, startLen, smax) {
  const n = R.p.length, i0 = at(R, startLen);
  const idx = [i0]; let cur = i0, walked = 0;
  const chordDev = (a, b) => { let m = 0; const span = (b - a + n) % n; for (let t = 1; t < span; t++) m = Math.max(m, segDist(R.sm[(a + t) % n], R.p[a], R.p[b])); return m; };
  for (let k = 1; k < N; k++) {
    let pick = -1;
    for (let len = smax; len >= MIN_SP; len -= 1) {
      const j = at(R, R.s[cur] + len);
      if (dist(R.p[cur], R.p[j]) < MIN_SP) continue;
      if (chordDev(cur, j) <= DEV) { pick = j; break; }
    }
    if (pick < 0) return null;
    walked += (pick - cur + n) % n; if (walked >= n - MIN_SP) return null;   // would come round onto dot 1
    idx.push(pick); cur = pick;
  }
  const pts = idx.map((i) => [+R.p[i][0].toFixed(1), +R.p[i][1].toFixed(1)]);
  let minSp = Infinity; for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) minSp = Math.min(minSp, dist(pts[i], pts[j]));
  let turn = 0; for (let k = 1; k < N - 1; k++) { const a = pts[k - 1], b = pts[k], c = pts[k + 1]; let d = Math.atan2(c[1] - b[1], c[0] - b[0]) - Math.atan2(b[1] - a[1], b[0] - a[0]); while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; turn += Math.abs(d); }
  let dev = 0; for (let k = 0; k < N - 1; k++) dev = Math.max(dev, chordDev(idx[k], idx[k + 1]));
  return { pts, idx, closed: false, s: +(walked / (N - 1)).toFixed(1), dev: +dev.toFixed(1), minSp: +minSp.toFixed(1), cross: crosses(pts, false), complexity: +(turn / (2 * Math.PI)).toFixed(2), arc: [R.s[i0], R.s[i0] + walked] };
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const report = [];
  // the hero's silhouette from its INK (strokes closed by CLOSE units, holes filled), largest piece, and its bbox — the
  // dots go ON the drawn outline (an item's mask can carry a white halo past its strokes)
  const heroBody = (ink, owner, hi) => {
    const strokes = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) strokes[i] = ink[i] && owner[i] === hi ? 1 : 0;
    const closed = L.dilate(strokes, W, H, Math.round(CLOSE * U));
    const out = L.components(closed, W, H);
    const outside = new Set([0]);
    for (let x = 0; x < W; x++) { outside.add(out.lab[x]); outside.add(out.lab[(H - 1) * W + x]); }
    for (let y = 0; y < H; y++) { outside.add(out.lab[y * W]); outside.add(out.lab[y * W + W - 1]); }
    const raw = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) raw[i] = closed[i] || !outside.has(out.lab[i]) ? 1 : 0;
    const notRaw = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) notRaw[i] = raw[i] ? 0 : 1;
    const cc = L.components(notRaw, W, H);
    let big = null; for (const c of cc.comps) if (!big || c.area > big.area) big = c;
    const body = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) body[i] = raw[i] && cc.lab[i] === big.label ? 1 : 0;
    let x0 = W, y0 = H, x1 = 0, y1 = 0;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (body[y * W + x]) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    return { body, x0, y0, x1, y1 };
  };
  for (const dScene of LINEART) {
    if (only && !only.has(dScene.id)) continue;
    const d0 = { ...dScene, lines: [] };   // no ground line: on a dot-to-dot page it reads as a line dividing the page
    const hero0 = d0.items[d0.items.length - 1];
    let scale = HERO_SCALE, d, hi, ink, owner, body, x0, y0, x1, y1;
    for (;;) {
      d = { ...d0, items: [...d0.items.slice(0, -1), { ...hero0, h: hero0.h * scale, maxW: 580 }] };
      hi = d.items.length - 1;
      ink = await L.compose(d); owner = ink.owner;
      ({ body, x0, y0, x1, y1 } = heroBody(ink, owner, hi));
      const g = FRAME_GAP * U;
      if ((x0 >= g && y0 >= g && x1 <= W - 1 - g && y1 <= H - 1 - g) || scale <= 1) break;
      scale = Math.max(1, scale * 0.92);
    }
    // props touching the enlarged hero step aside (or are left out when there is no room) — numbers never inside them
    {
      const gp = Math.round(PROP_GAP * U), g = FRAME_GAP * U, props = [];
      const near = L.dilate(body, W, H, gp);
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
        ink = await L.compose(d); owner = ink.owner;
        ({ body, x0, y0, x1, y1 } = heroBody(ink, owner, hi));
      }
      d.layout = { moved, dropped };
    }
    const heroInk = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) heroInk[i] = owner[i] === hi && ink[i] ? 1 : 0;
    const sw = L.strokeWidth(heroInk, W, H);
    const band = Math.max(BAND, Math.round(sw) + 6);
    // the outline the dots sit on: the CENTRE of the outer stroke — the silhouette shrunk by half a stroke + the closing
    const notBody = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) notBody[i] = body[i] ? 0 : 1;
    const grown = L.dilate(notBody, W, H, Math.round(sw / 2 + CLOSE * U));
    const core = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) core[i] = grown[i] ? 0 : 1;
    // the outline: the outer ring of the stroke's centre line, clockwise, as points ~1 unit apart (picture units)
    const rings = L.contours((x, y) => x >= 0 && y >= 0 && x < W && y < H && core[y * W + x] === 1, x0, y0, x1, y1);
    const ringArea = (r) => { let a = 0; for (let i = 0; i < r.length; i++) { const p = r[i], q = r[(i + 1) % r.length]; a += p[0] * q[1] - q[0] * p[1]; } return a / 2; };
    let outer = rings.reduce((m, r) => (!m || Math.abs(ringArea(r)) > Math.abs(ringArea(m)) ? r : m), null);
    if (ringArea(outer) < 0) outer = outer.slice().reverse();
    const R = resample(L.rdp(outer, 1).map(([x, y]) => [x / U, y / U]));
    let top = 0; R.p.forEach((q, i) => { if (q[1] < R.p[top][1] - 0.5 || (Math.abs(q[1] - R.p[top][1]) <= 0.5 && q[0] < R.p[top][0])) top = i; });
    const topLen = R.s[top];

    const outside = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) outside[i] = body[i] ? 0 : 1;
    const nearOut = L.dilate(outside, W, H, band), nearOut2 = L.dilate(outside, W, H, band * 2);
    const others = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) others[i] = owner[i] >= 0 && owner[i] !== hi ? 1 : 0;

    /** the art with the outline erased along the stretch from arc length a to b (whole outline when closed) */
    const erase = (f) => {
      let zone;
      if (f.closed) zone = nearOut;
      else {
        // the stretch, shortened by the band at each end so the drawn line runs right up to dot 1 and the last dot
        const m = new Uint8Array(W * H), cut = band / U;
        for (let L0 = f.arc[0] + cut; L0 <= f.arc[1] - cut; L0 += 0.5) { const q = R.p[at(R, L0)]; const x = Math.round(q[0] * U), y = Math.round(q[1] * U); if (x >= 0 && y >= 0 && x < W && y < H) m[y * W + x] = 1; }
        const nearArc = L.dilate(m, W, H, band * 2);
        zone = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) zone[i] = nearOut[i] && nearArc[i] ? 1 : 0;
        f._nearArc = nearArc;
      }
      const art = ink.slice(); for (let i = 0; i < W * H; i++) if (owner[i] === hi && zone[i]) art[i] = 0;
      // crumbs of the outline left in the zone
      const notArt = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) notArt[i] = art[i] && owner[i] === hi ? 0 : 1;
      const pieces = L.components(notArt, W, H);
      const crumbs = new Set(pieces.comps.filter((c) => c.area < CRUMB).map((c) => c.label));
      for (let i = 0; i < W * H; i++) if (art[i] && owner[i] === hi && nearOut2[i] && (f.closed || f._nearArc[i]) && crumbs.has(pieces.lab[i])) art[i] = 0;
      const lite = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) lite[i] = owner[i] === hi && art[i] ? 1 : 0;
      delete f._nearArc;
      return { art, lite };
    };

    const fit = {};
    const objGrid = grid(others), coreGrid = grid(core);
    const rad = Math.round(sw / 2 + 3);
    for (const N of COUNTS) {
      // candidate stretches in order of preference: centred on the top, then sliding round; widest spacing first
      const cands = [];
      const ok = (f) => f && !f.cross && f.minSp >= MIN_SP && f.dev <= DEV;
      if (N * MIN_SP * 1.3 >= R.P) { const f = place(R, N, R.P / N, topLen); if (ok(f)) cands.push(f); }
      else {
        for (const shift of [0, -0.06, 0.06, -0.12, 0.12, -0.2, 0.2, -0.3, 0.3, -0.4, 0.4, 0.5])
          for (const smax of [60, 48, 40]) {
            const f = greedy(R, N, topLen - (N - 1) * smax * 0.4 + shift * R.P, smax);
            if (f && !f.cross && f.minSp >= MIN_SP) cands.push(f);
          }
        const f = place(R, N, R.P / N, topLen); if (ok(f)) cands.push(f);
      }
      let why = cands.length ? '' : 'no spacing keeps the outline within ' + DEV + ' units';
      for (const best of cands) {
        if (best.closed) { let t = 0; best.pts.forEach((q, i) => { if (q[1] < best.pts[t][1]) t = i; }); best.pts = best.pts.slice(t).concat(best.pts.slice(0, t)); }
        const { art, lite } = erase(best);
        // the line the child draws must really be missing: sample the joined dots (ends excluded), look for hero ink
        // within half a stroke + 3 px of it — a stretch whose outline is still drawn (a tyre, a double outline) is no task
        let smp = 0, still = 0;
        for (let k = 0; k < best.pts.length - (best.closed ? 0 : 1); k++) {
          const p0 = best.pts[k], p1 = best.pts[(k + 1) % best.pts.length];
          for (let t = 0.2; t <= 0.8; t += 0.1) {
            const x = Math.round((p0[0] + (p1[0] - p0[0]) * t) * U), y = Math.round((p0[1] + (p1[1] - p0[1]) * t) * U); smp++;
            let hit = false;
            for (let dy = -rad; dy <= rad && !hit; dy++) for (let dx = -rad; dx <= rad && !hit; dx++) { const X = x + dx, Y = y + dy; if (X >= 0 && Y >= 0 && X < W && Y < H && art[Y * W + X] && owner[Y * W + X] === hi) hit = true; }
            if (hit) still++;
          }
        }
        const missing = +(1 - still / Math.max(1, smp)).toFixed(2);
        if (missing < 0.85) { why = 'the stretch is still drawn (' + missing + ')'; continue; }
        const cand = {
          ok: true, missing, pts: best.pts, closed: best.closed, s: best.s, dev: best.dev, minSp: best.minSp, complexity: best.complexity,
          art: L.maskPath((x, y) => x >= 0 && y >= 0 && x < W && y < H && art[y * W + x] === 1, [0, 0, W - 1, H - 1], U, 1.2),
          lite: L.maskPath((x, y) => x >= 0 && y >= 0 && x < W && y < H && lite[y * W + x] === 1, [0, 0, W - 1, H - 1], U, 1.2),
          ink: grid(art), liteInk: grid(lite),
        };
        // every number must find free paper outside the picture: test with the largest numerals a face prints
        // (two digits at 20 px on the full scene; the level-1 page tests its own 24 px on the hero alone); a stretch into a notch (stem, ears, tail) fails here
        if (!process.env.D2D_LOOSE) try { sceneDotFigure({ scene: { v: 2, id: d.id, obj: objGrid, body: coreGrid, fit: { [N]: cand } }, count: N, startAt: 88, step: 0, labelPx: 20 }); }
        catch (e) { why = 'numbers do not fit outside the picture'; if (process.env.D2D_DEBUG) console.error(d.id, N, best.s, (best.arc || []).map((x) => Math.round(x)).join('-'), e.message.replace(/.*number /, '#')); continue; }
        fit[N] = cand; break;
      }
      if (!fit[N]) fit[N] = { ok: false, why };
    }
    fs.writeFileSync(path.join(OUT, d.id + '.json'), JSON.stringify({ v: 2, id: d.id, w: 600, h: 560, hero: d.items[hi].src, names: d.names, band, heroScale: +scale.toFixed(3), layout: d.layout, perimeter: +R.P.toFixed(0), obj: objGrid, body: coreGrid, fit }));
    report.push(`${d.id.padEnd(22)} P=${R.P.toFixed(0)} ${COUNTS.map((n) => fit[n].ok ? `${n}:${fit[n].closed ? 'O' : ''}s${fit[n].s}` : `${n}:-`).join(' ')}`);
    process.stdout.write('.');
  }
  console.log('\n' + report.join('\n'));
})().catch((e) => { console.error(e); process.exit(1); });
