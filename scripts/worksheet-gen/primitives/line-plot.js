/**
 * linePlot — X-mark line plot primitive (SVG) over the shared tick engine.
 * params: { counts: {value:n}, min, max, step=1, width=480, fracLabels=false }
 * meta: { counts }
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el, line, label, tickRow } = require('./_svg.js');

function linePlot({ counts, min, max, step = 1, width = 480, fracLabels = false }, ctx) {
  const t = (ctx && ctx.tokens) || tokens;
  const maxN = Math.max(...Object.values(counts), 1);
  const xH = 22;
  const padX = 30;
  const H = maxN * xH + 56;
  const W = width + padX * 2;
  const y = H - 36;

  const parts = [line({ x1: 8, y1: y, x2: W - 8, y2: y, strokeColor: t.color.ink, strokeWidth: 3 })];
  const n = Math.round((max - min) / step);
  for (let k = 0; k <= n; k++) {
    const v = min + k * step;
    const x = padX + (k / n) * width;
    parts.push(line({ x1: x, y1: y - 7, x2: x, y2: y + 7, strokeColor: t.color.ink, strokeWidth: 2 }));
    const text = fracLabels && v % 1 !== 0 ? `${Math.floor(v)}½` : v;
    parts.push(label({ x, y: y + 22, text, size: 16, color: t.color.ink, fontFamily: t.font.display, weight: 700, data: { 'data-lcs-tickv': v } }));
    const c = counts[v] || 0;
    for (let m = 0; m < c; m++) {
      parts.push(label({
        x, y: y - 16 - m * xH, text: '✕', size: 19, color: t.color.coral, fontFamily: t.font.body, weight: 800,
        data: { 'data-lcs-x': v },
      }));
    }
  }

  return {
    svg: svgRoot({ width: W, height: H, label: 'line plot' },
      parts.join(''), { 'data-lcs-prim': 'line-plot' }),
    meta: { counts },
    width: W,
    height: H,
  };
}

module.exports = linePlot;
