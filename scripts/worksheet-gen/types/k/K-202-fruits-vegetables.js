/** K-202 — Sort foods into fruits vs vegetables. SCIENCE concept-sort. */
'use strict';
const { makeScienceCategorySort } = require('../_shared/science-category-sort.js');
module.exports = makeScienceCategorySort({
  id: 'K-202', slug: 'fruits-and-vegetables', gradeBand: 'K', exerciseType: 'science-sort',
  data: require('../../data/science/fruits-vs-vegetables.json'),
  i18n: { en: { title: 'Fruits and Vegetables', instruction: 'Draw a line from each food to the group it belongs to.' } },
});
