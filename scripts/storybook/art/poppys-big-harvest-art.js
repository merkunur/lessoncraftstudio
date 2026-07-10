#!/usr/bin/env node
/* =====================================================================
   poppys-big-harvest-art.js — FINAL art for library story #3 (wsv-1).

   Vegetable-garden world (picket fence, soil beds, leafy edges); Poppy's
   harvest basket bottom-right FILLS across the story (the running payoff):
     stage A (p1-2) empty · B (p3-4) berries · C (p5-6) + carrot/apple ·
     D (p7) full · p8 swaps in TWO baskets (BIG + small) inside the
     listen-place zone at the exact slot positions (abs 690,630 / 1080,630)
     — the size-match finale needs the child to SEE which basket is big.
   Props: baked-size pairs for the choice pages (pumpkin/carrot/apple:
   small = same draw at 45%), singles for find pages (rect sets the size).

   USAGE: node scripts/storybook/art/poppys-big-harvest-art.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const S = require('./style-lib.js');
const pip = require('./characters/pip.js');
const poppy = require('./characters/poppy.js');
const { packCharacter, packScene } = require('../pack-atlas.js');

const REPO = path.join(__dirname, '..', '..', '..');
const STORY_DIR = path.join(REPO, 'mini tools', 'stories', 'poppys-big-harvest');

/* ---------------------------------------------------------------- veg draw fns (300×300 canvas each) */
function pumpkinBody() {
  return [
    S.stroke('M 150 66 Q 148 34 176 24', 'leafDeep', 16),
    S.ellipse(150, 170, 122, 100, 'orange', { outlined: true }),
    S.ellipse(150, 170, 52, 96, 'orangeDeep', { alpha: 0.5 }),
    S.stroke('M 96 84 Q 76 170 96 252 M 204 84 Q 224 170 204 252', 'orangeDeep', 9, { alpha: 0.8 }),
  ].join('');
}
function carrotBody() {
  return [
    S.stroke('M 128 60 Q 110 20 92 12 M 150 58 Q 150 16 150 6 M 172 60 Q 190 20 208 12', 'leafDeep', 14),
    S.pathShape('M 104 70 Q 150 44 196 70 Q 186 190 150 282 Q 114 190 104 70 Z', 'orange', { outlined: true }),
    S.stroke('M 122 120 L 176 112 M 128 168 L 172 162 M 138 218 L 164 214', 'orangeDeep', 8, { alpha: 0.8 }),
  ].join('');
}
function appleBody() {
  return [
    S.stroke('M 150 62 Q 152 34 166 24', 'outline', 12),
    S.pathShape('M 150 80 C 90 40 40 96 48 160 C 54 226 108 272 150 262 C 192 272 246 226 252 160 C 260 96 210 40 150 80 Z', 'coral', { outlined: true }),
    S.ellipse(108, 128, 26, 36, 'cream', { alpha: 0.55 }),
    S.pathShape('M 166 52 Q 204 34 216 62 Q 190 74 166 52 Z', 'leafDeep', { outlined: true, sw: 7 }),
  ].join('');
}
function strawberryBody() {
  const seeds = [];
  [[128, 150], [172, 150], [150, 190], [116, 190], [184, 190], [150, 236], [128, 222], [172, 222]].forEach(([x, y]) => seeds.push(S.ellipse(x, y, 5, 8, 'sunshine')));
  return [
    S.pathShape('M 150 108 C 90 96 62 140 74 186 C 86 236 128 272 150 282 C 172 272 214 236 226 186 C 238 140 210 96 150 108 Z', 'coral', { outlined: true }),
    seeds.join(''),
    S.pathShape('M 106 108 L 132 84 L 150 106 L 168 84 L 194 108 L 168 122 L 150 112 L 132 122 Z', 'leafDeep', { outlined: true, sw: 7 }),
  ].join('');
}
function sunflowerBody() {
  const petals = [];
  for (let k = 0; k < 10; k++) {
    const a = (k * 36 * Math.PI) / 180;
    petals.push(S.ellipse(150 + Math.cos(a) * 84, 138 + Math.sin(a) * 84, 40, 22, 'sunshine', { outlined: true, sw: 6 }));
  }
  return [
    S.stroke('M 150 200 Q 146 250 150 288', 'leafDeep', 14),
    petals.join(''),
    S.circle(150, 138, 52, 'orangeDeep', { outlined: true }),
    S.circle(136, 126, 8, 'outline'), S.circle(164, 130, 7, 'outline'), S.circle(150, 152, 7, 'outline'),
  ].join('');
}
function tomatoBody() {
  return [
    S.ellipse(150, 174, 110, 96, 'coral', { outlined: true }),
    S.ellipse(112, 140, 26, 20, 'cream', { alpha: 0.5 }),
    S.pathShape('M 150 88 L 122 66 L 138 92 L 106 84 L 132 106 L 150 100 L 168 106 L 194 84 L 162 92 L 178 66 Z', 'leafDeep', { outlined: true, sw: 6 }),
  ].join('');
}
function watermelonBody() {
  return [
    S.ellipse(150, 170, 128, 96, 'leaf', { outlined: true }),
    S.pathShape('M 34 190 Q 86 122 150 122 Q 214 122 266 190 Q 214 152 150 152 Q 86 152 34 190 Z', 'leafDeep', { alpha: 0.7 }),
    S.stroke('M 74 110 Q 100 150 96 232 M 150 96 Q 150 150 150 250 M 226 110 Q 200 150 204 232', 'leafDeep', 10, { alpha: 0.8 }),
    S.stroke('M 150 74 Q 172 60 186 66', 'leafDeep', 10),
  ].join('');
}
const VEG = { pumpkin: pumpkinBody, carrot: carrotBody, apple: appleBody, strawberry: strawberryBody, sunflower: sunflowerBody, tomato: tomatoBody, watermelon: watermelonBody };
function vegSVG(name, small) {
  const body = VEG[name]();
  return S.doc(300, 300, small
    ? [`<g transform="translate(82.5 82.5) scale(0.45)">${body}</g>`]
    : [body]);
}

/* ---------------------------------------------------------------- in-scene helpers */
function basketAt(cx, cy, s, fillStage) {
  /* woven basket, opening at top; fillStage 0..3 = how much produce peeks out */
  const parts = [];
  const produce = [];
  if (fillStage >= 1) produce.push(S.circle(cx - 28 * s, cy - 44 * s, 20 * s, 'coral', { outlined: true, sw: 5 }), S.circle(cx + 20 * s, cy - 40 * s, 16 * s, 'coral', { outlined: true, sw: 5 }));
  if (fillStage >= 2) produce.push(S.circle(cx + 44 * s, cy - 48 * s, 18 * s, 'orange', { outlined: true, sw: 5 }), S.pathShape(`M ${cx - 56 * s} ${cy - 34 * s} L ${cx - 42 * s} ${cy - 78 * s} L ${cx - 30 * s} ${cy - 34 * s} Z`, 'orange', { outlined: true, sw: 5 }));
  if (fillStage >= 3) produce.push(S.circle(cx - 2 * s, cy - 62 * s, 24 * s, 'sunshine', { outlined: true, sw: 5 }), S.circle(cx + 58 * s, cy - 30 * s, 14 * s, 'leaf', { outlined: true, sw: 5 }));
  parts.push(produce.join(''));
  parts.push(S.pathShape(`M ${cx - 90 * s} ${cy - 30 * s} L ${cx + 90 * s} ${cy - 30 * s} L ${cx + 66 * s} ${cy + 56 * s} Q ${cx} ${cy + 70 * s} ${cx - 66 * s} ${cy + 56 * s} Z`, 'sandDeep', { outlined: true, sw: 7 * s }));
  parts.push(S.stroke(`M ${cx - 78 * s} ${cy - 2 * s} L ${cx + 78 * s} ${cy - 2 * s} M ${cx - 70 * s} ${cy + 28 * s} L ${cx + 70 * s} ${cy + 28 * s}`, 'creamDeep', 8 * s));
  parts.push(S.rrect(cx - 94 * s, cy - 40 * s, 188 * s, 18 * s, 8 * s, 'creamDeep', { outlined: true, sw: 6 * s }));
  return parts.join('');
}
function fencePickets() {
  const parts = [S.stroke('M 0 594 L 1600 594 M 0 636 L 1600 636', 'sandDeep', 12)];
  for (let x = 30; x < 1600; x += 88) {
    parts.push(S.pathShape(`M ${x} 560 L ${x + 34} 560 L ${x + 34} 668 L ${x} 668 Z M ${x} 560 L ${x + 17} 544 L ${x + 34} 560 Z`, 'creamDeep', { outlined: true, sw: 5 }));
  }
  return `<g opacity="0.95">${parts.join('')}</g>`;
}
function soilBed(cx, cy, w, sprouts) {
  const parts = [S.ellipse(cx, cy, w, 34, 'sandDeep', { outlined: true, sw: 6 })];
  for (let i = 0; i < sprouts; i++) {
    parts.push(S.grass(cx - w * 0.7 + (i * w * 1.4) / (sprouts - 1 || 1), cy - 8, 0.62, 'leafDeep'));
  }
  return parts.join('');
}

/* ---------------------------------------------------------------- scenes */
function sceneSVG(n) {
  const fillStage = n <= 2 ? 0 : n <= 4 ? 1 : n <= 6 ? 2 : 3;
  const finale = n === 8;
  const parts = [
    S.skyGradient('sky', 'skyPale', 1600, 640),
    S.sun(260 + (n - 1) * 115, 148, 82),
    S.cloud(520 + ((n * 83) % 230), 118 + ((n * 47) % 55), 1.0, 0.9),
    S.cloud(1150 - ((n * 59) % 210), 205 + ((n * 31) % 42), 0.78, 0.8),
    S.hill(320, 570, 540, 130, 'mint'),
    S.hill(1330, 580, 560, 145, 'mint'),
    fencePickets(),
    S.groundBand(660, 1600, 340, 'leaf'),
    S.pathShape('M 0 1000 L 0 880 Q 460 830 900 876 Q 1280 916 1600 884 L 1600 1000 Z', 'leafDeep', { alpha: 0.22 }),
    /* soil beds at the frame edges only (calm center) */
    soilBed(170, 760, 150, 3),
    soilBed(210, 930, 180, 4),
    soilBed(1450, 780, 130, 3),
    /* edge flowers */
    S.circle(330, 720, 13, 'coral', { outlined: true, sw: 5 }),
    S.circle(1360, 726, 12, 'berry', { outlined: true, sw: 5 }),
  ];
  if (finale) {
    /* the two baskets INSIDE the listen-place zone at the slot positions:
       zone (440,300) + slots (250,330)/(640,330) → abs (690,630)/(1080,630) */
    parts.push(basketAt(690, 630, 1.5, 0));      /* BIG basket */
    parts.push(basketAt(1080, 630, 0.8, 0));     /* small basket */
    parts.push(S.sparkle(560, 240, 1.2, 'sunshine'), S.sparkle(1060, 200, 1.0, 'sunshine'), S.sparkle(820, 300, 0.85, 'white'));
  } else {
    parts.push(basketAt(1210, 878, 1.05, fillStage));
  }
  return S.doc(1600, 1000, parts);
}

/* ---------------------------------------------------------------- run */
(async () => {
  S.resetColorsUsed();
  const tmp = path.join(os.tmpdir(), 'sb-art-poppys-big-harvest');
  fs.rmSync(tmp, { recursive: true, force: true });
  const written = [];

  console.log('[art] pip frames…');
  await S.standardPoseSet(path.join(tmp, 'pip'), pip.render, pip.spec);
  const pipOut = path.join(STORY_DIR, 'cast', 'pip');
  (await packCharacter(path.join(tmp, 'pip'), 'pip', pipOut)).forEach((f) => written.push(path.join(pipOut, f)));

  console.log('[art] poppy frames…');
  await S.standardPoseSet(path.join(tmp, 'poppy'), poppy.render, poppy.spec);
  const popOut = path.join(STORY_DIR, 'cast', 'poppy');
  (await packCharacter(path.join(tmp, 'poppy'), 'poppy', popOut)).forEach((f) => written.push(path.join(popOut, f)));

  console.log('[art] scenes…');
  for (let n = 1; n <= 8; n++) {
    const png = path.join(tmp, 'scenes', `page-0${n}.png`);
    await S.renderPng(sceneSVG(n), png);
    written.push(await packScene(png, path.join(STORY_DIR, 'scenes')));
  }

  console.log('[art] props…');
  for (const name of Object.keys(VEG)) {
    written.push(await S.renderWebp(vegSVG(name, false), path.join(STORY_DIR, 'props', `${name}@2x.webp`)));
  }
  for (const name of ['pumpkin', 'carrot', 'apple']) {
    written.push(await S.renderWebp(vegSVG(name, true), path.join(STORY_DIR, 'props', `${name}-small@2x.webp`)));
  }

  const manifestPath = S.emitArtManifest(STORY_DIR, written);
  console.log('[art] ' + manifestPath);
  console.log('[art] done — ' + written.length + ' files.');
})().catch((e) => { console.error('[art] FAIL: ' + (e.stack || e.message)); process.exit(1); });
