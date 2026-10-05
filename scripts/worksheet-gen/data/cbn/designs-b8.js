/**
 * data/cbn/designs-b8.js — Color by Number, batch 8 (2026-10-05): 12 scenes + 13 pictures.
 * Reviewed against docs/worksheet-gen/cbn-review-checklist.md; gated by tools/cbn-preview.js.
 */
'use strict';
const P = require('../../primitives/cbn-art/parts.js');
const Q = require('../../primitives/cbn-art/parts2.js');
const R = require('../../primitives/cbn-art/parts3.js');
const X = require('../../primitives/cbn-art/parts9.js');
const V = require('../../primitives/cbn-art/v2.js');
const { blob, rrect, ellipse } = require('../../primitives/cbn-art/core.js');

const W = 600, H = 560;
const mound = (a, x, y, w, c = 'green', h = 34) => a.group('mound', () => a.region(blob([[x - w, y + h * 0.5], [x - w * 0.7, y - h * 0.5], [x, y - h * 0.8], [x + w * 0.7, y - h * 0.5], [x + w, y + h * 0.5], [x, y + h * 0.9]], 1), c, 'grass'));
const skyGrass = (a, horizon = 0.6, sky = 'lightblue', grass = 'green') => { a.region(`M0 0H${W}V${H}H0Z`, sky, 'sky'); a.region(`M0 ${H * horizon}C${W * 0.3} ${H * horizon - 34} ${W * 0.7} ${H * horizon - 14} ${W} ${H * horizon}V${H}H0Z`, grass, 'grass'); };
const bubbles = (a, pts) => pts.forEach(([x, y]) => a.at({ x, y }, (b) => P.bubble(b, 13)));
const branchWithLeaves = (a, y, x0 = 60, x1 = 540) => a.group('branch', () => {
  a.region(`M${x0} ${y}Q300 ${y - 30} ${x1} ${y - 6}L${x1} ${y + 26}Q300 ${y} ${x0} ${y + 32}Z`, 'brown', 'branch');
  a.at({ x: x1 - 30, y: y + 6, r: -40 }, (c) => c.region('M0 0Q30 -40 70 -24Q44 12 0 0Z', 'green', 'leaf'));
  a.at({ x: x0 + 40, y: y + 18, r: 200 }, (c) => c.region('M0 0Q30 -40 70 -24Q44 12 0 0Z', 'green', 'leaf'));
});

const B8 = [
  /* ------------------------------------------------------------ pictures */
  { id: 'little-mouse', kind: 'picture', level: 1, names: { en: 'Little Mouse' },
    draw(a) { a.at({ x: 270, y: 300, s: 1.5 }, (b) => X.mouse(b, 'grey', 'pink', 'none')); a.at({ x: 480, y: 440, s: 0.9 }, (b) => X.cheese(b, 'yellow')); } },
  { id: 'happy-acorn', kind: 'picture', level: 1, names: { en: 'Happy Acorn' },
    draw(a) { mound(a, 300, 486, 200); a.at({ x: 300, y: 330, s: 1.5 }, (b) => X.acorn(b, 'orange', 'brown')); } },
  { id: 'jellyfish', kind: 'picture', level: 1, names: { en: 'Jellyfish' },
    draw(a) { a.at({ x: 300, y: 240, s: 1.7 }, (b) => X.jellyfish(b, 'pink', ['purple', 'blue'])); bubbles(a, [[100, 120], [130, 80], [490, 160]]); } },
  { id: 'birdhouse', kind: 'picture', level: 1, names: { en: 'Birdhouse' },
    draw(a) { mound(a, 300, 500, 200); a.at({ x: 300, y: 250, s: 1.25 }, (b) => X.birdhouse(b, 'yellow', 'red', 'black', 'brown')); } },
  { id: 'squirrel', kind: 'picture', level: 2, names: { en: 'Squirrel' },
    draw(a) { mound(a, 300, 486, 240); a.at({ x: 510, y: 430, s: 0.95 }, (b) => P.mushroom(b, 'red', 'none')); a.at({ x: 290, y: 484, s: 1.3 }, (b) => V.squirrel(b, 'orange', 'yellow', 'brown')); } },
  { id: 'robin', kind: 'picture', level: 2, names: { en: 'Little Bird' },
    draw(a) { branchWithLeaves(a, 380); a.at({ x: 300, y: 228, s: 1.5 }, (b) => X.bird(b, 'brown', 'red', 'orange', 'yellow')); } },   // a robin: brown back, red breast   // feet ON the branch
  { id: 'submarine', kind: 'picture', level: 2, names: { en: 'Submarine' },
    draw(a) { a.at({ x: 320, y: 300, s: 1.35 }, (b) => X.submarine(b, 'yellow', 'lightblue', 'red', 'grey')); a.at({ x: 470, y: 470, s: 0.85 }, (b) => P.fish(b, 'orange', 'yellow', 'none')); bubbles(a, [[80, 220], [60, 170], [90, 130]]); } },
  { id: 'crocodile', kind: 'picture', level: 1, names: { en: 'Crocodile' },
    draw(a) { a.group('water', () => a.region(ellipse(300, 344, 284, 64), 'blue', 'water')); a.group('bank', () => a.region(ellipse(292, 328, 236, 40), 'yellow', 'sand')); a.at({ x: 290, y: 336, s: 1.1 }, (b) => X.crocodile(b, 'green', 'lightgreen', 'none')); } },
  { id: 'beehive', kind: 'picture', level: 2, names: { en: 'Beehive' },
    draw(a) {
      a.group('tree branch', () => a.region('M-10 100Q300 80 610 110L610 140Q300 110 -10 132Z', 'brown', 'branch'), { edgeOk: true });
      a.at({ x: 226, y: 280, s: 1.3 }, (b) => X.beehive(b, 'yellow', 'brown', 'orange', false));
      a.at({ x: 464, y: 300, s: 1.0 }, (b) => Q.bee(b, 'yellow', 'black', 'lightblue'));
    } },
  { id: 'dump-truck', kind: 'picture', level: 3, names: { en: 'Dump Truck' },
    draw(a) { a.group('road', () => a.region(rrect(20, 410, 560, 40, 10), 'grey', 'road')); a.at({ x: 300, y: 340, s: 1.4 }, (b) => X.dumpTruck(b, 'yellow', 'orange', 'brown', 'black', 'grey', 'lightblue')); } },
  { id: 'mouse-cheese', kind: 'picture', level: 2, names: { en: 'Mouse and Cheese' },
    draw(a) {
      a.group('table', () => a.region(rrect(40, 450, 520, 40, 10), 'brown', 'table'));
      a.at({ x: 210, y: 296, s: 1.45 }, (b) => X.mouse(b, 'grey', 'pink', 'none'));
      a.at({ x: 450, y: 396, s: 1.1 }, (b) => X.cheese(b, 'yellow'));   // ON the table (a cake floated in mid-air)
    } },
  { id: 'bird-nest', kind: 'picture', level: 3, names: { en: 'Bird and Nest' },
    draw(a) {
      branchWithLeaves(a, 400);
      a.group('nest', () => { a.region(blob([[110, 400], [150, 360], [290, 360], [330, 400], [280, 430], [160, 430]], 1), 'yellow', 'nest'); a.line('M150 392q30 10 60 0M220 396q30 10 60 0', 2.6); });
      a.group('eggs', () => { a.region(ellipse(196, 362, 28, 34), 'lightblue', 'egg'); a.region(ellipse(240, 358, 28, 34), 'lightblue', 'egg'); });
      // the bird PERCHES on the branch beside its nest (above the nest it hovered)
      a.at({ x: 460, y: 270, s: 1.15 }, (b) => X.bird(b, 'red', 'yellow', 'orange', 'orange'));
    } },
  { id: 'submarine-deep', kind: 'picture', level: 3, names: { en: 'Submarine Adventure' },
    draw(a) {
      a.at({ x: 300, y: 240, s: 1.1 }, (b) => X.submarine(b, 'yellow', 'lightblue', 'red', 'grey'));
      a.at({ x: 130, y: 430, s: 1.0 }, (b) => P.fish(b, 'orange', 'yellow', 'none'));
      a.at({ x: 450, y: 400, s: 1.0 }, (b) => X.jellyfish(b, 'pink', 'purple'));
    } },

  /* ------------------------------------------------------------ scenes */
  { id: 'mouse-house', kind: 'scene', level: 1, names: { en: 'Mouse in the Grass' },
    draw(a) { skyGrass(a, 0.62); a.at({ x: 480, y: 90, s: 0.9 }, (b) => P.sun(b)); a.at({ x: 280, y: 340, s: 1.3 }, (b) => X.mouse(b, 'grey', 'pink', 'none')); } },
  { id: 'jellyfish-sea', kind: 'scene', level: 1, names: { en: 'Jellyfish in the Sea' },
    draw(a) { P.sea(a, W, H); a.at({ x: 280, y: 210, s: 1.5 }, (b) => X.jellyfish(b, 'pink', 'purple')); bubbles(a, [[100, 110], [130, 70], [480, 140], [500, 100]]); } },
  { id: 'bird-sky', kind: 'scene', level: 1, names: { en: 'Little Bird Flying' },
    draw(a) {
      a.region(`M0 0H${W}V${H}H0Z`, 'lightblue', 'sky');
      a.at({ x: 490, y: 90, s: 0.9 }, (b) => P.sun(b));
      a.at({ x: 130, y: 110, s: 0.85 }, (b) => P.cloud(b)); a.at({ x: 450, y: 450, s: 0.95 }, (b) => P.cloud(b));
      a.at({ x: 290, y: 290, s: 1.6 }, (b) => X.bird(b, 'red', 'yellow', 'orange', 'orange'));
    } },
  { id: 'squirrel-tree', kind: 'scene', level: 2, names: { en: 'Squirrel and Tree' },
    draw(a) {
      skyGrass(a, 0.66);
      a.at({ x: 120, y: 80, s: 0.8 }, (b) => P.sun(b));
      a.at({ x: 460, y: 260, s: 1.1 }, (b) => P.tree(b, 'orange', 'brown'));
      a.at({ x: 220, y: 500, s: 1.2 }, (b) => V.squirrel(b, 'orange', 'yellow', 'brown'));
    } },
  { id: 'birdhouse-garden', kind: 'scene', level: 3, names: { en: 'Birdhouse in the Garden' },
    draw(a) {
      skyGrass(a, 0.7);
      a.at({ x: 480, y: 80, s: 0.8 }, (b) => P.sun(b));
      a.at({ x: 220, y: 230, s: 1.0 }, (b) => X.birdhouse(b, 'yellow', 'red', 'black', 'brown'));
      // the bird stands on the grass (beside the house it hovered in the air)
      a.at({ x: 450, y: 390, s: 1.05 }, (b) => X.bird(b, 'blue', 'orange', 'lightblue', 'yellow'));
    } },
  { id: 'crocodile-river', kind: 'scene', level: 2, names: { en: 'Crocodile in the River' },
    draw(a) {
      a.region(`M0 0H${W}V${H}H0Z`, 'lightblue', 'sky');
      a.region(`M0 ${H * 0.46}C${W * 0.3} ${H * 0.42} ${W * 0.7} ${H * 0.44} ${W} ${H * 0.46}V${H}H0Z`, 'lightgreen', 'grass');
      a.region(`M0 ${H * 0.66}C${W * 0.3} ${H * 0.62} ${W * 0.7} ${H * 0.68} ${W} ${H * 0.64}V${H}H0Z`, 'blue', 'river');
      a.at({ x: 490, y: 80, s: 0.8 }, (b) => P.sun(b));
      // it lies on the river bank (it stood on the water)
      a.at({ x: 280, y: 352, s: 1.0 }, (b) => X.crocodile(b, 'green', 'yellow', 'none'));
    } },
  { id: 'submarine-sea', kind: 'scene', level: 2, names: { en: 'Yellow Submarine' },
    draw(a) {
      P.sea(a, W, H);
      a.at({ x: 520, y: 520 }, (b) => P.seaweed(b, 'green', 190));
      a.at({ x: 300, y: 200, s: 1.15 }, (b) => X.submarine(b, 'yellow', 'lightblue', 'red', 'grey'));
      a.at({ x: 270, y: 400, s: 0.95 }, (b) => P.fish(b, 'orange', 'purple', 'none'));
    } },
  { id: 'bee-hive-tree', kind: 'scene', level: 2, names: { en: 'Bees at the Hive' },
    draw(a) {
      skyGrass(a, 0.84);
      // a real tree: trunk, green crown, and a branch growing out of the trunk (a bare pole + plank looked like a signpost)
      a.group('tree', () => { a.region('M70 570L90 200L150 200L170 570Z', 'brown', 'trunk'); a.region('M130 230Q300 196 470 180L470 210Q300 226 130 262Z', 'brown', 'branch'); a.region('M-10 40C60 0 220 20 240 110C250 190 160 230 -10 220Z', 'green', 'tree crown'); }, { edgeOk: true });
      a.at({ x: 256, y: 366, s: 1.16 }, (b) => X.beehive(b, 'yellow', 'brown', 'orange', false));   // hangs from the tree's branch
      a.at({ x: 462, y: 440, s: 1.0 }, (b) => Q.bee(b, 'yellow', 'black', 'none'));   // bee-sized beside the hive (it was as big as the hive)
      a.at({ x: 500, y: 80, s: 0.75 }, (b) => P.sun(b));
    } },
  { id: 'construction', kind: 'scene', level: 3, names: { en: 'Dump Truck at Work' },
    draw(a) {
      skyGrass(a, 0.62, 'lightblue', 'yellow');
      a.at({ x: 90, y: 80, s: 0.8 }, (b) => P.sun(b));
      a.at({ x: 512, y: 478, s: 1.0 }, (b) => P.rock(b, 'grey', 80, 46));   // a pile of stones on the ground (it sat on the horizon like a cloud)
      a.at({ x: 230, y: 440, s: 1.15 }, (b) => X.dumpTruck(b, 'orange', 'red', 'brown', 'black', 'grey', 'lightblue'));
    } },
  { id: 'forest-friends', kind: 'scene', level: 3, names: { en: 'Forest Friends' },
    draw(a) {
      skyGrass(a, 0.6);
      a.at({ x: 520, y: 70, s: 0.75 }, (b) => P.sun(b));
      a.at({ x: 112, y: 228, s: 1.55 }, (b) => P.pineTree(b, 'green', 'brown'));   // a tree is TALLER than a squirrel
      // v2: the squirrel holds its acorn, the mouse is SMALLER than the squirrel and holds a strawberry
      a.at({ x: 300, y: 470, s: 1.15 }, (b) => V.squirrel(b, 'orange', 'yellow', 'brown'));
      a.at({ x: 500, y: 486, s: 1.0 }, (b) => V.mouse(b, 'grey', 'pink', 'red'));
      a.at({ x: 120, y: 470, s: 0.7 }, (b) => P.mushroom(b, 'red', 'none'));
    } },
  { id: 'nest-tree', kind: 'scene', level: 3, names: { en: 'Nest in the Tree' },
    draw(a) {
      a.region(`M0 0H${W}V${H}H0Z`, 'lightblue', 'sky');
      a.at({ x: 500, y: 90, s: 0.85 }, (b) => P.sun(b));
      a.at({ x: 320, y: 120, s: 0.8 }, (b) => P.cloud(b));   // up in the sky (it hung low in front of the trunk)
      a.group('grass', () => a.region('M0 520Q300 490 600 520V600H0Z', 'green', 'grass'), { edgeOk: true });
      a.group('tree', () => { a.region('M-10 570L-4 100L100 100L110 570Z', 'brown', 'trunk'); a.region('M90 340Q300 300 610 330V380Q300 350 90 390Z', 'brown', 'branch'); a.region('M-10 30C90 0 200 60 200 150C200 230 110 250 -10 240Z', 'green', 'leaves'); }, { edgeOk: true });   // the leaves grow down to the branch
      a.at({ x: 306, y: 270, s: 1.06 }, (b) => X.bird(b, 'blue', 'orange', 'lightblue', 'yellow', false));   // sits IN the nest, sized to it
      a.group('nest', () => { a.region(blob([[200, 330], [240, 290], [380, 290], [420, 330], [370, 356], [250, 356]], 1), 'yellow', 'nest'); a.line('M240 324q30 10 60 0M310 326q30 10 60 0', 2.6); });
    } },
  { id: 'deep-sea', kind: 'scene', level: 3, names: { en: 'Deep Sea' },
    draw(a) {
      P.sea(a, W, H, { water: 'blue', sand: 'yellow' });
      a.at({ x: 60, y: 520 }, (b) => P.seaweed(b, 'green', 180));
      a.at({ x: 320, y: 170, s: 0.95 }, (b) => X.submarine(b, 'yellow', 'lightblue', 'red', 'grey'));
      a.at({ x: 400, y: 330, s: 1.0 }, (b) => X.jellyfish(b, 'pink', 'purple'));
    } },
];

module.exports = { B8 };
