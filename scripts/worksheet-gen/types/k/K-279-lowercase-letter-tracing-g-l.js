/** K-279 — Trace the Lowercase Letters g to l. nt20-VAR variation of K-278 (same family: lowercase-letter-tracing). */
'use strict';
const base = require('./K-278-lowercase-letter-tracing.js');
module.exports = {
  ...base,
  id: 'K-279',
  slug: 'lowercase-letter-tracing-g-l',
  exerciseType: "lowercase-letter-tracing",
  difficulty: { 1: {"from":6,"count":6,"glyphH":74,"laneH":108,"reps":5,"pool":"rest","lowercase":true}, 2: {"from":6,"count":6,"glyphH":74,"laneH":108,"reps":5,"pool":"rest","lowercase":true}, 3: {"from":6,"count":6,"glyphH":74,"laneH":108,"reps":5,"pool":"rest","lowercase":true} },
  i18n: { en: { title: "Trace the Lowercase Letters g to l", instruction: "Trace each small letter, then try one on your own on the empty line. Start at the orange dot and follow the arrows." } },
};
