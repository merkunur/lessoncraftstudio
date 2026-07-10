#!/usr/bin/env node
/* =====================================================================
   willas-washing-day-art.js — FINAL art for library story #5 (wsv-1).

   Riverside washing-line world. The wind jumbled Willa's laundry:
   scattered clothes on the grass DIMINISH page by page while the line
   fills with color-sorted laundry (the running payoff). The color-code
   pages hang FADED garments at the exact abs region coordinates
   (zone.x/y + rect — the paint-scene-at-data-coords pattern):
     p1: faded red sock @ (560,340,280²) + faded blue sock @ (880,340,280²)
     p4: faded blue shirt + faded yellow towel (same coords)
     p8: the big faded 3-patch quilt @ (490/765/1040, 320, 270²)
   p6 paints a YELLOW basket @ abs (690,630) + RED basket @ (1080,630)
   (the listen-place slots). Garment draw fns are colorway-parameterized
   and shared between props and in-scene minis/faded versions.

   USAGE: node scripts/storybook/art/willas-washing-day-art.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const S = require('./style-lib.js');
const pip = require('./characters/pip.js');
const willa = require('./characters/willa.js');
const { packCharacter, packScene } = require('../pack-atlas.js');

const REPO = path.join(__dirname, '..', '..', '..');
const STORY_DIR = path.join(REPO, 'mini tools', 'stories', 'willas-washing-day');

/* ------------------------------------------------ garment bodies (local 300×300, colorway token) */
function sockBody(c) {
  return S.pathShape('M 108 46 L 196 46 L 196 168 Q 232 196 224 238 Q 210 276 160 268 Q 116 260 108 214 Z', c, { outlined: true }) +
    S.rrect(100, 34, 104, 40, 16, 'cream', { outlined: true, sw: 8 });
}
function shirtBody(c) {
  return S.pathShape('M 108 60 Q 150 84 192 60 L 258 96 L 232 152 L 204 138 L 204 252 L 96 252 L 96 138 L 68 152 L 42 96 Z', c, { outlined: true }) +
    S.stroke('M 108 60 Q 150 84 192 60', 'outline', 8);
}
function towelBody(c) {
  return S.rrect(64, 44, 172, 220, 18, c, { outlined: true }) +
    S.rrect(64, 92, 172, 26, 8, 'cream', { alpha: 0.85 }) +
    S.rrect(64, 196, 172, 26, 8, 'cream', { alpha: 0.85 });
}
function mittenBody(c) {
  return S.pathShape('M 96 232 L 96 130 Q 96 56 162 56 Q 226 56 226 128 L 226 168 Q 250 158 258 180 Q 264 202 232 214 L 226 232 Z', c, { outlined: true }) +
    S.rrect(88, 224, 146, 42, 16, 'cream', { outlined: true, sw: 8 });
}
function duckieBody() {
  return S.ellipse(150, 196, 96, 66, 'sunshine', { outlined: true }) +
    S.circle(196, 116, 52, 'sunshine', { outlined: true }) +
    S.pathShape('M 240 112 Q 276 104 282 122 Q 270 138 238 130 Z', 'orange', { outlined: true, sw: 7 }) +
    S.eyeDot(186, 104, 10) +
    S.pathShape('M 74 178 Q 46 158 52 132 Q 84 140 96 166 Z', 'sunshine', { outlined: true, sw: 7 });
}
function basketBody(c) {
  return S.pathShape('M 40 96 L 260 96 L 232 240 Q 150 258 68 240 Z', c, { outlined: true }) +
    S.stroke('M 54 140 L 246 140 M 62 184 L 238 184', 'cream', 10, { alpha: 0.8 }) +
    S.rrect(30, 82, 240, 24, 10, 'creamDeep', { outlined: true, sw: 7 });
}
const BODIES = {
  'sock-red': () => sockBody('coral'), 'sock-blue': () => sockBody('bluebird'),
  'shirt-red': () => shirtBody('coral'), 'shirt-blue': () => shirtBody('bluebird'),
  'towel-yellow': () => towelBody('sunshine'),
  'mitten-red': () => mittenBody('coral'), 'mitten-blue': () => mittenBody('bluebird'),
  'duckie-yellow': duckieBody,
  'basket-red': () => basketBody('coral'),
};

/* place a garment body into the scene: centred in (x,y,w,h) abs box */
function placed(bodyFn, x, y, w, h, alpha) {
  const s = Math.min(w, h) / 300;
  return `<g transform="translate(${x + (w - 300 * s) / 2} ${y + (h - 300 * s) / 2}) scale(${s})"${alpha != null ? ` opacity="${alpha}"` : ''}>${bodyFn()}</g>`;
}
/* a FADED garment: cream silhouette + the colored body at low alpha, + a clothespin */
function faded(bodyKey, x, y, w, h) {
  const creamKey = bodyKey.startsWith('sock') ? () => sockBody('cream')
    : bodyKey.startsWith('shirt') ? () => shirtBody('cream')
    : bodyKey.startsWith('towel') ? () => towelBody('cream')
    : () => mittenBody('cream');
  return placed(creamKey, x, y, w, h) + placed(BODIES[bodyKey], x, y, w, h, 0.34) + pin(x + w / 2, y + 6);
}
function pin(cx, cy) { return S.rrect(cx - 9, cy - 26, 18, 40, 7, 'sandDeep', { outlined: true, sw: 5 }); }

/* ------------------------------------------------ scenes */
const LINE_Y = (x) => 316 + 56 * Math.sin(Math.PI * (x - 430) / 950);   /* sagging line 430..1380 */
function washLine() {
  const pts = [];
  for (let x = 430; x <= 1380; x += 50) pts.push(`${x === 430 ? 'M' : 'L'} ${x} ${LINE_Y(x).toFixed(0)}`);
  return (
    S.stroke('M 420 700 L 420 300', 'outline', 26) + S.stroke('M 420 700 L 420 300', 'sandDeep', 14) +
    S.stroke('M 1390 700 L 1390 300', 'outline', 26) + S.stroke('M 1390 700 L 1390 300', 'sandDeep', 14) +
    /* the line continues off-frame both sides (the sorted minis hang there) */
    S.stroke('M 0 348 L 420 304', 'outline', 7) +
    S.stroke('M 1390 304 L 1600 336', 'outline', 7) +
    S.stroke(pts.join(' '), 'outline', 7)
  );
}
/* mini sorted garments accumulate on the LEFT line segment (outside every zone: x<460) */
function sortedMinis(stage) {
  /* the extension lines: left (0,348)→(420,304), right (1390,304)→(1600,336) */
  const extL = (x) => 348 - x * (44 / 420);
  const extR = (x) => 304 + (x - 1390) * (32 / 210);
  const groups = [];
  if (stage >= 1) groups.push(['sock-red', 250], ['shirt-red', 330]);
  if (stage >= 2) groups.push(['shirt-blue', 150], ['sock-blue', 70]);
  const parts = groups.map(([k, x]) => {
    const y = extL(x + 55);
    return placed(BODIES[k], x, y + 4, 110, 110) + pin(x + 55, y + 8);
  });
  if (stage >= 3) {
    const y = extR(1485);
    parts.push(placed(BODIES['towel-yellow'], 1430, y + 4, 110, 110), pin(1485, y + 8));
  }
  return parts.join('');
}
function scatter(count) {
  const spots = [[560, 866, 'sock-blue'], [880, 902, 'towel-yellow'], [1120, 856, 'shirt-red'], [720, 940, 'mitten-blue']];
  return spots.slice(0, count).map(([x, y, k]) => placed(BODIES[k], x, y, 96, 96, 0.95)).join('');
}
function sceneSVG(n) {
  const finale = n === 8;
  const sortStage = n <= 2 ? 0 : n <= 4 ? 1 : n <= 6 ? 2 : 3;
  const scatterCount = n <= 2 ? 4 : n <= 4 ? 3 : n <= 6 ? 2 : n === 7 ? 1 : 0;
  const parts = [
    S.skyGradient('sky', 'skyPale', 1600, 640),
    S.sun(280 + (n - 1) * 110, 140, 80),
    S.cloud(600 + ((n * 71) % 210), 112 + ((n * 39) % 50), 1.0, 0.9),
    S.cloud(1170 - ((n * 53) % 180), 196 + ((n * 29) % 42), 0.75, 0.8),
    S.hill(360, 575, 560, 130, 'mint'),
    S.hill(1290, 585, 580, 145, 'mint'),
    /* the river behind the yard */
    S.water(596, 1600, 66, 'bluebird', 'white'),
    S.groundBand(658, 1600, 342, 'leaf'),
    S.pathShape('M 0 1000 L 0 884 Q 470 832 900 876 Q 1290 918 1600 886 L 1600 1000 Z', 'leafDeep', { alpha: 0.22 }),
    washLine(),
    sortedMinis(sortStage),
    scatter(scatterCount),
    /* edge flora */
    S.grass(120, 770, 0.95, 'leafDeep'),
    S.grass(1500, 800, 0.9, 'leafDeep'),
    S.circle(160, 812, 12, 'coral', { outlined: true, sw: 5 }),
    S.circle(1462, 760, 11, 'berry', { outlined: true, sw: 5 }),
  ];
  /* page-specific painted anchors (abs = zone + rect, from the blueprint) */
  if (n === 1) parts.push(faded('sock-red', 560, 340, 280, 280), faded('sock-blue', 880, 340, 280, 280));
  if (n === 4) parts.push(faded('shirt-blue', 560, 340, 280, 280), faded('towel-yellow', 880, 340, 280, 280));
  if (n === 6) {
    parts.push(placed(() => basketBody('sunshine'), 690 - 130, 630 - 100, 260, 220));
    parts.push(placed(() => basketBody('coral'), 1080 - 110, 630 - 90, 220, 190));
  }
  if (finale) {
    /* the big faded quilt across the line (patches at abs 490/765/1040, y 320, 270²) */
    parts.push(S.rrect(478, 312, 844, 288, 14, 'cream', { outlined: true, sw: 8 }));
    parts.push(S.rrect(490, 320, 270, 270, 8, 'coral', { alpha: 0.3 }));
    parts.push(S.rrect(765, 320, 270, 270, 8, 'bluebird', { alpha: 0.3 }));
    parts.push(S.rrect(1040, 320, 270, 270, 8, 'sunshine', { alpha: 0.3 }));
    parts.push(pin(560, 318), pin(900, 318), pin(1240, 318));
    parts.push(S.sparkle(600, 220, 1.2, 'sunshine'), S.sparkle(1120, 200, 1.0, 'sunshine'), S.sparkle(860, 260, 0.9, 'white'));
  }
  return S.doc(1600, 1000, parts);
}

/* ------------------------------------------------ run */
(async () => {
  S.resetColorsUsed();
  const tmp = path.join(os.tmpdir(), 'sb-art-willas-washing-day');
  fs.rmSync(tmp, { recursive: true, force: true });
  const written = [];

  console.log('[art] pip frames…');
  await S.standardPoseSet(path.join(tmp, 'pip'), pip.render, pip.spec);
  const pipOut = path.join(STORY_DIR, 'cast', 'pip');
  (await packCharacter(path.join(tmp, 'pip'), 'pip', pipOut)).forEach((f) => written.push(path.join(pipOut, f)));

  console.log('[art] willa frames…');
  await S.standardPoseSet(path.join(tmp, 'willa'), willa.render, willa.spec);
  const wOut = path.join(STORY_DIR, 'cast', 'willa');
  (await packCharacter(path.join(tmp, 'willa'), 'willa', wOut)).forEach((f) => written.push(path.join(wOut, f)));

  console.log('[art] scenes…');
  for (let n = 1; n <= 8; n++) {
    const png = path.join(tmp, 'scenes', `page-0${n}.png`);
    await S.renderPng(sceneSVG(n), png);
    written.push(await packScene(png, path.join(STORY_DIR, 'scenes')));
  }

  console.log('[art] props…');
  for (const [name, bodyFn] of Object.entries(BODIES)) {
    written.push(await S.renderWebp(S.doc(300, 300, [bodyFn()]), path.join(STORY_DIR, 'props', `${name}@2x.webp`)));
  }

  const manifestPath = S.emitArtManifest(STORY_DIR, written);
  console.log('[art] ' + manifestPath);
  console.log('[art] done — ' + written.length + ' files.');
})().catch((e) => { console.error('[art] FAIL: ' + (e.stack || e.message)); process.exit(1); });
