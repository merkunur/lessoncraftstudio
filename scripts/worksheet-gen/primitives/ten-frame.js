/**
 * tenFrame — parametric ten-frame primitive (SVG).
 * params: { a, b=0, cell=58, fillStyle='dot' }
 *   a = first-color counters (teal), b = second-color counters (coral) —
 *   a single-count frame is just b=0. a+b ≤ 10; fill order is left-to-right,
 *   top row first (the canonical ten-frame reading order).
 * meta: { a, b, filled, empty }
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, roundedRect, circle, el } = require('./_svg.js');

function tenFrame({ a, b = 0, cell = 58, iconHref }, ctx) {
  const t = (ctx && ctx.tokens) || tokens;
  if (a + b > 10 || a < 0 || b < 0) throw new Error(`tenFrame: invalid counts a=${a} b=${b}`);
  const cols = 5, rows = 2;
  const pad = 3;
  const W = cols * cell + pad * 2;
  const H = rows * cell + pad * 2;
  const parts = [
    roundedRect({ x: pad / 2, y: pad / 2, w: W - pad, h: H - pad, r: 10, fill: t.color.white, strokeColor: t.color.teal, strokeWidth: t.stroke.primitive }),
  ];
  // interior grid
  for (let c = 1; c < cols; c++) {
    parts.push(el('line', { x1: pad + c * cell, y1: pad + 3, x2: pad + c * cell, y2: H - pad - 3, stroke: t.color.teal, 'stroke-width': 1.5, opacity: 0.55 }));
  }
  parts.push(el('line', { x1: pad + 3, y1: pad + cell, x2: W - pad - 3, y2: pad + cell, stroke: t.color.teal, 'stroke-width': 1.5, opacity: 0.55 }));

  const r = cell * 0.33;
  for (let i = 0; i < a + b; i++) {
    const cx = pad + (i % cols) * cell + cell / 2;
    const cy = pad + Math.floor(i / cols) * cell + cell / 2;
    const isA = i < a;
    if (iconHref) {
      const s = cell * 0.78;
      parts.push(el('image', {
        href: iconHref, x: cx - s / 2, y: cy - s / 2, width: s, height: s,
        'data-lcs-counter': isA ? 'a' : 'b',
      }));
    } else {
      parts.push(circle({
        cx, cy, r,
        fill: isA ? t.color.teal : t.color.coral,
        data: { 'data-lcs-counter': isA ? 'a' : 'b' },
      }));
    }
  }

  return {
    svg: svgRoot({ width: W, height: H, label: `ten frame showing ${a + b}` },
      parts.join(''), { 'data-lcs-prim': 'ten-frame', 'data-lcs-a': a, 'data-lcs-b': b }),
    meta: { a, b, filled: a + b, empty: 10 - a - b },
    width: W,
    height: H,
  };
}

module.exports = tenFrame;
