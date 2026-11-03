/**
 * K-567 — Picture Word Search (Word Search maker 2026-11-03, NEW-TEMPLATES §57; types/_shared/word-search.js): for pre-readers: the list is pictures only — the child names each one and finds its word. Levels: 1 a 7 × 7 grid, five words across and down · 2 an 8 × 8 grid, six words · 3 a 9 × 9 grid, seven words, backwards too.
 */
'use strict';
const { makeWordSearch } = require('../_shared/word-search.js');

module.exports = makeWordSearch({
  id: 'K-567', slug: 'picture-word-search', gradeBand: 'K', clue: 'pictures',
  D: { 1: { n: 7, k: 5, dirs: 'across', max: 6 }, 2: { n: 8, k: 6, dirs: 'across', max: 7 }, 3: { n: 9, k: 7, dirs: 'back', max: 8 } },
  i18n: { en: { title: "Picture Word Search", instruction: "Say the name of each picture. Find its word in the grid and circle it." } },
});
