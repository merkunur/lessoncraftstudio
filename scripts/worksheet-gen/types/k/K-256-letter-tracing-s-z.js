/** K-256 — Trace the Letters S to Z. nt20-VAR variation of K-238 (same family: letter-tracing). */
'use strict';
const base = require('./K-238-letter-tracing.js');
module.exports = {
  ...base,
  id: 'K-256',
  slug: 'letter-tracing-s-z',
  // Level Set 2026-09-28: L2 published · L3 two letters to write alone (emptyCount 2)
  difficulty: { 2: {"from":18,"count":8,"glyphH":56,"laneH":80,"reps":5,"pool":"rest","toEnd":true}, 3: {"from":18,"count":8,"glyphH":56,"laneH":80,"reps":5,"pool":"rest","toEnd":true,"emptyCount":2} },
  unitAxis: { applicable: false },   // the per-letter axis belongs to K-238's own copies
  i18n: { en: { title: "Trace the Letters S to Z", instruction: "Trace each letter, then try one on your own on the empty line. Start at the orange dot and follow the arrows." } },
};
