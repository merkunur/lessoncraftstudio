/** G2-560 — Revise Your Opinion Piece (W.2.1; opinion-letters-g2 factory; English literacy year 2026-11-17) */
'use strict';
const { makeOpinionLettersType } = require('../_shared/opinion-letters-g2.js');
module.exports = makeOpinionLettersType({
  id: 'G2-560', slug: 'revise-your-opinion-piece', mode: 'revise', exerciseType: 'sentence-building',
  i18n: { en: { title: "Revise Your Opinion Piece", instruction: "A reason tells why. A closing sentence says the opinion again in new words." } },
});
