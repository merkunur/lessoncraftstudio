/** G1-448 — bar models: part-part-whole and compare (T7, 1.OA.A.1 / 2.OA.A.1). Addition & Subtraction maker, 2026-11-01. See types/_shared/addsub-more.js. */
'use strict';
const { makeAddSubMoreType } = require('../_shared/addsub-more.js');

module.exports = makeAddSubMoreType({
  id: 'G1-448', slug: 'bar-models', mode: 'bar', gradeBand: 'G1',
  i18n: { en: { title: "Bar Models", instruction: "Look at each bar. Write the missing number in the box." } },
});
