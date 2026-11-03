/**
 * G1-544 — Clock Bingo (Bingo maker 2026-11-03, NEW-TEMPLATES §60; types/_shared/bingo.js): clock faces on the card, the time in digits and words on the caller card (1.MD.B.3, 2.MD.C.7). Levels: 1 hours and half hours, 3×3 · 2 quarter hours too, 3×3 · 3 five-minute times, 4×4, one big card a page.
 */
'use strict';
const { makeBingo } = require('../_shared/bingo.js');

module.exports = makeBingo({
  id: 'G1-544', slug: 'clock-bingo', gradeBand: 'G1', content: 'clocks',
  D: { 1: { g: 3, perPage: 4, minutes: [0, 30] }, 2: { g: 3, perPage: 4, minutes: [0, 15, 30, 45], cap: 30 }, 3: { g: 4, perPage: 1, minutes: [5, 10, 20, 25, 35, 40, 50, 55], cap: 30 } },
  i18n: { en: { title: "Clock Bingo", instruction: "Listen to each time. If a clock on your card shows it, mark that clock. Mark a whole line across, down or corner to corner, then shout \"Bingo!\"" } },
});
