/** G3-310 — Division as repeated subtraction (number line). */
'use strict';
const { makeNumberLineTaskType } = require('../_shared/number-line-tasks.js');
module.exports = makeNumberLineTaskType({
  id: 'G3-310', slug: 'repeated-subtraction-division', mode: 'repeated-sub', gradeBand: 'G23',
  difficulty: {
    1: { lineMax: 12, rows: 3, ks: [2, 3] },
    2: { lineMax: 20, rows: 3, ks: [3, 4, 5] },
    3: { lineMax: 30, rows: 3, ks: [4, 5, 6] },
  },
  i18n: { en: { title: 'Hop Down to Zero', instruction: 'Count the equal hops back to zero. Write how many hops it takes.' } },
});
