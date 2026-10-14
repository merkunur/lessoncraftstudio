/** G1-236 — Draw the Hands: Five Minutes. nt20-VAR variation of G1-212 (same family: telling-time). */
'use strict';
const base = require('./G1-212-draw-clock-hands.js');
const { levelsFor } = require('../_shared/clock-tasks.js');
module.exports = {
  ...base,
  id: 'G1-236',
  slug: 'draw-hands-five-minutes',
  // Level Set 2026-10-14: level 2 = the published config; levels 1 / 3 in clock-tasks FACE_LEVELS (⚠ tools/gen-var-specs.js would flatten this)
  difficulty: levelsFor('G1-236', {"cards":6,"stepM":5}),
  i18n: { en: { title: "Draw the Hands: Five Minutes", instruction: "Read the time. Draw the hour hand and the minute hand on the clock." } },
};
