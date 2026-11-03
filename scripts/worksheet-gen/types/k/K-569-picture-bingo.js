/**
 * K-569 — Picture Bingo (Bingo maker 2026-11-03, NEW-TEMPLATES §60; types/_shared/bingo.js): the old bingo app: a theme's pictures on the cards, the picture and its word on the caller cards. Levels (3×3, four cards a page — a kindergarten card; a 4×4 needs 18 different pictures, which most themes do not have): 1 the pictures · 2 the picture and its word · 3 the WORDS alone (reading).
 */
'use strict';
const { makeBingo } = require('../_shared/bingo.js');

module.exports = makeBingo({
  id: 'K-569', slug: 'picture-bingo', gradeBand: 'K', content: 'pictures',
  D: { 1: { g: 3, perPage: 4, cap: 24 }, 2: { g: 3, perPage: 4, cap: 24, both: true }, 3: { g: 3, perPage: 4, cap: 24, words: true } },
  i18n: { en: { title: "Picture Bingo", instruction: "Listen to each word. If its picture is on your card, mark it. Mark a whole line across, down or corner to corner, then shout \"Bingo!\"" } },
});
