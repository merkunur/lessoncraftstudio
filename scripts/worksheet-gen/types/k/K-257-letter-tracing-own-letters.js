/** K-257 — Trace the Vowels. nt20-VAR variation of K-238 (same family: letter-tracing). */
'use strict';
const base = require('./K-238-letter-tracing.js');
module.exports = {
  ...base,
  id: 'K-257',
  slug: 'letter-tracing-own-letters',
  difficulty: { 1: {"from":"specials","count":6,"glyphH":74,"laneH":108,"reps":5}, 2: {"from":"specials","count":6,"glyphH":74,"laneH":108,"reps":5}, 3: {"from":"specials","count":6,"glyphH":74,"laneH":108,"reps":5} },
  i18n: { en: { title: "Trace the Vowels", instruction: "Trace each letter, then try one on your own on the empty line." } },
};
