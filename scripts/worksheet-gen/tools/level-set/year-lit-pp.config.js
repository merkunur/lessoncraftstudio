/** Level Set config — Year pages, literacy PP (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Eight NEW page types for four single lessons: K-681 Blend the First Sound and the Rest and K-682 Say the First Sound and the Rest (RF.K.2.c); K-683 Words with Two Meanings and K-684 Two Pictures, One Word (L.K.4.a); K-685 Compare Two Stories and K-686 Draw Same and Different (RL.K.9); G1-624 First, Middle, or Last? and G1-625 Two Words, One Sound (RF.1.2.c).
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['K-681', 'K-682', 'K-683', 'K-684', 'K-685', 'K-686', 'G1-624', 'G1-625'];
module.exports = {
  prefix: 'ylpp',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-17: Year pages, literacy PP (Part 12.3). Eight new page types for four single lessons: onset and rime, words with two meanings, two stories compared, the place of a sound in a word, three levels each, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
