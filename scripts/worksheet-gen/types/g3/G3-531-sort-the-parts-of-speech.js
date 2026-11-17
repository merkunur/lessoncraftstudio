/** G3-531 — Sort the Parts of Speech (L.3.1.a; parts-of-speech-g3 factory; English literacy year 2026-11-18) */
'use strict';
const { makePartsOfSpeechType } = require('../_shared/parts-of-speech-g3.js');
module.exports = makePartsOfSpeechType({
  id: 'G3-531', slug: 'sort-the-parts-of-speech', mode: 'sort', exerciseType: 'word-classes',
  i18n: { en: { title: "Sort the Parts of Speech", instruction: "A word’s job makes it a noun, pronoun, verb, adjective, or adverb." } },
});
