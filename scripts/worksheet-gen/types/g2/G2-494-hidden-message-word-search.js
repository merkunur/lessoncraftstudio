/**
 * G2-494 — Word Search with a Secret Message (Word Search maker 2026-11-03, NEW-TEMPLATES §57; types/_shared/word-search.js): the letters left over, read row by row, spell a short sentence (data/puzzles/phrases.js): the child writes it, a box a word. Levels: 1 a 7 × 7 grid, words across and down · 2 an 8 × 8 grid, backwards too · 3 an 8 × 8 grid, all eight directions.
 */
'use strict';
const { makeWordSearch } = require('../_shared/word-search.js');

module.exports = makeWordSearch({
  id: 'G2-494', slug: 'hidden-message-word-search', gradeBand: 'G2', clue: 'message',
  D: { 1: { n: 7, k: 6, dirs: 'across' }, 2: { n: 8, k: 7, dirs: 'back' }, 3: { n: 8, k: 7, dirs: 'diag' } },
  i18n: { en: { title: "Word Search with a Secret Message", instruction: "Find and circle every word. Then read the letters that are left, row by row, and write the secret message." } },
});
