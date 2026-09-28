/** Level Set config — Personal Pronouns (G1-352 + G1-371 / G1-372 / G2-353 / G2-354 / G2-355), 2026-09-28. PDF + interactive + answer key. */
'use strict';
module.exports = {
  prefix: 'pron',
  themeless: true,
  titleMax: 80,
  maxCopies: 5,
  maxShared: 4,     // a copy shares at most four names / sentences with any accepted copy of its level (a page shows 12-20)
  seeds: 80,
  note: 'Level Set 2026-09-28: Personal Pronouns (G1-352 + 5 faces). New names, sentences, "who is he" frames, one-person-plus-a-pair frames (two clauses) and possessive things by 11 native panels (+ 5 portraits opened in session); copies of a level share at most four names or sentences; levels change the task (6 big picture cards; single people only; he/she bins only; single owners only; a pronoun bank on the rewrite page — harder: names only, no pictures; no word bank; 12 name cards without pictures; one person and a pair in two places, he/she vs they; write the possessive). Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: {
    'G1-352': { levels: [2, 1, 3] },
    'G1-371': { levels: [2, 1, 3] },
    'G1-372': { levels: [2, 1, 3] },
    'G2-353': { levels: [2, 1, 3] },
    'G2-354': { levels: [2, 1, 3] },
    'G2-355': { levels: [2, 1, 3] },
  },
  include: (loc, id) => !(id === 'G2-354' && (loc === 'es' || loc === 'fi')),
};
