/** K-210 — Sort vehicles by where they travel (land / water / air). SCIENCE concept-sort. */
'use strict';
const { makeScienceCategorySort } = require('../_shared/science-category-sort.js');
module.exports = makeScienceCategorySort({
  id: 'K-210', slug: 'land-water-air-transportation', gradeBand: 'K', exerciseType: 'science-sort',
  data: require('../../data/science/transportation-land-water-air.json'),
  i18n: { en: { title: 'Land, Water, and Air Transportation', instruction: 'Draw a line from each vehicle to where it travels.' } },
});
