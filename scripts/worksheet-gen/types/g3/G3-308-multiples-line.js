/** G3-308 — Skip-count multiples on a number line. */
'use strict';
const { makeNumberLineTaskType } = require('../_shared/number-line-tasks.js');
module.exports = makeNumberLineTaskType({
  id: 'G3-308', slug: 'multiples-on-number-line', mode: 'multiples', gradeBand: 'G23',
  difficulty: {
    1: { lineMax: 20, rows: 3, ks: [2, 5] },
    2: { lineMax: 30, rows: 3, ks: [3, 4, 5] },
    3: { lineMax: 40, rows: 3, ks: [6, 7, 8] },
  },
  i18n: { en: { title: 'Multiplication Hops', instruction: 'Follow the equal hops from zero. Write each landing number.' } },
});
