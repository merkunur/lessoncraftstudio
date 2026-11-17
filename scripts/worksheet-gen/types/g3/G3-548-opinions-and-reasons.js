/** G3-548 — Opinions and Reasons (opinion-writing-g3 factory; English literacy year 2026-11-17) */
'use strict';
const { makeOpinionWritingG3Type } = require('../_shared/opinion-writing-g3.js');
module.exports = makeOpinionWritingG3Type({
  id: 'G3-548', slug: 'opinions-and-reasons', mode: 'mark', exerciseType: 'reading-comprehension',
  i18n: { en: { title: "Opinions and Reasons", instruction: "An opinion piece states an opinion and gives reasons for it." } },
});
