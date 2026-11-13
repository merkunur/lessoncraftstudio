/** Level Set config — Year pages D (Daily Teaching System, Part 12.2), 2026-11-13. PDF only.
 *  Eight NEW mathematics page types, each a new face of a generator that existed (number-line-more, addsub-more,
 *  base-ten-tasks). The year designs of English, German and Swedish need them for lessons no published type carried
 *  (docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md): back to the ten first, jump across the next ten, add and
 *  subtract on the open number line, add and subtract tens, add and subtract ones, bundle the tens, ten and some more.
 *  Themeless: a copy = a seed. Every face is NEW (no published page), so its copies number from 1, and level 2
 *  copy 1 is the page a lesson hands out. A copy shares at most half of what it asks with another copy of its level. */
'use strict';
const FACES = ['G1-556', 'G1-557', 'G2-500', 'G2-501', 'G1-558', 'G1-559', 'G1-560', 'K-627'];
module.exports = {
  prefix: 'ymd',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-13: Year pages D (Part 12.2). Eight new mathematics page types (new faces of existing generators), three levels each, for the lessons of the year designs.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: () => true,
};
