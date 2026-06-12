/**
 * tally — tally-marks primitive (SVG). Groups of five: four vertical strokes
 * crossed by one diagonal. params: { n, strokeH=44, gap=10, groupGap=22 }
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, line } = require('./_svg.js');

function tally({ n, strokeH = 44, gap = 10, groupGap = 22 }, ctx) {
  const t = (ctx && ctx.tokens) || tokens;
  const groups = Math.floor(n / 5);
  const rest = n % 5;
  const groupW = 3 * gap;            // 4 strokes spaced by gap
  const W = groups * (groupW + groupGap) + (rest ? (rest - 1) * gap + 8 : 0) + 16;
  const H = strokeH + 12;
  const parts = [];
  let x = 8;
  const stroke = { strokeColor: t.color.ink, strokeWidth: 3.5, cap: 'round' };
  for (let g = 0; g < groups; g++) {
    for (let k = 0; k < 4; k++) {
      parts.push(line({ x1: x + k * gap, y1: 6, x2: x + k * gap, y2: 6 + strokeH, ...stroke, data: { 'data-lcs-stroke': 1 } }));
    }
    parts.push(line({ x1: x - 4, y1: 10 + strokeH, x2: x + 3 * gap + 4, y2: 4, ...stroke, data: { 'data-lcs-stroke': 1, 'data-lcs-diag': 1 } }));
    x += groupW + groupGap;
  }
  for (let k = 0; k < rest; k++) {
    parts.push(line({ x1: x + k * gap, y1: 6, x2: x + k * gap, y2: 6 + strokeH, ...stroke, data: { 'data-lcs-stroke': 1 } }));
  }
  return {
    svg: svgRoot({ width: Math.max(W, 24), height: H, label: `tally marks showing ${n}` },
      parts.join(''), { 'data-lcs-prim': 'tally', 'data-lcs-n': n }),
    meta: { n, groups, rest },
    width: Math.max(W, 24),
    height: H,
  };
}

module.exports = tally;
