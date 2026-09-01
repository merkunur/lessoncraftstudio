/** G1-235 — Draw the Hands: Quarter Hours. nt20-VAR variation of G1-212 (same family: telling-time). */
'use strict';
const base = require('./G1-212-draw-clock-hands.js');
module.exports = {
  ...base,
  id: 'G1-235',
  slug: 'draw-hands-quarter-hours',
  difficulty: { 1: {"cards":6,"stepM":15,"minutes":[15,45]}, 2: {"cards":6,"stepM":15,"minutes":[15,45]}, 3: {"cards":6,"stepM":15,"minutes":[15,45]} },
  i18n: { en: { title: "Draw the Hands: Quarter Hours", instruction: "Read the time. Draw the hour hand and the minute hand on the clock." } },
};
