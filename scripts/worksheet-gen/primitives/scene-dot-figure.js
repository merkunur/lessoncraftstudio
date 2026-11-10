/**
 * sceneDotFigure — a dot-to-dot picture inside a Color by Number scene (SVG). Level Set 2026-10-06, Dot-to-Dot.
 *
 * Takes a scene built by tools/d2d-build.js (data/d2d/<id>.json): the scene's line art with the hero's OUTER outline
 * erased, and the hero's outline as N dots (fit[N].pts, picture units 600 × 560, clockwise, dot 1 at the top). Draws
 * the art, the numbered dots (teal r5; dot 1 coral r6 with a coral ring — the same start signal as dotFigure), and the
 * numbers, each placed by a collision pass (outward first): never on another number or dot, never off the stage, on
 * free paper when there is any near the dot, else over a line on a white backing that hides the line under it. Same data attributes as primitives/dot-figure.js, so K-285 verify() checks it.
 *
 * { scene, count, step=1, startAt=1, values=null, lite=false, labelPx=20, width=640, heroOnly=false }
 *   heroOnly (makers 2026-11-02, Number-Word Dot-to-Dot): the picture is the hero alone — its own lines inside its
 *   silhouette (scene.body), the background left out — so long labels (number words) find free paper beside their dots;
 *   off (the default), the output is unchanged
 *   → { svg, points:[[x,y]…] px, labels:[v…], width, height }
 * Throws when a number has no free place (the page is refused; the wave takes the next picture).
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, circle, el, esc } = require('./_svg.js');

function insidePoly(pt, poly) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if (((yi > pt[1]) !== (yj > pt[1])) && (pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi)) c = !c;
  }
  return c;
}
const norm = ([x, y]) => { const L = Math.hypot(x, y) || 1; return [x / L, y / L]; };
/** does segment p-q pass through box b (padded)? */
function segHitsBox(p, q, b, pad = 2) {
  const x0 = b.x - pad, y0 = b.y - pad, x1 = b.x + b.w + pad, y1 = b.y + b.h + pad;
  let t0 = 0, t1 = 1; const dx = q[0] - p[0], dy = q[1] - p[1];
  for (const [pp, qq] of [[-dx, p[0] - x0], [dx, x1 - p[0]], [-dy, p[1] - y0], [dy, y1 - p[1]]]) {
    if (pp === 0) { if (qq < 0) return false; continue; }
    const r = qq / pp; if (pp < 0) { if (r > t1) return false; if (r > t0) t0 = r; } else { if (r < t0) return false; if (r < t1) t1 = r; }
  }
  return true;
}
const overlaps = (a, b) => !(a.x + a.w < b.x || b.x + b.w < a.x || a.y + a.h < b.y || b.y + b.h < a.y);

/**
 * heroSplit(d, body) → { whole, clipped }: the drawn line's pieces (subpaths) sorted for a hero-only page. The hero's mask
 * is coarse (cells of 600 / body.w picture units) and its line is wider than a cell, so clipping the line to the mask cut
 * its outer edge into stairs (operator 2026-11-10, Even or Odd Dot-to-Dot). A piece that touches the hero (a vertex within
 * one cell of the mask) and never runs more than WHOLE_CELLS past it is the hero's own line: it goes to `whole`, drawn
 * without the clip. A hole stays with the outline around it (evenodd needs both in one path, or the hole prints solid), so
 * pieces are judged by their outermost container. Everything else goes to `clipped`, as before. Measured over 1,960
 * scenes: 4,770 pieces were cut into stairs; 4,188 reach at most 3 cells past the hero. A path with any command other
 * than M L Q Z is not sorted (all of it clipped, the old drawing).
 */
/**
 * dropScraps(d, pts, closed) → d without the tiny loose pieces that lie ON the dot path: what the erasing of the dotted part
 * of the outline left behind (a stem's tip, a wave's end, a few rim strokes). Dot-sized and between two dots, a child reads
 * one as a dot (operator 2026-11-10, the apple of Even or Odd Dot-to-Dot). A scrap: at most SCRAP_UNITS across, inside no
 * other piece (a hole or an eye's highlight is never one), its centre within SCRAP_NEAR of the path's polyline. Measured
 * 2026-11-10: 1,988 such pieces in 723 of 4,793 fits (205 in 67 of the 212 published-pool fits); the 635 small loose pieces
 * away from the path (freckles, seeds) are kept. A path with any command other than M L Q Z is returned unchanged.
 */
const SCRAP_UNITS = 10, SCRAP_NEAR = 16;
function dropScraps(d, pts, closed) {
  if (!d || !pts || pts.length < 2 || /[^MLQZ0-9.\-\s,]/.test(d)) return d || '';
  const P = (d.match(/M[^M]*/g) || []).map((sp) => {
    const n = (sp.match(/-?\d+(?:\.\d+)?/g) || []).map(Number); let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (let i = 0; i + 1 < n.length; i += 2) { x0 = Math.min(x0, n[i]); x1 = Math.max(x1, n[i]); y0 = Math.min(y0, n[i + 1]); y1 = Math.max(y1, n[i + 1]); }
    return { sp, box: [x0, y0, x1, y1], area: (x1 - x0) * (y1 - y0) };
  });
  const line = closed ? pts.concat([pts[0]]) : pts;
  const near = (px, py) => { for (let i = 0; i + 1 < line.length; i++) { const [ax, ay] = line[i], [bx, by] = line[i + 1], dx = bx - ax, dy = by - ay, L = dx * dx + dy * dy; let t = L ? ((px - ax) * dx + (py - ay) * dy) / L : 0; t = Math.max(0, Math.min(1, t)); if (Math.hypot(ax + t * dx - px, ay + t * dy - py) <= SCRAP_NEAR) return true; } return false; };
  return P.filter((a) => {
    const [x0, y0, x1, y1] = a.box; if (Math.max(x1 - x0, y1 - y0) > SCRAP_UNITS) return true;
    if (P.some((b) => b !== a && b.area > a.area && b.box[0] <= x0 && b.box[1] <= y0 && b.box[2] >= x1 && b.box[3] >= y1)) return true;
    return !near((x0 + x1) / 2, (y0 + y1) / 2);
  }).map((a) => a.sp).join('');
}

const WHOLE_CELLS = 3;
function heroSplit(d, B) {
  if (!d || /[^MLQZ0-9.\-\s,]/.test(d)) return { whole: '', clipped: d || '' };
  const subs = d.match(/M[^M]*/g) || [];
  const W = B.w, Hh = B.h, C = 600 / W, D = new Int16Array(W * Hh).fill(32767), q = [];
  for (let i = 0; i < W * Hh; i++) if (B.s.charCodeAt(i) === 49) { D[i] = 0; q.push(i); }
  for (let h = 0; h < q.length; h++) { const i = q[h], x = i % W, y = (i / W) | 0; const nb = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]; for (const [nx, ny] of nb) { if (nx < 0 || ny < 0 || nx >= W || ny >= Hh) continue; const j = ny * W + nx; if (D[j] > D[i] + 1) { D[j] = D[i] + 1; q.push(j); } } }
  const dist = (x, y) => { const cx = Math.floor(x / C), cy = Math.floor(y / C); return cx < 0 || cy < 0 || cx >= W || cy >= Hh ? 999 : D[cy * W + cx]; };
  const P = subs.map((sp) => {
    const n = (sp.match(/-?\d+(?:\.\d+)?/g) || []).map(Number), pts = [];
    for (let i = 0; i + 1 < n.length; i += 2) pts.push([n[i], n[i + 1]]);
    let mn = 999, mx = 0, x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const [x, y] of pts) { const v = dist(x, y); if (v < mn) mn = v; if (v > mx) mx = v; if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y; }
    return { sp, pts, mn, mx, box: [x0, y0, x1, y1], area: (x1 - x0) * (y1 - y0) };
  });
  const inside = ([px, py], pts) => { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) c = !c; } return c; };
  // each piece's outermost container (the largest piece whose box holds it and whose polygon holds its first vertex)
  const root = P.map((a, i) => {
    let best = i;
    P.forEach((b, j) => { if (j !== i && b.area > P[best].area && b.box[0] <= a.box[0] && b.box[1] <= a.box[1] && b.box[2] >= a.box[2] && b.box[3] >= a.box[3] && a.pts.length && inside(a.pts[0], b.pts)) best = j; });
    return best;
  });
  const far = new Map();
  P.forEach((a, i) => far.set(root[i], Math.max(far.get(root[i]) || 0, a.mx)));
  const whole = [], clipped = [];
  P.forEach((a, i) => { const r = P[root[i]]; ((r.mn <= 1 && far.get(root[i]) <= WHOLE_CELLS) ? whole : clipped).push(a.sp); });
  return { whole: whole.join(''), clipped: clipped.join('') };
}

function sceneDotFigure({ scene, count, step = 1, startAt = 1, values = null, lite = false, labelPx = 20, width = 640, heroOnly = false }) {
  const t = tokens;
  const fit = scene.fit && scene.fit[count];
  if (!fit || !fit.ok) throw new Error(`sceneDotFigure: ${scene.id} has no ${count}-dot outline`);
  const s0 = width / 600, height = Math.round(560 * s0);
  // v2: the art depends on the dot count — the outline is erased only along the stretch the dots replace
  const g = lite ? fit.liteInk : fit.ink;
  const open = !fit.closed;   // the dots cover a stretch: the rest of the outline is the picture's own line
  const CELL = 600 / g.w;
  // CENTRED (operator 2026-10-07: "why didn't you center the images in the frame?"): what is printed — the lines and the
  // dots — is measured, centred in the frame, and enlarged (at most 2.4×) to fill the frame ("you should also make the images bigger"), leaving room for the numbers
  let bx0 = Infinity, by0 = Infinity, bx1 = -Infinity, by1 = -Infinity;
  for (let y = 0; y < g.h; y++) for (let x = 0; x < g.w; x++) if (g.s.charCodeAt(y * g.w + x) === 49) { bx0 = Math.min(bx0, x * CELL); by0 = Math.min(by0, y * CELL); bx1 = Math.max(bx1, (x + 1) * CELL); by1 = Math.max(by1, (y + 1) * CELL); }
  for (const [x, y] of fit.pts) { bx0 = Math.min(bx0, x); by0 = Math.min(by0, y); bx1 = Math.max(bx1, x); by1 = Math.max(by1, y); }
  const margin = labelPx * 2 + 10;
  const s = s0 * Math.max(1, Math.min(2.4, (width - 2 * margin) / ((bx1 - bx0) * s0), (height - 2 * margin) / ((by1 - by0) * s0)));   // never smaller than the scene: the dots keep their spacing
  const ox = (width - (bx1 - bx0) * s) / 2 - bx0 * s, oy = (height - (by1 - by0) * s) / 2 - by0 * s;
  const pts = fit.pts.map(([x, y]) => [ox + x * s, oy + y * s]);
  const polyPx = pts;
  const cellHit = (grid, box) => {
    const x0 = Math.max(0, Math.floor((box.x - ox) / s / CELL)), x1 = Math.min(grid.w - 1, Math.floor((box.x + box.w - ox) / s / CELL));
    const y0 = Math.max(0, Math.floor((box.y - oy) / s / CELL)), y1 = Math.min(grid.h - 1, Math.floor((box.y + box.h - oy) / s / CELL));
    if (x1 < 0 || y1 < 0 || x0 > grid.w - 1 || y0 > grid.h - 1) return false;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (grid.s.charCodeAt(y * grid.w + x) === 49) return true;
    return false;
  };
  const dotR = 5;
  const parts = [];
  // the scene: frame, then the art (picture units, scaled)
  parts.push(el('rect', { x: 1.5, y: 1.5, width: width - 3, height: height - 3, rx: 14, fill: '#FFFFFF', stroke: t.color.ink, 'stroke-width': 3 }));
  const artD = dropScraps(lite ? fit.lite : fit.art, fit.pts, fit.closed);
  let artSvg = el('path', { d: artD, fill: t.color.ink, 'fill-rule': 'evenodd' });
  if (heroOnly) {
    if (!scene.body) throw new Error(`sceneDotFigure: ${scene.id} has no hero mask`);
    const H = heroSplit(artD, scene.body);
    // the hero's silhouette as a clip (its mask cells, run by run, one cell grown so its own lines at the rim stay), its
    // rim rounded by a circle on every edge cell: square cells cut a line into visible stairs (operator 2026-11-10). The
    // circles turn the same way as the cell rows (clockwise): turning the other way, nonzero cancels them where they overlap
    // a row and the clip prints as a beaded fringe (seen on the first render)
    const B = scene.body, C = 600 / B.w, on = (x, y) => x >= 0 && y >= 0 && x < B.w && y < B.h && B.s.charCodeAt(y * B.w + x) === 49;
    const grown = (x, y) => on(x, y) || on(x - 1, y) || on(x + 1, y) || on(x, y - 1) || on(x, y + 1);
    const runs = [], r = +(C * 0.75).toFixed(3);
    for (let y = 0; y < B.h; y++) { let x0 = -1; for (let x = 0; x <= B.w; x++) { const v = x < B.w && grown(x, y); if (v && x0 < 0) x0 = x; if (!v && x0 >= 0) { runs.push(`M${x0 * C} ${y * C}h${(x - x0) * C}v${C}h${-(x - x0) * C}z`); x0 = -1; } } }
    if (H.clipped) for (let y = 0; y < B.h; y++) for (let x = 0; x < B.w; x++) if (grown(x, y) && !(grown(x - 1, y) && grown(x + 1, y) && grown(x, y - 1) && grown(x, y + 1))) runs.push(`M${((x + 0.5) * C - r).toFixed(2)} ${((y + 0.5) * C).toFixed(2)}a${r} ${r} 0 1 1 ${2 * r} 0a${r} ${r} 0 1 1 ${-2 * r} 0z`);
    // the hero's own lines (touching it, never more than WHOLE_CELLS past it, holes kept with their outline) are drawn
    // whole; only lines that run on into the rest of the picture go through the clip
    artSvg = (H.whole ? el('path', { d: H.whole, fill: t.color.ink, 'fill-rule': 'evenodd' }) : '') +
      (H.clipped ? `<clipPath id="d2d-hero-${scene.id}"><path d="${runs.join('')}"/></clipPath>` + el('path', { d: H.clipped, fill: t.color.ink, 'fill-rule': 'evenodd', 'clip-path': `url(#d2d-hero-${scene.id})` }) : '');
  }
  parts.push(el('g', { transform: `translate(${ox.toFixed(2)} ${oy.toFixed(2)}) scale(${s.toFixed(5)})`, 'data-lcs-scene-art': '1' }, artSvg));

  // v2: no pre-printed remainder — the rest of the outline is the picture's own line (the operator's review: a grey
  // straight remainder reads as a continuation of the dots, not as the picture)
  const labelled = count;
  const vals = [];
  for (let k = 0; k < labelled; k++) vals.push(values ? values[k] : startAt + k * step);
  // number places: outward along the corner's bisector, then the compass, at growing distances
  const boxes = [];
  const dotBoxes = pts.map(([x, y]) => ({ x: x - dotR - 3, y: y - dotR - 3, w: 2 * (dotR + 3), h: 2 * (dotR + 3) }));   // verify() wants r + 2 clear
  const placed = [];
  const n = pts.length;
  for (let i = 0; i < labelled; i++) {
    const p = pts[i], prev = open && i === 0 ? [2 * p[0] - pts[1][0], 2 * p[1] - pts[1][1]] : pts[(i - 1 + n) % n], next = open && i === n - 1 ? [2 * p[0] - pts[n - 2][0], 2 * p[1] - pts[n - 2][1]] : pts[(i + 1) % n];
    const u1 = norm([prev[0] - p[0], prev[1] - p[1]]), u2 = norm([next[0] - p[0], next[1] - p[1]]);
    let bis = norm([u1[0] + u2[0], u1[1] + u2[1]]);
    if (Math.hypot(bis[0], bis[1]) < 1e-6) bis = norm([-u1[1], u1[0]]);
    // outward = away from the hero (its silhouette; the dot polygon is not the shape when the dots cover a stretch)
    const inHero = (q) => scene.body ? cellHit(scene.body, { x: q[0] - 1, y: q[1] - 1, w: 2, h: 2 }) : insidePoly(q, polyPx);
    const dir = inHero([p[0] + bis[0] * 10, p[1] + bis[1] * 10]) ? [-bis[0], -bis[1]] : bis;
    const txt = String(vals[i]);
    // the number's INK box (canvas measureText, Baloo 2 700, central baseline — measured 2026-10-07): digits 0.47 em above
    // the centre and 0.20 below, ≤ 0.55 em wide each; letters 0.58 above (å) and 0.38 below (g, j), ≤ 0.8 em wide (æ);
    // + 2 px. K-285 verify() measures the same ink. (The 1.6 em text box is mostly empty space: with it, numbers on
    // neighbouring dots "collided" while their ink was far apart.)
    const isNum = /^\d+$/.test(txt), up = labelPx * (isNum ? 0.47 : 0.58) + 2, down = labelPx * (isNum ? 0.2 : 0.38) + 2;
    const bw = Math.ceil(labelPx * (isNum ? 0.55 : 0.8) * [...txt].length + 4), bh = Math.ceil(up + down);
    const compass = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0.5, -1], [1, -0.5], [1, 0.5], [0.5, 1], [-0.5, 1], [-1, 0.5], [-1, -0.5], [-0.5, -1]].map(norm);
    const cands = [];
    for (const d of [labelPx * 0.85, labelPx * 1.2, labelPx * 1.6]) cands.push([p[0] + dir[0] * d, p[1] + dir[1] * d]);
    for (const d of [labelPx * 0.75, labelPx * 0.85, labelPx * 1.05, labelPx * 1.2, labelPx * 1.4, labelPx * 1.6, labelPx * 2.1]) for (const c of compass) cands.push([p[0] + c[0] * d, p[1] + c[1] * d]);
    // heroOnly (a word label): further out too, by the label's own half width — a wide word set close to its dot crosses
    // the lines the child draws to the neighbours
    if (heroOnly) for (const d of [bw / 2 + 4, bw / 2 + 12, bw / 2 + 22]) for (const c of [dir].concat(compass)) cands.push([p[0] + c[0] * d, p[1] + c[1] * d]);
    let got = null;
    // pass 1: free paper only; pass 2 (a busy scene): over a line, on a white backing that hides the line under it
    // v2 scenes (the picture keeps its own lines): every number on free paper outside the picture — never a white patch
    // over the drawing; a picture that cannot give every number such a place is refused
    for (const pass of (scene.v === 2 ? [1] : [1, 2])) for (const [cx, cy] of cands) {
      if (got) break;
      const box = { x: cx - bw / 2, y: cy - up, w: bw, h: bh };
      if (box.x < 6 || box.y < 6 || box.x + box.w > width - 6 || box.y + box.h > height - 6) continue;
      // two numbers never touch: a quarter em between their ink boxes, so 190 and 180 read as two numbers
      const gap = labelPx / 4, padded = { x: box.x - gap, y: box.y - gap, w: box.w + 2 * gap, h: box.h + 2 * gap };
      if (boxes.some((b) => overlaps(b, padded)) || dotBoxes.some((b) => overlaps(b, box))) continue;
      // never on the line the child will draw (any segment of the dot path, the closing one included)
      if (pts.some((q, j) => !(open && j === n - 1) && segHitsBox(q, pts[(j + 1) % n], box))) continue;
      // a number belongs to ONE dot: clearly nearer its own dot than any other (a child reads the nearest dot)
      const own = Math.hypot(cx - p[0], cy - p[1]);
      if (pts.some((q, j) => j !== i && Math.hypot(cx - q[0], cy - q[1]) * 0.88 < own)) continue;
      // heroOnly: no background is drawn, so the only ink is the hero's (the body check below keeps numbers off it)
      const onInk = heroOnly ? false : cellHit(g, box);
      // free paper first: no line, and not inside another drawing (a number in a barn door reads as part of the barn)
      // pass 1 also keeps the number off the hero itself (outside the outline, as on a good printed sheet)
      if (pass === 1 && (onInk || (!lite && scene.obj && cellHit(scene.obj, box)) || (scene.body && cellHit(scene.body, box)))) continue;
      got = { cx, cy, box, halo: onInk };
    }
    if (!got) throw new Error(`sceneDotFigure: ${scene.id}: no free place for number ${txt} (dot ${i + 1})`);
    boxes.push(got.box); placed.push(got);
  }
  for (let k = 0; k < labelled; k++) {
    const [x, y] = pts[k];
    if (k === 0) {
      parts.push(circle({ cx: x, cy: y, r: 10, fill: 'none', strokeColor: t.color.coral, strokeWidth: 2 }));
      parts.push(circle({ cx: x, cy: y, r: dotR + 1, fill: t.color.coral, data: { 'data-lcs-dot': 1, 'data-lcs-x': x.toFixed(1), 'data-lcs-y': y.toFixed(1) } }));
    } else {
      parts.push(circle({ cx: x, cy: y, r: dotR, fill: t.color.teal, data: { 'data-lcs-dot': k + 1, 'data-lcs-x': x.toFixed(1), 'data-lcs-y': y.toFixed(1) } }));
    }
    if (placed[k].halo) { const b = placed[k].box; parts.push(el('rect', { x: (b.x - 1).toFixed(1), y: (b.y - 1).toFixed(1), width: (b.w + 2).toFixed(1), height: (b.h + 2).toFixed(1), rx: 5, fill: '#FFFFFF', 'data-lcs-label-halo': k + 1 })); }
    parts.push(el('text', {
      x: placed[k].cx.toFixed(1), y: placed[k].cy.toFixed(1), 'font-family': t.font.display, 'font-size': labelPx, 'font-weight': 700,
      fill: t.color.ink, 'text-anchor': 'middle', 'dominant-baseline': 'central', 'data-lcs-label': k + 1,
    }, esc(vals[k])));
  }
  return {
    svg: svgRoot({ width, height, label: 'dot to dot picture' }, parts.join(''), {
      'data-lcs-prim': 'dot-figure', 'data-lcs-figure': scene.id, 'data-lcs-count': labelled,
      'data-lcs-step': step, 'data-lcs-start': startAt, ...(values ? { 'data-lcs-labelmode': 'alpha' } : {}),
      'data-lcs-scene': scene.id, ...(open ? { 'data-lcs-open': '1' } : {}), ...(lite ? { 'data-lcs-lite': '1' } : {}),
    }),
    points: pts, labels: vals, width, height,
    // (makers 2026-11-02: decoy dots) is a page-px box on the hero or on drawn ink? — the same cell tests the numbers use
    covers: (box) => !!((scene.body && cellHit(scene.body, box)) || (!heroOnly && cellHit(g, box))),
  };
}

module.exports = sceneDotFigure;
module.exports.heroSplit = heroSplit;
module.exports.dropScraps = dropScraps;
