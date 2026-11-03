/**
 * G2-495 — Fill-In Crossword (Crossword maker 2026-11-03, NEW-TEMPLATES §58; types/_shared/crossword.js): no clue: the words listed by length, one (or more) written in so the fill is the only one (a solver checks it). Levels: 1 six words · 2 eight words · 3 ten words.
 */
'use strict';
const { makeCrossword } = require('../_shared/crossword.js');

module.exports = makeCrossword({
  id: 'G2-495', slug: 'fill-in-crossword', gradeBand: 'G2', clue: 'fillin',
  D: { 1: { k: 6, max: 6 }, 2: { k: 8, max: 7 }, 3: { k: 10, max: 8 } },
  i18n: { en: { title: "Fill-In Crossword", instruction: "Fit every word of the list into the grid. Count the letters and use the letters that cross." } },
});
