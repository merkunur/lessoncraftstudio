/**
 * diceFace — die-face primitive (SVG): standard pip layouts 1-9.
 * params: { n, size=84, pip } — pip color defaults to ink.
 * Layouts 7-9 extend the classic 3×3 pip grid (for subitizing beyond 6).
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, roundedRect, circle } = require('./_svg.js');

// pip positions on a 3×3 grid (col,row), classic dice conventions
const LAYOUTS = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [2, 0], [0, 2], [2, 2]],
  5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]],
  6: [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2]],
  7: [[0, 0], [2, 0], [0, 1], [1, 1], [2, 1], [0, 2], [2, 2]],
  8: [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1], [0, 2], [1, 2], [2, 2]],
  9: [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [0, 2], [1, 2], [2, 2]],
};

function diceFace({ n, size = 84, pip }, ctx) {
  const t = (ctx && ctx.tokens) || tokens;
  if (!LAYOUTS[n]) throw new Error('diceFace: n out of range: ' + n);
  const r = size * 0.09;
  const cellGap = size / 3.6;
  const cx0 = size / 2 - cellGap;
  const parts = [
    roundedRect({ x: 2, y: 2, w: size - 4, h: size - 4, r: size * 0.18, fill: t.color.white, strokeColor: t.color.teal, strokeWidth: 3 }),
  ];
  LAYOUTS[n].forEach(([c, row]) => {
    parts.push(circle({
      cx: cx0 + c * cellGap, cy: cx0 + row * cellGap, r,
      fill: pip || t.color.ink,
      data: { 'data-lcs-pip': 1 },
    }));
  });
  return {
    svg: svgRoot({ width: size, height: size, label: `dots showing ${n}` },
      parts.join(''), { 'data-lcs-prim': 'dice', 'data-lcs-n': n }),
    meta: { n },
    width: size,
    height: size,
  };
}

module.exports = diceFace;
module.exports.LAYOUTS = LAYOUTS;
