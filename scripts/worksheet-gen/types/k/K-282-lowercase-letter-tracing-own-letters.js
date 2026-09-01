/** K-282 — Trace the Lowercase Vowels. nt20-VAR variation of K-278 (same family: lowercase-letter-tracing). */
'use strict';
const base = require('./K-278-lowercase-letter-tracing.js');
module.exports = {
  ...base,
  id: 'K-282',
  slug: 'lowercase-letter-tracing-own-letters',
  exerciseType: "lowercase-letter-tracing",
  difficulty: { 1: {"from":"specials","count":6,"glyphH":74,"laneH":108,"reps":5,"lowercase":true}, 2: {"from":"specials","count":6,"glyphH":74,"laneH":108,"reps":5,"lowercase":true}, 3: {"from":"specials","count":6,"glyphH":74,"laneH":108,"reps":5,"lowercase":true} },
  i18n: { en: { title: "Trace the Lowercase Vowels", instruction: "Trace each small letter, then try one on your own on the empty line. Start at the orange dot and follow the arrows." } },
};
