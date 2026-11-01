/** G1-442 — the classic facts drill page (T1, 1.OA.C.6 / 2.OA.B.2). Addition & Subtraction maker, 2026-11-01. See types/_shared/addsub-more.js. */
'use strict';
const { makeAddSubMoreType } = require('../_shared/addsub-more.js');

module.exports = makeAddSubMoreType({
  id: 'G1-442', slug: 'facts-drill-page', mode: 'drill', gradeBand: 'G1',
  i18n: { en: { title: "Math Facts Drill", instruction: "Solve each problem. Write the answer under the line." } },
});
