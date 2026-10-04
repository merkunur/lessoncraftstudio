/** G2-312 — How Many Days Later?. nt20-B-VAR variation of G2-277. */
'use strict';
const base = require('./G2-277-read-the-calendar.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"questions":["stickerDate","after","weekLater","dayOfDate"],"stickers":3,"cellH":68} };
module.exports = {
  ...base,
  id: 'G2-312',
  slug: 'read-the-calendar-how-many-days-later',
  // Level Set 2026-10-04: real easier / harder levels (level 2 = the published config); the screen version comes from the base
  difficulty: { 1: { ...D, questions: ['stickerDate', 'after', 'weekLater', 'daysInMonth'], stickers: 2, cellH: 72 }, 2: D, 3: { ...D, sixRows: true, cellH: 50 } },
  i18n: { en: { title: "How Many Days Later?", instruction: "Use the calendar to answer each question." } },
};
