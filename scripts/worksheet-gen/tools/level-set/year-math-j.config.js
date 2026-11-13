/** Level Set config — Year pages J (Daily Teaching System, Part 12.2), 2026-11-13. PDF only.
 *  One NEW mathematics page type without pictures: Times Table Tricks: 6 and 7 (G3-482; the tables of 6 and 7 built from
 *  the table of 5, a face of the strategy chains), for the Swedish åk 3 lesson of the year design
 *  (docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md, part C).
 *  Themeless: a copy = a seed. The face is NEW (no published page), so its copies number from 1, and level 2
 *  copy 1 is the page a lesson hands out. A copy shares at most half of what it asks with another copy of its level. */
'use strict';
const FACES = ['G3-482'];
module.exports = {
  prefix: 'ymj',
  themeless: true,
  interactive: false,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-13: Year pages J (Part 12.2). One new mathematics page type without pictures (Times Table Tricks: 6 and 7), three levels, for a lesson of the year designs.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: () => true,
};
