/** G1-236 — Draw the Hands: Five Minutes. nt20-VAR variation of G1-212 (same family: telling-time). */
'use strict';
const base = require('./G1-212-draw-clock-hands.js');
module.exports = {
  ...base,
  id: 'G1-236',
  slug: 'draw-hands-five-minutes',
  difficulty: { 1: {"cards":6,"stepM":5}, 2: {"cards":6,"stepM":5}, 3: {"cards":6,"stepM":5} },
  i18n: { en: { title: "Draw the Hands: Five Minutes", instruction: "Read the time. Draw the hour hand and the minute hand on the clock." } },
};
