/** K-670 — Match the Word You Hear (print-concepts-k factory; English literacy year 2026-11-17) */
'use strict';
const { makePrintConceptsKType } = require('../_shared/print-concepts-k.js');
module.exports = makePrintConceptsKType({
  id: 'K-670', slug: 'match-the-word-you-hear', mode: 'match', exerciseType: 'sentence-building',
  i18n: { en: { title: "Match the Word You Hear", instruction: "A word that takes longer to say usually has more letters." } },
});
