/** K-691 — What Do Animals Eat? (Batch K, Daily Teaching System Stage D-5, 2026-11-23; science en-K-011). dk-kinder.js mode 'eats'. English only. */
'use strict';
const { makeDkKinderType } = require('../_shared/dk-kinder.js');
module.exports = makeDkKinderType({
  id: 'K-691', slug: 'what-do-animals-eat', mode: 'eats', exerciseType: 'habitats',
  difficulty: {"1":{"rows":4},"2":{"rows":5},"3":{"rows":5,"draw":true}},
  i18n: { en: { title: "What Do Animals Eat?", instruction: "Circle every food each animal eats. Some animals eat plants and animals." } },
});
