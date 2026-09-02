/** K-289 — Trace Your First Words. nt20-B-VAR variation of K-284. */
'use strict';
const base = require('./K-284-word-tracing.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{} };
module.exports = {
  ...base,
  id: 'K-289',
  slug: 'word-tracing-first-words',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Trace Your First Words", instruction: "Trace the dashed word, then write it on the empty lines." } },
};
