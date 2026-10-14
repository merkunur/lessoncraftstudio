/** G1-148 — Telling time: o'clock. */
'use strict';
const { makeClockType, levelsFor } = require('../_shared/clock-tasks.js');
module.exports = makeClockType({
  id: 'G1-148', slug: 'telling-time-oclock', difficulty: levelsFor('G1-148', { cards: 4, stepM: 60 }),   // Level Set 2026-10-14: level 2 = the published default
  mode: 'read-circle', stepM: 60,
  i18n: { en: { title: 'On the Hour', instruction: 'Read each clock. Circle the matching time.' } },
});
