/** K-250 — Trace the Numbers 5 to 9. nt20-VAR variation of K-237 (same family: number-tracing). */
'use strict';
const base = require('./K-237-number-tracing.js');
module.exports = {
  ...base,
  id: 'K-250',
  slug: 'number-tracing-5-9',
  difficulty: { 1: {"digits":[5,6,7,8,9],"glyphH":92,"laneH":128,"reps":4}, 2: {"digits":[5,6,7,8,9],"glyphH":92,"laneH":128,"reps":4}, 3: {"digits":[5,6,7,8,9],"glyphH":92,"laneH":128,"reps":4} },
  i18n: { en: { title: "Trace the Numbers 5 to 9", instruction: "Trace each number. Start at the orange dot and follow the arrows." } },
};
