/** K-258 — My First Big Letters. nt20-VAR variation of K-238 (same family: letter-tracing). */
'use strict';
const base = require('./K-238-letter-tracing.js');
module.exports = {
  ...base,
  id: 'K-258',
  slug: 'letter-tracing-first-letters',
  // Level Set 2026-09-28: L2 published · L3 two letters to write alone (emptyCount 2)
  difficulty: { 2: {"from":0,"count":4,"glyphH":104,"laneH":152,"reps":4}, 3: {"from":0,"count":4,"glyphH":74,"laneH":108,"reps":5,"emptyCount":2} },
  unitAxis: { applicable: false },   // the per-letter axis belongs to K-238's own copies
  i18n: { en: { title: "My First Big Letters", instruction: "Trace each letter, then try one on your own on the empty line. Start at the orange dot and follow the arrows." } },
};
