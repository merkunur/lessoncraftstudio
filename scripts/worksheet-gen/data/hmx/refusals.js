/**
 * data/hmx/refusals.js — Maze Puzzles Level Set pages REFUSED in one locale (2026-10-12): the page is left out of that
 * locale's wave, never re-worded into something it is not. Read by tools/level-set/mzl-waves.js and check-zips-mzl.js.
 */
'use strict';
module.exports = {
  // Brazilian Portuguese says "tigre" with a [tʃ] onset ("tchigre"), so the cue does not begin with the /t/ of
  // tatu / tartaruga / trem on its own route: the page would teach two different sounds as one (native review)
  pt: { 'hmx-sound-tiger': 'BR "tigre" begins [tʃ], not /t/' },
};
