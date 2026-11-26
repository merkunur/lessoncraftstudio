/** G3-642 — Preistabellen: je mehr, desto teurer (Batch DE-B, Daily Teaching System Stage E-2, 2026-11-26; German only, new:gleichungen-zahlenfolgen-tabellen). e2-math-b.js mode 'e2b-tab-preis'. */
'use strict';
const { makeE2bType } = require('../_shared/e2-math-b.js');
module.exports = makeE2bType({
  id: 'G3-642', slug: 'price-tables-the-more-the-dearer', mode: 'e2b-tab-preis', exerciseType: 'number-charts', gradeBand: 'G3',
  i18n: { en: { title: "Price Tables: The More, the Dearer", instruction: "Each piece costs the same. Continue the tables up to 10 and finish the sentence under each table. In the last table, first find the price of 1 piece." } },
});
