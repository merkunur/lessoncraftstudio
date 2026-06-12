/** G2-232 — Fair Shares? (fraction-tasks factory, mode equal-unequal) */
'use strict';
const { makeFractionType } = require('../_shared/fraction-tasks.js');
module.exports = makeFractionType({
  id: 'G2-232', slug: 'equal-parts', mode: 'equal-unequal', ds: [2,3,4],
  i18n: { en: { title: 'Fair Shares?', instruction: 'Circle every shape that is cut into EQUAL parts.' } },
});
