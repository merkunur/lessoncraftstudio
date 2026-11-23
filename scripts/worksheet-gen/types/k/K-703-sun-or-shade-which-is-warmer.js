/** K-703 — Sun or Shade: Which Is Warmer? (Batch K, Daily Teaching System Stage D-5, 2026-11-23; science en-K-028). dk-kinder.js mode 'sun-shade'. English only. */
'use strict';
const { makeDkKinderType } = require('../_shared/dk-kinder.js');
module.exports = makeDkKinderType({
  id: 'K-703', slug: 'sun-or-shade-which-is-warmer', mode: 'sun-shade', exerciseType: 'earth-and-space',
  difficulty: {"1":{"pairs":2},"2":{"pairs":4},"3":{"pairs":3,"thermo":true}},
  i18n: { en: { title: "Sun or Shade: Which Is Warmer?", instruction: "Feel each thing in the sun and in the shade. Color the circle of the warmer one red and the cooler one blue." } },
});
