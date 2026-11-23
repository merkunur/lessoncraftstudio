/** K-689 — Rain Gauge: How Much Rain Fell? (Batch K, Daily Teaching System Stage D-5, 2026-11-23; science en-K-007). dk-kinder.js mode 'rain'. English only. */
'use strict';
const { makeDkKinderType } = require('../_shared/dk-kinder.js');
module.exports = makeDkKinderType({
  id: 'K-689', slug: 'rain-gauge-how-much-rain-fell', mode: 'rain', exerciseType: 'weather-symbols',
  difficulty: {"1":{"cups":2},"2":{"cups":3},"3":{"cups":3,"count":true}},
  i18n: { en: { title: "Rain Gauge: How Much Rain Fell?", instruction: "After each rainy day, color the water up to the tape mark closest to the water. Circle the day with the most rain. If two are the same, circle both." } },
});
