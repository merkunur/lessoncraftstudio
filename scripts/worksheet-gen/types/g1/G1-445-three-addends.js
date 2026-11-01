/** G1-445 — add three numbers, make ten first (T4, 1.OA.A.2 / 1.OA.B.3). Addition & Subtraction maker, 2026-11-01. See types/_shared/addsub-more.js. */
'use strict';
const { makeAddSubMoreType } = require('../_shared/addsub-more.js');

module.exports = makeAddSubMoreType({
  id: 'G1-445', slug: 'three-addends', mode: 'three', gradeBand: 'G1',
  i18n: { en: { title: "Add Three Numbers", instruction: "Add the three numbers. Look for two numbers that make ten and add them first." } },
});
