/** G3-522 — Simple, Compound, and Complex Sentences (sentences-g3 factory; English literacy year 2026-11-18) */
'use strict';
const { makeSentencesG3Type } = require('../_shared/sentences-g3.js');
module.exports = makeSentencesG3Type({
  id: 'G3-522', slug: 'simple-compound-and-complex-sentences', mode: 'kinds', exerciseType: 'sentence-building',
  i18n: { en: { title: "Simple, Compound, and Complex Sentences", instruction: "Sentences can be simple, compound, or complex." } },
});
