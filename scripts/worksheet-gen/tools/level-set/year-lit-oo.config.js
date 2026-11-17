/** Level Set config — Year pages, literacy OO (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Eight NEW Kindergarten page types on drawing and writing: K-673 What I Like Best and Why and K-674 My Favorite and Why (W.K.1); K-675 Facts and Labels and K-676 I Can Teach You a Fact (W.K.2); K-677 Put a Small Moment in Order and K-678 My Small Moment (W.K.3); K-679 A Friend Asks, I Add and K-680 Authors Chair (W.K.5).
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['K-673', 'K-674', 'K-675', 'K-676', 'K-677', 'K-678', 'K-679', 'K-680'];
module.exports = {
  prefix: 'yloo',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-17: Year pages, literacy OO (Part 12.3). Eight new Kindergarten page types on drawing and writing: an opinion with a reason, facts and labels, a small moment in order, a detail added after a question in the author chair, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
