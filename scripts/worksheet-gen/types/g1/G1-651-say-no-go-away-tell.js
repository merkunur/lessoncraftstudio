/** G1-651 — Say No, Go Away, Tell (Batch 1, Daily Teaching System Stage D-5, 2026-11-23; health en-1 teacher-led (unit 0 lesson 4)). dk-g1-health.js mode 'g1-say-no'. English only. */
'use strict';
const { makeG1Type } = require('../_shared/dk-g1-health.js');
module.exports = makeG1Type({
  id: 'G1-651', slug: 'say-no-go-away-tell', mode: 'g1-say-no', exerciseType: 'healthy-habits',
  difficulty: {"1":{"trace":true},"2":{"places":true},"3":{"places":true,"frame":true}},
  i18n: { en: { title: "Say No, Go Away, Tell", instruction: "Write 1, 2, 3 under the steps. Then write who you can tell at school, at recess, and at home." } },
});
