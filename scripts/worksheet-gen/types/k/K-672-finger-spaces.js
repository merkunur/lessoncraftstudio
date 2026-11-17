/** K-672 — Finger Spaces (print-concepts-k factory; English literacy year 2026-11-17) */
'use strict';
const { makePrintConceptsKType } = require('../_shared/print-concepts-k.js');
module.exports = makePrintConceptsKType({
  id: 'K-672', slug: 'finger-spaces', mode: 'spaces', exerciseType: 'sentence-building',
  i18n: { en: { title: "Finger Spaces", instruction: "Spaces between words make a sentence easy to read." } },
});
