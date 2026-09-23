/**
 * components-b5/plants.js — the G1-376 `plants` components (nt10-E; design
 * docs/worksheet-gen/b5-designs/G1-376-plants.md §2 "NEW templates/components-b5/plants.js").
 * Pure markup on the tokens; the SPEC composes, stamps and guards.
 *
 * BASE (built 2026-09-23):
 *   plantTagStage({ parts, anchorPick, numbers, h=600, w=380 })
 *     the tall plant (primitives/plant-figure.js plantFigure, ground 'box') centred
 *     in a w x h cell, one coral numbered tag per part on a thread to its ring.
 *     Returns { html, anchors (px, relative to the stage), tagSlots, offsetX }.
 *   plantLabelCard({ rows, rowH=64, glyphH=30, boxW=205, cardW=279 })
 *     a cream .ws-card: per row [teal ring badge 40 + Baloo 22 numeral][10][.ws-blankbox boxW x rowH
 *     holding writingRow({w: boxW-6, h: rowH-6, glyphH, xHeight:true})]; rows empty; data-lcs-row-n.
 *   plantBank({ words:[{id, word}], wordPx=18 })   -> components-b2 wordBank (data-lcs-bank = part id)
 *
 * FACE components named by §2 (needUnit · cycleRing · cycleStrip · eatCard · jobCard ·
 * flowerStage) are Phase 2 (the faces) and are NOT built here yet — recorded in
 * _work/G1-376-build.md. (cycleRing is the one G1-377 may import; its critic rules.)
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, el } = require('../../primitives/_svg.js');
const { writingRow } = require('../../primitives/trace-path.js');
const { plantFigure } = require('../../primitives/plant-figure.js');
const { wordBank } = require('../components-b2.js');

const T = tokens.color;
const F = tokens.font;
const BADGE = 40, BADGE_GAP = 10, ROW_GAP = 14, CARD_PAD = 12, CARD_BORDER = 2;

function plantTagStage({ parts, anchorPick = {}, numbers, h = 600, w = 380 }) {
  const tags = parts.map((p) => ({ part: p, n: numbers[p], pick: anchorPick[p] || 0 }));
  const fig = plantFigure({ stage: 'full', ground: 'box', h, tags });
  const offsetX = (w - fig.width) / 2;
  const anchors = {}, tagSlots = {};
  for (const p of parts) {
    anchors[p] = { x: +(fig.anchors[p].x + offsetX).toFixed(1), y: fig.anchors[p].y };
    tagSlots[p] = { x: +(fig.tagSlots[p].x + offsetX).toFixed(1), y: fig.tagSlots[p].y };
  }
  const html = `<div data-lcs-plant-stage data-lcs-offset-x="${offsetX.toFixed(1)}" style="position:relative;width:${w}px;height:${h}px;flex:0 0 ${w}px">` +
    `<div style="position:absolute;left:${offsetX.toFixed(1)}px;top:0">${fig.svg}</div></div>`;
  return { html, anchors, tagSlots, offsetX, scale: fig.scale };
}

function rowBadge(n) {
  return svgRoot({ width: BADGE, height: BADGE, label: 'number ' + n },
    el('circle', { cx: 20, cy: 20, r: 18, fill: T.white, stroke: T.teal, 'stroke-width': 3 }) +
    el('text', { x: 20, y: 21, 'font-family': `${F.display}, cursive`, 'font-size': 22, 'font-weight': 700, fill: T.teal, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, String(n)),
    { 'data-lcs-row-badge': n, style: 'display:block;flex:0 0 auto' });
}

function plantLabelCardHeight({ rows, rowH }) { return rows * rowH + (rows - 1) * ROW_GAP + 2 * CARD_PAD + 2 * CARD_BORDER; }

function plantLabelCard({ rows, rowH = 64, glyphH = 30, boxW = 205, cardW = 279 }) {
  const inner = rows.map((n) =>
    `<div data-lcs-card-row="${n}" style="display:flex;align-items:center;gap:${BADGE_GAP}px;height:${rowH}px">` + rowBadge(n) +
    `<span class="ws-blankbox" data-lcs-row-n="${n}" style="width:${boxW}px;height:${rowH}px;flex:0 0 ${boxW}px;box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center">` +
    writingRow({ w: boxW - 6, h: rowH - 6, glyphH, xHeight: true }).svg + `</span></div>`).join('');
  return `<div class="ws-card" data-lcs-label-card style="width:${cardW}px;box-sizing:border-box;flex:0 0 auto;gap:${ROW_GAP}px;padding:${CARD_PAD}px;border-radius:16px;border-width:${CARD_BORDER}px">${inner}</div>`;
}

function plantBank({ words, wordPx = 18 }) {
  return wordBank({ words: words.map((w) => ({ word: w.word, vocabKey: w.id })), wordPx });
}

module.exports = { plantTagStage, plantLabelCard, plantLabelCardHeight, plantBank };
