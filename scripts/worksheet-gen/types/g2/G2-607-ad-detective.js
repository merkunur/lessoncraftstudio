/** G2-607 — Ad Detective (Batch 2, Daily Teaching System Stage D-5, 2026-11-24; health en-2-018). dk-g2-health.js mode 'g2-ads'. English only. */
'use strict';
const { makeG2Type } = require('../_shared/dk-g2-health.js');
module.exports = makeG2Type({
  id: 'G2-607', slug: 'ad-detective', mode: 'g2-ads', exerciseType: 'healthy-habits',
  difficulty: {"1":{"ads":1},"2":{"ads":3},"3":{"ads":3,"frame":true}},
  i18n: { en: { title: "Ad Detective", instruction: "Circle every trick each ad uses and answer the question. Then draw an ad for an everyday food." } },
});
