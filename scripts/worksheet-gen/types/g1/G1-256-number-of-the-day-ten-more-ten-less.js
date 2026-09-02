/** G1-256 — Number of the Day: Ten More, Ten Less. nt20-B-VAR variation of G1-243. */
'use strict';
const base = require('./G1-243-number-of-the-day.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{"frames":false,"tenMore":true,"line":{"max":30,"tick":1,"label":5}} };
module.exports = {
  ...base,
  id: 'G1-256',
  slug: 'number-of-the-day-ten-more-ten-less',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Number of the Day: Ten More, Ten Less", instruction: "Find ten more and ten less than the number of the day." } },
};
