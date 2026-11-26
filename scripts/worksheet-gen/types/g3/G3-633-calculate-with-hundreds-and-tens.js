/** G3-633 — Rechnen mit Hunderter- und Zehnerzahlen (Batch DE-B, Daily Teaching System Stage E-2, 2026-11-26; German only, new:halbschriftlich-plus-minus-bis-1000). e2-math-b.js mode 'e2b-hz'. */
'use strict';
const { makeE2bType } = require('../_shared/e2-math-b.js');
module.exports = makeE2bType({
  id: 'G3-633', slug: 'calculate-with-hundreds-and-tens', mode: 'e2b-hz', exerciseType: 'mental-math', gradeBand: 'G3',
  i18n: { en: { title: "Calculating with Hundreds and Tens", instruction: "First work out the small task. It helps you with the big task: 3 + 4 = 7, so 300 + 400 = 700. Below, fill up to the next hundred." } },
});
