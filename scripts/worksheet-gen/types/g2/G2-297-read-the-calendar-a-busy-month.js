/** G2-297 — Read the Calendar: A Busy Month. nt20-B-VAR variation of G2-277. */
'use strict';
const base = require('./G2-277-read-the-calendar.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{"questions":["dayOfDate","countWeekday","stickerDate","weekLater","after"],"sixRows":false,"cellH":50} };
module.exports = {
  ...base,
  id: 'G2-297',
  slug: 'read-the-calendar-a-busy-month',
  // Level Set 2026-10-04: real easier / harder levels (level 2 = the published config); the screen version comes from the base
  difficulty: { 1: { ...D, questions: ['stickerDate', 'weekLater', 'after', 'dayOfDate', 'daysInMonth'], cellH: 56, fiveRows: true }, 2: D, 3: { ...D, questions: ['dayOfDate', 'countWeekday', 'weekLater', 'after', 'lastDay'], sixRows: true, cellH: 50 } },
  i18n: { en: { title: "Read the Calendar: A Busy Month", instruction: "Find the date one week later, and count how many days it is from one sticker to another." } },
};
