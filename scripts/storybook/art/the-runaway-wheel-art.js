#!/usr/bin/env node
/* =====================================================================
   the-runaway-wheel-art.js — FINAL art for true storybook #2 (wsv-1):
   "The Runaway Wheel" (PK circle/square/triangle).

   The art carries the plot: Bo's TILTED cart missing its wheel (s1-2),
   the runaway wheel shrinking down the lane (s1 big-ish → s3 tiny),
   the rolling TRAIL painted under the trace (s3), round pumpkins
   around the find rect (s4), the muddy wheel BIG under the counting
   dots (s6, abs c(800,500) r~200), the cart's empty ROUND axle hole
   painted under the correct slot (s7, abs 1060,570) with the square
   crate under the decoy slot (abs 760,400), and the golden homecoming
   with the whole cart rolling (s9). Bright rolling-hills day
   (differentiates from FLD's dusk). Motion arcs = small strokes.

   USAGE: node scripts/storybook/art/the-runaway-wheel-art.js
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
const STORY_DIR = path.join(REPO, 'mini tools', 'stories', 'the-runaway-wheel');

/* ------------------------------------------------ shared draws */
function wheelAt(x, y, s) {
  const spokes = [];
  for (let k = 0; k < 3; k++) {
    const a = (k * 60 * Math.PI) / 180;
    spokes.push(S.stroke(`M ${x - Math.cos(a) * 78 * s} ${y - Math.sin(a) * 78 * s} L ${x + Math.cos(a) * 78 * s} ${y + Math.sin(a) * 78 * s}`, 'orangeDeep', 12 * s));
  }
  return [
    S.circle(x, y, 100 * s, 'coral', { outlined: true, sw: 8 * s }),
    S.circle(x, y, 72 * s, 'creamDeep', { outlined: true, sw: 6 * s }),
    spokes.join(''),
    S.circle(x, y, 20 * s, 'orangeDeep', { outlined: true, sw: 5 * s }),
  ].join('');
}
function rollArcs(x, y, s) {
  return S.stroke(`M ${x - 150 * s} ${y - 60 * s} Q ${x - 110 * s} ${y - 110 * s} ${x - 40 * s} ${y - 120 * s}`, 'outline', 7 * s) +
    S.stroke(`M ${x - 170 * s} ${y + 10 * s} Q ${x - 140 * s} ${y - 40 * s} ${x - 90 * s} ${y - 60 * s}`, 'outline', 5 * s);
}
function pumpkinAt(x, y, s) {
  return [
    S.ellipse(x, y, 95 * s, 78 * s, 'orangeDeep', { outlined: true }),
    S.ellipse(x - 40 * s, y, 26 * s, 70 * s, 'orange', { alpha: 0.5 }),
    S.ellipse(x + 40 * s, y, 26 * s, 70 * s, 'orange', { alpha: 0.5 }),
    S.stroke(`M ${x} ${y - 74 * s} Q ${x + 6 * s} ${y - 96 * s} ${x + 16 * s} ${y - 102 * s}`, 'leafDeep', 10 * s),
  ].join('');
}
/* Bo's cart — parameterized story state */
function cartAt(x, y, s, o) {
  o = o || {};
  const tilt = o.tilt ? `rotate(${o.tilt})` : '';
  const bed = S.rrect(-150, -40, 300, 40, 12, 'sandDeep', { outlined: true, sw: 8 });
  const handle = S.stroke('M -146 -30 Q -210 -66 -230 -104', 'outline', 20) +
    S.stroke('M -146 -30 Q -210 -66 -230 -104', 'sandDeep', 11);
  const wheelBack = o.missingWheel ? '' : `<g transform="translate(-78 8)">${wheelAt(0, 0, 0.52)}</g>`;
  const wheelFront = `<g transform="translate(72 8)">${wheelAt(0, 0, 0.52)}</g>`;
  const axleHole = o.missingWheel ? S.circle(-78, 8, 26, 'outline', { alpha: 0.85 }) : '';
  const crate = o.crate ? `<g transform="translate(-6 -116)">${S.rrect(-70, 0, 140, 76, 12, 'sandDeep', { outlined: true, sw: 7 })}${S.rrect(-70, 28, 140, 18, 5, 'creamDeep')}</g>` : '';
  const flag = o.flag
    ? S.stroke('M 124 -40 L 124 -180', 'outline', 12) + S.stroke('M 124 -40 L 124 -180', 'sandDeep', 6) +
      S.pathShape('M 130 -176 L 216 -146 L 130 -116 Z', 'sunshine', { outlined: true, sw: 7 })
    : '';
  return `<g transform="translate(${x} ${y}) scale(${s})"><g transform="${tilt}">${bed}${handle}${crate}${flag}</g>${axleHole}${wheelBack}${wheelFront}</g>`;
}

/* ------------------------------------------------ props (300-canvas) */
function circleTileSVG() {
  return S.doc(300, 300, [S.circle(150, 150, 118, 'coral', { outlined: true })]);
}
function squareTileSVG() {
  return S.doc(300, 300, [S.rrect(34, 34, 232, 232, 24, 'teal', { outlined: true })]);
}
function wheelSVG() {
  return S.doc(300, 300, [wheelAt(150, 150, 1.44)]);
}
function pumpkinSVG() {
  return S.doc(300, 300, [pumpkinAt(150, 170, 1.35)]);
}
function barrelSVG() {
  return S.doc(300, 320, [
    S.rrect(52, 50, 196, 230, 40, 'sandDeep', { outlined: true }),
    S.stroke('M 58 120 Q 150 138 242 120 M 58 210 Q 150 228 242 210', 'creamDeep', 12),
    S.ellipse(150, 52, 96, 26, 'creamDeep', { outlined: true, sw: 6 }),
    /* the wheel rim peeking out — the giveaway */
    S.pathShape('M 96 44 A 62 62 0 0 1 204 44 L 186 56 A 44 44 0 0 0 114 56 Z', 'coral', { outlined: true, sw: 5 }),
  ]);
}
function crateSVG() {
  return S.doc(300, 300, [
    S.rrect(34, 34, 232, 232, 20, 'sandDeep', { outlined: true }),
    S.rrect(48, 118, 204, 28, 6, 'creamDeep'),
    S.rrect(48, 186, 204, 28, 6, 'creamDeep'),
  ]);
}
function flagSVG() {
  return S.doc(300, 320, [
    S.stroke('M 84 30 L 84 290', 'outline', 22),
    S.stroke('M 84 30 L 84 290', 'sandDeep', 12),
    S.pathShape('M 96 42 L 264 96 L 96 152 Z', 'sunshine', { outlined: true }),
  ]);
}
function potSVG() {
  return S.doc(300, 300, [
    S.circle(150, 170, 100, 'tealMid', { outlined: true }),
    S.ellipse(150, 86, 78, 24, 'teal', { outlined: true, sw: 6 }),
    S.stroke('M 92 130 Q 116 110 148 106', 'white', 7),
  ]);
}

/* ------------------------------------------------ scenes */
function skyDay() {
  return S.skyGradient('sky', 'skyPale', 1600, 600) + S.sun(250, 150, 78) +
    S.cloud(620, 120, 1.0, 0.9) + S.cloud(1180, 200, 0.75, 0.8);
}
function skyGolden() {
  return S.groundBand(0, 1600, 320, 'sky') + S.groundBand(320, 1600, 150, 'skyPale') +
    S.groundBand(470, 1600, 110, 'sunshine') + S.sun(300, 480, 76);
}
function hillsAndGround(golden) {
  return S.hill(320, 665, 540, 120, 'mint') + S.hill(820, 672, 460, 100, 'mint') +
    S.hill(1330, 668, 560, 130, 'mint') +
    S.groundBand(660, 1600, 340, 'leaf') +
    S.pathShape('M 0 1000 L 0 920 Q 500 870 940 912 Q 1300 944 1600 912 L 1600 1000 Z', 'sand');
}
function laneBand() {
  return S.pathShape('M 0 900 Q 420 840 860 880 Q 1240 916 1600 884 L 1600 960 Q 1240 992 860 956 Q 420 918 0 976 Z', 'sandDeep', { alpha: 0.5 });
}
function sceneSVG(n) {
  const parts = [];
  parts.push(n === 9 ? skyGolden() : skyDay());
  parts.push(hillsAndGround(n === 9));

  if (n === 1) {
    /* the pop: tilted cart missing its wheel; the runaway wheel mid-roll downhill */
    parts.push(laneBand());
    parts.push(cartAt(1180, 880, 1.0, { missingWheel: true, tilt: -7, crate: true, flag: true }));
    parts.push(wheelAt(640, 800, 0.9));
    parts.push(rollArcs(640, 800, 0.9));
    parts.push(S.rock(360, 918, 0.6, 'sandDeep', 'creamDeep'));
  } else if (n === 2) {
    /* the square crate wedged under the cart — bump, bump; the wheel tiny downhill */
    parts.push(laneBand());
    parts.push(cartAt(1150, 870, 0.95, { missingWheel: true, tilt: -4 }));
    parts.push(`<g transform="translate(1042 878)">${S.rrect(-54, -54, 108, 108, 12, 'teal', { outlined: true, sw: 7 })}${S.rrect(-54, -12, 108, 14, 4, 'creamDeep')}</g>`);
    parts.push(S.stroke('M 960 800 Q 985 780 1010 796 M 990 830 Q 1015 810 1040 826', 'outline', 6));
    parts.push(wheelAt(330, 830, 0.5));
    parts.push(rollArcs(330, 830, 0.5));
  } else if (n === 3) {
    /* the rolling trail under the trace (abs (380,320)->(1120,560)); wheel tinier */
    parts.push(S.pathShape('M 360 300 Q 520 350 680 400 Q 860 455 1120 540 L 1100 590 Q 840 505 660 450 Q 500 400 340 348 Z', 'sandDeep', { alpha: 0.75 }));
    parts.push(S.stroke('M 420 356 L 470 372 M 620 420 L 670 436 M 830 486 L 880 502', 'creamDeep', 9));
    parts.push(wheelAt(1210, 620, 0.42));
    parts.push(rollArcs(1210, 620, 0.42));
    parts.push(S.grass(300, 780, 0.9, 'leafDeep'), S.grass(1360, 820, 0.85, 'leafDeep'));
  } else if (n === 4) {
    /* the pumpkin patch around the find rect (abs 880,510,240,240) */
    parts.push(S.rrect(220, 740, 1160, 46, 20, 'sandDeep', { alpha: 0.7 }));
    parts.push(pumpkinAt(360, 660, 1.0), pumpkinAt(620, 720, 0.85), pumpkinAt(1180, 660, 0.95), pumpkinAt(1360, 740, 0.8));
    parts.push(S.grass(240, 620, 0.8, 'leafDeep'), S.grass(1470, 640, 0.8, 'leafDeep'));
  } else if (n === 5) {
    /* the quiet farmyard: barrel + square shed at the edges (listen cards overlay) */
    parts.push(S.rrect(140, 560, 200, 250, 16, 'sandDeep', { outlined: true }));
    parts.push(S.pathShape('M 120 560 L 240 480 L 360 560 Z', 'teal', { outlined: true }));
    parts.push(`<g transform="translate(1420 740)">${S.rrect(-80, -110, 160, 190, 30, 'sandDeep', { outlined: true })}${S.stroke('M -76 -50 Q 0 -34 76 -50 M -76 30 Q 0 46 76 30', 'creamDeep', 10)}</g>`);
    parts.push(S.grass(480, 820, 0.9, 'leafDeep'));
  } else if (n === 6) {
    /* the muddy wheel BIG under the counting dots (abs c(800,500) r~200) */
    parts.push(S.ellipse(800, 810, 320, 60, 'sandDeep', { alpha: 0.6 }));
    parts.push(wheelAt(800, 500, 2.0));
    parts.push(S.ellipse(722, 420, 34, 22, 'sandDeep', { alpha: 0.9 }));
    parts.push(S.ellipse(878, 566, 30, 20, 'sandDeep', { alpha: 0.9 }));
    parts.push(S.ellipse(800, 640, 26, 16, 'sandDeep', { alpha: 0.9 }));
  } else if (n === 7) {
    /* home: the cart with its EMPTY ROUND axle socket under the correct slot
       (abs 1140,560; the wheel object lands with its bottom at the axle) +
       the square crate GROUNDED under the decoy slot (abs 860,640) */
    parts.push(laneBand());
    parts.push(`<g transform="translate(1230 690) scale(1.15)">${S.rrect(-150, -40, 300, 40, 12, 'sandDeep', { outlined: true, sw: 8 })}${S.stroke('M -146 -30 Q -210 -66 -230 -104', 'outline', 20)}${S.stroke('M -146 -30 Q -210 -66 -230 -104', 'sandDeep', 11)}<g transform="translate(72 8)">${wheelAt(0, 0, 0.52)}</g></g>`);
    parts.push(S.circle(1140, 699, 52, 'outline'));
    parts.push(S.circle(1140, 699, 30, 'sandDeep'));
    parts.push(`<g transform="translate(860 700)">${S.rrect(-64, 0, 128, 96, 12, 'teal', { outlined: true, sw: 7 })}${S.rrect(-64, 36, 128, 16, 4, 'creamDeep')}</g>`);
  } else if (n === 8) {
    /* the cart stands tall (wheel ON); the yard holds the crate/flag/pot targets (module renders them) */
    parts.push(laneBand());
    parts.push(cartAt(1230, 870, 0.9, {}));
    parts.push(S.grass(220, 800, 0.9, 'leafDeep'), S.grass(640, 840, 0.8, 'leafDeep'));
  } else {
    /* n === 9 — the golden homecoming: the whole cart rolling, spin arcs, sparkles */
    parts.push(laneBand());
    parts.push(cartAt(800, 880, 1.05, { crate: true, flag: true }));
    parts.push(rollArcs(660, 850, 0.8));
    parts.push(S.sparkle(340, 240, 1.2, 'sunshine'), S.sparkle(1290, 210, 1.0, 'sunshine'), S.sparkle(1100, 330, 0.9, 'white'));
  }
  return S.doc(1600, 1000, parts);
}

/* ------------------------------------------------ run */
(async () => {
  S.resetColorsUsed();
  const tmp = path.join(os.tmpdir(), 'sb-art-the-runaway-wheel');
  fs.rmSync(tmp, { recursive: true, force: true });
  const written = [];

  console.log('[art] pip frames…');
  await S.standardPoseSet(path.join(tmp, 'pip'), pip.render, pip.spec);
  const pipOut = path.join(STORY_DIR, 'cast', 'pip');
  (await packCharacter(path.join(tmp, 'pip'), 'pip', pipOut)).forEach((f) => written.push(path.join(pipOut, f)));

  console.log('[art] bo frames…');
  await S.standardPoseSet(path.join(tmp, 'bo'), bo.render, bo.spec);
  const bOut = path.join(STORY_DIR, 'cast', 'bo');
  (await packCharacter(path.join(tmp, 'bo'), 'bo', bOut)).forEach((f) => written.push(path.join(bOut, f)));

  console.log('[art] scenes…');
  for (let n = 1; n <= 9; n++) {
    const png = path.join(tmp, 'scenes', `page-0${n}.png`);
    await S.renderPng(sceneSVG(n), png);
    written.push(await packScene(png, path.join(STORY_DIR, 'scenes')));
  }

  console.log('[art] props…');
  const P = path.join(STORY_DIR, 'props');
  written.push(await S.renderWebp(circleTileSVG(), path.join(P, 'circle-tile@2x.webp')));
  written.push(await S.renderWebp(squareTileSVG(), path.join(P, 'square-tile@2x.webp')));
  written.push(await S.renderWebp(wheelSVG(), path.join(P, 'wheel@2x.webp')));
  written.push(await S.renderWebp(pumpkinSVG(), path.join(P, 'pumpkin@2x.webp')));
  written.push(await S.renderWebp(barrelSVG(), path.join(P, 'barrel@2x.webp')));
  written.push(await S.renderWebp(crateSVG(), path.join(P, 'crate@2x.webp')));
  written.push(await S.renderWebp(flagSVG(), path.join(P, 'flag@2x.webp')));
  written.push(await S.renderWebp(potSVG(), path.join(P, 'pot@2x.webp')));

  const manifestPath = S.emitArtManifest(STORY_DIR, written);
  console.log('[art] ' + manifestPath);
  console.log('[art] done — ' + written.length + ' files.');
})().catch((e) => { console.error('[art] FAIL: ' + (e.stack || e.message)); process.exit(1); });
