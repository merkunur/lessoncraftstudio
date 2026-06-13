/** K-212 — Sort into needs vs wants. SCIENCE concept-sort (SEL / social studies). */
'use strict';
const { makeScienceCategorySort } = require('../_shared/science-category-sort.js');
module.exports = makeScienceCategorySort({
  id: 'K-212', slug: 'wants-and-needs', gradeBand: 'K', exerciseType: 'science-sort',
  data: require('../../data/science/wants-vs-needs.json'),
  i18n: { en: { title: 'Wants and Needs', instruction: 'Draw a line from each picture to the group it belongs to.' } },
});
