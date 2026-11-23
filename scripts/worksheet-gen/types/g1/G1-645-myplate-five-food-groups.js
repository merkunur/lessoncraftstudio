/** G1-645 — MyPlate: Five Food Groups (Batch 1, Daily Teaching System Stage D-5, 2026-11-23; health en-1-010). dk-g1-health.js mode 'g1-myplate-sort'. English only. */
'use strict';
const { makeG1Type } = require('../_shared/dk-g1-health.js');
module.exports = makeG1Type({
  id: 'G1-645', slug: 'myplate-five-food-groups', mode: 'g1-myplate-sort', exerciseType: 'science-sort',
  difficulty: {"1":{"per":1,"labels":true},"2":{"per":2,"labels":true},"3":{"per":2,"labels":false}},
  i18n: { en: { title: "MyPlate: Five Food Groups", instruction: "Draw a line from each food to its food group on the plate." } },
});
