/** G2-225 — What is the value of the underlined digit? */
'use strict';
const { makeBaseTenType } = require('../_shared/base-ten-tasks.js');
module.exports = makeBaseTenType({
  id: 'G2-225', slug: 'value-of-the-digit', mode: 'digit-value', gradeBand: 'G23',
  difficulty: { 1: { maxH: 0, maxT: 9, rows: 5 }, 2: { maxH: 9, minH: 1, maxT: 9, rows: 5 }, 3: { maxH: 9, minH: 1, maxT: 9, rows: 6 } },
  i18n: { en: { title: 'Digit Detective', instruction: 'Look at the underlined digit. Circle its value.' } },
});
