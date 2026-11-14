/** G2-513 — Subtract with Regrouping: Tens-and-Ones Mat (regroup-more factory, mode mat-sub; Year pages V, 2026-11-14) */
'use strict';
const { makeRegroupType } = require('../_shared/regroup-more.js');
module.exports = makeRegroupType({
  id: 'G2-513', slug: 'subtract-and-open-a-ten-mat', mode: 'mat-sub', gradeBand: 'G2',
  i18n: { en: { title: "Subtract with Regrouping: Tens-and-Ones Mat", instruction: "The first number is drawn on the mat. Are there enough ones to take away? Mark yes or no. If there are not enough, cross out one stick and draw ten dots for it. Cross out what is taken away and write what is left." } },
});
