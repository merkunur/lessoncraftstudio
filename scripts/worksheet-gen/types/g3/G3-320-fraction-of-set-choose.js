/** G3-320 — Fraction of the Group (fraction-tasks factory, mode set-circle) */
'use strict';
const { makeFractionType } = require('../_shared/fraction-tasks.js');
module.exports = makeFractionType({
  id: 'G3-320', slug: 'fraction-of-a-set-g3', mode: 'set-circle', ds: [2,3,4],
  // Level Set 2026-10-08 (Fractions): level 1 / level 3 knobs (types/_shared/fraction-tasks.js); level 2 is the published page
  level: { 1: { ds: [2], groups: [2, 3, 4, 5] }, 3: { ds: [3, 4], setNum: 'nonunit' } },
  i18n: { en: { title: 'Fraction of the Group', instruction: 'Circle the fraction of the pictures. Write how many that is.' } },
});
