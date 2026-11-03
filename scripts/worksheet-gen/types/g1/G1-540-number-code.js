/**
 * G1-540 — Number Code (Secret Code maker 2026-11-03, NEW-TEMPLATES §59; types/_shared/cryptogram.js): A = 1 in the language's alphabet order (es Ñ after N, sv/fi Å Ä Ö after Z), the whole key printed. Levels: 1 ≤ 10 letters, one given · 2 ≤ 16 letters, one given · 3 ≤ 24 letters.
 */
'use strict';
const { makeCryptogram } = require('../_shared/cryptogram.js');

module.exports = makeCryptogram({
  id: 'G1-540', slug: 'number-code', gradeBand: 'G1', code: 'numbers',
  D: { 1: { min: 4, max: 10, given: 1, perLine: 10 }, 2: { min: 8, max: 16, given: 1, perLine: 10 }, 3: { min: 12, max: 24, given: 0, perLine: 10 } },
  i18n: { en: { title: "Number Code", instruction: "Each number stands for a letter: A is 1. Use the key to write the secret message." } },
});
