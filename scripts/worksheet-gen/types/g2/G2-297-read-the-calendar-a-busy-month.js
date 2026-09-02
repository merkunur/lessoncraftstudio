/** G2-297 — Read the Calendar: A Busy Month. nt20-B-VAR variation of G2-277. */
'use strict';
const base = require('./G2-277-read-the-calendar.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{} };
module.exports = {
  ...base,
  id: 'G2-297',
  slug: 'read-the-calendar-a-busy-month',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Read the Calendar: A Busy Month", instruction: "This month is full. Read the calendar carefully to answer every question." } },
};
