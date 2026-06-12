/** G3-318 — Twin Fractions (fraction-tasks factory, mode match-equiv) */
'use strict';
const { makeFractionType } = require('../_shared/fraction-tasks.js');
module.exports = makeFractionType({
  id: 'G3-318', slug: 'equivalent-fractions', mode: 'match-equiv', ds: [2,3,4,6,8],
  i18n: { en: { title: 'Twin Fractions', instruction: 'Draw a line from each picture to its matching fraction.' } },
});
