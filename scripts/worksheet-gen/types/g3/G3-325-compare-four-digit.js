/** G3-325 — Compare 4-digit numbers. */
'use strict';
const { makeCompareOrderType } = require('../_shared/compare-order.js');
module.exports = makeCompareOrderType({
  id: 'G3-325', slug: 'comparing-4-digit-numbers', mode: 'compare', digits: 4, gradeBand: 'G23',
  i18n: { en: { title: 'Thousands Showdown', instruction: 'Compare the numbers. Circle the right symbol.' } },
});
