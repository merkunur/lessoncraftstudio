/** Level Set config — Year pages, literacy HH (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Eight NEW Grade 3 page types on narrative writing: G3-564 The Parts of a Story and G3-565 Plan Your Story (W.3.3.a); G3-566 Quotation Marks in Dialogue and G3-567 Show Feelings in a Story (W.3.3.b); G3-568 Time Words in a Story and G3-569 Write with Time Words (W.3.3.c); G3-570 Choose a More Exact Word and G3-571 Revise for Words That Work (L.3.3.a).
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G3-564', 'G3-565', 'G3-566', 'G3-567', 'G3-568', 'G3-569', 'G3-570', 'G3-571'];
module.exports = {
  prefix: 'ylhh',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-17: Year pages, literacy HH (Part 12.3). Eight new Grade 3 page types on narrative writing: planning a story, dialogue and showing feelings, time words, revising for exact words, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
