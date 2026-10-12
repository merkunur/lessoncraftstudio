/**
 * data/hmx/levels.js — the three LEVELS of the Maze Puzzles Level Set (2026-10-12), per face (mode).
 *
 * Level 2 = the published face's own maze (data/hm/scenes.js): no entry. Level 1 = easier (wider roads, a shorter way,
 * fewer and shallower dead ends, fewer decoys); level 3 = harder (narrower roads, a longer way, more and deeper dead
 * ends, more decoys). A level NEVER changes a face's rule — the alphabet, the number run, the target sum, the item to
 * collect stay — so the face's title and instruction stay true at every level. `clear` follows the road width
 * (W + 17: the gap between two parallel roads). Values measured with tools/hm-reliability.js --hmx (bar N/N).
 */
'use strict';

module.exports = {
  base: {
    1: { maze: { r: 104, W: 52, route: [8, 11], branches: 4, size: [2, 4], gates: { dead: [3, 5], junctions: 3, tempting: 1, deep3: 0, clear: 69, tort: 1.4 } } },
    3: { maze: { r: 80, W: 38, route: [15, 19], branches: 12, size: [2, 5], fill: 1, K: 1500, gates: { dead: [7, 12], junctions: 4, tempting: 2, deep3: 0.3, clear: 55, maxRun: 260 } }, tries: 24 },
  },
  'first-maze': {
    1: { maze: { route: [4, 6], branches: 1, size: [1, 2], gates: { dead: [1, 2], junctions: 1, wf: 1, tort: 1.0 } }, tries: 30 },
    3: { maze: { r: 104, W: 64, route: [6, 8], branches: 3, size: [2, 3], gates: { dead: [3, 3], junctions: 3, clear: 81 } }, tries: 30 },
  },
  'big-maze': {
    1: { maze: { r: 70, W: 40, route: [16, 21], branches: 8, size: [3, 5], gates: { dead: [8, 12], junctions: 5, clear: 57 } } },
    3: { maze: { r: 58, W: 32, route: [25, 32], branches: 13, size: [3, 6], K: 1200, gates: { dead: [13, 20], junctions: 7, clear: 49 } }, tries: 30 },
  },
  river: {
    1: { maze: { r: 108, W: 58, route: [8, 11], branches: 3, size: [2, 3], gates: { dead: [2, 3], junctions: 2, tempting: 1 } } },
    3: { maze: { r: 86, W: 46, route: [13, 18], branches: 6, size: [3, 5], gates: { dead: [5, 8], junctions: 4, tempting: 2 } }, tries: 30 },
  },
  burrow: {
    // levelRun 6 at L1 never built (> 280 s a draw); the L3 shaft gate follows the longer route (measured 2/2 each)
    1: { maze: { route: [10, 14], branches: 5, gates: { dead: [5, 7], layers: { changes: 2, ups: 1, shafts: [4, 6], deadShafts: 1, levelRun: 5 } } } },
    3: { maze: { route: [14, 19], branches: 8, gates: { dead: [7, 10], layers: { changes: 3, ups: 1, shafts: [6, 10], deadShafts: 1, levelRun: 5 } } }, tries: 20 },
  },
  'shortest-way': {
    1: { maze: { remove: [3, 4], gates: { streets: { shortest: [5, 7], next: 2, fewerTurns: true, routes: 2, detour: 2 } } } },
    3: { maze: { remove: [5, 6], gates: { streets: { shortest: [7, 10], next: 2, fewerTurns: true, routes: 4, detour: 2 } } }, tries: 30 },
  },
  'babies-mothers': {
    1: { maze: { route: [3, 12], branches: 2, gates: { forest: { dead: [1, 3], junctions: 1, overlap: 0.4, ratio: 0.5, clear: 61 } } } },
    3: { maze: { route: [3, 18], branches: 4, gates: { forest: { dead: [3, 5], junctions: 1, overlap: 0.4, ratio: 0.5, clear: 61 } } }, tries: 40 },
  },
  'tangled-lines': {
    // the NUMBER of strings is the level (visual review 2026-10-12: four strings on every page made nine pages one weave):
    // three strings (one swap per level, so exactly M crossings — and M EVEN: an odd number of swaps of three strings is a
    // transposition, which always leaves one string where it started), the published four, and five strings — the harder level
    // four strings never reached (10+ crossings are out of reach for four under the never-the-same-partner rule)
    1: { maze: { k: 3, M: 4, crossings: [4, 4] } },
    3: { maze: { k: 5, M: 6, crossings: [10, 12] }, tries: 40 },
  },
  collect: {
    1: { labels: { n: 3, route: 11 } },
    3: { labels: { n: 5, route: 17 }, tries: 30 },
  },
  avoid: {
    1: { labels: { count: [3, 4], route: 12 } },
    3: { labels: { count: [5, 6], route: 15 }, tries: 40 },
  },
  'abc-capitals': {
    1: { labels: { decoyMin: 0.35, nearShare: 0.7 } },
    // L3 0.75 built 2-7 of 11 (decoys / clear); 0.65 builds 4/4 (measured)
    3: { labels: { decoyMin: 0.65, nearShare: 0.95 } },
  },
  'abc-lowercase': {
    1: { labels: { decoyMin: 0.35, nearShare: 0.7, reversalMin: 2 } },
    // L3 0.75 / reversals 6 built 0 of 11; 0.6 + more near letters builds 3/3 (measured)
    3: { labels: { decoyMin: 0.6, nearShare: 0.95, reversalMin: 4 } },
  },
  'letter-hop': {
    1: { maze: { run: 10, gates: { hex: { turns: 3, near: [1, 0.4], up: 0.6 } } } },
    3: { maze: { run: 16, gates: { hex: { turns: 6, near: [1, 0.6], up: 0.65 } } } },
  },
  'numbers-20': {
    1: { labels: { decoyCount: 7, nearShare: 0.7 } },
    3: { labels: { decoyCount: 14, nearShare: 0.85 }, tries: 40 },
  },
  'skip-5': {
    1: { labels: { decoyCount: 7, nearShare: 0.7 } },
    3: { labels: { decoyCount: 14, nearShare: 0.85 }, tries: 40 },
  },
  'make-10': {
    1: { labels: { route: 8, decoyCount: 6 } },
    3: { labels: { route: 11, decoyCount: 12 }, maze: { r: 96, branches: 10 } },
  },
  'subtract-20': {
    1: { labels: { route: 6, decoyCount: 5 } },
    // route 9 is out of reach (the distinct equations to the target run out: measured 0/6); L3 = more decoys
    3: { labels: { route: 8, decoyCount: 11 }, tries: 40 },
  },
  'first-sound': {
    1: { labels: { route: 6, decoyCount: 8 }, tries: 40 },
    2: { tries: 40 },
    3: { labels: { route: 8, decoyCount: 15 }, tries: 40 },
  },
  'running-total': {
    1: { labels: { opSet: [10, -10, 1, -1], route: 6, decoyCount: 5, nearMissShortest: [1, 10] } },
    3: { labels: { route: 10, decoyCount: 9 } },
  },
  'maze-colouring': {
    1: { maze: { r: 112, W: 64, route: [7, 9], branches: 3, size: [2, 3], gates: { dead: [2, 3], tempting: 1, clear: 81 } } },
    3: { maze: { r: 96, W: 50, route: [11, 14], branches: 6, size: [2, 4], gates: { dead: [5, 7], tempting: 2, clear: 67 } } },
  },
};
