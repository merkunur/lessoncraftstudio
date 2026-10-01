/** Level Set config — Sound Boxes (K-318 + K-329 / K-330 / G1-312 / G1-313 / G1-314), 2026-10-01. PDF + interactive + key. */
'use strict';
const ALL = [1, 2, 3, 4, 5];
const CORE = [2, 3, 4, 5, 6];   // level-2 copy 1 is the published page
module.exports = {
  prefix: 'sbl',
  titleMax: 80,
  crossFaceShare: true,      // the faces are different tasks (write / count / first sound / strip / syllables / blend)
  allowFewer: true,          // Syllables and Sounds draws only TeX-agreed words: a thin pool ships fewer copies, never padded
  note: 'Level Set 2026-10-01: Sound Boxes (K-318 + 5 faces). Easier = words with two or three sounds and no letter teams; harder = longer words with letter teams (two letters, one sound). Each copy a different colour picture set. Screen version: put the sounds into the boxes with tiles (or tap the number of sounds / the matching picture); answer key: every box filled in. Visible to teachers, never indexed; PDF + screen version + answer key.',
  // the published themes, measured from the live manifests 2026-10-01
  faces: {
    'K-318': { published: 'animals', levels: { 1: ALL, 2: CORE, 3: ALL } },
    'K-329': { published: 'around the house', levels: { 1: ALL, 2: CORE, 3: ALL } },
    'K-330': { published: 'clothing', publishedByLoc: { da: 'At the Supermarket', es: 'At the Supermarket', it: 'At the Supermarket' }, levels: { 1: ALL, 2: CORE, 3: ALL } },
    'G1-312': { published: 'At the Supermarket', publishedByLoc: { de: 'zoo animals', en: 'zoo animals', pt: 'zoo animals' }, levels: { 1: ALL, 2: CORE, 3: ALL } },
    'G1-313': { published: 'around the house', levels: { 1: ALL, 2: CORE, 3: ALL } },
    'G1-314': { published: 'toys', publishedByLoc: { da: 'animals', de: 'animals', nl: 'animals' }, levels: { 1: ALL, 2: CORE, 3: ALL } },
  },
  include: () => true,
};
