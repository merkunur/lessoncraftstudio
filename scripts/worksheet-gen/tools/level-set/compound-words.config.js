/** Level Set config — Compound Words (G2-316 + G2-329/330/331/332/333), 2026-09-28. */
'use strict';
// the faces each locale PUBLISHES (measured from frontend/content/seo-landing/<loc>.json): a Level Set
// only extends a page a teacher can already find; a refused face gets no levels
const PUBLISHED = {
  en: ['G2-316', 'G2-330', 'G2-331', 'G2-332', 'G2-333'],
  de: ['G2-316', 'G2-329', 'G2-330', 'G2-331', 'G2-332', 'G2-333'],
  es: ['G2-316', 'G2-330', 'G2-332', 'G2-333'],
  fr: ['G2-316', 'G2-330', 'G2-332'],
  it: ['G2-316', 'G2-330', 'G2-332', 'G2-333'],
  pt: ['G2-316', 'G2-332', 'G2-333'],
  nl: ['G2-316', 'G2-330', 'G2-331', 'G2-332', 'G2-333'],
  sv: ['G2-316', 'G2-330', 'G2-331', 'G2-332', 'G2-333'],
  da: ['G2-316', 'G2-329', 'G2-330', 'G2-331', 'G2-332', 'G2-333'],
  no: ['G2-316', 'G2-329', 'G2-330', 'G2-331', 'G2-332', 'G2-333'],
  fi: ['G2-316', 'G2-330', 'G2-331', 'G2-332', 'G2-333'],
};
// G2-316's level 3 (10 rows, more linked words) only changes the task where the language JOINS its
// compounds with linking letters; elsewhere it would only be more rows of the same thing
const LINKING = new Set(['de', 'nl', 'da', 'no']);
module.exports = {
  prefix: 'cmp',
  themeless: true,
  titleMax: 75,
  maxCopies: 5,
  maxShared: 2,          // a new copy shares at most 2 words (and at most a quarter of its page) with any other copy of its level
  seeds: 40,             // seeds tried per word set
  // the text-only harder levels walk the native word lists (data/b3/compound-words-text.json)
  textLevels: { 'G2-330': 3, 'G2-332': 3 },
  note: 'Level Set 2026-09-28: Compound Words (G2-316 + 5 faces). Levels change the task (part words and a word bank, joining letters shown, parts pictured, four pairs, one web with a helper word; harder: more linked words, text-only words from native lists). Picture copies only where the curated sets give genuinely different words (≤2 shared); text-only levels 5 copies each. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: {
    'G2-316': { levels: [2, 1, 3] },
    'G2-329': { levels: [2, 1] },
    'G2-330': { levels: [2, 1, 3] },
    'G2-331': { levels: [2, 1] },
    'G2-332': { levels: [2, 3] },
    'G2-333': { levels: [2, 1] },
  },
  include: (loc, face, level) => PUBLISHED[loc].includes(face) && !(face === 'G2-316' && level === 3 && !LINKING.has(loc)),
};
