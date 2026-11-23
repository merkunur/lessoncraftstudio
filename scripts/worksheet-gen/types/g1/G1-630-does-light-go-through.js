/** G1-630 — Does Light Go Through? (Batch 1, Daily Teaching System Stage D-5, 2026-11-23; science en-1-037). dk-g1.js mode 'g1-light-test'. English only. */
'use strict';
const { makeG1Type } = require('../_shared/dk-g1.js');
module.exports = makeG1Type({
  id: 'G1-630', slug: 'does-light-go-through', mode: 'g1-light-test', exerciseType: 'science-sort',
  difficulty: {"1":{"n":4},"2":{"n":6},"3":{"n":6,"write":true}},
  i18n: { en: { title: "Does Light Go Through?", instruction: "Shine the flashlight at each thing. Color the box that shows what the light did." } },
});
