/** G1-207 — Sort foods into the four food groups. SCIENCE concept-sort (4-bin). */
'use strict';
const { makeScienceCategorySort } = require('../_shared/science-category-sort.js');
module.exports = makeScienceCategorySort({
  id: 'G1-207', slug: 'food-groups', gradeBand: 'G1', exerciseType: 'science-sort',
  // 4 bins: keep perBin lower so the strip stays one tidy row
  difficulty: { 1: { perBin: 2 }, 2: { perBin: 2 }, 3: { perBin: 3 } },
  data: require('../../data/science/food-groups.json'),
  i18n: { en: { title: 'The Four Food Groups', instruction: 'Draw a line from each food to its food group.' } },
});
