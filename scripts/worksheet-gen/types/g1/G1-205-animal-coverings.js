/** G1-205 — Sort animals by body covering (fur / feathers / scales). SCIENCE concept-sort. */
'use strict';
const { makeScienceCategorySort } = require('../_shared/science-category-sort.js');
module.exports = makeScienceCategorySort({
  id: 'G1-205', slug: 'animal-coverings', gradeBand: 'G1', exerciseType: 'science-sort',
  data: require('../../data/science/animal-coverings.json'),
  i18n: { en: { title: 'Animal Coverings', instruction: 'Draw a line from each animal to its body covering.' } },
});
