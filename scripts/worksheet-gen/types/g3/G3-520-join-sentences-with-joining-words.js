/** G3-520 — Join Sentences with Joining Words (sentences-g3 factory; English literacy year 2026-11-18) */
'use strict';
const { makeSentencesG3Type } = require('../_shared/sentences-g3.js');
module.exports = makeSentencesG3Type({
  id: 'G3-520', slug: 'join-sentences-with-joining-words', mode: 'join', exerciseType: 'sentence-building',
  i18n: { en: { title: "Join Sentences with Joining Words", instruction: "A joining word shows how two ideas go together." } },
});
