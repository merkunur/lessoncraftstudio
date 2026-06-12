/** G2-220 — Order three-digit numbers. */
'use strict';
const { makeCompareOrderType } = require('../_shared/compare-order.js');
module.exports = makeCompareOrderType({
  id: 'G2-220', slug: 'ordering-3-digit-numbers', mode: 'order', digits: 3, count: 4, gradeBand: 'G23',
  i18n: { en: { title: 'Line Them Up', instruction: 'Number them 1 to 4 from smallest to greatest.' } },
});
