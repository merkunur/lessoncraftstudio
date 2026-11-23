/** G1-644 — Ask a Grown-Up First (Batch 1, Daily Teaching System Stage D-5, 2026-11-23; health en-1-009). dk-g1-health.js mode 'g1-ask-first'. English only. */
'use strict';
const { makeG1Type } = require('../_shared/dk-g1-health.js');
module.exports = makeG1Type({
  id: 'G1-644', slug: 'ask-a-grown-up-first', mode: 'g1-ask-first', exerciseType: 'healthy-habits',
  difficulty: {"1":{"adult":3,"food":3},"2":{"adult":4,"food":4},"3":{"adult":4,"food":4,"write":true}},
  i18n: { en: { title: "Ask a Grown-Up First", instruction: "Circle in red each thing only a trusted grown-up may give you or use. Put a check in the box under each food and drink." } },
});
