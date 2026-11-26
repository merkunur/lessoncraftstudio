/** G3-645 — Diagramme genau lesen: Was stimmt, was nicht? (Batch DE-B, Daily Teaching System Stage E-2, 2026-11-26; German only, g3-shapes-and-data). e2-math-b.js mode 'e2b-dia'. */
'use strict';
const { makeE2bType } = require('../_shared/e2-math-b.js');
module.exports = makeE2bType({
  id: 'G3-645', slug: 'read-charts-carefully-true-or-not', mode: 'e2b-dia', exerciseType: 'graphing-data', gradeBand: 'G3',
  i18n: { en: { title: "Reading Charts Carefully: What Is True, What Is Not?", instruction: "Both charts show the same survey. Read the numbers carefully. For each statement, circle: true, not true or cannot be read off. Below, write why the bars in chart 2 look so different in height." } },
});
