/** Level Set config — Family Members (K-370 + G1-385 / K-375 / G1-386 / G2-362 / G1-387), 2026-10-14 (walk #66).
 *  PDF + interactive + key (Trace and Write + the Tree Template: PDF only).
 *  Themeless: a copy = a seed. What differs between copies is the FAMILY (who is drawn — siblings, a baby, an aunt or an
 *  uncle, a cousin —, the side the grandparents are on, the child's name), the words asked (Generations), the names to
 *  place (Read the Clues) and the riddles (Riddles: grandparents, aunts / uncles, "the aunt's mom", cousins).
 *  Level 2 copy 1 is the published page (nt10-E, 2026-09-23); no level-1/3 family page was ever published.
 *  The whole cast (grandparents, parents, children, baby) was redrawn the same day (operator: "the drawings of the
 *  elderly people … are scary"), so the 66 published pages are republished in place with the new drawings. */
'use strict';
module.exports = {
  prefix: 'fam',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.34,
  seeds: 80,
  allowFewer: true,
  note: 'Level Set 2026-10-14: Family Members. Level 1 easier (two generations and bigger pictures; direct-line words only; two clues; six riddles about grandparents, aunts and uncles), level 2 the published page, level 3 harder (a third child or an aunt / uncle on the tree; seven rows with an aunt, uncle or cousin in every row; the words to trace without numbers; five clues with a cousin; riddles with cousins and no word box). Visible to teachers, never indexed; PDF + interactive screen version (TYPE the number, the name or the family word) + answer key; Trace and Write and the Tree Template are PDF only.',
  faces: {
    'K-370': { levels: [2, 1, 3] },
    'G1-385': { levels: [2, 1, 3] },
    // tracing practice: every copy traces family words, so copies of a level may share up to two thirds of their signature
    'K-375': { levels: [2, 1, 3], shareFrac: 0.67 },
    'G1-386': { levels: [2, 1, 3] },
    // a riddle page draws from a small set of relations: copies of a level may repeat up to two thirds of them
    'G2-362': { levels: [2, 1, 3], shareFrac: 0.67 },
    // the blank template: level 1 only (three shelf frames); copies of a blank template would be the same page
    'G1-387': { levels: [1], maxCopiesAt: { 1: 1 } },
  },
  // fr Trace and Write level 1: only three traceable words fit a two-generation tree (la sœur is not traced on the
  // published fr page) — refused by the builder, recorded here
  include: () => true,
};
