/** G1-443 — true or false equations (T2, 1.OA.D.7). Addition & Subtraction maker, 2026-11-01. See types/_shared/addsub-more.js. */
'use strict';
const { makeAddSubMoreType } = require('../_shared/addsub-more.js');

module.exports = makeAddSubMoreType({
  id: 'G1-443', slug: 'true-or-false-equations', mode: 'truefalse', gradeBand: 'G1',
  i18n: { en: { title: "True or False?", instruction: "Is each equation true? Circle the check mark if it is true and the cross if it is false." } },
});
