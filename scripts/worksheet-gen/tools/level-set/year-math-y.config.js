/** Level Set config — Year pages Y (Daily Teaching System, Part 12.2), 2026-11-14. PDF only.
 *  One NEW measuring page type (types/_shared/ruler-lengths.js): Measure to the Quarter Inch (G3-493; in the ten
 *  other languages: measure to the half centimeter). Pencils on their own printed rulers, a line plot to make.
 *  For the English lesson Measure to the quarter inch (3.MD.B.4) and the Swedish lesson on half centimeters
 *  (docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md, parts C and D).
 *  No theme: a copy is a new draw of the lengths (a seed), five copies per level.
 *  The face is NEW (noPublished), so its copies number from 1 at every level. */
'use strict';
const FACES = ['G3-493'];
module.exports = {
  prefix: 'ymy',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-14: Year pages Y (Part 12.2). One new measuring page type without pictures of things (pencils on their own printed rulers, lengths to the quarter inch or the half centimeter, a line plot to make), three levels, for lessons of the year designs.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  // not in French: Grade 3 (CE2) writes neither 6,5 cm (decimals come in CM1) nor 6½ cm (native and teaching review,
  // 2026-11-14); a page is not published at a grade where its country cannot write its answers
  include: (loc) => loc !== 'fr',
};
