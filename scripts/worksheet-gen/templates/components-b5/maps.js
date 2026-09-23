/**
 * components-b5/maps.js — the G1-379 `maps` components (nt10-E; design
 * docs/worksheet-gen/b5-designs/G1-379-maps.md §2 "NEW templates/components-b5/maps.js").
 * Pure markup on the tokens (scoped inline CSS, no page.css edit); the SPEC composes,
 * stamps and guards.
 *
 * BASE (built 2026-09-23): "the island on the wall" — ONE printed map sheet.
 *   mapSheet({ field, legend, w = 639 })
 *     .mp-sheet: white, frame teal 3 r 16, a grid-1.5 NEAT LINE inset 6; padding 9 so the
 *     615 px field sits at x 12 / y 12 (border 3 + 9); the legend band docked INSIDE the same
 *     frame, 8 px under the field — where a printed map puts its legend.
 *   legendBand({ title, rows:[{id, word}], cols = 3, bandW = 595, symPx = 44 })
 *     tab 28 (title Baloo 2 700 16 white on a teal pill) + 8 + ceil(n/cols) rows x 52 (gap 6);
 *     a cell = [white 48 box, grid 1.5, r 8, the symbol at symPx][8][word Nunito 800 17,
 *     <= 2 lines]; data-lcs-key=<id> on each cell, data-lcs-key-word on the word.
 *   countStrip({ cards:[{id, word, answer, symbol?}], w = 639, gap = 11, boxW = 64, boxH = 48 })
 *     the five (d1 4 / d3 6) word cards under the sheet: white, border 2 teal, r 12, padding 8;
 *     [symbol 44 when the card carries one (d1 scaffold)] + word band 44 (Nunito 800 17,
 *     <= 2 lines) + 8 + an OPEN blankNumeralBox(boxW x boxH) carrying the hidden count;
 *     data-lcs-row=<id>, data-lcs-row-word on the word.
 *   northArrow({ letter })   the island's north arrow as a standalone 40 x 56 svg (same
 *     markup the island draws in its top-right sea).
 *
 * FACES (Phase E, 2026-09-23; record docs/worksheet-gen/b5-designs/_work/G1-379-faces.md):
 *   mpGap({ min })                      a capped flexible band between two blocks (flex 1 1 0,
 *     min-height min, max-height 36): the page's slack is shared between the bands up to 36 px
 *     each (the SPARSE cap is 40) and only what is left falls BELOW the last block (FILL).
 *   viewGlyph({ from:'side'|'above' })  F1 wordless column head: an eye whose iris looks the
 *     way a coral arrow points (right = from the side; down = from above). 64 x 52.
 *   viewHeads / viewPair                F1 (the design's viewColumns, composed per ROW so both
 *     views of a row share one height): [cream item: the SIDE view standing on a teal 3 ground
 *     line][coral dot] … [coral dot][white map tile, teal 1.5, r 8: the TOP view];
 *     data-lcs-item="side|top" + data-lcs-model.
 *   roseCard / roseRow                  F2 cream cards holding one compassRose each.
 *   worldMapCard({ map })               F3 / F4 the world map in a teal 2 frame, no padding.
 *   nameBank({ names })                 F3 the continent names (the .ws-bank chips, margin 0).
 *   nameLane / laneRow                  F3 one numbered writing lane per continent (the hidden
 *     member id on the lane's data-lcs-answer), 2 per row.
 *   atlasRow({ entries, nameW, box, rowH }) F4 one row of the atlas-style index: [name <= 2
 *     lines][OPEN blankNumeralBox] per entry, 3 per row (the design's atlasIndex, per row).
 *   directionRow({ n, start, startSvg, word, dir, chips, answer }) F5.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, el, esc } = require('../../primitives/_svg.js');
const { mapSymbol } = require('../../primitives/map-symbol.js');
const { blankNumeralBox } = require('../components-b3.js');
const { writingRow } = require('../../primitives/trace-path.js');

const T = tokens.color;
const F = tokens.font;

const SHEET_BORDER = 3, SHEET_PAD = 9, NEAT_INSET = 6;
const TAB_H = 28, TAB_GAP = 8, ROW_H = 52, ROW_GAP = 6, SYM_BOX = 48, CELL_GAP = 8;
const WORD_PX = 17;

function mapSheet({ field, legend, w = 639 }) {
  return `<div class="mp-sheet" data-lcs-map-sheet style="position:relative;width:${w}px;box-sizing:border-box;flex:0 0 auto;background:${T.white};border:${SHEET_BORDER}px solid ${T.teal};border-radius:16px;padding:${SHEET_PAD}px;display:flex;flex-direction:column;align-items:center;gap:8px">` +
    `<div aria-hidden="true" data-lcs-neatline style="position:absolute;left:${NEAT_INSET - SHEET_BORDER}px;top:${NEAT_INSET - SHEET_BORDER}px;right:${NEAT_INSET - SHEET_BORDER}px;bottom:${NEAT_INSET - SHEET_BORDER}px;border:1.5px solid ${T.grid};border-radius:11px;pointer-events:none"></div>` +
    `<div class="mp-field" data-lcs-field style="position:relative;line-height:0">${field}</div>` +
    legend + `</div>`;
}

function legendHeight({ n, cols = 3 }) { const r = Math.ceil(n / cols); return TAB_H + TAB_GAP + r * ROW_H + (r - 1) * ROW_GAP; }

function legendBand({ title, rows, cols = 3, bandW = 595, symPx = 44 }) {
  const colW = bandW / cols;
  const box = Math.max(SYM_BOX, symPx + 4);   // the symbol at FULL size inside its 1.5 px frame (d1 48 -> 52)
  const wordW = Math.floor(colW - box - CELL_GAP - 8);
  const cells = rows.map((r) =>
    `<div data-lcs-key="${esc(r.id)}" style="display:flex;align-items:center;gap:${CELL_GAP}px;height:${ROW_H}px;min-width:0">` +
    `<span data-lcs-key-sym style="display:inline-flex;align-items:center;justify-content:center;width:${box}px;height:${box}px;flex:0 0 ${box}px;box-sizing:border-box;background:${T.white};border:1.5px solid ${T.grid};border-radius:8px">` +
    mapSymbol({ id: r.id, px: symPx }).svg + `</span>` +
    `<span data-lcs-key-word style="display:block;width:${wordW}px;font-family:${F.body},sans-serif;font-weight:800;font-size:${WORD_PX}px;line-height:1.2;color:${T.ink};overflow-wrap:normal;word-break:normal;hyphens:manual">${esc(r.word)}</span></div>`).join('');
  return `<div class="mp-legend" data-lcs-legend data-lcs-legend-cols="${cols}" style="width:${bandW}px;box-sizing:border-box;border-top:1.5px solid ${T.grid};padding-top:0;display:flex;flex-direction:column;align-items:flex-start">` +
    `<span data-lcs-key-title style="margin-top:-1px;display:inline-flex;align-items:center;height:${TAB_H}px;padding:0 14px;border-radius:0 0 12px 12px;background:${T.teal};color:${T.white};font-family:${F.display},cursive;font-weight:700;font-size:16px;line-height:1;white-space:nowrap">${esc(title)}</span>` +
    `<div style="height:${TAB_GAP}px"></div>` +
    `<div style="display:grid;grid-template-columns:repeat(${cols},${colW.toFixed(2)}px);row-gap:${ROW_GAP}px;width:${bandW}px">${cells}</div></div>`;
}

function countStrip({ cards, w = 639, gap = 11, boxW = 64, boxH = 48 }) {
  const n = cards.length;
  const cardW = Math.floor((w - (n - 1) * gap) / n);
  const items = cards.map((c) =>
    `<div class="mp-card" data-lcs-row="${esc(c.id)}" style="width:${cardW}px;box-sizing:border-box;flex:0 0 ${cardW}px;background:${T.white};border:2px solid ${T.teal};border-radius:12px;padding:8px;display:flex;flex-direction:column;align-items:center;gap:8px">` +
    (c.symbol ? `<span data-lcs-row-sym style="display:block;line-height:0">${mapSymbol({ id: c.id, px: 44 }).svg}</span>` : '') +
    `<span data-lcs-row-word style="display:flex;align-items:center;justify-content:center;height:44px;width:100%;text-align:center;font-family:${F.body},sans-serif;font-weight:800;font-size:${WORD_PX}px;line-height:1.2;color:${T.ink};overflow-wrap:normal;word-break:normal;hyphens:manual">${esc(c.word)}</span>` +
    // wrapped in a ROW: blankNumeralBox carries flex:0 0 <w>px, which in this column card would set its HEIGHT (measured 64, not 48)
    `<span style="display:flex;justify-content:center;flex:0 0 auto">` + blankNumeralBox({ w: boxW, h: boxH, answer: String(c.answer), attrs: `data-lcs-count-box="${esc(c.id)}"` }) + `</span>` +
    `</div>`).join('');
  return `<div class="mp-strip" data-lcs-count-strip style="display:flex;gap:${gap}px;width:${w}px;justify-content:center;flex:0 0 auto">${items}</div>`;
}

function northArrow({ letter }) {
  return svgRoot({ width: 40, height: 56, viewBox: '0 0 40 56', label: '' },
    el('path', { d: 'M20 26 L20 48 L10 54 Z', fill: T.teal }) + el('path', { d: 'M20 26 L30 54 L20 48 Z', fill: T.white }) +
    el('path', { d: 'M20 26 L30 54 L20 48 L10 54 Z', fill: 'none', stroke: T.teal, 'stroke-width': 2, 'stroke-linejoin': 'round' }) +
    el('circle', { cx: 20, cy: 12, r: 12, fill: T.white, stroke: T.teal, 'stroke-width': 1.5 }) +
    el('text', { x: 20, y: 13, 'font-family': `${F.display}, cursive`, 'font-size': 18, 'font-weight': 700, fill: T.ink, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, letter),
    { 'data-lcs-north': letter });
}

/* ------------------------------------------------------------------ FACES */
const GAP_CAP = 36;
function mpGap({ min = 8 } = {}) {
  return `<div data-lcs-gap aria-hidden="true" style="flex:1 1 0;min-height:${min}px;max-height:${GAP_CAP}px;width:100%"></div>`;
}

/** An eye (almond, white, ink 2.5) whose iris sits toward the way it looks. */
function eyeAt(cx, cy, look) {
  const dx = look === 'right' ? 5 : 0, dy = look === 'down' ? 3.5 : 0;
  return el('path', { d: `M${cx - 17} ${cy} Q${cx} ${cy - 14} ${cx + 17} ${cy} Q${cx} ${cy + 14} ${cx - 17} ${cy} Z`, fill: T.white, stroke: T.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }) +
    el('circle', { cx: cx + dx, cy: cy + dy, r: 6.5, fill: T.teal }) + el('circle', { cx: cx + dx, cy: cy + dy, r: 2.6, fill: T.ink });
}
function viewGlyph({ from }) {
  let body;
  if (from === 'side') body = eyeAt(18, 26, 'right') + el('path', { d: 'M38 26 L58 26 M50 18 L59 26 L50 34', fill: 'none', stroke: T.coral, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  else if (from === 'above') body = eyeAt(32, 12, 'down') + el('path', { d: 'M32 27 L32 48 M24 40 L32 49 L40 40', fill: 'none', stroke: T.coral, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  else throw new Error(`viewGlyph: from "${from}" ∉ side | above`);
  return svgRoot({ width: 64, height: 52, viewBox: '0 0 64 52', label: '' }, body, { 'data-lcs-view-glyph': from, style: 'display:block' });
}

const DOT = (side) => `<span data-lcs-match-dot="${side}" style="display:block;width:12px;height:12px;border-radius:50%;background:${T.coral};flex:0 0 12px"></span>`;
/**
 * One F1 pair row: the side view (cream item, standing on a ground line) at the left, the top
 * view (white map tile) at the right. side = {svg, x0, w} of the primitive (box x box px).
 */
function viewPair({ leftModel, rightModel, side, top, box, itemW = 124, tileW = 112, rowH = 112, w = 560 }) {
  const g = box + 8;   // the side svg + its ground line
  const sideSvg = svgRoot({ width: box + 8, height: g, viewBox: `-4 0 ${box + 8} ${g}`, label: '' },
    side.svg + el('line', { x1: +(side.x0 - 4).toFixed(2), y1: box + 3, x2: +(side.x0 + side.w + 4).toFixed(2), y2: box + 3, stroke: T.teal, 'stroke-width': 3, 'stroke-linecap': 'round', 'data-lcs-ground': '' }),
    { style: 'display:block;overflow:visible' });
  return `<div data-lcs-pair-row style="display:flex;align-items:center;justify-content:space-between;width:${w}px;height:${rowH}px;flex:0 0 auto">` +
    `<div style="display:flex;align-items:center;gap:10px">` +
    `<div data-lcs-item="side" data-lcs-model="${esc(leftModel)}" style="width:${itemW}px;height:${rowH}px;box-sizing:border-box;background:${T.cream};border:2px solid ${T.creamDeep};border-radius:14px;display:flex;align-items:center;justify-content:center">${sideSvg}</div>` +
    DOT('left') + `</div>` +
    `<div style="display:flex;align-items:center;gap:10px">` + DOT('right') +
    `<div data-lcs-item="top" data-lcs-model="${esc(rightModel)}" style="width:${tileW}px;height:${rowH}px;box-sizing:border-box;background:${T.white};border:1.5px solid ${T.teal};border-radius:8px;display:flex;align-items:center;justify-content:center">${top}</div>` +
    `</div></div>`;
}
function viewHeads({ w = 560, itemW = 124, tileW = 112 } = {}) {
  return `<div data-lcs-view-heads style="display:flex;justify-content:space-between;width:${w}px;flex:0 0 auto">` +
    `<div style="width:${itemW}px;display:flex;justify-content:center">${viewGlyph({ from: 'side' })}</div>` +
    `<div style="width:${tileW}px;display:flex;justify-content:center">${viewGlyph({ from: 'above' })}</div></div>`;
}

function roseCard({ rose, i, w = 312, h = 220 }) {
  return `<div data-lcs-rose-card="${i}" style="width:${w}px;height:${h}px;box-sizing:border-box;flex:0 0 ${w}px;background:${T.cream};border:2px solid ${T.creamDeep};border-radius:14px;display:flex;align-items:center;justify-content:center">${rose}</div>`;
}
function roseRow({ cards, w = 639, gap = 15 }) {
  return `<div data-lcs-rose-row style="display:flex;justify-content:center;gap:${gap}px;width:${w}px;flex:0 0 auto">${cards.join('')}</div>`;
}

function worldMapCard({ map, w = 639 }) {
  return `<div data-lcs-world-card style="width:${w}px;box-sizing:border-box;border:2px solid ${T.teal};border-radius:10px;overflow:hidden;line-height:0;flex:0 0 auto">${map}</div>`;
}

function nameBank({ names, w = 639, px = 17 }) {
  return `<div class="ws-scene-banner ws-bank" data-lcs-bank-banner style="margin:0;width:${w}px;box-sizing:border-box;flex:0 0 auto">` +
    names.map((n) => `<span class="ws-bankword" style="font-size:${px}px" data-lcs-bank-word="${esc(n.id)}"><span>${esc(n.name)}</span></span>`).join('') + `</div>`;
}

function nameLane({ n, answer, laneW, laneH, glyphH }) {
  // the ruling is laneW - 3 wide inside a border-box lane of laneW x (laneH + 3): its 1.5 px frame never pushes the svg out (measured: a 3 px spill under the footer)
  const row = writingRow({ w: laneW - 3, h: laneH, glyphH, xHeight: true }).svg;
  return `<div data-lcs-lane="${n}" style="display:flex;align-items:center;gap:10px">` +
    `<span data-lcs-lane-n style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;flex:0 0 40px;box-sizing:content-box;border-radius:50%;background:${T.coral};border:2px solid ${T.white};box-shadow:0 0 0 1.5px ${T.coral};font-family:${F.display},cursive;font-weight:700;font-size:21px;color:${T.white}">${n}</span>` +
    `<span class="ws-blankbox" data-lcs-answer="${esc(answer)}" style="box-sizing:border-box;width:${laneW}px;height:${laneH + 3}px;line-height:0;border:1.5px solid ${T.grid};overflow:hidden">${row}</span></div>`;
}
function laneRow({ lanes, w = 639, gap = 15 }) {
  return `<div data-lcs-lane-row style="display:flex;justify-content:flex-start;gap:${gap}px;width:${w}px;flex:0 0 auto">${lanes.join('')}</div>`;
}

function atlasRow({ entries, nameW = 150, box = [44, 40], rowH = 56, w = 639, gap = 13.5 }) {
  const items = entries.map((e) =>
    `<div data-lcs-index="${esc(e.id)}" data-lcs-kind="${e.kind}" style="display:flex;align-items:center;gap:10px;width:${nameW + 10 + box[0]}px;height:${rowH}px;box-sizing:border-box;border-bottom:1.5px dotted ${T.grid}">` +
    `<span data-lcs-index-name style="display:block;width:${nameW}px;font-family:${F.body},sans-serif;font-weight:800;font-size:17px;line-height:1.2;color:${T.ink};overflow-wrap:normal;word-break:normal;hyphens:manual">${esc(e.name)}</span>` +
    blankNumeralBox({ w: box[0], h: box[1], answer: String(e.n), attrs: `data-lcs-index-box="${esc(e.id)}"` }) + `</div>`).join('');
  return `<div data-lcs-index-row style="display:flex;gap:${gap}px;width:${w}px;justify-content:flex-start;flex:0 0 auto">${items}</div>`;
}

function directionRow({ n, start, startSvg, word, dir, chips, answer }) {
  const chip = (c) => `<span data-lcs-chip="${esc(c.id)}" style="display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;flex:0 0 52px;box-sizing:border-box;border-radius:50%;background:${T.white};border:1.5px solid ${T.teal}">${c.svg}</span>`;
  return `<div data-lcs-dir-row="${n}" data-lcs-start="${esc(start)}" data-lcs-dir="${dir}" data-lcs-answer="${esc(answer)}" style="display:flex;align-items:center;height:52px;flex:0 0 auto">` +
    `<span data-lcs-row-badge style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;flex:0 0 28px;border-radius:50%;background:${T.teal};color:${T.white};font-family:${F.display},cursive;font-weight:700;font-size:17px">${n}</span>` +
    `<span data-lcs-start-frame style="position:relative;display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;flex:0 0 48px;margin-left:8px;box-sizing:border-box;border:2px solid ${T.teal};border-radius:8px;background:${T.white}">${startSvg}` +
    `<span data-lcs-pin style="position:absolute;left:-6px;top:-6px;width:10px;height:10px;border-radius:50%;background:${T.coral};border:1.5px solid ${T.white}"></span></span>` +
    `<span data-lcs-dir-word style="display:inline-flex;align-items:center;justify-content:center;width:130px;height:44px;flex:0 0 130px;margin-left:8px;box-sizing:border-box;border:2px solid ${T.coral};border-radius:22px;background:${T.white};font-family:${F.display},cursive;font-weight:700;font-size:17px;color:${T.ink}">${esc(word)}</span>` +
    `<span data-lcs-chips style="display:inline-flex;gap:16px;margin-left:24px">${chips.map(chip).join('')}</span></div>`;
}

module.exports = { mapSheet, legendBand, legendHeight, countStrip, northArrow,
  mpGap, viewGlyph, viewPair, viewHeads, roseCard, roseRow, worldMapCard, nameBank, nameLane, laneRow, atlasRow, directionRow };
