/** K-032 — Big and Small (size-compare factory) */
'use strict';
const { makeSizeCompareType } = require('../_shared/size-compare.js');

module.exports = makeSizeCompareType({
  id: 'K-032',
  slug: 'biggest-and-smallest',
  mode: 'circle',
  target: 'largest',
  rows: 3,
  itemsPerRow: [3,4,5],
  i18n: {
    en: {
      title: 'Big and Small',
      instruction: 'Circle the BIGGEST one in each row.',
    },
  },
});
