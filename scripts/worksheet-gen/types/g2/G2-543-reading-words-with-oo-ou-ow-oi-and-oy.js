/** G2-543 — Reading Words with oo, ou, ow, oi, and oy (vowels-g2b factory; English literacy year 2026-11-17) */
'use strict';
const { makeVowelG2bType } = require('../_shared/vowels-g2b.js');
module.exports = makeVowelG2bType({
  id: 'G2-543', slug: 'reading-words-with-oo-ou-ow-oi-and-oy', mode: 'diph', exerciseType: 'reading-comprehension',
  i18n: { en: { title: "Reading Words with oo, ou, ow, oi, and oy", instruction: "ou and ow can say the sound in cow. oi and oy say the sound in boy." } },
});
