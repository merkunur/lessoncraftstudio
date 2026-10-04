/**
 * cbn-art/parts8.js — Color by Number parts, batch 7 (2026-10-05): panda, koala, flamingo, seahorse, pizza slice,
 * gingerbread man, astronaut, UFO with alien, tent, campfire, bamboo. Conventions as parts.js; every object is ONE
 * group (checkSolid). Paired legs overlap; detail lines stop short of outlines; thin things are ink.
 */
'use strict';
const { circle, ellipse, rrect, blob, curve, poly, star } = require('./core.js');
const { eye, smile, face } = require('./parts.js');

function panda(a, white = 'none', black = 'black', snack = 'green') {
  a.region(ellipse(-40, 96, 32, 20), black, 'foot'); a.region(ellipse(40, 96, 32, 20), black, 'foot');
  a.region(ellipse(0, 40, 72, 68), white, 'panda body');
  a.region(blob([[-60, 0], [-96, 40], [-80, 66], [-46, 40]], 1), black, 'arm');
  a.region(blob([[60, 0], [96, 30], [84, 60], [46, 40]], 1), black, 'arm');
  a.at({ x: 92, y: 10, r: -20 }, (c) => c.region(rrect(-11, -80, 22, 120, 8), snack, 'bamboo'));
  a.region(circle(-56, -104, 26), black, 'ear'); a.region(circle(56, -104, 26), black, 'ear');
  a.region(ellipse(0, -60, 72, 60), white, 'panda head');
  a.region(blob([[-46, -82], [-18, -78], [-14, -50], [-38, -42], [-50, -62]], 1), black, 'eye patch');
  a.region(blob([[46, -82], [18, -78], [14, -50], [38, -42], [50, -62]], 1), black, 'eye patch');
  a.shine(circle(-30, -64, 6)); a.shine(circle(30, -64, 6)); a.shine(circle(-28, -66, 2.5));
  a.ink(ellipse(0, -36, 9, 6.5)); smile(a, 0, -24, 10, 5);
}
function bamboo(a, c = 'green', h = 300, segs = true) {
  a.region(rrect(-14, -h, 28, h, 8), c, 'bamboo stalk');
  if (segs) for (let y = -h + 70; y < -10; y += 70) a.line(`M-14 ${y}H14`, 3);   // segment lines cut the stalk into parts: off for level 1
  a.region(blob([[10, -h + 90], [60, -h + 60], [74, -h + 74], [24, -h + 110]], 1), c, 'bamboo leaf');
  a.region(blob([[-10, -h + 170], [-60, -h + 140], [-74, -h + 154], [-24, -h + 190]], 1), c, 'bamboo leaf');
}
function koala(a, fur = 'grey', inner = 'pink', nose = 'black') {
  a.region(ellipse(0, 40, 64, 72), fur, 'koala body');
  a.region(ellipse(0, 50, 36, 44), 'none', 'tummy');
  a.region(circle(-72, -80, 40), fur, 'ear'); a.region(circle(72, -80, 40), fur, 'ear');
  a.region(circle(-72, -80, 22), inner, 'inner ear'); a.region(circle(72, -80, 22), inner, 'inner ear');
  a.region(ellipse(0, -56, 74, 62), fur, 'koala head');
  a.region(ellipse(0, -44, 18, 26), nose, 'nose');
  eye(a, -34, -64, 1.2); eye(a, 34, -64, 1.2);
  a.region(blob([[-60, 20], [-100, 0], [-110, 30], [-70, 50]], 1), fur, 'arm'); a.region(blob([[60, 20], [100, 0], [110, 30], [70, 50]], 1), fur, 'arm');
}
function flamingo(a, pink = 'pink', beak = 'orange', tip = 'black') {
  a.line('M-6 60V150M-6 110L30 88', 6);   // the legs end IN the water
  a.region(blob([[-80, 0], [-30, -40], [60, -30], [86, 10], [40, 60], [-50, 50]], 1), pink, 'flamingo body');
  a.region(blob([[-60, 0], [-10, -20], [40, 0], [10, 30], [-40, 30]], 1), pink, 'wing');
  a.line(curve([[-40, 10], [-6, 6], [20, 16]]), 2.4);
  a.region('M60 -10C110 -50 40 -110 60 -160C70 -190 110 -190 116 -160L96 -156C92 -170 82 -170 80 -158C68 -116 136 -50 80 8Z', pink, 'neck');
  a.region(poly([[106, -170], [150, -150], [128, -128], [106, -148]], 6), beak, 'beak');
  a.region(poly([[126, -150], [156, -152], [142, -122], [124, -130]], 4), tip, 'beak tip');
  eye(a, 94, -168, 0.95);
}
function seahorse(a, body = 'orange', fin = 'yellow', belly = 'yellow') {
  // rebuilt from clean overlapping shapes (the first outline read poorly and its crest spikes sat loose on the head)
  a.region(blob([[-6, 70], [-40, 100], [-46, 140], [-16, 166], [24, 160], [36, 136], [16, 140], [-4, 134], [-10, 114], [14, 96]], 1), body, 'tail');
  a.region(blob([[60, -30], [96, -50], [104, -10], [70, 6]], 1), fin, 'fin');
  a.region(blob([[30, -70], [70, -30], [66, 30], [30, 90], [-10, 90], [-24, 40], [-10, -20], [0, -60]], 1), body, 'seahorse body');
  a.region(blob([[-4, -10], [22, -14], [26, 50], [6, 80], [-12, 40]], 1), belly, 'belly');
  a.line('M-2 10h20M2 34h18M4 58h12', 2.4);
  a.region(rrect(-92, -96, 80, 30, 14), body, 'snout');
  a.region(blob([[-10, -150], [10, -170], [30, -150], [40, -126], [20, -132], [0, -130]], 1), fin, 'crest');
  a.region(circle(10, -84, 50), body, 'seahorse head');
  eye(a, 10, -90, 1.25);
}
function pizza(a, crust = 'orange', cheese = 'yellow', topping = 'red', pepper = 'green') {
  a.region('M0 140L-150 -110Q0 -150 150 -110Z', cheese, 'pizza');
  a.region('M-158 -106Q0 -150 158 -106L150 -84Q0 -124 -150 -84Z', crust, 'crust');
  [[0, -60], [-50, -20], [50, -30], [0, 40]].forEach(([x, y]) => a.region(circle(x, y, 24), topping, 'pepperoni'));
  [[-70, -70, 30], [64, 10, -20], [8, 72, 10]].forEach(([x, y, r]) => a.at({ x, y, r }, (c) => c.region(ellipse(0, 0, 24, 15), pepper, 'pepper')));
}
function gingerbread(a, cookie = 'brown', buttons = 'red', bow = 'green', cheeks = 'pink') {
  a.region('M-40 -70C-40 -150 40 -150 40 -70L40 -60H96Q120 -60 120 -36Q120 -14 96 -14H50V60L84 120Q92 146 66 150Q44 150 36 124L0 74L-36 124Q-44 150 -66 150Q-92 146 -84 120L-50 60V-14H-96Q-120 -14 -120 -36Q-120 -60 -96 -60H-40Z', cookie, 'gingerbread man');
  a.line('M-104 -50q8 8 0 16M104 -50q-8 8 0 16M-70 126q8 8 16 4M70 126q-8 8 -16 4', 3.4);
  eye(a, -16, -108, 1.15); eye(a, 16, -108, 1.15); smile(a, 0, -86, 14, 8);
  a.region(circle(-28, -90, 9), cheeks, 'cheek'); a.region(circle(28, -90, 9), cheeks, 'cheek');
  a.region(poly([[0, -52], [-30, -68], [-30, -36]], 5), bow, 'bow'); a.region(poly([[0, -52], [30, -68], [30, -36]], 5), bow, 'bow');
  a.region(circle(0, -52, 9), bow, 'bow knot');
  [[0, -14], [0, 22]].forEach(([x, y]) => a.region(circle(x, y, 13), buttons, 'button'));
}
function astronaut(a, suit = 'none', visor = 'lightblue', trim = 'blue', boots = 'grey', pack = 'red') {
  a.region(rrect(-90, -70, 180, 130, 24), pack, 'backpack');
  a.region(rrect(-56, 60, 46, 80, 16), suit, 'leg'); a.region(rrect(10, 60, 46, 80, 16), suit, 'leg');
  a.region(rrect(-62, 124, 56, 30, 12), boots, 'boot'); a.region(rrect(6, 124, 56, 30, 12), boots, 'boot');
  a.region(rrect(-120, -40, 44, 100, 20), suit, 'arm'); a.region(rrect(76, -40, 44, 100, 20), suit, 'arm');
  a.region(circle(-98, 70, 20), trim, 'glove'); a.region(circle(98, 70, 20), trim, 'glove');
  a.region(rrect(-76, -60, 152, 140, 30), suit, 'suit');
  a.region(rrect(-40, -20, 80, 54, 10), trim, 'chest panel');
  a.region(circle(-16, 6, 10), pack, 'button'); a.region(circle(16, 6, 10), 'yellow', 'button');
  a.region(circle(0, -120, 80), suit, 'helmet');
  a.region(ellipse(0, -116, 56, 46), visor, 'visor');
  a.shine(ellipse(-24, -136, 10, 16));
}
function ufo(a, saucer = 'purple', dome = 'lightblue', alien = 'green', lights = 'yellow', base = 'blue') {
  a.region(poly([[-60, 40], [60, 40], [100, 160], [-100, 160]], 4), 'yellow', 'beam');
  a.region(circle(0, -50, 70), dome, 'dome');
  a.region(ellipse(0, -66, 34, 34), alien, 'alien head');   // above the saucer rim: its face is seen
  a.line('M-14 -94L-22 -106M14 -94L22 -106', 3); a.ink(circle(-23, -108, 6)); a.ink(circle(23, -108, 6));
  eye(a, -12, -72, 1.1); eye(a, 12, -72, 1.1); smile(a, 0, -56, 8, 4);
  a.region(ellipse(0, 0, 160, 46), saucer, 'saucer');
  a.region(ellipse(0, 26, 90, 22), base, 'saucer base');
  [-110, -56, 0, 56, 110].forEach((x) => a.region(circle(x, 0, 14), lights, 'light'));
}
function tent(a, cloth = 'orange', door = 'yellow', flag = 'red') {
  a.line('M0 -150V-200', 4); a.region(poly([[2, -204], [48, -190], [2, -174]], 4), flag, 'flag');
  a.region(poly([[-170, 100], [0, -156], [170, 100]], 10), cloth, 'tent');
  a.region(poly([[-70, 100], [0, -40], [70, 100]], 6), door, 'tent door');
  a.line('M0 -40V100', 3);
}
function campfire(a, logs = 'brown', f1 = 'red', f2 = 'orange', f3 = 'yellow', stones = 'grey') {
  [[-96, 64], [0, 80], [96, 64]].forEach(([x, y]) => a.region(ellipse(x, y, 40, 22), stones, 'stone'));
  a.region(rrect(-90, 28, 180, 32, 14), logs, 'log');   // one log (crossed logs under the flames left crumbs)
  a.region('M-70 30C-80 -40 -30 -60 -20 -130C10 -90 30 -100 30 -150C70 -100 90 -40 70 30Z', f1, 'flame');
  a.region('M-44 30C-50 -20 -10 -40 0 -96C30 -50 56 -20 46 30Z', f2, 'flame');
  a.region('M-20 30C-24 0 0 -20 4 -50C24 -20 30 0 22 30Z', f3, 'flame');
}

const RAW = { panda, bamboo, koala, flamingo, seahorse, pizza, gingerbread, astronaut, ufo, tent, campfire };
const EDGE_OK = new Set(['bamboo']);
const OUT = { RAW };
for (const [k, fn] of Object.entries(RAW)) OUT[k] = (a, ...args) => a.group(k, () => fn(a, ...args), { edgeOk: EDGE_OK.has(k) });
module.exports = OUT;
