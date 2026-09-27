/** Level Set config — Articles (K-288 + K-306 / K-307 / G1-292), 2026-09-28. */
'use strict';
const ALL = [1, 2, 3, 4, 5];
const CORE = [2, 3, 4, 5, 6];   // level-2 copy 1 is the published page
module.exports = {
  prefix: 'art',
  note: 'Level Set 2026-09-28: Articles (K-288 + 3 faces). L1 = the noun printed (or its picture beside the word); L2 core; L3 only it (il/lo/la/l\'). Each copy a different verified theme. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  // face -> its PUBLISHED theme (never reused) and its levels -> copies
  faces: {
    'K-288': { published: 'animals', levels: { 1: ALL, 2: CORE, 3: ALL } },
    'K-306': { published: 'animals', levels: { 1: ALL, 2: CORE } },
    'K-307': { published: 'vehicles', levels: { 1: ALL, 2: CORE } },
    'G1-292': { published: 'fruits', levels: { 1: ALL, 2: CORE } },
  },
  // per locale: which (face, level) pairs exist
  include: (loc, face, level) => {
    if (loc === 'fi' && level === 1) return false;          // a printed word / picture would give the answer (singular vs plural)
    if (face === 'K-288' && level === 3) return loc === 'it'; // the harder article set exists only in Italian
    return true;
  },
};
