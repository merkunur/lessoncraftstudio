/** Level Set config — Year pages N (Daily Teaching System, Part 12.2), 2026-11-13. PDF only.
 *  One NEW page type without pictures: Fix the Arrow Program (G2-505; a grid, a flag, a star and a row of arrows with
 *  exactly one wrong arrow), for the Swedish åk 2 lesson of the year design
 *  (docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md, part D).
 *  Themeless: a copy = a seed. The face is NEW (no published page), so its copies number from 1, and level 2
 *  copy 1 is the page a lesson hands out. A copy shares at most half of what it asks with another copy of its level. */
'use strict';
const FACES = ['G2-505'];
module.exports = {
  prefix: 'ymn',
  themeless: true,
  interactive: false,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-13: Year pages N (Part 12.2). One new page type without pictures (Fix the Arrow Program), three levels, for a lesson of the year designs.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: () => true,
};
