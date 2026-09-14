/**
 * components-b3/read-and-do.js — the G1-308 `read-and-do` family components
 * (design: docs/worksheet-gen/b3-designs/G1-308-read-and-do.md §2). Merged into
 * the templates/components-b3.js namespace; token palette only; ground truth
 * rides on data-lcs-* attributes; no answer is ever printed.
 *
 * NOT defined here (the namespace refuses a duplicate export name):
 *   pictureStrip  — the design's strip IS K-320's `lineUpStrip` (same option
 *                   contract {theme, items, tile=76, pic=64, gap=5, arrow=true,
 *                   band=true}; K-320 shipped it first under that name). The
 *                   spec aliases `const pictureStrip = C3.lineUpStrip`.
 *   lineUpPanel / blankNumeralBox / markIcon — K-320's, required where needed.
 *
 * Exports (the NEW names the design file lists):
 *   instructionList({rows, rowMin=86, rowGap=8, fontPx=18, doneBox=true,
 *                    answerW=56, answerH=44})
 *       the numbered list: a flex-grown grid `repeat(N, minmax(rowMin, 1fr))`
 *       (the chrome slack opens in the rows, never in the strip). Each row is a
 *       white card, r 12, border 2 creamDeep, columns
 *       [badge 30][10][text 1fr][10][answer 56 — write rows only][10][done 28],
 *       padding 0 8. Badge = teal circle, Baloo 2 700 16 white, the row number.
 *       Text = Nunito 800 fontPx / 1.35, `data-lcs-text` = the sentence verbatim
 *       (the gate re-fills it from the bank). A `write` row appends
 *       `answerBox({w:56, h:44, answer})` (components.js — an answer IS stamped,
 *       so it is not the open-box case the README rules on). Done box = the
 *       `.ws-blankbox` idiom 28×28 (dashed coral), carries nothing.
 *       Row stamps: data-lcs-row data-lcs-action data-lcs-cue data-lcs-noun
 *       data-lcs-noun2 data-lcs-targets data-lcs-text (+ data-lcs-k for ordinal).
 *   truthChips({yes, no, px=20})   two `.ws-pill` h 44 (Baloo 2 700 px,
 *       padding 6 18), `data-lcs-truth-chip="yes|no"`, fixed order yes | no, no
 *       glyph — F4 (Phase 2) circles one.
 *   drawBox({w=300, h=140})   white, dashed coral 2.5, r 12, `data-lcs-drawbox`,
 *       empty — F5 (Phase 2).
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { esc } = require('../../primitives/_svg.js');
const { answerBox } = require('../components.js');

const T = tokens.color;
const F = tokens.font;

function badge(n) {
  return `<span data-lcs-badge style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;` +
    `background:${T.teal};color:${T.white};font-family:${F.display},cursive;font-weight:700;font-size:16px;line-height:1;flex:0 0 30px">${n}</span>`;
}

function instructionRow(r, { fontPx, doneBox, answerW, answerH }) {
  const isWrite = r.action === 'write';
  const cols = ['30px', '1fr'];
  if (isWrite) cols.push(answerW + 'px');
  if (doneBox) cols.push('28px');
  const attrs = [
    'data-lcs-row',
    `data-lcs-n="${r.n}"`,
    `data-lcs-action="${esc(r.action)}"`,
    `data-lcs-cue="${esc(r.cue)}"`,
    `data-lcs-noun="${esc(r.noun || '')}"`,
    `data-lcs-noun2="${esc(r.noun2 || '')}"`,
    `data-lcs-targets="${esc((r.targets || []).join(','))}"`,
    `data-lcs-text="${esc(r.text)}"`,
  ];
  if (r.k != null) attrs.push(`data-lcs-k="${r.k}"`);
  const cells = [
    badge(r.n),
    `<p data-lcs-textnode style="margin:0;min-width:0;font-family:${F.body},sans-serif;font-weight:800;font-size:${fontPx}px;line-height:1.35;color:${T.ink}">${esc(r.text)}</p>`,
  ];
  if (isWrite) cells.push(answerBox({ w: answerW, h: answerH, answer: r.answer }));
  if (doneBox) cells.push(`<span class="ws-blankbox" data-lcs-done style="width:28px;height:28px;flex:0 0 28px"></span>`);
  return `<div ${attrs.join(' ')} style="display:grid;grid-template-columns:${cols.join(' ')};column-gap:10px;align-items:center;` +
    `padding:0 8px;background:${T.white};border:2px solid ${T.creamDeep};border-radius:12px;min-height:0;min-width:0">${cells.join('')}</div>`;
}

function instructionList({ rows, rowMin = 86, rowGap = 8, fontPx = 18, doneBox = true, answerW = 56, answerH = 44 }) {
  const n = rows.length;
  return `<div data-lcs-list data-lcs-rows="${n}" style="flex:1 1 auto;display:grid;grid-template-rows:repeat(${n},minmax(${rowMin}px,1fr));gap:${rowGap}px;min-height:0">` +
    rows.map((r) => instructionRow(r, { fontPx, doneBox, answerW, answerH })).join('') + `</div>`;
}

function truthChips({ yes, no, px = 20 }) {
  const chip = (k, text) => `<span class="ws-pill" data-lcs-truth-chip="${k}" style="height:44px;padding:6px 18px;font-size:${px}px;line-height:1">${esc(text)}</span>`;
  return `<span data-lcs-truth-chips style="display:inline-flex;gap:10px;align-items:center">${chip('yes', yes)}${chip('no', no)}</span>`;
}

function drawBox({ w = 300, h = 140 }) {
  return `<span data-lcs-drawbox style="display:block;width:${w}px;height:${h}px;background:${T.white};border:2.5px dashed ${T.coral};border-radius:12px"></span>`;
}

module.exports = { instructionList, truthChips, drawBox };
