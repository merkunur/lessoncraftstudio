/** Level Set config — Odd and Even Numbers, the COUNT page (G1-370 Count the Pictures in Pairs), 2026-10-14
 *  (walk #61). PDF + interactive + key. A copy = a new colour theme (new pictures) + its own seed; the published theme
 *  of each face (the same in all 11 locales: zoo animals / vehicles) is never reused in that face. Every level lays each
 *  lane out at its OWN row width (`vary`), so the last row never tells odd or even.
 *  Screens: TYPE how many each friend gets / how many pairs, and how many are left over; TAP odd or even. */
'use strict';
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [2, 3, 4, 5, 6], 3: [1, 2, 3, 4, 5] };   // level-2 copy 1 is the published page
module.exports = {
  prefix: 'oaec',
  titleMax: 100,
  allowFewer: true,
  // a pile to count in pairs — every picture of these themes opened on contact sheets (2026-10-14)
  themeAllow: ['zoo animals', 'farm animals', 'pets', 'ocean life', 'fruits', 'vegetables', 'toys', 'bakery', 'desserts and sweets', 'breakfast', 'accessories', 'flowers', 'At the Supermarket'],
  faceWideDistinct: false,
  note: 'Level Set 2026-10-14: Odd and Even Numbers with pictures. Level 1 easier (smaller piles), level 2 the published page, level 3 harder (bigger piles in two rows). Every lane has its own row width, so the shape of a pile never gives away odd or even. Visible to teachers, never indexed; PDF + interactive screen version (type the numbers, tap odd or even) + answer key.',
  faces: {
    'G1-370': { published: ['vehicles'], levels: FIVE },
  },
  include: () => true,
};
