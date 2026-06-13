/** K-209 — Sort animals into farm vs wild. SCIENCE concept-sort. */
'use strict';
const { makeScienceCategorySort } = require('../_shared/science-category-sort.js');
module.exports = makeScienceCategorySort({
  id: 'K-209', slug: 'farm-and-wild-animals', gradeBand: 'K', exerciseType: 'science-sort',
  data: require('../../data/science/farm-vs-wild-animals.json'),
  i18n: { en: { title: 'Farm and Wild Animals', instruction: 'Draw a line from each animal to the group it belongs to.' } },
});
