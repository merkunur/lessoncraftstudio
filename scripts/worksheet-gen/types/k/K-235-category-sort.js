/** K-235 — Sort pictures into vocabulary categories. LITERACY, reuses science concept-sort. */
'use strict';
const { makeScienceCategorySort } = require('../_shared/science-category-sort.js');
module.exports = makeScienceCategorySort({
  id: 'K-235', slug: 'sort-by-category', gradeBand: 'K', exerciseType: 'picture-vocabulary',
  data: require('../../data/literacy/category-vocab.json'),
  i18n: { en: { title: 'Sort by Category', instruction: 'Draw a line from each picture to the group it belongs to.' } },
});
