/**
 * G1-546 — Clock Bingo: Caller Cards (Bingo maker 2026-11-03, NEW-TEMPLATES §60; types/_shared/bingo.js): the caller cards of G1-544 (the same pool, level by level), to cut out and call.
 */
'use strict';
const { makeBingo } = require('../_shared/bingo.js');

module.exports = makeBingo({
  id: 'G1-546', slug: 'clock-bingo-caller-cards', gradeBand: 'G1', content: 'clocks', callers: true,
  D: { 1: { g: 3, perPage: 4, minutes: [0, 30], callCols: [4, 6] }, 2: { g: 3, perPage: 4, minutes: [0, 15, 30, 45], cap: 30, callCols: [5, 6] }, 3: { g: 4, perPage: 1, minutes: [5, 10, 20, 25, 35, 40, 50, 55], cap: 30, callCols: [5, 6] } },
  i18n: { en: { title: "Clock Bingo: Caller Cards", instruction: "Cut out the cards and mix them up. Take one card at a time and read the time aloud. Keep the cards you have called to check each Bingo." } },
});
