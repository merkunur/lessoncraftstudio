/**
 * G1-534 — Two-Language Word Search (Word Search maker 2026-11-03, NEW-TEMPLATES §57; types/_shared/word-search.js): for the dual-language class: each clue is the picture and its word in ANOTHER language (the slot clueLang: English, or Spanish on an English page); the grid holds the page language's word. Levels: 1 an 8 × 8 grid, across and down · 2 10 × 10, backwards too · 3 12 × 12, all directions.
 */
'use strict';
const { makeWordSearch } = require('../_shared/word-search.js');

module.exports = makeWordSearch({
  id: 'G1-534', slug: 'two-language-word-search', gradeBand: 'G1', clue: 'bilingual',
  D: { 1: { n: 8, k: 6, dirs: 'across' }, 2: { n: 10, k: 8, dirs: 'back' }, 3: { n: 12, k: 10, dirs: 'diag' } },
  i18n: { en: { title: "Two-Language Word Search", instruction: "Read each word and look at its picture. Find the English word in the grid and circle it." } },
});
