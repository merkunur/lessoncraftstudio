/** Level Set config — Year pages Q (Daily Teaching System, Part 12.2), 2026-11-13. PDF only.
 *  Three NEW mathematics PICTURE page types on the story bank: Find the Missing Part (G1-567), What Happened in the
 *  Middle? (G1-568) and Story Problems Within 100: Bar Model (G2-509): three stories a page, each with a bar model, an
 *  equation frame and an answer box, for the English story-problem units of the year design
 *  (docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md, parts C and D).
 *  A theme with fewer than three things that come by the dozen is refused by the type (allowFewer).
 *  Themed: a copy = a theme (new pictures), five themes per level, colour and black-and-white in turn.
 *  Every face is NEW (no published theme), so its copies number from 1 at every level. */
'use strict';
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [1, 2, 3, 4, 5], 3: [1, 2, 3, 4, 5] };
const FACES = ['G1-567', 'G1-568', 'G2-509'];
module.exports = {
  prefix: 'ymq',
  interactive: false,   // PDF only
  titleMax: 100,
  faceWideDistinct: false,
  allowFewer: true,
  // the three faces are different tasks (a part unknown, the change unknown, two-digit numbers): two faces may use one
  // theme at one level; the themes with enough small things cannot serve three faces x five copies otherwise
  crossFaceShare: true,
  // things to count, share and add: never body parts (piles of eyes), colour swatches or activity scenes
  themeDeny: ['body parts', 'body parts bw', 'colors', 'colors bw', 'activities', 'activities bw'],
  note: 'Level Set 2026-11-13: Year pages Q (Part 12.2). Three new mathematics picture page types (story problems with a bar model: a part unknown, the change unknown, within 100), three levels each, for lessons of the year designs.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: FIVE }])),
  include: () => true,
};
