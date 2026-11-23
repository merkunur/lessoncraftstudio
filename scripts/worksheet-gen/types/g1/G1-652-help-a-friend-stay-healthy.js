/** G1-652 — Help a Friend Stay Healthy (Batch 1, Daily Teaching System Stage D-5, 2026-11-23; health en-1 teacher-led (unit 1 lesson 4)). dk-g1-health.js mode 'g1-help-friend'. English only. */
'use strict';
const { makeG1Type } = require('../_shared/dk-g1-health.js');
module.exports = makeG1Type({
  id: 'G1-652', slug: 'help-a-friend-stay-healthy', mode: 'g1-help-friend', exerciseType: 'healthy-habits',
  difficulty: {"1":{"trace":true},"2":{"scenes":3},"3":{"scenes":3,"frame":true}},
  i18n: { en: { title: "Help a Friend Stay Healthy", instruction: "Circle the reminder a friend would listen to. Then draw one way you helped a friend." } },
});
