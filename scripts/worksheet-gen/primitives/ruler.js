/**
 * ruler — measuring-ruler primitive (SVG) on the shared tick engine.
 * params: { cm, pxPerCm=44, label='cm' }
 * Returns xFor(v) so callers can register objects against tick positions.
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, roundedRect, line, label: text } = require('./_svg.js');

function ruler({ cm, pxPerCm = 44 }, ctx) {
  const t = (ctx && ctx.tokens) || tokens;
  const padL = 16;
  const W = cm * pxPerCm + padL * 2;
  const H = 64;
  const parts = [
    roundedRect({ x: 1, y: 1, w: W - 2, h: H - 2, r: 8, fill: t.color.cream, strokeColor: t.color.teal, strokeWidth: 3 }),
  ];
  const xFor = (v) => padL + v * pxPerCm;
  for (let v = 0; v <= cm; v++) {
    parts.push(line({ x1: xFor(v), y1: 2, x2: xFor(v), y2: 22, strokeColor: t.color.teal, strokeWidth: 2.5, data: { 'data-lcs-cm': v } }));
    parts.push(text({ x: xFor(v), y: 40, text: v, size: 15, color: t.color.ink, fontFamily: t.font.display, weight: 700 }));
    if (v < cm) {
      parts.push(line({ x1: xFor(v + 0.5), y1: 2, x2: xFor(v + 0.5), y2: 13, strokeColor: t.color.teal, strokeWidth: 1.5 }));
    }
  }
  return {
    svg: svgRoot({ width: W, height: H, label: `ruler ${cm} units` },
      parts.join(''), { 'data-lcs-prim': 'ruler', 'data-lcs-cmmax': cm, 'data-lcs-pxpercm': pxPerCm, 'data-lcs-zerox': padL }),
    meta: { cm, pxPerCm, zeroX: padL },
    width: W,
    height: H,
    xFor,
  };
}

module.exports = ruler;
