/**
 * cbn-art/v2.js — the second-generation Color by Number kit (operator 2026-10-05: "each of the color by number
 * worksheets should be top quality … we will use the same designs for connect the dots later").
 *
 * The rule that separates v2 from v1: a character is ONE silhouette. v1 stacked separate shapes (body, then a neck on
 * top, then a head on top), so every joint showed a seam, parts floated, and no single outline existed. In v2 the
 * whole animal — head, neck, body, near legs, tail root — is ONE closed outline drawn point by point (outline()),
 * and the inner markings (spots, belly, hooves, mane, ear) are shapes ON TOP of it. Far-side legs sit BEHIND it.
 * The silhouette's points are also the connect-the-dots path.
 *
 * Every function draws in local units standing on y = 0 (feet on the ground), facing right, and is wrapped as one
 * a.group so checkSolid holds the whole character to one solid piece.
 */
'use strict';
const { blob, curve, circle, ellipse, poly, f } = require('./core.js');
const P = require('./parts.js');

/**
 * a closed outline through points; a point [x, y, 1] is a CORNER (the curve arrives and leaves straight), every
 * other point is passed smoothly (Catmull-Rom). Corners are what keep hooves, ear tips and beaks crisp without the
 * overshoot loops a smooth curve makes around tight turns.
 */
function outline(pts, t = 1) {
  const n = pts.length;
  const tan = (i) => {
    const p = pts[i];
    if (p[2]) return [0, 0];
    const a = pts[(i - 1 + n) % n], b = pts[(i + 1) % n];
    return [(b[0] - a[0]) * t / 6, (b[1] - a[1]) * t / 6];
  };
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p1 = pts[i], p2 = pts[(i + 1) % n], t1 = tan(i), t2 = tan((i + 1) % n);
    d += `C${f(p1[0] + t1[0])} ${f(p1[1] + t1[1])} ${f(p2[0] - t2[0])} ${f(p2[1] - t2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d + 'Z';
}

/** a giraffe standing on y = 0, facing right; about 250 wide and 450 tall */
function giraffe(a, skin = 'yellow', spots = 'brown', hoof = 'brown') {
  a.group('giraffe', () => {
    // far-side legs (visible between the near legs) and the tail, behind the silhouette
    const leg = (x0, x1, name) => a.region(outline([[x0, -150], [x1, -150], [x1 + 2, -20], [x1 + 4, 0, 1], [x0 - 2, 0, 1], [x0, -20]]), skin, name);
    const hoofAt = (x0, x1) => a.region(outline([[x0 - 1, -20], [x1 + 2, -20], [x1 + 4, 0, 1], [x0 - 2, 0, 1]]), hoof, 'hoof');
    leg(36, 70, 'far front leg'); hoofAt(36, 70);      // peeks out behind the near front leg
    leg(-66, -30, 'far back leg'); hoofAt(-66, -30);   // peeks out in front of the near back leg
    a.line(curve([[-112, -196], [-128, -160], [-130, -118]]), 3.4);
    a.region(outline([[-132, -124], [-122, -122], [-118, -96], [-130, -80, 1], [-142, -98]]), spots, 'tail tuft');
    // ossicones (two short horns with round knobs), behind the head
    // each ossicone is ONE shape: a stalk rooted inside the head, ending in a round knob
    const horn = (x, y0, y1) => a.region(outline([[x - 8, y0], [x + 8, y0], [x + 7, y1 + 10], [x + 13, y1], [x + 6, y1 - 12], [x - 6, y1 - 12], [x - 13, y1], [x - 7, y1 + 10]]), spots, 'ossicone');
    horn(118, -416, -460); horn(154, -430, -466);   // apart: no pocket of sky between them
    // THE silhouette: rump, back, neck, head, muzzle, throat, chest, near front leg, belly, near back leg
    a.region(outline([
      [-104, -214], [-40, -236], [40, -240], [74, -280], [96, -340], [112, -400], [118, -430],
      [146, -446], [180, -440], [212, -418], [222, -398], [208, -382], [174, -380], [148, -384],
      [134, -360], [122, -300], [108, -240], [100, -190], [96, -150],
      [96, -20], [98, 0, 1], [58, 0, 1], [60, -20], [60, -132],
      [20, -142], [-30, -142], [-50, -136],
      [-50, -20], [-48, 0, 1], [-88, 0, 1], [-86, -20], [-92, -140], [-112, -168],
    ]), skin, 'giraffe');
    // hooves of the near legs
    a.region(outline([[60, -20], [96, -20], [98, 0, 1], [58, 0, 1]]), hoof, 'hoof');
    a.region(outline([[-86, -20], [-50, -20], [-48, 0, 1], [-88, 0, 1]]), hoof, 'hoof');
    // mane along the back of the neck
    a.region(outline([[24, -238], [66, -286], [90, -348], [106, -408], [126, -404], [112, -338], [92, -276], [58, -234]]), spots, 'mane');
    // patches: rounded, irregular, never crossing the outline
    const patch = (pts) => a.region(outline(pts, 0.9), spots, 'patch');
    patch([[-82, -200], [-56, -210], [-46, -188], [-66, -172], [-86, -180]]);
    patch([[-30, -214], [0, -220], [10, -196], [-12, -180], [-34, -190]]);
    patch([[24, -210], [50, -214], [56, -190], [36, -176], [18, -190]]);
    patch([[-70, -164], [-44, -170], [-38, -150], [-62, -146]]);
    patch([[-14, -170], [16, -172], [22, -152], [-6, -148]]);
    patch([[40, -168], [64, -168], [66, -150], [44, -150]]);
    // the ear, pointing back off the head
    a.region(outline([[140, -432], [96, -448, 1], [130, -410]]), skin, 'ear');
    // face: eye, nostril, smile
    P.eye(a, 172, -420, 1.15);
    a.ink(ellipse(212, -404, 3.2, 2.4));
    P.smile(a, 196, -392, 9, 3);
  });
}

/** a squirrel SITTING on y = 0, facing right, holding an acorn in both front paws; about 190 wide, 230 tall */
function squirrel(a, fur = 'orange', belly = 'yellow', nut = 'brown') {
  a.group('squirrel', () => {
    // the bushy tail rises behind the back and curls forward over the head
    a.region(outline([[-6, -22], [-60, -34], [-104, -84], [-110, -150], [-86, -206], [-40, -232], [6, -226], [26, -204],
      [10, -194], [-4, -196], [-18, -172], [-18, -124], [-22, -80], [-4, -60]]), fur, 'tail');   // hugs the back: no pocket of sky
    a.line(curve([[-82, -110], [-76, -150], [-54, -184]]), 2.6);   // a fur line along the tail, not crossing its edge
    // THE silhouette: haunch, back, ears, head, snout, chest, front of the body, feet
    a.region(outline([[-46, -10], [-56, -54], [-48, -96], [-26, -122], [-30, -148], [-20, -172], [-14, -206, 1],
      [4, -182], [24, -184], [40, -208, 1], [50, -176], [66, -158], [76, -138], [72, -122], [56, -110],
      [46, -96], [50, -56], [58, -20], [64, 0, 1], [-40, 0, 1]]), fur, 'squirrel');
    a.region(outline([[2, -88], [30, -98], [44, -70], [46, -30], [30, -8], [6, -10], [-4, -40]], 0.9), belly, 'belly');
    // the acorn held against the chest, a paw on each side of it
    a.region(outline([[44, -78], [70, -78], [72, -56], [57, -36, 1], [42, -56]]), nut, 'acorn');
    a.region(outline([[40, -80], [58, -92], [76, -80], [72, -70], [42, -70]]), nut, 'acorn cap');
    a.line('M58 -92V-100', 3);
    a.region(ellipse(40, -60, 11, 9), fur, 'paw');
    a.region(ellipse(74, -58, 10, 9), fur, 'paw');
    // face
    P.eye(a, 44, -146, 1.05);
    a.ink(ellipse(74, -138, 4, 3));
    P.smile(a, 62, -126, 7, 3);
  });
}

/** a mouse SITTING on y = 0, facing left, a strawberry in its paws; about 130 wide, 150 tall */
function mouse(a, fur = 'grey', inner = 'pink', berry = 'red') {
  a.group('mouse', () => {
    // the tail curls out behind (ink), the far ear behind the head
    a.line(curve([[40, -14], [74, -18], [92, -40], [84, -64], [70, -60]]), 3.2);
    a.region(circle(14, -142, 28), fur, 'ear');          // overlaps the head: joined, and big enough to colour
    a.region(circle(22, -146, 11), inner, 'inner ear');
    // THE silhouette: body, head, near ear, snout
    a.region(outline([[44, -8], [50, -50], [38, -80], [22, -92], [12, -110], [-6, -150], [-30, -156], [-44, -134],
      [-38, -116], [-58, -100], [-66, -88, 1], [-50, -76], [-30, -74], [-36, -50], [-40, -12], [-30, 0, 1], [36, 0, 1]]), fur, 'mouse');
    a.region(circle(-22, -132, 13), inner, 'inner ear');
    a.ink(circle(-64, -88, 5));
    // a strawberry held in both paws
    // a BIG strawberry in the lap, both paws on its sides, its leaves clear of the mouth
    a.region(outline([[-35,-60],[23,-60],[19,-32],[-6,-6,1],[-31,-32]]), berry, 'strawberry');
    [[-21,-46],[-5,-50],[9,-44],[-15,-30],[3,-30],[-7,-16]].forEach(([x, y]) => a.ink(ellipse(x, y, 2, 2.8)));
    a.region(outline([[-37,-62],[-26,-90],[-14,-74],[-6,-96,1],[2,-74],[14,-90],[25,-62],[-6,-52]]), 'green', 'strawberry leaves');
    a.region(ellipse(-33, -32, 13, 12), fur, 'paw');
    a.region(ellipse(21, -32, 13, 12), fur, 'paw');
    P.eye(a, -40, -104, 0.9);
    P.smile(a, -52, -84, 5, 2);
    a.line('M-62 -92L-82 -96M-62 -86L-82 -84', 2);
  });
}

/** a duck FLOATING: its waterline is y = 0 (nothing below it), facing right; about 260 wide, 175 tall */
function duck(a, body = 'yellow', beak = 'orange') {
  a.group('duck', () => {
    // THE silhouette: tail, back, neck, head, throat, breast, waterline
    a.region(outline([[-128, -70, 1], [-100, -48], [-50, -56], [-4, -60], [6, -90], [2, -126], [22, -160], [56, -170],
      [86, -152], [94, -122], [82, -96], [72, -74], [96, -52], [108, -22], [98, 0, 1], [-104, 0, 1], [-122, -28]]), body, 'duck');
    a.region(outline([[-64, -38], [-14, -50], [32, -32], [14, -10], [-42, -12]], 0.9), body, 'wing');
    a.line(curve([[-46, -26], [-18, -30], [8, -24]]), 2.4);
    a.region(outline([[84, -140], [128, -138], [142, -122], [128, -104], [82, -102]], 0.9), beak, 'beak');
    a.line(curve([[40, -168], [42, -186], [58, -194]]), 2.6);   // a tuft of head feathers (an open stroke: a closed curl traps a crumb of sky)
    P.eye(a, 64, -138, 1.1);
  });
}

/** a cow standing on y = 0, body side-on, head turned to the viewer at the front; about 280 wide, 215 tall */
function cow(a, hide = 'none', spot = 'brown', nose = 'pink', hoof = 'grey') {
  a.group('cow', () => {
    // far legs behind the silhouette, peeking out beside the near legs
    const leg = (x0, x1) => { a.region(outline([[x0, -70], [x1, -70], [x1, -14], [x1 + 2, 0, 1], [x0 - 2, 0, 1], [x0, -14]]), hide, 'far leg');
      a.region(outline([[x0, -24], [x1, -24], [x1 + 2, 0, 1], [x0 - 2, 0, 1]]), hoof, 'hoof'); };
    leg(36, 66); leg(-76, -46);
    // tail: an ink switch with a small tuft, clear of the body
    a.line(curve([[-118, -134], [-138, -112], [-142, -76]]), 3);
    a.region(outline([[-150, -80], [-134, -80], [-132, -58], [-142, -46, 1], [-152, -58]]), spot, 'tail tuft');
    // THE silhouette: back, chest, near legs, belly, rump
    a.region(outline([[-118, -140], [-80, -156], [0, -158], [70, -150], [92, -120], [90, -62],
      [90, -14], [92, 0, 1], [58, 0, 1], [58, -14], [56, -58], [0, -56], [-60, -58],
      [-70, -58], [-70, -14], [-68, 0, 1], [-102, 0, 1], [-102, -14], [-106, -66], [-122, -96]]), hide, 'cow');
    a.region(outline([[58, -24], [90, -24], [92, 0, 1], [58, 0, 1]]), hoof, 'hoof');
    a.region(outline([[-102, -24], [-70, -24], [-68, 0, 1], [-102, 0, 1]]), hoof, 'hoof');
    a.region(outline([[-94, -136], [-50, -142], [-40, -110], [-66, -92], [-96, -104]], 0.9), spot, 'spot');
    a.region(outline([[-20, -120], [20, -126], [30, -92], [4, -74], [-24, -84]], 0.9), spot, 'spot');
    // the head turned to the viewer, in front of the shoulder: ears and horns behind it, rooted inside
    a.region(outline([[58, -192], [12, -170, 1], [58, -148]]), spot, 'ear');
    a.region(outline([[134, -192], [180, -170, 1], [134, -148]]), spot, 'ear');
    a.region(outline([[56, -182], [88, -198], [62, -238, 1]]), 'yellow', 'horn');   // angled apart: no crumb of background between them
    a.region(outline([[104, -198], [136, -182], [130, -238, 1]]), 'yellow', 'horn');
    a.region(outline([[56, -186], [96, -200], [136, -186], [146, -132], [128, -98], [64, -98], [46, -132]]), hide, 'cow head');
    a.region(ellipse(96, -116, 42, 22), nose, 'muzzle');
    a.ink(ellipse(82, -116, 4.5, 6)); a.ink(ellipse(110, -116, 4.5, 6));
    P.eye(a, 78, -158, 1); P.eye(a, 114, -158, 1);
  });
}

/** a bunny SITTING, facing the viewer; centre of the body near (0, 40), feet on y = 104; about 120 wide, 280 tall */
function bunny(a, fur = 'grey', inner = 'pink', tummy = 'none') {
  a.group('bunny', () => {
    // ears behind the head, rooted inside it
    a.at({ x: -26, y: -100, r: -8 }, (b) => { b.region(ellipse(0, 0, 18, 52), fur, 'ear'); b.region(ellipse(0, 4, 9, 36), inner, 'inner ear'); });
    a.at({ x: 26, y: -100, r: 8 }, (b) => { b.region(ellipse(0, 0, 18, 52), fur, 'ear'); b.region(ellipse(0, 4, 9, 36), inner, 'inner ear'); });
    // THE silhouette: head and body in one outline
    a.region(outline([[0, -78], [40, -70], [58, -38], [50, -6], [56, 22], [60, 54], [46, 88], [0, 100], [-46, 88],
      [-60, 54], [-56, 22], [-50, -6], [-58, -38], [-40, -70]]), fur, 'bunny');
    a.region(ellipse(0, 50, 30, 32), tummy, 'tummy');
    // front legs: from the shoulders down, the paws resting on the tummy
    a.region(outline([[-48, 4], [-34, -2], [-16, 44], [-26, 56], [-40, 48]], 0.9), fur, 'arm');
    a.region(outline([[48, 4], [34, -2], [16, 44], [26, 56], [40, 48]], 0.9), fur, 'arm');
    // hind feet in front
    a.region(ellipse(-30, 96, 30, 15), fur, 'foot'); a.region(ellipse(30, 96, 30, 15), fur, 'foot');
    P.face(a, 0, -36, 1, 30);
    a.ink(ellipse(0, -22, 5, 3.4));
  });
}

/** a unicorn standing on y = 0, facing right (horse proportions); about 310 wide, 370 tall. mane = [mane, tail, forelock] */
function unicorn(a, body = 'none', mane = ['pink', 'purple', 'blue'], horn = 'yellow', hoof = 'purple') {
  horse(a, { body, mane, horn, hoof, cheek: 'pink', name: 'unicorn' });
}
/** a pony: the unicorn's horse with no horn, a one-colour mane and tail */
function pony(a, coat = 'brown', mane = 'black', hoof = 'grey') {
  horse(a, { body: coat, mane: [mane, mane, mane], horn: null, hoof, cheek: null, name: 'pony' });
}
function horse(a, o) {
  const { body, mane, horn, hoof } = o;
  a.group(o.name, () => {
    const leg = (x0, x1) => { a.region(outline([[x0, -110], [x1, -110], [x1, -24], [x1 + 2, 0, 1], [x0 - 2, 0, 1], [x0, -24]]), body, 'far leg');
      a.region(outline([[x0, -34], [x1, -34], [x1 + 2, 0, 1], [x0 - 2, 0, 1]]), hoof, 'hoof'); };
    leg(42, 76); leg(-62, -28);
    // a flowing two-colour tail from the rump
    a.region(outline([[-112, -172], [-156, -160], [-184, -108], [-180, -40], [-156, -58], [-146, -108], [-118, -136]]), mane[0], 'tail');
    if (mane[1] !== mane[0]) a.region(outline([[-124, -162], [-166, -126], [-176, -64], [-150, -80], [-138, -120], [-116, -142]]), mane[1], 'tail stripe');
    // horn and ear behind the head, rooted inside it
    if (horn) a.region(outline([[114, -300], [140, -298], [136, -372, 1]]), horn, 'horn');
    const one = mane[0] === mane[1] && mane[1] === mane[2];
    const drawEar = () => a.region(outline([[92, -292], [88, -342, 1], [120, -302]]), body, 'ear');
    if (!one) drawEar();
    // THE silhouette (horse proportions: a deep body, the chest in front of the front legs, a slanting neck)
    a.region(outline([[-120, -176], [-50, -192], [30, -196], [52, -228], [70, -264], [90, -294], [114, -308],
      [148, -294], [174, -258], [182, -232], [168, -214], [140, -218], [122, -230], [108, -212], [112, -186],
      [116, -150], [108, -120], [100, -106], [100, -24], [102, 0, 1], [68, 0, 1], [68, -24], [66, -98],
      [20, -94], [-40, -94], [-58, -100], [-58, -24], [-54, 0, 1], [-88, 0, 1], [-88, -24], [-98, -112],
      [-118, -136], [-128, -158]]), body, o.name);
    a.region(outline([[68, -30], [100, -30], [102, 0, 1], [68, 0, 1]]), hoof, 'hoof');
    a.region(outline([[-88, -30], [-58, -30], [-54, 0, 1], [-88, 0, 1]]), hoof, 'hoof');
    // a rainbow mane ON the back of the neck: each lock overlaps the neck's edge (they floated beside it)
    if (one) {
      a.region(outline([[44, -196], [8, -224], [26, -262], [48, -298], [80, -322], [104, -302], [80, -266], [62, -232]]), mane[0], 'mane');
      drawEar();
    } else {
      a.region(outline([[44, -196], [62, -232], [36, -252], [8, -226], [12, -196]]), mane[2], 'mane');
      a.region(outline([[60, -228], [80, -266], [54, -286], [24, -262], [32, -232]]), mane[1], 'mane');
      a.region(outline([[78, -262], [104, -302], [80, -320], [46, -298], [50, -266]]), mane[0], 'mane');
    }
    P.eye(a, 140, -260, 1.15);
    if (o.cheek) a.region(ellipse(162, -230, 15, 11), o.cheek, 'cheek');
    else a.ink(ellipse(170, -238, 4, 3));
    P.smile(a, 170, -218, 6, 2);
  });
}

/** a bear WALKING on all fours on y = 0, facing right; about 370 wide, 230 tall */
function bear(a, fur = 'brown', muzzle = 'orange', inner = 'orange', scarf = null) {
  a.group('bear', () => {
    const leg = (x0, x1) => a.region(outline([[x0, -76], [x1, -76], [x1 + 2, -16], [x1 + 6, 0, 1], [x0 - 2, 0, 1], [x0, -16]]), fur, 'far leg');
    leg(52, 84); leg(-34, 0);
    a.region(circle(-138, -106, 24), fur, 'tail');
    a.region(circle(122, -196, 26), fur, 'ear');
    a.region(outline([[-140, -90], [-122, -140], [-62, -168], [0, -176], [52, -166], [84, -170], [104, -190],
      [140, -204], [178, -194], [198, -168], [216, -152], [234, -140], [228, -118], [198, -108], [160, -100],
      [132, -86], [122, -50], [124, -16], [132, 0, 1], [84, 0, 1], [84, -20], [80, -56], [40, -62], [-20, -60],
      [-48, -62], [-48, -16], [-42, 0, 1], [-92, 0, 1], [-96, -20], [-118, -56], [-138, -70]]), fur, 'bear');
    a.region(circle(164, -208, 32), fur, 'ear'); if (inner !== fur) a.region(circle(168, -210, 13), inner, 'inner ear');
    if (scarf) {   // round the neck, one end hanging down the chest
      a.region(outline([[62, -164], [88, -182], [152, -102], [124, -82]]), scarf, 'scarf');
      a.region(outline([[108, -98], [138, -102], [144, -40], [116, -36]]), scarf, 'scarf end');
    }
    a.region(ellipse(208, -134, 28, 20), muzzle, 'muzzle');
    a.ink(ellipse(230, -140, 8, 6));
    P.eye(a, 176, -162, 1.2);
    a.line(curve([[200, -120], [210, -114], [220, -120]]), 2.6);
  });
}

/** a bear SITTING, facing the viewer, on y = 0; about 230 wide, 310 tall. hold(b) draws what the paws hold, at the
 *  paws (local origin = between the paws); the paws are drawn over it. */
function bearSit(a, fur = 'brown', muzzle = 'orange', inner = 'orange', belly = 'orange', hold = null) {
  a.group('bear', () => {
    [-1, 1].forEach((k) => { a.region(circle(k * 72, -284, 32), fur, 'ear'); a.region(circle(k * 76, -290, 12), inner, 'inner ear'); });
    a.region(outline([[0, -296], [50, -288], [78, -250], [72, -206], [52, -180], [86, -152], [110, -96], [114, -40],
      [98, -8], [60, 0, 1], [-60, 0, 1], [-98, -8], [-114, -40], [-110, -96], [-86, -152], [-52, -180], [-72, -206],
      [-78, -250], [-50, -288]]), fur, 'bear');
    a.region(ellipse(0, -76, 62, 56), belly, 'belly');
    a.region(ellipse(0, -212, 34, 24), muzzle, 'muzzle');
    a.ink(ellipse(0, -224, 11, 8));
    P.eye(a, -28, -246, 1.15); P.eye(a, 28, -246, 1.15);
    a.line(curve([[-14, -200], [0, -194], [14, -200]]), 2.6);
    if (hold) a.at({ x: 0, y: -104 }, hold);
    [-1, 1].forEach((k) => a.region(outline([[k * 72, -162], [k * 100, -140], [k * 82, -104], [k * 40, -88], [k * 26, -104], [k * 48, -134]]), fur, 'arm'));
    [-1, 1].forEach((k) => { a.region(ellipse(k * 48, -18, 50, 30), fur, 'foot'); a.region(ellipse(k * 54, -16, 22, 17), inner, 'foot pad'); });
  });
}

/** a fox SITTING, facing the viewer, on y = 0; bushy tail round the right side; about 280 wide, 300 tall */
function fox(a, fur = 'orange', white = 'none', dark = 'black') {
  a.group('fox', () => {
    a.region(outline([[50, -30], [96, -56], [126, -90], [140, -116], [176, -110], [182, -70], [164, -30], [122, -4], [70, 0, 1], [40, 0, 1]]), fur, 'tail');
    a.region(outline([[132, -102], [146, -128], [168, -134], [184, -114], [180, -92], [156, -90]]), white, 'tail tip');
    [-1, 1].forEach((k) => {
      a.region(outline([[k * 82, -214], [k * 74, -304, 1], [k * 20, -252]]), fur, 'ear');
      a.region(outline([[k * 64, -232], [k * 64, -278, 1], [k * 40, -256]]), dark, 'inner ear');
    });
    a.region(outline([[0, -264], [46, -258], [80, -224], [94, -178, 1], [62, -160], [66, -130], [86, -80], [98, -30],
      [94, -8], [72, 0, 1], [-72, 0, 1], [-94, -8], [-98, -30], [-86, -80], [-66, -130], [-62, -160], [-94, -178, 1],
      [-80, -224], [-46, -258]]), fur, 'fox');
    a.region(outline([[-40, -152], [40, -152], [48, -90], [0, -56], [-48, -90]]), white, 'bib');
    a.region(outline([[-76, -184], [-34, -196], [0, -180], [34, -196], [76, -184], [34, -150], [0, -140], [-34, -150]]), white, 'muzzle');
    [-1, 1].forEach((k) => {
      const x0 = 0, x1 = k * 40;
      a.region(outline([[x0, -98], [x1, -98], [x1, -40], [x1 + k * 2, 0, 1], [x0, 0, 1], [x0, -40]]), fur, 'leg');
      a.region(outline([[x0, -36, 1], [x1, -36, 1], [x1 + k * 2, 0, 1], [x0, 0, 1]]), dark, 'sock');
    });
    P.eye(a, -30, -212, 1.2); P.eye(a, 30, -212, 1.2);
    a.ink(ellipse(0, -176, 10, 8));
    a.line(curve([[-12, -160], [0, -154], [12, -160]]), 2.6);
  });
}

/** a baby dragon SITTING up on its haunches on y = 0, facing right; about 400 wide, 330 tall */
function dragon(a, skin = 'green', belly = 'yellow', wing = 'purple', spikes = 'orange', cheek = 'pink') {
  a.group('dragon', () => {
    // spikes rooted along the back and the tail (their bases sit under the body)
    [[-126, -62, -150, -106], [-88, -98, -130, -138]].forEach(([x, y, tx, ty]) =>
      a.region(outline([[x - 26, y + 14], [tx, ty, 1], [x + 24, y - 16]]), spikes, 'spike'));
    a.region(outline([[-6, -214], [-70, -298, 1], [-74, -244], [-128, -268, 1], [-104, -210], [-158, -206, 1], [-62, -140]]), wing, 'wing');
    a.region(outline([[34, -264], [46, -330, 1], [78, -278]]), belly, 'horn');
    a.region(outline([[84, -280], [106, -336, 1], [122, -264]]), belly, 'horn');
    a.region(outline([[-176, -50, 1], [-140, -56], [-110, -76], [-76, -116], [-62, -172], [-30, -222], [4, -256],
      [44, -280], [92, -284], [134, -264], [164, -238], [178, -212], [168, -192], [140, -186], [100, -184],
      [78, -172], [86, -136], [94, -88], [84, -40], [64, 0, 1], [-70, 0, 1], [-100, -20], [-130, -28], [-156, -34]]), skin, 'dragon');
    a.region(outline([[-164, -58], [-208, -62, 1], [-178, -22, 1], [-156, -38]]), spikes, 'tail tip');
    a.region(outline([[56, -172], [84, -132], [88, -76], [72, -24], [30, -26], [26, -110], [38, -156]]), belly, 'belly');
    a.line('M34 -136L82 -136M28 -96L86 -96M30 -58L82 -58', 2.4);
    a.region(ellipse(-12, -58, 64, 52), skin, 'leg');
    a.region(outline([[-50, -20], [56, -22], [74, 0, 1], [-56, 0, 1]]), skin, 'foot');
    a.region(outline([[76, -158], [114, -138], [128, -116], [108, -108], [72, -128]]), skin, 'arm');
    P.eye(a, 116, -238, 1.2);
    a.ink(ellipse(162, -222, 4, 3));
    a.region(ellipse(124, -206, 17, 12), cheek, 'cheek');
    a.line(curve([[144, -200], [154, -196], [164, -204]]), 2.6);
  });
}

/** a round animal SITTING, facing the viewer, on y = 0 (the sitting bear's body): o = { name, fur, ear, earR, earY,
 *  inner, belly, limb, pad, muzzle, bigNose, patches, hold } — panda, koala and friends */
function sitter(a, o) {
  const fur = o.fur, limb = o.limb || fur, earR = o.earR || 32, earY = o.earY || -284;
  a.group(o.name || 'animal', () => {
    if (o.tail) a.line(curve([[90, -30], [150, -20], [170, -70], [156, -110]]), 4);   // an OPEN line: no trapped crumb
    [-1, 1].forEach((k) => { a.region(circle(k * 74, earY, earR), o.ear || fur, 'ear'); if (o.inner) a.region(circle(k * 76, earY - 2, Math.round(earR * 0.42)), o.inner, 'inner ear'); });
    a.region(outline([[0, -296], [50, -288], [78, -250], [72, -206], [52, -180], [86, -152], [110, -96], [114, -40],
      [98, -8], [60, 0, 1], [-60, 0, 1], [-98, -8], [-114, -40], [-110, -96], [-86, -152], [-52, -180], [-72, -206],
      [-78, -250], [-50, -288]]), fur, o.name || 'animal');
    if (o.belly) a.region(ellipse(0, -76, 62, 56), o.belly, 'belly');
    if (o.bow) {   // a bow tie at the neck
      [-1, 1].forEach((k) => a.region(outline([[0, -170], [k * 46, -194, 1], [k * 46, -146, 1]]), o.bow, 'bow'));
      a.region(circle(0, -170, 14), o.bow, 'knot');
    }
    if (o.muzzle) a.region(ellipse(0, -212, 34, 24), o.muzzle, 'muzzle');
    if (o.patches) {
      [-1, 1].forEach((k) => a.region(outline([[k * 10, -262], [k * 44, -270], [k * 56, -236], [k * 40, -214], [k * 14, -226]]), o.patches, 'eye patch'));
      [-1, 1].forEach((k) => { a.shine(circle(k * 32, -242, 7)); });
    } else { P.eye(a, -28, -246, 1.15); P.eye(a, 28, -246, 1.15); }
    if (o.bigNose) a.region(ellipse(0, -214, 20, 28), o.bigNose, 'nose');
    else if (o.nose) a.region(circle(0, -220, 16), o.nose, 'nose');
    else a.ink(ellipse(0, -222, 11, 8));
    a.line(curve(o.bigNose || o.nose ? [[-12, -180], [0, -174], [12, -180]] : [[-14, -200], [0, -194], [14, -200]]), 2.6);
    if (o.hold) a.at({ x: 0, y: -104 }, o.hold);
    [-1, 1].forEach((k) => a.region(outline([[k * 72, -162], [k * 100, -140], [k * 82, -104], [k * 40, -88], [k * 26, -104], [k * 48, -134]]), limb, 'arm'));
    [-1, 1].forEach((k) => { a.region(ellipse(k * 45, -18, 50, 30), limb, 'foot'); if (o.pad) a.region(ellipse(k * 54, -16, 22, 17), o.pad, 'foot pad'); });
  });
}

module.exports = { outline, giraffe, squirrel, mouse, duck, cow, bunny, unicorn, bear, bearSit, fox, pony, dragon, sitter };
