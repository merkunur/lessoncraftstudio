/** G2-563 — Special Names: Find the Capital Letters (L.2.2.a; opinion-letters-g2 factory; English literacy year 2026-11-17) */
'use strict';
const { makeOpinionLettersType } = require('../_shared/opinion-letters-g2.js');
module.exports = makeOpinionLettersType({
  id: 'G2-563', slug: 'special-names-find-the-capital-letters', mode: 'capfind', exerciseType: 'capitals-punctuation',
  i18n: { en: { title: "Special Names: Find the Capital Letters", instruction: "Each big word in a holiday or place name gets a capital letter." } },
});
