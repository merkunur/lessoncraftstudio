/** G2-314 — Dot-to-Dot: Count by Tens. nt20-B-VAR variation of K-285. */
'use strict';
const base = require('../k/K-285-dot-to-dot.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{"startAt":10,"step":10,"chip":44} };
module.exports = {
  ...base,
  id: 'G2-314',
  slug: 'dot-to-dot-count-by-tens',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Dot-to-Dot: Count by Tens", instruction: "Join the numbered dots in tens; the rest of the outline is already drawn." } },
};
