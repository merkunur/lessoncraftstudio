/**
 * components-b3/spelling-rules.js — the G2-315 `spelling-rules` components
 * (design file §2 "NEW in templates/components-b3.js"). Type-scoped; merged
 * into the components-b3 namespace by templates/components-b3.js (names are
 * unique across every family file — `proofLane`, `pictureBank`, `ruleBins`
 * are Phase-2 faces and are NOT exported yet: nothing on the base consumes
 * them).
 *
 *   gapWord({ word, gaps:[{from,len}], gapCells, cell, fontPx, mode })
 *     The word in EQUAL LETTER CELLS (the G1-305 `syllableWord` idea: build()
 *     has no font metrics, so every gap is an exact x = cells × cell):
 *     `<svg width=cells·cell height=cell+14 data-lcs-cells data-lcs-cell
 *     data-lcs-mode data-lcs-fontpx data-lcs-prim="gap-word">`; letter i a
 *     `label` centred at x=(i+0.5)·cell, Baloo 2 700 T.ink, no borders.
 *       mode 'gap'      the printed letters + ONE dashed coral box per gap,
 *                       `gapCells` cells wide whatever the gap's `len`
 *                       (`gapCells` = a number, or an array aligned with
 *                       `gaps` when the resolved config says "len"); letters
 *                       after a box are re-laid from the box's end. The gap
 *                       letters are NEVER emitted — the box carries only its
 *                       index (`data-lcs-gapbox`) and its cell count.
 *       mode 'full'     every letter printed, no box (Face 3, Rule Detective)
 *       mode 'scaffold' the gap ("rule") letters printed in T.coral in their
 *                       own cells, every other cell its own dashed box (Face 5)
 *     `gaps` is an ARRAY: en magic e prints TWO non-adjacent boxes
 *     (c[a]k[e]); every other rule one element.
 *
 *   ruleBox({ chips, models:[{src, word, gaps}], w, h })
 *     The rule banner: `<div class="ws-scene-banner" data-lcs-rulebox>`
 *     (white, 2.5 dashed coral, r 12 — page.css) holding one coral chip per
 *     grapheme (`chips`, e.g. ['tt'] / ['a_e','i_e','o_e','u_e']; Baloo 2 700
 *     white, 20 px, 16 px at ≥ 3 chars) and the MODEL pills (`.ws-bankword`
 *     + `.ws-icon` 36 px + the word in Baloo 2 700 22 T.ink with the rule
 *     letters in a coral span). `models: []` = chips only (d3).
 */
'use strict';
const { svgRoot, roundedRect, label, esc } = require('../../primitives/_svg.js');
const tokens = require('../../primitives/_tokens.js');
const T = tokens.color, F = tokens.font;

const MODES = new Set(['gap', 'full', 'scaffold']);

// Vertical anchor — the G1-305 measurement (Baloo 2 700, real render: ink 0.60·size
// above the central anchor, 0.49·size below): y = h/2 + 0.06·size centres the ink
// inside the cell+14 box with room for every descender.
function letterY(cell, size) { return +((cell + 14) / 2 + 0.06 * size).toFixed(1); }

function letterAt(ch, x, cell, size, color) {
  return label({
    x: +((x + 0.5) * cell).toFixed(2), y: letterY(cell, size), text: ch, size,
    color: color || T.ink, fontFamily: F.display, weight: 700, anchor: 'middle',
    data: { 'data-lcs-letter': x },
  });
}

function gapBox(x, cells, cell, index) {
  return roundedRect({
    x: x * cell + 1, y: 3, w: cells * cell - 2, h: cell + 8, r: 6,
    fill: T.white, strokeColor: T.coral, strokeWidth: 2.5, dash: '6 5',
    data: { 'data-lcs-gapbox': index, 'data-lcs-gapcells': cells },
  });
}

function scaffoldBox(x, cell, index) {
  return roundedRect({
    x: x * cell + 2, y: 3, w: cell - 4, h: cell + 8, r: 5,
    fill: T.white, strokeColor: T.coral, strokeWidth: 2, dash: '5 4',
    data: { 'data-lcs-scaffoldbox': index },
  });
}

/** Cell count of a word under a gap layout (gap = cells per gap: number | array aligned with gaps). */
function cellCount(n, gaps, gapCells) {
  const spent = gaps.reduce((s, g) => s + g.len, 0);
  const boxes = gaps.reduce((s, g, i) => s + (Array.isArray(gapCells) ? gapCells[i] : gapCells), 0);
  return n - spent + boxes;
}

function gapWord({ word, gaps = [], gapCells = 1, cell, fontPx, mode = 'gap' }) {
  const letters = [...String(word)];
  const n = letters.length;
  if (!n) throw new Error('gapWord: empty word');
  if (!(cell > 0)) throw new Error('gapWord: cell must be > 0');
  if (!MODES.has(mode)) throw new Error('gapWord: unknown mode ' + mode);
  const size = fontPx || cell - 2;
  const h = cell + 14;
  const sorted = gaps.slice().sort((a, b) => a.from - b.from);
  sorted.forEach((g, i) => {
    if (!(g.from >= 0 && g.len >= 1 && g.from + g.len <= n)) throw new Error('gapWord: gap {from,len} out of range for "' + word + '"');
    if (i && g.from < sorted[i - 1].from + sorted[i - 1].len) throw new Error('gapWord: overlapping gaps for "' + word + '"');
  });
  const gapAt = new Map(sorted.map((g, i) => [g.from, { ...g, i }]));
  const inGap = new Set();
  for (const g of sorted) for (let k = 0; k < g.len; k++) inGap.add(g.from + k);
  const parts = [];
  let cells;
  if (mode === 'gap') {
    cells = cellCount(n, sorted, gapCells);
    let x = 0;
    for (let i = 0; i < n; i++) {
      const g = gapAt.get(i);
      if (g) {
        const w = Array.isArray(gapCells) ? gapCells[g.i] : gapCells;
        if (!(w >= 1)) throw new Error('gapWord: gapCells must be ≥ 1');
        parts.push(gapBox(x, w, cell, g.i));
        x += w;
        i += g.len - 1;
      } else {
        parts.push(letterAt(letters[i], x, cell, size));
        x++;
      }
    }
  } else if (mode === 'full') {
    cells = n;
    letters.forEach((ch, i) => parts.push(letterAt(ch, i, cell, size)));
  } else {
    cells = n;
    letters.forEach((ch, i) => {
      if (inGap.has(i)) parts.push(letterAt(ch, i, cell, size, T.coral));
      else parts.push(scaffoldBox(i, cell, i));
    });
  }
  const w = cells * cell;
  const aria = mode === 'gap' ? 'word with the rule letters missing' : mode === 'full' ? 'word in letter cells' : 'word with only the rule letters printed';
  return svgRoot({ width: w, height: h, label: aria }, parts,
    { 'data-lcs-cells': cells, 'data-lcs-cell': cell, 'data-lcs-fontpx': size, 'data-lcs-mode': mode, 'data-lcs-prim': 'gap-word' });
}

function chipHtml(text) {
  const size = [...text].length >= 3 ? 16 : 20;
  return `<span data-lcs-chip="${esc(text)}" style="display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;` +
    `width:44px;height:44px;border-radius:999px;background:${T.coral};color:${T.white};` +
    `font-family:${F.display};font-weight:700;font-size:${size}px;line-height:1">${esc(text)}</span>`;
}

function modelHtml(m) {
  const letters = [...String(m.word)];
  const inGap = new Set();
  for (const g of m.gaps || []) for (let k = 0; k < g.len; k++) inGap.add(g.from + k);
  const spelled = letters.map((ch, i) => inGap.has(i)
    ? `<span data-lcs-rule-letter="${i}" style="color:${T.coral}">${esc(ch)}</span>` : esc(ch)).join('');
  const gapStamp = (m.gaps || []).map((g) => g.from + ':' + g.len).join(',');
  return `<span class="ws-bankword" data-lcs-model="${esc(m.word)}" data-lcs-model-gaps="${esc(gapStamp)}" ` +
    `style="padding:2px 12px 2px 8px;gap:8px;font-family:${F.display};font-weight:700;font-size:22px;color:${T.ink};line-height:1.1">` +
    `<img class="ws-icon" src="${m.src}" alt="" style="width:36px;height:36px"><span>${spelled}</span></span>`;
}

function ruleBox({ chips = [], models = [], w = 675, h = 60 }) {
  if (!chips.length) throw new Error('ruleBox: at least one chip');
  const chipRow = `<span data-lcs-chips style="display:inline-flex;gap:8px;align-items:center;flex:0 0 auto">${chips.map(chipHtml).join('')}</span>`;
  const pills = models.map(modelHtml).join('');
  return `<div class="ws-scene-banner" data-lcs-rulebox data-lcs-models="${models.length}" ` +
    `style="width:${w}px;min-height:${h}px;margin:0;padding:4px 10px;gap:18px;flex:0 0 auto">${chipRow}${pills}</div>`;
}

module.exports = { gapWord, ruleBox };
