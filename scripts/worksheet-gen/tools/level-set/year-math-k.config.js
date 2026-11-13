/** Level Set config — Year pages K (Daily Teaching System, Part 12.2), 2026-11-13. PDF only.
 *  Two NEW mathematics page types without pictures: Break Apart a Hard Fact (G3-483; an array cut into two known
 *  facts, a new mode of the multiplication generator) and Add Tens and Ones (G2-504; two-digit sums added place by
 *  place with the steps written, a new mode of the add-and-subtract generator), for two Swedish lessons of the year
 *  design (docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md, part C).
 *  Themeless: a copy = a seed. The faces are NEW (no published page), so their copies number from 1, and level 2
 *  copy 1 is the page a lesson hands out. A copy shares at most half of what it asks with another copy of its level. */
'use strict';
const FACES = ['G3-483', 'G2-504'];
module.exports = {
  prefix: 'ymk',
  themeless: true,
  interactive: false,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-13: Year pages K (Part 12.2). Two new mathematics page types without pictures (Break Apart a Hard Fact, Add Tens and Ones), three levels each, for lessons of the year designs.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: () => true,
};
