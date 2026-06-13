/** G1-204 — Predict-and-sort: things that float vs sink. SCIENCE concept-sort. */
'use strict';
const { makeScienceCategorySort } = require('../_shared/science-category-sort.js');
module.exports = makeScienceCategorySort({
  id: 'G1-204', slug: 'sink-or-float', gradeBand: 'G1', exerciseType: 'science-sort',
  data: require('../../data/science/sink-vs-float.json'),
  i18n: { en: { title: 'Sink or Float?', instruction: 'Draw a line from each object to the group you think it belongs to.' } },
});
