/** G3-323 — Round to the nearest 100 (number line). */
'use strict';
const { makeNumberLineTaskType } = require('../_shared/number-line-tasks.js');
module.exports = makeNumberLineTaskType({
  id: 'G3-323', slug: 'rounding-to-nearest-100', mode: 'round', gradeBand: 'G23',
  difficulty: {
    1: { lineMax: 500, rows: 3, roundTo: 100 },
    2: { lineMax: 900, rows: 3, roundTo: 100 },
    3: { lineMax: 900, rows: 4, roundTo: 100 },
  },
  i18n: { en: { title: 'Round to the Hundred', instruction: 'Look at the dot. Circle the hundred it is closer to.' } },
});
