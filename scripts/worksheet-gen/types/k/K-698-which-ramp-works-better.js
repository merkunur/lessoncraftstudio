/** K-698 — Which Ramp Works Better? (Batch K, Daily Teaching System Stage D-5, 2026-11-23; science en-K-018). dk-kinder.js mode 'ramps'. English only. */
'use strict';
const { makeDkKinderType } = require('../_shared/dk-kinder.js');
module.exports = makeDkKinderType({
  id: 'K-698', slug: 'which-ramp-works-better', mode: 'ramps', exerciseType: 'science-sort',
  difficulty: {"1":{"tries":1},"2":{"tries":3},"3":{"tries":3,"total":true,"improve":true}},
  i18n: { en: { title: "Which Ramp Works Better?", instruction: "Roll a ball down each ramp three times. Make a tally mark for each block that fell. Circle the ramp that worked better. If they are the same, circle both." } },
});
