/** G1-257 — Number of the Day: Up to 99. nt20-B-VAR variation of G1-243. */
'use strict';
const base = require('./G1-243-number-of-the-day.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{"line":{"max":100,"tick":1,"label":10}} };
module.exports = {
  ...base,
  id: 'G1-257',
  slug: 'number-of-the-day-to-99',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Number of the Day: Up to 99", instruction: "Show a two-digit number in tens and ones, then fill every box." } },
};
