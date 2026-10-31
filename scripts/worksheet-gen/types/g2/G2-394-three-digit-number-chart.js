/** G2-394 — a hundred-cell chart inside one hundred (301-400 …) with missing numbers (T5, 2.NBT.A.1-2). Number Charts maker, 2026-11-01. See types/_shared/number-chart-more.js. */
'use strict';
const { makeChartMoreType } = require('../_shared/number-chart-more.js');

module.exports = makeChartMoreType({
  id: 'G2-394', slug: 'three-digit-number-chart', mode: 'piece3', gradeBand: 'G2',
  i18n: { en: { title: 'Number Chart in the Hundreds', instruction: 'Some numbers are hiding. Write each missing number in its box.' } },
});
