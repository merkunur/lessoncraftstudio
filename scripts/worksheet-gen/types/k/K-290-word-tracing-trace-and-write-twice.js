/** K-290 — Trace Once, Write It Twice. nt20-B-VAR variation of K-284. */
'use strict';
const base = require('./K-284-word-tracing.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{} };
module.exports = {
  ...base,
  id: 'K-290',
  slug: 'word-tracing-trace-and-write-twice',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Trace Once, Write It Twice", instruction: "Trace the word once, then write it twice on your own." } },
};
