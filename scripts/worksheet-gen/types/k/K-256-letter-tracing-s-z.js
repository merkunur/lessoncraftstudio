/** K-256 — Trace the Letters S to Z. nt20-VAR variation of K-238 (same family: letter-tracing). */
'use strict';
const base = require('./K-238-letter-tracing.js');
module.exports = {
  ...base,
  id: 'K-256',
  slug: 'letter-tracing-s-z',
  difficulty: { 1: {"from":18,"count":8,"glyphH":56,"laneH":80,"reps":5,"pool":"rest","toEnd":true}, 2: {"from":18,"count":8,"glyphH":56,"laneH":80,"reps":5,"pool":"rest","toEnd":true}, 3: {"from":18,"count":8,"glyphH":56,"laneH":80,"reps":5,"pool":"rest","toEnd":true} },
  i18n: { en: { title: "Trace the Letters S to Z", instruction: "Trace each letter, then try one on your own on the empty line. Start at the orange dot and follow the arrows." } },
};
