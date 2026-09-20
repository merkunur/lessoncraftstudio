/**
 * ruler — measuring-ruler primitive (SVG) on the shared tick engine.
 * params: { cm, pxPerCm=44, h=64 }
 * Returns xFor(v) so callers can register objects against tick positions.
 *
 * The svg is emitted `preserveAspectRatio="xMinYMin meet"` and `flex:0 0 auto`:
 * an object is registered against xFor(0) in PAGE pixels, so the ruler must
 * never be scaled or re-centred by its container. G2-235 d3 shipped (2026-09)
 * with the ruler flex-shrunk to half height inside a column-flex stage — the
 * default xMidYMid then scaled it 0.52 and moved the 0 tick 134 px right of
 * the unmoved picture. With this, a budget overrun OVERFLOWS (a lint sees it)
 * instead of silently re-registering the zero.
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, roundedRect, line, label: text } = require('./_svg.js');

function ruler({ cm, pxPerCm = 44, h = 64 }, ctx) {
  const t = (ctx && ctx.tokens) || tokens;
  const padL = 16;
  const W = cm * pxPerCm + padL * 2;
  const H = h;
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
      parts.join(''), { 'data-lcs-prim': 'ruler', 'data-lcs-cmmax': cm, 'data-lcs-pxpercm': pxPerCm, 'data-lcs-zerox': padL, preserveAspectRatio: 'xMinYMin meet', style: 'flex:0 0 auto' }),
    meta: { cm, pxPerCm, zeroX: padL },
    width: W,
    height: H,
    xFor,
  };
}

module.exports = ruler;
