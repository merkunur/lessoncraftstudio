/**
 * dotFigure — dot-to-dot picture primitive (SVG). nt20-B K-285.
 *
 * Takes a hand-designed closed polyline (data/b2/figures.js DOT_FIGURES, 0-100
 * box, y down), resamples it to exactly `count` dots with the SAME
 * admissible-midpoint rule the gate implements (qa/verify-b2-figures.js
 * exports it), and draws: numbered dots (teal r5; dot 1 coral r6 with a coral
 * ring — the B&W-safe start signal), numerals placed by a collision pass
 * (outward bisector, then compass fallbacks; a label never overlaps another
 * label, a dot, a mark, or leaves the stage), pre-printed detail marks (eye,
 * window, kite spar) in ink, and — for the d1 "finish the picture" window —
 * the remainder of the outline pre-printed in light grid colour so the
 * child's ten lines close the figure.
 *
 * Labels run `startAt, startAt+step, …` (d1 1…10, d2 1…20, d3 the counting-on
 * window 11…30). The ANSWER PATH is never drawn.
 *
 * { figure, count, step=1, startAt=1, window=null, size=560 }
 *   → { svg, points:[[x,y]…] (px, in svg coords), labels:[n…], width, height }
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, circle, el, esc } = require('./_svg.js');
const { subdivide, inside } = require('../qa/verify-b2-figures.js');

const PAD = 28;
const LABEL_W = 32, LABEL_H = 28;

function overlaps(a, b) {
  return !(a.x + a.w < b.x || b.x + b.w < a.x || a.y + a.h < b.y || b.y + b.h < a.y);
}

function placeLabels(pts, poly100, scale, dotR, marks, size) {
  const boxes = [];   // label boxes already placed (px)
  const dotBoxes = pts.map(([x, y]) => ({ x: x - dotR - 6, y: y - dotR - 6, w: 2 * (dotR + 6), h: 2 * (dotR + 6) }));
  const markBoxes = marks.map((m) => {
    if (m.type === 'line') {
      const xs = m.pts.map((p) => p[0] * scale + PAD), ys = m.pts.map((p) => p[1] * scale + PAD);
      return { x: Math.min(...xs) - 4, y: Math.min(...ys) - 4, w: Math.max(...xs) - Math.min(...xs) + 8, h: Math.max(...ys) - Math.min(...ys) + 8 };
    }
    const r = (m.r || m.s / 2) * scale + 4;
    return { x: m.x * scale + PAD - r, y: m.y * scale + PAD - r, w: 2 * r, h: 2 * r };
  });
  const n = pts.length;
  const out = [];
  for (let i = 0; i < n; i++) {
    const p = pts[i], prev = pts[(i - 1 + n) % n], next = pts[(i + 1) % n];
    // unit vectors along the two edges, bisector = normalised sum of the
    // inward-pointing edge directions, negated to point OUTWARD
    const u1 = norm([prev[0] - p[0], prev[1] - p[1]]);
    const u2 = norm([next[0] - p[0], next[1] - p[1]]);
    let bis = norm([u1[0] + u2[0], u1[1] + u2[1]]);
    if (Math.hypot(bis[0], bis[1]) < 1e-6) bis = norm([-u1[1], u1[0]]);
    // the bisector of the edge directions points INTO the corner; outward is
    // whichever sign lands outside the polygon
    const test = [(p[0] + bis[0] * 10 - PAD) / scale, (p[1] + bis[1] * 10 - PAD) / scale];
    const dir = inside(test, poly100) ? [-bis[0], -bis[1]] : bis;
    const compass = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]].map(norm);
    const candidates = [];
    for (const d of [16, 24, 32]) candidates.push([p[0] + dir[0] * d, p[1] + dir[1] * d]);
    for (const d of [16, 24, 32]) for (const c of compass) candidates.push([p[0] + c[0] * d, p[1] + c[1] * d]);
    let placed = null;
    for (const [cx, cy] of candidates) {
      const box = { x: cx - LABEL_W / 2, y: cy - LABEL_H / 2, w: LABEL_W, h: LABEL_H };
      if (box.x < 2 || box.y < 2 || box.x + box.w > size + 2 * PAD - 2 || box.y + box.h > size + 2 * PAD - 2) continue;
      if (boxes.some((b) => overlaps(b, box))) continue;
      if (dotBoxes.some((b) => overlaps(b, box))) continue;
      if (markBoxes.some((b) => overlaps(b, box))) continue;
      placed = { cx, cy, box };
      break;
    }
    if (!placed) throw new Error(`dotFigure: no label position for dot ${i + 1}`);
    boxes.push(placed.box);
    out.push(placed);
  }
  return out;
}
function norm([x, y]) { const L = Math.hypot(x, y) || 1; return [x / L, y / L]; }

function dotFigure({ figure, count, step = 1, startAt = 1, window = null, size = 560 }) {
  const t = tokens;
  const pts100 = subdivide(figure.pts, count);
  if (!pts100 || pts100.length !== count) throw new Error(`dotFigure: ${figure.key} cannot resample to ${count}`);
  const scale = size / 100;
  const pts = pts100.map(([x, y]) => [x * scale + PAD, y * scale + PAD]);
  const dotR = 5;
  const parts = [];
  const W = size + 2 * PAD;

  // d1 window: pre-printed remainder from the last numbered dot back to dot 1
  if (window && window < count) {
    const rem = pts.slice(window - 1).concat([pts[0]]);
    parts.push(el('polyline', {
      points: rem.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' '),
      fill: 'none', stroke: t.color.grid, 'stroke-width': 3, 'stroke-linejoin': 'round', 'stroke-linecap': 'round',
      'data-lcs-preprinted': '1',
    }));
  }
  // detail marks (ink) — drawn under the dots
  const marks = figure.marks || [];
  const markParts = marks.map((m) => {
    if (m.type === 'dot') return circle({ cx: m.x * scale + PAD, cy: m.y * scale + PAD, r: Math.min(m.r * scale, 5), fill: t.color.white, strokeColor: t.color.grid, strokeWidth: 2 });
    if (m.type === 'square') {
      const s = m.s * scale;
      return el('rect', { x: m.x * scale + PAD - s / 2, y: m.y * scale + PAD - s / 2, width: s, height: s, fill: 'none', stroke: t.color.grid, 'stroke-width': 2, rx: 2 });
    }
    return el('polyline', {
      points: m.pts.map(([x, y]) => `${(x * scale + PAD).toFixed(1)},${(y * scale + PAD).toFixed(1)}`).join(' '),
      fill: 'none', stroke: t.color.grid, 'stroke-width': 2, 'stroke-linecap': 'round',
    });
  });
  if (markParts.length) parts.push(el('g', { 'data-lcs-detail': '1' }, markParts.join('')));

  const labelled = window ? Math.min(window, count) : count;
  const labels = placeLabels(pts.slice(0, labelled), figure.pts, scale, dotR, marks, size);
  const labelValues = [];
  for (let k = 0; k < labelled; k++) {
    const [x, y] = pts[k];
    const v = startAt + k * step;
    labelValues.push(v);
    if (k === 0) {
      parts.push(circle({ cx: x, cy: y, r: 10, fill: 'none', strokeColor: t.color.coral, strokeWidth: 2 }));
      parts.push(circle({ cx: x, cy: y, r: dotR + 1, fill: t.color.coral, data: { 'data-lcs-dot': 1, 'data-lcs-x': x.toFixed(1), 'data-lcs-y': y.toFixed(1) } }));
    } else {
      parts.push(circle({ cx: x, cy: y, r: dotR, fill: t.color.teal, data: { 'data-lcs-dot': k + 1, 'data-lcs-x': x.toFixed(1), 'data-lcs-y': y.toFixed(1) } }));
    }
    const L = labels[k];
    parts.push(el('text', {
      x: L.cx.toFixed(1), y: L.cy.toFixed(1), 'font-family': t.font.display, 'font-size': 20, 'font-weight': 700,
      fill: t.color.ink, 'text-anchor': 'middle', 'dominant-baseline': 'central', 'data-lcs-label': k + 1,
    }, esc(v)));
  }
  // unnumbered dots beyond the window (d1): none — the remainder is the pre-printed polyline
  return {
    svg: svgRoot({ width: W, height: W, label: `dot to dot picture` }, parts.join(''), {
      'data-lcs-prim': 'dot-figure', 'data-lcs-figure': figure.key, 'data-lcs-count': labelled,
      'data-lcs-step': step, 'data-lcs-start': startAt, ...(window ? { 'data-lcs-window': window } : {}),
    }),
    points: pts, labels: labelValues, width: W, height: W,
  };
}

module.exports = dotFigure;
