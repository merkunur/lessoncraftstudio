/** K-463 — Order by Size (boxes) (Measurement & Size maker, 2026-11-02). See types/_shared/measurement-more.js. */
'use strict';
const { makeMeasurementMoreType } = require('../_shared/measurement-more.js');

module.exports = makeMeasurementMoreType({
  id: 'K-463', slug: 'order-by-size-in-boxes', mode: 'boxed', gradeBand: 'K',
  i18n: { en: { title: "Order by Size", instruction: "Number the pictures in each box from 1 (smallest) to 3 (biggest)." } },
});
