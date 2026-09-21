/**
 * components-b4/rounding.js — the G2-346 `rounding` family components (nt10-D;
 * design docs/worksheet-gen/b4-designs/G2-346-rounding.md §2 / §3, critic record
 * _work/G2-346-critic.md #1 / #4 / #5 / #6 / #12 / #14). HTML + inline SVG on the
 * token palette; scoped inline CSS; no page.css edit; no new primitive (the
 * design's rounding HILL was ruled OUT — the rule is a flat digit strip).
 *
 * The lock that shapes every component here: the relation glyph `≈` (U+2248) and
 * `→` (U+2192) are OUTSIDE every unicode-range in assets/fonts/fonts.css, so the
 * relation between a number and its rounded value is ALWAYS the SVG `roundGlyph`
 * (`[data-lcs-rel]`); the two codepoints never appear as text. `↑` / `↓` (U+2191 /
 * U+2193) ARE inside the Baloo latin subset and are printed as text. `=` never
 * sits between a number and its rounded value (only after F3's ROUNDED
 * expression). Answers are never printed: every open box is a b3
 * `blankNumeralBox` carrying its hidden `data-lcs-answer`.
 *
 * Base (§2):
 *   roundGlyph({kind='approx'|'arrow', size=24})  24 x 24 SVG, two teal tildes
 *       (or a teal arrow); aria-hidden; data-lcs-rel="<kind>". `kind` = the
 *       bank's `relation`.
 *   numBadge({idx})   26 px round teal badge, Baloo 2 600 14 white, aria-hidden,
 *       data-lcs-idx (the .ws-card-badge look without the corner cut).
 *   workedLine({n, step, to?, px=30, rel})   the rule box's example
 *       `47 [glyph] 50`: data-lcs-worked / data-lcs-worked-to; the deciding digit
 *       (one place below `step`) wrapped `<span data-lcs-rule-digit>` in coral.
 *       Throws when `to` disagrees with round(n, step). F3 shape
 *       {expr, a, b, sum, step, px}: `a + b [glyph] ra + rb = sum` with the
 *       rounded expression in `[data-lcs-rounded-expr]` (the one legal `=`).
 *   digitStrip({step, ring, captions:{down, up}, blockW=130})   the wordless rule:
 *       two blocks `0 1 2 3 4` / `5 6 7 8 9` over `↓` / `↑` over the bank's
 *       whole-literal captions; the digit === ring carries data-lcs-rule-digit
 *       and a coral ring. Throws on a missing caption or ring outside 0..9.
 *   roundRuleBox({step, lines, strip, minH=96})   the `.ws-scene-banner` shell
 *       (675 wide, min-height 96, margin 0, padding 8 14) holding the worked
 *       zone + the strip; data-lcs-rulebox data-lcs-step. NAMED roundRuleBox,
 *       not the design's `ruleStrip`: odd-and-even.js already exports
 *       `ruleStrip` (a text rule lane) and the b4 barrel refuses a duplicate
 *       name (recorded deviation, _work/G2-346-build.md).
 *   roundRow({idx, n, step, answer, rel, onesTint, rowH=60})   one line
 *       `[badge 26][12][numeral 56][10][glyph 24][10][box 84 x 44]` = 222 wide;
 *       data-lcs-row data-lcs-n data-lcs-step; the numeral is ONE text node
 *       (`onesTint`, d1 only, wraps the deciding digit coral). Throws when the
 *       answer disagrees with round(n, step) or n is a multiple of step.
 * Faces (§3; consumed by the five G3 faces of _work/G2-346-faces.md — every
 * geometry number is a parameter the FACE CONFIG sets, the defaults are the
 * design's §3 numbers; the shipped sizes are larger, the nt10-D sparse rule):
 *   roundChipLane({values, step, chip=72, gap=10, rowGap=12, cols=6, px=28})
 *       F1's strip of `.ws-chip` numerals in a `.ws-lane`; data-lcs-val only.
 *   updownBins({down:{label}, up:{label}, cells=9, cellW=84, cellH=44, w=330,
 *       h=232, cellGap=10, pillH=40, pillPx=18})   F1's two `.ws-bin`s, down
 *       LEFT / up RIGHT, a `.ws-pill` label = the in-font arrow + the bank
 *       literal, a grid of EMPTY blankNumeralBoxes; throws when the cells do
 *       not fit the bin height.
 *   estimateRow({idx, a, b, step, rel, exprW=80, rowH=48})   F3's line
 *       `a + b [glyph] [ ] + [ ] = [ ]` (433 wide); the `=` follows a BOX.
 *   targetPill({target, step, rel, h=52, px=28})   F4's `[glyph] 50` pill.
 *   numberField({target, step, values, pillW=96, pillH=52, gap=24, rowGap=gap,
 *       stagger=48, perRow=4, px=26})   F4's staggered field of `.ws-nchip`
 *       numerals, data-lcs-val only (no membership stamp, ever).
 *   twoTargetRow({idx, n, steps, answers, rel, rowH=44})   F5's line with two
 *       boxes (data-lcs-step 10 / 100) at row-x 178 / 338.
 *   placeHeader({heads:[h10, h100], cellW=160, centres=[178, 338], w=380})
 *   placePill({step})   the language-free `10` / `100` pill of F5's rule box.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, el, esc } = require('../../primitives/_svg.js');

const T = tokens.color;
const F = tokens.font;
const DISPLAY = `font-family:${F.display},cursive;font-weight:700`;
const BODY = `font-family:${F.body},sans-serif;font-weight:800`;
const LANE_INNER = 639;

function round(n, step) { return Math.floor(n / step + 0.5) * step; }
function decidingDigit(n, step) { return Math.floor(n / (step / 10)) % 10; }
function posInt(v) { return Number.isInteger(v) && v >= 0; }
function blankBox(o) { return require('../components-b3.js').blankNumeralBox(o); }   // call-time: the b3 namespace is complete by then
function checkStep(step, who) { if (step !== 10 && step !== 100) throw new Error(`${who}: step must be 10 or 100 (got ${step})`); }

/* ------------------------------------------------------------------ the glyph */
function roundGlyph({ kind = 'approx', size = 24 } = {}) {
  if (kind !== 'approx' && kind !== 'arrow') throw new Error(`roundGlyph: kind must be approx|arrow (got ${kind})`);
  if (!(size >= 16)) throw new Error(`roundGlyph: size ${size} < 16`);
  const stroke = { fill: 'none', stroke: T.teal, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
  const body = kind === 'approx'
    ? el('path', { d: 'M 3 9 Q 7.5 3.5 12 9 T 21 9', ...stroke }) + el('path', { d: 'M 3 16 Q 7.5 10.5 12 16 T 21 16', ...stroke })
    : el('line', { x1: 3, y1: 12, x2: 15, y2: 12, stroke: T.teal, 'stroke-width': 3, 'stroke-linecap': 'round' }) + el('polygon', { points: '14,5 22,12 14,19', fill: T.teal });
  return svgRoot({ width: size, height: size, viewBox: '0 0 24 24', label: '' }, body, { 'aria-hidden': 'true', 'data-lcs-rel': kind, style: 'flex:0 0 auto;display:block' });
}

/* ------------------------------------------------------------------ the badge */
function numBadge({ idx }) {
  if (!Number.isInteger(idx) || idx < 1) throw new Error(`numBadge: idx must be a positive integer (got ${idx})`);
  return `<span data-lcs-idx="${idx}" aria-hidden="true" style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;flex:0 0 26px;border-radius:50%;background:${T.teal};color:${T.white};${DISPLAY};font-weight:600;font-size:14px;line-height:1">${idx}</span>`;
}

/* ------------------------------------------------------------------ the worked line */
/** The digits of n with the deciding digit (index from the RIGHT: 0 = ones, 1 = tens) wrapped in a coral span. */
function digitsWithRule(n, decidingIndex, attr) {
  const s = String(n);
  const i = s.length - 1 - decidingIndex;
  if (i < 0) throw new Error(`workedLine: ${n} has no digit at index ${decidingIndex} from the right`);
  return esc(s.slice(0, i)) + `<span ${attr} style="color:${T.coral}">${esc(s[i])}</span>` + esc(s.slice(i + 1));
}

function workedLine(o) {
  const { px = 30, rel = 'approx', step = 10 } = o;
  checkStep(step, 'workedLine');
  const decidingIndex = step === 10 ? 0 : 1;
  const font = `${DISPLAY};font-size:${px}px;line-height:1.25;color:${T.ink}`;
  if (o.expr !== undefined) {
    // F3: `a + b [glyph] ra + rb = sum` — the `=` follows the ROUNDED expression only
    const { a, b } = o;
    if (!posInt(a) || !posInt(b)) throw new Error('workedLine: expr needs integer a, b');
    const ra = round(a, step), rb = round(b, step), sum = ra + rb;
    if (o.sum !== undefined && o.sum !== sum) throw new Error(`workedLine: sum ${o.sum} != ${ra} + ${rb}`);
    if (String(o.expr).replace(/\s+/g, '') !== `${a}+${b}`) throw new Error(`workedLine: expr "${o.expr}" != "${a} + ${b}"`);
    return `<span data-lcs-worked="${a}+${b}" data-lcs-worked-to="${sum}" style="display:inline-flex;align-items:center;gap:8px;${font}">` +
      `<span data-lcs-worked-expr>${esc(String(a))} + ${digitsWithRule(b, decidingIndex, 'data-lcs-rule-digit')}</span>` +
      roundGlyph({ kind: rel, size: px - 2 }) +
      `<span data-lcs-rounded-expr>${ra} + ${rb} = ${sum}</span></span>`;
  }
  const { n } = o;
  if (!posInt(n) || n < 1) throw new Error(`workedLine: n must be a positive integer (got ${n})`);
  const to = round(n, step);
  if (o.to !== undefined && o.to !== to) throw new Error(`workedLine: to ${o.to} != round(${n}, ${step}) = ${to}`);
  if (n % step === 0) throw new Error(`workedLine: ${n} is a multiple of ${step} — nothing to round`);
  if (to > 999) throw new Error(`workedLine: round(${n}, ${step}) = ${to} >= 1000`);
  const pill = o.placePill ? placePill({ step }) + `<span style="width:8px;flex:0 0 8px"></span>` : '';
  return `<span data-lcs-worked="${n}" data-lcs-worked-to="${to}" style="display:inline-flex;align-items:center;gap:12px;${font}">` + pill +
    `<span data-lcs-worked-n>${digitsWithRule(n, decidingIndex, 'data-lcs-rule-digit')}</span>` +
    roundGlyph({ kind: rel, size: px - 2 }) +
    `<span data-lcs-worked-val>${to}</span></span>`;
}

/* ------------------------------------------------------------------ the digit strip */
const STRIP = { down: [0, 1, 2, 3, 4], up: [5, 6, 7, 8, 9] };
function digitStrip({ step, ring, captions, blockW = 130 }) {
  checkStep(step, 'digitStrip');
  if (!Number.isInteger(ring) || ring < 0 || ring > 9) throw new Error(`digitStrip: ring must be a digit 0..9 (got ${ring})`);
  if (!captions || typeof captions.down !== 'string' || !captions.down.trim() || typeof captions.up !== 'string' || !captions.up.trim()) throw new Error('digitStrip: captions {down, up} are required whole literals');
  const cell = 26;
  const block = (dir) => {
    const digits = STRIP[dir].map((d) => {
      const ringed = d === ring;
      const ringCss = ringed ? `border:2.5px solid ${T.coral};border-radius:50%;` : '';
      return `<span data-lcs-strip-digit="${d}"${ringed ? ' data-lcs-rule-digit' : ''} style="display:inline-flex;align-items:center;justify-content:center;width:${cell}px;height:${cell}px;${ringCss}${DISPLAY};font-size:20px;line-height:1;color:${T.ink}">${d}</span>`;
    }).join('');
    const arrow = dir === 'down' ? '↓' : '↑';
    return `<span data-lcs-strip-block="${dir}" style="display:inline-flex;flex-direction:column;align-items:center;gap:4px;width:${blockW}px;flex:0 0 ${blockW}px">` +
      `<span style="display:inline-flex;height:${cell}px">${digits}</span>` +
      `<span data-lcs-arrow="${dir}" style="display:block;height:22px;line-height:22px;${DISPLAY};font-size:20px;color:${T.teal}">${arrow}</span>` +
      `<span data-lcs-caption="${dir}" style="display:block;height:16px;line-height:16px;${BODY};font-size:12px;color:${T.inkSoft};white-space:nowrap">${esc(captions[dir])}</span></span>`;
  };
  return `<span data-lcs-strip style="display:inline-flex;align-items:flex-start;gap:24px">${block('down')}${block('up')}</span>`;
}

/* ------------------------------------------------------------------ the rule box */
function roundRuleBox({ step, lines, strip, minH = 96 }) {
  checkStep(step, 'roundRuleBox');
  if (!Array.isArray(lines) || !lines.length || lines.some((l) => typeof l !== 'string' || !l.includes('data-lcs-worked'))) throw new Error('roundRuleBox: lines must be >= 1 workedLine html strings');
  if (typeof strip !== 'string' || !strip.includes('data-lcs-strip')) throw new Error('roundRuleBox: strip must be a digitStrip');
  return `<div class="ws-scene-banner" data-lcs-rulebox data-lcs-step="${step}" style="width:675px;min-height:${minH}px;margin:0;padding:8px 14px;gap:32px;justify-content:center;align-items:center;flex:0 0 auto">` +
    `<span data-lcs-worked-zone style="display:inline-flex;flex-direction:column;gap:6px;align-items:flex-start">${lines.join('')}</span>${strip}</div>`;
}

/* ------------------------------------------------------------------ the line */
function roundRow({ idx, n, step, answer, rel = 'approx', onesTint = false, rowH = 60, boxW = 84, boxH = 44, numeralW = 56 }) {
  checkStep(step, 'roundRow');
  if (!posInt(n) || n < 1) throw new Error(`roundRow: n must be a positive integer (got ${n})`);
  if (n % step === 0) throw new Error(`roundRow: ${n} is a multiple of ${step} — not an item`);
  const want = round(n, step);
  if (String(answer) !== String(want)) throw new Error(`roundRow: answer ${answer} != round(${n}, ${step}) = ${want}`);
  if (want > 999) throw new Error(`roundRow: round(${n}, ${step}) = ${want} >= 1000`);
  if (boxH < 44 || boxW < 68) throw new Error(`roundRow: box ${boxW} x ${boxH} below the 68 x 44 floor`);
  const numeral = onesTint ? digitsWithRule(n, step === 10 ? 0 : 1, 'data-lcs-tint') : esc(String(n));
  return `<span data-lcs-row data-lcs-n="${n}" data-lcs-step="${step}" style="display:inline-flex;align-items:center;height:${rowH}px;flex:0 0 auto">` +
    numBadge({ idx }) + `<span style="width:12px;flex:0 0 12px"></span>` +
    `<span data-lcs-num style="display:inline-block;width:${numeralW}px;flex:0 0 ${numeralW}px;text-align:right;${DISPLAY};font-size:28px;line-height:1;color:${T.ink}">${numeral}</span>` +
    `<span style="width:10px;flex:0 0 10px"></span>` + roundGlyph({ kind: rel, size: 24 }) + `<span style="width:10px;flex:0 0 10px"></span>` +
    blankBox({ w: boxW, h: boxH, answer: String(want) }) + `</span>`;
}

/* ------------------------------------------------------------------ F1: the numeral chip lane + the two arrow bins */
/**
 * The strip of numerals the child sorts: `.ws-chip` discs (overridden to `chip`
 * px, Baloo 2 700 `px`) in rows of `cols` inside a `.ws-lane`; each chip stamps
 * ONLY its value (`data-lcs-val`) — direction / membership never. Throws on a
 * repeated value, a multiple of `step`, a chip under the 52 floor or a row
 * wider than the lane.
 */
function roundChipLane({ values, step = 10, chip = 72, gap = 10, rowGap = 12, cols = 6, px = 28 }) {
  checkStep(step, 'roundChipLane');
  if (!Array.isArray(values) || values.length < 4) throw new Error('roundChipLane: values must be >= 4');
  if (new Set(values).size !== values.length) throw new Error('roundChipLane: a value twice');
  for (const v of values) if (!posInt(v) || v % step === 0 || v > 999) throw new Error(`roundChipLane: value ${v} is a multiple of ${step} or >= 1000`);
  if (chip < 52) throw new Error(`roundChipLane: chip ${chip} < 52`);
  if (px < 22) throw new Error(`roundChipLane: font ${px} < 22`);
  const rowW = cols * chip + (cols - 1) * gap;
  if (rowW > LANE_INNER) throw new Error(`roundChipLane: a row of ${cols} x ${chip} = ${rowW} > ${LANE_INNER}`);
  const rows = Math.ceil(values.length / cols);
  const minH = 28 + rows * chip + (rows - 1) * rowGap;   // the lane is border-box: padding 12 + border 2 each side
  const chips = values.map((v) => `<span class="ws-chip" data-lcs-val="${v}" style="width:${chip}px;height:${chip}px;flex:0 0 ${chip}px;font-size:${px}px">${v}</span>`).join('');
  return `<div class="ws-lane" data-lcs-chips data-ws-content style="display:flex;flex-wrap:wrap;justify-content:center;align-content:center;column-gap:${gap}px;row-gap:${rowGap}px;width:675px;max-width:${rowW + 36}px;margin:0 auto;min-height:${minH}px;height:${minH}px;box-sizing:border-box">${chips}</div>`;
}

function updownBins({ down, up, cells = 9, cellW = 84, cellH = 44, w = 330, h = 232, gap = 15, cols = 3, cellGap = 10, pillH = 40, pillPx = 18 }) {
  for (const [k, v] of [['down', down], ['up', up]]) if (!v || typeof v.label !== 'string' || !v.label.trim()) throw new Error(`updownBins: ${k}.label is required`);
  if (!Number.isInteger(cells) || cells < 2) throw new Error(`updownBins: cells ${cells}`);
  if (cellH < 44) throw new Error(`updownBins: cellH ${cellH} < 44`);
  if (cellW < 84) throw new Error(`updownBins: cellW ${cellW} < 84 (a 3-digit numeral's box)`);
  if (2 * w + gap > 675) throw new Error(`updownBins: 2 x ${w} + ${gap} = ${2 * w + gap} > 675`);
  const gridW = cols * cellW + (cols - 1) * cellGap;
  if (gridW > w - 12) throw new Error(`updownBins: ${cols} x ${cellW} grid ${gridW} > bin inner ${w - 12}`);
  const cellRows = Math.ceil(cells / cols);
  const need = 12 + pillH + 12 + cellRows * cellH + (cellRows - 1) * cellGap + 16;
  if (need > h) throw new Error(`updownBins: ${cells} cells of ${cellW} x ${cellH} need ${need} px, the bin is ${h}`);
  const bin = (dir, label) => {
    const arrow = dir === 'down' ? '↓' : '↑';
    const grid = Array.from({ length: cells }, () => blankBox({ w: cellW, h: cellH, answer: '' })).join('');
    return `<div class="ws-bin" data-lcs-bin="${dir}" data-lcs-cells="${cells}" data-ws-content style="max-width:${w}px;flex:0 0 ${w}px;height:${h}px;display:flex;flex-direction:column;align-items:center;padding:12px 0 0;border-top:3px dashed ${T.teal}">` +
      `<span class="ws-pill" data-lcs-bin-label="${dir}" style="height:${pillH}px;padding:6px 16px;${DISPLAY};font-size:${pillPx}px;color:${T.ink};white-space:nowrap;max-width:300px;gap:8px">` +
      `<span data-lcs-arrow="${dir}" style="color:${T.teal}">${arrow}</span><span data-lcs-bin-text>${esc(label)}</span></span>` +
      `<div style="display:grid;grid-template-columns:repeat(${cols},${cellW}px);gap:${cellGap}px;margin-top:12px">${grid}</div></div>`;
  };
  return `<div data-lcs-bins style="display:flex;gap:${gap}px;justify-content:center;flex:0 0 auto">${bin('down', down.label)}${bin('up', up.label)}</div>`;
}

/* ------------------------------------------------------------------ F3: the estimate row */
function estimateRow({ idx, a, b, step = 10, rel = 'approx', exprW = 80, rowH = 48 }) {
  checkStep(step, 'estimateRow');
  if (!posInt(a) || !posInt(b) || a < 1 || b < 1) throw new Error('estimateRow: a, b must be positive integers');
  if (a % step === 0 || b % step === 0) throw new Error(`estimateRow: an addend is a multiple of ${step}`);
  const ra = round(a, step), rb = round(b, step), sum = ra + rb;
  if (sum > 999) throw new Error(`estimateRow: rounded sum ${sum} >= 1000`);
  const sign = (s, color, w) => `<span style="display:inline-block;width:${w}px;text-align:center;${DISPLAY};font-size:24px;line-height:1;color:${color}">${s}</span>`;
  const sp = (w) => `<span style="width:${w}px;flex:0 0 ${w}px"></span>`;
  return `<span data-lcs-row data-lcs-a="${a}" data-lcs-b="${b}" data-lcs-step="${step}" style="display:inline-flex;align-items:center;height:${rowH}px">` +
    numBadge({ idx }) + sp(12) +
    `<span data-lcs-expr style="display:inline-block;width:${exprW}px;text-align:right;${DISPLAY};font-size:24px;line-height:1;color:${T.ink}">${a} + ${b}</span>` + sp(10) +
    roundGlyph({ kind: rel, size: 24 }) + sp(10) +
    blankBox({ w: 68, h: 44, answer: String(ra), attrs: 'data-lcs-role="a"' }) + sp(8) + sign('+', T.teal, 14) + sp(8) +
    blankBox({ w: 68, h: 44, answer: String(rb), attrs: 'data-lcs-role="b"' }) + sp(8) + sign('=', T.inkSoft, 13) + sp(8) +
    blankBox({ w: 76, h: 44, answer: String(sum), attrs: 'data-lcs-role="sum"' }) + `</span>`;
}

/* ------------------------------------------------------------------ F4: the target pill + the field */
function targetPill({ target, step = 10, rel = 'approx', h = 52, px = 28 }) {
  checkStep(step, 'targetPill');
  if (!posInt(target) || target % step !== 0 || target < step || target > 999) throw new Error(`targetPill: target ${target} is not a multiple of ${step} in range`);
  if (h < 44 || px < 22) throw new Error(`targetPill: ${h} x ${px} below the floor`);
  return `<span class="ws-nchip" data-lcs-target-pill aria-hidden="true" style="height:${h}px;padding:0 18px;background:${T.coralSoft};border-color:${T.coral};border-width:2.5px;gap:10px;color:${T.ink};font-size:${px}px">` +
    roundGlyph({ kind: rel, size: Math.max(24, Math.round(px * 0.86)) }) + `<span>${target}</span></span>`;
}

/** F4's field: `values` in `perRow` pills, the even rows shifted `stagger` px right of the odd ones (a field, not a table; the row centred first, so both fit when rowW + 2·stagger <= 639); `gap` = x, `rowGap` = y (the pencil-ring reserve, >= 20 measured by the gate). */
function numberField({ target, step = 10, values, pillW = 96, pillH = 52, gap = 24, rowGap = gap, stagger = 48, perRow = 4, px = 26 }) {
  checkStep(step, 'numberField');
  if (!Array.isArray(values) || values.length < 4) throw new Error('numberField: values must be >= 4');
  if (new Set(values).size !== values.length) throw new Error('numberField: a value twice');
  for (const v of values) { if (!posInt(v) || v % step === 0 || v === target || v > 999) throw new Error(`numberField: value ${v} is a multiple of ${step}, the target, or >= 1000`); }
  if (pillH < 44 || pillW < 44) throw new Error('numberField: pill below the 44 floor');
  if (px < 22) throw new Error(`numberField: font ${px} < 22`);
  if (gap < 20 || rowGap < 20) throw new Error(`numberField: gap ${gap} / ${rowGap} < 20 (the pencil-ring reserve)`);
  const rowW = perRow * pillW + (perRow - 1) * gap;
  if (rowW + 2 * stagger > LANE_INNER) throw new Error(`numberField: row ${rowW} shifted ${stagger} both ways > ${LANE_INNER}`);
  const rows = [];
  for (let i = 0; i < values.length; i += perRow) {
    const pills = values.slice(i, i + perRow).map((v) => `<span class="ws-nchip" data-lcs-val="${v}" style="width:${pillW}px;height:${pillH}px;font-size:${px}px;color:${T.ink};border-width:2.5px">${v}</span>`).join('');
    const odd = (i / perRow) % 2 === 1;
    // the even rows sit `stagger` px RIGHT of the odd rows (position:relative — a margin on a centred flex item would shift it by half)
    rows.push(`<div data-lcs-field-row style="display:flex;gap:${gap}px;justify-content:center;position:relative;left:${odd ? stagger : 0}px">${pills}</div>`);
  }
  return `<div data-lcs-field data-lcs-target="${target}" data-lcs-step="${step}" data-ws-content style="display:flex;flex-direction:column;gap:${rowGap}px;align-items:center">${rows.join('')}</div>`;
}

/* ------------------------------------------------------------------ F5: two boxes per number */
function placePill({ step }) {
  checkStep(step, 'placePill');
  return `<span class="ws-nchip" data-lcs-place="${step}" aria-hidden="true" style="width:44px;height:24px;flex:0 0 44px;font-size:15px;line-height:1">${step}</span>`;
}

function twoTargetRow({ idx, n, steps = [10, 100], answers, rel = 'approx', rowH = 44 }) {
  if (!Array.isArray(steps) || steps.length !== 2 || steps[0] !== 10 || steps[1] !== 100) throw new Error('twoTargetRow: steps must be [10, 100]');
  if (!posInt(n) || n % 10 === 0) throw new Error(`twoTargetRow: n ${n} must not be a multiple of 10`);
  const want = steps.map((s) => round(n, s));
  if (want.some((v) => v > 999)) throw new Error(`twoTargetRow: a rounding of ${n} reaches 1000`);
  if (answers && (answers.length !== 2 || String(answers[0]) !== String(want[0]) || String(answers[1]) !== String(want[1]))) throw new Error(`twoTargetRow: answers ${answers} != ${want}`);
  const sp = (w) => `<span style="width:${w}px;flex:0 0 ${w}px"></span>`;
  return `<span data-lcs-row data-lcs-n="${n}" data-lcs-steps="${steps.join(',')}" style="display:inline-flex;align-items:center;height:${rowH}px;width:380px">` +
    numBadge({ idx }) + sp(12) +
    `<span data-lcs-num style="display:inline-block;width:56px;flex:0 0 56px;text-align:right;${DISPLAY};font-size:28px;line-height:1;color:${T.ink}">${n}</span>` + sp(10) +
    roundGlyph({ kind: rel, size: 24 }) + sp(8) + blankBox({ w: 84, h: 44, answer: String(want[0]), attrs: 'data-lcs-step="10"' }) + sp(44) +
    roundGlyph({ kind: rel, size: 24 }) + sp(8) + blankBox({ w: 84, h: 44, answer: String(want[1]), attrs: 'data-lcs-step="100"' }) + `</span>`;
}

function placeHeader({ heads, cellW = 160, centres = [178, 338], w = 380 }) {
  if (!Array.isArray(heads) || heads.length !== 2 || heads.some((h) => typeof h !== 'string' || !h.trim())) throw new Error('placeHeader: heads [h10, h100] are required whole literals');
  if (centres[1] - centres[0] < cellW) throw new Error(`placeHeader: centres ${centres[1] - centres[0]} apart < cellW ${cellW} — the cells overlap`);
  const cell = (text, step, cx) => `<span data-lcs-head="${step}" style="position:absolute;left:${cx - cellW / 2}px;top:0;width:${cellW}px;height:24px;line-height:24px;text-align:center;white-space:nowrap;${BODY};font-size:13px;color:${T.ink}">${esc(text)}</span>`;
  return `<div data-lcs-heads style="position:relative;width:${w}px;height:24px">${cell(heads[0], 10, centres[0])}${cell(heads[1], 100, centres[1])}</div>`;
}

module.exports = { roundGlyph, numBadge, workedLine, digitStrip, roundRuleBox, roundRow, roundChipLane, updownBins, estimateRow, targetPill, numberField, twoTargetRow, placeHeader, placePill };
