/** Level Set config — Synonyms (G2-358 + G1-395 / G1-396 / G2-373 / G2-374 / G3-397), 2026-10-01. PDF + interactive + key. */
'use strict';
const ALL = ['G2-358', 'G1-395', 'G1-396', 'G2-373', 'G2-374', 'G3-397'];
module.exports = {
  prefix: 'syn',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 3,          // a new copy shares at most a THIRD of its words / scales / sentences (≤ 3) with any other copy of its level
  shareFrac: 1 / 3,
  seeds: 40,
  allowFewer: true,      // a thin pool gives fewer copies, never a filler
  note: 'Level Set 2026-10-01: Synonyms (G2-358 + 5 faces). New content in all 11 languages: ten more "said" verbs with twenty new sentences, more shades-of-meaning scales, sixteen more go / look words, two new pictures (strong, tasty). Levels change the task: tag cards 6 easy words with 3 tags / 8 cards / 8 harder words; pictures 4 big pictures / 6 / 4 pictures with 5 tags; pairs 6 common words / 8 / 8 with more verbs; shades 3 rows / 6 / 6 without the strength key; said-words 4 / 6 / 6 with two words that fit no sentence; word fields 6 / 10 / 12 words. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  // the card faces draw from a dozen concepts: a copy shares at most HALF of them with any other copy of its level
  // (word fields: 12 words a page from 16 + 16 — at most half shared)
  faces: Object.fromEntries(ALL.map((id) => [id, (id === 'G2-358' || id === 'G1-395') ? { levels: [2, 1, 3], shareFrac: 0.5, maxShared: 4 } : id === 'G3-397' ? { levels: [2, 1, 3], shareFrac: 0.5, maxShared: 6 } : { levels: [2, 1, 3] }])),
  include: () => true,
};
