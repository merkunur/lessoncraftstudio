/** G3-551 — Draft Your Opinion Piece (opinion-writing-g3 factory; English literacy year 2026-11-17) */
'use strict';
const { makeOpinionWritingG3Type } = require('../_shared/opinion-writing-g3.js');
module.exports = makeOpinionWritingG3Type({
  id: 'G3-551', slug: 'draft-your-opinion-piece', mode: 'draft', exerciseType: 'sentence-building',
  i18n: { en: { title: "Draft Your Opinion Piece", instruction: "Write your opinion and reasons. Join them with linking words." } },
});
