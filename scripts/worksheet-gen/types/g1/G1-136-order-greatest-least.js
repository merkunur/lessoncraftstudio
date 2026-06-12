/** G1-136 — Order numbers greatest to least. */
'use strict';
const { makeCompareOrderType } = require('../_shared/compare-order.js');
module.exports = makeCompareOrderType({
  id: 'G1-136', slug: 'greatest-to-least', mode: 'order', digits: 2, count: 3, descending: true,
  i18n: { en: { title: 'Biggest First', instruction: 'Number them 1, 2, 3 from greatest to smallest.' } },
});
