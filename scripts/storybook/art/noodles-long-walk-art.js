#!/usr/bin/env node
/* =====================================================================
   noodles-long-walk-art.js — FINAL art for library story #9 (wsv-1).

   Autumn-park quest: coral/orange/sunshine foliage (solid layers per the
   #8 style rule), a winding path, fallen-leaf dots at the edges, and
   Noodle's red doghouse growing nearer page by page (the approaching-
   journey payoff). p4 paints the LONG and short crates at the exact
   listen-place slot coords; the finale arrives home + sparkles.
   Length-pair props ride wide 360×240 canvases so the choice cards
   preserve relative length.

   USAGE: node scripts/storybook/art/noodles-long-walk-art.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const S = require('./style-lib.js');
const pip = require('./characters/pip.js');
const noodle = require('./characters/noodle.js');
const { packCharacter, packScene } = require('../pack-atlas.js');

const REPO = path.join(__dirname, '..', '..', '..');
const STORY_DIR = path.join(REPO, 'mini tools', 'stories', 'noodles-long-walk');

/* ------------------------------------------------ props (length pairs on wide canvases) */
function scarfSVG(long) {
  const w = long ? 320 : 150;
  return S.doc(360, 240, [
    S.rrect(20, 90, w, 60, 26, long ? 'coral' : 'coral', { outlined: true }),
    S.stroke(`M ${20 + w * 0.25} 92 L ${20 + w * 0.25} 148 M ${20 + w * 0.62} 92 L ${20 + w * 0.62} 148`, 'cream', 12, { alpha: 0.85 }),
    S.stroke(`M ${26 + w} 104 L ${44 + w} 96 M ${26 + w} 120 L ${46 + w} 120 M ${26 + w} 136 L ${44 + w} 144`, 'coral', 8),
  ]);
}
function benchSVG(long) {
  const w = long ? 320 : 150;
  const x0 = (360 - w) / 2;
  return S.doc(360, 240, [
    S.rrect(x0, 88, w, 34, 12, 'sandDeep', { outlined: true }),
    S.rrect(x0 + 6, 128, 22, 70, 10, 'sandDeep', { outlined: true, sw: 6 }),
    S.rrect(x0 + w - 28, 128, 22, 70, 10, 'sandDeep', { outlined: true, sw: 6 }),
    S.rrect(x0, 52, w, 22, 10, 'creamDeep', { outlined: true, sw: 6 }),
  ]);
}
function stickSVG() {
  return S.doc(360, 240, [
    S.stroke('M 30 150 Q 120 118 200 132 Q 280 146 330 116', 'outline', 26),
    S.stroke('M 30 150 Q 120 118 200 132 Q 280 146 330 116', 'sandDeep', 14),
    S.stroke('M 232 128 L 262 100', 'sandDeep', 11),
  ]);
}
function trainSVG(long) {
  const cars = long ? 4 : 2;
  const parts = [];
  const y = 110, cw = 74, gap = 8;
  const total = cars * cw + (cars - 1) * gap;
  const x0 = (360 - total) / 2;
  for (let i = 0; i < cars; i++) {
    const x = x0 + i * (cw + gap);
    const token = i === 0 ? 'coral' : ['tealMid', 'sunshine', 'bluebird'][i % 3];
    parts.push(S.rrect(x, y, cw, 56, 10, token, { outlined: true, sw: 7 }));
    parts.push(S.circle(x + 20, y + 66, 13, 'outline'));
    parts.push(S.circle(x + cw - 20, y + 66, 13, 'outline'));
    if (i === 0) parts.push(S.rrect(x + 14, y - 26, 26, 30, 8, 'coral', { outlined: true, sw: 6 }));
    else parts.push(S.rrect(x + 14, y + 12, cw - 28, 20, 6, 'cream', { alpha: 0.8 }));
  }
  return S.doc(360, 240, parts);
}
function wormSVG(long) {
  const w = long ? 300 : 140;
  const x0 = (360 - w) / 2;
  const segs = [];
  const n = long ? 6 : 3;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    segs.push(`${i === 0 ? 'M' : 'L'} ${x0 + w * t} ${140 + 22 * Math.sin(t * Math.PI * 2.4)}`);
  }
  return S.doc(360, 240, [
    S.stroke(segs.join(' '), 'outline', 52),
    S.stroke(segs.join(' '), 'coral', 36),
    S.circle(x0 + w, 140 + 22 * Math.sin(2.4 * Math.PI), 26, 'coral', { outlined: true, sw: 7 }),
    S.eyeDot(x0 + w + 4, 132 + 22 * Math.sin(2.4 * Math.PI), 7),
  ]);
}

/* ------------------------------------------------ scene helpers */
function autumnTree(x, baseY, s, canopyToken) {
  return (
    S.stroke(`M ${x} ${baseY} L ${x} ${baseY - 70 * s}`, 'outline', 22 * s) +
    S.stroke(`M ${x} ${baseY} L ${x} ${baseY - 70 * s}`, 'sandDeep', 12 * s) +
    S.circle(x, baseY - 130 * s, 84 * s, canopyToken, { outlined: true, sw: 7 * s }) +
    S.circle(x - 62 * s, baseY - 96 * s, 46 * s, canopyToken) +
    S.circle(x + 62 * s, baseY - 100 * s, 44 * s, canopyToken)
  );
}
function fallenLeaves(seed) {
  const parts = [];
  const tokens = ['coral', 'orange', 'sunshine'];
  for (let i = 0; i < 8; i++) {
    const x = ((seed * 97 + i * 193) % 360) + (i < 4 ? 60 : 1180);
    const y = 700 + ((seed * 61 + i * 151) % 240);
    parts.push(S.ellipse(x, y, 16, 9, tokens[i % 3], { outlined: true, sw: 3 }));
  }
  return parts.join('');
}
function doghouse(x, y, s, festive) {
  const parts = [];
  parts.push(S.rrect(x - 95 * s, y - 130 * s, 190 * s, 130 * s, 10 * s, 'coral', { outlined: true, sw: 7 * s }));
  parts.push(S.pathShape(`M ${x - 115 * s} ${y - 124 * s} L ${x} ${y - 196 * s} L ${x + 115 * s} ${y - 124 * s} Z`, 'sandDeep', { outlined: true, sw: 7 * s }));
  parts.push(S.pathShape(`M ${x - 40 * s} ${y} L ${x - 40 * s} ${y - 62 * s} A ${40 * s} ${40 * s} 0 0 1 ${x + 40 * s} ${y - 62 * s} L ${x + 40 * s} ${y} Z`, 'outline', { alpha: 0.85 }));
  parts.push(S.circle(x, y - 148 * s, 14 * s, 'sunshine', { outlined: true, sw: 5 * s }));
  if (festive) parts.push(S.sparkle(x - 120 * s, y - 200 * s, 1.1, 'sunshine') + S.sparkle(x + 120 * s, y - 180 * s, 0.9, 'white'));
  return parts.join('');
}
function crate(cx, cy, w, h) {
  return S.rrect(cx - w / 2, cy - h / 2, w, h, 12, 'sandDeep', { outlined: true, sw: 7 }) +
    S.rrect(cx - w / 2 + 12, cy - h / 2 + 12, w - 24, h - 24, 8, 'creamDeep') +
    S.stroke(`M ${cx - w / 2 + 12} ${cy} L ${cx + w / 2 - 12} ${cy}`, 'sandDeep', 8);
}

/* ------------------------------------------------ scenes */
function sceneSVG(n) {
  const t = (n - 1) / 7;
  const finale = n === 8;
  const dhX = 1330 - t * 130, dhY = 700 + t * 210, dhS = 0.38 + t * 0.85;
  const parts = [
    S.skyGradient('sky', 'skyPale', 1600, 640),
    S.sun(300 + (n - 1) * 108, 140, 78),
    S.cloud(660 + ((n * 53) % 180), 112 + ((n * 29) % 42), 0.95, 0.9),
    S.cloud(1170 - ((n * 41) % 150), 190 + ((n * 23) % 36), 0.72, 0.8),
    S.hill(350, 585, 560, 130, 'mint'),
    S.hill(1290, 595, 580, 145, 'mint'),
    S.groundBand(640, 1600, 360, 'leaf'),
    /* the winding walk path toward the doghouse */
    S.pathShape(`M 560 1000 Q 660 880 ${dhX - 120} ${Math.min(dhY + 50, 950)} Q ${dhX + 30} ${Math.min(dhY + 20, 920)} ${dhX} ${dhY - 2} L ${dhX + 56} ${dhY - 2} Q ${dhX + 120} ${Math.min(dhY + 50, 940)} 1000 1000 Z`, 'sand'),
    /* autumn frame */
    autumnTree(110, 750, 1.15, 'coral'),
    autumnTree(250, 700, 0.8, 'sunshine'),
    autumnTree(1500, 720, 1.0, 'orange'),
    fallenLeaves(n),
    S.grass(330, 790, 0.9, 'leafDeep'),
    S.grass(1400, 820, 0.9, 'leafDeep'),
    /* the approaching doghouse */
    doghouse(dhX, dhY, dhS, finale),
  ];
  if (n === 4) {
    parts.push(crate(690, 630, 320, 130));   /* the LONG crate (correct slot) */
    parts.push(crate(1080, 630, 150, 130));  /* the short crate */
  }
  if (finale) {
    parts.push(S.sparkle(560, 240, 1.2, 'sunshine'), S.sparkle(1060, 200, 1.0, 'sunshine'), S.sparkle(840, 300, 0.9, 'white'));
  }
  return S.doc(1600, 1000, parts);
}

/* ------------------------------------------------ run */
(async () => {
  S.resetColorsUsed();
  const tmp = path.join(os.tmpdir(), 'sb-art-noodles-long-walk');
  fs.rmSync(tmp, { recursive: true, force: true });
  const written = [];

  console.log('[art] pip frames…');
  await S.standardPoseSet(path.join(tmp, 'pip'), pip.render, pip.spec);
  const pipOut = path.join(STORY_DIR, 'cast', 'pip');
  (await packCharacter(path.join(tmp, 'pip'), 'pip', pipOut)).forEach((f) => written.push(path.join(pipOut, f)));

  console.log('[art] noodle frames…');
  await S.standardPoseSet(path.join(tmp, 'noodle'), noodle.render, noodle.spec);
  const nOut = path.join(STORY_DIR, 'cast', 'noodle');
  (await packCharacter(path.join(tmp, 'noodle'), 'noodle', nOut)).forEach((f) => written.push(path.join(nOut, f)));

  console.log('[art] scenes…');
  for (let n = 1; n <= 8; n++) {
    const png = path.join(tmp, 'scenes', `page-0${n}.png`);
    await S.renderPng(sceneSVG(n), png);
    written.push(await packScene(png, path.join(STORY_DIR, 'scenes')));
  }

  console.log('[art] props…');
  const P = path.join(STORY_DIR, 'props');
  written.push(await S.renderWebp(scarfSVG(true), path.join(P, 'scarf-long@2x.webp')));
  written.push(await S.renderWebp(scarfSVG(false), path.join(P, 'scarf-short@2x.webp')));
  written.push(await S.renderWebp(benchSVG(true), path.join(P, 'bench-long@2x.webp')));
  written.push(await S.renderWebp(benchSVG(false), path.join(P, 'bench-short@2x.webp')));
  written.push(await S.renderWebp(stickSVG(), path.join(P, 'stick-long@2x.webp')));
  written.push(await S.renderWebp(trainSVG(true), path.join(P, 'train-long@2x.webp')));
  written.push(await S.renderWebp(trainSVG(false), path.join(P, 'train-short@2x.webp')));
  written.push(await S.renderWebp(wormSVG(true), path.join(P, 'worm-long@2x.webp')));
  written.push(await S.renderWebp(wormSVG(false), path.join(P, 'worm-short@2x.webp')));

  const manifestPath = S.emitArtManifest(STORY_DIR, written);
  console.log('[art] ' + manifestPath);
  console.log('[art] done — ' + written.length + ' files.');
})().catch((e) => { console.error('[art] FAIL: ' + (e.stack || e.message)); process.exit(1); });
