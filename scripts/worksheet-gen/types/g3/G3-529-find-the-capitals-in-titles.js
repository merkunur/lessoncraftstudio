/** G3-529 — Find the Capitals in Titles (sentences-g3 factory; English literacy year 2026-11-18) */
'use strict';
const { makeSentencesG3Type } = require('../_shared/sentences-g3.js');
module.exports = makeSentencesG3Type({
  id: 'G3-529', slug: 'find-the-capitals-in-titles', mode: 'titlecircle', exerciseType: 'capitals-punctuation',
  i18n: { en: { title: "Find the Capitals in Titles", instruction: "Small words like a, the, of, and in stay small in the middle of a title." } },
});
