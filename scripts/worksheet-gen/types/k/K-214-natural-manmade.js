/** K-214 — Sort into natural vs man-made. SCIENCE concept-sort. */
'use strict';
const { makeScienceCategorySort } = require('../_shared/science-category-sort.js');
module.exports = makeScienceCategorySort({
  id: 'K-214', slug: 'natural-and-man-made', gradeBand: 'K', exerciseType: 'science-sort',
  data: require('../../data/science/natural-vs-manmade.json'),
  i18n: { en: { title: 'Natural and Man-made', instruction: 'Draw a line from each picture to the group it belongs to.' } },
});
