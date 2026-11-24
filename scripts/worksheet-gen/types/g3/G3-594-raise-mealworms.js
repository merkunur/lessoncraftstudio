/** G3-594 — Raise Mealworms (Batch 3, Daily Teaching System Stage D-5, 2026-11-24; science en-3-105). dk-g3.js mode 'g3-mealworms'. English only. */
'use strict';
const { makeG3Type } = require('../_shared/dk-g3.js');
module.exports = makeG3Type({
  id: 'G3-594', slug: 'raise-mealworms', mode: 'g3-mealworms', exerciseType: 'animal-life-cycles',
  difficulty: {"1":{"obs":4},"2":{"obs":8,"length":true},"3":{"obs":8,"length":true,"frame":true}},
  i18n: { en: { title: "Raise Mealworms", instruction: "Draw and measure your mealworm eight times and circle its stage. Then finish the life cycle." } },
});
