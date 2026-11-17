/** G3-534 — Past Tense: Regular and Irregular Verbs (L.3.1.d; parts-of-speech-g3 factory; English literacy year 2026-11-18) */
'use strict';
const { makePartsOfSpeechType } = require('../_shared/parts-of-speech-g3.js');
module.exports = makePartsOfSpeechType({
  id: 'G3-534', slug: 'past-tense-regular-and-irregular-verbs', mode: 'past', exerciseType: 'verb-forms',
  i18n: { en: { title: "Past Tense: Regular and Irregular Verbs", instruction: "Regular verbs add -ed in the past. Irregular verbs change: go, went." } },
});
