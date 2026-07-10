#!/usr/bin/env node
/* =====================================================================
   the-green-berry-art.js — FINAL art for true storybook #5 (wsv-1):
   "The Green Berry" (PK sort by color), built to the ratified
   five-little-ducklings bar.

   Bramble's berry-garden clearing: the JAM TABLE with the three color
   jars (coral / bluebird / sunshine lids) is the story's visual spine —
   empty at the tumble (s1) → filling jar by jar (s3 blue, s4 yellow) →
   three bright FULL jars at the Meadow Fair (s8). The strawberry PLANT
   in the sunny corner carries the theme: bare at s6 (the green berry
   goes home to it) → the ROSY berry glowing on it at sunset (s9).

   Paint-at-data-coords: s2/s5 grass mounds under the module target
   rects (no painted fruit — the module renders every candidate);
   s3 the blue jar ON THE SHELF at the correct slot (abs 1120,420) +
   the red jar on the table at the decoy (abs 840,640); s6 the plant
   at the correct slot (abs 1140,620) + the red jar on a side table at
   the decoy (abs 840,390); s7 red strawberries painted AT the three
   stamp dots (abs 500,560 / 780,520 / 1060,570), decoy fruits far
   left (abs ~180,600 — ≥230du from every dot).

   USAGE: node scripts/storybook/art/the-green-berry-art.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const S = require('./style-lib.js');
const pip = require('./characters/pip.js');
const bramble = require('./characters/bramble.js');
const { packCharacter, packScene } = require('../pack-atlas.js');

const REPO = path.join(__dirname, '..', '..', '..');
const STORY_DIR = path.join(REPO, 'mini tools', 'stories', 'the-green-berry');

/* ------------------------------------------------ fruit + furniture draws (shared by props + scene paint) */
function strawberryAt(x, y, s, bodyToken) {
  /* (x,y) = berry center; plump heart-round berry + leafy crown + pale seeds */
  return [
    S.pathShape(
      `M ${x - 58 * s} ${y - 22 * s}
       Q ${x - 60 * s} ${y - 62 * s} ${x} ${y - 60 * s}
       Q ${x + 60 * s} ${y - 62 * s} ${x + 58 * s} ${y - 22 * s}
       Q ${x + 52 * s} ${y + 34 * s} ${x} ${y + 62 * s}
       Q ${x - 52 * s} ${y + 34 * s} ${x - 58 * s} ${y - 22 * s} Z`,
      bodyToken, { outlined: true, sw: 6 * s }),
    S.pathShape(
      `M ${x - 36 * s} ${y - 52 * s} L ${x - 12 * s} ${y - 66 * s} L ${x} ${y - 50 * s}
       L ${x + 12 * s} ${y - 66 * s} L ${x + 36 * s} ${y - 52 * s} L ${x + 14 * s} ${y - 40 * s}
       L ${x - 14 * s} ${y - 40 * s} Z`,
      'leafDeep', { outlined: true, sw: 4 * s }),
    S.stroke(`M ${x} ${y - 66 * s} L ${x} ${y - 78 * s}`, 'leafDeep', 6 * s),
    S.ellipse(x - 24 * s, y - 8 * s, 5 * s, 7 * s, 'creamDeep'),
    S.ellipse(x + 22 * s, y - 4 * s, 5 * s, 7 * s, 'creamDeep'),
    S.ellipse(x - 2 * s, y + 24 * s, 5 * s, 7 * s, 'creamDeep'),
  ].join('');
}
function blueberryAt(x, y, s) {
  return [
    S.circle(x, y, 52 * s, 'bluebird', { outlined: true, sw: 6 * s }),
    S.pathShape(
      `M ${x - 12 * s} ${y - 34 * s} L ${x} ${y - 44 * s} L ${x + 12 * s} ${y - 34 * s}
       L ${x + 8 * s} ${y - 26 * s} L ${x - 8 * s} ${y - 26 * s} Z`,
      'night', { alpha: 0.85 }),
    S.circle(x - 16 * s, y - 12 * s, 9 * s, 'white', { alpha: 0.5 }),
  ].join('');
}
function lemonAt(x, y, s) {
  return [
    S.pathShape(
      `M ${x - 66 * s} ${y}
       Q ${x - 70 * s} ${y - 12 * s} ${x - 58 * s} ${y - 16 * s}
       Q ${x - 40 * s} ${y - 46 * s} ${x} ${y - 46 * s}
       Q ${x + 40 * s} ${y - 46 * s} ${x + 58 * s} ${y - 16 * s}
       Q ${x + 70 * s} ${y - 12 * s} ${x + 66 * s} ${y}
       Q ${x + 70 * s} ${y + 12 * s} ${x + 58 * s} ${y + 16 * s}
       Q ${x + 40 * s} ${y + 46 * s} ${x} ${y + 46 * s}
       Q ${x - 40 * s} ${y + 46 * s} ${x - 58 * s} ${y + 16 * s}
       Q ${x - 70 * s} ${y + 12 * s} ${x - 66 * s} ${y} Z`,
      'sunshine', { outlined: true, sw: 6 * s }),
    S.ellipse(x - 18 * s, y - 14 * s, 14 * s, 8 * s, 'white', { alpha: 0.45 }),
    S.circle(x + 46 * s, y - 30 * s, 7 * s, 'leafDeep'),
  ].join('');
}
function jarAt(x, y, s, lidToken, fillLevel) {
  /* (x,y) = jar BOTTOM center; fillLevel 0..1 of colored jam inside */
  const w = 110 * s, h = 130 * s;
  const parts = [
    S.rrect(x - w / 2, y - h, w, h, 16 * s, 'cream', { outlined: true, sw: 6 * s }),
  ];
  if (fillLevel > 0) {
    const fh = (h - 22 * s) * fillLevel;
    parts.push(S.rrect(x - w / 2 + 8 * s, y - 8 * s - fh, w - 16 * s, fh, 10 * s, lidToken));
  }
  parts.push(S.rrect(x - w / 2 - 8 * s, y - h - 20 * s, w + 16 * s, 30 * s, 10 * s, lidToken, { outlined: true, sw: 6 * s }));
  parts.push(S.stroke(`M ${x - w / 2 + 14 * s} ${y - h + 22 * s} L ${x - w / 2 + 14 * s} ${y - 26 * s}`, 'white', 7 * s, { alpha: 0.6 }));
  return parts.join('');
}
function tableAt(x, topY, w, s) {
  /* (x,topY) = center of the table top plank */
  return [
    S.rrect(x - w / 2, topY, w, 26 * s, 10 * s, 'sandDeep', { outlined: true, sw: 6 * s }),
    S.rrect(x - w / 2 + 30 * s, topY + 24 * s, 26 * s, 150 * s, 8 * s, 'sandDeep', { outlined: true, sw: 5 * s }),
    S.rrect(x + w / 2 - 56 * s, topY + 24 * s, 26 * s, 150 * s, 8 * s, 'sandDeep', { outlined: true, sw: 5 * s }),
  ].join('');
}
function standAt(x, topY, w, groundY) {
  /* a tall jar stand: plank on two long legs down to the ground */
  return [
    S.rrect(x - w / 2 + 18, topY + 20, 24, groundY - topY - 20, 8, 'sandDeep', { outlined: true, sw: 5 }),
    S.rrect(x + w / 2 - 42, topY + 20, 24, groundY - topY - 20, 8, 'sandDeep', { outlined: true, sw: 5 }),
    S.rrect(x - w / 2, topY, w, 24, 10, 'sandDeep', { outlined: true, sw: 6 }),
  ].join('');
}
function potAt(x, y, s, steaming) {
  /* (x,y) = pot bottom center */
  const parts = [
    S.pathShape(
      `M ${x - 96 * s} ${y - 120 * s} L ${x + 96 * s} ${y - 120 * s}
       Q ${x + 92 * s} ${y} ${x} ${y}
       Q ${x - 92 * s} ${y} ${x - 96 * s} ${y - 120 * s} Z`,
      'teal', { outlined: true, sw: 6 * s }),
    S.rrect(x - 104 * s, y - 132 * s, 208 * s, 22 * s, 10 * s, 'tealMid', { outlined: true, sw: 5 * s }),
    S.stroke(`M ${x - 112 * s} ${y - 110 * s} Q ${x - 132 * s} ${y - 96 * s} ${x - 112 * s} ${y - 82 * s} M ${x + 112 * s} ${y - 110 * s} Q ${x + 132 * s} ${y - 96 * s} ${x + 112 * s} ${y - 82 * s}`, 'outline', 7 * s),
  ];
  if (steaming) {
    parts.push(S.stroke(`M ${x - 30 * s} ${y - 150 * s} Q ${x - 46 * s} ${y - 186 * s} ${x - 26 * s} ${y - 214 * s} M ${x + 24 * s} ${y - 152 * s} Q ${x + 8 * s} ${y - 190 * s} ${x + 30 * s} ${y - 220 * s}`, 'white', 9 * s, { alpha: 0.75 }));
  }
  return parts.join('');
}
function plantAt(x, y, s, berryToken) {
  /* (x,y) = plant base center; one solid leafy strawberry bush + white
     flowers on top, optional one berry hanging at the front */
  const parts = [
    S.ellipse(x, y + 6 * s, 100 * s, 22 * s, 'leafDeep', { alpha: 0.4 }),
    S.pathShape(
      `M ${x - 104 * s} ${y}
       Q ${x - 116 * s} ${y - 62 * s} ${x - 56 * s} ${y - 76 * s}
       Q ${x - 46 * s} ${y - 128 * s} ${x} ${y - 122 * s}
       Q ${x + 46 * s} ${y - 128 * s} ${x + 56 * s} ${y - 76 * s}
       Q ${x + 116 * s} ${y - 62 * s} ${x + 104 * s} ${y}
       Z`,
      'leafDeep', { outlined: true, sw: 6 * s }),
    S.stroke(
      `M ${x - 56 * s} ${y - 62 * s} Q ${x - 62 * s} ${y - 96 * s} ${x - 58 * s} ${y - 124 * s}
       M ${x + 56 * s} ${y - 62 * s} Q ${x + 62 * s} ${y - 96 * s} ${x + 58 * s} ${y - 124 * s}
       M ${x} ${y - 100 * s} L ${x} ${y - 158 * s}`,
      'leaf', 6 * s),
    S.circle(x - 58 * s, y - 138 * s, 14 * s, 'white', { outlined: true, sw: 4 * s }),
    S.circle(x - 58 * s, y - 138 * s, 5.5 * s, 'sunshine'),
    S.circle(x + 58 * s, y - 138 * s, 14 * s, 'white', { outlined: true, sw: 4 * s }),
    S.circle(x + 58 * s, y - 138 * s, 5.5 * s, 'sunshine'),
    S.circle(x, y - 172 * s, 14 * s, 'white', { outlined: true, sw: 4 * s }),
    S.circle(x, y - 172 * s, 5.5 * s, 'sunshine'),
  ];
  if (berryToken) {
    parts.push(S.stroke(`M ${x + 34 * s} ${y - 66 * s} Q ${x + 46 * s} ${y - 40 * s} ${x + 42 * s} ${y - 18 * s}`, 'leafDeep', 5 * s));
    parts.push(strawberryAt(x + 44 * s, y + 8 * s, 0.5 * s, berryToken));
  }
  return parts.join('');
}
function basketAt(x, y, s, tipped) {
  const body =
    S.pathShape(`M ${-90 * s} 0 Q 0 ${-30 * s} ${90 * s} 0 L ${74 * s} ${46 * s} Q 0 ${68 * s} ${-74 * s} ${46 * s} Z`, 'sandDeep', { outlined: true }) +
    S.stroke(`M ${-64 * s} ${8 * s} Q 0 ${-14 * s} ${64 * s} ${8 * s}`, 'creamDeep', 8 * s);
  return `<g transform="translate(${x} ${y})${tipped ? ' rotate(-34)' : ''}">${body}</g>`;
}
function buntingAt(y) {
  /* ends well before the sun corner (x <= ~1240) */
  const flags = [];
  const cols = ['coral', 'bluebird', 'sunshine'];
  for (let i = 0; i < 7; i++) {
    const fx = 130 + i * 180;
    const fy = y + Math.sin((i / 6) * Math.PI) * 44;
    flags.push(S.pathShape(`M ${fx - 34} ${fy} L ${fx + 34} ${fy} L ${fx} ${fy + 62} Z`, cols[i % 3], { outlined: true, sw: 5 }));
  }
  return S.stroke(`M 60 ${y + 6} Q 650 ${y + 56} 1240 ${y + 2}`, 'outline', 6) + flags.join('');
}
function butterflyAt(x, y, s, wingToken) {
  return [
    S.ellipse(x - 20 * s, y - 12 * s, 20 * s, 15 * s, wingToken, { outlined: true, sw: 4 * s }),
    S.ellipse(x + 20 * s, y - 12 * s, 20 * s, 15 * s, wingToken, { outlined: true, sw: 4 * s }),
    S.ellipse(x - 17 * s, y + 12 * s, 13 * s, 10 * s, wingToken, { outlined: true, sw: 4 * s }),
    S.ellipse(x + 17 * s, y + 12 * s, 13 * s, 10 * s, wingToken, { outlined: true, sw: 4 * s }),
    S.ellipse(x, y, 5 * s, 22 * s, 'inkSoft'),
    S.stroke(`M ${x - 3 * s} ${y - 20 * s} Q ${x - 12 * s} ${y - 34 * s} ${x - 18 * s} ${y - 38 * s} M ${x + 3 * s} ${y - 20 * s} Q ${x + 12 * s} ${y - 34 * s} ${x + 18 * s} ${y - 38 * s}`, 'inkSoft', 3 * s),
  ].join('');
}
function magpieAt(x, y, s) {
  /* a little flying magpie: night body, white belly patch, spread wings */
  return [
    S.pathShape(`M ${x - 60 * s} ${y - 8 * s} Q ${x - 30 * s} ${y - 44 * s} ${x - 4 * s} ${y - 12 * s} Z`, 'night', { outlined: true, sw: 4 * s }),
    S.pathShape(`M ${x + 56 * s} ${y - 14 * s} Q ${x + 30 * s} ${y - 46 * s} ${x + 2 * s} ${y - 12 * s} Z`, 'night', { outlined: true, sw: 4 * s }),
    S.ellipse(x, y, 34 * s, 22 * s, 'night', { outlined: true, sw: 4 * s }),
    S.ellipse(x - 2 * s, y + 8 * s, 18 * s, 10 * s, 'white'),
    S.circle(x + 26 * s, y - 10 * s, 13 * s, 'night', { outlined: true, sw: 4 * s }),
    S.pathShape(`M ${x + 36 * s} ${y - 12 * s} L ${x + 52 * s} ${y - 8 * s} L ${x + 36 * s} ${y - 3 * s} Z`, 'sunshine', { outlined: true, sw: 3 * s }),
    S.eyeDot(x + 28 * s, y - 12 * s, 3.4 * s),
    S.pathShape(`M ${x - 30 * s} ${y + 6 * s} L ${x - 58 * s} ${y + 18 * s} L ${x - 34 * s} ${y + 16 * s} Z`, 'night', { outlined: true, sw: 3 * s }),
  ].join('');
}
function sunCorner() {
  return S.circle(1460, 130, 86, 'sunshine', { outlined: true, sw: 8 }) +
    S.stroke('M 1330 40 L 1290 10 M 1300 160 L 1250 160 M 1340 240 L 1300 274', 'sunshine', 10);
}

/* ------------------------------------------------ props (module-rendered story objects) */
function propDoc(inner) { return S.doc(300, 300, [inner]); }
function strawberryRedSVG() { return propDoc(strawberryAt(150, 155, 1.7, 'coral')); }
function strawberryGreenSVG() { return propDoc(strawberryAt(150, 155, 1.7, 'leaf')); }
function blueberrySVG() { return propDoc(blueberryAt(150, 155, 1.9)); }
function lemonSVG() { return propDoc(lemonAt(150, 150, 1.8)); }

/* ------------------------------------------------ scene helpers */
function daySky() {
  return S.groundBand(0, 1600, 430, 'sky') +
    S.groundBand(430, 1600, 130, 'skyPale') +
    S.cloud(340, 150, 1.2) + S.cloud(1150, 110, 1.0);
}
function sunsetSky() {
  return S.groundBand(0, 1600, 300, 'sunshine') +
    S.groundBand(300, 1600, 140, 'coral') +
    S.groundBand(440, 1600, 120, 'skyPale');
}
function meadowGround(evening) {
  return S.groundBand(560, 1600, 440, 'leaf') +
    S.hill(300, 620, 520, 90, evening ? 'leafDeep' : 'mint') +
    S.hill(1320, 630, 560, 100, evening ? 'leafDeep' : 'mint') +
    S.pathShape('M 0 1000 L 0 920 Q 480 880 900 916 Q 1300 948 1600 914 L 1600 1000 Z', 'leafDeep', { alpha: evening ? 0.6 : 0.35 }) +
    S.grass(240, 900, 1.2, 'leafDeep') + S.grass(1330, 880, 1.1, 'leafDeep') + S.grass(760, 940, 1.0, 'leafDeep');
}
function jamTable(x, topY, s, fills) {
  /* the spine: table + the three jars (red, blue, yellow lids), fills = [r,b,y] 0..1 */
  return tableAt(x, topY, 560 * s, s) +
    jarAt(x - 180 * s, topY + 2, s, 'coral', fills[0]) +
    jarAt(x, topY + 2, s, 'bluebird', fills[1]) +
    jarAt(x + 180 * s, topY + 2, s, 'sunshine', fills[2]);
}

/* ------------------------------------------------ scenes */
function sceneSVG(n) {
  const parts = [];

  if (n === 1) {
    /* jam-day morning: the table with three EMPTY jars, the tumble — tipped
       basket, fruit scattered, the root, motion arcs; the plant far right */
    parts.push(daySky(), sunCorner(), meadowGround(false));
    parts.push(jamTable(430, 620, 1.0, [0, 0, 0]));
    parts.push(plantAt(1300, 890, 1.0, null));
    parts.push(S.stroke('M 560 918 Q 620 878 680 916 Q 640 900 600 906', 'outline', 9));
    parts.push(basketAt(830, 840, 1.0, true));
    parts.push(strawberryAt(980, 880, 0.6, 'coral'));
    parts.push(blueberryAt(1090, 910, 0.7));
    parts.push(strawberryAt(760, 950, 0.55, 'coral'));
    parts.push(lemonAt(920, 950, 0.6));
    parts.push(blueberryAt(1040, 960, 0.6));
    parts.push(S.stroke('M 900 780 Q 990 720 1080 760', 'outline', 6));
  } else if (n === 2) {
    /* find the reds in the tall grass: grass mounds under every module target
       (reds c 390,540 / 810,390 / 1210,570; blues c 590,660 / 1010,660);
       NO painted fruit. The jam table small in the background left. */
    parts.push(daySky(), meadowGround(false));
    parts.push(jamTable(280, 560, 0.62, [0, 0, 0]));
    parts.push(S.hill(440, 800, 170, 40, 'leafDeep'));
    parts.push(S.hill(930, 800, 170, 40, 'leafDeep'));
    parts.push(S.grass(330, 760, 1.3, 'leafDeep'), S.grass(560, 770, 1.2, 'leafDeep'));
    parts.push(S.grass(820, 760, 1.2, 'leafDeep'), S.grass(1040, 770, 1.2, 'leafDeep'));
    parts.push(S.grass(680, 640, 1.2, 'leafDeep'), S.grass(1150, 640, 1.2, 'leafDeep'));
    parts.push(S.grass(590, 860, 1.2, 'leafDeep'), S.grass(1230, 860, 1.2, 'leafDeep'));
  } else if (n === 3) {
    /* blueberry into the BLUE jar: shelf at the correct slot (abs 1120,420) with
       the BLUE jar on it; the RED jar on the table at the decoy (abs 840,640);
       the yellow jar keeps the trio on the table's right end */
    parts.push(daySky(), meadowGround(false));
    parts.push(S.water(520, 1600, 44, 'bluebird', 'skyPale'));
    parts.push(magpieAt(390, 350, 1.1));
    parts.push(standAt(1120, 452, 340, 860));
    parts.push(jarAt(1120, 450, 1.0, 'bluebird', 0));
    parts.push(tableAt(1030, 668, 620, 1.0));
    parts.push(jarAt(860, 668, 1.0, 'coral', 0.35));
    parts.push(jarAt(1260, 668, 1.0, 'sunshine', 0));
    parts.push(plantAt(340, 900, 0.9, null));
  } else if (n === 4) {
    /* the YELLOW call: Bramble's pot steams at the right (near his overlay);
       the jam table in the back left (blue jar now part-full); NO painted
       fruit inside the listen zone (module renders lemon + strawberry) */
    parts.push(daySky(), meadowGround(false));
    parts.push(jamTable(280, 560, 0.62, [0.35, 0.5, 0]));
    parts.push(potAt(1150, 965, 1.05, true));
    parts.push(S.stroke('M 1100 800 Q 1088 766 1102 738 M 1150 792 Q 1140 756 1154 726 M 1204 800 Q 1194 768 1208 740', 'white', 9, { alpha: 0.75 }));
    parts.push(S.circle(1078, 812, 8, 'sunshine'), S.circle(1226, 806, 8, 'sunshine'), S.circle(1152, 786, 7, 'sunshine'));
    parts.push(S.grass(480, 880, 1.1, 'leafDeep'), S.grass(940, 930, 1.0, 'leafDeep'));
  } else if (n === 5) {
    /* the dip: last strawberries in the grass — mounds under the module targets
       (green c 770,510; reds c 390,530 / 1150,540); NO painted fruit */
    parts.push(daySky(), meadowGround(false));
    parts.push(jamTable(280, 560, 0.62, [0.35, 0.5, 0.5]));
    parts.push(S.hill(450, 750, 170, 40, 'leafDeep'));
    parts.push(S.hill(770, 735, 170, 40, 'leafDeep'));
    parts.push(S.hill(1130, 755, 170, 40, 'leafDeep'));
    parts.push(basketAt(950, 800, 0.75, true));
    parts.push(S.grass(300, 700, 1.3, 'leafDeep'), S.grass(530, 710, 1.2, 'leafDeep'));
    parts.push(S.grass(660, 690, 1.2, 'leafDeep'), S.grass(900, 700, 1.2, 'leafDeep'));
    parts.push(S.grass(1010, 700, 1.2, 'leafDeep'), S.grass(1260, 710, 1.2, 'leafDeep'));
  } else if (n === 6) {
    /* the sunny corner: the strawberry PLANT at the correct slot (abs 1140,620),
       bathed by the sun; the RED jar on a small side table at the decoy
       (abs 840,390); no other fruit */
    parts.push(daySky(), sunCorner(), meadowGround(false));
    parts.push(tableAt(860, 684, 300, 0.9));
    parts.push(jarAt(860, 684, 0.9, 'coral', 0.35));
    parts.push(plantAt(1140, 700, 1.15, null));
    parts.push(S.grass(1000, 760, 1.2, 'leafDeep'), S.grass(1300, 770, 1.2, 'leafDeep'));
  } else if (n === 7) {
    /* the pot: red strawberries painted AT the three stamp dots
       (abs 500,560 / 780,520 / 1060,570); decoy blueberry + lemon far left
       (abs ~180,600); the pot steams at the right */
    parts.push(daySky(), meadowGround(false));
    parts.push(buntingAt(110));
    parts.push(jamTable(250, 470, 0.55, [0.35, 0.5, 0.5]));
    parts.push(S.hill(500, 700, 170, 40, 'leafDeep'));
    parts.push(S.hill(780, 680, 170, 40, 'leafDeep'));
    parts.push(S.hill(1060, 710, 170, 40, 'leafDeep'));
    parts.push(strawberryAt(500, 600, 0.85, 'coral'));
    parts.push(strawberryAt(780, 580, 0.85, 'coral'));
    parts.push(strawberryAt(1060, 610, 0.85, 'coral'));
    parts.push(blueberryAt(150, 640, 0.8));
    parts.push(lemonAt(230, 700, 0.7));
    parts.push(potAt(1180, 965, 1.05, true));
  } else if (n === 8) {
    /* the Meadow Fair: bunting, the three FULL jars in a bright row, butterflies */
    parts.push(daySky(), sunCorner(), meadowGround(false));
    parts.push(buntingAt(120));
    parts.push(jamTable(800, 620, 1.1, [1, 1, 1]));
    parts.push(butterflyAt(420, 380, 1.1, 'coral'));
    parts.push(butterflyAt(1210, 360, 1.0, 'bluebird'));
    parts.push(S.sparkle(600, 300, 1.0, 'white'), S.sparkle(1050, 260, 0.9, 'white'));
  } else {
    /* n === 9 — sunset: the plant close at the right with the ROSY berry;
       the table with the three jars resting left; golden light */
    parts.push(sunsetSky(), meadowGround(true));
    parts.push(S.circle(260, 210, 90, 'coral', { outlined: true, sw: 8 }));
    parts.push(jamTable(430, 640, 0.85, [1, 1, 1]));
    parts.push(plantAt(1180, 840, 1.5, 'coral'));
    parts.push(S.grass(980, 880, 1.2, 'leafDeep'), S.grass(1400, 900, 1.2, 'leafDeep'));
    parts.push(S.sparkle(700, 260, 1.0, 'white'), S.sparkle(1350, 320, 0.9, 'white'));
  }
  return S.doc(1600, 1000, parts);
}

/* ------------------------------------------------ run */
(async () => {
  S.resetColorsUsed();
  const tmp = path.join(os.tmpdir(), 'sb-art-the-green-berry');
  fs.rmSync(tmp, { recursive: true, force: true });
  const written = [];

  console.log('[art] pip frames…');
  await S.standardPoseSet(path.join(tmp, 'pip'), pip.render, pip.spec);
  const pipOut = path.join(STORY_DIR, 'cast', 'pip');
  (await packCharacter(path.join(tmp, 'pip'), 'pip', pipOut)).forEach((f) => written.push(path.join(pipOut, f)));

  console.log('[art] bramble frames…');
  await S.standardPoseSet(path.join(tmp, 'bramble'), bramble.render, bramble.spec);
  const bOut = path.join(STORY_DIR, 'cast', 'bramble');
  (await packCharacter(path.join(tmp, 'bramble'), 'bramble', bOut)).forEach((f) => written.push(path.join(bOut, f)));

  console.log('[art] scenes…');
  for (let n = 1; n <= 9; n++) {
    const png = path.join(tmp, 'scenes', `page-0${n}.png`);
    await S.renderPng(sceneSVG(n), png);
    written.push(await packScene(png, path.join(STORY_DIR, 'scenes')));
  }

  console.log('[art] props…');
  const P = path.join(STORY_DIR, 'props');
  written.push(await S.renderWebp(strawberryRedSVG(), path.join(P, 'strawberry-red@2x.webp')));
  written.push(await S.renderWebp(strawberryGreenSVG(), path.join(P, 'strawberry-green@2x.webp')));
  written.push(await S.renderWebp(blueberrySVG(), path.join(P, 'blueberry@2x.webp')));
  written.push(await S.renderWebp(lemonSVG(), path.join(P, 'lemon@2x.webp')));

  const manifestPath = S.emitArtManifest(STORY_DIR, written);
  console.log('[art] ' + manifestPath);
  console.log('[art] done — ' + written.length + ' files.');
})().catch((e) => { console.error('[art] FAIL: ' + (e.stack || e.message)); process.exit(1); });
