/** G2-296 — Read the Calendar: A First Look. nt20-B-VAR variation of G2-277. */
'use strict';
const base = require('./G2-277-read-the-calendar.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{} };
module.exports = {
  ...base,
  id: 'G2-296',
  slug: 'read-the-calendar-four-questions',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Read the Calendar: A First Look", instruction: "Look at the month. Answer each question by reading the calendar." } },
};
