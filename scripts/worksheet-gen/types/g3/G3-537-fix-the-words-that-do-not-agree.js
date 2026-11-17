/** G3-537 — Fix the Words That Do Not Agree (L.3.1.f; parts-of-speech-g3 factory; English literacy year 2026-11-18) */
'use strict';
const { makePartsOfSpeechType } = require('../_shared/parts-of-speech-g3.js');
module.exports = makePartsOfSpeechType({
  id: 'G3-537', slug: 'fix-the-words-that-do-not-agree', mode: 'fix', exerciseType: 'verb-forms',
  i18n: { en: { title: "Fix the Words That Do Not Agree", instruction: "A verb agrees with its subject, not with the words in between." } },
});
