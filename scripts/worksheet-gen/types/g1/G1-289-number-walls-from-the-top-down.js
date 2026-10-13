/** G1-289 — Number Walls: Start at the Top. nt20-B-VAR variation of G1-246. */
'use strict';
const base = require('./G1-246-number-walls.js');
// Level Set 2026-10-13: level 2 = the published page (the June config, untouched); levels 1 and 3 are new and keep
// this face's printed instruction true in all 11 locales. ⚠ tools/gen-b2var-specs.js would flatten them back to one
// object for all three levels — never re-run it on this face.
const D = { ...base.legacy[2], ...{"topGiven":true} };
module.exports = {
  ...base,
  id: 'G1-289',
  slug: 'number-walls-from-the-top-down',
  difficulty: {
    1: { ...D, walls: 4, rows: 2, brick: { w: 100, h: 88 }, baseMax: 5, topMax: 10 },                // four walls, the top at most 10
    2: D,
    3: { ...D, walls: 4, rows: 2, courses: 4, brick: { w: 78, h: 70 }, baseMax: 5, topMax: 20 },     // four rows to work down
  },
  i18n: { en: { title: "Number Walls: Start at the Top", instruction: "The top brick is given this time. Work downwards and subtract." } },
};
