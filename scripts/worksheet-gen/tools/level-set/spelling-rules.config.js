/** Level Set config — Spelling Rules (G2-315 + G2-324 / 325 / 326 / 327 / 328), 2026-10-01. PDF + interactive + key. */
'use strict';
// the faces each locale PUBLISHES (measured from the live catalog 2026-10-01): de / nl / no / sv have no plural rule
const NO_PLURAL = ['de', 'nl', 'no', 'sv'];
module.exports = {
  prefix: 'srl',
  themeless: true,
  titleMax: 80,
  maxCopies: 5,
  maxShared: 2,
  shareFrac: 0.25,
  seeds: 3,                 // per rule: up to three draws, each accepted only if it asks NEW words
  note: 'Level Set 2026-10-01: Spelling Rules (G2-315 + 5 faces). Every rule of the locale, new words each copy. Easier = fewer, shorter words with more help; harder = longer words, more cards, the gap box no longer shows how many letters. Screen version: choose the right letters (or tap the rule letters, sort, spell); answer key: the answers written in. Visible to teachers, never indexed; PDF + screen version + answer key.',
  faces: {
    'G2-315': { levels: [2, 1, 3] },
    'G2-324': { levels: [2, 1, 3] },
    'G2-325': { levels: [2, 1, 3] },
    'G2-326': { levels: [2, 1, 3] },
    'G2-327': { levels: [2, 1, 3] },
    'G2-328': { levels: [2, 1, 3] },
  },
  include: (loc, face) => !(face === 'G2-328' && NO_PLURAL.includes(loc)),
};
