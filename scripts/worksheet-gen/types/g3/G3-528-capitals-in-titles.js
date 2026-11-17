/** G3-528 — Capitals in Titles (sentences-g3 factory; English literacy year 2026-11-18) */
'use strict';
const { makeSentencesG3Type } = require('../_shared/sentences-g3.js');
module.exports = makeSentencesG3Type({
  id: 'G3-528', slug: 'capitals-in-titles', mode: 'titles', exerciseType: 'capitals-punctuation',
  i18n: { en: { title: "Capitals in Titles", instruction: "Small words like a, the, of, and in stay small in the middle of a title." } },
});
