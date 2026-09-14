/**
 * components-b3/days-and-months.js — the K-321 `days-and-months` family
 * components (design: docs/worksheet-gen/b3-designs/K-321-days-and-months.md
 * §2). Merged into the templates/components-b3.js namespace; every name is
 * the one the design file declares NEW (the namespace refuses a duplicate).
 *
 * Base-page exports (Phase 1) + the Phase 2 FACE components (2026-09-14,
 * design §3; record _work/K-321-faces.md). The three base exports keep their
 * default output BYTE-IDENTICAL (tools/b3-baseline.js is the proof); the two
 * additive nameTile options below (`pad`, a string `h`) are only read by
 * the faces.
 *
 *   nameTile({ text, w, h = 60, px = 26, id, pad = 10 })
 *     `pad` = the horizontal padding (F2/F4's 161 px today tile uses 6 so
 *     its inner width is 145: pt `segunda-feira` 139.6 at 22, measured); a
 *     STRING `h` ('100%') is written verbatim so a ladder rung can fill its
 *     grid row (F1).
 *     One cream `#FBF3E4` tile, border 2 creamDeep, radius 12, the calendar
 *     NAME centred in Baloo 2 700 at `px`, `white-space:nowrap`, padding 0 10
 *     so the inner width is w - 24 (440 -> 416, 250 -> 226: the design's
 *     floors; widest data pt `segunda-feira` 165.0 at 26, measured) (the text is
 *     VERBATIM from data/b2/calendar.js — casing included; never displayWord,
 *     never title-case). Stamps data-lcs-day="<id>" (the 0..6 day index or
 *     the 0..11 month index); no other text.
 *
 *   rankBox({ n, d = 60 })
 *     The GIVEN rank cell (the K-320 idiom): tealSoft fill, teal 2 border,
 *     radius 10, the numeral in Baloo 2 700 30 ink. Stamps
 *     data-lcs-given="<n>" and NO data-lcs-answer — the printed numeral is
 *     the anchor the child reads, not an answer.
 *
 *   nameBank({ names, px = 20, h = 36, gap = 8 })                        (F1)
 *     The word bank: a `.ws-lane` with the inline `padding:7px 12px` override
 *     (inner 647) holding one `.ws-bankword` pill per name, Baloo 2 700 at
 *     `px` (inline: the child copies ONE letterform, never the pill's Nunito),
 *     h 36, padding 0 14, gap 8, flex-wrap → exactly 2 rows in all 11 locales
 *     (design: totals 733 sv .. 971 pt at gap 10, all > 647 and < 1,294), so
 *     the lane is 7 + 36 + 8 + 36 + 7 + 4 = 98 px. `names[i] = { day, text }`
 *     in the (shuffled) bank order; each pill stamps data-lcs-bank-word="<day>".
 *
 *   nameLadder({ rungs, rungW = 520, rungMin = 72, rungMax = 100, gap = 8, namePx = 26, glyphH = 40, laneW = 500, laneH = 66 })   (F1)
 *     The anchored week ladder: a 556 px grid `[rail 24][12][rung 520]`, rows
 *     `minmax(rungMin, rungMax)` (the rungs FILL their row: 91 px under the en
 *     chrome, 80 at the design's 722, 72 at the measured 677 floor of a legal
 *     4-line title + 3-line instruction — the design's fixed 80 overflowed
 *     that floor by 22 px). A printed rung = nameTile 520 × 100 % at namePx;
 *     a GAP rung = `.ws-blankbox` (white, dashed coral, r 10) holding one
 *     writingRow(laneW × laneH, glyphH, xHeight) and NOTHING printed. The rail
 *     (railFlag) is an absolute overlay down the 24 px column: coral pennant
 *     10 × 14 at the top, a 3 px coral line, an 8 px head at the bottom; an
 *     inkSoft dot r 4 sits in each rung's rail cell. `rungs[i] = { day, text,
 *     gap, answer }` in LADDER order; stamps data-lcs-rung="i" data-lcs-day
 *     + data-lcs-gap="1" data-lcs-answer="<day>" (gap) or data-lcs-printed="1".
 *
 *   railFlag({ w = 24 })                                                 (F1, internal)
 *     The G1-308 startArrow turned vertical: { top, line, head } html parts.
 *
 *   neighbourHeads({ left, mid, right, laneW = 223, tileW = 161, px = 20 })  (F2/F4)
 *     The three column heads over the neighbour rows (Baloo 2 700 20; left /
 *     right inkSoft, mid teal; mid may be '' — F4 prints before / (none) /
 *     after), 30 px, the same 639-px inner geometry as the rows.
 *
 *   neighbourRow({ left, today, right, laneW = 223, tileW = 161, h = 68, namePx = 22, glyphH = 32, inverse = false })   (F2/F4)
 *     One `.ws-lane` (inline `padding:10px 16px`, inner 639): [writing lane
 *     223 × 68][16 coral chevron][nameTile 161 × 68 at 22, pad 6][chevron][lane]
 *     = 639; the row is 68 + 20 + 4 = 92. A lane = `.ws-blankbox` holding one
 *     writingRow(203 × 60, glyphH). `inverse` prints BOTH neighbours and
 *     blanks the middle (d3 of the design). Stamps: data-lcs-today="<idx>"
 *     on the row, data-lcs-lane="left|right|mid" data-lcs-answer="<idx>" on
 *     each lane (data only), data-lcs-inverse="1" when inverse.
 *
 *   abbrevPairs({ left, right, itemH = 78, leftW = 140, rightW = 300, abbrPx = 26, namePx = 24 })   (F5)
 *     The house two-column match (`.ws-match` padding 6 30, `.ws-match-col`
 *     gap 12): left `.ws-match-item--plain` 140 × 78 with the abbreviation
 *     (Baloo 2 700 26) + a right dot; right `.ws-match-item` (cream) 300 × 78
 *     with the full name (Baloo 2 700 24, nowrap) + a left dot. Stamps
 *     data-lcs-abbr="<day>" / data-lcs-name="<day>"; the child's line is the
 *     only mark. Returns the two columns; the spec wraps them in `.ws-match`.
 *
 *   orderRows({ items, cols, tileW, boxPx, namePx, given, unit, weekStart, strip })
 *     The whole base body: `[rank box][12][name tile]` rows in a grid of
 *     `minmax(boxPx px, rowMax px)` rows (gap 14; rowMax defaults to
 *     boxPx + 40) that fills the body, so the slack between the 504 px stack
 *     and the 722 px floor opens BETWEEN rows (7 x 91 at the floor, the
 *     design's number) while boxes and tiles stay at their size — and a
 *     short stack (d3: 4 rows) stops growing at rowMax and sits centred
 *     instead of spreading 143 px gaps (measured 2026-09-14 without the cap);
 *     `cols:2` lays the rows down
 *     column 1 then column 2 (`grid-auto-flow:column`, 4 + 3 for seven).
 *     `items[i] = { day, text, answer, given }` in READING order; a row whose
 *     `given` is set prints a rankBox, every other row an `answerBox`
 *     (templates/components.js — the house dashed cell for a written
 *     numeral) carrying data-lcs-answer. `strip` (d1) = numberStrip 1..n
 *     above the rows. Root stamps: data-ws-content data-lcs-order
 *     data-lcs-unit data-lcs-weekstart data-lcs-n data-lcs-cols; each row
 *     data-lcs-row="i" data-lcs-day="d".
 *
 * Inline CSS only (scoped, token colours); no page.css edit; no SVG hex.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { esc } = require('../../primitives/_svg.js');
const { answerBox } = require('../components.js');
const { numberStrip } = require('../components-b2.js');

const F = tokens.font;
const T = tokens.color;

function nameTile({ text, w = 440, h = 60, px = 26, id, pad = 10 }) {
  const idAttr = id === undefined || id === null ? '' : ` data-lcs-day="${esc(String(id))}"`;
  const hv = typeof h === 'string' ? h : `${h}px`;
  return `<span class="ws-nametile" style="display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;` +
    `width:${w}px;height:${hv};padding:0 ${pad}px;background:${T.cream};border:2px solid ${T.creamDeep};border-radius:12px;` +
    `font-family:${F.display},cursive;font-weight:700;font-size:${px}px;line-height:${px + 4}px;color:${T.ink};white-space:nowrap"` +
    `${idAttr}>${esc(text)}</span>`;
}

function rankBox({ n, d = 60 }) {
  return `<span class="ws-rankbox" style="display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;` +
    `width:${d}px;height:${d}px;background:${T.tealSoft};border:2px solid ${T.teal};border-radius:10px;` +
    `font-family:${F.display},cursive;font-weight:700;font-size:30px;line-height:34px;color:${T.ink}" ` +
    `data-lcs-given="${esc(String(n))}">${esc(String(n))}</span>`;
}

function orderRows({ items, cols = 1, tileW = 440, boxPx = 60, namePx = 26, given = [], unit = 'days', weekStart = 0, strip = false, rowMax }) {
  const rowCap = rowMax || boxPx + 40;
  const n = items.length;
  const perCol = Math.ceil(n / cols);
  const rowW = boxPx + 12 + tileW;
  const rows = items.map((it, i) => {
    const cell = it.given !== undefined && it.given !== null
      ? rankBox({ n: it.given, d: boxPx })
      : answerBox({ w: boxPx, h: boxPx, answer: it.answer });
    return `<div class="ws-orderrow" style="display:flex;align-items:center;justify-content:center;gap:12px;width:${rowW}px;min-height:${boxPx}px" ` +
      `data-lcs-row="${i}" data-lcs-day="${it.day}">${cell}${nameTile({ text: it.text, w: tileW, h: boxPx, px: namePx, id: it.day })}</div>`;
  }).join('');
  const colGap = cols > 1 ? 24 : 0;
  const gridStyle = `display:grid;grid-auto-flow:column;grid-template-columns:repeat(${cols},${rowW}px);` +
    `grid-template-rows:repeat(${perCol},minmax(${boxPx}px,${rowCap}px));column-gap:${colGap}px;row-gap:14px;` +
    `justify-content:center;align-content:center;align-items:center;flex:1 1 auto;min-height:0`;
  const stripHtml = strip ? `<div style="flex:0 0 auto;margin-bottom:14px">${numberStrip({ values: Array.from({ length: n }, (_, k) => k + 1), chip: 40 })}</div>` : '';
  return `<div class="ws-orderrows" data-ws-content data-lcs-order data-lcs-unit="${esc(unit)}" data-lcs-weekstart="${weekStart}" ` +
    `data-lcs-n="${n}" data-lcs-cols="${cols}" data-lcs-given="${esc(given.join(','))}" ` +
    `style="display:flex;flex-direction:column;flex:1 1 auto;min-height:0">` +
    stripHtml + `<div class="ws-ordergrid" style="${gridStyle}">${rows}</div></div>`;
}

/* ================================================================== faces (Phase 2) */
const { writingRow } = require('../../primitives/trace-path.js');
const { svgRoot, el, line } = require('../../primitives/_svg.js');

function nameBank({ names, px = 20, h = 36, gap = 8 }) {
  const pills = names.map((n) =>
    `<span class="ws-bankword" style="height:${h}px;padding:0 14px;font-family:${F.display},cursive;font-weight:700;font-size:${px}px;line-height:${h - 4}px;color:${T.ink};white-space:nowrap" ` +
    `data-lcs-bank-word="${esc(String(n.day))}">${esc(n.text)}</span>`).join('');
  return `<div class="ws-lane ws-namebank" style="padding:7px 12px;display:flex;flex-wrap:wrap;gap:${gap}px;justify-content:center;align-items:center;flex:0 0 auto;width:100%" ` +
    `data-lcs-bank data-lcs-bank-n="${names.length}">${pills}</div>`;
}

/** The rail parts: pennant at the top, the line, the head at the bottom (the G1-308 startArrow turned vertical). */
function railFlag({ w = 24 } = {}) {
  const x = w / 2;
  const top = svgRoot({ width: w, height: 18, label: '' },
    line({ x1: x, y1: 2, x2: x, y2: 18, strokeColor: T.coral, strokeWidth: 3, cap: 'round' }) +
    el('polygon', { points: `${x + 1},2 ${x + 11},9 ${x + 1},16`, fill: T.coral, 'data-lcs-flag': 1 }),
    { 'aria-hidden': 'true', 'data-lcs-rail': 'top' });
  const head = svgRoot({ width: w, height: 10, label: '' },
    el('polygon', { points: `${x - 5},0 ${x + 5},0 ${x},9`, fill: T.coral }),
    { 'aria-hidden': 'true', 'data-lcs-rail': 'head' });
  return {
    top: `<span style="position:absolute;left:0;top:0;width:${w}px;height:18px;line-height:0">${top}</span>`,
    line: `<span style="position:absolute;left:${x - 1.5}px;top:16px;bottom:9px;width:3px;background:${T.coral};border-radius:2px" aria-hidden="true" data-lcs-rail="line"></span>`,
    head: `<span style="position:absolute;left:0;bottom:0;width:${w}px;height:10px;line-height:0">${head}</span>`,
  };
}

function nameLadder({ rungs, rungW = 520, rungMin = 72, rungMax = 100, gap = 8, namePx = 26, glyphH = 40, laneW = 500, laneH = 66 }) {
  const n = rungs.length;
  const railW = 24;
  const w = railW + 12 + rungW;
  const rail = railFlag({ w: railW });
  const cells = rungs.map((r, i) => {
    const dot = `<span class="ws-raildot" style="grid-column:1;grid-row:${i + 1};align-self:center;justify-self:center;width:8px;height:8px;border-radius:50%;background:${T.inkSoft}" aria-hidden="true"></span>`;
    const body = r.gap
      ? `<span class="ws-blankbox" style="display:flex;align-items:center;justify-content:center;width:${rungW}px;height:100%;line-height:0">` +
        writingRow({ w: laneW, h: laneH, glyphH, xHeight: true }).svg + `</span>`
      : nameTile({ text: r.text, w: rungW, h: '100%', px: namePx, id: r.day });
    const stamp = r.gap ? `data-lcs-gap="1" data-lcs-answer="${esc(String(r.day))}"` : 'data-lcs-printed="1"';
    return dot + `<div class="ws-rung" style="grid-column:2;grid-row:${i + 1};display:flex;align-items:stretch;min-height:0" ` +
      `data-lcs-rung="${i}" data-lcs-day="${esc(String(r.day))}" ${stamp}>${body}</div>`;
  }).join('');
  const maxH = n * rungMax + (n - 1) * gap;
  return `<div class="ws-nameladder" style="position:relative;display:grid;grid-template-columns:${railW}px ${rungW}px;column-gap:12px;` +
    `grid-template-rows:repeat(${n},minmax(${rungMin}px,${rungMax}px));row-gap:${gap}px;width:${w}px;margin:0 auto;flex:1 1 auto;min-height:0;max-height:${maxH}px" ` +
    `data-lcs-ladder data-lcs-rungs="${n}">${rail.top}${rail.line}${rail.head}${cells}</div>`;
}

const headStyle = (px, color) => `display:inline-flex;align-items:center;justify-content:center;font-family:${F.display},cursive;font-weight:700;font-size:${px}px;line-height:${px + 6}px;color:${color};white-space:nowrap`;

function neighbourHeads({ left, mid, right, laneW = 223, tileW = 161, px = 20 }) {
  return `<div class="ws-neighbourheads" style="display:flex;align-items:center;justify-content:space-between;height:30px;padding:0 18px;flex:0 0 auto" data-lcs-heads>` +
    `<span style="${headStyle(px, T.inkSoft)};width:${laneW}px" data-lcs-head="left">${esc(left)}</span>` +
    `<span style="${headStyle(px, T.teal)};width:${tileW}px" data-lcs-head="mid">${esc(mid || '')}</span>` +
    `<span style="${headStyle(px, T.inkSoft)};width:${laneW}px" data-lcs-head="right">${esc(right)}</span></div>`;
}

function chevron(dir) {
  const pts = dir === 'left' ? '12,2 4,12 12,22' : '4,2 12,12 4,22';
  return svgRoot({ width: 16, height: 24, label: '' },
    el('polyline', { points: pts, fill: 'none', stroke: T.coral, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    { 'aria-hidden': 'true', 'data-lcs-chevron': dir });
}

function writingLane({ w, h, glyphH, role, answer }) {
  return `<span class="ws-blankbox" style="display:flex;align-items:center;justify-content:center;width:${w}px;height:${h}px;line-height:0;flex:0 0 auto" ` +
    `data-lcs-lane="${role}" data-lcs-answer="${esc(String(answer))}">${writingRow({ w: w - 20, h: h - 8, glyphH, xHeight: true }).svg}</span>`;
}

function neighbourRow({ left, today, right, laneW = 223, tileW = 161, h = 68, namePx = 22, glyphH = 32, inverse = false }) {
  const tile = (t) => nameTile({ text: t.text, w: tileW, h, px: namePx, id: t.day, pad: 6 });
  const cells = inverse
    ? [tile(left), chevron('left'), writingLane({ w: tileW, h, glyphH, role: 'mid', answer: today.day }), chevron('right'), tile(right)]
    : [writingLane({ w: laneW, h, glyphH, role: 'left', answer: left.day }), chevron('left'), tile(today), chevron('right'), writingLane({ w: laneW, h, glyphH, role: 'right', answer: right.day })];
  return `<div class="ws-lane ws-neighbourrow" style="padding:10px 16px;display:flex;align-items:center;justify-content:space-between;min-height:${h + 24}px" ` +
    `data-lcs-today="${esc(String(today.day))}"${inverse ? ' data-lcs-inverse="1"' : ''}>${cells.join('')}</div>`;
}

function abbrevPairs({ left, right, itemH = 78, leftW = 140, rightW = 300, abbrPx = 26, namePx = 24 }) {
  const text = (t, px) => `<span style="font-family:${F.display},cursive;font-weight:700;font-size:${px}px;line-height:${px + 4}px;color:${T.ink};white-space:nowrap">${esc(t)}</span>`;
  const l = left.map((x) => `<div class="ws-match-item ws-match-item--plain" style="width:${leftW}px;height:${itemH}px;flex:0 1 auto;min-height:${itemH - 12}px" data-lcs-abbr="${esc(String(x.day))}">` +
    text(x.text, abbrPx) + `<span class="ws-match-dot ws-match-dot--right"></span></div>`).join('');
  const r = right.map((x) => `<div class="ws-match-item" style="width:${rightW}px;height:${itemH}px;flex:0 1 auto;min-height:${itemH - 12}px" data-lcs-name="${esc(String(x.day))}">` +
    text(x.text, namePx) + `<span class="ws-match-dot ws-match-dot--left"></span></div>`).join('');
  return `<div class="ws-match-col" style="min-height:0" data-lcs-col="abbr">${l}</div><div class="ws-match-col" style="min-height:0" data-lcs-col="names">${r}</div>`;
}

module.exports = { nameTile, rankBox, orderRows, nameBank, railFlag, nameLadder, neighbourHeads, neighbourRow, abbrevPairs };
