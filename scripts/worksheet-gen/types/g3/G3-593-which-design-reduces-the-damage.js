/** G3-593 — Which Design Reduces the Damage? (Batch 3, Daily Teaching System Stage D-5, 2026-11-24; science en-3-102). dk-g3.js mode 'g3-hazard-test'. English only. */
'use strict';
const { makeG3Type } = require('../_shared/dk-g3.js');
module.exports = makeG3Type({
  id: 'G3-593', slug: 'which-design-reduces-the-damage', mode: 'g3-hazard-test', exerciseType: 'weather-symbols',
  difficulty: {"1":{"designs":1},"2":{"designs":2},"3":{"designs":2,"cer":true}},
  i18n: { en: { title: "Which Design Reduces the Damage?", instruction: "Sketch two designs and record what happened in each test. Circle the design that worked better." } },
});
