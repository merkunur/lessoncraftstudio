/** G3-318 — Twin Fractions (fraction-tasks factory, mode match-equiv) */
'use strict';
const { makeFractionType } = require('../_shared/fraction-tasks.js');
module.exports = makeFractionType({
  id: 'G3-318', slug: 'equivalent-fractions', mode: 'match-equiv', ds: [2,3,4,6,8],
  // Level Set 2026-10-08 (Fractions): level 1 / level 3 knobs (types/_shared/fraction-tasks.js); level 2 is the published page
  equiv: true, level: { 1: { equivFactor: [2], pic: 'small' }, 3: { bigDen: 6, pic: 'big' } },
  i18n: { en: { title: 'Twin Fractions', instruction: 'Draw a line from each picture to the fraction that shows the same amount.' } },
});
