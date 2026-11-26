/** G3-648 — Är svaret rimligt? (Batch SV, Daily Teaching System Stage E-2, 2026-11-26; Swedish only, sv-3-ma-avrundning-uppstallning). e2-math-sv.js mode 'sv-rimligt'. */
'use strict';
const { makeSvType } = require('../_shared/e2-math-sv.js');
module.exports = makeSvType({
  id: 'G3-648', slug: 'is-the-answer-reasonable', mode: 'sv-rimligt', exerciseType: 'rounding', gradeBand: 'G3',
  i18n: { en: { title: "Is the Answer Reasonable?", instruction: "Make an estimate for each calculation and write it in the boxes. Circle reasonable or unreasonable according to your estimate. Then circle the reasonable answer to each question." } },
});
