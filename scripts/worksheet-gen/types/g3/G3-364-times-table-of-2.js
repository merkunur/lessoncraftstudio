/** G3-364 — Times Table of 2. nt20-VAR variation of G3-358 (same family: multiplication-tables). */
'use strict';
const base = require('./G3-358-times-tables.js');
module.exports = {
  ...base,
  id: 'G3-364',
  slug: 'times-table-of-2',
  // Level Set 2026-10-13: the three levels come from the base (tableLevels) — never write them here
  difficulty: base.tableLevels(2),
  i18n: { en: { title: "Times Table of 2", instruction: "Multiply. Write each product in the box." } },
};
