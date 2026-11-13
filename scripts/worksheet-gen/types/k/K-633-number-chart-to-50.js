/** K-633 — The Number Chart to 50 (Year pages E, 2026-11-13): the chart of G1-129 with the numbers 1 to 50, for the
 *  Kindergarten count to 50 (K.CC.A.1). Level 1 six boxes apart, level 2 ten boxes, level 3 fourteen in runs. */
'use strict';
const base = require('../g1/G1-129-hundreds-chart-missing.js');
module.exports = {
  ...base,
  id: 'K-633', slug: 'number-chart-to-50', gradeBand: 'K',
  difficulty: {
    1: { v2: true, start: 1, end: 50, missing: 6, isolated: true, cellH: 104, flourish: 84 },
    2: { v2: true, start: 1, end: 50, missing: 10, isolated: true, cellH: 104, flourish: 84 },
    3: { v2: true, start: 1, end: 50, missing: 14, runs: true, cellH: 104, flourish: 84 },
  },
  i18n: { en: { title: 'The Number Chart to 50', instruction: 'Some numbers are hiding. Write each missing number in its box.' } },
};
