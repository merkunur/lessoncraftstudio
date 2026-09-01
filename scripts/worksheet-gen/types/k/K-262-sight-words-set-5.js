/** K-262 — Sight Words Practice Set 5. nt20-VAR variation of K-239 (same family: sight-words). */
'use strict';
const base = require('./K-239-sight-words.js');
module.exports = {
  ...base,
  id: 'K-262',
  slug: 'sight-words-set-5',
  difficulty: { 1: {"slice":4,"words":4,"glyphH":52,"traceH":82,"writeH":56,"reps":2}, 2: {"slice":4,"words":4,"glyphH":52,"traceH":82,"writeH":56,"reps":2}, 3: {"slice":4,"words":4,"glyphH":52,"traceH":82,"writeH":56,"reps":2} },
  i18n: { en: { title: "Sight Words Practice Set 5", instruction: "Read the word. Trace it. Then write it yourself on the empty line." } },
};
