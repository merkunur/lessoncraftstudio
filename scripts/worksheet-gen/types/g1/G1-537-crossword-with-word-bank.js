/**
 * G1-537 — Crossword with a Word Bank (Crossword maker 2026-11-03, NEW-TEMPLATES §58; types/_shared/crossword.js): the numbered pictures and the words to use. Levels: 1 five words · 2 seven words · 3 eight words, and two words in the bank the grid does not take.
 */
'use strict';
const { makeCrossword } = require('../_shared/crossword.js');

module.exports = makeCrossword({
  id: 'G1-537', slug: 'crossword-with-word-bank', gradeBand: 'G1', clue: 'bank',
  D: { 1: { k: 5, max: 6 }, 2: { k: 7, max: 7 }, 3: { k: 8, max: 8, extra: 2 } },
  i18n: { en: { title: "Crossword with a Word Bank", instruction: "Look at each numbered picture. Find its word in the word bank and write it in the boxes." } },
});
