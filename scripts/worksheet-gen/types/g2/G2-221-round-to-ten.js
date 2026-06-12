/** G2-221 — Round to the nearest 10 (number line). */
'use strict';
const { makeNumberLineTaskType } = require('../_shared/number-line-tasks.js');
module.exports = makeNumberLineTaskType({
  id: 'G2-221', slug: 'rounding-to-nearest-10', mode: 'round', gradeBand: 'G23',
  difficulty: {
    1: { lineMax: 50, rows: 3, roundTo: 10 },
    2: { lineMax: 100, rows: 3, roundTo: 10 },
    3: { lineMax: 100, rows: 4, roundTo: 10 },
  },
  i18n: { en: { title: 'Round It!', instruction: 'Look at the dot. Circle the ten it is closer to.' } },
});
