/** Level Set config — Year pages B (Daily Teaching System, Part 12.2), 2026-11-13. PDF only.
 *  Eighteen more mathematics types that were built for the worksheet makers and published as pages in no language;
 *  the year designs of English, German and Swedish need them (docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md).
 *  Themeless: a copy = a seed. Every face is NEW (no published page), so its copies number from 1, and level 2
 *  copy 1 is the page a lesson hands out. A copy shares at most half of what it asks with another copy of its level. */
'use strict';
const FACES = ['G1-445', 'G1-447', 'G1-448', 'G1-451', 'G1-477', 'G2-395', 'G2-401', 'G2-404', 'G2-472', 'G2-477', 'G3-406', 'G3-407', 'G3-410', 'K-454', 'K-456', 'K-502', 'K-546', 'K-606'];
module.exports = {
  prefix: 'ymb',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-13: Year pages B (Part 12.2). Eighteen maker-only mathematics types published for the first time, three levels each, for the lessons of the year designs.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: () => true,
};
