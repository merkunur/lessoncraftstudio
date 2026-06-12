/**
 * thermometer — vertical thermometer primitive (SVG): bulb, tube, scale
 * ticks, coral mercury filled to `value`.
 * params: { value, min=0, max=40, step=5, height=300 }
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el, roundedRect, line, label } = require('./_svg.js');

function thermometer({ value, min = 0, max = 40, step = 5, height = 300 }, ctx) {
  const t = (ctx && ctx.tokens) || tokens;
  if (value < min || value > max) throw new Error(`thermometer: value ${value} outside ${min}-${max}`);
  const W = 110, H = height;
  const tubeX = 62, tubeW = 16;
  const bulbR = 17;
  const topY = 14, botY = H - bulbR * 2 - 8;
  const yFor = (v) => botY - ((v - min) / (max - min)) * (botY - topY);
  const parts = [
    roundedRect({ x: tubeX - tubeW / 2, y: topY - 6, w: tubeW, h: botY - topY + 10, r: 8, fill: t.color.white, strokeColor: t.color.teal, strokeWidth: 3 }),
    el('circle', { cx: tubeX, cy: H - bulbR - 5, r: bulbR, fill: t.color.coral, stroke: t.color.teal, 'stroke-width': 3 }),
    // mercury
    roundedRect({ x: tubeX - 5, y: yFor(value), w: 10, h: H - bulbR - 5 - yFor(value), r: 4, fill: t.color.coral, data: { 'data-lcs-mercury': value } }),
  ];
  for (let v = min; v <= max; v += step) {
    parts.push(line({ x1: tubeX - tubeW / 2 - 10, y1: yFor(v), x2: tubeX - tubeW / 2 - 2, y2: yFor(v), strokeColor: t.color.ink, strokeWidth: 2 }));
    parts.push(label({ x: tubeX - tubeW / 2 - 26, y: yFor(v), text: v, size: 14, color: t.color.ink, fontFamily: t.font.display, weight: 700, data: { 'data-lcs-tick': v } }));
  }
  return {
    svg: svgRoot({ width: W, height: H, label: `thermometer at ${value}` },
      parts.join(''), { 'data-lcs-prim': 'thermometer', 'data-lcs-value': value, 'data-lcs-min': min, 'data-lcs-max': max }),
    meta: { value, min, max },
    width: W,
    height: H,
  };
}

module.exports = thermometer;
