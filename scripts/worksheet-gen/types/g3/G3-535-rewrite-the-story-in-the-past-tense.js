/** G3-535 — Rewrite the Story in the Past Tense (L.3.1.d; parts-of-speech-g3 factory; English literacy year 2026-11-18) */
'use strict';
const { makePartsOfSpeechType } = require('../_shared/parts-of-speech-g3.js');
module.exports = makePartsOfSpeechType({
  id: 'G3-535', slug: 'rewrite-the-story-in-the-past-tense', mode: 'story', exerciseType: 'verb-forms',
  i18n: { en: { title: "Rewrite the Story in the Past Tense", instruction: "To tell a story about the past, change every verb to the past tense." } },
});
