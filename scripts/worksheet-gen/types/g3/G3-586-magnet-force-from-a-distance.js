/** G3-586 — Magnet Force from a Distance (Batch 3, Daily Teaching System Stage D-5, 2026-11-24; science en-3-094). dk-g3.js mode 'g3-magnet-distance'. English only. */
'use strict';
const { makeG3Type } = require('../_shared/dk-g3.js');
module.exports = makeG3Type({
  id: 'G3-586', slug: 'magnet-force-from-a-distance', mode: 'g3-magnet-distance', exerciseType: 'science-sort',
  difficulty: {"1":{"magnets":1,"trials":1},"2":{"magnets":2,"trials":3},"3":{"magnets":2,"trials":3,"frame":true}},
  i18n: { en: { title: "Magnet Force from a Distance", instruction: "Measure three times for each magnet. Then test if the pull goes through each thing." } },
});
