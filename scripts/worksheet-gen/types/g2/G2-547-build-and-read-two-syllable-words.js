/** G2-547 — Build and Read Two-Syllable Words (vowels-g2b factory; English literacy year 2026-11-17) */
'use strict';
const { makeVowelG2bType } = require('../_shared/vowels-g2b.js');
module.exports = makeVowelG2bType({
  id: 'G2-547', slug: 'build-and-read-two-syllable-words', mode: 'syllread', exerciseType: 'syllable-reading',
  i18n: { en: { title: "Build and Read Two-Syllable Words", instruction: "Read each syllable, then the whole word: cup + cake = cupcake." } },
});
