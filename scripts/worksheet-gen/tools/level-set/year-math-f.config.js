/** Level Set config — Year pages F (Daily Teaching System, Part 12.2), 2026-11-13. PDF only.
 *  Six NEW mathematics PICTURE page types, each a new face of a generator that existed; the year designs of English,
 *  German and Swedish need them (docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md, part C): count on from any
 *  number, the number chart to 50, how many are hiding (numbers to 9), draw the number on two ten-frames, one for you
 *  and one for me (sharing without a division sign), turn-around facts.
 *  Themed: a copy = a theme (new pictures), five themes per level, colour and black-and-white in turn.
 *  Every face is NEW (no published theme), so its copies number from 1 at every level. */
'use strict';
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [1, 2, 3, 4, 5], 3: [1, 2, 3, 4, 5] };
const FACES = ['K-632', 'K-633', 'K-635', 'K-637', 'K-639', 'G1-562'];
module.exports = {
  prefix: 'ymf',
  interactive: false,   // PDF only, like Year pages A to D (three of the six have a screen adapter of their base type)
  titleMax: 100,
  faceWideDistinct: false,
  allowFewer: true,
  // things to count, share and add: never body parts (piles of eyes), colour swatches or activity scenes
  themeDeny: ['body parts', 'body parts bw', 'colors', 'colors bw', 'activities', 'activities bw'],
  note: 'Level Set 2026-11-13: Year pages F (Part 12.2). Six new mathematics picture page types (new faces of existing generators), three levels each, for the lessons of the year designs.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: FIVE }])),
  include: () => true,
};
