/** G2-233 — Share the Set (fraction-tasks factory, mode set-circle) */
'use strict';
const { makeFractionType } = require('../_shared/fraction-tasks.js');
module.exports = makeFractionType({
  id: 'G2-233', slug: 'fraction-of-a-set', mode: 'set-circle', ds: [2,3,4], dsLevels: { 1: [2], 2: [2, 3, 4], 3: [3, 4] },
  // Level Set 2026-10-08 (Fractions): level 1 / level 3 knobs (types/_shared/fraction-tasks.js); level 2 is the published page
  level: { 1: { groups: [2, 3, 4, 5] }, 3: { setNum: 'nonunit' } },
  i18n: { en: { title: 'Share the Set', instruction: 'Circle the fraction of the pictures. Write how many that is.' } },
});
