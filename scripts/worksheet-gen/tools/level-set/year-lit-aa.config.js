/** Level Set config — Year pages, literacy AA (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Eight NEW Grade 3 page types on the parts of speech: G3-531 Sort the Parts of Speech and G3-530 Label the Parts of Speech (L.3.1.a); G3-533 Which Plural Is Right? and G3-532 Plural Nouns: Spelling Rules (L.3.1.b); G3-534 Past Tense: Regular and Irregular Verbs and G3-535 Rewrite the Story in the Past Tense (L.3.1.d); G3-536 Subjects and Verbs Agree and G3-537 Fix the Words That Do Not Agree (L.3.1.f). Factory types/_shared/parts-of-speech-g3.js; bank data/literacy/parts-of-speech-g3.en.json.
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G3-530', 'G3-531', 'G3-532', 'G3-533', 'G3-534', 'G3-535', 'G3-536', 'G3-537'];
module.exports = {
  prefix: 'ylaa',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-17: Year pages, literacy AA (Part 12.3). Eight new Grade 3 page types: the parts of speech, regular and irregular plurals, the past tense of regular and irregular verbs, and subject-verb agreement, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
