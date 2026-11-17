/** Level Set config — Year pages, literacy GG (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Eight NEW Grade 3 page types on informative writing and research: G3-556 Choose and Sort Notes and G3-557 Take Notes and Sort Them (W.3.8); G3-558 Introductions and Groups and G3-559 Plan Informative Writing (W.3.2.a); G3-560 Fact, Definition, or Detail? and G3-561 Develop Your Topic (W.3.2.b); G3-562 Notes from Two Sources and G3-563 Write a Research Report (W.3.7).
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G3-556', 'G3-557', 'G3-558', 'G3-559', 'G3-560', 'G3-561', 'G3-562', 'G3-563'];
module.exports = {
  prefix: 'ylgg',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-17: Year pages, literacy GG (Part 12.3). Eight new Grade 3 page types on informative writing and research: notes from sources, an introduction and grouped facts, facts with definitions and details, a short research report, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
