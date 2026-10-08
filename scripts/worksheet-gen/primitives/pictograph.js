/**
 * pictograph — icon-row chart primitive (SVG <image> stamps).
 * params: { rows: [{iconHref, n}], scale=1, cell=34, emptyGrid=false, slots, rowGap=14, keyScale=1 }
 * rowGap / keyScale (2026-10-08, Graphs and Data page redesign): air between rows and a bigger "= N" key line;
 * the defaults draw exactly what they drew before.
 * scale: one stamp = `scale` things; n must be divisible (half stamps NOT used
 * at K-3 except via halfOk which renders a half-clipped stamp).
 * emptyGrid renders the label column + empty cells (the child draws/colors).
 * meta: { counts, scale }
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el, roundedRect, line, label } = require('./_svg.js');

function pictograph({ rows, scale = 1, cell = 34, emptyGrid = false, slots, rowGap = 14, keyScale = 1 }, ctx) {
  const t = (ctx && ctx.tokens) || tokens;
  const labelW = cell + 26;
  const maxStamps = slots || Math.max(...rows.map((r) => Math.ceil(r.n / scale)), 1);
  const W = labelW + maxStamps * (cell + 6) + 14;
  const rowH = cell + rowGap;
  const kH = Math.round(26 * keyScale);
  const H = rows.length * rowH + 10 + (scale > 1 ? kH + 4 : 0);
  const parts = [];

  rows.forEach((r, i) => {
    const y = 5 + i * rowH;
    // label cell
    parts.push(roundedRect({ x: 2, y, w: labelW - 8, h: cell + 6, r: 8, fill: t.color.cream, strokeColor: t.color.grid, strokeWidth: 1.5 }));
    parts.push(el('image', { href: r.iconHref, x: 8, y: y + 3, width: cell, height: cell, 'data-lcs-rowlabel': i }));
    parts.push(line({ x1: labelW, y1: y + cell + rowGap - 4, x2: W - 8, y2: y + cell + rowGap - 4, strokeColor: t.color.grid, strokeWidth: 1 }));
    const stamps = Math.round(r.n / scale);
    for (let k = 0; k < (emptyGrid ? maxStamps : stamps); k++) {
      const x = labelW + k * (cell + 6);
      if (emptyGrid) {
        parts.push(roundedRect({ x, y: y + 3, w: cell, h: cell, r: 6, fill: t.color.white, strokeColor: t.color.grid, strokeWidth: 1.5, dash: '4 3', data: { 'data-lcs-emptycell': i } }));
      } else {
        parts.push(el('image', { href: r.iconHref, x, y: y + 3, width: cell, height: cell, 'data-lcs-stamp': i }));
      }
    }
  });

  if (scale > 1) {
    const y = rows.length * rowH + 12;
    const k = keyScale;
    parts.push(roundedRect({ x: 2, y, w: Math.round(170 * k), h: kH, r: Math.round(13 * k), fill: t.color.coralSoft }));
    parts.push(el('image', { href: rows[0].iconHref, x: Math.round(10 * k), y: y + Math.round(2 * k), width: Math.round(22 * k), height: Math.round(22 * k) }));
    parts.push(label({ x: Math.round(100 * k), y: y + Math.round(13 * k), text: `= ${scale}`, size: Math.round(16 * k), color: t.color.ink, fontFamily: t.font.display, weight: 700, data: { 'data-lcs-key': scale } }));
  }

  return {
    svg: svgRoot({ width: W, height: H, label: 'picture graph' },
      parts.join(''), { 'data-lcs-prim': 'pictograph', 'data-lcs-scale': scale, 'data-lcs-counts': rows.map((r) => r.n).join(',') }),
    meta: { counts: rows.map((r) => r.n), scale },
    width: W,
    height: H,
  };
}

module.exports = pictograph;
