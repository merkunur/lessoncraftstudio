/** Level Set config — Year pages C (Daily Teaching System, Part 12.2), 2026-11-13. PDF only.
 *  Thirteen PICTURE types that were built for the worksheet makers and published as pages in no language; the year
 *  designs of English, German and Swedish need them (docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md):
 *  teen numbers on two ten-frames, one more / one less, count on from the box, same number?, how many are hiding,
 *  count and trace, write the number sentence, compare word problems, two-step word problems, our class graph,
 *  follow the steps / give the directions on a grid, measure in inches (English only: the other ten languages
 *  measure in centimetres, and the type refuses them).
 *  Themed: a copy = a theme (new pictures, new words), five themes per level, colour and black-and-white in turn.
 *  Every face is NEW (no published theme), so its copies number from 1 at every level. */
'use strict';
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [1, 2, 3, 4, 5], 3: [1, 2, 3, 4, 5] };
const FACES = ['K-448', 'K-443', 'K-444', 'K-445', 'K-457', 'K-467', 'G1-444', 'G1-511', 'G2-489', 'G1-481', 'G1-528', 'G1-529', 'G2-476'];
module.exports = {
  prefix: 'ymc',
  titleMax: 100,
  faceWideDistinct: false,
  allowFewer: true,
  // things to count, compare and tell stories about: never body parts (piles of eyes), colour swatches or activity scenes
  themeDeny: ['body parts', 'body parts bw', 'colors', 'colors bw', 'activities', 'activities bw'],
  note: 'Level Set 2026-11-13: Year pages C (Part 12.2). Thirteen maker-only mathematics picture types published for the first time, three levels each, for the lessons of the year designs.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: FIVE }])),
  include: (loc, id) => (id === 'G2-476' ? loc === 'en' : true),
};
