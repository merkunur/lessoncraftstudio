/** G3-649 — Skriftlig huvudräkning med mellanled (Batch SV, Daily Teaching System Stage E-2, 2026-11-26; Swedish only, sv-3-ma-avrundning-uppstallning). e2-math-sv.js mode 'sv-mellanled'. */
'use strict';
const { makeSvType } = require('../_shared/e2-math-sv.js');
module.exports = makeSvType({
  id: 'G3-649', slug: 'written-mental-calculation-with-steps', mode: 'sv-mellanled', exerciseType: 'mental-math', gradeBand: 'G3',
  i18n: { en: { title: "Written Mental Calculation with Steps", instruction: "Work out each place value on its own: start with the hundreds, then the tens and last the ones. Add the part answers and write the answer." } },
});
