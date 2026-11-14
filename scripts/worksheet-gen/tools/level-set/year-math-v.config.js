/** Level Set config — Year pages V (Daily Teaching System, Part 12.2), 2026-11-14. PDF only.
 *  Three NEW mathematics page types on making and opening a ten (types/_shared/regroup-more.js): Add and Make a New
 *  Ten: Tens-and-Ones Mat (G1-573), Subtract and Open a Ten: Tens-and-Ones Mat (G2-513) and Add Three and Four
 *  Two-Digit Numbers (G2-514).
 *  For the lessons of the year designs on adding and subtracting within 100 (docs/daily-teaching-system/year/
 *  TYPE-WORK-LIST.math.md, part D).
 *  No theme: a copy is a new draw of the numbers (a seed), five copies per level.
 *  Every face is NEW (noPublished), so its copies number from 1 at every level. */
'use strict';
const FACES = ['G1-573', 'G2-513', 'G2-514'];
module.exports = {
  prefix: 'ymv',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-14: Year pages V (Part 12.2). Three new mathematics page types without pictures (two two-digit numbers on a tens-and-ones mat with a new ten; subtraction on the mat with a ten opened; three and four two-digit numbers in columns), three levels each, for lessons of the year designs.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: () => true,
};
