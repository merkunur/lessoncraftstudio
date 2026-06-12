/** G3-343 — Equal Pieces (fraction-tasks factory, mode equal-unequal) */
'use strict';
const { makeFractionType } = require('../_shared/fraction-tasks.js');
module.exports = makeFractionType({
  id: 'G3-343', slug: 'partition-equal-areas', mode: 'equal-unequal', ds: [2,4,6,8],
  i18n: { en: { title: 'Equal Pieces', instruction: 'Circle every shape that is cut into EQUAL parts.' } },
});
