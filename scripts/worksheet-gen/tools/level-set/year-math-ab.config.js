/** Level Set config — Year pages AB (Daily Teaching System, Part 12.2), 2026-11-14. PDF only.
 *  One NEW story page type (types/_shared/length-stories.js): Length Story Problems (G2-518; three stories about lengths
 *  in one unit, a bar model, an equation and the answer with its unit), for
 *  the English Grade 2 lesson "Length story problems" (2.MD.B.5) of the year design
 *  (docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md: no story told a length).
 *  No theme: a copy is a new draw (a seed), five copies per level. The face is NEW, so its copies number from 1. */
'use strict';
const FACES = ['G2-518'];
module.exports = {
  prefix: 'ymab',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 0,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-14: Year pages AB (Part 12.2). One new story page type (lengths put together, cut off and compared, in one unit, with a bar model), three levels, for a lesson of the year designs.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: () => true,
};
