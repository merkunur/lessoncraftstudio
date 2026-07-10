#!/usr/bin/env node
/* =====================================================================
   kiko-paints-the-rainbow-art.js — FINAL art for library story #7 (wsv-1).

   After-the-rain meadow with a sky-wide rainbow whose three bands (red /
   yellow / blue primaries) start PALE and turn VIVID as the child traces
   them — the band arcs and the trace paths come from the SAME geometry
   (rainbow-geometry.js), so the finger runs down the middle of the band.
   The sun stays pale until p7's stamps wake it; p8 adds the cloud-maze
   backdrop, the goal paint pot at the rainbow's foot, and full sparkle.

   USAGE: node scripts/storybook/art/kiko-paints-the-rainbow-art.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const S = require('./style-lib.js');
const G = require('./rainbow-geometry.js');
const pip = require('./characters/pip.js');
const kiko = require('./characters/kiko.js');
const { packCharacter, packScene } = require('../pack-atlas.js');

const REPO = path.join(__dirname, '..', '..', '..');
const STORY_DIR = path.join(REPO, 'mini tools', 'stories', 'kiko-paints-the-rainbow');

/* ------------------------------------------------ props: paint pots */
function potSVG(colorToken) {
  return S.doc(300, 320, [
    /* brush leaning in the pot */
    S.stroke('M 208 42 L 176 130', 'outline', 22),
    S.stroke('M 208 42 L 176 130', 'sandDeep', 12),
    S.pathShape('M 196 118 Q 212 92 230 96 Q 226 124 204 136 Z', colorToken, { outlined: true, sw: 6 }),
    /* the pot */
    S.pathShape('M 56 110 L 244 110 L 226 268 Q 150 286 74 268 Z', 'creamDeep', { outlined: true }),
    S.ellipse(150, 112, 94, 26, colorToken, { outlined: true, sw: 7 }),
    /* a drip */
    S.pathShape('M 96 128 Q 92 160 102 168 Q 112 160 108 132 Z', colorToken),
  ]);
}

/* ------------------------------------------------ the rainbow (pale/vivid per band) */
const BAND_TOKEN = { red: 'coral', yellow: 'sunshine', blue: 'bluebird' };
function rainbow(vivid /* {red,yellow,blue} booleans */) {
  const parts = [];
  for (const band of ['red', 'yellow', 'blue']) {
    const b = G.BANDS[band];
    const width = b.rOut - b.rIn;
    const d = G.bandArcPath(b.r, b.x0 - 60, b.x1 + 60);
    parts.push(S.stroke(d, BAND_TOKEN[band], width, { alpha: vivid[band] ? 0.95 : 0.22 }));
  }
  return parts.join('');
}

/* ------------------------------------------------ scenes */
function sceneSVG(n) {
  const vivid = { red: n >= 3, yellow: n >= 5, blue: n >= 7 };
  const sunAwake = n >= 8;
  const finale = n === 8;
  const parts = [
    S.skyGradient('sky', 'skyPale', 1600, 660),
    /* the sun (pale until the stamps wake it): abs (300,260) r130 = the p07 stamp zone */
    S.circle(300, 260, 130, 'sunshine', { alpha: sunAwake ? 1 : 0.28 }),
    sunAwake ? S.circle(300, 260, 160, 'sunshine', { alpha: 0.25 }) : '',
    S.cloud(700 + ((n * 61) % 160), 120 + ((n * 33) % 40), 0.9, 0.9),
    S.cloud(1240 - ((n * 47) % 150), 170 + ((n * 29) % 36), 0.72, 0.8),
    /* the rainbow */
    rainbow(vivid),
    /* meadow */
    S.hill(360, 640, 560, 120, 'mint'),
    S.hill(1300, 650, 580, 135, 'mint'),
    S.groundBand(700, 1600, 300, 'leaf'),
    S.pathShape('M 0 1000 L 0 896 Q 470 852 900 892 Q 1290 926 1600 898 L 1600 1000 Z', 'leafDeep', { alpha: 0.22 }),
    /* after-the-rain puddles */
    S.ellipse(560, 852, 120, 24, 'skyPale'),
    S.ellipse(560, 850, 104, 18, 'bluebird', { alpha: 0.45 }),
    S.ellipse(1080, 900, 140, 26, 'skyPale'),
    S.ellipse(1080, 898, 122, 20, 'bluebird', { alpha: 0.45 }),
    /* drippy edge flora */
    S.grass(120, 780, 1.0, 'leafDeep'),
    S.grass(1500, 810, 0.95, 'leafDeep'),
    S.circle(168, 742, 12, 'coral', { outlined: true, sw: 5 }),
    S.circle(1462, 770, 11, 'berry', { outlined: true, sw: 5 }),
  ];
  if (finale) {
    /* soft cloud-maze backdrop inside the maze zone (400,190,960,610) + the goal pot */
    parts.push(S.cloud(560, 320, 1.4, 0.55), S.cloud(900, 520, 1.3, 0.5), S.cloud(1180, 300, 1.2, 0.5), S.cloud(700, 640, 1.2, 0.45));
    parts.push(`<g transform="translate(1130 590) scale(0.5)">${potSVG('coral').replace(/<\/?svg[^>]*>/g, '')}</g>`);
    parts.push(S.sparkle(520, 200, 1.2, 'sunshine'), S.sparkle(1120, 170, 1.0, 'sunshine'), S.sparkle(840, 130, 0.9, 'white'), S.sparkle(1340, 420, 1.0, 'white'));
  }
  return S.doc(1600, 1000, parts);
}

/* ------------------------------------------------ run */
(async () => {
  S.resetColorsUsed();
  const tmp = path.join(os.tmpdir(), 'sb-art-kiko-paints-the-rainbow');
  fs.rmSync(tmp, { recursive: true, force: true });
  const written = [];

  console.log('[art] pip frames…');
  await S.standardPoseSet(path.join(tmp, 'pip'), pip.render, pip.spec);
  const pipOut = path.join(STORY_DIR, 'cast', 'pip');
  (await packCharacter(path.join(tmp, 'pip'), 'pip', pipOut)).forEach((f) => written.push(path.join(pipOut, f)));

  console.log('[art] kiko frames…');
  await S.standardPoseSet(path.join(tmp, 'kiko'), kiko.render, kiko.spec);
  const kOut = path.join(STORY_DIR, 'cast', 'kiko');
  (await packCharacter(path.join(tmp, 'kiko'), 'kiko', kOut)).forEach((f) => written.push(path.join(kOut, f)));

  console.log('[art] scenes…');
  for (let n = 1; n <= 8; n++) {
    const png = path.join(tmp, 'scenes', `page-0${n}.png`);
    await S.renderPng(sceneSVG(n), png);
    written.push(await packScene(png, path.join(STORY_DIR, 'scenes')));
  }

  console.log('[art] props…');
  for (const [name, token] of [['pot-red', 'coral'], ['pot-yellow', 'sunshine'], ['pot-blue', 'bluebird']]) {
    written.push(await S.renderWebp(potSVG(token), path.join(STORY_DIR, 'props', `${name}@2x.webp`)));
  }

  const manifestPath = S.emitArtManifest(STORY_DIR, written);
  console.log('[art] ' + manifestPath);
  console.log('[art] done — ' + written.length + ' files.');
})().catch((e) => { console.error('[art] FAIL: ' + (e.stack || e.message)); process.exit(1); });
