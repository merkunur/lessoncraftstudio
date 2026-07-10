#!/usr/bin/env node
/* =====================================================================
   willas-pond-picnic-art.js — FINAL art for library story #8 (wsv-1).

   Willa's duck pond at feeding time (the library's FIRST companion
   recurrence — Willa re-renders from her existing rig). More ducklings
   paddle in page by page (the running payoff). Painted-at-data-coords
   anchors: duckling clusters (p2 slots), the two seed trays (p4 stamps),
   frog clusters (p6 slots), and the p8 crumb trail along the trace path.

   USAGE: node scripts/storybook/art/willas-pond-picnic-art.js
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
const STORY_DIR = path.join(REPO, 'mini tools', 'stories', 'willas-pond-picnic');

/* ------------------------------------------------ small creatures */
function ducklingSVG(x, y, s, flip) {
  const f = flip ? -1 : 1;
  return `<g transform="translate(${x} ${y}) scale(${f * s} ${s})">` +
    S.ellipse(0, 0, 46, 34, 'sunshine', { outlined: true, sw: 6 }) +
    S.circle(34, -30, 24, 'sunshine', { outlined: true, sw: 6 }) +
    S.pathShape('M 54 -32 Q 74 -28 76 -20 Q 62 -12 50 -20 Z', 'orange', { outlined: true, sw: 4 }) +
    S.eyeDot(30, -34, 5) +
    S.pathShape('M -38 -12 Q -58 -22 -54 -38 Q -36 -32 -30 -18 Z', 'sunshine', { outlined: true, sw: 4 }) +
    '</g>';
}
function frogSVG(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})">` +
    S.ellipse(0, 0, 44, 32, 'leaf', { outlined: true, sw: 6 }) +
    S.circle(-20, -28, 14, 'leaf', { outlined: true, sw: 5 }) +
    S.circle(20, -28, 14, 'leaf', { outlined: true, sw: 5 }) +
    S.eyeDot(-20, -28, 6) + S.eyeDot(20, -28, 6) +
    S.stroke('M -14 6 Q 0 16 14 6', 'inkSoft', 5) +
    '</g>';
}
function ducklingCluster(cx, cy, count) {
  const spots = [[-70, 0], [70, -8], [0, 44], [-40, -46], [56, 42]];
  return spots.slice(0, count).map(([dx, dy], i) => ducklingSVG(cx + dx, cy + dy, 0.85, i % 2 === 1)).join('');
}
function frogCluster(cx, cy, count) {
  const spots = [[-64, 4], [64, -4], [0, 46], [-6, -48]];
  return spots.slice(0, count).map(([dx, dy]) => frogSVG(cx + dx, cy + dy, 0.85)).join('');
}

/* ------------------------------------------------ props */
function fishSVG() {
  return S.doc(300, 300, [
    S.pathShape('M 42 150 Q 110 76 196 108 Q 250 130 250 150 Q 250 170 196 192 Q 110 224 42 150 Z', 'bluebird', { outlined: true }),
    S.pathShape('M 236 150 L 286 108 Q 292 150 286 192 Z', 'bluebird', { outlined: true, sw: 7 }),
    S.eyeDot(96, 138, 11),
    S.stroke('M 150 108 Q 166 150 150 190', 'skyPale', 9),
  ]);
}
function berrySVG() {
  return S.doc(300, 300, [
    S.stroke('M 150 92 Q 158 62 176 50', 'leafDeep', 11),
    S.pathShape('M 176 50 Q 214 36 228 62 Q 200 76 176 50 Z', 'leaf', { outlined: true, sw: 6 }),
    S.circle(150, 178, 88, 'coral', { outlined: true }),
    S.ellipse(118, 142, 24, 16, 'cream', { alpha: 0.5 }),
  ]);
}
function breadBowlSVG() {
  return S.doc(300, 300, [
    S.pathShape('M 40 150 L 260 150 L 236 250 Q 150 268 64 250 Z', 'tealMid', { outlined: true }),
    S.ellipse(150, 150, 110, 30, 'teal', { outlined: true, sw: 7 }),
    S.ellipse(110, 128, 34, 24, 'sandDeep', { outlined: true, sw: 6 }),
    S.ellipse(172, 118, 38, 26, 'creamDeep', { outlined: true, sw: 6 }),
    S.ellipse(216, 136, 28, 20, 'sandDeep', { outlined: true, sw: 6 }),
  ]);
}
function lilyTreatSVG() {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315].map((d) => {
    const a = (d * Math.PI) / 180;
    return S.ellipse(150 + Math.cos(a) * 56, 160 + Math.sin(a) * 40, 40, 22, 'cream', { outlined: true, sw: 5 });
  }).join('');
  return S.doc(300, 300, [
    S.ellipse(150, 200, 110, 46, 'leaf', { outlined: true, sw: 7 }),
    petals,
    S.circle(150, 152, 34, 'sunshine', { outlined: true, sw: 7 }),
  ]);
}
function bushSVG(berries) {
  const spots = [[100, 120], [190, 100], [150, 170], [80, 190], [210, 180]];
  return S.doc(300, 300, [
    S.circle(150, 160, 108, 'leafDeep', { outlined: true }),
    S.circle(86, 130, 62, 'leafDeep'),
    S.circle(216, 126, 58, 'leafDeep'),
    spots.slice(0, berries).map(([x, y]) => S.circle(x, y, 20, 'coral', { outlined: true, sw: 5 })).join(''),
  ]);
}
function frogsPropSVG(count) {
  const parts = [S.stroke('M 30 240 L 270 240', 'outline', 22), S.stroke('M 30 240 L 270 240', 'sandDeep', 12)];
  const spots = [[70, 208], [150, 204], [230, 208], [110, 150], [190, 150]];
  parts.push(spots.slice(0, count).map(([x, y]) => frogSVG(x, y, 0.95)).join(''));
  return S.doc(300, 300, parts);
}

/* ------------------------------------------------ scenes */
function cattail(x, baseY, s) {
  return S.stroke(`M ${x} ${baseY} Q ${x + 6 * s} ${baseY - 90 * s} ${x + 2 * s} ${baseY - 150 * s}`, 'leafDeep', 9 * s) +
    S.rrect(x - 12 * s, baseY - 196 * s, 26 * s, 56 * s, 12 * s, 'sandDeep', { outlined: true, sw: 5 * s }) +
    S.grass(x - 26 * s, baseY, 0.8 * s, 'leafDeep');
}
function lilyPad(x, y, s) {
  return S.pathShape(`M ${x + 54 * s} ${y} A ${54 * s} ${20 * s} 0 1 1 ${x + 54 * s} ${y - 1} L ${x + 20 * s} ${y - 2 * s} Z`, 'leaf', { outlined: true, sw: 5 * s });
}
function traySVG(x, y, seeds) {
  const parts = [
    S.rrect(x - 150, y - 26, 300, 110, 18, 'sandDeep', { outlined: true, sw: 7 }),
    S.rrect(x - 130, y - 12, 260, 78, 12, 'creamDeep'),
  ];
  const spots = [[-90, 30], [-30, 18], [30, 34], [90, 20], [0, 44]];
  parts.push(spots.slice(0, seeds).map(([dx, dy]) => S.ellipse(x + dx, y + dy, 16, 11, 'sandDeep', { outlined: true, sw: 4 })).join(''));
  return parts.join('');
}
function sceneSVG(n) {
  const finale = n === 8;
  const ducks = n <= 2 ? 2 : n <= 4 ? 3 : n <= 6 ? 4 : n === 7 ? 5 : 6;
  const parts = [
    S.skyGradient('sky', 'skyPale', 1600, 620),
    S.sun(290 + (n - 1) * 112, 140, 78),
    S.cloud(640 + ((n * 59) % 190), 112 + ((n * 31) % 44), 0.95, 0.9),
    S.cloud(1160 - ((n * 43) % 160), 190 + ((n * 23) % 38), 0.72, 0.8),
    S.hill(350, 585, 560, 130, 'mint'),
    S.hill(1290, 595, 580, 145, 'mint'),
    S.groundBand(640, 1600, 360, 'leaf'),
    /* the pond (solid palette layers — stacked alphas blow the style gate's
       pixel budget when they cover this much area) */
    S.ellipse(800, 800, 560, 150, 'tealMid'),
    S.ellipse(800, 795, 540, 138, 'bluebird'),
    S.ellipse(760, 768, 320, 64, 'skyPale'),
    lilyPad(430, 760, 1.0), lilyPad(1130, 830, 1.1), lilyPad(880, 742, 0.8),
    /* bank flora at edges */
    cattail(120, 780, 1.1), cattail(180, 810, 0.85), cattail(1480, 800, 1.0),
    S.circle(1445, 742, 12, 'coral', { outlined: true, sw: 5 }),
    /* paddling ducklings (the gathering payoff) */
    ducklingSVG(560 + ((n * 37) % 60), 782, 0.9, false),
    ducks >= 2 ? ducklingSVG(980 - ((n * 29) % 50), 802, 0.85, true) : '',
    ducks >= 3 ? ducklingSVG(760, 828, 0.9, false) : '',
    ducks >= 4 ? ducklingSVG(1180, 780, 0.8, true) : '',
    ducks >= 5 ? ducklingSVG(430, 828, 0.8, false) : '',
    ducks >= 6 ? ducklingSVG(660, 772, 0.75, true) : '',
  ];
  /* page-specific painted anchors (abs = zone + data coords) */
  if (n === 2) {
    parts.push(ducklingCluster(690, 630, 3));    /* the FEWER cluster (correct slot) */
    parts.push(ducklingCluster(1080, 630, 5));
  }
  if (n === 4) {
    parts.push(traySVG(330, 560, 5));            /* the FULL tray (outside the zone) */
    parts.push(traySVG(795, 545, 0));            /* the empty tray under the stamp dots */
  }
  if (n === 6) {
    parts.push(frogCluster(690, 630, 2));
    parts.push(frogCluster(1080, 630, 4));       /* the MORE cluster (correct slot) */
  }
  if (finale) {
    /* crumbs along the trace path (zone 300,470 + the wave) */
    for (let i = 0; i < 15; i++) {
      const t = i / 14;
      parts.push(S.circle(Math.round(380 + 840 * t), Math.round(650 + 42 * Math.sin(t * Math.PI * 2)), 9, 'sandDeep', { outlined: true, sw: 3 }));
    }
    parts.push(S.sparkle(560, 240, 1.1, 'sunshine'), S.sparkle(1080, 200, 1.0, 'sunshine'), S.sparkle(840, 300, 0.85, 'white'));
  }
  return S.doc(1600, 1000, parts);
}

/* ------------------------------------------------ run */
(async () => {
  S.resetColorsUsed();
  const tmp = path.join(os.tmpdir(), 'sb-art-willas-pond-picnic');
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
  const P = path.join(STORY_DIR, 'props');
  written.push(await S.renderWebp(fishSVG(), path.join(P, 'fish@2x.webp')));
  written.push(await S.renderWebp(berrySVG(), path.join(P, 'berry@2x.webp')));
  written.push(await S.renderWebp(breadBowlSVG(), path.join(P, 'bread-bowl@2x.webp')));
  written.push(await S.renderWebp(lilyTreatSVG(), path.join(P, 'lily-treat@2x.webp')));
  written.push(await S.renderWebp(bushSVG(5), path.join(P, 'bush-many@2x.webp')));
  written.push(await S.renderWebp(bushSVG(2), path.join(P, 'bush-few@2x.webp')));
  written.push(await S.renderWebp(frogsPropSVG(5), path.join(P, 'frogs-five@2x.webp')));
  written.push(await S.renderWebp(frogsPropSVG(2), path.join(P, 'frogs-two@2x.webp')));

  const manifestPath = S.emitArtManifest(STORY_DIR, written);
  console.log('[art] ' + manifestPath);
  console.log('[art] done — ' + written.length + ' files.');
})().catch((e) => { console.error('[art] FAIL: ' + (e.stack || e.message)); process.exit(1); });
