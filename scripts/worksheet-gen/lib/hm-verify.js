/**
 * hm-verify.js — the RASTER ORACLE of the b8 Handmade Mazes family, run on the RENDERED page (design B §5.1, v2).
 *
 * It reads the pixels the child will see (a puppeteer screenshot of the scene frame), never the generator's data,
 * and compares them with what the page DECLARES (the graph stamped on the scene as data-lcs-hm-graph):
 *   M = page pixels within `tol` of the corridor fill colour (what is drawn as walkable);
 *   D = the declared corridors rasterised at the same scale (fill strokes of width W + the mouths).
 *   (1) MISSING:  erode(D, 2) \ M has no cluster > `minCluster` px   → no drawing, label or scenery covers a corridor;
 *   (2) EXTRA:    M \ dilate(D, 2) has no cluster > `minCluster` px  → nothing else is painted in the corridor colour
 *                 (a leak, a background patch the child could read as road);
 *   (3) REACH:    the start mouth reaches the goal mouth on M;
 *   (4) UNIQUE (tree faces): the walkable road encloses no patch of field (any second way closes a ring round one) —
 *                 exact at every road width, unlike a wall-across-each-route-edge cut (false on short wide edges);
 *   looped faces skip (4) and are judged by the label search on the declared graph instead (pedagogy P1), which is
 *   sound because (1) + (2) prove the page's corridors are exactly the declared ones.
 *
 *   analyzeScene({ png, graph, scale, tol, minCluster }) → Promise<string[]>   (empty = pass)
 *   graph = { W, fill:'#RRGGBB', edges:[{a,b,pts:[[x,y]…]}], mouths:{start:[[x,y]…], goal:[…]}, route:[node…], tree:bool }
 *   (scene-frame px; `scale` = screenshot px per scene px)
 */
'use strict';
const sharp = require('sharp');

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

async function rasterDeclared(graph, w, h, scale) {
  const pl = (pts) => `<polyline points="${pts.map((p) => (p[0] * scale).toFixed(1) + ',' + (p[1] * scale).toFixed(1)).join(' ')}"/>`;
  const lines = graph.edges.map((e) => pl(e.pts)).concat(Object.values(graph.mouths || {}).map(pl), (graph.routes || []).flatMap((rt) => [pl(rt.start), pl(rt.goal)])).join('');   // F7: every route's mouths
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><g fill="none" stroke="#000" stroke-width="${graph.W * scale}" stroke-linecap="round" stroke-linejoin="round">${lines}</g></svg>`;
  const { data } = await sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const m = new Uint8Array(w * h); for (let i = 0; i < m.length; i++) m[i] = data[i * 4 + 3] > 128 ? 1 : 0;
  return m;
}
function morph(m, w, h, k, dilate) {
  let cur = m;
  for (let it = 0; it < k; it++) {
    const o = new Uint8Array(cur.length);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = y * w + x; const v = cur[i];
      const l = x > 0 ? cur[i - 1] : 0, r = x < w - 1 ? cur[i + 1] : 0, u = y > 0 ? cur[i - w] : 0, d = y < h - 1 ? cur[i + w] : 0;
      o[i] = dilate ? (v || l || r || u || d ? 1 : 0) : (v && l && r && u && d ? 1 : 0);
    }
    cur = o;
  }
  return cur;
}
function clusters(mask, w, minA) {
  const seen = new Uint8Array(mask.length); const out = [];
  for (let i = 0; i < mask.length; i++) {
    if (!mask[i] || seen[i]) continue; let a = 0, sx = 0, sy = 0; const st = [i]; seen[i] = 1;
    while (st.length) {
      const p = st.pop(); a++; const x = p % w; sx += x; sy += (p / w) | 0;
      for (const q of [x > 0 ? p - 1 : -1, x < w - 1 ? p + 1 : -1, p - w, p + w]) if (q >= 0 && q < mask.length && mask[q] && !seen[q]) { seen[q] = 1; st.push(q); }
    }
    if (a > minA) out.push({ a, x: Math.round(sx / a), y: Math.round(sy / a) });
  }
  return out;
}
function flood(m, w, from) {
  const seen = new Uint8Array(m.length); const st = []; for (const p of from) if (m[p] && !seen[p]) { seen[p] = 1; st.push(p); }
  while (st.length) { const p = st.pop(); const x = p % w; for (const q of [x > 0 ? p - 1 : -1, x < w - 1 ? p + 1 : -1, p - w, p + w]) if (q >= 0 && q < m.length && m[q] && !seen[q]) { seen[q] = 1; st.push(q); } }
  return seen;
}
/** pixel indices of a small disc around a scene point (a mouth end may sit under the hero's feet: take any corridor pixel near it) */
function disc(pt, scale, w, h, r) {
  const out = []; const cx = Math.round(pt[0] * scale), cy = Math.round(pt[1] * scale);
  for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) if (x >= 0 && y >= 0 && x < w && y < h && (x - cx) ** 2 + (y - cy) ** 2 <= r * r) out.push(y * w + x);
  return out;
}

async function analyzeScene({ png, graph, scale = 1, tol = 18, minCluster = 20 }) {
  const issues = [];
  const { data, info } = await sharp(png).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height; const [fr, fg, fb] = hex(graph.fill);
  const M = new Uint8Array(w * h);
  const D = await rasterDeclared(graph, w, h, scale);
  // only the scene inside its ROUNDED frame is judged: outside the 18 px corners the page's own paper shows, which may
  // be the corridor colour (a white cloud road) without being part of the picture (2026-10-11, the dawn sky face)
  const FR = 18 * scale;   // the frame's corner radius (scene px 18)
  const inFrame = (x, y) => { const X = Math.min(Math.max(x, FR), w - FR), Y = Math.min(Math.max(y, FR), h - FR); return Math.hypot(x - X, y - Y) <= FR - 1; };
  if (graph.line) {
    // LINE-ART page (the colouring face): road and sand are both blank paper; only INK separates them. M = the paper
    // reachable from the start disc without crossing ink (luma < 170), passing through the declared marker footprints
    // (an outlined start disc would otherwise trap the flood) — so M is exactly the region the child's pencil can walk.
    const ink = new Uint8Array(w * h);
    for (let i = 0; i < ink.length; i++) ink[i] = (0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2]) < 170 ? 1 : 0;
    const stand0 = new Uint8Array(w * h);
    for (const [sx, sy, sr] of graph.stand || []) for (const p of disc([sx, sy], scale, w, h, Math.round(sr * scale))) stand0[p] = 1;
    const Dd0 = morph(D, w, h, Math.max(2, Math.round(2 * scale)), true);
    // inside a hero / goal footprint only the declared road is walkable (a drawing standing on its mouth hides the
    // road's ink cap: its own blank paper must not open the road onto the sand); everywhere else ANY paper is walkable,
    // so a missing wall between two roads still leaks and is still caught
    const pass = new Uint8Array(w * h); for (let i = 0; i < pass.length; i++) pass[i] = stand0[i] ? (Dd0[i] ? 1 : 0) : (!ink[i] ? 1 : 0);
    const sm0 = graph.mouths.start;
    const reachedPaper = flood(pass, w, disc(sm0[sm0.length - 1], scale, w, h, Math.max(3, Math.round(graph.W * scale * 0.3))));
    for (let i = 0; i < M.length; i++) M[i] = reachedPaper[i] && !ink[i] ? 1 : 0;
  } else {
    for (let i = 0; i < M.length; i++) { const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2]; M[i] = Math.abs(r - fr) <= tol && Math.abs(g - fg) <= tol && Math.abs(b - fb) <= tol ? 1 : 0; }
  }
  const k = Math.max(2, Math.round(2 * scale));
  const De = morph(D, w, h, k, false), Dd = morph(D, w, h, k, true);
  // the hero and the goal STAND on their mouth ends: their declared footprints (graph.stand: [[x, y, r]] scene px)
  // may cover the corridor there and nowhere else; every other covered pixel is a defect
  const stand = new Uint8Array(M.length);
  for (const [sx, sy, sr] of graph.stand || []) for (const p of disc([sx, sy], scale, w, h, Math.round(sr * scale))) stand[p] = 1;
  const miss = new Uint8Array(M.length), extra = new Uint8Array(M.length);
  // a declared drawing (island art, the hero, the goal) is never a stray road.
  // declared art (graph.art: ink boxes [x0, y0, x1, y1]) may carry pale pixels of the corridor colour (an eye highlight): it is
  // excluded from EXTRA only; a drawing over a corridor is still MISSING (it covers the road)
  const art = new Uint8Array(M.length);
  for (const [a0, b0, a1, b1] of graph.art || []) for (let y = Math.max(0, Math.floor(b0 * scale)); y < Math.min(h, Math.ceil(b1 * scale)); y++) for (let x = Math.max(0, Math.floor(a0 * scale)); x < Math.min(w, Math.ceil(a1 * scale)); x++) art[y * w + x] = 1;
  for (let i = 0; i < M.length; i++) { miss[i] = De[i] && !M[i] && !stand[i] ? 1 : 0; extra[i] = M[i] && !Dd[i] && !art[i] && !stand[i] && inFrame(i % w, (i / w) | 0) ? 1 : 0; }
  // the start / goal markers stand ON the mouths: the walk passes through their footprint (M ∪ stand, clipped to the
  // declared corridors so a marker can never open a way between two corridors)
  const walk = new Uint8Array(M.length); for (let i = 0; i < M.length; i++) walk[i] = M[i] || (stand[i] && Dd[i]) ? 1 : 0;
  const mc = clusters(miss, w, minCluster * scale * scale), xc = clusters(extra, w, minCluster * scale * scale);
  for (const c of mc) issues.push(`a corridor is covered at (${(c.x / scale) | 0}, ${(c.y / scale) | 0}), ${c.a} px`);
  for (const c of xc) issues.push(`corridor colour painted outside the maze at (${(c.x / scale) | 0}, ${(c.y / scale) | 0}), ${c.a} px`);
  // reach: from the outer end of the start mouth to the outer end of the goal mouth, on the PAGE pixels
  const sm = graph.mouths && graph.mouths.start, gm = graph.mouths && graph.mouths.goal;
  if (!sm || !gm) { issues.push('no start / goal mouth declared'); return issues; }
  const R = Math.max(3, Math.round(graph.W * scale * 0.3));
  const S0 = disc(sm[sm.length - 1], scale, w, h, R), G0 = disc(gm[gm.length - 1], scale, w, h, R);
  const reached = flood(walk, w, S0);
  if (!G0.some((p) => reached[p])) { issues.push('the goal cannot be reached on the page'); return issues; }
  // F7 (several routes): each baby's road reaches its OWN mother and touches no other road — flooding from start i
  // must not reach any other route's start or goal (two trees painted into each other would give a baby two homes)
  if (graph.routes && graph.routes.length > 1) {
    const ends = graph.routes.map((rt) => ({ s: disc(rt.start[rt.start.length - 1], scale, w, h, R), g: disc(rt.goal[rt.goal.length - 1], scale, w, h, R) }));
    ends.forEach((e, i) => {
      const fl = flood(walk, w, e.s);
      if (!e.g.some((p) => fl[p])) issues.push('baby ' + (i + 1) + ' cannot reach its mother on the page');
      ends.forEach((o, j) => { if (j !== i && (o.g.some((p) => fl[p]) || o.s.some((p) => fl[p]))) issues.push('road ' + (i + 1) + ' runs into road ' + (j + 1)); });
    });
  }
  // UNIQUE (tree faces): the road the child can walk must ENCLOSE NOTHING. On a tree the field between the roads is one
  // piece that reaches the frame; any second way — a real loop, or two roads painted into each other — closes a ring of
  // road round a patch of field, which then reaches neither the frame nor the page edge. Exact on the pixels, whatever the
  // road width. (It replaces a wall-across-each-route-edge cut, 2026-10-11: on a 72 px preschool road two edges leaving
  // one station stay painted together for ~80 px, so a wall at a short edge's midpoint is walked round INSIDE the
  // junction — a false "second way" on a maze with exactly one.) Ink specks inside a junction (the ends of two outline
  // strokes) are far smaller than any patch a loop can enclose: patches under (W/2)² scene px are ignored.
  if (graph.tree) {
    const field = new Uint8Array(walk.length); for (let i = 0; i < walk.length; i++) field[i] = reached[i] ? 0 : 1;
    const seeds = [];
    for (let i = 0; i < field.length; i++) { const x = i % w, y = (i / w) | 0; if (field[i] && (x === 0 || y === 0 || x === w - 1 || y === h - 1 || !inFrame(x, y))) seeds.push(i); }
    const outside = flood(field, w, seeds);
    // a declared drawing or footprint standing INSIDE a widened road (a bug in its burrow chamber, the raspberry in its
    // store) is enclosed by road and is not a
    // loop: declared art pixels are not counted (an island inside a real loop still shows its own bare field round it)
    const inner = new Uint8Array(field.length); for (let i = 0; i < field.length; i++) inner[i] = field[i] && !outside[i] && !art[i] && !stand[i] ? 1 : 0;
    for (const c of clusters(inner, w, (graph.W * scale / 2) ** 2)) issues.push(`the road closes a ring round (${(c.x / scale) | 0}, ${(c.y / scale) | 0}): a second way (not unique)`);
  }
  return issues;
}

/** the graph stamp a page carries (scene px): written by the type, read back by verify() */
function graphStamp(maze, fill, stand) {
  const edges = Object.entries(maze.S).map(([k, pts]) => { const [a, b] = k.split('-').map(Number); return { a, b, pts: pts.map((p) => [+p[0].toFixed(1), +p[1].toFixed(1)]) }; });
  const r1 = (pts) => pts.map((p) => [+p[0].toFixed(1), +p[1].toFixed(1)]);
  return { W: maze.W, fill, edges, mouths: { start: r1(maze.mouthS.start), goal: r1(maze.mouthS.goal) }, route: maze.route, tree: !maze.loops, stand: stand || [] };
}

module.exports = { analyzeScene, graphStamp };
