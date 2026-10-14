/** Level Set config — Telling Time (walk #64, 2026-10-14): 15 faces of clock-tasks + G2-249. PDF + interactive + key.
 *  Themeless: a copy = a seed; copies of a level share at most a quarter of their times (levelSetWords = the times asked).
 *  The eight June faces (wave-time, ten live level-2 copies each) get levels 1 and 3 only; G1-150 match, G1-212 draw and
 *  the draw variations get level 2 copies too (copy 1 = the published page); G1-233 / 234 / 235 have two real levels
 *  (level 1 = the minute hand printed). Cap: ≤ 400 new decks per locale (operator) — this config makes ≈ 163.
 *  Screens: tap the time (read / match / 12-24), type the hours (elapsed), type hours + minutes (add / subtract),
 *  drag the hands (draw: the set-clock runtime). */
'use strict';
const JUNE = ['G1-148', 'G1-149', 'G2-250', 'G2-249', 'G3-354', 'G3-344', 'G3-355', 'G3-356'];
const FULL = ['G1-150', 'G1-212', 'G1-236', 'G1-237'];
const TWO = ['G1-233', 'G1-234', 'G1-235'];
module.exports = {
  prefix: 'tim',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.25,
  seeds: 80,
  allowFewer: true,
  note: 'Level Set 2026-10-14: Telling Time. Level 1 easier (fewer options, half past only, the minute hand printed, the minute numbers round the face, whole hours), level 2 the published page, level 3 harder (more clocks, the swapped-hands and hour-before/after misreadings as options, plain faces, quarter to, passing 12 o\'clock, quarter-hour durations). Visible to teachers, never indexed; PDF + interactive screen version (tap the time, type the hours, drag the hands) + answer key.',
  faces: Object.fromEntries([
    // o'clock / half past: only twelve times exist, a page of six shares up to half of them with another copy (the options differ)
    ...JUNE.map((id) => [id, { levels: [1, 3], ...(id === 'G1-148' || id === 'G1-149' ? { shareFrac: 0.5 } : {}) }]),
    ...FULL.map((id) => [id, { levels: [2, 1, 3] }]),
    ...TWO.map((id) => [id, { levels: [2, 1] }]),
  ]),
  include: () => true,
};
