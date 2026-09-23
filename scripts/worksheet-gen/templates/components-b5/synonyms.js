/**
 * components-b5/synonyms.js — the G2-358 `synonyms` components (nt10-E; design
 * docs/worksheet-gen/b5-designs/G2-358-synonyms.md §2). Every export is
 * prefixed `syn` (templates/components-b5.js refuses a duplicate name across
 * the ten families). Palette tokens only; every function throws on a missing
 * required argument.
 *
 * BASE (built 2026-09-23):
 *   synSameLink({w, h, ground})   the teal JOINED-RINGS mark: two interlocking rounded
 *                                 rings (A passes over B once and under it once), the
 *                                 semantic inverse of the opposites double arrow.
 *                                 Decorative (aria-hidden); min 24 x 14, stroke stays 3.
 *   synTwinGrid({cards, rows, rowMin, rowGap})
 *                                 the 2-column card grid (cardGrid's .ws-cardgrid /
 *                                 .ws-card / .ws-card-badge markup) with a configurable
 *                                 row gap and minmax(rowMin, 1fr) rows — cardGrid
 *                                 hard-codes minmax(0,1fr) + gap 14 and .ws-card is
 *                                 overflow:hidden (a silent clip at the 677 chrome).
 *                                 Cards spread their slack with space-evenly.
 *   synTwinCard({target, groupId, domain, concept, tags, answerSlot, targetPx, chipPx, chipH, grid})
 *                                 the tealSoft BAND (rings + one big target word) over a
 *                                 square of identical white word TAGS (grid '2x2' = 4
 *                                 tags, '3x1' = 3 stacked tags). No data-lcs-answer: the
 *                                 answer is DERIVED (the one tag whose group = the target's).
 *
 * FACES (Phase 2, not built here): synPictureCard, synStrengthKey, synRamp, synShadeRow,
 * synSayBubble, synSayRow, synFieldPlot, and F2's half-ring tags (synLinkTag; the sock was
 * RETIRED 2026-09-23 by lead ruling — it read as a luggage tag in greyscale).
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { esc } = require('../../primitives/_svg.js');

const T = tokens.color;
const F = tokens.font;
const GROUNDS = [T.tealSoft, T.cream, T.white];
const MAX_GLYPHS = { '2x2': 13, '3x1': 13 };

function glyphs(s) { return [...String(s)].length; }

function synSameLink({ w = 30, h = 18, ground = T.tealSoft } = {}) {
  if (!GROUNDS.map((g) => g.toUpperCase()).includes(String(ground).toUpperCase())) throw new Error(`synSameLink: ground ${ground} is not tealSoft / cream / white`);
  if (w < 24 || h < 14) throw new Error(`synSameLink: ${w} x ${h} below the 24 x 14 minimum`);
  const sw = 3 * 30 / w;   // the stroke stays 3 px at any drawn size
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 30 18" aria-hidden="true" data-lcs-same-link="1" style="display:block;flex:0 0 ${w}px;overflow:visible">` +
    `<rect x="1.5" y="3" width="17" height="12" rx="6" fill="none" stroke="${T.teal}" stroke-width="${sw.toFixed(2)}"/>` +
    `<rect x="11.5" y="3" width="17" height="12" rx="6" fill="none" stroke="${T.teal}" stroke-width="${sw.toFixed(2)}"/>` +
    `<rect x="12.5" y="1.5" width="4" height="3" fill="${ground}" stroke="none"/>` +
    `<path d="M13 3 H 12.5 A6 6 0 0 1 18.5 9" fill="none" stroke="${T.teal}" stroke-width="${sw.toFixed(2)}"/>` +
    `</svg>`;
}

function synTwinGrid({ cards, rows, rowMin, rowGap = 12, colGap = 14, attrs = '' }) {
  if (!Array.isArray(cards) || !cards.length) throw new Error('synTwinGrid: cards[] required');
  if (!Number.isInteger(rows) || rows * 2 < cards.length) throw new Error(`synTwinGrid: ${cards.length} cards do not fit ${rows} rows x 2`);
  if (!Number.isFinite(rowMin) || rowMin <= 0) throw new Error('synTwinGrid: rowMin required');
  const items = cards.map((inner, i) => `<section class="ws-card" data-lcs-card="${i + 1}" style="justify-content:space-evenly;padding:12px">` +
    `<span class="ws-card-badge">${i + 1}</span>${inner}</section>`).join('\n');
  return `<div class="ws-cardgrid" data-lcs-syn-grid${attrs ? ' ' + attrs : ''} style="grid-template-columns:repeat(2,minmax(0,1fr));` +
    `grid-template-rows:repeat(${rows},minmax(${rowMin}px,1fr));column-gap:${colGap}px;row-gap:${rowGap}px">\n${items}\n</div>`;
}

function synTwinCard({ target, groupId, domain, concept, tags, answerSlot, targetPx = 24, chipPx = 18, chipH = 36, grid = '2x2', maxGlyphs = 13 }) {
  if (!target || !groupId || !domain || !concept) throw new Error('synTwinCard: target / groupId / domain / concept are required');
  if (!['2x2', '3x1'].includes(grid)) throw new Error(`synTwinCard: grid ${grid} is not 2x2 / 3x1`);
  const n = grid === '2x2' ? 4 : 3;
  if (!Array.isArray(tags) || tags.length !== n) throw new Error(`synTwinCard: grid ${grid} needs ${n} tags, got ${tags && tags.length}`);
  if (!Number.isInteger(answerSlot) || answerSlot < 0 || answerSlot >= n) throw new Error(`synTwinCard: answerSlot ${answerSlot} outside 0..${n - 1}`);
  if (tags[answerSlot].groupId !== groupId) throw new Error(`synTwinCard: the tag in answerSlot ${answerSlot} is not of the target's group`);
  const cap = Math.min(maxGlyphs, MAX_GLYPHS[grid]);
  for (const w of [target, ...tags.map((t) => t.word)]) if (glyphs(w) > cap) throw new Error(`synTwinCard: "${w}" has ${glyphs(w)} glyphs > ${cap} (refuse, never shrink)`);
  if (chipH < 36) throw new Error(`synTwinCard: chipH ${chipH} below the G2 floor 36`);
  if (chipPx < 16) throw new Error(`synTwinCard: chipPx ${chipPx} below 16`);
  const band = `<div data-lcs-band style="display:flex;align-items:center;gap:8px;padding:0 10px 0 36px;height:40px;flex:0 0 40px;box-sizing:border-box;background:${T.tealSoft};border-radius:10px">` +
    synSameLink({ ground: T.tealSoft }) +
    `<span data-lcs-target-word style="font-family:${F.display},cursive;font-weight:700;font-size:${targetPx}px;line-height:1;color:${T.teal};white-space:nowrap">${esc(target)}</span></div>`;
  const cols = grid === '2x2' ? 'minmax(0,1fr) minmax(0,1fr)' : 'minmax(0,1fr)';   // a long word never widens its column: it overflows and verify names it
  const tagHtml = tags.map((t, i) => `<span class="ws-achip" data-lcs-tag data-lcs-group="${esc(t.groupId)}" data-lcs-slot="${i}" ` +
    `style="width:100%;height:${chipH}px;border-radius:12px;padding:0 8px;font-size:${chipPx}px;box-sizing:border-box;white-space:nowrap;line-height:1">` +
    `<span data-lcs-word>${esc(t.word)}</span></span>`).join('');
  const square = `<div data-lcs-square data-lcs-grid="${grid}" style="display:grid;grid-template-columns:${cols};column-gap:14px;row-gap:10px;margin-top:8px">${tagHtml}</div>`;
  return `<div data-lcs-twin data-lcs-target="${esc(groupId + ':' + target)}" data-lcs-concept="${esc(concept)}" data-lcs-domain="${esc(domain)}" style="display:contents">${band}${square}</div>`;
}

module.exports = { synSameLink, synTwinGrid, synTwinCard };
