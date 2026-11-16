/** G3-512 — Closed and Open Syllables (long-words-g3 factory; English literacy year 2026-11-18) */
'use strict';
const { makeLongWordsG3Type } = require('../_shared/long-words-g3.js');
module.exports = makeLongWordsG3Type({
  id: 'G3-512', slug: 'closed-and-open-syllables', mode: 'co', exerciseType: 'syllable-split',
  i18n: { en: { title: "Closed and Open Syllables", instruction: "An open syllable ends with a vowel, and the vowel says its name: ro | bot." } },
});
