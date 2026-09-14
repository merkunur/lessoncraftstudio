/**
 * components-b3/ordinal-numbers.js — the K-320 `ordinal-numbers` family
 * components (design: docs/worksheet-gen/b3-designs/K-320-ordinal-numbers.md §2).
 * Merged into the templates/components-b3.js namespace; every drawing is inline
 * SVG on the token palette; ground truth rides on data-lcs-* attributes; a tile
 * never carries a word, a numeral or an `alt` (the answer is never printed).
 *
 * Exports (the NEW names the design file lists, plus two the base needs today):
 *   lineUpPanel({strip, below, minH})     the `.ws-lane` wrapper: inline
 *       `padding:10px 12px` (inner 647), flex column, space-between, stamped
 *       [data-ws-content]; the slack of a taller row opens BETWEEN strip and
 *       chip row, never inside the tiles.
 *   lineUpStrip({theme, items, tile, pic, gap, start, flagScale, under, given})
 *       the line-up: arrow row + N white picture tiles + a mark band. Same
 *       option contract as G1-308's `pictureStrip` ({theme, items, tile=76,
 *       pic=64, gap=5, arrow=true, band=true}) plus K-320's three ADDITIVE
 *       options, defaults byte-identical: `start:'left'|'right'` (mirrors the
 *       arrow row only), `flagScale:1|1.5`, `under:'band'|'box'|'none'`.
 *       NAMED lineUpStrip, not pictureStrip: G1-308 owns `pictureStrip` and is
 *       absent from the tree today; a same-name export from two family files
 *       makes the namespace THROW for every b3 family (recorded deviation,
 *       _work/K-320-build.md). Fold into one when G1-308 lands.
 *   ordinalChip({k, notation, px=30, icon, h=44})   `.ws-pill` h 44, notation
 *       Baloo 2 700 px teal + a 32 px markIcon; data-lcs-chip/-ordinal/-action/
 *       -target/-notation are stamped by the caller (the spec owns the answer).
 *   markIcon({kind})   32x32: a grey mini tile with the mark ON it — circle =
 *       teal ring, cross = coral X, tick = teal check UNDER the tile, colour =
 *       coral fill. The icon shows WHERE the pencil goes; that is the legend.
 *   blankNumeralBox({w, h, answer})   the OPEN numeral box every b3 face uses
 *       (README ruling): `.ws-blankbox` (white, dashed CORAL 2.5, r 10) with
 *       data-lcs-answer = the hidden ground truth; never answerBox without an
 *       answer (its dashes are `grid` and it stamps "undefined").
 *   wordChipRow({words:[{k,text}], px=22, gap=8})   F2's bank row of `.ws-achip`
 *       h 44, padding 0 12, data-lcs-word-k; stamped data-lcs-bank.
 *   queryCell({src, noun, k, pic=56, notation})   F3's [clone][arrow][box] = 180
 *   finishLine({h})   F5's 16 px two-column chequer (teal / white, 8 px squares)
 *   raceLane({src, noun, x, laneW=543, pic=64})   F5's dashed trail + runner
 * The F2/F3/F5 components are exported so the faces (Phase 2) add only a
 * `layout` knob; the base renders none of them.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, circle, line, el, esc } = require('../../primitives/_svg.js');
const { fileUri } = require('../../image-cache/resolve.js');

const T = tokens.color;
const F = tokens.font;

const ARROW_H = 24;   // the arrow row at flagScale 1.5: a 21 px pole needs 24 (design said 20 — measured deviation)
const BAND_H = 22;

/* ------------------------------------------------------------------ arrow */
/**
 * The start flag + direction rule. Pole 2 px ink, pennant coral (10x8 at scale 1,
 * 15x12 at 1.5), rule 2/3 px ink with a solid 8/12 px head. `start:'right'`
 * mirrors the whole drawing, so direction survives a mono print by SHAPE.
 */
function startArrow({ w, start = 'left', flagScale = 1 }) {
  const s = flagScale;
  const H = s > 1 ? ARROW_H : 16;
  const poleW = 2, ruleW = s > 1 ? 3 : 2, head = s > 1 ? 12 : 8;
  const pw = Math.round(10 * s), ph = Math.round(8 * s);
  const poleX = 3, top = 2, bottom = H - 2;
  const ruleY = H - 7;
  const parts = [
    line({ x1: poleX, y1: top, x2: poleX, y2: bottom, strokeColor: T.ink, strokeWidth: poleW, cap: 'round' }),
    el('polygon', { points: `${poleX + 1},${top} ${poleX + 1 + pw},${top + ph / 2} ${poleX + 1},${top + ph}`, fill: T.coral, 'data-lcs-flag': 1 }),
    line({ x1: poleX + 4, y1: ruleY, x2: w - head - 2, y2: ruleY, strokeColor: T.ink, strokeWidth: ruleW, cap: 'round' }),
    el('polygon', { points: `${w - head - 2},${ruleY - head / 2} ${w - 2},${ruleY} ${w - head - 2},${ruleY + head / 2}`, fill: T.ink }),
  ];
  const g = start === 'right'
    ? el('g', { transform: `translate(${w} 0) scale(-1 1)` }, parts.join(''))
    : parts.join('');
  return svgRoot({ width: w, height: H, label: '' }, g, { 'aria-hidden': 'true', 'data-lcs-arrow': start });
}

/* ------------------------------------------------------------------ strip */
function pictureTile({ theme, item, tile, pic, idx }) {
  return `<span data-lcs-idx="${idx}" data-lcs-noun="${esc(item.noun)}" ` +
    `style="display:inline-flex;align-items:center;justify-content:center;width:${tile}px;height:${tile}px;` +
    `background:${T.white};border:2px solid ${T.creamDeep};border-radius:10px;flex:0 0 ${tile}px">` +
    `<img class="ws-icon" src="${fileUri(theme, item.noun)}" style="width:${pic}px;height:${pic}px"></span>`;
}

function lineUpStrip({ theme, items, tile = 76, pic = 64, gap = 5, arrow = true, band = true, start = 'left', flagScale = 1, under = 'band', given = null }) {
  const n = items.length;
  const w = n * tile + (n - 1) * gap;
  const rows = [];
  if (arrow) rows.push(startArrow({ w, start, flagScale }));
  rows.push(`<div style="display:flex;gap:${gap}px;width:${w}px">` +
    items.map((it, i) => pictureTile({ theme, item: it, tile, pic, idx: i })).join('') + `</div>`);
  const mode = band === false ? 'none' : under;
  if (mode === 'band') {
    const dots = items.map((_, i) => circle({ cx: i * (tile + gap) + tile / 2, cy: BAND_H / 2, r: 4, fill: T.inkSoft })).join('');
    rows.push(svgRoot({ width: w, height: BAND_H, label: '' }, dots, { 'aria-hidden': 'true', 'data-lcs-band': n }));
  } else if (mode === 'box') {
    // F1: one numeral cell under every tile — a GIVEN literal (solid white, ink) or an open blankNumeralBox
    const cells = items.map((_, i) => {
      const g = given && given[i];
      return g != null
        ? `<span data-lcs-given="${esc(g)}" style="display:inline-flex;align-items:center;justify-content:center;width:${tile - 8}px;height:44px;` +
          `background:${T.white};border:2px solid ${T.creamDeep};border-radius:10px;font-family:${F.display},cursive;font-weight:700;font-size:26px;color:${T.ink}">${esc(g)}</span>`
        : blankNumeralBox({ w: tile - 8, h: 44, answer: '' });
    });
    rows.push(`<div style="display:flex;gap:${gap + 8}px;width:${w}px;justify-content:space-between">${cells.join('')}</div>`);
  }
  return { html: `<div data-lcs-lineup style="display:flex;flex-direction:column;align-items:flex-start;gap:4px;width:${w}px">${rows.join('')}</div>`, width: w, height: (arrow ? (flagScale > 1 ? ARROW_H : 16) + 4 : 0) + tile + (mode === 'band' ? 4 + BAND_H : mode === 'box' ? 4 + 44 : 0) };
}

/* ------------------------------------------------------------------ panel */
function lineUpPanel({ strip, below, minH, attrs = '' }) {
  return `<div class="ws-lane" data-ws-content ${attrs} style="padding:10px 12px;display:flex;flex-direction:column;justify-content:space-between;align-items:center;min-height:${minH}px;min-width:0">` +
    strip + below + `</div>`;
}

/* ------------------------------------------------------------------ chip */
function markIcon({ kind }) {
  const S = 32, mini = 18, sw = 3;
  const parts = [];
  const tileY = kind === 'tick' ? 1 : 7;
  const tx = (S - mini) / 2;
  parts.push(el('rect', { x: tx, y: tileY, width: mini, height: mini, rx: 4, ry: 4, fill: kind === 'colour' ? T.coral : T.white, stroke: T.grid, 'stroke-width': 2 }));
  const cx = S / 2, cy = tileY + mini / 2;
  if (kind === 'circle') parts.push(circle({ cx, cy, r: 13, strokeColor: T.teal, strokeWidth: sw }));
  else if (kind === 'cross') {
    parts.push(line({ x1: cx - 10, y1: cy - 10, x2: cx + 10, y2: cy + 10, strokeColor: T.coral, strokeWidth: sw }));
    parts.push(line({ x1: cx + 10, y1: cy - 10, x2: cx - 10, y2: cy + 10, strokeColor: T.coral, strokeWidth: sw }));
  } else if (kind === 'tick') {
    parts.push(el('polyline', { points: `${cx - 8},${25} ${cx - 2},${30} ${cx + 9},${21}`, fill: 'none', stroke: T.teal, 'stroke-width': sw, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
  } else if (kind !== 'colour') throw new Error('markIcon: unknown kind ' + kind);
  return svgRoot({ width: S, height: S, label: '' }, parts.join(''), { 'aria-hidden': 'true', 'data-lcs-mark': kind });
}

function ordinalChip({ k, notation, px = 30, icon, h = 44, attrs = '' }) {
  return `<span class="ws-pill" ${attrs} style="height:${h}px;padding:0 14px;gap:8px">` +
    `<span style="font-family:${F.display},cursive;font-weight:700;font-size:${px}px;line-height:1;color:${T.teal}" data-lcs-chip-text>${esc(notation)}</span>` +
    markIcon({ kind: icon }) + `</span>`;
}

/* ------------------------------------------------------------------ open box */
function blankNumeralBox({ w = 68, h = 44, answer = '', attrs = '' }) {
  return `<span class="ws-blankbox" ${attrs} data-lcs-answer="${esc(answer)}" style="width:${w}px;height:${h}px;flex:0 0 ${w}px"></span>`;
}

/* ------------------------------------------------------------------ faces (Phase 2 consumers) */
function wordChipRow({ words, px = 22, gap = 8 }) {
  return `<div class="ws-achips" data-lcs-bank style="gap:${gap}px;padding-top:0;flex-wrap:nowrap">` +
    words.map((w) => `<span class="ws-achip" data-lcs-word-k="${w.k}" style="height:44px;padding:0 12px;font-size:${px}px">${esc(w.text)}</span>`).join('') +
    `</div>`;
}

function queryCell({ src, noun, k, pic = 56, answer = '' }) {
  const box = pic + 12;
  const arrow = svgRoot({ width: 24, height: 24, label: '' },
    line({ x1: 2, y1: 12, x2: 14, y2: 12, strokeColor: T.ink, strokeWidth: 3 }) +
    el('polygon', { points: '13,5 22,12 13,19', fill: T.ink }), { 'aria-hidden': 'true' });
  return `<span data-lcs-query data-lcs-noun="${esc(noun)}" style="display:inline-flex;align-items:center;gap:12px;width:180px">` +
    `<span style="display:inline-flex;align-items:center;justify-content:center;width:${box}px;height:${box}px;background:${T.white};border:2px solid ${T.creamDeep};border-radius:10px">` +
    `<img class="ws-icon" src="${src}" style="width:${pic}px;height:${pic}px"></span>${arrow}` +
    blankNumeralBox({ w: 72, h: 44, answer }) + `</span>`;
}

function finishLine({ h }) {
  const sq = 8, cols = 2, rows = Math.ceil(h / sq);
  const cells = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push(el('rect', { x: c * sq, y: r * sq, width: sq, height: sq, fill: (r + c) % 2 ? T.white : T.teal }));
  return svgRoot({ width: sq * cols, height: h, label: '' }, cells.join(''), { 'aria-hidden': 'true', 'data-lcs-finish': 1 });
}

function raceLane({ src, noun, x, laneW = 543, pic = 64, h = 84 }) {
  const trail = line({ x1: 6, y1: h / 2, x2: x, y2: h / 2, strokeColor: T.inkSoft, strokeWidth: 3, dash: '6 6' });
  return `<span data-lcs-runner data-lcs-noun="${esc(noun)}" data-lcs-x="${x}" style="position:relative;display:inline-block;width:${laneW}px;height:${h}px">` +
    svgRoot({ width: laneW, height: h, label: '' }, trail, { 'aria-hidden': 'true', style: 'position:absolute;left:0;top:0' }) +
    `<img class="ws-icon" src="${src}" style="position:absolute;left:${x}px;top:${(h - pic) / 2}px;width:${pic}px;height:${pic}px"></span>`;
}

module.exports = { lineUpPanel, lineUpStrip, ordinalChip, markIcon, blankNumeralBox, wordChipRow, queryCell, finishLine, raceLane };
