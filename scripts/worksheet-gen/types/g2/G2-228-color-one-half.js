/** G2-228 — Half and Half (fraction-tasks factory, mode shade) */
'use strict';
const { makeFractionType } = require('../_shared/fraction-tasks.js');
module.exports = makeFractionType({
  id: 'G2-228', slug: 'halves', mode: 'shade', ds: [2],
  // Level Set 2026-10-08 (Fractions): level 1 / level 3 knobs (types/_shared/fraction-tasks.js); level 2 is the published page
  level: { 1: { shapes: ['bar', 'square'] }, 3: { halfOf: [4, 6] } },
  i18n: { en: { title: 'Half and Half', instruction: 'Color one half of each shape.' } },
});
