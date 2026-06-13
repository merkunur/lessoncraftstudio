/** G1-202 — Sort animals by where they live (land / water / air). SCIENCE concept-sort. */
'use strict';
const { makeScienceCategorySort } = require('../_shared/science-category-sort.js');
module.exports = makeScienceCategorySort({
  id: 'G1-202', slug: 'where-animals-live', gradeBand: 'G1', exerciseType: 'science-sort',
  data: require('../../data/science/land-water-air-animals.json'),
  i18n: { en: { title: 'Where Do Animals Live?', instruction: 'Draw a line from each animal to where it lives.' } },
});
