/** Level Set config — Year pages E (Daily Teaching System, Part 12.2), 2026-11-13. PDF only.
 *  Eight NEW mathematics page types without pictures, each a new face of a generator that existed. The year designs of
 *  English, German and Swedish need them for lessons no published type carried
 *  (docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md, part C): ten and how many more (number bonds of the teen
 *  numbers), take apart 6 and 7, number houses with empty floors, small fact and big fact, count the tens, one ten and
 *  some ones, subtract tens from tens, subtract three-digit numbers in columns.
 *  Themeless: a copy = a seed. Every face is NEW (no published page), so its copies number from 1, and level 2
 *  copy 1 is the page a lesson hands out. A copy shares at most half of what it asks with another copy of its level. */
'use strict';
const FACES = ['K-634', 'K-636', 'K-638', 'G1-561', 'G1-563', 'G1-564', 'G1-565', 'G2-502'];
module.exports = {
  prefix: 'yme',
  themeless: true,
  interactive: false,   // PDF only, like Year pages A to D (two of the eight have a screen adapter of their base type)
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-13: Year pages E (Part 12.2). Eight new mathematics page types without pictures (new faces of existing generators), three levels each, for the lessons of the year designs.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: () => true,
};
