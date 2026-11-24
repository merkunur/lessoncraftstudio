/** G3-611 — Saying No and Walking Away (Batch 3, Daily Teaching System Stage D-5, 2026-11-24; health teacher-led (NHES.4.5.5)). dk-g3-health.js mode 'g3-saying-no'. English only. */
'use strict';
const { makeG3Type } = require('../_shared/dk-g3-health.js');
module.exports = makeG3Type({
  id: 'G3-611', slug: 'saying-no-and-walking-away', mode: 'g3-saying-no', exerciseType: 'healthy-habits',
  difficulty: {"1":{},"2":{"reason":true},"3":{"reason":true,"instead":true}},
  i18n: { en: { title: "Saying No and Walking Away", instruction: "Circle the clear way to say no. Then write no with a reason." } },
});
