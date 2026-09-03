/** K-308 — Dot-to-Dot: Count Back from 10. nt20-B-VAR variation of K-285. */
'use strict';
const base = require('./K-285-dot-to-dot.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{"startAt":10,"step":-1} };
module.exports = {
  ...base,
  id: 'K-308',
  slug: 'dot-to-dot-count-back-from-10',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Dot-to-Dot: Count Back from 10", instruction: "Ten numbered dots to join backwards; the rest of the outline is already drawn." } },
};
