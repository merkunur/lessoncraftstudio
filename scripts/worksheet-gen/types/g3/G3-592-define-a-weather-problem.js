/** G3-592 — Define a Weather Problem (Batch 3, Daily Teaching System Stage D-5, 2026-11-24; science en-3-101). dk-g3.js mode 'g3-hazard-planner'. English only. */
'use strict';
const { makeG3Type } = require('../_shared/dk-g3.js');
module.exports = makeG3Type({
  id: 'G3-592', slug: 'define-a-weather-problem', mode: 'g3-hazard-planner', exerciseType: 'weather-symbols',
  difficulty: {"1":{"choose":true},"2":{"frames":true},"3":{"two":true}},
  i18n: { en: { title: "Define a Weather Problem", instruction: "Write the hazard, the problem it causes, what a good solution must do and your limits. Sketch it." } },
});
