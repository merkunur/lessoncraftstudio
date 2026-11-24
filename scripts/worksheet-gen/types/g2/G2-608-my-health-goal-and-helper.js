/** G2-608 — My Health Goal and Helper (Batch 2, Daily Teaching System Stage D-5, 2026-11-24; health en-2-019). dk-g2-health.js mode 'g2-goal'. English only. */
'use strict';
const { makeG2Type } = require('../_shared/dk-g2-health.js');
module.exports = makeG2Type({
  id: 'G2-608', slug: 'my-health-goal-and-helper', mode: 'g2-goal', exerciseType: 'healthy-habits',
  difficulty: {"1":{"circle":true},"2":{"steps":2},"3":{"steps":3,"reason":true}},
  i18n: { en: { title: "My Health Goal and Helper", instruction: "Write your goal and two steps. Draw your helper. Color a sun each day you keep your goal." } },
});
