/** G1-233 — Draw the Hands: O'Clock. nt20-VAR variation of G1-212 (same family: telling-time). */
'use strict';
const base = require('./G1-212-draw-clock-hands.js');
module.exports = {
  ...base,
  id: 'G1-233',
  slug: 'draw-hands-oclock',
  difficulty: { 1: {"cards":4,"stepM":60}, 2: {"cards":4,"stepM":60}, 3: {"cards":4,"stepM":60} },
  i18n: { en: { title: "Draw the Hands: O'Clock", instruction: "Read the time. Draw the hour hand and the minute hand on the clock." } },
};
