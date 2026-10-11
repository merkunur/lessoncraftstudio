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
    H: 716, band: { h: 76, sky: '#CFE6F2', hill: '#C9D98F', hills: [[-30, 260, 34], [380, 700, 26]] },
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
    texture: { n: 30, gap: 40, kinds: ['tuft', 'tuft', 'leaf'], colours: { tuft: ['#C9B474', '#BBA55F'], leaf: ['#E69A4A', '#D9773A'] } },
  },

  // ------------------------------------------------------------------ F2 K-406 (PreK) my first maze: the puppy and the ball
  'park-puppy': {
    H: 716, band: { h: 76, sky: '#E4F3FB', hill: '#B9DD8F', hills: [[-40, 300, 30], [420, 720, 24]] },
    field: '#C8E6A0', corridor: { fill: '#FBEFD0', edge: '#B89A5E', outline: 4 }, disc: 28,
    slots: ['L', 'R'],
    maze: {
      box: { w: 675, h: 640 }, frame: { x0: 70, y0: 66, x1: 605, y1: 574 }, r: 150, minAngle: 60, W: 72, route: [5, 7], branches: 2, size: [2, 3], fill: 0, K: 600,
      gates: { dead: [2, 2], junctions: 2, wf: 0.8, tort: 1.3, clear: 89 },
    },
    hero: { src: 'pets/dog', h: 96 },
    goal: { src: 'toys/ball', h: 62 },
    cast: [{ src: 'tree/cherry', h: 120 }, { src: 'pets/cat', h: 64 }, { src: 'spring/bird', h: 46 }, { src: 'spring/butterfly', h: 44 }, { src: 'flowers/tulip', h: 56 }],
    texture: { n: 22, gap: 44, kinds: ['tuft', 'tuft', 'dot'], colours: { tuft: ['#A6CB7A', '#94BD69'], dot: ['#F7C9D6', '#FFFFFF', '#FBE38A'] } },
  },

  // ------------------------------------------------------------------ F3 G1-420 big picture maze: the orangutan and the banana tree
  'jungle-orangutan': {
    H: 716, band: { h: 76, sky: '#5E9E63', hill: '#4F8F55', hills: [[-40, 240, 22], [200, 520, 26], [470, 720, 20]] },
    field: '#86BE77', corridor: { fill: '#F2F8E4', edge: '#5E8F4A', outline: 3.5 },
    slots: ['BR', 'TL'],
    maze: {
      box: { w: 675, h: 640 }, frame: { x0: 34, y0: 32, x1: 641, y1: 608 }, r: 66, minAngle: 55, W: 36, route: [22, 28], branches: 11, size: [3, 6], bNewest: 0.5, fill: 1, K: 900,
      gates: { dead: [11, 18], junctions: 6, stubs: 1, tempting: 2, deep3: 0.3, side: 0.6, sameRun: 3, wf: 0.5, tort: 2.0, maxRun: 250, clear: 53 },
    },
    hero: { src: 'zoo animals/orangutan', h: 86 },
    goal: { src: 'tree/banana', h: 132 },
    bandArt: [{ src: 'tree/palm', x: 600, h: 96 }],
    cast: [{ src: 'zoo animals/sloth', h: 56 }, { src: 'birds/toucan', h: 52 }, { src: 'birds/macaw', h: 52 }, { src: 'reptiles and Amphibians/chameleon', h: 46, optional: true },
      { src: 'forest creatures/frog', h: 44 }, { src: 'insects and bugs/butterfly', h: 44, optional: true }, { src: 'flowers/hibiscus', h: 48 }, { src: 'flowers/orchid', h: 48 }],
    texture: { n: 26, gap: 38, kinds: ['leaf', 'leaf', 'tuft'], colours: { leaf: ['#6FAF66', '#5A9654'], tuft: ['#79B56C', '#5A9654'] } },
  },

  // ------------------------------------------------------------------ F4 K-407 river maze: the toy boat and the teddy bear
  'stream-boat': {
    H: 716, band: { h: 76, sky: '#FCEFD2', hill: '#B6DB8E', hills: [[-40, 280, 28], [380, 720, 30]] },
    field: '#A9D27E', corridor: { fill: '#D3EEF8', edge: '#5FA9C8', outline: 4 }, paint: 'water',
    slots: ['TL', 'BR'],
    maze: {
      box: { w: 675, h: 640 }, frame: { x0: 52, y0: 46, x1: 623, y1: 594 }, r: 104, minAngle: 65, W: 52, route: [10, 15], branches: 4, size: [3, 4], bNewest: 1, fill: 0, K: 900,
      gates: { dead: [3, 5], junctions: 3, stubs: 0, tempting: 1, deep3: 0.5, side: 0.67, wf: 0.6, tort: 1.7, maxRun: 260, chainLen: 2.5 },
    },
    hero: { src: 'toys/boat', h: 76 },
    goal: { src: 'toys/teddy_bear', h: 84, dock: { w: 120, h: 40 } },
    cast: [{ src: 'tree/elm', h: 110 }, { src: 'animals/swan', h: 60 }, { src: 'animals/duck', h: 50 }, { src: 'forest creatures/turtle', h: 46 },
      { src: 'forest creatures/frog', h: 44 }, { src: 'forest creatures/dragonfly', h: 42 }],   // flowers/water_lily refused: placed on a bank it is a lily pad on grass
    texture: { n: 24, gap: 40, kinds: ['tuft', 'tuft', 'tuft'], colours: { tuft: ['#7FAF57', '#8DBA62', '#6E9E4C'] } },
  },

  // ------------------------------------------------------------------ F20 K-413 maze colouring page: the crab and the sandcastle (B&W)
  'beach-crab-colouring': {
    H: 716, band: { h: 76, sky: '#FFFFFF', hill: '#FFFFFF' }, paint: 'line',
    field: '#FFFFFF', corridor: { fill: '#FFFFFF', edge: '#3A3530', outline: 2.5 },
    slots: ['BC', 'TR'],
    maze: {
      box: { w: 675, h: 640 }, frame: { x0: 46, y0: 44, x1: 629, y1: 596 }, r: 104, minAngle: 55, W: 56, route: [9, 12], branches: 4, size: [2, 4], fill: 0, K: 900,
      gates: { dead: [4, 5], tempting: 1, wf: 0.6, tort: 1.5, clear: 73 },
    },
    hero: { src: 'beach bw 2/crab', h: 64 },
    goal: { src: 'beach bw 2/sandcastle', h: 126 },
    bandArt: [{ src: 'beach bw 2/boat', x: 140, h: 62 }, { src: 'sea life bw/fish', x: 420, h: 30 }],
    cast: [{ src: 'beach bw/palm_tree', h: 132 }, { src: 'beach bw/parasol', h: 92 }, { src: 'beach bw/bucket', h: 56 }, { src: 'beach bw/beach_ball', h: 50 }, { src: 'beach bw/starfish', h: 44 }],
    texture: { n: 20, gap: 48, kinds: ['sand'], colours: { sand: ['#3A3530'] } },
  },

  // ------------------------------------------------------------------ F11 K-409 ABC maze (capitals): the rocket to the moon
  'space-rocket': {
    H: 716, band: { h: 8, sky: '#8794C6', hill: '#8794C6' },
    field: '#6E7CB8', corridor: { fill: '#FFF8E6', edge: '#C8B98A', outline: 3.5 },
    slots: ['BL', 'TC'],
    maze: {
      box: { w: 675, h: 700 }, frame: { x0: 40, y0: 40, x1: 635, y1: 660 }, r: 72, minAngle: 55, W: 44, branches: 12, size: [1, 3], fill: 0, loops: 7, K: 200,
      gates: { clear: 61 },
    },
    labels: { rule: 'seq', alphabet: true, case: 'upper', glyph: 'letters', stoneR: 28, capH: 30, rByLen: { 21: 76, 26: 72, 27: 72, 29: 68 }, decoyMin: 0.55, nearShare: 0.9 },
    hero: { src: 'vehicles/rocket', h: 88 },
    goal: { src: 'space/moon', h: 100 },
    cast: [{ src: 'space/saturn', h: 56 }, { src: 'space/earth', h: 52 }, { src: 'space/planet', h: 48, optional: true }, { src: 'space/satellite', h: 50, optional: true }, { src: 'space/comet', h: 46, optional: true }, { src: 'space/asteroid', h: 40, optional: true }],
    texture: { n: 34, gap: 34, kinds: ['star', 'star', 'dot'], colours: { star: ['#FFD86B', '#FFE08A'], dot: ['#FFD86B'] } },
  },

  // ------------------------------------------------------------------ F12 K-410 abc maze (small letters): the clownfish swims home to the coral
  'reef-clownfish': {
    H: 716, band: { h: 8, sky: '#69BBC7', hill: '#69BBC7' },
    field: '#7FCBD5', corridor: { fill: '#EAF8FA', edge: '#4F9FAD', outline: 3.5 },
    slots: ['TL', 'BR'],
    maze: {
      box: { w: 675, h: 700 }, frame: { x0: 40, y0: 40, x1: 635, y1: 660 }, r: 72, minAngle: 55, W: 44, branches: 12, size: [1, 3], fill: 0, loops: 7, K: 260,
      gates: { clear: 61 },
    },
    labels: { rule: 'seq', alphabet: true, case: 'lower', glyph: 'letters', stoneR: 28, capH: 36, rByLen: { 21: 76, 26: 72, 27: 72, 29: 68 }, decoyMin: 0.55, nearShare: 0.9, reversalMin: 4 },
    hero: { src: 'ocean life/clownfish', h: 66 },
    goal: { src: 'ocean life/coral', h: 104 },
    cast: [{ src: 'ocean life/octopus', h: 58 }, { src: 'ocean life/jellyfish', h: 54, optional: true }, { src: 'ocean life/starfish', h: 44 }, { src: 'ocean life/pufferfish', h: 46, optional: true },
      { src: 'ocean life/sea_horse', h: 52, optional: true }, { src: 'ocean life/seaweed', h: 60, optional: true }, { src: 'ocean life/crab', h: 42, optional: true }, { src: 'ocean life/ray', h: 48, optional: true }],
    texture: { n: 26, gap: 36, kinds: ['bubble', 'bubble', 'dot'], colours: { bubble: ['#B4E1EA', '#A6D9E3'], dot: ['#B4E1EA'] } },
  },

  // ------------------------------------------------------------------ F14 K-411 number maze 1 to 20: the little train to the cabin
  'alpine-train': {
    H: 716, band: { h: 8, sky: '#B9DB8C', hill: '#B9DB8C' },
    field: '#B9DB8C', corridor: { fill: '#F5EDDF', edge: '#A88C6A', outline: 3.5 },
    slots: ['L', 'TR'],
    maze: {
      box: { w: 675, h: 700 }, frame: { x0: 40, y0: 40, x1: 635, y1: 660 }, r: 84, minAngle: 55, W: 44, branches: 9, size: [1, 3], fill: 0, loops: 6, K: 260,
      gates: { clear: 61 },
    },
    labels: { rule: 'seq', numbers: [1, 20, 1], glyph: 'text', fontPx: 30, stoneR: 28, decoyCount: 12, nearShare: 0.8 },
    hero: { src: 'vehicles/train', h: 70 },
    goal: { src: 'camping/cabin', h: 92 },
    cast: [{ src: 'tree/pine', h: 92 }, { src: 'camping/deer', h: 62, optional: true }, { src: 'tree/spruce', h: 88, optional: true }, { src: 'camping/rabbit', h: 44, optional: true }, { src: 'flowers/bluebell', h: 48, optional: true }],
    texture: { n: 26, gap: 40, kinds: ['tuft', 'tuft', 'dot'], colours: { tuft: ['#9CC973', '#8DBA62'], dot: ['#E9B6CF', '#C7D8F2'] } },
  },

  // ------------------------------------------------------------------ F15 G2-392 skip-counting maze by 5s: the balloon to the rainbow
  'dawn-balloon': {
    H: 716, band: { h: 8, sky: '#FCE6D8', hill: '#FCE6D8' },
    field: '#D2E2F7', corridor: { fill: '#FFFFFF', edge: '#9DB8D8', outline: 3.5 },
    slots: ['BC', 'TR'],
    maze: {
      box: { w: 675, h: 700 }, frame: { x0: 40, y0: 40, x1: 635, y1: 660 }, r: 84, minAngle: 55, W: 32, branches: 9, size: [1, 3], fill: 0, loops: 6, K: 260,
      gates: { clear: 49 },
    },
    labels: { rule: 'seq', numbers: [5, 100, 5], glyph: 'text', fontPx: 26, shape: 'pill', size: [64, 46], stoneR: 32, decoyCount: 12, nearShare: 0.8 },
    hero: { src: 'Things That Fly/hot_air_balloon', h: 96 },
    goal: { src: 'weather/rainbow', h: 84 },
    cast: [{ src: 'Things That Fly/paper_airplane', h: 44 }, { src: 'Things That Fly/seagull', h: 44, optional: true }, { src: 'Things That Fly/helicopter', h: 52, optional: true }, { src: 'Things That Fly/airplane', h: 50, optional: true }, { src: 'weather/sun', h: 56, optional: true }],
    texture: { n: 18, gap: 46, kinds: ['dot'], colours: { dot: ['#C4D6F0', '#BFCFEB'] } },
  },
};

module.exports = { SCENES };
