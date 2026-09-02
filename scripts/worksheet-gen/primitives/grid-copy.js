/**
 * gridCopy — "copy the picture onto the empty grid" primitive pair (SVG).
 * nt20-B K-286 (Gitterbilder / reproduction sur quadrillage).
 *
 * Model grid: the pixel figure's cells solid teal (mono — one pencil, B&W
 * proof) on a white grid; target grid: identical frame and lines, every cell
 * white, with INVISIBLE answer markers so verify() can compare the two sets.
 * Optional coordinate labels (A… top, 1… left) on BOTH grids at d3 — the
 * bridge to grid-coordinates.
 *
 * { figure, cell, labels=false } → { modelSvg, targetSvg, filled, width, height }
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, roundedRect, line, el, esc } = require('./_svg.js');
const { monoRows } = require('../data/b2/figures.js');

const LETTERS = 'ABCDEFGHIJ';

function grid({ n, cell, labels, filledCells, mode, key }) {
  const t = tokens;
  const g = labels ? 20 : 0;
  const W = g + n * cell + 4, H = g + n * cell + 4;
  const x0 = g + 2, y0 = g + 2;
  const parts = [];
  if (labels) {
    for (let c = 0; c < n; c++) parts.push(el('text', { x: x0 + c * cell + cell / 2, y: g / 2 + 1, 'font-family': t.font.display, 'font-size': 12, 'font-weight': 700, fill: t.color.inkSoft, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, LETTERS[c]));
    for (let r = 0; r < n; r++) parts.push(el('text', { x: g / 2, y: y0 + r * cell + cell / 2 + 1, 'font-family': t.font.display, 'font-size': 12, 'font-weight': 700, fill: t.color.inkSoft, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, esc(r + 1)));
  }
  parts.push(el('rect', { x: x0, y: y0, width: n * cell, height: n * cell, fill: t.color.white }));
  for (const [c, r] of filledCells) {
    if (mode === 'model') {
      parts.push(el('rect', { x: x0 + c * cell + 1, y: y0 + r * cell + 1, width: cell - 2, height: cell - 2, fill: t.color.teal, 'data-lcs-given': `${c},${r}` }));
    } else {
      parts.push(el('rect', { x: x0 + c * cell + 1, y: y0 + r * cell + 1, width: cell - 2, height: cell - 2, fill: 'none', 'data-lcs-answer-cell': `${c},${r}` }));
    }
  }
  for (let i = 0; i <= n; i++) {
    parts.push(line({ x1: x0, y1: y0 + i * cell, x2: x0 + n * cell, y2: y0 + i * cell, strokeColor: t.color.grid, strokeWidth: 1, cap: 'butt' }));
    parts.push(line({ x1: x0 + i * cell, y1: y0, x2: x0 + i * cell, y2: y0 + n * cell, strokeColor: t.color.grid, strokeWidth: 1, cap: 'butt' }));
  }
  parts.push(roundedRect({ x: x0, y: y0, w: n * cell, h: n * cell, r: 6, fill: 'none', strokeColor: t.color.teal, strokeWidth: 2 }));
  return {
    svg: svgRoot({ width: W, height: H, label: mode === 'model' ? `picture to copy: ${key}` : 'empty grid to draw on' }, parts.join(''), {
      'data-lcs-prim': mode === 'model' ? 'grid-copy-model' : 'grid-copy-target',
      'data-lcs-cols': n, 'data-lcs-rows': n, 'data-lcs-cell': cell, 'data-lcs-figure': key,
      ...(mode === 'model' ? { 'data-lcs-filled': filledCells.length } : {}),
    }),
    width: W, height: H,
  };
}

function gridCopy({ figure, cell, labels = false }) {
  const mono = monoRows(figure);
  const n = mono.length;
  const filledCells = [];
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (mono[r][c] === '#') filledCells.push([c, r]);
  const model = grid({ n, cell, labels, filledCells, mode: 'model', key: figure.key });
  const target = grid({ n, cell, labels, filledCells, mode: 'target', key: figure.key });
  return { modelSvg: model.svg, targetSvg: target.svg, filled: filledCells.length, width: model.width, height: model.height };
}

module.exports = gridCopy;
