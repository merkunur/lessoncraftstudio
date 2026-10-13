/** G1-256 — Number of the Day: Ten More, Ten Less. nt20-B-VAR variation of G1-243. */
'use strict';
const base = require('./G1-243-number-of-the-day.js');
// Its three levels (Level Set 2026-10-13) live in the base: level 2 = the published page.
module.exports = {
  ...base,
  id: 'G1-256',
  slug: 'number-of-the-day-ten-more-ten-less',
  difficulty: base.levelsFor('G1-256'),
  i18n: { en: { title: "Number of the Day: Ten More, Ten Less", instruction: "Find ten more and ten less than the number of the day." } },
};
