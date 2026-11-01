/** G1-441 — fact triangle cards to cut out (T6, 1.OA.B.4 / 3.OA.B.6; material). Number Bonds maker, 2026-11-01. See types/_shared/number-bond-more.js. */
'use strict';
const { makeBondMoreType } = require('../_shared/number-bond-more.js');

module.exports = makeBondMoreType({
  id: 'G1-441', slug: 'fact-triangle-cards', mode: 'triangles', gradeBand: 'G1',
  i18n: { en: { title: "Fact Triangle Cards", instruction: "Cut out the triangles along the dashed lines. Cover one corner: which number is hiding?" } },
});
