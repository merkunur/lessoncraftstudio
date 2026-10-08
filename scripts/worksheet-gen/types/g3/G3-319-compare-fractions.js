/** G3-319 — Which Is Bigger? (fraction-tasks factory, mode compare) */
'use strict';
const { makeFractionType } = require('../_shared/fraction-tasks.js');
module.exports = makeFractionType({
  id: 'G3-319', slug: 'comparing-fractions', mode: 'compare', ds: [2,3,4,6,8],
  // Level Set 2026-10-08 (Fractions): level 1 / level 3 knobs (types/_shared/fraction-tasks.js); level 2 is the published page
  level: { 3: { sameParts: true } },
  i18n: { en: { title: 'Which Is Bigger?', instruction: 'Look at both bars. Circle the bigger fraction.' } },
});
