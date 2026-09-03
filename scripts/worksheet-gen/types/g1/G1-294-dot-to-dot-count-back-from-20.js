/** G1-294 — Dot-to-Dot: Count Back from 20. nt20-B-VAR variation of K-285. */
'use strict';
const base = require('../k/K-285-dot-to-dot.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{"startAt":20,"step":-1,"window":null} };
module.exports = {
  ...base,
  id: 'G1-294',
  slug: 'dot-to-dot-count-back-from-20',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Dot-to-Dot: Count Back from 20", instruction: "Join the dots from 20 back down to 1 to finish the picture." } },
};
