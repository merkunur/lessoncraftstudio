/**
 * pictograph — icon-row chart primitive (SVG <image> stamps).
 * params: { rows: [{iconHref, n}], scale=1, cell=34, emptyGrid=false, slots }
 * scale: one stamp = `scale` things; n must be divisible (half stamps NOT used
 * at K-3 except via halfOk which renders a half-clipped stamp).
 * emptyGrid renders the label column + empty cells (the child draws/colors).
 * meta: { counts, scale }
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el, roundedRect, line, label } = require('./_svg.js');

function pictograph({ rows, scale = 1, cell = 34, emptyGrid = false, slots }, ctx) {
  const t = (ctx && ctx.tokens) || tokens;
  const labelW = cell + 26;
  const maxStamps = slots || Math.max(...rows.map((r) => Math.ceil(r.n / scale)), 1);
  const W = labelW + maxStamps * (cell + 6) + 14;
  const rowH = cell + 14;
  const H = rows.length * rowH + 10 + (scale > 1 ? 30 : 0);
  const parts = [];

  rows.forEach((r, i) => {
    const y = 5 + i * rowH;
    // label cell
    parts.push(roundedRect({ x: 2, y, w: labelW - 8, h: cell + 6, r: 8, fill: t.color.cream, strokeColor: t.color.grid, strokeWidth: 1.5 }));
    parts.push(el('image', { href: r.iconHref, x: 8, y: y + 3, width: cell, height: cell, 'data-lcs-rowlabel': i }));
    parts.push(line({ x1: labelW, y1: y + cell + 10, x2: W - 8, y2: y + cell + 10, strokeColor: t.color.grid, strokeWidth: 1 }));
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
    parts.push(roundedRect({ x: 2, y, w: 170, h: 26, r: 13, fill: t.color.coralSoft }));
    parts.push(el('image', { href: rows[0].iconHref, x: 10, y: y + 2, width: 22, height: 22 }));
    parts.push(label({ x: 100, y: y + 13, text: `= ${scale}`, size: 16, color: t.color.ink, fontFamily: t.font.display, weight: 700, data: { 'data-lcs-key': scale } }));
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
