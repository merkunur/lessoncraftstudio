/** Level Set config — Year pages AA (Daily Teaching System, Part 12.2), 2026-11-14. PDF only.
 *  One NEW geometry page type (types/_shared/solids-k.js): Name the Solid Shapes (K-644; the four Kindergarten solids,
 *  drawn: a line from each solid to an everyday thing, then solids of three sizes, some turned, colored by a code), for
 *  the English Kindergarten lesson "Name the solid shapes" (K.G.A.2) of the year design
 *  (docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md: G2-243 has no cone and nothing colored solids by a code).
 *  No theme: a copy is a new draw (a seed), five copies per level. The face is NEW, so its copies number from 1. */
'use strict';
const FACES = ['K-644'];
module.exports = {
  prefix: 'ymaa',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 0,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-14: Year pages AA (Part 12.2). One new geometry page type (the four solids: match them to everyday things, then color them by a code in any size and turned), three levels, for a lesson of the year designs.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: () => true,
};
