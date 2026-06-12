/** G3-319 — Which Is Bigger? (fraction-tasks factory, mode compare) */
'use strict';
const { makeFractionType } = require('../_shared/fraction-tasks.js');
module.exports = makeFractionType({
  id: 'G3-319', slug: 'comparing-fractions', mode: 'compare', ds: [2,3,4,6,8],
  i18n: { en: { title: 'Which Is Bigger?', instruction: 'Look at both bars. Circle the bigger fraction.' } },
});
