/** K-294 — Dot-to-Dot 1 to 10. nt20-B-VAR variation of K-285. */
'use strict';
const base = require('./K-285-dot-to-dot.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{} };
module.exports = {
  ...base,
  id: 'K-294',
  slug: 'dot-to-dot-1-to-10',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Dot-to-Dot 1 to 10", instruction: "Start at the orange dot. Join the dots from 1 to 10 to finish the picture." } },
};
