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
 *
 * FACE components (Phase 2, 2026-09-14 — design §3):
 *
 *   syllableModel({ word, fontPx, w })
 *     The Write face's printed model: the whole word, Baloo 2 700, in a fixed
 *     column `w` (`<span data-lcs-model>`). Proportional text — the child copies
 *     it onto the hyphen lane, so no cell geometry is needed here.
 *
 *   syllableSortBank({ words:[{word, vocabKey, src, count, rank}], wordPx=18 })
 *     The Sort face's word bank (the b2 wordBank markup — .ws-scene-banner
 *     .ws-bank--icons / .ws-bankword — re-emitted here so every chip carries
 *     the hidden `data-lcs-count` + `data-lcs-rank` stamps the design asks
 *     for; components-b2.js is never edited). Chips are emitted in the order
 *     given (the caller sorts by collation, never by count).
 *
 *   syllableSortColumn({ n, text, rows, w, h, glyphH })
 *     One Sort column: a `.ws-lane` with the heading (`.ws-nchip` 44 numeral +
 *     the panel's sortLabels literal, Nunito 800 20) over `rows` empty school
 *     rulings (rulingBlock). Stamped `data-lcs-col=n`.
 *
 *   kingsExampleBanner({ word, split, kings, cell, arcH })
 *     The Vowel King worked example: `.ws-scene-banner` holding the word in
 *     cells over PRINTED arcs, with one vowelDot inside each bowl under its
 *     king (kings = [{at, len}] in letters, from the spec's kingRuns). The
 *     only place a vowel dot is ever drawn. Stamped `data-lcs-kings-example`.
 */
'use strict';
const { svgRoot, roundedRect, label, circle, esc } = require('../../primitives/_svg.js');
const { syllableArcs } = require('../../primitives/syllable-arcs.js');
const { writingRow } = require('../../primitives/trace-path.js');
const { rulingBlock } = require('../components-b2.js');
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

/* ---------------- face components (design §3) ---------------- */

function syllableModel({ word, fontPx = 26, w = 196 }) {
  return `<span data-lcs-model style="display:inline-block;width:${w}px;flex:none;font-family:${F.display};font-weight:700;font-size:${fontPx}px;line-height:1.1;color:${T.ink};white-space:nowrap;overflow:visible">${esc(word)}</span>`;
}

function syllableSortBank({ words, wordPx = 18 }) {
  const items = words.map((wd) =>
    `<span class="ws-bankword" style="font-size:${wordPx}px" data-lcs-bank-word="${esc(wd.word)}" data-lcs-bank="${esc(wd.vocabKey)}" ` +
    `data-lcs-count="${wd.count}" data-lcs-rank="${wd.rank}">` +
    (wd.src ? `<img class="ws-icon" src="${wd.src}" alt="" data-lcs-pic="${esc(wd.vocabKey)}" style="width:44px;height:44px">` : '') +
    `<span>${esc(wd.word)}</span></span>`).join('');
  return `<div class="ws-scene-banner ws-bank ws-bank--icons" data-lcs-bank-banner data-lcs-bank-size="${words.length}">${items}</div>`;
}

function syllableSortColumn({ n, text, rows, w = 290, h = 64, glyphH = 28, chip = 44, maxGap = 36 }) {
  return `<div class="ws-lane" style="display:flex;flex-direction:column;gap:8px;min-width:0" data-ws-content data-lcs-col="${n}" data-lcs-col-rows="${rows}">` +
    `<div style="display:flex;align-items:center;gap:10px;height:${chip}px" data-lcs-col-head>` +
    `<span class="ws-nchip" style="width:${chip}px;height:${chip}px;font-size:${Math.round(chip * 0.55)}px;flex:none" data-lcs-col-numeral="${n}">${n}</span>` +
    `<span style="font-family:${F.body};font-weight:800;font-size:20px;color:${T.ink};white-space:nowrap;overflow:hidden;text-overflow:clip" data-lcs-col-label>${esc(text)}</span></div>` +
    // the rulings take the column's remaining height with the gaps spread evenly, capped at maxGap
    // (rows·h + (rows+1)·maxGap) so a tall column never floats four rows 100 px apart
    `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:flex-start;min-height:0" data-lcs-col-rulings>` +
    rulingBlock({ rows, w, h, glyphH }).replace('style="display:flex;flex-direction:column;gap:',
      `style="flex:1 1 auto;max-height:${rows * h + (rows + 1) * maxGap}px;justify-content:space-evenly;display:flex;flex-direction:column;gap:`) + `</div></div>`;
}

function kingsExampleBanner({ word, split, kings, cell = 24, arcH = 22 }) {
  const wordSvg = syllableWord({ word, cell, fontPx: cell - 2 });
  let arcs = syllableArcsForWord({ split, cell, h: arcH, mode: 'printed' });
  // one dot per king, centred under its vowel run, inside the bowl (y = arcH·0.42 sits
  // between the shelf line of the letters and the bowl's lowest point at 0.95·h/2 + 1.5)
  const dots = kings.map((k) => vowelDot({ x: +((k.at + k.len / 2) * cell).toFixed(2), y: +(arcH * 0.42).toFixed(1) })).join('');
  arcs = arcs.replace('</svg>', dots + '</svg>');
  return `<div class="ws-scene-banner" style="flex-direction:column;gap:0;padding:6px 10px 8px;margin-bottom:10px;align-self:center;min-width:220px" data-ws-content data-lcs-kings-example="${esc(word)}" data-lcs-kings-stamp="${kings.map((k) => k.at + ':' + k.len).join('|')}">` +
    `<div style="line-height:0">${wordSvg}</div><div style="line-height:0">${arcs}</div></div>`;
}

module.exports = { syllableWord, syllableArcsForWord, hyphenLane, vowelDot, syllableModel, syllableSortBank, syllableSortColumn, kingsExampleBanner };
