/** G1-234 — Draw the Hands: Half Past. nt20-VAR variation of G1-212 (same family: telling-time). */
'use strict';
const base = require('./G1-212-draw-clock-hands.js');
module.exports = {
  ...base,
  id: 'G1-234',
  slug: 'draw-hands-half-past',
  difficulty: { 1: {"cards":4,"stepM":30,"fixedM":30}, 2: {"cards":4,"stepM":30,"fixedM":30}, 3: {"cards":4,"stepM":30,"fixedM":30} },
  i18n: { en: { title: "Draw the Hands: Half Past", instruction: "Read the time. Draw the hour hand and the minute hand on the clock." } },
};
