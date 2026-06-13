/** K-228 — Sort pictures by their beginning sound (letter bins). LITERACY, reuses science concept-sort. */
'use strict';
const { makeLitSort } = require('../_shared/lit-sort.js');
module.exports = makeLitSort({
  id: 'K-228', slug: 'sort-by-beginning-sound', gradeBand: 'K', exerciseType: 'beginning-sounds',
  data: require('../../data/literacy/sort-by-beginning-sound.json'),
  i18n: { en: { title: 'Sort by Beginning Sound', instruction: 'Draw a line from each picture to the letter it begins with.' } },
});
