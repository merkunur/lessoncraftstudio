/** K-206 — Sort things that can fly vs cannot fly. SCIENCE concept-sort. */
'use strict';
const { makeScienceCategorySort } = require('../_shared/science-category-sort.js');
module.exports = makeScienceCategorySort({
  id: 'K-206', slug: 'things-that-fly', gradeBand: 'K', exerciseType: 'science-sort',
  data: require('../../data/science/can-fly-vs-cannot.json'),
  i18n: { en: { title: 'Things That Fly', instruction: 'Draw a line from each picture to the group it belongs to.' } },
});
