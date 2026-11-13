/** Level Set config — Year pages M (Daily Teaching System, Part 12.2), 2026-11-13. PDF only.
 *  One NEW mathematics PICTURE page type, a new face of the story-problem engine: Draw and Solve (K-642; a story the
 *  teacher reads, a large box to draw it in, an answer box), for the Swedish förskoleklass lesson of the year design
 *  (docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md, part D).
 *  Themed: a copy = a theme (new pictures), five themes per level, colour and black-and-white in turn.
 *  Every face is NEW (no published theme), so its copies number from 1 at every level. */
'use strict';
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [1, 2, 3, 4, 5], 3: [1, 2, 3, 4, 5] };
const FACES = ['K-642'];
module.exports = {
  prefix: 'ymm',
  interactive: false,   // PDF only (the face draws; its base type has a screen)
  titleMax: 100,
  faceWideDistinct: false,
  allowFewer: true,
  // things to count, share and add: never body parts (piles of eyes), colour swatches or activity scenes
  themeDeny: ['body parts', 'body parts bw', 'colors', 'colors bw', 'activities', 'activities bw'],
  note: 'Level Set 2026-11-13: Year pages M (Part 12.2). One new mathematics picture page type (Draw and Solve), three levels, for a lesson of the year designs.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: FIVE }])),
  include: () => true,
};
