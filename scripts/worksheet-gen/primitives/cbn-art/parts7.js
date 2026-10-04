/**
 * cbn-art/parts7.js — Color by Number parts, batch 6 (2026-10-05): doghouse, treasure chest, cherries, carrot,
 * backpack, ice-cream sundae, mug of cocoa. Conventions as parts.js; every object is ONE group (checkSolid).
 */
'use strict';
const { circle, ellipse, rrect, blob, curve, poly } = require('./core.js');
const { eye, smile, face } = require('./parts.js');

function doghouse(a, wall = 'red', roof = 'brown', door = 'black', sign = 'yellow') {
  a.region(poly([[-110, -20], [110, -20], [110, 120], [-110, 120]], 4), wall, 'doghouse wall');
  // the gable goes UNDER the roof (on top, its corners left slivers beside the roof)
  a.region(poly([[-110, -20], [0, -104], [110, -20]], 2), wall, 'gable');
  a.region(poly([[-134, -10], [0, -120], [134, -10], [114, 6], [0, -90], [-114, 6]], 8), roof, 'roof');
  a.region('M-46 120V40A46 46 0 0 1 46 40V120Z', door, 'door');
  a.region(rrect(-40, -66, 80, 32, 8), sign, 'name sign');
}
function treasureChest(a, wood = 'brown', bands = 'yellow', gold = 'yellow', gems = ['red', 'blue', 'green']) {
  a.region(blob([[-110, -40], [-80, -90], [-20, -110], [40, -100], [100, -80], [110, -40]], 0.8), gold, 'gold');
  [[-60, -76, 0], [0, -96, 1], [60, -76, 2]].forEach(([x, y, i]) => a.region(poly([[x - 18, y], [x, y - 22], [x + 18, y], [x, y + 18]], 4), gems[i], 'gem'));
  a.region(rrect(-130, -40, 260, 150, 12), wood, 'chest');
  a.region(rrect(-140, -60, 280, 40, 12), wood, 'lid');
  a.region(rrect(-102, -60, 36, 170, 6), bands, 'band'); a.region(rrect(66, -60, 36, 170, 6), bands, 'band');
  a.region(rrect(-26, -30, 52, 56, 10), bands, 'lock');
  a.ink(circle(0, -6, 6)); a.ink(rrect(-3, -6, 6, 16, 2));
}
function cherries(a, fruit = 'red', leaf = 'green') {
  a.line(curve([[-50, 40], [-20, -40], [10, -110]]), 6); a.line(curve([[50, 40], [40, -40], [10, -110]]), 6);
  a.region(blob([[10, -112], [70, -150], [100, -120], [50, -96]], 1), leaf, 'leaf');
  a.region(circle(-56, 70, 44), fruit, 'cherry'); a.region(circle(56, 70, 44), fruit, 'cherry');
  a.shine(ellipse(-72, 52, 7, 12)); a.shine(ellipse(40, 52, 7, 12));
}
function carrot(a, root = 'orange', top = 'green') {
  [[-26, -20], [0, 0], [26, 20]].forEach(([x, r]) => a.at({ x, y: -96, r }, (c) => c.region(blob([[-18, 20], [-12, -50], [0, -84], [12, -50], [18, 20]], 1), top, 'carrot top')));
  a.region('M-60 -100C-70 -40 -30 60 0 150C30 60 70 -40 60 -100C30 -116 -30 -116 -60 -100Z', root, 'carrot');
  a.line('M-40 -40h22M18 -10h24M-28 30h18M12 70h14', 3);
  face(a, 0, -60, 1.2, 30);
}
function backpack(a, bag = 'blue', pocket = 'red', straps = 'yellow', zip = 'grey') {
  a.region('M-62 -150C-62 -216 62 -216 62 -150L36 -150C36 -184 -36 -184 -36 -150Z', straps, 'handle');
  a.region(rrect(-130, -60, 34, 160, 14), straps, 'strap'); a.region(rrect(96, -60, 34, 160, 14), straps, 'strap');
  a.region(rrect(-110, -160, 220, 300, 50), bag, 'backpack');
  a.region(rrect(-80, 30, 160, 90, 20), pocket, 'pocket');
  a.region(rrect(-60, 18, 120, 24, 8), zip, 'zip');
  a.region(rrect(-80, -124, 160, 26, 10), zip, 'top zip');
}
function sundae(a, glass = 'none', s1 = 'pink', s2 = 'yellow', s3 = 'brown', cream = 'none', cherry = 'red', wafer = 'orange') {
  a.region(poly([[-26, 90], [26, 90], [40, 130], [-40, 130]], 6), glass, 'glass foot');
  a.region(rrect(-12, 30, 24, 70, 6), glass, 'glass stem');
  a.region('M-120 -30H120Q110 40 0 50Q-110 40 -120 -30Z', glass, 'glass bowl');
  a.region(circle(-56, -40, 44), s1, 'scoop'); a.region(circle(56, -40, 44), s2, 'scoop');
  a.region(circle(0, -84, 46), s3, 'scoop');
  a.at({ x: 70, y: -100, r: 24 }, (c) => c.region(rrect(-14, -70, 28, 90, 6), wafer, 'wafer'));
  a.region('M-40 -126Q-50 -150 -20 -152Q-10 -176 14 -164Q40 -170 40 -144Q56 -126 30 -120Q0 -112 -40 -126Z', cream, 'cream');
  a.region(circle(0, -176, 20), cherry, 'cherry'); a.line(curve([[0, -196], [8, -214], [24, -220]]), 3);
}
function mug(a, cup = 'red', drink = 'brown', cream = 'none', dots = 'yellow') {
  a.region('M90 -30C150 -30 150 60 90 60L90 38C122 38 122 -8 90 -8Z', cup, 'handle');
  a.region(rrect(-100, -60, 200, 170, 26), cup, 'mug');
  a.region(ellipse(0, -60, 100, 22), drink, 'cocoa');
  a.region(bumpsCream(), cream, 'cream');
  [[-50, 20], [0, 60], [50, 20]].forEach(([x, y]) => a.region(circle(x, y, 16), dots, 'dot'));
  a.line('M-40 -110q-12 -24 0 -44M0 -120q-12 -24 0 -44M40 -110q-12 -24 0 -44', 3);
}
function bumpsCream() { return 'M-60 -66Q-70 -96 -40 -96Q-30 -120 0 -110Q30 -124 40 -98Q70 -96 60 -66Z'; }

const RAW = { doghouse, treasureChest, cherries, carrot, backpack, sundae, mug };
const OUT = { RAW };
for (const [k, fn] of Object.entries(RAW)) OUT[k] = (a, ...args) => a.group(k, () => fn(a, ...args));
module.exports = OUT;
