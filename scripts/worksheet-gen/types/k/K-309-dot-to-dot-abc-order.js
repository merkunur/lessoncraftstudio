/** K-309 — ABC Dot-to-Dot. nt20-B-VAR variation of K-285. */
'use strict';
const base = require('./K-285-dot-to-dot.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{"letters":true,"window":null,"chip":30} };
module.exports = {
  ...base,
  id: 'K-309',
  slug: 'dot-to-dot-abc-order',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "ABC Dot-to-Dot", instruction: "Join the dots in alphabet order, from a to t, to find the picture." } },
};
