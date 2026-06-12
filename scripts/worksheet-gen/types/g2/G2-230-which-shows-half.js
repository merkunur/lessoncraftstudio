/** G2-230 — Find the Fraction (fraction-tasks factory, mode which-shows) */
'use strict';
const { makeFractionType } = require('../_shared/fraction-tasks.js');
module.exports = makeFractionType({
  id: 'G2-230', slug: 'identifying-fractions', mode: 'which-shows', ds: [2,3,4],
  i18n: { en: { title: 'Find the Fraction', instruction: 'Circle the shape that shows the fraction.' } },
});
