/** K-033 — Order by size: write 1-3 from smallest to biggest. */
'use strict';
const { makeSizeCompareType } = require('../_shared/size-compare.js');

module.exports = makeSizeCompareType({
  id: 'K-033',
  slug: 'order-by-size-1-3',
  mode: 'order',
  target: 'largest',
  rows: 3,
  itemsPerRow: [3, 3, 3],
  i18n: {
    en: {
      title: 'Small, Medium, Big',
      instruction: 'Number the pictures from 1 (smallest) to 3 (biggest).',
    },
  },
});
