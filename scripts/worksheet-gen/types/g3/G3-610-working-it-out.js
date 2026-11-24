/** G3-610 — Working It Out (Batch 3, Daily Teaching System Stage D-5, 2026-11-24; health teacher-led (NHES.4.5.6)). dk-g3-health.js mode 'g3-work-it-out'. English only. */
'use strict';
const { makeG3Type } = require('../_shared/dk-g3-health.js');
module.exports = makeG3Type({
  id: 'G3-610', slug: 'working-it-out', mode: 'g3-work-it-out', exerciseType: 'feelings',
  difficulty: {"1":{},"2":{"order":true,"frames":true},"3":{"order":true,"sort":true,"coach":true}},
  i18n: { en: { title: "Working It Out", instruction: "Glue the steps in order. Circle every fair solution, finish the I-message and draw your solution." } },
});
