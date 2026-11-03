/**
 * G1-536 — Arrow-Word Puzzle (Crossword maker 2026-11-03, NEW-TEMPLATES §58; types/_shared/crossword.js): the picture sits IN the grid, in the cell before its word, an arrow into it (fr mots fléchés, de Schwedenrätsel). Levels: 1 five words of 3-5 letters · 2 seven words of 3-6 · 3 nine words of 3-7.
 */
'use strict';
const { makeCrossword } = require('../_shared/crossword.js');

module.exports = makeCrossword({
  id: 'G1-536', slug: 'arrow-word-puzzle', gradeBand: 'G1', clue: 'arrow',
  D: { 1: { k: 5, max: 5 }, 2: { k: 7, max: 6 }, 3: { k: 9, max: 7 } },
  i18n: { en: { title: "Arrow-Word Puzzle", instruction: "Each picture in the grid shows a word. Write the word in the boxes where the arrow points." } },
});
