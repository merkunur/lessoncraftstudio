/** Level Set config — Year pages P (Daily Teaching System, Part 12.2), 2026-11-13. PDF only.
 *  Three NEW page types about chance, without library pictures: Certain, Possible, Impossible (G2-507), Chance
 *  Experiment: Draw and Tally (G2-508; a record sheet, level 3 for a die) and More Likely: Which Bag? (G3-484), for the
 *  German and Swedish chance lessons of the year designs (docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md, part D).
 *  Themeless: a copy = a seed. The faces are NEW (no published page), so their copies number from 1, and level 2
 *  copy 1 is the page a lesson hands out. A copy shares at most half of what it asks with another copy of its level;
 *  the die sheet has three different sheets (24, 30 or 36 rolls), so its level has three copies (allowFewer). */
'use strict';
const FACES = ['G2-507', 'G2-508', 'G3-484'];
module.exports = {
  prefix: 'ymp',
  themeless: true,
  interactive: false,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-13: Year pages P (Part 12.2). Three new page types about chance (certain, possible, impossible; a record sheet for an experiment; which bag is more likely), three levels each, for lessons of the year designs.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true, ...(id === 'G2-508' ? { maxCopiesAt: { 3: 3 } } : {}) }])),
  include: () => true,
};
