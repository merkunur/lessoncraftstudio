/** G3-515 — Build Long Words from Syllables (long-words-g3 factory; English literacy year 2026-11-18) */
'use strict';
const { makeLongWordsG3Type } = require('../_shared/long-words-g3.js');
module.exports = makeLongWordsG3Type({
  id: 'G3-515', slug: 'build-long-words-from-syllables', mode: 'typebuild', exerciseType: 'syllable-reading',
  i18n: { en: { title: "Build Long Words from Syllables", instruction: "Put the syllables together and read the whole word: cup + cake = cupcake." } },
});
