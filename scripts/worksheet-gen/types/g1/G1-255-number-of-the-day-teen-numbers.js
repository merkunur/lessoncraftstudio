/** G1-255 — Number of the Day: Teen Numbers. nt20-B-VAR variation of G1-243. */
'use strict';
const base = require('./G1-243-number-of-the-day.js');
// Its three levels (Level Set 2026-10-13) live in the base: level 2 = the published page.
module.exports = {
  ...base,
  id: 'G1-255',
  slug: 'number-of-the-day-teen-numbers',
  difficulty: base.levelsFor('G1-255'),
  i18n: { en: { title: "Number of the Day: Teen Numbers", instruction: "Look at the big number. Fill in every box on the page for that number." } },
};
