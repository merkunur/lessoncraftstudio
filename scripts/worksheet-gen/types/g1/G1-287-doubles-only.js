/** G1-287 — Doubles to 14. nt20-B-VAR variation of G1-247. */
'use strict';
const base = require('./G1-247-doubles-halves.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"ops":["double"],"cards":6,"dMin":2,"dMax":7,"perRow":4,"icon":28} };
module.exports = {
  ...base,
  id: 'G1-287',
  slug: 'doubles-only',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Doubles to 14", instruction: "Every card on this page doubles a group of pictures." } },
};
