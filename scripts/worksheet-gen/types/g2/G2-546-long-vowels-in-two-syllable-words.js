/** G2-546 — Long Vowels in Two-Syllable Words (vowels-g2b factory; English literacy year 2026-11-17) */
'use strict';
const { makeVowelG2bType } = require('../_shared/vowels-g2b.js');
module.exports = makeVowelG2bType({
  id: 'G2-546', slug: 'long-vowels-in-two-syllable-words', mode: 'syll', exerciseType: 'syllable-split',
  i18n: { en: { title: "Long Vowels in Two-Syllable Words", instruction: "A silent e at the end makes the vowel long: cup | cake." } },
});
