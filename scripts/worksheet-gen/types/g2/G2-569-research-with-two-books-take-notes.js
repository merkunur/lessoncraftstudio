/** G2-569 — Research with Two Books: Take Notes (informative-writing-g2 factory; English literacy year 2026-11-17) */
'use strict';
const { makeInformativeWritingG2Type } = require('../_shared/informative-writing-g2.js');
module.exports = makeInformativeWritingG2Type({
  id: 'G2-569', slug: 'research-with-two-books-take-notes', mode: 'notes', exerciseType: 'reading-comprehension',
  i18n: { en: { title: "Research with Two Books: Take Notes", instruction: "Read both books. Write short notes in your own words." } },
});
