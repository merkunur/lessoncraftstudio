/** G1-206 — Sort animals into plant eaters vs meat eaters. SCIENCE concept-sort. */
'use strict';
const { makeScienceCategorySort } = require('../_shared/science-category-sort.js');
module.exports = makeScienceCategorySort({
  id: 'G1-206', slug: 'what-animals-eat', gradeBand: 'G1', exerciseType: 'science-sort',
  data: require('../../data/science/what-animals-eat.json'),
  i18n: { en: { title: 'What Animals Eat', instruction: 'Draw a line from each animal to the group it belongs to.' } },
});
