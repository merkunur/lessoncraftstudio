/** G1-237 — Draw the Hands: Mixed Times. nt20-VAR variation of G1-212 (same family: telling-time). */
'use strict';
const base = require('./G1-212-draw-clock-hands.js');
module.exports = {
  ...base,
  id: 'G1-237',
  slug: 'draw-hands-mixed-times',
  difficulty: { 1: {"cards":6,"stepM":[60,30,15]}, 2: {"cards":6,"stepM":[60,30,15]}, 3: {"cards":6,"stepM":[60,30,15]} },
  i18n: { en: { title: "Draw the Hands: Mixed Times", instruction: "Read the time. Draw the hour hand and the minute hand on the clock." } },
};
