/**
 * data/hm/scenes.js — the pinned SCENES of the b8 Handmade Mazes family (one per face; the same scene in all 11
 * locales). Source: docs/worksheet-gen/b8-designs/K-405-maze-puzzles.md §2-§3 (design A scenes, B topology).
 *
 * Coordinates: the MAZE BOX is 675 wide × `boxH` tall and starts under the scenery band (`band.h`); the body is
 * band.h + boxH tall (716 on every face). `maze` = lib/hm-maze.js config in maze-box coords. `hero.at` / `goal.at` =
 * the drawing's FEET in maze-box coords (may be negative: a tree crown rises into the band). `cast` heights are the
 * drawing's real-world size class in px (never the island's size). Every src was opened on its contact sheet.
 */
'use strict';

const SCENES = {
  // ------------------------------------------------------------------ BASE K-405: the hedgehog and the apple tree
  'orchard-hedgehog': {
    H: 716, band: { h: 76, sky: '#DDEEF5', hill: '#C9D98F', hills: [[-30, 260, 34], [380, 700, 26]] },
    field: '#E6D49A', corridor: { fill: '#FFF5DC', edge: '#B08A45', outline: 3.5 },
    maze: {
      box: { w: 675, h: 640 }, frame: { x0: 46, y0: 40, x1: 629, y1: 596 }, r: 90, minAngle: 55, W: 44, route: [11, 15], branches: 6, size: [3, 5], fill: 1,
      keep: [[34, 602, 70], [606, 40, 92]], start: [60, 590], goal: [610, 60], startMouth: [92, 560], goalMouth: [585, 118], K: 500,
      gates: { dead: [6, 9], junctions: 4, stubs: 0, tempting: 2, deep3: 1 / 3, side: 0.6, sameRun: 2, wf: 0.5, tort: 1.6, maxRun: 300, clear: 61 },
    },
    keep: [[34, 602, 70], [606, 40, 92]],
    hero: { src: 'forest creatures/hedgehog', at: [40, 636], h: 78 },
    goal: { src: 'tree/apple', at: [612, 124], h: 168 },
    cast: [
      { src: 'forest creatures/mouse', h: 50 }, { src: 'forest creatures/snail', h: 46 },
      { src: 'forest creatures/butterfly', h: 44 }, { src: 'forest creatures/ladybug', h: 40 }, { src: 'vegetables/mushroom', h: 52 },
      { src: 'flowers/buttercup', h: 54 }, { src: 'flowers/dandelion', h: 54 },
    ],
    texture: { n: 30, gap: 40, kinds: ['tuft', 'tuft', 'leaf'], colours: ['#C9B474', '#BBA55F', '#E69A4A', '#D9773A'] },
  },
};

module.exports = { SCENES };
