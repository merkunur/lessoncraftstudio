/** G1-137 — Compare two-digit numbers: <, =, >. */
'use strict';
const { makeCompareOrderType } = require('../_shared/compare-order.js');
module.exports = makeCompareOrderType({
  id: 'G1-137', slug: 'greater-than-less-than', mode: 'compare', digits: 2,
  // levels 1 and 3 are real (level 2 = the published page): docs/worksheet-gen/level-ladder/verdicts-all.json
  difficulty: { 1: { rows: 6, lo: 1, hi: 20, noEq: true }, 2: { rows: 8 }, 3: { rows: 8, sameLead: true, swaps: true } },
  i18n: { en: { title: 'Greater or Less?', instruction: 'Compare the numbers. Circle the right symbol.' } },
});
