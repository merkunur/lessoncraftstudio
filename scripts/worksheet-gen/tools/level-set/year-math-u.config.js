/** Level Set config — Year pages U (Daily Teaching System, Part 12.2), 2026-11-14. PDF only.
 *  Three NEW mathematics page types for Grade 3 area and perimeter (types/_shared/area-perimeter-more.js): Area of a
 *  Rectangle: Multiply the Sides (G3-488), Area of an L-Shape (G3-489) and Perimeter: Find the Missing Side (G3-490).
 *  For the area and perimeter lessons of the year designs (docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md,
 *  parts C and D).
 *  No theme: a copy is a new draw of the figures (a seed), five copies per level.
 *  Every face is NEW (noPublished), so its copies number from 1 at every level. */
'use strict';
const FACES = ['G3-488', 'G3-489', 'G3-490'];
module.exports = {
  prefix: 'ymu',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-14: Year pages U (Part 12.2). Three new mathematics page types without pictures (area of a rectangle from its side lengths; area of an L-shape; the missing side of a figure with a given perimeter), three levels each, for lessons of the year designs.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: () => true,
};
