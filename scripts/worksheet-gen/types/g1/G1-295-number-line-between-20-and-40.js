/** G1-295 — Where on the Number Line? 20 to 40. nt20-B-VAR variation of G1-248. */
'use strict';
const base = require('./G1-248-number-line-position.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"min":20,"max":40,"lines":4,"tick":1,"label":5,"pointers":3,"gap":3} };
module.exports = {
  ...base,
  id: 'G1-295',
  slug: 'number-line-between-20-and-40',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Where on the Number Line? 20 to 40", instruction: "The line starts at twenty. Count on from the nearest printed number." } },
};
