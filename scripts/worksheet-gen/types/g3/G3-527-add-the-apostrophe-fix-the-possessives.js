/** G3-527 — Add the Apostrophe: Fix the Possessives (sentences-g3 factory; English literacy year 2026-11-18) */
'use strict';
const { makeSentencesG3Type } = require('../_shared/sentences-g3.js');
module.exports = makeSentencesG3Type({
  id: 'G3-527', slug: 'add-the-apostrophe-fix-the-possessives', mode: 'apostrophe', exerciseType: 'capitals-punctuation',
  i18n: { en: { title: "Add the Apostrophe: Fix the Possessives", instruction: "Look at how many owners there are before you write the apostrophe." } },
});
