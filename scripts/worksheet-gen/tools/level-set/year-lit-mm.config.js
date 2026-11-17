/** Level Set config — Year pages, literacy MM (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Five NEW Grade 2 page types on writing stories: G2-571 Parts of a True Story, G2-572 Plan Your True Story and G2-573 Draft Your True Story (W.2.3); G2-574 Edit a Story and G2-575 Revise with a Partner (W.2.5).
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G2-571', 'G2-572', 'G2-573', 'G2-574', 'G2-575'];
module.exports = {
  prefix: 'ylmm',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-17: Year pages, literacy MM (Part 12.3). Five new Grade 2 page types on writing stories: the parts of a true story, a plan and a draft with time words, a feeling and an ending, editing a story for capitals, end marks and order, revising with a partner, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
