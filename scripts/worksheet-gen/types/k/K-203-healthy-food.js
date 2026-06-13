/** K-203 — Sort foods into healthy vs not-healthy. SCIENCE concept-sort. */
'use strict';
const { makeScienceCategorySort } = require('../_shared/science-category-sort.js');
module.exports = makeScienceCategorySort({
  id: 'K-203', slug: 'healthy-and-not-healthy-foods', gradeBand: 'K', exerciseType: 'science-sort',
  data: require('../../data/science/healthy-vs-unhealthy-food.json'),
  i18n: { en: { title: 'Healthy and Not-Healthy Foods', instruction: 'Draw a line from each food to the group it belongs to.' } },
});
