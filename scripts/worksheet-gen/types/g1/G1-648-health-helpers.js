/** G1-648 — Health Helpers (Batch 1, Daily Teaching System Stage D-5, 2026-11-23; health en-1-014). dk-g1-health.js mode 'g1-health-helpers'. English only. */
'use strict';
const { makeG1Type } = require('../_shared/dk-g1-health.js');
module.exports = makeG1Type({
  id: 'G1-648', slug: 'health-helpers', mode: 'g1-health-helpers', exerciseType: 'healthy-habits',
  difficulty: {"1":{"helpers":3},"2":{"helpers":4,"school":true},"3":{"helpers":4,"school":true,"frame":true}},
  i18n: { en: { title: "Health Helpers", instruction: "Draw a line from each helper to their name. Then finish the sentence." } },
});
