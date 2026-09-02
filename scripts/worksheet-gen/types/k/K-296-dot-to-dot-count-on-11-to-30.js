/** K-296 — Dot-to-Dot: Count On from 11. nt20-B-VAR variation of K-285. */
'use strict';
const base = require('./K-285-dot-to-dot.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{} };
module.exports = {
  ...base,
  id: 'K-296',
  slug: 'dot-to-dot-count-on-11-to-30',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Dot-to-Dot: Count On from 11", instruction: "Count on from 11 to 30 to find the hidden picture." } },
};
