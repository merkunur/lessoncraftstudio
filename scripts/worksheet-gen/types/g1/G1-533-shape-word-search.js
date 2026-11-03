/**
 * G1-533 — Shape Word Search (Word Search maker 2026-11-03, NEW-TEMPLATES §57; types/_shared/word-search.js): the grid cut to a shape (heart, star, tree). Levels: 1 a heart, six words across and down · 2 a star, seven words, backwards too · 3 a circle, eight words in all eight directions (the tree shape was too narrow for eight words).
 */
'use strict';
const { makeWordSearch } = require('../_shared/word-search.js');

module.exports = makeWordSearch({
  id: 'G1-533', slug: 'shape-word-search', gradeBand: 'G1', clue: 'words',
  D: { 1: { n: 11, k: 6, dirs: 'across', shape: 'heart' }, 2: { n: 12, k: 7, dirs: 'back', shape: 'star' }, 3: { n: 12, k: 8, dirs: 'diag', shape: 'circle' } },
  i18n: { en: { title: "Shape Word Search", instruction: "Find each word of the list in the shape. Circle it." } },
});
