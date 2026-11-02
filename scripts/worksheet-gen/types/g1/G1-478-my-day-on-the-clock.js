/**
 * G1-478 — My Day on the Clock (Telling Time maker, NEW-TEMPLATES §15 T2, 2026-11-02). Moments of a child's day
 * (data/time/routine.js: a library picture + its name), each with its time; the child draws the hands. The cards run in
 * the order of the day. L1 whole hours, 4 cards · L2 half hours, 6 · L3 quarter hours, 6 — and in the ten 24-hour
 * locales the time is printed the 24-hour way (19:30), drawn on the 12-hour face. Draw-the-hands screen, key, verify:
 * clock-tasks.js mode 'draw' with the d.routine knob. 1.MD.B.3, 2.MD.C.7.
 */
'use strict';
const { makeClockType } = require('../_shared/clock-tasks.js');

module.exports = makeClockType({
  id: 'G1-478',
  slug: 'my-day-on-the-clock',
  mode: 'draw',
  gradeBand: 'G1',
  difficulty: {
    1: { ls: 1, routine: 1, cards: 4, stepM: 60, routineStep: 60 },
    2: { ls: 1, routine: 1, cards: 6, stepM: 30, routineStep: 30 },
    3: { ls: 1, routine: 1, cards: 6, stepM: 15, routineStep: 15, h24: true },
  },
  i18n: { en: { title: "My Day on the Clock", instruction: "Read what happens and when. Draw the hour hand and the minute hand on each clock." } },
});
