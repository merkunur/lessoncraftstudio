#!/usr/bin/env node
/* =====================================================================
   lunas-starry-night-art.js — FINAL art for library story #12… no, #11:
   the PART 2 OPENER (wsv-1).

   The library's first TIME-OF-DAY progression: dusk deepens page by page
   into full starry night. Skies are SOLID STACKED BANDS (a gradient
   between distant palette colors would blend off-palette across the
   whole sky — the #8 pixel-budget lesson, gradient variant); only the
   within-band gradient pairs are close neighbors. Stars/fireflies
   multiply; p5 paints firefly clusters (10 vs 8) at the exact slot
   coords; p8 clears the constellation region for the connect-the-dots.

   USAGE: node scripts/storybook/art/lunas-starry-night-art.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const S = require('./style-lib.js');
const pip = require('./characters/pip.js');
const luna = require('./characters/luna.js');
const { packCharacter, packScene } = require('../pack-atlas.js');

const REPO = path.join(__dirname, '..', '..', '..');
const STORY_DIR = path.join(REPO, 'mini tools', 'stories', 'lunas-starry-night');

/* ------------------------------------------------ props */
function fireflySVG() {
  return S.doc(300, 300, [
    S.circle(150, 168, 64, 'sunshine', { outlined: true }),
    S.circle(150, 168, 88, 'sunshine', { alpha: 0.28 }),
    S.circle(150, 96, 34, 'outline'),
    S.eyeDot(140, 90, 7), S.eyeDot(160, 90, 7),
    S.stroke('M 128 70 Q 118 52 104 46 M 172 70 Q 182 52 196 46', 'outline', 7),
    S.pathShape('M 118 140 Q 76 108 60 118 Q 66 148 108 162 Z', 'skyPale', { outlined: true, sw: 5, alpha: 0.9 }),
    S.pathShape('M 182 140 Q 224 108 240 118 Q 234 148 192 162 Z', 'skyPale', { outlined: true, sw: 5, alpha: 0.9 }),
  ]);
}
function starClusterSVG(count) {
  const spots = [[150, 60], [70, 120], [230, 120], [110, 200], [190, 200], [60, 260], [240, 260]];
  return S.doc(300, 320, spots.slice(0, count).map(([x, y]) => S.sparkle(x, y, 2.0, 'sunshine')).join(''));
}
function starLanternSVG() {
  return S.doc(300, 340, [
    S.stroke('M 150 36 Q 150 18 150 10', 'outline', 9),
    S.rrect(120, 30, 60, 20, 8, 'sandDeep', { outlined: true, sw: 6 }),
    S.rrect(84, 50, 132, 200, 34, 'tealMid', { outlined: true }),
    S.rrect(100, 66, 100, 168, 24, 'cream', { alpha: 0.85 }),
    S.sparkle(150, 150, 3.0, 'sunshine'),
    S.rrect(104, 250, 92, 20, 9, 'sandDeep', { outlined: true, sw: 6 }),
  ]);
}

/* ------------------------------------------------ scene helpers */
function fireflyDot(x, y, s) {
  return S.circle(x, y, 9 * s, 'sunshine') + S.circle(x, y, 16 * s, 'sunshine', { alpha: 0.3 });
}
function fireflyCluster(cx, cy, count) {
  const spots = [[-70, -20], [70, -30], [0, 30], [-40, -70], [56, 30], [-90, 30], [90, -70], [0, -90], [-20, 70], [40, 70]];
  return spots.slice(0, count).map(([dx, dy]) => fireflyDot(cx + dx, cy + dy, 1.15)).join('');
}
function crescentMoon(x, y, r) {
  /* lune: outer semicircle (radius r) + inner return arc of LARGER radius
     bulging the same side (an inner radius < chord/2 is geometrically
     invalid and collapses to zero width — the first render's bug) */
  return S.pathShape(`M ${x} ${y - r} A ${r} ${r} 0 1 1 ${x} ${y + r} A ${r * 1.4} ${r * 1.4} 0 0 0 ${x} ${y - r} Z`, 'cream', { outlined: true, sw: 6 });
}
/* dusk stage: 0 = golden dusk, 1 = deepening, 2 = full night */
function skyBands(stage) {
  if (stage === 0) return S.groundBand(0, 1600, 340, 'bluebird') + S.groundBand(340, 1600, 180, 'skyPale') + S.groundBand(520, 1600, 140, 'sunshine') + S.groundBand(620, 1600, 40, 'coral');
  if (stage === 1) return S.groundBand(0, 1600, 380, 'night') + S.groundBand(380, 1600, 160, 'bluebird') + S.groundBand(540, 1600, 90, 'berry') + S.groundBand(600, 1600, 60, 'coral');
  return S.groundBand(0, 1600, 480, 'night') + S.groundBand(480, 1600, 120, 'berry') + S.groundBand(580, 1600, 80, 'bluebird');
}
function stars(n, seed) {
  const parts = [];
  for (let i = 0; i < n; i++) {
    const x = ((seed * 131 + i * 197) % 1520) + 40;
    const y = ((seed * 89 + i * 151) % 400) + 30;
    parts.push(i % 3 === 0 ? S.sparkle(x, y, 0.7 + (i % 4) * 0.15, 'white') : S.circle(x, y, 4, 'white', { alpha: 0.9 }));
  }
  return parts.join('');
}

/* ------------------------------------------------ scenes */
function sceneSVG(n) {
  const stage = n <= 2 ? 0 : n <= 5 ? 1 : 2;
  const finale = n === 8;
  const parts = [
    skyBands(stage),
    stars(stage === 0 ? 3 : stage === 1 ? 9 : 18, n),
    stage >= 1 ? crescentMoon(260, 170, 84) : S.sun(240, 160, 74),
    /* dark meadow */
    S.hill(360, 640, 560, 120, stage === 2 ? 'teal' : 'mint'),
    S.hill(1290, 650, 580, 135, stage === 2 ? 'teal' : 'mint'),
    S.groundBand(660, 1600, 340, stage === 0 ? 'leaf' : 'leafDeep'),
    /* frame flora */
    S.grass(120, 780, 1.0, stage === 0 ? 'leafDeep' : 'teal'),
    S.grass(1500, 800, 0.95, stage === 0 ? 'leafDeep' : 'teal'),
    /* ambient fireflies grow with the night */
    fireflyDot(480, 700, 0.9), fireflyDot(880, 740, 0.8),
    stage >= 1 ? fireflyDot(1120, 690, 1.0) + fireflyDot(640, 760, 0.7) : '',
    stage >= 2 ? fireflyDot(980, 700, 0.9) + fireflyDot(360, 730, 0.8) : '',
  ];
  if (n === 5) {
    parts.push(fireflyCluster(690, 630, 10));   /* TEN (the correct slot) */
    parts.push(fireflyCluster(1080, 630, 8));
  }
  if (finale) {
    parts.push(S.sparkle(300, 120, 1.3, 'sunshine'), S.sparkle(1300, 160, 1.1, 'sunshine'));
  }
  return S.doc(1600, 1000, parts);
}

/* ------------------------------------------------ run */
(async () => {
  S.resetColorsUsed();
  const tmp = path.join(os.tmpdir(), 'sb-art-lunas-starry-night');
  fs.rmSync(tmp, { recursive: true, force: true });
  const written = [];

  console.log('[art] pip frames…');
  await S.standardPoseSet(path.join(tmp, 'pip'), pip.render, pip.spec);
  const pipOut = path.join(STORY_DIR, 'cast', 'pip');
  (await packCharacter(path.join(tmp, 'pip'), 'pip', pipOut)).forEach((f) => written.push(path.join(pipOut, f)));

  console.log('[art] luna frames…');
  await S.standardPoseSet(path.join(tmp, 'luna'), luna.render, luna.spec);
  const lOut = path.join(STORY_DIR, 'cast', 'luna');
  (await packCharacter(path.join(tmp, 'luna'), 'luna', lOut)).forEach((f) => written.push(path.join(lOut, f)));

  console.log('[art] scenes…');
  for (let n = 1; n <= 8; n++) {
    const png = path.join(tmp, 'scenes', `page-0${n}.png`);
    await S.renderPng(sceneSVG(n), png);
    written.push(await packScene(png, path.join(STORY_DIR, 'scenes')));
  }

  console.log('[art] props…');
  const P = path.join(STORY_DIR, 'props');
  written.push(await S.renderWebp(fireflySVG(), path.join(P, 'firefly@2x.webp')));
  written.push(await S.renderWebp(starClusterSVG(7), path.join(P, 'star-cluster-seven@2x.webp')));
  written.push(await S.renderWebp(starClusterSVG(6), path.join(P, 'star-cluster-six@2x.webp')));
  written.push(await S.renderWebp(starLanternSVG(), path.join(P, 'star-lantern@2x.webp')));

  const manifestPath = S.emitArtManifest(STORY_DIR, written);
  console.log('[art] ' + manifestPath);
  console.log('[art] done — ' + written.length + ' files.');
})().catch((e) => { console.error('[art] FAIL: ' + (e.stack || e.message)); process.exit(1); });
