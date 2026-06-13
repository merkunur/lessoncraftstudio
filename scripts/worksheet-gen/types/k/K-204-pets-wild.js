/** K-204 — Sort animals into pets vs wild animals. SCIENCE concept-sort. */
'use strict';
const { makeScienceCategorySort } = require('../_shared/science-category-sort.js');
module.exports = makeScienceCategorySort({
  id: 'K-204', slug: 'pets-and-wild-animals', gradeBand: 'K', exerciseType: 'science-sort',
  data: require('../../data/science/pets-vs-wild-animals.json'),
  i18n: { en: { title: 'Pets and Wild Animals', instruction: 'Draw a line from each animal to the group it belongs to.' } },
});
