/** G1-275 — Number Line to 20: Fewer Labels. nt20-B-VAR variation of G1-248. */
'use strict';
const base = require('./G1-248-number-line-position.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"label":10} };
module.exports = {
  ...base,
  id: 'G1-275',
  slug: 'number-line-to-20-fewer-labels',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Number Line to 20: Fewer Labels", instruction: "Only 0, 10 and 20 are printed. Count on to each arrow." } },
};
