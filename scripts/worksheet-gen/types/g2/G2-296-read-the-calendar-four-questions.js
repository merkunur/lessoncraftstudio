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
  // Level Set 2026-10-04: real easier / harder levels (level 2 = the published config); the screen version comes from the base
  difficulty: { 1: { ...D, questions: ['stickerDate', 'dayOfDate', 'daysInMonth', 'firstDay'] }, 2: D, 3: { ...D, questions: ['dayOfDate', 'countWeekday', 'stickerDate', 'lastDay'], sixRows: true, cellH: 54 } },
  i18n: { en: { title: "Read the Calendar: A First Look", instruction: "Look at the month. Answer each question by reading the calendar." } },
};
