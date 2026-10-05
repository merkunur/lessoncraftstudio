/**
 * cbn-art/parts9.js — Color by Number parts, batch 8 (2026-10-05): mouse, cheese, squirrel, acorn, bird, birdhouse,
 * jellyfish, submarine, crocodile, beehive, dump truck. Conventions as parts.js; every object is ONE group
 * (checkSolid). Paired legs overlap; detail lines stop short of outlines; thin things are ink.
 */
'use strict';
const { circle, ellipse, rrect, blob, curve, poly } = require('./core.js');
const { eye, smile, face } = require('./parts.js');

function mouse(a, fur = 'grey', inner = 'pink', belly = 'none') {
  a.line(curve([[-60, 70], [-110, 70], [-130, 40], [-120, 10]]), 4);
  a.region(ellipse(-28, 96, 32, 18), inner, 'foot'); a.region(ellipse(28, 96, 32, 18), inner, 'foot');
  a.region(blob([[-64, 90], [-66, 20], [-36, -26], [36, -26], [66, 20], [64, 90]], 0.9), fur, 'mouse body');
  a.region(ellipse(0, 50, 32, 36), belly, 'tummy');
  a.region(circle(-56, -100, 40), fur, 'ear'); a.region(circle(56, -100, 40), fur, 'ear');
  a.region(circle(-58, -102, 20), inner, 'inner ear'); a.region(circle(58, -102, 20), inner, 'inner ear');
  a.region(ellipse(0, -56, 60, 52), fur, 'mouse head');
  eye(a, -22, -64, 1.2); eye(a, 22, -64, 1.2);
  a.region(circle(0, -40, 11), inner, 'nose');
  smile(a, 0, -26, 10, 5);
}
function cheese(a, c = 'yellow') {
  // one wedge with two big holes (a thin top strip and small holes were too fiddly)
  a.region('M-86 44L-86 -10L84 -64L86 44Z', c, 'cheese');
  [[-40, 10, 20], [36, 0, 20]].forEach(([x, y, r]) => a.region(circle(x, y, r), 'orange', 'hole'));
}
function squirrel(a, fur = 'orange', belly = 'yellow', nut = 'brown') {
  a.region('M-40 80C-140 80 -150 -40 -110 -120C-90 -150 -50 -140 -60 -110C-90 -40 -60 20 -10 40Z', fur, 'tail');
  a.region(blob([[-50, 90], [-56, 20], [-30, -24], [30, -24], [56, 20], [50, 90]], 0.9), fur, 'squirrel body');
  a.region(ellipse(4, 44, 28, 38), belly, 'belly');
  a.region(ellipse(-28, 96, 26, 14), fur, 'foot'); a.region(ellipse(28, 96, 26, 14), fur, 'foot');
  a.region(poly([[-46, -90], [-40, -146], [-8, -100]], 8), fur, 'ear'); a.region(poly([[46, -90], [40, -146], [8, -100]], 8), fur, 'ear');
  a.region(ellipse(0, -60, 56, 48), fur, 'squirrel head');
  a.region(ellipse(0, -40, 26, 18), belly, 'muzzle');
  eye(a, -20, -68, 1.15); eye(a, 20, -68, 1.15);
  a.ink(ellipse(0, -46, 7, 5)); smile(a, 0, -34, 7, 3);
  acornAt(a, 0, 14, nut);
}
function acornAt(a, x, y, c) {
  a.region(ellipse(x, y + 10, 22, 26), c, 'acorn');
  a.region(`M${x - 30} ${y + 4}Q${x - 30} ${y - 34} ${x} ${y - 34}Q${x + 30} ${y - 34} ${x + 30} ${y + 4}Z`, 'brown', 'acorn cap');
}
function acorn(a, nut = 'orange', cap = 'brown') {
  a.line('M0 -80Q8 -100 20 -104', 6);
  // a pointed nut under a scaly cap (a round nut under a smooth cap read as a mushroom)
  a.region(blob([[-62, -24], [62, -24], [78, 30], [60, 82], [18, 112], [0, 122], [-18, 112], [-60, 82], [-78, 30]], 1), nut, 'acorn');   // an egg-shaped nut under a wider cap (a narrow point read as a cone, a flat top as a pot)
  a.region('M-86 -10Q-90 -96 0 -96Q90 -96 86 -10Q0 6 -86 -10Z', cap, 'acorn cap');
  a.line('M-60 -50q14 10 28 0M-14 -56q14 10 28 0M32 -50q14 10 28 0M-40 -26q14 10 28 0M12 -26q14 10 28 0', 2.4);
  face(a, 0, 34, 1.3, 34);
}
function bird(a, body = 'blue', belly = 'orange', wing = 'lightblue', beak = 'yellow') {
  a.region(blob([[-60, 0], [-118, -30], [-112, 10], [-70, 26]], 1), body, 'tail');
  a.line('M-10 60V84M18 60V84M-20 88L-10 84L0 88M8 88L18 84L28 88', 4);
  a.region(ellipse(0, 0, 70, 62), body, 'bird body');
  a.region(ellipse(16, 20, 42, 36), belly, 'belly');
  a.region(blob([[-40, -10], [10, -6], [0, 36], [-40, 30]], 1), wing, 'wing');
  a.region(poly([[60, -20], [100, -8], [60, 6]], 5), beak, 'beak');
  eye(a, 36, -20, 1.2);
}
function birdhouse(a, wall = 'yellow', roof = 'red', hole = 'black', pole = 'brown') {
  a.region(rrect(-14, 80, 28, 160, 6), pole, 'pole');
  a.region(rrect(-80, -40, 160, 130, 10), wall, 'birdhouse');
  a.region(poly([[-104, -30], [0, -120], [104, -30]], 8), roof, 'roof');
  a.region(circle(0, 20, 26), hole, 'hole');
  a.region(rrect(-38, 52, 76, 22, 8), pole, 'perch');
}
function jellyfish(a, bell = 'pink', tentacles = ['purple', 'blue']) {
  const tc = Array.isArray(tentacles) ? tentacles : [tentacles];
  [-48, -16, 16, 48].forEach((x, i) => a.region(`M${x - 13} 0C${x - 22} 50 ${x + 6} 70 ${x - 6} 120L${x + 10} 120C${x + 22} 70 ${x - 4} 50 ${x + 13} 0Z`, tc[i % tc.length], 'tentacle'));
  a.region('M-90 10C-90 -100 90 -100 90 10C60 26 30 4 0 20C-30 4 -60 26 -90 10Z', bell, 'jellyfish');
  face(a, 0, -30, 1.3, 36);
}
function submarine(a, body = 'yellow', win = 'lightblue', fin = 'orange', prop = 'grey') {
  a.region(poly([[-170, -20], [-200, -50], [-200, 50], [-170, 20]], 6), prop, 'propeller');
  a.region(rrect(-30, -110, 70, 70, 14), body, 'tower');
  a.line('M20 -110V-150H50', 5);
  a.region(ellipse(0, 0, 180, 80), body, 'submarine');
  [-90, -10, 70].forEach((x) => a.region(circle(x, 0, 26), win, 'window'));
  a.region(blob([[-140, 40], [-110, 60], [-120, 90], [-150, 70]], 1), fin, 'fin');
}
function crocodile(a, skin = 'green', belly = 'lightgreen', teeth = 'none') {
  a.region(blob([[-90, 10], [-180, 10], [-200, -10], [-100, -30]], 1), skin, 'tail');
  [[-70, 30], [-46, 34], [40, 34], [64, 30]].forEach(([x, y]) => a.region(rrect(x - 14, y, 30, 40, 12), skin, 'leg'));
  a.region(ellipse(0, 0, 110, 50), skin, 'crocodile body');
  a.region(ellipse(0, 26, 80, 18), belly, 'belly');
  [[-56, -42], [0, -50], [56, -42]].forEach(([x, y]) => a.region(poly([[x - 22, y + 14], [x, y - 22], [x + 22, y + 14]], 5), skin, 'bump'));
  a.region(blob([[90, -40], [210, -36], [230, -16], [210, 4], [96, 10]], 1), skin, 'snout');
  a.region(circle(110, -50, 26), skin, 'eye bump');
  eye(a, 112, -52, 1.2);
  a.line(curve([[120, -10], [170, -2], [220, -14]]), 3);
  a.ink(ellipse(214, -26, 4, 3));
}
function beehive(a, hive = 'yellow', branch = 'brown', door = 'brown', ownBranch = true) {
  a.line('M0 -150V-120', 6);
  if (ownBranch) a.region(rrect(-80, -160, 160, 26, 10), branch, 'branch');   // off when the scene draws the branch it hangs from
  [[0, -100, 54], [0, -50, 78], [0, 6, 92], [0, 62, 80]].forEach(([x, y, w]) => a.region(ellipse(x, y, w, 34), hive, 'hive ring'));
  a.region('M-26 90V60A26 26 0 0 1 26 60V90Z', door, 'door');
}
function dumpTruck(a, body = 'yellow', cab = 'orange', load = 'brown', tyre = 'black', hub = 'grey', win = 'lightblue') {
  a.region('M-170 -40L-150 -120L40 -120L40 -40Z', body, 'dump bed');
  a.region(blob([[-150, -110], [-110, -160], [-40, -170], [20, -140], [30, -110]], 0.8), load, 'load');
  a.region(rrect(36, -120, 124, 90, 16), cab, 'cab');   // butts against the bed: no slot of sky between them
  a.region(rrect(76, -104, 64, 46, 8), win, 'window');
  a.region(rrect(-180, -50, 350, 60, 12), body, 'truck body');
  [-110, 100].forEach((x) => { a.region(circle(x, 30, 40), tyre, 'tyre'); a.region(circle(x, 30, 16), hub, 'hubcap'); });
}

const RAW = { mouse, cheese, squirrel, acorn, bird, birdhouse, jellyfish, submarine, crocodile, beehive, dumpTruck };
const OUT = { RAW };
for (const [k, fn] of Object.entries(RAW)) OUT[k] = (a, ...args) => a.group(k, () => fn(a, ...args));
module.exports = OUT;
