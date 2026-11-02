/** G1-207 — Sort foods into the four food groups. SCIENCE concept-sort (4-bin). */
'use strict';
const { makeScienceCategorySort } = require('../_shared/science-category-sort.js');
module.exports = makeScienceCategorySort({
  id: 'G1-207', slug: 'food-groups', gradeBand: 'G1', exerciseType: 'science-sort',
  // 4 bins: keep perBin lower so the strip stays one tidy row
  // level 1 one food a group (it was level 2 again; only level 2 is published)
  difficulty: { 1: { perBin: 1 }, 2: { perBin: 2 }, 3: { perBin: 3 } },
  data: require('../../data/science/food-groups.json'),
  i18n: { en: { title: 'The Four Food Groups', instruction: 'Draw a line from each food to its food group.' } },
});
