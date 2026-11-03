/**
 * K-568 — Number Word Search (Word Search maker 2026-11-03, NEW-TEMPLATES §57; types/_shared/word-search.js): the numerals are the clues, the number words (lib/number-words-1000.js) are in the grid. Levels: 1 five of the numbers 1-6 in a 7 × 7 grid · 2 eight of 1-10 in a 9 × 9 grid · 3 eight of 11-20 in an 11 × 11 grid, backwards too.
 */
'use strict';
const { makeWordSearch } = require('../_shared/word-search.js');

module.exports = makeWordSearch({
  id: 'K-568', slug: 'number-word-search', gradeBand: 'K', clue: 'numbers',
  D: { 1: { n: 7, k: 5, dirs: 'across', lo: 1, hi: 6 }, 2: { n: 9, k: 8, dirs: 'across', lo: 1, hi: 10 }, 3: { n: 11, k: 8, dirs: 'back', lo: 11, hi: 20 } },
  i18n: { en: { title: "Number Word Search", instruction: "Read each number. Find its number word in the grid and circle it." } },
});
