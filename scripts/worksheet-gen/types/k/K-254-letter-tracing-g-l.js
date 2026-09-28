/** K-254 — Trace the Letters G to L. nt20-VAR variation of K-238 (same family: letter-tracing). */
'use strict';
const base = require('./K-238-letter-tracing.js');
module.exports = {
  ...base,
  id: 'K-254',
  slug: 'letter-tracing-g-l',
  // Level Set 2026-09-28: L1 numbered strokes (84/110, 4 reps) · L2 published · L3 two letters to write alone (emptyCount 2)
  difficulty: { 1: {"from":6,"count":6,"glyphH":84,"laneH":110,"reps":4,"pool":"rest"}, 2: {"from":6,"count":6,"glyphH":74,"laneH":108,"reps":5,"pool":"rest"}, 3: {"from":6,"count":6,"glyphH":56,"laneH":80,"reps":5,"pool":"rest","emptyCount":2} },
  unitAxis: { applicable: false },   // the per-letter axis belongs to K-238's own copies
  i18n: { en: { title: "Trace the Letters G to L", instruction: "Trace each letter, then try one on your own on the empty line. Start at the orange dot and follow the arrows." } },
};
