/** G2-605 — Healthy in Three Ways (Batch 2, Daily Teaching System Stage D-5, 2026-11-24; health en-2-015). dk-g2-health.js mode 'g2-wellness'. English only. */
'use strict';
const { makeG2Type } = require('../_shared/dk-g2-health.js');
module.exports = makeG2Type({
  id: 'G2-605', slug: 'healthy-in-three-ways', mode: 'g2-wellness', exerciseType: 'healthy-habits',
  difficulty: {"1":{"cards":6},"2":{"cards":9},"3":{"cards":9,"write":true}},
  i18n: { en: { title: "Healthy in Three Ways", instruction: "Cut out the cards. Glue each one under the part of being well it helps." } },
});
