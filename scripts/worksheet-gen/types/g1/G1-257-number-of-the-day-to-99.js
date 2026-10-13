/** G1-257 — Number of the Day: Up to 99. nt20-B-VAR variation of G1-243. */
'use strict';
const base = require('./G1-243-number-of-the-day.js');
// Its three levels (Level Set 2026-10-13) live in the base: level 2 = the published page.
module.exports = {
  ...base,
  id: 'G1-257',
  slug: 'number-of-the-day-to-99',
  difficulty: base.levelsFor('G1-257'),
  i18n: { en: { title: "Number of the Day: Up to 99", instruction: "Show a two-digit number in tens and ones, then fill every box." } },
};
