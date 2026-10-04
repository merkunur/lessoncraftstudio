/** G3-301 — Big Arrays (array-tasks factory, mode count-array) */
'use strict';
const { makeArrayType } = require('../_shared/array-tasks.js');
module.exports = makeArrayType({
  id: 'G3-301', slug: 'multiplication-arrays-g3', mode: 'count-array',  gradeBand: 'G23',
  // 2026-10-04 (pedagogy fix): "Big Arrays" shared the kindergarten ranges (2 x 2 up). Now every level is a big array:
  // level 1 9-20, level 2 12-35 (the published pages are republished), level 3 up to 6 rows of 10.
  difficulty: { 1: { minR: 3, maxR: 4, minC: 3, maxC: 5, cards: 4 }, 2: { minR: 3, maxR: 5, minC: 4, maxC: 7, cards: 4 }, 3: { minR: 4, maxR: 6, minC: 6, maxC: 10, cards: 4 } },
  i18n: { en: { title: 'Big Arrays', instruction: 'Count all the pictures. Write how many there are in all.' } },
});
