/** G2-611 — Stop, Think, Choose (Batch 2, Daily Teaching System Stage D-5, 2026-11-24; health en-2-023). dk-g2-health.js mode 'g2-safety'. English only. */
'use strict';
const { makeG2Type } = require('../_shared/dk-g2-health.js');
module.exports = makeG2Type({
  id: 'G2-611', slug: 'stop-think-choose', mode: 'g2-safety', exerciseType: 'healthy-habits',
  difficulty: {"1":{"pairs":2},"2":{"pairs":4},"3":{"pairs":4,"rule":true}},
  i18n: { en: { title: "Stop, Think, Choose", instruction: "Circle the safe choice in each pair. Write what could happen next." } },
});
