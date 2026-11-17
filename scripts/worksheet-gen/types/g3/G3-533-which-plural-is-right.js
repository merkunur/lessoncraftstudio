/** G3-533 — Which Plural Is Right? (L.3.1.b; parts-of-speech-g3 factory; English literacy year 2026-11-18) */
'use strict';
const { makePartsOfSpeechType } = require('../_shared/parts-of-speech-g3.js');
module.exports = makePartsOfSpeechType({
  id: 'G3-533', slug: 'which-plural-is-right', mode: 'pluralpick', exerciseType: 'singular-plural',
  i18n: { en: { title: "Which Plural Is Right?", instruction: "A plural noun names more than one. Its spelling follows a rule." } },
});
