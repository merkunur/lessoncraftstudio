/** K-207 — Sort clothing into summer vs winter. SCIENCE concept-sort. */
'use strict';
const { makeScienceCategorySort } = require('../_shared/science-category-sort.js');
module.exports = makeScienceCategorySort({
  id: 'K-207', slug: 'summer-and-winter-clothes', gradeBand: 'K', exerciseType: 'science-sort',
  data: require('../../data/science/summer-vs-winter-clothes.json'),
  i18n: { en: { title: 'Summer and Winter Clothes', instruction: 'Draw a line from each item of clothing to the right group.' } },
});
