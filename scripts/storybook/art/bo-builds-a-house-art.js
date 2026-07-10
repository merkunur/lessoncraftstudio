#!/usr/bin/env node
/* =====================================================================
   bo-builds-a-house-art.js — FINAL art for library story #12 (wsv-1).

   Bo's brand-new riverside house rises page by page (the running
   payoff): frame + doorway → orange door on → window opening → shutter
   wall → hallway → furnished room → picture wall → the finished house
   at golden evening, whose grand oval window the child lights with the
   finale connect-the-dots. Every scene paints its page's interaction
   art at the EXACT abs data coords (zone offset + taskData rects):
     s1/s2 door (640,300,320,440) · s3 window opening (550,300,500,360)
     s4 raw-wood shutters (320,420)(660,420)(1000,420) each 280x380
     s8 gable wall kept calm across the oval-dots zone (400,150,800,620).
   Bo's fixed cart from #2 cameos hauling planks (cast-bible continuity).
   Solid palette layers only; small glow alphas only (the #8 rule).

   USAGE: node scripts/storybook/art/bo-builds-a-house-art.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const S = require('./style-lib.js');
const pip = require('./characters/pip.js');
const bo = require('./characters/bo.js');
const { packCharacter, packScene } = require('../pack-atlas.js');

const REPO = path.join(__dirname, '..', '..', '..');
const STORY_DIR = path.join(REPO, 'mini tools', 'stories', 'bo-builds-a-house');

/* ------------------------------------------------ props (baked-attribute pairs:
   each pair differs ONLY in its shape — frames/colors normalized) */
function windowOvalSVG() {
  return S.doc(300, 340, [
    S.ellipse(150, 170, 118, 150, 'sandDeep', { outlined: true }),
    S.ellipse(150, 170, 84, 114, 'skyPale', { outlined: true, sw: 6 }),
    S.stroke('M 108 96 Q 130 78 158 74', 'white', 8),
  ]);
}
function windowRectSVG() {
  return S.doc(300, 340, [
    S.rrect(40, 20, 220, 300, 18, 'sandDeep', { outlined: true }),
    S.rrect(74, 54, 152, 232, 10, 'skyPale', { outlined: true, sw: 6 }),
    S.stroke('M 92 84 Q 112 68 138 64', 'white', 8),
  ]);
}
function ovalMirrorSVG() {
  return S.doc(300, 340, [
    S.ellipse(150, 170, 112, 146, 'berry', { outlined: true }),
    S.ellipse(150, 170, 80, 112, 'skyPale', { outlined: true, sw: 6 }),
    S.stroke('M 106 100 Q 128 80 156 76', 'white', 9),
  ]);
}
function rectDoormatSVG() {
  return S.doc(300, 200, [
    S.rrect(20, 40, 260, 120, 14, 'coral', { outlined: true }),
    S.rrect(46, 64, 208, 72, 8, 'creamDeep', { outlined: true, sw: 5 }),
    S.stroke('M 88 100 L 212 100', 'coral', 10),
  ]);
}
function ovalRugSVG() {
  return S.doc(300, 200, [
    S.ellipse(150, 100, 140, 82, 'teal', { outlined: true }),
    S.ellipse(150, 100, 102, 54, 'tealMid', { outlined: true, sw: 5 }),
  ]);
}
function rectShelfSVG() {
  return S.doc(300, 380, [
    S.rrect(40, 20, 220, 340, 14, 'sandDeep', { outlined: true }),
    S.rrect(58, 40, 184, 300, 8, 'creamDeep'),
    S.stroke('M 58 140 L 242 140 M 58 240 L 242 240', 'sandDeep', 10),
    /* books per shelf */
    S.rrect(72, 76, 34, 62, 5, 'coral', { outlined: true, sw: 4 }),
    S.rrect(112, 84, 30, 54, 5, 'sunshine', { outlined: true, sw: 4 }),
    S.rrect(148, 72, 36, 66, 5, 'bluebird', { outlined: true, sw: 4 }),
    S.rrect(84, 178, 34, 60, 5, 'berry', { outlined: true, sw: 4 }),
    S.rrect(124, 186, 30, 52, 5, 'teal', { outlined: true, sw: 4 }),
    S.rrect(96, 278, 36, 60, 5, 'orange', { outlined: true, sw: 4 }),
    S.rrect(140, 286, 30, 52, 5, 'coral', { outlined: true, sw: 4 }),
  ]);
}
function circleClockSVG() {
  return S.doc(300, 300, [
    S.circle(150, 150, 120, 'cream', { outlined: true }),
    S.circle(150, 150, 98, 'white', { outlined: true, sw: 5 }),
    S.eyeDot(150, 70, 7), S.eyeDot(230, 150, 7), S.eyeDot(150, 230, 7), S.eyeDot(70, 150, 7),
    S.stroke('M 150 150 L 150 92', 'outline', 10),
    S.stroke('M 150 150 L 196 150', 'outline', 10),
    S.circle(150, 150, 12, 'coral', { outlined: true, sw: 5 }),
  ]);
}
function rectFrameSVG() {
  return S.doc(300, 340, [
    S.rrect(30, 25, 240, 290, 14, 'sunshine', { outlined: true }),
    S.rrect(64, 59, 172, 222, 8, 'skyPale', { outlined: true, sw: 6 }),
    S.pathShape('M 70 275 Q 150 210 230 275 L 230 275 Q 150 275 70 275 Z', 'mint', { outlined: true, sw: 5 }),
    S.circle(112, 128, 26, 'sunshine', { outlined: true, sw: 5 }),
  ]);
}
function ovalFrameSVG() {
  return S.doc(300, 340, [
    S.ellipse(150, 170, 118, 150, 'sunshine', { outlined: true }),
    S.ellipse(150, 170, 84, 114, 'skyPale', { outlined: true, sw: 6 }),
    S.pathShape('M 78 214 Q 150 168 222 214 L 222 244 Q 150 268 78 244 Z', 'mint', { outlined: true, sw: 5 }),
    S.circle(118, 128, 22, 'sunshine', { outlined: true, sw: 5 }),
  ]);
}

/* ------------------------------------------------ Bo's fixed cart cameo (from #2 stage D, hauling planks) */
function cartCameo(x, y, s) {
  const bed = S.rrect(-140, -34, 280, 34, 10, 'sandDeep', { outlined: true, sw: 8 });
  const handle = S.stroke('M -136 -26 Q -196 -60 -216 -96', 'outline', 20) +
    S.stroke('M -136 -26 Q -196 -60 -216 -96', 'sandDeep', 11);
  const wheel = (tx) => `<g transform="translate(${tx} 6)">${S.circle(0, 0, 46, 'coral', { outlined: true, sw: 7 })}${S.circle(0, 0, 30, 'creamDeep', { outlined: true, sw: 5 })}${S.circle(0, 0, 12, 'orangeDeep')}</g>`;
  const crate = `<g transform="translate(-10 -104)">${S.rrect(-64, 0, 128, 70, 12, 'sandDeep', { outlined: true, sw: 7 })}${S.rrect(-64, 26, 128, 16, 4, 'creamDeep')}</g>`;
  const planks = `<g transform="translate(10 -118) rotate(-9)">${S.rrect(-120, -10, 240, 18, 6, 'sandDeep', { outlined: true, sw: 5 })}</g>` +
    `<g transform="translate(2 -136) rotate(-6)">${S.rrect(-112, -9, 224, 16, 6, 'creamDeep', { outlined: true, sw: 5 })}</g>`;
  const flag = S.stroke('M 118 -34 L 118 -168', 'outline', 12) + S.stroke('M 118 -34 L 118 -168', 'sandDeep', 6) +
    S.pathShape('M 124 -164 L 208 -136 L 124 -108 Z', 'sunshine', { outlined: true, sw: 7 });
  return `<g transform="translate(${x} ${y}) scale(${s})">${bed}${handle}${crate}${planks}${flag}${wheel(-72)}${wheel(66)}</g>`;
}

/* ------------------------------------------------ scene helpers */
function outdoorBase(n) {
  return [
    S.skyGradient('sky', 'skyPale', 1600, 600),
    S.sun(230 + (n % 3) * 70, 150, 78),
    S.cloud(520 + ((n * 83) % 260), 120 + ((n * 37) % 50), 1.0, 0.9),
    S.cloud(1140 - ((n * 59) % 180), 190 + ((n * 31) % 40), 0.75, 0.8),
    /* far hills + the river behind the build site */
    S.hill(280, 570, 520, 130, 'mint'),
    S.hill(1360, 580, 560, 140, 'mint'),
    S.groundBand(590, 1600, 80, 'bluebird'),
    S.stroke('M 60 626 Q 130 618 200 626 M 1350 636 Q 1430 628 1510 636', 'skyPale', 8),
    S.groundBand(660, 1600, 340, 'leaf'),
    S.pathShape('M 0 1000 L 0 900 Q 480 850 900 896 Q 1280 936 1600 900 L 1600 1000 Z', 'sand'),
  ].join('');
}
function frontWall(withDoorOpening, withDoor) {
  const parts = [];
  /* the front wall + roof */
  parts.push(S.rrect(520, 250, 660, 510, 16, 'cream', { outlined: true }));
  parts.push(S.pathShape('M 490 260 L 850 150 L 1210 260 Z', 'sandDeep', { outlined: true }));
  /* plank seams */
  parts.push(S.stroke('M 560 380 L 620 380 M 1080 380 L 1150 380 M 560 620 L 610 620 M 1090 640 L 1150 640', 'creamDeep', 9));
  if (withDoorOpening) {
    /* the empty doorway at the EXACT p1 dot rect (640,300)-(960,740) */
    parts.push(S.rrect(640, 300, 320, 440, 14, 'creamDeep', { outlined: true, sw: 6 }));
  }
  if (withDoor) {
    parts.push(S.rrect(640, 300, 320, 440, 14, 'orange', { outlined: true }));
    parts.push(S.rrect(676, 336, 248, 176, 10, 'orangeDeep', { outlined: true, sw: 5 }));
    parts.push(S.circle(920, 540, 16, 'sunshine', { outlined: true, sw: 6 }));
  }
  /* threshold step */
  parts.push(S.rrect(628, 740, 344, 22, 8, 'sandDeep', { outlined: true, sw: 6 }));
  return parts.join('');
}
function interiorBase() {
  return [
    S.groundBand(0, 1600, 640, 'cream'),
    S.groundBand(560, 1600, 80, 'creamDeep'),
    S.groundBand(640, 1600, 360, 'sand'),
    S.stroke('M 0 760 L 1600 760 M 0 880 L 1600 880', 'sandDeep', 6),
  ].join('');
}

/* ------------------------------------------------ scenes */
function sceneSVG(n) {
  const parts = [];
  if (n === 1) {
    /* build site: frame skeleton + empty doorway; plank pile; the cart cameo */
    parts.push(outdoorBase(n));
    parts.push(S.stroke('M 520 760 L 520 260 M 1180 760 L 1180 260 M 520 260 L 1180 260 M 520 760 L 1180 760', 'outline', 16));
    parts.push(S.stroke('M 520 260 L 850 156 L 1180 260', 'sandDeep', 18));
    parts.push(S.rrect(640, 300, 320, 440, 14, 'creamDeep', { outlined: true, sw: 6 }));
    parts.push(S.rrect(628, 740, 344, 22, 8, 'sandDeep', { outlined: true, sw: 6 }));
    parts.push(`<g transform="translate(400 796) rotate(-6)">${S.rrect(-90, -8, 180, 16, 5, 'sandDeep', { outlined: true, sw: 5 })}</g>`);
    parts.push(`<g transform="translate(390 816) rotate(3)">${S.rrect(-84, -8, 168, 16, 5, 'creamDeep', { outlined: true, sw: 5 })}</g>`);
    parts.push(cartCameo(1300, 762, 0.62));
  } else if (n === 2) {
    /* the orange rectangle door is ON */
    parts.push(outdoorBase(n));
    parts.push(frontWall(false, true));
    parts.push(S.grass(320, 800, 0.9, 'leafDeep'));
  } else if (n === 3) {
    /* the wall with the big rectangle window OPENING at (550,300,500,360) */
    parts.push(outdoorBase(n));
    parts.push(S.rrect(390, 166, 820, 78, 16, 'sandDeep', { outlined: true }));
    parts.push(S.rrect(420, 240, 760, 540, 16, 'cream', { outlined: true }));
    parts.push(S.ellipse(800, 205, 56, 34, 'sandDeep', { outlined: true, sw: 6 }));
    parts.push(S.ellipse(800, 205, 36, 20, 'skyPale', { outlined: true, sw: 4 }));
    parts.push(S.rrect(550, 300, 500, 360, 12, 'skyPale', { outlined: true, sw: 6 }));
    parts.push(S.grass(300, 810, 0.9, 'leafDeep'));
    parts.push(S.grass(1330, 820, 0.85, 'leafDeep'));
  } else if (n === 4) {
    /* the shutter wall: 3 raw-wood shutters at the EXACT color-code region rects */
    parts.push(outdoorBase(n));
    parts.push(S.rrect(230, 222, 1140, 80, 16, 'sandDeep', { outlined: true }));
    parts.push(S.rrect(260, 300, 1080, 500, 16, 'cream', { outlined: true }));
    for (const rx of [320, 660, 1000]) {
      parts.push(S.rrect(rx, 420, 280, 380, 12, 'sandDeep', { outlined: true, sw: 7 }));
      parts.push(S.stroke(`M ${rx + 26} 480 L ${rx + 254} 480 M ${rx + 26} 560 L ${rx + 254} 560 M ${rx + 26} 640 L ${rx + 254} 640 M ${rx + 26} 720 L ${rx + 254} 720`, 'creamDeep', 8));
    }
  } else if (n === 5) {
    /* inside: the fresh hallway (module draws the picture cells + tray) */
    parts.push(interiorBase());
    parts.push(S.rrect(1320, 260, 180, 240, 12, 'sandDeep', { outlined: true, sw: 7 }));
    parts.push(S.rrect(1348, 288, 124, 184, 8, 'skyPale', { outlined: true, sw: 5 }));
    parts.push(S.grass(70, 960, 0.7, 'leafDeep'));
  } else if (n === 6) {
    /* the room, still bare (find-object renders the rug/shelf/clock itself) */
    parts.push(interiorBase());
    parts.push(S.rrect(40, 240, 60, 300, 10, 'creamDeep'));
    parts.push(S.circle(1544, 850, 34, 'leafDeep', { outlined: true, sw: 6 }));
    parts.push(S.rrect(1524, 880, 40, 40, 8, 'coral', { outlined: true, sw: 5 }));
  } else if (n === 7) {
    /* the room settled: rug, shelf, clock painted where the child found them */
    parts.push(interiorBase());
    parts.push(S.ellipse(440, 680, 190, 96, 'teal', { outlined: true }));
    parts.push(S.ellipse(440, 680, 138, 62, 'tealMid', { outlined: true, sw: 5 }));
    parts.push(S.rrect(1090, 250, 240, 400, 14, 'sandDeep', { outlined: true }));
    parts.push(S.rrect(1110, 272, 200, 356, 8, 'creamDeep'));
    parts.push(S.stroke('M 1110 390 L 1310 390 M 1110 510 L 1310 510', 'sandDeep', 9));
    parts.push(S.rrect(1128, 316, 36, 66, 5, 'coral', { outlined: true, sw: 4 }));
    parts.push(S.rrect(1172, 324, 32, 58, 5, 'sunshine', { outlined: true, sw: 4 }));
    parts.push(S.rrect(1210, 312, 38, 70, 5, 'bluebird', { outlined: true, sw: 4 }));
    parts.push(S.rrect(1146, 428, 36, 64, 5, 'berry', { outlined: true, sw: 4 }));
    parts.push(`<g transform="translate(855 345) scale(0.44)">${S.circle(0, 0, 120, 'cream', { outlined: true })}${S.circle(0, 0, 98, 'white', { outlined: true, sw: 5 })}${S.stroke('M 0 0 L 0 -58 M 0 0 L 46 0', 'outline', 10)}${S.circle(0, 0, 12, 'coral', { outlined: true, sw: 5 })}</g>`);
    /* the small oval mirror already home + the waiting picture nail */
    parts.push(S.ellipse(280, 330, 56, 74, 'berry', { outlined: true, sw: 6 }));
    parts.push(S.ellipse(280, 330, 38, 54, 'skyPale', { outlined: true, sw: 4 }));
    parts.push(S.eyeDot(560, 300, 8));
  } else {
    /* n === 8 — golden evening; the tall facade whose gable holds the oval-dots zone */
    parts.push(S.groundBand(0, 1600, 300, 'sky'));
    parts.push(S.groundBand(300, 1600, 160, 'skyPale'));
    parts.push(S.groundBand(460, 1600, 110, 'sunshine'));
    parts.push(S.hill(240, 600, 500, 120, 'mint'));
    parts.push(S.hill(1400, 610, 520, 130, 'mint'));
    parts.push(S.groundBand(640, 1600, 360, 'leaf'));
    parts.push(S.pathShape('M 0 1000 L 0 920 Q 520 870 940 916 Q 1300 950 1600 916 L 1600 1000 Z', 'sand'));
    /* flat-roofed facade — the whole dots zone (400,150,800,620) stays calm cream wall */
    parts.push(S.rrect(330, 66, 940, 84, 18, 'sandDeep', { outlined: true }));
    parts.push(S.rrect(360, 140, 880, 810, 16, 'cream', { outlined: true }));
    /* the door + lit windows live BELOW the zone (y > 780) */
    parts.push(S.rrect(730, 782, 140, 158, 10, 'orange', { outlined: true, sw: 7 }));
    parts.push(S.circle(848, 866, 9, 'sunshine', { outlined: true, sw: 4 }));
    parts.push(S.rrect(500, 792, 120, 104, 10, 'sunshine', { outlined: true, sw: 6 }));
    parts.push(S.rrect(980, 792, 120, 104, 10, 'sunshine', { outlined: true, sw: 6 }));
    parts.push(S.rrect(472, 792, 22, 104, 5, 'teal', { outlined: true, sw: 4 }));
    parts.push(S.rrect(626, 792, 22, 104, 5, 'teal', { outlined: true, sw: 4 }));
    parts.push(S.rrect(952, 792, 22, 104, 5, 'teal', { outlined: true, sw: 4 }));
    parts.push(S.rrect(1106, 792, 22, 104, 5, 'teal', { outlined: true, sw: 4 }));
    parts.push(cartCameo(1440, 906, 0.5));
    parts.push(S.sparkle(300, 200, 1.2, 'sunshine'), S.sparkle(1330, 240, 1.0, 'sunshine'), S.sparkle(250, 420, 0.9, 'white'));
  }
  return S.doc(1600, 1000, parts);
}

/* ------------------------------------------------ run */
(async () => {
  S.resetColorsUsed();
  const tmp = path.join(os.tmpdir(), 'sb-art-bo-builds-a-house');
  fs.rmSync(tmp, { recursive: true, force: true });
  const written = [];

  console.log('[art] pip frames…');
  await S.standardPoseSet(path.join(tmp, 'pip'), pip.render, pip.spec);
  const pipOut = path.join(STORY_DIR, 'cast', 'pip');
  (await packCharacter(path.join(tmp, 'pip'), 'pip', pipOut)).forEach((f) => written.push(path.join(pipOut, f)));

  console.log('[art] bo frames…');
  await S.standardPoseSet(path.join(tmp, 'bo'), bo.render, bo.spec);
  const boOut = path.join(STORY_DIR, 'cast', 'bo');
  (await packCharacter(path.join(tmp, 'bo'), 'bo', boOut)).forEach((f) => written.push(path.join(boOut, f)));

  console.log('[art] scenes…');
  for (let n = 1; n <= 8; n++) {
    const png = path.join(tmp, 'scenes', `page-0${n}.png`);
    await S.renderPng(sceneSVG(n), png);
    written.push(await packScene(png, path.join(STORY_DIR, 'scenes')));
  }

  console.log('[art] props…');
  const P = path.join(STORY_DIR, 'props');
  written.push(await S.renderWebp(windowOvalSVG(), path.join(P, 'window-oval@2x.webp')));
  written.push(await S.renderWebp(windowRectSVG(), path.join(P, 'window-rect@2x.webp')));
  written.push(await S.renderWebp(ovalMirrorSVG(), path.join(P, 'oval-mirror@2x.webp')));
  written.push(await S.renderWebp(rectDoormatSVG(), path.join(P, 'rect-doormat@2x.webp')));
  written.push(await S.renderWebp(ovalRugSVG(), path.join(P, 'oval-rug@2x.webp')));
  written.push(await S.renderWebp(rectShelfSVG(), path.join(P, 'rect-shelf@2x.webp')));
  written.push(await S.renderWebp(circleClockSVG(), path.join(P, 'circle-clock@2x.webp')));
  written.push(await S.renderWebp(rectFrameSVG(), path.join(P, 'rect-frame@2x.webp')));
  written.push(await S.renderWebp(ovalFrameSVG(), path.join(P, 'oval-frame@2x.webp')));

  const manifestPath = S.emitArtManifest(STORY_DIR, written);
  console.log('[art] ' + manifestPath);
  console.log('[art] done — ' + written.length + ' files.');
})().catch((e) => { console.error('[art] FAIL: ' + (e.stack || e.message)); process.exit(1); });
