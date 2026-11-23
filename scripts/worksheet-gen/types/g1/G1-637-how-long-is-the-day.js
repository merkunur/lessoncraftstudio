/** G1-637 — How Long Is the Day? (Batch 1, Daily Teaching System Stage D-5, 2026-11-23; science en-1-046). dk-g1.js mode 'g1-daylight'. English only. */
'use strict';
const { makeG1Type } = require('../_shared/dk-g1.js');
module.exports = makeG1Type({
  id: 'G1-637', slug: 'how-long-is-the-day', mode: 'g1-daylight', exerciseType: 'earth-and-space',
  difficulty: {"1":{"months":4,"started":true},"2":{"months":5,"hours":true},"3":{"months":5,"hours":true,"predict":true}},
  i18n: { en: { title: "How Long Is the Day?", instruction: "Write the hours of daylight we read on the 21st of each month and color its bar. Circle the month with the shortest day (if months are the same, circle all of them)." } },
});
