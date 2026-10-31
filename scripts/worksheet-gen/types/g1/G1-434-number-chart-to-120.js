/** G1-434 — the number chart to 120 with missing numbers, most of them past 100 (T1, 1.NBT.A.1). Number Charts maker, 2026-11-01. See types/_shared/number-chart-more.js. */
'use strict';
const { makeChartMoreType } = require('../_shared/number-chart-more.js');

module.exports = makeChartMoreType({
  id: 'G1-434', slug: 'number-chart-to-120', mode: 'chart120', gradeBand: 'G1',
  i18n: { en: { title: 'The 120 Chart', instruction: 'The chart goes on past 100. Write each missing number in its box.' } },
});
