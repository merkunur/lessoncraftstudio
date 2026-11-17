/** G1-623 — Revise with a Checklist (writing-g1 factory; English literacy year 2026-11-18) */
'use strict';
const { makeWritingG1Type } = require('../_shared/writing-g1.js');
module.exports = makeWritingG1Type({
  id: 'G1-623', slug: 'revise-with-a-checklist', mode: 'revise', exerciseType: 'sentence-building',
  i18n: { en: { title: "Revise with a Checklist", instruction: "Answer your partner with a detail. Then check your writing together." } },
});
