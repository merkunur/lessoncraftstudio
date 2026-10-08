/** G3-321 — Find the Whole (fraction-tasks factory, mode whole) */
'use strict';
const { makeFractionType } = require('../_shared/fraction-tasks.js');
module.exports = makeFractionType({
  id: 'G3-321', slug: 'unit-fraction-whole', mode: 'whole', ds: [3,4,5,6],
  // Level Set 2026-10-08 (Fractions): level 1 / level 3 knobs (types/_shared/fraction-tasks.js); level 2 is the published page
  level: { 1: { ds: [3, 4] }, 3: { ds: [3, 4, 6], refPart: true } },
  i18n: { en: { title: 'Find the Whole', instruction: 'The small bar is one part. Circle the bar that shows the WHOLE.' } },
});
