/**
 * K-572 — Number Word Bingo (Bingo maker 2026-11-03, NEW-TEMPLATES §60; types/_shared/bingo.js): numerals on the card, the number word on the caller card (lib/number-words.js; never 0). Levels: 1 1-20 · 2 the cards print the WORDS, the caller card the numeral (one big card a page: the long words fit) · 3 the numbers 1-30 (number words past twenty), 4×4.
 */
'use strict';
const { makeBingo } = require('../_shared/bingo.js');

module.exports = makeBingo({
  id: 'K-572', slug: 'number-word-bingo', gradeBand: 'K', content: 'numbers',
  D: { 1: { g: 3, perPage: 4, from: 1, to: 20 }, 2: { g: 3, perPage: 1, from: 1, to: 20, words: true }, 3: { g: 4, perPage: 1, from: 1, to: 30 } },
  i18n: { en: { title: "Number Word Bingo", instruction: "Listen to each number. If it is on your card, mark it. Mark a whole line across, down or corner to corner, then shout \"Bingo!\"" } },
});
