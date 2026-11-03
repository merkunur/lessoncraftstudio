/**
 * K-578 — Shape and Color Bingo: Caller Cards (Bingo maker 2026-11-03, NEW-TEMPLATES §60; types/_shared/bingo.js): the caller cards of K-573 (the same pool, level by level), to cut out and call.
 */
'use strict';
const { makeBingo } = require('../_shared/bingo.js');

module.exports = makeBingo({
  id: 'K-578', slug: 'shape-and-color-bingo-caller-cards', gradeBand: 'K', content: 'shapes', callers: true,
  D: { 1: { g: 3, perPage: 4, callCols: [4, 5] }, 2: { g: 4, perPage: 1, callCols: [4, 5] }, 3: { g: 3, perPage: 4, words: true, callCols: [4, 5] } },
  i18n: { en: { title: "Shape and Color Bingo: Caller Cards", instruction: "Cut out the cards and mix them up. Take one card at a time and read the shape and its color aloud. Keep the cards you have called to check each Bingo." } },
});
