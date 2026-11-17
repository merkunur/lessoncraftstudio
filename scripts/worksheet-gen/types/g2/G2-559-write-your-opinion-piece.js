/** G2-559 — Write Your Opinion Piece (W.2.1; opinion-letters-g2 factory; English literacy year 2026-11-17) */
'use strict';
const { makeOpinionLettersType } = require('../_shared/opinion-letters-g2.js');
module.exports = makeOpinionLettersType({
  id: 'G2-559', slug: 'write-your-opinion-piece', mode: 'draft', exerciseType: 'sentence-building',
  i18n: { en: { title: "Write Your Opinion Piece", instruction: "Tell your opinion, give your reasons, and end with a closing sentence." } },
});
