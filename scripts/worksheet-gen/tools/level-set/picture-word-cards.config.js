/** Level Set config — Picture Word Cards (K-324 + K-347 / K-348 / K-349 / K-350 / G1-324), 2026-09-29. PDF only (cut-out card materials). */
'use strict';
const ALL = [1, 2, 3, 4, 5];
const CORE = [2, 3, 4, 5, 6];   // level-2 copy 1 is the published page
module.exports = {
  prefix: 'pwc',
  interactive: false,   // materials: printable only, no screen version, no answer key
  titleMax: 75,
  faceWideDistinct: false,
  allowFewer: true,   // the syllable cards' two-syllable level runs short where few nouns have two syllables (es)
  note: 'Level Set 2026-09-29: Picture Word Cards (K-324 + 5 faces), PDF only. The base card sheet for EVERY theme (colour and black-and-white) at 3 levels (4 big naming cards; 8 cards; 12 word-first reading cards); the faces 5 themes per level (twin set 4 / 8 / 12 pairs; article cards big / published / write the article; one and many big / published / write the plural; bilingual big / published / 12 cards, partner language rotating; syllable cards two-syllable / published / draw the arcs). Visible to teachers, never indexed.',
  faces: {
    'K-324': { published: 'animals', levels: { 1: 'all', 2: 'all', 3: 'all' } },
    'K-347': { published: 'fruits', levels: { 1: ALL, 2: CORE, 3: ALL } },
    'K-348': { published: 'vehicles', publishedByLoc: { sv: 'farm animals' }, levels: { 1: ALL, 2: CORE, 3: ALL } },
    'K-349': { published: 'toys', levels: { 1: ALL, 2: CORE, 3: ALL } },
    'K-350': { published: 'zoo animals', rotateUnits: true,
      // only en/fr/nl name the partner through {U}; the other eight instructions say "English" (as their published page does), so
      // their copies keep the English partner — a rotated partner would make the printed instruction false
      unitsByLoc: (loc) => (['en', 'fr', 'nl'].includes(loc) ? null : ['en']), levels: { 1: ALL, 2: CORE, 3: ALL } },
    'G1-324': { published: 'animals', levels: { 1: ALL, 2: CORE, 3: ALL } },
  },
  include: (loc, id) => !(id === 'K-348' && loc === 'fi'),
};
