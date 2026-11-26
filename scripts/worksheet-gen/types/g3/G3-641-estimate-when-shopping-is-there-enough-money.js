/** G3-641 — Überschlagen beim Einkaufen: Reicht das Geld? (Batch DE-B, Daily Teaching System Stage E-2, 2026-11-26; German only, new:laengen-und-geld). e2-math-b.js mode 'e2b-ueber'. */
'use strict';
const { makeE2bType } = require('../_shared/e2-math-b.js');
module.exports = makeE2bType({
  id: 'G3-641', slug: 'estimate-when-shopping-is-there-enough-money', mode: 'e2b-ueber', exerciseType: 'money', gradeBand: 'G3',
  i18n: { en: { title: "Estimating When Shopping: Is There Enough Money?", instruction: "Read the rule at the top. Round each price to whole euros and make your estimate. Circle whether the money is enough. Below, check with your estimate whether the total on the receipt can be right." } },
});
