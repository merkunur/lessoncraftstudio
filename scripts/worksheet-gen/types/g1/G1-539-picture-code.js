/**
 * G1-539 — Picture Code (Secret Code maker 2026-11-03, NEW-TEMPLATES §59; types/_shared/cryptogram.js): the old cryptogram app's picture code: one library picture per letter, the key printed. Levels: 1 a short sentence (≤ 10 letters), one letter given · 2 ≤ 16 letters, one given · 3 ≤ 24 letters, none given.
 */
'use strict';
const { makeCryptogram } = require('../_shared/cryptogram.js');

module.exports = makeCryptogram({
  id: 'G1-539', slug: 'picture-code', gradeBand: 'G1', code: 'pictures',
  D: { 1: { min: 4, max: 10, maxDistinct: 8, given: 1, perLine: 10 }, 2: { min: 8, max: 16, maxDistinct: 12, given: 1, perLine: 10 }, 3: { min: 12, max: 24, maxDistinct: 14, given: 0, perLine: 10 } },
  i18n: { en: { title: "Picture Code", instruction: "Each picture stands for a letter. Use the key to write the secret message." } },
});
