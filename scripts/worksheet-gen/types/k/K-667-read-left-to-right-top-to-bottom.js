/** K-667 — Read Left to Right, Top to Bottom (print-concepts-k factory; English literacy year 2026-11-17) */
'use strict';
const { makePrintConceptsKType } = require('../_shared/print-concepts-k.js');
module.exports = makePrintConceptsKType({
  id: 'K-667', slug: 'read-left-to-right-top-to-bottom', mode: 'track', exerciseType: 'reading-comprehension',
  i18n: { en: { title: "Read Left to Right, Top to Bottom", instruction: "We read left to right, then go down to the next line." } },
});
