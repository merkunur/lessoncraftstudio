/** Level Set config — Pre-Writing Practice (K-236 + K-244…K-248 + the new K-385 / K-386 / K-387), 2026-09-29. PDF only. */
'use strict';
const ALL = [1, 2, 3, 4, 5];
const CORE = [2, 3, 4, 5, 6];   // level-2 copy 1 is the published page
module.exports = {
  prefix: 'pwr',
  interactive: false,   // tracing: printable only, no screen version, no answer key
  titleMax: 100,
  faceWideDistinct: false,
  allowFewer: true,
  note: 'Level Set 2026-09-29: Pre-Writing Practice, PDF only. Levels FADE the trace (level audit): 1 every repetition dashed with its own start dot; 2 model + dashed (published); 3 model, one dashed trace, then start dots only. The base page for EVERY theme at 3 levels, every copy a different rhythm; the five published variations and three NEW ones (up, down and slanted lines; circles, squares, triangles, diamonds; picture-to-picture paths) 5 themes per level. Visible to teachers, never indexed.',
  faces: {
    'K-236': { published: 'animals', levels: { 1: 'all', 2: 'all', 3: 'all' } },
    'K-244': { published: 'animals', levels: { 1: ALL, 2: CORE, 3: ALL } },
    'K-245': { published: 'fruits', levels: { 1: ALL, 2: CORE, 3: ALL } },
    'K-246': { published: 'vehicles', levels: { 1: ALL, 2: CORE, 3: ALL } },
    'K-247': { published: 'toys', levels: { 1: ALL, 2: CORE, 3: ALL } },
    'K-248': { published: 'animals', levels: { 1: ALL, 2: CORE, 3: ALL } },
    // the new variations have no published page: every level starts at copy 1
    'K-385': { published: null, levels: { 1: ALL, 2: ALL, 3: ALL } },
    'K-386': { published: null, levels: { 1: ALL, 2: ALL, 3: ALL } },
    'K-387': { published: null, levels: { 1: ALL, 2: ALL, 3: ALL } },
  },
  include: () => true,
};
