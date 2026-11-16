/** K-664 — Which Word Matches? One Letter Is Different (cvc-k factory; English literacy year 2026-11-17) */
'use strict';
const { makeCvcKType } = require('../_shared/cvc-k.js');
module.exports = makeCvcKType({
  id: 'K-664', slug: 'which-word-matches-the-picture', mode: 'pair', exerciseType: 'syllable-reading',
  i18n: { en: { title: "Which Word Matches? One Letter Is Different", instruction: "Two words can look almost the same: one letter makes them different words." } },
});
