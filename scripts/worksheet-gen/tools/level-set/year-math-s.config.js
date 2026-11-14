/** Level Set config — Year pages S (Daily Teaching System, Part 12.2), 2026-11-14. PDF only.
 *  Two NEW mathematics page types for the Grade 2 story problems: Two-Step Story Problems Within 100 (G2-511, a face of
 *  the two-step engine told in a place; text only) and Compare Stories Within 100: Two Bars (G2-512: the difference,
 *  the bigger or the smaller amount unknown, with two bars). For the story-problem lessons of the year designs
 *  (docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md, parts C and D).
 *  A theme with fewer than three things that come by the dozen is refused by the type (allowFewer).
 *  Themed: a copy = a theme (new pictures), five themes per level, colour and black-and-white in turn.
 *  Every face is NEW (no published theme), so its copies number from 1 at every level. */
'use strict';
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [1, 2, 3, 4, 5], 3: [1, 2, 3, 4, 5] };
const FACES = ['G2-511', 'G2-512'];
module.exports = {
  prefix: 'yms',
  interactive: false,   // PDF only
  titleMax: 100,
  faceWideDistinct: false,
  allowFewer: true,
  // the two faces are different tasks (two steps; comparing with two bars): they may use one
  // theme at one level
  crossFaceShare: true,
  // things to count, share and add: never body parts (piles of eyes), colour swatches or activity scenes
  themeDeny: ['body parts', 'body parts bw', 'colors', 'colors bw', 'activities', 'activities bw'],
  note: 'Level Set 2026-11-14: Year pages S (Part 12.2). Two new mathematics page types (two-step story problems within 100 told in a place; compare stories within 100 with two bars), three levels each, for lessons of the year designs.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: FIVE }])),
  include: () => true,
};
