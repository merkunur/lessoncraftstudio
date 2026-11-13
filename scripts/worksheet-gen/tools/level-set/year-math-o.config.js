/** Level Set config — Year pages O (Daily Teaching System, Part 12.2), 2026-11-13. PDF only.
 *  One NEW mathematics PICTURE page type: Story Problems Within 100: Question, Equation, Answer (G2-506; three stories
 *  with two-digit numbers and the three lines question, equation, answer; a standalone type on the story bank), for
 *  the German Klasse 2 lesson of the year design (docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md, part D).
 *  A theme with fewer than three things that come by the dozen is refused by the type (allowFewer).
 *  Themed: a copy = a theme (new pictures), five themes per level, colour and black-and-white in turn.
 *  Every face is NEW (no published theme), so its copies number from 1 at every level. */
'use strict';
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [1, 2, 3, 4, 5], 3: [1, 2, 3, 4, 5] };
const FACES = ['G2-506'];
module.exports = {
  prefix: 'ymo',
  interactive: false,   // PDF only
  titleMax: 100,
  faceWideDistinct: false,
  allowFewer: true,
  // things to count, share and add: never body parts (piles of eyes), colour swatches or activity scenes
  themeDeny: ['body parts', 'body parts bw', 'colors', 'colors bw', 'activities', 'activities bw'],
  note: 'Level Set 2026-11-13: Year pages O (Part 12.2). One new mathematics picture page type (Story Problems Within 100: Question, Equation, Answer), three levels, for a lesson of the year designs.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: FIVE }])),
  include: () => true,
};
