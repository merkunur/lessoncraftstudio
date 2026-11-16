/** G1-600 — Every Syllable Has a Vowel (syllables-g1 factory; English literacy year 2026-11-18) */
'use strict';
const { makeSyllG1Type } = require('../_shared/syllables-g1.js');
module.exports = makeSyllG1Type({
  id: 'G1-600', slug: 'every-syllable-has-a-vowel', mode: 'vowel', exerciseType: 'syllable-split',
  i18n: { en: { title: "Every Syllable Has a Vowel", instruction: "Every syllable has a vowel sound: nap | kin has two." } },
});
