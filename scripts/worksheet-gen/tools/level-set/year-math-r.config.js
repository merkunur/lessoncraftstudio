/** Level Set config — Year pages R (Daily Teaching System, Part 12.2), 2026-11-14. PDF only.
 *  Five NEW mathematics PICTURE page types on the story bank: What Was There at the Start? (G1-569) and Story Problems
 *  Within 100: Find the Start (G2-510): three stories a page with the start unknown, each with a bar model, an equation
 *  frame and an answer box; Stories with Three Numbers (G1-570): three amounts to add, a drawing box and the frame
 *  _ + _ + _ = _; Story Problems Within 20: Write the Question (G1-571): the child makes up the question; Draw, Solve, Answer
 *  (G1-572): a drawing box in the place of the bar model. For the
 *  story-problem lessons of the year designs (docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md, parts C and D).
 *  A theme with fewer than three things that come by the dozen is refused by the type (allowFewer).
 *  Themed: a copy = a theme (new pictures), five themes per level, colour and black-and-white in turn.
 *  Every face is NEW (no published theme), so its copies number from 1 at every level. */
'use strict';
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [1, 2, 3, 4, 5], 3: [1, 2, 3, 4, 5] };
const FACES = ['G1-569', 'G1-570', 'G1-571', 'G1-572', 'G2-510'];
module.exports = {
  prefix: 'ymr',
  interactive: false,   // PDF only
  titleMax: 100,
  faceWideDistinct: false,
  allowFewer: true,
  // the five faces are different tasks (the start unknown, three numbers, write the question, draw and solve, two-digit numbers): two faces may use one
  // theme at one level; the themes with enough small things cannot serve five faces x five copies otherwise
  crossFaceShare: true,
  // things to count, share and add: never body parts (piles of eyes), colour swatches or activity scenes
  themeDeny: ['body parts', 'body parts bw', 'colors', 'colors bw', 'activities', 'activities bw'],
  note: 'Level Set 2026-11-14: Year pages R (Part 12.2). Five new mathematics picture page types (story problems: the start unknown within 20 and within 100, three numbers to add, write the question, draw and solve), three levels each, for lessons of the year designs.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: FIVE }])),
  include: () => true,
};
