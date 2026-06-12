/** K-042 — Sort 2 categories: draw a line from each picture to its bin. */
'use strict';
const { makeSortBinsType } = require('../_shared/sort-to-bins.js');
module.exports = makeSortBinsType({
  id: 'K-042', slug: 'sorting-two-groups', bins: 2,
  i18n: { en: { title: 'Sort It Out', instruction: 'Draw a line from each picture to the bin where it belongs.' } },
});
