/**
 * card-grid layout — the workhorse: N numbered problem cards in an r×c grid.
 * cards: array of inner-HTML strings (each becomes a .ws-card's content).
 */
'use strict';

function cardGrid({ cards, cols, rows, numbered }) {
  const items = cards.map((inner, i) => {
    const badge = numbered === false ? '' : `<span class="ws-card-badge">${i + 1}</span>`;
    return `<section class="ws-card" data-lcs-card="${i + 1}">${badge}${inner}</section>`;
  }).join('\n');
  return `<div class="ws-cardgrid" style="grid-template-columns: repeat(${cols}, minmax(0,1fr)); grid-template-rows: repeat(${rows}, minmax(0,1fr));">\n${items}\n</div>`;
}

module.exports = { cardGrid };
