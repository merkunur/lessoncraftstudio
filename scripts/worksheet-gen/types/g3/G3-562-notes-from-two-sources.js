/** G3-562 — Notes from Two Sources (W.3.7; informative-writing-g3 factory; English literacy year 2026-11-17) */
'use strict';
const { makeInformativeWritingG3Type } = require('../_shared/informative-writing-g3.js');
module.exports = makeInformativeWritingG3Type({
  id: 'G3-562', slug: 'notes-from-two-sources', mode: 'research', exerciseType: 'reading-comprehension',
  i18n: { en: { title: "Notes from Two Sources", instruction: "Take notes from both sources to answer the research question." } },
});
