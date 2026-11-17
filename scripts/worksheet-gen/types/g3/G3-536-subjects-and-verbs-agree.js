/** G3-536 — Subjects and Verbs Agree (L.3.1.f; parts-of-speech-g3 factory; English literacy year 2026-11-18) */
'use strict';
const { makePartsOfSpeechType } = require('../_shared/parts-of-speech-g3.js');
module.exports = makePartsOfSpeechType({
  id: 'G3-536', slug: 'subjects-and-verbs-agree', mode: 'agree', exerciseType: 'verb-forms',
  i18n: { en: { title: "Subjects and Verbs Agree", instruction: "The verb agrees with its subject, even with other words in between." } },
});
