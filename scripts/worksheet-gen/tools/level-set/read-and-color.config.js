/** Level Set config — Read and Color (G1-242 + G1-251 / G1-252 + the new G1-409 / G1-410 / G1-411), 2026-09-30. PDF only. */
'use strict';
const ALL = [1, 2, 3, 4, 5];
const CORE = [2, 3, 4, 5, 6];   // level-2 copy 1 is the published page
module.exports = {
  prefix: 'rac',
  interactive: false,   // colouring: printable only, no screen version, no answer key
  titleMax: 100,
  faceWideDistinct: false,
  allowFewer: true,     // a locale / theme with few countable black-and-white nouns runs short (recorded in the report)
  note: 'Level Set 2026-09-30: Read and Color, PDF only, black-and-white library pictures only. Levels change the reading load: fewer pictures and a smaller number / the published page / bigger numbers among pictures of other nouns. The base page for EVERY black-and-white theme at 3 levels; the two published variations and three NEW ones (two sentences per box; one big picture with a list of sentences; stop at the number - more pictures than the sentence asks for) 5 themes per level. Visible to teachers, never indexed.',
  faces: {
    'G1-242': { published: 'fruits bw', levels: { 1: 'all', 2: 'all', 3: 'all' } },
    'G1-251': { published: 'animals bw', levels: { 1: ALL, 2: CORE, 3: ALL } },
    'G1-252': { published: 'toys bw', levels: { 1: ALL, 2: CORE, 3: ALL } },
    // the new variations have no published page: every level starts at copy 1
    'G1-409': { published: null, levels: { 1: ALL, 2: ALL, 3: ALL } },
    'G1-410': { published: null, levels: { 1: ALL, 2: ALL, 3: ALL } },
    'G1-411': { published: null, levels: { 1: ALL, 2: ALL, 3: ALL } },
  },
  include: () => true,
};
