/** G2-613 — Our Health Poster (Batch 2, Daily Teaching System Stage D-5, 2026-11-24; health en-2-025). dk-g2-health.js mode 'g2-poster'. English only. */
'use strict';
const { makeG2Type } = require('../_shared/dk-g2-health.js');
module.exports = makeG2Type({
  id: 'G2-613', slug: 'our-health-poster', mode: 'g2-poster', exerciseType: 'healthy-habits',
  difficulty: {"1":{},"2":{"own":true},"3":{"own":true,"reason":true}},
  i18n: { en: { title: "Our Health Poster", instruction: "Circle our class campaign. Draw your poster picture and write your own slogan." } },
});
