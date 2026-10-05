/**
 * cbn-art/parts8.js — Color by Number parts, batch 7 (2026-10-05): panda, koala, flamingo, seahorse, pizza slice,
 * gingerbread man, astronaut, UFO with alien, tent, campfire, bamboo. Conventions as parts.js; every object is ONE
 * group (checkSolid). Paired legs overlap; detail lines stop short of outlines; thin things are ink.
 */
'use strict';
const { circle, ellipse, rrect, blob, curve, poly, star } = require('./core.js');
const { eye, smile, face } = require('./parts.js');

function panda(a, white = 'none', black = 'black', snack = 'green') {
  // the one-silhouette sitting animal (head pasted on a ball, arms floating beside it): black ears, arms and feet,
  // eye patches, holding a bamboo stick in its paws; feet on y = 116 as before
  a.at({ y: 116, s: 0.8 }, (b) => require('./v2.js').sitter(b, { name: 'panda', fur: white, ear: black, limb: black, patches: black,
    hold: (h) => h.at({ x: 10, y: 0, r: 34 }, (c) => c.region(rrect(-12, -150, 24, 196, 8), snack, 'bamboo')) }));
}
function bamboo(a, c = 'green', h = 300, segs = true) {
  a.region(rrect(-14, -h, 28, h, 8), c, 'bamboo stalk');
  if (segs) for (let y = -h + 70; y < -10; y += 70) a.line(`M-14 ${y}H14`, 3);   // segment lines cut the stalk into parts: off for level 1
  a.region(blob([[10, -h + 90], [60, -h + 60], [74, -h + 74], [24, -h + 110]], 1), c, 'bamboo leaf');
  a.region(blob([[-10, -h + 170], [-60, -h + 140], [-74, -h + 154], [-24, -h + 190]], 1), c, 'bamboo leaf');
}
function koala(a, fur = 'grey', inner = 'pink', nose = 'black') {
  // the one-silhouette sitting animal (head pasted on a ball, arms floating): big fluffy ears, a big nose, a white
  // tummy; feet on y = 112 as before
  a.at({ y: 112, s: 0.8 }, (b) => require('./v2.js').sitter(b, { name: 'koala', fur, inner, earR: 44, earY: -270, belly: 'none', bigNose: nose }));
}
function flamingo(a, pink = 'pink', beak = 'none', tip = 'black') {
  // ONE silhouette (body, S-neck and head; the neck had a seam where it was pasted on the body), a curved two-tone
  // beak, standing on one leg in the water
  const { outline } = require('./v2.js');
  a.group('flamingo', () => {
    a.line('M-4 44V150M-4 104L34 84L20 66', 6);
    a.region(outline([[-98, -14, 1], [-62, -40], [-12, -48], [36, -38], [62, -24], [76, -56], [68, -104], [62, -146],
      [70, -180], [92, -198], [116, -192], [126, -172], [112, -160], [92, -158], [86, -138], [92, -100], [104, -56],
      [98, -10], [84, 20], [48, 48], [-18, 52], [-62, 34], [-86, 10]]), pink, 'flamingo');
    a.region(outline([[-60, -8], [-14, -30], [36, -20], [22, 12], [-30, 20]]), pink, 'wing');
    a.line(curve([[-40, 4], [-6, 0], [18, 8]]), 2.4);
    a.region(outline([[112, -186], [138, -182], [152, -168], [144, -154], [120, -156], [110, -168]]), beak, 'beak');
    a.region(outline([[136, -182], [154, -170], [158, -142, 1], [142, -152]]), tip, 'beak tip');
    eye(a, 100, -178, 0.95);
  });
}
function seahorse(a, body = 'orange', fin = 'yellow', belly = 'yellow') {
  // ONE silhouette: snout, head, body and curled tail (the head was a circle with a box snout pasted on)
  const { outline } = require('./v2.js');
  a.group('seahorse', () => {
    a.region(outline([[48, -36], [98, -56], [108, -12], [62, 12]]), fin, 'fin');
    a.region(outline([[-14, -126], [8, -180, 1], [34, -150], [46, -116]]), fin, 'crest');
    a.region(outline([[-28, -46], [-32, 0], [-24, 50], [-6, 72], [-40, 100], [-46, 140], [-16, 166], [24, 160], [36, 136],
      [16, 140], [-4, 134], [-10, 114], [14, 96], [42, 70], [66, 30], [66, -20], [52, -54], [62, -90], [42, -124],
      [10, -138], [-22, -128], [-40, -108], [-58, -104], [-94, -102], [-100, -84, 1], [-94, -66], [-58, -68], [-40, -60]]), body, 'seahorse');
    a.region(outline([[-10, -22], [18, -26], [28, 38], [8, 70], [-14, 40]]), belly, 'belly');
    a.line('M-4 0h22M0 24h22M4 48h14', 2.4);
    eye(a, 4, -94, 1.25);
  });
}
function pizza(a, crust = 'orange', cheese = 'yellow', topping = 'red', pepper = 'green') {
  a.region('M0 140L-146 -100Q0 -134 146 -100Z', cheese, 'pizza');   // its top edge stays under the crust (they showed as a double line)
  a.region('M-158 -106Q0 -150 158 -106L150 -84Q0 -124 -150 -84Z', crust, 'crust');
  [[0, -60], [-50, -20], [50, -30], [0, 28]].forEach(([x, y]) => a.region(circle(x, y, 24), topping, 'pepperoni'));
  [[-70, -70, 30], [40, 34, -62], [4, 84, 0]].forEach(([x, y, r]) => a.at({ x, y, r }, (c) => c.region(ellipse(0, 0, 24, 15), pepper, 'pepper')));
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
  [-110, -56, 0, 56, 110].forEach((x) => a.region(circle(x, -8, 14), lights, 'light'));   // clear of the base
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
