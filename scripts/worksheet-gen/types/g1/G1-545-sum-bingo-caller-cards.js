/**
 * G1-545 — Sum Bingo: Caller Cards (Bingo maker 2026-11-03, NEW-TEMPLATES §60; types/_shared/bingo.js): the caller cards of G1-543 (the same pool, level by level), to cut out and call.
 */
'use strict';
const { makeBingo } = require('../_shared/bingo.js');

module.exports = makeBingo({
  id: 'G1-545', slug: 'sum-bingo-caller-cards', gradeBand: 'G1', content: 'sums', callers: true,
  D: { 1: { g: 3, perPage: 4, from: 3, to: 20, callCols: [3, 4, 5] }, 2: { g: 4, perPage: 1, from: 1, to: 20, sub: true, callCols: [4, 5] }, 3: { g: 5, perPage: 1, from: 21, to: 99, cap: 30, nbt: true, callCols: [5, 6] } },
  i18n: { en: { title: "Sum Bingo: Caller Cards", instruction: "Cut out the cards and mix them up. Take one card at a time and read the sum aloud, not the answer. Keep the cards you have called to check each Bingo." } },
});
