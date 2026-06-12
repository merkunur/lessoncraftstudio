/** G2-219 — Compare three-digit numbers. */
'use strict';
const { makeCompareOrderType } = require('../_shared/compare-order.js');
module.exports = makeCompareOrderType({
  id: 'G2-219', slug: 'comparing-3-digit-numbers', mode: 'compare', digits: 3, gradeBand: 'G23',
  i18n: { en: { title: 'Big Number Battle', instruction: 'Compare the numbers. Circle the right symbol.' } },
});
