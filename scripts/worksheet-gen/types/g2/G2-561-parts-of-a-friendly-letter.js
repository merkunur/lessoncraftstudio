/** G2-561 — Parts of a Friendly Letter (L.2.2.b; opinion-letters-g2 factory; English literacy year 2026-11-17) */
'use strict';
const { makeOpinionLettersType } = require('../_shared/opinion-letters-g2.js');
module.exports = makeOpinionLettersType({
  id: 'G2-561', slug: 'parts-of-a-friendly-letter', mode: 'parts', exerciseType: 'capitals-punctuation',
  i18n: { en: { title: "Parts of a Friendly Letter", instruction: "A friendly letter has a date, a greeting, a body, a closing, and a signature." } },
});
