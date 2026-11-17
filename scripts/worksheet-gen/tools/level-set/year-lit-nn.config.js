/** Level Set config — Year pages, literacy NN (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Eight NEW Grade 2 page types on stories: G2-576 How a Story Begins and Ends and G2-577 Write How a Story Begins and Ends (RL.2.5); G2-578 Who Is Talking? Points of View and G2-579 Readers Theater: Different Voices (RL.2.6); G2-580 Two Versions of One Tale: Sort the Facts and G2-581 Two Versions of One Tale: Compare Them (RL.2.9); G2-582 Book Club Talk: Build on What Others Say and G2-583 Book Club Talk Card (SL.2.1.b).
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G2-576', 'G2-577', 'G2-578', 'G2-579', 'G2-580', 'G2-581', 'G2-582', 'G2-583'];
module.exports = {
  prefix: 'ylnn',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-17: Year pages, literacy NN (Part 12.3). Eight new Grade 2 page types on stories: how a story begins and ends, who is talking and how characters think, two versions of one tale, building on what others say in a book club talk, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
