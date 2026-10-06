/**
 * sceneDotFigure — a dot-to-dot picture inside a Color by Number scene (SVG). Level Set 2026-10-06, Dot-to-Dot.
 *
 * Takes a scene built by tools/d2d-build.js (data/d2d/<id>.json): the scene's line art with the hero's OUTER outline
 * erased, and the hero's outline as N dots (fit[N].pts, picture units 600 × 560, clockwise, dot 1 at the top). Draws
 * the art, the numbered dots (teal r5; dot 1 coral r6 with a coral ring — the same start signal as dotFigure), and the
 * numbers, each placed by a collision pass (outward first): never on another number or dot, never off the stage, on
 * free paper when there is any near the dot, else over a line on a white backing that hides the line under it. Same data attributes as primitives/dot-figure.js, so K-285 verify() checks it.
 *
 * { scene, count, step=1, startAt=1, window=null, values=null, lite=false, labelPx=20, width=640 }
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

function sceneDotFigure({ scene, count, step = 1, startAt = 1, window = null, values = null, lite = false, labelPx = 20, width = 640 }) {
  const t = tokens;
  const fit = scene.fit && scene.fit[count];
  if (!fit || !fit.ok) throw new Error(`sceneDotFigure: ${scene.id} has no ${count}-dot outline`);
  const s = width / 600, height = Math.round(560 * s);
  const pts = fit.pts.map(([x, y]) => [x * s, y * s]);
  const polyPx = pts;
  const g = lite ? scene.liteInk : scene.ink;
  const CELL = 600 / g.w;
  const cellHit = (grid, box) => {
    const x0 = Math.max(0, Math.floor(box.x / s / CELL)), x1 = Math.min(grid.w - 1, Math.floor((box.x + box.w) / s / CELL));
    const y0 = Math.max(0, Math.floor(box.y / s / CELL)), y1 = Math.min(grid.h - 1, Math.floor((box.y + box.h) / s / CELL));
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (grid.s.charCodeAt(y * grid.w + x) === 49) return true;
    return false;
  };
  const dotR = 5;
  const parts = [];
  // the scene: frame, then the art (picture units, scaled)
  parts.push(el('rect', { x: 1.5, y: 1.5, width: width - 3, height: height - 3, rx: 14, fill: '#FFFFFF', stroke: t.color.ink, 'stroke-width': 3 }));
  parts.push(el('g', { transform: `scale(${s.toFixed(5)})`, 'data-lcs-scene-art': '1' }, el('path', { d: lite ? scene.lite : scene.art, fill: t.color.ink, 'fill-rule': 'evenodd' })));

  if (window && window < count) {
    const rem = pts.slice(window - 1).concat([pts[0]]);
    parts.push(el('polyline', {
      points: rem.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' '),
      fill: 'none', stroke: t.color.grid, 'stroke-width': 3, 'stroke-linejoin': 'round', 'stroke-linecap': 'round',
      'data-lcs-preprinted': '1',
    }));
  }
  const labelled = window ? Math.min(window, count) : count;
  const vals = [];
  for (let k = 0; k < labelled; k++) vals.push(values ? values[k] : startAt + k * step);
  // number places: outward along the corner's bisector, then the compass, at growing distances
  const boxes = [];
  const dotBoxes = pts.map(([x, y]) => ({ x: x - dotR - 5, y: y - dotR - 5, w: 2 * (dotR + 5), h: 2 * (dotR + 5) }));
  const placed = [];
  const n = pts.length;
  for (let i = 0; i < labelled; i++) {
    const p = pts[i], prev = pts[(i - 1 + n) % n], next = pts[(i + 1) % n];
    const u1 = norm([prev[0] - p[0], prev[1] - p[1]]), u2 = norm([next[0] - p[0], next[1] - p[1]]);
    let bis = norm([u1[0] + u2[0], u1[1] + u2[1]]);
    if (Math.hypot(bis[0], bis[1]) < 1e-6) bis = norm([-u1[1], u1[0]]);
    const dir = insidePoly([p[0] + bis[0] * 8, p[1] + bis[1] * 8], polyPx) ? [-bis[0], -bis[1]] : bis;
    const txt = String(vals[i]);
    // the label's box as the browser measures it (getBBox, Baloo 2 700, dominant-baseline central — measured 2026-10-06:
    // height 1.6 em centred on y; digits ≤ 0.6 em wide, letters ≤ 0.85 em ('m'); K-285 verify() checks that box)
    const bw = Math.ceil(labelPx * (/^\d+$/.test(txt) ? 0.6 : 0.88) * [...txt].length + 2), bh = Math.ceil(labelPx * 1.6);
    const compass = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0.5, -1], [1, -0.5], [1, 0.5], [0.5, 1], [-0.5, 1], [-1, 0.5], [-1, -0.5], [-0.5, -1]].map(norm);
    const cands = [];
    for (const d of [labelPx * 0.85, labelPx * 1.2, labelPx * 1.6]) cands.push([p[0] + dir[0] * d, p[1] + dir[1] * d]);
    for (const d of [labelPx * 0.75, labelPx * 0.85, labelPx * 1.05, labelPx * 1.2, labelPx * 1.4, labelPx * 1.6, labelPx * 2.1]) for (const c of compass) cands.push([p[0] + c[0] * d, p[1] + c[1] * d]);
    let got = null;
    // pass 1: free paper only; pass 2 (a busy scene): over a line, on a white backing that hides the line under it
    for (const pass of [1, 2]) for (const [cx, cy] of cands) {
      if (got) break;
      const box = { x: cx - bw / 2, y: cy - bh / 2, w: bw, h: bh };
      if (box.x < 6 || box.y < 6 || box.x + box.w > width - 6 || box.y + box.h > height - 6) continue;
      // two numbers never touch: a clear gap of a third of a numeral between them, so 190 and 180 read as two numbers
      const gap = labelPx / 3, padded = { x: box.x - gap, y: box.y - gap, w: box.w + 2 * gap, h: box.h + 2 * gap };
      if (boxes.some((b) => overlaps(b, padded)) || dotBoxes.some((b) => overlaps(b, box))) continue;
      // never on the line the child will draw (any segment of the dot path, the closing one included)
      if (pts.some((q, j) => segHitsBox(q, pts[(j + 1) % n], box))) continue;
      // a number belongs to ONE dot: clearly nearer its own dot than any other (a child reads the nearest dot)
      const own = Math.hypot(cx - p[0], cy - p[1]);
      if (pts.some((q, j) => j !== i && Math.hypot(cx - q[0], cy - q[1]) * 0.88 < own)) continue;
      const onInk = cellHit(g, box);
      // free paper first: no line, and not inside another drawing (a number in a barn door reads as part of the barn)
      if (pass === 1 && (onInk || (!lite && scene.obj && cellHit(scene.obj, box)))) continue;
      got = { cx, cy, box, halo: onInk };
    }
    if (!got) throw new Error(`sceneDotFigure: ${scene.id}: no free place for number ${txt}`);
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
      'data-lcs-step': step, 'data-lcs-start': startAt, ...(values ? { 'data-lcs-labelmode': 'alpha' } : {}), ...(window ? { 'data-lcs-window': window } : {}),
      'data-lcs-scene': scene.id, ...(lite ? { 'data-lcs-lite': '1' } : {}),
    }),
    points: pts, labels: vals, width, height,
  };
}

module.exports = sceneDotFigure;
