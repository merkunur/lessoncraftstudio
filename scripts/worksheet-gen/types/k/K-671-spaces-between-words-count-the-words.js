/** K-671 — Spaces Between Words: Count the Words (print-concepts-k factory; English literacy year 2026-11-17) */
'use strict';
const { makePrintConceptsKType } = require('../_shared/print-concepts-k.js');
module.exports = makePrintConceptsKType({
  id: 'K-671', slug: 'spaces-between-words-count-the-words', mode: 'count', exerciseType: 'sentence-building',
  i18n: { en: { title: "Spaces Between Words: Count the Words", instruction: "A space comes between two words." } },
});
