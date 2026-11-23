/** G1-628 — Cup Telephone Tests (Batch 1, Daily Teaching System Stage D-5, 2026-11-23; science en-1-035). dk-g1.js mode 'g1-cup-phone'. English only. */
'use strict';
const { makeG1Type } = require('../_shared/dk-g1.js');
module.exports = makeG1Type({
  id: 'G1-628', slug: 'cup-telephone-tests', mode: 'g1-cup-phone', exerciseType: 'science-sort',
  difficulty: {"1":{"tests":2},"2":{"tests":3,"draw":true},"3":{"tests":3,"draw":true,"change":true}},
  i18n: { en: { title: "Cup Telephone Tests", instruction: "Circle the cups and the string we used, and draw our telephone. For each test, circle “I heard it” or “I did not hear it.”" } },
});
