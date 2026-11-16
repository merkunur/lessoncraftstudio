/** G2-544 — Reading Words with ar and or (vowels-g2b factory; English literacy year 2026-11-17) */
'use strict';
const { makeVowelG2bType } = require('../_shared/vowels-g2b.js');
module.exports = makeVowelG2bType({
  id: 'G2-544', slug: 'reading-words-with-ar-and-or', mode: 'aror', exerciseType: 'reading-comprehension',
  i18n: { en: { title: "Reading Words with ar and or", instruction: "Bossy r: ar says the sound in park, and or says the sound in storm." } },
});
