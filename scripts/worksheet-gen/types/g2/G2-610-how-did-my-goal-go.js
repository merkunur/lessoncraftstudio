/** G2-610 — How Did My Goal Go? (Batch 2, Daily Teaching System Stage D-5, 2026-11-24; health en-2-021). dk-g2-health.js mode 'g2-lookback'. English only. */
'use strict';
const { makeG2Type } = require('../_shared/dk-g2-health.js');
module.exports = makeG2Type({
  id: 'G2-610', slug: 'how-did-my-goal-go', mode: 'g2-lookback', exerciseType: 'healthy-habits',
  difficulty: {"1":{},"2":{"one":true},"3":{"both":true}},
  i18n: { en: { title: "How Did My Goal Go?", instruction: "Count your suns, circle how it went, and finish the sentence. Circle what you will do now." } },
});
