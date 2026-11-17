/** G3-553 — Write a Conclusion (opinion-writing-g3 factory; English literacy year 2026-11-17) */
'use strict';
const { makeOpinionWritingG3Type } = require('../_shared/opinion-writing-g3.js');
module.exports = makeOpinionWritingG3Type({
  id: 'G3-553', slug: 'write-a-conclusion', mode: 'writeend', exerciseType: 'sentence-building',
  i18n: { en: { title: "Write a Conclusion", instruction: "Say your opinion again in new words at the end of your piece." } },
});
