/**
 * components-b4/five-senses.js — the K-355 `five-senses` family components
 * (design: docs/worksheet-gen/b4-designs/K-355-five-senses.md §2). Merged
 * into the templates/components-b4.js namespace; every name is type-scoped
 * (`sense…` / `organ…` / `whichSense…`) so no sibling family can collide.
 *
 * The one thing this family owns: object -> PRIMARY SENSE, anchored on the
 * five FIXED organ pictures `body parts/{eye, ear, nose, tongue, hand}` as the
 * constant answer key. Nothing here ever prints an answer: the truth lives in
 * `data-lcs-*` stamps; the only words a surface may print are the locale's
 * five sense VERBS (F1 pills / F4 bank / d3 organ words) and the five F5
 * starters — never a body-part noun, never an object noun.
 *
 * Exports:
 *   ORGANS     [{sense, noun}] in the FIXED chip-strip order see·hear·smell·
 *              taste·touch (eye ear nose tongue hand) — the same order on every
 *              surface (position + shape carry the weak nose picture)
 *   ORGAN_OF   {hear:'ear', see:'eye', smell:'nose', taste:'tongue', touch:'hand'}
 *   SENSE_OF   the inverse map (organ -> sense)
 *   senseMatch({pairs, order, itemW=170, itemH=122, iconPx=92, organWords=null, stamps})
 *              THE BASE: `.ws-match` two columns (page.css :354-391), items
 *              170 x itemH (the factory's 200 narrowed to widen the line zone
 *              to ~203 px), objects left (cream) with the coral dot on the
 *              right edge, the organs right (white) with the dot on the left
 *              edge, the right column in `order` (a derangement the spec
 *              proves). Container `padding:6px 40px`; 5 x 122 + 4 x 12 + 12 =
 *              670 <= 677 <= 722, slack into `space-around`. `organWords` =
 *              {sense: verb} literals (d3 only: Baloo 2 700 18 teal under the
 *              organ; byte-identical when null). Stamps data-ws-content +
 *              data-lcs-five-senses + data-lcs-layout="base" (+ `stamps`) on
 *              the root; left data-lcs-item="<theme>/<noun>" data-lcs-sense;
 *              right data-lcs-organ data-lcs-sense.
 *   senseSortStage({rows, bins, tile=84, iconPx=64, gap=12, organPx=44, zone=260, binH=185, stamps})
 *              F1: `<style>` (the science-category-sort `.sci-*` look cloned
 *              as `.fs-*` with §3 F1 numbers) + a strip of tile rows (`.fs-item`
 *              cream, border 2 #F0E4CB, r 14, padding 8, icon 64 -> tile 84,
 *              coral dot on the bottom edge) + a FIXED line-zone block
 *              (`.fs-zone` 220..260, the K-357 SPARSE ruling: never
 *              `space-between`; the stage sits at the body top, the slack
 *              under the bins) + five `.fs-bin`s 123 x binH (white, teal 3,
 *              dashed top, r 0 0 18 18; 5 x 123 + 4 x 14 = 671) each with its
 *              verb pill (`.fs-bin-label`, Baloo 2 700 17, padding 6 12,
 *              nowrap) and the organ picture 44 centred at y 14. Stamps root
 *              data-lcs-layout="sort" + zone / bin-h / organ-px, tiles
 *              data-lcs-tile="<sense>" data-lcs-item, rows data-lcs-strip-row,
 *              the zone data-lcs-line-zone, bins data-lcs-bin, pills
 *              data-lcs-bin-label, organs data-lcs-bin-organ.
 *   whichSenseStage({rows, rowMin=76, gap=8, stamps})
 *              F2 root: `repeat(n, minmax(rowMin, 1fr))` — the grid FILLS the
 *              body (rows 76 at 677 → ~94 at the one-line chrome).
 *   senseOddGrid({rows:[{sense, html}], stamps})
 *              F3 root: `.ws-cardgrid` 1 x n (`minmax(0,1fr)`) with the row
 *              sense stamped on the CARD (data-lcs-row-sense).
 *   organLabelStage({bank, rows, rowMin=112, rowMax=128, gap=10, stamps})
 *              F4 root: the verb bank then the organ rows in
 *              `repeat(n, minmax(112, 128))`, align-content start (the
 *              slack stays under the last row).
 *   senseLaneStage({lanes, rowMin=126, rowMax=140, gap=8, stamps})
 *              F5 root: the lanes in `repeat(5, minmax(126, 140))`.
 *   organChips({order=ORGANS, tile=60, iconPx=46, gap=10, chipOrder='fixed', srcOf})
 *              F2: five rounded-SQUARE tiles (white, border 2 creamDeep, r 12 —
 *              NOT rings: the child's pencil circle must be the only circle on
 *              the row) = 5 x 60 + 4 x 10 = 340; data-lcs-chip="<organ>" per
 *              tile, data-lcs-chip-order on the strip.
 *   whichSenseRow({n, item, chips, tile=72, iconPx=60})
 *              F2: a white card r 12, border 2 creamDeep, grid `30px 72px 1fr
 *              340px` gap 12, padding 0 12: badge (30 teal circle, Baloo 2 700
 *              16 white) · object tile 72 (cream r 10, icon 60) · spacer ·
 *              chips. Stamps data-lcs-row data-lcs-n data-lcs-item data-lcs-sense.
 *   senseOddRow({items, oddIdx, box=96, iconPx=72, boxMax=120})
 *              F3: `.ws-card-stage` (space-evenly, padding 0 8) with four
 *              borderless boxes (the K-043 look) that GROW with the
 *              fractional row — `height:min(boxMax,100%)`, square, the
 *              picture 75 % of the box: exactly 96 / 72 at the 677 fi stack,
 *              120 / 90 at the one-line chrome (nt10-D SPARSE ruling; `box`
 *              / `iconPx` are the floors the stamps carry); the odd one
 *              data-lcs-odd="1"; every box data-lcs-item + data-lcs-item-sense.
 *   organLabelRow({organ, src, laneW=440, laneH=62, glyphH=36, organTile=84, organPx=72, starter=null})
 *              F4: `.ws-lane` (inline `padding:10px 12px`, inner 647) grid
 *              `84px 440px` gap 16: organ tile (white r 12, icon 72) +
 *              `writingRow({w:440, h:62, glyphH:36, xHeight:true})` (renders
 *              66; with `starter` — d1 only — a one-row rulingBlock carrying
 *              the verb's first letter). Stamps data-lcs-organ ONLY (the verb
 *              is never stamped — verify derives it from the organ + the bank).
 *   senseLane({organ, src, starter, rows=2, laneW=560, h=46, glyphH=30, draw=null, organTile=64, organPx=56})
 *              F5: `.ws-lane` (inline `padding:8px 12px`) grid `64px 560px`
 *              gap 12 (64 + 12 + 560 = 636 <= 647): organ tile 64 (icon 56) +
 *              `rulingBlock({rows, w:laneW, h, glyphH, starters:{0: starter},
 *              gap:6})` (= 106 high at 2 x 46; the starter is sized by
 *              starterFontPx from the MEASURED metrics, never 0.9 x glyphH).
 *              With `draw:{w,h}` (d1 only) the columns are `64px <laneW>px
 *              <w>px` and a C3 drawBox closes the row. Stamps data-lcs-organ.
 *
 * Palette: cream / creamDeep / white / teal / coral / ink / inkSoft tokens +
 * the two page.css tile hexes `#F0E4CB` (the `.ws-match-item` / `.sci-item`
 * border) and `#FBF3E4` (= cream). All CSS inline or in the F1 `<style>`,
 * scoped `.fs-*` (no page.css edit); qa/lints.js rejects off-palette SVG hex.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { esc } = require('../../primitives/_svg.js');
const { writingRow } = require('../../primitives/trace-path.js');
const { rulingBlock } = require('../components-b2.js');
const { drawBox } = require('../components-b3.js');

const T = tokens.color;
const F = tokens.font;
/** The page.css `.ws-match-item` / `.sci-item` border tint (page.css :370, :30 of science-category-sort). */
const TILE_BORDER = '#F0E4CB';

const ORGANS = [
  { sense: 'see', noun: 'eye' },
  { sense: 'hear', noun: 'ear' },
  { sense: 'smell', noun: 'nose' },
  { sense: 'taste', noun: 'tongue' },
  { sense: 'touch', noun: 'hand' },
];
const ORGAN_OF = Object.freeze(Object.fromEntries(ORGANS.map((o) => [o.sense, o.noun])));
const SENSE_OF = Object.freeze(Object.fromEntries(ORGANS.map((o) => [o.noun, o.sense])));

const stampAttrs = (stamps) => Object.entries(stamps || {}).map(([k, v]) => ` data-lcs-${k}="${esc(v)}"`).join('');
const icon = (src, px) => `<img class="ws-icon" src="${src}" alt="" style="width:${px}px;height:${px}px">`;

/* ---------------------------------------------------------------- base */
function senseMatch({ pairs, order, itemW = 170, itemH = 122, iconPx = 92, organWords = null, stamps }) {
  if (!Array.isArray(pairs) || !pairs.length) throw new Error('senseMatch: no pairs');
  if (!Array.isArray(order) || order.length !== pairs.length) throw new Error('senseMatch: order must index every pair');
  const box = `width:${itemW}px;height:${itemH}px`;
  const left = pairs.map((p) =>
    `<div class="ws-match-item" style="${box}" data-lcs-item="${esc(p.left.theme + '/' + p.left.noun)}" data-lcs-sense="${esc(p.left.sense)}">` +
    icon(p.left.src, iconPx) + `<span class="ws-match-dot ws-match-dot--right"></span></div>`).join('');
  const right = order.map((srcIdx) => {
    const p = pairs[srcIdx];
    const word = organWords && organWords[p.right.sense];
    if (organWords && !word) throw new Error('senseMatch: organWords has no verb for ' + p.right.sense);
    const inner = word
      ? `<span style="display:flex;flex-direction:column;align-items:center;gap:6px">${icon(p.right.src, iconPx)}` +
        `<span class="fs-organ-word" style="font-family:${F.display},cursive;font-weight:700;font-size:18px;line-height:24px;color:${T.teal};white-space:nowrap">${esc(word)}</span></span>`
      : icon(p.right.src, iconPx);
    return `<div class="ws-match-item ws-match-item--plain" style="${box}" data-lcs-organ="${esc(p.right.organ)}" data-lcs-sense="${esc(p.right.sense)}">` +
      inner + `<span class="ws-match-dot ws-match-dot--left"></span></div>`;
  }).join('');
  return `<div class="ws-match" data-ws-content data-lcs-five-senses data-lcs-layout="base" data-lcs-pairs="${pairs.length}" data-lcs-icon-px="${iconPx}" data-lcs-organ-words="${organWords ? 1 : 0}"${stampAttrs(stamps)} style="padding:6px 40px">` +
    `<div class="ws-match-col" data-lcs-col="objects">${left}</div>` +
    `<div class="ws-match-col" data-lcs-col="organs">${right}</div>` +
    `</div>`;
}

/* ---------------------------------------------------------------- F1 sort */
/* The line zone between the strip and the bins is a FIXED block (`.fs-zone`,
 * the K-357 reviewer ruling: 220..260, sized to what ten lines need, never
 * `space-between` — the design's "slack opens the line zone" read as 317 px
 * of blank paper at 722 and ~400 at the one-line chrome); the stage sits at
 * the TOP of the body and the page's slack falls under the bins. */
const SORT_CSS = `
.fs-sort{flex:0 0 auto;display:flex;flex-direction:column;justify-content:flex-start;min-height:0;padding:6px 0 8px}
.fs-zone{flex:0 0 auto}
.fs-strip{display:flex;flex-direction:column;align-items:center;gap:12px}
.fs-row{display:flex;justify-content:center;align-items:center;gap:12px;flex-wrap:nowrap}
.fs-item{position:relative;display:inline-flex;align-items:center;justify-content:center;background:${T.cream};border:2px solid ${TILE_BORDER};border-radius:14px;padding:8px}
.fs-item .fs-dot{position:absolute;bottom:-7px;left:50%;transform:translateX(-50%);width:11px;height:11px;border-radius:50%;background:${T.coral};border:2px solid ${T.white}}
.fs-bins{display:flex;justify-content:center;align-items:flex-end;gap:14px;padding-top:26px}
.fs-bin{flex:0 0 123px;height:185px;background:${T.white};border:3px solid ${T.teal};border-top:3px dashed ${T.teal};border-radius:0 0 18px 18px;position:relative;display:block}
.fs-bin-label{position:absolute;top:-26px;left:50%;transform:translateX(-50%);white-space:nowrap;background:${T.cream};border:2.5px solid ${T.teal};border-radius:999px;padding:6px 12px;font-family:${F.display},cursive;font-weight:700;font-size:17px;line-height:1.2;color:${T.teal}}
.fs-bin-organ{position:absolute;top:14px;left:50%;transform:translateX(-50%)}
`;
function senseSortStage({ rows, bins, tile = 84, iconPx = 64, gap = 12, organPx = 44, zone = 260, binH = 185, stamps }) {
  if (!Array.isArray(rows) || !rows.length) throw new Error('senseSortStage: no tile rows');
  if (!Array.isArray(bins) || !bins.length) throw new Error('senseSortStage: no bins');
  if (!(zone >= 220 && zone <= 260)) throw new Error(`senseSortStage: zone ${zone} outside 220..260 (the K-357 ruling)`);
  const pad = (tile - 4 - iconPx) / 2;
  if (pad < 0) throw new Error(`senseSortStage: icon ${iconPx} does not fit tile ${tile}`);
  const rowsHtml = rows.map((row, r) =>
    `<div class="fs-row" data-lcs-strip-row="${r + 1}" style="gap:${gap}px">` + row.map((it) =>
      `<span class="fs-item" style="padding:${pad}px" data-lcs-tile="${esc(it.sense)}" data-lcs-item="${esc(it.theme + '/' + it.noun)}">${icon(it.src, iconPx)}<span class="fs-dot"></span></span>`).join('') + `</div>`).join('');
  const binsHtml = bins.map((b) =>
    `<div class="ws-bin fs-bin" style="height:${binH}px" data-lcs-bin="${esc(b.sense)}">` +
    `<span class="fs-bin-label" data-lcs-bin-label>${esc(b.label)}</span>` +
    (b.src ? `<span class="fs-bin-organ" data-lcs-bin-organ="${esc(b.organ)}">${icon(b.src, organPx)}</span>` : '') +
    `</div>`).join('');
  return `<style>${SORT_CSS}</style>` +
    `<div class="fs-sort" data-ws-content data-lcs-five-senses data-lcs-layout="sort" data-lcs-tile="${tile}" data-lcs-icon-px="${iconPx}" data-lcs-organ-px="${organPx}" data-lcs-zone="${zone}" data-lcs-bin-h="${binH}"${stampAttrs(stamps)}>` +
    `<div class="fs-strip" data-lcs-strip style="gap:${gap}px">${rowsHtml}</div>` +
    `<div class="fs-zone" data-lcs-line-zone style="height:${zone}px"></div>` +
    `<div class="fs-bins" data-lcs-bins>${binsHtml}</div>` +
    `</div>`;
}

/* ---------------------------------------------------------------- F2 which */
function organChips({ order = ORGANS, tile = 60, iconPx = 46, gap = 10, chipOrder = 'fixed', srcOf }) {
  if (typeof srcOf !== 'function') throw new Error('organChips: srcOf(organ) is required');
  const chips = order.map((o) =>
    `<span class="fs-chip" data-lcs-chip="${esc(o.noun)}" style="display:inline-flex;align-items:center;justify-content:center;width:${tile}px;height:${tile}px;background:${T.white};border:2px solid ${T.creamDeep};border-radius:12px">${icon(srcOf(o.noun), iconPx)}</span>`).join('');
  return `<span class="fs-chips" data-lcs-chips data-lcs-chip-order="${esc(chipOrder)}" style="display:inline-flex;gap:${gap}px;justify-self:end">${chips}</span>`;
}
function whichSenseRow({ n, item, chips, tile = 72, iconPx = 60 }) {
  return `<div class="fs-which" data-lcs-row data-lcs-n="${n}" data-lcs-item="${esc(item.theme + '/' + item.noun)}" data-lcs-sense="${esc(item.sense)}" ` +
    `style="display:grid;grid-template-columns:30px ${tile}px 1fr 340px;column-gap:12px;align-items:center;padding:0 12px;background:${T.white};border:2px solid ${T.creamDeep};border-radius:12px;min-height:0;min-width:0">` +
    `<span class="fs-badge" style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:${T.teal};color:${T.white};font-family:${F.display},cursive;font-weight:700;font-size:16px">${n}</span>` +
    `<span class="fs-object" style="display:inline-flex;align-items:center;justify-content:center;width:${tile}px;height:${tile}px;background:${T.cream};border-radius:10px">${icon(item.src, iconPx)}</span>` +
    `<span></span>` + chips + `</div>`;
}
/** F2 stage: the rows in `repeat(n, minmax(rowMin, 1fr))` — the grid FILLS the body (rows open with the chrome, 76 at 677 → ~94 at the one-line en chrome). */
function whichSenseStage({ rows, rowMin = 76, gap = 8, stamps }) {
  if (!Array.isArray(rows) || !rows.length) throw new Error('whichSenseStage: no rows');
  return `<div class="fs-which-stage" data-ws-content data-lcs-five-senses data-lcs-layout="which" data-lcs-rows="${rows.length}" data-lcs-row-min="${rowMin}"${stampAttrs(stamps)} ` +
    `style="display:grid;grid-template-rows:repeat(${rows.length}, minmax(${rowMin}px, 1fr));gap:${gap}px;flex:1 1 auto;min-height:0">${rows.join('')}</div>`;
}

/* ---------------------------------------------------------------- F3 odd */
/**
 * The four boxes GROW with their fractional card row (`height:min(boxMax, 100%)`,
 * square, the picture 75 % of the box): at the 677 fi stack a box is exactly the
 * design's 96 / 72, at the one-line en chrome 120 / 90 — a 72 px picture in a
 * 151 px card read sparse (nt10-D ruling). `box` / `iconPx` are the FLOORS the
 * stamps carry; verify asserts the render never goes below them.
 */
function senseOddRow({ items, oddIdx, box = 96, iconPx = 72, boxMax = 120 }) {
  if (!Array.isArray(items) || items.length < 3) throw new Error('senseOddRow: needs >= 3 items');
  if (!(oddIdx >= 0 && oddIdx < items.length)) throw new Error('senseOddRow: oddIdx out of range');
  if (!(boxMax >= box)) throw new Error(`senseOddRow: boxMax ${boxMax} < box ${box}`);
  const pct = Math.round((iconPx / box) * 1000) / 10;
  const boxes = items.map((it, i) =>
    `<span data-lcs-item="${esc(it.theme + '/' + it.noun)}" data-lcs-item-sense="${esc(it.sense)}"${i === oddIdx ? ' data-lcs-odd="1"' : ''} ` +
    `style="display:inline-flex;align-items:center;justify-content:center;height:min(${boxMax}px,100%);min-height:${box}px;aspect-ratio:1/1">` +
    `<img class="ws-icon" src="${it.src}" alt="" style="width:${pct}%;height:${pct}%"></span>`).join('');
  return `<div class="ws-card-stage" style="justify-content:space-evenly;padding:0 8px" data-lcs-items="${items.length}">${boxes}</div>`;
}
/** F3 grid: `.ws-cardgrid` 1 x rows (`minmax(0,1fr)`: always fits the body) with the row sense stamped on the CARD (the cardGrid layout cannot stamp a section, so the sections are written here). */
function senseOddGrid({ rows, stamps }) {
  if (!Array.isArray(rows) || !rows.length) throw new Error('senseOddGrid: no rows');
  const cards = rows.map((r, i) =>
    `<section class="ws-card" data-lcs-card="${i + 1}" data-lcs-row-sense="${esc(r.sense)}"><span class="ws-card-badge">${i + 1}</span>${r.html}</section>`).join('\n');
  return `<div class="ws-cardgrid fs-odd-grid" data-ws-content data-lcs-five-senses data-lcs-layout="odd" data-lcs-rows="${rows.length}"${stampAttrs(stamps)} ` +
    `style="grid-template-columns:repeat(1, minmax(0,1fr));grid-template-rows:repeat(${rows.length}, minmax(0,1fr))">\n${cards}\n</div>`;
}

/* ---------------------------------------------------------------- F4 label */
function organLabelRow({ organ, src, laneW = 440, laneH = 62, glyphH = 36, organTile = 84, organPx = 72, starter = null }) {
  // d1 only: the verb's first letter pre-printed on the row (rulingBlock sizes it from the measured metrics); d2 = a bare writingRow
  const row = starter
    ? rulingBlock({ rows: 1, w: laneW, h: laneH, glyphH, starters: { 0: starter }, gap: 0 })
    : writingRow({ w: laneW, h: laneH, glyphH, xHeight: true }).svg;
  return `<div class="ws-lane fs-label" data-lcs-organ="${esc(organ)}" style="padding:10px 12px;display:grid;grid-template-columns:${organTile}px ${laneW}px;column-gap:16px;align-items:center">` +
    `<span class="fs-organ" style="display:inline-flex;align-items:center;justify-content:center;width:${organTile}px;height:${organTile}px;background:${T.white};border-radius:12px">${icon(src, organPx)}</span>` +
    `<span style="display:block;width:${laneW}px">${row}</span></div>`;
}
/**
 * F4 stage: the verb bank (wordBank, one row) then the organ rows in
 * `repeat(n, minmax(rowMin, rowMax))` gap 10 — the rows grow from 112 to a
 * 128 cap (the K-322 F4 precedent: uncapped 1fr rows of ~140 read emptier
 * than a 61 px leftover under a top-anchored stage), the page's slack stays
 * UNDER the last row.
 */
function organLabelStage({ bank, rows, rowMin = 112, rowMax = 128, gap = 10, stamps }) {
  if (!Array.isArray(rows) || !rows.length) throw new Error('organLabelStage: no rows');
  if (!(rowMax >= rowMin)) throw new Error(`organLabelStage: rowMax ${rowMax} < rowMin ${rowMin}`);
  return `<div class="fs-label-stage" data-ws-content data-lcs-five-senses data-lcs-layout="label" data-lcs-rows="${rows.length}" data-lcs-row-min="${rowMin}" data-lcs-row-max="${rowMax}"${stampAttrs(stamps)} ` +
    `style="display:flex;flex-direction:column;flex:1 1 auto;min-height:0">` + (bank || '') +
    `<div class="fs-label-rows" data-lcs-label-rows style="display:grid;grid-template-rows:repeat(${rows.length}, minmax(${rowMin}px, ${rowMax}px));gap:${gap}px;flex:1 1 auto;min-height:0;align-content:start">${rows.join('')}</div>` +
    `</div>`;
}

/* ---------------------------------------------------------------- F5 write */
function senseLane({ organ, src, starter, rows = 2, laneW = 560, h = 46, glyphH = 30, draw = null, organTile = 64, organPx = 56 }) {
  if (typeof starter !== 'string' || !starter.trim()) throw new Error('senseLane: a starter literal is required');
  const block = rulingBlock({ rows, w: laneW, h, glyphH, starters: { 0: starter }, gap: 6 });
  const cols = draw ? `${organTile}px ${laneW}px ${draw.w}px` : `${organTile}px ${laneW}px`;
  return `<div class="ws-lane fs-write" data-lcs-organ="${esc(organ)}" data-lcs-rows="${rows}" style="padding:8px 12px;display:grid;grid-template-columns:${cols};column-gap:12px;align-items:center">` +
    `<span class="fs-organ" style="display:inline-flex;align-items:center;justify-content:center;width:${organTile}px;height:${organTile}px;background:${T.white};border-radius:12px">${icon(src, organPx)}</span>` +
    `<span style="display:block;width:${laneW}px">${block}</span>` +
    (draw ? `<span style="display:block">${drawBox({ w: draw.w, h: draw.h })}</span>` : '') +
    `</div>`;
}
/** F5 stage: the five lanes in `repeat(5, minmax(rowMin, rowMax))` gap 8 (126 at 677, capped at 140; the slack stays under the last lane). */
function senseLaneStage({ lanes, rowMin = 126, rowMax = 140, gap = 8, stamps }) {
  if (!Array.isArray(lanes) || !lanes.length) throw new Error('senseLaneStage: no lanes');
  if (!(rowMax >= rowMin)) throw new Error(`senseLaneStage: rowMax ${rowMax} < rowMin ${rowMin}`);
  return `<div class="fs-write-stage" data-ws-content data-lcs-five-senses data-lcs-layout="write" data-lcs-lanes="${lanes.length}" data-lcs-row-min="${rowMin}" data-lcs-row-max="${rowMax}"${stampAttrs(stamps)} ` +
    `style="display:grid;grid-template-rows:repeat(${lanes.length}, minmax(${rowMin}px, ${rowMax}px));gap:${gap}px;flex:1 1 auto;min-height:0;align-content:start">${lanes.join('')}</div>`;
}

module.exports = { ORGANS, ORGAN_OF, SENSE_OF, senseMatch, senseSortStage, organChips, whichSenseRow, whichSenseStage, senseOddRow, senseOddGrid, organLabelRow, organLabelStage, senseLane, senseLaneStage };
