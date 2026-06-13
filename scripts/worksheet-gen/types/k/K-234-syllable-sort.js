/** K-234 — Sort pictures by their number of syllables. LITERACY, reuses science concept-sort. */
'use strict';
const { makeLitSort } = require('../_shared/lit-sort.js');
module.exports = makeLitSort({
  id: 'K-234', slug: 'sort-by-syllables', gradeBand: 'K', exerciseType: 'phonological-awareness',
  data: require('../../data/literacy/syllable-sort.json'),
  i18n: { en: { title: 'Sort by Syllables', instruction: 'Draw a line from each picture to its number of syllables.' } },
});
