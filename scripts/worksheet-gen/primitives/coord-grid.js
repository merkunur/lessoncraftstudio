/**
 * coordGrid — lettered/numbered grid for "colour the squares" pixel pictures
 * (SVG). nt20-B G2-279. Table convention: letters A… across the TOP gutter,
 * numbers 1… down the LEFT gutter (top-down) — "B3" = column B, row 3.
 *
 * Every cell is white; the figure's cells carry INVISIBLE answer markers
 * (fill none, data-lcs-answer-cell="C4" data-lcs-color="r"). A 3×3 `demo`
 * grid with B2 filled explains the notation without a sentence.
 *
 * { cols, rows, cell, figure (PIXEL_FIGURES entry), offset:{ox,oy} }
 *   → { svg, cells:[{code, letter, number, color}], width, height }
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, roundedRect, line, el, esc } = require('./_svg.js');

const LETTERS = 'ABCDEFGHIJKLMNOP';
const GUTTER = 28;

function coordGrid({ cols, rows, cell, figure, offset = { ox: 0, oy: 0 } }) {
  const t = tokens;
  const fh = figure.rows.length, fw = figure.rows[0].length;
  if (offset.ox + fw > cols || offset.oy + fh > rows) throw new Error(`coordGrid: figure ${figure.key} does not fit at offset ${offset.ox},${offset.oy}`);
  const W = GUTTER + cols * cell + 4, H = GUTTER + rows * cell + 4;
  const x0 = GUTTER + 2, y0 = GUTTER + 2;
  const parts = [];
  // gutter labels
  for (let c = 0; c < cols; c++) {
    parts.push(el('text', {
      x: x0 + c * cell + cell / 2, y: GUTTER / 2 + 2, 'font-family': t.font.display, 'font-size': 16, 'font-weight': 700,
      fill: t.color.inkSoft, 'text-anchor': 'middle', 'dominant-baseline': 'central', 'data-lcs-col-label': LETTERS[c],
    }, LETTERS[c]));
  }
  for (let r = 0; r < rows; r++) {
    parts.push(el('text', {
      x: GUTTER / 2, y: y0 + r * cell + cell / 2 + 1, 'font-family': t.font.display, 'font-size': 16, 'font-weight': 700,
      fill: t.color.inkSoft, 'text-anchor': 'middle', 'dominant-baseline': 'central', 'data-lcs-row-label': r + 1,
    }, esc(r + 1)));
  }
  // cells (all white) + grid lines
  parts.push(el('rect', { x: x0, y: y0, width: cols * cell, height: rows * cell, fill: t.color.white }));
  for (let r = 0; r <= rows; r++) parts.push(line({ x1: x0, y1: y0 + r * cell, x2: x0 + cols * cell, y2: y0 + r * cell, strokeColor: t.color.grid, strokeWidth: 1, cap: 'butt' }));
  for (let c = 0; c <= cols; c++) parts.push(line({ x1: x0 + c * cell, y1: y0, x2: x0 + c * cell, y2: y0 + rows * cell, strokeColor: t.color.grid, strokeWidth: 1, cap: 'butt' }));
  // invisible answer markers
  const cells = [];
  for (let r = 0; r < fh; r++) for (let c = 0; c < fw; c++) {
    const ch = figure.rows[r][c];
    if (ch === '.') continue;
    const gc = c + offset.ox, gr = r + offset.oy;
    const code = `${LETTERS[gc]}${gr + 1}`;
    cells.push({ code, letter: LETTERS[gc], number: gr + 1, color: ch });
    parts.push(el('rect', {
      x: x0 + gc * cell + 1, y: y0 + gr * cell + 1, width: cell - 2, height: cell - 2, fill: 'none',
      'data-lcs-answer-cell': code, 'data-lcs-color': ch,
    }));
  }
  parts.push(roundedRect({ x: x0, y: y0, w: cols * cell, h: rows * cell, r: 6, fill: 'none', strokeColor: t.color.teal, strokeWidth: 2.5 }));
  return {
    svg: svgRoot({ width: W, height: H, label: `coordinate grid ${cols} by ${rows}` }, parts.join(''), {
      'data-lcs-prim': 'coord-grid', 'data-lcs-cols': cols, 'data-lcs-rows': rows, 'data-lcs-figure': figure.key,
      'data-lcs-ox': offset.ox, 'data-lcs-oy': offset.oy, 'data-lcs-cell': cell,
    }),
    cells, width: W, height: H,
  };
}

/** The 3×3 "what B2 means" legend: B2 filled teal. */
function coordDemo({ cell = 18 } = {}) {
  const t = tokens;
  const g = 16;
  const W = g + 3 * cell + 4, H = g + 3 * cell + 4;
  const parts = [];
  for (let c = 0; c < 3; c++) parts.push(el('text', { x: g + 2 + c * cell + cell / 2, y: g / 2 + 1, 'font-family': t.font.display, 'font-size': 11, 'font-weight': 700, fill: t.color.inkSoft, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, LETTERS[c]));
  for (let r = 0; r < 3; r++) parts.push(el('text', { x: g / 2, y: g + 2 + r * cell + cell / 2 + 1, 'font-family': t.font.display, 'font-size': 11, 'font-weight': 700, fill: t.color.inkSoft, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, esc(r + 1)));
  parts.push(el('rect', { x: g + 2, y: g + 2, width: 3 * cell, height: 3 * cell, fill: t.color.white }));
  parts.push(el('rect', { x: g + 2 + cell + 1, y: g + 2 + cell + 1, width: cell - 2, height: cell - 2, fill: t.color.teal }));
  for (let i = 0; i <= 3; i++) {
    parts.push(line({ x1: g + 2, y1: g + 2 + i * cell, x2: g + 2 + 3 * cell, y2: g + 2 + i * cell, strokeColor: t.color.grid, strokeWidth: 1, cap: 'butt' }));
    parts.push(line({ x1: g + 2 + i * cell, y1: g + 2, x2: g + 2 + i * cell, y2: g + 2 + 3 * cell, strokeColor: t.color.grid, strokeWidth: 1, cap: 'butt' }));
  }
  parts.push(roundedRect({ x: g + 2, y: g + 2, w: 3 * cell, h: 3 * cell, r: 4, fill: 'none', strokeColor: t.color.teal, strokeWidth: 2 }));
  return { svg: svgRoot({ width: W, height: H, label: 'how to read B2' }, parts.join(''), { 'data-lcs-demo': 'B2' }), width: W, height: H };
}

module.exports = Object.assign(coordGrid, { coordDemo, LETTERS });
