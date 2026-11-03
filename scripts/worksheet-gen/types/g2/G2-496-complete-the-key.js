/**
 * G2-496 — Complete the Key (Secret Code maker 2026-11-03, NEW-TEMPLATES §59; types/_shared/cryptogram.js): a symbol code whose key has gaps; one solved word holds every missing letter (cryptanalysis-lite, one answer). Levels: 1 two letters to find · 2 three · 3 four.
 */
'use strict';
const { makeCryptogram } = require('../_shared/cryptogram.js');

module.exports = makeCryptogram({
  id: 'G2-496', slug: 'complete-the-key', gradeBand: 'G2', code: 'symbols',
  D: { 1: { min: 8, max: 16, given: 0, perLine: 10, maxDistinct: 14, solvedWord: true, blank: 2 }, 2: { min: 10, max: 20, given: 0, perLine: 10, maxDistinct: 16, solvedWord: true, blank: 3 }, 3: { min: 12, max: 24, given: 0, perLine: 10, maxDistinct: 18, solvedWord: true, blank: 4 } },
  i18n: { en: { title: "Complete the Key", instruction: "Some letters are missing from the key. Use the solved word to fill them in. Then write the secret message." } },
});
