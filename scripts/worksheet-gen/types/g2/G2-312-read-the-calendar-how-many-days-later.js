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
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "How Many Days Later?", instruction: "Use the calendar to work out each date." } },
};
