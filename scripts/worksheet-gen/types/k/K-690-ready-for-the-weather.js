/** K-690 — Ready for the Weather (Batch K, Daily Teaching System Stage D-5, 2026-11-23; science en-K-009). dk-kinder.js mode 'storm'. English only. */
'use strict';
const { makeDkKinderType } = require('../_shared/dk-kinder.js');
module.exports = makeDkKinderType({
  id: 'K-690', slug: 'ready-for-the-weather', mode: 'storm', exerciseType: 'weather-symbols',
  difficulty: {"1":{"rows":2},"2":{"rows":4},"3":{"rows":4,"draw":true}},
  i18n: { en: { title: "Ready for the Weather", instruction: "Look at the weather in each row. Circle what you should do, wear, or bring." } },
});
