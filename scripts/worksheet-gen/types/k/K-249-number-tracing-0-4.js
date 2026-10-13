/** K-249 — Trace the Numbers 0 to 4. nt20-VAR variation of K-237 (same family: number-tracing). */
'use strict';
const base = require('./K-237-number-tracing.js');
module.exports = {
  ...base,
  id: 'K-249',
  slug: 'number-tracing-0-4',
  // Level Set 2026-10-13: L1 every slot traced from its own dot (+ stroke numbers) · L2 published · L3 fade (trace, start dot only, two blank)
  difficulty: { 1: {"digits":[0,1,2,3,4],"glyphH":92,"laneH":128,"modes":["model","trace","trace","trace"],"badges":true}, 2: {"digits":[0,1,2,3,4],"glyphH":92,"laneH":128,"reps":4}, 3: {"digits":[0,1,2,3,4],"glyphH":92,"laneH":128,"modes":["model","trace","dot","empty","empty"],"badges":true} },
  unitAxis: { applicable: false },   // the per-number axis belongs to K-237's own copies
  i18n: { en: { title: "Trace the Numbers 0 to 4", instruction: "Trace each number. Start at the orange dot and follow the arrows." } },
};
