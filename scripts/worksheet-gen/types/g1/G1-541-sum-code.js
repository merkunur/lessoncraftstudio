/**
 * G1-541 — Sum Code (Secret Code maker 2026-11-03, NEW-TEMPLATES §59; types/_shared/cryptogram.js): each cell a sum whose answer is the letter's number (A = 1): arithmetic practice in a code. Levels: 1 ≤ 10 letters, additions · 2 ≤ 16 letters · 3 ≤ 20 letters, subtractions too.
 */
'use strict';
const { makeCryptogram } = require('../_shared/cryptogram.js');

module.exports = makeCryptogram({
  id: 'G1-541', slug: 'sum-code', gradeBand: 'G1', code: 'sums',
  D: { 1: { min: 4, max: 10, given: 1, perLine: 9, cell: 72 }, 2: { min: 8, max: 16, given: 1, perLine: 9, cell: 72 }, 3: { min: 10, max: 20, given: 0, perLine: 9, cell: 72, sub: true } },
  i18n: { en: { title: "Sum Code", instruction: "Work out each sum. Find the answer in the key and write its letter." } },
});
