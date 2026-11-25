/** G1-668 — Saving for a Goal (Batch S1, Daily Teaching System Stage D-5, 2026-11-24; social en-1-037). dk-social-1.js mode 's1-saving'. English only. */
'use strict';
const { makeS1Type } = require('../_shared/dk-social-1.js');
module.exports = makeS1Type({
  id: 'G1-668', slug: 'saving-for-a-goal', mode: 's1-saving', exerciseType: 'money',
  difficulty: {"1":{"price":3},"2":{"price":5,"after":true},"3":{"price":5,"own":true,"after":true}},
  i18n: { en: { title: "Saving for a Goal", instruction: "Color one part of the jar for each week the child saves. Write how many weeks it takes. Circle why the child saved." } },
});
