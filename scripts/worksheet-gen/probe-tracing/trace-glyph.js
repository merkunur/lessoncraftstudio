/**
 * trace-glyph.js — PROBE helper (Part 1, scratch / additive).
 *
 * Renders a character as a dotted *outline* tracing glyph by stroking an SVG
 * <text> node (fill:none + stroke + stroke-dasharray) from a latin-ext font,
 * over a 3-line handwriting guide, with a heuristic start-dot.
 *
 * This is the "fresh font-stroke engine" the operator chose for the probe.
 * NOTE: stroking a normal (filled) font's outline yields HOLLOW dotted letters
 * (two parallel dotted edges), not single-stroke centerline letters. Directional
 * arrows + numbered stroke order are NOT derivable from a font outline — the
 * arrowsDemo() below shows they are renderable but must be authored per glyph.
 *
 * Not a worksheet-gen "type"; consumed only by probe.js.
 */
'use strict';
const { el, line, circle, svgRoot, esc } = require('../primitives/_svg.js');

const INK = '#3A3530';      // glyph + baseline (design token: color.ink)
const GUIDE = '#C8BFAE';    // faint guides (token: color.grid)
const MIDC = '#D8CFBE';     // x-height dashed midline (lighter)
const START = '#146B5E';    // start-dot (token: color.teal)
const ARROW = '#F2784B';    // arrows/badges (token: color.coral)
const FONT = "'Nunito'";    // thinnest vendored weight (400), latin + latin-ext

// viewBox geometry (units ~ CSS px; svg scales to 100% width on the page)
const W = 720;
const PADX = 12;
const CELL_H = 132;
const GLYPH_SIZE = 78;

// guide offsets from each row's top
const TOP = 26;    // cap / ascender line
const MIDY = 60;   // x-height (dashed)
const BASE = 92;   // baseline (solid, darker)
const DESC = 114;  // descender line

function guideRow(rowTop) {
  const x1 = PADX, x2 = W - PADX;
  const ln = (dy, dash, col, sw) => line({
    x1, y1: rowTop + dy, x2, y2: rowTop + dy,
    strokeColor: col, strokeWidth: sw, cap: 'butt', dash,
  });
  return [
    ln(TOP, '4,4', GUIDE, 1.2),
    ln(MIDY, '2,5', MIDC, 1.2),
    ln(BASE, undefined, INK, 1.6),
    ln(DESC, '4,4', GUIDE, 1.2),
  ].join('');
}

function glyphCell(ch, cx, rowTop) {
  const parts = [];
  // dotted-outline glyph
  parts.push(el('text', {
    x: cx, y: rowTop + BASE,
    'font-family': FONT, 'font-size': GLYPH_SIZE, 'font-weight': 400,
    'text-anchor': 'middle',
    fill: 'none', stroke: INK, 'stroke-width': 2.1,
    'stroke-linecap': 'round', 'stroke-linejoin': 'round',
    'stroke-dasharray': '1.5,3.5',
  }, esc(ch)));
  // heuristic start-dot (top-left of glyph box; NOT stroke-derived)
  parts.push(circle({ cx: cx - GLYPH_SIZE * 0.26, cy: rowTop + TOP + 8, r: 3.4, fill: START }));
  return parts.join('');
}

/**
 * traceGroup(chars, { perRow, label }) → svg string (auto-height).
 * chars: array of strings (single chars or short digraphs like "IJ", "¿").
 */
function traceGroup(chars, opts) {
  opts = opts || {};
  const perRow = opts.perRow || 8;
  const cellW = (W - PADX * 2) / perRow;
  const rows = Math.ceil(chars.length / perRow);
  const parts = [];
  for (let r = 0; r < rows; r++) {
    const rowTop = r * CELL_H + 6;
    parts.push(guideRow(rowTop));
    for (let c = 0; c < perRow; c++) {
      const i = r * perRow + c;
      if (i >= chars.length) break;
      const cx = PADX + (c + 0.5) * cellW;
      parts.push(glyphCell(chars[i], cx, rowTop));
    }
  }
  return svgRoot(
    { width: W, height: rows * CELL_H + 8, label: opts.label || 'tracing row' },
    parts.join(''),
    { style: 'width:100%;height:auto;display:block;' },
  );
}

// ---- arrows + numbered-stroke-order demo (authored per glyph, EN sheet only) ----

function arrowSeg(x1, y1, x2, y2) {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const ah = 8;
  const a1x = x2 - ah * Math.cos(ang - 0.45), a1y = y2 - ah * Math.sin(ang - 0.45);
  const a2x = x2 - ah * Math.cos(ang + 0.45), a2y = y2 - ah * Math.sin(ang + 0.45);
  return el('path', { d: `M ${x1} ${y1} L ${x2} ${y2}`, fill: 'none', stroke: ARROW, 'stroke-width': 2.4, 'stroke-linecap': 'round' })
    + el('path', { d: `M ${a1x} ${a1y} L ${x2} ${y2} L ${a2x} ${a2y}`, fill: 'none', stroke: ARROW, 'stroke-width': 2.4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
}

function numBadge(n, x, y) {
  return circle({ cx: x, cy: y, r: 8, fill: '#FFFFFF', strokeColor: ARROW, strokeWidth: 1.6 })
    + el('text', { x, y: y + 0.5, 'font-family': FONT, 'font-size': 11, 'font-weight': 700, fill: ARROW, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, String(n));
}

function demoLetter(ch, left) {
  const cellW = 170;
  const cx = left + cellW / 2;
  const top = 30, base = 112;
  const parts = [];
  // light dotted glyph behind the arrows
  parts.push(line({ x1: left + 14, y1: top, x2: left + cellW - 14, y2: top, strokeColor: GUIDE, strokeWidth: 1, cap: 'butt', dash: '4,4' }));
  parts.push(line({ x1: left + 14, y1: base, x2: left + cellW - 14, y2: base, strokeColor: INK, strokeWidth: 1.4, cap: 'butt' }));
  parts.push(el('text', {
    x: cx, y: base, 'font-family': FONT, 'font-size': 96, 'font-weight': 400,
    'text-anchor': 'middle', fill: 'none', stroke: INK, 'stroke-width': 2, 'stroke-linecap': 'round',
    'stroke-dasharray': '1.5,3.5',
  }, esc(ch)));

  if (ch === 'l') {
    parts.push(arrowSeg(cx + 1, top + 4, cx + 1, base - 4));
    parts.push(numBadge(1, cx + 14, top + 4));
  } else if (ch === 'T') {
    parts.push(arrowSeg(cx - 30, top + 6, cx + 30, top + 6));    // top bar →
    parts.push(numBadge(1, cx - 40, top + 6));
    parts.push(arrowSeg(cx, top + 6, cx, base - 4));            // stem ↓
    parts.push(numBadge(2, cx + 14, top + 18));
  } else if (ch === 'o') {
    // short counterclockwise hint-arc near the top + start badge
    parts.push(el('path', { d: `M ${cx + 8} ${top + 16} A 30 30 0 0 0 ${cx - 16} ${top + 22}`, fill: 'none', stroke: ARROW, 'stroke-width': 2.4, 'stroke-linecap': 'round' }));
    parts.push(arrowSeg(cx - 10, top + 18, cx - 16, top + 26));
    parts.push(numBadge(1, cx + 20, top + 10));
  } else if (ch === 'A') {
    parts.push(arrowSeg(cx, top + 4, cx - 26, base - 4));        // left leg ↙
    parts.push(arrowSeg(cx, top + 4, cx + 26, base - 4));        // right leg ↘
    parts.push(numBadge(1, cx - 16, top + 2));
    parts.push(numBadge(2, cx + 16, top + 2));
    parts.push(arrowSeg(cx - 16, (top + base) / 2 + 8, cx + 16, (top + base) / 2 + 8)); // crossbar →
    parts.push(numBadge(3, cx + 30, (top + base) / 2 + 8));
  }
  return parts.join('');
}

function arrowsDemo() {
  const letters = ['l', 'T', 'o', 'A'];
  const cellW = 170;
  const parts = letters.map((ch, i) => demoLetter(ch, i * cellW + 8));
  return svgRoot(
    { width: letters.length * cellW + 16, height: 150, label: 'authored stroke-order arrows demo' },
    parts.join(''),
    { style: 'width:100%;height:auto;display:block;' },
  );
}

module.exports = { traceGroup, arrowsDemo };
