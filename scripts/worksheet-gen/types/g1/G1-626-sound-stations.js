/** G1-626 — Sound Stations (Batch 1, Daily Teaching System Stage D-5, 2026-11-23; science en-1-033). dk-g1.js mode 'g1-sound-stations'. English only. */
'use strict';
const { makeG1Type } = require('../_shared/dk-g1.js');
module.exports = makeG1Type({
  id: 'G1-626', slug: 'sound-stations', mode: 'g1-sound-stations', exerciseType: 'science-sort',
  difficulty: {"1":{"stations":3},"2":{"stations":4,"draw":true},"3":{"stations":4,"draw":true,"frame":true}},
  i18n: { en: { title: "Sound Stations", instruction: "At each station, circle “I felt it shake,” “I saw it shake,” or both. Draw the part that moved." } },
});
