/** G1-267 — Number Walls: Build Every Row. nt20-B-VAR variation of G1-246. */
'use strict';
const base = require('./G1-246-number-walls.js');
// Level Set 2026-10-13: level 2 = the published page (the June config, untouched); levels 1 and 3 are new and keep
// this face's printed instruction true in all 11 locales. ⚠ tools/gen-b2var-specs.js would flatten them back to one
// object for all three levels — never re-run it on this face.
// "Four rows and no gaps": every level keeps four rows and the whole bottom row.
const D = { ...base.legacy[3], ...{"gap":false,"walls":4,"courses":4,"baseMin":1,"baseMax":3,"topMax":20} };
module.exports = {
  ...base,
  id: 'G1-267',
  slug: 'number-walls-four-courses',
  difficulty: {
    1: { ...D, baseMax: 2, oneGiven: true },   // ones and twos, one brick of the second row printed
    2: D,
    3: { ...D, baseMax: 4, topMin: 16 },       // bigger bottom bricks, every top 16-20 (four rows capped at 20: the honest ceiling)
  },
  i18n: { en: { title: "Number Walls: Build Every Row", instruction: "Four rows and no gaps. Add each pair of bricks up to the top." } },
};
