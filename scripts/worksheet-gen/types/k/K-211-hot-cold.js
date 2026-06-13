/** K-211 — Sort things that are hot vs cold. SCIENCE concept-sort. */
'use strict';
const { makeScienceCategorySort } = require('../_shared/science-category-sort.js');
module.exports = makeScienceCategorySort({
  id: 'K-211', slug: 'hot-and-cold', gradeBand: 'K', exerciseType: 'science-sort',
  data: require('../../data/science/hot-vs-cold.json'),
  i18n: { en: { title: 'Hot and Cold', instruction: 'Draw a line from each picture to the group it belongs to.' } },
});
