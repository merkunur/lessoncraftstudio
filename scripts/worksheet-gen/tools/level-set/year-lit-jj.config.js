/** Level Set config — Year pages, literacy JJ (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Eight NEW Grade 2 page types on opinion writing and letters: G2-557 Parts of an Opinion Piece and G2-558 Plan Your Opinion Piece (W.2.1); G2-559 Write Your Opinion Piece and G2-560 Revise Your Opinion Piece (W.2.1); G2-561 Parts of a Friendly Letter and G2-562 Write a Friendly Letter (L.2.2.b); G2-563 Special Names: Find the Capital Letters and G2-564 Special Names: Write the Capital Letters (L.2.2.a).
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G2-557', 'G2-558', 'G2-559', 'G2-560', 'G2-561', 'G2-562', 'G2-563', 'G2-564'];
module.exports = {
  prefix: 'yljj',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-17: Year pages, literacy JJ (Part 12.3). Eight new Grade 2 page types on opinion writing and letters: an opinion with reasons, linking words and a closing sentence, a friendly letter with its commas, capitals for holidays, places and product names, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
