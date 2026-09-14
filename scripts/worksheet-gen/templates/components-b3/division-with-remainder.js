/**
 * components-b3/division-with-remainder.js — the G3-377 `division-with-remainder`
 * family components (design: docs/worksheet-gen/b3-designs/
 * G3-377-division-with-remainder.md §2 "NEW in templates/components-b3.js").
 * HTML + inline SVG on the token palette; the apparatus carries numerals, ONE
 * operator glyph and ONE remainder word — never a noun, never an answer.
 *
 * Every division / multiplication sign that reaches the page is resolved
 * through types/_shared/notation.js (README item 11: the ONE sign table —
 * sv `/`, de/it/nl/da/no/fi `:`, else `÷`; de/sv/da/no/fi `·`, else `×`).
 * The bank's template carries the glyph as DATA (the design's contract) and
 * divisionLine THROWS when that glyph disagrees with the table for the locale
 * — a data block can never print a sign notation.js forbids.
 *
 * Exports (exactly the names the design file lists):
 *   remBox({role, w=44, h=40})   the OPEN q / r box: `.ws-blankbox` (white,
 *       dashed CORAL 2.5, r 10 — the README ruling: every open numeral box is a
 *       coral blank box, never `.ws-answerbox` whose dash is `grid`) with
 *       `data-lcs-answer=""` (EMPTY: the truth rides on the item root's
 *       data-lcs-q / -r, never on the box) and `data-lcs-role="q"|"r"`.
 *   divisionLine({template, n, d, locale, boxStyle='inline'|'casita', remWord,
 *       lines=1|2, shown?, ghost?, w?})   `<div data-lcs-notation data-lcs-style
 *       data-lcs-lines>`: tokenises `template`; `{n}` / `{d}` → printed numerals
 *       (Baloo 2 700 26 ink, `data-lcs-num`); `{q}` / `{r}` → remBox (with
 *       `shown:{q,r}` a printed numeral in a solid grid-bordered 44 × 30 box,
 *       `data-lcs-shown-q` / `-r`, coral ink — the F4 error face); the division
 *       glyphs `÷ : /` and the product glyphs `× ·` → an operator span (Baloo 2
 *       700 24 teal) rendered from notation.js; `+ , ( )` → operator spans as
 *       written; `=` → inkSoft; any other run → a word span (Nunito 800 18
 *       ink); a whitespace run → an 8 px spacer (so `R{r}` prints "R1", never
 *       "R 1"); `lines:2` breaks after `=`; `ghost:true` renders every non-box
 *       token `visibility:hidden` so two boxes sit exactly under a `shown`
 *       line (F4). `boxStyle:'casita'` delegates the drawing to casitaFrame and
 *       keeps the template for the aria-label only.
 *   casitaFrame({n, d, locale, remWord='', w=200, h=88, shown?, ghost?})   the
 *       es galera / pt-BR chave / it colonna in ONE SVG, the design's 200-px
 *       geometry scaled by w (>= 170): dividend numeral at (0.2w, 22), a teal
 *       3 px bracket (vertical x 0.5w y 2..44 + horizontal 0.5w..w−4 at y 44),
 *       divisor numeral at (0.74w, 22); the q box (dashed coral 44 × 36 at
 *       0.74w − 22, 48) UNDER THE DIVISOR, the r box ((18, 48) at w 200) UNDER
 *       THE DIVIDEND, `remWord` (it `r.`) Nunito 16 left of the r box — the r
 *       box slides right to make room and the frame THROWS when a word cannot
 *       fit left of the bracket (pt "resto" needs '' or a 2-char form: open
 *       item). `shown` prints q / r in solid boxes; `ghost` hides the numerals
 *       and bracket. divisionLine passes `casitaW` (the spec: min(200, zone)).
 *   dealBoxes({d, slotW, slotH=44, leftoverW=64, leftoverLabel, gap=10})   the
 *       F1 row: d `.ws-groupbox` slots (white, tealSoft rim, `data-lcs-slot=k`)
 *       + one `.ws-groupbox--empty` (dashed coral) `data-lcs-leftover` carrying
 *       `leftoverLabel` in Nunito 800 14 inkSoft. The base renders none.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, roundedRect, line, label, esc } = require('../../primitives/_svg.js');
const { divGlyph, mulGlyph } = require('../../types/_shared/notation.js');

const T = tokens.color;
const F = tokens.font;

const DIV_GLYPHS = new Set(['÷', ':', '/']);
const MUL_GLYPHS = new Set(['×', '·']);
const OTHER_OPS = new Set(['+', ',', '(', ')']);
const BOX_W = 44, BOX_H = 40;
const NUM_PX = 26, OP_PX = 24, WORD_PX = 18, SPACER = 8;
const TOKEN_RE = /\{[ndqr]\}|[÷:/×·+,=()]|\s+|[^\s{}÷:/×·+,=()]+/g;

/* ------------------------------------------------------------------ boxes */
function remBox({ role, w = BOX_W, h = BOX_H }) {
  if (role !== 'q' && role !== 'r') throw new Error('remBox: role must be q|r, got ' + role);
  return `<span class="ws-blankbox" data-lcs-answer="" data-lcs-role="${role}" style="width:${w}px;height:${h}px;flex:0 0 ${w}px"></span>`;
}

/** The F4 "shown" numeral: a solid grid-bordered 44 × 30 box, coral ink (a wrong number to be crossed out). */
function shownBox({ role, value, w = BOX_W, h = 30 }) {
  return `<span data-lcs-shown-${role}="${esc(value)}" style="display:inline-flex;align-items:center;justify-content:center;width:${w}px;height:${h}px;flex:0 0 ${w}px;` +
    `background:${T.white};border:2px solid ${T.grid};border-radius:8px;font-family:${F.display},cursive;font-weight:700;font-size:22px;line-height:1;color:${T.coral}">${esc(value)}</span>`;
}

function numeral(v) {
  return `<span data-lcs-num="${esc(v)}" style="font-family:${F.display},cursive;font-weight:700;font-size:${NUM_PX}px;line-height:1;color:${T.ink}">${esc(v)}</span>`;
}
function opSpan(ch, color) {
  return `<span data-lcs-op="${esc(ch)}" style="font-family:${F.display},cursive;font-weight:700;font-size:${OP_PX}px;line-height:1;color:${color}">${esc(ch)}</span>`;
}
function wordSpan(text) {
  return `<span data-lcs-word style="font-family:${F.body},sans-serif;font-weight:800;font-size:${WORD_PX}px;line-height:1;color:${T.ink};white-space:nowrap">${esc(text)}</span>`;
}
function spacer() { return `<span aria-hidden="true" style="display:inline-block;width:${SPACER}px;flex:0 0 ${SPACER}px"></span>`; }

/** Tokenise a template; every slot exactly once (throws otherwise — the validator rule at render time). */
function tokenise(template) {
  const toks = String(template).match(TOKEN_RE) || [];
  if (toks.join('') !== String(template)) throw new Error('divisionLine: template has characters outside the grammar: ' + template);
  for (const s of ['{n}', '{d}', '{q}', '{r}']) {
    const c = toks.filter((t) => t === s).length;
    if (c !== 1) throw new Error(`divisionLine: template must carry ${s} exactly once (${c}): ${template}`);
  }
  if (/\d/.test(template)) throw new Error('divisionLine: template carries a digit: ' + template);
  return toks;
}

/* ------------------------------------------------------------------ inline line */
function divisionLine({ template, n, d, locale, boxStyle = 'inline', remWord = '', lines = 1, shown = null, ghost = false, w = null, casitaW = 200 }) {
  const loc = String(locale || 'en').slice(0, 2);
  const toks = tokenise(template);
  const div = divGlyph(loc), mul = mulGlyph(loc);
  if (boxStyle === 'casita') {
    const svg = casitaFrame({ n, d, locale: loc, remWord, shown, ghost, ariaTemplate: template, w: casitaW });
    return `<div data-lcs-notation data-lcs-style="casita" data-lcs-lines="1" data-lcs-template="${esc(template)}" style="display:flex;justify-content:center;align-items:center${w ? `;width:${w}px` : ''}">${svg}</div>`;
  }
  if (boxStyle !== 'inline') throw new Error('divisionLine: boxStyle must be inline|casita, got ' + boxStyle);
  if (lines !== 1 && lines !== 2) throw new Error('divisionLine: lines must be 1|2');
  const hide = ghost ? 'visibility:hidden;' : '';
  const render = (t) => {
    if (t === '{n}') return `<span style="${hide}display:inline-flex">${numeral(n)}</span>`;
    if (t === '{d}') return `<span style="${hide}display:inline-flex">${numeral(d)}</span>`;
    if (t === '{q}') return shown ? shownBox({ role: 'q', value: shown.q }) : remBox({ role: 'q' });
    if (t === '{r}') return shown ? shownBox({ role: 'r', value: shown.r }) : remBox({ role: 'r' });
    if (/^\s+$/.test(t)) return spacer();
    if (DIV_GLYPHS.has(t)) {
      if (t !== div) throw new Error(`divisionLine: the template's division sign "${t}" is not the ${loc} sign "${div}" (types/_shared/notation.js) — refuse`);
      return `<span style="${hide}display:inline-flex">${opSpan(div, T.teal)}</span>`;
    }
    if (MUL_GLYPHS.has(t)) {
      if (t !== mul) throw new Error(`divisionLine: the template's product sign "${t}" is not the ${loc} sign "${mul}" (types/_shared/notation.js) — refuse`);
      return `<span style="${hide}display:inline-flex">${opSpan(mul, T.teal)}</span>`;
    }
    if (t === '=') return `<span style="${hide}display:inline-flex">${opSpan('=', T.inkSoft)}</span>`;
    if (OTHER_OPS.has(t)) return `<span style="${hide}display:inline-flex">${opSpan(t, T.teal)}</span>`;
    return `<span style="${hide}display:inline-flex">${wordSpan(t)}</span>`;
  };
  const rowsToks = [];
  if (lines === 2) {
    const eq = toks.indexOf('=');
    if (eq < 0) throw new Error('divisionLine: lines:2 needs an = in the template');
    const a = toks.slice(0, eq + 1), b = toks.slice(eq + 1);
    while (b.length && /^\s+$/.test(b[0])) b.shift();
    while (a.length && /^\s+$/.test(a[a.length - 1]) && a.length > 1 && a[a.length - 1] !== '=') a.pop();
    rowsToks.push(a, b);
  } else rowsToks.push(toks);
  const rows = rowsToks.map((r) => `<div data-lcs-line style="display:flex;align-items:center;justify-content:center;height:${BOX_H}px;white-space:nowrap">${r.map(render).join('')}</div>`);
  return `<div data-lcs-notation data-lcs-style="inline" data-lcs-lines="${lines}" data-lcs-template="${esc(template)}" aria-label="${esc(template.replace('{n}', n).replace('{d}', d).replace('{q}', '_').replace('{r}', '_'))}" ` +
    `style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px${w ? `;width:${w}px` : ''}">${rows.join('')}</div>`;
}

/* ------------------------------------------------------------------ casita */
function casitaFrame({ n, d, locale, remWord = '', w = 200, h = 88, shown = null, ghost = false, ariaTemplate = null }) {
  const loc = String(locale || 'en').slice(0, 2);
  if (!(w >= 170)) throw new Error('casitaFrame: w ' + w + ' < 170 (the boxes and bracket no longer fit)');
  const hide = ghost ? { visibility: 'hidden' } : {};
  const numAttr = (v) => ({ 'data-lcs-num': v, ...hide });
  // the design's 200-px geometry, scaled by w: dividend at 0.2w, bracket at 0.5w, divisor at 0.74w
  const mid = Math.round(w / 2), cxN = Math.round(w * 0.2), cxD = Math.round(w * 0.74);
  const boxH = shown ? 30 : 36;
  const wordW = remWord ? Math.ceil([...String(remWord)].length * 8.5) : 0;   // Nunito 800 16 ≈ 8.5 px/char
  const rX = Math.max(cxN - 22, wordW ? wordW + 6 : 0);                         // the r box slides right to make room for the word
  if (rX + 44 > mid - 6) throw new Error(`casitaFrame: remWord "${remWord}" does not fit left of the r box in a ${w}-px casita — author '' or a 2-char form (it "r.")`);
  const parts = [];
  parts.push(label({ x: cxN, y: 22, text: String(n), size: NUM_PX, color: T.ink, fontFamily: F.display, weight: 700, anchor: 'middle', data: numAttr(n) }));
  parts.push(line({ x1: mid, y1: 2, x2: mid, y2: 44, strokeColor: T.teal, strokeWidth: tokens.stroke.primitive, cap: 'round', data: hide }));
  parts.push(line({ x1: mid, y1: 44, x2: w - 4, y2: 44, strokeColor: T.teal, strokeWidth: tokens.stroke.primitive, cap: 'round', data: hide }));
  parts.push(label({ x: cxD, y: 22, text: String(d), size: NUM_PX, color: T.ink, fontFamily: F.display, weight: 700, anchor: 'middle', data: numAttr(d) }));
  const box = (x, role) => shown
    ? roundedRect({ x, y: 48, w: 44, h: boxH, r: 8, fill: T.white, strokeColor: T.grid, strokeWidth: 2, data: { [`data-lcs-shown-${role}`]: shown[role] } }) +
      label({ x: x + 22, y: 48 + boxH / 2, text: String(shown[role]), size: 22, color: T.coral, fontFamily: F.display, weight: 700, anchor: 'middle' })
    : roundedRect({ x, y: 48, w: 44, h: boxH, r: 10, fill: T.white, strokeColor: T.coral, strokeWidth: 2.5, dash: '6 4', data: { 'data-lcs-answer': '', 'data-lcs-role': role } });
  parts.push(box(cxD - 22, 'q'));   // the quotient UNDER THE DIVISOR
  parts.push(box(rX, 'r'));         // the remainder UNDER THE DIVIDEND
  if (remWord) parts.push(label({ x: rX - 4, y: 48 + boxH / 2, text: remWord, size: 16, color: T.ink, fontFamily: F.body, weight: 800, anchor: 'end', data: { 'data-lcs-word': 1, ...hide } }));
  const aria = ariaTemplate ? ariaTemplate.replace('{n}', n).replace('{d}', d).replace('{q}', '_').replace('{r}', '_') : `${n} ${divGlyph(loc)} ${d}`;
  return svgRoot({ width: w, height: h, label: aria }, parts.join(''), { 'data-lcs-casita': 1 });
}

/* ------------------------------------------------------------------ F1 deal boxes */
function dealBoxes({ d, slotW, slotH = 44, leftoverW = 64, leftoverLabel = '', gap = 10 }) {
  if (!(d >= 2)) throw new Error('dealBoxes: d must be >= 2');
  if (!(slotW >= 36)) throw new Error('dealBoxes: slotW ' + slotW + ' < 36 (the G23 element floor)');
  const slots = Array.from({ length: d }, (_, k) =>
    `<span class="ws-groupbox" data-lcs-slot="${k + 1}" style="width:${slotW}px;height:${slotH}px;min-height:${slotH}px;flex:0 0 ${slotW}px"></span>`).join('');
  const leftover = `<span class="ws-groupbox ws-groupbox--empty" data-lcs-leftover style="width:${leftoverW}px;height:${slotH}px;min-height:${slotH}px;flex:0 0 ${leftoverW}px;` +
    `font-family:${F.body},sans-serif;font-weight:800;font-size:14px;line-height:1;color:${T.inkSoft}">${esc(leftoverLabel)}</span>`;
  return `<div data-lcs-deal style="display:flex;align-items:center;gap:${gap}px">${slots}${leftover}</div>`;
}

module.exports = { remBox, divisionLine, casitaFrame, dealBoxes };
