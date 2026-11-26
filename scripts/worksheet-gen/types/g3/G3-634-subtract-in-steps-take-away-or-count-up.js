/** G3-634 — Halbschriftlich subtrahieren: abziehen oder ergänzen? (Batch DE-B, Daily Teaching System Stage E-2, 2026-11-26; German only, new:halbschriftlich-plus-minus-bis-1000). e2-math-b.js mode 'e2b-hsub'. */
'use strict';
const { makeE2bType } = require('../_shared/e2-math-b.js');
module.exports = makeE2bType({
  id: 'G3-634', slug: 'subtract-in-steps-take-away-or-count-up', mode: 'e2b-hsub', exerciseType: 'number-lines', gradeBand: 'G3',
  i18n: { en: { title: "Subtracting in Steps: Take Away or Count Up?", instruction: "Before you calculate, tick how you will do it. Take away: start at the first number and take away the hundreds, then the tens, then the ones. Count up: start at the second number and add on up to the first number. Draw the jumps on the empty number line and write the steps. Both ways are right." } },
});
