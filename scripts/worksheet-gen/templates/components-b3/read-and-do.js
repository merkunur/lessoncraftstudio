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
 *                    answerW=56, answerH=44, chipsW=250})
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
 *       ADDITIVE (Phase 2, byte-identical when absent):
 *         r.steps = [step, step]   (F2 two-step) — each step {action, cue, noun,
 *           noun2, targets, k?} is stamped on a zero-size `<span data-lcs-step="i">`
 *           inside the row (display:none); the row's own action/cue/noun stamps
 *           are the caller's ('two-step'); a `write` STEP puts the answer box on
 *           the row (r.answer = that step's count).
 *         r.truth = {yes, no}       (F4) — the row ends in truthChips instead of
 *           the done box: columns [badge 30][10][statement 1fr][10][chips chipsW].
 *         r.attrs = 'data-lcs-…'    extra attributes appended to the row.
 *   truthChips({yes, no, px=20})   two `.ws-pill` h 44 (Baloo 2 700 px,
 *       padding 6 18), `data-lcs-truth-chip="yes|no"`, fixed order yes | no, no
 *       glyph — F4 circles one.
 *   drawBox({w=300, h=140})   white, dashed coral 2.5, r 12, `data-lcs-drawbox`,
 *       empty — F5; ALSO consumed by G2-318 + K-322 (output frozen).
 *   drawCards({cards:[{n, text, noun, nval, frame?}], cols=2, rows=3, drawW=300,
 *              drawH=140, fontPx=18})   F5's `cardGrid` of sentence + drawBox
 *       cards: the sentence (Nunito 800 fontPx / 1.35, margin-left 22 to clear
 *       the card badge, `data-lcs-textnode`) over an empty draw box (drawBox's
 *       look; drawW wide, drawH the FLOOR — it flexes taller under a shorter
 *       chrome); card stamps
 *       data-lcs-drawcard data-lcs-n data-lcs-noun data-lcs-nval (data-lcs-frame)
 *       data-lcs-text.
 *       No picture anywhere (a picture removes the reading).
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { esc } = require('../../primitives/_svg.js');
const { answerBox } = require('../components.js');
const { cardGrid } = require('../layouts/card-grid.js');

const T = tokens.color;
const F = tokens.font;

function badge(n) {
  return `<span data-lcs-badge style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;` +
    `background:${T.teal};color:${T.white};font-family:${F.display},cursive;font-weight:700;font-size:16px;line-height:1;flex:0 0 30px">${n}</span>`;
}

function stepStamp(s, i) {
  const a = [
    `data-lcs-step="${i}"`,
    `data-lcs-action="${esc(s.action)}"`,
    `data-lcs-cue="${esc(s.cue)}"`,
    `data-lcs-noun="${esc(s.noun || '')}"`,
    `data-lcs-noun2="${esc(s.noun2 || '')}"`,
    `data-lcs-targets="${esc((s.targets || []).join(','))}"`,
  ];
  if (s.k != null) a.push(`data-lcs-k="${s.k}"`);
  return `<span ${a.join(' ')} style="display:none"></span>`;
}

function instructionRow(r, { fontPx, doneBox, answerW, answerH, chipsW }) {
  const steps = Array.isArray(r.steps) ? r.steps : null;
  const writeStep = steps ? steps.find((s) => s.action === 'write') : null;
  const isWrite = r.action === 'write' || !!writeStep;
  const truth = r.truth || null;
  const cols = ['30px', '1fr'];
  if (isWrite) cols.push(answerW + 'px');
  if (truth) cols.push(chipsW + 'px');
  else if (doneBox) cols.push('28px');
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
  if (r.attrs) attrs.push(r.attrs);
  const cells = [
    badge(r.n),
    `<p data-lcs-textnode style="margin:0;min-width:0;font-family:${F.body},sans-serif;font-weight:800;font-size:${fontPx}px;line-height:1.35;color:${T.ink}">${esc(r.text)}</p>`,
  ];
  if (isWrite) cells.push(answerBox({ w: answerW, h: answerH, answer: writeStep ? writeStep.answer : r.answer }));
  if (truth) cells.push(truthChips({ yes: truth.yes, no: truth.no }));
  else if (doneBox) cells.push(`<span class="ws-blankbox" data-lcs-done style="width:28px;height:28px;flex:0 0 28px"></span>`);
  if (steps) cells.push(steps.map((s, i) => stepStamp(s, i + 1)).join(''));
  return `<div ${attrs.join(' ')} style="display:grid;grid-template-columns:${cols.join(' ')};column-gap:10px;align-items:center;` +
    `padding:0 8px;background:${T.white};border:2px solid ${T.creamDeep};border-radius:12px;min-height:0;min-width:0">${cells.join('')}</div>`;
}

function instructionList({ rows, rowMin = 86, rowGap = 8, fontPx = 18, doneBox = true, answerW = 56, answerH = 44, chipsW = 250 }) {
  const n = rows.length;
  return `<div data-lcs-list data-lcs-rows="${n}" style="flex:1 1 auto;display:grid;grid-template-rows:repeat(${n},minmax(${rowMin}px,1fr));gap:${rowGap}px;min-height:0">` +
    rows.map((r) => instructionRow(r, { fontPx, doneBox, answerW, answerH, chipsW })).join('') + `</div>`;
}

function truthChips({ yes, no, px = 20 }) {
  const chip = (k, text) => `<span class="ws-pill" data-lcs-truth-chip="${k}" style="height:44px;padding:6px 18px;font-size:${px}px;line-height:1">${esc(text)}</span>`;
  return `<span data-lcs-truth-chips style="display:inline-flex;gap:10px;align-items:center">${chip('yes', yes)}${chip('no', no)}</span>`;
}

function drawBox({ w = 300, h = 140 }) {
  return `<span data-lcs-drawbox style="display:block;width:${w}px;height:${h}px;background:${T.white};border:2.5px dashed ${T.coral};border-radius:12px"></span>`;
}

function drawCards({ cards, cols = 2, rows = 3, drawW = 300, drawH = 140, fontPx = 18 }) {
  const inner = cards.map((c) =>
    `<div data-lcs-drawcard data-lcs-n="${c.n}" data-lcs-noun="${esc(c.noun)}" data-lcs-nval="${c.nval}"${c.frame != null ? ` data-lcs-frame="${c.frame}"` : ''} data-lcs-text="${esc(c.text)}" ` +
      `style="display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start;flex:1 1 auto;min-height:0;min-width:0">` +
      `<p data-lcs-textnode style="margin:0 0 8px 22px;min-width:0;font-family:${F.body},sans-serif;font-weight:800;font-size:${fontPx}px;line-height:1.35;color:${T.ink}">${esc(c.text)}</p>` +
      // the same box as drawBox (white, dashed coral 2.5, r 12) but FLEXING: drawH is its floor, a taller chrome opens it further
      `<span data-lcs-drawbox style="display:block;width:${drawW}px;flex:1 1 ${drawH}px;min-height:${drawH}px;background:${T.white};border:2.5px dashed ${T.coral};border-radius:12px"></span>` +
    `</div>`);
  return cardGrid({ cards: inner, cols, rows });
}

module.exports = { instructionList, truthChips, drawBox, drawCards };
