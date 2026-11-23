/** G1-650 — Fire Safety and Calling 911 (Batch 1, Daily Teaching System Stage D-5, 2026-11-23; health en-1 teacher-led (unit 0 lesson 2)). dk-g1-health.js mode 'g1-fire-safety'. English only. */
'use strict';
const { makeG1Type } = require('../_shared/dk-g1-health.js');
module.exports = makeG1Type({
  id: 'G1-650', slug: 'fire-safety-and-calling-911', mode: 'g1-fire-safety', exerciseType: 'healthy-habits',
  difficulty: {"1":{},"2":{"address":true},"3":{"address":true,"why":true}},
  i18n: { en: { title: "Fire Safety and Calling 911", instruction: "Write 1, 2, 3 under the steps. Circle 9, 1, 1 on the phone. Write your name and your street address." } },
});
