/** K-037 — Long and Short (size-compare factory) */
'use strict';
const { makeSizeCompareType } = require('../_shared/size-compare.js');

module.exports = makeSizeCompareType({
  id: 'K-037',
  slug: 'longest-and-shortest',
  mode: 'circle',
  target: 'largest',
  rows: 3,
  itemsPerRow: [3,4,4],
  i18n: {
    en: {
      title: 'Long and Short',
      instruction: 'Circle the LONGEST one in each row.',
    },
  },
});
