/** Level Set config — Year pages X (Daily Teaching System, Part 12.2), 2026-11-14. PDF only.
 *  Three NEW measuring page types (types/_shared/measure-units.js): No Gaps, No Overlaps (G1-574), Measure and Make a
 *  Line Plot (G2-516) and Same Length, Two Units (G2-517).
 *  For the lessons of the English year design on laying units end to end (1.MD.A.2), a line plot of measured lengths
 *  (2.MD.D.9) and one length in two units (2.MD.A.2) (docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md, part D).
 *  No theme: a copy is a new draw of the lengths (a seed), five copies per level.
 *  Every face is NEW (noPublished), so its copies number from 1 at every level. */
'use strict';
const FACES = ['G1-574', 'G2-516', 'G2-517'];
module.exports = {
  prefix: 'ymx',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-14: Year pages X (Part 12.2). Three new measuring page types without pictures of things (rows of paper clips laid right or wrong under a ribbon; ten lengths made into a line plot; one ribbon measured in paper clips and in cubes), three levels each, for lessons of the year designs.',
  // the harder line-plot page is an empty recording page (the child measures real pencils): every copy would be the
  // same page, so it has one
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true, ...(id === 'G2-516' ? { maxCopiesAt: { 3: 1 } } : {}) }])),
  include: () => true,
};
