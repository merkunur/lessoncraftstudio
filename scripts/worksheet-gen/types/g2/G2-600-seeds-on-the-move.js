/** G2-600 — Seeds on the Move (Batch 2, Daily Teaching System Stage D-5, 2026-11-24; science en-2-081). dk-g2.js mode 'g2-seeds'. English only. */
'use strict';
const { makeG2Type } = require('../_shared/dk-g2.js');
module.exports = makeG2Type({
  id: 'G2-600', slug: 'seeds-on-the-move', mode: 'g2-seeds', exerciseType: 'plants',
  difficulty: {"1":{"seeds":3},"2":{"seeds":6,"sort":true},"3":{"seeds":6,"sort":true,"frame":true}},
  i18n: { en: { title: "Seeds on the Move", instruction: "Draw your fur model and test each seed. Then cut out the seeds and glue each one in its box." } },
});
