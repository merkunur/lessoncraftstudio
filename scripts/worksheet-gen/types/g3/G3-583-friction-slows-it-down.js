/** G3-583 — Friction Slows It Down (Batch 3, Daily Teaching System Stage D-5, 2026-11-24; science en-3-091). dk-g3.js mode 'g3-friction'. English only. */
'use strict';
const { makeG3Type } = require('../_shared/dk-g3.js');
module.exports = makeG3Type({
  id: 'G3-583', slug: 'friction-slows-it-down', mode: 'g3-friction', exerciseType: 'science-sort',
  difficulty: {"1":{"surfaces":2,"trials":1},"2":{"surfaces":3,"trials":3,"frame":"farthest"},"3":{"surfaces":3,"trials":3,"graph":true,"frame":"friction"}},
  i18n: { en: { title: "Friction Slows It Down", instruction: "Roll the car onto three surfaces three times each. Find the middle distance. Finish the sentence." } },
});
