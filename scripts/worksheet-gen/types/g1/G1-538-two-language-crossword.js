/**
 * G1-538 — Two-Language Crossword (Crossword maker 2026-11-03, NEW-TEMPLATES §58; types/_shared/crossword.js): for the dual-language class: the clue is the picture and its word in ANOTHER language (the slot clueLang: English, or Spanish on an English page). Levels: 1 five words · 2 seven · 3 nine.
 */
'use strict';
const { makeCrossword } = require('../_shared/crossword.js');

module.exports = makeCrossword({
  id: 'G1-538', slug: 'two-language-crossword', gradeBand: 'G1', clue: 'bilingual',
  D: { 1: { k: 5, max: 6 }, 2: { k: 7, max: 7 }, 3: { k: 9, max: 8 } },
  i18n: { en: { title: "Two-Language Crossword", instruction: "Read each word and look at its picture. Write the English word in the boxes with the same number." } },
});
