/** G1-268 — Number Walls: Find the Missing Brick. nt20-B-VAR variation of G1-246. */
'use strict';
const base = require('./G1-246-number-walls.js');
// Level Set 2026-10-13: level 2 = the published page (the June config, untouched); levels 1 and 3 are new and keep
// this face's printed instruction true in all 11 locales. ⚠ tools/gen-b2var-specs.js would flatten them back to one
// object for all three levels — never re-run it on this face.
// "One bottom brick is missing — use the brick above it": every level keeps exactly that (the helper sits right above).
const D = { ...base.legacy[3], ...{} };
module.exports = {
  ...base,
  id: 'G1-268',
  slug: 'number-walls-missing-brick',
  difficulty: {
    1: { ...D, courses: 3, brick: { w: 100, h: 88 }, baseMax: 4, topMax: 10 },   // three rows, the top at most 10
    2: D,
    3: { ...D, baseMax: 6, topMin: 14, gapInner: true },                          // an inner brick missing, every top 14-20
  },
  i18n: { en: { title: "Number Walls: Find the Missing Brick", instruction: "One bottom brick is missing. Find it, then build the whole wall." } },
};
