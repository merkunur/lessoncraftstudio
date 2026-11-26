/** G2-632 — Kilogram: väga och jämföra (Batch E-1, Daily Teaching System Stage E, 2026-11-25; Swedish only, sv-2-ma-langd-tid). e1-math.js mode 'e1-kilo'. */
'use strict';
const { makeE1Type } = require('../_shared/e1-math.js');
module.exports = makeE1Type({
  id: 'G2-632', slug: 'kilograms-weigh-and-compare', mode: 'e1-kilo', exerciseType: 'measurement', gradeBand: 'G2',
  i18n: { en: { title: "Kilograms: Weigh and Compare", instruction: "Read the scales and write how many kilograms each thing weighs. Then circle whether the thing weighs more or less than 1 kilogram." } },
});
