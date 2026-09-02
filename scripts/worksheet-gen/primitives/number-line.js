/**
 * numberLine — parametric number-line primitive (SVG).
 * params: { min, max, tickStep=1, labelEvery=1, width=560, jumps=[{from,to}],
 *           marks=[values], markStyle='dot' }
 * Jump arcs render above the line (coral, arrowed); marks as teal dots.
 * meta: { min, max, jumps, marks }
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, line, circle, el, tickRow } = require('./_svg.js');

function numberLine({ min, max, tickStep = 1, labelEvery = 1, width = 560, jumps = [], marks = [], pointers = [] }, ctx) {
  const t = (ctx && ctx.tokens) || tokens;
  const padX = 26;
  // nt20-B `pointers` (G1-248): a coral arrow from a dashed answer box down to
  // an UNLABELLED tick — position given, numeral wanted. Additive: with no
  // pointers every published number line renders byte-identically.
  const arcH = pointers.length ? 72 : (jumps.length ? 56 : 14);
  const H = arcH + 56;
  const W = width + padX * 2;
  const y = arcH + 14;

  const parts = [];
  // baseline with end arrows
  parts.push(line({ x1: 6, y1: y, x2: W - 6, y2: y, strokeColor: t.color.ink, strokeWidth: 3 }));
  parts.push(el('path', { d: `M ${W - 14} ${y - 6} L ${W - 4} ${y} L ${W - 14} ${y + 6}`, fill: 'none', stroke: t.color.ink, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
  parts.push(el('path', { d: `M 14 ${y - 6} L 4 ${y} L 14 ${y + 6}`, fill: 'none', stroke: t.color.ink, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));

  const ticks = tickRow({
    x: padX, y, w: width, min, max, tickStep,
    tickH: 14, majorH: 14,
    strokeColor: t.color.ink, strokeWidth: 2,
    labelEvery, labelSize: 17, labelColor: t.color.ink, fontFamily: t.font.display, labelDy: 26,
  });
  parts.push(ticks.svg);

  // jump arcs (each +tickStep hop) — quadratic arc with arrowhead
  jumps.forEach(({ from, to }) => {
    const dir = to > from ? 1 : -1;
    for (let v = from; v !== to; v += dir * tickStep) {
      const x1 = ticks.xFor(v), x2 = ticks.xFor(v + dir * tickStep);
      const mx = (x1 + x2) / 2;
      parts.push(el('path', {
        d: `M ${x1} ${y - 6} Q ${mx} ${y - 46} ${x2} ${y - 6}`,
        fill: 'none', stroke: t.color.coral, 'stroke-width': 3, 'stroke-linecap': 'round',
        'data-lcs-hop': `${v}->${v + dir * tickStep}`,
      }));
      // arrowhead at landing
      const ax = dir > 0 ? -7 : 7;
      parts.push(el('path', {
        d: `M ${x2 + ax} ${y - 16} L ${x2} ${y - 6} L ${x2 + ax * 0.4} ${y - 20}`,
        fill: 'none', stroke: t.color.coral, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
      }));
    }
  });

  marks.forEach((v) => {
    parts.push(circle({ cx: ticks.xFor(v), cy: y, r: 7, fill: t.color.teal, data: { 'data-lcs-mark': v } }));
  });

  pointers.forEach(({ value }) => {
    const x = ticks.xFor(value);
    const boxW = 52, boxH = 44;
    // dashed answer box (white, coral dash) centred over the tick
    parts.push(el('rect', {
      x: x - boxW / 2, y: y - 8 - 30 - boxH, width: boxW, height: boxH, rx: 8, ry: 8,
      fill: t.color.white, stroke: t.color.coral, 'stroke-width': 2.5, 'stroke-dasharray': '6 5',
      'data-lcs-pointer': value, 'data-lcs-answer': value,
    }));
    // arrow shaft + head pointing at the tick
    parts.push(line({ x1: x, y1: y - 8 - 30, x2: x, y2: y - 10, strokeColor: t.color.coral, strokeWidth: 3, data: { 'data-lcs-pointer-arrow': value } }));
    parts.push(el('path', {
      d: `M ${x - 7} ${y - 18} L ${x} ${y - 8} L ${x + 7} ${y - 18}`,
      fill: 'none', stroke: t.color.coral, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
    }));
  });

  return {
    svg: svgRoot({ width: W, height: H, label: `number line ${min} to ${max}` },
      parts.join(''), { 'data-lcs-prim': 'number-line', 'data-lcs-min': min, 'data-lcs-max': max }),
    meta: { min, max, jumps, marks },
    width: W,
    height: H,
  };
}

module.exports = numberLine;
