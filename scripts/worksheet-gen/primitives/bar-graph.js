/**
 * barGraph — bar-chart primitive (SVG) with icon category labels.
 * params: { values: [n..], iconHrefs: [..], yMax, w=480, h=360, yStep=1 }
 * meta: { values, yMax }
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el, roundedRect, line, label } = require('./_svg.js');

function barGraph({ values, iconHrefs, yMax, w = 480, h = 360, yStep = 1 }, ctx) {
  const t = (ctx && ctx.tokens) || tokens;
  const padL = 40, padB = 56, padT = 12, padR = 10;
  const plotW = w - padL - padR, plotH = h - padT - padB;
  const yTop = yMax || Math.max(...values) + 1;
  const yFor = (v) => padT + plotH - (v / yTop) * plotH;
  const parts = [];

  // gridlines + y labels
  for (let v = 0; v <= yTop; v += yStep) {
    parts.push(line({ x1: padL, y1: yFor(v), x2: w - padR, y2: yFor(v), strokeColor: v === 0 ? t.color.ink : t.color.grid, strokeWidth: v === 0 ? 2.5 : 1 }));
    parts.push(label({ x: padL - 14, y: yFor(v), text: v, size: 14, color: t.color.ink, fontFamily: t.font.display, weight: 600 }));
  }
  // y axis
  parts.push(line({ x1: padL, y1: padT, x2: padL, y2: padT + plotH, strokeColor: t.color.ink, strokeWidth: 2.5 }));

  const n = values.length;
  const slot = plotW / n;
  const barW = Math.min(64, slot * 0.55);
  const palette = [t.color.teal, t.color.coral, t.color.tealSoft, t.color.coralSoft];
  values.forEach((v, i) => {
    const x = padL + i * slot + (slot - barW) / 2;
    parts.push(roundedRect({
      x, y: yFor(v), w: barW, h: padT + plotH - yFor(v), r: 5,
      fill: palette[i % palette.length], strokeColor: t.color.teal, strokeWidth: 2,
      data: { 'data-lcs-bar': v, 'data-lcs-cat': i },
    }));
    if (iconHrefs && iconHrefs[i]) {
      const s = Math.min(40, slot * 0.5);
      parts.push(el('image', { href: iconHrefs[i], x: padL + i * slot + (slot - s) / 2, y: padT + plotH + 10, width: s, height: s, 'data-lcs-caticon': i }));
    }
  });

  return {
    svg: svgRoot({ width: w, height: h, label: 'bar graph' },
      parts.join(''), { 'data-lcs-prim': 'bar-graph', 'data-lcs-ymax': yTop }),
    meta: { values, yMax: yTop },
    width: w,
    height: h,
  };
}

module.exports = barGraph;
