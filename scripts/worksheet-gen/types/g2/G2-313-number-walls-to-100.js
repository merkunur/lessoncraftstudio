/** G2-313 — Number Walls with Two-Digit Answers. nt20-B-VAR variation of G1-246. */
'use strict';
const base = require('../g1/G1-246-number-walls.js');
// Level Set 2026-10-13: level 2 = the published page (the June config, untouched); levels 1 and 3 are new and keep
// this face's printed instruction true in all 11 locales. ⚠ tools/gen-b2var-specs.js would flatten them back to one
// object for all three levels — never re-run it on this face.
// de/nl/fr "four rows", da "only the bottom row is given", en/it/no "past twenty", fi/en "two-digit": every level keeps
// four rows, the whole bottom row given and nothing else, and a top between 21 and 99.
const D = { ...base.legacy[3], ...{"gap":false,"courses":4,"walls":4,"baseMin":5,"baseMax":12,"topMax":100} };
module.exports = {
  ...base,
  id: 'G2-313',
  slug: 'number-walls-to-100',
  difficulty: {
    1: { ...D, baseMin: 4, baseMax: 8, pairMin: 10, topMin: 30, topMax: 60 },   // smaller bricks, every answer still two digits
    2: D,
    3: { ...D, baseMin: 8, baseMax: 20, topMin: 60, topMax: 99 },  // two-digit bottom bricks, tops 60-99
  },
  i18n: { en: { title: "Number Walls with Two-Digit Answers", instruction: "The bricks climb past twenty, so add in writing as you go." } },
};
