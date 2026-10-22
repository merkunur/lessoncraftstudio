/**
 * pt-trace.js — Picture Tracing (b9): turn one of the image library's B&W line drawings into TRACING LINES that lie on
 * the drawing's own ink (the "nothing to erase" law, project_htd_guide_pages_drawn: a fitted shape never matches a
 * drawing; a guide taken FROM the drawing's ink always does).
 *
 *   traceDrawing(file, opts) → { W, H, sw, paths:[{ pts:[[x,y]…], closed, len }], blobs:[{ d }], inkBox }
 *     coordinates in WORK pixels (the drawing scaled so its longer side = opts.work, default 800)
 *
 * Method (each step documented in METHOD-picture-tracing.md §3):
 *   1 ink mask (cbn-lineart.inkMask) at the work size; specks < 6 px removed
 *   2 SOLID parts (pupils, nose dots, filled shapes) = pixels deeper than 1.7× the half stroke width; their components,
 *     grown back by the half stroke, are kept SOLID on the page (a face must still read as a face)
 *   3 Zhang-Suen thinning of the remaining ink → a 1-px skeleton
 *   4 the skeleton as a graph: endpoints, junction clusters, edges walked pixel by pixel
 *   5 spurs (an edge with a free end shorter than 1.6× the stroke width) pruned; repeated until stable
 *   6 edges joined straight through a junction when their tangents continue (≤ 40°) so a dash run is not broken at
 *     every crossing; closed loops detected
 *   7 Ramer-Douglas-Peucker (ε 0.7 px) then two Chaikin rounds → smooth polylines
 */
'use strict';
const { inkMask, components } = require('./cbn-lineart.js');

/* ---------------------------------------------------------------- distance (city-block 3-4 chamfer) */
function chamfer(m, W, H) {
  const INF = 1e9, d = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) d[i] = m[i] ? INF : 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x; if (!d[i]) continue; let v = d[i];
    if (x > 0) v = Math.min(v, d[i - 1] + 3);
    if (y > 0) { v = Math.min(v, d[i - W] + 3); if (x > 0) v = Math.min(v, d[i - W - 1] + 4); if (x < W - 1) v = Math.min(v, d[i - W + 1] + 4); }
    d[i] = v;
  }
  for (let y = H - 1; y >= 0; y--) for (let x = W - 1; x >= 0; x--) {
    const i = y * W + x; if (!d[i]) continue; let v = d[i];
    if (x < W - 1) v = Math.min(v, d[i + 1] + 3);
    if (y < H - 1) { v = Math.min(v, d[i + W] + 3); if (x < W - 1) v = Math.min(v, d[i + W + 1] + 4); if (x > 0) v = Math.min(v, d[i + W - 1] + 4); }
    d[i] = v;
  }
  for (let i = 0; i < W * H; i++) d[i] /= 3;
  return d;
}

/* ---------------------------------------------------------------- Zhang-Suen thinning */
function thin(src, W, H) {
  const m = src.slice();
  let changed = true;
  const del = [];
  while (changed) {
    changed = false;
    for (let pass = 0; pass < 2; pass++) {
      del.length = 0;
      for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
        const i = y * W + x; if (!m[i]) continue;
        const p2 = m[i - W], p3 = m[i - W + 1], p4 = m[i + 1], p5 = m[i + W + 1], p6 = m[i + W], p7 = m[i + W - 1], p8 = m[i - 1], p9 = m[i - W - 1];
        const B = p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
        if (B < 2 || B > 6) continue;
        const A = (!p2 && p3) + (!p3 && p4) + (!p4 && p5) + (!p5 && p6) + (!p6 && p7) + (!p7 && p8) + (!p8 && p9) + (!p9 && p2);
        if (A !== 1) continue;
        if (pass === 0) { if (p2 && p4 && p6) continue; if (p4 && p6 && p8) continue; }
        else { if (p2 && p4 && p8) continue; if (p2 && p6 && p8) continue; }
        del.push(i);
      }
      if (del.length) { changed = true; for (const i of del) m[i] = 0; }
    }
  }
  return m;
}

const N8 = (W) => [-W, -1, 1, W, -W - 1, -W + 1, W - 1, W + 1];   // 4-neighbours first: a walk takes the step, not the corner

/* ---------------------------------------------------------------- skeleton → graph of edges */
/** neighbour groups: how many 8-connected groups the set neighbours of i form (0..4) and how many there are */
const RING_XY = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]];
function nbGroups(m, W, i) {
  const on = []; for (let k = 0; k < 8; k++) if (m[i + RING_XY[k][1] * W + RING_XY[k][0]]) on.push(k);
  if (on.length <= 1) return { B: on.length, C: on.length };
  const par = on.map((_, a) => a); const f = (a) => (par[a] === a ? a : (par[a] = f(par[a])));
  for (let a = 0; a < on.length; a++) for (let b = a + 1; b < on.length; b++) {
    const [ax, ay] = RING_XY[on[a]], [bx, by] = RING_XY[on[b]];
    if (Math.max(Math.abs(ax - bx), Math.abs(ay - by)) === 1) par[f(a)] = f(b);
  }
  let C = 0; for (let a = 0; a < on.length; a++) if (f(a) === a) C++;
  return { B: on.length, C };
}
/** remove REDUNDANT pixels: a pixel that is not a line end (B ≥ 2) and whose neighbours form ONE 8-connected group
 *  can go without breaking anything; repeat until stable. Zhang-Suen leaves staircase corners and 2-px-thick spots
 *  whose pixels have 3 neighbours without being junctions — counting them chopped every line into 7-px edges that
 *  pruning then deleted (the giraffe's smile, 2026-10-21). Afterwards: end = B 1, line = C 2, junction = C ≥ 3. */
function cleanCorners(sk, W, H) {
  const m = sk.slice();
  for (let pass = 0; pass < 6; pass++) {
    let n = 0;
    for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
      const i = y * W + x; if (!m[i]) continue;
      const g = nbGroups(m, W, i);
      if (g.B >= 2 && g.C === 1) { m[i] = 0; n++; }
    }
    if (!n) break;
  }
  return m;
}

function skeletonEdges(sk0, W, H) {
  const sk = cleanCorners(sk0, W, H);
  const nb = N8(W);
  const deg = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) if (sk[i]) { const g = nbGroups(sk, W, i); deg[i] = g.B <= 1 ? g.B : (g.C >= 3 ? 3 : 2); }
  const node = new Int32Array(W * H).fill(-1);
  const nodes = [];
  for (let i = 0; i < W * H; i++) {
    if (!sk[i] || node[i] >= 0 || deg[i] === 2) continue;
    const id = nodes.length, pix = [i]; node[i] = id;
    if (deg[i] >= 3) for (let k = 0; k < pix.length; k++) for (const o of nb) { const j = pix[k] + o; if (sk[j] && deg[j] !== 2 && deg[j] !== 1 && node[j] < 0) { node[j] = id; pix.push(j); } }
    let sx = 0, sy = 0; for (const p of pix) { sx += p % W; sy += (p / W) | 0; }
    nodes.push({ id, pix, x: sx / pix.length, y: sy / pix.length, end: deg[i] <= 1 });
  }
  const used = new Uint8Array(W * H);
  const edges = [];
  const seenPair = new Set();
  for (const n of nodes) for (const p of n.pix) for (const o of nb) {
    const j = p + o; if (!sk[j] || node[j] === n.id) continue;
    if (node[j] >= 0) {                                        // node touching another node directly
      const key = Math.min(n.id, node[j]) + ':' + Math.max(n.id, node[j]);
      if (!seenPair.has(key)) { seenPair.add(key); edges.push({ a: n.id, b: node[j], px: [p, j] }); }
      continue;
    }
    if (used[j]) continue;
    const px = [p, j]; let prev = p, cur = j;
    while (node[cur] < 0) {
      used[cur] = 1;
      let nxt = -1;
      for (const q of nb) { const k = cur + q; if (sk[k] && k !== prev && !(node[k] >= 0 && k === p && px.length < 3)) { if (!used[k] || node[k] >= 0) { nxt = k; break; } } }
      if (nxt < 0) break;
      prev = cur; cur = nxt; px.push(cur);
    }
    let b = node[cur];
    if (b < 0) {                                              // the walk ran out on a used pixel: a free end of its own
      b = nodes.length; nodes.push({ id: b, pix: [cur], x: cur % W, y: (cur / W) | 0, end: true });
    }
    edges.push({ a: n.id, b, px });
  }
  for (let i = 0; i < W * H; i++) {                           // pure loops (an eye ring with no junction)
    if (!sk[i] || used[i] || node[i] >= 0) continue;
    const px = [i]; used[i] = 1; let cur = i, ok = true;
    while (ok) { ok = false; for (const o of nb) { const j = cur + o; if (sk[j] && !used[j] && node[j] < 0) { used[j] = 1; px.push(j); cur = j; ok = true; break; } } }
    if (px.length > 6) edges.push({ a: -1, b: -1, px, loop: true });
  }
  const toXY = (p) => [p % W, (p / W) | 0];
  return { nodes, edges: edges.map((e) => ({ a: e.a, b: e.b, loop: !!e.loop, pts: e.px.map(toXY) })), clean: sk };
}

const plen = (pts) => { let s = 0; for (let i = 1; i < pts.length; i++) s += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return s; };

function prune(graph, minLen) {
  let { nodes, edges } = graph;
  for (let round = 0; round < 4; round++) {
    const degN = new Map();
    for (const e of edges) if (!e.loop) { degN.set(e.a, (degN.get(e.a) || 0) + 1); degN.set(e.b, (degN.get(e.b) || 0) + 1); }
    const before = edges.length;
    edges = edges.filter((e) => {
      if (e.loop) return plen(e.pts) >= minLen;
      const fa = (degN.get(e.a) || 0) === 1, fb = (degN.get(e.b) || 0) === 1;
      const L = plen(e.pts);
      if (fa && fb) return L >= minLen * 0.9;          // an isolated short stroke: keep only if a real mark
      if ((fa || fb) && L < minLen) return false;      // a spur off a junction
      return true;
    });
    if (edges.length === before) break;
  }
  return { nodes, edges };
}

/* join chains through nodes: degree-2 nodes always, junctions when tangents continue */
function chain(graph) {
  const { edges } = graph;
  const at = new Map();
  edges.forEach((e, k) => { if (e.loop) return; for (const n of [e.a, e.b]) { if (!at.has(n)) at.set(n, []); at.get(n).push(k); } });
  const dirAt = (pts, fromStart) => { const n = Math.min(8, pts.length - 1); const p = fromStart ? pts[0] : pts[pts.length - 1], q = fromStart ? pts[n] : pts[pts.length - 1 - n]; return Math.atan2(q[1] - p[1], q[0] - p[0]); };
  const done = new Uint8Array(edges.length);
  const out = [];
  const pick = (node, k, arriveAngle) => {
    const list = (at.get(node) || []).filter((j) => j !== k && !done[j]);
    if (!list.length) return -1;
    const deg = (at.get(node) || []).length;
    let best = -1, bestTurn = 1e9;
    for (const j of list) {
      const e = edges[j]; const leave = dirAt(e.pts, e.a === node);
      let turn = Math.abs(((leave - arriveAngle) + 3 * Math.PI) % (2 * Math.PI) - Math.PI);
      if (turn < bestTurn) { bestTurn = turn; best = j; }
    }
    if (deg === 2) return best;
    return bestTurn < (40 * Math.PI / 180) ? best : -1;
  };
  for (let k = 0; k < edges.length; k++) {
    if (done[k]) continue;
    const e = edges[k]; done[k] = 1;
    if (e.loop) {
      const a = e.pts[0], z = e.pts[e.pts.length - 1];
      const shut = Math.hypot(a[0] - z[0], a[1] - z[1]) <= 2;
      out.push({ pts: shut ? e.pts.concat([a]) : e.pts.slice(), closed: shut }); continue;
    }
    let pts = e.pts.slice();
    // extend forward from b, then backward from a
    for (const forward of [true, false]) {
      let node = forward ? e.b : e.a, last = k;
      for (;;) {
        const tail = forward ? pts : pts.slice().reverse();
        const arrive = Math.atan2(tail[tail.length - 1][1] - tail[Math.max(0, tail.length - 9)][1], tail[tail.length - 1][0] - tail[Math.max(0, tail.length - 9)][0]);
        const j = pick(node, last, arrive);
        if (j < 0) break;
        const f = edges[j];
        // orient the segment by GEOMETRY (the end nearest the tail), never by node id alone: a self-loop at a junction
        // (a === b) or a multi-pixel junction cluster made the id test append the far end — a straight jump across the
        // picture (the chick, 2026-10-21). A join with a gap over 3 px is refused.
        const tailPt = tail[tail.length - 1];
        const d0 = Math.hypot(f.pts[0][0] - tailPt[0], f.pts[0][1] - tailPt[1]);
        const d1 = Math.hypot(f.pts[f.pts.length - 1][0] - tailPt[0], f.pts[f.pts.length - 1][1] - tailPt[1]);
        if (Math.min(d0, d1) > 3) break;
        done[j] = 1;
        const seg = d0 <= d1 ? f.pts : f.pts.slice().reverse();
        pts = forward ? pts.concat(seg.slice(1)) : seg.slice().reverse().slice(0, -1).concat(pts);
        node = d0 <= d1 ? f.b : f.a; last = j;                // an edge's pts run from a to b: the far end is the next node
        if (node === (forward ? e.a : e.b)) break;
      }
    }
    const closed = Math.hypot(pts[0][0] - pts[pts.length - 1][0], pts[0][1] - pts[pts.length - 1][1]) < 2.5 && pts.length > 8;
    out.push({ pts, closed });
  }
  return out;
}

function rdp(pts, eps) {
  if (pts.length < 3) return pts.slice();
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const st = [[0, pts.length - 1]];
  while (st.length) {
    const [a, b] = st.pop(); let md = 0, mi = -1;
    const [ax, ay] = pts[a], [bx, by] = pts[b], L = Math.hypot(bx - ax, by - ay) || 1;
    for (let i = a + 1; i < b; i++) { const d = Math.abs((bx - ax) * (ay - pts[i][1]) - (ax - pts[i][0]) * (by - ay)) / L; if (d > md) { md = d; mi = i; } }
    if (md > eps) { keep[mi] = 1; st.push([a, mi], [mi, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}
/** RDP on a CLOSED ring: plain RDP measures every distance against a zero-length first→last chord and collapses the
 *  ring to a point (twice in this family: the giraffe's spots, the vector cloud) — simplify the two halves split at
 *  the vertex farthest from the first */
function rdpRing(r, eps) {
  let far = 0, fd = -1;
  for (let i = 0; i < r.length; i++) { const d = Math.hypot(r[i][0] - r[0][0], r[i][1] - r[0][1]); if (d > fd) { fd = d; far = i; } }
  const ring = r[r.length - 1][0] === r[0][0] && r[r.length - 1][1] === r[0][1] ? r : r.concat([r[0]]);
  return rdp(ring.slice(0, far + 1), eps).concat(rdp(ring.slice(far), eps).slice(1));
}
function chaikin(pts, closed, rounds = 2) {
  let p = pts;
  for (let r = 0; r < rounds; r++) {
    if (p.length < 3) return p;
    const q = closed ? [] : [p[0]];
    const n = p.length;
    for (let i = 0; i < n - 1; i++) {
      const a = p[i], b = p[i + 1];
      q.push([0.75 * a[0] + 0.25 * b[0], 0.75 * a[1] + 0.25 * b[1]], [0.25 * a[0] + 0.75 * b[0], 0.25 * a[1] + 0.75 * b[1]]);
    }
    if (closed) q.push(q[0]); else q.push(p[n - 1]);
    p = q;
  }
  return p;
}

/* ---------------------------------------------------------------- the trace */
async function traceDrawing(file, opts = {}) {
  const sharp = require('sharp');
  const WORK = opts.work || 800;
  const img = sharp(file).flatten({ background: '#ffffff' });
  const meta = await img.metadata();
  const sc = WORK / Math.max(meta.width, meta.height);
  const W = Math.round(meta.width * sc), H = Math.round(meta.height * sc);
  const { data } = await img.resize(W, H).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let ink = inkMask(data, W, H, { dark: opts.dark || 150, alpha: 20 });
  // pad 2 px border off (thinning needs a clean frame)
  for (let x = 0; x < W; x++) { ink[x] = ink[W + x] = ink[(H - 1) * W + x] = ink[(H - 2) * W + x] = 0; }
  for (let y = 0; y < H; y++) { ink[y * W] = ink[y * W + 1] = ink[y * W + W - 1] = ink[y * W + W - 2] = 0; }
  // remove specks
  {
    const block = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) block[i] = ink[i] ? 0 : 1;
    const { lab, comps } = labelInk(ink, W, H);
    for (const c of comps) if (c.area < 6) for (const p of c.pix) ink[p] = 0;
    void block; void lab;
  }
  const dist = chamfer(ink, W, H);
  // stroke width: median of 2·dist over skeleton pixels
  let sk0 = thin(ink, W, H);
  const ds = []; for (let i = 0; i < W * H; i++) if (sk0[i]) ds.push(dist[i]);
  ds.sort((a, b) => a - b);
  const half = ds.length ? ds[(ds.length / 2) | 0] : 1.5;
  const sw = 2 * half;
  // SOLID parts (pupils, nose dots, a filled heart): a deep CORE that is (1) compact — round-ish, not a ribbon (a thick
  // outline is deep along its whole length) and (2) clearly deeper than the lines around it (a junction of two thick
  // lines is deep too, but only as deep as those lines). The clown fish's 2×-thick outline made false dots at every
  // junction until (2) compared the core with its LOCAL line, not the drawing's median (2026-10-21).
  const fat = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) if (dist[i] > Math.max(2.2, 1.75 * half)) fat[i] = 1;
  const { comps: cores } = labelInk(fat, W, H);
  const solid = new Uint8Array(W * H);
  for (const c of cores) {
    const w = c.x1 - c.x0 + 1, h = c.y1 - c.y0 + 1, md = Math.max(w, h);
    const compact = c.area / (Math.PI * (md / 2) * (md / 2));
    let depth = 0, cx = 0, cy = 0; for (const p of c.pix) { if (dist[p] > depth) depth = dist[p]; cx += p % W; cy += (p / W) | 0; }
    cx /= c.area; cy /= c.area;
    if (compact < 0.3 || c.area < 4) continue;
    // local line half-width: median depth of skeleton pixels in an annulus around the core
    const r0 = md / 2 + 2 * depth, r1 = md / 2 + 6 * depth + 6, loc = [];
    for (let y = Math.max(0, (cy - r1) | 0); y < Math.min(H, cy + r1); y++) for (let x = Math.max(0, (cx - r1) | 0); x < Math.min(W, cx + r1); x++) {
      const i = y * W + x; if (!sk0[i]) continue; const d = Math.hypot(x - cx, y - cy); if (d >= r0 && d <= r1) loc.push(dist[i]);
    }
    loc.sort((p, q) => p - q);
    const localHalf = loc.length >= 8 ? loc[(loc.length * 0.8) | 0] : half;   // the THICKER lines nearby
    if (depth < 1.7 * localHalf) continue;
    for (const i of c.pix) {                                  // grow the core by its own depth = the solid region
      const r = Math.ceil(dist[i]) + 1, x = i % W, y = (i / W) | 0;
      for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
        if (dx * dx + dy * dy > r * r) continue; const xx = x + dx, yy = y + dy;
        if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue; const j = yy * W + xx; if (ink[j]) solid[j] = 1;
      }
    }
  }
  const { comps: sComps } = labelInk(solid, W, H);
  const blobMask = new Uint8Array(W * H);
  const blobs = [];
  for (const c of sComps) { for (const p of c.pix) blobMask[p] = 1; blobs.push(c); }
  // skeleton of the line ink only (blobs removed, but a blob's rim stays part of the line where lines enter it)
  const lineInk = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) lineInk[i] = ink[i] && !blobMask[i] ? 1 : 0;
  const sk = thin(lineInk, W, H);
  let g = skeletonEdges(sk, W, H);
  g = prune(g, Math.max(6, 1.6 * sw));
  const chains = chain(g);
  // GAP REPAIR: skeleton pixels no chain passes near (a walk corner case left ~30 px of the whale's head outline
  // untraced, 2026-10-22) are traced on their own and spliced onto the chain whose end they touch
  {
    const near = new Uint8Array(W * H);
    const stamp = (x, y) => { for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) { const xx = x + dx, yy = y + dy; if (xx >= 0 && yy >= 0 && xx < W && yy < H) near[yy * W + xx] = 1; } };
    for (const c of chains) for (let i = 0; i < c.pts.length; i++) {
      const a = c.pts[i], b = c.pts[Math.min(i + 1, c.pts.length - 1)];
      const n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1])));
      for (let k = 0; k <= n; k++) stamp(Math.round(a[0] + (b[0] - a[0]) * k / n), Math.round(a[1] + (b[1] - a[1]) * k / n));
    }
    const left = new Uint8Array(W * H); let any = 0;
    for (let i = 0; i < W * H; i++) if (sk[i] && !near[i]) { left[i] = 1; any++; }
    if (any) {
      const extra = chain(prune(skeletonEdges(left, W, H), 3)).filter((c) => c.pts.length >= 4);
      for (const e of extra) {
        let done = false;
        for (const c of chains) {
          if (c.closed) continue;
          const ends = [[c.pts[0], 'head'], [c.pts[c.pts.length - 1], 'tail']];
          for (const [q, where] of ends) {
            const d0 = Math.hypot(e.pts[0][0] - q[0], e.pts[0][1] - q[1]), d1 = Math.hypot(e.pts[e.pts.length - 1][0] - q[0], e.pts[e.pts.length - 1][1] - q[1]);
            if (Math.min(d0, d1) > 4) continue;
            const seg = d0 <= d1 ? e.pts : e.pts.slice().reverse();          // seg starts at the end touching q
            if (where === 'tail') c.pts = c.pts.concat(seg); else c.pts = seg.slice().reverse().concat(c.pts);
            done = true; break;
          }
          if (done) break;
        }
        if (!done) chains.push(e);
      }
    }
  }
  const paths = [];
  for (const c of chains) {
    let pts;
    if (c.closed) pts = rdpRing(c.pts, opts.eps || 0.7);
    else pts = rdp(c.pts, opts.eps || 0.7);
    pts = chaikin(pts, c.closed, 2);
    const len = plen(pts);
    if (len < Math.max(4, sw * 1.2)) continue;
    paths.push({ pts, closed: c.closed, len });
  }
  // blob outlines as polygons (cbn-lineart.maskPath at 1 px)
  const { maskPath } = require('./cbn-lineart.js');
  const blobOut = blobs.map((c) => {
    const m = new Uint8Array(W * H); for (const p of c.pix) m[p] = 1;
    const inside = (x, y) => x >= 0 && y >= 0 && x < W && y < H && m[y * W + x] === 1;
    return { d: maskPath(inside, [c.x0, c.y0, c.x1, c.y1], 1, 0.6), area: c.area };
  });
  // ink box
  let x0 = W, y0 = H, x1 = 0, y1 = 0;
  for (let i = 0; i < W * H; i++) if (ink[i]) { const x = i % W, y = (i / W) | 0; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  // the drawing's BODY (everything not reachable from the border through paper): what it hides of things behind it
  const body = require('./cbn-lineart.js').silhouette(ink, W, H, Math.max(2, Math.round(sw * 0.6)));
  // OUTER lines: ≥ 60 % of the points within 1.5 stroke widths of the body's edge (the outline a PreK page traces)
  {
    const edge = new Uint8Array(W * H);
    for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) { const i = y * W + x; if (body[i] && (!body[i - 1] || !body[i + 1] || !body[i - W] || !body[i + W])) edge[i] = 1; }
    const zone = require('./cbn-lineart.js').dilate(edge, W, H, Math.ceil(1.5 * sw));
    const inZ = ([x, y]) => { const xi = Math.round(x), yi = Math.round(y); return xi >= 0 && yi >= 0 && xi < W && yi < H && !!zone[yi * W + xi]; };
    // a chain can run along the rim and then turn into an inner line through a junction (a beach ball's rim arc chained
    // into a stripe): judged whole it fell under 60 % and the RIM went solid, so the outline a PreK child traces was open
    // (da panel). Split a mixed open path into its in-zone and out-of-zone runs when both are long (≥ 3 stroke widths).
    const minRun = 3 * sw, out = [];
    for (const p of paths) {
      const f = p.pts.map(inZ); const n = f.filter(Boolean).length;
      if (p.closed || n === 0 || n === f.length) { p.outer = n >= 0.6 * p.pts.length; out.push(p); continue; }
      const runs = []; let st = 0;
      for (let i = 1; i <= f.length; i++) if (i === f.length || f[i] !== f[st]) { runs.push([st, i - 1, f[st]]); st = i; }
      const seg = (a, b) => p.pts.slice(a, b + 1);
      const long = runs.filter(([a, b]) => plen(seg(a, b)) >= minRun);
      if (!long.some((r) => r[2]) || !long.some((r) => !r[2])) { p.outer = n >= 0.6 * p.pts.length; out.push(p); continue; }
      // merge short runs into their neighbour, then emit one path per run (sharing the joint point so the line stays whole)
      const m = []; for (const r of runs) { if (m.length && (plen(seg(r[0], r[1])) < minRun || m[m.length - 1][2] === r[2])) m[m.length - 1][1] = r[1]; else m.push(r.slice()); }
      for (let k = 0; k < m.length; k++) { const a0 = k ? m[k][0] - 1 : 0; const pts = seg(a0, m[k][1]); out.push(Object.assign({}, p, { pts, len: plen(pts), outer: m[k][2], split: true })); }
    }
    paths.length = 0; for (const q of out) paths.push(q);
  }
  return { W, H, sw, paths, blobs: blobOut, inkBox: { x0, y0, x1, y1 }, ink, skeleton: sk0, lineSkeleton: sk, body };
}

/** 8-connected components of set pixels */
function labelInk(m, W, H) {
  const lab = new Int32Array(W * H), comps = [], nb = N8(W);
  for (let s = 0; s < W * H; s++) {
    if (!m[s] || lab[s]) continue;
    const id = comps.length + 1, pix = [s]; lab[s] = id;
    let x0 = W, y0 = H, x1 = 0, y1 = 0;
    for (let k = 0; k < pix.length; k++) {
      const p = pix[k], x = p % W, y = (p / W) | 0;
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
      for (const o of nb) { const j = p + o; if (j < 0 || j >= W * H) continue; const jx = j % W; if (Math.abs(jx - x) > 1) continue; if (m[j] && !lab[j]) { lab[j] = id; pix.push(j); } }
    }
    comps.push({ id, pix, area: pix.length, x0, y0, x1, y1 });
  }
  return { lab, comps };
}

/** polyline → SVG path data, scaled by k and offset by (ox, oy) */
function pathD(pts, k = 1, ox = 0, oy = 0, closed = false) {
  const f = (v) => (Math.round(v * 100) / 100).toString();
  let s = 'M' + f(pts[0][0] * k + ox) + ' ' + f(pts[0][1] * k + oy);
  for (let i = 1; i < pts.length; i++) s += 'L' + f(pts[i][0] * k + ox) + ' ' + f(pts[i][1] * k + oy);
  return closed ? s + 'Z' : s;
}

module.exports = { traceDrawing, pathD, thin, chamfer, labelInk, rdp, rdpRing, chaikin, plen, skeletonEdges, prune, chain };
