/** G1-447 — find the wrong answers and correct them (T6, 1.OA.D.7 / 2.NBT.B.9). Addition & Subtraction maker, 2026-11-01. See types/_shared/addsub-more.js. */
'use strict';
const { makeAddSubMoreType } = require('../_shared/addsub-more.js');

module.exports = makeAddSubMoreType({
  id: 'G1-447', slug: 'find-the-mistakes', mode: 'errors', gradeBand: 'G1',
  i18n: { en: { title: "Find the Mistakes", instruction: "Check each answer. If it is wrong, put an X in the small box and write the right answer in the big box." } },
});
