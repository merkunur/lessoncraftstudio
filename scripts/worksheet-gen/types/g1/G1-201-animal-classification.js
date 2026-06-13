/** G1-201 — Sort animals by class (mammals / birds / reptiles). SCIENCE concept-sort. */
'use strict';
const { makeScienceCategorySort } = require('../_shared/science-category-sort.js');
module.exports = makeScienceCategorySort({
  id: 'G1-201', slug: 'animal-classification', gradeBand: 'G1', exerciseType: 'science-sort',
  data: require('../../data/science/animal-classification.json'),
  i18n: { en: { title: 'Sort the Animals', instruction: 'Draw a line from each animal to the group it belongs to.' } },
});
