/** K-283 — My First Small Letters. nt20-VAR variation of K-278 (same family: lowercase-letter-tracing). */
'use strict';
const base = require('./K-278-lowercase-letter-tracing.js');
module.exports = {
  ...base,
  id: 'K-283',
  slug: 'lowercase-letter-tracing-first-letters',
  exerciseType: "lowercase-letter-tracing",
  difficulty: { 1: {"from":0,"count":4,"glyphH":104,"laneH":152,"reps":4,"lowercase":true}, 2: {"from":0,"count":4,"glyphH":104,"laneH":152,"reps":4,"lowercase":true}, 3: {"from":0,"count":4,"glyphH":104,"laneH":152,"reps":4,"lowercase":true} },
  i18n: { en: { title: "My First Small Letters", instruction: "Trace each small letter, then try one on your own on the empty line. Start at the orange dot and follow the arrows." } },
};
