/** G1-677 — Subtraktion som skillnad: räkna uppåt (Batch SV, Daily Teaching System Stage E-2, 2026-11-26; Swedish only, new:add-sub-0-20). e2-math-sv.js mode 'sv-skillnad'. */
'use strict';
const { makeSvType } = require('../_shared/e2-math-sv.js');
module.exports = makeSvType({
  id: 'G1-677', slug: 'subtraction-as-difference-count-up', mode: 'sv-skillnad', exerciseType: 'number-lines', gradeBand: 'G1',
  i18n: { en: { title: "Subtraction as Difference: Count Up", instruction: "Two numbers are marked on the number line. Count up from the smaller number to the larger one. Write how long the jump is. Then write the answer to the subtraction and to the addition that goes with it." } },
});
