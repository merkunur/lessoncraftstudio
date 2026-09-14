/**
 * components-b3/days-and-months.js — the K-321 `days-and-months` family
 * components (design: docs/worksheet-gen/b3-designs/K-321-days-and-months.md
 * §2). Merged into the templates/components-b3.js namespace; every name is
 * the one the design file declares NEW (the namespace refuses a duplicate).
 *
 * Base-page exports (Phase 1). The face components the design names for
 * Phase 2 (`nameBank`, `nameLadder`, `railFlag`, `neighbourRow`) are added
 * here when those faces are built — never ahead of their spec.
 *
 *   nameTile({ text, w, h = 60, px = 26, id })
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

function nameTile({ text, w = 440, h = 60, px = 26, id }) {
  const idAttr = id === undefined || id === null ? '' : ` data-lcs-day="${esc(String(id))}"`;
  return `<span class="ws-nametile" style="display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;` +
    `width:${w}px;height:${h}px;padding:0 10px;background:${T.cream};border:2px solid ${T.creamDeep};border-radius:12px;` +
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

module.exports = { nameTile, rankBox, orderRows };
