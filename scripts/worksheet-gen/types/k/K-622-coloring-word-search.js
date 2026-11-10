/**
 * K-622 — Coloring Word Search (flagship makers, docs/makers/FLAGSHIP.md; types/_shared/word-search.js with the colouring alphabet):
 * the letters are big bubble letters; the child finds each picture's word and colors its letters. Levels: 1 a 6 × 6 grid, four
 * words across and down · 2 a 7 × 7 grid, five words · 3 an 8 × 8 grid, six words, backwards too.
 */
'use strict';
const { makeWordSearch } = require('../_shared/word-search.js');

module.exports = makeWordSearch({
  id: 'K-622', slug: 'coloring-word-search', gradeBand: 'K', clue: 'pictures', bubble: true,
  D: { 1: { n: 6, k: 4, dirs: 'across', max: 6 }, 2: { n: 7, k: 5, dirs: 'across', max: 7 }, 3: { n: 8, k: 6, dirs: 'back', max: 8 } },
  i18n: { en: { title: 'Coloring Word Search', instruction: 'Find each word in the grid and color its letters. Use a new color for each word.' } },
});
