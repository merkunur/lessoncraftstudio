/** G1-631 — Mirrors Bounce Light (Batch 1, Daily Teaching System Stage D-5, 2026-11-23; science en-1-038). dk-g1.js mode 'g1-mirror'. English only. */
'use strict';
const { makeG1Type } = require('../_shared/dk-g1.js');
module.exports = makeG1Type({
  id: 'G1-631', slug: 'mirrors-bounce-light', mode: 'g1-mirror', exerciseType: 'science-sort',
  difficulty: {"1":{"trace":true},"2":{"choose":2},"3":{"two":true,"choose":1}},
  i18n: { en: { title: "Mirrors Bounce Light", instruction: "The light must reach the star. Circle the mirror that is turned the right way." } },
});
