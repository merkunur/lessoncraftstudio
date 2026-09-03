/** G2-304 — Dot-to-Dot: Count by Fives. nt20-B-VAR variation of K-285. */
'use strict';
const base = require('../k/K-285-dot-to-dot.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{"startAt":5,"step":5} };
module.exports = {
  ...base,
  id: 'G2-304',
  slug: 'dot-to-dot-count-by-fives',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Dot-to-Dot: Count by Fives", instruction: "Ten numbered dots counting in fives; the rest of the outline is already drawn." } },
};
