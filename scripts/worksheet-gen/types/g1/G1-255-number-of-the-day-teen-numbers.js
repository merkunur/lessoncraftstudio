/** G1-255 — Number of the Day: Teen Numbers. nt20-B-VAR variation of G1-243. */
'use strict';
const base = require('./G1-243-number-of-the-day.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{} };
module.exports = {
  ...base,
  id: 'G1-255',
  slug: 'number-of-the-day-teen-numbers',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Number of the Day: Teen Numbers", instruction: "Look at the big number. Fill in every box on the page for that number." } },
};
