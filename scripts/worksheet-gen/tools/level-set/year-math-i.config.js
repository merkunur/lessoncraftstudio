/** Level Set config — Year pages I (Daily Teaching System, Part 12.2), 2026-11-13. PDF only.
 *  Two NEW mathematics page types without pictures, each a new face of a generator that existed
 *  (docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md, part C): Reading Measuring Jugs in Deciliters (G2-503, only
 *  in the languages whose grade 2 measures in litres and decilitres: the type refuses the others) and What Fraction Is
 *  the Dot? (G3-481: the child writes the fraction of a dot on a number line from 0 to 1).
 *  Themeless: a copy = a seed. Every face is NEW (no published page), so its copies number from 1, and level 2
 *  copy 1 is the page a lesson hands out. A copy shares at most half of what it asks with another copy of its level. */
'use strict';
const FACES = ['G2-503', 'G3-481'];
const DL = ['sv', 'da', 'no', 'fi', 'fr', 'it'];
module.exports = {
  prefix: 'ymi',
  themeless: true,
  interactive: false,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-13: Year pages I (Part 12.2). Two new mathematics page types without pictures (the decilitre jug in six languages, the fraction of a dot on the number line), three levels each, for lessons of the year designs.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  // G3-481 is not a German page: fractions on the Zahlenstrahl are Klasse 5/6 there (native reader, 2026-11-13)
  include: (loc, id) => (id === 'G2-503' ? DL.includes(loc) : loc !== 'de'),
};
