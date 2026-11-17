/** K-665 — Front Cover, Title Page, and Back Cover (print-concepts-k factory; English literacy year 2026-11-17) */
'use strict';
const { makePrintConceptsKType } = require('../_shared/print-concepts-k.js');
module.exports = makePrintConceptsKType({
  id: 'K-665', slug: 'front-cover-title-page-and-back-cover', mode: 'parts', exerciseType: 'reading-comprehension',
  i18n: { en: { title: "Front Cover, Title Page, and Back Cover", instruction: "A book has a front cover, a title page, and a back cover." } },
});
