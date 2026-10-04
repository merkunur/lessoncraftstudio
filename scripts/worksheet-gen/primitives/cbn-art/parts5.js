/**
 * cbn-art/parts5.js — Color by Number parts, batch 4 (2026-10-05): bear, fox, pony, tractor, helicopter, baby
 * dragon, mushroom house, flower vase, sunflower, starfish, beach ball, bucket + spade. Conventions as parts.js;
 * every object is ONE group at export (checkSolid). Legs side by side OVERLAP in pairs; detail lines stop short of
 * outlines; thin things (rotor blades, handles) are ink.
 */
'use strict';
const { circle, ellipse, rrect, blob, curve, poly, star } = require('./core.js');
const { eye, smile, face } = require('./parts.js');

function bear(a, fur = 'brown', muzzle = 'orange', inner = 'orange') {
  [[-70, 20], [-50, 24], [34, 24], [54, 20]].forEach(([x, y]) => a.region(rrect(x, y, 30, 66, 13), fur, 'leg'));
  a.region(circle(-104, -14, 16), fur, 'tail');
  a.region(ellipse(-6, 0, 102, 64), fur, 'bear body');
  a.region(circle(58, -98, 29), fur, 'ear'); a.region(circle(52, -104, 15), inner, 'inner ear');
  a.region(circle(96, -40, 58), fur, 'bear head');
  a.region(ellipse(128, -22, 32, 24), muzzle, 'muzzle');
  a.ink(ellipse(146, -30, 9, 7));
  eye(a, 102, -56, 1.2);
  a.line(curve([[124, -10], [136, -4], [148, -10]]), 2.6);
}
function fox(a, fur = 'orange', white = 'none', dark = 'black') {
  // sitting, facing us (the side-sitting first draft read as loose blobs): bushy tail round one side, white bib,
  // black socks, pointed ears with dark insides, a white muzzle mask
  a.region(blob([[36, 70], [100, 70], [140, 20], [132, -40], [104, -30], [100, 24], [60, 44]], 1), fur, 'tail');
  a.region(blob([[132, -40], [146, -10], [130, 12], [104, -10], [104, -30]], 1), white, 'tail tip');
  a.region(blob([[-62, 96], [-66, 24], [-36, -26], [36, -26], [66, 24], [62, 96]], 0.9), fur, 'fox body');
  a.region(blob([[-34, -20], [34, -20], [30, 50], [0, 70], [-30, 50]], 1), white, 'bib');
  a.region(ellipse(-24, 98, 26, 15), dark, 'paw'); a.region(ellipse(24, 98, 26, 15), dark, 'paw');
  a.region(poly([[-70, -76], [-62, -164], [-6, -112]], 9), fur, 'ear'); a.region(poly([[70, -76], [62, -164], [6, -112]], 9), fur, 'ear');
  a.region(poly([[-56, -98], [-54, -140], [-26, -114]], 5), dark, 'inner ear'); a.region(poly([[56, -98], [54, -140], [26, -114]], 5), dark, 'inner ear');
  a.region(blob([[-76, -60], [-50, -110], [0, -120], [50, -110], [76, -60], [40, -20], [0, -12], [-40, -20]], 1), fur, 'fox head');
  a.region(blob([[-60, -54], [-20, -62], [0, -48], [20, -62], [60, -54], [30, -18], [0, -10], [-30, -18]], 1), white, 'muzzle');
  eye(a, -24, -78, 1.25); eye(a, 24, -78, 1.25);
  a.ink(ellipse(0, -46, 9, 7)); a.line(curve([[-10, -30], [0, -24], [10, -30]]), 2.6);
}
function pony(a, coat = 'brown', mane = 'black', hoof = 'grey') {
  [[-74, 22], [-52, 26], [36, 26], [58, 22]].forEach(([x, y]) => { a.region(rrect(x - 12, y, 26, 86, 11), coat, 'leg'); a.region(rrect(x - 13, y + 76, 28, 22, 8), hoof, 'hoof'); });
  a.region(blob([[-94, -20], [-140, -6], [-156, 50], [-140, 90], [-118, 54], [-110, 16]], 1), mane, 'tail');
  a.region(ellipse(-8, 0, 96, 56), coat, 'pony body');
  a.region(poly([[40, -10], [70, -120], [124, -110], [92, 10]], 18), coat, 'neck');
  a.region(blob([[60, -150], [110, -168], [168, -132], [176, -100], [150, -82], [90, -96]], 1), coat, 'pony head');
  a.region(poly([[74, -156], [84, -204], [112, -160]], 7), coat, 'ear');
  // the mane follows the back of the neck (a loose flap looked like hair falling off)
  a.region(blob([[96, -166], [60, -156], [40, -110], [26, -40], [46, -30], [62, -100], [80, -140]], 1), mane, 'mane');
  eye(a, 132, -126, 1.2);
  a.ink(ellipse(166, -104, 4, 3)); smile(a, 158, -92, 6, 3);
}
function tractor(a, body = 'red', tyre = 'black', hub = 'yellow', win = 'lightblue', pipe = 'grey') {
  a.region(rrect(36, -150, 22, 70, 6), pipe, 'exhaust');
  a.region(rrect(-110, -150, 110, 120, 12), body, 'cab');
  a.region(rrect(-92, -132, 74, 64, 8), win, 'window');
  a.region(rrect(-20, -86, 160, 80, 16), body, 'hood');
  a.region(rrect(116, -70, 26, 22, 6), 'yellow', 'light');
  a.region(rrect(-50, -40, 200, 46, 12), body, 'tractor body');   // starts at the big wheel: left of it was a sliver
  a.region(circle(-76, 30, 70), tyre, 'big wheel'); a.region(circle(-76, 30, 30), hub, 'hub');
  a.region(circle(104, 52, 46), tyre, 'small wheel'); a.region(circle(104, 52, 20), hub, 'hub');
}
function helicopter(a, body = 'blue', glass = 'lightblue', tail = 'blue', rotor = 'grey', stripe = 'yellow') {
  a.line('M-150 -96H150', 8); a.region(rrect(-18, -110, 36, 30, 8), rotor, 'rotor hub');
  a.line('M-40 70V96M40 70V96M-90 100H90', 7);
  a.region(poly([[-60, -20], [-210, -6], [-210, 14], [-60, 30]], 6), tail, 'tail');
  a.region(blob([[-220, -40], [-196, -44], [-190, 6], [-216, 10]], 1), stripe, 'tail fin');
  a.region(blob([[-90, 10], [-60, -60], [40, -84], [120, -40], [130, 30], [60, 70], [-60, 64]], 1), body, 'helicopter body');
  a.region(blob([[30, -70], [110, -38], [120, 14], [60, 10], [30, -20]], 1), glass, 'cockpit');
  a.region(rrect(-70, 10, 110, 26, 6), stripe, 'stripe');
}
function dragon(a, skin = 'green', belly = 'yellow', wing = 'purple', spikes = 'orange', cheek = 'pink') {
  a.region(blob([[-60, 40], [-150, 50], [-190, 10], [-170, -6], [-130, 26], [-60, 10]], 1), skin, 'tail');
  a.region(poly([[-204, 14], [-180, -38], [-150, 10]], 6), spikes, 'tail tip');
  a.region(blob([[-30, -40], [-110, -130], [-40, -110], [-10, -150], [20, -70]], 1), wing, 'wing');
  [[-78, -34, -34], [-36, -60, -12]].forEach(([x, y, r]) => a.at({ x, y, r }, (c) => c.region(poly([[-24, 16], [0, -34], [24, 16]], 6), spikes, 'spike')));
  a.region(ellipse(-20, 20, 76, 70), skin, 'dragon body');
  a.region(ellipse(-4, 34, 44, 50), belly, 'belly');
  a.line('M-30 14h40M-34 40h48M-30 66h40', 2.4);
  a.region(ellipse(-44, 88, 34, 19), skin, 'foot'); a.region(ellipse(14, 90, 34, 19), skin, 'foot');   // the feet overlap: no sliver of body between them
  a.region(blob([[30, -20], [64, 10], [80, 4], [52, -36]], 1), skin, 'arm');
  a.region(poly([[16, -100], [4, -170], [58, -118]], 8), belly, 'horn'); a.region(poly([[62, -116], [84, -180], [110, -108]], 8), belly, 'horn');
  a.region(blob([[0, -60], [20, -116], [90, -124], [136, -86], [130, -40], [80, -24], [20, -30]], 1), skin, 'dragon head');
  a.region(ellipse(62, -54, 17, 12), cheek, 'cheek');
  eye(a, 74, -86, 1.3);
  a.ink(ellipse(122, -78, 3.5, 3)); smile(a, 104, -50, 12, 6);
}
function mushroomHouse(a, cap = 'red', wall = 'yellow', door = 'brown', win = 'lightblue', dots = 'none') {
  a.region(blob([[-106, 130], [-102, 0], [102, 0], [106, 130]], 0.6), wall, 'house wall');   // wide: the wall beside each window has room
  a.region('M-34 130V64A34 34 0 0 1 34 64V130Z', door, 'door'); a.ink(circle(20, 98, 4));
  a.region(circle(-60, 56, 19), win, 'window'); a.region(circle(60, 56, 19), win, 'window');
  a.region('M-170 20C-170 -100 -80 -160 0 -160C80 -160 170 -100 170 20C110 34 -110 34 -170 20Z', cap, 'cap');
  [[-110, -40, 22], [-30, -100, 26], [60, -80, 22], [118, -20, 18], [0, -20, 20], [-70, -2, 16]].forEach(([x, y, r]) => a.region(circle(x, y, r), dots, 'dot'));
}
function flowerVase(a, vase = 'blue', table = 'brown', f1 = 'red', f2 = 'yellow', f3 = 'purple', centre = 'orange', leaf = 'green') {
  a.line('M-60 -40C-50 0 -20 30 -10 60M0 -90V60M60 -40C50 0 20 30 10 60', 6);
  a.region(blob([[-14, 30], [-60, -6], [-70, 20], [-30, 40]], 1), leaf, 'leaf'); a.region(blob([[14, 20], [60, -10], [72, 14], [30, 34]], 1), leaf, 'leaf');
  // tulip, daisy, round flower
  a.region('M-92 -60L-90 -100L-74 -80L-60 -104L-46 -80L-30 -100L-28 -60Q-60 -24 -92 -60Z', f1, 'tulip');
  for (let i = 0; i < 8; i++) { const t = i * Math.PI / 4; a.region(ellipse(Math.cos(t) * 30, -110 + Math.sin(t) * 30, 17, 17), f2, 'petal'); }
  a.region(circle(0, -110, 20), centre, 'flower centre');
  a.region(circle(62, -60, 34), f3, 'round flower'); a.region(circle(62, -60, 15), centre, 'flower centre');
  a.region('M-60 40H60Q70 90 50 140Q0 160 -50 140Q-70 90 -60 40Z', vase, 'vase');
  a.region(rrect(-70, 34, 140, 22, 8), vase, 'vase rim');
  a.region(rrect(-150, 140, 300, 30, 10), table, 'table');
}
function sunflower(a, petals = 'yellow', centre = 'brown', stem = 'green', pot = 'orange', n = 12) {
  a.region(rrect(-12, -40, 24, 210, 8), stem, 'stem');
  a.region(blob([[6, 60], [70, 20], [96, 40], [50, 80], [10, 84]], 1), stem, 'leaf'); a.region(blob([[-6, 100], [-70, 60], [-96, 80], [-50, 120], [-10, 124]], 1), stem, 'leaf');
  for (let i = 0; i < n; i++) { const t = i * 2 * Math.PI / n; a.at({ x: Math.cos(t) * 62, y: -90 + Math.sin(t) * 62, r: i * 360 / n + 90 }, (c) => c.region(ellipse(0, 0, n > 10 ? 18 : 24, 34), petals, 'petal')); }
  a.region(circle(0, -90, 52), centre, 'sunflower centre');
  [[-20, -106], [0, -112], [20, -106], [-28, -86], [28, -86], [-14, -72], [14, -72], [0, -90]].forEach(([x, y]) => a.ink(circle(x, y, 3)));
  if (pot) { a.region(poly([[-70, 160], [70, 160], [56, 250], [-56, 250]], 8), pot, 'pot'); a.region(rrect(-82, 140, 164, 30, 10), pot, 'pot rim'); }
}
function starfish(a, c = 'orange') {
  a.region(star(0, 0, 80, 40, 5, -90, 14), c, 'starfish');
  face(a, 0, -4, 1.2, 28);
  [[0, -50], [44, -14], [28, 40], [-28, 40], [-44, -14]].forEach(([x, y]) => a.ink(circle(x, y, 3.5)));
}
function beachBall(a, cols = ['red', 'yellow', 'blue', 'green']) {
  const R = 70;
  for (let i = 0; i < 6; i++) { const t0 = (i * 60 - 90) * Math.PI / 180, t1 = ((i + 1) * 60 - 90) * Math.PI / 180;
    a.region(`M0 0L${(R * Math.cos(t0)).toFixed(1)} ${(R * Math.sin(t0)).toFixed(1)}A${R} ${R} 0 0 1 ${(R * Math.cos(t1)).toFixed(1)} ${(R * Math.sin(t1)).toFixed(1)}Z`, i % 2 ? 'none' : cols[(i / 2) % cols.length], 'ball panel'); }
  a.region(circle(0, 0, 18), cols[3] || cols[0], 'ball cap');
}
function bucket(a, pail = 'blue', band = 'yellow', spade = 'red') {
  a.line('M-58 -40C-58 -110 58 -110 58 -40', 5);
  a.region(poly([[-66, -40], [66, -40], [50, 80], [-50, 80]], 8), pail, 'bucket');
  a.region(poly([[-62, -12], [62, -12], [59, 14], [-59, 14]], 2), band, 'band');
  a.at({ x: 90, y: 0, r: 18 }, (c) => { c.region(rrect(-11, -110, 22, 110, 9), spade, 'spade handle'); c.region('M-34 -10H34L28 50Q0 80 -28 50Z', spade, 'spade'); });
}

const RAW = { bear, fox, pony, tractor, helicopter, dragon, mushroomHouse, flowerVase, sunflower, starfish, beachBall, bucket };
const OUT = { RAW };
for (const [k, fn] of Object.entries(RAW)) OUT[k] = (a, ...args) => a.group(k, () => fn(a, ...args));
module.exports = OUT;
