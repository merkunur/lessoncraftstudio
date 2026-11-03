/**
 * K-574 — Picture Bingo: Caller Cards (Bingo maker 2026-11-03, NEW-TEMPLATES §60; types/_shared/bingo.js): the caller cards of K-569 (the same pool, level by level), to cut out and call.
 */
'use strict';
const { makeBingo } = require('../_shared/bingo.js');

module.exports = makeBingo({
  id: 'K-574', slug: 'picture-bingo-caller-cards', gradeBand: 'K', content: 'pictures', callers: true,
  D: { 1: { g: 3, perPage: 4, cap: 24, callCols: [4, 5, 6] }, 2: { g: 3, perPage: 4, cap: 24, both: true, callCols: [4, 5, 6] }, 3: { g: 3, perPage: 4, cap: 24, words: true, callCols: [4, 5, 6] } },
  i18n: { en: { title: "Picture Bingo: Caller Cards", instruction: "Cut out the cards and mix them up. Take one card at a time and say its word. Keep the cards you have called to check each Bingo." } },
});
