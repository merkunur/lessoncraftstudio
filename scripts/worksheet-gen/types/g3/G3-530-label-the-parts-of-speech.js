/** G3-530 — Label the Parts of Speech (L.3.1.a; parts-of-speech-g3 factory; English literacy year 2026-11-18) */
'use strict';
const { makePartsOfSpeechType } = require('../_shared/parts-of-speech-g3.js');
module.exports = makePartsOfSpeechType({
  id: 'G3-530', slug: 'label-the-parts-of-speech', mode: 'label', exerciseType: 'word-classes',
  i18n: { en: { title: "Label the Parts of Speech", instruction: "Every word has a job. Label each word by the job it does in its sentence." } },
});
