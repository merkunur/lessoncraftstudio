/** G1-267 — Number Walls: Four Rows High. nt20-B-VAR variation of G1-246. */
'use strict';
const base = require('./G1-246-number-walls.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{"gap":false,"walls":4,"courses":4,"baseMin":1,"baseMax":3,"topMax":20} };
module.exports = {
  ...base,
  id: 'G1-267',
  slug: 'number-walls-four-courses',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Number Walls: Four Rows High", instruction: "Four rows high. Add each pair of bricks up to the top." } },
};
