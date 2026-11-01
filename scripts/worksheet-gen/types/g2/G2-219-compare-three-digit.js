/** G2-219 — Compare three-digit numbers. */
'use strict';
const { makeCompareOrderType } = require('../_shared/compare-order.js');
module.exports = makeCompareOrderType({
  id: 'G2-219', slug: 'comparing-3-digit-numbers', mode: 'compare', digits: 3,
  // levels 1 and 3 are real (level 2 = the published page): docs/worksheet-gen/level-ladder/verdicts-all.json
  difficulty: { 1: { rows: 6, lo: 10, hi: 99 }, 2: { rows: 8 }, 3: { rows: 8, sameLead: true } }, gradeBand: 'G23',
  i18n: { en: { title: 'Big Number Battle', instruction: 'Compare the numbers. Circle the right symbol.' } },
});
