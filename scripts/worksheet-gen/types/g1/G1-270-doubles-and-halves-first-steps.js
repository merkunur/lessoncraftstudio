/** G1-270 — Doubles and Halves: First Steps. nt20-B-VAR variation of G1-247. */
'use strict';
const base = require('./G1-247-doubles-halves.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{} };
module.exports = {
  ...base,
  id: 'G1-270',
  slug: 'doubles-and-halves-first-steps',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Doubles and Halves: First Steps", instruction: "Some cards ask you to double a group. Others ask you to halve one." } },
};
