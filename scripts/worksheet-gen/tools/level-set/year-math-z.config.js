/** Level Set config — Year pages Z (Daily Teaching System, Part 12.2), 2026-11-14. PDF only.
 *  One NEW mathematics PICTURE page type: Two Kinds Together (K-643, types/_shared/two-kinds.js; put-together stories:
 *  one thing in two colors, a row of outline pictures to color, the frame _ + _ = _), for the English Kindergarten
 *  lesson "Two kinds together: put-together stories" (K.OA.A.2) of the year design
 *  (docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md, part D: the story bank had no put-together stories).
 *  Themed: a copy = a theme, black-and-white themes only (the child colors the pictures), only the themes whose things
 *  come in any color (THINGS in the factory). Every face is NEW (no published theme), so its copies number from 1. */
'use strict';
const { THEMES } = require('../../types/_shared/two-kinds.js');
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [1, 2, 3, 4, 5], 3: [1, 2, 3, 4, 5] };
const FACES = ['K-643'];
module.exports = {
  prefix: 'ymz',
  interactive: false,   // PDF only
  titleMax: 100,
  faceWideDistinct: false,
  allowFewer: true,
  themeAllow: THEMES,
  note: 'Level Set 2026-11-14: Year pages Z (Part 12.2). One new mathematics picture page type (Two Kinds Together: put-together stories to color), three levels, for a lesson of the year designs.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: FIVE }])),
  include: () => true,
};
