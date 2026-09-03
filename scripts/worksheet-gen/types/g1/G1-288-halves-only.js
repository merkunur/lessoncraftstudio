/** G1-288 — Halves to 12. nt20-B-VAR variation of G1-247. */
'use strict';
const base = require('./G1-247-doubles-halves.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"ops":["half"],"cards":6,"hMin":1,"hMax":6} };
module.exports = {
  ...base,
  id: 'G1-288',
  slug: 'halves-only',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Halves to 12", instruction: "Every card cuts a group in half. Write the two equal parts." } },
};
