/** G1-149 — Telling time: half past. */
'use strict';
const { makeClockType, levelsFor } = require('../_shared/clock-tasks.js');
module.exports = makeClockType({
  id: 'G1-149', slug: 'telling-time-half-past', difficulty: levelsFor('G1-149', { cards: 4, stepM: 30, fixedM: 30 }),   // Level Set 2026-10-14: level 2 = the published page — every clock half past (review: the live page showed 3 of 4 clocks on the hour under "Half Past What?")
  mode: 'read-circle', stepM: 30,
  i18n: { en: { title: 'Half Past What?', instruction: 'Read each clock. Circle the matching time.' } },
});
