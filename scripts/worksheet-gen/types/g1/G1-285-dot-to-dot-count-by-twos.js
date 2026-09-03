/** G1-285 — Dot-to-Dot: Count by Twos. nt20-B-VAR variation of K-285. */
'use strict';
const base = require('../k/K-285-dot-to-dot.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{"startAt":2,"step":2} };
module.exports = {
  ...base,
  id: 'G1-285',
  slug: 'dot-to-dot-count-by-twos',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Dot-to-Dot: Count by Twos", instruction: "Join the numbered dots in twos; the rest of the outline is already drawn." } },
};
