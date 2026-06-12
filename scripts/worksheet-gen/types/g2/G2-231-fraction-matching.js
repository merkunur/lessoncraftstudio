/** G2-231 — Fraction Friends (fraction-tasks factory, mode match-equiv) */
'use strict';
const { makeFractionType } = require('../_shared/fraction-tasks.js');
module.exports = makeFractionType({
  id: 'G2-231', slug: 'fraction-matching', mode: 'match-equiv', ds: [2,3,4],
  i18n: { en: { title: 'Fraction Friends', instruction: 'Draw a line from each picture to its fraction.' } },
});
