/** G3-513 — Closed or Open? Sort Long Words (long-words-g3 factory; English literacy year 2026-11-18) */
'use strict';
const { makeLongWordsG3Type } = require('../_shared/long-words-g3.js');
module.exports = makeLongWordsG3Type({
  id: 'G3-513', slug: 'closed-or-open-sort-long-words', mode: 'cosort', exerciseType: 'syllable-split',
  i18n: { en: { title: "Closed or Open? Sort Long Words", instruction: "A closed syllable has a short vowel; an open syllable has a long vowel." } },
});
