/**
 * rekenrek — the 20-bead rack (SVG), the counting apparatus of Dutch / German / Danish classrooms (Ten Frames maker,
 * 2026-10-31). params: { rows: [left, …] (1 or 2 rows; beads pushed to the LEFT per row, 0..10), size=34 }
 * Each row is a wire with 10 beads: beads 1-5 coral, 6-10 white with a teal ring — the five-structure must survive a
 * black-and-white copier, so it is told by fill vs ring, never by hue alone (the coins.js rule). The pushed beads sit
 * at the left end, the others at the right end, with a clear gap between.
 * meta: { rows, left: total pushed left }
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, roundedRect, circle, el } = require('./_svg.js');

function rekenrek({ rows, size = 34 }, ctx) {
  const t = (ctx && ctx.tokens) || tokens;
  if (!Array.isArray(rows) || rows.length < 1 || rows.length > 2 || rows.some((v) => !Number.isInteger(v) || v < 0 || v > 10)) throw new Error('rekenrek: rows must be 1-2 counts 0..10');
  const d = size, gap = 2, pad = 14, frame = 8;
  const slack = d * 3.2;                       // the empty stretch of wire between the left and right beads
  const W = frame * 2 + pad * 2 + 10 * d + 9 * gap + slack;
  const rowH = d + 14;
  const H = frame * 2 + 8 + rows.length * rowH;
  const parts = [
    roundedRect({ x: 1.5, y: 1.5, w: W - 3, h: H - 3, r: 10, fill: t.color.cream, strokeColor: t.color.teal, strokeWidth: t.stroke.primitive }),
  ];
  rows.forEach((left, r) => {
    const cy = frame + 4 + r * rowH + rowH / 2;
    parts.push(el('line', { x1: frame, y1: cy, x2: W - frame, y2: cy, stroke: t.color.inkSoft, 'stroke-width': 3, 'stroke-linecap': 'round' }));
    for (let k = 0; k < 10; k++) {
      const pushed = k < left;
      // pushed beads from the left end; the rest stacked against the right end
      const x = pushed
        ? frame + pad + k * (d + gap) + d / 2
        : W - frame - pad - (9 - k) * (d + gap) - d / 2;
      const coral = k < 5;
      parts.push(circle({
        cx: x, cy, r: d / 2 - 1,
        fill: coral ? t.color.coral : t.color.white,
        strokeColor: coral ? t.color.coral : t.color.teal, strokeWidth: coral ? 1 : 3,
        data: { 'data-lcs-bead': pushed ? 'left' : 'right', 'data-lcs-row': r },
      }));
    }
  });
  const total = rows.reduce((a, v) => a + v, 0);
  return {
    svg: svgRoot({ width: W, height: H, label: `bead rack with ${total} beads pushed to the left` }, parts.join(''), { 'data-lcs-prim': 'rekenrek', 'data-lcs-left': total }),
    meta: { rows: rows.slice(), left: total },
    width: W,
    height: H,
  };
}

module.exports = rekenrek;
