/** G2-234 — Cut It Right (fraction-tasks factory, mode which-shows) */
'use strict';
const { makeFractionType } = require('../_shared/fraction-tasks.js');
module.exports = makeFractionType({
  id: 'G2-234', slug: 'partitioning-shapes', mode: 'which-shows', ds: [2,3,4],
  // Level Set 2026-10-08 (Fractions): level 1 / level 3 knobs (types/_shared/fraction-tasks.js); level 2 is the published page
  level: { 1: { ds: [2, 3, 4] }, 3: { ds: [3, 4] } },
  i18n: { en: { title: 'Cut It Right', instruction: 'Circle the shape that shows the fraction.' } },
});
