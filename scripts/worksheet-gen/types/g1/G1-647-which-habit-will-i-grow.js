/** G1-647 — Which Habit Will I Grow? (Batch 1, Daily Teaching System Stage D-5, 2026-11-23; health en-1-012). dk-g1-health.js mode 'g1-habit-check'. English only. */
'use strict';
const { makeG1Type } = require('../_shared/dk-g1-health.js');
module.exports = makeG1Type({
  id: 'G1-647', slug: 'which-habit-will-i-grow', mode: 'g1-habit-check', exerciseType: 'healthy-habits',
  difficulty: {"1":{"habits":3},"2":{"habits":5},"3":{"habits":5,"frame":true}},
  i18n: { en: { title: "Which Habit Will I Grow?", instruction: "Color the sun next to each habit you did yesterday. Circle the one habit you will do more." } },
});
