/** G1-266 — Number Walls to 10. nt20-B-VAR variation of G1-246. */
'use strict';
const base = require('./G1-246-number-walls.js');
// Level Set 2026-10-13: level 2 = the published page (the June config, untouched); levels 1 and 3 are new and keep
// this face's printed instruction true in all 11 locales. ⚠ tools/gen-b2var-specs.js would flatten them back to one
// object for all three levels — never re-run it on this face.
// The titles promise "to 10" and es/pt "three floors": every level keeps three rows and a top of at most 10.
const D = { ...base.legacy[1] };
module.exports = {
  ...base,
  id: 'G1-266',
  slug: 'number-walls-to-10',
  difficulty: {
    1: { ...D, baseMax: 3, topMax: 8 },                                                       // smaller numbers
    2: D,
    3: { ...D, walls: 6, cols: 2, rows: 3, brick: { w: 88, h: 68 }, baseMax: 6, topMin: 8 },  // six walls, every top 8-10
  },
  i18n: { en: { title: "Number Walls to 10", instruction: "Each brick is the sum of the two bricks under it. Build every wall to the top." } },
};
