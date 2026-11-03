/**
 * K-577 — Number Word Bingo: Caller Cards (Bingo maker 2026-11-03, NEW-TEMPLATES §60; types/_shared/bingo.js): the caller cards of K-572 (the same pool, level by level), to cut out and call.
 */
'use strict';
const { makeBingo } = require('../_shared/bingo.js');

module.exports = makeBingo({
  id: 'K-577', slug: 'number-word-bingo-caller-cards', gradeBand: 'K', content: 'numbers', callers: true,
  D: { 1: { g: 3, perPage: 4, from: 1, to: 20, callCols: [4, 5] }, 2: { g: 3, perPage: 1, from: 1, to: 20, words: true, callCols: [5, 4] }, 3: { g: 4, perPage: 1, from: 1, to: 30, callCols: [3] } },
  i18n: { en: { title: "Number Word Bingo: Caller Cards", instruction: "Cut out the cards and mix them up. Take one card at a time and read the number aloud. Keep the cards you have called to check each Bingo." } },
});
