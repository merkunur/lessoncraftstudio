/**
 * components-b3/hundreds-chart-puzzles.js — the G1-310 `hundreds-chart-puzzles`
 * family components (design: docs/worksheet-gen/b3-designs/
 * G1-310-hundreds-chart-puzzles.md §2 "NEW in templates/components-b3.js").
 * HTML + inline SVG on the token palette; nothing on the apparatus is a word.
 *
 * Exports (exactly the names the design file lists):
 *   arrowGlyph({dir:'U'|'D'|'L'|'R', size=36, label?, stamp=true})   a white chip
 *       r 10, border 2 creamDeep, a teal 4 px SVG chevron (never a font glyph),
 *       an optional coral Baloo 2 700 16 label (`−10 +10 −1 +1`, U+2212) and
 *       `data-lcs-move` (stamp:false for the compass, which carries no data-lcs-*).
 *   jumpChain({start, moves, step=1, answer?, showSteps=false, pointer=true,
 *       chip=36, gap=8})   the F2 row `[given 64x52][gap][chips][gap][coral
 *       pointer 20][gap][open box 64x52]`; showSteps:true adds an open box after
 *       every move. The open boxes are blankNumeralBox (K-320's, via the
 *       components-b3 namespace at CALL time — a top-level require would be
 *       circular while the namespace merges). Root `data-lcs-chain data-lcs-start
 *       data-lcs-moves data-lcs-step data-lcs-answer`. The face computes the
 *       landing under the column rule and passes `answer`; without it the chain
 *       folds the moves arithmetically (U −10, D +10, L −1, R +1, × step).
 *   chartCompass({width=675, height=46, chip=32, px=22, step=1})   the d1 legend strip:
 *       four groups `[arrowGlyph][coral label]` (U −10 · D +10 · L −1 · R +1, × step:
 *       the `tens` unit reads −100 +100 −10 +10), centred, `aria-hidden`, class
 *       `ws-chart-compass`, NO data-lcs-* (a legend is not an answer).
 *
 * Phase-2 face cards (2026-09-14; design §3):
 *   chartGiven(v, w=64, h=52)   the tealSoft given cell every face row starts with
 *       (`data-lcs-given`, Baloo 2 700 26 ink).
 *   chartRiddle({clues:[{start, move}, {start, move}], answer, step=1, chip=36,
 *       box={w:84, h:56}, gap=8})   F3: two clue rows `[given][arrowGlyph][coral
 *       pointer]` stacked (gap 6) converging on ONE open box at the right. Root
 *       `data-lcs-riddle data-lcs-answer`; each row `data-lcs-clue data-lcs-start`
 *       (the chip carries `data-lcs-move`). The component draws what the composer
 *       asks — agreement of the two clues is the SPEC's verify (a gate injects a
 *       disagreeing pair as a poison). 228 × 110 at the defaults.
 *   chartDistance({a, b, down, right, chip=36, box=44, gap=8})   F5: row 1
 *       `[given A][coral chevron 24][given B]`, row 2 `[arrowGlyph D][open box]
 *       [16][arrowGlyph R][open box]` — the boxes carry the two COUNTERS
 *       (`data-lcs-counter="down"|"right"` + `data-lcs-answer`). Root
 *       `data-lcs-dist data-lcs-a data-lcs-b`. 192 × 104 at the defaults.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, el } = require('../../primitives/_svg.js');

const T = tokens.color;
const F = tokens.font;
const MINUS = '−';
const MOVE_DELTA = { U: -10, D: 10, L: -1, R: 1 };
const MOVE_LABEL = { U: MINUS + '10', D: '+10', L: MINUS + '1', R: '+1' };

function chevron(dir, size) {
  const s = size, m = s / 2, a = Math.round(s * 0.24);
  const pts = {
    U: `${m - a},${m + a * 0.6} ${m},${m - a * 0.6} ${m + a},${m + a * 0.6}`,
    D: `${m - a},${m - a * 0.6} ${m},${m + a * 0.6} ${m + a},${m - a * 0.6}`,
    L: `${m + a * 0.6},${m - a} ${m - a * 0.6},${m} ${m + a * 0.6},${m + a}`,
    R: `${m - a * 0.6},${m - a} ${m + a * 0.6},${m} ${m - a * 0.6},${m + a}`,
  }[dir];
  if (!pts) throw new Error('arrowGlyph: dir must be U|D|L|R, got ' + dir);
  return svgRoot({ width: s, height: s, label: '' },
    el('polyline', { points: pts, fill: 'none', stroke: T.teal, 'stroke-width': tokens.stroke.accent, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    { 'aria-hidden': 'true' });
}

function arrowGlyph({ dir, size = 36, label = null, stamp = true }) {
  const inner = size - 4;   // border 2 each side
  const chip = `<span style="display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;flex:0 0 ${size}px;` +
    `background:${T.white};border:2px solid ${T.creamDeep};border-radius:10px;box-sizing:border-box">${chevron(dir, inner)}</span>`;
  const lab = label ? `<span style="font-family:${F.display},cursive;font-weight:700;font-size:16px;line-height:1;color:${T.coral}">${label}</span>` : '';
  const attrs = stamp ? ` data-lcs-move="${dir}"` : '';
  return `<span${attrs} style="display:inline-flex;flex-direction:column;align-items:center;gap:2px">${chip}${lab}</span>`;
}

function givenCell(v, w = 64, h = 52) {
  return `<span data-lcs-given="${v}" style="display:inline-flex;align-items:center;justify-content:center;width:${w}px;height:${h}px;flex:0 0 ${w}px;` +
    `background:${T.tealSoft};border:2px solid ${T.teal};border-radius:10px;font-family:${F.display},cursive;font-weight:700;font-size:26px;color:${T.ink};box-sizing:border-box">${v}</span>`;
}

function coralPointer(w = 20, h = 20) {
  return svgRoot({ width: w, height: h, label: '' },
    el('polygon', { points: `2,${h / 2 - 7} ${w - 2},${h / 2} 2,${h / 2 + 7}`, fill: T.coral }), { 'aria-hidden': 'true' });
}

function jumpChain({ start, moves, step = 1, answer = null, showSteps = false, pointer = true, chip = 36, gap = 8 }) {
  const { blankNumeralBox } = require('../components-b3.js');   // call-time: the namespace is complete by then
  if (!Array.isArray(moves) || !moves.length) throw new Error('jumpChain: moves must be a non-empty array');
  for (const m of moves) if (!(m in MOVE_DELTA)) throw new Error('jumpChain: move must be U|D|L|R, got ' + m);
  let v = start;
  const parts = [givenCell(start)];
  for (const m of moves) {
    v += MOVE_DELTA[m] * step;
    parts.push(arrowGlyph({ dir: m, size: chip }));
    if (showSteps) parts.push(blankNumeralBox({ w: 64, h: 52, answer: v }));
  }
  const landing = answer == null ? v : answer;
  if (pointer) parts.push(coralPointer());
  if (!showSteps) parts.push(blankNumeralBox({ w: 64, h: 52, answer: landing }));
  return `<span data-lcs-chain data-lcs-start="${start}" data-lcs-moves="${moves.join('')}" data-lcs-step="${step}" data-lcs-answer="${landing}" ` +
    `style="display:inline-flex;align-items:center;gap:${gap}px">${parts.join('')}</span>`;
}

function chartCompass({ width = 675, height = 46, chip = 32, px = 22, step = 1 } = {}) {
  if (!(Number.isInteger(step) && step >= 1)) throw new Error('chartCompass: step must be a positive integer');
  const lab = (d) => step === 1 ? MOVE_LABEL[d] : (MOVE_DELTA[d] < 0 ? MINUS : '+') + Math.abs(MOVE_DELTA[d] * step);
  const groups = ['U', 'D', 'L', 'R'].map((d) =>
    `<span style="display:inline-flex;align-items:center;gap:8px">${arrowGlyph({ dir: d, size: chip, stamp: false })}` +
    `<span style="font-family:${F.display},cursive;font-weight:700;font-size:${px}px;line-height:1;color:${T.coral}">${lab(d)}</span></span>`).join('');
  return `<div class="ws-chart-compass" aria-hidden="true" style="display:flex;align-items:center;justify-content:center;gap:34px;width:${width}px;height:${height}px;flex:0 0 ${height}px">${groups}</div>`;
}

/* ------------------------------------------------------------------ Phase-2 face cards */
function chartRiddle({ clues, answer, step = 1, chip = 36, box = { w: 84, h: 56 }, gap = 8 }) {
  const { blankNumeralBox } = require('../components-b3.js');
  if (!Array.isArray(clues) || clues.length !== 2) throw new Error('chartRiddle: exactly two clues');
  for (const c of clues) { if (!(c.move in MOVE_DELTA)) throw new Error('chartRiddle: move must be U|D|L|R'); if (!Number.isInteger(c.start)) throw new Error('chartRiddle: start must be an integer'); }
  if (!Number.isInteger(answer)) throw new Error('chartRiddle: answer must be an integer');
  const rows = clues.map((c) => `<span data-lcs-clue data-lcs-start="${c.start}" style="display:inline-flex;align-items:center;gap:${gap}px">` +
    givenCell(c.start) + arrowGlyph({ dir: c.move, size: chip }) + coralPointer() + '</span>').join('');
  return `<span data-lcs-riddle data-lcs-answer="${answer}" data-lcs-step="${step}" style="display:inline-flex;align-items:center;gap:${gap}px">` +
    `<span style="display:inline-flex;flex-direction:column;gap:6px">${rows}</span>` +
    blankNumeralBox({ w: box.w, h: box.h, answer }) + '</span>';
}

function chartDistance({ a, b, down, right, chip = 36, box = 44, gap = 8 }) {
  const { blankNumeralBox } = require('../components-b3.js');
  for (const [k, v] of [['a', a], ['b', b], ['down', down], ['right', right]]) if (!Number.isInteger(v)) throw new Error('chartDistance: ' + k + ' must be an integer');
  const row1 = `<span style="display:inline-flex;align-items:center;gap:${gap}px">${givenCell(a)}${coralPointer(24, 24)}${givenCell(b)}</span>`;
  const row2 = `<span style="display:inline-flex;align-items:center;gap:${gap}px">` +
    arrowGlyph({ dir: 'D', size: chip }) + blankNumeralBox({ w: box, h: box, answer: down, attrs: 'data-lcs-counter="down"' }) +
    `<span style="display:inline-block;width:${16 - gap}px;flex:0 0 ${16 - gap}px"></span>` +
    arrowGlyph({ dir: 'R', size: chip }) + blankNumeralBox({ w: box, h: box, answer: right, attrs: 'data-lcs-counter="right"' }) + '</span>';
  return `<span data-lcs-dist data-lcs-a="${a}" data-lcs-b="${b}" style="display:inline-flex;flex-direction:column;align-items:center;gap:8px">${row1}${row2}</span>`;
}

module.exports = { arrowGlyph, jumpChain, chartCompass, chartGiven: givenCell, chartRiddle, chartDistance };
