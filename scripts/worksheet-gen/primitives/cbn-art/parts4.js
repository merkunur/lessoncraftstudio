/**
 * cbn-art/parts4.js — Color by Number parts, batch 3 (2026-10-05): sheep, airplane, unicorn, parrot, bus,
 * lighthouse, pineapple, gift box, teapot + cup, monkey, dolphin. Conventions as parts.js; every object is ONE
 * group at export (lib/cbn-render.js checkSolid). Side-by-side legs OVERLAP in pairs (a gap between them leaves a
 * sliver of background in a scene); detail lines never run from outline to outline (they would cut a part up).
 */
'use strict';
const { circle, ellipse, rrect, blob, curve, poly, bumps } = require('./core.js');
const { eye, smile, face } = require('./parts.js');

function sheep(a, wool = 'none', face_ = 'grey', legs = 'black') {
  [[-60, 26], [-42, 30], [22, 30], [40, 26]].forEach(([x, y]) => a.region(rrect(x, y, 24, 64, 10), legs, 'leg'));
  a.region(bumps(0, 0, 96, 64, 11, 0.45), wool, 'wool');
  a.region(ellipse(80, -46, 24, 14), face_, 'ear');
  a.region(ellipse(112, -24, 36, 44), face_, 'sheep face');
  a.region(bumps(108, -64, 30, 16, 6, 0.45, 0.2), wool, 'wool tuft');
  eye(a, 104, -28, 1.05); eye(a, 128, -28, 1.05);
  smile(a, 118, 0, 8, 4);
}
function airplane(a, body = 'red', wing = 'blue', win = 'lightblue', tail = 'yellow') {
  a.region(poly([[-130, -8], [-150, -80], [-112, -80], [-80, -10]], 8), tail, 'tail fin');
  a.region(blob([[-160, -4], [-120, -36], [60, -40], [136, -30], [172, -8], [178, 8], [150, 28], [-100, 30]], 1), body, 'plane body');   // a rounded nose (it ended flat)
  a.region(blob([[108, -28], [144, -22], [158, -4], [116, -2]], 1), win, 'cockpit window');
  [-90, -50, -10, 30, 70].forEach((x) => a.region(circle(x, -8, 13), win, 'window'));
  a.region(poly([[-30, 10], [40, 10], [-10, 84], [-50, 84]], 8), wing, 'wing');
}
function unicorn(a, body = 'none', mane = ['pink', 'purple', 'blue'], horn = 'yellow', hoof = 'purple') {
  [[-74, 22], [-52, 26], [36, 26], [58, 22]].forEach(([x, y]) => { a.region(rrect(x - 12, y, 26, 86, 11), body, 'leg'); a.region(rrect(x - 13, y + 76, 28, 22, 8), hoof, 'hoof'); });
  a.region(blob([[-94, -20], [-140, -10], [-160, 40], [-150, 80], [-120, 54], [-110, 16]], 1), mane[0], 'tail');
  a.region(blob([[-100, -10], [-150, 30], [-140, 70], [-118, 34]], 1), mane[1], 'tail');
  a.region(ellipse(-8, 0, 96, 56), body, 'unicorn body');
  a.region(poly([[40, -10], [70, -120], [124, -110], [92, 10]], 18), body, 'neck');
  a.region(blob([[60, -150], [110, -168], [168, -132], [176, -100], [150, -82], [90, -96]], 1), body, 'unicorn head');
  a.region(poly([[92, -162], [114, -246], [132, -158]], 6), horn, 'horn');   // no spiral lines: they cut the horn into crumbs
  a.region(poly([[78, -158], [84, -196], [104, -160]], 6), body, 'ear');
  // a rainbow mane down the neck: three locks, each its own colour, overlapping (one piece with the neck)
  [[62, -150, 0], [48, -110, 1], [40, -66, 2]].forEach(([x, y, i]) => a.region(blob([[x + 22, y - 26], [x - 26, y - 20], [x - 34, y + 22], [x + 6, y + 30], [x + 26, y + 6]], 1), mane[i], 'mane'));
  eye(a, 132, -126, 1.2);
  a.region(ellipse(148, -100, 15, 11), 'pink', 'cheek');
  smile(a, 160, -92, 6, 3);
}
function parrot(a, body = 'red', wing = 'blue', wing2 = 'green', tail = 'yellow', beak = 'none', feet = true) {
  a.region(blob([[-14, 60], [-40, 160], [-20, 168], [10, 70]], 1), tail, 'tail feather');
  a.region(blob([[0, 60], [4, 170], [26, 164], [24, 62]], 1), wing, 'tail feather');
  a.region(blob([[-46, -40], [-10, -110], [44, -96], [56, -20], [36, 60], [-24, 70], [-52, 20]], 1), body, 'parrot body');
  a.region(blob([[-40, -20], [12, -30], [30, 30], [4, 70], [-36, 50]], 1), wing, 'wing');
  a.region(blob([[-34, 20], [8, 22], [10, 62], [-24, 60]], 1), wing2, 'wing tip');
  a.region(circle(14, -66, 22), 'none', 'eye patch');
  eye(a, 14, -66, 1.15);
  a.region(blob([[36, -82], [70, -76], [74, -46], [56, -30], [40, -46]], 1), beak, 'beak');
  a.line(curve([[40, -58], [58, -56], [68, -48]]), 2.4);
  if (feet) [-14, 14].forEach((x) => a.line(`M${x} 74v12m-10 6l10 -6l10 6`, 4));   // the feet start BELOW the body: a line into it would cut it
  // feet that GRIP a branch (2026-10-05: the parrot hung in front of its branch with no feet): two clawed feet over it
  if (feet === 'grip') [-18, 18].forEach((x) => a.region(blob([[x - 15, 62], [x + 15, 62], [x + 17, 82], [x + 8, 92], [x, 84], [x - 8, 92], [x - 17, 82]], 0.9), 'grey', 'foot'));
}
function bus(a, body = 'yellow', win = 'lightblue', stripe = 'red', tyre = 'black', hub = 'grey', light = 'orange') {
  // 2026-10-05: the door runs floor to roof AHEAD of the front wheel (it ran down behind the wheel), the headlight sits
  // ON the body, and the bus has a windscreen at its front
  a.region(rrect(-170, -96, 340, 144, 26), body, 'bus body');
  a.region('M-170 -4H170V22Q170 48 144 48H-144Q-170 48 -170 22Z', stripe, 'stripe');   // down to the floor: no yellow crumbs between the wheels
  [-150, -96, -42].forEach((x) => a.region(rrect(x, -78, 44, 44, 8), win, 'window'));
  a.region(rrect(14, -78, 50, 120, 8), win, 'door');
  a.line('M39 -78V42', 2.6);
  a.region(rrect(92, -78, 62, 50, 10), win, 'windscreen');
  a.region(circle(150, 10, 10), light, 'light');
  [-104, 112].forEach((x) => { a.region(circle(x, 56, 34), tyre, 'tyre'); a.region(circle(x, 56, 14), hub, 'hubcap'); });
}
function lighthouse(a, wall = 'none', band = 'red', roof = 'red', lamp = 'yellow', door = 'blue') {
  // the tower as five horizontal bands, alternating
  const ys = [-100, -50, 0, 50, 100, 150], xAt = (y) => 36 + (y + 100) * 0.12;
  for (let i = 0; i < 5; i++) { const y0 = ys[i], y1 = ys[i + 1]; a.region(`M${-xAt(y0)} ${y0}L${xAt(y0)} ${y0}L${xAt(y1)} ${y1}L${-xAt(y1)} ${y1}Z`, i % 2 ? band : wall, 'tower band'); }
  a.region(rrect(-30, 96, 28 * 2, 54, 26), door, 'door');
  a.region(rrect(-52, -116, 104, 20, 6), band, 'balcony');
  a.region(rrect(-30, -170, 60, 56, 6), lamp, 'lamp room');
  a.line('M-10 -170V-116M10 -170V-116', 2.6);
  a.region(poly([[-46, -168], [0, -214], [46, -168]], 6), roof, 'lighthouse roof');
  a.line('M-60 -142L-90 -150M-60 -130L-94 -122M60 -142L90 -150M60 -130L94 -122', 3);
}
function pineapple(a, fruit = 'yellow', leaves = 'green') {
  // three wide leaves, fanned (five thin ones left crumbs between them)
  [[-24, -30], [0, 0], [24, 30]].forEach(([x, r]) => a.at({ x, y: -70, r }, (c) => c.region(blob([[-24, 30], [-16, -40], [0, -76], [16, -40], [24, 30]], 1), leaves, 'leaf')));
  a.region(ellipse(0, 50, 72, 100), fruit, 'pineapple');
  // an even, staggered pattern of crosses, all clear of the outline (they crowded and overlapped at the top) — 2026-10-05
  [[-24, 0], [24, 0], [-40, 40], [0, 40], [40, 40], [-24, 80], [24, 80], [0, 120]].forEach(([x, y]) => a.line(`M${x - 9} ${y - 9}L${x + 9} ${y + 9}M${x + 9} ${y - 9}L${x - 9} ${y + 9}`, 2.4));
}
function giftBox(a, box = 'blue', ribbon = 'red', lid = 'blue') {
  a.region(blob([[0, -96], [-70, -150], [-86, -112], [-30, -90]], 1), ribbon, 'bow loop');
  a.region(blob([[0, -96], [70, -150], [86, -112], [30, -90]], 1), ribbon, 'bow loop');
  a.region(rrect(-104, -64, 208, 170, 10), box, 'box');
  a.region(rrect(-118, -96, 236, 44, 10), lid, 'lid');
  a.region(rrect(-20, -96, 40, 202, 4), ribbon, 'ribbon');
  a.region(circle(0, -98, 20), ribbon, 'bow knot');
  a.region(circle(-56, 16, 19), 'yellow', 'spot'); a.region(circle(56, 64, 19), 'yellow', 'spot'); a.region(circle(58, -10, 17), 'yellow', 'spot'); a.region(circle(-58, 72, 17), 'yellow', 'spot');
}
function teapot(a, pot = 'pink', lid = 'purple', cup = 'lightblue', saucer = 'purple', dots = 'yellow') {
  a.region('M-96 -24C-166 -24 -166 74 -96 74L-96 52C-140 52 -140 -2 -96 -2Z', pot, 'handle');   // a thick C that runs INTO the pot (the thin one did not touch it)
  a.region(blob([[82, 10], [130, -40], [150, -40], [140, -24], [104, 40]], 1), pot, 'spout');
  a.region(blob([[-110, 30], [-100, -40], [0, -60], [100, -40], [110, 30], [70, 90], [-70, 90]], 1), pot, 'teapot');
  a.region(ellipse(0, -60, 70, 18), lid, 'lid');
  a.region(circle(0, -84, 14), lid, 'knob');
  [[-50, 10], [0, 30], [50, 10]].forEach(([x, y]) => a.region(circle(x, y, 15), dots, 'dot'));
  a.region(ellipse(0, 96, 120, 14), saucer, 'stand');
  face(a, 0, -20, 1.1, 30);
}
function monkey(a, fur = 'brown', face_ = 'orange', banana = 'yellow') {
  a.region('M60 70C110 80 130 30 112 -10C104 -26 88 -18 96 -2C110 30 92 56 60 52Z', fur, 'tail');
  a.region(ellipse(-30, 92, 28, 18), fur, 'foot'); a.region(ellipse(30, 92, 28, 18), fur, 'foot');
  a.region(ellipse(0, 40, 62, 62), fur, 'monkey body');
  a.region(ellipse(0, 50, 38, 40), face_, 'tummy');
  a.region(blob([[50, 10], [92, -24], [104, -6], [64, 34]], 1), fur, 'arm');
  a.region(circle(102, -12, 17), fur, 'hand');
  // the banana stands up OUT of the hand, in front (behind the arm it was hidden)
  a.region(blob([[94, -22], [98, -72], [118, -108], [134, -102], [124, -72], [112, -20]], 1), banana, 'banana');
  a.region(blob([[-50, 10], [-80, 40], [-60, 60], [-30, 40]], 1), fur, 'arm');
  a.region(circle(-66, -60, 30), fur, 'ear'); a.region(circle(66, -60, 30), fur, 'ear');
  a.region(circle(-68, -60, 14), face_, 'inner ear'); a.region(circle(68, -60, 14), face_, 'inner ear');
  a.region(circle(0, -60, 58), fur, 'monkey head');
  // two round lobes over the eyes and only a shallow dip between them (a deep V read as an angry brow) — 2026-10-05
  a.region(blob([[-48, -66], [-38, -90], [-16, -98], [0, -95], [16, -98], [38, -90], [48, -66], [40, -24], [0, -10], [-40, -24]], 1), face_, 'face');
  eye(a, -18, -66, 1.15); eye(a, 18, -66, 1.15);
  a.ink(ellipse(-6, -44, 3, 2.4)); a.ink(ellipse(6, -44, 3, 2.4));
  smile(a, 0, -32, 12, 6);
}
function dolphin(a, body = 'blue', belly = 'lightblue') {
  a.region(blob([[-120, 10], [-170, -30], [-176, -6], [-150, 8], [-170, 34], [-144, 40]], 1), body, 'tail');
  a.region(blob([[-10, -50], [10, -96], [40, -56]], 1), body, 'fin');
  // the flipper hangs below the body, behind it (it was pasted across the white belly) — 2026-10-05
  a.region(blob([[-4, 30], [-26, 80], [12, 74], [24, 34]], 1), body, 'flipper');
  a.region(blob([[-130, 14], [-60, -50], [60, -60], [130, -30], [176, -16], [176, 0], [120, 8], [60, 40], [-60, 40]], 1), body, 'dolphin body');
  a.region(blob([[-60, 24], [20, 10], [120, 6], [70, 32], [-20, 40]], 1), belly, 'belly');
  eye(a, 96, -24, 1.2); smile(a, 146, -4, 12, 4);
}

const RAW = { sheep, airplane, unicorn, parrot, bus, lighthouse, pineapple, giftBox, teapot, monkey, dolphin };
const OUT = { RAW };
for (const [k, fn] of Object.entries(RAW)) OUT[k] = (a, ...args) => a.group(k, () => fn(a, ...args));
module.exports = OUT;
