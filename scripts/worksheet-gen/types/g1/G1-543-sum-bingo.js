/**
 * G1-543 — Sum Bingo (Bingo maker 2026-11-03, NEW-TEMPLATES §60; types/_shared/bingo.js): the answers on the card, a sum on each caller card (1.OA.C.6 fluency as a class game). Levels: 1 additions within 20 (answers 3-20), 3×3 · 2 additions and subtractions within 20, 4×4 · 3 within 100 the Grade 1 way (1.NBT.C.4: two-digit + one-digit or + tens; 30 answers 21-99), 5×5 with a free centre.
 */
'use strict';
const { makeBingo } = require('../_shared/bingo.js');

module.exports = makeBingo({
  id: 'G1-543', slug: 'sum-bingo', gradeBand: 'G1', content: 'sums',
  D: { 1: { g: 3, perPage: 4, from: 3, to: 20 }, 2: { g: 4, perPage: 1, from: 1, to: 20, sub: true }, 3: { g: 5, perPage: 1, from: 21, to: 99, cap: 30, nbt: true } },
  i18n: { en: { title: "Sum Bingo", instruction: "Listen to each sum and work it out. If the answer is on your card, mark it. Mark a whole line across, down or corner to corner, then shout \"Bingo!\"" } },
});
