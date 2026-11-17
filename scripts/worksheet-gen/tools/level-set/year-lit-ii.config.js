/** Level Set config — Year pages, literacy II (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Nine NEW Grade 3 page types on the parts of texts, point of view and comparing texts: G3-572 Scenes and Stanzas and G3-573 Chapters: How Parts Build (RL.3.5); G3-574 Who Is Telling the Story? and G3-575 Their View and My View (RL.3.6); G3-576 Literal or Nonliteral? (L.3.5.a); G3-577 Two Stories by One Author and G3-578 Compare Two Stories (RL.3.9); G3-579 Two Texts on One Topic and G3-580 Compare Two Texts (RI.3.9).
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G3-572', 'G3-573', 'G3-574', 'G3-575', 'G3-576', 'G3-577', 'G3-578', 'G3-579', 'G3-580'];
module.exports = {
  prefix: 'ylii',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-17: Year pages, literacy II (Part 12.3). Nine new Grade 3 page types: chapters, scenes and stanzas, point of view, literal and nonliteral language, two stories by one author, two texts on one topic, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
