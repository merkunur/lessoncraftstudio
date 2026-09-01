/** K-251 — Trace and Write the Numbers. nt20-VAR variation of K-237 (same family: number-tracing). */
'use strict';
const base = require('./K-237-number-tracing.js');
module.exports = {
  ...base,
  id: 'K-251',
  slug: 'number-trace-and-write',
  difficulty: { 1: {"digits":[0,1,2,3,4,5,6,7,8,9],"glyphH":52,"laneH":71,"reps":5,"emptyLast":true}, 2: {"digits":[0,1,2,3,4,5,6,7,8,9],"glyphH":52,"laneH":71,"reps":5,"emptyLast":true}, 3: {"digits":[0,1,2,3,4,5,6,7,8,9],"glyphH":52,"laneH":71,"reps":5,"emptyLast":true} },
  i18n: { en: { title: "Trace and Write the Numbers", instruction: "Trace each number. Then write it yourself in the empty space." } },
};
