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
      keep: [[34, 602, 70], [578, 40, 92]], start: [60, 590], goal: [610, 60], startMouth: [92, 560], goalMouth: [585, 118], K: 500,
      gates: { dead: [6, 9], junctions: 4, stubs: 0, tempting: 2, deep3: 1 / 3, side: 0.6, sameRun: 2, wf: 0.5, tort: 1.6, maxRun: 300, clear: 61 },
    },
    keep: [[34, 602, 70], [578, 40, 92]],
    hero: { src: 'forest creatures/hedgehog', at: [46, 633], h: 78 },
    goal: { src: 'tree/apple', at: [582, 124], h: 168 },
    cast: [
      { src: 'forest creatures/mouse', h: 50 }, { src: 'forest creatures/snail', h: 46 },
      { src: 'forest creatures/butterfly', h: 44 }, { src: 'forest creatures/ladybug', h: 40 }, { src: 'vegetables/mushroom', h: 52 },
      { src: 'flowers/buttercup', h: 54 }, { src: 'flowers/dandelion', h: 54 },
    ],
    texture: { n: 30, gap: 40, kinds: ['tuft', 'tuft', 'leaf'], colours: { tuft: ['#C9B474', '#BBA55F'], leaf: ['#E69A4A', '#D9773A'] } },
  },

  // ------------------------------------------------------------------ F2 K-406 (PreK) my first maze: the puppy and the ball
  'park-puppy': { tries: 20,
    H: 716, band: { h: 76, sky: '#E4F3FB', hill: '#B9DD8F', hills: [[-40, 300, 30], [420, 720, 24]] },
    field: '#C8E6A0', corridor: { fill: '#FBEFD0', edge: '#B89A5E', outline: 4 }, disc: 28,
    slots: ['L', 'R'],
    maze: {
      box: { w: 675, h: 640 }, frame: { x0: 70, y0: 66, x1: 605, y1: 574 }, r: 112, minAngle: 60, W: 72, route: [5, 7], branches: 2, size: [2, 3], fill: 0, K: 600,
      gates: { dead: [2, 2], junctions: 2, wf: 0.8, tort: 1.3, clear: 89 },
    },
    hero: { src: 'pets/dog', h: 96 },
    goal: { src: 'toys/ball', h: 62 },
    cast: [{ src: 'tree/cherry', h: 120 }, { src: 'pets/cat', h: 64 }, { src: 'spring/bird', h: 46 }, { src: 'spring/butterfly', h: 44 }, { src: 'flowers/tulip', h: 56 }],
    texture: { n: 22, gap: 44, kinds: ['tuft', 'tuft', 'dot'], colours: { tuft: ['#A6CB7A', '#94BD69'], dot: ['#F7C9D6', '#FFFFFF', '#FBE38A'] } },
  },

  // ------------------------------------------------------------------ F3 G1-420 big picture maze: the orangutan and the banana tree
  'jungle-orangutan': { tries: 16,
    H: 716, band: { h: 76, sky: '#5E9E63', hill: '#4F8F55', hills: [[-40, 240, 22], [200, 520, 26], [470, 720, 20]] },
    field: '#86BE77', corridor: { fill: '#F2F8E4', edge: '#5E8F4A', outline: 3.5 },
    slots: ['BR', 'TL'],
    maze: {
      box: { w: 675, h: 640 }, frame: { x0: 34, y0: 32, x1: 641, y1: 608 }, r: 62, minAngle: 55, W: 36, route: [22, 28], branches: 11, size: [3, 6], bNewest: 0.5, fill: 1, K: 900,
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
  'stream-boat': { tries: 24,
    H: 716, band: { h: 76, sky: '#FCEFD2', hill: '#B6DB8E', hills: [[-40, 280, 28], [380, 720, 30]] },
    field: '#A9D27E', corridor: { fill: '#D3EEF8', edge: '#5FA9C8', outline: 4 }, paint: 'water',
    slots: ['TL', 'BR'],
    maze: {
      box: { w: 675, h: 640 }, frame: { x0: 52, y0: 46, x1: 623, y1: 594 }, r: 96, minAngle: 65, W: 52, route: [10, 15], branches: 4, size: [3, 4], bNewest: 1, fill: 0, K: 900,
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
  'reef-clownfish': { tries: 40,
    H: 716, band: { h: 8, sky: '#69BBC7', hill: '#69BBC7' },
    field: '#7FCBD5', corridor: { fill: '#EAF8FA', edge: '#4F9FAD', outline: 3.5 },
    slots: ['TL', 'BR'],
    maze: {
      box: { w: 675, h: 700 }, frame: { x0: 40, y0: 40, x1: 635, y1: 660 }, r: 72, minAngle: 55, W: 42, branches: 12, size: [1, 3], fill: 0, loops: 7, K: 260,
      gates: { clear: 59 },   // W 42 + 17 (2026-10-11: at W 44 the 29-letter Nordic alphabets built 2-4 pages in 8; 10/10 at W 42)
    },
    labels: { rule: 'seq', alphabet: true, case: 'lower', glyph: 'letters', stoneR: 28, capH: 36, rByLen: { 21: 76, 26: 72, 27: 72, 29: 68 }, decoyMin: 0.55, nearShare: 0.9, reversalMin: 4 },
    hero: { src: 'ocean life/clownfish', h: 66 },
    goal: { src: 'ocean life/coral', h: 88 },
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

  // ------------------------------------------------------------------ F16 G1-427 addition maze, sums that make 10: the giraffe to the baobab
  'savanna-giraffe': { tries: 30,
    H: 716, band: { h: 8, sky: '#E9C98A', hill: '#E9C98A' },
    field: '#E9C98A', corridor: { fill: '#FBEFE2', edge: '#C88E5F', outline: 3.5 },
    slots: ['BR', 'TL'],
    maze: {
      box: { w: 675, h: 700 }, frame: { x0: 52, y0: 46, x1: 623, y1: 654 }, r: 104, minAngle: 55, W: 36, branches: 8, size: [1, 3], fill: 0, loops: 5, K: 260,
      gates: { clear: 53 },
    },
    labels: { rule: 'pred', op: '+', target: 10, a: [0, 10], b: [0, 10], route: 10, glyph: 'text', fontPx: 26, shape: 'pill', size: [86, 48], stoneR: 44, decoyCount: 10, badge: true },
    hero: { src: 'zoo animals/giraffe', h: 110 },
    goal: { src: 'tree/baobab', h: 132 },
    cast: [{ src: 'zoo animals/elephant', h: 70, optional: true }, { src: 'zoo animals/zebra', h: 62, optional: true }, { src: 'zoo animals/rhinoceros', h: 56, optional: true }, { src: 'birds/ostrich', h: 64, optional: true }, { src: 'zoo animals/meerkat', h: 46, optional: true }, { src: 'zoo animals/gazelle', h: 56, optional: true }],
    texture: { n: 24, gap: 42, kinds: ['tuft', 'pebble'], colours: { tuft: ['#C9A764', '#B8955A'], pebble: ['#D3B07A', '#C9A06A'] } },
  },

  // ------------------------------------------------------------------ F17 G1-428 subtraction maze within 20: the gingerbread man to the cake
  'candy-gingerbread': { tries: 24,
    H: 716, band: { h: 8, sky: '#CDEEDF', hill: '#CDEEDF' },
    field: '#CDEEDF', corridor: { fill: '#FFF4F7', edge: '#E5A2BA', outline: 3.5 },
    slots: ['BC', 'TL'],
    maze: {
      box: { w: 675, h: 700 }, frame: { x0: 52, y0: 46, x1: 623, y1: 654 }, r: 104, minAngle: 55, W: 36, branches: 8, size: [1, 3], fill: 0, loops: 5, K: 260,
      gates: { clear: 53 },
    },
    labels: { rule: 'pred', op: '-', target: [8, 9], a: [10, 18], b: [2, 9], route: 8, glyph: 'text', fontPx: 26, shape: 'pill', size: [86, 48], stoneR: 44, decoyCount: 8, badge: true },
    hero: { src: 'bakery/gingerbread_man', h: 88 },
    goal: { src: 'desserts and sweets/cake', h: 88 },
    cast: [{ src: 'desserts and sweets/cupcake', h: 54, optional: true }, { src: 'desserts and sweets/donut', h: 48, optional: true }, { src: 'desserts and sweets/lollipop', h: 60, optional: true }, { src: 'desserts and sweets/ice_cream', h: 60, optional: true }, { src: 'desserts and sweets/candy_cane', h: 56, optional: true }, { src: 'desserts and sweets/macaron', h: 40, optional: true }, { src: 'desserts and sweets/popsicle', h: 56, optional: true }],
    texture: { n: 24, gap: 44, kinds: ['dot', 'dot', 'star'], colours: { dot: ['#F2A5BF', '#A8D8F0', '#FBD38C'], star: ['#F7B6CB'] } },
  },

  // ------------------------------------------------------------------ F19 G2-393 math maze within 100, running total: the dump truck to the crane
  'site-dumptruck': { tries: 40,
    H: 716, band: { h: 8, sky: '#D9C7A6', hill: '#D9C7A6' },
    field: '#D9C7A6', corridor: { fill: '#FBF3E2', edge: '#A9855A', outline: 3.5 },
    slots: ['R', 'L'],
    maze: {
      box: { w: 675, h: 700 }, frame: { x0: 46, y0: 46, x1: 629, y1: 654 }, r: 98, minAngle: 55, W: 32, branches: 7, size: [1, 3], fill: 1, loops: 5, K: 400,
      gates: { clear: 49 },
    },
    labels: { rule: 'ops', opSet: [10, -10, 5, -5, 2, -2, 1, -1], start: [20, 60], range: [0, 100], route: 8, glyph: 'text', fontPx: 26, shape: 'pill', size: [72, 70], radius: 16, stoneR: 44, decoyCount: 7, badge: true, totals: 'inline', nearMissShortest: [1, 2, 5, 10] },
    hero: { src: 'vehicles/dump_truck', h: 64 },
    goal: { src: 'vehicles/crane', h: 92 },
    cast: [{ src: 'vehicles/excavator', h: 60, optional: true }, { src: 'vehicles/cement_mixer', h: 56, optional: true }, { src: 'vehicles/forklift', h: 54, optional: true }, { src: 'vehicles/bulldozer', h: 56, optional: true }, { src: 'camping/log', h: 36, optional: true }, { src: 'camping/rock', h: 36, optional: true }],
    texture: { n: 26, gap: 40, kinds: ['pebble', 'pebble', 'dot'], colours: { pebble: ['#BDB4A6', '#B0A595'], dot: ['#C2AE8A'] } },
  },

  // ------------------------------------------------------------------ F18 K-412 first-sound maze: the lion at the market (cards from the locale's L pool)
  'market-lion': {
    H: 716, band: { h: 8, sky: '#E8C9A7', hill: '#E8C9A7' },
    field: '#E8C9A7', corridor: { fill: '#FFF8EE', edge: '#B98B5E', outline: 3.5 },
    slots: ['TR', 'BR'],   // same side: a 7-card route from corner to opposite corner IS the shortest way (measured)
    maze: {
      box: { w: 675, h: 700 }, frame: { x0: 50, y0: 50, x1: 625, y1: 650 }, r: 90, minAngle: 55, W: 44, branches: 11, size: [2, 4], fill: 1, loops: 5, K: 400,   // no island art on this face: leftover stations become decoys (a 7-card route roots too few branches)
      gates: { clear: 61 },
    },
    labels: { rule: 'sound', route: 7, glyph: 'picture', picH: 46, stoneR: 36, fill: '#FFF9EF', decoyCount: 12, laterLMin: 3 },
    hero: { src: 'zoo animals/lion', h: 90 },
    goal: { src: 'At the Supermarket/basket', h: 70 },
    cast: [],
    texture: { n: 30, gap: 38, kinds: ['pebble', 'pebble'], colours: { pebble: ['#DDBA92', '#D3AE84'] } },
  },

  // ------------------------------------------------------------------ F9 G1-424 collect on the way: the rabbit picks up 4 carrots (T2: scene 640 + strip)
  'garden-rabbit': {
    H: 640, band: { h: 8, sky: '#CFE5A8', hill: '#CFE5A8' },
    field: '#CFE5A8', corridor: { fill: '#F1EEE6', edge: '#A8A08F', outline: 3.5 }, strip: true,
    slots: ['BL', 'TR'],
    maze: {
      box: { w: 675, h: 632 }, frame: { x0: 46, y0: 40, x1: 629, y1: 592 }, r: 90, minAngle: 55, W: 36, branches: 8, size: [1, 3], fill: 1, loops: 5, K: 400,
      gates: { clear: 53 },
    },
    labels: { rule: 'collect', item: 'vegetables/carrot', n: 4, route: 14, glyph: 'picture', picH: 40, stoneR: 26, fill: '#FFFFFF' },
    hero: { src: 'farm animals/rabbit', h: 80 },
    goal: { src: 'summer/bucket', h: 64 },
    cast: [{ src: 'vegetables/pumpkin', h: 48, optional: true }, { src: 'spring/watering_can', h: 48, optional: true }, { src: 'vegetables/lettuce', h: 42, optional: true }, { src: 'forest creatures/snail', h: 40, optional: true }, { src: 'insects and bugs/caterpillar', h: 38, optional: true }],
    texture: { n: 26, gap: 38, kinds: ['tuft', 'tuft', 'dot'], colours: { tuft: ['#A8CC7E', '#98BE6E'], dot: ['#9C6E4A'] } },
  },

  // ------------------------------------------------------------------ F10 G1-425 avoid the obstacles: the polar bear crosses the sea ice (T2)
  'arctic-polarbear': {
    H: 640, band: { h: 8, sky: '#CFE3EF', hill: '#CFE3EF' },
    field: '#CFE3EF', corridor: { fill: '#FFFFFF', edge: '#8FB3CB', outline: 3.5 }, strip: true,
    slots: ['BL', 'R'],
    maze: {
      box: { w: 675, h: 632 }, frame: { x0: 46, y0: 40, x1: 629, y1: 592 }, r: 90, minAngle: 55, W: 36, branches: 8, size: [1, 3], fill: 1, loops: 6, K: 400,
      gates: { clear: 53 },
    },
    labels: { rule: 'avoid', kinds: ['winter/walrus', 'hole'], count: [4, 5], route: 14, obstacleH: 40, stoneR: 26 },
    hero: { src: 'winter/polar_bear', h: 80 },
    goal: { src: 'winter/igloo', h: 92 },
    cast: [{ src: 'winter/seal', h: 44, optional: true }, { src: 'winter/snowflake', h: 36, optional: true }, { src: 'winter/icicle', h: 40, optional: true }],
    texture: { n: 22, gap: 44, kinds: ['dot'], colours: { dot: ['#B3CFE2', '#A7C6DC'] } },
  },

  // ------------------------------------------------------------------ F5 G1-421 underground maze: the ant and its raspberry store
  // A cross-section: sky + a grass line, three soil strata, tunnels on three levels joined by vertical shafts (generator
  // 'layers'). The ant starts at its nest hole on the grass (TR) and goes down to the store chamber (BL); the way goes
  // down, comes back UP once, and at least one shaft drops into a blind chamber (the tempting short descent).
  // Deviations from the FINAL (measured 2026-10-11): bNewest 0.5 (bNewest 1 gives one dead end per branch root and a
  // 14-station route offers 4-7 roots, so dead 6-8 was unreachable) and K 3000 (one tree in ~6000 passes every layer
  // gate; 11/20 calls pass at K 3000, ~2.4 s).
  'underground-ant': {
    tries: 14,
    H: 716, band: { h: 76, sky: '#E2F1F6', hill: '#9CCB6E', flat: { grass: '#9CCB6E', h: 18 } },
    field: '#C99A6B', strata: [[180, '#B88559'], [400, '#A47149']],
    corridor: { fill: '#F4E1C6', edge: '#8F6640', outline: 3.5 },
    maze: {
      gen: 'layers', box: { w: 675, h: 640 }, C: 10, colX: [48, 627], levelsY: [70, 290, 510], jitter: [6, 5],
      W: 40, route: [12, 17], branches: 6, size: [2, 4], bNewest: 0.5, fill: 0, K: 3000,
      start: [9, 0], goal: [0, 2], startMouth: [627, 2], goalMouth: [48, 556],
      gates: { dead: [6, 8], stubs: 1, side: 0.67, wf: 0.6, clear: 53, layers: { changes: 3, ups: 1, shafts: [5, 7], deadShafts: 1, levelRun: 5 } },
    },
    hero: { src: 'forest creatures/ant', h: 56, at: [556, 0] },
    goal: { src: 'fruits/raspberry', h: 46, at: [88, 598] },
    // the store chamber round the goal, and blind chambers at dead ends, one bug each (one noun once per page)
    chambers: { r: 30, goal: [84, 572, 42], bugH: 34, bugs: ['insects and bugs/worm', 'insects and bugs/centipede', 'Things That Fly/beetle', 'forest creatures/spider'] },
    bandArt: [{ src: 'flowers/dandelion', x: 92, h: 58 }, { src: 'forest creatures/ladybug', x: 214, h: 26 }, { src: 'vegetables/carrot', x: 318, h: 56 }, { src: 'vegetables/radish', x: 430, h: 48 }],
    texture: { n: 26, gap: 40, kinds: ['pebble', 'pebble', 'dot'], colours: { pebble: ['#8E6A49', '#9B7653'], dot: ['#7E5C3E'] } },
  },

  // ------------------------------------------------------------------ F6 G1-422 town maze: the tow truck and the green car
  // A street lattice with loops (generator 'streets'): 5 × 5 crossings, 4-6 street pieces taken out, ONE shortest way
  // (BFS count), the next way two pieces longer, at least one longer way that turns less, and the straight staircase
  // toward the car blocked (detour ≥ 2). Every street piece carries one round cover — the unit the child counts and
  // writes in the strip's box. The vehicles park in the side margins beside their mouth rows (drawn per maze).
  // Deviations from the FINAL (2026-10-11): 5 × 5 crossings, not 6 × 5 — a 6-wide lattice leaves no margin for the
  // parked truck and car, and the 4 × 4 blocks keep lawns wide enough for one object each; detour gate added.
  'town-towtruck': {
    H: 640, band: { h: 6, sky: '#BFDB98', hill: '#BFDB98' },
    field: '#BFDB98', corridor: { fill: '#E4E2DE', edge: '#A9A49C', outline: 4 }, strip: true,
    streets: { cover: '#B9B4AB', coverEdge: '#8F8A82', coverR: 7 },
    maze: {
      gen: 'streets', box: { w: 675, h: 634 }, C: 5, R: 5, colX: [125, 550], rowY: [44, 590], remove: [4, 6], W: 40,
      startRows: [1, 2, 3], goalRows: [1, 2, 3], mouthX: [30, 645], park: [66, 27, 606], K: 1500,
      gates: { streets: { shortest: [6, 9], next: 2, fewerTurns: true, routes: 3, detour: 2 } },
    },
    hero: { src: 'vehicles/tow_truck', h: 46 },
    goal: { src: 'vehicles/car', h: 38 },
    cast: [{ src: 'around the house/garage', h: 50, optional: true }, { src: 'camping/cabin', h: 50, optional: true }, { src: 'tree/oak', h: 58, optional: true },
      { src: 'tree/poplar', h: 58, optional: true }, { src: 'around the house/mailbox', h: 44, optional: true }, { src: 'vehicles/bicycle', h: 36, optional: true },
      { src: 'around the house/fence', h: 30, optional: true }, { src: 'vehicles/scooter', h: 38, optional: true }],
    texture: { n: 16, gap: 46, kinds: ['tuft'], colours: { tuft: ['#A6CB7A', '#96BE68'] } },
  },
  // ------------------------------------------------------------------ F7 K-408 babies and mothers on the farm
  // Three separate trees (generator 'forest'): baby i at the top of column i, the mothers in mown paddocks lower down,
  // baby i's road leading to mother π(i) with π a derangement — no baby stands straight above its own mother, so the
  // child follows the road rather than looking down. A road may reach a paddock from any side; one pair always goes the
  // long way round beneath the paddocks. Babies ≤ 0.75 × the mother's height.
  // Deviations from the FINAL (measured 2026-10-11): r 74 (r 84 leaves ~27 stations; one route took 14 of them) and
  // paddocks at y 470 (at 540 no station fits beneath them, so no derangement can be routed); the routing uses a
  // randomized shortest path over every pair order (the greedy search routed 0 of 200).
  'farm-babies': {
    tries: 30,
    H: 716, band: { h: 40, sky: '#B9DDF0', hill: '#B9DDF0', fence: { rail: '#D9B07C', post: '#C29A66' } },
    field: '#EED58A', corridor: { fill: '#F3F8E4', edge: '#A9C979', outline: 3.5 }, disc: 22,
    paddockFill: '#D7EBAE', paddocks: [[112, 470, 58], [337, 470, 58], [562, 470, 58]],
    babyFeet: [[112, 36], [337, 36], [562, 36]],
    pairs: [
      { baby: 'farm animals/chick', babyH: 40, mother: 'farm animals/hen', motherH: 62 },
      { baby: 'farm animals/calf', babyH: 46, mother: 'farm animals/cow', motherH: 64 },
      { baby: 'farm animals/foal', babyH: 48, mother: 'farm animals/horse', motherH: 66 },
    ],
    maze: {
      gen: 'forest', box: { w: 675, h: 676 }, frame: { x0: 40, y0: 110, x1: 635, y1: 640 }, r: 74, minAngle: 55, W: 44, k: 3,
      babyAt: [[112, 64], [337, 64], [562, 64]],
      keep: [[112, 470, 58], [337, 470, 58], [562, 470, 58], [112, 30, 50], [337, 30, 50], [562, 30, 50]],
      route: [3, 16], branches: 3, size: [1, 2], K: 1500, chordK: 0.75,
      gates: { forest: { dead: [2, 4], junctions: 1, overlap: 0.4, ratio: 0.5, clear: 61 } },
    },
    hero: { src: 'farm animals/chick', h: 40, at: [112, 36] },
    goal: { src: 'farm animals/hen', h: 62, at: [112, 500] },
    cast: [{ src: 'flowers/cornflower', h: 46, optional: true }, { src: 'flowers/buttercup', h: 44, optional: true },
      { src: 'insects and bugs/butterfly', h: 36, optional: true }, { src: 'insects and bugs/bee', h: 30, optional: true }],
    texture: { n: 22, gap: 44, kinds: ['tuft', 'dot'], colours: { tuft: ['#D9BE6E', '#CDB062'], dot: ['#F2A7C4', '#E58A4E'] } },
  },
  // ------------------------------------------------------------------ F8 G1-423 tangled lines: whose kite?
  // No corridors and no choices (generator 'strands', composer composeStrands): four strings from four numbered holders
  // at the bottom to four goals at the top, crossing 8-10 times over six levels (a swap schedule: the end order is a
  // derangement, every string crosses at least two others, never the same one twice in a row). The child follows each
  // string and writes the holder's number in the box above the goal. Straight runs between levels keep every crossing
  // at its geometric angle (53°); corners rounded; over / under drawn with a sky-coloured halo.
  'hilltop-kites': {
    H: 716, sky: '#CFE6F5', hill: '#9FCF7C', hillY: 600,
    strings: { ink: '#4A3F36', width: 10 },
    slotX: [127, 267, 407, 547], knotY: 158, boxY: 16, holderFeetY: 708,
    discXY: [[127, 606], [267, 606], [407, 606], [547, 606]],
    goals: [{ src: 'spring/kite', h: 72 }, { src: 'beach/kite', h: 72 }, { src: 'Things That Fly/kite', h: 74 }, { src: 'Things That Fly/balloon', h: 70 }],
    holders: [{ src: 'forest creatures/fox', h: 64 }, { src: 'forest creatures/raccoon', h: 62 }, { src: 'forest creatures/squirrel', h: 62 }, { src: 'forest creatures/badger', h: 52 }],
    cast: [{ src: 'weather/cloud', at: [52, 330], h: 38, centre: true }, { src: 'Things That Fly/bird', at: [626, 300], h: 34, centre: true }, { src: 'flowers/clover', at: [44, 704], h: 30 }],
    maze: {
      gen: 'strands', k: 4, M: 6, slotX: [127, 267, 407, 547], levelY: [580, 168], wobble: 12, swapP: 0.85, crossings: [8, 10], K: 1500,
      gates: { strands: { angle: 50, apart: 30, near: [14, 40], ratio: 0.8 } },
    },
  },
  // ------------------------------------------------------------------ F13 G1-426 letter hop: the bear's honeycomb
  // No corridors (generator 'hex', composer composeHex): a 7 × 7 honeycomb, a run of 14 capitals from a seeded MID
  // letter (the Nordic alphabets end on their last letter), exactly one valid run, near-miss decoys beside every step.
  // The start disc points into the run's first cell; no flag (it would mark the end) — the instruction names {LAST}.
  'honeycomb-bear': {
    H: 716, field: '#F3DE95',
    hex: { cellW: 85, comb: [8, 80, 659, 562], combFill: '#F7D27A', cellFill: '#FFF6D6', cellEdge: '#E0B44E', capH: 34 },
    hero: { src: 'forest creatures/bear', h: 70 },
    goal: { src: 'breakfast/honey', h: 58, at: [640, 82] },
    cast: [{ src: 'insects and bugs/bee', at: [44, 44], h: 32 }, { src: 'flowers/sunflower', at: [36, 674], h: 58 }, { src: 'flowers/clover', at: [646, 694], h: 28 }],
    maze: { gen: 'hex', cols: 7, rows: 7, cellW: 85, rowPitch: 74, x0: 61, y0: 136, run: 14, K: 2000, gates: { hex: { turns: 5, near: [1, 0.5], up: 0.65 } } },
  },
};

module.exports = { SCENES };
