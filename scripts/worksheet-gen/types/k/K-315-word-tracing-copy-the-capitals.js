/** K-315 — Copy the Capitals. nt20-B-VAR variation of K-284. */
'use strict';
const base = require('./K-284-word-tracing.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{"case":"upper","traceLane":false,"rows":3,"minLetters":2,"maxLetters":8,"glyphH":46,"laneH":58,"pic":120,"cardW":170,"rowH":230} };
module.exports = {
  ...base,
  id: 'K-315',
  slug: 'word-tracing-copy-the-capitals',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Copy the Capitals", instruction: "Look at the capitals, then write them yourself." } },
};
