/** G3-317 — Fractions on the Line (fraction-tasks factory, mode line) */
'use strict';
const { makeFractionType } = require('../_shared/fraction-tasks.js');
module.exports = makeFractionType({
  id: 'G3-317', slug: 'fractions-on-a-number-line', mode: 'line', ds: [3,4,6],
  // Level Set 2026-10-08 (Fractions): level 1 / level 3 knobs (types/_shared/fraction-tasks.js); level 2 is the published page
  level: { 1: { ds: [3, 4], num: 'any' }, 3: { ds: [6, 8], innerNum: true } },
  i18n: { en: { title: 'Fractions on the Line', instruction: 'The dot marks a fraction. Circle that fraction.' } },
});
