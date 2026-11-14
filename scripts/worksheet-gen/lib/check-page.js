/**
 * check-page.js — the page a type gives the unit checks (Part 7.6, the item bank; docs/daily-teaching-system/
 * PART-7-DESIGN.md "7.6"): its tasks as cards of their own, each at its NATURAL height.
 *
 * A worksheet's card grid shares the page's height out among its rows (minmax(0, 1fr)), so six tasks on one page are
 * squeezed and cut off at the bottom; the check cutter takes a card at the height it has on the page. Here every row
 * is as tall as its card, and the page may run past its foot (nothing of it is printed: the cutter only measures and
 * copies the cards).
 *
 *   checkGrid(cards, { cols })  → bodyHtml   cards: the html of each task (its answers in its markup)
 */
'use strict';

function checkGrid(cards, { cols = 1 } = {}) {
  if (!Array.isArray(cards) || !cards.length) throw new Error('checkGrid: no cards');
  const items = cards.map((inner, i) => `<section class="ws-card" data-lcs-card="${i + 1}" style="height:auto;min-height:0">${inner}</section>`).join('\n');
  // wrapped (2026-11-14): a grid that sits straight in the page's body is cut as an old worksheet grid, its cards keyed by
  // the numbers they show — a clock card and a ruler card with the same number became one task. In a wrapper the cutter
  // reads each card's answers from its markup.
  return `<div data-lcs-check-page>\n<div class="ws-cardgrid" style="grid-template-columns:repeat(${cols},minmax(0,1fr));grid-auto-rows:max-content;align-content:start;flex:0 0 auto;height:auto">\n${items}\n</div>\n</div>`;
}

module.exports = { checkGrid };
