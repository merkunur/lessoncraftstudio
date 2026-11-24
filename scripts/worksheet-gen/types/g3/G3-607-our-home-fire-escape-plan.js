/** G3-607 — Our Home Fire Escape Plan (Batch 3, Daily Teaching System Stage D-5, 2026-11-24; health en-3-031). dk-g3-health.js mode 'g3-escape-plan'. English only. */
'use strict';
const { makeG3Type } = require('../_shared/dk-g3-health.js');
module.exports = makeG3Type({
  id: 'G3-607', slug: 'our-home-fire-escape-plan', mode: 'g3-escape-plan', exerciseType: 'healthy-habits',
  difficulty: {"1":{"room":true},"2":{},"3":{"who":true}},
  i18n: { en: { title: "Our Home Fire Escape Plan", instruction: "Draw your home with two ways out of every room, the smoke alarms and the meeting place." } },
});
