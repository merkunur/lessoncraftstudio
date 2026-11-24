/** G3-604 — Sleep, Screens and Play (Batch 3, Daily Teaching System Stage D-5, 2026-11-24; health en-3-028). dk-g3-health.js mode 'g3-my-day'. English only. */
'use strict';
const { makeG3Type } = require('../_shared/dk-g3-health.js');
module.exports = makeG3Type({
  id: 'G3-604', slug: 'sleep-screens-and-play', mode: 'g3-my-day', exerciseType: 'healthy-habits',
  difficulty: {"1":{},"2":{"four":true,"counts":true},"3":{"four":true,"counts":true,"change":true}},
  i18n: { en: { title: "Sleep, Screens and Play", instruction: "Color each half hour of your day from the key. Count your hours of sleep and your minutes of active play." } },
});
