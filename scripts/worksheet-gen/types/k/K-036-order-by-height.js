/** K-036 — Order by height 1-4. */
'use strict';
const { makeSizeCompareType } = require('../_shared/size-compare.js');

module.exports = makeSizeCompareType({
  id: 'K-036',
  slug: 'order-by-height-1-4',
  mode: 'order',
  target: 'largest',
  rows: 3,
  itemsPerRow: [4, 4, 4],
  i18n: {
    en: {
      title: 'Short to Tall',
      instruction: 'Number the pictures from 1 (shortest) to 4 (tallest).',
    },
  },
});
