/** K-027 — Count the Array (array-tasks factory, mode count-array) */
'use strict';
const { makeArrayType } = require('../_shared/array-tasks.js');
module.exports = makeArrayType({
  id: 'K-027', slug: 'array-counting', mode: 'count-array',  gradeBand: 'K',
  // 2026-10-04 (pedagogy fix): the shared default reached 24 at level 2 and 40 at level 3 — the K standard (K.CC.B.5)
  // counts arrays up to 20. Level 1 up to 9, level 2 up to 20 (the published pages are republished), level 3 12-20.
  difficulty: { 1: { maxR: 3, maxC: 3, cards: 4 }, 2: { maxR: 4, maxC: 5, cards: 4 }, 3: { minR: 3, maxR: 4, minC: 4, maxC: 5, cards: 4 } },
  i18n: { en: { title: 'Count the Array', instruction: 'Count all the pictures. Write how many there are in all.' } },
});
