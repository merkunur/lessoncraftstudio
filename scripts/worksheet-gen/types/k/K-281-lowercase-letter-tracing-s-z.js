/** K-281 — Trace the Lowercase Letters s to z. nt20-VAR variation of K-278 (same family: lowercase-letter-tracing). */
'use strict';
const base = require('./K-278-lowercase-letter-tracing.js');
module.exports = {
  ...base,
  id: 'K-281',
  slug: 'lowercase-letter-tracing-s-z',
  exerciseType: "lowercase-letter-tracing",
  difficulty: { 1: {"from":18,"count":8,"glyphH":56,"laneH":80,"reps":5,"pool":"rest","toEnd":true,"lowercase":true}, 2: {"from":18,"count":8,"glyphH":56,"laneH":80,"reps":5,"pool":"rest","toEnd":true,"lowercase":true}, 3: {"from":18,"count":8,"glyphH":56,"laneH":80,"reps":5,"pool":"rest","toEnd":true,"lowercase":true} },
  i18n: { en: { title: "Trace the Lowercase Letters s to z", instruction: "Trace each small letter, then try one on your own on the empty line. Start at the orange dot and follow the arrows." } },
};
