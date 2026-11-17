/** G2-558 — Plan Your Opinion Piece (W.2.1; opinion-letters-g2 factory; English literacy year 2026-11-17) */
'use strict';
const { makeOpinionLettersType } = require('../_shared/opinion-letters-g2.js');
module.exports = makeOpinionLettersType({
  id: 'G2-558', slug: 'plan-your-opinion-piece', mode: 'plan', exerciseType: 'sentence-building',
  i18n: { en: { title: "Plan Your Opinion Piece", instruction: "A plan has an opinion, reasons, and a closing sentence." } },
});
