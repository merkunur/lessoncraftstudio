/** G3-603 — Fuel for the Day (Batch 3, Daily Teaching System Stage D-5, 2026-11-24; health en-3-027). dk-g3-health.js mode 'g3-myplate-day'. English only. */
'use strict';
const { makeG3Type } = require('../_shared/dk-g3-health.js');
module.exports = makeG3Type({
  id: 'G3-603', slug: 'fuel-for-the-day', mode: 'g3-myplate-day', exerciseType: 'healthy-habits',
  difficulty: {"1":{"meals":1},"2":{"meals":4},"3":{"meals":4,"missing":true}},
  i18n: { en: { title: "Fuel for the Day", instruction: "Plan the meals for one day. Check the food groups in each meal. Circle each drink’s answer." } },
});
