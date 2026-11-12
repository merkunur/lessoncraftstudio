/** Level Set config — Year pages A (Daily Teaching System, Part 12.2), 2026-11-13. PDF only.
 *  Six mathematics types that were built for the worksheet makers and published as pages in no language; the year
 *  designs of English, German and Swedish need them for 34 new lessons (docs/daily-teaching-system/year/
 *  TYPE-WORK-LIST.math.md): jumps over the ten on a number line, the open number line, mental math to 100, near
 *  doubles, true or false equations, take away on the ten-frame.
 *  Themeless: a copy = a seed. Every face is NEW (no published page), so its copies number from 1, and level 2
 *  copy 1 is the page a lesson hands out. A copy shares at most half of what it asks with another copy of its level. */
'use strict';
const FACES = ['G1-439', 'G1-438', 'G1-446', 'G1-449', 'G1-443', 'K-451'];
module.exports = {
  prefix: 'yma',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-13: Year pages A (Part 12.2). Six maker-only mathematics types published for the first time, three levels each, for the lessons of the year designs.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: () => true,
};
