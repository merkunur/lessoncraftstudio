/** K-312 — Trace Words of Middle Length. nt20-B-VAR variation of K-284. */
'use strict';
const base = require('./K-284-word-tracing.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{} };
module.exports = {
  ...base,
  id: 'K-312',
  slug: 'word-tracing-medium-words',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Trace Words of Middle Length", instruction: "Longer words than the first page, with the word still printed on the line above." } },
};
