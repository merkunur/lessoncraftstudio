/**
 * jug — graduated measuring-jug primitive (SVG) for capacity reading (ml/l).
 * A tall beaker outline with graduation ticks + numerals OUTSIDE the vessel,
 * liquid as a tealSoft region with a wavy top path PLUS a 1.5px teal wave
 * outline (design-panel B&W rule: the level must read even if the fill drops
 * out on a starved toner drum).
 *
 * { value, max, step, labelEvery, unit, w, h } → { svg, meta }
 * value must sit exactly on a tick (the honest-measurement guarantee).
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el, line, label } = require('./_svg.js');

function jug({ value, max, step, labelEvery = 2, unit = 'ml', w = 150, h = 240 }) {
  if (value % step !== 0 || value < 0 || value > max) {
    throw new Error(`jug: value ${value} not on a ${step}-tick within 0..${max}`);
  }
  const bodyX = 34, bodyW = w - bodyX - 12;
  const topY = 30, botY = h - 14; // topY leaves headroom for the unit label
  const innerH = botY - topY;
  const yFor = (v) => botY - (v / max) * innerH;

  const parts = [];
  // vessel: open-topped beaker with a small pouring lip
  parts.push(el('path', {
    d: `M ${bodyX} ${topY - 6} L ${bodyX} ${botY - 10} Q ${bodyX} ${botY} ${bodyX + 10} ${botY}` +
       ` L ${bodyX + bodyW - 10} ${botY} Q ${bodyX + bodyW} ${botY} ${bodyX + bodyW} ${botY - 10}` +
       ` L ${bodyX + bodyW} ${topY - 6} L ${bodyX + bodyW + 8} ${topY - 12}`,
    fill: 'none', stroke: tokens.color.teal, 'stroke-width': 3.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
  }));

  // liquid with wavy top
  if (value > 0) {
    const yLiq = yFor(value);
    const midX = bodyX + bodyW / 2;
    const waveD = `M ${bodyX + 2} ${yLiq} Q ${bodyX + bodyW * 0.25} ${yLiq - 5} ${midX} ${yLiq}` +
                  ` Q ${bodyX + bodyW * 0.75} ${yLiq + 5} ${bodyX + bodyW - 2} ${yLiq}`;
    parts.push(el('path', {
      d: `${waveD} L ${bodyX + bodyW - 2} ${botY - 3} L ${bodyX + 2} ${botY - 3} Z`,
      fill: tokens.color.tealSoft, stroke: 'none',
    }));
    parts.push(el('path', { d: waveD, fill: 'none', stroke: tokens.color.teal, 'stroke-width': 1.5 }));
    // single highlight ellipse (the design-panel warmth touch)
    parts.push(el('ellipse', {
      cx: bodyX + bodyW * 0.3, cy: yLiq + 14, rx: bodyW * 0.13, ry: 4,
      fill: tokens.color.white, opacity: 0.7,
    }));
  }

  // graduations: ticks inside-left, numerals outside-left
  for (let v = 0; v <= max; v += step) {
    const y = yFor(v);
    const isLabeled = Math.round(v / step) % labelEvery === 0;
    parts.push(line({
      x1: bodyX, y1: y, x2: bodyX + (isLabeled ? 16 : 10), y2: y,
      strokeColor: tokens.color.teal, strokeWidth: isLabeled ? 2 : 1.2,
      data: { 'data-lcs-tick': v },
    }));
    if (isLabeled && v > 0) {
      parts.push(label({
        x: bodyX - 5, y, text: v, size: 12, color: tokens.color.ink,
        fontFamily: tokens.font.body, weight: 700, anchor: 'end',
      }));
    }
  }
  // unit label above the scale column, clear of the top graduation numeral
  parts.push(label({
    x: bodyX - 5, y: 10, text: unit, size: 12, color: tokens.color.inkSoft,
    fontFamily: tokens.font.body, weight: 800, anchor: 'end',
  }));

  return {
    svg: svgRoot({ width: w, height: h, label: `measuring jug showing ${value} ${unit}` }, parts.join(''),
      { 'data-lcs-prim': 'jug', 'data-lcs-value': value, 'data-lcs-max': max, 'data-lcs-unit': unit }),
    meta: { value, max, step, unit },
    width: w, height: h,
  };
}

module.exports = jug;
