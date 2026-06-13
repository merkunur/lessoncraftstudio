/** K-201 — Sort living vs non-living things. SCIENCE concept-sort. */
'use strict';
const { makeScienceCategorySort } = require('../_shared/science-category-sort.js');
module.exports = makeScienceCategorySort({
  id: 'K-201', slug: 'living-and-nonliving', gradeBand: 'K', exerciseType: 'science-sort',
  data: require('../../data/science/living-vs-nonliving.json'),
  i18n: { en: { title: 'Living and Non-living Things', instruction: 'Draw a line from each picture to the group it belongs to.' } },
});
