/**
 * logic-grid.js — the G2-319 `logic-puzzles` apparatus (design file §2 "NEW
 * primitives/logic-grid.js"). Pure SVG on primitives/_tokens.js for every
 * drawn thing; the column-header PICTURES are real `<img class="ws-icon">`
 * elements laid over the SVG header cells (an SVG `<image>` cannot be
 * checked for "broken" by qa/lints.js nor measured as an <img> floor by the
 * gate — recorded deviation in _work/G2-319-build.md), so `logicGrid` returns
 * `{html, width, height}` rather than a bare svg string.
 *
 *   logicGrid({ rows:[{label}], cols:[{src, alt}], cell=60, headW=124,
 *               hdrH=64, namePx=22, picPx=56, mode:'blank'|'solved',
 *               solved?, puzzle })
 *     The elimination grid: name tiles down the header column (white
 *     roundedRect r 10, teal 2, Baloo 2 700 `namePx` ink — NOT `.ws-tile`),
 *     pictures across the header row (no box), an n×n body of white cells
 *     with 1.5 px `grid` interior lines inside a teal 2.5 px r 6 frame. Every
 *     body cell is an EMPTY `<rect fill="none" data-lcs-cell="p:r:c">` — no
 *     text, no child, no class (the child marks it). `mode:'solved'` (the F5
 *     face) prints a teal ✓ in the solution cell of every row and a coral ✗
 *     elsewhere, each `data-lcs-mark="1|0"`, at 40 % of the cell.
 *     Name-tile inner width = headW − 20 (104 at the base); the caller /
 *     verify assert the label's computed text length fits it.
 *   markKey({ compact=false })
 *     The wordless legend strip (675 × 36; 24 compact): [✓ chip][✗ chip]
 *     [2×2 mini grid with one ✓ and three ✗], right-aligned, `aria-hidden`,
 *     class `ws-logic-markkey`, NO data-lcs-* (a legend is not an answer).
 *   notMark(px)
 *     The coral X of types/_shared/picture-equation.js crossoutGroup
 *     (`M7 7l26 26M33 7L7 33`, stroke 5, viewBox 40) scaled to `px` — the
 *     F3 face's "not" pictogram.
 *   tickPath / crossPath
 *     The two mark paths in a 60-unit box (exported so the components and
 *     the gate draw the SAME glyphs).
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, roundedRect, line, label, el, esc } = require('./_svg.js');

const T = tokens.color;
const F = tokens.font;
const TICK = 'M14 31l9 9 21-22';
const CROSS = 'M14 14l32 32M46 14L14 46';
const TILE_PAD = 10;   // tile inset from the header column edge (x) → inner = headW - 2*TILE_PAD

function mark(kind, x, y, size, extra) {
  // the paths span 14..46 (32 units of a 60 box centred at 30,30): scale so that span = `size`; (x, y) = the mark CENTRE
  const s = size / 32;
  const off = -30 * s;
  return el('g', { transform: `translate(${(x + off).toFixed(2)} ${(y + off).toFixed(2)}) scale(${s.toFixed(4)})`, ...(extra || {}) },
    el('path', { d: kind === 'yes' ? TICK : CROSS, fill: 'none', stroke: kind === 'yes' ? T.teal : T.coral, 'stroke-width': 4 / s, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
}

function logicGrid({ rows, cols, cell = 60, headW = 124, hdrH = 64, namePx = 22, picPx = 56, mode = 'blank', solved = null, puzzle = 0 }) {
  if (!Array.isArray(rows) || !Array.isArray(cols) || !rows.length || rows.length !== cols.length) throw new Error('logicGrid: rows and cols must be non-empty arrays of equal length');
  if (!(cell > 0 && headW > 0 && hdrH > 0)) throw new Error('logicGrid: cell/headW/hdrH must be > 0');
  if (mode !== 'blank' && mode !== 'solved') throw new Error('logicGrid: mode must be blank|solved, got ' + mode);
  if (mode === 'solved' && (!Array.isArray(solved) || solved.length !== rows.length)) throw new Error('logicGrid: mode solved needs `solved` (one column index per row)');
  if (picPx > cell || picPx > hdrH) throw new Error(`logicGrid: picPx ${picPx} does not fit the ${cell}×${hdrH} header cell`);
  const n = rows.length;
  const W = headW + n * cell, H = hdrH + n * cell;
  const parts = [];
  // frame (white ground) — drawn first so every line sits on it
  parts.push(roundedRect({ x: 1.25, y: 1.25, w: W - 2.5, h: H - 2.5, r: 6, fill: T.white, strokeColor: T.teal, strokeWidth: 2.5 }));
  // interior lines (the header column / row edges included)
  for (let k = 0; k < n; k++) {
    const x = headW + k * cell;
    parts.push(line({ x1: x, y1: 1.25, x2: x, y2: H - 1.25, strokeColor: T.grid, strokeWidth: tokens.stroke.grid, cap: 'butt' }));
    const y = hdrH + k * cell;
    parts.push(line({ x1: 1.25, y1: y, x2: W - 1.25, y2: y, strokeColor: T.grid, strokeWidth: tokens.stroke.grid, cap: 'butt' }));
  }
  // name tiles
  const tileH = Math.min(48, cell - 8);
  rows.forEach((r, i) => {
    const y = hdrH + i * cell;
    parts.push(roundedRect({ x: TILE_PAD - 6, y: y + (cell - tileH) / 2, w: headW - 2 * (TILE_PAD - 6), h: tileH, r: 10, fill: T.white, strokeColor: T.teal, strokeWidth: 2, data: { 'data-lcs-tile': i } }));
    parts.push(label({ x: headW / 2, y: y + cell / 2 + 0.04 * namePx, text: r.label, size: namePx, color: T.ink, fontFamily: F.display, weight: 700, anchor: 'middle', data: { 'data-lcs-row': i, 'data-lcs-tile-inner': headW - 2 * TILE_PAD } }));
  });
  // body cells (empty) + optional marks
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const x = headW + c * cell, y = hdrH + r * cell;
      parts.push(el('rect', { x, y, width: cell, height: cell, fill: 'none', 'data-lcs-cell': `${puzzle}:${r}:${c}` }));
      if (mode === 'solved') {
        const yes = solved[r] === c;
        parts.push(mark(yes ? 'yes' : 'no', x + cell / 2, y + cell / 2, cell * 0.4, { 'data-lcs-mark': yes ? 1 : 0, 'data-lcs-mark-cell': `${puzzle}:${r}:${c}` }));
      }
    }
  }
  const svg = svgRoot({ width: W, height: H, label: 'elimination grid' }, parts, { 'data-lcs-prim': 'logic-grid', 'data-lcs-cell-px': cell, 'data-lcs-size': n, style: 'display:block' });
  const imgs = cols.map((c, j) => {
    const left = headW + j * cell + (cell - picPx) / 2, top = (hdrH - picPx) / 2;
    return `<img class="ws-icon" src="${esc(c.src)}" alt="${esc(c.alt || '')}" data-lcs-col="${j}" style="position:absolute;left:${left}px;top:${top}px;width:${picPx}px;height:${picPx}px">`;
  }).join('');
  const html = `<div data-lcs-grid="${puzzle}" data-lcs-mode="${mode}" style="position:relative;width:${W}px;height:${H}px;flex:0 0 auto">${svg}${imgs}</div>`;
  return { html, width: W, height: H };
}

function chip(kind, size) {
  const inner = size - 4;
  const svg = svgRoot({ width: inner, height: inner, label: '' }, [mark(kind, inner / 2, inner / 2, inner * 0.58)], { 'aria-hidden': 'true' });
  return `<span style="display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;flex:0 0 ${size}px;` +
    `background:${T.white};border:2px solid ${T.teal};border-radius:8px;box-sizing:border-box">${svg}</span>`;
}

function markKey({ compact = false } = {}) {
  const h = compact ? 24 : 36;
  const chipPx = compact ? 22 : 28;
  const mini = compact ? 26 : 34;
  const c = mini / 2;
  const parts = [roundedRect({ x: 0.75, y: 0.75, w: mini - 1.5, h: mini - 1.5, r: 4, fill: T.white, strokeColor: T.teal, strokeWidth: 1.5 })];
  parts.push(line({ x1: c, y1: 0.75, x2: c, y2: mini - 0.75, strokeColor: T.grid, strokeWidth: 1, cap: 'butt' }));
  parts.push(line({ x1: 0.75, y1: c, x2: mini - 0.75, y2: c, strokeColor: T.grid, strokeWidth: 1, cap: 'butt' }));
  const m = c * 0.55;
  parts.push(mark('yes', c / 2, c / 2, m));
  parts.push(mark('no', c + c / 2, c / 2, m));
  parts.push(mark('no', c / 2, c + c / 2, m));
  parts.push(mark('no', c + c / 2, c + c / 2, m));
  const miniSvg = svgRoot({ width: mini, height: mini, label: '' }, parts, { 'aria-hidden': 'true' });
  return `<div class="ws-logic-markkey" aria-hidden="true" style="display:flex;align-items:center;justify-content:flex-end;gap:6px;width:675px;height:${h}px;flex:0 0 ${h}px">` +
    chip('yes', chipPx) + chip('no', chipPx) + `<span style="width:10px;flex:0 0 10px"></span>` +
    `<span style="display:inline-flex;align-items:center;line-height:0">${miniSvg}</span></div>`;
}

function notMark(px) {
  return svgRoot({ width: px, height: px, viewBox: '0 0 40 40', label: '' },
    [el('path', { d: 'M7 7l26 26M33 7L7 33', fill: 'none', stroke: T.coral, 'stroke-width': 5, 'stroke-linecap': 'round' })],
    { 'aria-hidden': 'true', 'data-lcs-notmark': px });
}

module.exports = { logicGrid, markKey, notMark, tickPath: TICK, crossPath: CROSS };
