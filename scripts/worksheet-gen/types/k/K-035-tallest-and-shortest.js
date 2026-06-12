/** K-035 — Tall and Short (size-compare factory) */
'use strict';
const { makeSizeCompareType } = require('../_shared/size-compare.js');

module.exports = makeSizeCompareType({
  id: 'K-035',
  slug: 'tallest-and-shortest',
  mode: 'circle',
  target: 'largest',
  rows: 3,
  itemsPerRow: [3,4,4],
  i18n: {
    en: {
      title: 'Tall and Short',
      instruction: 'Circle the TALLEST one in each row.',
    },
  },
});
