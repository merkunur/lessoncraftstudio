/** G1-435 — colour the listed numbers on the hundreds chart: a picture appears (T2, 1.NBT.A.1 / 1.NBT.B.2). Number Charts maker, 2026-11-01. See types/_shared/number-chart-more.js. */
'use strict';
const { makeChartMoreType } = require('../_shared/number-chart-more.js');

module.exports = makeChartMoreType({
  id: 'G1-435', slug: 'hundreds-chart-hidden-picture', mode: 'hidden', gradeBand: 'G1',
  i18n: { en: { title: 'Hidden Picture on the Hundreds Chart', instruction: 'Find each number from the list on the chart and color its box. A picture appears!' } },
});
