/** G3-555 — Revise Your Opinion Piece (opinion-writing-g3 factory; English literacy year 2026-11-17) */
'use strict';
const { makeOpinionWritingG3Type } = require('../_shared/opinion-writing-g3.js');
module.exports = makeOpinionWritingG3Type({
  id: 'G3-555', slug: 'revise-your-opinion-piece', mode: 'revise', exerciseType: 'sentence-building',
  i18n: { en: { title: "Revise Your Opinion Piece", instruction: "Revise your opinion piece with a checklist and a partner." } },
});
