/** G3-637 — Halbschriftlich dividieren: 84 : 4 (Batch DE-B, Daily Teaching System Stage E-2, 2026-11-26; German only, de3-mal-geteilt-gleichungen). e2-math-b.js mode 'e2b-hdiv'. */
'use strict';
const { makeE2bType } = require('../_shared/e2-math-b.js');
module.exports = makeE2bType({
  id: 'G3-637', slug: 'divide-in-steps-84-divided-by-4', mode: 'e2b-hdiv', exerciseType: 'mental-math', gradeBand: 'G3',
  i18n: { en: { title: "Dividing in Steps: 84 : 4", instruction: "Split the number into two numbers you can divide easily. Divide both numbers and add the results. In the first tasks the split is already there. At the end, check two results with the multiplication task." } },
});
