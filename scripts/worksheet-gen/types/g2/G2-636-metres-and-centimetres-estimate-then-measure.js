/** G2-636 — Meter und Zentimeter: erst schätzen, dann messen (Batch DE-A, Daily Teaching System Stage E-2, 2026-11-26; German only, de2-groessen-daten). e2-math.js mode 'e2-mess-mcm'. */
'use strict';
const { makeE2Type } = require('../_shared/e2-math.js');
module.exports = makeE2Type({
  id: 'G2-636', slug: 'metres-and-centimetres-estimate-then-measure', mode: 'e2-mess-mcm', exerciseType: 'measurement', gradeBand: 'G2',
  i18n: { en: { title: "Metres and Centimetres: Estimate First, Then Measure", instruction: "First estimate each length in metres and centimetres; the reference lengths help you. Then measure with a ruler, a folding rule or a tape measure and tick what you used. Below, match each picture to the right card." } },
});
