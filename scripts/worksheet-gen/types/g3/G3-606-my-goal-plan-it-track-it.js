/** G3-606 — My Goal: Plan It, Track It (Batch 3, Daily Teaching System Stage D-5, 2026-11-24; health en-3-030). dk-g3-health.js mode 'g3-goal-plan'. English only. */
'use strict';
const { makeG3Type } = require('../_shared/dk-g3-health.js');
module.exports = makeG3Type({
  id: 'G3-606', slug: 'my-goal-plan-it-track-it', mode: 'g3-goal-plan', exerciseType: 'healthy-habits',
  difficulty: {"1":{"steps":2},"2":{"steps":3,"why":true},"3":{"steps":3,"why":true,"backup":true}},
  i18n: { en: { title: "My Goal: Plan It, Track It", instruction: "Write your goal, why it matters and your plan. Track it for 21 days. Then look back." } },
});
