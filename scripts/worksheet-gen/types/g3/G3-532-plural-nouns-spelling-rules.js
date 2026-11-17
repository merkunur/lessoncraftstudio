/** G3-532 — Plural Nouns: Spelling Rules (L.3.1.b; parts-of-speech-g3 factory; English literacy year 2026-11-18) */
'use strict';
const { makePartsOfSpeechType } = require('../_shared/parts-of-speech-g3.js');
module.exports = makePartsOfSpeechType({
  id: 'G3-532', slug: 'plural-nouns-spelling-rules', mode: 'plural', exerciseType: 'singular-plural',
  i18n: { en: { title: "Plural Nouns: Spelling Rules", instruction: "Plural nouns name more than one. Each one follows a spelling rule." } },
});
