/** G2-224 — Place-value chart: fill H/T/O from the blocks. */
'use strict';
const { makeBaseTenType } = require('../_shared/base-ten-tasks.js');
module.exports = makeBaseTenType({
  id: 'G2-224', slug: 'place-value-chart', mode: 'pv-chart', gradeBand: 'G23',
  difficulty: { 1: { maxH: 0, maxT: 9, rows: 4, unit: 12 }, 2: { maxH: 4, minH: 1, maxT: 6, rows: 4, unit: 9 }, 3: { maxH: 9, minH: 1, maxT: 9, rows: 4, unit: 8 } },
  i18n: { en: { title: 'Sort the Places', instruction: 'Count the blocks. Fill in the place-value chart.' } },
});
