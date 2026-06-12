/** G1-160 — Categorize into 3 groups. */
'use strict';
const { makeSortBinsType } = require('../_shared/sort-to-bins.js');
module.exports = makeSortBinsType({
  id: 'G1-160', slug: 'sorting-three-groups', bins: 3, gradeBand: 'G1',
  i18n: { en: { title: 'Three Groups', instruction: 'Draw a line from each picture to the bin where it belongs.' } },
});
