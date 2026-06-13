/** K-208 — Sort things we see in the day vs night. SCIENCE concept-sort. */
'use strict';
const { makeScienceCategorySort } = require('../_shared/science-category-sort.js');
module.exports = makeScienceCategorySort({
  id: 'K-208', slug: 'day-and-night', gradeBand: 'K', exerciseType: 'science-sort',
  data: require('../../data/science/day-vs-night.json'),
  i18n: { en: { title: 'Day and Night', instruction: 'Draw a line from each picture to the group it belongs to.' } },
});
