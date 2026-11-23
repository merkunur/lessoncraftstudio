/** K-700 — We Test Our Boats (Batch K, Daily Teaching System Stage D-5, 2026-11-23; science en-K-021). dk-kinder.js mode 'boat-test'. English only. */
'use strict';
const { makeDkKinderType } = require('../_shared/dk-kinder.js');
module.exports = makeDkKinderType({
  id: 'K-700', slug: 'we-test-our-boats', mode: 'boat-test', exerciseType: 'sink-or-float',
  difficulty: {"1":{},"2":{"draw":"test"},"3":{"draw":"test+change"}},
  i18n: { en: { title: "We Test Our Boats", instruction: "Draw your boat in the water with our bear. After the test, circle whether our bear stayed dry or got wet." } },
});
