/**
 * cbn-art/parts3.js — Color by Number parts, batch 2 (2026-10-05): lion, giraffe, teddy, hen, barn, castle, train,
 * birthday cake, fishbowl, robot, palm tree, acacia, fruit + bowl, rain. Same conventions as parts.js / parts2.js;
 * every object is wrapped as ONE group at export (lib/cbn-render.js checkSolid).
 * Thin things a child cannot colour inside a number's room (poles, strings, legs of a hen) are INK lines.
 */
'use strict';
const { circle, ellipse, rrect, blob, curve, poly, bumps } = require('./core.js');
const { eye, smile, face } = require('./parts.js');

/* ---------------------------------------------------------------- animals */
function lion(a, mane = 'orange', fur = 'yellow', muzzle = 'none') {
  a.region(blob([[38, 84], [96, 70], [124, 24], [106, 8], [88, 44], [42, 56]], 1), fur, 'tail');   // thick enough to colour, and the tuft overlaps its tip
  a.region(ellipse(116, 12, 18, 18), mane, 'tail tuft');
  a.region(blob([[-58, 100], [-62, 30], [-36, -10], [36, -10], [62, 30], [58, 100]], 0.9), fur, 'lion body');
  a.region(ellipse(-24, 100, 27, 15), fur, 'paw'); a.region(ellipse(24, 100, 27, 15), fur, 'paw');
  a.region(bumps(0, -56, 96, 90, 12, 0.46), mane, 'mane');
  a.region(circle(-44, -100, 20), fur, 'ear'); a.region(circle(44, -100, 20), fur, 'ear');
  a.region(circle(0, -54, 60), fur, 'lion head');
  a.region(ellipse(0, -30, 34, 24), muzzle, 'muzzle');
  eye(a, -22, -66, 1.25); eye(a, 22, -66, 1.25);
  a.ink(poly([[-10, -42], [10, -42], [0, -32]], 3));
  a.line(curve([[-12, -22], [0, -16], [12, -22]]), 2.6);
}
function giraffe(a, skin = 'yellow', spots = 'brown', hoof = 'brown') {
  [[-70, 30], [-40, 34], [30, 34], [60, 30]].forEach(([x, y]) => { a.region(rrect(x - 12, y, 24, 96, 10), skin, 'leg'); a.region(rrect(x - 13, y + 84, 26, 22, 7), hoof, 'hoof'); });
  a.line(curve([[-96, -6], [-112, 20], [-108, 50]]), 3); a.ink(blob([[-114, 44], [-102, 44], [-104, 64], [-116, 62]], 1));
  a.region(ellipse(-6, 0, 98, 52), skin, 'giraffe body');
  a.region(poly([[40, -30], [82, -200], [116, -194], [84, -10]], 16), skin, 'neck');
  a.region(ellipse(-50, -6, 22, 18), spots, 'spot'); a.region(ellipse(-4, 14, 24, 18), spots, 'spot'); a.region(ellipse(-12, -30, 18, 14), spots, 'spot');
  a.region(ellipse(36, 0, 18, 16), spots, 'spot'); a.region(ellipse(80, -90, 14, 16), spots, 'spot'); a.region(ellipse(92, -150, 13, 14), spots, 'spot');
  a.line('M96 -232V-262M120 -228V-258', 4); a.ink(circle(96, -266, 9)); a.ink(circle(120, -262, 9));
  a.region(ellipse(74, -228, 26, 15), skin, 'ear');
  a.region(blob([[84, -244], [128, -246], [160, -214], [150, -192], [96, -192], [76, -216]], 1), skin, 'giraffe head');
  eye(a, 112, -222, 1.1);
  a.ink(ellipse(148, -208, 3.5, 2.5)); smile(a, 138, -200, 8, 3);
}
function teddy(a, fur = 'brown', inner = 'orange', bow = 'red') {
  // the one-silhouette sitting animal (arms and legs were ovals pasted round a ball): ears, tummy, muzzle and foot
  // pads in the inner colour, a bow tie at the neck; sits on y = 122 as before
  a.at({ y: 122, s: 0.86 }, (b) => require('./v2.js').sitter(b, { name: 'teddy', fur, inner, earR: 36, belly: inner, muzzle: inner, bow }));
}
function hen(a, body = 'none', comb = 'red', beak = 'orange') {
  a.line('M-14 60V100M14 60V100', 5); a.line('M-26 104L-14 100L-4 104M4 104L14 100L24 104', 4);
  a.region(blob([[-60, -10], [-112, -64], [-92, -2], [-118, 2], [-90, 30]], 1), body, 'tail feathers');
  a.region(blob([[-80, 10], [-60, -40], [10, -40], [70, -70], [96, -30], [70, 30], [0, 70], [-60, 54]], 1), body, 'hen body');
  a.region(blob([[-46, 0], [10, -10], [24, 20], [-30, 38]], 1), body, 'wing');
  a.line(curve([[-30, 10], [-6, 8], [10, 18]]), 2.4);
  a.region(bumps(78, -96, 30, 16, 5, 0.45, 0.3, -160), comb, 'comb');
  a.region(blob([[52, -78], [90, -96], [116, -70], [104, -36], [64, -36]], 1), body, 'hen head');
  a.region(poly([[104, -72], [148, -58], [104, -42]], 5), beak, 'beak');
  a.region(ellipse(108, -36, 11, 14), comb, 'wattle');
  eye(a, 92, -68, 1.05);
}

/* ---------------------------------------------------------------- buildings */
function barn(a, wall = 'red', roof = 'brown', door = 'none', trim = 'none') {
  a.region(poly([[-120, -40], [120, -40], [120, 110], [-120, 110]], 4), wall, 'barn wall');
  a.region(poly([[-140, -36], [-96, -116], [0, -150], [96, -116], [140, -36], [118, -22], [86, -96], [0, -124], [-86, -96], [-118, -22]], 8), roof, 'roof');
  a.region(poly([[-118, -22], [-86, -96], [0, -124], [86, -96], [118, -22], [118, -40], [-118, -40]], 4), wall, 'gable');
  a.region(circle(0, -70, 24), trim, 'hay window');
  a.region(rrect(-50, 10, 100, 100, 6), door, 'barn door');
  a.line('M-36 22L36 98M36 22L-36 98', 3);   // the cross stops short of the frame edges: four big parts, not slivers
}
function castle(a, stone = 'grey', roofs = 'blue', flags = 'red', door = 'brown') {
  [[-130, -40], [130, -40]].forEach(([x, y]) => {
    a.line(`M${x} ${y - 104}V${y - 176}`, 4);   // the pole runs well INTO the roof: it holds the flag on
    a.region(poly([[x + 2, y - 180], [x + 60, y - 160], [x + 2, y - 136]], 5), flags, 'flag');   // big enough for its number at small scales
    a.region(poly([[x - 44, y - 54], [x, y - 140], [x + 44, y - 54]], 8), roofs, 'tower roof');
    a.region(rrect(x - 38, y - 60, 76, 210, 6), stone, 'tower');
    a.region(rrect(x - 14, y - 26, 28, 40, 14), 'yellow', 'tower window');
  });
  a.region(rrect(-92, -20, 184, 170, 4), stone, 'castle wall');
  [-80, -40, 0, 40].forEach((x) => a.region(rrect(x - 2, -48, 44, 32, 4), stone, 'battlement'));
  a.region('M-34 150V80A34 34 0 0 1 34 80V150Z', door, 'gate');
  a.line('M0 54V150', 2.6);
  [[-64, 30], [64, 30]].forEach(([x, y]) => a.region(rrect(x - 15, y - 22, 30, 44, 15), 'yellow', 'window'));
}

/* ---------------------------------------------------------------- vehicles */
function train(a, engine = 'red', cab = 'blue', car1 = 'yellow', car2 = 'green', wheel = 'black', smoke = 'none') {
  // the vehicles are coupled tight and the wheels make ONE overlapping row (50 apart, radius 28): no slits between
  // wheels for the background to show through. Rails a scene draws must start TRAIN_RAIL_TOP below the origin.
  [[-308, car2], [-204, car1]].forEach(([x, c]) => { a.region(rrect(x, -40, 104, 74, 8), c, 'carriage'); a.region(rrect(x + 14, -26, 34, 30, 5), 'lightblue', 'window'); a.region(rrect(x + 56, -26, 34, 30, 5), 'lightblue', 'window'); });
  a.line('M-206 -2V20M-102 -2V20', 3);
  // the smoke comes OUT of the chimney (the puffs overlap it and each other: one piece)
  a.region(bumps(48, -152, 38, 24, 7, 0.45), smoke, 'smoke'); a.region(bumps(14, -122, 30, 20, 6, 0.45), smoke, 'smoke');
  a.region(rrect(-6, -110, 34, 66, 4), engine, 'chimney');
  a.region(rrect(-100, -96, 70, 130, 8), cab, 'cab');
  a.region(rrect(-88, -82, 46, 40, 6), 'lightblue', 'cab window');
  a.region(rrect(-112, -112, 94, 24, 8), engine, 'cab roof');
  a.region(rrect(-34, -56, 130, 90, 30), engine, 'boiler');
  a.region(poly([[84, -10], [126, 34], [84, 34]], 4), 'grey', 'cowcatcher');   // overlaps the boiler: joined, not touching at a corner
  // two wheels under each carriage, three under the engine, spaced apart (8 wheels overlapped in one crowded row) — 2026-10-05
  // the undercarriage, behind the wheels and down to the rails: no pocket of background between wheel and rail
  a.region(rrect(-306, 26, 388, 32, 4), 'grey', 'undercarriage');
  [-282, -212, -142, -72, -2, 66].forEach((x) => { a.region(circle(x, 46, 27), wheel, 'wheel'); a.region(circle(x, 46, 9.5), 'grey', 'hub'); });
}

/* ---------------------------------------------------------------- food + things */
function cake(a, cake1 = 'pink', cake2 = 'yellow', icing = 'none', candle = 'blue', flame = 'orange', plate = 'lightblue') {
  a.region(ellipse(0, 122, 150, 26), plate, 'plate');
  a.region(rrect(-120, 20, 240, 104, 16), cake1, 'cake');
  a.region(blob([[-122, 20], [122, 20], [122, 46], [96, 56], [70, 42], [40, 62], [10, 44], [-24, 62], [-56, 44], [-88, 60], [-122, 44]], 0.8), icing, 'icing');
  a.region(rrect(-80, -64, 160, 90, 14), cake2, 'cake');
  a.region(blob([[-82, -64], [82, -64], [82, -40], [56, -30], [30, -46], [0, -26], [-30, -46], [-58, -30], [-82, -40]], 0.8), icing, 'icing');
  [-44, 0, 44].forEach((x) => {
    a.region(blob([[x, -150], [x + 15, -118], [x, -104], [x - 15, -118]], 1), flame, 'flame');
    a.line(`M${x} -108V-100`, 3);
    a.region(rrect(x - 14, -100, 28, 40, 6), candle, 'candle');
  });
  [[-70, 84], [0, 90], [70, 84]].forEach(([x, y]) => a.region(circle(x, y, 14), 'red', 'cherry'));
}
function fishbowl(a, water = 'lightblue', fish = 'orange', fin = 'yellow', pebbles = 'purple', weed = 'green') {
  a.region(blob([[-80, -96], [80, -96], [130, -10], [110, 92], [0, 122], [-110, 92], [-130, -10]], 1), 'none', 'glass');
  a.region(blob([[-102, -40], [102, -40], [114, 0], [98, 86], [0, 106], [-98, 86], [-114, 0]], 1), water, 'water');   // inside the glass on every side
  a.region(rrect(-88, -110, 176, 24, 12), 'none', 'rim');
  a.region(blob([[-60, 70], [-74, 20], [-60, -10], [-50, 20], [-46, 70]], 1), weed, 'water weed');
  a.region(blob([[60, 74], [52, 6], [66, -14], [76, 20], [76, 70]], 1), weed, 'water weed');
  [[-60, 92], [-28, 100], [6, 104], [40, 100], [74, 90]].forEach(([x, y]) => a.region(ellipse(x, y, 22, 15), pebbles, 'pebble'));
  a.region(blob([[16, 20], [-6, 0], [-6, 40]], 1), fin, 'tail');
  a.region(ellipse(36, 20, 28, 22), fish, 'fish');
  eye(a, 48, 14, 0.85);
  a.region(circle(72, 0, 9), 'none', 'bubble'); a.region(circle(88, -22, 7), 'none', 'bubble');   // in the water, not above it
}
function robot(a, metal = 'grey', trim = 'blue', lights = 'yellow', cheeks = 'red', feet = trim, panel = trim) {
  a.line('M0 -150V-180', 5); a.region(circle(0, -188, 13), cheeks, 'antenna ball');
  a.region(rrect(-46, 70, 34, 50, 6), metal, 'leg'); a.region(rrect(12, 70, 34, 50, 6), metal, 'leg');
  a.region(rrect(-58, 112, 52, 24, 10), feet, 'foot'); a.region(rrect(6, 112, 52, 24, 10), feet, 'foot');
  a.region(rrect(-108, -30, 34, 92, 14), metal, 'arm'); a.region(rrect(74, -30, 34, 92, 14), metal, 'arm');
  a.region(circle(-91, 72, 18), feet, 'hand'); a.region(circle(91, 72, 18), feet, 'hand');
  a.region(rrect(-76, -40, 152, 116, 18), metal, 'robot body');
  a.region(rrect(-46, -14, 92, 64, 10), panel, 'panel');
  a.region(circle(-20, 18, 12), lights, 'button'); a.region(circle(20, 18, 12), cheeks, 'button');
  a.region(rrect(-26, -64, 52, 30, 6), trim, 'neck');
  a.region(rrect(-82, -154, 164, 98, 22), metal, 'robot head');
  a.region(circle(-36, -112, 22), lights, 'eye'); a.region(circle(36, -112, 22), lights, 'eye');
  a.ink(circle(-36, -112, 6)); a.ink(circle(36, -112, 6));
  a.region(rrect(-30, -84, 60, 18, 6), 'none', 'mouth'); a.line('M-15 -84V-66M0 -84V-66M15 -84V-66', 2.4);
}

/* ---------------------------------------------------------------- plants */
function palmTree(a, leaves = 'green', trunk = 'brown', nuts = 'brown') {
  a.region('M-18 150Q-26 40 6 -60L30 -56Q10 40 18 150Z', trunk, 'palm trunk');
  a.line('M-14 110l26 -2M-14 70l24 -4M-10 30l24 -4M-4 -10l22 -4', 2.4);
  // the leaves all spring from ONE point (wide bases overlapping the trunk top), each pointing its own way
  // fat leaves, shaped along their own direction (perpendicular widths), all springing from one point
  [[-150, -24], [-100, -140], [18, -184], [130, -140], [166, -24]].forEach(([x, y]) => {
    const bx = 18, by = -64, dx = x - bx, dy = y - by, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, px = -uy, py = ux;
    const at = (t, w) => [bx + dx * t + px * w, by + dy * t + py * w];
    a.region(blob([at(0, -14), at(0.45, -30), at(1, 0), at(0.45, 30), at(0, 14)], 1), leaves, 'palm leaf');
  });
  a.region(circle(4, -50, 17), nuts, 'coconut'); a.region(circle(32, -46, 17), nuts, 'coconut');
}
function acacia(a, crown = 'green', trunk = 'brown') {
  // one flaring trunk (a forked one trapped a pocket of sky between its branches and the crown)
  a.region('M-16 120L-12 0Q-28 -30 -48 -50L48 -50Q28 -30 12 0L16 120Z', trunk, 'trunk');
  a.region(bumps(0, -60, 150, 38, 10, 0.4, 0.3), crown, 'acacia crown');
}
function fruitBowl(a, bowl = 'blue', apple = 'red', banana = 'yellow', pear = 'lightgreen', grapes = 'purple', orange = 'orange') {
  // 2026-10-05: the fruit sits IN the bowl — its back rim behind the fruit, its front drawn last over their bottoms
  // (the fruit was pasted on the rim and the banana lay across the outside of the bowl)
  a.region('M-140 0A140 36 0 0 1 140 0A140 36 0 0 1 -140 0Z', bowl, 'inside of the bowl');
  a.region(blob([[40, -100], [80, -82], [92, -34], [60, -2], [18, -22], [24, -72]], 1), pear, 'pear'); a.line(curve([[60, -100], [64, -114], [74, -122]]), 5);
  [[-8, -92], [24, -94], [-22, -66], [8, -64], [38, -66]].forEach(([x, y]) => a.region(circle(x, y, 17), grapes, 'grape'));
  a.region(circle(-64, -30, 44), apple, 'apple'); a.line(curve([[-64, -74], [-60, -88], [-52, -96]]), 5);
  a.region(circle(-2, -22, 40), orange, 'orange');
  a.region(blob([[-118, -14], [-60, 4], [20, 2], [96, -30], [110, -20], [30, 18], [-60, 22], [-122, 6]], 1), banana, 'banana');
  a.region('M-140 0A140 36 0 0 0 140 0Q132 92 0 98Q-132 92 -140 0Z', bowl, 'bowl');
  a.region(rrect(-42, 92, 84, 20, 8), bowl, 'bowl foot');
}
function raindrop(a, c = 'lightblue') { a.region(blob([[0, -22], [14, 4], [0, 18], [-14, 4]], 1), c, 'raindrop'); }
function puddle(a, c = 'lightblue', w = 90) { a.region(blob([[-w, 6], [-w * 0.6, -14], [w * 0.3, -16], [w, 0], [w * 0.5, 16], [-w * 0.4, 16]], 1), c, 'puddle'); }

const TRAIN_RAIL_TOP = 58;   // local units below the train's origin where its rails start
const RAW = { lion, giraffe, teddy, hen, barn, castle, train, cake, fishbowl, robot, palmTree, acacia, fruitBowl, raindrop, puddle };
const EDGE_OK = new Set(['palmTree', 'acacia', 'puddle']);
const OUT = { RAW, TRAIN_RAIL_TOP };
for (const [k, fn] of Object.entries(RAW)) OUT[k] = (a, ...args) => a.group(k, () => fn(a, ...args), { edgeOk: EDGE_OK.has(k) });
module.exports = OUT;
