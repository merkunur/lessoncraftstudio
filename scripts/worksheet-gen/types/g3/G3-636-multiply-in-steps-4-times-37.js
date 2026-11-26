/** G3-636 — Halbschriftlich multiplizieren: 4 · 37 (Batch DE-B, Daily Teaching System Stage E-2, 2026-11-26; German only, de3-mal-geteilt-gleichungen). e2-math-b.js mode 'e2b-hmul'. */
'use strict';
const { makeE2bType } = require('../_shared/e2-math-b.js');
module.exports = makeE2bType({
  id: 'G3-636', slug: 'multiply-in-steps-4-times-37', mode: 'e2b-hmul', exerciseType: 'arrays-multiplication', gradeBand: 'G3',
  i18n: { en: { title: "Multiplying in Steps: 4 · 37", instruction: "Split the second number into tens and ones. First multiply the tens, then the ones, then add. Write the numbers over the dot field, in the multiplication cross and in the steps." } },
});
