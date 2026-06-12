/** G1-135 — Order numbers least to greatest. */
'use strict';
const { makeCompareOrderType } = require('../_shared/compare-order.js');
module.exports = makeCompareOrderType({
  id: 'G1-135', slug: 'ordering-numbers', mode: 'order', digits: 2, count: 3,
  i18n: { en: { title: 'Smallest First', instruction: 'Number them 1, 2, 3 from smallest to greatest.' } },
});
