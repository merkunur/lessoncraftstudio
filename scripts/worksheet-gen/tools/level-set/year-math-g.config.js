/** Level Set config — Year pages G (Daily Teaching System, Part 12.2), 2026-11-13. PDF only.
 *  Two NEW mathematics PICTURE page types for Kindergarten lessons of the year design
 *  (docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md, part C): Count and Write: 11 to 20 (K-640, pictures in rows
 *  of five) and Match Them Up: More, Fewer, or the Same (K-641, two rows to pair and a decision).
 *  Themed: a copy = a theme (new pictures), five themes per level, colour and black-and-white in turn.
 *  Every face is NEW (no published theme), so its copies number from 1 at every level. */
'use strict';
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [1, 2, 3, 4, 5], 3: [1, 2, 3, 4, 5] };
const FACES = ['K-640', 'K-641'];
module.exports = {
  prefix: 'ymg',
  interactive: false,
  titleMax: 100,
  faceWideDistinct: false,
  allowFewer: true,
  // things to count and pair: never body parts (piles of eyes), colour swatches or activity scenes
  themeDeny: ['body parts', 'body parts bw', 'colors', 'colors bw', 'activities', 'activities bw'],
  note: 'Level Set 2026-11-13: Year pages G (Part 12.2). Two new Kindergarten mathematics picture page types, three levels each, for the lessons of the year designs.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: FIVE }])),
  include: () => true,
};
