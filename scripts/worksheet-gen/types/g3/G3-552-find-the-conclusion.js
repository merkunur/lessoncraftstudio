/** G3-552 — Find the Conclusion (opinion-writing-g3 factory; English literacy year 2026-11-17) */
'use strict';
const { makeOpinionWritingG3Type } = require('../_shared/opinion-writing-g3.js');
module.exports = makeOpinionWritingG3Type({
  id: 'G3-552', slug: 'find-the-conclusion', mode: 'pickend', exerciseType: 'reading-comprehension',
  i18n: { en: { title: "Find the Conclusion", instruction: "A concluding statement says the opinion again in new words." } },
});
