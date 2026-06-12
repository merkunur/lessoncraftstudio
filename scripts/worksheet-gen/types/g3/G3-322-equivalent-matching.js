/** G3-322 — Equal Partners (fraction-tasks factory, mode match-equiv) */
'use strict';
const { makeFractionType } = require('../_shared/fraction-tasks.js');
module.exports = makeFractionType({
  id: 'G3-322', slug: 'equivalent-fractions-matching', mode: 'match-equiv', ds: [2,3,4,6],
  i18n: { en: { title: 'Equal Partners', instruction: 'Draw a line from each picture to its fraction.' } },
});
