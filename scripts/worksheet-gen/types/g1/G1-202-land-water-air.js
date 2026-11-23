/** G1-202 — Sort animals by where they live (land / water). SCIENCE concept-sort. */
'use strict';
const { makeScienceCategorySort } = require('../_shared/science-category-sort.js');
module.exports = makeScienceCategorySort({
  id: 'G1-202', slug: 'where-animals-live', gradeBand: 'G1', exerciseType: 'science-sort',
  // 2026-11-23 D-2 teacher review: no animal LIVES in the air (eagles, bees and butterflies fly but live and nest on
  // land), so the "Air" bin taught a misconception. Two bins, Land and Water (the data's first two), one-home animals
  // only (crab and seal retired in the data); 6 / 8 / 10 animals (it was 6 / 9 / 12 over three bins).
  maxBins: 2,
  difficulty: { 1: { perBin: 3 }, 2: { perBin: 4 }, 3: { perBin: 5 } },
  data: require('../../data/science/land-water-air-animals.json'),
  i18n: { en: { title: 'Where Do Animals Live?', instruction: 'Draw a line from each animal to where it lives.' } },
});
