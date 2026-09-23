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
 * FACE components named by §2 (viewColumns · viewGlyph · roseCard · worldMapCard ·
 * atlasIndex · directionRow) are Phase 2 (the faces) and are NOT built here yet; their
 * primitives (top-side-view, compass-rose, world-map) ARE built and gated — recorded in
 * docs/worksheet-gen/b5-designs/_work/G1-379-build.md.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, el, esc } = require('../../primitives/_svg.js');
const { mapSymbol } = require('../../primitives/map-symbol.js');
const { blankNumeralBox } = require('../components-b3.js');

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

module.exports = { mapSheet, legendBand, legendHeight, countStrip, northArrow };
