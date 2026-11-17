/** Level Set config — Year pages, literacy KK (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Eight NEW Grade 1 page types on writing: G1-616 Plan a True Story and G1-617 Write a True Story (W.1.3); G1-618 Opinion or Reason? and G1-619 Write My Opinion (W.1.1); G1-620 Facts and a Closing and G1-621 Write an All About Page (W.1.2); G1-622 Edit and Add a Detail and G1-623 Revise with a Checklist (W.1.5).
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G1-616', 'G1-617', 'G1-618', 'G1-619', 'G1-620', 'G1-621', 'G1-622', 'G1-623'];
module.exports = {
  prefix: 'ylkk',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-17: Year pages, literacy KK (Part 12.3). Eight new Grade 1 page types on writing: a true story with first, next and last, an opinion with a reason, an All About page with facts and a closing, editing and revising with a checklist and a partner, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
