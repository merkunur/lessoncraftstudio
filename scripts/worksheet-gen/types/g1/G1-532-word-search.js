/**
 * G1-532 — Word Search (Word Search maker 2026-11-03, NEW-TEMPLATES §57; types/_shared/word-search.js): the old wordsearch app kept: the word list in CAPITALS as in the grid. Levels: 1 an 8 × 8 grid, six words across and down · 2 a 10 × 10 grid, eight words, backwards too · 3 a 12 × 12 grid, ten words, in all eight directions.
 */
'use strict';
const { makeWordSearch } = require('../_shared/word-search.js');

module.exports = makeWordSearch({
  id: 'G1-532', slug: 'word-search', gradeBand: 'G1', clue: 'words',
  D: { 1: { n: 8, k: 6, dirs: 'across' }, 2: { n: 10, k: 8, dirs: 'back' }, 3: { n: 12, k: 10, dirs: 'diag' } },
  i18n: { en: { title: "Word Search", instruction: "Find each word of the list in the grid. Circle it." } },
});
