/** K-295 — Dot-to-Dot: Teen Numbers. nt20-B-VAR variation of K-285. */
'use strict';
const base = require('./K-285-dot-to-dot.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{"startAt":11} };
module.exports = {
  ...base,
  id: 'K-295',
  slug: 'dot-to-dot-teen-numbers',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Dot-to-Dot: Teen Numbers", instruction: "Start at the orange dot. Join the dots from 11 to 20 to finish the picture." } },
};
