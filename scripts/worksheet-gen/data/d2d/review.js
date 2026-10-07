/**
 * review.js — Dot-to-Dot pictures refused after READING the solved contact sheets (tools/d2d-preview.js --solved),
 * per dot count; a refusal at N holds at every count >= N (K-285 d2dPool). v2 pictures (2026-10-07): the picture keeps
 * its own lines and the dots replace one stretch of its outline. Refused when the joined dots do not give the picture
 * back, leave a gap in it, run along a line that is still drawn, or leave stray marks.
 */
'use strict';
module.exports = {
  10: {
    'beach-boat': 'the dots follow the water, not the boat',
    'beach-palm': 'the dots follow the sand heap, not the tree',
    'beach-sandcastle': 'dots 1-2 stick out from the tower',
    'beach-bucket': 'the dots run up to the spade, not round the bucket',
    'birthday-cake': 'the dots run up a candle whose drawing is half erased',
    'pumpkin': 'the dots run outside a pumpkin edge that is still drawn',
    'night-telescope': 'the path runs along a tripod leg and the tube',
    'pinwheel': 'the path runs down the stick and into one blade',
    'sea-whale': 'the tail path does not read as the tail',
    'spinning-top': 'the path zig-zags over the handle',
    'tugboat': 'the dots follow the smoke, not the boat',
    'winter-cabin': 'the roof is still drawn double under the dots',
    'winter-gingerbread': 'the roof and chimney are still drawn under the dots',
    'winter-snowman': 'the path starts on an arm and goes round the belly',
  },
  20: {
    'sailboat': 'stray dashes of the hull are left beside dot 1',
    'apple': 'the top of the apple between 20 and 1 is missing',
    'sea-stingray': 'the tail path does not read as the tail',
  },
};
