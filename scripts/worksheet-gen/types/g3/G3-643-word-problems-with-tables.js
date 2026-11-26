/** G3-643 — Sachaufgaben mit Tabellen lösen (Batch DE-B, Daily Teaching System Stage E-2, 2026-11-26; German only, new:gleichungen-zahlenfolgen-tabellen). e2-math-b.js mode 'e2b-tab-sach'. */
'use strict';
const { makeE2bType } = require('../_shared/e2-math-b.js');
module.exports = makeE2bType({
  id: 'G3-643', slug: 'word-problems-with-tables', mode: 'e2b-tab-sach', exerciseType: 'word-problems', gradeBand: 'G3',
  i18n: { en: { title: "Solving Word Problems with Tables", instruction: "Each piece costs the same. Read the problem and write the prices in the table. Write at the arrows what you calculate with, for example · 2 or : 2. Write an answer sentence." } },
});
