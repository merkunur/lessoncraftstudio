/** Level Set config — Odd and Even Numbers, the SHARE page (G1-369 Can Two Friends Share Fairly?), 2026-10-14
 *  (walk #61). PDF + interactive + key. A copy = a new colour theme (new pictures) + its own seed; the published theme
 *  of each face (the same in all 11 locales: zoo animals / vehicles) is never reused in that face. Every level lays each
 *  lane out at its OWN row width (`vary`), so the last row never tells odd or even.
 *  Screens: TYPE how many each friend gets / how many pairs, and how many are left over; TAP odd or even. */
'use strict';
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [2, 3, 4, 5, 6], 3: [1, 2, 3, 4, 5] };   // level-2 copy 1 is the published page
module.exports = {
  prefix: 'oaes',
  titleMax: 100,
  allowFewer: true,
  // things two friends really share (food, toys, things to wear, flowers) — never body parts, people, feelings or animals
  // every picture of these themes opened on contact sheets (2026-10-14); the type drops the few that show several things or people
  themeAllow: ['fruits', 'vegetables', 'toys', 'At the Supermarket', 'bakery', 'breakfast', 'desserts and sweets', 'accessories', 'flowers'],
  faceWideDistinct: false,   // nine themes for fifteen copies: a theme returns at another level, never twice in one level
  note: 'Level Set 2026-10-14: Odd and Even Numbers with pictures. Level 1 easier (smaller piles), level 2 the published page, level 3 harder (bigger piles in two rows). Every lane has its own row width, so the shape of a pile never gives away odd or even. Visible to teachers, never indexed; PDF + interactive screen version (type the numbers, tap odd or even) + answer key.',
  faces: {
    'G1-369': { published: ['zoo animals'], levels: FIVE },
  },
  include: () => true,
};
