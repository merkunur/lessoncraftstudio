/**
 * components-b3/syllable-split.js — the G1-305 `syllable-split` components
 * (design file §2 "NEW in templates/components-b3.js"). Type-scoped; merged
 * into the components-b3 namespace by templates/components-b3.js.
 *
 *   syllableWord({ word, cell, fontPx, blank=null })
 *     The whole word in EQUAL LETTER CELLS: `<svg width=n·cell height=cell+12
 *     data-lcs-cells=n data-lcs-cell=cell>`, letter i a `label` centred at
 *     x=(i+0.5)·cell, y=letterY (the measured Baloo 2 ink centred in the
 *     cell+12 box, so descenders g j p q y stay inside), Baloo 2 700, T.ink, no borders. Equal cells make every
 *     syllable boundary an exact x (cumulative letters × cell) — build() has
 *     no font metrics, so the faces' printed arcs and verify() never depend on
 *     text measurement. `blank={from,len}` (the Missing-Syllable face)
 *     replaces those `len` letters by ONE dashed coral box exactly 4 cells
 *     wide whatever `len` is (no length leak), re-laying the letters after it.
 *
 *   syllableArcsForWord({ split, cell, h, mode, dots })
 *     Spans from the split (each syllable's cumulative letter run × cell) →
 *     primitives/syllable-arcs.js. In `blank` mode the primitive emits no
 *     span, so the split cannot leak through the drawing.
 *
 *   hyphenLane({ w, h=64, glyphH=28 })
 *     `writingRow({w,h,glyphH,xHeight:true})` in `<div data-lcs-hyphen-lane>`
 *     — NO ticks (a tick would print the boundary). The Write face.
 *
 *   vowelDot({ x, y })
 *     `circle r 5 fill T.coral data-lcs-vowel-dot` — ONLY in the Vowel King
 *     worked-example banner, never on a card.
 */
'use strict';
const { svgRoot, roundedRect, label, circle } = require('../../primitives/_svg.js');
const { syllableArcs } = require('../../primitives/syllable-arcs.js');
const { writingRow } = require('../../primitives/trace-path.js');
const tokens = require('../../primitives/_tokens.js');
const T = tokens.color, F = tokens.font;

const BLANK_CELLS = 4;   // the cloze box is always 4 cells wide — the syllable length never leaks

function syllableWord({ word, cell, fontPx, blank = null }) {
  const letters = [...String(word)];
  const n = letters.length;
  if (!n) throw new Error('syllableWord: empty word');
  if (!(cell > 0)) throw new Error('syllableWord: cell must be > 0');
  const size = fontPx || cell - 2;
  const h = cell + 12;
  const parts = [];
  let cells;
  if (blank) {
    const { from, len } = blank;
    if (!(from >= 0 && len >= 1 && from + len <= n)) throw new Error('syllableWord: blank {from,len} out of range for "' + word + '"');
    cells = n - len + BLANK_CELLS;
    let x = 0;
    for (let i = 0; i < from; i++, x++) parts.push(letterAt(letters[i], x, cell, size));
    parts.push(roundedRect({
      x: x * cell + 2, y: 3, w: BLANK_CELLS * cell - 4, h: cell + 4, r: 8,
      fill: T.white, strokeColor: T.coral, strokeWidth: 2.5, dash: '6 5',
      data: { 'data-lcs-blank': from, 'data-lcs-blank-cells': BLANK_CELLS },
    }));
    x += BLANK_CELLS;
    for (let i = from + len; i < n; i++, x++) parts.push(letterAt(letters[i], x, cell, size));
  } else {
    cells = n;
    letters.forEach((ch, i) => parts.push(letterAt(ch, i, cell, size)));
  }
  const w = cells * cell;
  return svgRoot({ width: w, height: h, label: blank ? 'word with a missing syllable' : 'word in letter cells' }, parts,
    { 'data-lcs-cells': cells, 'data-lcs-cell': cell, 'data-lcs-fontpx': size, 'data-lcs-prim': 'syllable-word' });
}

// Vertical anchor. `label()` uses dominant-baseline:central, and Baloo 2 700
// measured in the real render (2026-09-14, canvas measureText at 22-34 px):
// ink reaches 0.60·size ABOVE the central anchor (Å) and 0.49·size BELOW it
// (g). The design's `y: cell+2` assumed an alphabetic baseline and clipped
// every descender (p g y j q) at the box edge; y = h/2 + 0.06·size centres the
// measured ink in the cell+12 box with ≥ 5 px to spare at every cell.
function letterY(cell, size) { return +((cell + 12) / 2 + 0.06 * size).toFixed(1); }

function letterAt(ch, i, cell, size) {
  return label({
    x: +((i + 0.5) * cell).toFixed(2), y: letterY(cell, size), text: ch, size,
    color: T.ink, fontFamily: F.display, weight: 700, anchor: 'middle',
    data: { 'data-lcs-letter': i },
  });
}

/** Cell spans of a split: syllable s covers its letters' cells. */
function spansFor(split, cell) {
  let at = 0;
  return split.map((syl) => {
    const len = [...syl].length;
    const s = { x: at * cell, w: len * cell };
    at += len;
    return s;
  });
}

function syllableArcsForWord({ split, cell, h, mode = 'printed', dots = 0 }) {
  if (!Array.isArray(split) || !split.length) throw new Error('syllableArcsForWord: split[] required');
  const spans = spansFor(split, cell);
  const w = spans[spans.length - 1].x + spans[spans.length - 1].w;
  return syllableArcs({ spans: mode === 'blank' ? [] : spans, w, h, mode, dots });
}

function hyphenLane({ w, h = 64, glyphH = 28 }) {
  return `<div data-lcs-hyphen-lane style="width:${w}px;height:${h}px">${writingRow({ w, h, glyphH, xHeight: true }).svg}</div>`;
}

function vowelDot({ x, y }) {
  return circle({ cx: x, cy: y, r: 5, fill: T.coral, data: { 'data-lcs-vowel-dot': 1 } });
}

module.exports = { syllableWord, syllableArcsForWord, hyphenLane, vowelDot };
