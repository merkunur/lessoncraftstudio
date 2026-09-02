/** G1-268 — Number Walls: Find the Missing Brick. nt20-B-VAR variation of G1-246. */
'use strict';
const base = require('./G1-246-number-walls.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{} };
module.exports = {
  ...base,
  id: 'G1-268',
  slug: 'number-walls-missing-brick',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Number Walls: Find the Missing Brick", instruction: "A bottom brick is missing. Use the brick above to find it." } },
};
