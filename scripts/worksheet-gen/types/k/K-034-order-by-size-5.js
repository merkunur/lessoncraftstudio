/** K-034 — Order by size 1-5. */
'use strict';
const { makeSizeCompareType } = require('../_shared/size-compare.js');

module.exports = makeSizeCompareType({
  id: 'K-034',
  slug: 'order-by-size-1-5',
  mode: 'order',
  target: 'largest',
  rows: 3,
  itemsPerRow: [5, 5, 5],
  i18n: {
    en: {
      title: 'Smallest to Biggest',
      instruction: 'Number the pictures from 1 (smallest) to 5 (biggest).',
    },
  },
});
