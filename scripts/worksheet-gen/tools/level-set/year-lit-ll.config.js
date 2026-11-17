/** Level Set config — Year pages, literacy LL (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Six NEW Grade 2 page types on writing to inform: G2-565 Parts of an Informative Piece and G2-566 Plan Your Informative Piece (W.2.2); G2-567 Closing Sentences and Linking Words and G2-568 Draft Your Informative Piece (W.2.2); G2-569 Research with Two Books: Take Notes and G2-570 Write Your Part of the Class Report (W.2.7).
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G2-565', 'G2-566', 'G2-567', 'G2-568', 'G2-569', 'G2-570'];
module.exports = {
  prefix: 'ylll',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-17: Year pages, literacy LL (Part 12.3). Six new Grade 2 page types on writing to inform: the parts of an informative piece and a plan, closing sentences, definitions and linking words and a draft, notes from two books and one part of a class report, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
