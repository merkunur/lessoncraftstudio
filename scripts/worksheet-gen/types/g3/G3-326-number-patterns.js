/** G3-326 — Number pattern: find the rule, fill the missing terms. */
'use strict';
const { makeNumberStripType } = require('../_shared/number-strip.js');
module.exports = makeNumberStripType({
  id: 'G3-326', slug: 'number-patterns', step: { 1: 3, 2: 6, 3: 9 }, rangeMax: 120, len: 7, gradeBand: 'G23',
  difficulty: { 1: { rows: 5, blanks: 2 }, 2: { rows: 5, blanks: 3 }, 3: { rows: 5, blanks: 3 } },
  i18n: { en: { title: 'Crack the Pattern', instruction: 'Find each row’s rule. Write the missing numbers.' } },
});
