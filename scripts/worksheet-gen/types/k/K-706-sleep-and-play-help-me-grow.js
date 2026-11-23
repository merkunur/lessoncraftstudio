/** K-706 — Sleep and Play Help Me Grow (Batch K, Daily Teaching System Stage D-5, 2026-11-23; health en-K-005). dk-kinder.js mode 'sleep-play'. English only. */
'use strict';
const { makeDkKinderType } = require('../_shared/dk-kinder.js');
module.exports = makeDkKinderType({
  id: 'K-706', slug: 'sleep-and-play-help-me-grow', mode: 'sleep-play', exerciseType: 'healthy-habits',
  difficulty: {"1":{"bed":3,"play":4},"2":{"bed":3,"play":6},"3":{"bed":3,"play":6,"draw":true}},
  i18n: { en: { title: "Sleep and Play Help Me Grow", instruction: "Cut out the bedtime pictures and glue them in order. Circle the ways to play that move your whole body. Color the heart under your favorite way to move." } },
});
