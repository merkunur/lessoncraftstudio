/** K-255 — Trace the Letters M to R. nt20-VAR variation of K-238 (same family: letter-tracing). */
'use strict';
const base = require('./K-238-letter-tracing.js');
module.exports = {
  ...base,
  id: 'K-255',
  slug: 'letter-tracing-m-r',
  difficulty: { 1: {"from":12,"count":6,"glyphH":74,"laneH":108,"reps":5,"pool":"rest"}, 2: {"from":12,"count":6,"glyphH":74,"laneH":108,"reps":5,"pool":"rest"}, 3: {"from":12,"count":6,"glyphH":74,"laneH":108,"reps":5,"pool":"rest"} },
  i18n: { en: { title: "Trace the Letters M to R", instruction: "Trace each letter, then try one on your own on the empty line. Start at the orange dot and follow the arrows." } },
};
