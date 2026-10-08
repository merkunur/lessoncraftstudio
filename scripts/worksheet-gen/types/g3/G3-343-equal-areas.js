/** G3-343 — Equal Pieces (fraction-tasks factory, mode equal-unequal) */
'use strict';
const { makeFractionType } = require('../_shared/fraction-tasks.js');
module.exports = makeFractionType({
  id: 'G3-343', slug: 'partition-equal-areas', mode: 'equal-unequal', ds: [2,4,6,8],
  // Level Set 2026-10-08 (Fractions): level 1 / level 3 knobs (types/_shared/fraction-tasks.js); level 2 is the published page
  level: { 1: { ds: [2, 4] }, 3: { ds: [6, 8] } },
  i18n: { en: { title: 'Equal Pieces', instruction: 'Circle every shape that is cut into EQUAL parts.' } },
});
