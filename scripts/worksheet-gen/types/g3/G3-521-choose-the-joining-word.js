/** G3-521 — Choose the Joining Word (sentences-g3 factory; English literacy year 2026-11-18) */
'use strict';
const { makeSentencesG3Type } = require('../_shared/sentences-g3.js');
module.exports = makeSentencesG3Type({
  id: 'G3-521', slug: 'choose-the-joining-word', mode: 'joinpick', exerciseType: 'sentence-building',
  i18n: { en: { title: "Choose the Joining Word", instruction: "Pick the joining word that makes sense with both ideas." } },
});
