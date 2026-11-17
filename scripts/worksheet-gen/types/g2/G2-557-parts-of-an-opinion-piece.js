/** G2-557 — Parts of an Opinion Piece (W.2.1; opinion-letters-g2 factory; English literacy year 2026-11-17) */
'use strict';
const { makeOpinionLettersType } = require('../_shared/opinion-letters-g2.js');
module.exports = makeOpinionLettersType({
  id: 'G2-557', slug: 'parts-of-an-opinion-piece', mode: 'find', exerciseType: 'sentence-building',
  i18n: { en: { title: "Parts of an Opinion Piece", instruction: "An opinion tells what a writer thinks. Reasons tell why." } },
});
