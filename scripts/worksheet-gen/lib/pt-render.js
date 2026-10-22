/**
 * pt-render.js — Picture Tracing (b9): draw traced library drawings and vector motifs as tracing guides on a page.
 *
 *   STYLES          the guide ladder (page px): P1 thick dashes (PreK) · P2 dashes (K) · P3 fine dashes (G1) · P4 dots
 *   placeTrace(tr, item) → the drawing's polylines in PAGE px, placed by its INK box (never its square canvas):
 *                   item = { x, y, h | w, anchor: 'bottom'|'centre', flip }  (x, y) = bottom-centre (or centre) of the ink
 *   guidePaths(lines, style, opts) → SVG markup: every line dashed with its rhythm ALIGNED to its own length (an open line
 *                   starts and ends on a dash; a closed line is a whole number of periods), so no line ends in a stub
 *                   or a gap; a fragment too short for a dash prints as one short solid stroke (a lone dot reads as dirt)
 *   modelImage(file, box) → the ORIGINAL library drawing (cache/themes-512, base64) for "look" models
 * Coordinates are transformed into page px BEFORE dashing so every picture on a page has the same rhythm whatever its
 * scale (an SVG transform would scale the dashes with the picture).
 */
'use strict';
const fs = require('fs'); const path = require('path');
const { plen } = require('./pt-trace.js');

const GUIDE = '#6b6b6b';
/** the guide ladder (pedagogy contract §1, page px): stroke, dash on/off, the colour (thin lines darker so they survive
 *  cheap printers) and the solid ink colour for details too short / too crowded to trace at that band */
const STYLES = {
  P1: { w: 4.0, dash: 14, gap: 8, colour: '#7a7a7a', dot: false },
  P2: { w: 3.0, dash: 10, gap: 6, colour: '#6e6e6e', dot: false },
  P3: { w: 2.1, dash: 6, gap: 5, colour: '#5a5a5a', dot: false },
  P4: { w: 2.6, dash: 0.01, gap: 7, colour: '#4f4f4f', dot: true },
};
/** the band rules (pedagogy contract §1): the shortest line that is still TRACED, the closest two guide lines may run */
const BANDS = {
  // speck: a SOLID OPEN fragment shorter than this is tracing residue (a junction tick, a spur stub) and is left out —
  // on a traced picture it reads as a stray letter or a start dot (final visual review: 'Δ' ticks on a wing, a solid L
  // on a roof, a solid diagonal in a tent). Filled blobs (eyes) and closed rings (buttons) are never specks.
  PreK: { style: 'P1', minSeg: 50, gap: 28, clear: 30, minPic: 300, speck: 20 },
  K: { style: 'P2', minSeg: 25, gap: 18, clear: 16, minPic: 130, speck: 14 },
  G1: { style: 'P3', minSeg: 12, gap: 10, clear: 10, minPic: 80, speck: 9 },
};
const INK = '#2b2b2b';

/** the drawing's polylines in page px; returns { lines:[{pts,closed}], blobs:[{d}], box:{x0,y0,x1,y1}, s } */
function placeTrace(tr, item) {
  const b = tr.inkBox, iw = b.x1 - b.x0 + 1, ih = b.y1 - b.y0 + 1;
  const s = item.h ? item.h / ih : item.w / iw;
  const W = iw * s, H = ih * s;
  const cx = item.x, top = item.anchor === 'centre' ? item.y - H / 2 : item.y - H;
  const left = cx - W / 2;
  const fx = (x) => (item.flip ? left + (b.x1 - x) * s : left + (x - b.x0) * s);
  const fy = (y) => top + (y - b.y0) * s;
  const lines = tr.paths.map((p) => ({ pts: p.pts.map(([x, y]) => [fx(x), fy(y)]), closed: p.closed, outer: p.outer }));
  // item.dropTiny = N: closed marks shorter than N page px are left out (two tiny rain rings printed solid read as the
  // digit 0 on a page with no numbers, da panel; dropTinyOpen also drops short OPEN marks — a solid L on a dotted roof, no panel) — never used to thin a picture, only to drop a stray glyph-like mark
  if (item.dropTiny) for (let i = lines.length - 1; i >= 0; i--) { const L = lines[i]; if (!L.closed && !item.dropTinyOpen) continue; let n = 0; for (let k = 1; k < L.pts.length; k++) n += Math.hypot(L.pts[k][0] - L.pts[k - 1][0], L.pts[k][1] - L.pts[k - 1][1]); if (n < item.dropTiny) lines.splice(i, 1); }
  // blob outlines are SVG path data in work px: re-emit them through a transform (fills do not dash, so a transform is safe)
  const tf = item.flip
    ? `matrix(${-s} 0 0 ${s} ${(left + b.x1 * s).toFixed(2)} ${(top - b.y0 * s).toFixed(2)})`
    : `matrix(${s} 0 0 ${s} ${(left - b.x0 * s).toFixed(2)} ${(top - b.y0 * s).toFixed(2)})`;
  // item.noBlobs: no filled solid shapes (a tractor's tyre lugs read as a row of start dots; a knot in a crown as a stray
  // blob — final visual review). Only for pictures whose fills are texture, never eyes.
  const blobs = item.noBlobs ? [] : tr.blobs.map((x) => ({ d: x.d, transform: tf }));
  return { lines, blobs, box: { x0: left, y0: top, x1: left + W, y1: top + H }, s };
}

const f2 = (v) => (Math.round(v * 100) / 100).toString();
function dPath(pts, closed) {
  let s = 'M' + f2(pts[0][0]) + ' ' + f2(pts[0][1]);
  for (let i = 1; i < pts.length; i++) s += 'L' + f2(pts[i][0]) + ' ' + f2(pts[i][1]);
  return closed ? s + 'Z' : s;
}

/** one line → one <path> with an aligned dash rhythm */
function guideLine(ln, st, colour) {
  const L = plen(ln.pts);
  if (L < 0.5) return '';
  const base = `fill="none" stroke="${colour}" stroke-width="${st.w}" stroke-linecap="round" stroke-linejoin="round"`;
  const p0 = st.dash + st.gap;
  let k, n;
  if (ln.closed) { n = Math.max(3, Math.round(L / p0)); k = L / (n * p0); }
  else { n = Math.max(1, Math.round((L + st.gap) / p0)); k = (L + st.gap) / (n * p0); }
  const da = (st.dash * k).toFixed(2), ga = (st.gap * k).toFixed(2);
  return `<path d="${dPath(ln.pts, ln.closed)}" ${base} stroke-dasharray="${da} ${ga}"/>`;
}

/** for every line: is it TRACED, or a detail printed SOLID (pedagogy contract §1)?
 *  The unit is the NETWORK, not the line: lines that touch at a junction (an end within 3.5 px of another line) form
 *  one figure, and a figure of any real size is traced whole — however many short pieces its junctions cut it into.
 *  ⚠ Judging each fragment by its own length turned a flower solid: its petals touch, so its 46 traced pieces were
 *  mostly under 25 px (2026-10-22). Only SEPARATE MARKS (a network shorter than 3 × the band's shortest segment) can
 *  go solid: a mark shorter than the shortest segment, or a mark that runs within the band's gap of a bigger network
 *  for most of its length (eyelashes, an inner ear line, whiskers by the cheek). Marks then take one treatment as
 *  siblings / parallel families / mirror pairs (below). */
function classify(lines, band) {
  const B = typeof band === 'string' ? BANDS[band] : band;
  if (!B) return lines.map(() => 'trace');
  const pts = lines.map((l) => l.pts);
  const lens = lines.map((l) => plen(l.pts));
  // 1 networks (union-find over junction contacts)
  const J = 3.5, par = lines.map((_, i) => i); const fnd = (i) => (par[i] === i ? i : (par[i] = fnd(par[i])));
  const jg = new Map(); const jk = (x, y) => ((x / J) | 0) + ',' + ((y / J) | 0);
  pts.forEach((P, k) => P.forEach(([x, y]) => { const key = jk(x, y); if (!jg.has(key)) jg.set(key, new Set()); jg.get(key).add(k); }));
  lines.forEach((l, k) => {
    for (const e of [l.pts[0], l.pts[l.pts.length - 1]]) {
      const gx = (e[0] / J) | 0, gy = (e[1] / J) | 0;
      for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) for (const q of jg.get((gx + dx) + ',' + (gy + dy)) || []) if (q !== k) par[fnd(k)] = fnd(q);
    }
  });
  const netLen = new Map(); lines.forEach((_, k) => netLen.set(fnd(k), (netLen.get(fnd(k)) || 0) + lens[k]));
  const net = (k) => netLen.get(fnd(k));
  const mark = lines.map((_, k) => net(k) < 3 * B.minSeg);
  // 2 crowding of a mark against a BIGGER network
  const cell = Math.max(4, B.gap);
  const grid = new Map();
  pts.forEach((P, k) => P.forEach(([x, y], i) => { if (i % 2) return; const key = ((x / cell) | 0) + ',' + ((y / cell) | 0); if (!grid.has(key)) grid.set(key, []); grid.get(key).push([x, y, k]); }));
  const raw = lines.map((ln, k) => {
    if (!mark[k]) return 'trace';
    if (net(k) < B.minSeg) return 'solid';
    // a tiny closed ring (salt on a pretzel, a button, a nostril) smaller than ~ the band's gap is a dot, not a line
    if (ln.closed) { let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; for (const [x, y] of ln.pts) { if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y; } if (Math.max(x1 - x0, y1 - y0) < 1.2 * B.gap) return 'solid'; }
    let near = 0, n = 0;
    for (let i = 0; i < ln.pts.length; i += 2) {
      const [x, y] = ln.pts[i]; n++;
      const gx = (x / cell) | 0, gy = (y / cell) | 0; let hit = false;
      for (let dx = -1; dx <= 1 && !hit; dx++) for (let dy = -1; dy <= 1 && !hit; dy++) {
        for (const q of grid.get((gx + dx) + ',' + (gy + dy)) || []) if (fnd(q[2]) !== fnd(k) && net(q[2]) > net(k) && Math.hypot(q[0] - x, q[1] - y) < B.gap) { hit = true; break; }
      }
      if (hit) near++;
    }
    return n && near / n > 0.6 ? 'solid' : 'trace';
  });
  // SIBLINGS get one treatment: repeated parts (the sun's rays, four window panes) cluster by length (consecutive
  // ratio ≤ 1.3) and a cluster of ≥ 3 takes its majority — half the rays solid and half dashed reads as a mistake
  const order = lens.map((L, k) => [L, k]).sort((p, q) => p[0] - q[0]);
  let start = 0;
  for (let i = 1; i <= order.length; i++) {
    if (i < order.length && order[i][0] <= order[i - 1][0] * 1.3 && order[i][0] <= order[start][0] * (order[i][0] < 3 * B.minSeg ? 2.2 : 1.7)) continue;   // no chaining from tiny to big (short details may span wider: belly stripes)
    const all = order.slice(start, i).map(([, k]) => k);
    // siblings are the SAME kind of part: closed rings with closed rings, open strokes with open strokes (a flower's
    // stems are not its petals, 2026-10-22)
    for (const grp of [all.filter((k) => mark[k] && lines[k].closed), all.filter((k) => mark[k] && !lines[k].closed)]) if (grp.length >= 2) {
      // pairs too (the bunny's two inner ears); a tie goes to TRACE for a pair, to SOLID for a larger group (rays)
      const solid = grp.filter((k) => raw[k] === 'solid').length;
      const v = grp.length === 2 ? (solid === 2 ? 'solid' : 'trace') : (solid * 2 >= grp.length ? 'solid' : 'trace');
      if (v === 'trace' && grp.some((k) => lens[k] < B.minSeg)) grp.forEach((k) => { if (lens[k] < B.minSeg) raw[k] = 'solid'; else raw[k] = 'trace'; });
      else grp.forEach((k) => { raw[k] = v; });
    }
    start = i;
  }
  // PARALLEL FAMILIES (the whale's belly stripes, fur ticks, a fence's slats): open lines of similar direction (≤ 20°),
  // length within 3× and midpoints within 4 gaps chain into a family; a family of ≥ 3 takes ONE treatment — traced if
  // any member is traced and every member is at least half the shortest traced segment, else solid (2026-10-22: three
  // stripes solid and five dashed on one whale)
  {
    const dir = lines.map((l) => { const a = l.pts[0], z = l.pts[l.pts.length - 1]; return Math.atan2(z[1] - a[1], z[0] - a[0]); });
    const mid = lines.map((l) => l.pts[(l.pts.length / 2) | 0]);
    const par = lines.map((_, i) => i); const f = (i) => (par[i] === i ? i : (par[i] = f(par[i])));
    for (let a = 0; a < lines.length; a++) for (let b = a + 1; b < lines.length; b++) {
      if (lines[a].closed || lines[b].closed || !mark[a] || !mark[b]) continue;
      const r = lens[a] / lens[b]; if (r < 1 / 3 || r > 3) continue;
      let da = Math.abs(dir[a] - dir[b]) % Math.PI; if (da > Math.PI / 2) da = Math.PI - da;
      if (da > 20 * Math.PI / 180) continue;
      if (Math.hypot(mid[a][0] - mid[b][0], mid[a][1] - mid[b][1]) > 4 * B.gap) continue;
      par[f(a)] = f(b);
    }
    const fam = new Map(); lines.forEach((_, i) => { const r = f(i); if (!fam.has(r)) fam.set(r, []); fam.get(r).push(i); });
    for (const g of fam.values()) {
      if (g.length < 3) continue;
      // majority by count (a tie goes to TRACE); in a traced family only true details (< half the shortest segment)
      // stay solid — one short leaf must not turn a flower's stems solid (2026-10-22)
      const nT = g.filter((k) => raw[k] === 'trace').length;
      const v = nT * 2 >= g.length ? 'trace' : 'solid';
      for (const k of g) raw[k] = v === 'trace' && lens[k] < 0.5 * B.minSeg ? 'solid' : v;
    }
  }
  // MIRROR PAIRS (the two inner ears, two eyebrows): a line whose mirror image about the picture's centre lands on a
  // line of similar length takes one treatment with it — traced when both are long enough to trace
  let X0 = 1e9, X1 = -1e9; for (const l of lines) for (const [x] of l.pts) { if (x < X0) X0 = x; if (x > X1) X1 = x; }
  const ax = (X0 + X1) / 2, span = Math.max(1, X1 - X0);
  const cen = lines.map((l) => { let x = 0, y = 0; for (const p of l.pts) { x += p[0]; y += p[1]; } return [x / l.pts.length, y / l.pts.length]; });
  for (let a = 0; a < lines.length; a++) for (let b = a + 1; b < lines.length; b++) {
    if (raw[a] === raw[b] || !mark[a] || !mark[b]) continue;
    const r = lens[a] / lens[b]; if (r < 0.75 || r > 1.33) continue;
    if (Math.hypot(2 * ax - cen[a][0] - cen[b][0], cen[a][1] - cen[b][1]) > 0.08 * span) continue;
    const v = lens[a] >= B.minSeg && lens[b] >= B.minSeg ? 'trace' : 'solid';
    raw[a] = raw[b] = v;
  }
  return raw;
}

/** many lines (+ solid parts) as guide markup; opts.band applies the band rules (classify) */
function guidePaths(placed, style, opts = {}) {
  const st = typeof style === 'string' ? STYLES[style] : style;
  const colour = opts.colour || st.colour || GUIDE;
  let kinds = opts.band ? classify(placed.lines, opts.band) : placed.lines.map(() => 'trace');
  const B0 = typeof opts.band === 'string' ? BANDS[opts.band] : opts.band;
  // outline only (PreK, pedagogy #2): the drawing's inner lines are drawn solid, only its outer outline is traced
  if (opts.outline) kinds = kinds.map((k, i) => (placed.lines[i].outer ? k : 'solid'));
  let out = '', marks = '';
  for (const b of placed.blobs || []) out += `<path d="${b.d}" transform="${b.transform}" fill="${opts.blobColour || INK}"/>`;
  // start markers: 'lines' = every traced line, 'picture' = the picture's longest traced line only
  if (opts.start) {
    const traced = placed.lines.map((ln, k) => [ln, k]).filter(([, k]) => kinds[k] === 'trace');
    const pick = opts.start === 'lines' ? traced : traced.sort((p, q) => plen(q[0].pts) - plen(p[0].pts)).slice(0, 1);
    const dots = [];
    for (const [ln] of pick) {
      if (!ln.fixed) ln.pts = orient(ln);                    // a designed stroke keeps its own direction
      // two strokes from ONE point (a flag's pole and cloth): one dot, both arrows — two overlapping dots read as a blob
      const p0 = ln.pts[0], shared = dots.some((d) => Math.hypot(d[0] - p0[0], d[1] - p0[1]) < 8);
      marks += startMarker(ln.pts, st, INK, shared); dots.push(p0);
    }
  }
  placed.lines.forEach((ln, k) => {
    if (kinds[k] === 'solid' && !ln.closed && B0 && B0.speck && plen(ln.pts) < B0.speck) return;
    // opts.noSolid: a picture whose solid details read as half-finished drawing inside its dashes (a banana's ridge — final
    // visual review) keeps only what the child traces
    if (kinds[k] === 'solid' && opts.noSolid) return;
    if (kinds[k] === 'solid') out += `<path d="${dPath(ln.pts, ln.closed)}" fill="none" stroke="${INK}" stroke-width="${Math.max(1.6, st.w * 0.7).toFixed(2)}" stroke-linecap="round" stroke-linejoin="round" data-pt-solid="1"/>`;
    else out += guideLine(ln, st, colour);
  });
  return out + marks;
}

/** start marker (pedagogy §1 direction convention): a dot at the line's start + a small arrow along its first run.
 *  open line: start at the TOP end (or the LEFT end when it runs nearly flat); closed line: start near 2 o'clock and run
 *  anticlockwise (the start of c / o). Returns { pts (re-ordered), svg }. */
function orient(ln) {
  const P = ln.pts.slice();
  if (!ln.closed) {
    const a = P[0], z = P[P.length - 1];
    const flat = Math.abs(z[1] - a[1]) < Math.abs(z[0] - a[0]) * 0.35;
    const rev = flat ? z[0] < a[0] : z[1] < a[1];
    return rev ? P.reverse() : P;
  }
  let cx = 0, cy = 0; for (const [x, y] of P) { cx += x; cy += y; } cx /= P.length; cy /= P.length;
  const target = Math.PI / 6;                                    // 2 o'clock, measured anticlockwise from 3 o'clock
  let best = 0, bd = 1e9;
  P.forEach(([x, y], i) => { const a = Math.atan2(cy - y, x - cx); const d = Math.abs(Math.atan2(Math.sin(a - target), Math.cos(a - target))); if (d < bd) { bd = d; best = i; } });
  let Q = P.slice(0, -1); Q = Q.slice(best).concat(Q.slice(0, best)); Q.push(Q[0]);
  // anticlockwise for the viewer: the visual angle (y up) increases along the path
  const a0 = Math.atan2(cy - Q[0][1], Q[0][0] - cx), a1 = Math.atan2(cy - Q[4][1], Q[4][0] - cx);
  if (Math.atan2(Math.sin(a1 - a0), Math.cos(a1 - a0)) < 0) Q.reverse();
  return Q;
}
/** the start marker of a ROUND picture, taken from its silhouette, not from its traced fragments (a ball's outline is
 *  cut into open pieces by its seams, so the closed-line rule never applied and the arrow ran clockwise, 2026-10-22):
 *  a ray from the body's centroid at 2 o'clock; the dot where the ray leaves the body; the arrow along the
 *  ANTICLOCKWISE tangent there. tr = the trace, item = the placement (flip honoured). Returns SVG. */
function contourMarker(tr, item, st, colour = INK, at = 30) {
  const b = tr.inkBox, iw = b.x1 - b.x0 + 1, ih = b.y1 - b.y0 + 1;
  const s = item.h ? item.h / ih : item.w / iw;
  const left = item.x - (iw * s) / 2, top = item.anchor === 'centre' ? item.y - (ih * s) / 2 : item.y - ih * s;
  let cx = 0, cy = 0, n = 0;
  for (let y = b.y0; y <= b.y1; y += 2) for (let x = b.x0; x <= b.x1; x += 2) if (tr.body[y * tr.W + x]) { cx += x; cy += y; n++; }
  cx /= n; cy /= n;
  const a = (item.flip ? 180 - at : at) * Math.PI / 180;      // at° anticlockwise from 3 o'clock: 30 = 2 o'clock (a round thing), 90 = the top (a figure)
  let r = 0; while (r < Math.max(iw, ih)) { const x = Math.round(cx + Math.cos(a) * r), y = Math.round(cy - Math.sin(a) * r); if (x < 0 || y < 0 || x >= tr.W || y >= tr.H || !tr.body[y * tr.W + x]) break; r += 1; }
  r -= 0.6 * tr.sw;                                            // on the line's centre, not its outer edge
  const wx = cx + Math.cos(a) * r, wy = cy - Math.sin(a) * r;
  const px = item.flip ? left + (b.x1 - wx) * s : left + (wx - b.x0) * s, py = top + (wy - b.y0) * s;
  let tx = -Math.sin(a), ty = -Math.cos(a);                    // anticlockwise for the viewer (screen y points down)
  if (item.flip) tx = -tx;
  return startMarker([[px, py], [px + tx * 40, py + ty * 40]], st, colour);
}
function startMarker(pts, st, colour = INK, noDot = false) {
  const [x0, y0] = pts[0];
  let i = 1, d = 0; while (i < pts.length - 1 && d < st.dash * 2.2 + 10) { d += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); i++; }
  const [x1, y1] = pts[i]; const a = Math.atan2(y1 - y0, x1 - x0);
  // the arrow sits BESIDE the line (offset to the left of travel), so it never covers the guide
  const ox = Math.sin(a) * 13, oy = -Math.cos(a) * 13;
  const ax = x0 + Math.cos(a) * 16 + ox, ay = y0 + Math.sin(a) * 16 + oy, bx = ax + Math.cos(a) * 14, by = ay + Math.sin(a) * 14;
  const h = 5.5, l = [bx - Math.cos(a - 0.5) * h * 1.6, by - Math.sin(a - 0.5) * h * 1.6], r = [bx - Math.cos(a + 0.5) * h * 1.6, by - Math.sin(a + 0.5) * h * 1.6];
  return (noDot ? '' : `<circle cx="${f2(x0)}" cy="${f2(y0)}" r="${(st.w * 1.35 + 2.2).toFixed(2)}" fill="${colour}"/>`)
    + `<path d="M${f2(ax)} ${f2(ay)}L${f2(bx)} ${f2(by)}M${f2(l[0])} ${f2(l[1])}L${f2(bx)} ${f2(by)}L${f2(r[0])} ${f2(r[1])}" fill="none" stroke="${colour}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
}

/** a solid ink rendering of placed lines (a model drawn from the same lines, e.g. the solid half of a mirror face) */
function solidPaths(placed, w, colour = '#1a1a1a') {
  let out = '';
  for (const b of placed.blobs || []) out += `<path d="${b.d}" transform="${b.transform}" fill="${colour}"/>`;
  for (const ln of placed.lines) out += `<path d="${dPath(ln.pts, ln.closed)}" fill="none" stroke="${colour}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  return out;
}

const LIB512 = path.join(__dirname, '..', 'cache', 'themes-512');
/** the original library drawing as an <image>, placed by its ink box like placeTrace (same item contract) */
function modelImage(rel, tr, item) {
  const file = path.join(LIB512, rel + '@3x.webp');
  const src = fs.existsSync(file) ? file : path.join(__dirname, '..', 'cache', 'themes', rel + '@3x.webp');
  const b64 = fs.readFileSync(src).toString('base64');
  const b = tr.inkBox, iw = b.x1 - b.x0 + 1, ih = b.y1 - b.y0 + 1;
  const s = item.h ? item.h / ih : item.w / iw;
  const left = item.x - (iw * s) / 2, top = item.anchor === 'centre' ? item.y - (ih * s) / 2 : item.y - ih * s;
  const full = tr.W * s, fullH = tr.H * s;              // the image is the WHOLE work canvas; offset so the ink box lands
  const ix = left - b.x0 * s, iy = top - b.y0 * s;
  const fl = item.flip ? ` transform="translate(${f2(2 * ix + full)} 0) scale(-1 1)"` : '';
  return `<image href="data:image/webp;base64,${b64}" x="${f2(ix)}" y="${f2(iy)}" width="${f2(full)}" height="${f2(fullH)}" preserveAspectRatio="none"${fl}/>`;
}

module.exports = { contourMarker, STYLES, BANDS, GUIDE, INK, placeTrace, guidePaths, guideLine, solidPaths, modelImage, dPath, classify, orient, startMarker };
