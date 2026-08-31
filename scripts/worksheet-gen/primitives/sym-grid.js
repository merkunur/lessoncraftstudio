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

function symGrid({ figure, cell = 28 }) {
  const rows = figure.rows;
  const H = rows.length, W = rows[0].length;
  const givenCols = Math.ceil(W / 2); // left half INCLUDING the center column
  const w = W * cell, h = H * cell;
  const parts = [];

  // grid lines (light)
  for (let r = 0; r <= H; r++) {
    parts.push(line({ x1: 0, y1: r * cell, x2: w, y2: r * cell, strokeColor: tokens.color.grid, strokeWidth: 1, cap: 'butt' }));
  }
  for (let c = 0; c <= W; c++) {
    parts.push(line({ x1: c * cell, y1: 0, x2: c * cell, y2: h, strokeColor: tokens.color.grid, strokeWidth: 1, cap: 'butt' }));
  }

  // given cells: solid teal, left of (and on) the center column
  let answerCells = 0;
  for (let r = 0; r < H; r++) {
    for (let c = 0; c < W; c++) {
      if (rows[r][c] !== '#') continue;
      if (c < givenCols) {
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

  // mirror line: just right of the center column, coral dashed, heavier
  const mx = givenCols * cell;
  parts.push(line({
    x1: mx, y1: -4, x2: mx, y2: h + 4,
    strokeColor: tokens.color.coral, strokeWidth: 3, dash: '8 6',
    data: { 'data-lcs-mirror': '1' },
  }));

  return {
    svg: svgRoot({ width: w, height: h + 8, viewBox: `0 -4 ${w} ${h + 8}`, label: `symmetry grid: ${figure.key}` },
      parts.join(''), { 'data-lcs-prim': 'sym-grid', 'data-lcs-figure': figure.key, 'data-lcs-answer-count': answerCells, 'data-lcs-cols': W, 'data-lcs-rows': H }),
    answerCells,
    width: w, height: h + 8,
  };
}

module.exports = symGrid;
