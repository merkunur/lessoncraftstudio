/**
 * sym-grid — symmetry-drawing grid primitive (SVG). Renders a square-cell
 * grid with the LEFT half of a pixel figure pre-filled (solid teal — B&W
 * rule: filled vs empty must be unambiguous in gray) and a 3px coral dashed
 * vertical mirror line. The child mirrors the figure into the right half
 * with a pencil. Cells 26-30px (~7mm — drawable).
 *
 * { figure:{key,rows}, cell } → { svg, answerCells } where answerCells is
 * the count of cells the child must fill (right of the line).
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el, line } = require('./_svg.js');

function symGrid({ figure, cell = 28, axis = 'v' }) {
  // nt20-VAR axis 'h': mirror across a HORIZONTAL line. The figure matrix is
  // rotated 90° clockwise first — a left-right-symmetric figure becomes
  // top-bottom symmetric, so the same hand-designed art serves both axes.
  let rows = figure.rows;
  if (axis === 'h') {
    const src = figure.rows;
    const sh = src.length, sw = src[0].length;
    rows = Array.from({ length: sw }, (_, r) =>
      Array.from({ length: sh }, (_, c) => src[sh - 1 - c][r]).join(''));
  }
  const H = rows.length, W = rows[0].length;
  const givenCols = Math.ceil(W / 2); // left half INCLUDING the center column
  const givenRows = Math.ceil(H / 2); // top half INCLUDING the center row (axis 'h')
  const w = W * cell, h = H * cell;
  const parts = [];

  // grid lines (light)
  for (let r = 0; r <= H; r++) {
    parts.push(line({ x1: 0, y1: r * cell, x2: w, y2: r * cell, strokeColor: tokens.color.grid, strokeWidth: 1, cap: 'butt' }));
  }
  for (let c = 0; c <= W; c++) {
    parts.push(line({ x1: c * cell, y1: 0, x2: c * cell, y2: h, strokeColor: tokens.color.grid, strokeWidth: 1, cap: 'butt' }));
  }

  // given cells: solid teal — left of the vertical line (axis 'v') or above
  // the horizontal line (axis 'h'); the rest are invisible answer markers
  let answerCells = 0;
  for (let r = 0; r < H; r++) {
    for (let c = 0; c < W; c++) {
      if (rows[r][c] !== '#') continue;
      if (axis === 'h' ? r < givenRows : c < givenCols) {
        parts.push(el('rect', {
          x: c * cell + 1, y: r * cell + 1, width: cell - 2, height: cell - 2,
          fill: tokens.color.teal, 'data-lcs-given': `${c},${r}`,
        }));
      } else {
        // invisible ground-truth marker for QA (no visual)
        parts.push(el('rect', {
          x: c * cell + 1, y: r * cell + 1, width: cell - 2, height: cell - 2,
          fill: 'none', 'data-lcs-answer-cell': `${c},${r}`,
        }));
        answerCells++;
      }
    }
  }

  // mirror line: just past the center column/row, coral dashed, heavier
  if (axis === 'h') {
    const my = givenRows * cell;
    parts.push(line({
      x1: -4, y1: my, x2: w + 4, y2: my,
      strokeColor: tokens.color.coral, strokeWidth: 3, dash: '8 6',
      data: { 'data-lcs-mirror': '1' },
    }));
  } else {
    const mx = givenCols * cell;
    parts.push(line({
      x1: mx, y1: -4, x2: mx, y2: h + 4,
      strokeColor: tokens.color.coral, strokeWidth: 3, dash: '8 6',
      data: { 'data-lcs-mirror': '1' },
    }));
  }

  const vb = axis === 'h' ? `-4 0 ${w + 8} ${h + 8}` : `0 -4 ${w} ${h + 8}`;
  return {
    svg: svgRoot({ width: w + (axis === 'h' ? 8 : 0), height: h + 8, viewBox: vb, label: `symmetry grid: ${figure.key}` },
      parts.join(''), { 'data-lcs-prim': 'sym-grid', 'data-lcs-figure': figure.key, 'data-lcs-answer-count': answerCells, 'data-lcs-cols': W, 'data-lcs-rows': H,
        ...(axis === 'h' ? { 'data-lcs-axis': 'h' } : {}) }), // absent = vertical (published output stays byte-identical)
    answerCells,
    width: w + (axis === 'h' ? 8 : 0), height: h + 8,
  };
}

module.exports = symGrid;
