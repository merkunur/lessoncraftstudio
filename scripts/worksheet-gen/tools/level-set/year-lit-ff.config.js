/** Level Set config — Year pages, literacy FF (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Eight NEW Grade 3 page types on opinion writing: G3-548 Opinions and Reasons and G3-549 Plan an Opinion Piece (W.3.1.a); G3-550 Choose the Linking Word and G3-551 Draft Your Opinion Piece (W.3.1.c); G3-552 Find the Conclusion and G3-553 Write a Conclusion (W.3.1.d); G3-554 Edit an Opinion Paragraph and G3-555 Revise Your Opinion Piece (W.3.5).
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G3-548', 'G3-549', 'G3-550', 'G3-551', 'G3-552', 'G3-553', 'G3-554', 'G3-555'];
module.exports = {
  prefix: 'ylff',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-17: Year pages, literacy FF (Part 12.3). Eight new Grade 3 page types on opinion writing: opinion and reasons, linking words, a concluding statement, revising and editing, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
