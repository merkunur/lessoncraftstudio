/** K-259 — Sight Words Practice Set 2. nt20-VAR variation of K-239 (same family: sight-words). */
'use strict';
const base = require('./K-239-sight-words.js');
module.exports = {
  ...base,
  id: 'K-259',
  slug: 'sight-words-set-2',
  difficulty: { 1: {"slice":1,"words":4,"glyphH":52,"traceH":82,"writeH":56,"reps":2}, 2: {"slice":1,"words":4,"glyphH":52,"traceH":82,"writeH":56,"reps":2}, 3: {"slice":1,"words":4,"glyphH":52,"traceH":82,"writeH":56,"reps":2} },
  i18n: { en: { title: "Sight Words Practice Set 2", instruction: "Read the word. Trace it. Then write it yourself on the empty line." } },
};
