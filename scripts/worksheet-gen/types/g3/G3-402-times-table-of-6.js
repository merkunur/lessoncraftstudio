/** G3-402 — Times Table of 6. Level Set 2026-10-13 variation of G3-358 (family: multiplication-tables) — the tables of
 *  6, 7, 8 and 9 had no page of their own. No published page: every copy is new, visible, never indexed. */
'use strict';
const base = require('./G3-358-times-tables.js');
module.exports = {
  ...base,
  id: 'G3-402',
  slug: 'times-table-of-6',
  // the three levels come from the base (tableLevels) — never write them here
  difficulty: base.tableLevels(6),
  i18n: { en: { title: "Times Table of 6", instruction: "Multiply. Write each product in the box." } },
};
