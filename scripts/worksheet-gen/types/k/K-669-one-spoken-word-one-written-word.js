/** K-669 — One Spoken Word, One Written Word (print-concepts-k factory; English literacy year 2026-11-17) */
'use strict';
const { makePrintConceptsKType } = require('../_shared/print-concepts-k.js');
module.exports = makePrintConceptsKType({
  id: 'K-669', slug: 'one-spoken-word-one-written-word', mode: 'dots', exerciseType: 'sentence-building',
  i18n: { en: { title: "One Spoken Word, One Written Word", instruction: "Each word we say is one word on the page." } },
});
