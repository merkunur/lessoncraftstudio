/**
 * K-575 — Sight Word Bingo: Caller Cards (Bingo maker 2026-11-03, NEW-TEMPLATES §60; types/_shared/bingo.js): the caller cards of K-570 (the same pool, level by level), to cut out and call.
 */
'use strict';
const { makeBingo } = require('../_shared/bingo.js');

module.exports = makeBingo({
  id: 'K-575', slug: 'sight-word-bingo-caller-cards', gradeBand: 'K', content: 'sight', callers: true,
  D: { 1: { g: 3, perPage: 4, from: 1, to: 20, callCols: [5, 4] }, 2: { g: 4, perPage: 1, from: 1, to: 30, callCols: [5, 6, 4] }, 3: { g: 4, perPage: 1, from: 11, to: 34, sentence: true, callCols: [3, 4] } },
  i18n: { en: { title: "Sight Word Bingo: Caller Cards", instruction: "Cut out the cards and mix them up. Take one card at a time and read its word aloud. Keep the cards you have called to check each Bingo." } },
});
