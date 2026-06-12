/** G3-321 — Find the Whole (fraction-tasks factory, mode whole) */
'use strict';
const { makeFractionType } = require('../_shared/fraction-tasks.js');
module.exports = makeFractionType({
  id: 'G3-321', slug: 'unit-fraction-whole', mode: 'whole', ds: [3,4,5,6],
  i18n: { en: { title: 'Find the Whole', instruction: 'The small bar is one part. Circle the bar that shows the WHOLE.' } },
});
