/** Level Set config — Year pages T (Daily Teaching System, Part 12.2), 2026-11-14. PDF only.
 *  Three NEW mathematics page types for the Grade 3 story problems, all faces of the two-step engine (G2-489):
 *  Two-Step Story Problems Within 1,000 (G3-485: three-digit numbers, told in a store, a market, by workers who pack
 *  and on a delivery truck), Two-Step Story Problems: Multiply and Divide (G3-486: one step multiplies or divides a
 *  fact within 100) and Two-Step Stories: Equation, Estimate, Answer (G3-487: one equation with a letter, an estimate
 *  from rounded numbers, the answer; on the harder page a finished wrong answer to test). For the story-problem
 *  lessons of the year designs (docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md, parts C and D).
 *  A theme with fewer than three things that come by the dozen is refused by the type (allowFewer).
 *  Themed: a copy = a theme (new words), five themes per level, colour and black-and-white in turn.
 *  Every face is NEW (no published theme), so its copies number from 1 at every level. */
'use strict';
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [1, 2, 3, 4, 5], 3: [1, 2, 3, 4, 5] };
const FACES = ['G3-485', 'G3-486', 'G3-487'];
module.exports = {
  prefix: 'ymt',
  interactive: false,   // PDF only
  titleMax: 100,
  faceWideDistinct: false,
  allowFewer: true,
  // the three faces are different tasks: they may use one theme at one level
  crossFaceShare: true,
  // things to count, share and add: never body parts (piles of eyes), colour swatches or activity scenes
  themeDeny: ['body parts', 'body parts bw', 'colors', 'colors bw', 'activities', 'activities bw'],
  note: 'Level Set 2026-11-14: Year pages T (Part 12.2). Three new mathematics page types (two-step story problems within 1,000; two-step story problems that multiply or divide; two-step stories with an equation, an estimate and an answer), three levels each, for lessons of the year designs.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: FIVE }])),
  include: () => true,
};
