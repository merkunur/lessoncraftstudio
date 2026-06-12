/** G1-137 — Compare two-digit numbers: <, =, >. */
'use strict';
const { makeCompareOrderType } = require('../_shared/compare-order.js');
module.exports = makeCompareOrderType({
  id: 'G1-137', slug: 'greater-than-less-than', mode: 'compare', digits: 2,
  i18n: { en: { title: 'Greater or Less?', instruction: 'Compare the numbers. Circle the right symbol.' } },
});
