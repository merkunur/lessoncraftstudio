/** K-688 — Wind Watch (Batch K, Daily Teaching System Stage D-5, 2026-11-23; science en-K-006). dk-kinder.js mode 'wind'. English only. */
'use strict';
const { makeDkKinderType } = require('../_shared/dk-kinder.js');
module.exports = makeDkKinderType({
  id: 'K-688', slug: 'wind-watch', mode: 'wind', exerciseType: 'weather-symbols',
  difficulty: {"1":{"days":3},"2":{"days":5,"draw":true},"3":{"days":5,"draw":true,"extremes":true}},
  i18n: { en: { title: "Wind Watch", instruction: "Each day, circle the streamer that looks like our streamer. Then draw a flag or a tree in that wind." } },
});
