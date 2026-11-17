/** G3-523 — Build Compound and Complex Sentences (sentences-g3 factory; English literacy year 2026-11-18) */
'use strict';
const { makeSentencesG3Type } = require('../_shared/sentences-g3.js');
module.exports = makeSentencesG3Type({
  id: 'G3-523', slug: 'build-compound-and-complex-sentences', mode: 'build', exerciseType: 'sentence-building',
  i18n: { en: { title: "Build Compound and Complex Sentences", instruction: "Two short sentences can make a compound or a complex sentence." } },
});
