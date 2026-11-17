/** G2-564 — Special Names: Write the Capital Letters (L.2.2.a; opinion-letters-g2 factory; English literacy year 2026-11-17) */
'use strict';
const { makeOpinionLettersType } = require('../_shared/opinion-letters-g2.js');
module.exports = makeOpinionLettersType({
  id: 'G2-564', slug: 'special-names-write-the-capital-letters', mode: 'capwrite', exerciseType: 'capitals-punctuation',
  i18n: { en: { title: "Special Names: Write the Capital Letters", instruction: "Each big word in a holiday or place name gets a capital letter." } },
});
