/** G1-436 — an empty number chart to fill in from the numbers given (T3, 1.NBT.A.1, 2.NBT.A.2). Number Charts maker, 2026-11-01. See types/_shared/number-chart-more.js. */
'use strict';
const { makeChartMoreType } = require('../_shared/number-chart-more.js');

module.exports = makeChartMoreType({
  id: 'G1-436', slug: 'fill-in-the-number-chart', mode: 'blank', gradeBand: 'G1',
  i18n: { en: { title: 'Fill In the Number Chart', instruction: 'Write the missing numbers in order, box by box.' } },
});
