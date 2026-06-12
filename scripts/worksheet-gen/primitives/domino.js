/**
 * domino — domino-tile primitive (SVG): two pip halves with a divider.
 * params: { a, b, size=64 } (size = half edge; tile is 2*size wide)
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, roundedRect, circle, el } = require('./_svg.js');
const { LAYOUTS } = require('./dice.js');

function domino({ a, b, size = 64 }, ctx) {
  const t = (ctx && ctx.tokens) || tokens;
  if (!LAYOUTS[a] || !LAYOUTS[b]) throw new Error(`domino: pips out of range ${a},${b}`);
  const W = size * 2, H = size;
  const r = size * 0.07;
  const cellGap = size / 3.6;
  const c0 = size / 2 - cellGap;
  const parts = [
    roundedRect({ x: 2, y: 2, w: W - 4, h: H - 4, r: size * 0.14, fill: t.color.white, strokeColor: t.color.teal, strokeWidth: 3 }),
    el('line', { x1: size, y1: 8, x2: size, y2: H - 8, stroke: t.color.teal, 'stroke-width': 2.5, 'stroke-linecap': 'round' }),
  ];
  const half = (n, xOff, side) => {
    LAYOUTS[n].forEach(([c, row]) => {
      parts.push(circle({
        cx: xOff + c0 + c * cellGap, cy: c0 + row * cellGap, r,
        fill: side === 'a' ? t.color.teal : t.color.coral,
        data: { 'data-lcs-pip': side },
      }));
    });
  };
  half(a, 0, 'a');
  half(b, size, 'b');
  return {
    svg: svgRoot({ width: W, height: H, label: `domino ${a} and ${b}` },
      parts.join(''), { 'data-lcs-prim': 'domino', 'data-lcs-a': a, 'data-lcs-b': b }),
    meta: { a, b },
    width: W,
    height: H,
  };
}

module.exports = domino;
