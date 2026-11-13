/**
 * hundredsChart — parametric 10×N number chart primitive (SVG).
 * params: { start=1, end=100, missing=[...numbers], highlights=[...numbers], cell=56, keyText=false, ask=null,
 *           blank='dashed', fills=null, cellH=cell }
 * Year pages E 2026-11-13 (additive): cellH = the height of a cell when it is not square (the chart to 50 has five
 * rows; tall boxes give a kindergarten hand room and the page is filled).
 * Makers 2026-11-01 (additive, off by default — catalogue pages unchanged): blank='plain' draws a missing cell as a
 * plain empty cell (a blank chart to fill has 80 of them; 80 dashed coral boxes shout); fills = { value: colour }
 * paints whole cells (the hidden-picture key).
 * Missing cells render as dashed write-in cells; highlights get coralSoft fill.
 * meta carries the ground truth for QA.
 */
'use strict';
const tokens = require('./_tokens.js');
const { el, svgRoot, roundedRect, label } = require('./_svg.js');

function hundredsChart({ start = 1, end = 100, missing = [], highlights = [], cell = 56, keyText = false, ask = null, blank = 'dashed', fills = null, cellBoxes = null, cellH = null }, ctx) {
  const t = (ctx && ctx.tokens) || tokens;
  const cols = 10;
  const count = end - start + 1;
  const rows = Math.ceil(count / cols);
  const pad = 4;
  const W = cols * cell + pad * 2;
  const ch = cellH || cell;
  const H = rows * ch + pad * 2;
  const missingSet = new Set(missing);
  const highlightSet = new Set(highlights);

  const parts = [
    roundedRect({ x: pad / 2, y: pad / 2, w: W - pad, h: H - pad, r: 10, fill: t.color.white, strokeColor: t.color.teal, strokeWidth: t.stroke.primitive }),
  ];

  for (let i = 0; i < count; i++) {
    const v = start + i;
    const cx = pad + (i % cols) * cell;
    const cy = pad + Math.floor(i / cols) * ch;
    const isMissing = missingSet.has(v);
    const isHi = highlightSet.has(v);
    if (fills && fills[v]) parts.push(roundedRect({ x: cx + 2, y: cy + 2, w: cell - 4, h: ch - 4, r: 5, fill: fills[v], data: { 'data-lcs-fill': v } }));
    if (isMissing) {
      parts.push(blank === 'plain'
        ? roundedRect({ x: cx + 3, y: cy + 3, w: cell - 6, h: ch - 6, r: 6, fill: t.color.white, strokeColor: t.color.grid, strokeWidth: 1, data: { 'data-lcs-missing': v } })
        : roundedRect({
          x: cx + 3, y: cy + 3, w: cell - 6, h: ch - 6, r: 6,
          fill: t.color.white, strokeColor: t.color.coral, strokeWidth: 2, dash: '5 4',
          data: { 'data-lcs-missing': v },
        }));
      // Level Set 2026-10-13 (additive, off by default): the answer key writes the number in its box; the screen marks
      // the one asked with a coral "?"
      if (keyText || v === ask) {
        parts.push(label({ x: cx + cell / 2, y: cy + ch / 2 + 1, text: v === ask ? '?' : v, size: Math.round(cell * 0.36), color: t.color.coral, fontFamily: t.font.display, weight: 700 }));
      }
    } else {
      if (isHi) {
        parts.push(roundedRect({ x: cx + 2, y: cy + 2, w: cell - 4, h: ch - 4, r: 5, fill: t.color.coralSoft, data: { 'data-lcs-highlight': v } }));
      }
      parts.push(label({
        x: cx + cell / 2, y: cy + ch / 2 + 1, text: v,
        size: Math.round(cell * 0.36), color: t.color.ink, fontFamily: t.font.display, weight: 600,
        data: { 'data-lcs-cell': v },
      }));
      // screen-from-marks 2026-11-01 (additive, screen builds only): a transparent hit box per cell, a candidate to tap;
      // cellBoxes.rings = the cells the task colours (the right ones)
      if (cellBoxes) parts.push(roundedRect({ x: cx + 2, y: cy + 2, w: cell - 4, h: ch - 4, r: 5, fill: 'none', data: { 'data-lcs-cellbox': v, 'data-lcs-pick': 1, ...(cellBoxes.rings && cellBoxes.rings.includes(v) ? { 'data-lcs-key-ring': 1 } : {}) } }));
    }
    // light interior grid lines (right + bottom edges of each cell)
    if (i % cols !== cols - 1) parts.push(el('line', { x1: cx + cell, y1: cy + 4, x2: cx + cell, y2: cy + ch - 4, stroke: t.color.grid, 'stroke-width': 1 }));
    if (Math.floor(i / cols) !== rows - 1) parts.push(el('line', { x1: cx + 4, y1: cy + ch, x2: cx + cell - 4, y2: cy + ch, stroke: t.color.grid, 'stroke-width': 1 }));
  }

  return {
    svg: svgRoot({ width: W, height: H, label: `number chart ${start}-${end}` }, parts.join(''), { 'data-lcs-prim': 'hundreds-chart', 'data-lcs-start': start, 'data-lcs-end': end }),
    meta: { start, end, missing: [...missingSet], highlights: [...highlightSet], rows, cols },
    width: W,
    height: H,
  };
}

module.exports = hundredsChart;
