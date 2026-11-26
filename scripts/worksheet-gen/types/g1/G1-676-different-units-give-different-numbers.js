/** G1-676 — Olika enheter ger olika tal (Batch SV, Daily Teaching System Stage E-2, 2026-11-26; Swedish only, sv-1-ma-former-monster-langd). e2-math-sv.js mode 'sv-enheter'. */
'use strict';
const { makeSvType } = require('../_shared/e2-math-sv.js');
module.exports = makeSvType({
  id: 'G1-676', slug: 'different-units-give-different-numbers', mode: 'sv-enheter', exerciseType: 'measurement', gradeBand: 'G1',
  i18n: { en: { title: "Different Units Give Different Numbers", instruction: "Each thing is measured with two different units. Count and write how many of each unit it took. Circle the unit it took the most of." } },
});
