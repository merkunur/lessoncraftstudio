/** K-668 — Number the Lines and the Pages (print-concepts-k factory; English literacy year 2026-11-17) */
'use strict';
const { makePrintConceptsKType } = require('../_shared/print-concepts-k.js');
module.exports = makePrintConceptsKType({
  id: 'K-668', slug: 'number-the-lines-and-the-pages', mode: 'pages', exerciseType: 'reading-comprehension',
  i18n: { en: { title: "Number the Lines and the Pages", instruction: "We read the left page, then the right page, then we turn the page." } },
});
