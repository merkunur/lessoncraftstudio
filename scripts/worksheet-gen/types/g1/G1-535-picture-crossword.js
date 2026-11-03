/**
 * G1-535 — Picture Crossword (Crossword maker 2026-11-03, NEW-TEMPLATES §58; types/_shared/crossword.js): the old crossword app's core: numbered pictures, across and down. Levels: 1 four words of 3-5 letters · 2 six words of 3-7 · 3 eight words of 3-9.
 */
'use strict';
const { makeCrossword } = require('../_shared/crossword.js');

module.exports = makeCrossword({
  id: 'G1-535', slug: 'picture-crossword', gradeBand: 'G1', clue: 'pictures',
  D: { 1: { k: 4, max: 5 }, 2: { k: 6, max: 7 }, 3: { k: 8, max: 9 } },
  i18n: { en: { title: "Picture Crossword", instruction: "Look at each numbered picture. Write its word in the boxes with the same number." } },
});
